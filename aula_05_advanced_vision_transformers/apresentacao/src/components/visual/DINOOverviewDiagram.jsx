import React from 'react';

export default function DINOOverviewDiagram() {
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
        background: '#FFFFFF',
        border: '1px solid #E2E8F0',
        borderRadius: '16px',
        padding: '20px',
        boxShadow: '0 4px 20px rgba(10, 52, 93, 0.08)'
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
              background: '#9333EA',
              color: '#FFFFFF',
              padding: '4px 10px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 700
            }}>DINO (ICCV 2021)</span>
            <span style={{ color: 'var(--infnet-dark-blue)', fontSize: '15px', fontWeight: 700 }}>
              Self-distillation with NO labels: Treinamento Auto-Supervisionado em ViT
            </span>
          </div>
          <span style={{
            fontSize: '12px',
            color: '#7E22CE',
            fontFamily: 'Fira Code',
            background: '#FAF5FF',
            border: '1px solid #E9D5FF',
            padding: '3px 10px',
            borderRadius: '6px',
            fontWeight: 600
          }}>
            Zero anotação manual • Sem pares negativos
          </span>
        </div>

        {/* Diagrama Central: Multi-Crop + Student / Teacher */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '270px 1fr',
          gap: '20px',
          marginBottom: '16px'
        }}>
          {/* Coluna 1: Estratégia Multi-Crop */}
          <div style={{
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: '12px',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--infnet-dark-blue)', marginBottom: '8px' }}>
                Estratégia Multi-Crop
              </div>
              <p style={{ fontSize: '11px', color: '#475569', marginBottom: '12px', lineHeight: '1.4' }}>
                A partir de 1 imagem sem rótulo, sintetizamos visões complementares:
              </p>

              {/* Card Global Crops */}
              <div style={{
                background: '#F0F9FF',
                border: '1px solid #BAE6FD',
                borderRadius: '8px',
                padding: '10px',
                marginBottom: '10px'
              }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#0284C7' }}>
                  2× Global Views (224×224)
                </div>
                <div style={{ fontSize: '10px', color: '#334155', marginTop: '2px' }}>
                  Cobrem &gt; 50% da área da imagem. Enviadas para Teacher e Student.
                </div>
              </div>

              {/* Card Local Crops */}
              <div style={{
                background: '#FFF7ED',
                border: '1px solid #FED7AA',
                borderRadius: '8px',
                padding: '10px'
              }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#EA580C' }}>
                  Várias Local Views (96×96)
                </div>
                <div style={{ fontSize: '10px', color: '#334155', marginTop: '2px' }}>
                  Cobrem partes pequenas (&lt; 50%). Enviadas <strong>apenas para o Student</strong>!
                </div>
              </div>
            </div>

            <div style={{
              fontSize: '11px',
              color: '#15803D',
              fontWeight: 600,
              fontStyle: 'italic',
              marginTop: '10px',
              background: '#F0FDF4',
              padding: '6px 8px',
              borderRadius: '6px',
              border: '1px solid #BBF7D0'
            }}>
              💡 O aluno deve reconstruir o todo a partir das partes!
            </div>
          </div>

          {/* Coluna 2: Arquitetura Siamesa Assimétrica */}
          <div style={{
            background: '#FAF5FF',
            border: '2px solid #E9D5FF',
            borderRadius: '12px',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '12px' }}>
              {/* Student */}
              <div style={{
                background: '#FFFFFF',
                border: '1px solid #DDD6FE',
                borderRadius: '10px',
                padding: '12px',
                boxShadow: '0 2px 8px rgba(147, 51, 234, 0.06)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#7E22CE' }}>Student ViT (θ_s)</span>
                  <span style={{ fontSize: '10px', background: '#9333EA', color: '#FFF', padding: '1px 6px', borderRadius: '4px', fontWeight: 600 }}>Gradientes</span>
                </div>
                <div style={{ fontSize: '11px', color: '#475569', marginBottom: '6px' }}>
                  Processa todas as visões (globais e locais). Atualizado diretamente por Backprop.
                </div>
                <div style={{ fontFamily: 'Fira Code', fontSize: '11px', color: '#7E22CE', fontWeight: 700 }}>
                  P_s(x) = Softmax(g_s(x) / τ_s)
                </div>
              </div>

              {/* Teacher */}
              <div style={{
                background: '#F0FDF4',
                border: '1px solid #BBF7D0',
                borderRadius: '10px',
                padding: '12px',
                boxShadow: '0 2px 8px rgba(22, 163, 74, 0.06)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#16A34A' }}>Teacher ViT (θ_t)</span>
                  <span style={{ fontSize: '10px', background: '#16A34A', color: '#FFF', padding: '1px 6px', borderRadius: '4px', fontWeight: 600 }}>EMA (Congelado)</span>
                </div>
                <div style={{ fontSize: '11px', color: '#475569', marginBottom: '6px' }}>
                  Processa apenas visões globais. Pesos atualizados via Momentum:
                </div>
                <div style={{ fontFamily: 'Fira Code', fontSize: '11px', color: '#15803D', fontWeight: 700 }}>
                  θ_t ← λ θ_t + (1 - λ) θ_s
                </div>
              </div>
            </div>

            {/* Loss de Auto-Destilação */}
            <div style={{
              background: '#FFFFFF',
              borderRadius: '8px',
              padding: '10px 14px',
              border: '1px dashed #9333EA',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 700 }}>FUNÇÃO DE PERDA DE AUTO-DESTILAÇÃO:</span>
                <div style={{ fontFamily: 'Fira Code', fontSize: '13px', color: '#0A345D', fontWeight: 700, marginTop: '2px' }}>
                  min_θ_s ∑_{'{x_g ∈ V_g}'} ∑_{'{x_i ∈ V}'} - P_t(x_g) · log( P_s(x_i) )
                </div>
              </div>
              <div style={{
                background: '#FAF5FF',
                color: '#7E22CE',
                border: '1px solid #E9D5FF',
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: 700
              }}>
                Cross-Entropy Pura
              </div>
            </div>
          </div>
        </div>

        {/* Rodapé */}
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
            <strong style={{ color: '#7E22CE' }}>A Grande Barreira:</strong> No aprendizado auto-supervisionado sem negativos, existe o risco mortal de <strong>colapso de representação</strong> (o modelo prevê a mesma saída constante para qualquer imagem).
          </span>
          <span style={{
            fontSize: '11px',
            color: '#15803D',
            fontWeight: 700,
            background: '#F0FDF4',
            border: '1px solid #BBF7D0',
            padding: '3px 8px',
            borderRadius: '4px'
          }}>
            Como o DINO evita o colapso? ➔
          </span>
        </div>
      </div>
    </div>
  );
}
