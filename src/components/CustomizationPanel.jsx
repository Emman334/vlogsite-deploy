export default function CustomizationPanel({ hidden, onToggle, onReset }) {
  const primaryId = 'primary-color';
  const secondaryId = 'secondary-color';

  return (
    <div className={`customization-panel ${hidden ? 'hidden' : ''}`}>
      <div className="panel-toggle" onClick={onToggle} role="button" tabIndex={0}>
        <i className="fas fa-sliders-h" />
      </div>

      <div className="customization-options">
        <h3>Customize</h3>

        <div className="option-group">
          <label>Primary Color</label>
          <input type="color" id={primaryId} defaultValue="#00ffff" />
        </div>

        <div className="option-group">
          <label>Secondary Color</label>
          <input type="color" id={secondaryId} defaultValue="#ff00ff" />
        </div>

        <div className="option-group">
          <label>Hologram Intensity</label>
          <input type="range" id="hologram-intensity" min="0" max="1" step="0.1" defaultValue="0.8" />
        </div>

        <div className="option-group">
          <label>Particle Density</label>
          <input type="range" id="particle-density" min="10" max="100" defaultValue="50" />
        </div>

        <button className="theme-toggle" id="reset-settings" type="button" onClick={onReset}>
          Reset
        </button>
      </div>
    </div>
  );
}

