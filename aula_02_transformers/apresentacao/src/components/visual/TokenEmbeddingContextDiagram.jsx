import React, { useState } from 'react';
import { Database, ArrowRight, Layers, Sparkles, Cpu, HardDrive, Eye } from 'lucide-react';

export default function TokenEmbeddingContextDiagram() {
  const [selectedTokenIdx, setSelectedTokenIdx] = useState(7); // Default to 'amor' (index 7)

  const tokensData = [
    { idx: 0, text: 'Tudo', id: 1420, pos: 't=0', vector: ['+0.124', '-0.451', '+0.892', '+0.034', '...'] },
    { idx: 1, text: 'o', id: 284, pos: 't=1', vector: ['-0.082', '+0.219', '-0.145', '+0.603', '...'] },
    { idx: 2, text: 'que', id: 853, pos: 't=2', vector: ['+0.341', '+0.012', '-0.518', '+0.194', '...'] },
    { idx: 3, text: 'você', id: 4920, pos: 't=3', vector: ['-0.215', '+0.672', '+0.401', '-0.118', '...'] },
    { idx: 4, text: 'precisa', id: 1120, pos: 't=4', vector: ['+0.512', '-0.334', '+0.091', '+0.442', '...'] },
    { idx: 5, text: 'é', id: 350, pos: 't=5', vector: ['-0.104', '+0.088', '-0.231', '+0.710', '...'] },
    { idx: 6, text: 'de', id: 290, pos: 't=6', vector: ['+0.043', '-0.198', '+0.312', '+0.027', '...'] },
    { idx: 7, text: 'amor', id: 8954, pos: 't=7', vector: ['+0.882', '+0.310', '-0.149', '+0.592', '...'] }
  ];

  const activeToken = tokensData[selectedTokenIdx];

  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      fontSize: '13px'
    }}>
      {/* Top Banner with Key Technical Badges */}
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
          <Database size={18} color="var(--infnet-cyan)" />
          <span>A Matriz de Embeddings na Arquitetura: Da Look-up Table ao Tensor 3D</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '11px', background: '#FFFFFF', padding: '3px 10px', borderRadius: '12px', fontWeight: 600, color: 'var(--infnet-dark-blue)', border: '1px solid #D0E3F0' }}>
            PyTorch: <code style={{ color: 'var(--infnet-cyan)', fontFamily: 'var(--font-code)' }}>nn.Embedding(50257, 768)</code>
          </span>
          <span style={{ fontSize: '11px', background: '#E0F2FE', padding: '3px 10px', borderRadius: '12px', fontWeight: 700, color: '#0369A1' }}>
            Shape: [Batch, Sequence, d_model]
          </span>
          <span style={{ fontSize: '11px', background: '#DCFCE7', padding: '3px 10px', borderRadius: '12px', fontWeight: 700, color: '#15803D' }}>
            Acesso O(1) em VRAM
          </span>
        </div>
      </div>

      {/* Main Visual Schema Container (Full Width & Spacious) */}
      <div style={{
        flex: 1,
        background: 'var(--bg-card)',
        border: '1px solid var(--border-light)',
        borderRadius: '10px',
        padding: '12px 16px',
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0,
        position: 'relative',
        boxShadow: 'var(--shadow-sm)'
      }}>
        {/* SVG Pipeline Visualization */}
        <div style={{ flex: 1, width: '100%', minHeight: 0, position: 'relative' }}>
          <svg
            viewBox="0 0 960 330"
            style={{ width: '100%', height: '100%', display: 'block' }}
          >
            <defs>
              <linearGradient id="activeTokenGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#0A345D" />
                <stop offset="100%" stopColor="#1B5D96" />
              </linearGradient>
              <linearGradient id="tensor3dGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#F0FDF4" />
                <stop offset="100%" stopColor="#DCFCE7" />
              </linearGradient>

              <marker id="arrowCyan" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 8 5 L 0 9 z" fill="#1BB5D8" />
              </marker>
              <marker id="arrowGreen" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 8 5 L 0 9 z" fill="#7CB342" />
              </marker>

              <filter id="glowActive" x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#1BB5D8" floodOpacity="0.4" />
              </filter>
              <filter id="softShadow" x="-5%" y="-5%" width="110%" height="110%">
                <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#0A345D" floodOpacity="0.08" />
              </filter>
            </defs>

            {/* COLUMN 1: INPUT SEQUENCE */}
            <g transform="translate(15, 8)">
              <rect x="0" y="0" width="175" height="26" rx="6" fill="#0A345D" />
              <text x="87" y="17" fontSize="10.5" fontWeight="700" fill="#FFFFFF" textAnchor="middle">
                1. Sequência Discreta (T=8)
              </text>

              <rect x="0" y="32" width="175" height="270" rx="8" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" filter="url(#softShadow)" />

              {tokensData.map((t, i) => {
                const isSelected = selectedTokenIdx === t.idx;
                const yPos = 40 + i * 31;
                return (
                  <g
                    key={t.idx}
                    onClick={() => setSelectedTokenIdx(t.idx)}
                    style={{ cursor: 'pointer' }}
                  >
                    <rect
                      x="8"
                      y={yPos}
                      width="159"
                      height="26"
                      rx="5"
                      fill={isSelected ? 'url(#activeTokenGrad)' : '#F8FAFC'}
                      stroke={isSelected ? '#1BB5D8' : '#E2E8F0'}
                      strokeWidth={isSelected ? '2' : '1'}
                      filter={isSelected ? 'url(#glowActive)' : 'none'}
                    />
                    <rect
                      x="14"
                      y={yPos + 4}
                      width="26"
                      height="18"
                      rx="3"
                      fill={isSelected ? '#061F38' : '#E2E8F0'}
                    />
                    <text
                      x="27"
                      y={yPos + 16}
                      fontSize="9"
                      fontFamily="monospace"
                      fontWeight="700"
                      fill={isSelected ? '#64D9EF' : '#475569'}
                      textAnchor="middle"
                    >
                      {t.pos}
                    </text>

                    <text
                      x="46"
                      y={yPos + 17}
                      fontSize="10"
                      fontWeight="700"
                      fill={isSelected ? '#FFFFFF' : '#0A345D'}
                    >
                      "{t.text}"
                    </text>

                    <text
                      x="160"
                      y={yPos + 17}
                      fontSize="9"
                      fontFamily="monospace"
                      fontWeight={isSelected ? '700' : '500'}
                      fill={isSelected ? '#64D9EF' : '#64748B'}
                      textAnchor="end"
                    >
                      ID:{t.id}
                    </text>
                  </g>
                );
              })}

              <text x="87" y="296" fontSize="9" fontWeight="600" fill="#64748B" textAnchor="middle">
                Tensor Inteiro [B=16, T=8]
              </text>
            </g>

            {/* DYNAMIC BEAM 1 */}
            <g>
              {(() => {
                const startY = 48 + selectedTokenIdx * 31 + 13;
                const endY = 165;
                return (
                  <path
                    d={`M 190 ${startY} C 215 ${startY}, 225 ${endY}, 245 ${endY}`}
                    fill="none"
                    stroke="#1BB5D8"
                    strokeWidth="2.5"
                    strokeDasharray="4 2"
                    markerEnd="url(#arrowCyan)"
                  />
                );
              })()}
              <rect x="195" y="145" width="46" height="20" rx="4" fill="#EDF5FA" stroke="#1BB5D8" strokeWidth="1" />
              <text x="218" y="158" fontSize="8.5" fontWeight="700" fill="#0A345D" textAnchor="middle">
                O(1)
              </text>
            </g>

            {/* COLUMN 2: EMBEDDING LOOKUP TABLE */}
            <g transform="translate(250, 8)">
              <rect x="0" y="0" width="370" height="26" rx="6" fill="#0A345D" />
              <text x="185" y="17" fontSize="10.5" fontWeight="700" fill="#64D9EF" textAnchor="middle">
                2. Matriz Look-up Table (W_E ∈ ℝ^50.257×768)
              </text>

              <rect x="0" y="32" width="370" height="270" rx="8" fill="#FFFFFF" stroke="#0A345D" strokeWidth="1.8" filter="url(#softShadow)" />

              {/* Column Dimensions Header */}
              <rect x="2" y="34" width="366" height="26" fill="#EDF5FA" />
              <text x="45" y="51" fontSize="9" fontWeight="700" fill="#0A345D" textAnchor="middle">Índice |V|</text>
              <line x1="85" y1="34" x2="85" y2="60" stroke="#CBD5E1" />
              <text x="120" y="51" fontSize="9" fontWeight="600" fill="#64748B" textAnchor="middle">dim 0</text>
              <text x="165" y="51" fontSize="9" fontWeight="600" fill="#64748B" textAnchor="middle">dim 1</text>
              <text x="210" y="51" fontSize="9" fontWeight="600" fill="#64748B" textAnchor="middle">dim 2</text>
              <text x="255" y="51" fontSize="9" fontWeight="600" fill="#94A3B8" textAnchor="middle">···</text>
              <text x="315" y="51" fontSize="9" fontWeight="700" fill="#0A345D" textAnchor="middle">dim 767</text>

              {/* Row 0 */}
              <g transform="translate(5, 66)">
                <rect x="0" y="0" width="360" height="22" rx="4" fill="#F8FAFC" stroke="#E2E8F0" />
                <text x="40" y="15" fontSize="8.5" fontFamily="monospace" fontWeight="600" fill="#64748B" textAnchor="middle">Linha 0</text>
                <line x1="80" y1="0" x2="80" y2="22" stroke="#E2E8F0" />
                <text x="115" y="15" fontSize="8" fontFamily="monospace" fill="#475569" textAnchor="middle">+0.021</text>
                <text x="160" y="15" fontSize="8" fontFamily="monospace" fill="#475569" textAnchor="middle">-0.114</text>
                <text x="205" y="15" fontSize="8" fontFamily="monospace" fill="#475569" textAnchor="middle">+0.342</text>
                <text x="250" y="15" fontSize="8" fontFamily="monospace" fill="#94A3B8" textAnchor="middle">···</text>
                <text x="310" y="15" fontSize="8" fontFamily="monospace" fill="#475569" textAnchor="middle">-0.052</text>
              </g>

              {/* Row 284 ("o") */}
              <g transform="translate(5, 92)">
                <rect x="0" y="0" width="360" height="22" rx="4" fill="#F8FAFC" stroke="#E2E8F0" />
                <text x="40" y="15" fontSize="8.5" fontFamily="monospace" fontWeight="600" fill="#64748B" textAnchor="middle">Linha 284</text>
                <line x1="80" y1="0" x2="80" y2="22" stroke="#E2E8F0" />
                <text x="115" y="15" fontSize="8" fontFamily="monospace" fill="#475569" textAnchor="middle">-0.082</text>
                <text x="160" y="15" fontSize="8" fontFamily="monospace" fill="#475569" textAnchor="middle">+0.219</text>
                <text x="205" y="15" fontSize="8" fontFamily="monospace" fill="#475569" textAnchor="middle">-0.145</text>
                <text x="250" y="15" fontSize="8" fontFamily="monospace" fill="#94A3B8" textAnchor="middle">···</text>
                <text x="310" y="15" fontSize="8" fontFamily="monospace" fill="#475569" textAnchor="middle">+0.603</text>
              </g>

              {/* Ellipsis */}
              <text x="185" y="130" fontSize="13" fontWeight="700" fill="#94A3B8" textAnchor="middle">
                ⋮ (50.000+ vetores aprendidos na memória GPU)
              </text>

              {/* ACTIVE HIGHLIGHTED ROW */}
              <g transform="translate(5, 142)">
                <rect
                  x="0"
                  y="0"
                  width="360"
                  height="34"
                  rx="6"
                  fill="#0A345D"
                  stroke="#1BB5D8"
                  strokeWidth="2"
                  filter="url(#glowActive)"
                />
                <text x="40" y="16" fontSize="9.5" fontFamily="monospace" fontWeight="700" fill="#64D9EF" textAnchor="middle">
                  Linha {activeToken.id}
                </text>
                <text x="40" y="27" fontSize="8" fontWeight="600" fill="#FFFFFF" textAnchor="middle">
                  ("{activeToken.text}")
                </text>
                <line x1="80" y1="0" x2="80" y2="34" stroke="#1BB5D8" strokeOpacity="0.5" />
                
                <text x="115" y="21" fontSize="9" fontFamily="monospace" fontWeight="700" fill="#64D9EF" textAnchor="middle">
                  {activeToken.vector[0]}
                </text>
                <text x="160" y="21" fontSize="9" fontFamily="monospace" fontWeight="700" fill="#64D9EF" textAnchor="middle">
                  {activeToken.vector[1]}
                </text>
                <text x="205" y="21" fontSize="9" fontFamily="monospace" fontWeight="700" fill="#64D9EF" textAnchor="middle">
                  {activeToken.vector[2]}
                </text>
                <text x="250" y="21" fontSize="9" fontFamily="monospace" fontWeight="700" fill="#FFFFFF" textAnchor="middle">
                  ···
                </text>
                <text x="310" y="21" fontSize="9" fontFamily="monospace" fontWeight="700" fill="#64D9EF" textAnchor="middle">
                  {activeToken.vector[3]}
                </text>
              </g>

              {/* Ellipsis 2 */}
              <text x="185" y="196" fontSize="13" fontWeight="700" fill="#94A3B8" textAnchor="middle">
                ⋮
              </text>

              {/* Row 50256 */}
              <g transform="translate(5, 208)">
                <rect x="0" y="0" width="360" height="22" rx="4" fill="#F8FAFC" stroke="#E2E8F0" />
                <text x="40" y="15" fontSize="8.5" fontFamily="monospace" fontWeight="600" fill="#64748B" textAnchor="middle">Linha 50256</text>
                <line x1="80" y1="0" x2="80" y2="22" stroke="#E2E8F0" />
                <text x="115" y="15" fontSize="8" fontFamily="monospace" fill="#475569" textAnchor="middle">-0.043</text>
                <text x="160" y="15" fontSize="8" fontFamily="monospace" fill="#475569" textAnchor="middle">+0.721</text>
                <text x="205" y="15" fontSize="8" fontFamily="monospace" fill="#475569" textAnchor="middle">-0.198</text>
                <text x="250" y="15" fontSize="8" fontFamily="monospace" fill="#94A3B8" textAnchor="middle">···</text>
                <text x="310" y="15" fontSize="8" fontFamily="monospace" fill="#475569" textAnchor="middle">+0.119</text>
              </g>

              {/* Technical Note */}
              <rect x="10" y="240" width="350" height="52" rx="6" fill="#F1F5F9" stroke="#CBD5E1" />
              <text x="185" y="257" fontSize="8.5" fontWeight="700" fill="#0A345D" textAnchor="middle">
                Operação PyTorch: X_emb = nn.Embedding(50257, 768)(input_ids)
              </text>
              <text x="185" y="271" fontSize="8" fill="#475569" textAnchor="middle">
                Lookup direto por ponteiro de memória — Zero multiplicação matricial O(|V|)
              </text>
              <text x="185" y="284" fontSize="8" fontWeight="600" fill="#15803D" textAnchor="middle">
                50.257 linhas × 768 floats × 4 bytes ≈ 154 MB de parâmetros treináveis
              </text>
            </g>

            {/* BEAM 2 */}
            <g>
              <path
                d="M 625 160 L 665 160"
                fill="none"
                stroke="#7CB342"
                strokeWidth="2.5"
                markerEnd="url(#arrowGreen)"
              />
              <rect x="625" y="138" width="40" height="18" rx="4" fill="#F0FDF4" stroke="#86EFAC" strokeWidth="1" />
              <text x="645" y="150" fontSize="8" fontWeight="700" fill="#15803D" textAnchor="middle">
                Empilha
              </text>
            </g>

            {/* COLUMN 3: DENSE 3D TENSOR */}
            <g transform="translate(675, 8)">
              <rect x="0" y="0" width="270" height="26" rx="6" fill="#15803D" />
              <text x="135" y="17" fontSize="10.5" fontWeight="700" fill="#FFFFFF" textAnchor="middle">
                3. Tensor Contínuo 3D (X_emb)
              </text>

              <rect x="0" y="32" width="270" height="270" rx="8" fill="#FFFFFF" stroke="#86EFAC" strokeWidth="1.5" filter="url(#softShadow)" />

              <g transform="translate(25, 42)">
                <rect x="18" y="0" width="195" height="132" rx="6" fill="#DCFCE7" stroke="#86EFAC" strokeWidth="1" strokeDasharray="3 2" />
                <text x="200" y="15" fontSize="8" fontWeight="600" fill="#15803D">Batch #15</text>

                <rect x="9" y="9" width="195" height="132" rx="6" fill="#DCFCE7" stroke="#86EFAC" strokeWidth="1" strokeDasharray="3 2" />
                <text x="190" y="24" fontSize="8" fontWeight="600" fill="#15803D">Batch #1</text>

                <rect x="0" y="18" width="195" height="136" rx="6" fill="url(#tensor3dGrad)" stroke="#15803D" strokeWidth="2" filter="url(#softShadow)" />
                <text x="10" y="34" fontSize="9" fontWeight="700" fill="#0A345D">Batch Atual #0</text>
                <text x="185" y="34" fontSize="8.5" fontFamily="monospace" fontWeight="700" fill="#15803D" textAnchor="end">[B, T, d]</text>

                {tokensData.map((t, i) => {
                  const isSelected = selectedTokenIdx === t.idx;
                  const sliceY = 42 + i * 12.6;
                  return (
                    <g key={t.idx}>
                      <rect
                        x="8"
                        y={sliceY}
                        width="179"
                        height="10.5"
                        rx="2"
                        fill={isSelected ? '#15803D' : '#FFFFFF'}
                        stroke={isSelected ? '#86EFAC' : '#BBF7D0'}
                        strokeWidth={isSelected ? '1.5' : '0.8'}
                      />
                      <text
                        x="14"
                        y={sliceY + 8}
                        fontSize="7"
                        fontFamily="monospace"
                        fontWeight="700"
                        fill={isSelected ? '#FFFFFF' : '#15803D'}
                      >
                        t={t.idx} ("{t.text}")
                      </text>
                      <text
                        x="182"
                        y={sliceY + 8}
                        fontSize="6.5"
                        fontFamily="monospace"
                        fill={isSelected ? '#DCFCE7' : '#64748B'}
                        textAnchor="end"
                      >
                        {isSelected ? '→ [768 floats]' : `[${t.vector[0]}, ${t.vector[1]}, ...]`}
                      </text>
                    </g>
                  );
                })}

                <line x1="8" y1="158" x2="187" y2="158" stroke="#0A345D" strokeWidth="1.5" />
                <text x="97" y="169" fontSize="8" fontWeight="700" fill="#0A345D" textAnchor="middle">
                  ← d_model = 768 dimensões contínuas →
                </text>

                <line x1="-5" y1="42" x2="-5" y2="142" stroke="#0A345D" strokeWidth="1.5" />
                <text x="-12" y="95" fontSize="8" fontWeight="700" fill="#0A345D" textAnchor="middle" transform="rotate(-90 -12 95)">
                  T = 8 tokens (Janela)
                </text>
              </g>

              {/* Status Box */}
              <g transform="translate(10, 235)">
                <rect x="0" y="0" width="250" height="57" rx="6" fill="#FEF3C7" stroke="#FDE68A" />
                <text x="125" y="16" fontSize="8.5" fontWeight="700" fill="#92400E" textAnchor="middle">
                  ⚠️ Próximo Passo Crítico:
                </text>
                <text x="125" y="30" fontSize="8" fill="#78350F" textAnchor="middle">
                  Até aqui, o tensor não tem ordem espacial!
                </text>
                <text x="125" y="44" fontSize="8" fontWeight="700" fill="#B45309" textAnchor="middle">
                  Soma com Positional Embeddings: X = X_emb + W_pos
                </text>
              </g>
            </g>
          </svg>
        </div>

        {/* Bottom Interactive Token Inspector Bar */}
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
              Inspetor de Vetor Ativo:
            </span>
            <span style={{
              background: 'var(--infnet-dark-blue)',
              color: '#FFFFFF',
              padding: '2px 8px',
              borderRadius: '4px',
              fontWeight: 700,
              fontSize: '11px'
            }}>
              "{activeToken.text}"
            </span>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              (Posição: <strong>{activeToken.pos}</strong> | Token ID: <strong>{activeToken.id}</strong>)
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-code)', fontSize: '11px', color: '#0369A1', background: '#F0F9FF', padding: '4px 10px', borderRadius: '6px', border: '1px solid #BAE6FD' }}>
            <span style={{ fontWeight: 700 }}>x_{activeToken.idx} = W_E[{activeToken.id}] =</span>
            <span>[{activeToken.vector[0]}, {activeToken.vector[1]}, {activeToken.vector[2]}, {activeToken.vector[3]}, ..., +0.621] ∈ ℝ^768</span>
          </div>

          <div style={{ display: 'flex', gap: '4px' }}>
            {tokensData.map((t) => (
              <button
                key={t.idx}
                onClick={() => setSelectedTokenIdx(t.idx)}
                style={{
                  padding: '3px 7px',
                  borderRadius: '4px',
                  border: selectedTokenIdx === t.idx ? '1px solid var(--infnet-cyan)' : '1px solid #CBD5E1',
                  background: selectedTokenIdx === t.idx ? 'var(--infnet-dark-blue)' : '#FFFFFF',
                  color: selectedTokenIdx === t.idx ? '#FFFFFF' : '#475569',
                  fontSize: '10px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {t.text}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
