import React from 'react';
import MathView from '../MathView';
import { Layers, ArrowRight, Zap, Check } from 'lucide-react';

export default function Inception1x1Diagram() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px', height: '100%', alignItems: 'stretch' }}>
      {/* 1. Traditional Direct Conv (Heavy) */}
      <div style={{
        background: '#FFFFFF',
        border: '1.5px solid #FCA5A5',
        borderRadius: '10px',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#991B1B' }}>
              Abordagem Direta Sem Bottleneck
            </span>
            <span className="badge badge-orange">462M FLOPs</span>
          </div>

          <div style={{ background: '#FFF1F2', padding: '10px', borderRadius: '6px', fontSize: '11.5px', color: '#9F1239', marginBottom: '12px' }}>
            Entrada <strong>[256 canais, 28x28]</strong> → Conv 3x3 → Saída <strong>[256 canais, 28x28]</strong>
          </div>

          <div style={{ fontSize: '12px', background: '#F8FAFC', padding: '8px', borderRadius: '6px', border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>Cálculo de Operações:</div>
            <MathView math="28 \times 28 \times (3 \times 3 \times 256) \times 256 \approx 462.4 \text{ MFLOPs}" />
          </div>
        </div>

        <div style={{ background: '#FEE2E2', padding: '8px 12px', borderRadius: '6px', fontSize: '11px', color: '#991B1B', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span>❌ Custo quadrático no número de canais:</span>
          <MathView math="\mathcal{O}(C_{in} \cdot C_{out} \cdot K^2)" />
        </div>
      </div>

      {/* 2. Bottleneck 1x1 Conv (Efficient) */}
      <div style={{
        background: '#FFFFFF',
        border: '1.5px solid #86EFAC',
        borderRadius: '10px',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#166534' }}>
              Com Bottleneck 1x1 (GoogLeNet)
            </span>
            <span className="badge badge-green">115M FLOPs (4x mais rápido!)</span>
          </div>

          <div style={{ background: '#F0FDF4', padding: '10px', borderRadius: '6px', fontSize: '11.5px', color: '#166534', marginBottom: '12px' }}>
            [256] → <strong>Conv 1x1 (64)</strong> → <strong>Conv 3x3 (64)</strong> → <strong>Conv 1x1 (256)</strong>
          </div>

          <div style={{ fontSize: '12px', background: '#F8FAFC', padding: '8px', borderRadius: '6px', border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>Cálculo de Operações:</div>
            <MathView math="(1\times 1\times 256\times 64 + 3\times 3\times 64\times 64 + 1\times 1\times 64\times 256) \times 28^2 \approx 115 \text{ MFLOPs}" />
          </div>
        </div>

        <div style={{ background: '#DCFCE7', padding: '8px 12px', borderRadius: '6px', fontSize: '11px', color: '#15803D', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Check size={14} color="#15803D" />
          <span><strong>75% de economia</strong> com a mesma capacidade expressiva!</span>
        </div>
      </div>
    </div>
  );
}
