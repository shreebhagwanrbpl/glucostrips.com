import { fetchFullCatalog } from "@/lib/data-fetcher-server";
import dynamic from "next/dynamic";

const HomeLayout = dynamic(() => import("@/components/HomeLayout"), { ssr: true });

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