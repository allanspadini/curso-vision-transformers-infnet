import React, { useState } from 'react';
import { CheckCircle2, XCircle, RotateCcw, Award } from 'lucide-react';

export default function QuizBert() {
  const questions = [
    {
      id: 1,
      question: 'Por que o BERT adota o Masked Language Model (MLM) em vez de modelagem autorregressiva tradicional de próximo token (como nos GPTs)?',
      options: [
        { text: 'Porque redes autorregressivas exigem atenção triangular causal, impossibilitando que cada token enxergue palavras passadas e futuras simultaneamente.', correct: true },
        { text: 'Porque o cálculo do produto escalar escalado (Q·Kᵀ) só converge matematicamente se ao menos 15% das entradas forem zeradas.', correct: false },
        { text: 'Porque o algoritmo de tokenização WordPiece não suporta leitura causal da esquerda para a direita.', correct: false },
        { text: 'Porque o token [CLS] só consegue agregar informação se todas as palavras do texto forem convertidas em [MASK].', correct: false }
      ],
      explanation: 'Exato! Em modelos causais (GPT), cada token só pode consultar tokens à esquerda para não "trapacear" prevendo a si mesmo. O MLM mascara 15% das palavras, permitindo que a atenção seja 100% bidirecional e profunda em todas as camadas sem vazamento de futuro!'
    },
    {
      id: 2,
      question: 'No Reconhecimento de Entidades (NER) com WordPiece, qual é a função essencial de rotular subwords subsequentes (ex: "##ino") com o valor -100?',
      options: [
        { text: 'O valor -100 força o otimizador AdamW a zerar o learning rate em tokens curtos.', correct: false },
        { text: 'O valor -100 é o ignore_index padrão da CrossEntropyLoss no PyTorch, impedindo que subpalavras fragmentadas gerem falsas entidades adicionais ou penalidades injustas.', correct: true },
        { text: 'Serve para que o vetor de embeddings posicional senoidal seja invertido naquelas coordenadas.', correct: false },
        { text: 'Sinaliza ao tokenizer que o token deve ser deletado antes de entrar na camada de Self-Attention.', correct: false }
      ],
      explanation: 'Perfeito! No PyTorch, `nn.CrossEntropyLoss(ignore_index=-100)` ignora completamente essas posições no cômputo da perda e dos gradientes. Apenas a primeira subword recebe a tag da entidade (ex: B-LOC), preservando a coerência métrica da avaliação.'
    },
    {
      id: 3,
      question: 'Como a cabeça modular de Question Answering Extrativo (SQuAD) localiza a resposta dentro de um documento longo?',
      options: [
        { text: 'O BERT decodifica autorregressivamente cada caractere da resposta usando Cross-Attention.', correct: false },
        { text: 'O modelo aprende apenas dois vetores lineares (S e E), calculando o produto escalar com cada token h_i do contexto para encontrar as probabilidades de início e fim (span) da resposta.', correct: true },
        { text: 'O BERT calcula a similaridade de cosseno entre o vetor [CLS] e uma base de dados externa no SQLite.', correct: false },
        { text: 'Aplica-se uma convolução 1x1 seguida de MaxPool global para resumir o documento em uma única palavra.', correct: false }
      ],
      explanation: 'Correto! Não há geração de texto livre. Dois vetores de 768 dimensões calculam os logits de Start (s_i = S·h_i) e End (e_j = E·h_j). O par de índices (i, j) com maior pontuação combinada define com precisão o span da resposta contida no documento.'
    },
    {
      id: 4,
      question: 'Qual é a principal vantagem dos Bi-Encoders (Sentence-BERT) em relação aos Cross-Encoders na busca semântica em larga escala?',
      options: [
        { text: 'Bi-Encoders geram embeddings independentes para documentos em batch offline, permitindo buscas em milissegundos via produto escalar em índices vetoriais (ANN), enquanto Cross-Encoders exigiriam reprocessar pares com custo proibitivo.', correct: true },
        { text: 'Bi-Encoders eliminam a necessidade de camadas de Self-Attention, reduzindo a complexidade temporal para O(1).', correct: false },
        { text: 'Bi-Encoders utilizam decodificadores causais autorregressivos para traduzir a pergunta em SQL.', correct: false },
        { text: 'Cross-Encoders não conseguem processar mais de duas palavras simultaneamente.', correct: false }
      ],
      explanation: 'Exato! Cross-Encoders têm altíssima precisão mas exigem computação conjunta O(N) para cada busca, inviabilizando milhões de documentos. Bi-Encoders (SBERT) calculam vetores fixos offline (Mean Pooling), reduzindo a busca a similaridade de cosseno em bancos vetoriais (FAISS/Pinecone) em menos de 5ms!'
    }
  ];

  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const q = questions[currentQ];

  const handleSelectOption = (idx) => {
    if (showFeedback) return;
    setSelectedOpt(idx);
    setShowFeedback(true);
    if (q.options[idx].correct) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ((prev) => prev + 1);
      setSelectedOpt(null);
      setShowFeedback(false);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentQ(0);
    setSelectedOpt(null);
    setShowFeedback(false);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {/* Top Banner */}
      <div style={{
        background: '#0A345D',
        borderRadius: '8px',
        padding: '8px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: '#FFFFFF'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Award size={20} color="#64D9EF" />
          <span style={{ fontSize: '13px', fontWeight: 700 }}>
            Quiz Interativo de Fixação: BERT, MLM, NSP e Arquiteturas Encoder-Only
          </span>
        </div>
        <div style={{ fontSize: '11px', color: '#64D9EF', fontWeight: 600 }}>
          Pergunta {currentQ + 1} de {questions.length} • Pontuação: {score} / {questions.length}
        </div>
      </div>

      {/* Main Quiz Card */}
      <div style={{
        flex: 1,
        minHeight: 0,
        background: '#FFFFFF',
        border: '1px solid #E2E8F0',
        borderRadius: '10px',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>
        {!isFinished ? (
          <>
            <div>
              {/* Question Text */}
              <h3 style={{
                fontSize: '15px',
                color: 'var(--infnet-dark-blue)',
                marginBottom: '14px',
                lineHeight: 1.4,
                fontFamily: 'var(--font-title)'
              }}>
                {q.id}. {q.question}
              </h3>

              {/* Options List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {q.options.map((opt, idx) => {
                  let border = '1px solid #CBD5E1';
                  let bg = '#F8FAFC';
                  let color = '#334155';

                  if (showFeedback) {
                    if (opt.correct) {
                      border = '2px solid #16A34A';
                      bg = '#DCFCE7';
                      color = '#14532D';
                    } else if (selectedOpt === idx && !opt.correct) {
                      border = '2px solid #DC2626';
                      bg = '#FEE2E2';
                      color = '#991B1B';
                    }
                  } else if (selectedOpt === idx) {
                    border = '2px solid var(--infnet-cyan)';
                    bg = '#E0F2FE';
                    color = 'var(--infnet-dark-blue)';
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={showFeedback}
                      style={{
                        padding: '10px 14px',
                        borderRadius: '8px',
                        border,
                        background: bg,
                        color,
                        fontSize: '12px',
                        fontWeight: 500,
                        textAlign: 'left',
                        cursor: showFeedback ? 'default' : 'pointer',
                        transition: 'all 0.2s',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        lineHeight: 1.35
                      }}
                    >
                      <span style={{
                        width: '22px',
                        height: '22px',
                        borderRadius: '50%',
                        border: '1px solid currentColor',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        fontSize: '11px',
                        flexShrink: 0
                      }}>
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span style={{ flex: 1 }}>{opt.text}</span>
                      {showFeedback && opt.correct && <CheckCircle2 size={18} color="#16A34A" />}
                      {showFeedback && selectedOpt === idx && !opt.correct && <XCircle size={18} color="#DC2626" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Feedback & Explanation */}
            {showFeedback && (
              <div style={{
                background: q.options[selectedOpt].correct ? '#F0FDF4' : '#FEF2F2',
                border: `1px solid ${q.options[selectedOpt].correct ? '#86EFAC' : '#FCA5A5'}`,
                borderRadius: '8px',
                padding: '10px 14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: '10px'
              }}>
                <div style={{ fontSize: '11px', color: q.options[selectedOpt].correct ? '#14532D' : '#991B1B', lineHeight: 1.4, flex: 1 }}>
                  <strong>{q.options[selectedOpt].correct ? '✓ Resposta Correta! ' : '✗ Incorreto. '}</strong>
                  {q.explanation}
                </div>
                <button
                  onClick={handleNext}
                  style={{
                    marginLeft: '12px',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    background: 'var(--infnet-dark-blue)',
                    color: '#FFFFFF',
                    border: 'none',
                    fontWeight: 700,
                    fontSize: '11px',
                    cursor: 'pointer',
                    flexShrink: 0
                  }}
                >
                  {currentQ < questions.length - 1 ? 'Próxima Pergunta →' : 'Ver Resultado Final 🏆'}
                </button>
              </div>
            )}
          </>
        ) : (
          /* Final Score Screen */
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            height: '100%',
            gap: '14px'
          }}>
            <div style={{
              width: '70px',
              height: '70px',
              borderRadius: '50%',
              background: score >= 3 ? '#DCFCE7' : '#FEF3C7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: score >= 3 ? '#16A34A' : '#D97706',
              boxShadow: '0 4px 14px rgba(0,0,0,0.1)'
            }}>
              <Award size={38} />
            </div>

            <h2 style={{ fontSize: '20px', color: 'var(--infnet-dark-blue)', margin: 0, fontFamily: 'var(--font-title)' }}>
              {score === 4 ? 'Desempenho Perfeito! 🎯' : score >= 3 ? 'Excelente Domínio do BERT! 🚀' : 'Bom esforço! Continue revisando os conceitos 💡'}
            </h2>

            <p style={{ fontSize: '13px', color: '#475569', margin: 0, maxWidth: '500px' }}>
              Você acertou <strong>{score} de {questions.length} perguntas</strong> ({((score / questions.length) * 100).toFixed(0)}%). Agora você domina os fundamentos do Masked Language Model, Next Sentence Prediction, e a versatilidade das cabeças modulares do BERT.
            </p>

            <button
              onClick={handleRestart}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                borderRadius: '8px',
                background: 'var(--infnet-cyan)',
                color: '#FFFFFF',
                border: 'none',
                fontWeight: 700,
                fontSize: '12px',
                cursor: 'pointer'
              }}
            >
              <RotateCcw size={16} /> Reiniciar Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
