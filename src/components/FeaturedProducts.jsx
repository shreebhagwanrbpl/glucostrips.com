"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import SectionTitle from "./SectionTitle";

export default function FeaturedProducts({
  city,
  initialProducts = [],
}) {
  const pathname = usePathname();

  // =========================================================
  // DISTRICT / CITY ROUTING
  // =========================================================

  const pathParts = pathname
    ? pathname.split("/").filter(Boolean)
    : [];

  const staticRoutes = [
    "about",
    "services",
    "items",
    "contact",
  ];

  const district =
    pathParts.length > 0 &&
      !staticRoutes.includes(pathParts[0])
      ? pathParts[0]
      : "";

  const makeLink = (path) => {
    if (!district) return path;

    if (path === "/") {
      return `/${district}`;
    }

    return `/${district}${path}`;
  };

  // =========================================================
  // FEATURED PRODUCTS
  // Uses the SAME products already loaded by ProductsClient
  // =========================================================

  const products = Array.isArray(initialProducts)
    ? initialProducts
      .filter((product) => product?.isPublished !== false)
      .slice(0, 3)
    : [];

  return (
    <section className="relative overflow-hidden py-20 lg:py-24">

      {/* Background Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-300/10 rounded-full blur-3xl" />

        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-fuchsia-300/10 rounded-full blur-3xl" />

        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-purple-300/10 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">

        {/* =====================================================
            SECTION HEADER
        ===================================================== */}

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">

          <SectionTitle
            badge="Featured Products"
            title="Premium Biomedical Equipment"
            description="Explore our high-performance diagnostic analyzers and certified laboratory instruments."
          />

          <Link href={makeLink("/items")}>
            <button
              className="secondary-btn border border-indigo-200/80 text-indigo-700 hover:bg-indigo-50/50 hover:border-indigo-300 transition duration-300 flex items-center gap-2"
            >
              View All Products
              <ArrowRight size={18} />
            </button>
          </Link>

        </div>

        {/* =====================================================
            PRODUCTS GRID
        ===================================================== */}

        {products.length === 0 ? (

          <div className="bg-white rounded-[32px] border border-slate-100 p-12 lg:p-16 text-center card-shadow">

            <div className="w-20 h-20 mx-auto rounded-2xl bg-indigo-50 flex items-center justify-center mb-6">
              <PackageIcon />
            </div>

            <h3 className="text-2xl font-bold text-slate-900">
              No Products Available
            </h3>

            <p className="mt-3 text-slate-500">
              Featured products are currently unavailable.
            </p>

            <Link href={makeLink("/items")}>
              <button
                className="mt-7 primary-btn bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white"
              >
                View All Products
                <ArrowRight size={18} />
              </button>
            </Link>

          </div>

        ) : (

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">

            {products.map((product, index) => (

              <motion.div
                key={
                  product.uid ||
                  product.id ||
                  `${product.title}-${index}`
                }
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                viewport={{
                  once: true,
                }}
                className="group bg-white rounded-[32px] border border-slate-100 hover:border-indigo-100 hover:shadow-2xl hover:shadow-indigo-50/40 hover:-translate-y-2 transition-all duration-300 p-6 card-shadow flex flex-col justify-between h-full"
              >

                <div>

                  {/* =========================================
                      IMAGE
                  ========================================= */}

                  <div className="relative h-[220px] rounded-2xl bg-slate-50 border border-slate-100/50 overflow-hidden flex items-center justify-center p-6 group-hover:bg-slate-100/50 transition duration-300 mb-6">

                    <img
                      src={
                        product.images?.[0] ||
                        product.image ||
                        product.imageUrl ||
                        "/placeholder.jpg"
                      }
                      alt={
                        product.title ||
                        "Biomedical Product"
                      }
                      className="max-h-full max-w-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.src =
                          "/placeholder.jpg";
                      }}
                    />

                    {/* Category Badge */}
                    <div className="absolute top-3.5 right-3.5 bg-white/90 backdrop-blur-md border border-slate-100 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-indigo-700 shadow-sm">
                      {product.category ||
                        "Biomedical"}
                    </div>

                  </div>

                  {/* =========================================
                      METADATA
                  ========================================= */}

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

                  {/* =========================================
                      TITLE
                  ========================================= */}

                  <h3 className="text-2xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors duration-300 mb-4 line-clamp-2">
                    {product.title ||
                      "Biomedical Equipment"}
                  </h3>

                  {/* =========================================
                      DESCRIPTION
                  ========================================= */}

                  <p className="text-slate-600 text-[15px] leading-7 mb-8 line-clamp-3">
                    {product.description ||
                      product.desc ||
                      "Professional biomedical equipment for laboratory benches, hospital departments, and diagnostic centres."}
                  </p>

                </div>

                {/* =========================================
                    ACTION
                ========================================= */}

                <div className="flex flex-col gap-3 mt-auto">

                  <Link
                    href={makeLink(
                      `/items/${product.slug ||
                      product.title
                        ?.toLowerCase()
                        .trim()
                        .replace(/[^a-z0-9\s-]/g, "")
                        .replace(/\s+/g, "-")
                      }`
                    )}
                    className="w-full"
                  >
                    <button
                      className="primary-btn w-full bg-gradient-to-r from-indigo-600 to-fuchsia-600 !text-white hover:from-indigo-700 hover:to-fuchsia-700 hover:shadow-lg transition flex items-center justify-center gap-2"
                    >
                      Get Quote
                      <ChevronRight size={18} />
                    </button>
                  </Link>

                </div>

              </motion.div>

            ))}

          </div>

        )}

      </div>
    </section>
  );
}

/* =============================================================
   EMPTY STATE ICON
============================================================= */

function PackageIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-indigo-600"
    >
      <path d="m16.5 9.4-9-5.19" />
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="M3.27 6.96 12 12.01l8.73-5.05" />
      <path d="M12 22.08V12" />
    </svg>
  );
}