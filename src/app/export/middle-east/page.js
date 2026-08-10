import ExportClient from "../ExportClient";

export const metadata = {
  title: "Biomedical & Laboratory Analyzer Exporter to Middle East | Raj Biosis",
  description: "Raj Biosis exports premium biochemistry systems, hematology analyzers, and medical diagnostic test strips from India to UAE, Saudi Arabia, Oman, Qatar, Bahrain.",
  alternates: {
    canonical: "https://glucostrips.com/export/middle-east",
  },
};

export default function MiddleEastExportPage() {
  return (
    <>
      <ExportClient />
      
      {/* Middle East Market Details Section */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-slate-900">
              Premium Medical Device Exporter for GCC & Middle East
            </h2>
            <p className="mt-6 text-slate-600 leading-8">
              We provide advanced clinical diagnostics, analyzers, and rapid strips to medical suppliers in the GCC region. 
              Our products are optimized for high-performance lab throughput and healthcare compliance.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-12 text-left">
              <div className="bg-slate-55 p-6 rounded-2xl border border-slate-100">
                <h3 className="font-bold text-slate-900 text-lg">GCC Compliance</h3>
                <p className="text-slate-500 text-sm mt-2 leading-6">
                  Compliant with regional import certification and custom clearing standards in UAE, Oman, and KSA.
                </p>
              </div>
              <div className="bg-slate-55 p-6 rounded-2xl border border-slate-100">
                <h3 className="font-bold text-slate-900 text-lg">OEM Partnership</h3>
                <p className="text-slate-500 text-sm mt-2 leading-6">
                  Custom localization, manuals, and labels to launch your private label brand in GCC markets.
                </p>
              </div>
              <div className="bg-slate-55 p-6 rounded-2xl border border-slate-100">
                <h3 className="font-bold text-slate-900 text-lg">Direct Shipping Hubs</h3>
                <p className="text-slate-500 text-sm mt-2 leading-6">
                  Express sea and air freight delivery to Jebel Ali (Dubai), Port of Dammam, Doha, and Muscat.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
