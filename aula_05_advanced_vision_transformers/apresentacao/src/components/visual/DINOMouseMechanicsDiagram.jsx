import React from 'react';

export default function DINOMouseMechanicsDiagram() {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '8px 24px',
      boxSizing: 'border-box'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '1260px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '20px'
      }}>
        {/* Lado Esquerdo: As 2 Salvaguardas Anti-Colapso */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: '16px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: '0 4px 20px rgba(10, 52, 93, 0.08)'
        }}>
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '14px',
              borderBottom: '1px solid #E2E8F0',
              paddingBottom: '8px'
            }}>
              <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
                Prevenção de Colapso de Representação
              </span>
              <span style={{
                background: '#FAF5FF',
                color: '#7E22CE',
                border: '1px solid #E9D5FF',
                fontSize: '11px',
                fontWeight: 700,
                padding: '3px 8px',
                borderRadius: '4px'
              }}>
                Centering + Sharpening
              </span>
            </div>

            {/* Mecanismo 1: Centering */}
            <div style={{
              background: '#F0F9FF',
              border: '1px solid #BAE6FD',
              borderRadius: '10px',
              padding: '12px',
              marginBottom: '12px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#0284C7' }}>
                  1. Centering (Subtração da Média Móvel)
                </span>
                <span style={{ fontSize: '10px', color: '#0369A1', fontFamily: 'Fira Code', fontWeight: 600 }}>g_t(x) ← g_t(x) - c</span>
              </div>
              <p style={{ fontSize: '11px', color: '#334155', margin: 0, lineHeight: '1.4' }}>
                O vetor de centro <code style={{ color: '#0284C7', fontWeight: 700 }}>c</code> acumula a média móvel dos logits do professor. Impede que <strong>uma dimensão domine</strong> e cause colapso determinístico.
              </p>
              <div style={{ fontSize: '10px', color: '#EA580C', fontWeight: 600, marginTop: '4px' }}>
                ↳ Efeito colateral se usado sozinho: Força distribuição para uniforme plana!
              </div>
            </div>

            {/* Mecanismo 2: Sharpening */}
            <div style={{
              background: '#FFF7ED',
              border: '1px solid #FED7AA',
              borderRadius: '10px',
              padding: '12px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#EA580C' }}>
                  2. Sharpening (Agudização Térmica)
                </span>
                <span style={{ fontSize: '10px', color: '#C2410C', fontFamily: 'Fira Code', fontWeight: 600 }}>τ_t &lt; τ_s (0.04 vs 0.1)</span>
              </div>
              <p style={{ fontSize: '11px', color: '#334155', margin: 0, lineHeight: '1.4' }}>
                Ao dividir os logits do professor por uma temperatura muito baixa (<code style={{ color: '#EA580C', fontWeight: 700 }}>τ_t = 0.04</code>), o Softmax cria picos acentuados de certeza. Impede o <strong>colapso uniforme</strong>!
              </p>
            </div>
          </div>

          <div style={{
            background: '#F0FDF4',
            border: '1px solid #BBF7D0',
            borderRadius: '8px',
            padding: '10px 12px',
            marginTop: '12px',
            fontSize: '11px',
            color: '#15803D',
            fontWeight: 600,
            textAlign: 'center'
          }}>
            ⚖️ O equilíbrio das duas forças opostas garante convergência auto-supervisionada estável!
          </div>
        </div>

        {/* Lado Direito: A Descoberta da Propriedade Emergente */}
        <div style={{
          background: '#FFFFFF',
          border: '2px solid #86EFAC',
          borderRadius: '16px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: '0 4px 20px rgba(22, 163, 74, 0.08)'
        }}>
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '14px',
              borderBottom: '1px solid #E2E8F0',
              paddingBottom: '8px'
            }}>
              <span style={{ fontSize: '15px', fontWeight: 700, color: '#15803D' }}>
                A Propriedade Emergente Revolucionária
              </span>
              <span style={{
                background: '#F0FDF4',
                color: '#15803D',
                border: '1px solid #BBF7D0',
                fontSize: '11px',
                fontWeight: 700,
                padding: '3px 8px',
                borderRadius: '4px'
              }}>
                Segmentação sem Supervisão
              </span>
            </div>

            {/* Simulação Visual de Mapas de Atenção */}
            <div style={{
              background: '#F8FAFC',
              borderRadius: '10px',
              padding: '14px',
              border: '1px dashed #86EFAC',
              marginBottom: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around'
            }}>
              {/* Imagem Original Simbolizada */}
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '8px',
                  background: '#EFF6FF',
                  border: '1px solid #93C5FD',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px',
                  marginBottom: '4px'
                }}>
                  🦅
                </div>
                <span style={{ fontSize: '10px', color: '#64748B', fontWeight: 600 }}>RGB Original</span>
              </div>

              <span style={{ color: '#16A34A', fontSize: '20px', fontWeight: 700 }}>➔</span>

              {/* Mapa de Atenção ViT Supervisionado */}
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '8px',
                  background: 'radial-gradient(circle, rgba(254, 215, 170, 0.9) 20%, rgba(255, 247, 237, 0.95) 70%)',
                  border: '1px solid #FED7AA',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '10px',
                  color: '#C2410C',
                  fontWeight: 700,
                  textAlign: 'center',
                  marginBottom: '4px'
                }}>
                  Atenção Difusa
                </div>
                <span style={{ fontSize: '10px', color: '#EA580C', fontWeight: 600 }}>ViT Supervisionado</span>
              </div>

              <span style={{ color: '#16A34A', fontSize: '20px', fontWeight: 700 }}>➔</span>

              {/* Mapa de Atenção DINO */}
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '8px',
                  background: 'radial-gradient(circle, #86EFAC 45%, #DCFCE7 75%)',
                  border: '2px solid #16A34A',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '10px',
                  color: '#14532D',
                  fontWeight: 900,
                  textAlign: 'center',
                  boxShadow: '0 0 12px rgba(22, 163, 74, 0.25)',
                  marginBottom: '4px'
                }}>
                  Máscara Exata
                </div>
                <span style={{ fontSize: '10px', color: '#15803D', fontWeight: 700 }}>DINO (Emergente)</span>
              </div>
            </div>

            <p style={{ fontSize: '12px', color: '#334155', lineHeight: '1.5', margin: 0 }}>
              Ao inspecionar a autoatenção da última camada do token <code style={{ color: '#0284C7', fontWeight: 700 }}>[CLS]</code>, o DINO produz automaticamente <strong>máscaras de segmentação com bordas nítidas</strong> do objeto em primeiro plano.
            </p>
          </div>

          <div style={{
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: '6px',
            padding: '8px 12px',
            fontSize: '11px',
            color: '#475569',
            marginTop: '10px'
          }}>
            🌟 Cada cabeça de atenção especializa-se em partes anatômicas distintas sem jamais ter recebido supervisão de partes de objetos!
          </div>
        </div>
      </div>
    </div>
  );
}
