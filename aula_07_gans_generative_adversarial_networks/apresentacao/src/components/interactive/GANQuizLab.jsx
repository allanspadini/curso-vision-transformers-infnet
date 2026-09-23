import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, XCircle, RotateCcw } from 'lucide-react';

export default function GANQuizLab() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);

  const questions = [
    {
      id: 1,
      title: 'Questão 1 • Dinâmica de Gradientes Minimax & Heurística Não-Saturante',
      question: 'No treinamento de uma DCGAN, por que substituímos a minimização da função original log(1 - D(G(z))) pela maximização de log D(G(z)) (ou minimização de -log D) para atualizar o gerador?',
      options: [
        {
          id: 'A',
          text: 'Porque a formulação original possui mínimo em um ponto diferente do Equilíbrio de Nash.',
          correct: false,
          feedback: 'Incorreto. Ambas as formulações compartilham rigorosamente o mesmo ponto fixo assintótico onde D(x) = 1/2.'
        },
        {
          id: 'B',
          text: 'Porque no início do treino, quando D rejeita fakes com facilidade (D ≈ 0), a função original satura com gradiente nulo, enquanto -log D provê gradientes vigorosos.',
          correct: true,
          feedback: 'Correto! A derivada de log(1 - D) em relação a D é proporcional a D. Quando D ≈ 0, o gradiente colapsa a zero (vanishing gradient). A heurística não-saturante -log D tem gradiente proporcional a (1 - D) ≈ 1.0, empurrando o gerador com força máxima.'
        },
        {
          id: 'C',
          text: 'Porque log D dispensa a necessidade de retropropagar gradientes através das camadas do discriminador.',
          correct: false,
          feedback: 'Incorreto. Em ambas as perdas, os gradientes fluem obrigatoriamente através de todo o discriminador até alcançarem o gerador.'
        },
        {
          id: 'D',
          text: 'Porque log D garante automaticamente que a rede do discriminador seja 1-Lipschitz contínua.',
          correct: false,
          feedback: 'Incorreto. A continuidade Lipschitz é garantida por Spectral Normalization ou Gradient Penalty (WGAN-GP), não pela escolha do logaritmo.'
        }
      ]
    },
    {
      id: 2,
      title: 'Questão 2 • Arquitetura da GAN Condicional (cGAN) & Coloração Virtual (Project 9B)',
      question: 'Em uma cGAN aplicada à coloração virtual de tecidos biológicos (ex: neurônios motores humanos com marcadores fluorescentes y ∈ {DAPI, NeuN, GFP}), como o rótulo da condição y é estruturalmente injetado no Gerador e no Discriminador?',
      options: [
        {
          id: 'A',
          text: 'O rótulo é usado apenas como critério de parada prematura (early stopping) durante o treinamento.',
          correct: false,
          feedback: 'Incorreto. O rótulo y é um sinal de entrada tensorial ativo no grafo computacional durante todos os passos forward e backward.'
        },
        {
          id: 'B',
          text: 'No Gerador, o vetor de embedding de y é concatenado ao ruído z (ou à imagem base); no Discriminador, o mapa de y é injetado como canal adicional, forçando D a verificar realismo E correspondência com o biomarcador.',
          correct: true,
          feedback: 'Correto! A cGAN condiciona ambas as redes: o gerador mapeia [z; y] para x̃, e o discriminador avalia D(x, y), punindo o gerador se a imagem for realista porém associada ao marcador ou fenótipo celular incorreto.'
        },
        {
          id: 'C',
          text: 'O rótulo y substitui inteiramente o vetor de ruído latente z, tornando o gerador determinístico sem estocasticidade.',
          correct: false,
          feedback: 'Incorreto. O ruído z continua sendo indispensável para gerar variedade morfológica; sem z, o modelo geraria uma única imagem fixa para cada marcador.'
        },
        {
          id: 'D',
          text: 'O rótulo é aplicado apenas multiplicando a matriz de covariância da saída final por um escalar constante.',
          correct: false,
          feedback: 'Incorreto. A injeção de condição é realizada via concatenação de tensores ou camadas de normalização condicional adaptativa (AdaIN).'
        }
      ]
    },
    {
      id: 3,
      title: 'Questão 3 • Consistência de Ciclo na CycleGAN & Holo2Bright (Project 9C)',
      question: 'Por que a CycleGAN é capaz de realizar tradução entre microscopia holográfica (Holo) e campo claro (Bright-Field) sem necessitar de pares alinhados da mesma célula viva?',
      options: [
        {
          id: 'A',
          text: 'Porque utiliza auto-encoders supervisionados que memorizam as coordenadas exatas dos pixels de cada microscópio.',
          correct: false,
          feedback: 'Incorreto. A CycleGAN opera de forma não-pareada e não supervisionada sobre distribuições desacopladas de imagens.'
        },
        {
          id: 'B',
          text: 'Porque a perda de consistência de ciclo força F(G(x)) ≈ x e G(F(y)) ≈ y, impedindo que o gerador sofra colapso de modos ou invente estruturas celulares que não possam ser revertidas à origem.',
          correct: true,
          feedback: 'Correto! A perda de ciclo L_cyc = ||F(G(x)) - x||_1 cria uma bijeção de conteúdo: se o gerador G deformar a morfologia celular ou apagar núcleos, o gerador reverso F jamais conseguirá reconstruir o holograma original x, penalizando a rede.'
        },
        {
          id: 'C',
          text: 'Porque ela converte previamente todas as imagens para embeddings textuais do CLIP antes da convolução.',
          correct: false,
          feedback: 'Incorreto. A CycleGAN opera puramente no domínio de tensores de imagem com geradores ResNet e discriminadores PatchGAN.'
        },
        {
          id: 'D',
          text: 'Porque a distância euclidiana simples entre médias de pixels de imagens não-pareadas é suficiente para alinhar as distribuições.',
          correct: false,
          feedback: 'Incorreto. Distâncias pixel a pixel em imagens não pareadas geram apenas borrões indistintos sem significado biológico.'
        }
      ]
    },
    {
      id: 4,
      title: 'Questão 4 • Avaliação Clínica/Diagnóstica & Recall da Classe Rara',
      question: 'Em um projeto de classificação diagnóstica com desbalanceamento severo (ex: 85% fenótipo comum e 15% patologia rara/crítica), qual métrica downstream deve governar a decisão de sucesso do data augmentation generativo e por quê?',
      options: [
        {
          id: 'A',
          text: 'Acurácia global, pois reflete o percentual absoluto de acertos em todo o conjunto de amostras.',
          correct: false,
          feedback: 'Incorreto. Acurácia global é uma métrica traiçoeira em dados desbalanceados: um modelo que sempre prevê a classe majoritária atinge 85% de acurácia, mas deixa 100% dos casos patológicos sem detecção.'
        },
        {
          id: 'B',
          text: 'A perda de entropia cruzada no conjunto de treino da GAN.',
          correct: false,
          feedback: 'Incorreto. A loss da GAN oscila dinamicamente e não possui correlação direta com a utilidade diagnóstica dos dados sintéticos para o classificador downstream.'
        },
        {
          id: 'C',
          text: 'Recall (Sensibilidade) da classe rara no classificador downstream avaliado em conjunto de teste 100% real, pois minimiza Falsos Negativos clínicos.',
          correct: true,
          feedback: 'Correto! Na triagem médica e diagnóstica, um Falso Negativo (caso crítico liberado sem detecção) é o erro mais grave. O objetivo da síntese generativa é calibrar a fronteira de decisão para elevar o Recall da classe rara (ex: ≥ 90%), garantindo segurança clínica.'
        },
        {
          id: 'D',
          text: 'O número total de parâmetros treináveis da arquitetura ResNet.',
          correct: false,
          feedback: 'Incorreto. Quantidade de parâmetros mede capacidade do modelo, não calibração probabilística nem sensibilidade diagnóstica.'
        }
      ]
    }
  ];

  const handleSelectOption = (optionId) => {
    if (isAnswered) return;
    setSelectedOption(optionId);
  };

  const handleConfirmAnswer = () => {
    if (!selectedOption || isAnswered) return;
    setIsAnswered(true);
    const q = questions[currentQuestion];
    const opt = q.options.find(o => o.id === selectedOption);
    if (opt.correct) {
      setScore(s => s + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(c => c + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
  };

  const q = questions[currentQuestion];

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      padding: '12px 20px',
      gap: '12px',
      boxSizing: 'border-box'
    }}>
      {/* Top Banner */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#EDF5FA',
        border: '1px solid #D0E3F0',
        borderRadius: '8px',
        padding: '8px 16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <HelpCircle size={20} color="var(--infnet-dark-blue)" />
          <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
            Quiz Formativo de Fixação • GANs Estruturais, cGAN, CycleGAN e Impacto Clínico
          </span>
        </div>
        <div style={{
          background: '#E0F2FE',
          border: '1px solid #7DD3FC',
          padding: '3px 12px',
          borderRadius: '4px',
          fontSize: '12px',
          color: '#0369A1',
          fontWeight: 700
        }}>
          Questão {currentQuestion + 1} de {questions.length} • Pontuação: {score}/{questions.length}
        </div>
      </div>

      {/* Main Quiz Body */}
      <div style={{
        background: '#FFFFFF',
        border: '1px solid var(--border-light)',
        borderRadius: '10px',
        padding: '16px 20px',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div>
          <div style={{ fontSize: '12px', color: '#0369A1', fontWeight: 700, marginBottom: '6px' }}>
            {q.title}
          </div>
          <div style={{ fontSize: '14px', color: '#0F172A', fontWeight: 600, lineHeight: 1.45, marginBottom: '14px' }}>
            {q.question}
          </div>

          {/* Options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {q.options.map((opt) => {
              let borderCol = '#CBD5E1';
              let bgCol = '#F8FAFC';
              let textCol = '#1E293B';
              let badgeBg = '#E2E8F0';
              let badgeText = '#334155';

              if (selectedOption === opt.id) {
                borderCol = 'var(--infnet-cyan)';
                bgCol = '#EFF6FF';
                textCol = 'var(--infnet-dark-blue)';
                badgeBg = 'var(--infnet-dark-blue)';
                badgeText = '#FFFFFF';
              }

              if (isAnswered) {
                if (opt.correct) {
                  borderCol = '#16A34A';
                  bgCol = '#F0FDF4';
                  textCol = '#14532D';
                  badgeBg = '#15803D';
                  badgeText = '#FFFFFF';
                } else if (selectedOption === opt.id && !opt.correct) {
                  borderCol = '#EF4444';
                  bgCol = '#FEF2F2';
                  textCol = '#991B1B';
                  badgeBg = '#DC2626';
                  badgeText = '#FFFFFF';
                }
              }

              return (
                <div
                  key={opt.id}
                  onClick={() => handleSelectOption(opt.id)}
                  style={{
                    padding: '10px 14px',
                    borderRadius: '6px',
                    border: `1px solid ${borderCol}`,
                    background: bgCol,
                    color: textCol,
                    cursor: isAnswered ? 'default' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <span style={{
                    fontWeight: 700,
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: badgeBg,
                    color: badgeText,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    flexShrink: 0
                  }}>
                    {opt.id}
                  </span>
                  <span style={{ fontSize: '13px', flex: 1, fontWeight: selectedOption === opt.id ? 600 : 500 }}>
                    {opt.text}
                  </span>
                  {isAnswered && opt.correct && <CheckCircle2 size={18} color="#16A34A" style={{ flexShrink: 0 }} />}
                  {isAnswered && selectedOption === opt.id && !opt.correct && <XCircle size={18} color="#EF4444" style={{ flexShrink: 0 }} />}
                </div>
              );
            })}
          </div>
        </div>

        {/* Feedback Section */}
        {isAnswered && (
          <div style={{
            background: q.options.find(o => o.id === selectedOption)?.correct
              ? '#F0FDF4'
              : '#FEF2F2',
            border: `1px solid ${q.options.find(o => o.id === selectedOption)?.correct ? '#86EFAC' : '#FCA5A5'}`,
            borderRadius: '8px',
            padding: '10px 14px',
            fontSize: '12px',
            color: q.options.find(o => o.id === selectedOption)?.correct ? '#166534' : '#991B1B',
            lineHeight: 1.45,
            marginTop: '8px'
          }}>
            <b>Feedback Didático: </b>
            {q.options.find(o => o.id === selectedOption)?.feedback}
          </div>
        )}

        {/* Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
          {!isAnswered ? (
            <button
              onClick={handleConfirmAnswer}
              disabled={!selectedOption}
              style={{
                padding: '8px 22px',
                borderRadius: '6px',
                background: selectedOption ? 'var(--infnet-dark-blue)' : '#E2E8F0',
                color: selectedOption ? '#FFFFFF' : '#94A3B8',
                border: 'none',
                cursor: selectedOption ? 'pointer' : 'not-allowed',
                fontWeight: 700,
                fontSize: '13px'
              }}
            >
              Confirmar Resposta
            </button>
          ) : currentQuestion < questions.length - 1 ? (
            <button
              onClick={handleNextQuestion}
              style={{
                padding: '8px 22px',
                borderRadius: '6px',
                background: 'var(--infnet-dark-blue)',
                color: '#FFFFFF',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: '13px'
              }}
            >
              Próxima Questão ➔
            </button>
          ) : (
            <button
              onClick={handleRestart}
              style={{
                padding: '8px 22px',
                borderRadius: '6px',
                background: '#15803D',
                color: '#FFFFFF',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <RotateCcw size={16} /> Refazer Quiz (Score: {score}/{questions.length})
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
