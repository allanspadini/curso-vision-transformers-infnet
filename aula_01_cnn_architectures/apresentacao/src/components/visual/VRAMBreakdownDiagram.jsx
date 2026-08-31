import React from 'react';
import { Database, AlertTriangle, Layers, Cpu, CheckCircle2 } from 'lucide-react';

export default function VRAMBreakdownDiagram() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '18px', height: '100%', alignItems: 'stretch' }}>
      {/* 1. Inference vs Training Summary */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ background: '#FFFFFF', border: '1px solid var(--border-light)', borderRadius: '8px', padding: '12px 14px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>Inferência (torch.no_grad)</span>
            <span className="badge badge-green">~120 MB VRAM</span>
          </div>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: '6px 0' }}>
            Apenas pesos estáticos + ativação da camada atual. Ativações anteriores são descartadas imediatamente.
          </p>
          <div style={{ fontSize: '10.5px', fontWeight: 600, color: '#15803D' }}>
            ✓ Complexidade de Memória: <strong>O(1)</strong>
          </div>
        </div>

        <div style={{ background: '#FFFFFF', border: '1.5px solid #FCA5A5', borderRadius: '8px', padding: '12px 14px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#991B1B' }}>Treinamento (Backpropagation)</span>
            <span className="badge badge-orange">~8.5 GB VRAM</span>
          </div>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: '6px 0' }}>
            TODOS os mapas de ativação de TODAS as camadas precisam ser salvos para a regra da cadeia no backward pass.
          </p>
          <div style={{ fontSize: '10.5px', fontWeight: 600, color: '#DC2626' }}>
            ⚠️ Complexidade de Memória: <strong>O(L × Batch)</strong>
          </div>
        </div>
      </div>

      {/* 2. Visual VRAM Composition Bar */}
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
            Onde a GPU RAM Realmente Vai no Treinamento? (Batch=64)
          </span>
          <span className="badge badge-cyan">ResNet-50</span>
        </div>

        {/* Stacked Percentage Bar */}
        <div style={{ margin: '12px 0' }}>
          <div style={{ height: '28px', width: '100%', borderRadius: '6px', overflow: 'hidden', display: 'flex', boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.2)' }}>
            <div style={{ width: '4%', background: '#0A345D' }} title="Pesos (W): 4%"></div>
            <div style={{ width: '4%', background: '#1BB5D8' }} title="Gradientes (dW): 4%"></div>
            <div style={{ width: '8%', background: '#AB47BC' }} title="Adam Buffers (m, v): 8%"></div>
            <div style={{ width: '84%', background: '#FF7043' }} title="Mapas de Ativação Intermediários: 84%"></div>
          </div>

          {/* Legend */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '12px', fontSize: '11px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '10px', height: '10px', background: '#0A345D', borderRadius: '2px' }}></span>
              <span><strong>Pesos (W):</strong> ~100 MB (4%)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '10px', height: '10px', background: '#1BB5D8', borderRadius: '2px' }}></span>
              <span><strong>Gradientes (dW):</strong> ~100 MB (4%)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '10px', height: '10px', background: '#AB47BC', borderRadius: '2px' }}></span>
              <span><strong>Adam (m, v):</strong> ~200 MB (8%)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '10px', height: '10px', background: '#FF7043', borderRadius: '2px' }}></span>
              <span><strong>Ativações:</strong> ~7.2 GB (84%) 🔥</span>
            </div>
          </div>
        </div>

        <div style={{ background: '#EFF8FC', border: '1px solid #CDE6F5', borderRadius: '6px', padding: '8px 10px', fontSize: '11px', color: 'var(--infnet-dark-blue)' }}>
          💡 <strong>Regra de Ouro:</strong> Se você tiver erro OOM (Out of Memory), reduza o <code>batch_size</code> ou use <em>Gradient Checkpointing / RevNets</em>.
        </div>
      </div>
    </div>
  );
}
