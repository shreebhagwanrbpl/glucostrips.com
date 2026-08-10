import ProductDetails from "../../../items/[slug]/ProductDetails";
import { fetchFullCatalog } from "@/lib/data-fetcher-server";

export async function generateMetadata({ params }) {
    const { slug, district = "jaipur" } = await params;
    
    const city = district
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());

    let product = null;
    try {
        const products = await fetchFullCatalog();
        product = products.find((p) => p.slug === slug);
    } catch (error) {
        console.error("Error fetching product metadata on server:", error);
    }

    const productName = product ? product.title : slug
        ?.replace(/-/g, " ")
        ?.replace(/\b\w/g, (c) => c.toUpperCase());

    const title = `${productName} Supplier in ${city} | Price, Dealer & Distributor | Raj Biosis`;
    const description = `Buy ${productName} in ${city} at the best price. Raj Biosis is a trusted supplier, dealer, and distributor of ${productName} in ${city} for hospitals, laboratories, and diagnostic centers.`;

    const url = `https://glucostrips.com/${district}/items/${slug}`;

    return {
        title,
        description,
        alternates: {
            canonical: url,
        },
        openGraph: {
            title,
            description,
            url,
            type: "website",
        },
    };
}

export default async function Page({ params }) {
    const { slug, district } = await params;

    return (
        <ProductDetails
            slug={slug}
            district={district}
        />
    );
}