"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ListChecks,
  PackageSearch,
  Repeat2,
  FileSpreadsheet,
  Microscope,
  FlaskConical,
  Activity,
  Wrench,
  ShieldCheck,
} from "lucide-react";
import SectionTitle from "./SectionTitle";
import ServiceCard from "./ServiceCard";

const previewIcons = [
  <ListChecks key="1" size={30} />,
  <PackageSearch key="2" size={30} />,
  <Repeat2 key="3" size={30} />,
  <FileSpreadsheet key="4" size={30} />,
  <Microscope key="5" size={30} />,
  <FlaskConical key="6" size={30} />,
  <Activity key="7" size={30} />,
  <Wrench key="8" size={30} />,
  <ShieldCheck key="9" size={30} />,
];

const defaultServices = [
  {
    title: "Technical Requirement Review",
    description: "Share test parameters, sample type, throughput, capacity or intended application and we help narrow the suitable product options.",
  },
  {
    title: "Cross-Category Product Sourcing",
    description: "Source diagnostic kits, analyzers, laboratory instruments, monitoring equipment, reagents, accessories and consumables through one enquiry.",
  },
  {
    title: "Consumable & Reorder Planning",
    description: "Identify recurring reagents, strips, controls, disposables and accessories required to keep installed equipment supplied over time.",
  },
  {
    title: "Quotation & Specification Support",
    description: "Receive product-wise details for brand, model, automation, capacity, dimensions, application and order quantity in a procurement-friendly format.",
  },
];

export default function ServicesPreview({ initialServices = [] }) {
  const [servicesData, setServicesData] = useState(
    Array.isArray(initialServices) && initialServices.length > 0 ? initialServices : []
  );

  useEffect(() => {
    fetch("/api/site-data?page=services", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => {
        if (d && Array.isArray(d.services) && d.services.length > 0) {
          setServicesData(d.services);
        }
      })
      .catch(console.error);
  }, []);

  const rawServices = servicesData.length > 0 ? servicesData : defaultServices;
  const servicesToDisplay = rawServices.slice(0, 4).map((item, index) => ({
    icon: item.icon || previewIcons[index % previewIcons.length],
    title: item.title || item.name || "Biomedical Service",
    description: item.desc || item.description || "",
  }));

  return (
    <section className="section-padding bg-slate-50">
      <div className="container-custom">
        <SectionTitle
          badge="From Enquiry to Purchase Decision"
          title="Support for Biomedical Product Procurement"
          description="Our role is to make technical product selection and multi-item sourcing easier for laboratories, hospitals, diagnostic centres and healthcare distributors."
          center
        />

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mt-16">
          {servicesToDisplay.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
            >
              <ServiceCard icon={service.icon} title={service.title} description={service.description} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
