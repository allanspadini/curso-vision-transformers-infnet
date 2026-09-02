import React, { useState } from 'react';
import { Languages, ArrowRight, GitFork, Cpu, Layers, Sparkles, CheckCircle2 } from 'lucide-react';

export default function TransformerTranslationDiagram() {
  const [activeStep, setActiveStep] = useState('cross'); // 'encoder' | 'cross' | 'decoder'
  const [selectedWordIdx, setSelectedWordIdx] = useState(4); // index in PT tokens: 'precisa'

  const sourceTokens = [
    { idx: 0, text: 'All', role: 'Quantificador' },
    { idx: 1, text: 'you', role: 'Sujeito' },
    { idx: 2, text: 'need', role: 'Verbo Central' },
    { idx: 3, text: 'is', role: 'Cópula' },
    { idx: 4, text: 'love', role: 'Objeto / Núcleo' }
  ];

  const targetTokens = [
    { idx: 0, text: '<BOS>', enTarget: 'All' },
    { idx: 1, text: 'Tudo', enTarget: 'All' },
    { idx: 2, text: 'o que', enTarget: 'All' },
    { idx: 3, text: 'você', enTarget: 'you' },
    { idx: 4, text: 'precisa', enTarget: 'need' },
    { idx: 5, text: 'é de', enTarget: 'is' },
    { idx: 6, text: 'amor', enTarget: 'love' }
  ];

  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
          <Languages size={18} color="var(--infnet-cyan)" />
          <span>A Arquitetura Original: Encoder-Decoder para Tradução (Vaswani et al., 2017)</span>
        </div>

        {/* Step Selector Buttons */}
        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            onClick={() => setActiveStep('encoder')}
            style={{
              padding: '4px 10px',
              borderRadius: '6px',
              fontSize: '11px',
              fontWeight: 700,
              cursor: 'pointer',
              background: activeStep === 'encoder' ? 'var(--infnet-dark-blue)' : '#FFFFFF',
              color: activeStep === 'encoder' ? '#FFFFFF' : 'var(--text-main)',
              boxShadow: activeStep === 'encoder' ? 'var(--shadow-sm)' : 'none',
              border: activeStep === 'encoder' ? '1px solid var(--infnet-cyan)' : '1px solid #CBD5E1'
            }}
          >
            1. Encoder (Inglês)
          </button>
          <button
            onClick={() => setActiveStep('cross')}
            style={{
              padding: '4px 10px',
              borderRadius: '6px',
              fontSize: '11px',
              fontWeight: 700,
              cursor: 'pointer',
              background: activeStep === 'cross' ? 'var(--infnet-dark-blue)' : '#FFFFFF',
              color: activeStep === 'cross' ? '#FFFFFF' : 'var(--text-main)',
              boxShadow: activeStep === 'cross' ? 'var(--shadow-sm)' : 'none',
              border: activeStep === 'cross' ? '1px solid var(--infnet-cyan)' : '1px solid #CBD5E1'
            }}
          >
            2. Cross-Attention (Ponte)
          </button>
          <button
            onClick={() => setActiveStep('decoder')}
            style={{
              padding: '4px 10px',
              borderRadius: '6px',
              fontSize: '11px',
              fontWeight: 700,
              cursor: 'pointer',
              background: activeStep === 'decoder' ? 'var(--infnet-dark-blue)' : '#FFFFFF',
              color: activeStep === 'decoder' ? '#FFFFFF' : 'var(--text-main)',
              boxShadow: activeStep === 'decoder' ? 'var(--shadow-sm)' : 'none',
              border: activeStep === 'decoder' ? '1px solid var(--infnet-cyan)' : '1px solid #CBD5E1'
            }}
          >
            3. Decoder (Português)
          </button>
        </div>
      </div>

      {/* Main Diagram Area */}
      <div style={{
        flex: 1,
        background: 'var(--bg-card)',
        border: '1px solid var(--border-light)',
        borderRadius: '10px',
        padding: '12px 16px',
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0,
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ flex: 1, width: '100%', minHeight: 0, position: 'relative' }}>
          <svg viewBox="0 0 960 325" style={{ width: '100%', height: '100%', display: 'block' }}>
            <defs>
              <linearGradient id="encGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F0F9FF" />
                <stop offset="100%" stopColor="#E0F2FE" />
              </linearGradient>
              <linearGradient id="decGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F0FDF4" />
                <stop offset="100%" stopColor="#DCFCE7" />
              </linearGradient>
              <linearGradient id="crossBeamGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#0284C7" />
                <stop offset="100%" stopColor="#15803D" />
              </linearGradient>

              <marker id="arrowCross" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 8 5 L 0 9 z" fill="#0284C7" />
              </marker>
              <marker id="arrowGreenSeq" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 8 5 L 0 9 z" fill="#15803D" />
              </marker>

              <filter id="softGlow" x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#0A345D" floodOpacity="0.12" />
              </filter>
            </defs>

            {/* =========================================================================
                LEFT SIDE: ENCODER (Source Language - English)
               ========================================================================= */}
            <g transform="translate(20, 10)">
              {/* Header Box */}
              <rect x="0" y="0" width="280" height="26" rx="6" fill="#0A345D" />
              <text x="140" y="17" fontSize="10.5" fontWeight="700" fill="#64D9EF" textAnchor="middle">
                ENCODER (Língua Fonte: Inglês)
              </text>

              {/* Encoder Macro Frame */}
              <rect x="0" y="32" width="280" height="265" rx="8" fill="url(#encGrad)" stroke="#0284C7" strokeWidth="1.8" filter="url(#softGlow)" />

              {/* Source Sentence Chips */}
              <g transform="translate(15, 45)">
                <text x="0" y="10" fontSize="9.5" fontWeight="700" fill="#0A345D">Prompt de Entrada:</text>
                <text x="100" y="10" fontSize="9.5" fontStyle="italic" fill="#0369A1">"All you need is love"</text>

                {sourceTokens.map((t, i) => (
                  <g key={t.idx} transform={`translate(${i * 50}, 20)`}>
                    <rect
                      x="0"
                      y="0"
                      width="46"
                      height="22"
                      rx="4"
                      fill={t.text.toLowerCase() === targetTokens[selectedWordIdx]?.enTarget.toLowerCase() ? '#0A345D' : '#FFFFFF'}
                      stroke={t.text.toLowerCase() === targetTokens[selectedWordIdx]?.enTarget.toLowerCase() ? '#1BB5D8' : '#BAE6FD'}
                      strokeWidth={t.text.toLowerCase() === targetTokens[selectedWordIdx]?.enTarget.toLowerCase() ? '2' : '1'}
                    />
                    <text
                      x="23"
                      y="14"
                      fontSize="9"
                      fontWeight="700"
                      fill={t.text.toLowerCase() === targetTokens[selectedWordIdx]?.enTarget.toLowerCase() ? '#64D9EF' : '#0A345D'}
                      textAnchor="middle"
                    >
                      {t.text}
                    </text>
                  </g>
                ))}
              </g>

              {/* Encoder Stack Layers */}
              {/* Layer 1: Self-Attention (Bidirectional) */}
              <g transform="translate(15, 105)">
                <rect x="0" y="0" width="250" height="42" rx="6" fill="#FFFFFF" stroke="#0284C7" strokeWidth="1.2" />
                <text x="125" y="16" fontSize="9.5" fontWeight="700" fill="#0A345D" textAnchor="middle">
                  Self-Attention Bidirecional
                </text>
                <text x="125" y="30" fontSize="8" fill="#64748B" textAnchor="middle">
                  Sem máscara — Cada palavra vê todas as outras (Visão Global)
                </text>
              </g>

              {/* Layer 2: Feed-Forward MLP */}
              <g transform="translate(15, 155)">
                <rect x="0" y="0" width="250" height="35" rx="6" fill="#FFFFFF" stroke="#CBD5E1" />
                <text x="125" y="15" fontSize="9" fontWeight="700" fill="#0A345D" textAnchor="middle">
                  Feed-Forward (MLP) + Residuais + LN
                </text>
                <text x="125" y="27" fontSize="7.5" fill="#64748B" textAnchor="middle">
                  Expansão 4x (768 → 3072 → 768) + GELU
                </text>
              </g>

              {/* Output Keys/Values from Encoder */}
              <g transform="translate(15, 200)">
                <rect x="0" y="0" width="250" height="45" rx="6" fill="#0A345D" stroke="#1BB5D8" strokeWidth="1.5" />
                <text x="125" y="16" fontSize="9" fontWeight="700" fill="#64D9EF" textAnchor="middle">
                  Representações de Contexto Fonte
                </text>
                <text x="125" y="32" fontSize="9" fontFamily="monospace" fontWeight="700" fill="#FFFFFF" textAnchor="middle">
                  Matrizes K_enc e V_enc ∈ ℝ^(T_src × d_model)
                </text>
              </g>

              <text x="140" y="285" fontSize="8" fontWeight="600" fill="#0369A1" textAnchor="middle">
                Processado uma única vez em paralelo!
              </text>
            </g>

            {/* =========================================================================
                CENTER: CROSS-ATTENTION BRIDGE
               ========================================================================= */}
            <g transform="translate(325, 60)">
              {/* Directed Cross-Attention Beams */}
              <path
                d="M -20 160 C 50 160, 60 110, 120 110"
                fill="none"
                stroke="url(#crossBeamGrad)"
                strokeWidth="3"
                markerEnd="url(#arrowCross)"
              />
              <path
                d="M -20 170 C 50 170, 60 120, 120 120"
                fill="none"
                stroke="url(#crossBeamGrad)"
                strokeWidth="3"
                strokeDasharray="4 2"
                markerEnd="url(#arrowCross)"
              />

              {/* Cross-Attention Hub Card */}
              <g transform="translate(20, 70)">
                <rect x="0" y="0" width="105" height="90" rx="8" fill="#FFFFFF" stroke="#0284C7" strokeWidth="2" filter="url(#softGlow)" />
                <rect x="0" y="0" width="105" height="22" rx="8" fill="#0284C7" />
                <text x="52" y="15" fontSize="9" fontWeight="700" fill="#FFFFFF" textAnchor="middle">
                  Cross-Attention
                </text>

                <text x="52" y="38" fontSize="8" fontWeight="700" fill="#0A345D" textAnchor="middle">
                  Q: do Decoder (PT)
                </text>
                <text x="52" y="52" fontSize="8" fontWeight="700" fill="#0284C7" textAnchor="middle">
                  K: do Encoder (EN)
                </text>
                <text x="52" y="66" fontSize="8" fontWeight="700" fill="#0284C7" textAnchor="middle">
                  V: do Encoder (EN)
                </text>
                <text x="52" y="80" fontSize="7.5" fontWeight="600" fill="#15803D" textAnchor="middle">
                  Alinhamento Bilíngue
                </text>
              </g>

              <text x="72" y="180" fontSize="8" fontWeight="700" fill="#0A345D" textAnchor="middle">
                A "Ponte de Tradução"
              </text>
            </g>

            {/* =========================================================================
                RIGHT SIDE: DECODER (Target Language - Portuguese)
               ========================================================================= */}
            <g transform="translate(480, 10)">
              {/* Header Box */}
              <rect x="0" y="0" width="460" height="26" rx="6" fill="#15803D" />
              <text x="230" y="17" fontSize="10.5" fontWeight="700" fill="#FFFFFF" textAnchor="middle">
                DECODER AUTORREGRESSIVO (Língua Alvo: Português)
              </text>

              {/* Decoder Macro Frame */}
              <rect x="0" y="32" width="460" height="265" rx="8" fill="url(#decGrad)" stroke="#15803D" strokeWidth="1.8" filter="url(#softGlow)" />

              {/* Target Generated Tokens */}
              <g transform="translate(15, 45)">
                <text x="0" y="10" fontSize="9.5" fontWeight="700" fill="#14532D">Prefixo Gerado até o momento:</text>
                
                {targetTokens.map((t, i) => {
                  const isSelected = selectedWordIdx === t.idx;
                  return (
                    <g
                      key={t.idx}
                      onClick={() => setSelectedWordIdx(t.idx)}
                      style={{ cursor: 'pointer' }}
                      transform={`translate(${i * 62}, 20)`}
                    >
                      <rect
                        x="0"
                        y="0"
                        width="56"
                        height="22"
                        rx="4"
                        fill={isSelected ? '#15803D' : '#FFFFFF'}
                        stroke={isSelected ? '#86EFAC' : '#BBF7D0'}
                        strokeWidth={isSelected ? '2' : '1'}
                      />
                      <text
                        x="28"
                        y="14"
                        fontSize="8.5"
                        fontWeight="700"
                        fill={isSelected ? '#FFFFFF' : '#14532D'}
                        textAnchor="middle"
                      >
                        {t.text}
                      </text>
                    </g>
                  );
                })}
              </g>

              {/* Decoder 3 Internal Sub-layers */}
              {/* Sublayer 1: Masked Causal Self-Attention */}
              <g transform="translate(15, 105)">
                <rect x="0" y="0" width="430" height="34" rx="5" fill="#FFFFFF" stroke="#15803D" strokeWidth="1.2" />
                <text x="215" y="14" fontSize="9" fontWeight="700" fill="#15803D" textAnchor="middle">
                  1. Masked Self-Attention (Causal)
                </text>
                <text x="215" y="26" fontSize="7.5" fill="#64748B" textAnchor="middle">
                  Máscara Triangular: Impede que a palavra atual veja o futuro em português
                </text>
              </g>

              {/* Sublayer 2: Cross-Attention */}
              <g transform="translate(15, 145)">
                <rect x="0" y="0" width="430" height="36" rx="5" fill="#FFFFFF" stroke="#0284C7" strokeWidth="1.5" />
                <text x="215" y="15" fontSize="9.5" fontWeight="700" fill="#0284C7" textAnchor="middle">
                  2. Cross-Attention (Encoder-Decoder Attention)
                </text>
                <text x="215" y="28" fontSize="8" fill="#0369A1" textAnchor="middle">
                  Queries (Português: "{targetTokens[selectedWordIdx]?.text}") atendem para Keys/Values (Inglês: "{targetTokens[selectedWordIdx]?.enTarget}")
                </text>
              </g>

              {/* Sublayer 3: Feed-Forward + LM Head Output */}
              <g transform="translate(15, 188)">
                <rect x="0" y="0" width="430" height="34" rx="5" fill="#FFFFFF" stroke="#CBD5E1" />
                <text x="215" y="14" fontSize="9" fontWeight="700" fill="#0A345D" textAnchor="middle">
                  3. Feed-Forward (MLP) + Linear LM Head + Softmax
                </text>
                <text x="215" y="26" fontSize="7.5" fill="#64748B" textAnchor="middle">
                  Projeção Linear para o Vocabulário em Português (|V_pt| = 50.000)
                </text>
              </g>

              {/* Predicted Next Word Callout */}
              <g transform="translate(15, 230)">
                <rect x="0" y="0" width="430" height="32" rx="6" fill="#FEF3C7" stroke="#FDE68A" />
                <text x="215" y="14" fontSize="8.5" fontWeight="700" fill="#92400E" textAnchor="middle">
                  Próxima Palavra Prevista com Alta Confiança:
                </text>
                <text x="215" y="26" fontSize="9.5" fontWeight="800" fill="#B45309" textAnchor="middle">
                  P(xt = "amor" | "Tudo o que você precisa é de") = 96.8% ✨
                </text>
              </g>
            </g>
          </svg>
        </div>

        {/* Bottom Inspector Bar */}
        <div style={{
          marginTop: '6px',
          background: '#FFFFFF',
          border: '1px solid var(--border-light)',
          borderRadius: '8px',
          padding: '8px 14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
              Alinhamento de Tradução Ativo:
            </span>
            <span style={{ background: '#E0F2FE', color: '#0369A1', padding: '2px 8px', borderRadius: '4px', fontWeight: 700, fontSize: '11px' }}>
              Fonte (EN): "{targetTokens[selectedWordIdx]?.enTarget}"
            </span>
            <ArrowRight size={14} color="#64748B" />
            <span style={{ background: '#DCFCE7', color: '#15803D', padding: '2px 8px', borderRadius: '4px', fontWeight: 700, fontSize: '11px' }}>
              Alvo (PT): "{targetTokens[selectedWordIdx]?.text}"
            </span>
          </div>

          <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>
            💡 <em>Dica:</em> Clique nas palavras em português acima para inspecionar o alinhamento da Cross-Attention!
          </div>
        </div>
      </div>
    </div>
  );
}
