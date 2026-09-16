import React from 'react';

export default function SwinCyclicShiftDiagram() {
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
            }}>MECÂNICA ELEGANTE</span>
            <span style={{ color: 'var(--infnet-dark-blue)', fontSize: '16px', fontWeight: 700 }}>
              Cyclic Shift & Masked Attention: Vetorização Pura em GPU
            </span>
          </div>
          <span style={{
            fontSize: '12px',
            color: '#15803D',
            fontFamily: 'Fira Code',
            background: '#DCFCE7',
            border: '1px solid #BBF7D0',
            padding: '3px 10px',
            borderRadius: '6px',
            fontWeight: 700
          }}>
            Zero Padding • 4 Janelas Regulares M×M
          </span>
        </div>

        {/* 4 Passos Claros */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '14px',
          marginBottom: '16px'
        }}>
          {/* Passo 1 */}
          <div style={{
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: '12px',
            padding: '14px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--infnet-dark-blue)', marginBottom: '8px' }}>
              1. Partição com Shift
            </div>
            <div style={{
              width: '120px',
              height: '120px',
              border: '2px solid #CBD5E1',
              borderRadius: '6px',
              display: 'grid',
              gridTemplateColumns: '35px 1fr',
              gridTemplateRows: '35px 1fr',
              gap: '2px',
              padding: '2px',
              background: '#FFFFFF',
              marginBottom: '10px'
            }}>
              <div style={{ background: '#EA580C', borderRadius: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 800, color: '#FFF' }}>A</div>
              <div style={{ background: '#9333EA', borderRadius: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 800, color: '#FFF' }}>C</div>
              <div style={{ background: '#16A34A', borderRadius: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 800, color: '#FFF' }}>B</div>
              <div style={{ background: '#E2E8F0', borderRadius: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#475569', fontWeight: 700 }}>Base</div>
            </div>
            <p style={{ fontSize: '11px', color: '#475569', textAlign: 'center', margin: 0 }}>
              Blocos A, B e C ficam isolados nas bordas superiores e esquerdas.
            </p>
          </div>

          {/* Passo 2 */}
          <div style={{
            background: '#F0F9FF',
            border: '1.5px solid #BAE6FD',
            borderRadius: '12px',
            padding: '14px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <div style={{ fontSize: '12px', fontWeight: 800, color: '#0369A1', marginBottom: '8px' }}>
              2. Cyclic Shift (Rolagem)
            </div>
            <div style={{
              width: '120px',
              height: '120px',
              border: '2px solid #0284C7',
              borderRadius: '6px',
              display: 'grid',
              gridTemplateColumns: '1fr 35px',
              gridTemplateRows: '1fr 35px',
              gap: '2px',
              padding: '2px',
              background: '#FFFFFF',
              marginBottom: '10px'
            }}>
              <div style={{ background: '#E2E8F0', borderRadius: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#475569', fontWeight: 700 }}>Base</div>
              <div style={{ background: '#16A34A', borderRadius: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 800, color: '#FFF' }}>B</div>
              <div style={{ background: '#9333EA', borderRadius: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 800, color: '#FFF' }}>C</div>
              <div style={{ background: '#EA580C', borderRadius: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 800, color: '#FFF' }}>A</div>
            </div>
            <p style={{ fontSize: '11px', color: '#334155', textAlign: 'center', margin: 0 }}>
              A e C são rolados para a direita e base. Grade volta a ser 2×2 perfeita!
            </p>
          </div>

          {/* Passo 3 */}
          <div style={{
            background: '#F0FDF4',
            border: '1.5px solid #BBF7D0',
            borderRadius: '12px',
            padding: '14px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <div style={{ fontSize: '12px', fontWeight: 800, color: '#15803D', marginBottom: '8px' }}>
              3. Masked Attention
            </div>
            <div style={{
              width: '120px',
              height: '120px',
              border: '2px solid #16A34A',
              borderRadius: '6px',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gridTemplateRows: '1fr 1fr',
              gap: '2px',
              padding: '2px',
              background: '#FFFFFF',
              marginBottom: '10px'
            }}>
              <div style={{ background: '#DCFCE7', borderRadius: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', color: '#14532D', fontWeight: 800 }}>0.0</div>
              <div style={{ background: '#FEE2E2', borderRadius: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', color: '#DC2626', fontWeight: 800 }}>-100</div>
              <div style={{ background: '#FEE2E2', borderRadius: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', color: '#DC2626', fontWeight: 800 }}>-100</div>
              <div style={{ background: '#DCFCE7', borderRadius: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', color: '#14532D', fontWeight: 800 }}>0.0</div>
            </div>
            <p style={{ fontSize: '11px', color: '#334155', textAlign: 'center', margin: 0 }}>
              Soma <code style={{ color: '#DC2626', fontWeight: 700 }}>-100</code> aos pares não vizinhos. Softmax zera a atenção espúria!
            </p>
          </div>

          {/* Passo 4 */}
          <div style={{
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: '12px',
            padding: '14px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--infnet-dark-blue)', marginBottom: '8px' }}>
              4. Reverse Cyclic Shift
            </div>
            <div style={{
              width: '120px',
              height: '120px',
              border: '2px solid #CBD5E1',
              borderRadius: '6px',
              display: 'grid',
              gridTemplateColumns: '35px 1fr',
              gridTemplateRows: '35px 1fr',
              gap: '2px',
              padding: '2px',
              background: '#FFFFFF',
              marginBottom: '10px'
            }}>
              <div style={{ background: '#EA580C', borderRadius: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 800, color: '#FFF' }}>A</div>
              <div style={{ background: '#9333EA', borderRadius: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 800, color: '#FFF' }}>C</div>
              <div style={{ background: '#16A34A', borderRadius: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 800, color: '#FFF' }}>B</div>
              <div style={{ background: '#E2E8F0', borderRadius: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#475569', fontWeight: 700 }}>Base</div>
            </div>
            <p style={{ fontSize: '11px', color: '#475569', textAlign: 'center', margin: 0 }}>
              Rola os tensores de volta para as coordenadas espaciais originais da imagem.
            </p>
          </div>
        </div>

        {/* Rodapé Didático */}
        <div style={{
          background: '#F8FAFC',
          borderRadius: '8px',
          padding: '10px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          border: '1px solid #E2E8F0'
        }}>
          <span style={{ fontSize: '12px', color: '#334155' }}>
            <strong style={{ color: 'var(--infnet-dark-blue)' }}>Fórmula com Máscara:</strong> <code style={{ color: '#0369A1', fontWeight: 700 }}>Attention = Softmax( (Q·Kᵀ / √d) + Mask ) · V</code>. Graças a isso, o número de janelas é mantido exatamente em <code style={{ color: '#15803D', fontWeight: 700 }}>⌈H/M⌉ × ⌈W/M⌉</code> com processamento 100% paralelo na GPU.
          </span>
          <span style={{
            fontSize: '11px',
            color: '#15803D',
            fontWeight: 800,
            background: '#DCFCE7',
            padding: '4px 8px',
            borderRadius: '4px'
          }}>
            Eficiência Máxima em Silício
          </span>
        </div>
      </div>
    </div>
  );
}
