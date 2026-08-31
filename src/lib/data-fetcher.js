import { db } from "./firebase";
import { doc, getDoc, getDocs, collection, query, where, limit } from "firebase/firestore";

// Simple in-memory cache for Firestore documents and catalog
const docCache = {};
let catalogPromise = null;

const makeSlug = (text = "") =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

function parseFirestoreValue(value) {
  if (!value) return null;
  if (value.stringValue !== undefined) return value.stringValue;
  if (value.integerValue !== undefined) return parseInt(value.integerValue, 10);
  if (value.doubleValue !== undefined) return parseFloat(value.doubleValue);
  if (value.booleanValue !== undefined) return value.booleanValue;
  if (value.arrayValue !== undefined) {
    return (value.arrayValue.values || []).map(parseFirestoreValue);
  }
  if (value.mapValue !== undefined) {
    const obj = {};
    for (const [k, v] of Object.entries(value.mapValue.fields || {})) {
      obj[k] = parseFirestoreValue(v);
    }
    return obj;
  }
  if (value.timestampValue !== undefined) return value.timestampValue;
  return null;
}

function parseFirestoreDocument(doc) {
  const data = {};
  for (const [k, v] of Object.entries(doc.fields || {})) {
    data[k] = parseFirestoreValue(v);
  }
  return data;
}

/**
 * Fetch a single document and cache its promise/data.
 */
