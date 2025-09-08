export default function Features() {
  return (
    <section id="features" className="features py-28 bg-gray-50">
      <div className="features__container container mx-auto px-4 text-center">
        <h2 className="features__title text-3xl md:text-4xl lg:text-5xl font-extrabold mb-16 text-gray-800">
          How HappyFindr Works
        </h2>
        <div className="features__grid grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="features__card bg-white p-8 md:p-10 rounded-2xl shadow-lg hover:shadow-2xl transform transition hover:-translate-y-2">
            <h3 className="features__card-title text-2xl md:text-2xl font-bold mb-4">
              Generate QR
            </h3>
            <p className="features__card-desc text-gray-600 text-base md:text-lg">
              Create a unique QR code for each of your items.
            </p>
          </div>
          <div className="features__card bg-white p-8 md:p-10 rounded-2xl shadow-lg hover:shadow-2xl transform transition hover:-translate-y-2">
            <h3 className="features__card-title text-2xl md:text-2xl font-bold mb-4">
              Attach & Track
            </h3>
            <p className="features__card-desc text-gray-600 text-base md:text-lg">
              Attach it to your belongings and track them easily.
            </p>
          </div>
          <div className="features__card bg-white p-8 md:p-10 rounded-2xl shadow-lg hover:shadow-2xl transform transition hover:-translate-y-2">
            <h3 className="features__card-title text-2xl md:text-2xl font-bold mb-4">
              Secure Contact
            </h3>
            <p className="features__card-desc text-gray-600 text-base md:text-lg">
              Anyone who finds your item can contact you safely.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
