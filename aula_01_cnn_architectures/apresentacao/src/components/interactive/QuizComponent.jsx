import React, { useState } from 'react';
import { CheckCircle2, XCircle, HelpCircle, RotateCcw, Award } from 'lucide-react';

const QUESTIONS = [
  {
    id: 1,
    question: 'Por que o bloco residual da ResNet (F(x) + x) permite treinar redes com mais de 100 camadas sem o problema de degradação?',
    options: [
      { text: 'Porque ele reduz o número de parâmetros da rede a quase zero através de convoluções 1x1.', isCorrect: false },
      { text: 'Porque a conexão de identidade cria um caminho direto para o gradiente fluir no backpropagation (termo + 1), evitando o desvanecimento.', isCorrect: true, explanation: 'Exato! A derivada em relação à ativação anterior inclui o termo + 1 (identidade), garantindo que o gradiente nunca se anule totalmente, mesmo em redes profundas.' },
      { text: 'Porque ele descarta metade dos canais da imagem antes de aplicar as convoluções 3x3.', isCorrect: false },
      { text: 'Porque ele substitui a função de ativação ReLU por Sigmoid em todas as camadas intermediárias.', isCorrect: false }
    ]
  },
  {
    id: 2,
    question: 'Qual a principal vantagem da Convolução Depthwise Separable introduzida no Xception e MobileNet?',
    options: [
      { text: 'Desacopla a filtragem espacial (por canal individual) da combinação entre canais (Pointwise 1x1), reduzindo drasticamente o custo computacional (~8x a 9x menos FLOPs).', isCorrect: true, explanation: 'Correto! Em vez de convoluir todos os canais simultaneamente em 3D, faz-se Depthwise (2D por canal) seguido de Pointwise 1x1 (mistura de canais), gerando enorme economia de FLOPs e parâmetros.' },
      { text: 'Permite que a rede processe imagens sem necessidade de redimensionamento prévio.', isCorrect: false },
      { text: 'Garante acurácia de 100% no ImageNet sem necessidade de data augmentation.', isCorrect: false },
      { text: 'Elimina totalmente a necessidade de placas de vídeo (GPU) no treinamento.', isCorrect: false }
    ]
  },
  {
    id: 3,
    question: 'Durante o treinamento de uma CNN profunda com otimizador Adam, onde se concentra a maior parte da memória GPU RAM consumida?',
    options: [
      { text: 'Exclusivamente nos pesos estáticos do modelo (parâmetros salvos no disco).', isCorrect: false },
      { text: 'Nos mapas de ativação intermediários do forward pass (salvos para o backward pass) e nos estados dos momentos do otimizador Adam.', isCorrect: true, explanation: 'Perfeito! Em batches grandes e alta resolução, os mapas de ativação intermediários dominam a VRAM. Além disso, o Adam mantém 2 buffers de momento (m e v) por parâmetro!' },
      { text: 'Apenas no arquivo de log do TensorBoard gerado durante a época.', isCorrect: false },
      { text: 'Na conversão de cores de RGB para Grayscale no DataLoader.', isCorrect: false }
    ]
  }
];

