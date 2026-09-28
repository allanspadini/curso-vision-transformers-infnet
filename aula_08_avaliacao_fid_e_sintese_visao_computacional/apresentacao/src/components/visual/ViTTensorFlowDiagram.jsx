import React from 'react';
import MathView from '../MathView';

export default function ViTTensorFlowDiagram() {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {/* Top Banner */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#EDF5FA',
        border: '1px solid #D0E3F0',
        borderRadius: '8px',
        padding: '10px 18px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{
            background: 'var(--infnet-dark-blue)',
            color: '#FFFFFF',
            fontSize: '11px',
            fontWeight: 700,
            padding: '3px 10px',
            borderRadius: '4px',
            fontFamily: 'var(--font-code)'
          }}>
            REVISÃO TEÓRICA I
          </span>
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--infnet-dark-blue)' }}>
            Vision Transformers (ViT): Rastreamento Tensorial do Patch Slicing à Atenção Global
          </span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <span className="badge badge-purple" style={{ fontSize: '11px' }}>Tokens [B, 197, 768]</span>
          <span className="badge badge-cyan" style={{ fontSize: '11px' }}>Global Self-Attention</span>
          <span className="badge badge-green" style={{ fontSize: '11px' }}>Dosovitskiy et al. (2020)</span>
        </div>
      </div>

      {/* Main Diagram */}
      <div style={{
        flex: 1,
        background: '#FFFFFF',
        border: '1px solid var(--border-light)',
        borderRadius: '12px',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: 'var(--shadow-sm)',
        minHeight: 0
      }}>
        {/* Step-by-step tensor pipeline */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '170px 24px 200px 24px 220px 24px 250px 24px 190px',
          alignItems: 'center',
          gap: '6px'
        }}>
          {/* Stage 1: Input Image */}
          <div style={{ background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '10px', textAlign: 'center' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#0A345D' }}>1. Imagem de Entrada</div>
            <div style={{ fontSize: '13px', fontWeight: 800, color: '#0284C7', margin: '4px 0', fontFamily: 'var(--font-code)' }}>
              [B, 3, 224, 224]
            </div>
            <span style={{ fontSize: '9px', color: '#64748B' }}>Mini-batch com C=3 e H=W=224</span>
          </div>

          <div style={{ textAlign: 'center', color: '#0284C7', fontWeight: 800 }}>➔</div>

          {/* Stage 2: Patch Slicing & Flatten */}
          <div style={{ background: '#F0F9FF', border: '1px solid #BAE6FD', borderRadius: '8px', padding: '10px', textAlign: 'center' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#0369A1' }}>2. Patch Slicing (P=16)</div>
            <div style={{ fontSize: '12px', fontWeight: 800, color: '#0369A1', margin: '4px 0', fontFamily: 'var(--font-code)' }}>
              [B, 196, 768]
            </div>
            <span style={{ fontSize: '9px', color: '#0284C7' }}>
              N = (224/16)² = 196 patches<br />Dim = 16×16×3 = 768
            </span>
          </div>

          <div style={{ textAlign: 'center', color: '#0284C7', fontWeight: 800 }}>➔</div>

          {/* Stage 3: Class Token & Positional Embedding */}
          <div style={{ background: '#FAF5FF', border: '1px solid #E9D5FF', borderRadius: '8px', padding: '10px', textAlign: 'center' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#6B21A8' }}>3. [CLS] + E_pos</div>
            <div style={{ fontSize: '12px', fontWeight: 800, color: '#6B21A8', margin: '4px 0', fontFamily: 'var(--font-code)' }}>
              [B, 197, 768]
            </div>
            <span style={{ fontSize: '9px', color: '#7E22CE' }}>
              Token agregador x_class<br />+ Posições espaciais 1D
            </span>
          </div>

          <div style={{ textAlign: 'center', color: '#6B21A8', fontWeight: 800 }}>➔</div>

          {/* Stage 4: Transformer Blocks */}
          <div style={{ background: '#F0FDF4', border: '1px solid #86EFAC', borderRadius: '8px', padding: '10px', textAlign: 'center' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#166534' }}>4. L=12 Blocos Encoder</div>
            <div style={{ fontSize: '12px', fontWeight: 800, color: '#166534', margin: '4px 0', fontFamily: 'var(--font-code)' }}>
              [B, 197, 768]
            </div>
            <span style={{ fontSize: '9px', color: '#15803D' }}>
              LayerNorm ➔ Multi-Head (h=12)<br />➔ Atalho Residual ➔ MLP (GELU)
            </span>
          </div>

          <div style={{ textAlign: 'center', color: '#166534', fontWeight: 800 }}>➔</div>

          {/* Stage 5: Classification Head */}
          <div style={{ background: '#FEF3C7', border: '1px solid #FCD34D', borderRadius: '8px', padding: '10px', textAlign: 'center' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#92400E' }}>5. Head Linear</div>
            <div style={{ fontSize: '12px', fontWeight: 800, color: '#92400E', margin: '4px 0', fontFamily: 'var(--font-code)' }}>
              [B, Num_Classes]
            </div>
            <span style={{ fontSize: '9px', color: '#78350F' }}>
              Apenas token [CLS] (índice 0)
            </span>
          </div>
        </div>

        {/* Structural Comparison Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.1fr 1fr',
          gap: '12px',
          margin: '12px 0 0'
        }}>
          {/* Card 1: Self-Attention Mechanics */}
          <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '12px 14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <strong style={{ fontSize: '11.5px', color: '#0A345D' }}>Mecanismo de Multi-Head Self-Attention (MSA)</strong>
              <span className="badge badge-purple" style={{ fontSize: '9px' }}>Campo Receptivo Global O(1)</span>
            </div>
            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '6px 12px', textAlign: 'center', marginBottom: '6px' }}>
              <MathView math="\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{Q K^T}{\sqrt{d_k}}\right) V, \quad Q, K, V \in \mathbb{R}^{B \times h \times 197 \times d_k}" />
            </div>
            <p style={{ fontSize: '10px', color: '#334155', margin: 0, lineHeight: '1.4' }}>
              Ao contrário das CNNs (onde o campo receptivo cresce lentamente camada por camada via kernels locais 3x3), no ViT <strong>todo patch atende diretamente a qualquer outro patch</strong> desde a primeira camada, permitindo raciocínio relacional e contexto global instantâneo.
            </p>
          </div>

          {/* Card 2: Inductive Bias & Fine-Tuning */}
          <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '12px 14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <strong style={{ fontSize: '11.5px', color: '#0A345D' }}>Viés Indutivo Fraco & Transfer Learning</strong>
              <span className="badge badge-green" style={{ fontSize: '9px' }}>Pré-Treino Mandatório</span>
            </div>
            <ul style={{ fontSize: '10px', color: '#334155', paddingLeft: '16px', margin: 0, lineHeight: '1.45' }}>
              <li><strong>Ausência de Viés Convolucional:</strong> O modelo não assume localidade nem invariância translacional nativa; precisa aprender todas as relações espaciais a partir de dados em larga escala.</li>
              <li><strong>Interpolação de Posição:</strong> Ao mudar a resolução (ex: 224x224 para 384x384), a grade de <MathView math="E_{pos}" /> é interpolada bicubicamente no espaço 2D.</li>
            </ul>
          </div>
        </div>

        {/* Bottom Rule */}
        <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '8px', padding: '6px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '10px', color: '#1E40AF' }}>
          <span>💡 <strong>Diretriz de Engenharia:</strong> Em datasets de domínio específico pequenos, utilize ViT pré-treinado no ImageNet (ex: ViT-B/16) com congelamento inicial ou lr reduzido (1e-4 a 1e-5).</span>
          <span style={{ fontFamily: 'var(--font-code)', fontWeight: 700 }}>torchvision.models.vit_b_16</span>
        </div>
      </div>
    </div>
  );
}
