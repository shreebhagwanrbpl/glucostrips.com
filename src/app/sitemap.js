import { fetchFullCatalog } from "@/lib/data-fetcher-server";
import { calculateSeoScore, PRIMARY_DISTRICTS } from "@/lib/seo-helper";

export default async function sitemap() {
    const baseUrl = "https://glucostrips.com";
    const urls = [];

    // 1. Static Pages
    const staticPages = ["", "/about", "/services", "/contact", "/items"];
    staticPages.forEach((path) => {
        urls.push({
            url: `${baseUrl}${path}`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: path === "" ? 1.0 : 0.8,
        });
    });

    try {
        // 2. Fetch Districts from correct glucostripscom collection via REST API
        let districts = [];
        try {
            const projectId = "rajbiosis-central";
            const districtsUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/websites/glucostripscom/districts?pageSize=100`;
            const res = await fetch(districtsUrl);
            if (res.ok) {
                const data = await res.json();
                const docs = data.documents || [];
                districts = docs.map(doc => {
                    const parseValue = (val) => {
                        if (!val) return null;
                        if (val.stringValue !== undefined) return val.stringValue;
                        if (val.integerValue !== undefined) return parseInt(val.integerValue, 10);
                        if (val.booleanValue !== undefined) return val.booleanValue;
                        if (val.arrayValue !== undefined) return (val.arrayValue.values || []).map(parseValue);
                        return null;
                    };
                    const fields = doc.fields || {};
                    return {
                        slug: parseValue(fields.slug),
                        district: parseValue(fields.district),
                        state: parseValue(fields.state),
                    };
                });
            }
        } catch (distErr) {
            console.error("Error fetching districts for sitemap via REST:", distErr);
        }

        // 3. Fetch Products from server-side cache
        const allProducts = await fetchFullCatalog();

        // 4. Populate unique, indexable District pages
        districts.forEach((district) => {
            const slug = district.slug;
            if (!slug) return;

            // Check quality score of district page
            const districtScore = calculateSeoScore("district", {
                district: district.district,
                state: district.state,
                city: district.district,
                canonical: `${baseUrl}/${slug}`,
                hasLinks: true,
                hasSchema: true,
            });

            // Quality Gate: Only include in sitemap if score >= 50
            if (districtScore >= 50) {
                // Add district hub page
                urls.push({
                    url: `${baseUrl}/${slug}`,
                    lastModified: new Date(),
                    changeFrequency: "weekly",
                    priority: PRIMARY_DISTRICTS.includes(slug) ? 0.7 : 0.5,
                });

                // Add key sub-pages for this district
                const subPaths = ["/about", "/services", "/contact", "/items"];
                subPaths.forEach((subPath) => {
                    urls.push({
                        url: `${baseUrl}/${slug}${subPath}`,
                        lastModified: new Date(),
                        changeFrequency: "monthly",
                        priority: 0.4,
                    });
                });
            }
        });

        // 5. Populate Product Detail Pages (Authoritative /items/[slug])
        allProducts.forEach((product) => {
            if (!product.slug || product.isPublished === false) return;

            // Evaluate product quality score
            const productScore = calculateSeoScore("product", {
                title: product.title,
                description: product.description || product.desc || "",
                canonical: `${baseUrl}/items/${product.slug}`,
                category: product.category,
                hasLinks: true,
                hasSchema: true,
                hasImages: product.images?.length > 0 || !!product.image,
                hasCleanAlts: true,
            });

            // Quality Gate: Only index products with good content
            if (productScore >= 50) {
                urls.push({
                    url: `${baseUrl}/items/${product.slug}`,
                    lastModified: new Date(),
                    changeFrequency: "weekly",
                    priority: 0.9,
                });
            }
        });

    } catch (error) {
        console.error("Error generating sitemap dynamically:", error);
    }

    return urls;
}