"use client";

import { motion } from "framer-motion";
import {
  Microscope,
  FlaskConical,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";

import SectionTitle from "./SectionTitle";
import ServiceCard from "./ServiceCard";

export default function ServicesPreview() {
  const services = [
    {
      icon: <Microscope size={30} />,
      title: "Diagnostic Consumables",
      description:
        "Sourcing biochemistry reagents, diagnostic kits, and clinical consumables in bulk.",
    },
    {
      icon: <FlaskConical size={30} />,
      title: "Laboratory Equipment",
      description:
        "Supplying chemistry analyzers, hematology systems, and medical diagnostic instruments.",
    },
    {
      icon: <ShieldCheck size={30} />,
      title: "Compatibility Guidance",
      description:
        "Expert support to match compatible reagents, strips, and consumables with existing diagnostic setups.",
    },
    {
      icon: <Stethoscope size={30} />,
      title: "Quality Verification",
      description:
        "Sourcing fresh batches with long shelf-life documentation and batch tracking.",
    }
  ];

  return (
    <section className="section-padding bg-slate-50">
      <div className="container-custom">

        {/* Title */}
        <SectionTitle
          badge="Consumables & Supply Services"
          title="Diagnostic Technology & Laboratory Services"
          description="We help laboratories access modern diagnostic technologies, suitable laboratory systems, and dependable biomedical support."
          center
        />

        {/* Cards */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mt-16">

          {services.map(
            (service, index) => (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: 50,
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
              >
                <ServiceCard
                  icon={service.icon}
                  title={service.title}
                  description={
                    service.description
                  }
                />
              </motion.div>
            )
          )}
        </div>
      </div>
    </section>
  );
}