import ContentCard from '../components/ContentCard';

export default function HomePage({ topArticles, topPodcasts, onLike, onDislike }) {
  return (
    <section id="home-page" className="page active">
      <div className="page-header">
        <h1>Welcome to the Future</h1>
        <p>
          Exploring the frontiers of technology, AI, quantum computing, and beyond. Join us as we navigate the next evolution of human innovation.
        </p>
      </div>

      <div className="ai-recommendations">
        <div className="ai-header">
          <i className="fas fa-star" />
          <h2>Top Articles</h2>
        </div>
        <div className="content-grid">
          {topArticles.map((a) => (
            <ContentCard key={a.id} item={a} kind="article" onLike={onLike} onDislike={onDislike} />
          ))}
        </div>
      </div>

      <div className="ai-recommendations">
        <div className="ai-header">
          <i className="fas fa-star" />
          <h2>Top Podcasts</h2>
        </div>
        <div className="content-grid">
          {topPodcasts.map((p) => (
            <ContentCard key={p.id} item={p} kind="podcast" onLike={onLike} onDislike={onDislike} />
          ))}
        </div>
      </div>
    </section>
  );
}

