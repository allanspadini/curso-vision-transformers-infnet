import React, { useState } from 'react';

export default function SwinWindowLab() {
  const [activeStep, setActiveStep] = useState('w_msa'); // 'w_msa' | 'sw_msa' | 'cyclic'
  const [highlightWindow, setHighlightWindow] = useState(null);

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      padding: '8px 24px',
      boxSizing: 'border-box'
    }}>
      {/* Header Claro */}
      <div style={{
        background: '#FFFFFF',
        border: '1px solid #E2E8F0',
        borderRadius: '12px',
        padding: '10px 18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '12px',
        boxShadow: '0 2px 8px rgba(10, 52, 93, 0.05)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{
            background: '#E0F2FE',
            color: '#0369A1',
            padding: '3px 8px',
            borderRadius: '4px',
            fontSize: '11px',
            fontWeight: 800
          }}>LAB INTERATIVO</span>
          <span style={{ color: 'var(--infnet-dark-blue)', fontSize: '14px', fontWeight: 700 }}>
            Simulador de Janelas do Swin: W-MSA, Shifted Windows (SW-MSA) & Máscara de Atenção
          </span>
        </div>

        {/* Seletor de Passo */}
        <div style={{ display: 'flex', gap: '8px' }}>
          {[
            { id: 'w_msa', label: '1. W-MSA (Regular)' },
            { id: 'sw_msa', label: '2. SW-MSA (Shifted)' },
            { id: 'cyclic', label: '3. Cyclic Shift & Mask' }
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => {
                setActiveStep(btn.id);
                setHighlightWindow(null);
              }}
              style={{
                background: activeStep === btn.id ? '#0284C7' : '#F8FAFC',
                color: activeStep === btn.id ? '#FFFFFF' : '#475569',
                border: activeStep === btn.id ? '1px solid #0284C7' : '1px solid #CBD5E1',
                padding: '4px 12px',
                borderRadius: '6px',
                fontSize: '11px',
                cursor: 'pointer',
                fontWeight: activeStep === btn.id ? 800 : 500
              }}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Principal */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '420px 1fr',
        gap: '18px',
        flex: 1
      }}>
        {/* Lado Esquerdo: Grade Gráfica Clara */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: '12px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 4px 12px rgba(10, 52, 93, 0.04)'
        }}>
          <div style={{ width: '100%', textAlign: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--infnet-dark-blue)' }}>
              {activeStep === 'w_msa' && 'Grade Regular 4×4 de Janelas (Camada ℓ)'}
              {activeStep === 'sw_msa' && 'Grade Deslocada com Shift (+2, +2) (Camada ℓ+1)'}
              {activeStep === 'cyclic' && 'Imagem com Cyclic Shift e Reordenação Vetorial'}
            </span>
          </div>

          {/* Renderização da Grade 8x8 Clara */}
          <div style={{
            width: '240px',
            height: '240px',
            background: '#F8FAFC',
            border: '2px solid #CBD5E1',
            borderRadius: '8px',
            display: 'grid',
            gridTemplateColumns: 'repeat(8, 1fr)',
            gridTemplateRows: 'repeat(8, 1fr)',
            gap: '2px',
            padding: '4px',
            position: 'relative'
          }}>
            {Array.from({ length: 64 }).map((_, idx) => {
              const row = Math.floor(idx / 8);
              const col = idx % 8;

              let windowId = 0;
              let isSpecialCorner = false;

              if (activeStep === 'w_msa') {
                const winRow = Math.floor(row / 4);
                const winCol = Math.floor(col / 4);
                windowId = winRow * 2 + winCol;
              } else if (activeStep === 'sw_msa') {
                const shiftedRow = (row + 2) % 8;
                const shiftedCol = (col + 2) % 8;
                const winRow = Math.floor(shiftedRow / 4);
                const winCol = Math.floor(shiftedCol / 4);
                windowId = winRow * 2 + winCol;
                if (row < 2 || col < 2) isSpecialCorner = true;
              } else {
                if (row >= 6 && col >= 6) windowId = 99;
                else windowId = Math.floor(row / 4) * 2 + Math.floor(col / 4);
              }

              const colors = ['#0284C7', '#16A34A', '#EA580C', '#9333EA'];
              const lightColors = ['#E0F2FE', '#DCFCE7', '#FFEDD5', '#F3E8FF'];
              const baseColor = colors[windowId % colors.length];
              const baseLight = lightColors[windowId % lightColors.length];

              return (
                <div
                  key={idx}
                  onMouseEnter={() => setHighlightWindow(windowId)}
                  onMouseLeave={() => setHighlightWindow(null)}
                  style={{
                    background:
                      highlightWindow === windowId
                        ? '#0F172A'
                        : isSpecialCorner
                        ? '#FEE2E2'
                        : baseLight,
                    border: isSpecialCorner ? '1px solid #DC2626' : `1px solid ${baseColor}`,
                    borderRadius: '2px',
                    transition: 'all 0.15s ease',
                    cursor: 'pointer'
                  }}
                />
              );
            })}
          </div>

          <div style={{ fontSize: '11px', color: '#64748B', textAlign: 'center', marginTop: '10px' }}>
            Passe o mouse sobre os blocos para destacar a área de cobertura da autoatenção local.
          </div>
        </div>

        {/* Lado Direito: Análise da Mecânica & Máscara Clara */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: '12px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: '0 4px 12px rgba(10, 52, 93, 0.04)'
        }}>
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '12px',
              borderBottom: '1px solid #E2E8F0',
              paddingBottom: '8px'
            }}>
              <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--infnet-dark-blue)' }}>
                Análise da Camada Selecionada
              </span>
              <span style={{
                fontFamily: 'Fira Code',
                fontSize: '11px',
                color: '#0369A1',
                background: '#E0F2FE',
                padding: '3px 8px',
                borderRadius: '4px',
                fontWeight: 700
              }}>
                Tamanho da Janela M = 7
              </span>
            </div>

            {activeStep === 'w_msa' && (
              <div>
                <div style={{ fontSize: '12px', fontWeight: 800, color: '#0369A1', marginBottom: '4px' }}>
                  Atenção Local Pura (W-MSA)
                </div>
                <p style={{ fontSize: '12px', color: '#334155', lineHeight: '1.5' }}>
                  A imagem é fatiada em janelas não sobrepostas. Os 49 patches dentro de cada janela calculam autoatenção com custo estritamente local: <code style={{ color: '#15803D', fontWeight: 700 }}>Ω = 4hwC² + 2M²hwC</code>.
                </p>
                <div style={{
                  background: '#FFF7ED',
                  border: '1px solid #FED7AA',
                  borderRadius: '8px',
                  padding: '10px',
                  fontSize: '11px',
                  color: '#7C2D12',
                  marginTop: '10px'
                }}>
                  ⚠️ <strong>A Falha:</strong> Não há comunicação entre a Janela (0,0) e a Janela (0,1). Se parássemos aqui, o modelo perderia o contexto de objetos grandes que cruzam as fronteiras.
                </div>
              </div>
            )}

            {activeStep === 'sw_msa' && (
              <div>
                <div style={{ fontSize: '12px', fontWeight: 800, color: '#15803D', marginBottom: '4px' }}>
                  Deslocamento de Grade (SW-MSA)
                </div>
                <p style={{ fontSize: '12px', color: '#334155', lineHeight: '1.5' }}>
                  A grade de janelas é transladada por <code style={{ color: '#15803D', fontWeight: 700 }}>(3, 3)</code> patches. As novas janelas centrais agregam partes das 4 janelas da camada anterior, restaurando a capacidade relacional global.
                </p>
                <div style={{
                  background: '#F0F9FF',
                  border: '1px solid #BAE6FD',
                  borderRadius: '8px',
                  padding: '10px',
                  fontSize: '11px',
                  color: '#0369A1',
                  marginTop: '10px'
                }}>
                  🧩 <strong>O Dilema:</strong> O deslocamento gerou 9 sub-janelas de tamanhos diferentes (cantos de 2×2, bordas de 2×4 e centro de 4×4). Como executar isso na GPU sem fragmentação?
                </div>
              </div>
            )}

            {activeStep === 'cyclic' && (
              <div>
                <div style={{ fontSize: '12px', fontWeight: 800, color: '#C2410C', marginBottom: '4px' }}>
                  Cyclic Shift & Masked Attention Matrix
                </div>
                <p style={{ fontSize: '12px', color: '#334155', lineHeight: '1.5' }}>
                  Ao rolar as bordas superiores e esquerdas para a base e direita, a GPU continua enxergando <strong>exatamente as mesmas 4 janelas M×M</strong> regulares!
                </p>

                <div style={{
                  background: '#F8FAFC',
                  border: '1px solid #CBD5E1',
                  borderRadius: '8px',
                  padding: '10px',
                  marginTop: '8px'
                }}>
                  <div style={{ fontSize: '10px', color: '#64748B', marginBottom: '4px', fontWeight: 700 }}>
                    MATRIZ DE MÁSCARA DE ATENÇÃO (Mask ∈ ℝ^{'{49×49}'}):
                  </div>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '4px',
                    fontFamily: 'Fira Code',
                    fontSize: '11px',
                    textAlign: 'center'
                  }}>
                    <div style={{ background: '#DCFCE7', padding: '4px', color: '#14532D', borderRadius: '3px', fontWeight: 700 }}>0.0</div>
                    <div style={{ background: '#FEE2E2', padding: '4px', color: '#DC2626', borderRadius: '3px', fontWeight: 700 }}>-100</div>
                    <div style={{ background: '#FEE2E2', padding: '4px', color: '#DC2626', borderRadius: '3px', fontWeight: 700 }}>-100</div>
                    <div style={{ background: '#DCFCE7', padding: '4px', color: '#14532D', borderRadius: '3px', fontWeight: 700 }}>0.0</div>
                  </div>
                  <div style={{ fontSize: '10px', color: '#475569', marginTop: '6px' }}>
                    O valor <code style={{ color: '#DC2626', fontWeight: 700 }}>-100</code> no Softmax anula a atenção entre patches que só ficaram juntos devido à rolagem cíclica!
                  </div>
                </div>
              </div>
            )}
          </div>

          <div style={{
            background: '#F0FDF4',
            border: '1.5px solid #BBF7D0',
            borderRadius: '8px',
            padding: '10px 14px',
            fontSize: '11px',
            color: '#15803D',
            textAlign: 'center',
            marginTop: '12px',
            fontWeight: 700
          }}>
            ✓ O Swin Transformer alterna sistematicamente: Bloco Par = W-MSA ➔ Bloco Ímpar = SW-MSA.
          </div>
        </div>
      </div>
    </div>
  );
}
