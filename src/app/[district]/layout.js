import { fetchDistrictData } from "@/lib/data-fetcher";
import { calculateSeoScore, PRIMARY_DISTRICTS } from "@/lib/seo-helper";

export async function generateMetadata({ params }) {
  const { district = "jaipur" } = await params;
  const url = `https://glucostrips.com/${district}`;

  let districtData = null;
  try {
    districtData = await fetchDistrictData(district);
  } catch (error) {
    console.error("Error fetching district data for layout:", error);
  }

  const isValidDistrict = !!districtData;

  const districtName = districtData?.district || district
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  const stateName = districtData?.state || "India";

  // Run the programmatic quality check
  const score = calculateSeoScore("district", {
    district: districtName,
    state: stateName,
    city: districtName,
    canonical: url,
    hasLinks: true,
    hasSchema: true,
  });

  // Only index if district document exists and quality score is high enough
  const isIndexable = isValidDistrict && score >= 50;

  return {
    title: `Diagnostic, Medical & Laboratory Supplies in ${districtName}, ${stateName} | Raj Biosis`,

    description: `Raj Biosis supplies premium diagnostic kits, laboratory equipment, medical consumables, and laboratory diagnostics in ${districtName}, ${stateName}.`,

    keywords: [
      `Diagnostic Supplies ${districtName}`,
      `Medical Consumables ${districtName}`,
      `Laboratory Equipment ${districtName}`,
      `Laboratory Diagnostics ${districtName}`,
      `Medical Sourcing ${districtName}`,
    ],

    robots: {
      index: isIndexable,
      follow: true,
      googleBot: {
        index: isIndexable,
        follow: true,
      }
    },

    alternates: {
      canonical: url,
    },

    openGraph: {
      title: `Diagnostic, Medical & Laboratory Supplies in ${districtName}, ${stateName} | Raj Biosis`,
      description: `Raj Biosis supplies premium diagnostic kits, laboratory equipment, medical consumables, and laboratory diagnostics in ${districtName}, ${stateName}.`,
      url,
      type: "website",
    },
  };
}

export default function DistrictLayout({ children }) {
  return children;
}