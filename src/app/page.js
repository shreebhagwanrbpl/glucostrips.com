import { fetchFullCatalog } from "@/lib/data-fetcher-server";

import HeroSection from "@/components/HeroSection";
import TrustedBrands from "@/components/TrustedBrands";
import FeaturedProducts from "@/components/FeaturedProducts";
import WhyChooseUs from "@/components/WhyChooseUs";
import StatsSection from "@/components/StatsSection";
import ServicesPreview from "@/components/ServicesPreview";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";
import SeoContent from "@/components/SeoContent";

export const metadata = {
  title:
    "Biomedical & Diagnostic Laboratory Equipment | Raj Biosis India",

  description:
    "Raj Biosis is a leading biomedical supplier, diagnostic manufacturer, and exporter in India. Sourcing CBC machines, hematology analyzers, biochemistry analyzers, and test strips globally.",

  alternates: {
    canonical: "https://glucostrips.com",
  },
};

export default async function Home({ city = "" }) {
  // Use the SAME catalog fetch used by the working Products page
  const allProducts = await fetchFullCatalog();

  return (
    <>
      <HeroSection city={city} />

      <TrustedBrands />

      <FeaturedProducts
        city={city}
        initialProducts={allProducts}
      />

      <WhyChooseUs />

      <StatsSection />

      <ServicesPreview />

      <Testimonials />

      <CTASection />

      <SeoContent city={city} />
    </>
  );
}