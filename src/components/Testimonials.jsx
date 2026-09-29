"use client";

import { motion } from "framer-motion";
import { Building2, Microscope, ShoppingCart } from "lucide-react";
import SectionTitle from "./SectionTitle";

export default function Testimonials() {
  const requirements = [
    {
      icon: <Microscope size={24} />,
      title: "Diagnostic Centre Requirement",
      text: "An analyzer enquiry can be paired with reagents, controls, test kits and routine accessories so the complete testing workflow is considered together.",
    },
    {
      icon: <Building2 size={24} />,
      title: "Hospital Department Requirement",
      text: "Procurement teams can compare biomedical equipment, monitoring devices, laboratory products and consumables for multiple departments in one request.",
    },
    {
      icon: <ShoppingCart size={24} />,
      title: "Dealer or Bulk Purchase",
      text: "Dealers and institutional buyers can request product-wise quantities, model options and repeat-consumable requirements for consolidated commercial discussion.",
    },
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <SectionTitle
          badge="Typical Buying Scenarios"
          title="Built for More Than a Single Product Enquiry"
          description="The catalogue is designed for mixed biomedical requirements, whether you are replacing one item, setting up a laboratory, or coordinating a multi-category purchase."
          center
        />

        <div className="grid lg:grid-cols-3 gap-8 mt-16">
          {requirements.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="bg-slate-50 rounded-[32px] p-8 border border-slate-100 card-shadow"
            >
              <div className="w-12 h-12 rounded-xl bg-white border border-slate-100 text-indigo-600 flex items-center justify-center mb-6">
                {item.icon}
              </div>
              <h4 className="font-semibold text-xl text-slate-900">{item.title}</h4>
              <p className="text-slate-600 leading-8 mt-4">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
