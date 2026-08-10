"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

import CBG from "../components/img/CBG.png";

import {
  ArrowRight,
  ShieldCheck,
  Microscope,
  BadgeCheck,
} from "lucide-react";

export default function HeroSection({ city }) {
  const [loading, setLoading] = useState(true);

  const [heroData, setHeroData] = useState({
    title: "",
    description: "",
    button1Text: "",
    button2Text: "",
  });

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const snap = await getDoc(
          doc(db, "websites", "glucostripscom", "pages", "home")
        );

        if (snap.exists()) {
          setHeroData(snap.data());
        }
      } catch (error) {
        console.error("Error fetching hero data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroData();
  }, []);

  // District Routing
  const districtSlug = city
    ? city.toLowerCase().replace(/\s+/g, "-")
    : "";

  const makeLink = (path) => {
    return districtSlug ? `/${districtSlug}${path}` : path;
  };

  return (
    <section className="relative overflow-hidden">
      {/* Decorative Blur Background Mesh */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-300/10 rounded-full blur-3xl" />
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-fuchsia-300/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-purple-300/10 rounded-full blur-3xl" />
      </div>

      <div className="container-custom min-h-[90vh] py-20 lg:py-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">

        {/* =========================================================
            LEFT CONTENT
        ========================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-7"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-50 to-fuchsia-50 border border-indigo-100/50 text-indigo-700 px-4.5 py-2 rounded-full text-sm font-semibold mb-8 shadow-sm">
            <ShieldCheck
              size={16}
              className="text-indigo-600 animate-pulse"
            />
            Trusted Biomedical Systems
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6.5xl font-extrabold leading-tight tracking-tight text-slate-900">
            {loading ? (
              <div className="animate-pulse space-y-4">
                <div className="h-12 bg-gray-200 rounded w-[85%]"></div>
                <div className="h-12 bg-gray-200 rounded w-[65%]"></div>
                <div className="h-12 bg-gray-200 rounded w-[75%]"></div>
              </div>
            ) : (
              <>
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
                  {heroData.title}
                </span>

                {city && (
                  <span className="text-2xl lg:text-4xl text-fuchsia-600 font-bold block mt-2">
                    in {city}
                  </span>
                )}
              </>
            )}
          </h1>

          {/* Description */}
          {loading ? (
            <div className="animate-pulse mt-7 space-y-3">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-[90%]"></div>
              <div className="h-4 bg-gray-200 rounded w-[75%]"></div>
            </div>
          ) : (
            <p className="mt-7 text-slate-600 text-lg leading-8 max-w-xl">
              {heroData.description}

              {city && (
                <>
                  {" "}across <strong>{city}</strong>
                </>
              )}
            </p>
          )}

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            {loading ? (
              <>
                <div className="animate-pulse h-12 w-44 bg-gray-200 rounded-lg"></div>
                <div className="animate-pulse h-12 w-36 bg-gray-200 rounded-lg"></div>
              </>
            ) : (
              <>
                <Link href={makeLink("/items")}>
                  <button className="primary-btn flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-fuchsia-600 hover:from-indigo-700 hover:to-fuchsia-700 text-white duration-300 shadow-lg shadow-indigo-600/15">
                    {heroData.button1Text || "Explore Products"}
                    <ArrowRight size={18} />
                  </button>
                </Link>

                <Link href={makeLink("/contact")}>
                  <button className="secondary-btn border border-indigo-200/80 text-indigo-700 hover:bg-indigo-50/50 hover:border-indigo-300 transition duration-300">
                    {heroData.button2Text || "Contact Us"}
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 mt-14 border-t border-slate-100 pt-8">

            <div>
              <h3 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-600 to-indigo-800 bg-clip-text text-transparent">
                10+
              </h3>

              <p className="text-slate-500 font-medium text-sm mt-1">
                Years Experience
              </p>
            </div>

            <div className="w-[1px] bg-slate-200/60 self-stretch my-1" />

            <div>
              <h3 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-600 to-indigo-800 bg-clip-text text-transparent">
                500+
              </h3>

              <p className="text-slate-500 font-medium text-sm mt-1">
                Products Delivered
              </p>
            </div>

            <div className="w-[1px] bg-slate-200/60 self-stretch my-1" />

            <div>
              <h3 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-600 to-indigo-800 bg-clip-text text-transparent">
                100%
              </h3>

              <p className="text-slate-500 font-medium text-sm mt-1">
                Quality Assurance
              </p>
            </div>

          </div>
        </motion.div>

        {/* =========================================================
            RIGHT SIDE IMAGE
        ========================================================= */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative lg:col-span-5 w-full flex justify-center items-center"
        >
          {/* Backdrop Glow behind image card */}
          <div className="absolute w-[110%] h-[110%] bg-gradient-to-tr from-indigo-500/10 to-fuchsia-500/10 rounded-[60px] blur-[60px] -z-10 pointer-events-none" />

          {/* Main Image Card */}
          <div className="glass-card relative w-full max-w-[620px] overflow-hidden rounded-[42px] border border-white/50 p-5 card-shadow">
            <Image
              src={CBG}
              alt="Raj Biosis"
              width={1400}
              height={1050}
              priority
              className="h-[390px] w-full rounded-[32px] object-contain sm:h-[480px] lg:h-[560px]"
            />
          </div>

          {/* Floating Card 1 */}
          <motion.div
            animate={{
              y: [0, -12, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-12 -left-8 bg-white/95 backdrop-blur-md p-5 rounded-2xl shadow-xl hidden lg:flex items-center gap-4 border border-slate-100/85"
            style={{ marginTop: "-27px" }}
          >
            <div className="bg-indigo-50 p-3 rounded-xl text-indigo-600">
              <Microscope size={20} />
            </div>

            <div>
              <h4 className="font-semibold text-slate-900 text-sm">
                Modern Labs
              </h4>

              <p className="text-xs text-slate-500">
                Precision Equipment
              </p>
            </div>
          </motion.div>

          {/* Floating Card 2 */}
          <motion.div
            animate={{
              y: [0, 12, 0],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-12 -right-8 bg-white/95 backdrop-blur-md p-5 rounded-2xl shadow-xl hidden lg:flex items-center gap-4 border border-slate-100/85"
          >
            <div className="bg-fuchsia-50 p-3 rounded-xl text-fuchsia-600">
              <BadgeCheck size={20} />
            </div>

            <div>
              <h4 className="font-semibold text-slate-900 text-sm">
                Trusted Quality
              </h4>

              <p className="text-xs text-slate-500">
                Certified Solutions
              </p>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}