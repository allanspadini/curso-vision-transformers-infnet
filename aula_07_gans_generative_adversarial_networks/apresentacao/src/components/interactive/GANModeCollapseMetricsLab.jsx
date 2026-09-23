import React, { useState, useMemo } from 'react';
import { Sliders, RefreshCw, AlertTriangle, CheckCircle2, PieChart } from 'lucide-react';
import MathView from '../MathView';

export default function GANModeCollapseMetricsLab() {
  const [collapseLevel, setCollapseLevel] = useState(0); // 0% a 100% (0 = 8 modos, 100 = 1 modo)
  const [sampleNoise, setSampleNoise] = useState(0.15); // Ruído visual (0.05 a 0.5)

  // 8 modos reais distribuídos em círculo de raio R=70
  const realModes = useMemo(() => {
    return [0, 45, 90, 135, 180, 225, 270, 315].map((deg, idx) => {
      const rad = (deg * Math.PI) / 180;
      return {
        id: idx + 1,
        deg,
        x: Math.round(150 + Math.cos(rad) * 70),
        y: Math.round(120 + Math.sin(rad) * 70),
        label: `Modo ${idx + 1}`
      };
    });
  }, []);

  // Simulação de amostras geradas baseadas no colapso
  // collapseLevel 0 -> cobre 8 modos
  // collapseLevel 50 -> cobre 4 modos
  // collapseLevel 75 -> cobre 2 modos
  // collapseLevel 100 -> cobre 1 modo
  const activeModesCount = useMemo(() => {
    if (collapseLevel < 25) return 8;
    if (collapseLevel < 50) return 6;
    if (collapseLevel < 75) return 4;
    if (collapseLevel < 90) return 2;
    return 1;
  }, [collapseLevel]);

  const generatedSamples = useMemo(() => {
    const samples = [];
    const totalSamples = 80;
    const samplesPerActiveMode = Math.floor(totalSamples / activeModesCount);

    for (let m = 0; m < activeModesCount; m++) {
      const mode = realModes[m];
      for (let s = 0; s < samplesPerActiveMode; s++) {
        // Ruído gaussiano ao redor do centro do modo
        const u1 = Math.random();
        const u2 = Math.random();
        const r = sampleNoise * 80 * Math.sqrt(-2 * Math.log(Math.max(1e-5, u1)));
        const theta = 2 * Math.PI * u2;
        const sx = mode.x + r * Math.cos(theta);
        const sy = mode.y + r * Math.sin(theta);
        samples.push({ x: sx, y: sy });
      }
    }
    return samples;
  }, [activeModesCount, realModes, sampleNoise]);

  // Cálculo das métricas diagnósticas
  const metrics = useMemo(() => {
    // Precision: fração de amostras que estão perto de pelo menos um modo real (< 25px)
    let inManifoldCount = 0;
    generatedSamples.forEach(s => {
      const distToClosest = Math.min(...realModes.map(m => Math.hypot(m.x - s.x, m.y - s.y)));
      if (distToClosest < 30) inManifoldCount++;
    });
    const precision = generatedSamples.length > 0 ? (inManifoldCount / generatedSamples.length) * 100 : 0;

    // Recall: fração dos modos reais que contêm pelo menos 2 amostras geradas por perto
    let coveredModes = 0;
    realModes.forEach(m => {
      const nearbySamples = generatedSamples.filter(s => Math.hypot(m.x - s.x, m.y - s.y) < 30).length;
      if (nearbySamples >= 2) coveredModes++;
    });
    const recall = (coveredModes / realModes.length) * 100;

    // FID Simulado: aumenta se ruído for alto OU se modos forem perdidos
    const missingModesPenalty = (8 - activeModesCount) * 14.5;
    const noisePenalty = sampleNoise * 90;
    const fid = Math.max(8.5, 8.5 + missingModesPenalty + noisePenalty);

    // Inception Score Simulado:
    // IS depende da nitidez (1 / sampleNoise) e diversidade marginal (activeModesCount)
    const isScore = Math.max(1.2, (activeModesCount / 8) * (8.5 - sampleNoise * 8) + 1.1);

    // Entropia de Shannon dos modos ativos (em nats)
    const entropy = Math.log(activeModesCount);
    const maxEntropy = Math.log(8);
    const entropyRatio = (entropy / maxEntropy) * 100;

    return {
      precision: parseFloat(precision.toFixed(1)),
      recall: parseFloat(recall.toFixed(1)),
      fid: parseFloat(fid.toFixed(1)),
      isScore: parseFloat(isScore.toFixed(2)),
      entropyRatio: parseFloat(entropyRatio.toFixed(1))
    };
  }, [generatedSamples, realModes, activeModesCount, sampleNoise]);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {/* Controles do Laboratório */}
      <div style={{
        background: '#EDF5FA',
        border: '1px solid #D0E3F0',
        borderRadius: '8px',
        padding: '10px 18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <PieChart size={18} color="var(--infnet-dark-blue)" />
          <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
            Simulador Diagnóstico de Mode Collapse:
          </span>
        </div>

        {/* Slider 1: Nível de Colapso de Modos */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '11px', fontWeight: 600, color: '#334155' }}>
            Nível de Colapso de Modos:
          </span>
          <input
            type="range"
            min="0"
            max="100"
            step="5"
            value={collapseLevel}
            onChange={(e) => setCollapseLevel(parseInt(e.target.value))}
            style={{ width: '120px', cursor: 'pointer' }}
          />
          <span style={{
            fontSize: '11px',
            fontWeight: 800,
            fontFamily: 'var(--font-code)',
            color: collapseLevel > 50 ? '#DC2626' : '#15803D',
            width: '40px'
          }}>
            {collapseLevel}%
          </span>
        </div>

        {/* Slider 2: Ruído Visual / Fidelidade */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '11px', fontWeight: 600, color: '#334155' }}>
            Ruído Visual (Artefatos):
          </span>
          <input
            type="range"
            min="0.05"
            max="0.45"
            step="0.05"
            value={sampleNoise}
            onChange={(e) => setSampleNoise(parseFloat(e.target.value))}
            style={{ width: '90px', cursor: 'pointer' }}
          />
          <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--infnet-purple)', fontFamily: 'var(--font-code)', width: '32px' }}>
            {(sampleNoise * 100).toFixed(0)}%
          </span>
        </div>

        {/* Botões Pré-definidos */}
        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            onClick={() => { setCollapseLevel(0); setSampleNoise(0.12); }}
            style={{
              padding: '4px 10px',
              fontSize: '10px',
              fontWeight: 700,
              background: collapseLevel === 0 ? 'var(--infnet-green-accent)' : '#FFFFFF',
              color: collapseLevel === 0 ? '#FFFFFF' : '#334155',
              border: '1px solid #CBD5E1',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Modos Completos (8/8)
          </button>
          <button
            onClick={() => { setCollapseLevel(95); setSampleNoise(0.08); }}
            style={{
              padding: '4px 10px',
              fontSize: '10px',
              fontWeight: 700,
              background: collapseLevel >= 90 ? '#DC2626' : '#FFFFFF',
              color: collapseLevel >= 90 ? '#FFFFFF' : '#334155',
              border: '1px solid #CBD5E1',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Colapso Total (1/8)
          </button>
        </div>
      </div>

      {/* Grid Principal: Gráfico 2D de Espaço de Features e Painel Métrico */}
      <div style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '1.2fr 1fr',
        gap: '12px',
        minHeight: 0
      }}>
        {/* Painel Esquerdo: Distribuição 2D dos Modos */}
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
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#0A345D' }}>
              ESPAÇO LATENTE / FEATURES 2D: REAL vs SINTÉTICO
            </span>
            <div style={{ display: 'flex', gap: '10px', fontSize: '9px' }}>
              <span style={{ color: '#16A34A', fontWeight: 700 }}>● Modos Reais (8)</span>
              <span style={{ color: '#9333EA', fontWeight: 700 }}>✦ Amostras G(z) ({generatedSamples.length})</span>
            </div>
          </div>

          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg viewBox="0 0 300 240" style={{ width: '100%', height: '100%' }}>
              {/* Moldura */}
              <rect x="10" y="10" width="280" height="220" rx="8" fill="#F8FAFC" stroke="#E2E8F0" />

              {/* Círculo guia pontilhado */}
              <circle cx="150" cy="120" r="70" fill="none" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="3 3" />

              {/* 8 Modos Reais com suas regiões de suporte (círculos verdes) */}
              {realModes.map((m, idx) => {
                const isCovered = idx < activeModesCount;
                return (
                  <g key={m.id}>
                    <circle
                      cx={m.x}
                      cy={m.y}
                      r="22"
                      fill={isCovered ? 'rgba(16, 185, 129, 0.18)' : 'rgba(239, 68, 68, 0.08)'}
                      stroke={isCovered ? '#10B981' : '#FCA5A5'}
                      strokeWidth="1.5"
                      strokeDasharray={isCovered ? 'none' : '2 2'}
                    />
                    <circle cx={m.x} cy={m.y} r="4" fill={isCovered ? '#15803D' : '#9CA3AF'} />
                    <text x={m.x} y={m.y - 8} fill={isCovered ? '#166534' : '#6B7280'} fontSize="7" fontWeight="700" textAnchor="middle">
                      {m.label}
                    </text>
                  </g>
                );
              })}

              {/* Amostras Geradas (Pontos Roxos) */}
              {generatedSamples.map((s, idx) => (
                <circle
                  key={idx}
                  cx={s.x}
                  cy={s.y}
                  r="2.5"
                  fill="#9333EA"
                  opacity="0.75"
                />
              ))}

              {/* Alerta Visual se Colapsado */}
              {activeModesCount === 1 && (
                <g transform="translate(100, 205)">
                  <rect x="0" y="0" width="100" height="18" rx="4" fill="#FEF2F2" stroke="#EF4444" />
                  <text x="50" y="12" fill="#DC2626" fontSize="7.5" fontWeight="800" textAnchor="middle">
                    🚨 COLAPSO EM 1 MODO
                  </text>
                </g>
              )}
            </svg>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            background: '#F8FAFC',
            padding: '5px 10px',
            borderRadius: '6px',
            fontSize: '9.5px',
            border: '1px solid #E2E8F0'
          }}>
            <span>Modos Reais Cobertos: <strong>{activeModesCount} / 8</strong></span>
            <span>Entropia de Diversidade: <strong>{metrics.entropyRatio}%</strong></span>
          </div>
        </div>

        {/* Painel Direito: Telemetria das Métricas (FID, Precision, Recall) */}
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
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#0A345D', marginBottom: '8px' }}>
              RESPOSTA QUANTITATIVA DAS MÉTRICAS
            </div>

            {/* Grid com 4 Indicadores Numéricos */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '10px' }}>
              {/* Precision */}
              <div style={{ background: '#F0F9FF', border: '1px solid #BAE6FD', borderRadius: '8px', padding: '8px' }}>
                <div style={{ fontSize: '8.5px', fontWeight: 700, color: '#0369A1' }}>PRECISION (FIDELIDADE)</div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#0284C7', fontFamily: 'var(--font-code)' }}>
                  {metrics.precision}%
                </div>
                <div style={{ fontSize: '7.5px', color: '#64748B' }}>
                  {metrics.precision > 85 ? '✓ Alta fidelidade visual' : 'Artefatos visíveis'}
                </div>
              </div>

              {/* Recall */}
              <div style={{
                background: metrics.recall < 40 ? '#FEF2F2' : '#F0FDF4',
                border: metrics.recall < 40 ? '1px solid #FCA5A5' : '1px solid #86EFAC',
                borderRadius: '8px',
                padding: '8px'
              }}>
                <div style={{ fontSize: '8.5px', fontWeight: 700, color: metrics.recall < 40 ? '#991B1B' : '#15803D' }}>
                  RECALL (COBERTURA)
                </div>
                <div style={{
                  fontSize: '16px',
                  fontWeight: 800,
                  color: metrics.recall < 40 ? '#DC2626' : '#16A34A',
                  fontFamily: 'var(--font-code)'
                }}>
                  {metrics.recall}%
                </div>
                <div style={{ fontSize: '7.5px', color: metrics.recall < 40 ? '#B91C1C' : '#166534' }}>
                  {metrics.recall < 40 ? '⚠️ MODE COLLAPSE!' : 'Excelente variedade'}
                </div>
              </div>

              {/* FID */}
              <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '8px' }}>
                <div style={{ fontSize: '8.5px', fontWeight: 700, color: '#334155' }}>FRÉCHET DISTANCE (FID)</div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: metrics.fid < 30 ? '#16A34A' : '#DC2626', fontFamily: 'var(--font-code)' }}>
                  {metrics.fid}
                </div>
                <div style={{ fontSize: '7.5px', color: '#64748B' }}>Menor é melhor (↓)</div>
              </div>

              {/* Inception Score */}
              <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '8px' }}>
                <div style={{ fontSize: '8.5px', fontWeight: 700, color: '#334155' }}>INCEPTION SCORE (IS)</div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#7C3AED', fontFamily: 'var(--font-code)' }}>
                  {metrics.isScore}
                </div>
                <div style={{ fontSize: '7.5px', color: '#64748B' }}>Maior é melhor (↑)</div>
              </div>
            </div>

            {/* Diagnóstico em Texto Destacado */}
            <div style={{
              background: metrics.recall < 30 ? '#FEF2F2' : (metrics.recall < 70 ? '#FFFBEB' : '#F0FDF4'),
              border: `1px solid ${metrics.recall < 30 ? '#EF4444' : (metrics.recall < 70 ? '#F59E0B' : '#86EFAC')}`,
              borderRadius: '6px',
              padding: '8px 10px',
              fontSize: '8.5px',
              color: metrics.recall < 30 ? '#991B1B' : (metrics.recall < 70 ? '#78350F' : '#166534')
            }}>
              <strong>DIAGNÓSTICO TÉCNICO: </strong>
              {metrics.recall < 30 ? (
                <span>O modelo sofreu <strong>Colapso Total de Modos</strong>! Note que a Precision pode permanecer alta ({metrics.precision}%), mas o Recall desabou para {metrics.recall}%. O traço da covariância de features está achatado.</span>
              ) : metrics.recall < 70 ? (
                <span><strong>Colapso Parcial de Modos</strong> em andamento. O gerador começou a negligenciar classes menos representadas.</span>
              ) : (
                <span>Distribuição <strong>Saudável e Equilibrada</strong>. Todos os modos reais são uniformemente explorados por <MathView math="G(z)" />.</span>
              )}
            </div>
          </div>

          <div style={{ background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '6px', padding: '6px 10px', fontSize: '8px', color: '#475569' }}>
            💡 <em>Dica de Prova / Entrevista:</em> Se perguntarem como detectar Mode Collapse mesmo quando as imagens individuais parecem perfeitas no olho nu: <strong>A resposta é a queda abrupta no Recall com Precision alta!</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
