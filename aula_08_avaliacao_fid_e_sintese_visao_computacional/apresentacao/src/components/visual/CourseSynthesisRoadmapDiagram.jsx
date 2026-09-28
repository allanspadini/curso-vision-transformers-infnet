import React from 'react';

export default function CourseSynthesisRoadmapDiagram() {
  const blocks = [
    {
      number: 'Bloco 1',
      title: 'Métrica FID & Avaliação de GANs',
      slides: 'Slides 03 a 06',
      tag: 'Estatística Multivariada',
      badgeClass: 'badge-purple',
      items: [
        'Falhas de MSE, PSNR e Inception Score (IS)',
        'Extração de Features no Inception-v3 (pool3, R^2048)',
        'Simulador Interativo do FID & Álgebra de Fréchet',
        'Boas Práticas de Engenharia e Reprodutibilidade (clean-fid)'
      ]
    },
    {
      number: 'Bloco 2',
      title: 'Evolução Arquitetural: 6 Marcos',
      slides: 'Slides 07 a 12',
      tag: 'Conexão Evolutiva',
      badgeClass: 'badge-cyan',
      items: [
        'Marco 1: CNNs (ResNet) & U-Net (Resíduos e Skips)',
        'Marco 2: O Transformer Canônico & BERT (MHA e [CLS])',
        'Marco 3: Vision Transformer (ViT) & Patch Slicing 16×16',
        'Marco 4: Swin Transformer (Pirâmide e Janelas Deslocadas)',
        'Marco 5: CLIP (Dual-Encoder e Hiperesfera S⁵¹¹)',
        'Marco 6: Modelos Generativos & U-Net de Difusão Latente'
      ]
    },
    {
      number: 'Bloco 3',
      title: 'Interpretabilidade & Multimodalidade',
      slides: 'Slides 13 a 16',
      tag: 'Laboratórios & Auditoria',
      badgeClass: 'badge-green',
      items: [
        'Extração de Attention Maps do [CLS] e Reshape Espacial',
        'Laboratório Interativo: Auditoria de Atenção e Atalhos',
        'Calibração de Thresholds e Concentração Geométrica em CLIP',
        'Laboratório Interativo: Busca Semântica por Níveis de Abstração'
      ]
    },
    {
      number: 'Bloco 4',
      title: 'Governança & Validação Científica',
      slides: 'Slides 17 a 23',
      tag: 'Metodologia e Métricas',
      badgeClass: 'badge-orange',
      items: [
        'Feature Extraction vs Fine-Tuning de Grafo Completo',
        'Taxonomia e Riscos Semânticos de Data Augmentation',
        'Paradoxo da Acurácia, Balanced Accuracy e Primazia do Recall',
        'Oversampling com cGAN/CycleGAN e Teste 100% Real',
        'Vazamento por Grupos (GroupKFold) e Quiz de Fixação'
      ]
    }
  ];

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
            ROTEIRO DA SESSÃO
          </span>
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--infnet-dark-blue)' }}>
            Estrutura Pedagógica: Dos Fundamentos do FID à Síntese Teórica dos Grandes Eixos da Disciplina
          </span>
        </div>
        <span className="badge badge-cyan" style={{ fontSize: '11px' }}>23 Slides Estruturados</span>
      </div>

      {/* Main 4-Block Grid */}
      <div style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '12px',
        minHeight: 0
      }}>
        {blocks.map((b, idx) => (
          <div
            key={idx}
            style={{
              background: '#FFFFFF',
              border: '1px solid var(--border-light)',
              borderRadius: '12px',
              padding: '16px 14px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#0A345D' }}>{b.number}</span>
                <span className={`badge ${b.badgeClass}`} style={{ fontSize: '9px' }}>{b.tag}</span>
              </div>

              <h3 style={{ fontSize: '13px', fontWeight: 800, color: '#0A345D', lineHeight: '1.3', marginBottom: '4px' }}>
                {b.title}
              </h3>
              <span style={{ fontSize: '9.5px', color: '#64748B', display: 'block', marginBottom: '12px', fontFamily: 'var(--font-code)' }}>
                {b.slides}
              </span>

              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {b.items.map((item, itemIdx) => (
                  <li key={itemIdx} style={{ fontSize: '10px', color: '#334155', display: 'flex', alignItems: 'flex-start', gap: '6px', lineHeight: '1.4' }}>
                    <span style={{ color: 'var(--infnet-cyan)', fontWeight: 'bold' }}>✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div style={{
              background: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: '6px',
              padding: '6px',
              textAlign: 'center',
              fontSize: '9px',
              color: '#64748B',
              fontWeight: 600,
              marginTop: '10px'
            }}>
              Pilar Teórico {idx + 1} da Disciplina
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
