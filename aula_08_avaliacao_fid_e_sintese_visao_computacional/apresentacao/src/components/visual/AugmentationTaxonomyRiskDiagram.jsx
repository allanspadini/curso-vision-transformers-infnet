import React from 'react';
import MathView from '../MathView';

export default function AugmentationTaxonomyRiskDiagram() {
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
            TAXONOMIA & ANÁLISE CRÍTICA
          </span>
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--infnet-dark-blue)' }}>
            Estratégias de Data Augmentation: Racional Teórico vs Riscos de Corrupção Semântica
          </span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <span className="badge badge-purple" style={{ fontSize: '11px' }}>Invariância Afim</span>
          <span className="badge badge-cyan" style={{ fontSize: '11px' }}>Fotometria</span>
          <span className="badge badge-orange" style={{ fontSize: '11px' }}>Preservação de Rótulo</span>
        </div>
      </div>

      {/* Main 3-Card Grid */}
      <div style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: '14px',
        minHeight: 0
      }}>
        {/* Card 1: Geometric */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid var(--border-light)',
          borderRadius: '12px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '12.5px', fontWeight: 800, color: '#0A345D' }}>
                1. Aumentações Geométricas
              </span>
              <span className="badge badge-green" style={{ fontSize: '9px' }}>Invariância Espacial</span>
            </div>

            <div style={{ background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '6px', padding: '6px 10px', fontSize: '10px', fontFamily: 'var(--font-code)', color: '#0F172A', marginBottom: '10px' }}>
              RandomHorizontalFlip(p=0.5)<br />
              RandomRotation(degrees=15)<br />
              RandomResizedCrop(224, scale=(0.8, 1.0))
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ background: '#F0FDF4', border: '1px solid #86EFAC', borderRadius: '6px', padding: '8px 10px' }}>
                <strong style={{ fontSize: '10.5px', color: '#166534' }}>✓ Quando é Benéfico:</strong>
                <p style={{ fontSize: '9.5px', color: '#14532D', margin: '2px 0 0' }}>
                  Objetos naturais ou cenas gerais onde a pose, enquadramento ou escala não alteram a identidade de classe.
                </p>
              </div>

              <div style={{ background: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: '6px', padding: '8px 10px' }}>
                <strong style={{ fontSize: '10.5px', color: '#991B1B' }}>⚠️ Risco de Corrupção Semântica:</strong>
                <p style={{ fontSize: '9.5px', color: '#7F1D1D', margin: '2px 0 0' }}>
                  Flips verticais/horizontais em imagens médicas com assimetria anatômica (ex: coração à esquerda) ou símbolos orientados (dígitos 6 e 9, setas direcionais).
                </p>
              </div>
            </div>
          </div>

          <div style={{ fontSize: '9.5px', color: '#64748B', fontStyle: 'italic' }}>
            Regra: Nunca aplique transformações geométricas que criem amostras fisicamente impossíveis no domínio real.
          </div>
        </div>

        {/* Card 2: Photometric / Color */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid var(--border-light)',
          borderRadius: '12px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '12.5px', fontWeight: 800, color: '#0A345D' }}>
                2. Aumentações de Cor & Luz
              </span>
              <span className="badge badge-purple" style={{ fontSize: '9px' }}>Fotometria</span>
            </div>

            <div style={{ background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '6px', padding: '6px 10px', fontSize: '10px', fontFamily: 'var(--font-code)', color: '#0F172A', marginBottom: '10px' }}>
              ColorJitter(brightness=0.2, contrast=0.2)<br />
              RandomGrayscale(p=0.1)<br />
              GaussianBlur(kernel_size=3)
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ background: '#F0FDF4', border: '1px solid #86EFAC', borderRadius: '6px', padding: '8px 10px' }}>
                <strong style={{ fontSize: '10.5px', color: '#166534' }}>✓ Quando é Benéfico:</strong>
                <p style={{ fontSize: '9.5px', color: '#14532D', margin: '2px 0 0' }}>
                  Força a rede neural a extrair contornos e morfologia geométrica em vez de confiar cegamente em condições de iluminação do sensor.
                </p>
              </div>

              <div style={{ background: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: '6px', padding: '8px 10px' }}>
                <strong style={{ fontSize: '10.5px', color: '#991B1B' }}>⚠️ Risco de Corrupção Semântica:</strong>
                <p style={{ fontSize: '9.5px', color: '#7F1D1D', margin: '2px 0 0' }}>
                  Destrutivo quando a cor é o atributo discriminante primário (ex: semáforos verde/vermelho, colorações histológicas específicas ou espécies de plantas).
                </p>
              </div>
            </div>
          </div>

          <div style={{ fontSize: '9.5px', color: '#64748B', fontStyle: 'italic' }}>
            Regra: Verifique se a cor é decorativa (iluminação) ou estrutural (regrada pela classe).
          </div>
        </div>

        {/* Card 3: Normalization & Preprocessing */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid var(--border-light)',
          borderRadius: '12px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '12.5px', fontWeight: 800, color: '#0A345D' }}>
                3. Normalização Estatística
              </span>
              <span className="badge badge-cyan" style={{ fontSize: '9px' }}>ImageNet Matching</span>
            </div>

            <div style={{ background: '#F0F9FF', border: '1px solid #BAE6FD', borderRadius: '6px', padding: '6px 10px', fontSize: '10px', fontFamily: 'var(--font-code)', color: '#0369A1', marginBottom: '10px' }}>
              Normalize(<br />
              &nbsp;&nbsp;mean=[0.485, 0.456, 0.406],<br />
              &nbsp;&nbsp;std=[0.229, 0.224, 0.225]<br />
              )
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '8px 10px' }}>
                <strong style={{ fontSize: '10.5px', color: '#0A345D' }}>• Racional Matemático:</strong>
                <p style={{ fontSize: '9.5px', color: '#334155', margin: '2px 0 0' }}>
                  Os pesos convolucionais de modelos pré-treinados foram otimizados assumindo entradas com média zero e variância unitária sob esta distribuição específica.
                </p>
              </div>

              <div style={{ background: '#FFF7ED', border: '1px solid #FED7AA', borderRadius: '6px', padding: '8px 10px' }}>
                <strong style={{ fontSize: '10.5px', color: '#9A3412' }}>• Omissão de Normalização:</strong>
                <p style={{ fontSize: '9.5px', color: '#7C2D12', margin: '2px 0 0' }}>
                  Passar tensores em [0.0, 1.0] sem normalizar gera saturação precoce nas ativações ReLU das primeiras camadas, degradando a convergência.
                </p>
              </div>
            </div>
          </div>

          <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '6px', padding: '6px 10px', fontSize: '9.5px', color: '#166534', fontWeight: 600 }}>
            💡 Sempre aplique a mesma normalização utilizada durante o pré-treinamento do backbone.
          </div>
        </div>
      </div>
    </div>
  );
}
