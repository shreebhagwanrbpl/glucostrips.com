"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Package, Eye, ChevronRight } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { usePathname } from "next/navigation";
import SectionTitle from "./SectionTitle";

const makeSlug = (text = "") =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

export default function FeaturedProducts({ city }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  // Resolve district/city slug
  const pathParts = pathname.split("/").filter(Boolean);
  const staticRoutes = ["about", "services", "items", "contact"];
  const district =
    pathParts.length > 0 && !staticRoutes.includes(pathParts[0])
      ? pathParts[0]
      : "";

  const makeLink = (path) => {
    if (!district) return path;
    if (path === "/") return `/${district}`;
    return `/${district}${path}`;
  };

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const categorySnap = await getDocs(
          collection(
            db,
            "websites",
            "centralbiomedicals",
            "pages",
            "categoryproducts",
            "categories"
          )
        );

        const allProducts = [];

        categorySnap.forEach((categoryDoc) => {
          const data = categoryDoc.data();
          const categoryProducts = (data.products || [])
            .filter((p) => p.isPublished !== false)
            .map((item, index) => ({
              ...item,
              uid: `${categoryDoc.id}-${index}`,
              category: data.category || categoryDoc.id,
              slug: item.slug || makeSlug(item.title),
            }));

          allProducts.push(...categoryProducts);
        });

        // If categories list is empty or small, try loading from old products
        if (allProducts.length < 3) {
          const oldSnap = await getDoc(
            doc(db, "websites", "centralbiomedicals", "pages", "products")
          );

          if (oldSnap.exists()) {
            const oldProducts = (oldSnap.data().products || [])
              .filter((p) => p.isPublished !== false)
              .map((item, index) => ({
                ...item,
                uid: `other-${index}`,
                category: "Other Products",
                slug: item.slug || makeSlug(item.title),
              }));

            allProducts.push(...oldProducts);
          }
        }

        // Keep first 3 products as featured
        setProducts(allProducts.slice(0, 3));
      } catch (err) {
        console.error("Error fetching featured products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <section className="section-padding bg-white relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-indigo-100/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-fuchsia-100/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container-custom relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <SectionTitle
            badge="Featured Products"
            title="Premium Biomedical Equipment"
            description="Explore our high-performance diagnostic analyzers and certified laboratory instruments."
          />
          <Link href={makeLink("/items")}>
            <button className="secondary-btn border border-indigo-200/80 text-indigo-750 hover:bg-indigo-50/50 hover:border-indigo-300 transition duration-300 flex items-center gap-2">
              View All Products
              <ArrowRight size={18} />
            </button>
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {loading
            ? Array.from({ length: 3 }).map((_, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-[32px] border border-slate-100 p-6.5 card-shadow animate-pulse"
                >
                  <div className="bg-slate-100 rounded-2xl h-[220px] mb-6" />
                  <div className="h-6 bg-slate-200 rounded w-1/3 mb-4" />
                  <div className="h-8 bg-slate-200 rounded w-3/4 mb-6" />
                  <div className="space-y-3 mb-8">
                    <div className="h-4 bg-slate-200 rounded w-full" />
                    <div className="h-4 bg-slate-200 rounded w-5/6" />
                  </div>
                  <div className="h-12 bg-slate-200 rounded-xl w-full" />
                </div>
              ))
            : products.map((product, index) => (
                <motion.div
                  key={product.uid || index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group bg-white rounded-[32px] border border-slate-100 hover:border-indigo-100 hover:shadow-2xl hover:shadow-indigo-50/40 hover:-translate-y-2 transition-all duration-300 p-6.5 card-shadow flex flex-col justify-between h-full"
                >
                  <div>
                    {/* Image Area */}
                    <div className="relative h-[220px] rounded-2xl bg-slate-55 border border-slate-100/50 overflow-hidden flex items-center justify-center p-6 group-hover:bg-slate-100/50 transition duration-300 mb-6">
                      <img
                        src={product.images?.[0] || product.image || "/placeholder.jpg"}
                        alt={product.title}
                        className="max-h-full max-w-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.jpg";
                        }}
                      />
                      <div className="absolute top-3.5 right-3.5 bg-white/90 backdrop-blur-md border border-slate-100 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-indigo-700 shadow-sm">
                        {product.category || "Biomedical"}
                      </div>
                    </div>

                    {/* Metadata tags */}
                    <div className="flex flex-wrap gap-2.5 mb-4">
                      {product.brand && (
                        <span className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-100 text-xs font-medium text-slate-500">
                          Brand: {product.brand}
                        </span>
                      )}
                      {product.model && (
                        <span className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-100 text-xs font-medium text-slate-500">
                          Model: {product.model}
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors duration-300 mb-4 line-clamp-2">
                      {product.title}
                    </h3>

                    <p className="text-slate-600 text-[15px] leading-7 mb-8 line-clamp-3">
                      {product.description ||
                        product.desc ||
                        "Premium biomedical equipment designed for laboratories, hospitals and diagnostic centres."}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-3 mt-auto">
                    <Link
                      href={makeLink(`/items/${product.slug}`)}
                      className="w-full"
                    >
                      <button className="primary-btn w-full bg-gradient-to-r from-indigo-600 to-fuchsia-600 !text-white hover:from-indigo-700 hover:to-fuchsia-700 hover:shadow-lg transition flex items-center justify-center gap-2">
                        Get Quote
                        <ChevronRight size={18} />
                      </button>
                    </Link>
                  </div>
                </motion.div>
              ))}
        </div>
      </div>
    </section>
  );
}
