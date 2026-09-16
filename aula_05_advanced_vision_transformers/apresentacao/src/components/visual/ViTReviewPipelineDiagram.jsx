import React from 'react';

export default function ViTReviewPipelineDiagram() {
  const stages = [
    {
      step: '1',
      title: 'Imagem de Entrada',
      dim: '[B, 3, 224, 224]',
      desc: 'Pixels brutos 2D contínuos',
      color: '#0284C7',
      bgLight: '#F0F9FF',
      borderLight: '#BAE6FD',
      renderVisual: () => (
        <div style={{
          width: '72px',
          height: '72px',
          background: 'linear-gradient(135deg, #0284C7, #0A345D)',
          borderRadius: '8px',
          border: '2px dashed #38BDF8',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '2px',
          padding: '2px',
          margin: '0 auto'
        }}>
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} style={{
              background: (i % 3 === 0) ? '#38BDF8' : (i % 2 === 0) ? '#BAE6FD' : '#0369A1',
              borderRadius: '1px'
            }} />
          ))}
        </div>
      )
    },
    {
      step: '2',
      title: 'Patch Embedding',
      dim: '[B, 196, 768]',
      desc: 'Conv2D(k=16, s=16) proj: 768px → D',
      color: '#16A34A',
      bgLight: '#F0FDF4',
      borderLight: '#BBF7D0',
      renderVisual: () => (
        <div style={{
          fontSize: '11px',
          color: '#15803D',
          height: '72px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '4px',
          background: '#DCFCE7',
          borderRadius: '8px',
          padding: '6px'
        }}>
          <span style={{ fontWeight: 800 }}>196 Patches</span>
          <span style={{ fontSize: '10px', color: '#166534' }}>14×14 na grade</span>
          <span style={{ fontSize: '9px', color: '#14532D', fontFamily: 'Fira Code' }}>D = 768 canais</span>
        </div>
      )
    },
    {
      step: '3',
      title: '[CLS] + Pos Embeddings',
      dim: '[B, 197, 768]',
      desc: 'concat([CLS], tokens) + E_pos 1D',
      color: '#EA580C',
      bgLight: '#FFF7ED',
      borderLight: '#FED7AA',
      renderVisual: () => (
        <div style={{
          fontSize: '11px',
          color: '#C2410C',
          height: '72px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '4px',
          background: '#FFEDD5',
          borderRadius: '8px',
          padding: '6px'
        }}>
          <span style={{ fontWeight: 800 }}>Token [CLS]</span>
          <span style={{ fontSize: '10px', color: '#9A3412' }}>196 + 1 = 197</span>
          <span style={{ fontSize: '9px', color: '#7C2D12', fontFamily: 'Fira Code' }}>+ E_pos aprendível</span>
        </div>
      )
    },
    {
      step: '4',
      title: 'L × Encoder Blocks',
      dim: '[B, 197, 768]',
      desc: 'Pre-LN + MSA 12 heads + MLP 4×',
      color: '#9333EA',
      bgLight: '#FAF5FF',
      borderLight: '#E9D5FF',
      renderVisual: () => (
        <div style={{
          fontSize: '11px',
          color: '#7E22CE',
          height: '72px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '4px',
          background: '#F3E8FF',
          borderRadius: '8px',
          padding: '6px'
        }}>
          <span style={{ fontWeight: 800 }}>12 Blocos Pre-LN</span>
          <span style={{ fontSize: '10px', color: '#6B21A8' }}>Residual + GELU</span>
          <span style={{ fontSize: '9px', color: '#581C87', fontFamily: 'Fira Code' }}>Dimensão Fixa</span>
        </div>
      )
    },
    {
      step: '5',
      title: 'MLP Head ([CLS])',
      dim: '[B, num_classes]',
      desc: 'Extrai z_L[:, 0] e projeta classes',
      color: '#0284C7',
      bgLight: '#F0F9FF',
      borderLight: '#BAE6FD',
      renderVisual: () => (
        <div style={{
          fontSize: '11px',
          color: '#0369A1',
          height: '72px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '4px',
          background: '#E0F2FE',
          borderRadius: '8px',
          padding: '6px'
        }}>
          <span style={{ fontWeight: 800 }}>Vetor [CLS]</span>
          <span style={{ fontSize: '10px', color: '#075985' }}>LayerNorm(z_cls)</span>
          <span style={{ fontSize: '9px', color: '#0C4A6E', fontFamily: 'Fira Code' }}>Linear(768, C)</span>
        </div>
      )
    }
  ];

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
      {/* Container Principal Claro */}
      <div style={{
        background: '#FFFFFF',
        border: '1px solid #E2E8F0',
        borderRadius: '16px',
        padding: '24px 20px',
        boxShadow: '0 8px 24px rgba(10, 52, 93, 0.08)'
      }}>
        {/* Top Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #E2E8F0',
          paddingBottom: '12px',
          marginBottom: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{
              background: '#E0F2FE',
              color: '#0369A1',
              padding: '4px 12px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 800
            }}>REVISÃO ESSENCIAL</span>
            <span style={{ color: 'var(--infnet-dark-blue)', fontSize: '16px', fontWeight: 700 }}>
              Fluxo Completo de Tensores no Vision Transformer Canônico
            </span>
          </div>
          <span style={{
            fontSize: '12px',
            color: '#0284C7',
            fontFamily: 'Fira Code, monospace',
            background: '#F0F9FF',
            border: '1px solid #BAE6FD',
            padding: '4px 10px',
            borderRadius: '6px',
            fontWeight: 600
          }}>
            P = 16 | N = (224/16)² = 196 | D = 768
          </span>
        </div>

        {/* Grade de 5 Estágios Claros e Vivos */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '14px'
        }}>
          {stages.map((st) => (
            <div
              key={st.step}
              style={{
                background: st.bgLight,
                border: `1.5px solid ${st.borderLight}`,
                borderRadius: '12px',
                padding: '16px 12px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
              }}
            >
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: '#FFFFFF',
                border: `2px solid ${st.color}`,
                color: st.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '14px',
                marginBottom: '8px'
              }}>
                {st.step}
              </div>

              <div style={{ color: '#0F172A', fontWeight: 700, fontSize: '13px', marginBottom: '8px' }}>
                {st.title}
              </div>

              <div style={{ width: '100%', marginBottom: '10px' }}>
                {st.renderVisual()}
              </div>

              <div style={{ fontSize: '11px', color: '#475569', marginBottom: '8px', minHeight: '30px' }}>
                {st.desc}
              </div>

              <div style={{
                fontFamily: 'Fira Code, monospace',
                fontSize: '11px',
                fontWeight: 700,
                color: st.color,
                background: '#FFFFFF',
                border: `1px solid ${st.borderLight}`,
                padding: '4px 8px',
                borderRadius: '6px',
                width: '100%',
                marginTop: 'auto'
              }}>
                {st.dim}
              </div>
            </div>
          ))}
        </div>

        {/* Rodapé Informativo */}
        <div style={{
          marginTop: '20px',
          background: '#F8FAFC',
          border: '1px solid #E2E8F0',
          borderRadius: '10px',
          padding: '12px 18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ fontSize: '13px', color: '#334155' }}>
            <strong style={{ color: 'var(--infnet-dark-blue)' }}>Atenção Canônica:</strong> Em todos os blocos, a dimensão de representação permanece fixa em <code style={{ color: '#0369A1', fontWeight: 700 }}>[B, 197, 768]</code> (arquitetura colunar isotrópica herdada do BERT).
          </div>
          <div style={{
            fontSize: '12px',
            color: '#64748B',
            display: 'flex',
            gap: '16px'
          }}>
            <span>Parâmetros: <strong style={{ color: '#0F172A' }}>86M (ViT-Base)</strong></span>
            <span>FLOPS: <strong style={{ color: '#0F172A' }}>17.6 GFLOPs</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
}
