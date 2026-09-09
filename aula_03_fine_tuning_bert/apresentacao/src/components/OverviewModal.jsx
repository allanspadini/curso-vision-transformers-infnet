import React, { useEffect } from 'react';
import { X, LayoutGrid } from 'lucide-react';

export default function OverviewModal({
  isOpen,
  onClose,
  slides,
  currentSlide,
  onSelectSlide,
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="overview-modal-backdrop" onClick={onClose}>
      <div className="overview-modal" onClick={(e) => e.stopPropagation()}>
        <div className="overview-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <LayoutGrid size={20} color="#1BB5D8" />
            <h2 style={{ fontFamily: 'var(--font-title)', fontSize: '18px', color: '#FFFFFF' }}>
              Visão Geral dos Slides ({slides.length} slides)
            </h2>
          </div>
          <button className="control-btn" onClick={onClose} title="Fechar (Esc)">
            <X size={20} />
          </button>
        </div>

        <div className="overview-grid">
          {slides.map((slide, idx) => (
            <div
              key={slide.id || idx}
              className={`overview-card ${currentSlide === idx ? 'active' : ''}`}
              onClick={() => {
                onSelectSlide(idx);
                onClose();
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="overview-card-number">SLIDE {idx + 1}</span>
                <span className="overview-card-type">{slide.type}</span>
              </div>
              <div className="overview-card-title">{slide.title}</div>
              <div style={{ fontSize: '11px', color: '#94A3B8' }}>
                {slide.category || 'Aula 1 • CNNs'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
