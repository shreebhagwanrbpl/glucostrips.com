export default function SeoContent({ city = "" }) {
    const location = city || "India";

    return (
        <section className="py-20 bg-white">
            <div className="container-custom">

                <h2 className="text-4xl font-bold text-slate-900 mb-8">
                    Diagnostic, Medical & Laboratory Supplies Supplier in {location}
                </h2>

                <div className="space-y-6 text-slate-600 leading-8 text-lg">

                    <p>Raj Biosis distributes premium diagnostic kits, laboratory equipment, and medical consumables across multiple cities, helping healthcare providers offer services with total diagnostic confidence.</p>

                </div>

                {/* FAQ Section */}

                <div className="mt-16">

                    <h2 className="text-3xl font-bold text-slate-900 mb-8">
                        Frequently Asked Questions
                    </h2>

                    <div className="space-y-6">

                        <div>
                            <h3 className="font-semibold text-xl">Do you supply diagnostic and medical consumables across India?</h3>

                            <p className="text-slate-600 mt-2">Yes, we supply genuine diagnostic equipment, reagents, and laboratory consumables across multiple districts and cities.</p>
                        </div>

                        <div>
                            <h3 className="font-semibold text-xl">Which brands and consumables do you supply?</h3>

                            <p className="text-slate-600 mt-2">We provide diagnostic kits and consumables compatible with major biochemistry, hematology, and clinical analyzer models, along with other healthcare essentials.</p>
                        </div>

                        <div>
                            <h3 className="font-semibold text-xl">Do you provide guidance on equipment and reagent compatibility?</h3>

                            <p className="text-slate-600 mt-2">Yes, we offer detailed product compatibility matching and layout guides for clinical laboratories.</p>
                        </div>

                        <div>
                            <h3 className="font-semibold text-xl">Who can buy medical and laboratory supplies in bulk?</h3>

                            <p className="text-slate-600 mt-2">Hospitals, diagnostic networks, research labs, health clinics, and retail pharmacies can order medical supplies from us in bulk.</p>
                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
}