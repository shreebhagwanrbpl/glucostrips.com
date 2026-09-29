"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

import {
  FaFacebook,
  FaInstagram,
} from "react-icons/fa";

export default function Footer() {
  const [contactInfo, setContactInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [districtData, setDistrictData] = useState(null);
  const [servicesList, setServicesList] = useState([]);
  const [productCategories, setProductCategories] = useState([]);

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

  /* =====================================================
     LOAD CONTACT
  ===================================================== */

  useEffect(() => {
    fetch("/api/site-data?page=contact", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => setContactInfo(d?.contactInfo || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  /* =====================================================
     LOAD SERVICES DYNAMICALLY
  ===================================================== */

  useEffect(() => {
    fetch("/api/site-data?page=services", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => {
        if (d?.services && Array.isArray(d.services) && d.services.length > 0) {
          setServicesList(d.services);
        }
      })
      .catch(console.error);
  }, []);

  /* =====================================================
     LOAD PRODUCT CATEGORIES DYNAMICALLY (CATEGORIES ONLY)
  ===================================================== */

  useEffect(() => {
    fetch("/api/catalog", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => {
        const prods = d?.products || [];
        const catsMap = new Map();

        prods.forEach((p) => {
          if (p.category) {
            const catName = p.category.trim();
            catsMap.set(catName, (catsMap.get(catName) || 0) + 1);
          }
        });

        const items = Array.from(catsMap.keys()).map((name) => ({
          name,
          slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        }));

        if (items.length > 0) {
          setProductCategories(items);
        }
      })
      .catch(console.error);
  }, []);

  /* =====================================================
     LOAD DISTRICT
  ===================================================== */

  useEffect(() => {
    if (!district) return;
    fetch(`/api/site-data?page=district&district=${encodeURIComponent(district)}`, { cache: "no-store" })
      .then((r) => r.json())
      .then(setDistrictData)
      .catch(console.error);
  }, [district]);

  /* =====================================================
     CONTACT VALUE HELPER
  ===================================================== */

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

  /* =====================================================
     CONTACT DATA
  ===================================================== */

  const phone = getContactValue(
    "Phone",
    "Contact Mobile",
    "Mobile",
    "Mobile Number"
  );

  const email = getContactValue(
    "Email",
    "Work Email"
  );

  const address = getContactValue(
    "Address",
    "Office Address"
  );

  /* =====================================================
     MULTIPLE PHONE NUMBERS
  ===================================================== */

  const phoneNumbers = Array.isArray(phone)
    ? phone.filter(
      (number) =>
        number !== null &&
        number !== undefined &&
        String(number).trim() !== ""
    )
    : phone !== null &&
      phone !== undefined &&
      String(phone).trim() !== ""
      ? [phone]
      : [];

  /* =====================================================
     DISTRICT ADDRESS
  ===================================================== */

  const dynamicAddress = districtData
    ? `${districtData.district}, ${districtData.state}, India`
    : address;

  /* =====================================================
     ROUTING
  ===================================================== */

  const makeLink = (path) => {
    if (!district) {
      return path;
    }

    if (path === "/") {
      return `/${district}`;
    }

    return `/${district}${path}`;
  };

  /* =====================================================
     PHONE LINK
  ===================================================== */

  const makePhoneLink = (number) => {
    return String(number).replace(
      /[^\d+]/g,
      ""
    );
  };

  /* =====================================================
     LOADING
  ===================================================== */

  if (loading) {
    return (
      <footer className="border-t border-slate-200 bg-white">
        <div className="container-custom py-16">
          <div className="grid gap-10 lg:grid-cols-4 md:grid-cols-2">
            {[...Array(4)].map((_, i) => (
              <div key={i}>
                <div className="mb-6 h-8 w-40 animate-pulse rounded bg-slate-200" />
                {[...Array(5)].map((_, j) => (
                  <div
                    key={j}
                    className="mb-4 h-5 animate-pulse rounded bg-slate-200"
                  />
                ))}
              </div>
            ))}
          </div>

          <div className="mt-12 border-t border-slate-200 pt-6">
            <div className="h-5 w-72 animate-pulse rounded bg-slate-200" />
          </div>
        </div>
      </footer>
    );
  }

  /* =====================================================
     FOOTER
  ===================================================== */

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="container-custom py-16">
        <div className="grid gap-10 lg:grid-cols-5 md:grid-cols-2">
          {/* =================================================
              BRAND
          ================================================= */}

          <div>
            <h2 className="flex items-center text-2xl font-bold">
              <span className="bg-gradient-to-r from-indigo-600 to-fuchsia-600 bg-clip-text text-transparent">
                Raj
              </span>
              <span className="font-semibold text-slate-900">
                {" "}Biosis
              </span>
            </h2>

            <p className="mt-5 leading-7 text-slate-600">
              Delivering trusted diagnostic
              and biomedical solutions with
              innovation, quality, and
              precision healthcare support.
            </p>

            {/* Social Media */}
            <div className="mt-6 flex gap-4">
              {/* Facebook */}
              <a
                href="https://www.facebook.com/rajbiosispvtltd/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Raj Biosis Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-100 bg-slate-50 text-[#1877F2] shadow-sm transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:bg-blue-50 hover:shadow-md"
              >
                <FaFacebook size={18} />
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/rajbiosisindia/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Raj Biosis Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-100 bg-slate-50 text-[#E4405F] shadow-sm transition duration-200 hover:-translate-y-1 hover:border-pink-200 hover:bg-pink-50 hover:shadow-md"
              >
                <FaInstagram size={18} />
              </a>
            </div>
          </div>

          {/* =================================================
              QUICK LINKS
          ================================================= */}

          <div>
            <h3 className="mb-5 text-lg font-semibold text-slate-900">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3 font-medium text-slate-600">
              <Link
                href={makeLink("/")}
                className="transition-colors duration-200 hover:text-indigo-600"
              >
                Home
              </Link>

              <Link
                href={makeLink("/about")}
                className="transition-colors duration-200 hover:text-indigo-600"
              >
                About
              </Link>

              <Link
                href={makeLink("/services")}
                className="transition-colors duration-200 hover:text-indigo-600"
              >
                Services
              </Link>

              <Link
                href={makeLink("/items")}
                className="transition-colors duration-200 hover:text-indigo-600"
              >
                Products
              </Link>

              <Link
                href={makeLink("/contact")}
                className="transition-colors duration-200 hover:text-indigo-600"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* =================================================
              SERVICES
          ================================================= */}

          <div>
            <h3 className="mb-5 text-lg font-semibold text-slate-900">
              Services
            </h3>

            <div className="flex flex-col gap-3 font-medium text-slate-600">
              {servicesList.length > 0 ? (
                servicesList.slice(0, 5).map((service, index) => (
                  <Link
                    key={index}
                    href={makeLink("/services")}
                    className="transition-colors duration-200 hover:text-indigo-600 line-clamp-1"
                    title={service.title || service.name}
                  >
                    {service.title || service.name}
                  </Link>
                ))
              ) : (
                <>
                  <Link
                    href={makeLink("/services")}
                    className="transition-colors duration-200 hover:text-indigo-600"
                  >
                    Scheduled Maintenance & Calibration
                  </Link>

                  <Link
                    href={makeLink("/services")}
                    className="transition-colors duration-200 hover:text-indigo-600"
                  >
                    Lab Instrumentation Setup
                  </Link>

                  <Link
                    href={makeLink("/services")}
                    className="transition-colors duration-200 hover:text-indigo-600"
                  >
                    Reagent Distribution
                  </Link>

                  <Link
                    href={makeLink("/services")}
                    className="transition-colors duration-200 hover:text-indigo-600"
                  >
                    Technical Support & Repairs
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* =================================================
              PRODUCT CATEGORIES
          ================================================= */}

          <div>
            <h3 className="mb-5 text-lg font-semibold text-slate-900">
              Product Categories
            </h3>

            <div className="flex flex-col gap-3 font-medium text-slate-600">
              {productCategories.length > 0 ? (
                productCategories.slice(0, 8).map((cat, index) => (
                  <Link
                    key={index}
                    href={makeLink(`/items?category=${cat.slug}`)}
                    className="transition-colors duration-200 hover:text-indigo-600 line-clamp-1"
                    title={cat.name}
                  >
                    {cat.name}
                  </Link>
                ))
              ) : (
                <Link
                  href={makeLink("/items?category=test-strips")}
                  className="transition-colors duration-200 hover:text-indigo-600"
                >
                  Test Strips
                </Link>
              )}
            </div>
          </div>

          {/* =================================================
              CONTACT INFO
          ================================================= */}

          <div>
            <h3 className="mb-5 text-lg font-semibold text-slate-900">
              Contact Info
            </h3>

            <div className="space-y-4 font-medium text-slate-600">
              {/* ADDRESS */}
              <div className="flex items-start gap-3">
                <MapPin
                  size={18}
                  className="mt-1 shrink-0 text-indigo-600"
                />
                <p>
                  {dynamicAddress}
                </p>
              </div>

              {/* MULTIPLE PHONE NUMBERS */}
              <div className="flex items-start gap-3">
                <Phone
                  size={18}
                  className="mt-1 shrink-0 text-indigo-600"
                />
                <div className="flex flex-col gap-2">
                  {phoneNumbers.length > 0 ? (
                    phoneNumbers.map((number, index) => {
                      const phoneText = String(number);
                      return (
                        <a
                          key={`${phoneText}-${index}`}
                          href={`tel:${makePhoneLink(phoneText)}`}
                          className="transition-colors duration-200 hover:text-indigo-600"
                        >
                          {phoneText}
                        </a>
                      );
                    })
                  ) : (
                    <span>
                      Contact us
                    </span>
                  )}
                </div>
              </div>

              {/* EMAIL */}
              <div className="flex items-start gap-3">
                <Mail
                  size={18}
                  className="mt-1 shrink-0 text-indigo-600"
                />
                {email ? (
                  <a
                    href={`mailto:${email}`}
                    className="break-all transition-colors duration-200 hover:text-indigo-600"
                  >
                    {email}
                  </a>
                ) : (
                  <span>
                    Email us
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* =================================================
            BOTTOM
        ================================================= */}

        <div className="mt-12 flex flex-col items-center justify-between border-t border-slate-200 pt-6 text-sm text-slate-500 md:flex-row">
          <p>
            © 2026 Raj Biosis. All rights reserved.
          </p>

          <p className="mt-3 md:mt-0">
            Designed with precision for modern diagnostics.
          </p>
        </div>
      </div>
    </footer>
  );
}