import React, { useState, useEffect, useRef, useCallback } from 'react';
import { slides } from './data/slidesData';
import Header from './components/Header';
import Footer from './components/Footer';
import Controls from './components/Controls';
import NotesDrawer from './components/NotesDrawer';
import OverviewModal from './components/OverviewModal';
import ErrorBoundary from './components/ErrorBoundary';

// Visual Components
import PixelAttentionExplosionDiagram from './components/visual/PixelAttentionExplosionDiagram';
import InductiveBiasTradeoffDiagram from './components/visual/InductiveBiasTradeoffDiagram';
import PatchSlicingDiagram from './components/visual/PatchSlicingDiagram';
import ViTCanonicalArchitectureViewer from './components/visual/ViTCanonicalArchitectureViewer';
import PatchEmbeddingMechanicsDiagram from './components/visual/PatchEmbeddingMechanicsDiagram';
import ClsTokenPositionalDiagram from './components/visual/ClsTokenPositionalDiagram';
import ViTBlockAnatomyDiagram from './components/visual/ViTBlockAnatomyDiagram';
import DataHungerOverfittingDiagram from './components/visual/DataHungerOverfittingDiagram';
import CutMixConceptDiagram from './components/visual/CutMixConceptDiagram';
import AttentionRolloutDiagram from './components/visual/AttentionRolloutDiagram';
import ViTArchitecturesComparisonDiagram from './components/visual/ViTArchitecturesComparisonDiagram';

// Interactive Components
import PatchSlicingLab from './components/interactive/PatchSlicingLab';
import ViTTensorTrackerLab from './components/interactive/ViTTensorTrackerLab';
import ViTModelTradeoffLab from './components/interactive/ViTModelTradeoffLab';
import ViTInteractiveQuiz from './components/interactive/ViTInteractiveQuiz';

