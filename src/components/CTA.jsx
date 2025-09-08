export default function CTA() {
  return (
    <section
      id="cta"
      className="cta bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white py-28"
    >
      <div className="cta__container container mx-auto text-center px-4">
        <h2 className="cta__title text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 drop-shadow-lg">
          Start Protecting Your Items Today!
        </h2>
        <p className="cta__subtitle text-lg md:text-xl lg:text-2xl mb-10 drop-shadow-md">
          Sign up and generate your first QR code in seconds.
        </p>
        <a
          href="/signup"
          className="cta__btn bg-white text-indigo-600 px-8 py-4 rounded-full text-lg md:text-xl font-bold shadow-lg transform transition hover:scale-105 hover:bg-gray-100"
        >
          Get Started
        </a>
      </div>
    </section>
  );
}
