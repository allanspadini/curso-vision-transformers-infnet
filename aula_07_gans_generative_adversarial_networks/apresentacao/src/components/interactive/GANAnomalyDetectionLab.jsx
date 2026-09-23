import React, { useState, useMemo } from 'react';
import { Microscope, Play, RotateCcw, AlertCircle, CheckCircle2, Sliders } from 'lucide-react';
import MathView from '../MathView';

export default function GANAnomalyDetectionLab() {
  const [caseType, setCaseType] = useState('brain_tumor'); // 'brain_tumor', 'lung_nodule', 'turbine_crack'
  const [iterations, setIterations] = useState(60); // 1 a 100 iterações de inversão latente
  const [threshold, setThreshold] = useState(0.35); // Limiar de decisão do alarme

  // Configuração dos casos
  const cases = {
    brain_tumor: {
      title: 'Ressonância Magnética Encefálica',
      target: 'Glioblastoma Multiforme (Lobo Temporal)',
      healthyDesc: 'Tecido cerebral, sulcos e ventrículos normais',
      lesionCoords: { cx: 160, cy: 110, r: 24 },
      nominalArea: 480
    },
    lung_nodule: {
      title: 'Tomografia Computadorizada de Tórax',
      target: 'Nódulo Pulmonar Espiculado (Lobo Superior)',
      healthyDesc: 'Parênquima pulmonar sem consolidações',
      lesionCoords: { cx: 175, cy: 135, r: 18 },
      nominalArea: 260
    },
    turbine_crack: {
      title: 'Inspeção Térmica de Turbina Aeronáutica',
      target: 'Fadiga Estrutural / Microfissura Metálica',
      healthyDesc: 'Liga de níquel-cromo uniforme sem descontinuidades',
      lesionCoords: { cx: 145, cy: 120, r: 20 },
      nominalArea: 310
    }
  };

  const currentCase = cases[caseType];

  // Simulação da convergência de z* ao longo das iterações
  const convergence = useMemo(() => {
    // A anatomia saudável converge rapidamente (exp(-iter/15))
    // A lesão residual estabiliza com alto resíduo porque G nunca a aprendeu
    const fitFactor = 1 - Math.exp(-iterations / 18);
    const residualLoss = 0.55 * (1 - fitFactor * 0.45);
    const lesionIntensity = Math.min(1.0, fitFactor * 1.1);

    // Score de Anomalia
    const anomalyScore = 0.68 * lesionIntensity + (1 - fitFactor) * 0.2;
    const isAnomaly = anomalyScore > threshold;

    return {
      fitFactor,
      residualLoss: parseFloat(residualLoss.toFixed(3)),
      lesionIntensity: parseFloat(lesionIntensity.toFixed(2)),
      anomalyScore: parseFloat(anomalyScore.toFixed(3)),
      isAnomaly,
      detectedArea: isAnomaly ? Math.round(currentCase.nominalArea * fitFactor) : 0
    };
  }, [iterations, threshold, currentCase]);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {/* Barra de Controles e Seletores */}
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
          <Microscope size={18} color="var(--infnet-dark-blue)" />
          <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
            Simulador Clínico AnoGAN:
          </span>
        </div>

        {/* Seletor de Casos */}
        <div style={{ display: 'flex', gap: '6px' }}>
          {[
            { id: 'brain_tumor', label: '🧠 Glioblastoma (Cérebro)' },
            { id: 'lung_nodule', label: '🫁 Nódulo Pulmonar' },
            { id: 'turbine_crack', label: '⚙️ Turbina Industrial' }
          ].map((c) => (
            <button
              key={c.id}
              onClick={() => setCaseType(c.id)}
              style={{
                padding: '5px 10px',
                fontSize: '10.5px',
                fontWeight: 700,
                borderRadius: '6px',
                border: caseType === c.id ? '2px solid var(--infnet-cyan)' : '1px solid #CBD5E1',
                background: caseType === c.id ? 'var(--infnet-dark-blue)' : '#FFFFFF',
                color: caseType === c.id ? '#FFFFFF' : '#334155',
                cursor: 'pointer'
              }}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Sliders: Iterações e Limiar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '11px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontWeight: 600, color: '#334155' }}>Passos de Inversão Latente (z):</span>
            <input
              type="range"
              min="5"
              max="100"
              step="5"
              value={iterations}
              onChange={(e) => setIterations(parseInt(e.target.value))}
              style={{ width: '85px', cursor: 'pointer' }}
            />
            <span style={{ fontWeight: 800, color: 'var(--infnet-purple)', fontFamily: 'var(--font-code)', width: '28px' }}>
              {iterations}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontWeight: 600, color: '#334155' }}>Limiar τ:</span>
            <input
              type="range"
              min="0.1"
              max="0.8"
              step="0.05"
              value={threshold}
              onChange={(e) => setThreshold(parseFloat(e.target.value))}
              style={{ width: '70px', cursor: 'pointer' }}
            />
            <span style={{ fontWeight: 800, color: 'var(--infnet-orange)', fontFamily: 'var(--font-code)', width: '28px' }}>
              {threshold.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Grid Principal: Tríptico de Imagens (Original x, Reconstrução G(z*), Mapa Residual |x - G(z*)|) */}
      <div style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '12px',
        minHeight: 0
      }}>
        {/* Painel 1: Imagem Query de Teste (x) */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid var(--border-light)',
          borderRadius: '12px',
          padding: '12px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#0A345D' }}>1. IMAGEM DO EXAME (x)</span>
            <span className="badge badge-cyan" style={{ fontSize: '8px' }}>Entrada Query</span>
          </div>

          <div style={{ flex: 1, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg viewBox="0 0 240 200" style={{ width: '100%', height: '100%', maxHeight: '180px' }}>
              <rect x="10" y="10" width="220" height="180" rx="8" fill="#0F172A" />
              {/* Contorno anatômico */}
              <ellipse cx="120" cy="100" rx="85" ry="70" fill="#1E293B" stroke="#334155" strokeWidth="2" />
              <path d="M 120 40 Q 110 100 120 160" fill="none" stroke="#475569" strokeWidth="1.5" strokeDasharray="3 2" />
              <ellipse cx="95" cy="95" rx="16" ry="32" fill="#0F172A" opacity="0.6" />
              <ellipse cx="145" cy="95" rx="16" ry="32" fill="#0F172A" opacity="0.6" />

              {/* Lesão / Anomalia Patológica (Visível em vermelho) */}
              <circle
                cx={currentCase.lesionCoords.cx - 20}
                cy={currentCase.lesionCoords.cy - 10}
                r={currentCase.lesionCoords.r}
                fill="#EF4444"
                opacity="0.85"
                filter="drop-shadow(0 0 6px #F87171)"
              />
              <text
                x={currentCase.lesionCoords.cx - 20}
                y={currentCase.lesionCoords.cy - 7}
                fill="#FFFFFF"
                fontSize="8"
                fontWeight="800"
                textAnchor="middle"
              >
                PATOLOGIA
              </text>
            </svg>
          </div>

          <div style={{ width: '100%', background: '#F8FAFC', padding: '6px', borderRadius: '4px', fontSize: '8.5px', color: '#475569', textAlign: 'center' }}>
            {currentCase.title}: {currentCase.target}
          </div>
        </div>

        {/* Painel 2: Reconstrução Saudável da GAN G(z*) */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid var(--border-light)',
          borderRadius: '12px',
          padding: '12px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#15803D' }}>2. RECONSTRUÇÃO G(z*)</span>
            <span className="badge badge-green" style={{ fontSize: '8px' }}>Manifold Sadio</span>
          </div>

          <div style={{ flex: 1, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg viewBox="0 0 240 200" style={{ width: '100%', height: '100%', maxHeight: '180px' }}>
              <rect x="10" y="10" width="220" height="180" rx="8" fill="#0F172A" />
              {/* Contorno anatômico idêntico convergindo com as iterações */}
              <ellipse
                cx="120"
                cy="100"
                rx={85 * (0.8 + 0.2 * convergence.fitFactor)}
                ry={70 * (0.8 + 0.2 * convergence.fitFactor)}
                fill="#1E293B"
                stroke="#22C55E"
                strokeWidth="1.5"
                opacity={0.7 + 0.3 * convergence.fitFactor}
              />
              <path d="M 120 40 Q 110 100 120 160" fill="none" stroke="#22C55E" strokeWidth="1" strokeDasharray="3 2" />
              <ellipse cx="95" cy="95" rx="16" ry="32" fill="#0F172A" opacity="0.6" />
              <ellipse cx="145" cy="95" rx="16" ry="32" fill="#0F172A" opacity="0.6" />

              {/* A ÁREA DA LESÃO É SINTETIZADA COMO TECIDO SADIO! */}
              <circle
                cx={currentCase.lesionCoords.cx - 20}
                cy={currentCase.lesionCoords.cy - 10}
                r={currentCase.lesionCoords.r}
                fill="#1E293B"
                stroke="#15803D"
                strokeWidth="1.5"
                strokeDasharray="2 2"
              />
              <text
                x={currentCase.lesionCoords.cx - 20}
                y={currentCase.lesionCoords.cy - 7}
                fill="#86EFAC"
                fontSize="7.5"
                fontWeight="700"
                textAnchor="middle"
              >
                Sadio
              </text>
            </svg>
          </div>

          <div style={{ width: '100%', background: '#F0FDF4', padding: '6px', borderRadius: '4px', fontSize: '8.5px', color: '#166534', textAlign: 'center' }}>
            A GAN projeta o paciente em ℳ_healthy (sem lesão)
          </div>
        </div>

        {/* Painel 3: Mapa Residual |x - G(z*)| */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid var(--border-light)',
          borderRadius: '12px',
          padding: '12px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#B91C1C' }}>3. MAPA RESIDUAL |x - G(z*)|</span>
            <span className="badge badge-orange" style={{ fontSize: '8px' }}>Localização</span>
          </div>

          <div style={{ flex: 1, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg viewBox="0 0 240 200" style={{ width: '100%', height: '100%', maxHeight: '180px' }}>
              <rect x="10" y="10" width="220" height="180" rx="8" fill="#020617" />
              {/* O tecido normal subtrai para ~0 (preto/cinza muito escuro) */}
              <ellipse cx="120" cy="100" rx="85" ry="70" fill="none" stroke="#1E293B" strokeWidth="1" />

              {/* O tumor residual brilha intensamente no mapa de diferença */}
              <circle
                cx={currentCase.lesionCoords.cx - 20}
                cy={currentCase.lesionCoords.cy - 10}
                r={currentCase.lesionCoords.r}
                fill="#EF4444"
                opacity={convergence.lesionIntensity}
                filter="drop-shadow(0 0 12px #F59E0B)"
              />
              <circle
                cx={currentCase.lesionCoords.cx - 20}
                cy={currentCase.lesionCoords.cy - 10}
                r={currentCase.lesionCoords.r * 0.6}
                fill="#FDE047"
                opacity={convergence.lesionIntensity}
              />
              <text
                x={currentCase.lesionCoords.cx - 20}
                y={currentCase.lesionCoords.cy - 7}
                fill="#78350F"
                fontSize="8"
                fontWeight="900"
                textAnchor="middle"
              >
                Δ RESÍDUO
              </text>
            </svg>
          </div>

          <div style={{
            width: '100%',
            background: convergence.isAnomaly ? '#FEF2F2' : '#F0FDF4',
            border: `1px solid ${convergence.isAnomaly ? '#FCA5A5' : '#86EFAC'}`,
            padding: '6px',
            borderRadius: '4px',
            fontSize: '8.5px',
            color: convergence.isAnomaly ? '#991B1B' : '#166534',
            textAlign: 'center',
            fontWeight: 700
          }}>
            Score: {convergence.anomalyScore} ➔ {convergence.isAnomaly ? '🚨 ANOMALIA DETECTADA' : '✓ DENTRO DA NORMALIDADE'}
          </div>
        </div>
      </div>

      {/* Footer com telemetria diagnóstica */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '10px'
      }}>
        <div className="card-infnet" style={{ padding: '6px 10px', background: '#F8FAFC' }}>
          <div style={{ fontSize: '9px', color: '#64748B', fontWeight: 600 }}>SCORE DE ANOMALIA</div>
          <div style={{ fontSize: '13px', fontWeight: 800, color: convergence.isAnomaly ? '#DC2626' : '#16A34A', fontFamily: 'var(--font-code)' }}>
            A(x) = {convergence.anomalyScore}
          </div>
        </div>
        <div className="card-infnet" style={{ padding: '6px 10px', background: '#F8FAFC' }}>
          <div style={{ fontSize: '9px', color: '#64748B', fontWeight: 600 }}>ÁREA ESTIMADA DA LESÃO</div>
          <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--infnet-dark-blue)', fontFamily: 'var(--font-code)' }}>
            {convergence.detectedArea} mm²
          </div>
        </div>
        <div className="card-infnet" style={{ padding: '6px 10px', background: '#F8FAFC' }}>
          <div style={{ fontSize: '9px', color: '#64748B', fontWeight: 600 }}>CONVERGÊNCIA DE z*</div>
          <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--infnet-purple)', fontFamily: 'var(--font-code)' }}>
            {(convergence.fitFactor * 100).toFixed(0)}%
          </div>
        </div>
        <div className="card-infnet" style={{ padding: '6px 10px', background: '#F8FAFC' }}>
          <div style={{ fontSize: '9px', color: '#64748B', fontWeight: 600 }}>LAUDO AUTOMATIZADO</div>
          <div style={{ fontSize: '11px', fontWeight: 800, color: convergence.isAnomaly ? '#B91C1C' : '#15803D' }}>
            {convergence.isAnomaly ? 'Positivo (Patológico)' : 'Negativo (Sadio)'}
          </div>
        </div>
      </div>
    </div>
  );
}
