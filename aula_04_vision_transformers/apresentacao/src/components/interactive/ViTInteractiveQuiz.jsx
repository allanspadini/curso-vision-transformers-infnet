import React, { useState } from 'react';

export default function ViTInteractiveQuiz() {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const questions = [
    {
      id: 1,
      question: '1. Fatiamento de Patches: Em uma imagem 384 × 384 com patch 16 × 16, qual é a quantidade de tokens na entrada do Transformer Encoder?',
      options: [
        { id: 'a', text: '384 tokens (um token por linha horizontal da imagem).' },
        { id: 'b', text: '577 tokens: 576 patches espaciais (24 × 24) somados a 1 token especial [CLS].' },
        { id: 'c', text: '197 tokens: o Transformer fixa o tamanho máximo de tokens em 197 independentemente da resolução da imagem.' },
        { id: 'd', text: '147.456 tokens: cada pixel RGB é tratado como um token individual de dimensão D.' }
      ],
      correct: 'b',
      explanation: 'Correto! N = (384/16)² = 24 × 24 = 576 patches. Concatenando o token agregador especial [CLS], o comprimento total da sequência torna-se 576 + 1 = 577 tokens.'
    },
    {
      id: 2,
      question: '2. Viés Indutivo: Por que o ViT puro tem pior desempenho que uma ResNet ao ser treinado do zero em datasets moderados (ImageNet-1k)?',
      options: [
        { id: 'a', text: 'Porque o ViT possui camadas convolucionais excessivamente profundas que dissipam o gradiente.' },
        { id: 'b', text: 'Porque o ViT tem viés indutivo fraco (não assume localidade 2D nem translação), exigindo dados massivos ou regularizações como CutMix para não memorizar ruído.' },
        { id: 'c', text: 'Porque a função de ativação GELU gera saturação assintótica nos tensores de patch.' },
        { id: 'd', text: 'Porque o token [CLS] descarta toda a informação espacial presente nos patches intermediários.' }
      ],
      correct: 'b',
      explanation: 'Exato! A convolução já assume a priori que pixels vizinhos formam texturas e que objetos podem transladar. O ViT tem liberdade irrestrita de atenção, precisando de muito mais dados ou forte regularização para aprender a estrutura visual.'
    },
    {
      id: 3,
      question: '3. Mecânica do CutMix: Se a caixa recortada de uma classe B ocupa 30% da área sobreposta à classe A (λ = 0.70), qual é o alvo de treinamento?',
      options: [
        { id: 'a', text: 'O rótulo é binário: vence a classe A (100% classe A e 0% classe B) pois ela é a maioria da imagem.' },
        { id: 'b', text: 'Os pixels cortados são zerados com blackout preto e o alvo permanece inalterado.' },
        { id: 'c', text: 'Gera-se um rótulo suave (soft target): ŷ = 0.70 · y_A + 0.30 · y_B, e a perda Cross-Entropy pondera ambas as classes pela proporção de área.' },
        { id: 'd', text: 'A imagem combinada é descartada e o batch é reamostrado.' }
      ],
      correct: 'c',
      explanation: 'Perfeito! O CutMix calcula o soft target ỹ = λ·y_A + (1-λ)·y_B. A perda Cross-Entropy penaliza suavemente a rede se ela previr apenas uma das classes, forçando a atenção a distribuir seus pesos por ambos os objetos.'
    }
  ];

  const handleSelect = (qId, optId) => {
    if (submitted) return;
    setSelectedAnswers(prev => ({ ...prev, [qId]: optId }));
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correct) score++;
    });
    return score;
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {/* Banner Superior */}
      <div style={{
        background: '#F8FAFC',
        border: '1px solid #E2E8F0',
        borderRadius: '8px',
        padding: '8px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
          Fixação de Conceitos: Vision Transformers & CutMix
        </div>
        {submitted ? (
          <div style={{ fontSize: '13px', fontWeight: 800, color: calculateScore() === 3 ? '#16A34A' : '#C2410C' }}>
            Pontuação: {calculateScore()} / {questions.length} ({Math.round((calculateScore() / questions.length) * 100)}%)
          </div>
        ) : (
          <span className="badge badge-cyan">3 Questões de Fixação</span>
        )}
      </div>

      {/* Área de Questões com Scroll Suave */}
      <div style={{
        flex: 1,
        background: '#FFFFFF',
        borderRadius: '12px',
        border: '1px solid #E2E8F0',
        padding: '14px 18px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        minHeight: 0
      }}>
        {questions.map((q) => {
          const isCorrect = selectedAnswers[q.id] === q.correct;
          return (
            <div key={q.id} style={{ borderBottom: '1px solid #F1F5F9', paddingBottom: '10px' }}>
              <div style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--infnet-dark-blue)', marginBottom: '6px' }}>
                {q.question}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {q.options.map((opt) => {
                  const isSelected = selectedAnswers[q.id] === opt.id;
                  let optStyle = {
                    padding: '6px 10px',
                    borderRadius: '6px',
                    border: '1px solid #E2E8F0',
                    background: '#F8FAFC',
                    cursor: submitted ? 'default' : 'pointer',
                    fontSize: '11.5px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'all 0.15s'
                  };

                  if (isSelected && !submitted) {
                    optStyle.border = '2px solid var(--infnet-cyan)';
                    optStyle.background = '#E0F2FE';
                    optStyle.color = 'var(--infnet-dark-blue)';
                    optStyle.fontWeight = 600;
                  }

                  if (submitted) {
                    if (opt.id === q.correct) {
                      optStyle.border = '2px solid #16A34A';
                      optStyle.background = '#DCFCE7';
                      optStyle.color = '#14532D';
                      optStyle.fontWeight = 700;
                    } else if (isSelected && opt.id !== q.correct) {
                      optStyle.border = '2px solid #DC2626';
                      optStyle.background = '#FEE2E2';
                      optStyle.color = '#7F1D1D';
                    }
                  }

                  return (
                    <div
                      key={opt.id}
                      onClick={() => handleSelect(q.id, opt.id)}
                      style={optStyle}
                    >
                      <span style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        border: '1px solid #CBD5E1',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '10px',
                        fontWeight: 700
                      }}>
                        {opt.id.toUpperCase()}
                      </span>
                      <span>{opt.text}</span>
                    </div>
                  );
                })}
              </div>

              {submitted && (
                <div style={{
                  marginTop: '6px',
                  padding: '6px 10px',
                  borderRadius: '6px',
                  background: isCorrect ? '#F0FDF4' : '#FFFBEB',
                  border: isCorrect ? '1px solid #BBF7D0' : '1px solid #FDE68A',
                  fontSize: '11px',
                  color: isCorrect ? '#166534' : '#92400E'
                }}>
                  {isCorrect ? '✅ ' : 'ℹ️ '} {q.explanation}
                </div>
              )}
            </div>
          );
        })}

        {/* Botão de Envio / Reinício */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '4px' }}>
          {!submitted ? (
            <button
              onClick={() => setSubmitted(true)}
              disabled={Object.keys(selectedAnswers).length < questions.length}
              style={{
                padding: '6px 16px',
                borderRadius: '6px',
                border: 'none',
                background: Object.keys(selectedAnswers).length < questions.length ? '#CBD5E1' : 'var(--infnet-dark-blue)',
                color: '#FFFFFF',
                fontSize: '12px',
                fontWeight: 700,
                cursor: Object.keys(selectedAnswers).length < questions.length ? 'not-allowed' : 'pointer'
              }}
            >
              Confirmar Respostas
            </button>
          ) : (
            <button
              onClick={() => {
                setSelectedAnswers({});
                setSubmitted(false);
              }}
              style={{
                padding: '6px 16px',
                borderRadius: '6px',
                border: '1px solid #CBD5E1',
                background: '#FFFFFF',
                color: 'var(--infnet-dark-blue)',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Refazer Quiz
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
