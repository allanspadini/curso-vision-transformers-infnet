import React from 'react';
import MathView from '../MathView';

export default function BertTripleEmbeddingDiagram() {
  const tokens = [
    { tok: '[CLS]', seg: 'E_A', pos: '0', color: '#0284C7' },
    { tok: 'meu', seg: 'E_A', pos: '1', color: '#334155' },
    { tok: 'cão', seg: 'E_A', pos: '2', color: '#334155' },
    { tok: 'é', seg: 'E_A', pos: '3', color: '#334155' },
    { tok: 'fofo', seg: 'E_A', pos: '4', color: '#334155' },
    { tok: '[SEP]', seg: 'E_A', pos: '5', color: '#0284C7' },
    { tok: 'ele', seg: 'E_B', pos: '6', color: '#16A34A' },
    { tok: 'gosta', seg: 'E_B', pos: '7', color: '#16A34A' },
    { tok: 'de', seg: 'E_B', pos: '8', color: '#16A34A' },
    { tok: 'brincar', seg: 'E_B', pos: '9', color: '#16A34A' },
    { tok: '[SEP]', seg: 'E_B', pos: '10', color: '#0284C7' },
  ];

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {/* Mathematical Header Banner */}
      <div style={{
        background: '#F0F9FF',
        border: '1px solid #BAE6FD',
        borderRadius: '8px',
        padding: '8px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
            Equação de Entrada do BERT:
          </span>
          <MathView math="E_i = \text{TokenEmbed}(w_i) + \text{SegmentEmbed}(s_i) + \text{PositionEmbed}(i)" />
        </div>
        <div style={{ fontSize: '11px', color: '#0369A1', fontWeight: 600 }}>
          Dimensão de cada vetor: d_model = 768
        </div>
      </div>

      {/* Main Grid: Rows of Embeddings */}
      <div style={{
        flex: 1,
        minHeight: 0,
        background: '#FFFFFF',
        border: '1px solid #E2E8F0',
        borderRadius: '10px',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around'
      }}>
        {/* Row 1: Token Embeddings */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '150px', fontSize: '12px', fontWeight: 700, color: '#0284C7', textAlign: 'right' }}>
            Token Embeddings:
          </div>
          <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(11, 1fr)', gap: '6px' }}>
            {tokens.map((t, idx) => (
              <div
                key={idx}
                style={{
                  background: t.tok.startsWith('[') ? '#E0F2FE' : '#F8FAFC',
                  border: t.tok.startsWith('[') ? '2px solid #0284C7' : '1px solid #CBD5E1',
                  borderRadius: '6px',
                  padding: '6px 2px',
                  textAlign: 'center',
                  fontSize: '11px',
                  fontWeight: t.tok.startsWith('[') ? 800 : 600,
                  color: t.color,
                  fontFamily: 'var(--font-code)'
                }}
              >
                {t.tok}
              </div>
            ))}
          </div>
        </div>

        {/* Plus Sign Row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '150px', textAlign: 'right', fontSize: '16px', fontWeight: 'bold', color: '#94A3B8' }}>+</div>
          <div style={{ flex: 1, height: '1px', background: '#E2E8F0' }}></div>
        </div>

        {/* Row 2: Segment Embeddings */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '150px', fontSize: '12px', fontWeight: 700, color: '#16A34A', textAlign: 'right' }}>
            Segment Embeddings:
          </div>
          <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(11, 1fr)', gap: '6px' }}>
            {tokens.map((t, idx) => {
              const isA = t.seg === 'E_A';
              return (
                <div
                  key={idx}
                  style={{
                    background: isA ? '#F0FDF4' : '#FEF3C7',
                    border: isA ? '1px solid #86EFAC' : '1px solid #FCD34D',
                    borderRadius: '6px',
                    padding: '6px 2px',
                    textAlign: 'center',
                    fontSize: '11px',
                    fontWeight: 700,
                    color: isA ? '#166534' : '#92400E',
                    fontFamily: 'var(--font-code)'
                  }}
                >
                  {t.seg}
                </div>
              );
            })}
          </div>
        </div>

        {/* Plus Sign Row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '150px', textAlign: 'right', fontSize: '16px', fontWeight: 'bold', color: '#94A3B8' }}>+</div>
          <div style={{ flex: 1, height: '1px', background: '#E2E8F0' }}></div>
        </div>

        {/* Row 3: Position Embeddings */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '150px', fontSize: '12px', fontWeight: 700, color: '#EA580C', textAlign: 'right' }}>
            Position Embeddings:
          </div>
          <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(11, 1fr)', gap: '6px' }}>
            {tokens.map((t, idx) => (
              <div
                key={idx}
                style={{
                  background: '#FFF7ED',
                  border: '1px solid #FDBA74',
                  borderRadius: '6px',
                  padding: '6px 2px',
                  textAlign: 'center',
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#C2410C',
                  fontFamily: 'var(--font-code)'
                }}
              >
                pos_{t.pos}
              </div>
            ))}
          </div>
        </div>

        {/* Equals Sign Row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '150px', textAlign: 'right', fontSize: '16px', fontWeight: 'bold', color: '#1BB5D8' }}>=</div>
          <div style={{ flex: 1, height: '2px', background: 'linear-gradient(90deg, #1BB5D8, #7CB342)' }}></div>
        </div>

        {/* Row 4: Final Input Representation */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '150px', fontSize: '12px', fontWeight: 800, color: 'var(--infnet-dark-blue)', textAlign: 'right' }}>
            Entrada Camada 1:
          </div>
          <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(11, 1fr)', gap: '6px' }}>
            {tokens.map((t, idx) => (
              <div
                key={idx}
                style={{
                  background: 'linear-gradient(135deg, #0A345D 0%, #061F38 100%)',
                  border: '1px solid #1BB5D8',
                  borderRadius: '6px',
                  padding: '8px 2px',
                  textAlign: 'center',
                  fontSize: '10px',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-code)',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.12)'
                }}
              >
                E_{idx}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Engineering Badges Footer */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: '8px'
      }}>
        <div style={{ background: '#F8FAFC', padding: '8px 10px', borderRadius: '6px', border: '1px solid #E2E8F0', fontSize: '11px' }}>
          <strong style={{ color: '#0284C7' }}>Token WordPiece:</strong> Vocabulário de 30.522 subpalavras. O token <code style={{ fontFamily: 'var(--font-code)' }}>[CLS]</code> inicia toda sequência e <code style={{ fontFamily: 'var(--font-code)' }}>[SEP]</code> separa frases.
        </div>
        <div style={{ background: '#F8FAFC', padding: '8px 10px', borderRadius: '6px', border: '1px solid #E2E8F0', fontSize: '11px' }}>
          <strong style={{ color: '#16A34A' }}>Segment IDs (0 ou 1):</strong> Informa à rede se o token pertence à Sentença A ou à Sentença B, crucial para pares de sentenças (NSP e QA).
        </div>
        <div style={{ background: '#F8FAFC', padding: '8px 10px', borderRadius: '6px', border: '1px solid #E2E8F0', fontSize: '11px' }}>
          <strong style={{ color: '#EA580C' }}>Position Aprendida:</strong> Diferente de Vaswani et al. (senos/cossenos fixos), no BERT cada posição de 0 a 511 tem seu próprio vetor treinável de 768 dimensões!
        </div>
      </div>
    </div>
  );
}
