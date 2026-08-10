import { Suspense } from "react";
import { fetchFullCatalog } from "@/lib/data-fetcher-server";
import ProductsClient from "./ProductsClient";

export const revalidate = 3600; // Revalidate cache every hour

export const metadata = {
  title: "Biomedical Equipment & Diagnostic Instruments Catalog | Raj Biosis",
  description: "Browse the full catalog of premium biomedical equipment, hematology analyzers, biochemistry systems, and diagnostic test strips from Raj Biosis India.",
  alternates: {
    canonical: "https://glucostrips.com/items",
  },
};

export default async function ProductsPage({ district = null, city = null }) {
  // Fetch full catalog from server cache
  const allProducts = await fetchFullCatalog();

  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-slate-500">Loading catalog...</div>}>
      <ProductsClient
        initialProducts={allProducts}
        district={district}
        city={city}
      />
    </Suspense>
  );
}