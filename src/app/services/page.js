import { fetchServicesData } from "@/lib/data-fetcher";
import ServicesClient from "./ServicesClient";

export const revalidate = 3600; // Revalidate cache every hour

export const metadata = {
  title: "Biomedical & Laboratory Services | Installation & Maintenance | Raj Biosis",
  description: "Explore premium biomedical services from Raj Biosis India. Providing equipment calibration, laboratory solutions setup, and expert technical support.",
  alternates: {
    canonical: "https://glucostrips.com/services",
  },
};

export default async function ServicesPage({ city = "" }) {
  let services = [];
  try {
    const data = await fetchServicesData();
    if (data && data.services) {
      services = data.services;
    }
  } catch (error) {
    console.error("Error fetching services on server:", error);
  }
  return <div className="site1-static"><ServicesClient services={services} city={city} /></div>;
}