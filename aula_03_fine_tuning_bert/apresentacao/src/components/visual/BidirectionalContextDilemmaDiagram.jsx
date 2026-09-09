import React, { useState } from 'react';
import MathView from '../MathView';

export default function BidirectionalContextDilemmaDiagram() {
  const [selectedWord, setSelectedWord] = useState('banco');
  const [mode, setMode] = useState('bidirectional'); // 'unidirectional' or 'bidirectional'

  const sentence = ['O', 'gerente', 'do', 'banco', 'bloqueou', 'meu', 'cartão'];

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {/* Top Toggle Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#F0F7FB',
        border: '1px solid #D5E3EC',
        borderRadius: '8px',
        padding: '8px 16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--infnet-dark-blue)' }}>
            Paradigma de Atenção:
          </span>
          <button
            onClick={() => setMode('unidirectional')}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              border: mode === 'unidirectional' ? '2px solid var(--infnet-orange)' : '1px solid #CBD5E1',
              background: mode === 'unidirectional' ? '#FFF7ED' : '#FFFFFF',
              color: mode === 'unidirectional' ? 'var(--infnet-orange)' : '#475569',
              fontWeight: 600,
              fontSize: '12px',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            ← Unidirecional Causal (GPT / RNN)
          </button>
          <button
            onClick={() => setMode('bidirectional')}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              border: mode === 'bidirectional' ? '2px solid var(--infnet-cyan)' : '1px solid #CBD5E1',
              background: mode === 'bidirectional' ? '#EFF6FF' : '#FFFFFF',
              color: mode === 'bidirectional' ? 'var(--infnet-dark-blue)' : '#475569',
              fontWeight: 600,
              fontSize: '12px',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            ↔ Bidirecional Profundo (BERT)
          </button>
        </div>

        <div style={{ fontSize: '12px', color: '#64748B' }}>
          {mode === 'unidirectional' ? (
            <span style={{ color: 'var(--infnet-orange)', fontWeight: 600 }}>
              ⚠️ Ambiguidade: 'banco' só enxerga 'O gerente do', sem saber o contexto futuro!
            </span>
          ) : (
            <span style={{ color: 'var(--infnet-green-accent)', fontWeight: 600 }}>
              ✓ Contexto Total: 'banco' conecta-se diretamente com 'bloqueou' e 'cartão'!
            </span>
          )}
        </div>
      </div>

      {/* Main Visual Comparison Diagram */}
      <div style={{
        flex: 1,
        minHeight: 0,
        background: '#FFFFFF',
        border: '1px solid #E2E8F0',
        borderRadius: '10px',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative'
      }}>
        {/* Sentence Token Strip */}
        <div>
          <div style={{ fontSize: '12px', fontWeight: 600, color: '#64748B', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Sequência de Tokens de Entrada:
          </div>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', alignItems: 'center' }}>
            {sentence.map((tok, idx) => {
              const isTarget = tok === 'banco';
              const isPast = idx < 3;
              const isFuture = idx > 3;
              let isVisible = true;
              if (mode === 'unidirectional' && isFuture) {
                isVisible = false;
              }

              return (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <div
                    style={{
                      padding: '8px 16px',
                      borderRadius: '8px',
                      border: isTarget
                        ? '2px solid var(--infnet-cyan)'
                        : isVisible
                        ? '1px solid #CBD5E1'
                        : '1px dashed #CBD5E1',
                      background: isTarget
                        ? '#E0F2FE'
                        : isVisible
                        ? '#F8FAFC'
                        : '#F1F5F9',
                      color: isTarget
                        ? 'var(--infnet-dark-blue)'
                        : isVisible
                        ? '#1E293B'
                        : '#94A3B8',
                      fontWeight: isTarget ? 700 : 500,
                      fontSize: '14px',
                      boxShadow: isTarget ? '0 4px 12px rgba(27, 181, 216, 0.2)' : 'none',
                      transition: 'all 0.3s'
                    }}
                  >
                    {tok}
                  </div>
                  <span style={{ fontSize: '10px', color: '#94A3B8', fontFamily: 'var(--font-code)' }}>
                    idx: {idx}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Attention Flow Graph (SVG) */}
        <div style={{ flex: 1, minHeight: 0, margin: '8px 0', position: 'relative' }}>
          <svg viewBox="0 0 900 240" style={{ width: '100%', height: '100%' }}>
            <defs>
              <marker id="arrow-cyan" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 8 5 L 0 9 z" fill="#1BB5D8" />
              </marker>
              <marker id="arrow-orange" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 8 5 L 0 9 z" fill="#FF7043" />
              </marker>
              <marker id="arrow-green" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 8 5 L 0 9 z" fill="#7CB342" />
              </marker>
            </defs>

            {/* Target token position: idx 3 -> x ~ 450 */}
            {/* Tokens positions: 90, 210, 330, 450, 570, 690, 810 */}
            {mode === 'unidirectional' ? (
              <g>
                {/* Past arrows to banco */}
                <path d="M 90 40 Q 270 120 450 40" fill="none" stroke="#FF7043" strokeWidth="2.5" markerEnd="url(#arrow-orange)" />
                <path d="M 210 40 Q 330 90 450 40" fill="none" stroke="#FF7043" strokeWidth="2.5" markerEnd="url(#arrow-orange)" />
                <path d="M 330 40 Q 390 60 450 40" fill="none" stroke="#FF7043" strokeWidth="2.5" markerEnd="url(#arrow-orange)" />

                {/* Blocked future arrows */}
                <path d="M 570 40 Q 510 60 450 40" fill="none" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="4 4" />
                <path d="M 690 40 Q 570 90 450 40" fill="none" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="4 4" />
                <path d="M 810 40 Q 630 120 450 40" fill="none" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="4 4" />

                {/* Red X over future mask */}
                <rect x="520" y="20" width="340" height="70" rx="8" fill="rgba(239, 68, 68, 0.08)" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="5 5" />
                <text x="690" y="60" textAnchor="middle" fill="#EF4444" fontSize="13" fontWeight="bold">
                  ⛔ Máscara Causal: Futuro Invisível (Prevenção de Vazamento)
                </text>

                {/* Representation Box */}
                <rect x="340" y="150" width="220" height="65" rx="8" fill="#FFF7ED" stroke="#FF7043" strokeWidth="2" />
                <text x="450" y="175" textAnchor="middle" fill="#9A3412" fontSize="13" fontWeight="bold">
                  h_banco = f(O, gerente, do, banco)
                </text>
                <text x="450" y="195" textAnchor="middle" fill="#C2410C" fontSize="11">
                  Semântica incompleta: instituição ou assento?
                </text>
              </g>
            ) : (
              <g>
                {/* Past arrows */}
                <path d="M 90 40 Q 270 110 450 40" fill="none" stroke="#1BB5D8" strokeWidth="2.5" markerEnd="url(#arrow-cyan)" />
                <path d="M 210 40 Q 330 80 450 40" fill="none" stroke="#1BB5D8" strokeWidth="2.5" markerEnd="url(#arrow-cyan)" />
                <path d="M 330 40 Q 390 55 450 40" fill="none" stroke="#1BB5D8" strokeWidth="2.5" markerEnd="url(#arrow-cyan)" />

                {/* Future arrows (Bidirectional) */}
                <path d="M 570 40 Q 510 55 450 40" fill="none" stroke="#7CB342" strokeWidth="2.5" markerEnd="url(#arrow-green)" />
                <path d="M 690 40 Q 570 80 450 40" fill="none" stroke="#7CB342" strokeWidth="2.5" markerEnd="url(#arrow-green)" />
                <path d="M 810 40 Q 630 110 450 40" fill="none" stroke="#7CB342" strokeWidth="2.5" markerEnd="url(#arrow-green)" />

                {/* Bilateral connection tag */}
                <rect x="260" y="10" width="380" height="24" rx="6" fill="#EFF6FF" stroke="#1BB5D8" strokeWidth="1" />
                <text x="450" y="26" textAnchor="middle" fill="#0369A1" fontSize="11" fontWeight="600">
                  ↔ Matriz de Atenção Plena: Todos os tokens consultam todos os tokens (O(L²))
                </text>

                {/* Representation Box */}
                <rect x="300" y="150" width="300" height="65" rx="8" fill="#F0FDF4" stroke="#7CB342" strokeWidth="2" />
                <text x="450" y="175" textAnchor="middle" fill="#166534" fontSize="13" fontWeight="bold">
                  h_banco = f(O, gerente, do, banco, bloqueou, meu, cartão)
                </text>
                <text x="450" y="195" textAnchor="middle" fill="#15803D" fontSize="11">
                  Desambiguação perfeita: Instituição Financeira / Cartão de Crédito!
                </text>
              </g>
            )}
          </svg>
        </div>

        {/* Mathematical Formulation Footer */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '12px',
          background: '#F8FAFC',
          borderRadius: '8px',
          padding: '10px 14px',
          border: '1px solid #E2E8F0'
        }}>
          <div>
            <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--infnet-dark-blue)', display: 'block', marginBottom: '2px' }}>
              Formulaçāo Causal (Decoder - GPT):
            </span>
            <MathView math="P(w_t \mid w_1, \dots, w_{t-1}) \implies \text{Atenção Triângular Inferior com } -\infty" />
          </div>
          <div>
            <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--infnet-dark-blue)', display: 'block', marginBottom: '2px' }}>
              Formulação Bidirecional (Encoder - BERT):
            </span>
            <MathView math="h_t = \text{Encoder}(w_1, \dots, w_L)_t \implies \text{Atenção Cruzada Completa em Todas as Camadas}" />
          </div>
        </div>
      </div>
    </div>
  );
}
