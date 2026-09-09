import React from 'react';

export default function TransformerFamilyTaxonomyDiagram() {
  const models = [
    {
      title: 'Encoder-Only',
      hero: 'BERT, RoBERTa, DeBERTa, ViT',
      color: '#1BB5D8',
      bgColor: '#F0F9FF',
      borderColor: '#BAE6FD',
      textColor: '#0369A1',
      attentionType: 'Atenção Bidirecional Plena',
      maskVisual: 'Matriz Completa (Todos vêem todos)',
      maskMatrix: [
        [1, 1, 1, 1],
        [1, 1, 1, 1],
        [1, 1, 1, 1],
        [1, 1, 1, 1]
      ],
      primaryTasks: [
        'Classificação de Sentimento & Tópico',
        'Reconhecimento de Entidades (NER)',
        'Question Answering Extrativo (SQuAD)',
        'Busca Semântica & Embeddings Densos',
        'Visão Computacional (Vision Transformer - ViT)'
      ],
      outputNature: 'Representações contextuais ricas de cada token (h_i) e da sequência inteira (h_[CLS]).'
    },
    {
      title: 'Decoder-Only',
      hero: 'GPT-2/3/4, LLaMA, Claude, Mistral',
      color: '#FF7043',
      bgColor: '#FFF7ED',
      borderColor: '#FFEDD5',
      textColor: '#C2410C',
      attentionType: 'Atenção Causal Mascarada',
      maskVisual: 'Matriz Triangular Inferior (Futuro = -∞)',
      maskMatrix: [
        [1, 0, 0, 0],
        [1, 1, 0, 0],
        [1, 1, 1, 0],
        [1, 1, 1, 1]
      ],
      primaryTasks: [
        'Geração Autorregressiva de Texto',
        'Assistentes Conversacionais (Chatbots)',
        'Geração e Completude de Código',
        'Raciocínio Passo a Passo (CoT)'
      ],
      outputNature: 'Distribuição de probabilidade sobre o vocabulário para prever o próximo token P(w_t | w_<t).'
    },
    {
      title: 'Encoder-Decoder',
      hero: 'Vaswani et al., T5, BART, mT5',
      color: '#7CB342',
      bgColor: '#F0FDF4',
      borderColor: '#DCFCE7',
      textColor: '#15803D',
      attentionType: 'Atenção Bidirecional + Cross-Attention',
      maskVisual: 'Encoder Pleno + Decoder Causal + Cross',
      maskMatrix: [
        [1, 1, 1, 1],
        [1, 1, 0, 0],
        [1, 1, 1, 0],
        [1, 1, 1, 1]
      ],
      primaryTasks: [
        'Tradução de Idiomas (Machine Translation)',
        'Sumarização Abstrativa de Documentos',
        'Conversão Texto-para-Código / SQL',
        'Modelagem Sequence-to-Sequence (Seq2Seq)'
      ],
      outputNature: 'Mapeia sequência de comprimento N para outra sequência de comprimento M arbitrário.'
    }
  ];

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: '12px',
        flex: 1,
        minHeight: 0
      }}>
        {models.map((item, idx) => (
          <div
            key={idx}
            style={{
              background: item.bgColor,
              border: `2px solid ${item.borderColor}`,
              borderRadius: '10px',
              padding: '12px 14px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: idx === 0 ? '0 6px 18px rgba(27, 181, 216, 0.15)' : 'none'
            }}
          >
            {/* Header */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <span style={{
                  fontSize: '11px',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.6px',
                  color: item.textColor
                }}>
                  {item.title}
                </span>
                {idx === 0 && (
                  <span style={{
                    fontSize: '9.5px',
                    padding: '2px 6px',
                    background: 'var(--infnet-dark-blue)',
                    color: '#FFFFFF',
                    borderRadius: '4px',
                    fontWeight: 700
                  }}>
                    FOCO DA AULA 3
                  </span>
                )}
              </div>
              <h3 style={{ fontSize: '15px', color: 'var(--infnet-dark-blue)', margin: '0 0 8px 0', fontFamily: 'var(--font-title)' }}>
                {item.hero}
              </h3>

              {/* Attention Mask Visualization Mini-Matrix */}
              <div style={{
                background: '#FFFFFF',
                borderRadius: '8px',
                padding: '8px',
                border: '1px solid #E2E8F0',
                marginBottom: '10px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 14px)', gap: '2px' }}>
                  {item.maskMatrix.flat().map((val, cellIdx) => (
                    <div
                      key={cellIdx}
                      style={{
                        width: '14px',
                        height: '14px',
                        borderRadius: '2px',
                        background: val === 1 ? item.color : '#E2E8F0',
                        opacity: val === 1 ? 0.85 : 0.4
                      }}
                    />
                  ))}
                </div>
                <div style={{ flex: 1, fontSize: '10.5px', color: '#475569', lineHeight: 1.3 }}>
                  <div style={{ fontWeight: 600, color: 'var(--infnet-dark-blue)' }}>{item.attentionType}</div>
                  <div style={{ fontSize: '9.5px', color: '#64748B' }}>{item.maskVisual}</div>
                </div>
              </div>

              {/* Tasks List */}
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                Aplicações Típicas:
              </div>
              <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '11px', color: '#475569', lineHeight: 1.45 }}>
                {item.primaryTasks.map((t, tIdx) => (
                  <li key={tIdx} style={{ marginBottom: '2px' }}>{t}</li>
                ))}
              </ul>
            </div>

            {/* Output Nature Card */}
            <div style={{
              background: '#FFFFFF',
              borderRadius: '6px',
              padding: '6px 10px',
              border: '1px solid rgba(0,0,0,0.06)',
              marginTop: '8px',
              fontSize: '10px',
              color: '#64748B',
              lineHeight: 1.35
            }}>
              <strong style={{ color: item.textColor }}>Saída Principal:</strong> {item.outputNature}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Insight Callout */}
      <div style={{
        background: '#EDF8FB',
        border: '1px solid #B8E4F0',
        borderRadius: '8px',
        padding: '8px 14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '11.5px',
        color: 'var(--infnet-dark-blue)'
      }}>
        <div>
          💡 <strong>Por que o BERT é Encoder-Only?</strong> Porque tarefas de compreensão de texto (sentimento, busca, entidades) não precisam gerar palavras futuras uma a uma. Elas necessitam de <em>visão panorâmica de 360 graus</em> sobre toda a frase de uma só vez!
        </div>
      </div>
    </div>
  );
}
