import AboutPage from "@/app/about/page";

export async function generateMetadata({ params }) {
  const { district = "jaipur" } = await params;
  const city = district
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return {
    title: `About Raj Biosis in ${city} | Biomedical Equipment Supplier`,
    description: `Learn about Raj Biosis in ${city}, India. Premier supplier of diagnostic machines, laboratory systems, and medical equipment.`,
    alternates: {
      canonical: `https://glucostrips.com/${district}/about`,
    },
  };
}

export default async function Page({ params }) {
  const { district = "jaipur" } = await params;
  const city = district
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return <AboutPage city={city} />;
}