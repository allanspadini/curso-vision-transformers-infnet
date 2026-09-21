import React, { useState, useMemo } from 'react';
import { Image, Type, Sparkles, CheckCircle2, Sliders } from 'lucide-react';

export default function CLIPZeroShotLab() {
  const [selectedImage, setSelectedImage] = useState('crane_machine'); // 'crane_machine', 'crane_bird', 'husky', 'sportscar', 'pizza'
  const [promptMode, setPromptMode] = useState('template'); // 'single', 'template', 'fine', 'custom'
  const [customPrefix, setCustomPrefix] = useState('a high resolution photograph of a');

  // Imagens de teste disponíveis
  const images = [
    {
      id: 'crane_machine',
      title: 'Guindaste de Obras',
      category: 'Construção',
      desc: 'Guindaste mecânico telescópico em canteiro de obras.',
      iconColor: '#EA580C',
      baseSims: {
        crane: 0.72,
        dog: 0.05,
        car: 0.38,
        plane: 0.22,
        bird: 0.08
      },
      disambiguation: {
        machine_crane: 0.88,
        bird_crane: 0.04
      }
    },
    {
      id: 'crane_bird',
      title: 'Grou (Pássaro Crane)',
      category: 'Animal Selvagem',
      desc: 'Ave pernalta aquática migratória na margem do lago.',
      iconColor: '#0284C7',
      baseSims: {
        crane: 0.69,
        dog: 0.18,
        car: 0.02,
        plane: 0.25,
        bird: 0.82
      },
      disambiguation: {
        machine_crane: 0.06,
        bird_crane: 0.91
      }
    },
    {
      id: 'husky',
      title: 'Siberian Husky na Neve',
      category: 'Animais Domésticos',
      desc: 'Cão de trenó nórdico com olhos azuis na neve.',
      iconColor: '#16A34A',
      baseSims: {
        crane: 0.02,
        dog: 0.86,
        car: 0.04,
        plane: 0.01,
        bird: 0.05
      },
      disambiguation: {
        machine_crane: 0.01,
        bird_crane: 0.03
      }
    },
    {
      id: 'sportscar',
      title: 'Carro Esportivo Vermelho',
      category: 'Transporte',
      desc: 'Supercarro de corrida acelerando em pista de asfalto.',
      iconColor: '#DC2626',
      baseSims: {
        crane: 0.15,
        dog: 0.01,
        car: 0.91,
        plane: 0.18,
        bird: 0.01
      },
      disambiguation: {
        machine_crane: 0.18,
        bird_crane: 0.01
      }
    }
  ];

  const currentImgData = images.find(img => img.id === selectedImage) || images[0];

  // Classes candidatas
  const classes = [
    { key: 'crane', label: 'crane', fineLabel: 'crane (heavy construction equipment machine)' },
    { key: 'dog', label: 'dog', fineLabel: 'dog, a furry domestic pet canine' },
    { key: 'car', label: 'car', fineLabel: 'car, a high speed sports automobile' },
    { key: 'plane', label: 'plane', fineLabel: 'commercial airplane jet aircraft in the sky' },
    { key: 'bird', label: 'bird', fineLabel: 'bird, a wild winged avian species' }
  ];

  // Cálculo dinâmico das similaridades e probabilidades Softmax
  const results = useMemo(() => {
    const rawScores = classes.map(c => {
      let rawSim = currentImgData.baseSims[c.key] || 0.05;

      // Efeito do modo de prompt no cosseno
      if (promptMode === 'single') {
        // Palavra única tem leve queda e ambiguidade no "crane"
        if (c.key === 'crane') rawSim = currentImgData.baseSims.crane * 0.88;
        else rawSim = rawSim * 0.92;
      } else if (promptMode === 'template') {
        // Template padrão dá boost de +0.05 a +0.08
        rawSim = rawSim * 1.05 + 0.02;
      } else if (promptMode === 'fine') {
        // Desambiguação especializada
        if (c.key === 'crane') {
          if (currentImgData.id === 'crane_machine') rawSim = currentImgData.disambiguation.machine_crane;
          else if (currentImgData.id === 'crane_bird') rawSim = currentImgData.disambiguation.bird_crane;
        } else {
          rawSim = rawSim * 1.10;
        }
      } else if (promptMode === 'custom') {
        // Modo customizado baseado no comprimento do prompt
        const bonus = Math.min(customPrefix.length * 0.002, 0.08);
        rawSim = rawSim + bonus;
      }

      return {
        ...c,
        sim: Math.min(Math.max(rawSim, -1.0), 1.0)
      };
    });

    // Softmax com temperatura tau = 0.07
    const tau = 0.07;
    const logits = rawScores.map(s => s.sim / tau);
    const maxLogit = Math.max(...logits);
    const exps = logits.map(l => Math.exp(l - maxLogit));
    const sumExps = exps.reduce((a, b) => a + b, 0);

    const withProbs = rawScores.map((s, idx) => ({
      ...s,
      prob: exps[idx] / sumExps
    }));

    return withProbs.sort((a, b) => b.prob - a.prob);
  }, [currentImgData, promptMode, customPrefix]);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '14px' }}>
      
      {/* Barra de Seleção de Amostra e Modo de Prompt */}
      <div style={{
        background: '#EDF5FA',
        border: '1px solid #D0E3F0',
        borderRadius: '10px',
        padding: '10px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        {/* Seletor de Imagem */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Image size={16} color="#0A345D" />
          <span style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
            Imagem Teste:
          </span>
          {images.map(img => (
            <button
              key={img.id}
              onClick={() => setSelectedImage(img.id)}
              style={{
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: 600,
                cursor: 'pointer',
                border: 'none',
                background: selectedImage === img.id ? 'var(--infnet-dark-blue)' : '#FFFFFF',
                color: selectedImage === img.id ? '#FFFFFF' : '#334155',
                boxShadow: selectedImage === img.id ? '0 2px 6px rgba(10,52,93,0.2)' : 'none'
              }}
            >
              {img.title}
            </button>
          ))}
        </div>

        {/* Seletor de Prompt Mode */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Type size={16} color="#0A345D" />
          <span style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
            Modo Prompt:
          </span>
          <button
            onClick={() => setPromptMode('single')}
            style={{
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '10.5px',
              fontWeight: 700,
              cursor: 'pointer',
              border: 'none',
              background: promptMode === 'single' ? '#EF4444' : '#FFFFFF',
              color: promptMode === 'single' ? '#FFFFFF' : '#475569'
            }}
          >
            1. Single Word
          </button>
          <button
            onClick={() => setPromptMode('template')}
            style={{
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '10.5px',
              fontWeight: 700,
              cursor: 'pointer',
              border: 'none',
              background: promptMode === 'template' ? '#0284C7' : '#FFFFFF',
              color: promptMode === 'template' ? '#FFFFFF' : '#475569'
            }}
          >
            2. Template ("a photo of...")
          </button>
          <button
            onClick={() => setPromptMode('fine')}
            style={{
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '10.5px',
              fontWeight: 700,
              cursor: 'pointer',
              border: 'none',
              background: promptMode === 'fine' ? '#16A34A' : '#FFFFFF',
              color: promptMode === 'fine' ? '#FFFFFF' : '#475569'
            }}
          >
            3. Desambiguação Rica
          </button>
          <button
            onClick={() => setPromptMode('custom')}
            style={{
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '10.5px',
              fontWeight: 700,
              cursor: 'pointer',
              border: 'none',
              background: promptMode === 'custom' ? '#9333EA' : '#FFFFFF',
              color: promptMode === 'custom' ? '#FFFFFF' : '#475569'
            }}
          >
            4. Customizado
          </button>
        </div>
      </div>

      {/* Se modo customizado, input de edição */}
      {promptMode === 'custom' && (
        <div style={{
          background: '#FAF5FF',
          border: '1px solid #E9D5FF',
          borderRadius: '8px',
          padding: '8px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <Sparkles size={16} color="#9333EA" />
          <span style={{ fontSize: '11px', fontWeight: 700, color: '#7E22CE' }}>
            Prefixo do Prompt:
          </span>
          <input
            type="text"
            value={customPrefix}
            onChange={(e) => setCustomPrefix(e.target.value)}
            style={{
              flex: 1,
              padding: '4px 10px',
              borderRadius: '4px',
              border: '1px solid #D8B4FE',
              fontFamily: 'Fira Code',
              fontSize: '11px',
              color: '#581C87'
            }}
          />
          <span style={{ fontSize: '10px', color: '#6B21A8' }}>
            + "{'{'}label{'}'}."
          </span>
        </div>
      )}

      {/* Grid Central: Imagem Selecionada vs Predições Top-K */}
      <div style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.3fr', gap: '16px', flex: 1 }}>
        
        {/* Card Imagem de Teste */}
        <div style={{
          background: '#FFFFFF',
          border: '1.5px solid var(--border-light)',
          borderRadius: '12px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
              AMOSTRA SELECIONADA
            </span>
            <span style={{
              background: '#EDF5FA',
              color: 'var(--infnet-dark-blue)',
              fontSize: '10px',
              fontWeight: 700,
              padding: '2px 8px',
              borderRadius: '10px'
            }}>
              {currentImgData.category}
            </span>
          </div>

          {/* Moldura da Imagem */}
          <div style={{
            width: '100%',
            height: '180px',
            background: 'linear-gradient(135deg, #0A345D 0%, #061F38 100%)',
            borderRadius: '10px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ fontSize: '38px', marginBottom: '8px' }}>
              {selectedImage === 'crane_machine' && '🏗️'}
              {selectedImage === 'crane_bird' && '🦩'}
              {selectedImage === 'husky' && '🐺'}
              {selectedImage === 'sportscar' && '🏎️'}
            </div>
            <div style={{ fontSize: '15px', fontWeight: 800, color: '#FFFFFF', fontFamily: 'var(--font-title)' }}>
              {currentImgData.title}
            </div>
            <div style={{ fontSize: '10.5px', color: '#94A3B8', marginTop: '2px', textAlign: 'center', padding: '0 20px' }}>
              {currentImgData.desc}
            </div>

            <div style={{
              position: 'absolute',
              bottom: '8px',
              right: '8px',
              background: 'rgba(0,0,0,0.4)',
              backdropFilter: 'blur(4px)',
              padding: '2px 6px',
              borderRadius: '4px',
              fontSize: '9px',
              fontFamily: 'Fira Code',
              color: '#64D9EF'
            }}>
              [1, 3, 224, 224]
            </div>
          </div>

          <div style={{ width: '100%', background: '#F8FAFC', padding: '10px', borderRadius: '6px', fontSize: '11px', color: '#475569' }}>
            <strong>Diagnóstico de Ambiguidade:</strong> Se usarmos apenas a palavra solta <code>"crane"</code>, o modelo hesita entre a máquina e a ave. Ao adicionar contexto rico, o CLIP desambigua o conceito com mais de 90% de confiança!
          </div>
        </div>

        {/* Card Resultados Top-K e Probabilidades */}
        <div style={{
          background: '#FFFFFF',
          border: '1.5px solid var(--border-light)',
          borderRadius: '12px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--infnet-dark-blue)' }}>
                Distribuição de Confiança Softmax (Top-5 Classes)
              </span>
              <span style={{ fontSize: '11px', fontFamily: 'Fira Code', color: '#059669', fontWeight: 700 }}>
                Predição: "{results[0].label}" ({ (results[0].prob * 100).toFixed(1) }%)
              </span>
            </div>

            {/* Lista de Barras de Confiança */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {results.map((res, idx) => {
                const isWinner = idx === 0;
                const percentage = (res.prob * 100).toFixed(1);

                return (
                  <div
                    key={res.key}
                    style={{
                      background: isWinner ? '#ECFDF5' : '#F8FAFC',
                      border: `1px solid ${isWinner ? '#A7F3D0' : '#E2E8F0'}`,
                      borderRadius: '8px',
                      padding: '8px 12px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {isWinner && <CheckCircle2 size={14} color="#10B981" />}
                        <span style={{ fontSize: '11.5px', fontWeight: isWinner ? 800 : 600, color: isWinner ? '#065F46' : '#1E293B' }}>
                          {idx + 1}. "{promptMode === 'fine' ? res.fineLabel : promptMode === 'custom' ? `${customPrefix} ${res.label}` : promptMode === 'template' ? `a photo of a ${res.label}` : res.label}"
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '10px', fontFamily: 'Fira Code', color: '#64748B' }}>
                          cos: {res.sim.toFixed(2)}
                        </span>
                        <span style={{ fontSize: '11.5px', fontFamily: 'Fira Code', fontWeight: 800, color: isWinner ? '#059669' : '#475569' }}>
                          {percentage}%
                        </span>
                      </div>
                    </div>

                    {/* Barra de Progresso */}
                    <div style={{ width: '100%', height: '8px', background: '#E2E8F0', borderRadius: '4px', overflow: 'hidden' }}>
                      <div
                        style={{
                          height: '100%',
                          width: `${percentage}%`,
                          background: isWinner ? 'linear-gradient(90deg, #10B981 0%, #059669 100%)' : '#94A3B8',
                          borderRadius: '4px',
                          transition: 'width 0.4s ease'
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{
            background: '#F0F9FF',
            border: '1px solid #BAE6FD',
            padding: '8px 12px',
            borderRadius: '6px',
            fontSize: '10.5px',
            color: '#0369A1'
          }}>
            ⚡ <strong>Engenharia de Prompt em Produção:</strong> Observe como trocar de <em>"Single Word"</em> para <em>"Desambiguação Rica"</em> expande a margem de segurança da probabilidade líder de ~50% para mais de 90%, blindando o sistema contra erros industriais.
          </div>
        </div>

      </div>
    </div>
  );
}
