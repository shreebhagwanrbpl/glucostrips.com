"use client";

import Image from "next/image";
import {
  Microscope,
  FlaskConical,
  ShieldCheck,
  Stethoscope,
  Building2,
  Users,
  Compass,
  CheckCircle2,
  ClipboardList,
  Layers,
} from "lucide-react";

import PageBanner from "@/components/PageBanner";
import SectionTitle from "@/components/SectionTitle";
import DDS from "@/components/img/Dds.png";

export default function AboutClient({ city = "" }) {
  return (
    <>
      {/* Banner */}
      <PageBanner
        title={city ? `About Our Diagnostic & Medical Sourcing Team in ${city}` : "About Our Diagnostic & Medical Sourcing Team"}
        subtitle={`A professional supplier of biomedical, diagnostic, and laboratory equipment in ${city || "India"}, helping healthcare and laboratory organizations source suitable equipment.`}
      />

      {/* Company Profile Section */}
      <section className="section-padding bg-white relative overflow-hidden">
        {/* Decorative Blurs */}
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-indigo-50/75 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 left-0 w-80 h-80 bg-fuchsia-50/50 rounded-full blur-[100px] pointer-events-none" />

        <div className="container-custom grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Image & Sourcing Badge */}
          <div className="relative">
            <div className="rounded-[40px] overflow-hidden card-shadow bg-gradient-to-br from-slate-50 to-slate-100 h-[580px] flex items-center justify-center p-8 border border-slate-100">
              <Image
                src={DDS}
                alt="Raj Biosis Equipment Supply"
                width={1200}
                height={900}
                className="max-w-full max-h-full object-contain"
                priority
              />
            </div>

            {/* Sourcing Floating Card (No Fake Stats) */}
            <div className="absolute -bottom-6 -right-6 bg-white/95 backdrop-blur-md p-6 rounded-[28px] shadow-2xl border border-slate-100 hidden lg:block max-w-[280px]">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-500 to-fuchsia-500 text-white flex items-center justify-center shadow-md">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900">Verified</h4>
                  <p className="text-slate-500 text-xs font-semibold">Equipment Sourcing</p>
                </div>
              </div>
              <p className="text-slate-600 text-xs mt-3 leading-relaxed border-t border-slate-100 pt-3">
                Helping healthcare facilities identify and source equipment matching their exact technical specs.
              </p>
            </div>
          </div>

          {/* Right Column - Text Details */}
          <div>
            <SectionTitle
              badge="Supply Partner"
              title={city ? `Your Trusted Equipment Supply Partner in ${city}` : "Your Trusted Equipment Supply Partner"}
              description={`Raj Biosis is a dedicated supplier, dealer, and exporter of biomedical systems, diagnostic equipment, and laboratory solutions in ${city ? `${city} and across India` : "India"}.`}
            />

            <div className="mt-8 space-y-6 text-slate-600 leading-8 text-[16px]">
              <p>
                We focus on helping healthcare facilities, diagnostics laboratories, clinics, and research
                institutions source suitable medical and testing equipment. By acting as a reliable distributor
                and supply partner, we help buyers compare models, understand utility requirements, and identify
                machinery that fits their testing throughput and daily workflows.
              </p>
              <p>
                Our team understands the importance of selecting equipment with the correct configurations.
                Customers can share their specific requirements, application limits, and volume requirements, and
                we coordinate to supply matched models, brands, and testing consumables from our catalog.
              </p>
            </div>

            {/* Core Supply Highlights */}
            <div className="grid sm:grid-cols-2 gap-5 mt-10">
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 hover:border-indigo-100 hover:bg-white transition-all duration-300">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
                  <ClipboardList size={20} />
                </div>
                <h4 className="font-semibold text-slate-900 text-[17px]">
                  Requirement-Based
                </h4>
                <p className="text-slate-500 mt-2 text-xs leading-relaxed">
                  We supply equipment tailored to your specific application, capacity, and test throughput needs.
                </p>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 hover:border-indigo-100 hover:bg-white transition-all duration-300">
                <div className="w-10 h-10 rounded-lg bg-fuchsia-50 text-fuchsia-600 flex items-center justify-center mb-3">
                  <Layers size={20} />
                </div>
                <h4 className="font-semibold text-slate-900 text-[17px]">
                  Diverse Portfolio
                </h4>
                <p className="text-slate-500 mt-2 text-xs leading-relaxed">
                  Access a wide range of categories, including hematology, biochemistry, and general laboratory apparatus.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Supply Section */}
      <section className="section-padding bg-slate-50/50 border-y border-slate-100 relative">
        <div className="container-custom">
          <SectionTitle
            badge="Product Sourcing"
            title="Biomedical, Diagnostic & Laboratory Equipment Supply"
            description="We supply a wide range of equipment categories to meet the demands of modern medical and laboratory operations."
            center
          />

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {/* Category 1 */}
            <div className="bg-white rounded-[32px] p-8 border border-slate-100 hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-50/30 hover:-translate-y-2 transition-all duration-300 card-shadow flex flex-col h-full">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6">
                <Microscope size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Diagnostic Equipment</h3>
              <p className="text-slate-600 leading-relaxed text-sm mb-6 flex-grow">
                Supplying diagnostic equipment such as hematology analyzers, CBC machines, biochemistry analyzers, and diagnostic testing strips to diagnostic centres and clinical laboratories.
              </p>
              <span className="text-indigo-600 font-semibold text-xs tracking-wider uppercase bg-indigo-50/50 py-1.5 px-3 rounded-full self-start">
                Diagnostic Supply
              </span>
            </div>

            {/* Category 2 */}
            <div className="bg-white rounded-[32px] p-8 border border-slate-100 hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-50/30 hover:-translate-y-2 transition-all duration-300 card-shadow flex flex-col h-full">
              <div className="w-14 h-14 rounded-2xl bg-fuchsia-50 text-fuchsia-600 flex items-center justify-center mb-6">
                <FlaskConical size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Laboratory Equipment</h3>
              <p className="text-slate-600 leading-relaxed text-sm mb-6 flex-grow">
                Sourcing and supplying general laboratory instruments, clinical centrifuges, incubators, pipettes, and pathology consumables for medical research and clinical labs.
              </p>
              <span className="text-fuchsia-600 font-semibold text-xs tracking-wider uppercase bg-fuchsia-50/50 py-1.5 px-3 rounded-full self-start">
                Laboratory Setup Sourcing
              </span>
            </div>

            {/* Category 3 */}
            <div className="bg-white rounded-[32px] p-8 border border-slate-100 hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-50/30 hover:-translate-y-2 transition-all duration-300 card-shadow flex flex-col h-full">
              <div className="w-14 h-14 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center mb-6">
                <Stethoscope size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Biomedical Instruments</h3>
              <p className="text-slate-600 leading-relaxed text-sm mb-6 flex-grow">
                Supplying essential medical instruments, monitoring systems, and testing accessories for hospitals, clinics, and health departments looking for certified options.
              </p>
              <span className="text-sky-700 font-semibold text-xs tracking-wider uppercase bg-sky-50/50 py-1.5 px-3 rounded-full self-start">
                Medical Sourcing
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Serve Section */}
      <section className="section-padding bg-white relative">
        <div className="container-custom">
          <div className="max-w-3xl mb-16">
            <SectionTitle
              badge="Who We Serve"
              title="Equipment Supply for Healthcare Facilities"
              description="We serve as a reliable supply partner for a diverse range of medical, scientific, and diagnostic institutions."
            />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Building2 size={24} />,
                title: "Hospitals & Clinics",
                desc: "Sourcing dependable diagnostic setups, patient monitors, and clinical tools for healthcare departments.",
              },
              {
                icon: <Microscope size={24} />,
                title: "Diagnostic Centres",
                desc: "Supplying high-performance analyzers, reagents, and test strips scaled to daily patient loads.",
              },
              {
                icon: <FlaskConical size={24} />,
                title: "Pathology Laboratories",
                desc: "Supplying pathology labs with reliable testing instruments and everyday clinical consumables.",
              },
              {
                icon: <Users size={24} />,
                title: "Research Institutions",
                desc: "Providing specialized laboratory tools, testing apparatus, and scientific equipment for institutional research.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-50/60 p-6 rounded-[28px] border border-slate-100 hover:bg-white hover:border-indigo-100/50 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-white text-indigo-600 flex items-center justify-center mb-5 border border-slate-100 shadow-sm">
                  {item.icon}
                </div>
                <h4 className="text-lg font-semibold text-slate-900 mb-2">{item.title}</h4>
                <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sourcing Approach & Support Commitment */}
      <section className="section-padding bg-slate-50/50 border-t border-slate-100 relative">
        <div className="container-custom grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Block - Text Content */}
          <div>
            <SectionTitle
              badge="Our Supply Process"
              title="Ensuring Correct Specifications & Models"
              description="A supplier's value lies in precision. We guide customers through a convenient enquiry and technical checking process to ensure the correct products are delivered."
            />

            <div className="mt-8 space-y-6">
              <div className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 mt-1">
                  <CheckCircle2 size={14} />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 text-base">Requirement-Based Product Guidance</h4>
                  <p className="text-slate-600 text-sm mt-1 leading-relaxed">
                    Based on specifications and application needs, we help identify the exact equipment throughput, model configurations, and brand options.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-fuchsia-50 border border-fuchsia-100 text-fuchsia-600 flex items-center justify-center shrink-0 mt-1">
                  <CheckCircle2 size={14} />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 text-base">Structured Quotation Support</h4>
                  <p className="text-slate-600 text-sm mt-1 leading-relaxed">
                    We offer transparent product information, detailed specification sheets, and quotation assistance to make procurement simple and professional.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-sky-50 border border-sky-100 text-sky-600 flex items-center justify-center shrink-0 mt-1">
                  <CheckCircle2 size={14} />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 text-base">Support for Institutional Requirements</h4>
                  <p className="text-slate-600 text-sm mt-1 leading-relaxed">
                    We coordinate logistics, supply models, and multiple equipment options for large hospitals, research centers, and bulk buyers.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Block - Graphic Visual Cards */}
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-[30px] border border-slate-100 card-shadow flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6">
                  <Compass size={24} />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">Our Vision</h4>
                <p className="text-slate-500 text-xs leading-relaxed">
                  Positioning Raj Biosis as a dependable supplier that helps healthcare and laboratory organizations access suitable equipment and testing solutions.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[30px] border border-slate-100 card-shadow flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-fuchsia-50 text-fuchsia-600 flex items-center justify-center mb-6">
                  <Users size={24} />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">Supply Commitment</h4>
                <p className="text-slate-500 text-xs leading-relaxed">
                  We focus on clear enquiry communication, prompt response handling, and reliable equipment dispatch processes to support client uptime.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
