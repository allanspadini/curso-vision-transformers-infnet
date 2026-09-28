import React, { useState, useEffect, useRef, useCallback } from 'react';
import { slides } from './data/slidesData';
import Header from './components/Header';
import Footer from './components/Footer';
import Controls from './components/Controls';
import NotesDrawer from './components/NotesDrawer';
import OverviewModal from './components/OverviewModal';
import ErrorBoundary from './components/ErrorBoundary';

// Componentes Visuais
import CourseSynthesisRoadmapDiagram from './components/visual/CourseSynthesisRoadmapDiagram';
import GenerativeEvaluationPitfallsDiagram from './components/visual/GenerativeEvaluationPitfallsDiagram';
import FIDInceptionFeaturePipelineDiagram from './components/visual/FIDInceptionFeaturePipelineDiagram';
import FIDEngineeringPracticesDiagram from './components/visual/FIDEngineeringPracticesDiagram';
import ArchMarco1CnnUnetDiagram from './components/visual/ArchMarco1CnnUnetDiagram';
import ArchMarco2TransformerBertDiagram from './components/visual/ArchMarco2TransformerBertDiagram';
import ArchMarco3ViTCanonicDiagram from './components/visual/ArchMarco3ViTCanonicDiagram';
import ArchMarco4SwinTransformerDiagram from './components/visual/ArchMarco4SwinTransformerDiagram';
import ArchMarco5CLIPMultimodalDiagram from './components/visual/ArchMarco5CLIPMultimodalDiagram';
import ArchMarco6GenerativeDiffusionDiagram from './components/visual/ArchMarco6GenerativeDiffusionDiagram';
import ViTTensorFlowDiagram from './components/visual/ViTTensorFlowDiagram';
import AttentionMapExtractionDiagram from './components/visual/AttentionMapExtractionDiagram';
import CLIPMultimodalSpaceDiagram from './components/visual/CLIPMultimodalSpaceDiagram';
import SemanticRetrievalThresholdDiagram from './components/visual/SemanticRetrievalThresholdDiagram';
import FeatureExtractionVsFineTuningDiagram from './components/visual/FeatureExtractionVsFineTuningDiagram';
import AugmentationTaxonomyRiskDiagram from './components/visual/AugmentationTaxonomyRiskDiagram';
import MulticlassAccuracyDecompositionDiagram from './components/visual/MulticlassAccuracyDecompositionDiagram';
import ImbalanceRecallParadoxDiagram from './components/visual/ImbalanceRecallParadoxDiagram';
import GenerativeMitigationProtocolDiagram from './components/visual/GenerativeMitigationProtocolDiagram';
import ValidationPitfallsAndDomainShiftDiagram from './components/visual/ValidationPitfallsAndDomainShiftDiagram';

