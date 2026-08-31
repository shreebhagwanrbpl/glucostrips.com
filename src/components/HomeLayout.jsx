"use client";

import HeroSection from "@/components/HeroSection";
import TrustedBrands from "@/components/TrustedBrands";
import FeaturedProducts from "@/components/FeaturedProducts";
import WhyChooseUs from "@/components/WhyChooseUs";
import StatsSection from "@/components/StatsSection";
import ServicesPreview from "@/components/ServicesPreview";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";
import SeoContent from "@/components/SeoContent";

export default function HomeLayout({ city = "", allProducts = [] }) {
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