export default function App() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [isOverviewOpen, setIsOverviewOpen] = useState(false);
  const [isAutoplay, setIsAutoplay] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [scale, setScale] = useState(1);

  const totalSlides = slides.length;
  const currentSlide = slides[currentSlideIndex];
  const containerRef = useRef(null);

  // Auto-scaler responsivo mantendo estritamente o formato 16:9 (1366 x 768)
  const updateScale = useCallback(() => {
    if (!containerRef.current) return;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const targetWidth = 1366;
    const targetHeight = 768;

    // Em tela cheia remove padding para aproveitar 100% da tela; em janela usa margem de 20px
    const isFullscreenActive = !!document.fullscreenElement;
    const paddingX = isFullscreenActive ? 0 : 20;
    const paddingY = isFullscreenActive ? 0 : 20;

    const scaleX = (windowWidth - paddingX) / targetWidth;
    const scaleY = (windowHeight - paddingY) / targetHeight;

    // Escala dinâmica para preencher todo o espaço disponível na janela/tela
    const newScale = Math.min(scaleX, scaleY);
    setScale(Math.max(0.35, newScale));
  }, []);

  useEffect(() => {
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [updateScale]);

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
      updateScale();
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, [updateScale]);

  // Navegação
  const goToNext = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev < totalSlides - 1 ? prev + 1 : prev));
  }, [totalSlides]);

  const goToPrev = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  const goToFirst = useCallback(() => {
    setCurrentSlideIndex(0);
  }, []);

  const goToLast = useCallback(() => {
    setCurrentSlideIndex(totalSlides - 1);
  }, [totalSlides]);

  const goToSlide = useCallback((index) => {
    if (index >= 0 && index < totalSlides) {
      setCurrentSlideIndex(index);
      setIsOverviewOpen(false);
    }
  }, [totalSlides]);

  const toggleNotes = useCallback(() => {
    setIsNotesOpen((prev) => !prev);
  }, []);

  const toggleOverview = useCallback(() => {
    setIsOverviewOpen((prev) => !prev);
  }, []);

  const toggleAutoplay = useCallback(() => {
    setIsAutoplay((prev) => !prev);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch((err) => {
        console.warn('Erro ao entrar em tela cheia:', err);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      }).catch((err) => {
        console.warn('Erro ao sair de tela cheia:', err);
      });
    }
  }, []);

  // Autoplay
  useEffect(() => {
    let interval = null;
    if (isAutoplay) {
      interval = setInterval(() => {
        setCurrentSlideIndex((prev) => {
          if (prev < totalSlides - 1) return prev + 1;
          setIsAutoplay(false);
          return prev;
        });
      }, 12000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoplay, totalSlides]);

  // Atalhos de teclado
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) {
        return;
      }

      switch (e.key) {
        case 'ArrowRight':
        case ' ':
        case 'PageDown':
          e.preventDefault();
          goToNext();
          break;
        case 'ArrowLeft':
        case 'PageUp':
          e.preventDefault();
          goToPrev();
          break;
        case 'Home':
          e.preventDefault();
          goToFirst();
          break;
        case 'End':
          e.preventDefault();
          goToLast();
          break;
        case 'n':
        case 'N':
          e.preventDefault();
          toggleNotes();
          break;
        case 'g':
        case 'G':
          e.preventDefault();
          toggleOverview();
          break;
        case 'f':
        case 'F':
          e.preventDefault();
          toggleFullscreen();
          break;
        case 'Escape':
          if (isNotesOpen) setIsNotesOpen(false);
          if (isOverviewOpen) setIsOverviewOpen(false);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrev, goToFirst, goToLast, toggleNotes, toggleOverview, toggleFullscreen, isNotesOpen, isOverviewOpen]);

  // Renderizador de Conteúdo do Slide
  const renderSlideContent = () => {
    if (!currentSlide) return null;

    if (currentSlide.type === 'title') {
      return (
        <div className="layout-title-slide">
          <div className="title-banner">
            <h1 className="title-discipline">{currentSlide.title}</h1>
            <p className="title-subtopic">{currentSlide.subtitle}</p>
          </div>

          <div className="title-meta-box">
            <div className="title-etapa">Etapa / Aula 04</div>
            <div className="title-author">
              Faculdade Infnet • Pós-Graduação em IA & Machine Learning
            </div>

            <div className="title-badge-grid">
              {[
                'Fatiamento em Patches (16×16)',
                'Patch Embedding (Conv2D Stride)',
                'Token [CLS] & Position Embeddings',
                'O Dilema do Viés Indutivo',
                'Regularização com CutMix & Mixup',
                'Mapas de Atenção Rollout'
              ].map((t, idx) => (
                <div key={idx} className="topic-pill">
                  <span style={{ color: 'var(--infnet-cyan)' }}>✦</span> {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    // Componentes Visuais Customizados
    if (currentSlide.type === 'visual-component') {
      return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          {currentSlide.component === 'PixelAttentionExplosionDiagram' && <PixelAttentionExplosionDiagram />}
          {currentSlide.component === 'InductiveBiasTradeoffDiagram' && <InductiveBiasTradeoffDiagram />}
          {currentSlide.component === 'PatchSlicingDiagram' && <PatchSlicingDiagram />}
          {currentSlide.component === 'ViTCanonicalArchitectureViewer' && <ViTCanonicalArchitectureViewer />}
          {currentSlide.component === 'PatchEmbeddingMechanicsDiagram' && <PatchEmbeddingMechanicsDiagram />}
          {currentSlide.component === 'ClsTokenPositionalDiagram' && <ClsTokenPositionalDiagram />}
          {currentSlide.component === 'ViTBlockAnatomyDiagram' && <ViTBlockAnatomyDiagram />}
          {currentSlide.component === 'DataHungerOverfittingDiagram' && <DataHungerOverfittingDiagram />}
          {currentSlide.component === 'CutMixConceptDiagram' && <CutMixConceptDiagram />}
          {currentSlide.component === 'AttentionRolloutDiagram' && <AttentionRolloutDiagram />}
          {currentSlide.component === 'ViTArchitecturesComparisonDiagram' && <ViTArchitecturesComparisonDiagram />}
        </div>
      );
    }

    // Laboratórios Interativos
    if (currentSlide.type === 'interactive') {
      return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          {currentSlide.component === 'PatchSlicingLab' && <PatchSlicingLab />}
          {currentSlide.component === 'ViTTensorTrackerLab' && <ViTTensorTrackerLab />}
          {currentSlide.component === 'ViTModelTradeoffLab' && <ViTModelTradeoffLab />}
        </div>
      );
    }

    // Quiz de Encerramento
    if (currentSlide.type === 'quiz') {
      return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <ViTInteractiveQuiz />
        </div>
      );
    }

    return null;
  };

  return (
    <ErrorBoundary>
      <div className="presentation-container" ref={containerRef}>
        {/* Caixa principal escalada em proporção fixa 16:9 */}
        <div
          className="slide-scaler"
          style={{
            transform: `scale(${scale})`,
          }}
        >
          <Header slide={currentSlide} />

          <main className="slide-body">
            <ErrorBoundary key={currentSlideIndex}>
              {renderSlideContent()}
            </ErrorBoundary>
          </main>

          <Footer
            currentSlide={currentSlideIndex}
            totalSlides={totalSlides}
          />

          <NotesDrawer
            isOpen={isNotesOpen}
            onClose={() => setIsNotesOpen(false)}
            currentSlide={currentSlideIndex}
            slide={currentSlide}
          />
        </div>

        {/* Barra flutuante de controles */}
        <Controls
          currentSlide={currentSlideIndex}
          totalSlides={totalSlides}
          onPrev={goToPrev}
          onNext={goToNext}
          onToggleNotes={toggleNotes}
          onToggleOverview={toggleOverview}
          onToggleAutoplay={toggleAutoplay}
          onToggleFullscreen={toggleFullscreen}
          isAutoplay={isAutoplay}
          isFullscreen={isFullscreen}
        />

        {/* Modal de Visão Geral em Grade */}
        <OverviewModal
          isOpen={isOverviewOpen}
          onClose={() => setIsOverviewOpen(false)}
          slides={slides}
          currentSlide={currentSlideIndex}
          onSelectSlide={goToSlide}
        />
      </div>
    </ErrorBoundary>
  );
}
