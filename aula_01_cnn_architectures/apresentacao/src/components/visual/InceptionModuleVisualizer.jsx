import React, { useState } from 'react';
import { Layers, Zap, Info, CheckCircle2, AlertTriangle, ArrowUp } from 'lucide-react';

export default function InceptionModuleVisualizer() {
  const [showReduction, setShowReduction] = useState(true);
  const [hoveredLane, setHoveredLane] = useState(null);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      width: '100%',
      background: '#FFFFFF',
      border: '1px solid var(--border-light)',
      borderRadius: '12px',
      padding: '14px 20px',
      boxShadow: 'var(--shadow-sm)',
      justifyContent: 'space-between',
      boxSizing: 'border-box'
    }}>
      {/* Top Header & Interactive Switcher */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: '8px',
        borderBottom: '1px solid #F1F5F9'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '15px', fontWeight: 800, color: 'var(--infnet-dark-blue)' }}>
            Módulo Inception (GoogLeNet / Szegedy et al., 2014)
          </span>
          <span className="badge badge-cyan" style={{ fontSize: '11px', padding: '3px 8px' }}>
            Extração Multi-Escala em 4 Ramos Paralelos
          </span>
        </div>

        {/* Reduction vs Naive Switcher */}
        <div style={{
          display: 'flex',
          gap: '6px',
          background: '#F1F5F9',
          padding: '3px',
          borderRadius: '8px',
          border: '1px solid #E2E8F0'
        }}>
          <button
            onClick={() => setShowReduction(true)}
            style={{
              border: 'none',
              padding: '5px 14px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              background: showReduction ? 'var(--infnet-dark-blue)' : 'transparent',
              color: showReduction ? '#FFFFFF' : 'var(--text-muted)',
              transition: 'all 0.2s ease',
              boxShadow: showReduction ? '0 2px 6px rgba(10, 52, 93, 0.25)' : 'none'
            }}
          >
            ✓ Com Reduções 1×1 (Padrão GoogLeNet)
          </button>
          <button
            onClick={() => setShowReduction(false)}
            style={{
              border: 'none',
              padding: '5px 14px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              background: !showReduction ? '#C2410C' : 'transparent',
              color: !showReduction ? '#FFFFFF' : 'var(--text-muted)',
              transition: 'all 0.2s ease',
              boxShadow: !showReduction ? '0 2px 6px rgba(194, 65, 12, 0.25)' : 'none'
            }}
          >
            ⚠ Módulo Ingênuo (Sem Reduções 1×1)
          </button>
        </div>
      </div>

      {/* Main Spacious SVG Diagram */}
      <div style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#FFFDF5',
        border: '1.5px solid #FEF08A',
        borderRadius: '12px',
        padding: '10px 16px',
        position: 'relative',
        minHeight: '380px',
        margin: '8px 0',
        overflow: 'hidden'
      }}>
        <svg
          viewBox="0 0 960 430"
          style={{ width: '100%', height: '100%', maxHeight: '420px' }}
        >
          <defs>
            {/* Arrow Marker Black */}
            <marker
              id="arr-main"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#0F172A" />
            </marker>

            {/* Arrow Marker Cyan Active */}
            <marker
              id="arr-cyan"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#0284C7" />
            </marker>

            {/* Shadow Filter */}
            <filter id="box-shadow" x="-5%" y="-10%" width="110%" height="125%">
              <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#0F172A" floodOpacity="0.08" />
            </filter>
          </defs>

          {/* ======================================================== */}
          {/* OUTER BOUNDARY OF INCEPTION MODULE                       */}
          {/* ======================================================== */}
          <rect
            x="30"
            y="48"
            width="900"
            height="332"
            rx="14"
            fill="#FEFCE8"
            stroke="#F59E0B"
            strokeWidth="1.8"
            strokeDasharray="6 4"
          />
          <text
            x="48"
            y="68"
            fontSize="11"
            fontWeight="800"
            fill="#B45309"
            letterSpacing="0.5px"
          >
            ENVELOPE DO MÓDULO INCEPTION (Camada Construtiva Isolada)
          </text>

          {/* Warning banner if Naive Mode */}
          {!showReduction && (
            <g>
              <rect x="520" y="54" width="395" height="22" rx="4" fill="#FEE2E2" stroke="#EF4444" strokeWidth="1" />
              <text x="717" y="69" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#B91C1C">
                Sem reduções 1×1: Custo de FLOPs e memória explode nos ramos 3×3 e 5×5!
              </text>
            </g>
          )}

          {/* ======================================================== */}
          {/* INPUT AT BOTTOM                                          */}
          {/* ======================================================== */}
          {/* Input Box */}
          <g>
            <rect
              x="360"
              y="390"
              width="240"
              height="34"
              rx="8"
              fill="#FFFFFF"
              stroke="#0F172A"
              strokeWidth="2"
              filter="url(#box-shadow)"
            />
            <text x="480" y="405" textAnchor="middle" fontSize="11" fontWeight="800" fill="#0F172A">
              Entrada da Camada Anterior
            </text>
            <text x="480" y="418" textAnchor="middle" fontSize="10" fontWeight="600" fill="#64748B">
              (Resolução espacial: H × W × C_in)
            </text>
          </g>

          {/* Vertical line from input to distribution bus */}
          <line x1="480" y1="390" x2="480" y2="350" stroke="#0F172A" strokeWidth="2.5" />

          {/* Horizontal Distribution Bus */}
          <line x1="135" y1="350" x2="825" y2="350" stroke="#0F172A" strokeWidth="2.2" />

          {/* ======================================================== */}
          {/* 4 VERTICAL RAMOS (BRANCHES)                              */}
          {/* ======================================================== */}

          {/* -------------------------------------------------------- */}
          {/* RAMO 1: Convolução 1x1 Direta (x = 135)                  */}
          {/* -------------------------------------------------------- */}
          <g
            onMouseEnter={() => setHoveredLane('branch1')}
            onMouseLeave={() => setHoveredLane(null)}
            style={{ cursor: 'pointer' }}
          >
            {/* Header Badge */}
            <rect x="65" y="80" width="140" height="20" rx="4" fill="#E0F2FE" stroke="#38BDF8" strokeWidth="1" />
            <text x="135" y="94" textAnchor="middle" fontSize="10" fontWeight="800" fill="#0369A1">
              RAMO 1: 1×1 DIRETO
            </text>

            {/* Connecting Arrow from Bus */}
            <line x1="135" y1="350" x2="135" y2="235" stroke="#0F172A" strokeWidth="2.2" markerEnd="url(#arr-main)" />

            {/* Conv 1x1 Box */}
            <rect
              x="60"
              y="185"
              width="150"
              height="50"
              rx="8"
              fill={hoveredLane === 'branch1' ? '#BAE6FD' : '#93C5FD'}
              stroke="#1D4ED8"
              strokeWidth="2"
              filter="url(#box-shadow)"
            />
            <text x="135" y="204" textAnchor="middle" fontSize="12" fontWeight="800" fill="#0F172A">
              Convolution
            </text>
            <text x="135" y="218" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1E3A8A">
              1 × 1 + 1(S)
            </text>
            <text x="135" y="229" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="#334155">
              (64 filtros)
            </text>

            {/* Connecting Arrow to Top Bus */}
            <line x1="135" y1="185" x2="135" y2="130" stroke="#0F172A" strokeWidth="2.2" />
          </g>

          {/* -------------------------------------------------------- */}
          {/* RAMO 2: Redução 1x1 + Convolução 3x3 (x = 365)           */}
          {/* -------------------------------------------------------- */}
          <g
            onMouseEnter={() => setHoveredLane('branch2')}
            onMouseLeave={() => setHoveredLane(null)}
            style={{ cursor: 'pointer' }}
          >
            {/* Header Badge */}
            <rect x="295" y="80" width="140" height="20" rx="4" fill="#DBEAFE" stroke="#60A5FA" strokeWidth="1" />
            <text x="365" y="94" textAnchor="middle" fontSize="10" fontWeight="800" fill="#1D4ED8">
              RAMO 2: FILTRO 3×3
            </text>

            {showReduction ? (
              <>
                {/* Arrow to Reduction Box */}
                <line x1="365" y1="350" x2="365" y2="315" stroke="#0F172A" strokeWidth="2.2" markerEnd="url(#arr-main)" />

                {/* Reduction Box 1x1 */}
                <rect
                  x="290"
                  y="268"
                  width="150"
                  height="47"
                  rx="8"
                  fill="#DBEAFE"
                  stroke="#2563EB"
                  strokeWidth="2"
                  filter="url(#box-shadow)"
                />
                <text x="365" y="286" textAnchor="middle" fontSize="11.5" fontWeight="800" fill="#0F172A">
                  Convolution
                </text>
                <text x="365" y="299" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#1E40AF">
                  1 × 1 + 1(S) <tspan fontSize="9.5" fontWeight="600" fill="#475569">(Redução: 96)</tspan>
                </text>

                {/* Arrow to Conv 3x3 */}
                <line x1="365" y1="268" x2="365" y2="235" stroke="#0F172A" strokeWidth="2.2" markerEnd="url(#arr-main)" />
              </>
            ) : (
              /* Naive Mode: Direct connection to 3x3 */
              <line x1="365" y1="350" x2="365" y2="235" stroke="#0F172A" strokeWidth="2.2" markerEnd="url(#arr-main)" />
            )}

            {/* Conv 3x3 Box */}
            <rect
              x="290"
              y="185"
              width="150"
              height="50"
              rx="8"
              fill={hoveredLane === 'branch2' ? '#BAE6FD' : '#93C5FD'}
              stroke="#1D4ED8"
              strokeWidth="2"
              filter="url(#box-shadow)"
            />
            <text x="365" y="204" textAnchor="middle" fontSize="12" fontWeight="800" fill="#0F172A">
              Convolution
            </text>
            <text x="365" y="218" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1E3A8A">
              3 × 3 + 1(S)
            </text>
            <text x="365" y="229" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="#334155">
              (128 filtros)
            </text>

            {/* Connecting Arrow to Top Bus */}
            <line x1="365" y1="185" x2="365" y2="130" stroke="#0F172A" strokeWidth="2.2" />
          </g>

          {/* -------------------------------------------------------- */}
          {/* RAMO 3: Redução 1x1 + Convolução 5x5 (x = 595)           */}
          {/* -------------------------------------------------------- */}
          <g
            onMouseEnter={() => setHoveredLane('branch3')}
            onMouseLeave={() => setHoveredLane(null)}
            style={{ cursor: 'pointer' }}
          >
            {/* Header Badge */}
            <rect x="525" y="80" width="140" height="20" rx="4" fill="#F3E8FF" stroke="#C084FC" strokeWidth="1" />
            <text x="595" y="94" textAnchor="middle" fontSize="10" fontWeight="800" fill="#7E22CE">
              RAMO 3: FILTRO 5×5
            </text>

            {showReduction ? (
              <>
                {/* Arrow to Reduction Box */}
                <line x1="595" y1="350" x2="595" y2="315" stroke="#0F172A" strokeWidth="2.2" markerEnd="url(#arr-main)" />

                {/* Reduction Box 1x1 */}
                <rect
                  x="520"
                  y="268"
                  width="150"
                  height="47"
                  rx="8"
                  fill="#DBEAFE"
                  stroke="#2563EB"
                  strokeWidth="2"
                  filter="url(#box-shadow)"
                />
                <text x="595" y="286" textAnchor="middle" fontSize="11.5" fontWeight="800" fill="#0F172A">
                  Convolution
                </text>
                <text x="595" y="299" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#1E40AF">
                  1 × 1 + 1(S) <tspan fontSize="9.5" fontWeight="600" fill="#475569">(Redução: 16)</tspan>
                </text>

                {/* Arrow to Conv 5x5 */}
                <line x1="595" y1="268" x2="595" y2="235" stroke="#0F172A" strokeWidth="2.2" markerEnd="url(#arr-main)" />
              </>
            ) : (
              /* Naive Mode: Direct connection to 5x5 */
              <line x1="595" y1="350" x2="595" y2="235" stroke="#0F172A" strokeWidth="2.2" markerEnd="url(#arr-main)" />
            )}

            {/* Conv 5x5 Box */}
            <rect
              x="520"
              y="185"
              width="150"
              height="50"
              rx="8"
              fill={hoveredLane === 'branch3' ? '#BAE6FD' : '#93C5FD'}
              stroke="#1D4ED8"
              strokeWidth="2"
              filter="url(#box-shadow)"
            />
            <text x="595" y="204" textAnchor="middle" fontSize="12" fontWeight="800" fill="#0F172A">
              Convolution
            </text>
            <text x="595" y="218" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1E3A8A">
              5 × 5 + 1(S)
            </text>
            <text x="595" y="229" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="#334155">
              (32 filtros)
            </text>

            {/* Connecting Arrow to Top Bus */}
            <line x1="595" y1="185" x2="595" y2="130" stroke="#0F172A" strokeWidth="2.2" />
          </g>

          {/* -------------------------------------------------------- */}
          {/* RAMO 4: Max Pooling + Projeção 1x1 (x = 825)             */}
          {/* -------------------------------------------------------- */}
          <g
            onMouseEnter={() => setHoveredLane('branch4')}
            onMouseLeave={() => setHoveredLane(null)}
            style={{ cursor: 'pointer' }}
          >
            {/* Header Badge */}
            <rect x="755" y="80" width="140" height="20" rx="4" fill="#FFE4E6" stroke="#FB7185" strokeWidth="1" />
            <text x="825" y="94" textAnchor="middle" fontSize="10" fontWeight="800" fill="#BE123C">
              RAMO 4: MAX POOLING
            </text>

            {showReduction ? (
              <>
                {/* Arrow to Max Pool Box */}
                <line x1="825" y1="350" x2="825" y2="315" stroke="#0F172A" strokeWidth="2.2" markerEnd="url(#arr-main)" />

                {/* Max Pool 3x3 Box */}
                <rect
                  x="750"
                  y="268"
                  width="150"
                  height="47"
                  rx="8"
                  fill="#FECDD3"
                  stroke="#E11D48"
                  strokeWidth="2"
                  filter="url(#box-shadow)"
                />
                <text x="825" y="286" textAnchor="middle" fontSize="11.5" fontWeight="800" fill="#0F172A">
                  Max pool
                </text>
                <text x="825" y="299" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#9F1239">
                  3 × 3 + 1(S) <tspan fontSize="9.5" fontWeight="600" fill="#475569">(Stride 1)</tspan>
                </text>

                {/* Arrow to Conv 1x1 */}
                <line x1="825" y1="268" x2="825" y2="235" stroke="#0F172A" strokeWidth="2.2" markerEnd="url(#arr-main)" />

                {/* Conv 1x1 Reduction Box */}
                <rect
                  x="750"
                  y="185"
                  width="150"
                  height="50"
                  rx="8"
                  fill="#DBEAFE"
                  stroke="#2563EB"
                  strokeWidth="2"
                  filter="url(#box-shadow)"
                />
                <text x="825" y="204" textAnchor="middle" fontSize="12" fontWeight="800" fill="#0F172A">
                  Convolution
                </text>
                <text x="825" y="218" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1E40AF">
                  1 × 1 + 1(S)
                </text>
                <text x="825" y="229" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="#334155">
                  (32 filtros)
                </text>
              </>
            ) : (
              /* Naive Mode: Directly Max Pool at top level */
              <>
                <line x1="825" y1="350" x2="825" y2="235" stroke="#0F172A" strokeWidth="2.2" markerEnd="url(#arr-main)" />
                <rect
                  x="750"
                  y="185"
                  width="150"
                  height="50"
                  rx="8"
                  fill="#FECDD3"
                  stroke="#E11D48"
                  strokeWidth="2"
                  filter="url(#box-shadow)"
                />
                <text x="825" y="204" textAnchor="middle" fontSize="12" fontWeight="800" fill="#0F172A">
                  Max pool
                </text>
                <text x="825" y="218" textAnchor="middle" fontSize="11" fontWeight="700" fill="#9F1239">
                  3 × 3 + 1(S)
                </text>
                <text x="825" y="229" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="#475569">
                  (C_in canais)
                </text>
              </>
            )}

            {/* Connecting Arrow to Top Bus */}
            <line x1="825" y1="185" x2="825" y2="130" stroke="#0F172A" strokeWidth="2.2" />
          </g>

          {/* ======================================================== */}
          {/* TOP CONVERGENCE & DEPTH CONCAT                           */}
          {/* ======================================================== */}
          {/* Top Horizontal Collection Bus */}
          <line x1="135" y1="130" x2="825" y2="130" stroke="#0F172A" strokeWidth="2.2" />

          {/* Vertical Arrow to Depth Concat */}
          <line x1="480" y1="130" x2="480" y2="105" stroke="#0F172A" strokeWidth="2.5" markerEnd="url(#arr-main)" />

          {/* Depth Concat Main Box */}
          <g>
            <rect
              x="360"
              y="58"
              width="240"
              height="47"
              rx="10"
              fill="#15803D"
              stroke="#14532D"
              strokeWidth="2.2"
              filter="url(#box-shadow)"
            />
            <text x="480" y="78" textAnchor="middle" fontSize="13" fontWeight="900" fill="#FFFFFF" letterSpacing="0.5px">
              DEPTH CONCAT
            </text>
            <text x="480" y="93" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#DCFCE7">
              Concatenação ao Longo dos Canais
            </text>
          </g>

          {/* Output Arrow & Label at Top */}
          <line x1="480" y1="58" x2="480" y2="16" stroke="#0F172A" strokeWidth="2.5" markerEnd="url(#arr-main)" />
          <g>
            <rect x="290" y="2" width="380" height="24" rx="6" fill="#F0FDF4" stroke="#86EFAC" strokeWidth="1.2" />
            <text x="480" y="17" textAnchor="middle" fontSize="11" fontWeight="800" fill="#166534">
              Saída: H × W × (64 + 128 + 32 + 32) = H × W × 256 Canais
            </text>
          </g>
        </svg>
      </div>

      {/* Bottom Visual Legend & Technical Guarantee */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: '6px',
        borderTop: '1px solid #F1F5F9',
        fontSize: '11.5px'
      }}>
        {/* Color Legend */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontWeight: 600, color: 'var(--text-main)' }}>
            <span style={{ width: '12px', height: '12px', background: '#93C5FD', borderRadius: '3px', border: '1.5px solid #1D4ED8' }} />
            Convolução Padrão
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontWeight: 600, color: 'var(--text-main)' }}>
            <span style={{ width: '12px', height: '12px', background: '#DBEAFE', borderRadius: '3px', border: '1.5px solid #2563EB' }} />
            Bottleneck 1×1 (Compressão)
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontWeight: 600, color: 'var(--text-main)' }}>
            <span style={{ width: '12px', height: '12px', background: '#FECDD3', borderRadius: '3px', border: '1.5px solid #E11D48' }} />
            Max Pooling 3×3
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontWeight: 600, color: 'var(--text-main)' }}>
            <span style={{ width: '12px', height: '12px', background: '#15803D', borderRadius: '3px', border: '1.5px solid #14532D' }} />
            Depth Concat
          </span>
        </div>

        {/* Spatial Rule Note */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: '#EFF8FC',
          border: '1px solid #BAE6FD',
          padding: '4px 10px',
          borderRadius: '6px',
          color: 'var(--infnet-dark-blue)',
          fontWeight: 700
        }}>
          <span>✦ + 1(S) = Stride 1 com Same Padding</span>
          <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>
            (garante saída com exatamente a mesma resolução espacial H × W em todos os ramos)
          </span>
        </div>
      </div>
    </div>
  );
}
