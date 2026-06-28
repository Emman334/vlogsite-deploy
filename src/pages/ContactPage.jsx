export default function ContactPage() {
  return (
    <section id="contact-page" className="page active">
      <div className="page-header">
        <h1>Connect With Us</h1>
        <p>Have questions, story ideas, or partnership inquiries? Reach out to our team.</p>
      </div>

      <div className="content-grid">
        <div className="card hologram-card">
          <div className="card-img"><i className="fas fa-envelope" /></div>
          <h3>General Inquiries</h3>
          <p>info@nexus-future.tech</p>
        </div>

        <div className="card hologram-card">
          <div className="card-img"><i className="fas fa-newspaper" /></div>
          <h3>Editorial Pitch</h3>
          <p>editors@nexus-future.tech</p>
        </div>

        <div className="card hologram-card">
          <div className="card-img"><i className="fas fa-handshake" /></div>
          <h3>Partnerships</h3>
          <p>partners@nexus-future.tech</p>
        </div>
      </div>
    </section>
  );
}

