import React, { useState } from 'react';
import { Layers, GitMerge, Zap, ArrowUp, Info, CheckCircle2, AlertCircle } from 'lucide-react';
import MathView from '../MathView';

const BRANCH_INFO = {
  branch1: {
    title: 'Ramo 1: Convolução 1×1 Direta',
    tag: 'Filtro Pontual',
    badge: 'badge-cyan',
    desc: 'Aplica filtros 1×1 diretamente na entrada para extrair correlações entre canais na mesma posição espacial sem misturar pixels vizinhos.',
    role: 'Projeção linear rápida e preservação de resolução pontual.',
    math: 'H \\times W \\times C_{in} \\xrightarrow{1\\times 1} H \\times W \\times 64'
  },
  branch2: {
    title: 'Ramo 2: Redução 1×1 + Convolução 3×3',
    tag: 'Filtro Local Médio',
    badge: 'badge-blue',
    desc: 'Primeiro comprime os canais com Conv 1×1 (ex: 192 → 96) e depois aplica a Conv 3×3 com same padding para capturar padrões locais.',
    role: 'Extrai texturas e formas médias com custo reduzido.',
    math: 'C_{in} \\xrightarrow{1\\times 1} 96 \\xrightarrow{3\\times 3 (same)} 128'
  },
  branch3: {
    title: 'Ramo 3: Redução 1×1 + Convolução 5×5',
    tag: 'Filtro Amplo de Contexto',
    badge: 'badge-purple',
    desc: 'Aplica Conv 1×1 agressiva (ex: 192 → 16) antes do filtro pesado 5×5 para evitar a explosão quadrática de FLOPs.',
    role: 'Captura estruturas maiores e contexto espacial global.',
    math: 'C_{in} \\xrightarrow{1\\times 1} 16 \\xrightarrow{5\\times 5 (same)} 32'
  },
  branch4: {
    title: 'Ramo 4: Max Pooling 3×3 + Redução 1×1',
    tag: 'Invariância Espacial',
    badge: 'badge-orange',
    desc: 'Max Pooling 3×3 com stride 1 e same padding preserva as features mais salientes, seguido por Conv 1×1 para fixar o número de canais na saída.',
    role: 'Mantém invariância a pequenas translações na imagem.',
    math: 'C_{in} \\xrightarrow{Pool 3\\times 3} C_{in} \\xrightarrow{1\\times 1} 32'
  },
  concat: {
    title: 'Depth Concat: Concatenação de Profundidade',
    tag: 'Fusão Multi-Escala',
    badge: 'badge-green',
    desc: 'Como todos os 4 ramos utilizam stride 1 e same padding, todas as 4 saídas possuem exatamente a mesma resolução espacial (H × W). Elas são empilhadas ao longo dos canais.',
    role: 'Saída combinada: 64 + 128 + 32 + 32 = 256 canais.',
    math: 'C_{total} = C_1 + C_2 + C_3 + C_4 = 256'
  }
};

