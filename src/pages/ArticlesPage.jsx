import ContentCard from '../components/ContentCard';

export default function ArticlesPage({ articles, onLike, onDislike }) {
  return (
    <section id="articles-page" className="page active">
      <div className="page-header">
        <h1>Tech Articles</h1>
        <p>Deep dives into emerging technologies, comprehensive analyses, and thought leadership in the tech space.</p>
      </div>

      <div className="content-grid">
        {articles.map((a) => (
          <ContentCard key={a.id} item={a} kind="article" onLike={onLike} onDislike={onDislike} />
        ))}
      </div>
    </section>
  );
}

