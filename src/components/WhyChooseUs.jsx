"use client";

import { motion } from "framer-motion";
import { ClipboardCheck, Boxes, FileCheck2, Truck } from "lucide-react";
import SectionTitle from "./SectionTitle";

export default function WhyChooseUs() {
  const features = [
    {
      icon: <ClipboardCheck size={30} />,
      title: "Requirement Mapping",
      description: "We shortlist products around sample type, test menu, throughput, capacity, intended use and available laboratory workflow instead of pushing a single product category.",
    },
    {
      icon: <Boxes size={30} />,
      title: "Mixed-Category Procurement",
      description: "One enquiry can cover analyzers, test kits, reagents, strips, laboratory instruments, accessories and routine medical consumables for the same facility.",
    },
    {
      icon: <FileCheck2 size={30} />,
      title: "Specification Clarity",
      description: "Buyers receive model-oriented information on parameters, automation level, capacity, dimensions, applications and compatible consumables before ordering.",
    },
    {
      icon: <Truck size={30} />,
      title: "Order Coordination",
      description: "We assist with quotation consolidation, quantity planning, batch and shelf-life checks, packing requirements and dispatch coordination for institutional purchases.",
    },
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <SectionTitle
          badge="Procurement Built Around Your Requirement"
          title="A Practical Way to Source Biomedical Products"
          description="From a single diagnostic kit to a multi-category laboratory requirement, we organize product information around what your facility actually needs to buy and use."
          center
        />

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mt-16">
          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="bg-slate-50 p-8 rounded-[28px] border border-slate-100 hover:border-indigo-100 hover:bg-white hover:-translate-y-2 hover:shadow-xl hover:shadow-indigo-100/40 transition-all duration-300 card-shadow"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100/40 border border-indigo-100/50 text-indigo-600 flex items-center justify-center mb-6 shadow-sm">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold mb-4 text-slate-900">{item.title}</h3>
              <p className="text-slate-600 leading-7">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
