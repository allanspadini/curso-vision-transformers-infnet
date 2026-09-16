import React from 'react';

export default function SwinWindowPartitionDiagram() {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '8px 24px',
      boxSizing: 'border-box'
    }}>
      <div style={{
        background: '#FFFFFF',
        border: '1px solid #E2E8F0',
        borderRadius: '16px',
        padding: '20px',
        boxShadow: '0 8px 24px rgba(10, 52, 93, 0.08)'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #E2E8F0',
          paddingBottom: '10px',
          marginBottom: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{
              background: '#E0F2FE',
              color: '#0369A1',
              padding: '4px 10px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 800
            }}>SWIN TRANSFORMER</span>
            <span style={{ color: 'var(--infnet-dark-blue)', fontSize: '16px', fontWeight: 700 }}>
              Window Multi-Head Self-Attention (W-MSA): Complexidade Linear O(N)
            </span>
          </div>
          <span style={{
            fontSize: '12px',
            color: '#0369A1',
            fontFamily: 'Fira Code',
            background: '#F0F9FF',
            border: '1px solid #BAE6FD',
            padding: '3px 10px',
            borderRadius: '6px',
            fontWeight: 600
          }}>
            Liu et al. • ICCV 2021 Best Paper (Marr Prize)
          </span>
        </div>

        {/* Comparação Gráfica: Global MSA vs W-MSA */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '20px',
          marginBottom: '16px'
        }}>
          {/* Global MSA */}
          <div style={{
            background: '#FFF7ED',
            border: '1.5px solid #FED7AA',
            borderRadius: '12px',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '13px', fontWeight: 800, color: '#C2410C' }}>
                1. Autoatenção Global (ViT Canônico)
              </span>
              <span style={{ fontSize: '11px', color: '#C2410C', fontFamily: 'Fira Code', fontWeight: 700 }}>O(N²)</span>
            </div>

            {/* Grid 4x4 */}
            <div style={{
              height: '110px',
              background: '#FFFFFF',
              border: '1px solid #FED7AA',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              marginBottom: '12px'
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 22px)',
                gap: '6px'
              }}>
                {Array.from({ length: 16 }).map((_, i) => (
                  <div key={i} style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '4px',
                    background: '#FFEDD5',
                    border: '1px solid #FB923C'
                  }} />
                ))}
              </div>
              <div style={{
                position: 'absolute',
                fontSize: '11px',
                color: '#7C2D12',
                background: 'rgba(255, 255, 255, 0.95)',
                padding: '4px 10px',
                borderRadius: '6px',
                border: '1px solid #FED7AA',
                fontWeight: 700
              }}>
                Cada patch calcula atenção com TODOS os outros
              </div>
            </div>

            <div style={{
              fontFamily: 'Fira Code',
              fontSize: '11px',
              color: '#7C2D12',
              background: '#FFFFFF',
              border: '1px solid #FED7AA',
              padding: '8px',
              borderRadius: '6px',
              marginBottom: '8px',
              fontWeight: 700
            }}>
              Ω(MSA) = 4·(h·w)·C² + 2·(h·w)²·C
            </div>
            <p style={{ fontSize: '11px', color: '#334155', margin: 0 }}>
              Para 3.136 patches em 224×224 (stride 4), o termo quadrático requer <strong>19.6 milhões de operações</strong> por canal!
            </p>
          </div>

          {/* Window MSA */}
          <div style={{
            background: '#F0F9FF',
            border: '2px solid #38BDF8',
            borderRadius: '12px',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '13px', fontWeight: 800, color: '#0369A1' }}>
                2. Window Self-Attention (W-MSA no Swin)
              </span>
              <span style={{ fontSize: '11px', color: '#15803D', fontFamily: 'Fira Code', fontWeight: 800 }}>O(N) LINEAR</span>
            </div>

            {/* Grid com 4 Janelas M x M */}
            <div style={{
              height: '110px',
              background: '#FFFFFF',
              border: '1px solid #BAE6FD',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              marginBottom: '12px'
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 60px)',
                gap: '8px'
              }}>
                {['Janela 1 (M×M)', 'Janela 2 (M×M)', 'Janela 3 (M×M)', 'Janela 4 (M×M)'].map((w, i) => (
                  <div key={i} style={{
                    width: '60px',
                    height: '42px',
                    borderRadius: '6px',
                    background: '#E0F2FE',
                    border: '1.5px solid #0284C7',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '9px',
                    fontWeight: 800,
                    color: '#0369A1',
                    textAlign: 'center'
                  }}>
                    {w}
                  </div>
                ))}
              </div>
            </div>

            <div style={{
              fontFamily: 'Fira Code',
              fontSize: '11px',
              color: '#0C4A6E',
              background: '#FFFFFF',
              border: '1px solid #BAE6FD',
              padding: '8px',
              borderRadius: '6px',
              marginBottom: '8px',
              fontWeight: 700
            }}>
              Ω(W-MSA) = 4·(h·w)·C² + 2·M²·(h·w)·C
            </div>
            <p style={{ fontSize: '11px', color: '#334155', margin: 0 }}>
              Com janela fixa <code style={{ color: '#0284C7', fontWeight: 700 }}>M=7</code> (49 patches), o termo de atenção escala estritamente <strong>linear em relação à área (h·w)</strong>!
            </p>
          </div>
        </div>

        {/* Rodapé Comparativo Numérico */}
        <div style={{
          background: '#F0FDF4',
          border: '1px solid #BBF7D0',
          borderRadius: '8px',
          padding: '10px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <span style={{ fontSize: '12px', color: '#166534' }}>
            <strong style={{ color: '#15803D' }}>Ganho de Eficiência:</strong> Para <code style={{ color: '#0F172A', fontWeight: 700 }}>hw = 56×56 = 3.136</code> patches e <code style={{ color: '#0F172A', fontWeight: 700 }}>M = 7</code>: W-MSA consome apenas <strong>0.3M ops</strong> contra <strong>19.6M ops</strong> da atenção global (economia de <strong>64×</strong>!).
          </span>
          <span style={{
            fontSize: '11px',
            color: '#15803D',
            fontWeight: 800,
            background: '#DCFCE7',
            padding: '3px 8px',
            borderRadius: '4px'
          }}>
            Viável para 4K e 8K
          </span>
        </div>
      </div>
    </div>
  );
}
