import React, { useState } from 'react';

export default function ViTAdvancedQuizLab() {
  const [activeTab, setActiveTab] = useState('quiz'); // 'quiz' | 'matrix'
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedScenario, setSelectedScenario] = useState('detection');

  const questions = [
    {
      q: '1. No DeiT (Data-Efficient Image Transformer), por que a destilação "Hard" (usando o argmax do professor CNN) superou a destilação "Soft" clássica baseada em divergência KL com temperatura?',
      options: [
        { text: 'A) Porque a destilação Hard elimina a necessidade de calcular gradientes no modelo Student.', correct: false, explanation: 'Incorreto. O Student sempre é atualizado por backpropagation; quem não recebe gradientes é o Teacher congelado.' },
        { text: 'B) Porque o argmax do professor atua como um pseudorótulo categórico rígido, sem hiperparâmetro de temperatura sensível e com gradientes mais assertivos em conjunto com augmentations agressivas (CutMix/Mixup).', correct: true, explanation: 'Correto! Touvron et al. provaram que o rótulo categórico do professor CNN transfere o viés indutivo de forma mais incisiva, evitando que classes de fundo espúrias recebam probabilidade excessiva.' },
        { text: 'C) Porque a destilação Soft é matematicamente incompatível com a arquitetura Multi-Head Attention.', correct: false, explanation: 'Incorreto. A destilação Soft pode ser aplicada a qualquer arquitetura (inclusive ViTs), mas atingiu acurácia ligeiramente inferior (84.4% vs 85.2%).' },
        { text: 'D) Porque a destilação Hard utiliza apenas o token [CLS], descartando o [DIST].', correct: false, explanation: 'Incorreto. O DeiT Hard utiliza ativamente o token [DIST] dedicado para a perda do professor.' }
      ]
    },
    {
      q: '2. Qual a inovação matemática fundamental do Spatial-Reduction Attention (SRA) no Pyramid Vision Transformer (PVT) para viabilizar tarefas densas como detecção com FPN?',
      options: [
        { text: 'A) Substitui a matriz de atenção Q·Kᵀ por uma convolução 1×1 rápida, eliminando o produto escalar.', correct: false, explanation: 'Incorreto. O SRA ainda calcula o produto escalar de atenção Softmax(Q·Kᵀ/√d)V.' },
        { text: 'B) Reduz a resolução espacial das Chaves (K) e Valores (V) através de uma convolução com stride R_i, enquanto mantém Queries (Q) na resolução original, reduzindo o custo de atenção por um fator de R_i².', correct: true, explanation: 'Perfeito! Reduzindo apenas K e V para dimensões (N_i / R_i²) × C, a matriz de atenção mantém o número de saídas N_i preservando detalhes espaciais finos a uma fração do custo de memória.' },
        { text: 'C) Aplica amostragem aleatória de 50% dos patches da imagem em cada época de treino.', correct: false, explanation: 'Incorreto. Isso é similar ao MAE no pré-treino, não ao módulo de atenção SRA do PVT.' },
        { text: 'D) Restringe o cálculo da atenção apenas a tokens sentinelas [CLS].', correct: false, explanation: 'Incorreto. O PVT elimina o token [CLS] nos estágios densos para operar diretamente em mapas bidimensionais.' }
      ]
    },
    {
      q: '3. Como o Swin Transformer viabiliza a execução em hardware GPU do Shifted Window MSA (SW-MSA) sem fragmentação de batches ou desperdício de memória com padding?',
      options: [
        { text: 'A) Através do Cyclic Shift (rolagem circular dos blocos de borda) combinado com Masked Attention (máscara booleana com -100) e Reverse Shift.', correct: true, explanation: 'Exato! O Cyclic Shift recomprime a imagem em 4 janelas regulares M×M, e a matriz de máscara anula os produtos de atenção entre regiões não adjacentes.' },
        { text: 'B) Utilizando janelas circulares baseadas em coordenadas polares que se adaptam dinamicamente ao batch.', correct: false, explanation: 'Incorreto. As janelas do Swin são quadradas regulares de tamanho M×M.' },
        { text: 'C) Descartando completamente os patches que caem nas bordas das janelas deslocadas.', correct: false, explanation: 'Incorreto. Descartar patches causaria perda severa de informação nas margens da imagem.' },
        { text: 'D) Executando cada sub-janela em um thread assíncrono isolado de CUDA.', correct: false, explanation: 'Incorreto. Isso quebraria a paralelização vetorial em lote, tornando o modelo extremamente lento.' }
      ]
    },
    {
      q: '4. No treinamento auto-supervisionado com DINO, quais mecanismos combinados impedem o modelo de sofrer colapso de representação sem a necessidade de pares negativos contrastivos?',
      options: [
        { text: 'A) Batch Normalization agressiva em todas as camadas lineares e projeções de dropout 0.5.', correct: false, explanation: 'Incorreto. O DINO utiliza LayerNorm e não depende de BatchNorm para evitar colapso.' },
        { text: 'B) Momentum Encoder (EMA no Teacher) combinado com Centering (evita dominância de 1 dimensão) e Sharpening (baixa temperatura no professor, evitando distribuição uniforme).', correct: true, explanation: 'Correto! O Centering e o Sharpening aplicam forças opostas que equilibram a entropia da distribuição do professor sem necessitar de pares negativos como no SimCLR.' },
        { text: 'C) Congelamento permanente dos pesos do Student desde a primeira época.', correct: false, explanation: 'Incorreto. O Student é treinado ativamente via backpropagation.' },
        { text: 'D) Substituição da perda Cross-Entropy por uma perda de Mean Squared Error nos pixels.', correct: false, explanation: 'Incorreto. Reconstrução MSE em pixels é a abordagem do MAE, não do DINO (que usa Cross-Entropy nos logits latentes).' }
      ]
    }
  ];

  const scenarios = {
    detection: {
      title: 'Detecção de Objetos Multiescala (Ex: COCO / Robótica Autônoma)',
      backbone: 'Swin Transformer (Swin-T / Swin-B) ou ConvNeXt',
      framework: 'Mmdetection / TorchVision Mask R-CNN com Backbone Swin',
      why: 'Swin e ConvNeXt produzem pirâmides hierárquicas nativas (stride 4, 8, 16, 32) ideais para FPN, combinando acurácia recorde em caixas pequenas com complexidade linear O(N).',
      tradeoff: 'Mais pesado que MobileNet; requer GPU moderna para treino.'
    },
    edge: {
      title: 'Dispositivos Móveis, Drones & Embarcados (Edge / NPU / CoreML)',
      backbone: 'ConvNeXt-Femto / MobileNetV4 / EfficientNet',
      framework: 'TorchVision / ONNX Runtime / TensorRT',
      why: 'ConvNeXt oferece precisão no nível dos Transformers, mas opera com convoluções padrão perfeitamente aceleradas por ASICs, TPUs e NPUs móveis sem overhead de atenção.',
      tradeoff: 'Menor flexibilidade para tarefas multimodais zero-shot.'
    },
    retrieval: {
      title: 'Busca Visual, ReID & Extração de Embeddings (Zero-Shot / RAG)',
      backbone: 'DINOv2 (ViT-B/14 ou ViT-L/14) Congelado',
      framework: 'TorchHub (`torch.hub.load("facebookresearch/dinov2", "dinov2_vitb14")`)',
      why: 'As representações do DINOv2 dispensam fine-tuning: o espaço latente possui alinhamento semântico e separabilidade de instâncias superior a qualquer modelo supervisionado.',
      tradeoff: 'Exige patches 14×14 e consome memória considerável em batch grande.'
    },
    medical: {
      title: 'Segmentação Semântica Médica de Alta Resolução (1024×1024)',
      backbone: 'Swin-UNet ou PVT-v2',
      framework: 'MONAI / MMSegmentation com UperNet',
      why: 'Em resoluções de 1024×1024, a atenção global do ViT estoura a memória. As janelas locais do Swin e a redução SRA do PVT permitem mapear patologias celulares sem OOM.',
      tradeoff: 'Requer ajuste cuidadoso de tamanho de janela M e regularização contra ruído.'
    }
  };

  const handleSelectOption = (idx) => {
    if (showFeedback) return;
    setSelectedOpt(idx);
    setShowFeedback(true);
    if (questions[currentQ].options[idx].correct) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ((prev) => prev + 1);
      setSelectedOpt(null);
      setShowFeedback(false);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQ(0);
    setSelectedOpt(null);
    setShowFeedback(false);
    setScore(0);
  };

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      padding: '8px 24px',
      boxSizing: 'border-box'
    }}>
      {/* Header com Abas */}
      <div style={{
        background: '#FFFFFF',
        border: '1px solid #E2E8F0',
        borderRadius: '12px',
        padding: '10px 18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '12px',
        boxShadow: '0 2px 8px rgba(10, 52, 93, 0.05)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{
            background: '#0284C7',
            color: '#FFFFFF',
            padding: '3px 8px',
            borderRadius: '4px',
            fontSize: '11px',
            fontWeight: 800
          }}>LAB FINAL</span>
          <span style={{ color: 'var(--infnet-dark-blue)', fontSize: '14px', fontWeight: 700 }}>
            Avaliação de Fixação & Guia de Seleção Arquitetural na Indústria
          </span>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setActiveTab('quiz')}
            style={{
              background: activeTab === 'quiz' ? '#0284C7' : '#F1F5F9',
              color: activeTab === 'quiz' ? '#FFFFFF' : '#334155',
              border: activeTab === 'quiz' ? '1px solid #0369A1' : '1px solid #CBD5E1',
              padding: '5px 14px',
              borderRadius: '6px',
              fontSize: '11px',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            Quiz de Fixação ({score}/{questions.length})
          </button>
          <button
            onClick={() => setActiveTab('matrix')}
            style={{
              background: activeTab === 'matrix' ? '#16A34A' : '#F1F5F9',
              color: activeTab === 'matrix' ? '#FFFFFF' : '#334155',
              border: activeTab === 'matrix' ? '1px solid #15803D' : '1px solid #CBD5E1',
              padding: '5px 14px',
              borderRadius: '6px',
              fontSize: '11px',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            Matriz de Decisão Industrial
          </button>
        </div>
      </div>

      {/* Conteúdo da Aba 1: Quiz */}
      {activeTab === 'quiz' && (
        <div style={{
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: '12px',
          padding: '16px 20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          flex: 1,
          boxShadow: '0 2px 10px rgba(10, 52, 93, 0.05)'
        }}>
          <div>
            {/* Barra de Progresso e Título */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '11px', color: '#0284C7', fontWeight: 700 }}>
                QUESTÃO {currentQ + 1} DE {questions.length}
              </span>
              <span style={{ fontSize: '11px', color: '#64748B' }}>
                Acertos até agora: <strong style={{ color: '#16A34A' }}>{score}</strong>
              </span>
            </div>

            <div style={{
              fontSize: '14px',
              fontWeight: 700,
              color: 'var(--infnet-dark-blue)',
              lineHeight: '1.45',
              marginBottom: '14px'
            }}>
              {questions[currentQ].q}
            </div>

            {/* Alternativas */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {questions[currentQ].options.map((opt, idx) => {
                let btnBg = '#F8FAFC';
                let btnBorder = '1px solid #E2E8F0';
                let textColor = '#1E293B';

                if (showFeedback) {
                  if (opt.correct) {
                    btnBg = '#F0FDF4';
                    btnBorder = '2px solid #16A34A';
                    textColor = '#15803D';
                  } else if (selectedOpt === idx) {
                    btnBg = '#FEF2F2';
                    btnBorder = '2px solid #DC2626';
                    textColor = '#B91C1C';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    style={{
                      background: btnBg,
                      border: btnBorder,
                      borderRadius: '8px',
                      padding: '10px 14px',
                      textAlign: 'left',
                      color: textColor,
                      fontSize: '12px',
                      cursor: showFeedback ? 'default' : 'pointer',
                      transition: 'all 0.15s ease',
                      fontWeight: showFeedback && (opt.correct || selectedOpt === idx) ? 700 : 500
                    }}
                  >
                    {opt.text}
                  </button>
                );
              })}
            </div>

            {/* Feedback e Justificativa */}
            {showFeedback && (
              <div style={{
                marginTop: '12px',
                background: questions[currentQ].options[selectedOpt].correct ? '#F0FDF4' : '#FEF2F2',
                border: questions[currentQ].options[selectedOpt].correct ? '1px solid #BBF7D0' : '1px solid #FCA5A5',
                borderRadius: '8px',
                padding: '10px 14px',
                fontSize: '11px',
                color: questions[currentQ].options[selectedOpt].correct ? '#15803D' : '#991B1B'
              }}>
                <strong>{questions[currentQ].options[selectedOpt].correct ? '✓ Resposta Correta!' : '✕ Não é bem isso.'}</strong>{' '}
                {questions[currentQ].options[selectedOpt].explanation}
              </div>
            )}
          </div>

          {/* Navegação Inferior */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
            {showFeedback && currentQ < questions.length - 1 && (
              <button
                onClick={handleNextQuestion}
                style={{
                  background: '#0284C7',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '8px 18px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  boxShadow: '0 2px 6px rgba(2, 132, 199, 0.2)'
                }}
              >
                Próxima Questão ➔
              </button>
            )}

            {showFeedback && currentQ === questions.length - 1 && (
              <button
                onClick={handleRestartQuiz}
                style={{
                  background: '#16A34A',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '8px 18px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  boxShadow: '0 2px 6px rgba(22, 163, 74, 0.2)'
                }}
              >
                Reiniciar Quiz 🔄
              </button>
            )}
          </div>
        </div>
      )}

      {/* Conteúdo da Aba 2: Matriz de Decisão Industrial */}
      {activeTab === 'matrix' && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: '320px 1fr',
          gap: '16px',
          flex: 1
        }}>
          {/* Coluna Seletor de Cenário */}
          <div style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '12px',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            boxShadow: '0 2px 8px rgba(10, 52, 93, 0.05)'
          }}>
            <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>
              Selecione o Caso de Uso do Projeto:
            </span>

            {Object.keys(scenarios).map((scKey) => {
              const sc = scenarios[scKey];
              const isSel = selectedScenario === scKey;

              return (
                <button
                  key={scKey}
                  onClick={() => setSelectedScenario(scKey)}
                  style={{
                    background: isSel ? '#F0FDF4' : '#F8FAFC',
                    border: isSel ? '1.5px solid #16A34A' : '1px solid #E2E8F0',
                    borderRadius: '8px',
                    padding: '10px 12px',
                    textAlign: 'left',
                    color: isSel ? '#15803D' : '#334155',
                    fontSize: '11px',
                    fontWeight: isSel ? 700 : 500,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {sc.title}
                </button>
              );
            })}
          </div>

          {/* Coluna Recomendação Técnica */}
          <div style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '12px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 2px 8px rgba(10, 52, 93, 0.05)'
          }}>
            <div>
              <div style={{
                fontSize: '15px',
                fontWeight: 700,
                color: 'var(--infnet-dark-blue)',
                marginBottom: '14px',
                borderBottom: '1px solid #E2E8F0',
                paddingBottom: '8px'
              }}>
                {scenarios[selectedScenario].title}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
                <div style={{ background: '#F0F9FF', padding: '12px', borderRadius: '8px', border: '1px solid #BAE6FD' }}>
                  <span style={{ fontSize: '10px', color: '#0284C7', textTransform: 'uppercase', fontWeight: 700 }}>BACKBONE RECOMENDADO:</span>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: '#0369A1', marginTop: '2px' }}>
                    {scenarios[selectedScenario].backbone}
                  </div>
                </div>

                <div style={{ background: '#F0FDF4', padding: '12px', borderRadius: '8px', border: '1px solid #BBF7D0' }}>
                  <span style={{ fontSize: '10px', color: '#16A34A', textTransform: 'uppercase', fontWeight: 700 }}>ECOSSISTEMA / PACOTE PYTORCH:</span>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#15803D', fontFamily: 'Fira Code', marginTop: '2px' }}>
                    {scenarios[selectedScenario].framework}
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: '12px' }}>
                <span style={{ fontSize: '11px', color: 'var(--infnet-dark-blue)', fontWeight: 700 }}>JUSTIFICATIVA DE ENGENHARIA:</span>
                <p style={{ fontSize: '12px', color: '#334155', lineHeight: '1.5', margin: '4px 0 0 0' }}>
                  {scenarios[selectedScenario].why}
                </p>
              </div>

              <div>
                <span style={{ fontSize: '11px', color: '#EA580C', fontWeight: 700 }}>TRADE-OFF A CONSIDERAR:</span>
                <p style={{ fontSize: '12px', color: '#64748B', lineHeight: '1.4', margin: '4px 0 0 0' }}>
                  {scenarios[selectedScenario].tradeoff}
                </p>
              </div>
            </div>

            <div style={{
              background: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: '6px',
              padding: '8px 12px',
              fontSize: '11px',
              color: '#64748B',
              textAlign: 'center'
            }}>
              💡 Use esta matriz como guia de decisão ao dimensionar projetos de Visão Computacional em ambientes corporativos.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
