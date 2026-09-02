import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, XCircle, Award, RefreshCw, ArrowRight } from 'lucide-react';

export default function QuizTransformers() {
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const QUESTIONS = [
    {
      question: '1. Por que os Transformers modernos utilizam o algoritmo Byte-Pair Encoding (BPE) em vez de tokenização por palavras inteiras?',
      options: [
        'Porque o BPE reduz a dimensão do vetor de embedding para apenas 8 bits.',
        'Porque elimina palavras fora do vocabulário (OOV) mantendo um vocabulário fixo e compacto através da fusão estatística de subpalavras e bytes.',
        'Porque o BPE calcula a atenção diretamente no texto bruto sem precisar de matrizes de projeção linear.',
        'Porque redes convolucionais só conseguem processar caracteres individuais.'
      ],
      correct: 1,
      explanation: 'O BPE decompõe palavras raras em morfemas conhecidos e trata qualquer caractere desconhecido pelos seus bytes UTF-8 fundamentais, evitando completamente o erro de [UNK] (Out of Vocabulary).'
    },
    {
      question: '2. Qual é a razão matemática crucial pela qual dividimos o produto escalar Q · Kᵀ por √dₖ na Scaled Dot-Product Attention?',
      options: [
        'Para converter as matrizes de precisão dupla (FP64) para precisão simples (FP32).',
        'Para garantir que a soma de todos os valores de saída seja exatamente igual a zero.',
        'Para evitar que produtos escalares em altas dimensões cresçam excessivamente, empurrando a função Softmax para regiões de gradiente extremamente pequeno (saturação).',
        'Para forçar a matriz de atenção a ser simétrica e hermitiana.'
      ],
      correct: 2,
      explanation: 'A variância do produto escalar de dois vetores com média 0 e variância 1 é d_k. Dividir por √d_k normaliza a variância para 1.0, impedindo que o Softmax vire uma função quase degrau onde os gradientes desaparecem.'
    },
    {
      question: '3. Em modelos autorregressivos (como GPT), qual é o propósito de aplicar uma máscara causal com valores -∞ no triângulo superior da matriz de atenção?',
      options: [
        'Impedir que tokens em posições passadas recebam gradientes durante o backpropagation.',
        'Impedir que qualquer token atenda a tokens em posições futuras (j > i), já que exp(-∞) / ∑ = 0.0 após o Softmax.',
        'Reduzir pela metade o número de parâmetros treináveis da camada de atenção.',
        'Inverter a ordem de leitura do texto para permitir decodificação da direita para a esquerda.'
      ],
      correct: 1,
      explanation: 'A máscara causal com -∞ zera a probabilidade pós-Softmax para j > i, garantindo que o modelo treine em paralelo na GPU sem "espiar" os tokens futuros que ele próprio deve prever.'
    },
    {
      question: '4. Por que a arquitetura Multi-Head Attention divide a dimensão d_model em h cabeças de dimensão d_k = d_model / h em vez de usar 1 cabeça de tamanho total?',
      options: [
        'Porque permite ao modelo focar simultaneamente em múltiplos subespaços relacionais (ex: sintaxe, semântica, negação e rima) com o mesmo custo computacional total.',
        'Porque uma única cabeça consumiria 12 vezes mais memória de vídeo (VRAM).',
        'Porque a regra da cadeia de cálculo de derivadas não funciona em tensores de dimensão 768.',
        'Porque impede o colapso dos pesos em zero durante o treinamento.'
      ],
      correct: 0,
      explanation: 'Multi-Head Attention permite que diferentes cabeças se especializem em diferentes papéis linguísticos ou visuais em paralelo. Como d_k = d_model / h, o total de multiplicações matriciais é idêntico a uma cabeça com dimensão d_model.'
    },
    {
      question: '5. No Bloco Transformer padrão (como GPT-2 e Vaswani et al.), qual é o papel da camada Feed-Forward (MLP) com expansão 4x após a Atenção?',
      options: [
        'Ela calcula a atenção cruzada entre a entrada e a saída do decodificador.',
        'Ela processa cada token individualmente de forma não linear através de expansão d_model → 4d_model → d_model, atuando como uma memória associativa de padrões.',
        'Ela reduz a resolução espacial da sequência pela metade a cada camada.',
        'Ela zera as ativações de posições pares para economizar memória na GPU.'
      ],
      correct: 1,
      explanation: 'Enquanto a Multi-Head Attention realiza comunicação e troca de contexto entre tokens diferentes, a camada Feed-Forward (MLP com expansão 4x e ativação GELU/ReLU) processa cada posição individualmente e de forma não linear, consolidando conhecimento factual.'
    }
  ];

  const handleSelect = (idx) => {
    if (isAnswered) return;
    setSelectedOpt(idx);
    setIsAnswered(true);
    if (idx === QUESTIONS[currentQ].correct) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ((prev) => prev + 1);
      setSelectedOpt(null);
      setIsAnswered(false);
    } else {
      setShowResults(true);
    }
  };

  const handleRestart = () => {
    setCurrentQ(0);
    setSelectedOpt(null);
    setIsAnswered(false);
    setScore(0);
    setShowResults(false);
  };

  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      fontSize: '13px'
    }}>
      {/* Top Banner */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#EDF5FA',
        padding: '8px 16px',
        borderRadius: '8px',
        border: '1px solid #D0E3F0'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, color: 'var(--infnet-dark-blue)' }}>
          <HelpCircle size={18} color="var(--infnet-cyan)" />
          <span>Laboratório 5: Quiz de Fixação de Conhecimentos em Transformers</span>
        </div>
        <span style={{ fontSize: '11.5px', color: 'var(--infnet-dark-blue)', background: '#FFFFFF', padding: '3px 10px', borderRadius: '12px', fontWeight: 700 }}>
          {showResults ? 'Resultado Final' : `Questão ${currentQ + 1} de ${QUESTIONS.length}`}
        </span>
      </div>

      {showResults ? (
        /* Results Screen */
        <div style={{
          flex: 1,
          background: 'var(--bg-card)',
          border: '1.5px solid var(--border-light)',
          borderRadius: '10px',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          gap: '14px'
        }}>
          <Award size={48} color={score >= 4 ? '#15803D' : 'var(--infnet-cyan)'} />
          <h2 style={{ fontFamily: 'var(--font-title)', fontSize: '24px', color: 'var(--infnet-dark-blue)' }}>
            {score >= 4 ? 'Excelente Domínio Arquitetural! 🎉' : 'Bom Trabalho! Revise os Pontos-Chave 📚'}
          </h2>
          <p style={{ fontSize: '16px', color: 'var(--text-main)' }}>
            Você acertou <strong>{score}</strong> de <strong>{QUESTIONS.length}</strong> questões ({((score / QUESTIONS.length) * 100).toFixed(0)}%).
          </p>

          <button
            onClick={handleRestart}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'var(--infnet-dark-blue)',
              color: '#FFFFFF',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '13px',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <RefreshCw size={16} />
            <span>Refazer Quiz</span>
          </button>
        </div>
      ) : (
        /* Question Card */
        <div style={{
          flex: 1,
          background: 'var(--bg-card)',
          border: '1px solid var(--border-light)',
          borderRadius: '10px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: 0
        }}>
          <div>
            <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '15.5px', color: 'var(--infnet-dark-blue)', marginBottom: '14px', lineHeight: '1.4' }}>
              {QUESTIONS[currentQ].question}
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {QUESTIONS[currentQ].options.map((opt, idx) => {
                const isSelected = selectedOpt === idx;
                const isCorrect = idx === QUESTIONS[currentQ].correct;
                let btnBg = '#FFFFFF';
                let btnBorder = '1px solid var(--border-light)';
                let btnColor = 'var(--text-main)';

                if (isAnswered) {
                  if (isCorrect) {
                    btnBg = '#DCFCE7';
                    btnBorder = '2px solid #16A34A';
                    btnColor = '#15803D';
                  } else if (isSelected) {
                    btnBg = '#FEE2E2';
                    btnBorder = '2px solid #DC2626';
                    btnColor = '#B91C1C';
                  }
                } else if (isSelected) {
                  btnBg = '#EDF5FA';
                  btnBorder = '2px solid var(--infnet-cyan)';
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    disabled={isAnswered}
                    style={{
                      padding: '10px 14px',
                      borderRadius: '8px',
                      background: btnBg,
                      border: btnBorder,
                      color: btnColor,
                      fontSize: '12px',
                      fontWeight: isSelected || (isAnswered && isCorrect) ? 700 : 500,
                      textAlign: 'left',
                      cursor: isAnswered ? 'default' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '10px',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <span>{opt}</span>
                    {isAnswered && isCorrect && <CheckCircle2 size={18} color="#16A34A" flexShrink={0} />}
                    {isAnswered && isSelected && !isCorrect && <XCircle size={18} color="#DC2626" flexShrink={0} />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Explanation & Next Button Footer */}
          {isAnswered && (
            <div style={{
              marginTop: '12px',
              paddingTop: '10px',
              borderTop: '1px solid var(--border-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px'
            }}>
              <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', flex: 1 }}>
                💡 <strong>Explicação:</strong> {QUESTIONS[currentQ].explanation}
              </div>
              <button
                onClick={handleNext}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'var(--infnet-dark-blue)',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  flexShrink: 0
                }}
              >
                <span>{currentQ < QUESTIONS.length - 1 ? 'Próxima Questão' : 'Ver Resultado'}</span>
                <ArrowRight size={14} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
