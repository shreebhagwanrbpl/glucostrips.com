import ServicesPage from "@/app/services/page";

export async function generateMetadata({ params }) {
  const { district = "jaipur" } = await params;
  const city = district
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return {
    title: `Biomedical & Laboratory Services in ${city} | Raj Biosis`,
    description: `Innovative diagnostic and biomedical service solutions in ${city}, India. Reliable setup, installation, and support from Raj Biosis.`,
    alternates: {
      canonical: `https://glucostrips.com/${district}/services`,
    },
  };
}

export default async function Page({ params }) {
  const { district = "jaipur" } = await params;
  const city = district
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return <div className="site1-static"><ServicesPage city={city} /></div>;
}