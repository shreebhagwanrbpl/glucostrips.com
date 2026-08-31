"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import {
  doc,
  getDoc,
  addDoc,
  collection,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import toast from "react-hot-toast";

import {
  Mail,
  Phone,
  MapPin,
  Clock3,
} from "lucide-react";

import PageBanner from "@/components/PageBanner";
import CTASection from "@/components/CTASection";

export default function ContactClient({
  initialContactInfo = [],
}) {
  const [districtData, setDistrictData] =
    useState(null);

  const [contactInfo, setContactInfo] =
    useState(
      Array.isArray(initialContactInfo)
        ? initialContactInfo
        : []
    );

  const [submitting, setSubmitting] =
    useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

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

  const currentDistrict =
    pathParts.length > 0 &&
      !staticRoutes.includes(pathParts[0])
      ? pathParts[0]
      : null;

  /* =====================================================
LOAD CONTACT INFORMATION
===================================================== */

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
          const data = snap.data();

          setContactInfo(
            Array.isArray(data.contactInfo)
              ? data.contactInfo
              : []
          );
        }
      } catch (err) {
        console.error(
          "Error loading contact information:",
          err
        );
      }
    };

    loadContact();
  }, []);
  /* =====================================================
     FORM CHANGE
  ===================================================== */

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  /* =====================================================
     FORM SUBMIT
  ===================================================== */

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const phoneRegex =
      /^[6-9]\d{9}$/;

    if (!form.name.trim()) {
      return toast.error(
        "Name is required"
      );
    }

    if (!emailRegex.test(form.email)) {
      return toast.error(
        "Enter valid email"
      );
    }

    if (!phoneRegex.test(form.phone)) {
      return toast.error(
        "Enter valid mobile number"
      );
    }

    if (!form.message.trim()) {
      return toast.error(
        "Message is required"
      );
    }

    try {
      setSubmitting(true);

      await addDoc(
        collection(
          db,
          "websitesQueries",
          "glucostripscom",
          "contactQueries"
        ),
        {
          ...form,
          district:
            currentDistrict || "India",
          createdAt: new Date(),
        }
      );

      toast.success(
        "Message submitted successfully"
      );

      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      console.error(err);

      toast.error(
        "Something went wrong"
      );
    } finally {
      setSubmitting(false);
    }
  };

  /* =====================================================
     LOAD DISTRICT
  ===================================================== */

  useEffect(() => {
    const loadDistrict = async () => {
      if (!currentDistrict) {
        setDistrictData(null);
        return;
      }

      try {
        const snap = await getDoc(
          doc(
            db,
            "websites",
            "glucostripscom",
            "districts",
            currentDistrict
          )
        );

        if (snap.exists()) {
          setDistrictData(
            snap.data()
          );
        }
      } catch (err) {
        console.log(err);
      }
    };

    loadDistrict();
  }, [currentDistrict]);

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

  const workingHours = getContactValue(
    "Working Hours",
    "Business Hours",
    "Opening Hours"
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
     PHONE LINK HELPER
  ===================================================== */

  const makePhoneLink = (number) => {
    return String(number).replace(
      /[^\d+]/g,
      ""
    );
  };

  /* =====================================================
     DISTRICT ADDRESS
  ===================================================== */

  const dynamicAddress = districtData
    ? `${districtData.district}, ${districtData.state}, India`
    : address;

  const mapAddress = encodeURIComponent(
    dynamicAddress || ""
  );

  return (
    <>
      {/* =====================================================
          BANNER
      ===================================================== */}

      {/* =====================================================
    CONTACT HERO BANNER
===================================================== */}

      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-fuchsia-50">

        {/* Background Glow */}

        <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-indigo-300/20 blur-[110px]" />

        <div className="pointer-events-none absolute -right-32 top-0 h-80 w-80 rounded-full bg-fuchsia-300/20 blur-[120px]" />

        <div className="pointer-events-none absolute bottom-0 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-sky-300/10 blur-[100px]" />

        <div className="container-custom relative py-20 lg:py-24">

          {/* Main Banner Content */}

          <div className="mx-auto max-w-4xl text-center">

            <span className="inline-flex items-center rounded-full border border-indigo-200 bg-white/80 px-5 py-2 text-xs font-bold uppercase tracking-[0.18em] text-indigo-700 shadow-sm backdrop-blur-md">
              Raj Biosis Support
            </span>

            <h1 className="mt-6 text-4xl font-extrabold leading-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Contact Us
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              Speak with our consumables desk for premium
              diagnostic and biomedical solutions.
            </p>

            <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-slate-500 sm:text-base">
              Our team can help you with product enquiries,
              equipment requirements, technical guidance,
              and business-related assistance.
            </p>

          </div>

          {/* =================================================
        SUPPORT HIGHLIGHTS
    ================================================= */}

          <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-3">

            {/* Expert Guidance */}

            <div className="rounded-2xl border border-indigo-100 bg-white/80 px-5 py-5 text-center shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <span className="text-lg font-bold">
                  ✓
                </span>
              </div>

              <h3 className="mt-3 font-bold text-slate-900">
                Expert Guidance
              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                Get assistance in choosing suitable equipment.
              </p>

            </div>

            {/* Quick Response */}

            <div className="rounded-2xl border border-sky-100 bg-white/80 px-5 py-5 text-center shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                <span className="text-lg font-bold">
                  ↗
                </span>
              </div>

              <h3 className="mt-3 font-bold text-slate-900">
                Quick Response
              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                Share your requirement and connect with our team.
              </p>

            </div>

            {/* Complete Solutions */}

            <div className="rounded-2xl border border-fuchsia-100 bg-white/80 px-5 py-5 text-center shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-fuchsia-50 text-fuchsia-600">
                <span className="text-lg font-bold">
                  +
                </span>
              </div>

              <h3 className="mt-3 font-bold text-slate-900">
                Complete Solutions
              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                Explore solutions for diagnostic and laboratory needs.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          CONTACT SECTION
      ===================================================== */}

      <section className="section-padding bg-white">

        <div className="container-custom grid lg:grid-cols-2 gap-14">

          {/* =================================================
              LEFT INFO
          ================================================= */}

          <div>

            <span className="inline-block bg-indigo-50 border border-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-5 shadow-sm">
              Contact Information
            </span>

            <h2 className="section-title">
              Let’s Start a Conversation
            </h2>

            <p className="section-subtitle">
              Reach out to us for healthcare
              consultation, biomedical products,
              and advanced diagnostic support.
            </p>

            {/* =================================================
                CONTACT CARDS
            ================================================= */}

            <div className="space-y-6 mt-10">

              {/* PHONE */}

              <div className="flex items-start gap-5 bg-slate-50 p-6 rounded-[28px] border border-slate-100 hover:border-indigo-100 hover:bg-white hover:shadow-md transition-all duration-300">

                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100/50 border border-indigo-100/50 flex items-center justify-center text-indigo-600 flex-shrink-0 shadow-sm">

                  <Phone size={22} />

                </div>

                <div className="min-w-0">

                  <h4 className="font-semibold text-lg text-slate-905">
                    Contact Mobile
                  </h4>

                  <div className="mt-2 flex flex-col gap-2">

                    {phoneNumbers.length > 0 ? (

                      phoneNumbers.map(
                        (number, index) => {

                          const phoneText =
                            String(number);

                          return (
                            <a
                              key={`${phoneText}-${index}`}
                              href={`tel:${makePhoneLink(
                                phoneText
                              )}`}
                              className="block text-slate-600 hover:text-indigo-600 transition"
                            >
                              {phoneText}
                            </a>
                          );
                        }
                      )

                    ) : (

                      <span className="text-slate-500">
                        Contact us
                      </span>

                    )}

                  </div>

                </div>

              </div>

              {/* EMAIL */}

              <div className="flex items-start gap-5 bg-slate-50 p-6 rounded-[28px] border border-slate-100 hover:border-indigo-100 hover:bg-white hover:shadow-md transition-all duration-300">

                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100/50 border border-indigo-100/50 flex items-center justify-center text-indigo-600 flex-shrink-0 shadow-sm">

                  <Mail size={22} />

                </div>

                <div className="min-w-0">

                  <h4 className="font-semibold text-lg text-slate-905">
                    Work Email
                  </h4>

                  <a
                    href={
                      email
                        ? `mailto:${email}`
                        : "#"
                    }
                    className="text-slate-600 mt-2 hover:text-indigo-600 transition block break-all"
                  >
                    {email || "Email us"}
                  </a>

                </div>

              </div>

              {/* ADDRESS */}

              <div className="flex items-start gap-5 bg-slate-50 p-6 rounded-[28px] border border-slate-100 hover:border-indigo-100 hover:bg-white hover:shadow-md transition-all duration-300">

                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100/50 border border-indigo-100/50 flex items-center justify-center text-indigo-600 flex-shrink-0 shadow-sm">

                  <MapPin size={22} />

                </div>

                <div className="min-w-0">

                  <h4 className="font-semibold text-lg text-slate-905">
                    Office Address
                  </h4>

                  <p className="text-slate-600 mt-2">
                    {dynamicAddress}
                  </p>

                </div>

              </div>

              {/* WORKING HOURS */}

              <div className="flex items-start gap-5 bg-slate-50 p-6 rounded-[28px] border border-slate-100 hover:border-indigo-100 hover:bg-white hover:shadow-md transition-all duration-300">

                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100/50 border border-indigo-100/50 flex items-center justify-center text-indigo-600 flex-shrink-0 shadow-sm">

                  <Clock3 size={22} />

                </div>

                <div className="min-w-0">

                  <h4 className="font-semibold text-lg text-slate-905">
                    Working Hours
                  </h4>

                  <p className="text-slate-600 mt-2">
                    {workingHours ||
                      "Please contact us"}
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* =================================================
              RIGHT FORM
          ================================================= */}

          <div className="bg-white rounded-[40px] p-8 lg:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">

            <h3 className="text-3xl font-bold text-slate-900">
              Request Product Assistance
            </h3>

            <p className="text-slate-500 mt-3">
              Fill out the form and our team
              will contact you soon.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
            >

              {/* NAME */}

              <input
                type="text"
                name="name"
                placeholder="Contact Name"
                value={form.name}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded-2xl px-5 py-4 outline-none focus:border-indigo-650 focus:ring-1 focus:ring-indigo-650 transition"
              />

              {/* EMAIL */}

              <input
                type="email"
                name="email"
                placeholder="Work Email"
                value={form.email}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded-2xl px-5 py-4 outline-none focus:border-indigo-650 focus:ring-1 focus:ring-indigo-650 transition"
              />

              {/* CUSTOMER PHONE */}

              <input
                type="tel"
                name="phone"
                placeholder="Phone/WhatsApp Number"
                maxLength={10}
                value={form.phone}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    phone: e.target.value.replace(
                      /\D/g,
                      ""
                    ),
                  }))
                }
                className="w-full border border-slate-200 rounded-2xl px-5 py-4 outline-none focus:border-indigo-650 focus:ring-1 focus:ring-indigo-650 transition"
              />

              {/* SUBJECT */}

              <input
                type="text"
                name="subject"
                placeholder="Enquiry Subject"
                value={form.subject}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded-2xl px-5 py-4 outline-none focus:border-indigo-650 focus:ring-1 focus:ring-indigo-650 transition"
              />

              {/* MESSAGE */}

              <textarea
                rows={5}
                name="message"
                placeholder="Share your requirement"
                value={form.message}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded-2xl px-5 py-4 outline-none focus:border-indigo-650 focus:ring-1 focus:ring-indigo-650 transition resize-none"
              />

              {/* SUBMIT */}

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-gradient-to-r from-indigo-600 to-fuchsia-600 hover:from-indigo-700 hover:to-fuchsia-700 text-white py-4 rounded-2xl font-semibold transition shadow-lg shadow-indigo-600/20 hover:scale-[1.01] disabled:opacity-50 !text-white"
              >
                {submitting
                  ? "Submitting..."
                  : "Send Message"}
              </button>

            </form>

          </div>

        </div>

      </section>

      {/* =====================================================
          GOOGLE MAP
      ===================================================== */}

      <section className="pb-24 bg-white">

        <div className="container-custom">

          <div className="rounded-[40px] overflow-hidden border border-slate-100 card-shadow">

            <iframe
              src={`https://maps.google.com/maps?q=${mapAddress}&z=13&output=embed`}
              width="100%"
              height="500"
              loading="lazy"
              className="border-0 w-full"
            />

          </div>

        </div>

      </section>

      {/* =====================================================
          CTA
      ===================================================== */}

      <CTASection />

    </>
  );
}