// Componentes Interativos
import FIDSimulatorLab from './components/interactive/FIDSimulatorLab';
import ViTAttentionInspectorLab from './components/interactive/ViTAttentionInspectorLab';
import CLIPSearchThresholdLab from './components/interactive/CLIPSearchThresholdLab';
import FinalCourseQuizLab from './components/interactive/FinalCourseQuizLab';

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
        console.error('Erro ao tentar entrar em modo tela cheia:', err);
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
          if (prev >= totalSlides - 1) {
            setIsAutoplay(false);
            return prev;
          }
          return prev + 1;
        });
      }, 8000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoplay, totalSlides]);

  // Atalhos de Teclado
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
            <div className="title-etapa">Etapa Final / Aula 08</div>
            <div className="title-author">
              Faculdade Infnet • Pós-Graduação em Visão Computacional com CNNs e Transformers
            </div>

            <div className="title-badge-grid">
              {(currentSlide.badges || [
                'Fréchet Inception Distance (FID)',
                'Inception-v3 pool3 (2048-D)',
                'Vision Transformers & Attention Maps',
                'Espaço Latente Multimodal CLIP',
                'Cosine Similarity & Thresholds',
                'Transfer Learning & Augmentation',
                'Oversampling Generativo cGAN/CycleGAN',
                'Governança Sem Vazamento de Dados'
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

    // Componentes Visuais
    if (currentSlide.type === 'visual-component') {
      return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          {currentSlide.component === 'CourseSynthesisRoadmapDiagram' && <CourseSynthesisRoadmapDiagram />}
          {currentSlide.component === 'GenerativeEvaluationPitfallsDiagram' && <GenerativeEvaluationPitfallsDiagram />}
          {currentSlide.component === 'FIDInceptionFeaturePipelineDiagram' && <FIDInceptionFeaturePipelineDiagram />}
          {currentSlide.component === 'FIDEngineeringPracticesDiagram' && <FIDEngineeringPracticesDiagram />}
          {currentSlide.component === 'ArchMarco1CnnUnetDiagram' && <ArchMarco1CnnUnetDiagram />}
          {currentSlide.component === 'ArchMarco2TransformerBertDiagram' && <ArchMarco2TransformerBertDiagram />}
          {currentSlide.component === 'ArchMarco3ViTCanonicDiagram' && <ArchMarco3ViTCanonicDiagram />}
          {currentSlide.component === 'ArchMarco4SwinTransformerDiagram' && <ArchMarco4SwinTransformerDiagram />}
          {currentSlide.component === 'ArchMarco5CLIPMultimodalDiagram' && <ArchMarco5CLIPMultimodalDiagram />}
          {currentSlide.component === 'ArchMarco6GenerativeDiffusionDiagram' && <ArchMarco6GenerativeDiffusionDiagram />}
          {currentSlide.component === 'ViTTensorFlowDiagram' && <ViTTensorFlowDiagram />}
          {currentSlide.component === 'AttentionMapExtractionDiagram' && <AttentionMapExtractionDiagram />}
          {currentSlide.component === 'CLIPMultimodalSpaceDiagram' && <CLIPMultimodalSpaceDiagram />}
          {currentSlide.component === 'SemanticRetrievalThresholdDiagram' && <SemanticRetrievalThresholdDiagram />}
          {currentSlide.component === 'FeatureExtractionVsFineTuningDiagram' && <FeatureExtractionVsFineTuningDiagram />}
          {currentSlide.component === 'AugmentationTaxonomyRiskDiagram' && <AugmentationTaxonomyRiskDiagram />}
          {currentSlide.component === 'MulticlassAccuracyDecompositionDiagram' && <MulticlassAccuracyDecompositionDiagram />}
          {currentSlide.component === 'ImbalanceRecallParadoxDiagram' && <ImbalanceRecallParadoxDiagram />}
          {currentSlide.component === 'GenerativeMitigationProtocolDiagram' && <GenerativeMitigationProtocolDiagram />}
          {currentSlide.component === 'ValidationPitfallsAndDomainShiftDiagram' && <ValidationPitfallsAndDomainShiftDiagram />}
        </div>
      );
    }

    // Componentes Interativos
    if (currentSlide.type === 'interactive') {
      return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          {currentSlide.component === 'FIDSimulatorLab' && <FIDSimulatorLab />}
          {currentSlide.component === 'ViTAttentionInspectorLab' && <ViTAttentionInspectorLab />}
          {currentSlide.component === 'CLIPSearchThresholdLab' && <CLIPSearchThresholdLab />}
          {currentSlide.component === 'FinalCourseQuizLab' && <FinalCourseQuizLab />}
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

      {/* Controles Flutuantes e Modal Overview fora da escala */}
      <Controls
        currentSlide={currentSlideIndex}
        totalSlides={totalSlides}
        onNext={goToNext}
        onPrev={goToPrev}
        isAutoplay={isAutoplay}
        onToggleAutoplay={toggleAutoplay}
        onToggleOverview={toggleOverview}
        onToggleNotes={toggleNotes}
        onToggleFullscreen={toggleFullscreen}
      />

      <OverviewModal
        isOpen={isOverviewOpen}
        onClose={() => setIsOverviewOpen(false)}
        slides={slides}
        currentSlide={currentSlideIndex}
        onSelectSlide={goToSlide}
      />
    </div>
  );
}
