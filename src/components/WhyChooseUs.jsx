"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Microscope,
  HeartPulse,
  BadgeCheck,
} from "lucide-react";

import SectionTitle from "./SectionTitle";

export default function WhyChooseUs() {
  const features = [
    {
      icon: <Microscope size={30} />,
      title: "Advanced Technology",
      description: "High-quality laboratory equipment, diagnostic kits, and medical supplies sourced to guarantee precision and reliable readings.",
    },
    {
      icon: <ShieldCheck size={30} />,
      title: "Trusted Quality",
      description: "Consumables chosen with an emphasis on compatibility, long shelf-life documentation, and batch tracking.",
    },
    {
      icon: <HeartPulse size={30} />,
      title: "Healthcare Focused",
      description: "We combine medical equipment distribution expertise with helpful system setup support and product compatibility guidance.",
    },
    {
      icon: <BadgeCheck size={30} />,
      title: "Expert Support",
      description: "Responsive customer support and logistics assistance for all laboratory equipment and medical consumable orders.",
    },
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">

        {/* Section Title */}
        <SectionTitle
          badge="Why Healthcare Buyers Work With Us"
          title="Reliable Medical & Diagnostic Sourcing"
          description="Our focus is on suitable diagnostic technology, clear product guidance, and dependable support throughout the equipment lifecycle."
          center
        />

        {/* Cards */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mt-16">

          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
              }}
              viewport={{
                once: true,
              }}
              className="bg-slate-50 p-8 rounded-[28px] border border-slate-100 hover:border-indigo-100 hover:bg-white hover:-translate-y-2 hover:shadow-xl hover:shadow-indigo-100/40 transition-all duration-300 card-shadow"
            >
              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100/40 border border-indigo-100/50 text-indigo-600 flex items-center justify-center mb-6 shadow-sm">
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold mb-4 text-slate-900">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-slate-600 leading-7">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}