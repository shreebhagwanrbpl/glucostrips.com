export default function TrustedBrands() {
  const productFamilies = [
    "Hematology & CBC",
    "Clinical Chemistry",
    "Rapid & Serology Tests",
    "Laboratory Essentials",
    "Patient Monitoring",
  ];

  return (
    <section className="py-16 bg-slate-50 border-y border-slate-100">
      <div className="container-custom">
        <p className="text-center text-slate-500 font-medium mb-10">
          Product coverage for routine diagnostics, laboratories and clinical care
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center">
          {productFamilies.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 text-center font-semibold text-slate-700 card-shadow"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
