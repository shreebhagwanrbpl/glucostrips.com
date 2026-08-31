import AboutClient from "./AboutClient";

export const metadata = {
  title: "About Our Diagnostic & Medical Sourcing Team | Raj Biosis India",
  description: "Learn about Raj Biosis, a trusted supplier, exporter, and supply partner of advanced diagnostic systems, biomedical instruments, and laboratory equipment in India.",
  alternates: {
    canonical: "https://glucostrips.com/about",
  },
};

export default function AboutPage({ city = "" }) {
  return <div className="site1-static"><AboutClient city={city} /></div>;
}