export default function ContentCard({ item, kind, onLike, onDislike }) {
  const tag = item.tags ? String(item.tags).split(',')[0] : '';
  const short = item.content ? String(item.content).slice(0, 150) : '';

  return (
    <div className="card hologram-card">
      <div className="card-img">
        <i className={item.icon ? String(item.icon) : 'fas fa-microchip'} />
      </div>

      <h3>{item.title}</h3>
      <p>{short}...</p>

      <div className="content-meta">
        <span className="neon-tag">{tag}</span>
        <div className="author-info">
          <img
            src={item.author_image || 'https://via.placeholder.com/40'}
            alt="Author"
            className="author-image"
          />
          <span className="author-name">Author</span>
        </div>
      </div>

      {kind === 'podcast' && item.audio_url ? (
        <div className="podcast-player">
          <audio controls>
            <source src={item.audio_url} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      ) : null}

      <div className="reaction-buttons">
        <button className="like-btn" type="button" onClick={() => onLike(item.id)}>
          <i className="fas fa-thumbs-up" /> {item.likes}
        </button>
        <button className="dislike-btn" type="button" onClick={() => onDislike(item.id)}>
          <i className="fas fa-thumbs-down" /> {item.dislikes}
        </button>
      </div>
    </div>
  );
}

