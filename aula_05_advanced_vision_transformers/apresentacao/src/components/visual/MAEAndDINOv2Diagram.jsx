import React from 'react';

export default function MAEAndDINOv2Diagram() {
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
        {/* Card MAE */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid #FED7AA',
          borderRadius: '16px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: '0 4px 20px rgba(234, 88, 12, 0.08)'
        }}>
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '12px',
              borderBottom: '1px solid #FED7AA',
              paddingBottom: '8px'
            }}>
              <span style={{ fontSize: '15px', fontWeight: 700, color: '#EA580C' }}>
                MAE: Masked Autoencoders (He et al., 2022)
              </span>
              <span style={{
                background: '#FFF7ED',
                color: '#EA580C',
                border: '1px solid #FED7AA',
                fontSize: '11px',
                fontWeight: 700,
                padding: '3px 8px',
                borderRadius: '4px'
              }}>
                75% Mascarado
              </span>
            </div>

            {/* Ilustração Visual do Fluxo Assimétrico */}
            <div style={{
              background: '#FFF7ED',
              border: '1px solid #FFEDD5',
              borderRadius: '10px',
              padding: '14px',
              marginBottom: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 700 }}>FLUXO ASSIMÉTRICO:</span>
                <span style={{ fontSize: '11px', color: '#15803D', fontFamily: 'Fira Code', fontWeight: 700 }}>Velocidade 3× a 4×</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{
                  background: '#FFFFFF',
                  border: '1px dashed #FB923C',
                  padding: '6px 10px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  color: '#334155'
                }}>
                  1. Imagem fatiada em patches; <strong>75% são descartados aleatoriamente</strong>.
                </div>
                <div style={{
                  background: '#F0F9FF',
                  border: '1px solid #BAE6FD',
                  padding: '6px 10px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  color: '#0369A1'
                }}>
                  2. <strong>Encoder ViT Pesado</strong> processa apenas os <strong>25% de patches visíveis</strong>.
                </div>
                <div style={{
                  background: '#F0FDF4',
                  border: '1px solid #BBF7D0',
                  padding: '6px 10px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  color: '#15803D'
                }}>
                  3. <strong>Decoder Leve</strong> recebe patches + tokens [MASK] e reconstrói pixels brutos (MSE Loss).
                </div>
              </div>
            </div>

            <p style={{ fontSize: '12px', color: '#334155', lineHeight: '1.5', margin: 0 }}>
              Por que 75%? Imagens possuem alta redundância espacial. O modelo só aprende semântica profunda ao ser forçado a reconstruir o objeto a partir de pistas escassas.
            </p>
          </div>

          <div style={{
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: '6px',
            padding: '8px 12px',
            fontSize: '11px',
            color: '#334155',
            marginTop: '10px'
          }}>
            🎯 ViT-Huge com MAE atinge <strong style={{ color: '#EA580C' }}>87.8% Top-1</strong> no ImageNet-1k com treino escalável e estável.
          </div>
        </div>

        {/* Card DINOv2 */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid #DDD6FE',
          borderRadius: '16px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: '0 4px 20px rgba(147, 51, 234, 0.08)'
        }}>
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '12px',
              borderBottom: '1px solid #DDD6FE',
              paddingBottom: '8px'
            }}>
              <span style={{ fontSize: '15px', fontWeight: 700, color: '#7E22CE' }}>
                DINOv2: Modelos Visuais Universais (2023)
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
                1B Parâmetros (ViT-G)
              </span>
            </div>

            {/* Pilares do DINOv2 */}
            <div style={{
              background: '#FAF5FF',
              border: '1px solid #F3E8FF',
              borderRadius: '10px',
              padding: '14px',
              marginBottom: '12px'
            }}>
              <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 700, marginBottom: '8px' }}>
                PILARES DO MODELO DE FUNDAÇÃO:
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ fontSize: '11px', color: '#334155' }}>
                  • <strong>Dataset LVD-142M:</strong> 142 milhões de imagens limpas e desduplicadas automaticamente.
                </div>
                <div style={{ fontSize: '11px', color: '#334155' }}>
                  • <strong>Treino Híbrido:</strong> DINO (nível de imagem) + iBOT (nível de patch mascarado) + SwiGLU FFN.
                </div>
                <div style={{ fontSize: '11px', color: '#334155' }}>
                  • <strong>FlashAttention & Nested Tensors:</strong> Otimização de hardware no silício para treinar ViT-Giant.
                </div>
              </div>
            </div>

            <div style={{
              background: '#F3E8FF',
              border: '1px solid #C084FC',
              borderRadius: '8px',
              padding: '10px 12px'
            }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#7E22CE', marginBottom: '2px' }}>
                O PODER DAS CARACTERÍSTICAS CONGELADAS (FROZEN FEATURES):
              </div>
              <div style={{ fontSize: '11px', color: '#334155', lineHeight: '1.4' }}>
                Um simples classificador linear congelado sobre o DINOv2 supera o fine-tuning supervisionado de outros backbones em classificação, profundidade monocular e segmentação!
              </div>
            </div>
          </div>

          <div style={{
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: '6px',
            padding: '8px 12px',
            fontSize: '11px',
            color: '#334155',
            marginTop: '10px'
          }}>
            🚀 É o modelo padrão atual para extração de embeddings visuais em sistemas modernos de RAG e busca multimodal.
          </div>
        </div>
      </div>
    </div>
  );
}
