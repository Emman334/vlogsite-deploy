import { useEffect, useMemo, useState } from 'react';
import './styles.css';
import TopNav from './components/TopNav';
import CustomizationPanel from './components/CustomizationPanel';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ArticlesPage from './pages/ArticlesPage';
import PodcastsPage from './pages/PodcastsPage';
import CreatePage from './pages/CreatePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import { dislikeContent, getHomeData, likeContent } from './supabaseApi';


function applyParticleDensity(value) {
  const density = Number(value);
  document.documentElement.style.setProperty('--particle-density', String(density));
}

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [customizationHidden, setCustomizationHidden] = useState(false);

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    articles: [],
    podcasts: [],
    top_articles: [],
    top_podcasts: []
  });

  async function refresh() {
    setLoading(true);
    try {
      const res = await getHomeData();
      setData(res);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  // Theme toggle + customization bindings (mimics original JS)
  useEffect(() => {
    // Ensure CSS vars match defaults
    document.documentElement.style.setProperty('--neon-primary', '#0ff');
    document.documentElement.style.setProperty('--neon-secondary', '#f0f');
    document.documentElement.style.setProperty('--hologram-intensity', '0.8');
    document.documentElement.style.setProperty('--particle-density', '50');

    const primary = document.getElementById('primary-color');
    const secondary = document.getElementById('secondary-color');
    const hologramInput = document.getElementById('hologram-intensity');
    const particleInput = document.getElementById('particle-density');

    const onPrimary = (e) => document.documentElement.style.setProperty('--neon-primary', e.target.value);
    const onSecondary = (e) => document.documentElement.style.setProperty('--neon-secondary', e.target.value);
    const onHologram = (e) => document.documentElement.style.setProperty('--hologram-intensity', e.target.value);
    const onParticle = (e) => applyParticleDensity(e.target.value);

    primary?.addEventListener('input', onPrimary);
    secondary?.addEventListener('input', onSecondary);
    hologramInput?.addEventListener('input', onHologram);
    particleInput?.addEventListener('input', onParticle);

    const resetBtn = document.getElementById('reset-settings');
    const onReset = () => {
      document.documentElement.style.setProperty('--neon-primary', '#0ff');
      document.documentElement.style.setProperty('--neon-secondary', '#f0f');
      document.documentElement.style.setProperty('--hologram-intensity', '0.8');
      document.body.classList.remove('light-mode');
      if (primary) primary.value = '#00ffff';
      if (secondary) secondary.value = '#ff00ff';
      if (hologramInput) hologramInput.value = '0.8';
      if (particleInput) particleInput.value = '50';
      document.documentElement.style.setProperty('--particle-density', '50');
    };
    resetBtn?.addEventListener('click', onReset);

    return () => {
      primary?.removeEventListener('input', onPrimary);
      secondary?.removeEventListener('input', onSecondary);
      hologramInput?.removeEventListener('input', onHologram);
      particleInput?.removeEventListener('input', onParticle);
      resetBtn?.removeEventListener('click', onReset);
    };
  }, [customizationHidden]);

  async function onLike(id) {
    await likeContent(id);
    await refresh();
  }

  async function onDislike(id) {
    await dislikeContent(id);
    await refresh();
  }

  const page = useMemo(() => {
    switch (activePage) {
      case 'home':
        return <HomePage topArticles={data.top_articles} topPodcasts={data.top_podcasts} onLike={onLike} onDislike={onDislike} />;
      case 'articles':
        return <ArticlesPage articles={data.articles} onLike={onLike} onDislike={onDislike} />;
      case 'podcasts':
        return <PodcastsPage podcasts={data.podcasts} onLike={onLike} onDislike={onDislike} />;
      case 'create':
        return <CreatePage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage topArticles={data.top_articles} topPodcasts={data.top_podcasts} onLike={onLike} onDislike={onDislike} />;
    }
  }, [activePage, data]);

  useEffect(() => {
    // Audio player logic: pause other audios when one plays
    const handler = (e) => {
      const audio = e.target;
      document.querySelectorAll('audio').forEach((other) => {
        if (other !== audio) other.pause();
      });
    };
    document.querySelectorAll('audio').forEach((a) => a.addEventListener('play', handler));
    return () => {
      document.querySelectorAll('audio').forEach((a) => a.removeEventListener('play', handler));
    };
  }, [data]);

  function toggleTheme() {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    document.documentElement.style.setProperty('--dark-bg', isLight ? '#f0f0f5' : '#0a0a15');
    document.documentElement.style.setProperty('--text-primary', isLight ? '#000' : '#fff');
    document.documentElement.style.setProperty('--text-secondary', isLight ? '#333' : '#aaa');
    document.documentElement.style.setProperty(
      '--card-glass',
      isLight ? 'rgba(240, 240, 255, 0.7)' : 'rgba(20, 20, 40, 0.7)'
    );
  }

  function voiceNav() {
    alert("Voice control activated. Say 'Home', 'Articles', 'Podcasts', 'About', or 'Contact' to navigate.");
    const commands = ['home', 'articles', 'podcasts', 'about', 'contact'];
    const randomCommand = commands[Math.floor(Math.random() * commands.length)];
    setTimeout(() => {
      alert(`Heard command: "${randomCommand}" - Navigating now.`);
      setActivePage(randomCommand);
      window.scrollTo(0, 0);
    }, 1500);
  }

  useEffect(() => {
    // ParticlesJS: keep safe fallback (only if library is present)
    if (typeof window.particlesJS !== 'undefined') {
      window.particlesJS('particles-js', {
        particles: {
          number: {
            value: Number(getComputedStyle(document.documentElement).getPropertyValue('--particle-density')) || 50,
            density: { enable: true, value_area: 800 }
          },
          color: { value: '#00ffff' },
          shape: { type: 'circle', stroke: { width: 0, color: '#000000' } },
          opacity: {
            value: 0.5,
            random: true,
            anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false }
          },
          size: {
            value: 3,
            random: true,
            anim: { enable: true, speed: 2, size_min: 0.3, sync: false }
          },
          line_linked: { enable: true, distance: 150, color: '#00ffff', opacity: 0.2, width: 1 },
          move: {
            enable: true,
            speed: 1,
            direction: 'none',
            random: true,
            straight: false,
            out_mode: 'out',
            bounce: false
          }
        },
        interactivity: {
          detect_on: 'canvas',
          events: {
            onhover: { enable: true, mode: 'grab' },
            onclick: { enable: true, mode: 'push' },
            resize: true
          },
          modes: {
            grab: { distance: 140, line_linked: { opacity: 0.5 } },
            push: { particles_nb: 4 }
          }
        },
        retina_detect: true
      });
    }
  }, []);

  return (
    <>
      <div id="particles-js" />

      <TopNav
        active={activePage}
        onNavigate={(key) => {
          setActivePage(key);
          window.scrollTo(0, 0);
        }}
        onToggleTheme={toggleTheme}
        onToggleCustomization={() => setCustomizationHidden((v) => !v)}
        onVoice={voiceNav}
      />

      <CustomizationPanel
        hidden={customizationHidden}
        onToggle={() => setCustomizationHidden((v) => !v)}
        onReset={() => {
          // reset handled by button listener
          setCustomizationHidden(false);
        }}
      />

      <main>
        {loading ? <div style={{ padding: 20 }}>Loading...</div> : page}
      </main>

      <Footer />
    </>
  );
}

