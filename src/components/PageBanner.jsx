"use client";

import { motion } from "framer-motion";

export default function PageBanner({
  title,
  subtitle,
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50/50 via-white to-fuchsia-50/30 py-28 lg:py-36">

      {/* Background Blur */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-indigo-200/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-fuchsia-200/10 rounded-full blur-[100px]" />

      <div className="container-custom relative z-10">

        <motion.div
          initial={{
            opacity: 0,
            y: 50,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="text-center max-w-4xl mx-auto"
        >

          {/* Title */}
          <h1 className="text-5xl lg:text-7xl font-extrabold bg-gradient-to-r from-indigo-950 via-purple-950 to-slate-950 bg-clip-text text-transparent leading-tight pb-2">
            {title}
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-slate-600 text-lg leading-8 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </motion.div>
      </div>
    </section>
  );
}