import React, { useState } from 'react';
import { Play, RotateCcw, Zap, AlertTriangle, CheckCircle2 } from 'lucide-react';
import MathView from '../MathView';

export default function ResidualExplorer() {
  const [depth, setDepth] = useState(34);
  const [hasSkip, setHasSkip] = useState(true);
  const [activeStep, setActiveStep] = useState(0);

  // Calculate synthetic gradient and loss behavior based on depth & skip
  const layers = Array.from({ length: Math.min(depth, 24) }, (_, i) => i + 1);
  
  // Theoretical gradient flow magnitude
  const getGradientMagnitude = (layerIndex) => {
    if (hasSkip) {
      // With skip: gradient remains healthy (~ 0.85 to 1.0)
      return Math.max(0.75, 1 - (layerIndex / depth) * 0.25);
    } else {
      // Without skip: exponential decay (vanishing gradient)
      return Math.pow(0.82, layerIndex + 1);
    }
  };

  const trainingLoss = hasSkip 
    ? (0.12 + 0.05 * Math.sin(depth / 5)).toFixed(3)
    : Math.min(2.85, 0.45 + (depth * 0.06)).toFixed(3);

  const top1Acc = hasSkip
    ? Math.min(78.5, 71.0 + (depth * 0.15)).toFixed(1)
    : Math.max(42.0, 72.0 - (depth * 0.85)).toFixed(1);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', height: '100%' }}>
      {/* Controls Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#EDF5FA',
        padding: '10px 16px',
        borderRadius: '8px',
        border: '1px solid #D0E3F0'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--infnet-dark-blue)' }}>
            Profundidade da Rede (Camadas): <strong>{depth}</strong>
          </label>
          <input
            type="range"
            min="6"
            max="50"
            step="2"
            value={depth}
            onChange={(e) => setDepth(Number(e.target.value))}
            style={{ width: '140px', accentColor: 'var(--infnet-cyan)' }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={() => setHasSkip(false)}
            style={{
              padding: '6px 12px',
              borderRadius: '6px',
              border: '1px solid',
              borderColor: !hasSkip ? 'var(--infnet-red)' : '#CBD5E1',
              background: !hasSkip ? '#FFEBEE' : '#FFFFFF',
              color: !hasSkip ? '#C62828' : 'var(--text-muted)',
              fontWeight: !hasSkip ? 700 : 500,
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            Sem Skip (Plain Net)
          </button>

          <button
            onClick={() => setHasSkip(true)}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              border: '1px solid',
              borderColor: hasSkip ? 'var(--infnet-cyan)' : '#CBD5E1',
              background: hasSkip ? '#E0F7FC' : '#FFFFFF',
              color: hasSkip ? 'var(--infnet-dark-blue)' : 'var(--text-muted)',
              fontWeight: hasSkip ? 700 : 500,
              fontSize: '12px',
              cursor: 'pointer',
              boxShadow: hasSkip ? '0 2px 6px rgba(27,181,216,0.3)' : 'none'
            }}
          >
            Com Skip (ResNet: F(x) + x)
          </button>
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '14px', flex: 1, minHeight: 0 }}>
        {/* Visual Layer Flow */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid var(--border-light)',
          borderRadius: '8px',
          padding: '14px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
                Fluxo do Gradiente no Backward Pass (Camadas Finais → Iniciais)
              </span>
              <span className={`badge ${hasSkip ? 'badge-green' : 'badge-orange'}`}>
                {hasSkip ? 'Gradiente Preservado' : 'Desvanecimento Severo'}
              </span>
            </div>

            <p style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginBottom: '12px' }}>
              {hasSkip 
                ? 'O atalho de identidade (+ x) cria uma via expressa linear para o gradiente, permitindo treinar 100+ camadas.' 
                : 'Em redes puras (Plain), sucessivas multiplicações matriciais amortecem o gradiente até zero nas camadas rasas.'}
            </p>
          </div>

          {/* Layer Nodes Visualizer */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '4px',
            background: '#F8FAFC',
            padding: '10px',
            borderRadius: '6px',
            border: '1px solid #E2E8F0'
          }}>
            {layers.map((l, idx) => {
              const mag = getGradientMagnitude(idx);
              const color = hasSkip
                ? `rgba(27, 181, 216, ${mag})`
                : `rgba(229, 57, 53, ${Math.max(0.1, mag)})`;
              return (
                <div
                  key={l}
                  title={`Camada ${l}: Magnitude do Gradiente = ${(mag * 100).toFixed(0)}%`}
                  style={{
                    height: '36px',
                    borderRadius: '4px',
                    background: color,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: mag > 0.4 ? '#FFFFFF' : '#1E293B',
                    fontSize: '10px',
                    fontWeight: 700,
                    border: '1px solid rgba(0,0,0,0.1)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <span>L{l}</span>
                  <span style={{ fontSize: '8px', opacity: 0.9 }}>{(mag * 100).toFixed(0)}%</span>
                </div>
              );
            })}
          </div>

          {/* Formula Callout */}
          <div style={{ marginTop: '10px', background: '#F0FDF4', border: '1px solid #DCFCE7', borderRadius: '6px', padding: '8px 12px' }}>
            <div style={{ fontSize: '11px', color: '#166534', fontWeight: 600 }}>Gradiente com Conexão Residual:</div>
            <div style={{ fontSize: '12px', color: '#14532D', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MathView math="\frac{\partial \mathcal{L}}{\partial x_l} = \frac{\partial \mathcal{L}}{\partial x_L} \left( \frac{\partial \mathcal{F}}{\partial x_l} + \mathbf{1} \right)" />
              <span style={{ fontSize: '10.5px', color: '#15803D' }}>→ O termo "+ 1" garante propagação ininterrupta!</span>
            </div>
          </div>
        </div>

        {/* Metrics & Performance Box */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid var(--border-light)',
          borderRadius: '8px',
          padding: '14px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <h4 style={{ fontFamily: 'var(--font-title)', fontSize: '14px', color: 'var(--infnet-dark-blue)', marginBottom: '8px' }}>
            Impacto no Treinamento
          </h4>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div style={{
              background: '#F8FAFC',
              padding: '10px',
              borderRadius: '6px',
              border: '1px solid #E2E8F0',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Erro no Treino (Loss)</div>
              <div style={{
                fontSize: '22px',
                fontWeight: 800,
                fontFamily: 'var(--font-title)',
                color: hasSkip ? '#15803D' : '#DC2626',
                marginTop: '4px'
              }}>
                {trainingLoss}
              </div>
            </div>

            <div style={{
              background: '#F8FAFC',
              padding: '10px',
              borderRadius: '6px',
              border: '1px solid #E2E8F0',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Top-1 Val Accuracy</div>
              <div style={{
                fontSize: '22px',
                fontWeight: 800,
                fontFamily: 'var(--font-title)',
                color: hasSkip ? 'var(--infnet-dark-blue)' : '#EA580C',
                marginTop: '4px'
              }}>
                {top1Acc}%
              </div>
            </div>
          </div>

          <div style={{
            background: hasSkip ? '#EFF8FC' : '#FFF7ED',
            border: `1px solid ${hasSkip ? '#BEE3F8' : '#FFEDD5'}`,
            borderRadius: '6px',
            padding: '10px',
            fontSize: '11.5px',
            color: hasSkip ? '#0C4A6E' : '#9A3412',
            lineHeight: 1.45
          }}>
            {hasSkip ? (
              <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                <CheckCircle2 size={16} color="#0284C7" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>
                  <strong>Comportamento ResNet:</strong> Adicionar mais camadas melhora consistentemente a acurácia sem sofrer do problema de degradação.
                </span>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                <AlertTriangle size={16} color="#EA580C" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>
                  <strong>Paradoxo da Degradação:</strong> Em redes puras, uma rede de 56 camadas tem erro <em>maior</em> tanto no treino quanto no teste do que uma de 20 camadas!
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
