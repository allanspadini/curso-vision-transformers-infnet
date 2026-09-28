import React from 'react';
import MathView from '../MathView';

export default function CLIPMultimodalSpaceDiagram() {
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
            REVISÃO TEÓRICA II
          </span>
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--infnet-dark-blue)' }}>
            CLIP: Arquitetura Multimodal e Projeção na Hiper-Esfera Unitária via Normalização L2
          </span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <span className="badge badge-purple" style={{ fontSize: '11px' }}>Dual Encoders</span>
          <span className="badge badge-cyan" style={{ fontSize: '11px' }}>Espaço Compartilhado ℝ^512</span>
          <span className="badge badge-green" style={{ fontSize: '11px' }}>Radford et al. (2021)</span>
        </div>
      </div>

      {/* Main Diagram Area */}
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
        {/* Dual Stream Architecture Diagram */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 140px 1fr',
          alignItems: 'center',
          gap: '14px',
          flex: 1
        }}>
          {/* Left Branch: Image Encoder */}
          <div style={{ background: '#F0FDF4', border: '1px solid #86EFAC', borderRadius: '10px', padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '18px' }}>🖼️</span>
                <strong style={{ fontSize: '12px', color: '#166534' }}>Torre Visual (Image Encoder)</strong>
              </div>
              <span className="badge badge-green" style={{ fontSize: '9px' }}>ViT-B/32 ou ResNet-50</span>
            </div>

            <div style={{ background: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '8px 12px' }}>
              <span style={{ fontSize: '10px', color: '#64748B' }}>Entrada Visual:</span>
              <div style={{ fontSize: '11.5px', fontFamily: 'var(--font-code)', fontWeight: 700, color: '#0A345D' }}>
                I ∈ ℝ^(B × 3 × 224 × 224) ➔ E_I(I) ∈ ℝ^(B × d_img)
              </div>
            </div>

            <div style={{ background: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '8px 12px' }}>
              <span style={{ fontSize: '10px', color: '#64748B' }}>Projeção Linear Multimodal:</span>
              <div style={{ fontSize: '11px', fontFamily: 'var(--font-code)', fontWeight: 700, color: '#166534' }}>
                v_i = W_I \cdot E_I(I_i) ∈ ℝ^(512)
              </div>
            </div>

            <div style={{ background: '#DCFCE7', border: '1px solid #86EFAC', borderRadius: '8px', padding: '8px 12px', textAlign: 'center' }}>
              <span style={{ fontSize: '9.5px', color: '#166534', fontWeight: 600 }}>Normalização L2 Obrigatória:</span>
              <div style={{ fontSize: '12px', marginTop: '2px' }}>
                <MathView math="\tilde{v}_i = \frac{v_i}{\|v_i\|_2} \implies \|\tilde{v}_i\|_2 = 1.0" />
              </div>
            </div>
          </div>

          {/* Central Multimodal Hub (Dot Product Matrix) */}
          <div style={{
            background: '#F8FAFC',
            border: '2px solid #0284C7',
            borderRadius: '12px',
            padding: '12px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <span style={{ fontSize: '10.5px', fontWeight: 800, color: '#0369A1', textAlign: 'center' }}>
              PRODUTO ESCALAR
            </span>

            <div style={{ background: '#FFFFFF', border: '1px solid #BAE6FD', borderRadius: '6px', padding: '6px 8px', textAlign: 'center' }}>
              <MathView math="S_{i,j} = \tilde{v}_i^T \tilde{u}_j" />
            </div>

            <div style={{ fontSize: '9.5px', color: '#0A345D', textAlign: 'center', lineHeight: '1.3' }}>
              Como <MathView math="\|\tilde{v}\|=\|\tilde{u}\|=1" />:<br />
              <strong style={{ color: '#0284C7' }}>S = cos(θ)</strong>
            </div>

            <span style={{ background: '#EFF6FF', border: '1px solid #93C5FD', color: '#1E40AF', fontSize: '9px', fontWeight: 700, padding: '2px 6px', borderRadius: '4px' }}>
              Escala [-1.0, 1.0]
            </span>
          </div>

          {/* Right Branch: Text Encoder */}
          <div style={{ background: '#EFF6FF', border: '1px solid #93C5FD', borderRadius: '10px', padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '18px' }}>📝</span>
                <strong style={{ fontSize: '12px', color: '#1E40AF' }}>Torre Textual (Text Encoder)</strong>
              </div>
              <span className="badge badge-cyan" style={{ fontSize: '9px' }}>Transformer Mascarado</span>
            </div>

            <div style={{ background: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '8px 12px' }}>
              <span style={{ fontSize: '10px', color: '#64748B' }}>Entrada de Texto Tokenizada:</span>
              <div style={{ fontSize: '11.5px', fontFamily: 'var(--font-code)', fontWeight: 700, color: '#0A345D' }}>
                T ∈ ℝ^(B × L) ➔ E_T(T) ∈ ℝ^(B × d_txt)
              </div>
            </div>

            <div style={{ background: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '8px 12px' }}>
              <span style={{ fontSize: '10px', color: '#64748B' }}>Projeção Linear Multimodal:</span>
              <div style={{ fontSize: '11px', fontFamily: 'var(--font-code)', fontWeight: 700, color: '#1E40AF' }}>
                u_j = W_T \cdot E_T(T_j) ∈ ℝ^(512)
              </div>
            </div>

            <div style={{ background: '#DBEAFE', border: '1px solid #93C5FD', borderRadius: '8px', padding: '8px 12px', textAlign: 'center' }}>
              <span style={{ fontSize: '9.5px', color: '#1E40AF', fontWeight: 600 }}>Normalização L2 Obrigatória:</span>
              <div style={{ fontSize: '12px', marginTop: '2px' }}>
                <MathView math="\tilde{u}_j = \frac{u_j}{\|u_j\|_2} \implies \|\tilde{u}_j\|_2 = 1.0" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Technical Principles */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '10px',
          marginTop: '12px'
        }}>
          <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '8px 12px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#0A345D' }}>1. Zero-Shot Retrieval</span>
            <p style={{ fontSize: '10px', color: '#475569', margin: '3px 0 0' }}>
              Não exige treino adicional: o modelo compara imagens com qualquer texto novo computando diretamente a similaridade de cosseno.
            </p>
          </div>
          <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '8px 12px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#0A345D' }}>2. Geometria Esférica</span>
            <p style={{ fontSize: '10px', color: '#475569', margin: '3px 0 0' }}>
              Todos os vetores residem na superfície de uma hiper-esfera unitária <MathView math="\mathbb{S}^{511}" />, eliminando a influência de normas arbitrárias.
            </p>
          </div>
          <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '8px 12px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#0A345D' }}>3. Simetria Contrastiva</span>
            <p style={{ fontSize: '10px', color: '#475569', margin: '3px 0 0' }}>
              O treinamento maximiza pares verdadeiros <MathView math="(I_i, T_i)" /> e minimiza pares espúrios <MathView math="(I_i, T_j)" /> ao longo de linhas e colunas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
