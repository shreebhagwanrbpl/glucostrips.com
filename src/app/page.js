export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

import { fetchFullCatalog } from "@/lib/data-fetcher-server";
import HomeLayout from "@/components/HomeLayout";


export const metadata = {
  title: "Diagnostic, Medical & Laboratory Supplies | Raj Biosis",

  description: "Raj Biosis is a leading supplier of diagnostic kits, laboratory equipment, medical consumables, and laboratory diagnostics. We source genuine medical supplies for healthcare entities across India.",

  alternates: {
    canonical: "https://glucostrips.com",
  },
};

export default async function Home({ city = "" }) {
  // Fetch products
  const allProducts = await fetchFullCatalog();

  return <div className="site1-static"><HomeLayout city={city} allProducts={allProducts} /></div>;
}