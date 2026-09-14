import React from 'react';

export default function CutMixMathVisualDiagram() {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {/* Banner Superior */}
      <div style={{
        background: '#FFF7ED',
        border: '1px solid #FED7AA',
        borderRadius: '8px',
        padding: '8px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ fontSize: '12.5px', color: '#9A3412', fontWeight: 600 }}>
          📐 <strong>A Geometria Elegante do CutMix:</strong> A proporção de área dos pixels determina com precisão absoluta os pesos dos rótulos.
        </div>
        <span className="badge badge-orange">Distribuição Beta(α, α)</span>
      </div>

      {/* Grid Principal: 3 Etapas Algébricas em Formato Visual */}
      <div style={{
        flex: 1,
        background: '#FFFFFF',
        borderRadius: '12px',
        border: '1px solid #E2E8F0',
        padding: '16px 20px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: '14px',
        minHeight: 0
      }}>
        {/* Etapa 1: Amostragem de Lambda e Caixa Delimitadora */}
        <div style={{
          background: '#F8FAFC',
          borderRadius: '10px',
          border: '1px solid #E2E8F0',
          padding: '14px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <span className="badge badge-cyan" style={{ marginBottom: '6px' }}>Passo 1</span>
            <h4 style={{ fontSize: '14px', color: 'var(--infnet-dark-blue)', margin: '0 0 6px 0' }}>
              Caixa Bounding Box
            </h4>
            <p style={{ fontSize: '11.5px', color: '#64748B', margin: 0, lineHeight: 1.4 }}>
              Sorteia-se λ a partir da distribuição Beta(1.0, 1.0) e calcula-se a largura e altura da caixa:
            </p>
          </div>

          <div style={{
            background: '#FFFFFF',
            border: '1px solid #CBD5E1',
            borderRadius: '6px',
            padding: '10px',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: '#0A345D',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px'
          }}>
            <div>λ ~ Beta(α, α)</div>
            <div>rw = W · √(1 - λ)</div>
            <div>rh = H · √(1 - λ)</div>
            <div style={{ color: '#16A34A', fontWeight: 700, marginTop: '4px' }}>Área do corte = (1 - λ)</div>
          </div>

          <div style={{ fontSize: '11px', color: '#475569' }}>
            A raiz quadrada garante que a área da caixa retangular seja exatamente proporcional a (1 - λ).
          </div>
        </div>

        {/* Etapa 2: Fusão de Imagens via Máscara Binária */}
        <div style={{
          background: '#F8FAFC',
          borderRadius: '10px',
          border: '1px solid #E2E8F0',
          padding: '14px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <span className="badge badge-purple" style={{ marginBottom: '6px' }}>Passo 2</span>
            <h4 style={{ fontSize: '14px', color: 'var(--infnet-dark-blue)', margin: '0 0 6px 0' }}>
              Máscara Binária M
            </h4>
            <p style={{ fontSize: '11.5px', color: '#64748B', margin: 0, lineHeight: 1.4 }}>
              Cria-se uma máscara M onde os pixels dentro da caixa valem 0 e fora valem 1:
            </p>
          </div>

          <div style={{
            background: '#FFFFFF',
            border: '1px solid #CBD5E1',
            borderRadius: '6px',
            padding: '10px',
            fontFamily: 'var(--font-mono)',
            fontSize: '11.5px',
            color: '#7E22CE',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            textAlign: 'center'
          }}>
            <div style={{ fontWeight: 800 }}>x̃ = M ⊙ x_A + (1 - M) ⊙ x_B</div>
            <div style={{ fontSize: '10px', color: '#64748B' }}>⊙ = Multiplicação Elemento a Elemento</div>
          </div>

          <div style={{ fontSize: '11px', color: '#475569' }}>
            A imagem resultante x̃ preserva a textura 100% natural de ambas as fotos, sem distorcer as frequências espaciais.
          </div>
        </div>

        {/* Etapa 3: Rótulos Suaves e Função de Custo */}
        <div style={{
          background: '#F8FAFC',
          borderRadius: '10px',
          border: '1px solid #E2E8F0',
          padding: '14px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <span className="badge badge-green" style={{ marginBottom: '6px' }}>Passo 3</span>
            <h4 style={{ fontSize: '14px', color: 'var(--infnet-dark-blue)', margin: '0 0 6px 0' }}>
              Rótulos Suaves (Soft Labels)
            </h4>
            <p style={{ fontSize: '11.5px', color: '#64748B', margin: 0, lineHeight: 1.4 }}>
              O alvo não é mais binário 0 ou 1, mas sim uma combinação linear proporcional:
            </p>
          </div>

          <div style={{
            background: '#FFFFFF',
            border: '1px solid #CBD5E1',
            borderRadius: '6px',
            padding: '10px',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: '#166534',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px'
          }}>
            <div style={{ fontWeight: 800 }}>ỹ = λ · y_A + (1 - λ) · y_B</div>
            <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '4px', color: '#0A345D' }}>
              Loss = λ · L(ŷ, y_A) + (1 - λ) · L(ŷ, y_B)
            </div>
          </div>

          <div style={{ fontSize: '11px', color: '#475569' }}>
            A entropia cruzada pondera a predição pela fração exata de área visível de cada objeto.
          </div>
        </div>
      </div>
    </div>
  );
}
