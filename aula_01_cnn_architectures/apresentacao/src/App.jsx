import React, { useState, useEffect, useRef, useCallback } from 'react';
import { slidesData } from './data/slidesData';
import Header from './components/Header';
import Footer from './components/Footer';
import Controls from './components/Controls';
import NotesDrawer from './components/NotesDrawer';
import OverviewModal from './components/OverviewModal';
import MathView from './components/MathView';

// Interactive Components
import ResidualExplorer from './components/interactive/ResidualExplorer';
import ArchitectureSelector from './components/interactive/ArchitectureSelector';
import TransferLearningSimulator from './components/interactive/TransferLearningSimulator';
import VisionTasksShowcase from './components/interactive/VisionTasksShowcase';
import QuizComponent from './components/interactive/QuizComponent';

// Visual Diagram Components
import ShallowPlateauDiagram from './components/visual/ShallowPlateauDiagram';
import DegradationVanishingDiagram from './components/visual/DegradationVanishingDiagram';
import Inception1x1Diagram from './components/visual/Inception1x1Diagram';
import DepthwiseSeparableDiagram from './components/visual/DepthwiseSeparableDiagram';
import SENetDiagram from './components/visual/SENetDiagram';
import VRAMBreakdownDiagram from './components/visual/VRAMBreakdownDiagram';
import RevNetDiagram from './components/visual/RevNetDiagram';
import DualHeadDiagram from './components/visual/DualHeadDiagram';
import UNetDiagram from './components/visual/UNetDiagram';
import LeNetVisualizer from './components/visual/LeNetVisualizer';
import AlexNetVisualizer from './components/visual/AlexNetVisualizer';
import InceptionModuleVisualizer from './components/visual/InceptionModuleVisualizer';
import GoogLeNetArchitectureVisualizer from './components/visual/GoogLeNetArchitectureVisualizer';
import ResidualConceptDiagram from './components/visual/ResidualConceptDiagram';
import ObjectTrackingVisualizer from './components/visual/ObjectTrackingVisualizer';

// Icons
import {
  AlertTriangle,
  Zap,
  Cpu,
  Layers,
  CheckCircle2,
  TrendingDown,
  HelpCircle,
  Minimize2,
  Sliders,
  Scale,
  GitFork,
  Smartphone,
  Award,
  Code,
  Package,
  Database,
  Crosshair,
  Calculator,
  Target,
  Activity,
  Fingerprint,
  Grid,
  GitPullRequest,
  ArrowRight,
  BookOpen,
  Split,
  Eye,
  Navigation,
  ExternalLink
} from 'lucide-react';

const ICON_MAP = {
  AlertTriangle: <AlertTriangle size={20} />,
  Zap: <Zap size={20} />,
  Cpu: <Cpu size={20} />,
  Layers: <Layers size={20} />,
  CheckCircle2: <CheckCircle2 size={20} />,
  TrendingDown: <TrendingDown size={20} />,
  HelpCircle: <HelpCircle size={20} />,
  Minimize2: <Minimize2 size={20} />,
  Sliders: <Sliders size={20} />,
  Scale: <Scale size={20} />,
  GitFork: <GitFork size={20} />,
  Smartphone: <Smartphone size={20} />,
  Award: <Award size={20} />,
  Code: <Code size={20} />,
  Package: <Package size={20} />,
  Database: <Database size={20} />,
  Crosshair: <Crosshair size={20} />,
  Calculator: <Calculator size={20} />,
  Target: <Target size={20} />,
  Activity: <Activity size={20} />,
  Fingerprint: <Fingerprint size={20} />,
  Grid: <Grid size={20} />,
  GitPullRequest: <GitPullRequest size={20} />,
  ArrowRight: <ArrowRight size={20} />,
  BookOpen: <BookOpen size={20} />,
  Split: <Split size={20} />,
  Eye: <Eye size={20} />,
  Navigation: <Navigation size={20} />
};

