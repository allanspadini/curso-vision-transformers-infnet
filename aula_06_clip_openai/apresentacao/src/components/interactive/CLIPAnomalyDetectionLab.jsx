import React, { useState, useMemo } from 'react';
import { AlertOctagon, CheckCircle2, Sliders, ShieldCheck, Factory, Settings } from 'lucide-react';

export default function CLIPAnomalyDetectionLab() {
  const [selectedPartId, setSelectedPartId] = useState('chip_defective');
  const [threshold, setThreshold] = useState(0.50);

  // Peças industriais do benchmark MVTec AD
  const parts = [
    {
      id: 'chip_normal',
      name: 'Microchip PCB',
      condition: 'Normal',
      isAnomaly: false,
      desc: 'Placa de circuito integrado com solda íntegra e trilhas preservadas.',
      icon: '🎛️',
      simNormal: 0.86,
      simAnomaly: 0.12
    },
    {
      id: 'chip_defective',
      name: 'Microchip PCB',
      condition: 'Defeito (Trilha Queimada)',
      isAnomaly: true,
      desc: 'Trilha de cobre com curto-circuito e queimadura de solda visível.',
      icon: '💥',
      simNormal: 0.21,
      simAnomaly: 0.82
    },
    {
      id: 'screw_normal',
      name: 'Parafuso Industrial',
      condition: 'Normal',
      isAnomaly: false,
      desc: 'Rosca de aço usinado com passo métrico sem rebarbas.',
      icon: '🔩',
      simNormal: 0.89,
      simAnomaly: 0.09
    },
    {
      id: 'screw_defective',
      name: 'Parafuso Industrial',
      condition: 'Defeito (Rosca Amassada)',
      isAnomaly: true,
      desc: 'Dentes da rosca esmagados por torque excessivo na montagem.',
      icon: '⚠️',
      simNormal: 0.28,
      simAnomaly: 0.77
    },
    {
      id: 'bottle_defective',
      name: 'Frasco Farmacêutico',
      condition: 'Defeito (Trinca no Vidro)',
      isAnomaly: true,
      desc: 'Fissura estrutural de 8mm no gargalo do vidro temperado.',
      icon: '🧪',
      simNormal: 0.15,
      simAnomaly: 0.88
    }
  ];

  const currentPart = parts.find(p => p.id === selectedPartId) || parts[0];

  // Cálculo da Probabilidade Softmax de Anomalia
  const { anomalyProb, isDetectedAnomaly, verdictCorrect } = useMemo(() => {
    const tau = 0.07;
    const lNorm = currentPart.simNormal / tau;
    const lAnom = currentPart.simAnomaly / tau;

    const maxL = Math.max(lNorm, lAnom);
    const expNorm = Math.exp(lNorm - maxL);
    const expAnom = Math.exp(lAnom - maxL);

    const probAnom = expAnom / (expNorm + expAnom);
    const isDetected = probAnom >= threshold;
    const correct = isDetected === currentPart.isAnomaly;

    return {
      anomalyProb: probAnom,
      isDetectedAnomaly: isDetected,
      verdictCorrect: correct
    };
  }, [currentPart, threshold]);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '14px' }}>
      
      {/* Barra de Controles */}
      <div style={{
        background: '#EDF5FA',
        border: '1px solid #D0E3F0',
        borderRadius: '10px',
        padding: '10px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        {/* Seletor de Peça Industrial */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Factory size={16} color="#0A345D" />
          <span style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
            Linha de Produção (MVTec AD):
          </span>
          {parts.map(p => (
            <button
              key={p.id}
              onClick={() => setSelectedPartId(p.id)}
              style={{
                padding: '4px 8px',
                borderRadius: '6px',
                fontSize: '10.5px',
                fontWeight: 600,
                cursor: 'pointer',
                border: 'none',
                background: selectedPartId === p.id ? (p.isAnomaly ? '#DC2626' : '#16A34A') : '#FFFFFF',
                color: selectedPartId === p.id ? '#FFFFFF' : '#334155',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <span>{p.icon}</span> {p.name} ({p.condition.split(' ')[0]})
            </button>
          ))}
        </div>

        {/* Slider do Limiar Theta */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sliders size={15} color="#0A345D" />
          <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
            Threshold Limiar \theta:
          </span>
          <input
            type="range"
            min="0.20"
            max="0.80"
            step="0.05"
            value={threshold}
            onChange={(e) => setThreshold(parseFloat(e.target.value))}
            style={{ width: '90px', cursor: 'pointer' }}
          />
          <span style={{
            fontSize: '11px',
            fontFamily: 'Fira Code',
            fontWeight: 800,
            background: '#FFFFFF',
            padding: '2px 6px',
            borderRadius: '4px',
            border: '1px solid #CBD5E1'
          }}>
            {(threshold * 100).toFixed(0)}%
          </span>
        </div>
      </div>

      {/* Grid Central */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '16px', flex: 1 }}>
        
        {/* Painel da Peça em Inspeção */}
        <div style={{
          background: '#FFFFFF',
          border: '1.5px solid var(--border-light)',
          borderRadius: '12px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
                ITEM INSPECIONADO PELA CÂMERA
              </span>
              <span style={{
                background: currentPart.isAnomaly ? '#FEE2E2' : '#DCFCE7',
                color: currentPart.isAnomaly ? '#991B1B' : '#15803D',
                fontSize: '10.5px',
                fontWeight: 800,
                padding: '2px 8px',
                borderRadius: '10px'
              }}>
                Ground Truth: {currentPart.condition}
              </span>
            </div>

            {/* Simulação Visual do Sensor Industrial */}
            <div style={{
              width: '100%',
              height: '160px',
              background: 'radial-gradient(circle at 50% 50%, #1E293B 0%, #0F172A 100%)',
              borderRadius: '8px',
              border: `2px solid ${currentPart.isAnomaly ? '#EF4444' : '#10B981'}`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              position: 'relative'
            }}>
              <div style={{ fontSize: '42px', marginBottom: '6px' }}>{currentPart.icon}</div>
              <div style={{ fontSize: '15px', fontWeight: 800 }}>{currentPart.name}</div>
              <div style={{ fontSize: '10px', color: '#94A3B8', marginTop: '2px' }}>{currentPart.desc}</div>

              {/* Mira Industrial */}
              <div style={{
                position: 'absolute',
                top: '8px',
                left: '8px',
                fontSize: '9px',
                fontFamily: 'Fira Code',
                color: '#38BDF8'
              }}>
                CAM-01 • RGB 224x224
              </div>
            </div>

            {/* Prompts Contrastivos Usados */}
            <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', padding: '6px 10px', borderRadius: '4px', fontSize: '10px', color: '#166534', fontFamily: 'Fira Code' }}>
                T_norm: "a photo of a flawless pristine {currentPart.name.toLowerCase()}" (cos: {currentPart.simNormal})
              </div>
              <div style={{ background: '#FFF1F2', border: '1px solid #FECACA', padding: '6px 10px', borderRadius: '4px', fontSize: '10px', color: '#9F1239', fontFamily: 'Fira Code' }}>
                T_anom: "a photo of a damaged defective {currentPart.name.toLowerCase()}" (cos: {currentPart.simAnomaly})
              </div>
            </div>
          </div>

          <div style={{ fontSize: '10px', color: '#64748B' }}>
            Zero-Shot Industrial: Não foi necessário treinar nenhuma rede com defeitos previamente.
          </div>
        </div>

        {/* Painel do Veredito da Máquina e Métricas */}
        <div style={{
          background: '#FFFFFF',
          border: '1.5px solid var(--border-light)',
          borderRadius: '12px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--infnet-dark-blue)' }}>
                Veredito do CLIP em Tempo Real
              </span>
              <span style={{
                background: verdictCorrect ? '#DCFCE7' : '#FEE2E2',
                color: verdictCorrect ? '#15803D' : '#991B1B',
                padding: '2px 8px',
                borderRadius: '4px',
                fontSize: '10px',
                fontWeight: 800
              }}>
                {verdictCorrect ? '✓ Decisão Correta' : '✕ Erro de Classificação'}
              </span>
            </div>

            {/* Veredito Grande */}
            <div style={{
              background: isDetectedAnomaly ? '#FEF2F2' : '#F0FDF4',
              border: `2px solid ${isDetectedAnomaly ? '#EF4444' : '#16A34A'}`,
              borderRadius: '10px',
              padding: '16px',
              textAlign: 'center',
              marginBottom: '14px'
            }}>
              <div style={{ fontSize: '11px', fontWeight: 800, color: isDetectedAnomaly ? '#991B1B' : '#166534', textTransform: 'uppercase' }}>
                {isDetectedAnomaly ? '🚨 ALARME: DEFEITO ENCONTRADO' : '✅ PEÇA APROVADA: QUALIDADE ASSEGURADA'}
              </div>
              <div style={{ fontSize: '26px', fontFamily: 'Fira Code', fontWeight: 800, color: isDetectedAnomaly ? '#DC2626' : '#15803D', margin: '4px 0' }}>
                Score: {(anomalyProb * 100).toFixed(1)}%
              </div>
              <div style={{ fontSize: '10.5px', color: '#64748B' }}>
                Limiar de Decisão: {(threshold * 100).toFixed(0)}% • Diferencial: {((anomalyProb - threshold) * 100).toFixed(1)} pp
              </div>
            </div>

            {/* Barra Comparativa Score vs Threshold */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10.5px', fontWeight: 600 }}>
                <span style={{ color: '#047857' }}>Normalidade (0%)</span>
                <span style={{ color: '#B91C1C' }}>Anomalia (100%)</span>
              </div>
              <div style={{ width: '100%', height: '14px', background: '#E2E8F0', borderRadius: '7px', position: 'relative', overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    width: `${anomalyProb * 100}%`,
                    background: isDetectedAnomaly ? '#EF4444' : '#10B981',
                    borderRadius: '7px',
                    transition: 'width 0.3s ease'
                  }}
                />
                {/* Linha do Threshold */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: `${threshold * 100}%`,
                    width: '3px',
                    background: '#0F172A',
                    zIndex: 2
                  }}
                />
              </div>
            </div>
          </div>

          <div style={{
            background: '#EDF5FA',
            border: '1px solid #D0E3F0',
            padding: '8px 12px',
            borderRadius: '6px',
            fontSize: '10px',
            color: 'var(--infnet-dark-blue)'
          }}>
            ⚙️ <strong>Engenharia de Threshold:</strong> Ajustar o threshold para baixo (ex: 35%) aumenta o recall (não deixa passar defeitos para o cliente final, mas gera mais falsos alarmes). Ajustar para cima (ex: 70%) é ideal para triagens de alta vazão.
          </div>
        </div>

      </div>
    </div>
  );
}
