import { fetchContactData } from "@/lib/data-fetcher";
import ContactClient from "./ContactClient";

export const revalidate = 3600; // Revalidate cache every hour

export const metadata = {
  title: "Contact Raj Biosis | Biomedical & Laboratory Suppliers India",
  description: "Speak with our consumables desk for diagnostic analyzers, biochemistry systems, and medical laboratory equipment. Request a quote or support today.",
  alternates: {
    canonical: "https://glucostrips.com/contact",
  },
};

export default async function ContactPage() {
  let contactInfo = [];
  try {
    const data = await fetchContactData();
    if (data && data.contactInfo) {
      contactInfo = data.contactInfo;
    }
  } catch (error) {
    console.error("Error fetching contact details on server:", error);
  }
  return <div className="site1-static"><ContactClient initialContactInfo={contactInfo} /></div>;
}