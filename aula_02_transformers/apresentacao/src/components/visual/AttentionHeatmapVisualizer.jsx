import React, { useState } from 'react';
import { Eye, Shield, Sparkles, Filter, Info, ArrowRight } from 'lucide-react';

export default function AttentionHeatmapVisualizer() {
  const TOKENS = ['Tudo', 'o', 'que', 'você', 'precisa', 'é', 'de', 'amor'];
  const [selectedTokenIdx, setSelectedTokenIdx] = useState(4); // "precisa"
  const [isCausal, setIsCausal] = useState(false);

  // Realistic synthetic attention weights for "Tudo o que você precisa é de amor"
  const baseAttentionMatrix = [
    // Tudo
    [0.45, 0.10, 0.05, 0.05, 0.15, 0.05, 0.03, 0.12],
    // o
    [0.15, 0.50, 0.20, 0.05, 0.04, 0.02, 0.01, 0.03],
    // que
    [0.10, 0.20, 0.40, 0.15, 0.10, 0.02, 0.01, 0.02],
    // você
    [0.05, 0.02, 0.10, 0.35, 0.40, 0.02, 0.01, 0.05],
    // precisa (attends strongly to 'você' and 'amor')
    [0.08, 0.02, 0.05, 0.38, 0.12, 0.05, 0.02, 0.28],
    // é
    [0.20, 0.02, 0.03, 0.05, 0.10, 0.40, 0.10, 0.10],
    // de
    [0.02, 0.01, 0.02, 0.02, 0.25, 0.08, 0.20, 0.40],
    // amor (attends strongly to 'precisa' and 'Tudo')
    [0.25, 0.02, 0.03, 0.10, 0.32, 0.08, 0.05, 0.15]
  ];

  // Apply causal mask if enabled (zero out j > i and re-normalize rows)
  const currentMatrix = baseAttentionMatrix.map((row, i) => {
    if (!isCausal) return row;
    const maskedRow = row.map((val, j) => (j > i ? 0 : val));
    const sum = maskedRow.reduce((a, b) => a + b, 0);
    return sum > 0 ? maskedRow.map((v) => v / sum) : maskedRow;
  });

  const activeWeights = currentMatrix[selectedTokenIdx] || [];

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
          <Eye size={18} color="var(--infnet-cyan)" />
          <span>Visualizing Attention: A Matriz de Atenção em Ação ($T × T$)</span>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setIsCausal((prev) => !prev)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 12px',
              borderRadius: '6px',
              border: '1px solid #CBD5E1',
              fontSize: '11.5px',
              fontWeight: 700,
              cursor: 'pointer',
              background: isCausal ? 'var(--infnet-dark-blue)' : '#FFFFFF',
              color: isCausal ? '#FFFFFF' : 'var(--infnet-dark-blue)'
            }}
          >
            <Shield size={14} />
            <span>{isCausal ? 'Máscara Causal (GPT): ATIVA' : 'Atenção Bidirecional (BERT/ViT)'}</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Workspace */}
      <div style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '1.2fr 1fr',
        gap: '12px',
        minHeight: 0
      }}>
        {/* Left Column: Interactive Token Sentence + Attention Arcs */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-light)',
          borderRadius: '10px',
          padding: '14px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--infnet-dark-blue)', textTransform: 'uppercase', marginBottom: '8px' }}>
              Selecione o Token Query na Canção:
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {TOKENS.map((tok, idx) => {
                const isSelected = selectedTokenIdx === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedTokenIdx(idx)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '6px',
                      fontFamily: 'var(--font-code)',
                      fontSize: '13px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      background: isSelected ? 'var(--infnet-dark-blue)' : '#FFFFFF',
                      color: isSelected ? '#FFFFFF' : 'var(--infnet-dark-blue)',
                      border: `1.5px solid ${isSelected ? 'var(--infnet-cyan)' : '#CBD5E1'}`,
                      transform: isSelected ? 'scale(1.05)' : 'none',
                      boxShadow: isSelected ? 'var(--shadow-md)' : 'none',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    "{tok}"
                  </button>
                );
              })}
            </div>
          </div>

          {/* Attention Weight Distribution from Selected Query to Keys */}
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
            <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--infnet-cyan-dark)', marginBottom: '4px' }}>
              Para onde a Query <code>"{TOKENS[selectedTokenIdx]}"</code> está prestando atenção?
            </div>

            {TOKENS.map((keyTok, kIdx) => {
              const weight = activeWeights[kIdx] || 0;
              const pct = (weight * 100).toFixed(1);
              const isFutureMasked = isCausal && kIdx > selectedTokenIdx;

              return (
                <div key={kIdx} style={{ opacity: isFutureMasked ? 0.35 : 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '2px' }}>
                    <span style={{ fontFamily: 'var(--font-code)', fontWeight: 600, color: 'var(--infnet-dark-blue)' }}>
                      Key: "{keyTok}" {isFutureMasked && '(Bloqueado no futuro)'}
                    </span>
                    <span style={{ fontWeight: 700, color: weight > 0.25 ? '#15803D' : '#0284C7' }}>
                      {pct}%
                    </span>
                  </div>
                  <div style={{ height: '7px', background: '#E2E8F0', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{
                      width: `${pct}%`,
                      height: '100%',
                      background: isFutureMasked ? '#94A3B8' : weight > 0.25 ? '#15803D' : 'var(--infnet-cyan)',
                      borderRadius: '4px'
                    }} />
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
            💡 <strong>Interpretação:</strong> O modelo aprende padrões sintáticos (sujeito-verbo) e semânticos (objeto-verbo) sem nenhuma regra gramatical explícita injetada manualmente!
          </div>
        </div>

        {/* Right Column: Full 8x8 Heatmap Grid */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-light)',
          borderRadius: '10px',
          padding: '14px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--infnet-dark-blue)', textTransform: 'uppercase' }}>
              Mapa de Calor (Matriz 8 × 8)
            </span>
            <span style={{ fontSize: '10px', color: '#64748B' }}>
              {isCausal ? 'Máscara Triangular Inferior' : 'Matriz Completa NxN'}
            </span>
          </div>

          <div style={{
            flex: 1,
            background: '#FFFFFF',
            border: '1px solid var(--border-light)',
            borderRadius: '8px',
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <table style={{ borderCollapse: 'collapse', textAlign: 'center', fontSize: '10px' }}>
              <thead>
                <tr>
                  <th style={{ padding: '2px', color: '#94A3B8' }}>Q\K</th>
                  {TOKENS.map((t, idx) => (
                    <th key={idx} style={{ padding: '2px 4px', color: 'var(--infnet-dark-blue)', fontFamily: 'var(--font-code)', fontSize: '9px' }}>
                      {t.slice(0, 3)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TOKENS.map((qTok, i) => (
                  <tr key={i}>
                    <td style={{ padding: '2px 4px', fontWeight: 700, color: 'var(--infnet-dark-blue)', fontFamily: 'var(--font-code)', fontSize: '9px' }}>
                      {qTok.slice(0, 3)}
                    </td>
                    {currentMatrix[i].map((val, j) => {
                      const alpha = Math.min(1, Math.max(0.04, val * 1.5));
                      const isHighlighted = selectedTokenIdx === i;
                      return (
                        <td
                          key={j}
                          onClick={() => setSelectedTokenIdx(i)}
                          title={`Query: "${qTok}" → Key: "${TOKENS[j]}" (${(val * 100).toFixed(1)}%)`}
                          style={{
                            width: '26px',
                            height: '24px',
                            padding: '2px',
                            background: isCausal && j > i ? '#F1F5F9' : `rgba(27, 181, 216, ${alpha})`,
                            border: isHighlighted ? '1px solid #0A345D' : '1px solid #FFFFFF',
                            color: val > 0.3 ? '#FFFFFF' : '#0A345D',
                            fontWeight: 700,
                            cursor: 'pointer',
                            fontSize: '8.5px',
                            fontFamily: 'var(--font-code)'
                          }}
                        >
                          {isCausal && j > i ? '—' : val.toFixed(2).replace('0.', '.')}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{
            fontSize: '11px',
            color: 'var(--infnet-dark-blue)',
            background: '#EDF5FA',
            padding: '6px 10px',
            borderRadius: '6px'
          }}>
            🎯 <strong>Custo de Atenção:</strong> Cada bloco Transformer calcula essa matriz $T × T$ para cada cabeça de atenção em cada camada de forma totalmente paralela na GPU.
          </div>
        </div>
      </div>
    </div>
  );
}
