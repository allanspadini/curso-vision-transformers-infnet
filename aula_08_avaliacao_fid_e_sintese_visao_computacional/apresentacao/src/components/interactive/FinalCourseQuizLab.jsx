import React, { useState } from 'react';

export default function FinalCourseQuizLab() {
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showFeedback, setShowFeedback] = useState({});

  const questions = [
    {
      id: 1,
      category: 'Avaliação de GANs & FID',
      question: 'Ao calcular o FID de uma GAN, observou-se que o termo ||μ_r - μ_g||² foi muito baixo (1.2), porém o termo de covariância Tr(Σ_r + Σ_g - 2(Σ_r Σ_g)^(1/2)) resultou em um valor altíssimo (94.8), elevando o FID para 96.0. Qual é o diagnóstico técnico correto?',
      options: [
        { id: 'A', text: 'O modelo sofreu mode collapse severo: capta a média global do domínio, mas perdeu a variabilidade/dispersão interna das features.', isCorrect: true },
        { id: 'B', text: 'A taxa de aprendizado do discriminador foi baixa, fazendo o gerador criar imagens com viés sistemático de cor e brilho.', isCorrect: false },
        { id: 'C', text: 'O Inception-v3 falhou na extração de características devido ao uso de interpolação bilinear no pré-processamento.', isCorrect: false },
        { id: 'D', text: 'As imagens geradas possuem alta frequência de ruído estocástico que deslocou o centroide da distribuição.', isCorrect: false }
      ],
      explanation: 'Exato! O termo ||μ_r - μ_g||² mede o deslocamento do centroide médio (fidelidade média). Quando ele é baixo mas o termo de covariância Tr(...) é muito alto, significa que a dispersão multivariada Σ_g colapsou para próximo de zero (mode collapse), gerando penalização máxima pelo termo de variância real.'
    },
    {
      id: 2,
      category: 'Vision Transformers & Interpretabilidade',
      question: 'Para gerar o mapa de calor de relevância espacial sobre uma imagem de entrada (224x224) a partir de um Vision Transformer (ViT-B/16 com 196 patches), qual procedimento matemático exato deve ser realizado na matriz de atenção A da última camada?',
      options: [
        { id: 'A', text: 'Extrair a linha do token [CLS] (índice 0) para os patches 1 a 196 (A[:, h, 0, 1:]), remodelar o vetor [196] para uma grade [14, 14] e interpolar bilinearmente para [224, 224].', isCorrect: true },
        { id: 'B', text: 'Multiplicar a matriz de atenção pelo vetor de Positional Embeddings e aplicar uma camada de Global Average Pooling 1D.', isCorrect: false },
        { id: 'C', text: 'Somar todas as colunas de A ao longo de todas as 12 camadas do encoder e calcular a norma euclidiana L2.', isCorrect: false },
        { id: 'D', text: 'Calcular a correlação de Pearson entre o vetor de projeção de patches linear e o head de classificação MLP.', isCorrect: false }
      ],
      explanation: 'Correto! A linha 0 da matriz de atenção A[0, 1:197] representa exatamente os pesos que o classificador final [CLS] atribui a cada um dos 196 patches espaciais. Remodelar para 14x14 e fazer upsampling para 224x224 gera o heatmap sobreposto.'
    },
    {
      id: 3,
      category: 'Modelos Multimodais (CLIP)',
      question: 'Por que é matematicamente obrigatório aplicar a normalização L2 nos vetores de características da imagem (v_i) e do texto (u_j) no CLIP antes de computar a similaridade pelo produto interno?',
      options: [
        { id: 'A', text: 'Para projetar os embeddings na superfície de uma hiper-esfera unitária (||v||=||u||=1), garantindo que o produto escalar seja estritamente a Similaridade de Cosseno cos(θ), imune a magnitudes espúrias.', isCorrect: true },
        { id: 'B', text: 'Para converter os vetores em distribuições discretas de probabilidade cuja soma de valores resulte exatamente em 1.0.', isCorrect: false },
        { id: 'C', text: 'Para reduzir o tempo computacional de alocação de memória VRAM na placa de vídeo durante a inferência com PyTorch.', isCorrect: false },
        { id: 'D', text: 'Para permitir que palavras com múltiplos significados sejam mapeadas para vetores nulos ortogonais.', isCorrect: false }
      ],
      explanation: 'Perfeito! Sem a normalização L2, o produto escalar v^T u seria dominado pela magnitude euclidiana arbitrária dos vetores em vez da orientação angular, distorcendo a busca semântica.'
    },
    {
      id: 4,
      category: 'Transfer Learning & Data Augmentation',
      question: 'Qual das seguintes práticas de Data Augmentation pode corromper irreversivelmente o aprendizado de um classificador supervisionado?',
      options: [
        { id: 'A', text: 'Aplicar RandomHorizontalFlip e rotações de 90° em domínios onde a assimetria lateral ou a orientação espacial define a classe (ex: dígitos orientados 6 vs 9 ou anatomia médica com lateralidade).', isCorrect: true },
        { id: 'B', text: 'Utilizar a média e desvio padrão do ImageNet para normalizar os tensores de entrada em uma ResNet-50 pré-treinada.', isCorrect: false },
        { id: 'C', text: 'Descongelar apenas o classification head mantendo o backbone convolucional congelado com requires_grad = False.', isCorrect: false },
        { id: 'D', text: 'Utilizar a biblioteca kagglehub para baixar datasets públicos programaticamente sem credenciais manuais.', isCorrect: false }
      ],
      explanation: 'Exato! Aumentações geométricas devem sempre respeitar a semântica do domínio. Inverter ou rotacionar objetos cuja orientação define o rótulo injeta ruído de rótulo no conjunto de treino e degrada o modelo.'
    },
    {
      id: 5,
      category: 'Metodologia Científica & Desbalanceamento',
      question: 'Um modelo de detecção atinge 94% de acurácia global, mas o Recall da classe minoritária (10% dos dados) é de apenas 40%, e os dados foram divididos aleatoriamente contendo múltiplos frames do mesmo sensor/sujeito. Qual é o diagnóstico e a conduta de governança correta?',
      options: [
        { id: 'A', text: 'Houve vazamento de dados (Data Leakage) por falta de divisão em grupos (Group Split) e o modelo sofre do Paradoxo da Acurácia; deve-se particionar por grupo e otimizar visando maximizar o Recall da classe minoritária.', isCorrect: true },
        { id: 'B', text: 'O modelo está convergindo de forma ideal; deve-se apenas aumentar o número de epochs para que o Recall acompanhe a acurácia global.', isCorrect: false },
        { id: 'C', text: 'O problema é a função de perda CrossEntropyLoss, que deve ser substituída por MSE para forçar convergência da minoria.', isCorrect: false },
        { id: 'D', text: 'Deve-se inserir dados sintéticos gerados por GAN no conjunto de teste para equilibrar a avaliação final.', isCorrect: false }
      ],
      explanation: 'Excelente! A divisão aleatória entre dados correlacionados cria vazamento de dados (o modelo decora o fundo do sensor), e a acurácia de 94% é inflada pela maioria, enquanto o Recall de 40% é perigoso. O protocolo correto exige Group Split e foco no Recall da minoria.'
    }
  ];

  const q = questions[currentQ];
  const userAns = selectedAnswers[q.id];
  const isAnswered = !!userAns;

  const handleSelect = (optionId) => {
    if (isAnswered) return;
    setSelectedAnswers((prev) => ({ ...prev, [q.id]: optionId }));
    setShowFeedback((prev) => ({ ...prev, [q.id]: true }));
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    }
  };

  const handlePrev = () => {
    if (currentQ > 0) {
      setCurrentQ(currentQ - 1);
    }
  };

  const correctCount = Object.keys(selectedAnswers).filter((qId) => {
    const question = questions.find((item) => item.id === parseInt(qId));
    const chosen = question.options.find((opt) => opt.id === selectedAnswers[qId]);
    return chosen && chosen.isCorrect;
  }).length;

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
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
          <span style={{
            background: 'var(--infnet-dark-blue)',
            color: '#FFFFFF',
            fontSize: '11px',
            fontWeight: 700,
            padding: '3px 10px',
            borderRadius: '4px',
            fontFamily: 'var(--font-code)'
          }}>
            QUIZ DE FIXAÇÃO
          </span>
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--infnet-dark-blue)' }}>
            Consolidação dos Conceitos Fundamentais da Disciplina
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: '#0A345D' }}>
            Acertos: {correctCount} / {questions.length}
          </span>
          <div style={{ display: 'flex', gap: '4px' }}>
            {questions.map((item, idx) => {
              const answered = selectedAnswers[item.id];
              const isCorr = answered && item.options.find((o) => o.id === answered)?.isCorrect;
              let bg = '#E2E8F0';
              if (answered) bg = isCorr ? '#86EFAC' : '#FCA5A5';
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentQ(idx)}
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    border: currentQ === idx ? '2px solid #0A345D' : '1px solid #CBD5E1',
                    background: bg,
                    fontSize: '10px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Card */}
      <div style={{
        flex: 1,
        background: '#FFFFFF',
        border: '1px solid var(--border-light)',
        borderRadius: '12px',
        padding: '16px 20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: 'var(--shadow-sm)',
        minHeight: 0
      }}>
        <div>
          {/* Question Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ background: '#F0F9FF', border: '1px solid #BAE6FD', color: '#0369A1', fontSize: '10px', fontWeight: 700, padding: '3px 8px', borderRadius: '4px' }}>
              Questão {currentQ + 1} de {questions.length} • {q.category}
            </span>
            <span style={{ fontSize: '10px', color: '#64748B' }}>Pós-Graduação EAD • Infnet</span>
          </div>

          <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#0A345D', lineHeight: '1.45', margin: '6px 0 14px' }}>
            {q.question}
          </h3>

          {/* Options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {q.options.map((opt) => {
              let optStyle = {
                background: '#F8FAFC',
                border: '1px solid #CBD5E1',
                color: '#1E293B'
              };

              if (isAnswered) {
                if (opt.isCorrect) {
                  optStyle = { background: '#F0FDF4', border: '2px solid #22C55E', color: '#166534' };
                } else if (userAns === opt.id) {
                  optStyle = { background: '#FEF2F2', border: '2px solid #EF4444', color: '#991B1B' };
                } else {
                  optStyle = { background: '#F8FAFC', border: '1px solid #E2E8F0', color: '#94A3B8' };
                }
              }

              return (
                <div
                  key={opt.id}
                  onClick={() => handleSelect(opt.id)}
                  style={{
                    ...optStyle,
                    padding: '10px 14px',
                    borderRadius: '8px',
                    cursor: isAnswered ? 'default' : 'pointer',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <span style={{
                    fontWeight: 800,
                    fontSize: '11px',
                    width: '20px',
                    height: '20px',
                    borderRadius: '4px',
                    background: isAnswered && opt.isCorrect ? '#22C55E' : '#E2E8F0',
                    color: isAnswered && opt.isCorrect ? '#FFFFFF' : '#0A345D',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    {opt.id}
                  </span>
                  <span style={{ fontSize: '11px', lineHeight: '1.4' }}>{opt.text}</span>
                </div>
              );
            })}
          </div>

          {/* Feedback Box */}
          {showFeedback[q.id] && (
            <div style={{
              marginTop: '12px',
              background: q.options.find((o) => o.id === userAns)?.isCorrect ? '#F0FDF4' : '#FFF7ED',
              border: `1px solid ${q.options.find((o) => o.id === userAns)?.isCorrect ? '#86EFAC' : '#FED7AA'}`,
              borderRadius: '8px',
              padding: '10px 14px'
            }}>
              <strong style={{ fontSize: '11px', color: q.options.find((o) => o.id === userAns)?.isCorrect ? '#166534' : '#9A3412', display: 'block', marginBottom: '4px' }}>
                {q.options.find((o) => o.id === userAns)?.isCorrect ? '✓ Resposta Correta!' : '⚠️ Atenção aos Conceitos:'}
              </strong>
              <p style={{ fontSize: '10px', color: '#334155', margin: 0, lineHeight: '1.45' }}>
                {q.explanation}
              </p>
            </div>
          )}
        </div>

        {/* Bottom Nav Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', paddingTop: '10px', borderTop: '1px solid #E2E8F0' }}>
          <button
            onClick={handlePrev}
            disabled={currentQ === 0}
            style={{
              padding: '6px 14px',
              fontSize: '11px',
              fontWeight: 600,
              borderRadius: '6px',
              border: '1px solid #CBD5E1',
              background: currentQ === 0 ? '#F1F5F9' : '#FFFFFF',
              color: currentQ === 0 ? '#94A3B8' : '#0A345D',
              cursor: currentQ === 0 ? 'not-allowed' : 'pointer'
            }}
          >
            ← Questão Anterior
          </button>

          <span style={{ fontSize: '10.5px', color: '#64748B' }}>
            Navegue para revisar os 5 pilares do projeto da disciplina
          </span>

          <button
            onClick={handleNext}
            disabled={currentQ === questions.length - 1}
            style={{
              padding: '6px 14px',
              fontSize: '11px',
              fontWeight: 600,
              borderRadius: '6px',
              border: '1px solid #CBD5E1',
              background: currentQ === questions.length - 1 ? '#F1F5F9' : '#0A345D',
              color: currentQ === questions.length - 1 ? '#94A3B8' : '#FFFFFF',
              cursor: currentQ === questions.length - 1 ? 'not-allowed' : 'pointer'
            }}
          >
            Próxima Questão →
          </button>
        </div>
      </div>
    </div>
  );
}
