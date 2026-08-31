import React from 'react';
import MathView from '../MathView';
import { ArrowLeft } from 'lucide-react';

export default function DegradationVanishingDiagram() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px', height: '100%', alignItems: 'stretch' }}>
      {/* 1. Degradation Curves Chart */}
      <div style={{
        background: '#FFFFFF',
        border: '1px solid var(--border-light)',
        borderRadius: '10px',
        padding: '14px 18px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
            O Paradoxo da Degradação (He et al., 2015)
          </span>
          <span className="badge badge-orange">Acurácia Treino/Teste</span>
        </div>

        <div style={{ position: 'relative', height: '160px', width: '100%', margin: '6px 0' }}>
          <svg viewBox="0 0 350 160" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
            {/* Grid */}
            <line x1="35" y1="15" x2="330" y2="15" stroke="#E2E8F0" strokeDasharray="3 3" />
            <line x1="35" y1="65" x2="330" y2="65" stroke="#E2E8F0" strokeDasharray="3 3" />
            <line x1="35" y1="115" x2="330" y2="115" stroke="#E2E8F0" strokeDasharray="3 3" />
            <line x1="35" y1="135" x2="330" y2="135" stroke="#94A3B8" strokeWidth="1.5" />
            <line x1="35" y1="15" x2="35" y2="135" stroke="#94A3B8" strokeWidth="1.5" />

            <text x="30" y="12" fill="#64748B" fontSize="9" textAnchor="end">Acurácia %</text>
            <text x="330" y="148" fill="#64748B" fontSize="9" textAnchor="end">Épocas de Treino →</text>

            {/* 20-layer Plain Net (Green - Higher Accuracy / Better) */}
            <path
              d="M 35 120 Q 90 40 180 35 T 330 30"
              fill="none"
              stroke="#15803D"
              strokeWidth="2.5"
            />
            <text x="240" y="24" fill="#15803D" fontSize="10" fontWeight="bold">Plain 20 camadas (Melhor)</text>

            {/* 56-layer Plain Net (Red - Lower Accuracy / Worse - Degraded!) */}
            <path
              d="M 35 125 Q 90 70 180 65 T 330 60"
              fill="none"
              stroke="#DC2626"
              strokeWidth="2.5"
            />
            <text x="240" y="75" fill="#DC2626" fontSize="10" fontWeight="bold">Plain 56 camadas (Pior!)</text>
          </svg>
        </div>

        <div style={{ background: '#FFF7ED', border: '1px solid #FFEDD5', borderRadius: '6px', padding: '8px 10px', fontSize: '11px', color: '#9A3412' }}>
          ⚠️ <strong>Não é Overfitting:</strong> A rede de 56 camadas tem acurácia <em>menor</em> até no treino! É um bloqueio de otimização dos gradientes.
        </div>
      </div>

      {/* 2. Vanishing Gradient Visual */}
      <div style={{
        background: '#FFFFFF',
        border: '1px solid var(--border-light)',
        borderRadius: '10px',
        padding: '14px 18px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
              Desvanecimento do Gradiente
            </span>
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--infnet-orange)', background: '#FFF3E0', padding: '1px 6px', borderRadius: '4px' }}>
              <MathView math="\nabla \mathcal{L} \to 0" />
            </span>
          </div>
          <span className="badge badge-purple">Regra da Cadeia</span>
        </div>

        <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '8px 12px', textAlign: 'center' }}>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px', fontWeight: 600 }}>
            Propagação da Derivada em L Camadas:
          </div>
          <div style={{ fontSize: '13.5px', padding: '2px 0' }}>
            <MathView math="\frac{\partial \mathcal{L}}{\partial W_1} = \frac{\partial \mathcal{L}}{\partial a_L} \prod_{l=2}^{L} \left( W_l^T \cdot \sigma'(z_l) \right)" />
          </div>
        </div>

        {/* Chain nodes (Backpropagation flow: L56 -> L40 -> L20 -> L1) */}
        <div style={{
          background: '#F8FAFC',
          border: '1px solid #E2E8F0',
          borderRadius: '8px',
          padding: '10px 12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '10.5px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
            <span>Fluxo do Gradiente (Backprop ←)</span>
            <span style={{ color: '#DC2626' }}>Perda Exponencial de Sinal</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px' }}>
            {/* L1 - Entrada (Sinal quase nulo) */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
              <div style={{
                width: '100%',
                maxWidth: '60px',
                height: '40px',
                background: '#DC2626',
                color: '#FFFFFF',
                borderRadius: '6px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 4px rgba(220, 38, 38, 0.25)'
              }}>
                <span style={{ fontWeight: 800, fontSize: '12.5px', lineHeight: 1.1 }}>L1</span>
                <span style={{ fontSize: '8.5px', opacity: 0.9 }}>Entrada</span>
              </div>
              <div style={{ fontSize: '10.5px', color: '#DC2626', fontWeight: 800, marginTop: '3px', textAlign: 'center' }}>
                ≈ 0.0001
              </div>
            </div>

            {/* Seta 1 */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#EA580C' }}>
              <ArrowLeft size={22} strokeWidth={2.8} />
            </div>

            {/* L20 */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
              <div style={{
                width: '100%',
                maxWidth: '60px',
                height: '40px',
                background: '#EA580C',
                color: '#FFFFFF',
                borderRadius: '6px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 4px rgba(234, 88, 12, 0.25)'
              }}>
                <span style={{ fontWeight: 800, fontSize: '12.5px', lineHeight: 1.1 }}>L20</span>
                <span style={{ fontSize: '8.5px', opacity: 0.9 }}>Oculta</span>
              </div>
              <div style={{ fontSize: '10.5px', color: '#EA580C', fontWeight: 800, marginTop: '3px', textAlign: 'center' }}>
                ≈ 0.08
              </div>
            </div>

            {/* Seta 2 */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0284C7' }}>
              <ArrowLeft size={22} strokeWidth={2.8} />
            </div>

            {/* L40 */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
              <div style={{
                width: '100%',
                maxWidth: '60px',
                height: '40px',
                background: '#0284C7',
                color: '#FFFFFF',
                borderRadius: '6px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 4px rgba(2, 132, 199, 0.25)'
              }}>
                <span style={{ fontWeight: 800, fontSize: '12.5px', lineHeight: 1.1 }}>L40</span>
                <span style={{ fontSize: '8.5px', opacity: 0.9 }}>Oculta</span>
              </div>
              <div style={{ fontSize: '10.5px', color: '#0284C7', fontWeight: 800, marginTop: '3px', textAlign: 'center' }}>
                ≈ 0.45
              </div>
            </div>

            {/* Seta 3 */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#16A34A' }}>
              <ArrowLeft size={22} strokeWidth={2.8} />
            </div>

            {/* L56 - Saída */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
              <div style={{
                width: '100%',
                maxWidth: '60px',
                height: '40px',
                background: '#16A34A',
                color: '#FFFFFF',
                borderRadius: '6px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 4px rgba(22, 163, 74, 0.25)'
              }}>
                <span style={{ fontWeight: 800, fontSize: '12.5px', lineHeight: 1.1 }}>L56</span>
                <span style={{ fontSize: '8.5px', opacity: 0.9 }}>Saída</span>
              </div>
              <div style={{ fontSize: '10.5px', color: '#16A34A', fontWeight: 800, marginTop: '3px', textAlign: 'center' }}>
                1.00
              </div>
            </div>
          </div>
        </div>

        <div style={{ background: '#EFF8FC', border: '1px solid #CDE6F5', borderRadius: '6px', padding: '7px 10px', fontSize: '11px', color: 'var(--infnet-dark-blue)' }}>
          💡 As sucessivas multiplicações matriciais amortecem o gradiente até zero nas camadas iniciais.
        </div>
      </div>
    </div>
  );
}
