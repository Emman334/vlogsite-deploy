import { useEffect, useMemo, useState } from 'react';
import { createContent } from '../supabaseApi';


const ICONS = [
  'fas fa-microchip',
  'fas fa-brain',
  'fas fa-rocket',
  'fas fa-atom',
  'fas fa-dna',
  'fas fa-robot',
  'fas fa-vr-cardboard',
  'fas fa-satellite'
];

export default function CreatePage() {
  const [type, setType] = useState('article');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [icon, setIcon] = useState(ICONS[0]);
  const [authorImage, setAuthorImage] = useState(null);
  const [audioFile, setAudioFile] = useState(null);

  const [message, setMessage] = useState(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setMessage(null);
  }, [type, title, content]);

  const audioVisible = type === 'podcast';

  const iconGrid = useMemo(() => ICONS, []);

  async function onSubmit(e) {
    e.preventDefault();
    setMessage(null);

    const fd = new FormData();
    fd.append('type', type);
    fd.append('title', title);
    fd.append('content', content);
    fd.append('tags', tags);
    fd.append('icon', icon);

    if (authorImage) fd.append('author_image', authorImage);
    if (audioVisible && audioFile) fd.append('audio_file', audioFile);

    setBusy(true);
    try {
      if (typeof createContent !== 'function') {
        throw new Error('createContent is not a function (import failed)');
      }

      // Useful diagnostics (will show in DevTools console)
      const res = await createContent(fd);
      console.log('insert result:', res);
      setMessage({ kind: 'success', text: 'Content published successfully!' });

      // Refresh would normally happen in App(); we keep UX simple.



      setTitle('');
      setContent('');
      setTags('');
      setIcon(ICONS[0]);
      setAuthorImage(null);
      setAudioFile(null);
      setType('article');
    } catch (err) {
      // Show full error details in DevTools (most useful for Supabase/RLS/storage issues)
      // eslint-disable-next-line no-console
      console.error('createContent error:', err);
      setMessage({ kind: 'error', text: String(err?.message || err) });
    } finally {
      setBusy(false);
    }

  }

  return (
    <section id="create-page" className="page active">
      <div className="page-header">
        <h1>Create Content</h1>
        <p>Share your insights with the Nexus community</p>
      </div>

      {message ? <div className={`message ${message.kind}`}>{message.text}</div> : null}

      <form method="POST" className="creation-panel" encType="multipart/form-data" onSubmit={onSubmit}>
        <div className="form-group">
          <label>Content Type</label>
          <select value={type} onChange={(e) => setType(e.target.value)} required>
            <option value="article">Article</option>
            <option value="podcast">Podcast</option>
          </select>
        </div>

        <div className="form-group">
          <label>Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter a compelling title" required />
        </div>

        <div className="form-group">
          <label>Content</label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Write your content here..." required />
        </div>

        <div className="form-group">
          <label>Tags (comma separated)</label>
          <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="e.g., #AI, #Quantum, #Space" required />
        </div>

        <div className="form-group">
          <label>Select an Icon</label>
          <div className="icon-selector">
            {iconGrid.map((ic) => (
              <div
                key={ic}
                className={`icon-option ${icon === ic ? 'selected' : ''}`}
                role="button"
                tabIndex={0}
                onClick={() => setIcon(ic)}
              >
                <i className={ic} />
              </div>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Author Image</label>
          <input type="file" accept="image/*" onChange={(e) => setAuthorImage(e.target.files?.[0] || null)} />
        </div>

        <div className="form-group" style={{ display: audioVisible ? 'block' : 'none' }}>
          <label>Podcast Audio File</label>
          <input type="file" accept="audio/*" onChange={(e) => setAudioFile(e.target.files?.[0] || null)} />
        </div>

        <button className="btn-submit" type="submit" disabled={busy}>
          {busy ? 'Publishing...' : 'Publish Content'}
        </button>
      </form>

      <div className="ai-recommendations">
        <div className="ai-header">
          <i className="fas fa-lightbulb" />
          <h2>Content Creation Tips</h2>
        </div>
        <div className="ai-content">
          <div className="ai-card">
            <h4>Engaging Titles</h4>
            <p>Start with a compelling question or surprising statistic to grab attention.</p>
          </div>
          <div className="ai-card">
            <h4>Clear Structure</h4>
            <p>Use headings and short paragraphs to make your content scannable.</p>
          </div>
          <div className="ai-card">
            <h4>Relevant Tags</h4>
            <p>Add 3-5 relevant tags to help readers find your content.</p>
          </div>
          <div className="ai-card">
            <h4>Visual Elements</h4>
            <p>Choose an icon that represents your content's main theme.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

