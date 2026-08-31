import React from 'react';

export default function Footer({ currentSlide, totalSlides }) {
  const progressPercent = ((currentSlide + 1) / totalSlides) * 100;

  return (
    <footer className="slide-footer">
      <div className="footer-left">
        <span className="footer-institution">FACULDADE INFNET</span>
        <span className="footer-divider">•</span>
        <span className="footer-course">Visão Computacional com CNNs e Transformers</span>
      </div>

      <div className="footer-center">
        <div className="footer-shortcut-hint" title="Pressione N no teclado">
          <span className="footer-kbd">N</span> Falas
        </div>
        <div className="footer-shortcut-hint" title="Pressione G no teclado">
          <span className="footer-kbd">G</span> Grid
        </div>
        <div className="footer-shortcut-hint" title="Pressione F no teclado">
          <span className="footer-kbd">F</span> Tela Cheia
        </div>
        <div className="footer-shortcut-hint" title="Use as setas ou espaço">
          <span className="footer-kbd">←</span>
          <span className="footer-kbd">→</span> Mover
        </div>
      </div>

      <div className="footer-right">
        <div className="progress-bar-container" title={`Progresso: ${Math.round(progressPercent)}%`}>
          <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }}></div>
        </div>
        <span className="footer-page-counter">
          Slide {currentSlide + 1} / {totalSlides}
        </span>
      </div>
    </footer>
  );
}
