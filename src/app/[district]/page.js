import Link from "next/link";
import { fetchDistrictData, fetchDistrictsInState } from "@/lib/data-fetcher";
import { fetchFullCatalog } from "@/lib/data-fetcher-server";
import SectionTitle from "@/components/SectionTitle";
import dynamic from "next/dynamic";

const HomeLayout = dynamic(() => import("@/components/HomeLayout"), { ssr: true });

export default async function DistrictPage({ params }) {
  const { district = "jaipur" } = await params;

  let districtData = null;
  let nearbyDistricts = [];
  let allProducts = [];

  try {
    // Parallel fetch products and district data to improve performance
    const [prodData, distData] = await Promise.all([
      fetchFullCatalog(),
      fetchDistrictData(district),
    ]);

    allProducts = prodData;
    districtData = distData;

    if (districtData?.state) {
      nearbyDistricts = await fetchDistrictsInState(districtData.state);
      // Filter out the current district
      nearbyDistricts = nearbyDistricts.filter((d) => d.slug !== district);
    }
  } catch (error) {
    console.error("Error loading district page data:", error);
  }

  const city = districtData?.district || district
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  const stateName = districtData?.state || "Rajasthan";

  return (
    <div className="site1-static">
      {/* Render the standard home layout with the city context */}
      <HomeLayout city={city} allProducts={allProducts} />

      {/* Dynamic Local SEO & Internal Linking Section */}
      {nearbyDistricts.length > 0 && (
        <section className="py-20 bg-slate-50 border-t border-slate-100">
          <div className="container-custom">
            <div className="max-w-3xl mb-12">
              <SectionTitle
                badge="Service Network"
                title={`Biomedical Equipment Distribution in ${stateName}`}
                description={`We coordinate diagnostics equipment logistics, supply clinical analyzers, and distribute rapid test kits to laboratories and hospitals throughout ${stateName}.`}
              />
            </div>

            <div className="bg-white rounded-[32px] p-8 md:p-10 border border-slate-100 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                {/* Native MapPin SVG to avoid Lucide React Context build errors in Server Components */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-indigo-650"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                Other Serviced Districts in {stateName}
              </h3>

              <p className="text-slate-600 mb-8 leading-relaxed text-sm">
                Select a location below to view local diagnostic supplies, laboratory setup services, 
                and rapid diagnostic test kit availability in your region:
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {nearbyDistricts.map((d) => (
                  <Link
                    key={d.slug}
                    href={`/${d.slug}`}
                    className="flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-50 hover:bg-indigo-50/50 hover:text-indigo-650 transition duration-200 border border-slate-100/80 text-sm font-medium text-slate-700"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0"></span>
                    {d.district}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}