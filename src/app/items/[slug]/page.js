import ProductDetails from "./ProductDetails";
import { fetchFullCatalog } from "@/lib/data-fetcher-server";

export async function generateMetadata({ params }) {
    const { slug } = await params;
    
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

    const categoryName = product?.category || "Biomedical Equipment";
    const brandName = product?.brand || "Raj Biosis";

    const title = product 
        ? `${productName} | ${categoryName} Exporter & Supplier | Raj Biosis`
        : `${productName} Supplier in India | Price & Dealer | Raj Biosis`;

    const description = product?.description || product?.desc || `Buy ${productName} from Raj Biosis. Trusted manufacturer, supplier and exporter of medical diagnostic reagents, biochemistry instruments and laboratory kits.`;

    const url = `https://glucostrips.com/items/${slug}`;

    return {
        title,
        description: description.slice(0, 160),

        keywords: [
            productName,
            `${productName} Supplier`,
            `${productName} Exporter`,
            `${productName} Manufacturer`,
            `${productName} Distributor`,
            `${productName} Price`,
            categoryName,
            brandName,
            "Biomedical Equipment",
            "Medical Equipment India",
            "Laboratory Supplies Exporter",
            "Raj Biosis",
        ],

        alternates: {
            canonical: url,
        },

        openGraph: {
            title,
            description: description.slice(0, 160),
            url,
            siteName: "Raj Biosis",
            type: "website",
            locale: "en_IN",
        },

        twitter: {
            card: "summary_large_image",
            title,
            description: description.slice(0, 160),
        },

        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                "max-video-preview": -1,
                "max-image-preview": "large",
                "max-snippet": -1,
            },
        },

        metadataBase: new URL("https://glucostrips.com"),
    };
}

export default async function Page({ params }) {
    const { slug } = await params;

    return <ProductDetails slug={slug} />;
}