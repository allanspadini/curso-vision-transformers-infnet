import React, { useState } from 'react';

export default function BiEncoderVsCrossEncoderDiagram() {
  const [activeTab, setActiveTab] = useState('pipeline'); // 'pipeline' or 'comparison'

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {/* Top Toggle Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#F8FAFC',
        border: '1px solid #E2E8F0',
        borderRadius: '8px',
        padding: '6px 14px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
            Arquiteturas de Recuperação Vetorial:
          </span>
          <button
            onClick={() => setActiveTab('pipeline')}
            style={{
              padding: '4px 12px',
              borderRadius: '6px',
              border: activeTab === 'pipeline' ? '2px solid var(--infnet-cyan)' : '1px solid #CBD5E1',
              background: activeTab === 'pipeline' ? '#E0F2FE' : '#FFFFFF',
              color: activeTab === 'pipeline' ? 'var(--infnet-dark-blue)' : '#475569',
              fontWeight: 700,
              fontSize: '11px',
              cursor: 'pointer'
            }}
          >
            Pipeline Moderno em 2 Estágios (Indústria)
          </button>
          <button
            onClick={() => setActiveTab('comparison')}
            style={{
              padding: '4px 12px',
              borderRadius: '6px',
              border: activeTab === 'comparison' ? '2px solid var(--infnet-cyan)' : '1px solid #CBD5E1',
              background: activeTab === 'comparison' ? '#E0F2FE' : '#FFFFFF',
              color: activeTab === 'comparison' ? 'var(--infnet-dark-blue)' : '#475569',
              fontWeight: 700,
              fontSize: '11px',
              cursor: 'pointer'
            }}
          >
            Bi-Encoder (SBERT) vs Cross-Encoder
          </button>
        </div>

        <div style={{ fontSize: '11px', color: '#64748B' }}>
          De horas de computação para <strong>milissegundos</strong> com Bancos Vetoriais
        </div>
      </div>

      {/* Main Container */}
      <div style={{
        flex: 1,
        minHeight: 0,
        background: '#FFFFFF',
        border: '1px solid #E2E8F0',
        borderRadius: '10px',
        padding: '14px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>
        {activeTab === 'pipeline' ? (
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', height: '100%' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1.2fr 80px 1.2fr',
              alignItems: 'center',
              gap: '12px'
            }}>
              {/* Stage 1: Bi-Encoder Retrieval */}
              <div style={{
                background: '#F0F9FF',
                border: '2px solid #BAE6FD',
                borderRadius: '10px',
                padding: '12px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 800, color: '#0369A1' }}>
                    ESTÁGIO 1: RECUPERAÇÃO (BI-ENCODER)
                  </span>
                  <span style={{ fontSize: '10px', background: '#0284C7', color: '#FFF', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>
                    ~5 ms
                  </span>
                </div>
                <div style={{ fontSize: '11px', color: '#334155', lineHeight: 1.4 }}>
                  • <strong>Modelos:</strong> Sentence-BERT, BGE-large, all-MiniLM-L6.<br />
                  • <strong>Ação:</strong> Converte Query em vetor <code style={{ fontFamily: 'var(--font-code)' }}>u ∈ ℝ⁷⁶⁸</code>.<br />
                  • <strong>Busca:</strong> Similaridade de Cosseno via ANN em 10.000.000 de documentos (FAISS, Chroma, Milvus).<br />
                  • <strong>Filtro:</strong> Seleciona os <strong>Top-100</strong> candidatos mais promissores.
                </div>
              </div>

              {/* Arrow in between */}
              <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                <span style={{ fontSize: '10px', fontWeight: 700, color: '#64748B' }}>Top-100</span>
                <div style={{ fontSize: '24px', color: '#0284C7' }}>➔</div>
              </div>

              {/* Stage 2: Cross-Encoder Reranking */}
              <div style={{
                background: '#FAF5FF',
                border: '2px solid #E9D5FF',
                borderRadius: '10px',
                padding: '12px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 800, color: '#7E22CE' }}>
                    ESTÁGIO 2: RERANKER (CROSS-ENCODER)
                  </span>
                  <span style={{ fontSize: '10px', background: '#7C3AED', color: '#FFF', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>
                    ~25 ms
                  </span>
                </div>
                <div style={{ fontSize: '11px', color: '#334155', lineHeight: 1.4 }}>
                  • <strong>Modelo:</strong> BERT Cross-Encoder (<code style={{ fontFamily: 'var(--font-code)' }}>[CLS] Q [SEP] Doc [SEP]</code>).<br />
                  • <strong>Ação:</strong> Atenção cruzada profunda e bidirecional entre cada par.<br />
                  • <strong>Precisão:</strong> Reordena os 100 documentos com precisão cirúrgica.<br />
                  • <strong>Resultado Final:</strong> Entrega os <strong>Top-5</strong> com acurácia máxima ao usuário.
                </div>
              </div>
            </div>

            {/* Bottom Total Latency Metric Banner */}
            <div style={{
              background: '#F0FDF4',
              border: '1px solid #86EFAC',
              borderRadius: '8px',
              padding: '10px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <strong style={{ color: '#166534', fontSize: '12px' }}>
                  ⚡ O Melhor dos Dois Mundos na Engenharia de IA:
                </strong>
                <div style={{ fontSize: '11px', color: '#15803D' }}>
                  Velocidade instantânea de vetores (Bi-Encoder) + Máxima capacidade semântica relacional (Cross-Encoder BERT). Latência total: <strong>~30 ms</strong> para milhões de arquivos!
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Tab 2: Comparison Details */
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', height: '100%' }}>
            {/* Bi-Encoder */}
            <div style={{ background: '#F0F9FF', border: '1px solid #BAE6FD', borderRadius: '8px', padding: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#0369A1', marginBottom: '4px' }}>
                  Bi-Encoder (Sentence-BERT)
                </div>
                <div style={{ fontSize: '11px', color: '#334155', lineHeight: 1.45 }}>
                  <strong>Mecânica:</strong> Dois encoders siameses (ou o mesmo encoder compartilhado). Gera um vetor isolado para a Pergunta e vetores pré-calculados para cada Documento.<br /><br />
                  <strong>Complexidade de Busca:</strong> <code style={{ fontFamily: 'var(--font-code)' }}>O(1)</code> passagens de BERT em tempo real + produto escalar rápido.<br /><br />
                  <strong>Vantagem:</strong> Escala para bilhões de vetores.
                </div>
              </div>
              <div style={{ background: '#FFFFFF', padding: '6px 10px', borderRadius: '4px', border: '1px solid #CBD5E1', fontSize: '10.5px', color: '#0284C7', fontWeight: 600 }}>
                Ideal para: Motores de Busca, RAG e Deduplicação
              </div>
            </div>

            {/* Cross-Encoder */}
            <div style={{ background: '#FAF5FF', border: '1px solid #E9D5FF', borderRadius: '8px', padding: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#7E22CE', marginBottom: '4px' }}>
                  Cross-Encoder (BERT Padrão)
                </div>
                <div style={{ fontSize: '11px', color: '#334155', lineHeight: 1.45 }}>
                  <strong>Mecânica:</strong> Concatena Pergunta e Documento em uma única entrada. Todas as palavras da pergunta prestam atenção em todas as palavras do documento nas 12 camadas.<br /><br />
                  <strong>Complexidade de Busca:</strong> <code style={{ fontFamily: 'var(--font-code)' }}>O(N)</code> passagens completas de BERT.<br /><br />
                  <strong>Desvantagem:</strong> Impossível fazer pré-computação offline.
                </div>
              </div>
              <div style={{ background: '#FFFFFF', padding: '6px 10px', borderRadius: '4px', border: '1px solid #CBD5E1', fontSize: '10.5px', color: '#7E22CE', fontWeight: 600 }}>
                Ideal para: Reranking final de poucas dezenas de itens
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
