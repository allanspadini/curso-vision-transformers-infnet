import React, { useState, useEffect, useRef, useCallback } from 'react';
import { slides } from './data/slidesData';
import Header from './components/Header';
import Footer from './components/Footer';
import Controls from './components/Controls';
import NotesDrawer from './components/NotesDrawer';
import OverviewModal from './components/OverviewModal';
import ErrorBoundary from './components/ErrorBoundary';

// Componentes Visuais
import GenerativeModelsLandscapeDiagram from './components/visual/GenerativeModelsLandscapeDiagram';
import AdversarialGameMinimaxDiagram from './components/visual/AdversarialGameMinimaxDiagram';
import GeneratorDiscriminatorArchitectureDiagram from './components/visual/GeneratorDiscriminatorArchitectureDiagram';
import MinimaxLossAndGradientsDiagram from './components/visual/MinimaxLossAndGradientsDiagram';
import DisjointManifoldsVanishingGradDiagram from './components/visual/DisjointManifoldsVanishingGradDiagram';
import TrainingDynamicsNashEquilibriumDiagram from './components/visual/TrainingDynamicsNashEquilibriumDiagram';
import StabilizationTechniquesDiagram from './components/visual/StabilizationTechniquesDiagram';
import WassersteinDistanceWGANShiftDiagram from './components/visual/WassersteinDistanceWGANShiftDiagram';
import ModeCollapseAnatomyDiagram from './components/visual/ModeCollapseAnatomyDiagram';
import CGANArchitectureDiagram from './components/visual/CGANArchitectureDiagram';
import CycleGANMacroArchitectureDiagram from './components/visual/CycleGANMacroArchitectureDiagram';
import CycleConsistencyLossDiagram from './components/visual/CycleConsistencyLossDiagram';
import BiomedicalTranslationDiagram from './components/visual/BiomedicalTranslationDiagram';
import EvaluationMetricsISFIDDiagram from './components/visual/EvaluationMetricsISFIDDiagram';
import PrecisionRecallGenerativeModelsDiagram from './components/visual/PrecisionRecallGenerativeModelsDiagram';
import TrainingDiagnosticsPlaybookDiagram from './components/visual/TrainingDiagnosticsPlaybookDiagram';
import AnoGANMedicalAnomalyDiagram from './components/visual/AnoGANMedicalAnomalyDiagram';
import PyTorchGANPipelineDiagram from './components/visual/PyTorchGANPipelineDiagram';

