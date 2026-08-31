"use client";

import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";

export default function Testimonials() {
  const reviews = [
    {
      name: "Dr. Rajesh Kumar",
      role: "Clinical Diagnostics Director",
      review:
        "Sourcing biochemistry analyzers and diagnostic kits in bulk has been seamless since we partnered with them.",
    },
    {
      name: "Amit Sharma",
      role: "Hospital Procurement Manager",
      review:
        "Excellent calibration and maintenance services. The diagnostic systems perform with high reliability.",
    },
    {
      name: "Neha Verma",
      role: "Purchasing Agent",
      review:
        "The laboratory reagents and bulk consumables arrived on time, in perfect temperature-controlled packaging.",
    }
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">

        <SectionTitle
          badge="Client Reviews"
          title="What Customers Say"
          description="Trusted by diagnostic networks, hospitals, and clinical laboratories across the country."
          center
        />

        <div className="grid lg:grid-cols-3 gap-8 mt-16">

          {reviews.map((item, index) => (
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
              className="bg-slate-50 rounded-[32px] p-8 border border-slate-100 card-shadow"
            >
              {/* Stars */}
              <div className="flex gap-1 text-yellow-400 text-xl mb-5">
                ★★★★★
              </div>

              {/* Review */}
              <p className="text-slate-600 leading-8 italic">
                "{item.review}"
              </p>

              {/* User */}
              <div className="mt-8">
                <h4 className="font-semibold text-lg">
                  {item.name}
                </h4>

                <p className="text-slate-500">
                  {item.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}