import React from 'react';
import MathView from '../MathView';
import { RotateCcw, Zap, CheckCircle2, ArrowDown, ArrowUp } from 'lucide-react';

export default function RevNetDiagram() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px', height: '100%', alignItems: 'stretch' }}>
      {/* 1. Forward Pass */}
      <div style={{
        background: '#FFFFFF',
        border: '1.5px solid var(--border-light)',
        borderRadius: '10px',
        padding: '14px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
              1. Forward Pass (Divisão de Canais)
            </span>
            <span className="badge badge-cyan">Entrada [x1, x2]</span>
          </div>

          <div style={{ background: '#EFF8FC', border: '1px solid #CDE6F5', borderRadius: '6px', padding: '10px', margin: '8px 0', textAlign: 'center' }}>
            <div style={{ fontSize: '12px' }}>
              <MathView math="y_1 = x_1 + \mathcal{F}(x_2)" block />
              <MathView math="y_2 = x_2 + \mathcal{G}(y_1)" block />
            </div>
          </div>
        </div>

        <div style={{ background: '#F8FAFC', padding: '8px 10px', borderRadius: '6px', fontSize: '11px', color: 'var(--text-muted)' }}>
          As duas metades $x_1$ e $x_2$ se atualizam em ziguezague modular.
        </div>
      </div>

      {/* 2. Backward Pass Exact Inversion */}
      <div style={{
        background: '#FFFFFF',
        border: '1.5px solid #86EFAC',
        borderRadius: '10px',
        padding: '14px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#166534' }}>
              2. Backward Pass (Inversão Exata)
            </span>
            <span className="badge badge-green">Memória O(1)</span>
          </div>

          <div style={{ background: '#F0FDF4', border: '1px solid #DCFCE7', borderRadius: '6px', padding: '10px', margin: '8px 0', textAlign: 'center' }}>
            <div style={{ fontSize: '12px' }}>
              <MathView math="x_2 = y_2 - \mathcal{G}(y_1)" block />
              <MathView math="x_1 = y_1 - \mathcal{F}(x_2)" block />
            </div>
          </div>
        </div>

        <div style={{ background: '#DCFCE7', padding: '8px 10px', borderRadius: '6px', fontSize: '11px', color: '#15803D', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <CheckCircle2 size={15} color="#15803D" />
          <span><strong>Zero ativações salvas na VRAM!</strong> Recalcula $x$ sob demanda.</span>
        </div>
      </div>
    </div>
  );
}