// Componentes Interativos
import GANMinimaxGameLab from './components/interactive/GANMinimaxGameLab';
import GANConditionalLab from './components/interactive/GANConditionalLab';
import CycleGANConsistencyLab from './components/interactive/CycleGANConsistencyLab';
import DownstreamEvaluationLab from './components/interactive/DownstreamEvaluationLab';
import GANTrainingStabilityLab from './components/interactive/GANTrainingStabilityLab';
import GANModeCollapseMetricsLab from './components/interactive/GANModeCollapseMetricsLab';
import GANAnomalyDetectionLab from './components/interactive/GANAnomalyDetectionLab';
import GANQuizLab from './components/interactive/GANQuizLab';

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
            <div className="title-etapa">Etapa / Aula 07</div>
            <div className="title-author">
              Faculdade Infnet • Pós-Graduação em Visão Computacional com CNNs e Transformers
            </div>

            <div className="title-badge-grid">
              {(currentSlide.badges || [
                'Modelos Generativos Implícitos',
                'Teoria dos Jogos Minimax',
                'DCGAN & Transposed Conv',
                'Instabilidade & Suportes Disjuntos',
                'Diagnóstico de Mode Collapse',
                'FID & Precision / Recall',
                'Detecção de Anomalias (AnoGAN)'
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
          {currentSlide.component === 'GenerativeModelsLandscapeDiagram' && <GenerativeModelsLandscapeDiagram />}
          {currentSlide.component === 'AdversarialGameMinimaxDiagram' && <AdversarialGameMinimaxDiagram />}
          {currentSlide.component === 'GeneratorDiscriminatorArchitectureDiagram' && <GeneratorDiscriminatorArchitectureDiagram />}
          {currentSlide.component === 'MinimaxLossAndGradientsDiagram' && <MinimaxLossAndGradientsDiagram />}
          {currentSlide.component === 'DisjointManifoldsVanishingGradDiagram' && <DisjointManifoldsVanishingGradDiagram />}
          {currentSlide.component === 'TrainingDynamicsNashEquilibriumDiagram' && <TrainingDynamicsNashEquilibriumDiagram />}
          {currentSlide.component === 'StabilizationTechniquesDiagram' && <StabilizationTechniquesDiagram />}
          {currentSlide.component === 'WassersteinDistanceWGANShiftDiagram' && <WassersteinDistanceWGANShiftDiagram />}
          {currentSlide.component === 'ModeCollapseAnatomyDiagram' && <ModeCollapseAnatomyDiagram />}
          {currentSlide.component === 'CGANArchitectureDiagram' && <CGANArchitectureDiagram />}
          {currentSlide.component === 'CycleGANMacroArchitectureDiagram' && <CycleGANMacroArchitectureDiagram />}
          {currentSlide.component === 'CycleConsistencyLossDiagram' && <CycleConsistencyLossDiagram />}
          {currentSlide.component === 'BiomedicalTranslationDiagram' && <BiomedicalTranslationDiagram />}
          {currentSlide.component === 'EvaluationMetricsISFIDDiagram' && <EvaluationMetricsISFIDDiagram />}
          {currentSlide.component === 'PrecisionRecallGenerativeModelsDiagram' && <PrecisionRecallGenerativeModelsDiagram />}
          {currentSlide.component === 'TrainingDiagnosticsPlaybookDiagram' && <TrainingDiagnosticsPlaybookDiagram />}
          {currentSlide.component === 'AnoGANMedicalAnomalyDiagram' && <AnoGANMedicalAnomalyDiagram />}
          {currentSlide.component === 'PyTorchGANPipelineDiagram' && <PyTorchGANPipelineDiagram />}
        </div>
      );
    }

    // Componentes Interativos
    if (currentSlide.type === 'interactive') {
      return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          {currentSlide.component === 'GANMinimaxGameLab' && <GANMinimaxGameLab />}
          {currentSlide.component === 'GANConditionalLab' && <GANConditionalLab />}
          {currentSlide.component === 'CycleGANConsistencyLab' && <CycleGANConsistencyLab />}
          {currentSlide.component === 'DownstreamEvaluationLab' && <DownstreamEvaluationLab />}
          {currentSlide.component === 'GANTrainingStabilityLab' && <GANTrainingStabilityLab />}
          {currentSlide.component === 'GANModeCollapseMetricsLab' && <GANModeCollapseMetricsLab />}
          {currentSlide.component === 'GANAnomalyDetectionLab' && <GANAnomalyDetectionLab />}
          {currentSlide.component === 'GANQuizLab' && <GANQuizLab />}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="presentation-container" ref={containerRef}>
      {/* Moldura Fixa 16:9 (1366 x 768) com transform: scale(scale) */}
      <div
        className="slide-scaler"
        style={{
          transform: `scale(${scale})`,
        }}
      >
        <ErrorBoundary>
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

          <NotesDrawer
            isOpen={isNotesOpen}
            onClose={() => setIsNotesOpen(false)}
            currentSlide={currentSlideIndex}
            slide={currentSlide}
          />
        </ErrorBoundary>
      </div>

      {/* Controles Flutuantes e Modal Overview fora da escala para manter nitidez */}
      <Controls
        currentSlide={currentSlideIndex}
        totalSlides={totalSlides}
        onPrev={goToPrev}
        onNext={goToNext}
        isAutoplay={isAutoplay}
        onToggleAutoplay={toggleAutoplay}
        isNotesOpen={isNotesOpen}
        onToggleNotes={toggleNotes}
        isOverviewOpen={isOverviewOpen}
        onToggleOverview={toggleOverview}
        isFullscreen={isFullscreen}
        onToggleFullscreen={toggleFullscreen}
      />

      <OverviewModal
        isOpen={isOverviewOpen}
        onClose={() => setIsOverviewOpen(false)}
        slides={slides}
        currentSlideIndex={currentSlideIndex}
        onSelectSlide={goToSlide}
      />
    </div>
  );
}
