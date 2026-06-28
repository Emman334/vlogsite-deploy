export default function AboutPage() {
  return (
    <section id="about-page" className="page active">
      <div className="page-header">
        <h1>About Nexus</h1>
        <p>We're a collective of technologists, futurists, and writers exploring the bleeding edge of innovation.</p>
      </div>

      <div className="content-grid">
        <div className="card hologram-card">
          <div className="card-img"><i className="fas fa-history" /></div>
          <h3>Our Story</h3>
          <p>Founded in 2035, Nexus began as a small group of MIT researchers passionate about making complex technologies accessible to everyone.</p>
        </div>

        <div className="card hologram-card">
          <div className="card-img"><i className="fas fa-bullseye" /></div>
          <h3>Our Mission</h3>
          <p>To illuminate the path of technological progress and explore its implications for humanity's future.</p>
        </div>

        <div className="card hologram-card">
          <div className="card-img"><i className="fas fa-users" /></div>
          <h3>Our Team</h3>
          <p>A diverse team of scientists, journalists, and designers from 12 countries working together remotely.</p>
        </div>
      </div>
    </section>
  );
}

