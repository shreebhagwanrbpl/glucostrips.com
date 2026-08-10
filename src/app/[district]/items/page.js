import ProductsPage from "@/app/items/page";

export async function generateMetadata({ params }) {
  const { district = "jaipur" } = await params;
  const city = district
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return {
    title: `Biomedical Equipment & Diagnostic Instruments in ${city} | Raj Biosis`,
    description: `Buy premium biomedical equipment and diagnostic analyzers in ${city} at best prices. Raj Biosis supplies CBC machines, biochemistry analyzers and reagents.`,
    alternates: {
      canonical: `https://glucostrips.com/${district}/items`,
    },
  };
}

export default async function Page({ params }) {
  const { district = "jaipur" } = await params;
  const city = district
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return <ProductsPage city={city} />;
}