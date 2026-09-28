import React from 'react';
import MathView from '../MathView';

export default function FIDInceptionFeaturePipelineDiagram() {
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
            ARQUITETURA DE EXTRAÇÃO
          </span>
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--infnet-dark-blue)' }}>
            Pipeline do FID: Mapeamento de Imagens em Representações Latentes no Inception-v3 (pool3)
          </span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <span className="badge badge-purple" style={{ fontSize: '11px' }}>Inception-v3 (pool3)</span>
          <span className="badge badge-cyan" style={{ fontSize: '11px' }}>Espaço Contínuo R^2048</span>
          <span className="badge badge-green" style={{ fontSize: '11px' }}>Heusel et al. (2017)</span>
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
        {/* Dual Stream Flow Diagram */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', flex: 1, justifyContent: 'center' }}>
          {/* Stream 1: Real Images */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '220px 40px 240px 40px 260px 40px 260px',
            alignItems: 'center',
            background: '#F0FDF4',
            border: '1px solid #86EFAC',
            borderRadius: '10px',
            padding: '12px 16px'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '16px' }}>🖼️</span>
                <strong style={{ fontSize: '12px', color: '#166534' }}>Imagens Reais (p_data)</strong>
              </div>
              <span style={{ fontSize: '10.5px', color: '#475569', fontFamily: 'var(--font-code)' }}>
                N amostras [N, 3, 299, 299]
              </span>
            </div>

            <div style={{ textAlign: 'center', color: '#15803D', fontWeight: 800, fontSize: '18px' }}>➔</div>

            <div style={{
              background: '#FFFFFF',
              border: '1px solid #CBD5E1',
              borderRadius: '8px',
              padding: '8px 10px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#0A345D' }}>Inception-v3 (Congelado)</div>
              <div style={{ fontSize: '9.5px', color: '#64748B' }}>Camada Global Average Pooling</div>
              <span style={{ fontSize: '10px', color: '#7C3AED', fontWeight: 700 }}>pool3 (2048 canais)</span>
            </div>

            <div style={{ textAlign: 'center', color: '#15803D', fontWeight: 800, fontSize: '18px' }}>➔</div>

            <div style={{
              background: '#FFFFFF',
              border: '1px solid #CBD5E1',
              borderRadius: '8px',
              padding: '8px 10px'
            }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#166534' }}>Embeddings Reais</div>
              <div style={{ fontSize: '10.5px', color: '#0F172A', fontFamily: 'var(--font-code)' }}>
                F_r ∈ ℝ^(N × 2048)
              </div>
              <div style={{ fontSize: '9px', color: '#64748B' }}>Ativações semânticas contínuas</div>
            </div>

            <div style={{ textAlign: 'center', color: '#15803D', fontWeight: 800, fontSize: '18px' }}>➔</div>

            <div style={{
              background: '#DCFCE7',
              border: '1px solid #86EFAC',
              borderRadius: '8px',
              padding: '8px 12px'
            }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#166534' }}>Distribuição Gaussiana Real</div>
              <div style={{ fontSize: '10px', color: '#14532D', margin: '2px 0' }}>
                <MathView math="\mu_r \in \mathbb{R}^{2048}, \quad \Sigma_r \in \mathbb{R}^{2048 \times 2048}" />
              </div>
              <div style={{ fontSize: '9px', color: '#15803D' }}>Média empírica e covariância</div>
            </div>
          </div>

          {/* Central Comparison Hub */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            padding: '6px 0'
          }}>
            <div style={{ height: '1px', flex: 1, background: '#CBD5E1' }}></div>
            <div style={{
              background: '#EFF6FF',
              border: '2px solid #3B82F6',
              borderRadius: '20px',
              padding: '6px 18px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <span style={{ fontSize: '12px', fontWeight: 800, color: '#1E40AF' }}>
                Comparação de Distribuições Multivariadas:
              </span>
              <MathView math="d^2 \left( \mathcal{N}(\mu_r, \Sigma_r), \, \mathcal{N}(\mu_g, \Sigma_g) \right)" />
            </div>
            <div style={{ height: '1px', flex: 1, background: '#CBD5E1' }}></div>
          </div>

          {/* Stream 2: Generated Images */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '220px 40px 240px 40px 260px 40px 260px',
            alignItems: 'center',
            background: '#EFF6FF',
            border: '1px solid #93C5FD',
            borderRadius: '10px',
            padding: '12px 16px'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '16px' }}>🎨</span>
                <strong style={{ fontSize: '12px', color: '#1E40AF' }}>Imagens Sintéticas (G(z))</strong>
              </div>
              <span style={{ fontSize: '10.5px', color: '#475569', fontFamily: 'var(--font-code)' }}>
                N amostras [N, 3, 299, 299]
              </span>
            </div>

            <div style={{ textAlign: 'center', color: '#2563EB', fontWeight: 800, fontSize: '18px' }}>➔</div>

            <div style={{
              background: '#FFFFFF',
              border: '1px solid #CBD5E1',
              borderRadius: '8px',
              padding: '8px 10px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#0A345D' }}>Inception-v3 (Mesmos Pesos)</div>
              <div style={{ fontSize: '9.5px', color: '#64748B' }}>Camada Global Average Pooling</div>
              <span style={{ fontSize: '10px', color: '#7C3AED', fontWeight: 700 }}>pool3 (2048 canais)</span>
            </div>

            <div style={{ textAlign: 'center', color: '#2563EB', fontWeight: 800, fontSize: '18px' }}>➔</div>

            <div style={{
              background: '#FFFFFF',
              border: '1px solid #CBD5E1',
              borderRadius: '8px',
              padding: '8px 10px'
            }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#1E40AF' }}>Embeddings Sintéticos</div>
              <div style={{ fontSize: '10.5px', color: '#0F172A', fontFamily: 'var(--font-code)' }}>
                F_g ∈ ℝ^(N × 2048)
              </div>
              <div style={{ fontSize: '9px', color: '#64748B' }}>Ativações geradas pelo modelo</div>
            </div>

            <div style={{ textAlign: 'center', color: '#2563EB', fontWeight: 800, fontSize: '18px' }}>➔</div>

            <div style={{
              background: '#DBEAFE',
              border: '1px solid #93C5FD',
              borderRadius: '8px',
              padding: '8px 12px'
            }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#1E40AF' }}>Distribuição Gaussiana Sintética</div>
              <div style={{ fontSize: '10px', color: '#1E3A8A', margin: '2px 0' }}>
                <MathView math="\mu_g \in \mathbb{R}^{2048}, \quad \Sigma_g \in \mathbb{R}^{2048 \times 2048}" />
              </div>
              <div style={{ fontSize: '9px', color: '#2563EB' }}>Média empírica e covariância</div>
            </div>
          </div>
        </div>

        {/* Bottom Technical Notes */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '10px',
          marginTop: '12px'
        }}>
          <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '8px 12px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#0A345D' }}>1. Abstração Semântica</span>
            <p style={{ fontSize: '10px', color: '#475569', margin: '3px 0 0' }}>
              A camada `pool3` captura conceitos estruturais (partes de objetos, contornos, iluminação), descartando variações triviais de pixels.
            </p>
          </div>
          <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '8px 12px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#0A345D' }}>2. Suposição Gaussiana</span>
            <p style={{ fontSize: '10px', color: '#475569', margin: '3px 0 0' }}>
              Embora o espaço de features não seja perfeitamente gaussiano, a aproximação multivariada é analiticamente tratável e robusta na prática.
            </p>
          </div>
          <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '8px 12px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#0A345D' }}>3. Resolução Padrão</span>
            <p style={{ fontSize: '10px', color: '#475569', margin: '3px 0 0' }}>
              Todas as imagens são redimensionadas para <MathView math="299 \times 299" /> antes do Inception-v3 com interpolação bicúbica consistente.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
