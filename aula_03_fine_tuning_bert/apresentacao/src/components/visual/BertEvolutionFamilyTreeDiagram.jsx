import React from 'react';

export default function BertEvolutionFamilyTreeDiagram() {
  const models = [
    {
      name: 'BERT',
      org: 'Google AI (2018)',
      innovation: 'Pioneiro da Atenção Bidirecional Profunda',
      keyChanges: [
        'Introduziu os objetivos MLM e NSP',
        'WordPiece com 30.522 tokens',
        'Treinado em 16 GB de texto (Books + Wiki)'
      ],
      badge: 'Base Histórica',
      badgeColor: '#0284C7',
      bg: '#F0F9FF'
    },
    {
      name: 'RoBERTa',
      org: 'Meta / FAIR (2019)',
      innovation: 'Otimização Rigorosa de Treinamento',
      keyChanges: [
        'Removeu completamente o NSP (provou desnecessário)',
        'Dynamic Masking (máscaras mudam a cada época)',
        'Treinado com 160 GB de texto (10× mais dados)',
        'Batch size gigante (8.000 sequências)'
      ],
      badge: 'Performance Máxima',
      badgeColor: '#16A34A',
      bg: '#F0FDF4'
    },
    {
      name: 'DistilBERT',
      org: 'Hugging Face (2019)',
      innovation: 'Destilação de Conhecimento (Compressão)',
      keyChanges: [
        '6 camadas em vez de 12 (40% menor)',
        '60% mais rápido em inferência na CPU',
        'Retém 97% da precisão do BERT original',
        'Padrão da indústria para microsserviços'
      ],
      badge: 'Alta Velocidade & Produção',
      badgeColor: '#EA580C',
      bg: '#FFF7ED'
    },
    {
      name: 'DeBERTa',
      org: 'Microsoft (2020-2021)',
      innovation: 'Atenção Desacoplada (Disentangled)',
      keyChanges: [
        'Separa vetores de conteúdo e posição relativa',
        'Enhanced Mask Decoder na cabeça do MLM',
        'Superou a linha de base humana no SuperGLUE',
        'Top 1 em tarefas de NLI e raciocínio textual'
      ],
      badge: 'Estado da Arte (SOTA)',
      badgeColor: '#7C3AED',
      bg: '#FAF5FF'
    }
  ];

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {/* 4-Column Grid of Evolutions */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '10px',
        flex: 1,
        minHeight: 0
      }}>
        {models.map((m, idx) => (
          <div
            key={idx}
            style={{
              background: m.bg,
              border: '1px solid #CBD5E1',
              borderRadius: '10px',
              padding: '12px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <span style={{ fontSize: '10px', fontWeight: 700, color: '#64748B' }}>{m.org}</span>
                <span style={{
                  fontSize: '9.5px',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  background: m.badgeColor,
                  color: '#FFFFFF',
                  fontWeight: 700
                }}>
                  {m.badge}
                </span>
              </div>

              <h3 style={{ fontSize: '16px', color: 'var(--infnet-dark-blue)', margin: '0 0 4px 0', fontFamily: 'var(--font-title)' }}>
                {m.name}
              </h3>
              <div style={{ fontSize: '11px', fontWeight: 600, color: m.badgeColor, marginBottom: '8px', lineHeight: 1.25 }}>
                {m.innovation}
              </div>

              <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '10.5px', color: '#475569', lineHeight: 1.45 }}>
                {m.keyChanges.map((pt, pIdx) => (
                  <li key={pIdx} style={{ marginBottom: '3px' }}>{pt}</li>
                ))}
              </ul>
            </div>

            <div style={{
              background: '#FFFFFF',
              borderRadius: '6px',
              padding: '6px 8px',
              fontSize: '10px',
              color: '#334155',
              marginTop: '8px',
              border: '1px solid #E2E8F0',
              fontWeight: 600
            }}>
              {idx === 0 && '⚡ O marco que iniciou a era dos modelos de linguagem pré-treinados.'}
              {idx === 1 && '🎯 Provou que o pré-treino do BERT original era "subtreinado".'}
              {idx === 2 && '🚀 A escolha padrão para APIs e dispositivos móveis.'}
              {idx === 3 && '🧠 O ápice em precisão entre todas as redes Encoder-only.'}
            </div>
          </div>
        ))}
      </div>

      {/* Engineering Takeaway */}
      <div style={{
        background: '#F8FAFC',
        border: '1px solid #E2E8F0',
        borderRadius: '8px',
        padding: '8px 14px',
        fontSize: '11px',
        color: '#475569',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <span>
          💡 <strong>Guia Prático para Engenheiros:</strong> Em produção, comece com <code>DistilBERT</code> se latência for prioridade (10ms). Migre para <code>RoBERTa-base</code> se precisar de acurácia robusta. Use <code>DeBERTa-v3</code> para desafios analíticos complexos.
        </span>
      </div>
    </div>
  );
}
