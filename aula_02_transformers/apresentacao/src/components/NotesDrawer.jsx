import React from 'react';
import { X, Mic, BookOpen } from 'lucide-react';

export default function NotesDrawer({ isOpen, onClose, currentSlide, slide }) {
  if (!slide) return null;

  return (
    <div className={`notes-drawer ${isOpen ? 'open' : ''}`}>
      <div className="notes-header">
        <div className="notes-title">
          <Mic size={18} color="#1BB5D8" />
          <span>Falas do Apresentador (Slide {currentSlide + 1})</span>
        </div>
        <button
          className="control-btn"
          onClick={onClose}
          title="Fechar painel (N ou Esc)"
        >
          <X size={18} />
        </button>
      </div>

      <div className="notes-body">
        <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <BookOpen size={16} color="#64D9EF" />
          <span style={{ fontWeight: 600, color: '#64D9EF', fontSize: '13px' }}>
            {slide.title}
          </span>
        </div>

        {slide.notes ? (
          slide.notes.split('\n\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))
        ) : (
          <p style={{ color: '#64748B', fontStyle: 'italic' }}>
            Nenhuma anotação de fala cadastrada para este slide.
          </p>
        )}
      </div>

      <div className="notes-footer">
        <span>Dica: Use como teleprompter durante a gravação</span>
        <span>Atalho: N</span>
      </div>
    </div>
  );
}
