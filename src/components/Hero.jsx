export default function Hero() {
  return (
    <section
      id="hero"
      className="bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-600 text-white py-40"
    >
      <div className="container mx-auto text-center px-4">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold drop-shadow-lg mb-6">
          Never Lose Your Belongings Again 🚀
        </h1>

        <p className="text-lg md:text-xl lg:text-2xl drop-shadow-md mb-10">
          Attach a QR code to your items and make it easy for others to return
          them safely.
        </p>

        <a
          href="#cta"
          className="bg-white text-indigo-600 px-8 py-4 rounded-full font-bold shadow-lg text-lg md:text-xl transform transition hover:scale-105 hover:bg-gray-100"
        >
          Get Started
        </a>
      </div>
    </section>
  );
}
