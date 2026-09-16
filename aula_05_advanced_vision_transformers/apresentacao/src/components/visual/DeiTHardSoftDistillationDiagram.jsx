import React from 'react';

export default function DeiTHardSoftDistillationDiagram() {
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
        display: 'grid',
        gridTemplateColumns: '1.2fr 0.8fr',
        gap: '20px'
      }}>
        {/* Coluna Esquerda: Soft vs Hard Distillation */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: '16px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: '0 4px 16px rgba(10, 52, 93, 0.06)'
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
              <span style={{ fontSize: '15px', fontWeight: 800, color: 'var(--infnet-dark-blue)' }}>
                Formulação Matemática: Soft vs Hard
              </span>
              <span style={{
                background: '#DCFCE7',
                color: '#15803D',
                fontSize: '11px',
                fontWeight: 800,
                padding: '3px 8px',
                borderRadius: '4px'
              }}>
                Hard Distillation Venceu: 85.2% vs 84.4%
              </span>
            </div>

            {/* Caixa Soft Distillation */}
            <div style={{
              background: '#F0F9FF',
              border: '1px solid #BAE6FD',
              borderRadius: '10px',
              padding: '12px 14px',
              marginBottom: '12px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontSize: '12px', fontWeight: 800, color: '#0369A1' }}>
                  1. DESTILAÇÃO SUAVE (SOFT DISTILLATION - HINTON 2015)
                </span>
                <span style={{ fontSize: '11px', color: '#0284C7', fontWeight: 600 }}>Divergência KL</span>
              </div>
              <div style={{
                fontFamily: 'Fira Code, monospace',
                fontSize: '12px',
                color: '#0C4A6E',
                background: '#FFFFFF',
                border: '1px solid #BAE6FD',
                padding: '8px 10px',
                borderRadius: '6px',
                marginBottom: '6px',
                fontWeight: 600
              }}>
                L_soft = (1-λ) L_CE(ψ(z_s), y) + λ τ² KL(ψ(z_s/τ), ψ(z_t/τ))
              </div>
              <p style={{ fontSize: '11px', color: '#334155', margin: 0 }}>
                Distribui probabilidades contínuas sobre 1.000 classes. Exige calibrar a temperatura <code style={{ color: '#0369A1', fontWeight: 700 }}>τ</code>.
              </p>
            </div>

            {/* Caixa Hard Distillation */}
            <div style={{
              background: '#FFF7ED',
              border: '2px solid #FDBA74',
              borderRadius: '10px',
              padding: '12px 14px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontSize: '12px', fontWeight: 800, color: '#C2410C' }}>
                  2. DESTILAÇÃO DURA COM TOKEN DEDICADO (DEIT HARD)
                </span>
                <span style={{
                  fontSize: '10px',
                  fontWeight: 800,
                  color: '#15803D',
                  background: '#DCFCE7',
                  padding: '2px 6px',
                  borderRadius: '4px'
                }}>
                  RECOMENDADO
                </span>
              </div>
              <div style={{
                fontFamily: 'Fira Code, monospace',
                fontSize: '12px',
                color: '#7C2D12',
                background: '#FFFFFF',
                border: '1px solid #FED7AA',
                padding: '8px 10px',
                borderRadius: '6px',
                marginBottom: '6px',
                fontWeight: 700
              }}>
                L_hard = ½ L_CE(ψ(z_cls), y) + ½ L_CE(ψ(z_dist), y_t)
              </div>
              <p style={{ fontSize: '11px', color: '#334155', margin: 0 }}>
                Onde <code style={{ color: '#C2410C', fontWeight: 700 }}>y_t = argmax(z_t)</code> é o rótulo categórico do professor CNN. Sem temperatura, gradientes estáveis e máxima sinergia com data augmentation!
              </p>
            </div>
          </div>

          <div style={{
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
            padding: '10px 14px',
            borderRadius: '8px',
            fontSize: '11px',
            color: '#475569',
            marginTop: '12px'
          }}>
            💡 <strong>Por que a Hard é melhor?</strong> O professor CNN acerta a classe principal e ignora classes de fundo espúrias geradas por augmentations severas.
          </div>
        </div>

        {/* Coluna Direita: Arsenal de Regularização */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: '16px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: '0 4px 16px rgba(10, 52, 93, 0.06)'
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
              <span style={{ fontSize: '15px', fontWeight: 800, color: 'var(--infnet-dark-blue)' }}>
                Arsenal de Regularização do DeiT
              </span>
              <span style={{ fontSize: '11px', color: '#0284C7', fontFamily: 'Fira Code', fontWeight: 600 }}>
                300 épocas
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { name: 'RandAugment', desc: 'Transformações geométricas e fotométricas aleatórias automáticas' },
                { name: 'Mixup & CutMix', desc: 'Interpolação de pixels e colagem de patches com alvos contínuos' },
                { name: 'Random Erasing', desc: 'Oclusão retangular simulando perda de partes do objeto' },
                { name: 'Repeated Augmentation', desc: 'Apresenta 3 versões aumentadas da mesma imagem no mesmo batch' },
                { name: 'Stochastic Depth', desc: 'Desativa aleatoriamente blocos Transformer inteiros no treino' }
              ].map((tech, idx) => (
                <div key={idx} style={{
                  background: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  padding: '8px 12px'
                }}>
                  <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--infnet-dark-blue)', marginBottom: '2px' }}>
                    {tech.name}
                  </div>
                  <div style={{ fontSize: '11px', color: '#475569' }}>
                    {tech.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{
            marginTop: '12px',
            background: '#E0F2FE',
            border: '1px solid #BAE6FD',
            borderRadius: '6px',
            padding: '8px 12px',
            fontSize: '11px',
            color: '#0369A1',
            textAlign: 'center',
            fontWeight: 600
          }}>
            Sem esse arsenal, o ViT colapsaria por overfitting no ImageNet-1k puro.
          </div>
        </div>
      </div>
    </div>
  );
}
