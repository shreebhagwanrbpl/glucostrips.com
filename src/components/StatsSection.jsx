"use client";

import { motion } from "framer-motion";
import { TestTubes, Gauge, PackageCheck, Network } from "lucide-react";

export default function StatsSection() {
  const snapshots = [
    { icon: <TestTubes size={34} />, value: "IVD", label: "Kits, reagents & routine diagnostics" },
    { icon: <Gauge size={34} />, value: "Lab", label: "Analyzers, instruments & accessories" },
    { icon: <PackageCheck size={34} />, value: "Bulk", label: "Institutional and repeat supply planning" },
    { icon: <Network size={34} />, value: "B2B", label: "Hospitals, labs, dealers & healthcare buyers" },
  ];

  return (
    <section className="section-padding bg-slate-50/50 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] bg-indigo-200/10 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[250px] h-[250px] bg-fuchsia-200/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="container-custom">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {snapshots.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              viewport={{ once: true }}
              className="bg-white rounded-[32px] p-8 border border-slate-100 hover:border-indigo-100 hover:-translate-y-2 hover:shadow-xl hover:shadow-indigo-50/50 transition-all duration-300 card-shadow text-center flex flex-col items-center justify-center"
            >
              <div className={`w-16 h-16 rounded-[20px] flex items-center justify-center mb-6 shadow-sm ${index % 2 === 0 ? "bg-indigo-50 text-indigo-600 border border-indigo-100/40" : "bg-fuchsia-50 text-fuchsia-600 border border-fuchsia-100/40"}`}>
                {item.icon}
              </div>
              <h3 className="text-3xl lg:text-4xl font-extrabold text-slate-900">{item.value}</h3>
              <p className="mt-2.5 text-slate-500 font-medium text-[15px]">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
