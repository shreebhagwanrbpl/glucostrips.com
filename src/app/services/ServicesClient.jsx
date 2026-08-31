"use client";

import {
  Microscope,
  FlaskConical,
  ShieldCheck,
  Stethoscope,
  CheckCircle,
  FileText,
  Building2,
  Package,
  Info,
} from "lucide-react";

import PageBanner from "@/components/PageBanner";
import SectionTitle from "@/components/SectionTitle";
import CTASection from "@/components/CTASection";

export default function ServicesClient({ services = [], city = "" }) {
  const servicesList = [
    {
      icon: <Stethoscope size={26} className="text-sky-600" />,
      bg: "bg-sky-50/80",
      border: "hover:border-sky-200",
      title: "Biomedical Equipment Supply",
      description:
        "We supply biomedical equipment based on customer specifications, application needs, and clinical configurations.",
      points: [
        "Sourcing multi-parameter patient monitor options",
        "Biomedical instrumentation catalog access",
        "Assistance with clinical department needs",
      ],
      value: "Ensures medical facilities acquire standard biomedical equipment.",
    },
    {
      icon: <Microscope size={26} className="text-indigo-600" />,
      bg: "bg-indigo-50/80",
      border: "hover:border-indigo-200",
      title: "Diagnostic Equipment Supply",
      description:
        "Sourcing and supply of diagnostic machines and kits for hospitals, laboratories, and diagnostic centres.",
      points: [
        "Sourcing CBC machines and hematology analyzers",
        "Supply of biochemistry testing platforms",
        "Reagents and diagnostic test strips supply",
      ],
      value: "Streamlines clinical test outputs and diagnostic accuracy.",
    },
    {
      icon: <FlaskConical size={26} className="text-fuchsia-600" />,
      bg: "bg-fuchsia-50/80",
      border: "hover:border-fuchsia-200",
      title: "Laboratory Equipment Supply",
      description:
        "Supply support for laboratory instruments, general apparatus, and testing equipment based on laboratory configurations.",
      points: [
        "Sourcing laboratory centrifuges and incubators",
        "General laboratory apparatus and consumables supply",
        "Supply coordination for pathology laboratories",
      ],
      value: "Equips laboratories with dependable models and consumables.",
    },
    {
      icon: <CheckCircle size={26} className="text-emerald-600" />,
      bg: "bg-emerald-50/80",
      border: "hover:border-emerald-200",
      title: "Product Selection Assistance",
      description:
        "Customers can share their requirements to receive assistance in identifying suitable products, configurations, and models.",
      points: [
        "Analyzing daily patient and test workload volume",
        "Comparing calibration standards and capacity ranges",
        "Ensuring product options match testing specifications",
      ],
      value: "Helps choose the right model size to match expected workload.",
    },
    {
      icon: <FileText size={26} className="text-rose-600" />,
      bg: "bg-rose-50/80",
      border: "hover:border-rose-200",
      title: "Product Enquiry & Quotation Support",
      description:
        "We follow a convenient process to help customers discuss specifications, request quotations, and get detailed product answers.",
      points: [
        "Intake of customer equipment requirement profiles",
        "Prompt model identification and specification discussions",
        "Preparation of formal product brochures and pricing quotations",
      ],
      value: "Ensures transparent and convenient purchasing communication.",
    },
    {
      icon: <Building2 size={26} className="text-amber-600" />,
      bg: "bg-amber-50/80",
      border: "hover:border-amber-200",
      title: "Healthcare Equipment Sourcing",
      description:
        "Sourcing support for clinics and healthcare facilities looking for suitable biomedical, diagnostic, and laboratory equipment.",
      points: [
        "Sourcing multiple diagnostic and monitoring units",
        "Aligning equipment specifications to utility limits",
        "Procurement package coordination for expanding clinics",
      ],
      value: "Simplifies sourcing for new or expanding healthcare locations.",
    },
    {
      icon: <Package size={26} className="text-purple-600" />,
      bg: "bg-purple-50/80",
      border: "hover:border-purple-200",
      title: "Institutional & Bulk Requirements",
      description:
        "Hospitals, laboratories, and institutions can contact Raj Biosis for bulk orders or multi-unit equipment sourcing.",
      points: [
        "Scheduled deliveries for multiple locations",
        "Standardized model supply for simple logistics",
        "Coordinated supply programs for bulk orders",
      ],
      value: "Reduces administrative overhead for large procurement programs.",
    },
    {
      icon: <Info size={26} className="text-slate-600" />,
      bg: "bg-slate-50/80",
      border: "hover:border-slate-200",
      title: "Product Information & Technical Guidance",
      description:
        "Assistance with understanding product specifications, capacity limits, brand details, and application usage.",
      points: [
        "Detailed specification sheets walkthrough",
        "Throughput and capacity capability matching",
        "Application limits and brand comparison guidance",
      ],
      value: "Informs clinical buyers with detailed product parameters.",
    },
  ];

  return (
    <>
      {/* Banner */}
      {/* <PageBanner
        title={city ? `Consumables & Supply Services in ${city}` : "Consumables & Supply Services"}
        subtitle={`Delivering trusted biomedical consultations, laboratory setup support, and precision diagnostic solutions in ${city || "India"}.`}
      /> */}

      {/* Services Grid Section */}
      <section className="section-padding bg-white relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-1/4 left-0 w-90 h-90 bg-indigo-50/40 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-0 w-90 h-90 bg-fuchsia-50/40 rounded-full blur-[100px] pointer-events-none" />

        <div className="container-custom">
          <SectionTitle
            badge="Sourcing Solutions"
            title="Biomedical & Laboratory Supply Services"
            description="We support clinical laboratories, diagnostic facilities, and healthcare networks with tailored equipment selection and guidance."
            center
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {servicesList.map((service, index) => (
              <div
                key={index}
                className={`group bg-white rounded-[32px] p-8 border border-slate-100/80 ${service.border} hover:shadow-xl hover:shadow-indigo-50/40 hover:-translate-y-1.5 transition-all duration-300 card-shadow flex flex-col justify-between`}
              >
                <div>
                  {/* Icon */}
                  <div
                    className={`w-14 h-14 rounded-2xl ${service.bg} flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300`}
                  >
                    {service.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-slate-900 mb-3 group-hover:text-indigo-950 transition-colors duration-200">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Points */}
                  <ul className="space-y-2.5 mb-6 border-t border-slate-50 pt-5">
                    {service.points.map((pt, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-500 leading-normal">
                        <CheckCircle size={14} className="text-indigo-500 mt-0.5 shrink-0" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Value Box */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100/50 mt-auto">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-0.5">
                    Value to Client
                  </span>
                  <p className="text-xs text-indigo-950/80 font-medium leading-relaxed">
                    {service.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Working Process */}
      <section className="section-padding bg-slate-50 border-t border-slate-100">
        <div className="container-custom">
          <SectionTitle
            badge="How We Work"
            title="Simple & Professional Process"
            description="We follow a streamlined process to ensure reliable biomedical and healthcare solutions."
            center
          />

          <div className="grid lg:grid-cols-3 gap-8 mt-16">
            {[
              {
                step: "01",
                title: "Enquiry",
                desc: "Sharing your technical and application requirements with our team.",
              },
              {
                step: "02",
                title: "Identification",
                desc: "Comparing catalogs and selecting specifications suited to your test throughput.",
              },
              {
                step: "03",
                title: "Quotation & Supply",
                desc: "Providing detailed quote breakdowns and coordinate secure shipment and technical checklists.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-[30px] p-8 card-shadow border border-slate-100 hover:border-indigo-100/50 transition-all duration-300"
              >
                <span className="text-5xl font-extrabold text-indigo-100">
                  {item.step}
                </span>

                <h3 className="text-2xl font-semibold mt-5 text-slate-900">
                  {item.title}
                </h3>

                <p className="text-slate-600 mt-4 leading-7 text-sm">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection />
    </>
  );
}