export default function InceptionModuleVisualizer() {
  const [activeElement, setActiveElement] = useState('concat');
  const [showReduction, setShowReduction] = useState(true);

  const selectedInfo = BRANCH_INFO[activeElement] || BRANCH_INFO.concat;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.35fr 1fr', gap: '16px', height: '100%', alignItems: 'stretch' }}>
      {/* Left Column: Visual Inception Diagram */}
      <div style={{
        background: '#FFFFFF',
        border: '1px solid var(--border-light)',
        borderRadius: '10px',
        padding: '12px 14px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: 'var(--shadow-sm)'
      }}>
        {/* Header & Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--infnet-dark-blue)' }}>
              Módulo Inception (GoogLeNet / Szegedy et al., 2014)
            </span>
          </div>

          <div style={{ display: 'flex', gap: '4px', background: '#F1F5F9', padding: '2px', borderRadius: '6px' }}>
            <button
              onClick={() => setShowReduction(true)}
              style={{
                border: 'none',
                padding: '3px 8px',
                borderRadius: '4px',
                fontSize: '10.5px',
                fontWeight: 700,
                cursor: 'pointer',
                background: showReduction ? 'var(--infnet-dark-blue)' : 'transparent',
                color: showReduction ? '#FFFFFF' : 'var(--text-muted)',
                transition: 'all 0.15s ease'
              }}
            >
              Com Reduções 1×1 (Padrão)
            </button>
            <button
              onClick={() => setShowReduction(false)}
              style={{
                border: 'none',
                padding: '3px 8px',
                borderRadius: '4px',
                fontSize: '10.5px',
                fontWeight: 700,
                cursor: 'pointer',
                background: !showReduction ? '#C2410C' : 'transparent',
                color: !showReduction ? '#FFFFFF' : 'var(--text-muted)',
                transition: 'all 0.15s ease'
              }}
            >
              Ingênuo (Sem 1×1)
            </button>
          </div>
        </div>

        {/* SVG Diagram matching user's image */}
        <div style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: '#FFFBEB',
          border: '1.5px solid #FDE68A',
          borderRadius: '10px',
          padding: '8px',
          position: 'relative'
        }}>
          <svg viewBox="0 0 540 370" style={{ width: '100%', height: '100%', maxHeight: '310px' }}>
            <defs>
              {/* Arrow Markers */}
              <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#0F172A" />
              </marker>
              <marker id="arrow-active" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#0284C7" />
              </marker>
            </defs>

            {/* Main Outer Inception Card Background */}
            <rect
              x="20"
              y="20"
              width="500"
              height="330"
              rx="12"
              fill="#FEF9C3"
              stroke="#000000"
              strokeWidth="2"
            />

            {/* Input Line at Bottom */}
            <line x1="270" y1="365" x2="270" y2="310" stroke="#000000" strokeWidth="2.5" />
            <line x1="75" y1="310" x2="465" y2="310" stroke="#000000" strokeWidth="2" />

            {/* Branches Vertical Inputs */}
            {/* Branch 1 Input */}
            <line x1="75" y1="310" x2="75" y2={showReduction ? "185" : "185"} stroke="#000000" strokeWidth="2" markerEnd="url(#arrow)" />

            {/* Branch 2 Input */}
            <line x1="205" y1="310" x2="205" y2={showReduction ? "265" : "185"} stroke="#000000" strokeWidth="2" markerEnd="url(#arrow)" />

            {/* Branch 3 Input */}
            <line x1="335" y1="310" x2="335" y2={showReduction ? "265" : "185"} stroke="#000000" strokeWidth="2" markerEnd="url(#arrow)" />

            {/* Branch 4 Input */}
            <line x1="465" y1="310" x2="465" y2={showReduction ? "265" : "185"} stroke="#000000" strokeWidth="2" markerEnd="url(#arrow)" />

            {/* ========================================= */}
            {/* BOTTOM ROW (Reductions & Pooling) */}
            {/* ========================================= */}
            {showReduction ? (
              <>
                {/* Branch 2: Conv 1x1 Reduction */}
                <g onClick={() => setActiveElement('branch2')} style={{ cursor: 'pointer' }}>
                  <rect
                    x="150"
                    y="225"
                    width="110"
                    height="38"
                    rx="6"
                    fill="#93C5FD"
                    stroke={activeElement === 'branch2' ? '#0284C7' : '#000000'}
                    strokeWidth={activeElement === 'branch2' ? "2.5" : "1.8"}
                  />
                  <text x="205" y="243" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0F172A">Convolution</text>
                  <text x="205" y="255" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#0F172A">1 × 1 + 1(S)</text>
                </g>
                <line x1="205" y1="225" x2="205" y2="185" stroke="#000000" strokeWidth="2" markerEnd="url(#arrow)" />

                {/* Branch 3: Conv 1x1 Reduction */}
                <g onClick={() => setActiveElement('branch3')} style={{ cursor: 'pointer' }}>
                  <rect
                    x="280"
                    y="225"
                    width="110"
                    height="38"
                    rx="6"
                    fill="#93C5FD"
                    stroke={activeElement === 'branch3' ? '#0284C7' : '#000000'}
                    strokeWidth={activeElement === 'branch3' ? "2.5" : "1.8"}
                  />
                  <text x="335" y="243" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0F172A">Convolution</text>
                  <text x="335" y="255" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#0F172A">1 × 1 + 1(S)</text>
                </g>
                <line x1="335" y1="225" x2="335" y2="185" stroke="#000000" strokeWidth="2" markerEnd="url(#arrow)" />

                {/* Branch 4: Max Pool 3x3 */}
                <g onClick={() => setActiveElement('branch4')} style={{ cursor: 'pointer' }}>
                  <rect
                    x="410"
                    y="225"
                    width="110"
                    height="38"
                    rx="6"
                    fill="#FECDD3"
                    stroke={activeElement === 'branch4' ? '#E11D48' : '#000000'}
                    strokeWidth={activeElement === 'branch4' ? "2.5" : "1.8"}
                  />
                  <text x="465" y="243" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0F172A">Max pool</text>
                  <text x="465" y="255" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#0F172A">3 × 3 + 1(S)</text>
                </g>
                <line x1="465" y1="225" x2="465" y2="185" stroke="#000000" strokeWidth="2" markerEnd="url(#arrow)" />
              </>
            ) : (
              /* Naive Mode: Directly Max pool 3x3 in Branch 4 */
              <g onClick={() => setActiveElement('branch4')} style={{ cursor: 'pointer' }}>
                <rect
                  x="410"
                  y="145"
                  width="110"
                  height="38"
                  rx="6"
                  fill="#FECDD3"
                  stroke={activeElement === 'branch4' ? '#E11D48' : '#000000'}
                  strokeWidth={activeElement === 'branch4' ? "2.5" : "1.8"}
                />
                <text x="465" y="163" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0F172A">Max pool</text>
                <text x="465" y="175" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#0F172A">3 × 3 + 1(S)</text>
              </g>
            )}

            {/* ========================================= */}
            {/* TOP ROW (Convolutions) */}
            {/* ========================================= */}
            {/* Branch 1: Conv 1x1 */}
            <g onClick={() => setActiveElement('branch1')} style={{ cursor: 'pointer' }}>
              <rect
                x="20"
                y="145"
                width="110"
                height="38"
                rx="6"
                fill="#93C5FD"
                stroke={activeElement === 'branch1' ? '#0284C7' : '#000000'}
                strokeWidth={activeElement === 'branch1' ? "2.5" : "1.8"}
              />
              <text x="75" y="163" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0F172A">Convolution</text>
              <text x="75" y="175" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#0F172A">1 × 1 + 1(S)</text>
            </g>

            {/* Branch 2: Conv 3x3 */}
            <g onClick={() => setActiveElement('branch2')} style={{ cursor: 'pointer' }}>
              <rect
                x="150"
                y="145"
                width="110"
                height="38"
                rx="6"
                fill="#93C5FD"
                stroke={activeElement === 'branch2' ? '#0284C7' : '#000000'}
                strokeWidth={activeElement === 'branch2' ? "2.5" : "1.8"}
              />
              <text x="205" y="163" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0F172A">Convolution</text>
              <text x="205" y="175" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#0F172A">3 × 3 + 1(S)</text>
            </g>

            {/* Branch 3: Conv 5x5 */}
            <g onClick={() => setActiveElement('branch3')} style={{ cursor: 'pointer' }}>
              <rect
                x="280"
                y="145"
                width="110"
                height="38"
                rx="6"
                fill="#93C5FD"
                stroke={activeElement === 'branch3' ? '#0284C7' : '#000000'}
                strokeWidth={activeElement === 'branch3' ? "2.5" : "1.8"}
              />
              <text x="335" y="163" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0F172A">Convolution</text>
              <text x="335" y="175" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#0F172A">5 × 5 + 1(S)</text>
            </g>

            {/* Branch 4 (Top): Conv 1x1 if with reduction */}
            {showReduction && (
              <g onClick={() => setActiveElement('branch4')} style={{ cursor: 'pointer' }}>
                <rect
                  x="410"
                  y="145"
                  width="110"
                  height="38"
                  rx="6"
                  fill="#93C5FD"
                  stroke={activeElement === 'branch4' ? '#0284C7' : '#000000'}
                  strokeWidth={activeElement === 'branch4' ? "2.5" : "1.8"}
                />
                <text x="465" y="163" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0F172A">Convolution</text>
                <text x="465" y="175" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#0F172A">1 × 1 + 1(S)</text>
              </g>
            )}

            {/* Convergence lines to Depth Concat */}
            <line x1="75" y1="145" x2="75" y2="105" stroke="#000000" strokeWidth="2" />
            <line x1="205" y1="145" x2="205" y2="105" stroke="#000000" strokeWidth="2" />
            <line x1="335" y1="145" x2="335" y2="105" stroke="#000000" strokeWidth="2" />
            <line x1="465" y1="145" x2="465" y2="105" stroke="#000000" strokeWidth="2" />

            <line x1="75" y1="105" x2="465" y2="105" stroke="#000000" strokeWidth="2" />
            <line x1="270" y1="105" x2="270" y2="82" stroke="#000000" strokeWidth="2.5" markerEnd="url(#arrow)" />

            {/* Depth Concat Green Box */}
            <g onClick={() => setActiveElement('concat')} style={{ cursor: 'pointer' }}>
              <rect
                x="210"
                y="40"
                width="120"
                height="42"
                rx="8"
                fill="#15803D"
                stroke={activeElement === 'concat' ? '#4ADE80' : '#000000'}
                strokeWidth={activeElement === 'concat' ? "3" : "2"}
              />
              <text x="270" y="58" textAnchor="middle" fontSize="12" fontWeight="800" fill="#FFFFFF">Depth</text>
              <text x="270" y="73" textAnchor="middle" fontSize="12" fontWeight="800" fill="#FFFFFF">concat</text>
            </g>

            {/* Output Line at Top */}
            <line x1="270" y1="40" x2="270" y2="5" stroke="#000000" strokeWidth="2.5" markerEnd="url(#arrow)" />
          </svg>
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '10.5px', marginTop: '6px', color: 'var(--text-muted)' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '10px', height: '10px', background: '#93C5FD', borderRadius: '2px', border: '1px solid #000' }} />
              Convolução (Azul)
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '10px', height: '10px', background: '#FECDD3', borderRadius: '2px', border: '1px solid #000' }} />
              Max Pooling (Rosa)
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '10px', height: '10px', background: '#15803D', borderRadius: '2px', border: '1px solid #000' }} />
              Concatenação (Verde)
            </span>
          </div>
          <span style={{ fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
            + 1(S) = Stride 1, Same Padding
          </span>
        </div>
      </div>

      {/* Right Column: Interactive Details & Pedagogical Rationale */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'space-between' }}>
        {/* Selected Component Card */}
        <div style={{
          background: '#FFFFFF',
          border: '1.5px solid var(--infnet-cyan)',
          borderRadius: '10px',
          padding: '14px 16px',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
            <div>
              <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--infnet-dark-blue)' }}>
                {selectedInfo.title}
              </span>
              <div style={{ marginTop: '2px' }}>
                <span className={`badge ${selectedInfo.badge}`}>
                  {selectedInfo.tag}
                </span>
              </div>
            </div>
          </div>

          <p style={{ fontSize: '11.5px', color: 'var(--text-main)', margin: '6px 0 10px 0', lineHeight: 1.45 }}>
            {selectedInfo.desc}
          </p>

          <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '8px 10px', fontSize: '11px' }}>
            <span style={{ color: 'var(--text-muted)', display: 'block', marginBottom: '2px' }}>Fluxo de Canais e Dimensões:</span>
            <strong style={{ color: 'var(--infnet-dark-blue)' }}>
              <MathView math={selectedInfo.math} />
            </strong>
          </div>
        </div>

        {/* The 2 Main Engineering Insights of GoogLeNet */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ background: '#FFFFFF', border: '1px solid var(--border-light)', borderRadius: '8px', padding: '9px 12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
              <CheckCircle2 size={14} color="#15803D" />
              <span style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
                1. Extração Multi-Escala em Paralelo
              </span>
            </div>
            <div style={{ fontSize: '10.5px', color: 'var(--text-muted)', lineHeight: 1.35 }}>
              A rede não precisa escolher se 1x1, 3x3 ou 5x5 é melhor: ela aprende a dosagem ótima de cada escala em paralelo.
            </div>
          </div>

          <div style={{ background: '#FFFFFF', border: '1px solid var(--border-light)', borderRadius: '8px', padding: '9px 12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
              <Zap size={14} color="#0284C7" />
              <span style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
                2. Redução de Dimensão 1×1 (Bottlenecks)
              </span>
            </div>
            <div style={{ fontSize: '10.5px', color: 'var(--text-muted)', lineHeight: 1.35 }}>
              Sem a compressão 1x1 antes das convoluções 3x3 e 5x5, a quantidade de FLOPs e canais explodiria rapidamente a cada estágio.
            </div>
          </div>
        </div>

        {/* Global Average Pooling Note */}
        <div style={{ background: '#EFF8FC', border: '1px solid #CDE6F5', borderRadius: '6px', padding: '8px 10px', fontSize: '11px', color: 'var(--infnet-dark-blue)' }}>
          🏆 <strong>Resultado:</strong> O GoogLeNet (22 camadas) atingiu 6.7% de erro Top-5 com apenas <strong>6.8M parâmetros</strong> (quase 10x menos que a AlexNet!).
        </div>
      </div>
    </div>
  );
}
