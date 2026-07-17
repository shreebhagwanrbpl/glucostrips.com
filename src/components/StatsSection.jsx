"use client";

import { motion } from "framer-motion";
import {
  Users,
  FlaskConical,
  BadgeCheck,
  Building2,
} from "lucide-react";

export default function StatsSection() {
  const stats = [
    {
      icon: <Building2 size={34} />,
      number: "10+",
      label: "Years Experience",
    },
    {
      icon: <FlaskConical size={34} />,
      number: "500+",
      label: "Biomedical Products",
    },
    {
      icon: <Users size={34} />,
      number: "200+",
      label: "Trusted Clients",
    },
    {
      icon: <BadgeCheck size={34} />,
      number: "100%",
      label: "Quality Assurance",
    },
  ];

  return (
    <section className="section-padding bg-slate-50/50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] bg-indigo-200/10 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[250px] h-[250px] bg-fuchsia-200/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="container-custom">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">

          {stats.map((item, index) => (
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
                duration: 0.6,
                delay: index * 0.12,
              }}
              viewport={{
                once: true,
              }}
              className="bg-white rounded-[32px] p-8 border border-slate-100 hover:border-indigo-100 hover:bg-gradient-to-b hover:from-white hover:to-slate-50/30 hover:-translate-y-2 hover:shadow-xl hover:shadow-indigo-50/50 transition-all duration-300 card-shadow text-center flex flex-col items-center justify-center"
            >
              {/* Icon */}
              <div className={`w-16 h-16 rounded-[20px] flex items-center justify-center mb-6 shadow-sm ${
                index % 2 === 0 
                  ? 'bg-gradient-to-br from-indigo-50 to-indigo-100/50 text-indigo-600 border border-indigo-100/40' 
                  : 'bg-gradient-to-br from-fuchsia-50 to-fuchsia-100/50 text-fuchsia-600 border border-fuchsia-100/40'
              }`}>
                {item.icon}
              </div>

              {/* Number */}
              <h3 className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 bg-clip-text text-transparent">
                {item.number}
              </h3>

              {/* Label */}
              <p className="mt-2.5 text-slate-500 font-medium text-[15px]">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}