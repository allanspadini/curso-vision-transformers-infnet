import React, { useState } from 'react';
import { GitFork, Sparkles, Layers, CheckCircle2, ArrowRight } from 'lucide-react';

export default function MultiHeadInspector() {
  const [selectedHead, setSelectedHead] = useState(0);

  const WORDS = ['não', 'há', 'nada', 'que', 'você', 'possa', 'fazer', 'que', 'não', 'possa', 'ser', 'feito'];

  const HEADS = [
    {
      id: 1,
      name: 'Cabeça 1: Sintaxe & Concordância',
      color: '#0284C7',
      focus: 'Relação Sujeito-Verbo e Modais',
      connections: [
        { from: 4, to: 5, label: 'você ↔ possa (sujeito-verbo)', weight: 0.92 },
        { from: 5, to: 6, label: 'possa ↔ fazer (modal-infinitivo)', weight: 0.88 },
        { from: 9, to: 11, label: 'possa ↔ feito (passiva modal)', weight: 0.85 },
        { from: 6, to: 11, label: 'fazer ↔ feito (paralelismo verbal)', weight: 0.78 }
      ],
      description: 'Esta cabeça rastreia a gramática profunda da oração, conectando o pronome "você" aos verbos que governam sua ação.'
    },
    {
      id: 2,
      name: 'Cabeça 2: Negação & Escopo Semântico',
      color: '#AB47BC',
      focus: 'Operadores de Negação e Quantificadores',
      connections: [
        { from: 0, to: 2, label: 'não ↔ nada (dupla negação)', weight: 0.95 },
        { from: 8, to: 9, label: 'não ↔ possa (escopo de negação)', weight: 0.89 },
        { from: 2, to: 6, label: 'nada ↔ fazer (objeto de ação)', weight: 0.74 }
      ],
      description: 'Especializada em capturar inversões de polaridade e negações, garantindo que o modelo compreenda que a ação "não pode ser feita".'
    },
    {
      id: 3,
      name: 'Cabeça 3: Métrica & Estrutura Poética',
      color: '#15803D',
      focus: 'Rimas, Paralelismos e Refrões',
      connections: [
        { from: 6, to: 11, label: 'fazer ↔ feito (eco lírico)', weight: 0.96 },
        { from: 3, to: 7, label: 'que ↔ que (anáfora estilística)', weight: 0.82 },
        { from: 5, to: 9, label: 'possa ↔ possa (repetição rítmica)', weight: 0.91 }
      ],
      description: 'Identifica padrões estéticos e repetições de longo alcance típicas das letras dos Beatles, vinculando termos paralelos da estrofe.'
    },
    {
      id: 4,
      name: 'Cabeça 4: Janela Local (Bigramas)',
      color: '#FF7043',
      focus: 'Contexto Adjacente Imediato (n-gramas)',
      connections: [
        { from: 0, to: 1, label: 'não ↔ há', weight: 0.88 },
        { from: 1, to: 2, label: 'há ↔ nada', weight: 0.85 },
        { from: 9, to: 10, label: 'possa ↔ ser', weight: 0.90 },
        { from: 10, to: 11, label: 'ser ↔ feito', weight: 0.94 }
      ],
      description: 'Funciona quase como uma micro-convolução 1D, focando no contexto imediato de palavras vizinhas para desambiguação rápida.'
    }
  ];

  const currentHead = HEADS[selectedHead];

  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      fontSize: '13px'
    }}>
      {/* Top Banner */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#EDF5FA',
        padding: '8px 16px',
        borderRadius: '8px',
        border: '1px solid #D0E3F0'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, color: 'var(--infnet-dark-blue)' }}>
          <GitFork size={18} color="var(--infnet-cyan)" />
          <span>Laboratório: Inspetor de Múltiplas Cabeças na Canção dos Beatles</span>
        </div>
        <span style={{ fontSize: '11px', color: 'var(--infnet-dark-blue)', background: '#FFFFFF', padding: '3px 8px', borderRadius: '10px', fontWeight: 600 }}>
          12 Cabeças no GPT-2 / ViT-Base
        </span>
      </div>

      {/* Head Selector Tabs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
        {HEADS.map((h, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedHead(idx)}
            style={{
              padding: '8px',
              borderRadius: '6px',
              border: selectedHead === idx ? `2px solid ${h.color}` : '1px solid var(--border-light)',
              background: selectedHead === idx ? '#FFFFFF' : 'var(--bg-card)',
              color: selectedHead === idx ? h.color : 'var(--text-main)',
              fontSize: '11.5px',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: selectedHead === idx ? 'var(--shadow-sm)' : 'none',
              textAlign: 'center',
              transition: 'all 0.15s ease'
            }}
          >
            {h.name}
          </button>
        ))}
      </div>

      {/* Main Visualizer Area */}
      <div style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '1.4fr 1fr',
        gap: '12px',
        minHeight: 0
      }}>
        {/* Left: Words Sequence with Visual Arcs */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-light)',
          borderRadius: '10px',
          padding: '14px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          position: 'relative'
        }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--infnet-dark-blue)', textTransform: 'uppercase' }}>
            Frase: "(Amor) não há nada que você possa fazer que não possa ser feito"
          </div>

          {/* Word Pills Container */}
          <div style={{
            background: '#FFFFFF',
            border: '1px solid var(--border-light)',
            borderRadius: '8px',
            padding: '14px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '6px',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            {WORDS.map((w, idx) => {
              const isTargeted = currentHead.connections.some((c) => c.from === idx || c.to === idx);
              return (
                <span
                  key={idx}
                  style={{
                    fontFamily: 'var(--font-code)',
                    fontSize: '12.5px',
                    fontWeight: 700,
                    padding: '4px 8px',
                    borderRadius: '5px',
                    background: isTargeted ? `${currentHead.color}18` : '#F8FAFC',
                    color: isTargeted ? currentHead.color : '#64748B',
                    border: `1.5px solid ${isTargeted ? currentHead.color : '#E2E8F0'}`,
                    transition: 'all 0.2s ease'
                  }}
                >
                  {w}
                </span>
              );
            })}
          </div>

          {/* Active Attention Arcs List */}
          <div style={{
            flex: 1,
            background: '#FFFFFF',
            border: '1px solid var(--border-light)',
            borderRadius: '8px',
            padding: '10px 14px',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            overflowY: 'auto'
          }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: currentHead.color, textTransform: 'uppercase' }}>
              Conexões Ativas nesta Cabeça:
            </div>

            {currentHead.connections.map((conn, cIdx) => (
              <div
                key={cIdx}
                style={{
                  background: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  padding: '6px 10px',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '11.5px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: currentHead.color
                  }} />
                  <span style={{ fontWeight: 600, color: 'var(--infnet-dark-blue)' }}>{conn.label}</span>
                </div>
                <div style={{ fontFamily: 'var(--font-code)', fontWeight: 700, color: currentHead.color }}>
                  {(conn.weight * 100).toFixed(0)}%
                </div>
              </div>
            ))}
          </div>

          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
            💡 {currentHead.description}
          </div>
        </div>

        {/* Right: Technical Head Specs */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-light)',
          borderRadius: '10px',
          padding: '14px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--infnet-dark-blue)', textTransform: 'uppercase' }}>
            Detalhamento do Subespaço da Cabeça
          </div>

          <div style={{
            background: '#FFFFFF',
            border: '1px solid var(--border-light)',
            borderRadius: '8px',
            padding: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            fontSize: '11.5px'
          }}>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Foco Semântico: </span>
              <strong style={{ color: currentHead.color }}>{currentHead.focus}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Dimensão da Cabeça ($d_k$): </span>
              <code style={{ color: 'var(--infnet-dark-blue)', fontWeight: 700 }}>64 valores</code>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Matrizes de Pesos: </span>
              <code>W_Q^({selectedHead + 1}), W_K^({selectedHead + 1}), W_V^({selectedHead + 1})</code>
            </div>
          </div>

          <div className="card" style={{ flex: 1, padding: '10px' }}>
            <div style={{ fontWeight: 700, color: 'var(--infnet-dark-blue)', fontSize: '12px', marginBottom: '6px' }}>
              Por que isso supera Redes Convolucionais?
            </div>
            <p style={{ fontSize: '11.5px', color: 'var(--text-muted)', lineHeight: '1.5' }}>
              Enquanto uma CNN precisa de 10 a 20 camadas para relacionar "você" (palavra 5) a "feito" (palavra 12), a Multi-Head Attention calcula essa ligação na <strong>primeira camada</strong> em apenas 1 operação matricial!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
