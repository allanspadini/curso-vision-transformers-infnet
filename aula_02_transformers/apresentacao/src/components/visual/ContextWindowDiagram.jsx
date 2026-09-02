import React, { useState } from 'react';
import { Layers, ArrowRight, Sparkles, AlertCircle, HelpCircle, CheckCircle2, Sliders, Cpu, Database } from 'lucide-react';

export default function ContextWindowDiagram() {
  const [contextSize, setContextSize] = useState(4); // 2, 3, or 4
  const [isGenerated, setIsGenerated] = useState(false);

  // Example phrase: "Eu sei que nada" -> Next token: "sei"
  const allTokens = [
    { t: 0, text: 'Eu', id: 1942, vector: ['+0.521', '-0.184', '+0.342', '+0.120', '...'] },
    { t: 1, text: 'sei', id: 3105, vector: ['+0.153', '+0.772', '-0.291', '+0.803', '...'] },
    { t: 2, text: 'que', id: 853, vector: ['+0.341', '+0.012', '-0.518', '+0.194', '...'] },
    { t: 3, text: 'nada', id: 4120, vector: ['-0.412', '+0.225', '+0.681', '-0.052', '...'] }
  ];

  // Active tokens in context based on selected context size
  const activeTokens = allTokens.slice(4 - contextSize);

  // Probabilities for next token depending on context size
  const candidatesByContext = {
    4: [
      { word: 'sei', prob: 94.2, color: '#15803D', isTop: true, note: 'Completa a citação socrática ("Eu sei que nada sei")' },
      { word: 'disse', prob: 2.8, color: '#64748B', isTop: false, note: 'Menor coerência sintática' },
      { word: 'vale', prob: 1.6, color: '#64748B', isTop: false, note: 'Incompleto' },
      { word: 'resta', prob: 0.9, color: '#64748B', isTop: false, note: 'Pouco provável' },
      { word: 'outros', prob: 0.5, color: '#94A3B8', isTop: false, note: 'Cauda longa do vocabulário' }
    ],
    3: [
      { word: 'sei', prob: 71.4, color: '#0369A1', isTop: true, note: 'Contexto parcial ("sei que nada...")' },
      { word: 'falta', prob: 12.3, color: '#64748B', isTop: false, note: 'Aumenta incerteza' },
      { word: 'resta', prob: 8.5, color: '#64748B', isTop: false, note: 'Alternativa plausível' },
      { word: 'temos', prob: 4.8, color: '#64748B', isTop: false, note: 'Sem sujeito inicial claro' },
      { word: 'outros', prob: 3.0, color: '#94A3B8', isTop: false, note: 'Distribuição mais dispersa' }
    ],
    2: [
      { word: 'acontece', prob: 32.1, color: '#D97706', isTop: true, note: 'Contexto truncado ("que nada...")' },
      { word: 'sei', prob: 28.4, color: '#D97706', isTop: false, note: 'Sem o "Eu" inicial, "sei" perde força' },
      { word: 'importa', prob: 21.0, color: '#64748B', isTop: false, note: 'Expressão idiomática genérica' },
      { word: 'muda', prob: 11.2, color: '#64748B', isTop: false, note: 'Ambiguidade elevada' },
      { word: 'outros', prob: 7.3, color: '#94A3B8', isTop: false, note: 'Alta entropia / confusão' }
    ]
  };

  const currentCandidates = candidatesByContext[contextSize];

  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      fontSize: '13px'
    }}>
      {/* Top Banner with Technical Badges */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#EDF5FA',
        padding: '8px 16px',
        borderRadius: '8px',
        border: '1px solid #D0E3F0'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
          <Layers size={18} color="var(--infnet-cyan)" />
          <span>Janela de Contexto: Quantidade de Tokens Processados por Solicitação</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '11px', background: '#FFFFFF', padding: '3px 10px', borderRadius: '12px', fontWeight: 600, color: 'var(--infnet-dark-blue)', border: '1px solid #D0E3F0' }}>
            Tensor de Entrada: <code style={{ color: 'var(--infnet-cyan)', fontFamily: 'var(--font-code)' }}>[Batch, T={contextSize}, d=768]</code>
          </span>
          <span style={{ fontSize: '11px', background: '#FEF3C7', padding: '3px 10px', borderRadius: '12px', fontWeight: 700, color: '#92400E' }}>
            Complexidade Atenção: O(T²)
          </span>
        </div>
      </div>

      {/* Main Interactive Grid Layout */}
      <div style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '1.25fr 0.95fr',
        gap: '12px',
        minHeight: 0
      }}>
        {/* Left Column: Context Matrix Representation (Tokens as Rows) */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-light)',
          borderRadius: '10px',
          padding: '12px 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          boxShadow: 'var(--shadow-sm)',
          minHeight: 0
        }}>
          {/* Header & Interactive Context Selector */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
                1. Matriz da Sequência no Contexto Atual
              </div>
              <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>
                Cada <strong>linha</strong> é um token no tempo ($t$); cada <strong>coluna</strong> é uma dimensão de embedding ($d$).
              </div>
            </div>

            {/* Context Size Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: '#F1F5F9', padding: '3px 6px', borderRadius: '6px' }}>
              <span style={{ fontSize: '10px', fontWeight: 700, color: '#475569', marginRight: '2px' }}>context =</span>
              {[2, 3, 4].map((size) => (
                <button
                  key={size}
                  onClick={() => {
                    setContextSize(size);
                    setIsGenerated(false);
                  }}
                  style={{
                    padding: '2px 8px',
                    borderRadius: '4px',
                    border: 'none',
                    background: contextSize === size ? 'var(--infnet-dark-blue)' : '#FFFFFF',
                    color: contextSize === size ? '#FFFFFF' : '#475569',
                    fontSize: '11px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: contextSize === size ? 'var(--shadow-sm)' : 'none',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Matrix Container */}
          <div style={{
            flex: 1,
            background: '#FFFFFF',
            border: '2px solid #0A345D',
            borderRadius: '8px',
            padding: '10px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative'
          }}>
            {/* Columns Header (Embedding Dimensions) */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '70px 60px repeat(4, 1fr) 30px 1fr',
              background: '#EDF5FA',
              padding: '6px 8px',
              borderRadius: '4px',
              fontSize: '10px',
              fontWeight: 700,
              color: 'var(--infnet-dark-blue)',
              textAlign: 'center',
              borderBottom: '1px solid #CBD5E1'
            }}>
              <div>Posição ($t$)</div>
              <div>Token</div>
              <div>dim 0</div>
              <div>dim 1</div>
              <div>dim 2</div>
              <div>dim 3</div>
              <div>···</div>
              <div>dim 767</div>
            </div>

            {/* Matrix Rows (Tokens) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', margin: '6px 0' }}>
              {allTokens.map((token, index) => {
                const isInContext = index >= (4 - contextSize);
                return (
                  <div
                    key={token.t}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '70px 60px repeat(4, 1fr) 30px 1fr',
                      padding: '7px 8px',
                      borderRadius: '6px',
                      fontSize: '10.5px',
                      fontFamily: 'var(--font-code)',
                      alignItems: 'center',
                      textAlign: 'center',
                      background: isInContext ? '#F0FDF4' : '#F8FAFC',
                      border: isInContext ? '1.5px solid #86EFAC' : '1px dashed #CBD5E1',
                      opacity: isInContext ? 1 : 0.4,
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {/* Index */}
                    <div style={{ fontWeight: 700, color: isInContext ? '#15803D' : '#94A3B8' }}>
                      t = {token.t}
                    </div>

                    {/* Word Badge */}
                    <div>
                      <span style={{
                        background: isInContext ? '#0A345D' : '#94A3B8',
                        color: '#FFFFFF',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontWeight: 700,
                        fontSize: '11px',
                        fontFamily: 'var(--font-body)'
                      }}>
                        {token.text}
                      </span>
                    </div>

                    {/* Features */}
                    <div style={{ color: isInContext ? '#0A345D' : '#94A3B8' }}>{token.vector[0]}</div>
                    <div style={{ color: isInContext ? '#0A345D' : '#94A3B8' }}>{token.vector[1]}</div>
                    <div style={{ color: isInContext ? '#0A345D' : '#94A3B8' }}>{token.vector[2]}</div>
                    <div style={{ color: isInContext ? '#0A345D' : '#94A3B8' }}>{token.vector[3]}</div>
                    <div style={{ color: '#94A3B8' }}>···</div>
                    <div style={{ color: isInContext ? '#0A345D' : '#94A3B8' }}>+0.612</div>
                  </div>
                );
              })}
            </div>

            {/* Matrix Footer Dimension Annotation */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '4px 8px',
              background: '#F8FAFC',
              borderRadius: '4px',
              fontSize: '10px',
              color: '#475569',
              borderTop: '1px solid #E2E8F0'
            }}>
              <span style={{ fontWeight: 600 }}>
                Linhas ativas = <strong>{contextSize} tokens</strong>
              </span>
              <span style={{ fontWeight: 600, color: 'var(--infnet-dark-blue)' }}>
                ← d_model = 768 features contínuas por token →
              </span>
            </div>
          </div>

          {/* Educational Note on Truncation */}
          {contextSize < 4 ? (
            <div style={{
              background: '#FEF3C7',
              border: '1px solid #FDE68A',
              padding: '6px 10px',
              borderRadius: '6px',
              fontSize: '11px',
              color: '#92400E',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <AlertCircle size={15} style={{ flexShrink: 0 }} />
              <span>
                <strong>Atenção:</strong> Com <code>context = {contextSize}</code>, os tokens mais antigos (como "{allTokens[0].text}") foram descartados da janela, reduzindo o contexto disponível para a predição!
              </span>
            </div>
          ) : (
            <div style={{
              background: '#EDF5FA',
              border: '1px solid #D0E3F0',
              padding: '6px 10px',
              borderRadius: '6px',
              fontSize: '11px',
              color: 'var(--infnet-dark-blue)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <CheckCircle2 size={15} color="var(--infnet-cyan)" style={{ flexShrink: 0 }} />
              <span>
                <strong>Contexto Completo:</strong> Todos os 4 tokens da frase <em>"Eu sei que nada"</em> cabem simultaneamente na janela de processamento.
              </span>
            </div>
          )}
        </div>

        {/* Right Column: Autoregressive Completion & Next Token Probabilities */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-light)',
          borderRadius: '10px',
          padding: '12px 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          boxShadow: 'var(--shadow-sm)',
          minHeight: 0
        }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
                2. O Paradigma da Completação
              </div>
              <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>
                A pergunta do Transformer: <em>"Qual a completação desse texto?"</em>
              </div>
            </div>
            <span className="badge badge-green" style={{ fontSize: '10px' }}>
              Próximo Token (t=4)
            </span>
          </div>

          {/* Prompt + Prediction Bubble */}
          <div style={{
            background: '#FFFFFF',
            border: '1px solid var(--border-light)',
            borderRadius: '8px',
            padding: '10px 12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)' }}>
              Texto na Janela de Entrada:
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '6px',
              fontSize: '14px',
              fontWeight: 700
            }}>
              {activeTokens.map((t) => (
                <span
                  key={t.t}
                  style={{
                    background: '#EDF5FA',
                    color: 'var(--infnet-dark-blue)',
                    padding: '3px 10px',
                    borderRadius: '6px',
                    border: '1px solid #CBD5E1'
                  }}
                >
                  {t.text}
                </span>
              ))}

              <ArrowRight size={16} color="var(--infnet-cyan)" />

              {/* Next Predicted Token */}
              <span
                style={{
                  background: isGenerated ? '#15803D' : '#0A345D',
                  color: '#FFFFFF',
                  padding: '3px 12px',
                  borderRadius: '6px',
                  boxShadow: '0 0 10px rgba(27, 181, 216, 0.4)',
                  animation: 'pulse 2s infinite',
                  transition: 'all 0.3s ease'
                }}
              >
                "{currentCandidates[0].word}"
              </span>
            </div>
          </div>

          {/* Softmax Distribution for Next Token */}
          <div style={{
            flex: 1,
            background: '#FFFFFF',
            border: '1px solid var(--border-light)',
            borderRadius: '8px',
            padding: '10px 12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            minHeight: 0
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
                Distribuição de Probabilidades Softmax:
              </span>
              <span style={{ fontSize: '9.5px', color: 'var(--text-muted)' }}>
                P(x₄ | x₀...x₃)
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1, justifyContent: 'center' }}>
              {currentCandidates.map((c, idx) => (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10.5px' }}>
                    <span style={{ fontWeight: c.isTop ? 700 : 500, color: c.isTop ? 'var(--infnet-dark-blue)' : 'var(--text-main)' }}>
                      {idx + 1}. "{c.word}" {c.isTop && <span style={{ color: '#15803D', fontSize: '9.5px', fontWeight: 700 }}>(Mais Provável)</span>}
                    </span>
                    <span style={{ fontFamily: 'var(--font-code)', fontWeight: 700, color: c.color }}>
                      {c.prob}%
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div style={{ height: '6px', width: '100%', background: '#F1F5F9', borderRadius: '3px', overflow: 'hidden' }}>
                    <div
                      style={{
                        height: '100%',
                        width: `${c.prob}%`,
                        background: c.isTop ? 'linear-gradient(90deg, #1BB5D8, #15803D)' : '#94A3B8',
                        borderRadius: '3px',
                        transition: 'width 0.4s ease'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Context Evolution in Real LLMs */}
            <div style={{
              background: '#F8FAFC',
              padding: '6px 8px',
              borderRadius: '4px',
              fontSize: '10px',
              color: '#475569',
              border: '1px solid #E2E8F0',
              display: 'flex',
              justifyContent: 'space-between'
            }}>
              <span>GPT-2: <strong>1.024 tokens</strong></span>
              <span>LLaMA 3: <strong>8.192 tokens</strong></span>
              <span>GPT-4o: <strong>128k tokens</strong></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
