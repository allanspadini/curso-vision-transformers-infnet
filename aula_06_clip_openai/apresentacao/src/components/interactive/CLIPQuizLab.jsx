import React, { useState } from 'react';
import { CheckCircle2, XCircle, HelpCircle, Award, RotateCcw } from 'lucide-react';

export default function CLIPQuizLab() {
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);

  const questions = [
    {
      q: '1. No modelo CLIP (Radford et al., 2021), por que a normalização L2 obrigatória dos vetores de saída dos encoders visual e textual (||Î|| = 1 e ||T̂|| = 1) é indispensável antes do cálculo da matriz de logits?',
      options: [
        {
          text: 'A) Porque a normalização L2 reduz a dimensão dos tensores de 768 para 512.',
          correct: false,
          explanation: 'Incorreto. A redução dimensional é realizada pelas camadas lineares de projeção W_v e W_t, não pela norma L2.'
        },
        {
          text: 'B) Porque converte o produto escalar diretamente em Similaridade de Cosseno no intervalo [-1, +1], impedindo que a magnitude espúria dos vetores domine a perda e estabilizando a dinâmica da temperatura τ.',
          correct: true,
          explanation: 'Correto! Sem a normalização L2, amostras com normas euclidianas gigantescas saturariam o Softmax artificialmente, mascarando a real proximidade angular e gerando instabilidade severa de gradientes.'
        },
        {
          text: 'C) Porque transforma a matriz de similaridade em uma matriz estritamente ortogonal.',
          correct: false,
          explanation: 'Incorreto. A matriz de similaridade não se torna ortogonal; ela mapeia os cossenos de todos os pares cruzados.'
        },
        {
          text: 'D) Porque o PyTorch não possui implementação de Cross-Entropy para tensores desnormalizados.',
          correct: false,
          explanation: 'Incorreto. A CrossEntropyLoss opera com qualquer escala de logits no PyTorch.'
        }
      ]
    },
    {
      q: '2. Por que o Prompt Ensembling (média dos embeddings textuais de ~80 templates estilísticos) gerou um ganho de +5.0% de acurácia no ImageNet sem aumentar o custo computacional de inferência da imagem?',
      options: [
        {
          text: 'A) Porque os 80 embeddings de texto são calculados e cacheados apenas uma vez offline, cancelando ruídos semânticos e polissemia em uma única direção média estável W_class.',
          correct: true,
          explanation: 'Perfeito! Como o Text Encoder é executado apenas uma vez para montar a matriz de classes W, a média vetorial dos 80 prompts estabiliza o centroide conceitual a custo computacional de inferência de imagem rigorosamente ZERO.'
        },
        {
          text: 'B) Porque o ensemble força o Vision Encoder a rodar 80 vezes por imagem.',
          correct: false,
          explanation: 'Incorreto. O Vision Encoder roda apenas 1 vez por imagem. Quem tem múltiplos prompts é a torre de texto.'
        },
        {
          text: 'C) Porque elimina a necessidade de usar o token especial [EOS] no Transformer de texto.',
          correct: false,
          explanation: 'Incorreto. Cada um dos 80 templates continua utilizando a extração de características via token [EOS].'
        },
        {
          text: 'D) Porque converte o problema multiclasse em 80 regressões lineares binárias independentes.',
          correct: false,
          explanation: 'Incorreto. A inferência permanece uma classificação multiclasse Softmax sobre o vetor médio.'
        }
      ]
    },
    {
      q: '3. Em tarefas downstream com poucos dados rotulados, qual é a principal razão pela qual o Linear Probe (congelamento total dos encoders do CLIP) é preferido em relação ao Full Fine-Tuning?',
      options: [
        {
          text: 'A) O Full Fine-Tuning sofre de "Catastrophic Forgetting" e atalho de dados (shortcut learning), destruindo a robustez fora da distribuição (OOD) aprendida no pré-treinamento.',
          correct: true,
          explanation: 'Exato! Radford et al. e Kumar et al. (2022) provaram que o fine-tuning irrestrito superajusta em texturas espúrias do dataset alvo, despencando a acurácia em distribuições adversárias (ImageNet-A, R, Sketch).'
        },
        {
          text: 'B) O Vision Encoder do CLIP não pode receber gradientes de backpropagation por restrição de licença de código.',
          correct: false,
          explanation: 'Incorreto. O modelo é open-source e seus pesos suportam backpropagation normalmente.'
        },
        {
          text: 'C) O Linear Probe exige 10 vezes mais memória VRAM do que o Full Fine-Tuning.',
          correct: false,
          explanation: 'Incorreto. O Linear Probe consome muito menos memória VRAM porque não armazena mapas de ativação nem calcula gradientes das camadas profundas.'
        },
        {
          text: 'D) Porque o Linear Probe modifica diretamente a arquitetura de atenção do ViT.',
          correct: false,
          explanation: 'Incorreto. O Linear Probe adiciona apenas uma camada linear sobre os embeddings fixos.'
        }
      ]
    },
    {
      q: '4. Qual é o papel da redução de dimensionalidade através das matrizes de projeção linear W_v e W_t no paradigma do CLIP?',
      options: [
        {
          text: 'A) Aumentar a dimensionalidade dos tensores para viabilizar convoluções 3D.',
          correct: false,
          explanation: 'Incorreto. As projeções reduzem ou equalizam a dimensionalidade (ex: 768 ou 2048 para 512).'
        },
        {
          text: 'B) Atuar como um gargalo de informação (Information Bottleneck) que filtra ruídos visuais/gramaticais irrelevantes e alinha os dois subespaços métricos na mesma hiperesfera compacta.',
          correct: true,
          explanation: 'Correto! A projeção força o modelo a descartar variações específicas de cada modalidade (ruídos de textura, sinônimos redundantes) retendo apenas as invariantes semânticas compartilhadas.'
        },
        {
          text: 'C) Eliminar a camada de Layer Normalization dos blocos de Transformer.',
          correct: false,
          explanation: 'Incorreto. LayerNorm continua operando dentro de cada bloco dos encoders.'
        },
        {
          text: 'D) Evitar que a temperatura τ seja aprendida durante o treinamento.',
          correct: false,
          explanation: 'Incorreto. A temperatura τ é um parâmetro escalar livre e independente das matrizes de projeção.'
        }
      ]
    },
    {
      q: '5. Como a detecção de anomalias industriais (ex: MVTec AD) é viabilizada pelo CLIP sem a necessidade de imagens com falhas durante o treinamento?',
      options: [
        {
          text: 'A) Treinando um Autoencoder denso a partir do zero com 1 milhão de épocas.',
          correct: false,
          explanation: 'Incorreto. O CLIP dispensa o retreinamento do zero de autoencoders densos.'
        },
        {
          text: 'B) Através de prompts contrastivos de integridade ("pristine" vs "damaged") ou medição da distância euclidiana/cosseno do embedding visual em relação ao centroide de peças sadias conhecidas.',
          correct: true,
          explanation: 'Brilhante! Como o CLIP possui compreensão semântica prévia do que significa "defeituoso", "rachado" ou "perfeito", a probabilidade relativa entre esses prompts funciona como um detector de falhas zero-shot altamente eficaz.'
        },
        {
          text: 'C) Aplicando filtros de Sobel e Canny nos gradientes da atenção.',
          correct: false,
          explanation: 'Incorreto. Esses são operadores heurísticos tradicionais de processamento de imagem, não a abordagem multimodal do CLIP.'
        },
        {
          text: 'D) Descartando a torre de texto e usando apenas a Softmax da ResNet.',
          correct: false,
          explanation: 'Incorreto. A detecção zero-shot é orientada primordialmente pelo alinhamento com os prompts textuais da torre de texto.'
        }
      ]
    }
  ];

  const handleSelectOption = (idx) => {
    if (showFeedback) return;
    setSelectedOpt(idx);
    setShowFeedback(true);
    setAnsweredCount(prev => prev + 1);
    if (questions[currentQ].options[idx].correct) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(prev => prev + 1);
      setSelectedOpt(null);
      setShowFeedback(false);
    }
  };

  const handleReset = () => {
    setCurrentQ(0);
    setSelectedOpt(null);
    setShowFeedback(false);
    setScore(0);
    setAnsweredCount(0);
  };

  const currentQuestion = questions[currentQ];
  const isFinished = answeredCount === questions.length && showFeedback && currentQ === questions.length - 1;

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '14px' }}>
      
      {/* Barra de Progresso e Placar */}
      <div style={{
        background: '#EDF5FA',
        border: '1px solid #D0E3F0',
        borderRadius: '10px',
        padding: '10px 18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <HelpCircle size={18} color="#0A345D" />
          <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--infnet-dark-blue)' }}>
            Questão {currentQ + 1} de {questions.length}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
            Pontuação: <span style={{ color: '#16A34A', fontFamily: 'Fira Code' }}>{score}</span> / {answeredCount}
          </div>
          <button
            onClick={handleReset}
            style={{
              background: '#FFFFFF',
              border: '1px solid #CBD5E1',
              padding: '4px 10px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '11px',
              fontWeight: 600,
              color: '#475569',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <RotateCcw size={12} /> Reiniciar
          </button>
        </div>
      </div>

      {/* Card da Questão */}
      <div style={{
        flex: 1,
        background: '#FFFFFF',
        border: '1.5px solid var(--border-light)',
        borderRadius: '12px',
        padding: '18px 22px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div>
          <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--infnet-dark-blue)', lineHeight: '1.5', marginBottom: '14px' }}>
            {currentQuestion.q}
          </h3>

          {/* Opções */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {currentQuestion.options.map((opt, idx) => {
              let btnBg = '#F8FAFC';
              let btnBorder = '#E2E8F0';
              let textColor = '#1E293B';

              if (showFeedback) {
                if (opt.correct) {
                  btnBg = '#DCFCE7';
                  btnBorder = '#22C55E';
                  textColor = '#14532D';
                } else if (selectedOpt === idx) {
                  btnBg = '#FEE2E2';
                  btnBorder = '#EF4444';
                  textColor = '#991B1B';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={showFeedback}
                  style={{
                    background: btnBg,
                    border: `1.5px solid ${btnBorder}`,
                    borderRadius: '8px',
                    padding: '10px 14px',
                    textAlign: 'left',
                    fontSize: '12px',
                    color: textColor,
                    fontWeight: showFeedback && opt.correct ? 700 : 500,
                    cursor: showFeedback ? 'default' : 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <span>{opt.text}</span>
                  {showFeedback && opt.correct && <CheckCircle2 size={16} color="#16A34A" />}
                  {showFeedback && selectedOpt === idx && !opt.correct && <XCircle size={16} color="#DC2626" />}
                </button>
              );
            })}
          </div>

          {/* Feedback Explicativo */}
          {showFeedback && (
            <div style={{
              marginTop: '12px',
              padding: '10px 14px',
              borderRadius: '8px',
              background: currentQuestion.options[selectedOpt]?.correct ? '#F0FDF4' : '#FFF5F5',
              border: `1px solid ${currentQuestion.options[selectedOpt]?.correct ? '#BBF7D0' : '#FED7D7'}`,
              fontSize: '11.5px',
              color: currentQuestion.options[selectedOpt]?.correct ? '#166534' : '#991B1B',
              lineHeight: '1.45'
            }}>
              <strong>{currentQuestion.options[selectedOpt]?.correct ? '✓ Resposta Correta!' : '✕ Resposta Incorreta.'}</strong>{' '}
              {currentQuestion.options[selectedOpt]?.explanation}
            </div>
          )}
        </div>

        {/* Rodapé do Quiz */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '10px' }}>
          {showFeedback && currentQ < questions.length - 1 && (
            <button
              onClick={handleNext}
              style={{
                background: 'var(--infnet-dark-blue)',
                color: '#FFFFFF',
                padding: '6px 16px',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: 700
              }}
            >
              Próxima Questão ➔
            </button>
          )}

          {isFinished && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Award size={20} color="#16A34A" />
              <span style={{ fontSize: '13px', fontWeight: 800, color: '#16A34A' }}>
                Quiz Concluído! Aproveitamento: {((score / questions.length) * 100).toFixed(0)}%
              </span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
