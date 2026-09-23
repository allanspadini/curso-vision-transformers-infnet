import React, { useState } from 'react';
import { Activity, Sliders, TrendingUp, AlertTriangle, CheckCircle2, ShieldAlert } from 'lucide-react';
import MathView from '../MathView';

export default function DownstreamEvaluationLab() {
  const [syntheticSamples, setSyntheticSamples] = useState(0); // 0 to 3000

  // Total test set: 850 Células Típicas + 150 Fenótipos Raros = 1000 amostras reais
  const totalNormal = 850;
  const totalRare = 150;

  // With synthetic augmentation, TP increases and FN decreases
  // At 0 samples: TP = 87, FN = 63 (Recall = 58.0%)
  // At 3000 samples: TP = 141, FN = 9 (Recall = 94.0%)
  const progress = syntheticSamples / 3000;
  const tp = Math.round(87 + progress * 54);
  const fn = totalRare - tp;
  const fp = Math.round(42 + progress * 24);
  const tn = totalNormal - fp;

  const recall = ((tp / totalRare) * 100).toFixed(1);
  const precision = ((tp / (tp + fp)) * 100).toFixed(1);
  const specificity = ((tn / totalNormal) * 100).toFixed(1);
  const accuracy = (((tp + tn) / (totalNormal + totalRare)) * 100).toFixed(1);
  const f1 = ((2 * (tp / (tp + fp)) * (tp / totalRare)) / ((tp / (tp + fp)) + (tp / totalRare))).toFixed(2);

  const isDangerous = parseFloat(recall) < 75;
  const isOptimal = parseFloat(recall) >= 90;

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      padding: '12px 20px',
      gap: '12px',
      boxSizing: 'border-box'
    }}>
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
          <Activity size={20} color="var(--infnet-dark-blue)" />
          <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
            Laboratório Interativo: Avaliação do Impacto no Recall Downstream com Augmentation Generativo
          </span>
        </div>
        <div style={{ fontSize: '12px', color: '#334155', fontWeight: 500 }}>
          Teste Real: 850 Amostras Típicas + 150 Fenótipos Raros (100% Imagens Reais)
        </div>
      </div>

      {/* Main Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '320px 1fr',
        gap: '16px',
        flex: 1
      }}>
        {/* Left Column: Controls & Metrics */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid var(--border-light)',
          borderRadius: '10px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          justifyContent: 'space-between',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#1E293B', marginBottom: '6px' }}>
              <span style={{ fontWeight: 700 }}>Amostras Sintéticas da Classe Rara:</span>
              <span style={{ color: 'var(--infnet-dark-blue)', fontWeight: 800, fontSize: '13px' }}>+{syntheticSamples} imgs</span>
            </div>
            <input
              type="range"
              min="0"
              max="3000"
              step="100"
              value={syntheticSamples}
              onChange={(e) => setSyntheticSamples(parseInt(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--infnet-dark-blue)', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#64748B', marginTop: '3px', fontWeight: 500 }}>
              <span>0 (Baseline Sem GAN)</span>
              <span>1500 (+Balanceado)</span>
              <span>3000 (Aumentado)</span>
            </div>
          </div>

          {/* Metric Cards Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '8px'
          }}>
            <div style={{ background: '#F8FAFC', padding: '10px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '11px', color: '#475569', fontWeight: 600 }}>Recall (Sensibilidade):</div>
              <div style={{
                fontSize: '22px',
                fontWeight: 800,
                color: isDangerous ? '#DC2626' : isOptimal ? '#15803D' : '#C2410C'
              }}>
                {recall}%
              </div>
              <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 500 }}>Meta diagnóstica: ≥ 90%</div>
            </div>

            <div style={{ background: '#F8FAFC', padding: '10px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '11px', color: '#475569', fontWeight: 600 }}>Falsos Negativos (FN):</div>
              <div style={{
                fontSize: '22px',
                fontWeight: 800,
                color: isDangerous ? '#DC2626' : isOptimal ? '#15803D' : '#C2410C'
              }}>
                {fn} casos
              </div>
              <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 500 }}>Casos não detectados</div>
            </div>

            <div style={{ background: '#F8FAFC', padding: '10px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '11px', color: '#475569', fontWeight: 600 }}>Precisão:</div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>{precision}%</div>
              <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 500 }}>F1-Score: {f1}</div>
            </div>

            <div style={{ background: '#F8FAFC', padding: '10px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '11px', color: '#475569', fontWeight: 600 }}>Especificidade:</div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>{specificity}%</div>
              <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 500 }}>Acurácia: {accuracy}%</div>
            </div>
          </div>

          {/* Clinical Alert Box */}
          <div style={{
            padding: '10px 12px',
            borderRadius: '6px',
            fontSize: '11px',
            lineHeight: 1.4,
            background: isDangerous
              ? '#FEF2F2'
              : isOptimal
              ? '#F0FDF4'
              : '#FFF7ED',
            border: isDangerous
              ? '1px solid #FCA5A5'
              : isOptimal
              ? '1px solid #86EFAC'
              : '1px solid #FDBA74',
            color: isDangerous ? '#991B1B' : isOptimal ? '#166534' : '#9A3412'
          }}>
            {isDangerous && (
              <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                <ShieldAlert size={16} style={{ flexShrink: 0, marginTop: '2px', color: '#DC2626' }} />
                <span><b>Risco Crítico de Triagem:</b> {fn} casos da classe minoritária ignorados pelo classificador! Acurácia de {accuracy}% mascara a falha grave.</span>
              </div>
            )}
            {!isDangerous && !isOptimal && (
              <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                <AlertTriangle size={16} style={{ flexShrink: 0, marginTop: '2px', color: '#EA580C' }} />
                <span><b>Melhoria em Progresso:</b> O aumento generativo equilibrou a fronteira e reduziu os Falsos Negativos para {fn}.</span>
              </div>
            )}
            {isOptimal && (
              <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                <CheckCircle2 size={16} style={{ flexShrink: 0, marginTop: '2px', color: '#16A34A' }} />
                <span><b>Padrão de Qualidade Atingido:</b> Recall &gt; 90% com apenas {fn} falsos negativos. O sistema agora é viável para triagem diagnóstica automatizada.</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Confusion Matrix & Comparison */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid var(--border-light)',
          borderRadius: '10px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
              Matriz de Confusão no Teste Real (1.000 Lâminas/Amostras)
            </span>
            <span style={{
              fontSize: '11px',
              color: '#0369A1',
              fontFamily: 'monospace',
              fontWeight: 700,
              background: '#E0F2FE',
              padding: '2px 8px',
              borderRadius: '4px'
            }}>
              {syntheticSamples === 0 ? 'Baseline (Sem Augmentation)' : `Aumentado com +${syntheticSamples} Sintéticos`}
            </span>
          </div>

          {/* 2x2 Interactive Confusion Matrix */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '110px 1fr 1fr',
            gridTemplateRows: '30px 1fr 1fr',
            gap: '10px',
            maxWidth: '500px',
            margin: '12px auto',
            width: '100%'
          }}>
            <div />
            <div style={{ textAlign: 'center', fontSize: '12px', fontWeight: 700, color: '#15803D' }}>
              Previsto: Típico
            </div>
            <div style={{ textAlign: 'center', fontSize: '12px', fontWeight: 700, color: '#C2410C' }}>
              Previsto: Raro
            </div>

            <div style={{ display: 'flex', alignItems: 'center', fontSize: '11px', fontWeight: 700, color: '#15803D' }}>
              Real: Típico (850)
            </div>
            <div style={{
              background: '#F0FDF4',
              border: '1px solid #86EFAC',
              borderRadius: '8px',
              padding: '12px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#15803D' }}>{tn}</div>
              <div style={{ fontSize: '11px', color: '#166534', fontWeight: 600 }}>Verdadeiro Negativo (TN)</div>
            </div>
            <div style={{
              background: '#FFF7ED',
              border: '1px solid #FDBA74',
              borderRadius: '8px',
              padding: '12px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#C2410C' }}>{fp}</div>
              <div style={{ fontSize: '11px', color: '#9A3412', fontWeight: 600 }}>Falso Positivo (FP)</div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', fontSize: '11px', fontWeight: 700, color: '#C2410C' }}>
              Real: Raro (150)
            </div>
            <div style={{
              background: isDangerous ? '#FEF2F2' : '#FFF1F2',
              border: isDangerous ? '2px solid #DC2626' : '1px solid #FCA5A5',
              borderRadius: '8px',
              padding: '12px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#DC2626' }}>{fn}</div>
              <div style={{ fontSize: '11px', color: '#991B1B', fontWeight: 700 }}>Falso Negativo (FN) ⚠️</div>
            </div>
            <div style={{
              background: '#F0FDF4',
              border: '1px solid #86EFAC',
              borderRadius: '8px',
              padding: '12px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#15803D' }}>{tp}</div>
              <div style={{ fontSize: '11px', color: '#166534', fontWeight: 600 }}>Verdadeiro Positivo (TP)</div>
            </div>
          </div>

          {/* Footnote */}
          <div style={{
            background: '#EDF5FA',
            border: '1px solid #D0E3F0',
            borderRadius: '6px',
            padding: '8px 14px',
            fontSize: '12px',
            color: 'var(--infnet-dark-blue)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span><b>Fórmula do Recall:</b> <MathView math="\text{Recall} = \frac{\text{TP}}{\text{TP} + \text{FN}}" inline /></span>
            <span style={{ color: '#0369A1', fontWeight: 700 }}>
              Geração sintética equilibra a distribuição a jusante
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
