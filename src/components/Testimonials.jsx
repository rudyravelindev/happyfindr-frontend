import './Testimonials.css';

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: 'Marie Elisabeth Ravelin',
      role: 'Frequent Traveler',
      content:
        "I've attached HappyFindr tags to all my luggage. When my suitcase got misplaced at the airport, someone scanned it and I was reunited within hours!",
      bgColor: 'testimonial__card--blue',
    },
    {
      id: 2,
      name: 'Dominique Dwayne Ravelin',
      role: 'Student',
      content:
        'Lost my wallet on campus and thought it was gone forever. Got a notification the same day - someone found it and scanned the QR code!',
      bgColor: 'testimonial__card--purple',
    },
    {
      id: 3,
      name: 'Elisadora Kate Ravelin',
      role: 'Pet Owner',
      content:
        "Put a tag on my dog's collar. When he wandered off, a neighbor found him and contacted me immediately through the app. Lifesaver!",
      bgColor: 'testimonial__card--green',
    },
  ];

  return (
    <section id="testimonials" className="testimonials">
      <div className="testimonials__container">
        <h2 className="testimonials__title">What Our Users Say</h2>

        <div className="testimonials__grid">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className={`testimonial__card ${testimonial.bgColor}`}
            >
              <div className="testimonial__content">
                <p className="testimonial__text">"{testimonial.content}"</p>

                <div className="testimonial__author">
                  <h3 className="testimonial__name">{testimonial.name}</h3>
                  <p className="testimonial__role">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
