"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  PhoneCall,
} from "lucide-react";
import { fetchContactData } from "@/lib/data-fetcher";

export default function CTASection({ city }) {
  const [contactInfo, setContactInfo] = useState([]);

  useEffect(() => {
    const loadContact = async () => {
      try {
        const data = await fetchContactData();
        if (data && Array.isArray(data.contactInfo)) {
          setContactInfo(data.contactInfo);
        }
      } catch (err) {
        console.error("Error loading contact in CTASection:", err);
      }
    };
    loadContact();
  }, []);

  const getContactValue = (...labels) => {
    const item = contactInfo.find((x) =>
      labels.some(
        (label) =>
          String(x.label || "")
            .trim()
            .toLowerCase() ===
          label.trim().toLowerCase()
      )
    );
    return item?.value || "";
  };

  const phone = getContactValue(
    "Phone",
    "Contact Mobile",
    "Mobile",
    "Mobile Number"
  );

  const phoneNumbers = Array.isArray(phone)
    ? phone.filter(
        (num) =>
          num !== null &&
          num !== undefined &&
          String(num).trim() !== ""
      )
    : phone !== null &&
      phone !== undefined &&
      String(phone).trim() !== ""
      ? [phone]
      : ["+91 9983123469"];

  const pathname = usePathname();

  const staticRoutes = [
    "about",
    "services",
    "products",
    "contact",
    "items",
    "enquiry",
  ];

  const pathParts = pathname
    .split("/")
    .filter(Boolean);

  const urlDistrict =
    pathParts.length > 0 &&
      !staticRoutes.includes(pathParts[0])
      ? pathParts[0]
      : "";

  const districtSlug = city
    ? city.toLowerCase().replace(/\s+/g, "-")
    : urlDistrict;

  const makeLink = (path) => {
    if (!districtSlug) return path;

    if (path === "/") {
      return `/${districtSlug}`;
    }

    return `/${districtSlug}${path}`;
  };

  return (
    <section className="section-padding bg-slate-50">
      <div className="container-custom">

        <motion.div
          initial={{
            opacity: 0,
            y: 50,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          viewport={{
            once: true,
          }}
          className="relative overflow-hidden rounded-[42px] bg-gradient-to-tr from-indigo-950 via-purple-900 to-fuchsia-800 p-10 lg:p-20 text-white"
        >

          <div className="absolute top-0 left-0 w-80 h-80 bg-fuchsia-500/20 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center">

            <div>
              <span className="inline-block bg-white/10 border border-white/20 px-5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-5">
                Get In Touch
              </span>

              <h2 className="text-4xl lg:text-6xl font-extrabold leading-tight">Need Bulk Diagnostic & Medical Supplies?</h2>

              <p className="mt-6 text-white/70 text-lg leading-8 max-w-xl">Source high-quality diagnostic kits, laboratory equipment, and medical consumables for your healthcare facility or business.</p>
            </div>

            <div className="flex lg:justify-end">
              <div className="bg-white/95 backdrop-blur-md text-slate-900 rounded-[32px] p-8 max-w-md w-full shadow-2xl border border-white/20">

                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100/50 border border-indigo-100/50 text-indigo-700 flex items-center justify-center mb-6">
                  <PhoneCall size={26} />
                </div>

                <h3 className="text-2xl font-bold text-slate-950">
                  Let’s Talk
                </h3>

                <p className="mt-3 text-slate-600 leading-7">
                  Contact our medical supply experts to secure high-quality equipment, diagnostic kits, and medical consumables in bulk.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mt-8">

                  <Link
                    href={makeLink("/contact")}
                    className="flex-1"
                  >
                    <button className="w-full bg-gradient-to-r from-indigo-600 to-fuchsia-600 hover:from-indigo-700 hover:to-fuchsia-700 text-white px-6 py-4 rounded-2xl font-semibold transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 hover:scale-[1.02] !text-white">
                      Contact Us
                      <ArrowRight size={18} />
                    </button>
                  </Link>

                  {phoneNumbers.map((number, index) => {
                    const cleanNum = String(number).trim();
                    const linkNum = cleanNum.replace(/[^\d+]/g, "");
                    return (
                      <a
                        key={`${cleanNum}-${index}`}
                        href={`tel:${linkNum}`}
                        className="border border-slate-200 px-6 py-4 rounded-2xl font-semibold hover:bg-slate-50 transition text-center text-slate-700 hover:text-indigo-650 hover:border-indigo-200 flex-1"
                      >
                        {phoneNumbers.length > 1 ? `Call: ${cleanNum}` : "Call Now"}
                      </a>
                    );
                  })}

                </div>

              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}