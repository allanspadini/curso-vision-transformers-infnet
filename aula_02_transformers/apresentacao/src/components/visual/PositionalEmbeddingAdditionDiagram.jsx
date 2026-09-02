import React, { useState } from 'react';
import { Plus, Equal, Sparkles, CheckCircle2, ArrowRight, HelpCircle } from 'lucide-react';

export default function PositionalEmbeddingAdditionDiagram() {
  const [highlightCat, setHighlightCat] = useState(true);

  const tokensData = [
    {
      word: 'YOUR',
      id: 105,
      pos: 0,
      emb: ['207.952', '8405.545', '1448.853', '...', '1.856', '259.671'],
      posEmb: ['1120.415', '4512.890', '7841.112', '...', '3210.450', '6541.200'],
      res: ['1328.367', '12918.435', '9289.965', '...', '3212.306', '6800.871'],
      isCat: false
    },
    {
      word: 'CAT',
      id: 4242,
      pos: 1,
      emb: ['141.171', '3350.276', '8191.192', '...', '3421.633', '8473.390'],
      posEmb: ['1608.664', '8133.080', '2399.620', '...', '9405.386', '3159.120'],
      res: ['1749.835', '11483.356', '10590.812', '...', '12827.019', '11632.510'],
      isCat: true
    },
    {
      word: 'IS',
      id: 6892,
      pos: 2,
      emb: ['659.621', '1051.304', '0.656', '...', '7805.679', '4025.506'],
      posEmb: ['5412.100', '2190.450', '8914.320', '...', '1120.950', '4310.880'],
      res: ['6071.721', '3241.754', '8914.976', '...', '8926.629', '8336.386'],
      isCat: false
    },
    {
      word: 'A',
      id: 1516,
      pos: 3,
      emb: ['562.776', '5288.567', '95.582', '...', '2194.716', '5949.119'],
      posEmb: ['3205.110', '6540.890', '1420.500', '...', '7890.120', '2150.340'],
      res: ['3767.886', '11829.457', '1516.082', '...', '10084.836', '8099.459'],
      isCat: false
    },
    {
      word: 'LOVELY',
      id: 72,
      pos: 4,
      emb: ['6693.422', '6080.315', '9778.258', '...', '2081.141', '714.357'],
      posEmb: ['4510.900', '1890.340', '5620.780', '...', '3410.900', '9810.120'],
      res: ['11204.322', '7970.655', '15399.038', '...', '5492.041', '10524.477'],
      isCat: false
    },
    {
      word: 'CAT',
      id: 4242,
      pos: 5,
      emb: ['141.171', '3350.276', '8191.192', '...', '3421.633', '8473.390'],
      posEmb: ['1458.281', '7890.902', '3102.821', '...', '1217.659', '7620.018'],
      res: ['1599.452', '11241.178', '11294.013', '...', '4639.292', '16093.408'],
      isCat: true
    }
  ];

  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      fontSize: '12px'
    }}>
      {/* Top Banner */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#EDF5FA',
        padding: '6px 16px',
        borderRadius: '8px',
        border: '1px solid #D0E3F0',
        flexShrink: 0
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
          <Sparkles size={18} color="var(--infnet-cyan)" />
          <span>Injeção de Posição: Soma Elemento a Elemento (Token + Posição)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={() => setHighlightCat((prev) => !prev)}
            style={{
              padding: '3px 12px',
              borderRadius: '6px',
              border: highlightCat ? '1.5px solid #0284C7' : '1px solid #CBD5E1',
              background: highlightCat ? '#E0F2FE' : '#FFFFFF',
              color: highlightCat ? '#0369A1' : '#475569',
              fontSize: '11px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            {highlightCat ? '🔍 Comparando: "CAT" (pos 1 vs pos 5)' : 'Destacar Palavras Repetidas'}
          </button>
          <span style={{
            fontSize: '11px',
            background: '#FFFFFF',
            padding: '3px 10px',
            borderRadius: '12px',
            fontWeight: 700,
            color: 'var(--infnet-dark-blue)',
            border: '1px solid #CBD5E1',
            fontFamily: 'var(--font-code)'
          }}>
            X = E_token + E_pos
          </span>
        </div>
      </div>

      {/* Main Diagram Area */}
      <div style={{
        flex: 1,
        background: '#FFFFFF',
        border: '1px solid var(--border-light)',
        borderRadius: '10px',
        padding: '10px 14px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: 'var(--shadow-sm)',
        minHeight: 0
      }}>
        {/* The 6 Token Columns Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '110px repeat(6, 1fr)',
          gap: '8px',
          alignItems: 'center',
          height: '100%'
        }}>
          {/* Row Labels (Left Column) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', justifyContent: 'space-around', height: '100%' }}>
            <div>
              <div style={{ fontSize: '11.5px', fontWeight: 800, color: '#0A345D' }}>Tokens</div>
              <div style={{ fontSize: '9px', color: '#64748B' }}>Sequência textual</div>
            </div>

            <div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#0A345D' }}>Input IDs</div>
              <div style={{ fontSize: '8.5px', color: '#64748B' }}>Posição no vocabulário</div>
            </div>

            <div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#0369A1' }}>Embedding</div>
              <div style={{ fontSize: '8.5px', color: '#64748B' }}>Vetor de dimensão 512 / 768</div>
            </div>

            <div style={{ textAlign: 'center', color: '#64748B', fontWeight: 800, fontSize: '14px' }}>+</div>

            <div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#BE185D' }}>Position Emb.</div>
              <div style={{ fontSize: '8.5px', color: '#64748B' }}>Coordenada da posição pos</div>
            </div>

            <div style={{ textAlign: 'center', color: '#64748B', fontWeight: 800, fontSize: '14px' }}>=</div>

            <div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#047857' }}>Encoder Input</div>
              <div style={{ fontSize: '8.5px', color: '#64748B' }}>Sinal de entrada X</div>
            </div>
          </div>

          {/* 6 Token Data Columns */}
          {tokensData.map((t, idx) => {
            const isTarget = highlightCat && t.isCat;
            return (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  justifyContent: 'space-around',
                  height: '100%',
                  background: isTarget ? '#F0FDF4' : 'transparent',
                  padding: '4px',
                  borderRadius: '8px',
                  border: isTarget ? '1.5px solid #86EFAC' : '1px solid transparent',
                  transition: 'all 0.2s ease'
                }}
              >
                {/* 1. Token Box */}
                <div style={{
                  background: '#0284C7',
                  color: '#FFFFFF',
                  fontWeight: 800,
                  fontSize: '11.5px',
                  padding: '5px 0',
                  borderRadius: '4px',
                  textAlign: 'center',
                  letterSpacing: '0.5px',
                  boxShadow: 'var(--shadow-sm)'
                }}>
                  {t.word}
                </div>

                {/* 2. Input ID Box */}
                <div style={{
                  background: '#0A345D',
                  color: '#64D9EF',
                  fontWeight: 700,
                  fontSize: '11px',
                  padding: '4px 0',
                  borderRadius: '4px',
                  textAlign: 'center',
                  fontFamily: 'var(--font-code)'
                }}>
                  {t.id}
                </div>

                {/* 3. Embedding Vector (Word) */}
                <div style={{
                  background: '#E2E8F0',
                  border: isTarget ? '1.5px solid #0284C7' : '1px solid #CBD5E1',
                  borderRadius: '4px',
                  padding: '3px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.5px',
                  fontFamily: 'var(--font-code)',
                  fontSize: '8.5px',
                  color: '#1E293B',
                  textAlign: 'center'
                }}>
                  {t.emb.map((val, vIdx) => (
                    <div
                      key={vIdx}
                      style={{
                        padding: '1px 0',
                        background: '#FFFFFF',
                        borderRadius: '2px',
                        fontWeight: vIdx === 0 && isTarget ? 800 : 500
                      }}
                    >
                      {val}
                    </div>
                  ))}
                </div>

                {/* Plus Sign */}
                <div style={{ textAlign: 'center', color: '#64748B', fontWeight: 800, fontSize: '13px' }}>+</div>

                {/* 4. Position Embedding Vector */}
                <div style={{
                  background: '#FCE7F3',
                  border: isTarget ? '1.5px solid #DB2777' : '1px solid #FBCFE8',
                  borderRadius: '4px',
                  padding: '3px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.5px',
                  fontFamily: 'var(--font-code)',
                  fontSize: '8.5px',
                  color: '#9D174D',
                  textAlign: 'center'
                }}>
                  {t.posEmb.map((val, vIdx) => (
                    <div
                      key={vIdx}
                      style={{
                        padding: '1px 0',
                        background: '#FFFFFF',
                        borderRadius: '2px',
                        fontWeight: vIdx === 0 && isTarget ? 800 : 500
                      }}
                    >
                      {val}
                    </div>
                  ))}
                </div>

                {/* Equals Sign */}
                <div style={{ textAlign: 'center', color: '#64748B', fontWeight: 800, fontSize: '13px' }}>=</div>

                {/* 5. Encoder Input Vector (Result) */}
                <div style={{
                  background: '#D1FAE5',
                  border: isTarget ? '1.5px solid #059669' : '1px solid #A7F3D0',
                  borderRadius: '4px',
                  padding: '3px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.5px',
                  fontFamily: 'var(--font-code)',
                  fontSize: '8.5px',
                  color: '#065F46',
                  textAlign: 'center'
                }}>
                  {t.res.map((val, vIdx) => (
                    <div
                      key={vIdx}
                      style={{
                        padding: '1px 0',
                        background: '#FFFFFF',
                        borderRadius: '2px',
                        fontWeight: isTarget ? 800 : 600
                      }}
                    >
                      {val}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Insight Bar */}
        <div style={{
          marginTop: '6px',
          background: '#F8FAFC',
          border: '1px solid #E2E8F0',
          borderRadius: '6px',
          padding: '6px 12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '11px',
          color: '#334155'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontWeight: 800, color: '#0A345D' }}>💡 Por Que Somar em Vez de Concatenar?</span>
            <span>
              A soma elemento a elemento mantém a dimensão <code>d_model</code> constante (sem inflar os parâmetros da atenção) e o hiperespaço de 768 dimensões é amplo o bastante para comportar semântica e posição sem interferência destrutiva!
            </span>
          </div>
          <div style={{
            fontFamily: 'var(--font-code)',
            fontWeight: 700,
            color: '#059669',
            background: '#ECFDF5',
            padding: '2px 8px',
            borderRadius: '4px',
            border: '1px solid #A7F3D0'
          }}>
            CAT(pos 1) ≠ CAT(pos 5)
          </div>
        </div>
      </div>
    </div>
  );
}
