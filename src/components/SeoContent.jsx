export default function SeoContent({ city = "" }) {
  const location = city || "India";

  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <h2 className="text-4xl font-bold text-slate-900 mb-8">
          Biomedical Product Sourcing for Laboratories and Healthcare Buyers in {location}
        </h2>

        <div className="space-y-6 text-slate-600 leading-8 text-lg">
          <p>
            Raj Biosis supports procurement across diagnostic testing, laboratory instrumentation, clinical equipment and medical consumables. The catalogue is not limited to glucose strips or a single test category; buyers can enquire for analyzers, rapid tests, reagents, controls, lab apparatus, monitoring systems, accessories and routine disposables.
          </p>
          <p>
            Product selection can be discussed using practical details such as parameter, sample type, throughput, instrument capacity, automation, brand, model number, dimensions and intended application so that purchasing teams can compare suitable options before placing an order.
          </p>
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Buying & Product Information FAQs</h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-xl">Is the website only for glucose testing strips?</h3>
              <p className="text-slate-600 mt-2">No. Glucose strips are only one product group. The website covers a broader biomedical range including diagnostic kits, analyzers, laboratory equipment, patient-care devices, reagents and consumables.</p>
            </div>
            <div>
              <h3 className="font-semibold text-xl">Can I request several product categories in one enquiry?</h3>
              <p className="text-slate-600 mt-2">Yes. Hospitals, laboratories, dealers and institutional buyers can combine instruments, kits, consumables and accessories in the same requirement for coordinated quotation support.</p>
            </div>
            <div>
              <h3 className="font-semibold text-xl">What details help you identify a suitable model?</h3>
              <p className="text-slate-600 mt-2">Useful information includes the required test or application, daily workload, parameter, sample type, throughput, preferred automation level, available space, brand preference and quantity.</p>
            </div>
            <div>
              <h3 className="font-semibold text-xl">Can recurring consumables be sourced for installed equipment?</h3>
              <p className="text-slate-600 mt-2">Yes. Share the instrument brand and model so compatible reagents, strips, controls, accessories or other routine consumables can be discussed for repeat supply.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