export default function App() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [isOverviewOpen, setIsOverviewOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isAutoplay, setIsAutoplay] = useState(false);
  const [scale, setScale] = useState(1);

  const containerRef = useRef(null);
  const currentSlide = slidesData[currentSlideIndex];

  // ==========================================
  // Responsive 16:9 Aspect Ratio Auto-scaler
  // ==========================================
  const updateScale = useCallback(() => {
    if (!containerRef.current) return;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const targetWidth = 1366;
    const targetHeight = 768;

    const scaleX = (windowWidth - 24) / targetWidth;
    const scaleY = (windowHeight - 24) / targetHeight;
    const newScale = Math.min(scaleX, scaleY, 1.25);
    setScale(Math.max(0.4, newScale));
  }, []);

  useEffect(() => {
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [updateScale]);

  // ==========================================
  // Navigation Handlers
  // ==========================================
  const goToNext = useCallback(() => {
    setCurrentSlideIndex((prev) => Math.min(prev + 1, slidesData.length - 1));
  }, []);

  const goToPrev = useCallback(() => {
    setCurrentSlideIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  const goToFirst = useCallback(() => {
    setCurrentSlideIndex(0);
  }, []);

  const goToLast = useCallback(() => {
    setCurrentSlideIndex(slidesData.length - 1);
  }, []);

  const toggleNotes = useCallback(() => {
    setIsNotesOpen((prev) => !prev);
  }, []);

  const toggleOverview = useCallback(() => {
    setIsOverviewOpen((prev) => !prev);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error('Fullscreen request failed:', err);
      });
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
  }, []);

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
      updateScale();
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, [updateScale]);

  // ==========================================
  // Autoplay Timer
  // ==========================================
  useEffect(() => {
    let interval = null;
    if (isAutoplay) {
      interval = setInterval(() => {
        setCurrentSlideIndex((prev) => {
          if (prev >= slidesData.length - 1) {
            setIsAutoplay(false);
            return prev;
          }
          return prev + 1;
        });
      }, 12000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoplay]);

  // ==========================================
  // Global Keyboard Shortcuts
  // ==========================================
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

  // ==========================================
  // Slide Content Renderer
  // ==========================================
  const renderSlideContent = () => {
    if (!currentSlide) return null;

    // 1. Title Slide Layout
    if (currentSlide.type === 'title') {
      return (
        <div className="layout-title-slide">
          <div className="title-banner">
            <h1 className="title-discipline">{currentSlide.title}</h1>
            <p className="title-subtopic">{currentSlide.subtitle}</p>
          </div>

          <div className="title-meta-box">
            <div className="title-etapa">Etapa / Aula 01</div>
            <div className="title-author">
              {currentSlide.author} • Pós-Graduação em Inteligência Artificial & Visão Computacional
            </div>

            <div className="title-badge-grid">
              {currentSlide.topics && currentSlide.topics.map((t, idx) => (
                <div key={idx} className="topic-pill">
                  <span style={{ color: 'var(--infnet-cyan)' }}>✦</span> {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    // 2. Visual Component Layout (Custom Diagrams)
    if (currentSlide.type === 'visual-component') {
      return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          {currentSlide.component === 'ShallowPlateauDiagram' && <ShallowPlateauDiagram />}
          {currentSlide.component === 'DegradationVanishingDiagram' && <DegradationVanishingDiagram />}
          {currentSlide.component === 'Inception1x1Diagram' && <Inception1x1Diagram />}
          {currentSlide.component === 'DepthwiseSeparableDiagram' && <DepthwiseSeparableDiagram />}
          {currentSlide.component === 'SENetDiagram' && <SENetDiagram />}
          {currentSlide.component === 'VRAMBreakdownDiagram' && <VRAMBreakdownDiagram />}
          {currentSlide.component === 'RevNetDiagram' && <RevNetDiagram />}
          {currentSlide.component === 'DualHeadDiagram' && <DualHeadDiagram />}
          {currentSlide.component === 'UNetDiagram' && <UNetDiagram />}
          {currentSlide.component === 'LeNetVisualizer' && <LeNetVisualizer />}
          {currentSlide.component === 'AlexNetVisualizer' && <AlexNetVisualizer />}
          {currentSlide.component === 'InceptionModuleVisualizer' && <InceptionModuleVisualizer />}
          {currentSlide.component === 'GoogLeNetArchitectureVisualizer' && <GoogLeNetArchitectureVisualizer />}
          {currentSlide.component === 'ResidualConceptDiagram' && <ResidualConceptDiagram />}
          {currentSlide.component === 'ObjectTrackingVisualizer' && <ObjectTrackingVisualizer />}
        </div>
      );
    }

    // 3. Interactive Slide Layout
    if (currentSlide.type === 'interactive') {
      return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          {currentSlide.component === 'ResidualExplorer' && <ResidualExplorer />}
          {currentSlide.component === 'ArchitectureSelector' && <ArchitectureSelector />}
          {currentSlide.component === 'TransferLearningSimulator' && <TransferLearningSimulator />}
          {currentSlide.component === 'VisionTasksShowcase' && <VisionTasksShowcase />}
          {currentSlide.component === 'QuizComponent' && <QuizComponent />}
        </div>
      );
    }

    // 4. Comparison Layout (Side by Side)
    if (currentSlide.type === 'comparison') {
      return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div className="grid-2col" style={{ flex: 1, minHeight: 0 }}>
            {/* Left Card */}
            <div className="card card-highlight">
              <div className="card-header">
                <div className="card-icon-wrapper icon-blue">
                  <Cpu size={18} />
                </div>
                <div style={{ flex: 1 }}>
                  <div className="card-title">{currentSlide.cardLeft.title}</div>
                  <span className="badge badge-blue">{currentSlide.cardLeft.badge}</span>
                </div>
              </div>

              <div className="card-body">
                <ul>
                  {currentSlide.cardLeft.points.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </div>

              {currentSlide.cardLeft.highlight && (
                <div style={{
                  background: '#EDF5FA',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid #D0E3F0',
                  fontSize: '11.5px',
                  color: 'var(--infnet-dark-blue)',
                  fontWeight: 600,
                  marginTop: '8px'
                }}>
                  📌 {currentSlide.cardLeft.highlight}
                </div>
              )}
            </div>

            {/* Right Card */}
            <div className="card card-highlight-green">
              <div className="card-header">
                <div className="card-icon-wrapper icon-green">
                  <Zap size={18} />
                </div>
                <div style={{ flex: 1 }}>
                  <div className="card-title">{currentSlide.cardRight.title}</div>
                  <span className="badge badge-green">{currentSlide.cardRight.badge}</span>
                </div>
              </div>

              <div className="card-body">
                <ul>
                  {currentSlide.cardRight.points.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </div>

              {currentSlide.cardRight.highlight && (
                <div style={{
                  background: '#F0FDF4',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid #DCFCE7',
                  fontSize: '11.5px',
                  color: '#15803D',
                  fontWeight: 600,
                  marginTop: '8px'
                }}>
                  🚀 {currentSlide.cardRight.highlight}
                </div>
              )}
            </div>
          </div>

          {(currentSlide.callout || currentSlide.link) && (
            <div className="callout" style={{ margin: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: '260px' }}>
                <Zap size={16} className="callout-icon" style={{ flexShrink: 0 }} />
                <span>{currentSlide.callout}</span>
              </div>
              {currentSlide.link && (
                <a
                  href={currentSlide.link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: 'var(--infnet-dark-blue)',
                    color: '#FFFFFF',
                    padding: '5px 12px',
                    borderRadius: '6px',
                    fontSize: '11.5px',
                    fontWeight: 600,
                    textDecoration: 'none',
                    whiteSpace: 'nowrap',
                    boxShadow: 'var(--shadow-sm)',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--infnet-cyan)';
                    e.currentTarget.style.color = 'var(--infnet-navy-deep)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'var(--infnet-dark-blue)';
                    e.currentTarget.style.color = '#FFFFFF';
                  }}
                >
                  <BookOpen size={13} />
                  <span>{currentSlide.link.label || 'Documentação PyTorch'}</span>
                  <ExternalLink size={12} />
                </a>
              )}
            </div>
          )}
        </div>
      );
    }

    // 5. Standard Card Grid (2, 3, or 4 columns)
    const cardCount = currentSlide.cards ? currentSlide.cards.length : 0;
    const gridClass = cardCount === 4 ? 'grid-4col' : cardCount === 3 ? 'grid-3col' : 'grid-2col';

    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div className={gridClass} style={{ flex: 1, minHeight: 0 }}>
          {currentSlide.cards && currentSlide.cards.map((card, idx) => (
            <div key={idx} className="card">
              <div className="card-header">
                <div className={`card-icon-wrapper ${card.iconColor || 'icon-cyan'}`}>
                  {ICON_MAP[card.icon] || <CheckCircle2 size={18} />}
                </div>
                <div className="card-title">{card.title}</div>
              </div>

              <div className="card-body">
                <ul>
                  {card.points.map((pt, pIdx) => (
                    <li key={pIdx}>{pt}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {(currentSlide.callout || currentSlide.link) && (
          <div className="callout" style={{ margin: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: '260px' }}>
              <Zap size={16} className="callout-icon" style={{ flexShrink: 0 }} />
              <span>{currentSlide.callout}</span>
            </div>
            {currentSlide.link && (
              <a
                href={currentSlide.link.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'var(--infnet-dark-blue)',
                  color: '#FFFFFF',
                  padding: '5px 12px',
                  borderRadius: '6px',
                  fontSize: '11.5px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--infnet-cyan)';
                  e.currentTarget.style.color = 'var(--infnet-navy-deep)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--infnet-dark-blue)';
                  e.currentTarget.style.color = '#FFFFFF';
                }}
              >
                <BookOpen size={13} />
                <span>{currentSlide.link.label || 'Documentação PyTorch'}</span>
                <ExternalLink size={12} />
              </a>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="presentation-container" ref={containerRef}>
      {/* 16:9 Main Scaler Box */}
      <div
        className="slide-scaler"
        style={{
          transform: `scale(${scale})`,
        }}
      >
        <Header slide={currentSlide} />

        <main className="slide-body">
          {renderSlideContent()}
        </main>

        <Footer
          currentSlide={currentSlideIndex}
          totalSlides={slidesData.length}
        />

        {/* Presenter Notes Drawer */}
        <NotesDrawer
          isOpen={isNotesOpen}
          onClose={() => setIsNotesOpen(false)}
          currentSlide={currentSlideIndex}
          slide={currentSlide}
        />
      </div>

      {/* Floating Control Toolbar */}
      <Controls
        currentSlide={currentSlideIndex}
        totalSlides={slidesData.length}
        onPrev={goToPrev}
        onNext={goToNext}
        isAutoplay={isAutoplay}
        onToggleAutoplay={() => setIsAutoplay((prev) => !prev)}
        isNotesOpen={isNotesOpen}
        onToggleNotes={toggleNotes}
        isOverviewOpen={isOverviewOpen}
        onToggleOverview={toggleOverview}
        isFullscreen={isFullscreen}
        onToggleFullscreen={toggleFullscreen}
      />

      {/* Grid Overview Modal */}
      <OverviewModal
        isOpen={isOverviewOpen}
        onClose={() => setIsOverviewOpen(false)}
        slides={slidesData}
        currentSlide={currentSlideIndex}
        onSelectSlide={(idx) => setCurrentSlideIndex(idx)}
      />
    </div>
  );
}