export async function fetchDocCached(path) {
  if (docCache[path]) {
    return docCache[path];
  }
  if (!docCache[path + "_promise"]) {
    docCache[path + "_promise"] = (async () => {
      try {
        if (typeof window === "undefined") {
          // Server-side: fetch via Firestore REST API to bypass Next.js patched fetch offline error
          const projectId = "rajbiosis-central";
          const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/${path}`;
          const res = await fetch(url);
          if (res.ok) {
            const docJson = await res.json();
            const data = parseFirestoreDocument(docJson);
            docCache[path] = data;
            return data;
          }
          return null;
        } else {
          // Client-side: use Client SDK
          const parts = path.split("/");
          const docRef = doc(db, ...parts);
          const snap = await getDoc(docRef);
          if (snap.exists()) {
            const data = snap.data();
            docCache[path] = data;
            return data;
          }
          return null;
        }
      } catch (err) {
        console.error(`Error fetching doc at ${path}:`, err);
        // Clear promise on error to allow retries
        delete docCache[path + "_promise"];
        throw err;
      }
    })();
  }
  return docCache[path + "_promise"];
}

/**
 * Fetch and process the entire products catalog (categories, subcategories, legacy list).
 * Caches the result globally to eliminate repeat network reads during client-side navigation.
 */
export async function fetchFullCatalog() {
  if (catalogPromise) {
    return catalogPromise;
  }

  catalogPromise = (async () => {
    const startTime = performance.now();
    try {
      if (typeof window === "undefined") {
        // Server-side REST API fetch
        const projectId = "rajbiosis-central";
        const baseUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents`;
        
        // 1. Fetch categories
        const categoriesUrl = `${baseUrl}/websites/glucostripscom/pages/categoryproducts/categories`;
        const res = await fetch(categoriesUrl);
        if (!res.ok) {
          throw new Error(`Failed to fetch categories: ${res.statusText}`);
        }
        const categoriesData = await res.json();
        const categoryDocs = categoriesData.documents || [];

        const allProducts = [];

        // Fetch all categories and subcategories in parallel
        await Promise.all(
          categoryDocs.map(async (categoryDoc) => {
            const categoryId = categoryDoc.name.split("/").pop();
            const data = parseFirestoreDocument(categoryDoc);
            const categoryName = data.category || categoryId;

            try {
              // Fetch subcategories
              const subcategoriesUrl = `${baseUrl}/websites/glucostripscom/pages/categoryproducts/categories/${categoryId}/subcategories`;
              const subRes = await fetch(subcategoriesUrl);
              if (subRes.ok) {
                const subDataRaw = await subRes.json();
                const subDocs = subDataRaw.documents || [];

                subDocs.forEach((subDoc) => {
                  const subId = subDoc.name.split("/").pop();
                  const subData = parseFirestoreDocument(subDoc);
                  const subCategoryName = subData.subCategory || subId;

                  const categoryProducts = (subData.products || [])
                    .filter((p) => p.isPublished !== false)
                    .map((item, index) => ({
                      ...item,
                      uid: `${categoryId}-${subId}-${index}`,
                      category: categoryName,
                      subCategory: subCategoryName,
                      slug: item.slug || makeSlug(item.title),
                    }));

                  allProducts.push(...categoryProducts);
                });
              }
            } catch (subErr) {
              console.error(`Error fetching subcategories for category ${categoryId} via REST:`, subErr);
            }

            // Fallback direct category products
            if (data.products?.length) {
              const directProducts = data.products
                .filter((p) => p.isPublished !== false)
                .map((item, index) => ({
                  ...item,
                  uid: `${categoryId}-direct-${index}`,
                  category: categoryName,
                  subCategory: item.subCategory || categoryName,
                  slug: item.slug || makeSlug(item.title),
                }));
              allProducts.push(...directProducts);
            }
          })
        );

        // Fetch old legacy products
        try {
          const oldRes = await fetch(`${baseUrl}/websites/glucostripscom/pages/products`);
          if (oldRes.ok) {
            const oldDoc = await oldRes.json();
            const oldData = parseFirestoreDocument(oldDoc);
            const oldProducts = (oldData.products || [])
              .filter((p) => p.isPublished !== false)
              .map((item, index) => ({
                ...item,
                uid: `other-${index}`,
                category: "Other Products",
                subCategory: item.subCategory || "Other Products",
                slug: item.slug || makeSlug(item.title),
              }));

            allProducts.push(...oldProducts);
          }
        } catch (oldErr) {
          console.error("Error fetching legacy products via REST:", oldErr);
        }

        const duration = performance.now() - startTime;
        console.log(`[data-fetcher] REST API fetchFullCatalog completed in ${duration.toFixed(2)}ms (found ${allProducts.length} products)`);
        return allProducts;

      } else {
        // Client-side: use Client SDK
        // 1. Fetch categories
        const categorySnap = await getDocs(
          collection(
            db,
            "websites",
            "glucostripscom",
            "pages",
            "categoryproducts",
            "categories"
          )
        );

        const allProducts = [];

        // Fetch all subcategories in parallel to solve N+1 issue
        await Promise.all(
          categorySnap.docs.map(async (categoryDoc) => {
            const data = categoryDoc.data();
            const categoryName = data.category || categoryDoc.id;

            try {
              const subcategoriesCol = collection(
                db,
                "websites",
                "glucostripscom",
                "pages",
                "categoryproducts",
                "categories",
                categoryDoc.id,
                "subcategories"
              );

              const subcategoriesSnap = await getDocs(subcategoriesCol);

              subcategoriesSnap.forEach((subDoc) => {
                const subData = subDoc.data();
                const subCategoryName = subData.subCategory || subDoc.id;

                const categoryProducts = (subData.products || [])
                  .filter((p) => p.isPublished !== false)
                  .map((item, index) => ({
                    ...item,
                    uid: `${categoryDoc.id}-${subDoc.id}-${index}`,
                    category: categoryName,
                    subCategory: subCategoryName,
                    slug: item.slug || makeSlug(item.title),
                  }));

                allProducts.push(...categoryProducts);
              });
            } catch (subErr) {
              console.error(`Error fetching subcategories for category ${categoryDoc.id}:`, subErr);
            }

            // Fallback direct category products
            if (data.products?.length) {
              const directProducts = data.products
                .filter((p) => p.isPublished !== false)
                .map((item, index) => ({
                  ...item,
                  uid: `${categoryDoc.id}-direct-${index}`,
                  category: categoryName,
                  subCategory: item.subCategory || categoryName,
                  slug: item.slug || makeSlug(item.title),
                }));
              allProducts.push(...directProducts);
            }
          })
        );

        // Fetch old legacy products
        try {
          const oldSnap = await getDoc(
            doc(
              db,
              "websites",
              "glucostripscom",
              "pages",
              "products"
            )
          );

          if (oldSnap.exists()) {
            const oldProducts = (oldSnap.data().products || [])
              .filter((p) => p.isPublished !== false)
              .map((item, index) => ({
                ...item,
                uid: `other-${index}`,
                category: "Other Products",
                subCategory: item.subCategory || "Other Products",
                slug: item.slug || makeSlug(item.title),
              }));

            allProducts.push(...oldProducts);
          }
        } catch (oldErr) {
          console.error("Error fetching legacy products:", oldErr);
        }

        const duration = performance.now() - startTime;
        console.log(`[data-fetcher] Client SDK fetchFullCatalog completed in ${duration.toFixed(2)}ms (found ${allProducts.length} products)`);
        return allProducts;
      }
    } catch (err) {
      console.error("Error fetching full catalog:", err);
      // Clear cache promise on error to allow retries
      catalogPromise = null;
      throw err;
    }
  })();

  return catalogPromise;
}

/**
 * Helpers for cached document retrieval across pages
 */
export async function fetchHomeData() {
  return fetchDocCached("websites/glucostripscom/pages/home");
}

export async function fetchContactData() {
  return fetchDocCached("websites/glucostripscom/pages/contact");
}

export async function fetchServicesData() {
  return fetchDocCached("websites/glucostripscom/pages/services");
}

export async function fetchDistrictData(district) {
  if (!district) return null;
  return fetchDocCached(`websites/glucostripscom/districts/${district}`);
}

export async function fetchDistrictsInState(state) {
  if (!state) return [];
  try {
    if (typeof window === "undefined") {
      // Server-side REST API listing and filter
      const projectId = "rajbiosis-central";
      const districtsUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/websites/glucostripscom/districts?pageSize=100`;
      const res = await fetch(districtsUrl);
      if (res.ok) {
        const data = await res.json();
        const docs = data.documents || [];
        return docs
          .map(doc => parseFirestoreDocument(doc))
          .filter(d => d.state === state)
          .slice(0, 15);
      }
      return [];
    } else {
      // Client-side standard query
      const q = query(
        collection(db, "websites", "glucostripscom", "districts"),
        where("state", "==", state),
        limit(15)
      );
      const snap = await getDocs(q);
      return snap.docs.map(doc => doc.data());
    }
  } catch (err) {
    console.error("Error fetching districts in state:", err);
    return [];
  }
}

