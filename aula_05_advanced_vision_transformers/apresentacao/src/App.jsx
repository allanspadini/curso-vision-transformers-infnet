import React, { useState, useEffect, useRef, useCallback } from 'react';
import { slides } from './data/slidesData';
import Header from './components/Header';
import Footer from './components/Footer';
import Controls from './components/Controls';
import NotesDrawer from './components/NotesDrawer';
import OverviewModal from './components/OverviewModal';
import ErrorBoundary from './components/ErrorBoundary';

// Componentes Visuais
import ViTReviewPipelineDiagram from './components/visual/ViTReviewPipelineDiagram';
import ViTLimitationsDiagnosticDiagram from './components/visual/ViTLimitationsDiagnosticDiagram';
import ViTEvolutionMapDiagram from './components/visual/ViTEvolutionMapDiagram';
import DeiTDistillationOverviewDiagram from './components/visual/DeiTDistillationOverviewDiagram';
import DensePredictionBottleneckDiagram from './components/visual/DensePredictionBottleneckDiagram';
import PVTArchitectureDiagram from './components/visual/PVTArchitectureDiagram';
import SwinWindowPartitionDiagram from './components/visual/SwinWindowPartitionDiagram';
import SwinShiftedWindowDiagram from './components/visual/SwinShiftedWindowDiagram';
import SwinCyclicShiftDiagram from './components/visual/SwinCyclicShiftDiagram';
import SwinMacroArchitectureDiagram from './components/visual/SwinMacroArchitectureDiagram';
import DINOOverviewDiagram from './components/visual/DINOOverviewDiagram';
import DINOMouseMechanicsDiagram from './components/visual/DINOMouseMechanicsDiagram';
import MAEAndDINOv2Diagram from './components/visual/MAEAndDINOv2Diagram';
import ConvNeXtEvolutionDiagram from './components/visual/ConvNeXtEvolutionDiagram';

// Componentes Interativos
import PVTSimulatorLab from './components/interactive/PVTSimulatorLab';
import SwinWindowLab from './components/interactive/SwinWindowLab';
import DINOAttentionViewerLab from './components/interactive/DINOAttentionViewerLab';
import ViTAdvancedQuizLab from './components/interactive/ViTAdvancedQuizLab';

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

    const isFullscreenActive = !!document.fullscreenElement;
    const paddingX = isFullscreenActive ? 0 : 20;
    const paddingY = isFullscreenActive ? 0 : 20;

    const scaleX = (windowWidth - paddingX) / targetWidth;
    const scaleY = (windowHeight - paddingY) / targetHeight;

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
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Erro ao entrar em fullscreen: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
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
      }, 8000);
    }
    return () => clearInterval(interval);
  }, [isAutoplay, totalSlides]);

  // Atalhos de teclado
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['input', 'textarea', 'select'].includes(e.target.tagName.toLowerCase())) {
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
            <div className="title-etapa">Etapa / Aula 05</div>
            <div className="title-author">
              Faculdade Infnet • Pós-Graduação em IA & Machine Learning
            </div>

            <div className="title-badge-grid">
              {(currentSlide.badges || [
                'Revisão do ViT Canônico',
                'DeiT & Distillation Token',
                'PVT & Spatial-Reduction',
                'Swin & Shifted Windows',
                'DINO & Self-Supervision',
                'MAE & ConvNeXt'
              ]).map((t, idx) => (
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
          {currentSlide.component === 'ViTReviewPipelineDiagram' && <ViTReviewPipelineDiagram />}
          {currentSlide.component === 'ViTLimitationsDiagnosticDiagram' && <ViTLimitationsDiagnosticDiagram />}
          {currentSlide.component === 'ViTEvolutionMapDiagram' && <ViTEvolutionMapDiagram />}
          {currentSlide.component === 'DeiTDistillationOverviewDiagram' && <DeiTDistillationOverviewDiagram />}
          {currentSlide.component === 'DensePredictionBottleneckDiagram' && <DensePredictionBottleneckDiagram />}
          {currentSlide.component === 'PVTArchitectureDiagram' && <PVTArchitectureDiagram />}
          {currentSlide.component === 'SwinWindowPartitionDiagram' && <SwinWindowPartitionDiagram />}
          {currentSlide.component === 'SwinShiftedWindowDiagram' && <SwinShiftedWindowDiagram />}
          {currentSlide.component === 'SwinCyclicShiftDiagram' && <SwinCyclicShiftDiagram />}
          {currentSlide.component === 'SwinMacroArchitectureDiagram' && <SwinMacroArchitectureDiagram />}
          {currentSlide.component === 'DINOOverviewDiagram' && <DINOOverviewDiagram />}
          {currentSlide.component === 'DINOMouseMechanicsDiagram' && <DINOMouseMechanicsDiagram />}
          {currentSlide.component === 'MAEAndDINOv2Diagram' && <MAEAndDINOv2Diagram />}
          {currentSlide.component === 'ConvNeXtEvolutionDiagram' && <ConvNeXtEvolutionDiagram />}
        </div>
      );
    }

    // Laboratórios Interativos
    if (currentSlide.type === 'interactive') {
      return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          {currentSlide.component === 'PVTSimulatorLab' && <PVTSimulatorLab />}
          {currentSlide.component === 'SwinWindowLab' && <SwinWindowLab />}
          {currentSlide.component === 'DINOAttentionViewerLab' && <DINOAttentionViewerLab />}
          {currentSlide.component === 'ViTAdvancedQuizLab' && <ViTAdvancedQuizLab />}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="presentation-container" ref={containerRef}>
      <ErrorBoundary>
        <div
          className="slide-scaler"
          style={{
            transform: `scale(${scale})`
          }}
        >
          <Header slide={currentSlide} />

          <main className="slide-body">
            {renderSlideContent()}
          </main>

          <Footer
            currentSlide={currentSlideIndex}
            totalSlides={totalSlides}
            onToggleNotes={toggleNotes}
            onToggleOverview={toggleOverview}
            onToggleFullscreen={toggleFullscreen}
          />

          {/* Drawer de Notas do Apresentador */}
          <NotesDrawer
            isOpen={isNotesOpen}
            onClose={() => setIsNotesOpen(false)}
            currentSlide={currentSlideIndex}
            slide={currentSlide}
          />
        </div>

        {/* Controles Flutuantes (Fora do scaler) */}
        <Controls
          onPrev={goToPrev}
          onNext={goToNext}
          onToggleNotes={toggleNotes}
          onToggleOverview={toggleOverview}
          onToggleAutoplay={toggleAutoplay}
          onToggleFullscreen={toggleFullscreen}
          isAutoplay={isAutoplay}
          isFullscreen={isFullscreen}
          isNotesOpen={isNotesOpen}
          currentSlide={currentSlideIndex}
          totalSlides={totalSlides}
        />

        {/* Modal de Visão Geral / Grid de Slides (Fora do scaler) */}
        <OverviewModal
          isOpen={isOverviewOpen}
          onClose={() => setIsOverviewOpen(false)}
          slides={slides}
          currentSlideIndex={currentSlideIndex}
          onSelectSlide={goToSlide}
        />
      </ErrorBoundary>
    </div>
  );
}
