import ContentCard from '../components/ContentCard';

export default function PodcastsPage({ podcasts, onLike, onDislike }) {
  return (
    <section id="podcasts-page" className="page active">
      <div className="page-header">
        <h1>Future Casts</h1>
        <p>Audio explorations of tomorrow's technologies, featuring interviews with leading innovators and futurists.</p>
      </div>

      <div className="content-grid">
        {podcasts.map((p) => (
          <ContentCard key={p.id} item={p} kind="podcast" onLike={onLike} onDislike={onDislike} />
        ))}
      </div>
    </section>
  );
}

