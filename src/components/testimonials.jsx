import './testimonials.css'
import { useState } from 'react'

function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const testimonials = [
    {
      id: 1,
      name: "Vignesh",
      role: "CEO, YellowFlash",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      comment: "Pawan transformed our online presence completely. His attention to detail and modern design approach took our website to the next level. Highly recommended!",
      rating: 5
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Product Manager, StartupHub",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
      comment: "Working with Pawan was seamless. He understood our vision immediately and delivered a stunning UI that our users love. Great communication throughout.",
      rating: 5
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Marketing Director, DigitalMax",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
      comment: "The website Pawan built for us has increased our conversions by 40%. The design is beautiful, and the performance is incredible. Best investment we made!",
      rating: 5
    },
  ]

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        <div className="section-header">
          <h2 className="section-heading">Client Testimonials</h2>
          <p className="section-subheading">What my clients say about working with me</p>
        </div>

        <div className="testimonials-content">
          <div className="testimonial-card-wrapper">
            <div className="testimonial-card">
              <div className="card-top">
                <div className="client-info">
                  <img src={testimonials[currentTestimonial].image} alt={testimonials[currentTestimonial].name} className="client-avatar" />
                  <div className="client-details">
                    <h4 className="client-name">{testimonials[currentTestimonial].name}</h4>
                    <p className="client-role">{testimonials[currentTestimonial].role}</p>
                  </div>
                </div>
                <div className="stars">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <i key={i} className="bi bi-star-fill"></i>
                  ))}
                </div>
              </div>

              <p className="testimonial-text">{testimonials[currentTestimonial].comment}</p>

              <div className="quote-mark">
                <i className="bi bi-quote"></i>
              </div>
            </div>
          </div>

          <div className="testimonials-navigation">
            <button 
              className="nav-button prev"
              onClick={prevTestimonial}
              aria-label="Previous testimonial"
            >
              <i className="bi bi-chevron-left"></i>
            </button>

            <div className="nav-dots">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`dot ${index === currentTestimonial ? 'active' : ''}`}
                  onClick={() => setCurrentTestimonial(index)}
                  aria-label={`Testimonial ${index + 1}`}
                ></button>
              ))}
            </div>

            <button 
              className="nav-button next"
              onClick={nextTestimonial}
              aria-label="Next testimonial"
            >
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>
        </div>

        <div className="testimonials-stats">
          <div className="stat-item">
            <h3>30+</h3>
            <p>Happy Clients</p>
          </div>
          <div className="stat-item">
            <h3>50+</h3>
            <p>Projects Completed</p>
          </div>
          <div className="stat-item">
            <h3>4.9/5</h3>
            <p>Average Rating</p>
          </div>
          <div className="stat-item">
            <h3>5+</h3>
            <p>Years Experience</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials