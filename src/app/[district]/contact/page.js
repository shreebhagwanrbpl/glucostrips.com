import ContactPage from "@/app/contact/page";

export async function generateMetadata({ params }) {
  const { district = "jaipur" } = await params;
  const city = district
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return {
    title: `Contact Raj Biosis in ${city} | Request Biomedical Quote`,
    description: `Get in touch with Raj Biosis in ${city}. Sourcing premium hematology analyzers, CBC machines, and diagnostic reagents locally.`,
    alternates: {
      canonical: `https://glucostrips.com/${district}/contact`,
    },
  };
}

export default async function Page({ params }) {
  const { district = "jaipur" } = await params;
  const city = district
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return <ContactPage city={city} />;
}