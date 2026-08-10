"use client";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { FaFacebook, FaInstagram } from "react-icons/fa";

export default function Footer() {
  const [contactInfo, setContactInfo] =
    useState([]);
  const [loading, setLoading] = useState(true);
  const [districtData, setDistrictData] =
    useState(null);

  const pathname = usePathname();

  const pathParts = pathname
    .split("/")
    .filter(Boolean);

  const staticRoutes = [
    "about",
    "services",
    "products",
    "contact",
    "items",
  ];

  const district =
    pathParts.length > 0 &&
      !staticRoutes.includes(pathParts[0])
      ? pathParts[0]
      : "";

  useEffect(() => {
    const loadContact = async () => {
      try {
        const snap = await getDoc(
          doc(
            db,
            "websites",
            "glucostripscom",
            "pages",
            "contact"
          )
        );

        if (snap.exists()) {
          setContactInfo(
            snap.data().contactInfo || []
          );
        }

        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    loadContact();
  }, []);

  useEffect(() => {
    const loadDistrict = async () => {
      if (!district) return;

      try {
        const snap = await getDoc(
          doc(
            db,
            "websites",
            "glucostripscom",
            "districts",
            district
          )
        );

        if (snap.exists()) {
          setDistrictData(snap.data());
        }
      } catch (err) {
        console.log(err);
      }
    };

    loadDistrict();
  }, [district]);



  const getContactValue = (...labels) => {
    const item = contactInfo.find((x) =>
      labels.some(
        (label) =>
          String(x.label || "").trim().toLowerCase() ===
          label.trim().toLowerCase()
      )
    );

    return item?.value || "";
  };

  const phone = getContactValue(
    "Phone",
    "Phone Number",
    "Mobile",
    "Mobile Number"
  );

  const email = getContactValue(
    "Email",
    "Email Address"
  );

  const address = getContactValue(
    "Address",
    "Office Address"
  );

  const workingHours = getContactValue(
    "Working Hours",
    "Business Hours",
    "Opening Hours"
  );

  const dynamicAddress = districtData
    ? `${districtData.district}, ${districtData.state}, India`
    : address;
  const makeLink = (path) => {
    if (!district) return path;

    if (path === "/") {
      return `/${district}`;
    }

    return `/${district}${path}`;
  };
  if (loading) {
    return (
      <footer className="bg-white border-t border-slate-200">
        <div className="container-custom py-16">

          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-10">

            {[...Array(4)].map((_, i) => (
              <div key={i}>
                <div className="h-8 w-40 bg-slate-200 rounded animate-pulse mb-6" />

                {[...Array(5)].map((_, j) => (
                  <div
                    key={j}
                    className="h-5 bg-slate-200 rounded animate-pulse mb-4"
                  />
                ))}
              </div>
            ))}

          </div>

          <div className="border-t border-slate-200 mt-12 pt-6">
            <div className="h-5 w-72 bg-slate-200 rounded animate-pulse" />
          </div>

        </div>
      </footer>
    );
  }
  return (
    <footer className="bg-white border-t border-slate-200">
      <div className="container-custom py-16">

        <div className="grid lg:grid-cols-5 md:grid-cols-2 gap-10">

          <div>
            <h2 className="text-2xl font-bold flex items-center">
              <span className="bg-gradient-to-r from-indigo-600 to-fuchsia-600 bg-clip-text text-transparent">
                Raj
              </span>
              <span className="text-slate-900 font-semibold">
                {" "}Biosis
              </span>
            </h2>

            <p className="mt-5 text-slate-600 leading-7">
              Delivering trusted diagnostic
              and biomedical solutions with
              innovation, quality, and
              precision healthcare support.
            </p>

            <div className="flex gap-4 mt-6">
              <a
                href="https://www.facebook.com/rajbiosispvtltd/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600 hover:text-indigo-650 hover:border-indigo-200 hover:bg-white hover:shadow-md transition duration-200 shadow-sm"
              >
                <FaFacebook size={18} />
              </a>
              <a
                href="https://www.instagram.com/rajbiosisindia/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600 hover:text-indigo-650 hover:border-indigo-200 hover:bg-white hover:shadow-md transition duration-200 shadow-sm"
              >
                <FaInstagram size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-5">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3 text-slate-600 font-medium">

              <Link href={makeLink("/")} className="hover:text-indigo-600 transition-colors duration-200">
                Home
              </Link>

              <Link href={makeLink("/about")} className="hover:text-indigo-600 transition-colors duration-200">
                About
              </Link>

              <Link href={makeLink("/services")} className="hover:text-indigo-600 transition-colors duration-200">
                Services
              </Link>

              <Link href={makeLink("/items")} className="hover:text-indigo-600 transition-colors duration-200">
                Products
              </Link>

              {/* <Link href="/export" className="hover:text-indigo-600 transition-colors duration-200">
                B2B Export
              </Link>

              <Link href="/export/africa" className="hover:text-indigo-600 transition-colors duration-200">
                Export to Africa
              </Link>

              <Link href="/export/middle-east" className="hover:text-indigo-600 transition-colors duration-200">
                Export to Middle East
              </Link> */}

              <Link href={makeLink("/contact")} className="hover:text-indigo-600 transition-colors duration-200">
                Contact
              </Link>

            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-5">
              Services
            </h3>

            <div className="flex flex-col gap-3 text-slate-600">
              <p>Diagnostic Equipment</p>
              <p>Laboratory Solutions</p>
              <p>Biomedical Instruments</p>
              <p>Maintenance Support</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-5">
              Product Categories
            </h3>

            <div className="flex flex-col gap-3 text-slate-600 font-medium">
              <Link href={makeLink("/items?category=biochemistry-analyzer")} className="hover:text-indigo-600 transition-colors duration-200">
                Biochemistry Analyzers
              </Link>
              <Link href={makeLink("/items?category=hematology-analyzers")} className="hover:text-indigo-600 transition-colors duration-200">
                Hematology Analyzers
              </Link>
              <Link href={makeLink("/items?category=blood-bank-equipments")} className="hover:text-indigo-600 transition-colors duration-200">
                Blood Bank Equipments
              </Link>
              <Link href={makeLink("/items?category=blood-collection-tubes")} className="hover:text-indigo-600 transition-colors duration-200">
                Blood Collection Tubes
              </Link>
              <Link href={makeLink("/items?category=rapid-test-kit")} className="hover:text-indigo-600 transition-colors duration-200">
                Rapid Test Kits
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-5">
              Contact Info
            </h3>

            <div className="space-y-4 text-slate-600 font-medium">

              <div className="flex items-start gap-3">
                <MapPin
                  size={18}
                  className="mt-1 text-indigo-600"
                />
                <p>{dynamicAddress}</p>
              </div>

              <div className="flex items-center gap-3">
                <Phone
                  size={18}
                  className="text-indigo-600"
                />
                <a href={`tel:+91${phone}`} className="hover:text-indigo-600 transition">
                  {phone}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail
                  size={18}
                  className="text-indigo-600"
                />
                <a href={`mailto:${email}`} className="hover:text-indigo-600 transition">
                  {email}
                </a>
              </div>

            </div>
          </div>

        </div>

        <div className="border-t border-slate-200 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">

          <p>
            © 2026 Raj Biosis.
            All rights reserved.
          </p>

          <p className="mt-3 md:mt-0">
            Designed with precision for
            modern diagnostics.
          </p>

        </div>

      </div>
    </footer>
  );
}