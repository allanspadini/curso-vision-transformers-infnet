import React from 'react';

export default function ConvNeXtEvolutionDiagram() {
  const steps = [
    {
      title: '1. Macro Design',
      acc: '78.8% → 79.4%',
      changes: 'Stem estilo "Patchify" (Conv 4×4 stride 4) • Estágios 1:1:3:1 (como Swin)',
      color: '#0284C7'
    },
    {
      title: '2. ResNeXt & Kernel 7×7',
      acc: '79.4% → 80.6%',
      changes: 'Depthwise Convolutions separáveis • Kernel 7×7 para campo receptivo amplo',
      color: '#16A34A'
    },
    {
      title: '3. Inverted Bottleneck',
      acc: '80.6% → 81.0%',
      changes: 'Inverte expansão: 1× → 4× → 1× (idêntico à MLP do Transformer)',
      color: '#EA580C'
    },
    {
      title: '4. Micro Design & LN',
      acc: '81.0% → 82.1%',
      changes: 'Substitui ReLU por GELU • Apenas 1 ativação e 1 LayerNorm por bloco (Sem BatchNorm)',
      color: '#9333EA'
    }
  ];

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
              background: '#16A34A',
              color: '#FFFFFF',
              padding: '4px 10px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 800
            }}>CONVNEXT (CVPR 2022)</span>
            <span style={{ color: 'var(--infnet-dark-blue)', fontSize: '15px', fontWeight: 700 }}>
              A ConvNet for the 2020s: Modernizando a ResNet com as Lições do Swin
            </span>
          </div>
          <span style={{
            fontSize: '12px',
            color: '#15803D',
            fontFamily: 'Fira Code',
            background: '#F0FDF4',
            border: '1px solid #BBF7D0',
            padding: '3px 10px',
            borderRadius: '6px',
            fontWeight: 600
          }}>
            Liu et al. (Meta AI) • 78.8% ➔ 82.1% Top-1
          </span>
        </div>

        {/* 4 Passos Evolutivos da Modernização */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '14px',
          marginBottom: '16px'
        }}>
          {steps.map((s, idx) => (
            <div
              key={idx}
              style={{
                background: '#F8FAFC',
                border: `1px solid ${s.color}55`,
                borderRadius: '12px',
                padding: '14px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: s.color }}>
                    {s.title}
                  </span>
                  <span style={{
                    fontSize: '10px',
                    color: s.color,
                    background: '#FFFFFF',
                    border: `1px solid ${s.color}66`,
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontFamily: 'Fira Code',
                    fontWeight: 700
                  }}>
                    {s.acc}
                  </span>
                </div>

                <p style={{ fontSize: '11px', color: '#334155', lineHeight: '1.4', margin: 0 }}>
                  {s.changes}
                </p>
              </div>

              <div style={{
                marginTop: '10px',
                paddingTop: '8px',
                borderTop: '1px solid #E2E8F0',
                fontSize: '10px',
                color: '#64748B',
                fontWeight: 600
              }}>
                Etapa {idx + 1} de 4
              </div>
            </div>
          ))}
        </div>

        {/* Comparação Técnica: ConvNeXt vs Swin Transformer */}
        <div style={{
          background: '#F8FAFC',
          borderRadius: '10px',
          padding: '12px 18px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '20px',
          border: '1px solid #E2E8F0'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '24px' }}>⚡</span>
            <div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#15803D' }}>
                Acurácia Idêntica ou Superior ao Swin
              </div>
              <div style={{ fontSize: '11px', color: '#334155' }}>
                ConvNeXt-T (82.1%) bate Swin-T (81.3%) usando exatamente os mesmos FLOPs (4.5G) e parâmetros (28M).
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '24px' }}>🚀</span>
            <div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#0284C7' }}>
                Vantagens Práticas em Produção
              </div>
              <div style={{ fontSize: '11px', color: '#334155' }}>
                Sem necessidade de shifting de janelas, sem máscaras de atenção complexas e compatibilidade nativa com TensorRT e dispositivos edge (NPU/CoreML).
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
