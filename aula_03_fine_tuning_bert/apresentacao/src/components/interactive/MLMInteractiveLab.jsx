import React, { useState } from 'react';
import MathView from '../MathView';

export default function MLMInteractiveLab() {
  const samples = [
    {
      id: 0,
      words: ['O', 'gerente', 'do', 'banco', 'bloqueou', 'o', 'cartão', 'do', 'cliente'],
      maskIdx: 3, // 'banco'
      target: 'banco',
      candidates: [
        { word: 'banco', prob: 0.88, logit: 14.2 },
        { word: 'sistema', prob: 0.07, logit: 11.7 },
        { word: 'aplicativo', prob: 0.03, logit: 10.8 },
        { word: 'computador', prob: 0.01, logit: 9.6 },
        { word: 'caixa', prob: 0.01, logit: 9.5 }
      ],
      contextClue: 'A palavra "bloqueou" e "cartão" à direita + "gerente" à esquerda forçam a interpretação financeira!'
    },
    {
      id: 1,
      words: ['Paris', 'é', 'a', 'capital', 'da', 'França', 'e', 'cidade', 'linda'],
      maskIdx: 3, // 'capital'
      target: 'capital',
      candidates: [
        { word: 'capital', prob: 0.94, logit: 15.6 },
        { word: 'cidade', prob: 0.04, logit: 12.4 },
        { word: 'região', prob: 0.01, logit: 10.9 },
        { word: 'província', prob: 0.005, logit: 9.8 },
        { word: 'sede', prob: 0.005, logit: 9.7 }
      ],
      contextClue: 'A correlação entre "Paris" e "França" direciona 94% da massa de probabilidade para "capital"!'
    },
    {
      id: 2,
      words: ['Redes', 'convolucionais', 'processam', 'imagens', 'em', 'grades', '2D'],
      maskIdx: 3, // 'imagens'
      target: 'imagens',
      candidates: [
        { word: 'imagens', prob: 0.91, logit: 14.8 },
        { word: 'fotos', prob: 0.05, logit: 11.9 },
        { word: 'figuras', prob: 0.02, logit: 11.0 },
        { word: 'dados', prob: 0.01, logit: 10.1 },
        { word: 'pixels', prob: 0.01, logit: 10.0 }
      ],
      contextClue: 'A atenção bidirecional combina "convolucionais" à esquerda com "grades 2D" à direita!'
    }
  ];

  const [selectedSample, setSelectedSample] = useState(0);
  const current = samples[selectedSample];
  const [activeMaskIdx, setActiveMaskIdx] = useState(current.maskIdx);

  const handleSelectSample = (idx) => {
    setSelectedSample(idx);
    setActiveMaskIdx(samples[idx].maskIdx);
  };

  const loss = -Math.log(current.candidates[0].prob);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {/* Top Sentence Selector */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#F0FDF4',
        border: '1px solid #BBF7D0',
        borderRadius: '8px',
        padding: '6px 14px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#166534' }}>
            Selecione uma Frase para Mascaramento:
          </span>
          {samples.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => handleSelectSample(idx)}
              style={{
                padding: '4px 12px',
                borderRadius: '6px',
                border: selectedSample === idx ? '2px solid #16A34A' : '1px solid #CBD5E1',
                background: selectedSample === idx ? '#DCFCE7' : '#FFFFFF',
                color: selectedSample === idx ? '#166534' : '#475569',
                fontWeight: 700,
                fontSize: '11px',
                cursor: 'pointer'
              }}
            >
              Frase {idx + 1}
            </button>
          ))}
        </div>

        <div style={{ fontSize: '11px', color: '#166534', fontWeight: 600 }}>
          Vocabulário Total: <strong>30.522 tokens</strong> WordPiece
        </div>
      </div>

      {/* Main Interactive Arena */}
      <div style={{
        flex: 1,
        minHeight: 0,
        background: '#FFFFFF',
        border: '1px solid #E2E8F0',
        borderRadius: '10px',
        padding: '12px',
        display: 'grid',
        gridTemplateColumns: '1.2fr 0.8fr',
        gap: '12px'
      }}>
        {/* Left: Sentence Tokens with [MASK] */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', display: 'block', marginBottom: '8px', textTransform: 'uppercase' }}>
              Clique na palavra destacada para inspecionar a previsão:
            </span>

            {/* Token Strip */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center' }}>
              <div style={{ padding: '6px 10px', borderRadius: '6px', background: '#E0F2FE', border: '1px solid #0284C7', color: '#0369A1', fontSize: '12px', fontWeight: 'bold' }}>
                [CLS]
              </div>
              {current.words.map((w, idx) => {
                const isMask = idx === activeMaskIdx;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveMaskIdx(idx)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '6px',
                      border: isMask ? '2px solid #DC2626' : '1px solid #CBD5E1',
                      background: isMask ? '#FEE2E2' : '#F8FAFC',
                      color: isMask ? '#B91C1C' : '#1E293B',
                      fontSize: '12px',
                      fontWeight: isMask ? 800 : 500,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      boxShadow: isMask ? '0 0 10px rgba(220, 38, 38, 0.2)' : 'none'
                    }}
                  >
                    {isMask ? '[MASK]' : w}
                  </button>
                );
              })}
              <div style={{ padding: '6px 10px', borderRadius: '6px', background: '#E0F2FE', border: '1px solid #0284C7', color: '#0369A1', fontSize: '12px', fontWeight: 'bold' }}>
                [SEP]
              </div>
            </div>
          </div>

          {/* Contextual Clue Box */}
          <div style={{
            background: '#F0FDF4',
            border: '1px solid #BBF7D0',
            borderRadius: '8px',
            padding: '10px 12px'
          }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#166534', display: 'block', marginBottom: '3px' }}>
              🔍 Como o BERT resolveu este [MASK]?
            </span>
            <p style={{ margin: 0, fontSize: '11px', color: '#14532D', lineHeight: 1.4 }}>
              {current.contextClue}
            </p>
          </div>

          {/* Loss calculation card */}
          <div style={{
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: '8px',
            padding: '8px 12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <span style={{ fontSize: '10.5px', color: '#64748B', fontWeight: 600 }}>
                Perda Cross-Entropy nesta posição:
              </span>
              <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--infnet-dark-blue)' }}>
                <MathView math={`\\mathcal{L}_{i} = -\\log(${current.candidates[0].prob}) = ${loss.toFixed(4)}`} />
              </div>
            </div>
            <span style={{ fontSize: '11px', color: '#16A34A', fontWeight: 700 }}>
              ✓ Alvo Reconstruído!
            </span>
          </div>
        </div>

        {/* Right: Softmax Distribution over Top 5 */}
        <div style={{
          background: '#F8FAFC',
          border: '1px solid #E2E8F0',
          borderRadius: '8px',
          padding: '12px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--infnet-dark-blue)', textTransform: 'uppercase' }}>
                Top-5 Palavras Previstas pelo BERT:
              </span>
              <span style={{ fontSize: '10px', color: '#64748B' }}>Softmax(z)</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {current.candidates.map((c, idx) => (
                <div key={idx}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '2px' }}>
                    <span style={{ fontFamily: 'var(--font-code)', fontWeight: idx === 0 ? 800 : 500, color: idx === 0 ? '#166534' : '#334155' }}>
                      {idx + 1}. "{c.word}" {idx === 0 && '✓ (Alvo Real)'}
                    </span>
                    <strong style={{ color: idx === 0 ? '#16A34A' : '#64748B' }}>
                      {(c.prob * 100).toFixed(1)}%
                    </strong>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: '#E2E8F0', borderRadius: '4px', overflow: 'hidden' }}>
                    <div
                      style={{
                        width: `${c.prob * 100}%`,
                        height: '100%',
                        background: idx === 0 ? '#16A34A' : idx === 1 ? '#0284C7' : '#94A3B8'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{
            background: '#FFFFFF',
            padding: '8px',
            borderRadius: '6px',
            border: '1px solid #CBD5E1',
            fontSize: '10px',
            color: '#475569',
            marginTop: '8px'
          }}>
            ⚡ <strong>Dimensão da Saída:</strong> O vetor <MathView math="h_{[\text{MASK}]}" /> de 768 números foi multiplicado pela matriz de 30.522 linhas para gerar a pontuação de cada palavra do dicionário!
          </div>
        </div>
      </div>
    </div>
  );
}
