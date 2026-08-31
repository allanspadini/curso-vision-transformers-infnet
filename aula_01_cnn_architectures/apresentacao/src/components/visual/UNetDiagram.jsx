import React from 'react';
import MathView from '../MathView';
import { ArrowDown, ArrowUp, ArrowRight, Grid, CheckCircle2 } from 'lucide-react';

export default function UNetDiagram() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px', height: '100%', alignItems: 'stretch' }}>
      {/* 1. U-Net Architecture Breakdown */}
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
            Estrutura em "U" (Encoder-Decoder)
          </span>
          <span className="badge badge-purple">U-Net (2015)</span>
        </div>

        {/* U-Shape 3 Tier Visual */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', margin: '8px 0' }}>
          {/* Level 1 */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#F8FAFC', padding: '6px 10px', borderRadius: '6px', border: '1px solid #E2E8F0' }}>
            <span style={{ fontSize: '10.5px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>Encoder L1 (224x224)</span>
            <span style={{ color: 'var(--infnet-cyan)', fontWeight: 800, fontSize: '11px' }}>── Skip Connection Longa ──►</span>
            <span style={{ fontSize: '10.5px', fontWeight: 700, color: '#15803D' }}>Decoder L1 (224x224)</span>
          </div>

          {/* Level 2 */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#F8FAFC', padding: '6px 10px', borderRadius: '6px', border: '1px solid #E2E8F0', marginLeft: '14px', marginRight: '14px' }}>
            <span style={{ fontSize: '10.5px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>Encoder L2 (112x112)</span>
            <span style={{ color: 'var(--infnet-cyan)', fontWeight: 800, fontSize: '11px' }}>── Skip Connection ──►</span>
            <span style={{ fontSize: '10.5px', fontWeight: 700, color: '#15803D' }}>Decoder L2 (112x112)</span>
          </div>

          {/* Level 3 (Bottleneck) */}
          <div style={{ background: '#EFF8FC', border: '1.5px solid var(--infnet-cyan)', padding: '6px 10px', borderRadius: '6px', textAlign: 'center', marginLeft: '30px', marginRight: '30px' }}>
            <span style={{ fontSize: '10.5px', fontWeight: 800, color: 'var(--infnet-dark-blue)' }}>
              ⚡ Bottleneck Central (Semântica Profunda: 28x28)
            </span>
          </div>
        </div>

        <div style={{ background: '#EFF8FC', padding: '6px 10px', borderRadius: '6px', fontSize: '11px', color: 'var(--infnet-dark-blue)' }}>
          As pontes horizontais (skip connections) transferem contornos nítidos para o decoder.
        </div>
      </div>

      {/* 2. Output Mask & Loss */}
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
              Classificação por Pixel (Máscara Densa)
            </span>
            <span className="badge badge-green">Saída [C, H, W]</span>
          </div>

          <div style={{ background: '#F0FDF4', border: '1px solid #DCFCE7', borderRadius: '6px', padding: '8px', textAlign: 'center', margin: '8px 0' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Função de Custo Cross-Entropy por Pixel:</div>
            <div style={{ fontSize: '11.5px', marginTop: '2px' }}>
              <MathView math="\mathcal{L}_{\text{pixel}} = -\frac{1}{HW}\sum_{i=1}^H \sum_{j=1}^W \sum_{c=1}^C y_{i,j,c} \log(\hat{y}_{i,j,c})" />
            </div>
          </div>
        </div>

        <div style={{ background: '#DCFCE7', padding: '8px 10px', borderRadius: '6px', fontSize: '11px', color: '#15803D', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <CheckCircle2 size={15} color="#15803D" />
          <span>Produz máscaras com <strong>a mesmíssima resolução</strong> da imagem original!</span>
        </div>
      </div>
    </div>
  );
}
