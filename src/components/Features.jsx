import './Features.css';

export default function Features() {
  return (
    <section id="features" className="features">
      <div className="features__container">
        <h2 className="features__title">How HappyFindr Works</h2>
        <div className="features__grid">
          <div className="features__card">
            <h3 className="features__card-title">Generate QR</h3>
            <p className="features__card-desc">
              Create a unique QR code for each of your items.
            </p>
          </div>
          <div className="features__card">
            <h3 className="features__card-title">Attach & Track</h3>
            <p className="features__card-desc">
              Attach it to your belongings and track them easily.
            </p>
          </div>
          <div className="features__card">
            <h3 className="features__card-title">Secure Contact</h3>
            <p className="features__card-desc">
              Anyone who finds your item can contact you safely.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
