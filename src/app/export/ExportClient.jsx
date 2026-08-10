"use client";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";
import toast from "react-hot-toast";
import { 
  Globe, 
  Shield, 
  Truck, 
  Award, 
  Briefcase, 
  FileText, 
  MessageSquare,
  Building,
  User,
  Mail,
  Phone,
  Layers
} from "lucide-react";
import PageBanner from "@/components/PageBanner";
import CTASection from "@/components/CTASection";

export default function ExportClient() {
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    country: "",
    productInterest: "",
    quantity: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.name.trim()) return toast.error("Full Name is required");
    if (!form.company.trim()) return toast.error("Company Name is required");
    if (!form.country.trim()) return toast.error("Country is required");
    if (!emailRegex.test(form.email)) return toast.error("Enter a valid email address");
    if (!form.phone.trim()) return toast.error("Phone number is required");

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
          queryType: "B2B Export Inquiry",
          createdAt: new Date(),
        }
      );

      toast.success("Export enquiry submitted successfully! Our export team will contact you within 24 hours.");
      
      setForm({
        name: "",
        email: "",
        phone: "",
        company: "",
        country: "",
        productInterest: "",
        quantity: "",
        message: "",
      });
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const capabilities = [
    {
      icon: <Globe className="text-indigo-600" size={32} />,
      title: "Global Supply Chain",
      desc: "Proven logistics capability to ship temperature-sensitive diagnostic kits, test strips, and laboratory analyzers globally with complete temperature-controlled packaging."
    },
    {
      icon: <Briefcase className="text-indigo-600" size={32} />,
      title: "OEM & Private Label Services",
      desc: "Tailored manufacturing support for international brands. Customize medical devices, reagents, packaging, and branding under strict ISO-compliant guidelines."
    },
    {
      icon: <Shield className="text-indigo-600" size={32} />,
      title: "Regulatory Compliance & Documentation",
      desc: "Complete documentation support including Certificate of Origin, Free Sale Certificates (FSC), MSDS, and quality compliance certificates required for global custom clearance."
    },
    {
      icon: <Award className="text-indigo-600" size={32} />,
      title: "Certified Manufacturing Quality",
      desc: "All instruments and diagnostic reagents are manufactured in state-of-the-art facilities following strict quality control norms to match international performance standards."
    }
  ];

  return (
    <>
      <PageBanner
        title="Global B2B Export & OEM Supply"
        subtitle="Your trusted Indian partner for bulk biomedical supply, diagnostic kits, and custom OEM manufacturing."
      />

      {/* Info Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block bg-indigo-50 border border-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-5">
                Export Services
              </span>
              <h2 className="text-4xl font-extrabold text-slate-900 leading-tight">
                Partner with a Leading Indian Diagnostic Manufacturer
              </h2>
              <p className="mt-6 text-slate-600 leading-8">
                Raj Biosis provides seamless export solutions for medical diagnostic laboratories, 
                hospitals, NGO healthcare tenders, and private label partners across international markets. 
                We specialize in supplying high-precision hematology systems, biochemistry analyzers, 
                urine test strips, and custom clinical setups.
              </p>
              <p className="mt-4 text-slate-600 leading-8">
                Whether you are a local medical distributor seeking regular supply, an importer looking for competitive 
                bulk pricing, or a brand requiring contract OEM manufacturing, we support your commercial needs factually and reliably.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-6">
              {capabilities.map((cap, i) => (
                <div key={i} className="bg-slate-50 border border-slate-100 rounded-3xl p-6 hover:shadow-xl transition-all duration-300">
                  <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-5 border border-indigo-100">
                    {cap.icon}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{cap.title}</h3>
                  <p className="text-slate-500 text-sm mt-3 leading-6">{cap.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* B2B Form Section */}
      <section className="section-padding bg-slate-50">
        <div className="container-custom grid lg:grid-cols-[1fr_520px] gap-16 items-start">
          <div>
            <span className="inline-block bg-indigo-50 border border-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-5">
              Trade Enquiry
            </span>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900">
              Become an Authorized Distributor or OEM Partner
            </h2>
            <p className="text-slate-600 mt-5 leading-8">
              We look forward to collaborating with distributors, diagnostics importers, and healthcare networks. 
              Fill out our B2B Export Enquiry form to request:
            </p>
            <ul className="mt-8 space-y-4 text-slate-600">
              <li className="flex items-center gap-3 font-medium">
                <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold">✓</span>
                Bulk FOB/CIF pricing lists
              </li>
              <li className="flex items-center gap-3 font-medium">
                <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold">✓</span>
                OEM packaging templates and customization terms
              </li>
              <li className="flex items-center gap-3 font-medium">
                <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold">✓</span>
                Regulatory support documents & technical brochures
              </li>
              <li className="flex items-center gap-3 font-medium">
                <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold">✓</span>
                Distributor agreement templates
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-[40px] p-8 lg:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.06)] border border-slate-100">
            <h3 className="text-2xl font-bold text-slate-900">Request Export Pricing</h3>
            <p className="text-slate-500 text-sm mt-2">Submit your trade requirements below</p>
            
            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <div className="relative">
                <User size={18} className="absolute left-4 top-4 text-slate-400" />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name *"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3.5 border border-slate-200 rounded-2xl outline-none focus:border-indigo-600 text-slate-800 text-sm"
                  required
                />
              </div>

              <div className="relative">
                <Building size={18} className="absolute left-4 top-4 text-slate-400" />
                <input
                  type="text"
                  name="company"
                  placeholder="Company Name *"
                  value={form.company}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3.5 border border-slate-200 rounded-2xl outline-none focus:border-indigo-600 text-slate-800 text-sm"
                  required
                />
              </div>

              <div className="relative">
                <Globe size={18} className="absolute left-4 top-4 text-slate-400" />
                <input
                  type="text"
                  name="country"
                  placeholder="Target Country *"
                  value={form.country}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3.5 border border-slate-200 rounded-2xl outline-none focus:border-indigo-600 text-slate-800 text-sm"
                  required
                />
              </div>

              <div className="relative">
                <Mail size={18} className="absolute left-4 top-4 text-slate-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="Business Email *"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3.5 border border-slate-200 rounded-2xl outline-none focus:border-indigo-600 text-slate-800 text-sm"
                  required
                />
              </div>

              <div className="relative">
                <Phone size={18} className="absolute left-4 top-4 text-slate-400" />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone / WhatsApp Number *"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3.5 border border-slate-200 rounded-2xl outline-none focus:border-indigo-600 text-slate-800 text-sm"
                  required
                />
              </div>

              <div className="relative">
                <Layers size={18} className="absolute left-4 top-4 text-slate-400" />
                <input
                  type="text"
                  name="productInterest"
                  placeholder="Products of Interest (e.g., Urine Strips, Analyzers)"
                  value={form.productInterest}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3.5 border border-slate-200 rounded-2xl outline-none focus:border-indigo-600 text-slate-800 text-sm"
                />
              </div>

              <div className="relative">
                <FileText size={18} className="absolute left-4 top-4 text-slate-400" />
                <input
                  type="text"
                  name="quantity"
                  placeholder="Estimated Order Volume / Frequency"
                  value={form.quantity}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3.5 border border-slate-200 rounded-2xl outline-none focus:border-indigo-600 text-slate-800 text-sm"
                />
              </div>

              <div className="relative">
                <MessageSquare size={18} className="absolute left-4 top-4 text-slate-400" />
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Detailed Requirements or OEM Spec Details..."
                  value={form.message}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3.5 border border-slate-200 rounded-2xl outline-none focus:border-indigo-600 text-slate-800 text-sm resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-gradient-to-r from-indigo-600 to-fuchsia-600 hover:from-indigo-700 hover:to-fuchsia-700 text-white py-4 rounded-2xl font-semibold transition shadow-lg shadow-indigo-600/20 hover:scale-[1.01] disabled:opacity-50 !text-white"
              >
                {submitting ? "Sending Trade Request..." : "Request Call Back"}
              </button>
            </form>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
