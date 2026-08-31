import React from 'react';
import MathView from '../MathView';
import { Minimize2, Sliders, Scale, ArrowRight } from 'lucide-react';

export default function SENetDiagram() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', height: '100%', alignItems: 'stretch' }}>
      {/* 1. Squeeze */}
      <div style={{
        background: '#FFFFFF',
        border: '1px solid var(--border-light)',
        borderRadius: '10px',
        padding: '14px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div>
          <div className="card-header" style={{ marginBottom: '8px' }}>
            <div className="card-icon-wrapper icon-orange" style={{ width: '32px', height: '32px' }}>
              <Minimize2 size={16} />
            </div>
            <div className="card-title" style={{ fontSize: '14px' }}>1. Squeeze (GAP)</div>
          </div>

          <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '8px', textAlign: 'center', margin: '8px 0' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Mapa Espacial → Vetor 1D:</div>
            <div style={{ fontFamily: 'var(--font-code)', fontSize: '12px', fontWeight: 700, color: 'var(--infnet-dark-blue)', marginTop: '2px' }}>
              [C, H, W] → [C, 1, 1]
            </div>
          </div>

          <div style={{ fontSize: '11px', textAlign: 'center' }}>
            <MathView math="z_c = \frac{1}{H \times W} \sum_{i=1}^H \sum_{j=1}^W u_c(i, j)" />
          </div>
        </div>

        <div style={{ background: '#FFF7ED', padding: '6px 10px', borderRadius: '6px', fontSize: '11px', color: '#9A3412' }}>
          Resume o contexto global de cada canal em um único escalar estatístico.
        </div>
      </div>

      {/* 2. Excitation */}
      <div style={{
        background: '#FFFFFF',
        border: '1px solid var(--border-light)',
        borderRadius: '10px',
        padding: '14px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div>
          <div className="card-header" style={{ marginBottom: '8px' }}>
            <div className="card-icon-wrapper icon-purple" style={{ width: '32px', height: '32px' }}>
              <Sliders size={16} />
            </div>
            <div className="card-title" style={{ fontSize: '14px' }}>2. Excitation (FC + Sigmoid)</div>
          </div>

          <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '8px', textAlign: 'center', margin: '8px 0' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Gargalo FC com redução r=16:</div>
            <div style={{ fontFamily: 'var(--font-code)', fontSize: '12px', fontWeight: 700, color: 'var(--infnet-purple)', marginTop: '2px' }}>
              [C] → [C/16] → [C] → Sigmoid
            </div>
          </div>

          <div style={{ fontSize: '11px', textAlign: 'center' }}>
            <MathView math="s = \sigma(W_2 \cdot \text{ReLU}(W_1 \cdot z))" />
          </div>
        </div>

        <div style={{ background: '#F3E5F5', padding: '6px 10px', borderRadius: '6px', fontSize: '11px', color: '#6A1B9A' }}>
          Modela dependências não-lineares e gera pesos de atenção contínuos $s_c \in [0, 1]$.
        </div>
      </div>

      {/* 3. Scale */}
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
          <div className="card-header" style={{ marginBottom: '8px' }}>
            <div className="card-icon-wrapper icon-green" style={{ width: '32px', height: '32px' }}>
              <Scale size={16} />
            </div>
            <div className="card-title" style={{ fontSize: '14px' }}>3. Scale (Recalibração)</div>
          </div>

          <div style={{ background: '#F0FDF4', border: '1px solid #DCFCE7', borderRadius: '6px', padding: '8px', textAlign: 'center', margin: '8px 0' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Multiplicação Canal por Canal:</div>
            <div style={{ fontFamily: 'var(--font-code)', fontSize: '12px', fontWeight: 700, color: '#15803D', marginTop: '2px' }}>
              X_recalibrado = s_c · X_c
            </div>
          </div>

          <div style={{ fontSize: '11px', textAlign: 'center' }}>
            <MathView math="\widetilde{x}_c = s_c \cdot u_c \quad (\forall c \in \{1 \dots C\})" />
          </div>
        </div>

        <div style={{ background: '#DCFCE7', padding: '6px 10px', borderRadius: '6px', fontSize: '11px', color: '#15803D' }}>
          Dá ênfase máxima a canais informativos e suprime ruídos com menos de 1% de pesos extras.
        </div>
      </div>
    </div>
  );
}
