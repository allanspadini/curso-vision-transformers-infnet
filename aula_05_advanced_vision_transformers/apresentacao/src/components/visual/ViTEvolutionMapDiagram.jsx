import React from 'react';

export default function ViTEvolutionMapDiagram() {
  const branches = [
    {
      title: 'DeiT (2021)',
      author: 'Touvron et al. (Meta / Sorbonne)',
      focus: 'Eficiência de Dados & Destilação',
      color: '#C2410C',
      bgCard: '#FFF7ED',
      borderCard: '#FED7AA',
      badge: 'ImageNet-1k Puro',
      features: [
        'Destilação de CNN (RegNetY)',
        'Distillation Token dedicado',
        'Hard Distillation supera Soft'
      ]
    },
    {
      title: 'PVT (2021)',
      author: 'Wang et al. (Nanjing / Oxford)',
      focus: 'Visão Densa em Pirâmide',
      color: '#15803D',
      bgCard: '#F0FDF4',
      borderCard: '#BBF7D0',
      badge: 'Detecção & FPN',
      features: [
        '4 Estágios Hierárquicos (H/4 a H/32)',
        'Spatial-Reduction Attention (SRA)',
        'Features multiescala nativas'
      ]
    },
    {
      title: 'Swin Transformer (2021)',
      author: 'Liu et al. (MSRA / Marr Prize)',
      focus: 'Atenção Linear em Janelas',
      color: '#0369A1',
      bgCard: '#F0F9FF',
      borderCard: '#BAE6FD',
      badge: 'Complexidade O(N)',
      features: [
        'Janelas Locais M×M (W-MSA)',
        'Shifted Windows (SW-MSA)',
        'Cyclic Shift vetorizado'
      ]
    },
    {
      title: 'DINO (2021)',
      author: 'Caron et al. (Meta AI)',
      focus: 'Auto-Supervisão sem Rótulos',
      color: '#7E22CE',
      bgCard: '#FAF5FF',
      borderCard: '#E9D5FF',
      badge: 'Emergência Semântica',
      features: [
        'Student-Teacher sem rótulos',
        'Centering + Sharpening anti-colapso',
        'Segmentação não-supervisionada'
      ]
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
      {/* Raiz da Árvore Clara e Destacada */}
      <div style={{
        background: '#FFFFFF',
        border: '2px solid var(--infnet-cyan)',
        borderRadius: '14px',
        padding: '14px 28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 4px 16px rgba(10, 52, 93, 0.08)',
        marginBottom: '16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <span style={{ fontSize: '28px' }}>⚡</span>
          <div>
            <div style={{ fontSize: '17px', fontWeight: 800, color: 'var(--infnet-dark-blue)' }}>
              ViT Canônico (Dosovitskiy et al., 2020)
            </div>
            <div style={{ fontSize: '12px', color: '#475569' }}>
              Patch Slicing (16×16) • Autoatenção Global O(N²) • Fome de Dados (JFT-300M)
            </div>
          </div>
        </div>
        <div style={{
          background: '#E0F2FE',
          border: '1px solid #BAE6FD',
          borderRadius: '8px',
          padding: '6px 14px',
          fontSize: '12px',
          color: '#0369A1',
          fontWeight: 700
        }}>
          Ponto de Partida da Aula 05 ➔ 4 Soluções de Engenharia
        </div>
      </div>

      {/* 4 Ramos Principais Claros */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '16px',
        marginBottom: '16px'
      }}>
        {branches.map((b, idx) => (
          <div
            key={idx}
            style={{
              background: b.bgCard,
              border: `1.5px solid ${b.borderCard}`,
              borderRadius: '14px',
              padding: '16px 14px',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)'
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '6px'
            }}>
              <span style={{
                fontFamily: 'Outfit, sans-serif',
                fontSize: '16px',
                fontWeight: 800,
                color: b.color
              }}>
                {b.title}
              </span>
              <span style={{
                fontSize: '10px',
                fontWeight: 700,
                color: b.color,
                background: '#FFFFFF',
                padding: '2px 8px',
                borderRadius: '12px',
                border: `1px solid ${b.borderCard}`
              }}>
                {b.badge}
              </span>
            </div>

            <div style={{ fontSize: '11px', color: '#64748B', marginBottom: '8px', fontStyle: 'italic' }}>
              {b.author}
            </div>

            <div style={{
              fontSize: '12px',
              fontWeight: 700,
              color: '#0F172A',
              background: '#FFFFFF',
              border: `1px solid ${b.borderCard}`,
              padding: '6px 10px',
              borderRadius: '6px',
              marginBottom: '10px'
            }}>
              {b.focus}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: 'auto' }}>
              {b.features.map((f, fIdx) => (
                <div key={fIdx} style={{
                  fontSize: '11px',
                  color: '#334155',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <span style={{ color: b.color, fontSize: '12px', fontWeight: 800 }}>✦</span>
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Rodapé: Evoluções Modernas */}
      <div style={{
        background: '#FFFFFF',
        border: '1px solid #E2E8F0',
        borderRadius: '12px',
        padding: '12px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{
            background: '#E0F2FE',
            color: '#0369A1',
            fontSize: '11px',
            fontWeight: 800,
            padding: '3px 8px',
            borderRadius: '4px'
          }}>FRONTEIRAS MODERNAS</span>
          <span style={{ fontSize: '12px', color: '#64748B' }}>
            Extensões abordadas no fechamento da aula:
          </span>
        </div>
        <div style={{ display: 'flex', gap: '20px', fontSize: '12px' }}>
          <span style={{ color: '#334155' }}>
            <strong style={{ color: '#C2410C' }}>MAE:</strong> Reconstrução de 75% mascarado
          </span>
          <span style={{ color: '#334155' }}>
            <strong style={{ color: '#15803D' }}>ConvNeXt:</strong> A modernização das CNNs
          </span>
          <span style={{ color: '#334155' }}>
            <strong style={{ color: '#7E22CE' }}>DINOv2:</strong> Fundação visual em bilhão de parâmetros
          </span>
        </div>
      </div>
    </div>
  );
}
