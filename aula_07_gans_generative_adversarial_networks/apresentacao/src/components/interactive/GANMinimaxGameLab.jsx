import React, { useState, useMemo } from 'react';
import { Sliders, RefreshCw, AlertTriangle, CheckCircle2, Zap } from 'lucide-react';
import MathView from '../MathView';

export default function GANMinimaxGameLab() {
  // Estado dos controles
  const [meanOffset, setMeanOffset] = useState(2.5); // Distância entre distribuições (0.0 = idênticas, 4.0 = muito distantes)
  const [discStrength, setDiscStrength] = useState(0.8); // 0.2 a 1.0 (capacidade de D)
  const [showFormula, setShowFormula] = useState('both'); // 'saturating', 'non-saturating', 'both'

  // Amostragem de curvas gaussianas 1D
  const samples = useMemo(() => {
    const points = [];
    const minX = -4;
    const maxX = 7;
    const step = 0.15;

    // Gaussiana real: N(0, 1)
    // Gaussiana fake: N(meanOffset, 1)
    for (let x = minX; x <= maxX; x += step) {
      const pReal = (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * x * x);
      const pFake = (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * Math.pow(x - meanOffset, 2));

      // D*(x) teórico = pReal / (pReal + pFake + eps)
      const dOpt = pReal / (pReal + pFake + 1e-6);

      // D real considerando a capacidade/força
      // Com força 1.0, D aproxima D*. Com força baixa, D fica mais suave em direção a 0.5
      const dActual = 0.5 + (dOpt - 0.5) * discStrength;

      points.push({
        x: parseFloat(x.toFixed(2)),
        pReal,
        pFake,
        dOpt,
        dActual: Math.max(0.01, Math.min(0.99, dActual))
      });
    }
    return points;
  }, [meanOffset, discStrength]);

  // Cálculo das métricas teóricas
  const metrics = useMemo(() => {
    // Score médio de D em amostras geradas (em torno de x = meanOffset)
    const pRealAtFake = (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * meanOffset * meanOffset);
    const pFakeAtFake = 1 / Math.sqrt(2 * Math.PI);
    const dOptAtFakeMean = pRealAtFake / (pRealAtFake + pFakeAtFake + 1e-6);
    const dActualAtFake = Math.max(0.01, Math.min(0.99, 0.5 + (dOptAtFakeMean - 0.5) * discStrength));

    // JSD aproximada: quando meanOffset = 0 -> 0.0; quando meanOffset >= 3 -> log(2) ≈ 0.693
    // Fórmula analítica para duas normais N(0, 1) e N(mu, 1): JSD é monotonicamente crescente
    const jsd = Math.min(Math.log(2), (Math.log(2) * (1 - Math.exp(-0.4 * meanOffset * meanOffset))));

    // Valor minimax V(D*, G) = -log(4) + 2 * JSD
    const vMinimax = -Math.log(4) + 2 * jsd;

    // Perda Saturante: log(1 - D)
    const lossSaturating = Math.log(Math.max(1e-4, 1 - dActualAtFake));
    // Perda Não-Saturante: -log(D)
    const lossNonSaturating = -Math.log(Math.max(1e-4, dActualAtFake));

    // Gradientes dL/dD:
    // Para log(1 - D): dL/dD = -1 / (1 - D). Multiplicado pela sigmoid D*(1-D) resulta em -D
    // Gradiente efetivo em z é proporcional a D. Quando D -> 0, gradiente -> 0! (Desvanecimento)
    const gradSaturatingMag = dActualAtFake; // proporcional a D
    // Para -log(D): dL/dD = -1/D. Multiplicado pela sigmoid D*(1-D) resulta em -(1 - D)
    // Gradiente efetivo em z é proporcional a (1 - D). Quando D -> 0, gradiente -> 1! (Forte sinal)
    const gradNonSatMag = 1 - dActualAtFake;

    return {
      dScoreFake: dActualAtFake,
      jsd,
      vMinimax,
      lossSaturating,
      lossNonSaturating,
      gradSaturatingMag,
      gradNonSatMag
    };
  }, [meanOffset, discStrength]);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {/* Barra de Controles e Sliders */}
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
          <Sliders size={18} color="var(--infnet-dark-blue)" />
          <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
            Controles da Simulação Minimax:
          </span>
        </div>

        {/* Slider 1: Distância entre distribuições */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '11.5px', fontWeight: 600, color: '#334155' }}>
            Separação p_data vs p_g (μ):
          </span>
          <input
            type="range"
            min="0"
            max="4"
            step="0.1"
            value={meanOffset}
            onChange={(e) => setMeanOffset(parseFloat(e.target.value))}
            style={{ width: '110px', cursor: 'pointer' }}
          />
          <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--infnet-purple)', fontFamily: 'var(--font-code)', width: '32px' }}>
            {meanOffset.toFixed(1)}σ
          </span>
        </div>

        {/* Slider 2: Capacidade do Discriminador */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '11.5px', fontWeight: 600, color: '#334155' }}>
            Capacidade de D:
          </span>
          <input
            type="range"
            min="0.2"
            max="1.0"
            step="0.05"
            value={discStrength}
            onChange={(e) => setDiscStrength(parseFloat(e.target.value))}
            style={{ width: '90px', cursor: 'pointer' }}
          />
          <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--infnet-cyan)', fontFamily: 'var(--font-code)', width: '36px' }}>
            {Math.round(discStrength * 100)}%
          </span>
        </div>

        {/* Botões Rápidos */}
        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            onClick={() => { setMeanOffset(0.0); setDiscStrength(0.8); }}
            style={{
              padding: '4px 10px',
              fontSize: '10px',
              fontWeight: 700,
              background: meanOffset === 0 ? 'var(--infnet-green-accent)' : '#FFFFFF',
              color: meanOffset === 0 ? '#FFFFFF' : '#334155',
              border: '1px solid #CBD5E1',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Equilíbrio (Nash)
          </button>
          <button
            onClick={() => { setMeanOffset(3.5); setDiscStrength(0.95); }}
            style={{
              padding: '4px 10px',
              fontSize: '10px',
              fontWeight: 700,
              background: meanOffset >= 3 ? 'var(--infnet-orange)' : '#FFFFFF',
              color: meanOffset >= 3 ? '#FFFFFF' : '#334155',
              border: '1px solid #CBD5E1',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Início do Treino
          </button>
        </div>
      </div>

      {/* Grid Principal dos Gráficos Interativos */}
      <div style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '1.2fr 1fr',
        gap: '12px',
        minHeight: 0
      }}>
        {/* Painel Esquerdo: Distribuições 1D e Curva do Discriminador D*(x) */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid var(--border-light)',
          borderRadius: '12px',
          padding: '12px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#0A345D' }}>
              DISTRIBUIÇÕES p_data(x), p_g(x) E SUPERFÍCIE D*(x)
            </span>
            <div style={{ display: 'flex', gap: '10px', fontSize: '9px' }}>
              <span style={{ color: '#16A34A', fontWeight: 700 }}>■ p_data (Real)</span>
              <span style={{ color: '#9333EA', fontWeight: 700 }}>■ p_g (Gerado)</span>
              <span style={{ color: '#0284C7', fontWeight: 700 }}>― D(x)</span>
            </div>
          </div>

          {/* Gráfico SVG das Distribuições */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg viewBox="0 0 520 220" style={{ width: '100%', height: '100%' }}>
              {/* Eixos */}
              <line x1="30" y1="180" x2="490" y2="180" stroke="#CBD5E1" strokeWidth="1.5" />
              <line x1="30" y1="180" x2="30" y2="20" stroke="#CBD5E1" strokeWidth="1.5" />

              {/* Escala Y direita para D(x) [0.0 a 1.0] */}
              <line x1="490" y1="180" x2="490" y2="20" stroke="#BAE6FD" strokeWidth="1" strokeDasharray="2 2" />
              <text x="495" y="25" fill="#0284C7" fontSize="7.5">1.0</text>
              <text x="495" y="100" fill="#0284C7" fontSize="7.5">0.5</text>
              <text x="495" y="180" fill="#0284C7" fontSize="7.5">0.0</text>

              {/* Linha de Referência D = 0.5 */}
              <line x1="30" y1="100" x2="490" y2="100" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3 3" />

              {/* Traçado das Curvas */}
              {/* pReal (Verde) */}
              <path
                d={samples.reduce((acc, pt, i) => {
                  const px = 30 + ((pt.x + 4) / 11) * 460;
                  const py = 180 - pt.pReal * 360;
                  return `${acc} ${i === 0 ? 'M' : 'L'} ${px} ${py}`;
                }, '')}
                fill="none"
                stroke="#16A34A"
                strokeWidth="2.5"
              />

              {/* pFake (Roxo) */}
              <path
                d={samples.reduce((acc, pt, i) => {
                  const px = 30 + ((pt.x + 4) / 11) * 460;
                  const py = 180 - pt.pFake * 360;
                  return `${acc} ${i === 0 ? 'M' : 'L'} ${px} ${py}`;
                }, '')}
                fill="none"
                stroke="#9333EA"
                strokeWidth="2.5"
              />

              {/* D(x) (Azul) */}
              <path
                d={samples.reduce((acc, pt, i) => {
                  const px = 30 + ((pt.x + 4) / 11) * 460;
                  const py = 180 - pt.dActual * 160;
                  return `${acc} ${i === 0 ? 'M' : 'L'} ${px} ${py}`;
                }, '')}
                fill="none"
                stroke="#0284C7"
                strokeWidth="2"
                strokeDasharray="4 2"
              />

              {/* Ponto de Amostra Média Gerada */}
              {(() => {
                const samplePx = 30 + ((meanOffset + 4) / 11) * 460;
                const samplePy = 180 - metrics.dScoreFake * 160;
                return (
                  <g>
                    <line x1={samplePx} y1="20" x2={samplePx} y2="180" stroke="#9333EA" strokeWidth="1" strokeDasharray="2 2" />
                    <circle cx={samplePx} cy={samplePy} r="5" fill="#EF4444" stroke="#FFFFFF" strokeWidth="1.5" />
                    <rect x={samplePx - 45} y={samplePy - 24} width="90" height="18" rx="3" fill="#1E293B" opacity="0.85" />
                    <text x={samplePx} y={samplePy - 12} fill="#FFFFFF" fontSize="7.5" textAnchor="middle" fontWeight="700">
                      D(G(z)) = {metrics.dScoreFake.toFixed(2)}
                    </text>
                  </g>
                );
              })()}
            </svg>
          </div>

          {/* Rodapé do Painel Esquerdo */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            background: '#F8FAFC',
            padding: '6px 10px',
            borderRadius: '6px',
            fontSize: '9.5px',
            border: '1px solid #E2E8F0'
          }}>
            <span>Divergência JS: <strong style={{ color: 'var(--infnet-dark-blue)' }}>{metrics.jsd.toFixed(3)}</strong></span>
            <span>Valor V(D*, G): <strong style={{ color: 'var(--infnet-dark-blue)' }}>{metrics.vMinimax.toFixed(3)}</strong></span>
            <span>Equilíbrio Nash: <strong style={{ color: meanOffset === 0 ? '#16A34A' : '#EF4444' }}>{meanOffset === 0 ? 'ALCANÇADO (D=0.5)' : 'NÃO CONVERGIDO'}</strong></span>
          </div>
        </div>

        {/* Painel Direito: Resposta de Gradiente e Diagnóstico de Saturação */}
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
              DIAGNÓSTICO DO SINAL DE GRADIENTE DE G
            </div>
            <div style={{ fontSize: '10px', color: '#64748B', marginBottom: '12px' }}>
              Avaliando o gradiente efetivo quando o discriminador avalia amostras falsas em <strong style={{ color: '#0284C7' }}>D(G(z)) = {metrics.dScoreFake.toFixed(2)}</strong>:
            </div>

            {/* Comparativo de Barras de Força do Gradiente */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {/* Opção 1: Minimax Saturante log(1 - D) */}
              <div style={{
                background: '#FEF2F2',
                border: '1px solid #FCA5A5',
                borderRadius: '8px',
                padding: '10px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '10px', fontWeight: 700, color: '#991B1B' }}>
                    1. Perda Saturante: log(1 - D)
                  </span>
                  <span style={{ fontSize: '10px', fontWeight: 700, color: '#DC2626', fontFamily: 'var(--font-code)' }}>
                    Loss: {metrics.lossSaturating.toFixed(2)}
                  </span>
                </div>
                {/* Barra de Força do Gradiente */}
                <div style={{ margin: '6px 0 3px', height: '10px', background: '#FEE2E2', borderRadius: '5px', overflow: 'hidden' }}>
                  <div style={{
                    width: `${Math.max(2, metrics.gradSaturatingMag * 100)}%`,
                    height: '100%',
                    background: metrics.gradSaturatingMag < 0.2 ? '#DC2626' : '#F59E0B',
                    transition: 'width 0.2s ease'
                  }}></div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '8px', color: '#7F1D1D' }}>
                  <span>Magnitude do Gradiente de G: <strong>{(metrics.gradSaturatingMag * 100).toFixed(0)}%</strong></span>
                  <span>{metrics.gradSaturatingMag < 0.2 ? '⚠️ Gradiente Nulo (Travado!)' : 'Gradiente Fraco'}</span>
                </div>
              </div>

              {/* Opção 2: Heurística Não-Saturante -log(D) */}
              <div style={{
                background: '#EFF6FF',
                border: '1px solid #93C5FD',
                borderRadius: '8px',
                padding: '10px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '10px', fontWeight: 700, color: '#1E40AF' }}>
                    2. Perda Não-Saturante: -log D (Padrão)
                  </span>
                  <span style={{ fontSize: '10px', fontWeight: 700, color: '#2563EB', fontFamily: 'var(--font-code)' }}>
                    Loss: {metrics.lossNonSaturating.toFixed(2)}
                  </span>
                </div>
                {/* Barra de Força do Gradiente */}
                <div style={{ margin: '6px 0 3px', height: '10px', background: '#DBEAFE', borderRadius: '5px', overflow: 'hidden' }}>
                  <div style={{
                    width: `${Math.max(2, metrics.gradNonSatMag * 100)}%`,
                    height: '100%',
                    background: '#2563EB',
                    transition: 'width 0.2s ease'
                  }}></div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '8px', color: '#1E3A8A' }}>
                  <span>Magnitude do Gradiente de G: <strong>{(metrics.gradNonSatMag * 100).toFixed(0)}%</strong></span>
                  <span>{metrics.gradNonSatMag > 0.7 ? '⚡ Gradiente Vigoroso (Aprendendo)' : 'Gradiente Equilibrado'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Caixa de Conclusão Prática */}
          <div style={{
            background: '#F8FAFC',
            border: '1px solid #CBD5E1',
            borderRadius: '6px',
            padding: '8px',
            fontSize: '9px',
            color: '#334155'
          }}>
            <strong style={{ color: '#0A345D' }}>💡 Insight de Engenharia:</strong> No início do treinamento, o discriminador rejeita amostras com facilidade (<MathView math="D \approx 0" />). Sob a perda original <MathView math="\log(1 - D)" />, o gerador recebe quase zero de gradiente. A perda não-saturante <MathView math="-\log D" /> garante gradiente máximo de <MathView math="1 - D \approx 1.0" />, acelerando a convergência inicial!
          </div>
        </div>
      </div>
    </div>
  );
}
