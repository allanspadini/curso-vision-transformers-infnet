import React from 'react';

export default function ViTLimitationsDiagnosticDiagram() {
  const limitations = [
    {
      id: '01',
      title: 'A Fome de Dados (Data Hunger)',
      problemTag: 'Sem Viés Indutivo',
      accentColor: '#C2410C',
      bgCard: '#FFF7ED',
      borderCard: '#FED7AA',
      badgeBg: '#FFEDD5',
      icon: '📉',
      metricTitle: 'Acurácia ImageNet-1k puro',
      metricVal: 'ViT 79.9% vs CNN 83.2%',
      detail: 'Sem premissas rígidas de convolução (localidade 2D e equivariância à translação), o ViT requer 300M de imagens (JFT-300M) para convergir com generalização superior.',
      impactBadge: 'Exige Pré-Treino Bilionário'
    },
    {
      id: '02',
      title: 'Rigidez de Escala (Isotrópica)',
      problemTag: 'Tokens Uniformes',
      accentColor: '#7E22CE',
      bgCard: '#FAF5FF',
      borderCard: '#E9D5FF',
      badgeBg: '#F3E8FF',
      icon: '📏',
      metricTitle: 'Resolução Espacial Fixa',
      metricVal: '14×14 constante em L camadas',
      detail: 'Modelos de detecção e segmentação (como FPN e Mask R-CNN) exigem pirâmides com features multiescala (stride 4, 8, 16, 32). O ViT canônico mantém resolução fixa.',
      impactBadge: 'Incompatível com Visão Densa'
    },
    {
      id: '03',
      title: 'Custo Quadrático O(N²)',
      problemTag: 'Gargalo de Memória GPU',
      accentColor: '#0369A1',
      bgCard: '#F0F9FF',
      borderCard: '#BAE6FD',
      badgeBg: '#E0F2FE',
      icon: '💥',
      metricTitle: 'Matriz Q·Kᵀ em 800×800px',
      metricVal: '2.500 tokens → 6.25M pares',
      detail: 'Para capturar detalhes finos ou processar imagens de alta resolução, o custo de memória da autoatenção escala com (H·W)², estourando a VRAM (CUDA Out of Memory).',
      impactBadge: 'CUDA Out of Memory'
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
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '20px'
      }}>
        {limitations.map((item) => (
          <div
            key={item.id}
            style={{
              background: item.bgCard,
              border: `1.5px solid ${item.borderCard}`,
              borderRadius: '16px',
              padding: '24px 20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 4px 16px rgba(10, 52, 93, 0.06)'
            }}
          >
            <div>
              {/* Header do Card */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '16px'
              }}>
                <span style={{
                  fontFamily: 'Fira Code, monospace',
                  fontSize: '28px',
                  fontWeight: 800,
                  color: item.accentColor
                }}>
                  {item.id}
                </span>
                <span style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  color: item.accentColor,
                  background: item.badgeBg,
                  border: `1px solid ${item.borderCard}`,
                  padding: '4px 10px',
                  borderRadius: '20px',
                  textTransform: 'uppercase'
                }}>
                  {item.problemTag}
                </span>
              </div>

              <div style={{
                fontSize: '18px',
                fontWeight: 800,
                color: '#0F172A',
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span>{item.icon}</span>
                <span>{item.title}</span>
              </div>

              {/* Métrica em destaque claro */}
              <div style={{
                background: '#FFFFFF',
                border: `1px solid ${item.borderCard}`,
                borderRadius: '10px',
                padding: '12px',
                marginBottom: '16px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
              }}>
                <div style={{ fontSize: '11px', color: '#64748B', textTransform: 'uppercase', marginBottom: '4px', fontWeight: 600 }}>
                  {item.metricTitle}
                </div>
                <div style={{
                  fontFamily: 'Fira Code, monospace',
                  fontSize: '15px',
                  fontWeight: 700,
                  color: item.accentColor
                }}>
                  {item.metricVal}
                </div>
              </div>

              {/* Descrição */}
              <p style={{
                fontSize: '13px',
                lineHeight: '1.55',
                color: '#334155',
                margin: 0
              }}>
                {item.detail}
              </p>
            </div>

            {/* Rodapé do Card */}
            <div style={{
              marginTop: '20px',
              paddingTop: '12px',
              borderTop: `1px solid ${item.borderCard}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{
                fontSize: '12px',
                fontWeight: 700,
                color: item.accentColor,
                background: '#FFFFFF',
                padding: '6px 14px',
                borderRadius: '8px',
                border: `1px dashed ${item.borderCard}`
              }}>
                {item.impactBadge}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
