import React, { useState } from 'react';
import MathView from '../MathView';

export default function FIDSimulatorLab() {
  // State variables for parametric 2D simulation representing high-dim manifold
  const [meanShift, setMeanShift] = useState(0.2); // 0.0 to 3.0
  const [varScale, setVarScale] = useState(1.0);   // 0.1 (collapse) to 2.5 (noisy)
  const [angleDeg, setAngleDeg] = useState(0);     // 0 to 90 degrees

  // Fixed real distribution parameters (normalized)
  const mu_r = [0, 0];
  const s_r1 = 1.2;
  const s_r2 = 0.8;

  // Generated distribution parameters
  const mu_g = [meanShift * 1.5, meanShift * 0.8];
  const s_g1 = s_r1 * varScale;
  const s_g2 = s_r2 * varScale;

  // Analytical computation of 2D FID surrogate scaled to realistic FID range (0 - 150)
  const meanTerm = (mu_g[0] - mu_r[0]) ** 2 + (mu_g[1] - mu_r[1]) ** 2;
  const scaledMeanTerm = Number((meanTerm * 18.5).toFixed(2));

  // Covariance trace surrogate term
  const rad = (angleDeg * Math.PI) / 180;
  // rotation misalignment penalty
  const rotPenalty = Math.sin(rad) ** 2 * 0.4;
  const covTerm1 = (s_r1 - s_g1) ** 2 + (s_r2 - s_g2) ** 2 + rotPenalty * (s_r1 * s_g2);
  const scaledCovTerm = Number((covTerm1 * 22.0).toFixed(2));

  const totalFID = Number((scaledMeanTerm + scaledCovTerm).toFixed(2));

  // Preset handlers
  const handlePreset = (type) => {
    switch (type) {
      case 'ideal':
        setMeanShift(0.15);
        setVarScale(0.98);
        setAngleDeg(0);
        break;
      case 'collapse':
        setMeanShift(0.2);
        setVarScale(0.15);
        setAngleDeg(10);
        break;
      case 'domain_shift':
        setMeanShift(2.4);
        setVarScale(1.05);
        setAngleDeg(15);
        break;
      case 'noisy':
        setMeanShift(0.6);
        setVarScale(2.3);
        setAngleDeg(50);
        break;
      default:
        break;
    }
  };

  // Diagnostic interpretation
  let diagnostic = {
    title: 'Excelente Equilíbrio (Fidelidade & Diversidade)',
    desc: 'O gerador aprendeu a média das características e preserva toda a dispersão estatística do dataset real.',
    badgeClass: 'badge-green',
    color: '#166534'
  };

  if (varScale < 0.35) {
    diagnostic = {
      title: 'Mode Collapse Detectado (Falta de Variedade)',
      desc: 'A variância gerada é drasticamente menor que a real. O modelo repete amostras idênticas ou poucas variações.',
      badgeClass: 'badge-red',
      color: '#B91C1C'
    };
  } else if (meanShift > 1.8) {
    diagnostic = {
      title: 'Deslocamento Severo de Média (Falta de Realismo)',
      desc: 'O centroide das imagens geradas está distante do real. As texturas, cores ou formas básicas diferem do domínio.',
      badgeClass: 'badge-orange',
      color: '#C2410C'
    };
  } else if (varScale > 1.8) {
    diagnostic = {
      title: 'Hiper-Dispersão com Ruído Artefatual',
      desc: 'O gerador sintetiza imagens excessivamente ruidosas, estouradas ou fora da distribuição plausível dos dados.',
      badgeClass: 'badge-purple',
      color: '#7E22CE'
    };
  }

  // SVG coordinate transform
  const cx0 = 220;
  const cy0 = 150;
  const scalePlot = 38;

  // Real ellipse coordinates
  const rx_r = s_r1 * scalePlot;
  const ry_r = s_r2 * scalePlot;

  // Gen ellipse coordinates
  const cx_g = cx0 + mu_g[0] * scalePlot;
  const cy_g = cy0 - mu_g[1] * scalePlot;
  const rx_g = Math.max(8, s_g1 * scalePlot);
  const ry_g = Math.max(6, s_g2 * scalePlot);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {/* Top Banner */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#EDF5FA',
        border: '1px solid #D0E3F0',
        borderRadius: '8px',
        padding: '8px 16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{
            background: 'var(--infnet-dark-blue)',
            color: '#FFFFFF',
            fontSize: '11px',
            fontWeight: 700,
            padding: '3px 10px',
            borderRadius: '4px',
            fontFamily: 'var(--font-code)'
          }}>
            LAB INTERATIVO
          </span>
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--infnet-dark-blue)' }}>
            Simulador Paramétrico da Distância de Fréchet (FID)
          </span>
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            onClick={() => handlePreset('ideal')}
            className="btn-control"
            style={{ fontSize: '10.5px', padding: '4px 10px', background: '#F0FDF4', color: '#166534', border: '1px solid #86EFAC' }}
          >
            ✓ Ideal
          </button>
          <button
            onClick={() => handlePreset('collapse')}
            className="btn-control"
            style={{ fontSize: '10.5px', padding: '4px 10px', background: '#FEF2F2', color: '#991B1B', border: '1px solid #FCA5A5' }}
          >
            ⚠️ Mode Collapse
          </button>
          <button
            onClick={() => handlePreset('domain_shift')}
            className="btn-control"
            style={{ fontSize: '10.5px', padding: '4px 10px', background: '#FFF7ED', color: '#9A3412', border: '1px solid #FDBA74' }}
          >
            ⚡ Deslocamento Média
          </button>
          <button
            onClick={() => handlePreset('noisy')}
            className="btn-control"
            style={{ fontSize: '10.5px', padding: '4px 10px', background: '#FAF5FF', color: '#6B21A8', border: '1px solid #D8B4FE' }}
          >
            🌀 Ruído/Dispersão
          </button>
        </div>
      </div>

      {/* Main Grid: Controls + Visualizer + Metrics */}
      <div style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '320px 1fr 300px',
        gap: '12px',
        minHeight: 0
      }}>
        {/* Left Column: Sliders */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid var(--border-light)',
          borderRadius: '12px',
          padding: '14px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div>
            <span style={{ fontSize: '12px', fontWeight: 800, color: '#0A345D' }}>
              Parâmetros da Distribuição G(z)
            </span>
            <p style={{ fontSize: '10px', color: '#64748B', margin: '2px 0 12px' }}>
              Ajuste as características estatísticas das features geradas:
            </p>

            {/* Slider 1: Mean Shift */}
            <div style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}>
                <span style={{ fontWeight: 600, color: '#1E293B' }}>1. Deslocamento de Média (Δμ):</span>
                <span style={{ fontFamily: 'var(--font-code)', fontWeight: 700, color: '#0284C7' }}>
                  {meanShift.toFixed(2)}
                </span>
              </div>
              <input
                type="range"
                min="0.0"
                max="3.0"
                step="0.05"
                value={meanShift}
                onChange={(e) => setMeanShift(parseFloat(e.target.value))}
                style={{ width: '100%', accentColor: '#0284C7' }}
              />
              <span style={{ fontSize: '9px', color: '#64748B' }}>0 = centroides idênticos; 3 = forte viés semântico</span>
            </div>

            {/* Slider 2: Variance Scale */}
            <div style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}>
                <span style={{ fontWeight: 600, color: '#1E293B' }}>2. Escala de Variância (σ_g / σ_r):</span>
                <span style={{ fontFamily: 'var(--font-code)', fontWeight: 700, color: '#7C3AED' }}>
                  {varScale.toFixed(2)}x
                </span>
              </div>
              <input
                type="range"
                min="0.1"
                max="2.5"
                step="0.05"
                value={varScale}
                onChange={(e) => setVarScale(parseFloat(e.target.value))}
                style={{ width: '100%', accentColor: '#7C3AED' }}
              />
              <span style={{ fontSize: '9px', color: '#64748B' }}>&lt; 0.3 = colapso de modo; 1.0 = dispersão ideal; &gt; 1.8 = ruído</span>
            </div>

            {/* Slider 3: Covariance Rotation */}
            <div style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}>
                <span style={{ fontWeight: 600, color: '#1E293B' }}>3. Rotação de Covariância (θ):</span>
                <span style={{ fontFamily: 'var(--font-code)', fontWeight: 700, color: '#059669' }}>
                  {angleDeg}°
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="90"
                step="5"
                value={angleDeg}
                onChange={(e) => setAngleDeg(parseInt(e.target.value))}
                style={{ width: '100%', accentColor: '#059669' }}
              />
              <span style={{ fontSize: '9px', color: '#64748B' }}>Desalinhamento da correlação cruzada entre canais</span>
            </div>
          </div>

          <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '8px 10px', fontSize: '10px', color: '#475569' }}>
            💡 O FID agrega tanto o deslocamento de média quanto as falhas de covariância em uma única métrica escalar.
          </div>
        </div>

        {/* Center Column: 2D Manifold Visualizer */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid var(--border-light)',
          borderRadius: '12px',
          padding: '12px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontSize: '12px', fontWeight: 800, color: '#0A345D' }}>
              Projeção do Espaço de Features (Gaussiana 2D)
            </span>
            <div style={{ display: 'flex', gap: '10px', fontSize: '10px' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#166534', fontWeight: 700 }}>
                <span style={{ width: '10px', height: '10px', background: '#86EFAC', borderRadius: '50%', border: '1px solid #166534' }}></span> Real N(μ_r, Σ_r)
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#1E40AF', fontWeight: 700 }}>
                <span style={{ width: '10px', height: '10px', background: '#93C5FD', borderRadius: '50%', border: '1px solid #1E40AF' }}></span> Sintético N(μ_g, Σ_g)
              </span>
            </div>
          </div>

          <div style={{ flex: 1, position: 'relative', background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0', overflow: 'hidden' }}>
            <svg viewBox="0 0 440 280" style={{ width: '100%', height: '100%' }}>
              {/* Grid Lines */}
              <line x1="40" y1="150" x2="420" y2="150" stroke="#E2E8F0" strokeWidth="1.5" strokeDasharray="3 3" />
              <line x1="220" y1="20" x2="220" y2="260" stroke="#E2E8F0" strokeWidth="1.5" strokeDasharray="3 3" />

              {/* Real Distribution (Green) */}
              <ellipse
                cx={cx0}
                cy={cy0}
                rx={rx_r * 1.8}
                ry={ry_r * 1.8}
                fill="rgba(134, 239, 172, 0.15)"
                stroke="#166534"
                strokeWidth="1.5"
                strokeDasharray="4 2"
              />
              <ellipse
                cx={cx0}
                cy={cy0}
                rx={rx_r}
                ry={ry_r}
                fill="rgba(134, 239, 172, 0.35)"
                stroke="#166534"
                strokeWidth="2"
              />
              <circle cx={cx0} cy={cy0} r="4" fill="#166534" />
              <text x={cx0 - 18} y={cy0 + 16} fontSize="10" fill="#166534" fontWeight="bold">μ_r (Real)</text>

              {/* Vector connecting centroids */}
              <line
                x1={cx0}
                y1={cy0}
                x2={cx_g}
                y2={cy_g}
                stroke="#FF7043"
                strokeWidth="2"
                strokeDasharray="3 3"
              />

              {/* Generated Distribution (Blue/Color) */}
              <g transform={`rotate(${angleDeg} ${cx_g} ${cy_g})`}>
                <ellipse
                  cx={cx_g}
                  cy={cy_g}
                  rx={rx_g * 1.8}
                  ry={ry_g * 1.8}
                  fill="rgba(147, 197, 253, 0.15)"
                  stroke="#1E40AF"
                  strokeWidth="1.5"
                  strokeDasharray="4 2"
                />
                <ellipse
                  cx={cx_g}
                  cy={cy_g}
                  rx={rx_g}
                  ry={ry_g}
                  fill="rgba(147, 197, 253, 0.4)"
                  stroke="#1E40AF"
                  strokeWidth="2"
                />
              </g>
              <circle cx={cx_g} cy={cy_g} r="4" fill="#1E40AF" />
              <text x={cx_g + 8} y={cy_g - 6} fontSize="10" fill="#1E40AF" fontWeight="bold">μ_g (Gerado)</text>
            </svg>
          </div>
        </div>

        {/* Right Column: Dynamic FID Calculations & Diagnosis */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid var(--border-light)',
          borderRadius: '12px',
          padding: '14px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div>
            <span style={{ fontSize: '12px', fontWeight: 800, color: '#0A345D' }}>
              Decomposição Numérica
            </span>

            {/* Score Big Display */}
            <div style={{
              background: 'linear-gradient(135deg, #0A345D 0%, #061F38 100%)',
              color: '#FFFFFF',
              borderRadius: '10px',
              padding: '12px',
              textAlign: 'center',
              margin: '10px 0'
            }}>
              <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#64D9EF' }}>
                Fréchet Inception Distance
              </span>
              <div style={{ fontSize: '32px', fontWeight: 800, fontFamily: 'var(--font-code)', color: '#FFFFFF' }}>
                {totalFID}
              </div>
              <span style={{ fontSize: '9.5px', color: '#94A3B8' }}>Escala normalizada (Menor é melhor)</span>
            </div>

            {/* Two components breakdown */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ background: '#F0F9FF', border: '1px solid #BAE6FD', borderRadius: '6px', padding: '6px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '10px', color: '#0369A1', fontWeight: 600 }}>||μ_r - μ_g||²:</span>
                <span style={{ fontFamily: 'var(--font-code)', fontSize: '12px', fontWeight: 700, color: '#0369A1' }}>
                  {scaledMeanTerm}
                </span>
              </div>

              <div style={{ background: '#FAF5FF', border: '1px solid #E9D5FF', borderRadius: '6px', padding: '6px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '10px', color: '#6B21A8', fontWeight: 600 }}>Tr(Σ_r + Σ_g - 2√):</span>
                <span style={{ fontFamily: 'var(--font-code)', fontSize: '12px', fontWeight: 700, color: '#6B21A8' }}>
                  {scaledCovTerm}
                </span>
              </div>
            </div>

            {/* Diagnostic Card */}
            <div style={{
              marginTop: '12px',
              background: '#F8FAFC',
              border: `1px solid ${diagnostic.color}40`,
              borderRadius: '8px',
              padding: '10px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                <strong style={{ fontSize: '11px', color: diagnostic.color }}>{diagnostic.title}</strong>
              </div>
              <p style={{ fontSize: '9.5px', color: '#334155', margin: 0, lineHeight: '1.4' }}>
                {diagnostic.desc}
              </p>
            </div>
          </div>

          <div style={{ fontSize: '9px', color: '#64748B', textAlign: 'center' }}>
            Baseado na formulação matemática de Heusel et al. (NeurIPS 2017)
          </div>
        </div>
      </div>
    </div>
  );
}
