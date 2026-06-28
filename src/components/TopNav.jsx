import { useMemo, useState } from 'react';

const NAV_ITEMS = [
  { key: 'home', label: 'Home' },
  { key: 'articles', label: 'Articles' },
  { key: 'podcasts', label: 'Podcasts' },
  { key: 'create', label: 'Create' },
  { key: 'about', label: 'About' },
  { key: 'contact', label: 'Contact' }
];

export default function TopNav({ active, onNavigate, onToggleTheme, onToggleCustomization, onVoice }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const items = useMemo(() => NAV_ITEMS, []);

  function navigate(key) {
    setMobileOpen(false);
    onNavigate(key);
  }

  return (
    <header>
      <div className="header-container">
        <div className="logo">NEXUS</div>

        <button
          className="mobile-menu-btn"
          type="button"
          aria-label="Toggle menu"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <i className="fas fa-bars" />
        </button>

        <div className={`nav-container ${mobileOpen ? 'active' : ''}`}>
          <ul className="nav-links">
            {items.map((it) => (
              <li key={it.key}>
                <a
                  href="#"
                  className={`nav-link ${active === it.key ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(it.key);
                  }}
                >
                  {it.label}
                </a>
              </li>
            ))}
          </ul>

          <button className="theme-toggle" type="button" onClick={onToggleTheme}>
            DARK/LIGHT
          </button>

          <button className="voice-control" type="button" onClick={onVoice} aria-label="Voice navigation">
            <i className="fas fa-microphone" />
          </button>

          {/* Keep customization panel outside; this button just toggles it */}
          <button
            type="button"
            style={{ display: 'none' }}
            onClick={onToggleCustomization}
            aria-hidden="true"
          />
        </div>
      </div>
    </header>
  );
}

