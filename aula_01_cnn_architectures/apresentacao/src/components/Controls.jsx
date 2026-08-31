import React from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  FileText, 
  Grid, 
  Maximize, 
  Minimize 
} from 'lucide-react';

export default function Controls({
  currentSlide,
  totalSlides,
  onPrev,
  onNext,
  isAutoplay,
  onToggleAutoplay,
  isNotesOpen,
  onToggleNotes,
  isOverviewOpen,
  onToggleOverview,
  isFullscreen,
  onToggleFullscreen
}) {
  return (
    <div className="floating-controls">
      <button
        className="control-btn"
        onClick={onPrev}
        disabled={currentSlide === 0}
        title="Slide Anterior (Seta Esquerda)"
      >
        <ChevronLeft size={18} />
      </button>

      <button
        className="control-btn"
        onClick={onNext}
        disabled={currentSlide === totalSlides - 1}
        title="Próximo Slide (Seta Direita / Espaço)"
      >
        <ChevronRight size={18} />
      </button>

      <div className="control-divider"></div>

      <button
        className={`control-btn ${isAutoplay ? 'active' : ''}`}
        onClick={onToggleAutoplay}
        title={isAutoplay ? 'Pausar Reprodução' : 'Iniciar Autoplay'}
      >
        {isAutoplay ? <Pause size={16} /> : <Play size={16} />}
      </button>

      <button
        className={`control-btn ${isNotesOpen ? 'active' : ''}`}
        onClick={onToggleNotes}
        title="Falas do Apresentador (N)"
      >
        <FileText size={16} />
      </button>

      <button
        className={`control-btn ${isOverviewOpen ? 'active' : ''}`}
        onClick={onToggleOverview}
        title="Visão Geral dos Slides (G)"
      >
        <Grid size={16} />
      </button>

      <button
        className="control-btn"
        onClick={onToggleFullscreen}
        title="Modo Tela Cheia (F)"
      >
        {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
      </button>
    </div>
  );
}
