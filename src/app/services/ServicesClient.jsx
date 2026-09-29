"use client";

import { useEffect, useState } from "react";
import {
  Microscope,
  FlaskConical,
  Activity,
  PackageSearch,
  ClipboardList,
  RefreshCw,
  Building2,
  FileText,
  CheckCircle,
  Wrench,
  ShieldCheck,
} from "lucide-react";

import SectionTitle from "@/components/SectionTitle";
import CTASection from "@/components/CTASection";

const serviceStyles = [
  { icon: <Microscope size={26} className="text-indigo-600" />, bg: "bg-indigo-50/80", border: "hover:border-indigo-200" },
  { icon: <FlaskConical size={26} className="text-fuchsia-600" />, bg: "bg-fuchsia-50/80", border: "hover:border-fuchsia-200" },
  { icon: <Activity size={26} className="text-sky-600" />, bg: "bg-sky-50/80", border: "hover:border-sky-200" },
  { icon: <PackageSearch size={26} className="text-emerald-600" />, bg: "bg-emerald-50/80", border: "hover:border-emerald-200" },
  { icon: <ClipboardList size={26} className="text-rose-600" />, bg: "bg-rose-50/80", border: "hover:border-rose-200" },
  { icon: <FileText size={26} className="text-amber-600" />, bg: "bg-amber-50/80", border: "hover:border-amber-200" },
  { icon: <RefreshCw size={26} className="text-purple-600" />, bg: "bg-purple-50/80", border: "hover:border-purple-200" },
  { icon: <Building2 size={26} className="text-slate-600" />, bg: "bg-slate-50/80", border: "hover:border-slate-200" },
  { icon: <Wrench size={26} className="text-blue-600" />, bg: "bg-blue-50/80", border: "hover:border-blue-200" },
  { icon: <ShieldCheck size={26} className="text-teal-600" />, bg: "bg-teal-50/80", border: "hover:border-teal-200" },
];

const defaultServices = [
  {
    title: "Diagnostic System Sourcing",
    description: "Product discovery for hematology, chemistry, immunoassay, rapid testing and other routine diagnostic workflows.",
    points: ["Analyzer and test-menu requirement review", "Throughput and sample-type comparison", "Associated reagent and control identification"],
    value: "Keeps equipment selection connected to the tests your laboratory actually performs.",
  },
  {
    title: "Laboratory Instrument Procurement",
    description: "Support for sourcing general laboratory instruments and accessories used in pathology, research and sample preparation areas.",
    points: ["Centrifuge, incubator and pipette requirements", "Bench-space and capacity considerations", "Accessories and routine lab consumables"],
    value: "Helps combine core instruments with the practical items needed around them.",
  },
  {
    title: "Clinical & Biomedical Equipment",
    description: "Sourcing assistance for patient-care and biomedical equipment used by hospitals, clinics and healthcare departments.",
    points: ["Application-based equipment shortlisting", "Model and capacity comparison", "Department-wise quantity planning"],
    value: "Supports mixed healthcare procurement beyond laboratory-only products.",
  },
  {
    title: "Kit, Reagent & Consumable Matching",
    description: "Assistance identifying recurring consumables for existing equipment and routine diagnostic testing.",
    points: ["Instrument brand and model matching", "Reagent, strip and control requirement review", "Pack-size and repeat-use planning"],
    value: "Reduces confusion when consumables must match a specific installed platform.",
  },
  {
    title: "Specification Comparison",
    description: "We organize technical information so buyers can compare products on the parameters that matter to their application.",
    points: ["Parameter and throughput comparison", "Automation and capacity review", "Dimensions, model and intended-use details"],
    value: "Creates a clearer basis for internal technical and purchasing approval.",
  },
  {
    title: "Quotation Documentation",
    description: "Commercial enquiries can be structured around item-wise quantities, models and technical notes for easier procurement review.",
    points: ["Consolidated multi-item enquiry handling", "Model-wise quotation preparation", "Supporting product and specification information"],
    value: "Makes multi-product purchasing easier to review, compare and communicate.",
  },
  {
    title: "Repeat Supply Planning",
    description: "For frequently consumed items, we help buyers define recurring quantities and compatible product references for future orders.",
    points: ["Routine consumable list creation", "Batch and shelf-life discussion", "Reorder quantity planning"],
    value: "Useful for laboratories and facilities that reorder the same operational items regularly.",
  },
  {
    title: "Institutional & Dealer Requirements",
    description: "Hospitals, diagnostic chains, laboratories, distributors and other B2B buyers can submit single-site or multi-site requirements.",
    points: ["Bulk quantity coordination", "Mixed-category requirement consolidation", "Delivery-location and schedule discussion"],
    value: "Supports broader procurement programs instead of limiting the enquiry to one product type.",
  },
];

