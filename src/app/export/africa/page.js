import ExportClient from "../ExportClient";

export const metadata = {
  title: "Diagnostic & Laboratory Equipment Supplier in Africa | Raj Biosis",
  description: "Raj Biosis exports premium biomedical analyzers, hematology systems, and test strips from India to Africa (Kenya, Nigeria, Ghana, Tanzania, Uganda, etc.). Request quote.",
  alternates: {
    canonical: "https://glucostrips.com/export/africa",
  },
};

export default function AfricaExportPage() {
  return (
    <div className="site1-static">
      <ExportClient />
      
      {/* African Market Details Section */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-slate-900">
              Reliable Medical Supply Chain for African Markets
            </h2>
            <p className="mt-6 text-slate-600 leading-8">
              We specialize in shipping diagnostic products, clinical analyzers, and rapid test kits to distribution hubs 
              across Africa. Our packaging guarantees stability for tropical climates. We support government tenders and local NGO procurement.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-12 text-left">
              <div className="bg-slate-55 p-6 rounded-2xl border border-slate-100">
                <h3 className="font-bold text-slate-900 text-lg">Tropical Stability</h3>
                <p className="text-slate-500 text-sm mt-2 leading-6">
                  Reagents and urinalysis strips are validated for high humidity and temperature performance.
                </p>
              </div>
              <div className="bg-slate-55 p-6 rounded-2xl border border-slate-100">
                <h3 className="font-bold text-slate-900 text-lg">Tender Documents</h3>
                <p className="text-slate-500 text-sm mt-2 leading-6">
                  Quick processing of FDA-equivalent approvals, FSC, ISO, and commercial invoices.
                </p>
              </div>
              <div className="bg-slate-55 p-6 rounded-2xl border border-slate-100">
                <h3 className="font-bold text-slate-900 text-lg">Major Ports Served</h3>
                <p className="text-slate-500 text-sm mt-2 leading-6">
                  Air and sea delivery to Mombasa, Lagos, Tema, Dar es Salaam, and Durban.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
