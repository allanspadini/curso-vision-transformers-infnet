import React from 'react';

export default function SwinShiftedWindowDiagram() {
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
            }}>SHIFTED WINDOWS</span>
            <span style={{ color: 'var(--infnet-dark-blue)', fontSize: '16px', fontWeight: 700 }}>
              SW-MSA: Construindo Conexões Cruzadas entre Janelas Vizinhas
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
            Deslocamento: (⌊M/2⌋, ⌊M/2⌋) = (3, 3) patches
          </span>
        </div>

        {/* Diagrama Comparativo Bloco l vs Bloco l+1 Claro */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          gap: '24px',
          alignItems: 'center',
          marginBottom: '16px'
        }}>
          {/* Bloco l: W-MSA Regular */}
          <div style={{
            background: '#F0F9FF',
            border: '1.5px solid #BAE6FD',
            borderRadius: '14px',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <div style={{ fontSize: '14px', fontWeight: 800, color: '#0369A1', marginBottom: '4px' }}>
              Camada ℓ: W-MSA (Partição Regular)
            </div>
            <div style={{ fontSize: '11px', color: '#64748B', marginBottom: '14px' }}>
              Grade estática com 4 janelas 2×2 isoladas
            </div>

            {/* Grid 2x2 */}
            <div style={{
              width: '180px',
              height: '180px',
              border: '2px solid #0284C7',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gridTemplateRows: '1fr 1fr',
              gap: '4px',
              padding: '4px',
              background: '#FFFFFF',
              borderRadius: '8px',
              marginBottom: '14px'
            }}>
              {['Janela (0,0)', 'Janela (0,1)', 'Janela (1,0)', 'Janela (1,1)'].map((name, i) => (
                <div key={i} style={{
                  background: '#E0F2FE',
                  border: '1.5px dashed #0284C7',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '11px',
                  color: '#0369A1',
                  fontWeight: 700
                }}>
                  {name}
                </div>
              ))}
            </div>

            <div style={{
              fontSize: '11px',
              color: '#C2410C',
              background: '#FFF7ED',
              border: '1px solid #FED7AA',
              padding: '6px 12px',
              borderRadius: '6px',
              textAlign: 'center',
              width: '100%',
              fontWeight: 600
            }}>
              ⚠️ Limitação: Patches de janelas distintas não se comunicam
            </div>
          </div>

          {/* Seta de Deslocamento */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #0284C7, #16A34A)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              fontWeight: 800,
              fontSize: '18px',
              boxShadow: '0 4px 12px rgba(2, 132, 199, 0.25)'
            }}>
              ➔
            </div>
            <span style={{ fontSize: '11px', color: '#15803D', fontWeight: 800, textAlign: 'center' }}>
              SHIFT<br />(+3, +3)
            </span>
          </div>

          {/* Bloco l+1: SW-MSA Deslocado */}
          <div style={{
            background: '#F0FDF4',
            border: '2px solid #86EFAC',
            borderRadius: '14px',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <div style={{ fontSize: '14px', fontWeight: 800, color: '#15803D', marginBottom: '4px' }}>
              Camada ℓ+1: SW-MSA (Janelas Deslocadas)
            </div>
            <div style={{ fontSize: '11px', color: '#64748B', marginBottom: '14px' }}>
              Grade transladada conecta bordas e centros
            </div>

            {/* Grid 3x3 */}
            <div style={{
              width: '180px',
              height: '180px',
              border: '2px solid #16A34A',
              display: 'grid',
              gridTemplateColumns: '1fr 2fr 1fr',
              gridTemplateRows: '1fr 2fr 1fr',
              gap: '3px',
              padding: '4px',
              background: '#FFFFFF',
              borderRadius: '8px',
              marginBottom: '14px'
            }}>
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} style={{
                  background: i === 4 ? '#DCFCE7' : '#FFEDD5',
                  border: i === 4 ? '2px solid #16A34A' : '1px dashed #EA580C',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '9px',
                  color: i === 4 ? '#14532D' : '#9A3412',
                  fontWeight: 800
                }}>
                  {i === 4 ? 'CENTRO' : `Sub ${i+1}`}
                </div>
              ))}
            </div>

            <div style={{
              fontSize: '11px',
              color: '#15803D',
              background: '#DCFCE7',
              border: '1px solid #BBF7D0',
              padding: '6px 12px',
              borderRadius: '6px',
              textAlign: 'center',
              width: '100%',
              fontWeight: 700
            }}>
              ✓ A janela central engloba pixels das 4 janelas da camada ℓ!
            </div>
          </div>
        </div>

        {/* Rodapé com o Desafio Prático */}
        <div style={{
          background: '#FFF7ED',
          border: '1px solid #FED7AA',
          borderRadius: '8px',
          padding: '10px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <span style={{ fontSize: '12px', color: '#7C2D12' }}>
            <strong style={{ color: '#C2410C' }}>Novo Gargalo de Engenharia:</strong> Ao deslocar a grade, surgiram <strong>9 sub-janelas de tamanhos diferentes</strong>. Fazer padding aumentaria computação; janelas separadas quebrariam a GPU.
          </span>
          <span style={{
            fontSize: '11px',
            color: '#C2410C',
            fontWeight: 800,
            background: '#FFEDD5',
            border: '1px solid #FED7AA',
            padding: '3px 8px',
            borderRadius: '4px'
          }}>
            Solução: Cyclic Shift ➔
          </span>
        </div>
      </div>
    </div>
  );
}