const steps = [
  { step: "01", title: "Share the Use Case", desc: "Tell us the test, department, application, daily workload or product type you need." },
  { step: "02", title: "Compare Suitable Options", desc: "We organize matching products around specification, capacity, model, compatibility and quantity." },
  { step: "03", title: "Finalize the Purchase List", desc: "Selected items can be consolidated into a quotation with the required commercial and product details." },
  { step: "04", title: "Coordinate Supply", desc: "Packing, batch information, delivery location and repeat-consumable needs can be aligned before dispatch." },
];

export default function ServicesClient({ initialServices = [], city = "" }) {
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

  const displayServices = rawServices.map((service, index) => {
    const style = serviceStyles[index % serviceStyles.length];
    return {
      icon: service.icon || style.icon,
      bg: service.bg || style.bg,
      border: service.border || style.border,
      title: service.title || service.name || "Biomedical Service",
      description: service.desc || service.description || "",
      points: Array.isArray(service.points) && service.points.length > 0
        ? service.points
        : [
            "Strict compliance with quality benchmarks and clinical standards",
            "Dedicated technical support and professional advisory",
            "Seamless integration into hospital and diagnostic workflows",
          ],
      value: service.value || "Ensures highest operational precision, reduced downtime, and clinical excellence.",
    };
  });

  return (
    <>
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="absolute top-1/4 left-0 w-90 h-90 bg-indigo-50/40 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-0 w-90 h-90 bg-fuchsia-50/40 rounded-full blur-[100px] pointer-events-none" />

        <div className="container-custom">
          <SectionTitle
            badge="Procurement & Product Support"
            title={city ? `Biomedical Sourcing Services for Buyers in ${city}` : "Biomedical Sourcing Services Across Product Categories"}
            description="Services are organized around buying requirements: identifying products, comparing specifications, matching consumables, preparing quotations and coordinating multi-item supply."
            center
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {displayServices.map((service, index) => (
              <div key={index} className={`group bg-white rounded-[32px] p-8 border border-slate-100/80 ${service.border} hover:shadow-xl hover:shadow-indigo-50/40 hover:-translate-y-1.5 transition-all duration-300 card-shadow flex flex-col justify-between`}>
                <div>
                  <div className={`w-14 h-14 rounded-2xl ${service.bg} flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300`}>{service.icon}</div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">{service.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">{service.description}</p>
                  <ul className="space-y-2.5 mb-6 border-t border-slate-50 pt-5">
                    {service.points.map((pt, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-500 leading-normal">
                        <CheckCircle size={14} className="text-indigo-500 mt-0.5 shrink-0" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100/50 mt-auto">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-0.5">Why it helps</span>
                  <p className="text-xs text-indigo-950/80 font-medium leading-relaxed">{service.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-slate-50 border-t border-slate-100">
        <div className="container-custom">
          <SectionTitle
            badge="Procurement Flow"
            title="Four Steps From Requirement to Supply"
            description="A structured workflow keeps technical details, quantities and commercial information together from the first enquiry onward."
            center
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {steps.map((item) => (
              <div key={item.step} className="bg-white rounded-[30px] p-8 card-shadow border border-slate-100">
                <div className="text-sm font-bold text-indigo-600 tracking-widest">{item.step}</div>
                <h3 className="text-xl font-semibold text-slate-900 mt-4">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-7 mt-3">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection city={city} />
    </>
  );
}