export default function QuizComponent() {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState({});

  const currentQ = QUESTIONS[currentQIndex];

  const handleSelect = (idx) => {
    if (showResult) return;
    setSelectedOption(idx);
  };

  const handleConfirm = () => {
    if (selectedOption === null) return;
    setShowResult(true);
    const isCorrect = currentQ.options[selectedOption].isCorrect;
    if (isCorrect && !answeredQuestions[currentQIndex]) {
      setScore(prev => prev + 1);
    }
    setAnsweredQuestions(prev => ({ ...prev, [currentQIndex]: true }));
  };

  const handleNext = () => {
    if (currentQIndex < QUESTIONS.length - 1) {
      setCurrentQIndex(prev => prev + 1);
      setSelectedOption(null);
      setShowResult(false);
    }
  };

  const handleReset = () => {
    setCurrentQIndex(0);
    setSelectedOption(null);
    setShowResult(false);
    setScore(0);
    setAnsweredQuestions({});
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', height: '100%' }}>
      {/* Quiz Progress Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#EDF5FA',
        padding: '8px 16px',
        borderRadius: '8px',
        border: '1px solid #D0E3F0'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <HelpCircle size={16} color="var(--infnet-cyan)" />
          <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
            Questão {currentQIndex + 1} de {QUESTIONS.length}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--infnet-dark-blue)' }}>
            <Award size={15} color="#15803D" />
            <span>Pontuação: <strong>{score} / {QUESTIONS.length}</strong></span>
          </div>

          <button
            onClick={handleReset}
            style={{
              background: '#FFFFFF',
              border: '1px solid #CBD5E1',
              borderRadius: '4px',
              padding: '3px 8px',
              fontSize: '11px',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <RotateCcw size={12} /> Reiniciar
          </button>
        </div>
      </div>

      {/* Main Question Card */}
      <div style={{
        background: '#FFFFFF',
        border: '1px solid var(--border-light)',
        borderRadius: '8px',
        padding: '16px 20px',
        flex: 1,
        minHeight: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>
        <div>
          <h3 style={{
            fontFamily: 'var(--font-title)',
            fontSize: '15.5px',
            color: 'var(--infnet-dark-blue)',
            lineHeight: 1.4,
            marginBottom: '14px'
          }}>
            {currentQ.question}
          </h3>

          {/* Options List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              let btnBg = '#F8FAFC';
              let borderColor = '#E2E8F0';
              let textColor = 'var(--text-main)';

              if (showResult) {
                if (opt.isCorrect) {
                  btnBg = '#DCFCE7';
                  borderColor = '#22C55E';
                  textColor = '#14532D';
                } else if (isSelected && !opt.isCorrect) {
                  btnBg = '#FEE2E2';
                  borderColor = '#EF4444';
                  textColor = '#7F1D1D';
                }
              } else if (isSelected) {
                btnBg = '#EFF8FC';
                borderColor = 'var(--infnet-cyan)';
                textColor = 'var(--infnet-dark-blue)';
              }

              return (
                <div
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  style={{
                    padding: '10px 14px',
                    borderRadius: '6px',
                    border: `1.5px solid ${borderColor}`,
                    background: btnBg,
                    color: textColor,
                    fontSize: '12.5px',
                    lineHeight: 1.4,
                    cursor: showResult ? 'default' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <span>{opt.text}</span>
                  {showResult && opt.isCorrect && (
                    <CheckCircle2 size={16} color="#16A34A" style={{ flexShrink: 0, marginLeft: '8px' }} />
                  )}
                  {showResult && isSelected && !opt.isCorrect && (
                    <XCircle size={16} color="#DC2626" style={{ flexShrink: 0, marginLeft: '8px' }} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Feedback and Next Action Bar */}
        <div>
          {showResult && (
            <div style={{
              background: currentQ.options[selectedOption].isCorrect ? '#F0FDF4' : '#FFF7ED',
              border: `1px solid ${currentQ.options[selectedOption].isCorrect ? '#86EFAC' : '#FDBA74'}`,
              borderRadius: '6px',
              padding: '10px 14px',
              marginTop: '10px',
              fontSize: '12px',
              color: currentQ.options[selectedOption].isCorrect ? '#166534' : '#9A3412'
            }}>
              <strong>{currentQ.options[selectedOption].isCorrect ? '✅ Parabéns!' : '⚠️ Atenção:'}</strong>{' '}
              {currentQ.options.find(o => o.isCorrect).explanation || 'Revise o conceito correspondente nos slides anteriores.'}
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
            {!showResult ? (
              <button
                onClick={handleConfirm}
                disabled={selectedOption === null}
                style={{
                  padding: '7px 20px',
                  borderRadius: '6px',
                  border: 'none',
                  background: selectedOption !== null ? 'var(--infnet-dark-blue)' : '#CBD5E1',
                  color: '#FFFFFF',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  cursor: selectedOption !== null ? 'pointer' : 'not-allowed'
                }}
              >
                Confirmar Resposta
              </button>
            ) : currentQIndex < QUESTIONS.length - 1 ? (
              <button
                onClick={handleNext}
                style={{
                  padding: '7px 20px',
                  borderRadius: '6px',
                  border: 'none',
                  background: 'var(--infnet-cyan)',
                  color: 'var(--infnet-dark-blue)',
                  fontSize: '12.5px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Próxima Questão →
              </button>
            ) : (
              <div style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--infnet-dark-blue)', display: 'flex', alignItems: 'center' }}>
                🎉 Desafio Concluído! Pontuação Final: {score} de {QUESTIONS.length}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
