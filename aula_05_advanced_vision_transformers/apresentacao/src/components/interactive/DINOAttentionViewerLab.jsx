import React, { useState } from 'react';

export default function DINOAttentionViewerLab() {
  const [selectedSubject, setSelectedSubject] = useState('eagle');
  const [selectedModel, setSelectedModel] = useState('dino'); // 'supervised' | 'dino'
  const [activeHead, setActiveHead] = useState(1); // 1 to 6

  const subjects = {
    eagle: {
      name: 'Águia Real em Voo',
      icon: '🦅',
      desc: 'Ave predadora com asas abertas e bico afiado contra céu azul.',
      heads: {
        1: { part: 'Cabeça & Olho', focus: 'Bico afiado e pupila da ave', coverage: '18%' },
        2: { part: 'Asa Esquerda', focus: 'Penas primárias da asa esquerda', coverage: '34%' },
        3: { part: 'Asa Direita', focus: 'Envergadura e pontas da asa direita', coverage: '36%' },
        4: { part: 'Cauda & Garras', focus: 'Estabilizadores de cauda e patas', coverage: '22%' },
        5: { part: 'Silhueta Total', focus: 'Máscara de segmentação do corpo inteiro', coverage: '88%' },
        6: { part: 'Contorno de Borda', focus: 'Fronteira precisa entre penas e ar', coverage: '15%' }
      }
    },
    car: {
      name: 'Carro Esportivo Vintage',
      icon: '🏎️',
      desc: 'Veículo clássico vermelho na pista com reflexos de luz.',
      heads: {
        1: { part: 'Rodas & Calotas', focus: 'Pneus e raios das rodas dianteiras/traseiras', coverage: '24%' },
        2: { part: 'Faróis & Grade', focus: 'Grade frontal cromada e lanternas', coverage: '28%' },
        3: { part: 'Para-brisa & Teto', focus: 'Reflexo do vidro e cockpit', coverage: '30%' },
        4: { part: 'Lataria Inferior', focus: 'Chassi e escapamento lateral', coverage: '20%' },
        5: { part: 'Chassi Completo', focus: 'Máscara volumétrica de todo o veículo', coverage: '92%' },
        6: { part: 'Sombra no Solo', focus: 'Projeção de contato entre pneu e asfalto', coverage: '12%' }
      }
    },
    dog: {
      name: 'Cão Golden Retriever',
      icon: '🐕',
      desc: 'Cachorro sentado na grama verde com focinho voltado para a câmera.',
      heads: {
        1: { part: 'Focinho & Orelhas', focus: 'Nariz preto, boca e orelhas caídas', coverage: '26%' },
        2: { part: 'Olhos & Expressão', focus: 'Região periocular e testa', coverage: '14%' },
        3: { part: 'Pelagem do Peito', focus: 'Pêlos dourados do tórax', coverage: '38%' },
        4: { part: 'Patas Dianteiras', focus: 'Apoio sobre a grama', coverage: '22%' },
        5: { part: 'Corpo Inteiro', focus: 'Isolamento semântico do animal', coverage: '90%' },
        6: { part: 'Linha de Contorno', focus: 'Separação entre pêlo e relva', coverage: '16%' }
      }
    }
  };

  const subject = subjects[selectedSubject];
  const headData = subject.heads[activeHead];

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      padding: '8px 24px',
      boxSizing: 'border-box'
    }}>
      {/* Header */}
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
            background: '#9333EA',
            color: '#FFFFFF',
            padding: '3px 8px',
            borderRadius: '4px',
            fontSize: '11px',
            fontWeight: 800
          }}>LAB INTERATIVO</span>
          <span style={{ color: 'var(--infnet-dark-blue)', fontSize: '14px', fontWeight: 700 }}>
            Visualizador de Atenção Emergente: DINO Auto-Supervisionado vs ViT Supervisionado
          </span>
        </div>

        {/* Seletor de Cobaia */}
        <div style={{ display: 'flex', gap: '8px' }}>
          {Object.keys(subjects).map((k) => (
            <button
              key={k}
              onClick={() => setSelectedSubject(k)}
              style={{
                background: selectedSubject === k ? '#9333EA' : '#F1F5F9',
                color: selectedSubject === k ? '#FFFFFF' : '#334155',
                border: selectedSubject === k ? '1px solid #7E22CE' : '1px solid #CBD5E1',
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '11px',
                cursor: 'pointer',
                fontWeight: selectedSubject === k ? 700 : 500,
                transition: 'all 0.15s ease'
              }}
            >
              {subjects[k].icon} {subjects[k].name}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Principal: Visualizador de Mapas vs Inspetor de Cabeças */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '460px 1fr',
        gap: '18px',
        flex: 1
      }}>
        {/* Lado Esquerdo: Telas Lado a Lado ou Alternadas */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: '12px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: '0 2px 10px rgba(10, 52, 93, 0.05)'
        }}>
          <div>
            {/* Seletor do Modelo */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
              <button
                onClick={() => setSelectedModel('dino')}
                style={{
                  flex: 1,
                  background: selectedModel === 'dino' ? '#9333EA' : '#F8FAFC',
                  color: selectedModel === 'dino' ? '#FFFFFF' : '#475569',
                  border: selectedModel === 'dino' ? '1px solid #7E22CE' : '1px solid #CBD5E1',
                  padding: '8px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                ✦ DINO Auto-Supervisionado
              </button>
              <button
                onClick={() => setSelectedModel('supervised')}
                style={{
                  flex: 1,
                  background: selectedModel === 'supervised' ? '#EA580C' : '#F8FAFC',
                  color: selectedModel === 'supervised' ? '#FFFFFF' : '#475569',
                  border: selectedModel === 'supervised' ? '1px solid #C2410C' : '1px solid #CBD5E1',
                  padding: '8px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                ViT Supervisionado (Padrão)
              </button>
            </div>

            {/* Tela de Simulação do Mapa de Atenção */}
            <div style={{
              height: '210px',
              borderRadius: '10px',
              border: selectedModel === 'dino' ? '2px solid #9333EA' : '2px solid #EA580C',
              background:
                selectedModel === 'dino'
                  ? 'radial-gradient(circle at center, rgba(147, 51, 234, 0.35) 0%, rgba(233, 213, 255, 0.6) 45%, #FAF5FF 80%)'
                  : 'radial-gradient(circle at 30% 40%, rgba(251, 146, 60, 0.35) 0%, rgba(254, 215, 170, 0.5) 35%, #FFF7ED 80%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              boxShadow: selectedModel === 'dino' ? '0 0 20px rgba(147, 51, 234, 0.15)' : 'none'
            }}>
              <span style={{ fontSize: '56px', marginBottom: '8px' }}>
                {subject.icon}
              </span>
              <div style={{
                background: '#FFFFFF',
                padding: '5px 14px',
                borderRadius: '20px',
                fontSize: '11px',
                fontWeight: 700,
                color: selectedModel === 'dino' ? '#7E22CE' : '#C2410C',
                border: selectedModel === 'dino' ? '1px solid #DDD6FE' : '1px solid #FED7AA',
                boxShadow: '0 2px 6px rgba(0,0,0,0.06)'
              }}>
                {selectedModel === 'dino'
                  ? `DINO Cabeça #${activeHead}: ${headData.part}`
                  : 'ViT Supervisionado: Atenção de Classe Espalhada'}
              </div>
            </div>
          </div>

          <div style={{
            fontSize: '11px',
            color: '#334155',
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
            padding: '8px 12px',
            borderRadius: '6px',
            marginTop: '10px'
          }}>
            {selectedModel === 'dino' ? (
              <span style={{ color: '#6B21A8' }}>
                ✓ <strong>Segmentação Emergente:</strong> O DINO ignora completamente o ruído de fundo (grama, céu, asfalto) e foca estritamente no objeto.
              </span>
            ) : (
              <span style={{ color: '#C2410C' }}>
                ⚠️ <strong>Atenção de Classe:</strong> O ViT supervisionado mistura elementos do fundo com o objeto, pois foi treinado apenas para minimizar o erro do rótulo categórico global.
              </span>
            )}
          </div>
        </div>

        {/* Lado Direito: Especialização das Cabeças de Autoatenção */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: '12px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: '0 2px 10px rgba(10, 52, 93, 0.05)'
        }}>
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '12px',
              borderBottom: '1px solid #E2E8F0',
              paddingBottom: '8px'
            }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
                Especialização das 6 Cabeças de Atenção (Multi-Head)
              </span>
              <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>
                Token [CLS] • Camada 12
              </span>
            </div>

            {/* Grid de Seleção das 6 Cabeças */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '8px',
              marginBottom: '14px'
            }}>
              {[1, 2, 3, 4, 5, 6].map((h) => {
                const info = subject.heads[h];
                const isActive = activeHead === h;

                return (
                  <button
                    key={h}
                    onClick={() => setActiveHead(h)}
                    style={{
                      background: isActive ? '#FAF5FF' : '#F8FAFC',
                      border: isActive ? '2px solid #9333EA' : '1px solid #E2E8F0',
                      borderRadius: '8px',
                      padding: '10px 8px',
                      textAlign: 'left',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: isActive ? '#7E22CE' : '#334155' }}>
                        Head #{h}
                      </span>
                      <span style={{ fontSize: '9px', color: isActive ? '#9333EA' : '#64748B', fontFamily: 'Fira Code', fontWeight: 700 }}>
                        {info.coverage}
                      </span>
                    </div>
                    <div style={{ fontSize: '10px', color: isActive ? '#6B21A8' : '#64748B', fontWeight: 600 }}>
                      {info.part}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Detalhe da Cabeça Ativa */}
            <div style={{
              background: '#FAF5FF',
              border: '1px solid #E9D5FF',
              borderRadius: '8px',
              padding: '12px'
            }}>
              <div style={{ fontSize: '11px', color: '#7E22CE', fontWeight: 700, marginBottom: '2px' }}>
                FOCO SEMÂNTICO DA CABEÇA #{activeHead} ({headData.part}):
              </div>
              <p style={{ fontSize: '12px', color: '#1E293B', margin: 0, lineHeight: '1.4' }}>
                {headData.focus}.
              </p>
              <div style={{ fontSize: '10px', color: '#64748B', marginTop: '6px' }}>
                Área de saliência normalizada coberta pelo mapa de atenção: <strong style={{ color: '#7E22CE' }}>{headData.coverage}</strong>.
              </div>
            </div>
          </div>

          <div style={{
            background: '#F0FDF4',
            border: '1px solid #BBF7D0',
            borderRadius: '8px',
            padding: '10px 14px',
            fontSize: '11px',
            color: '#15803D',
            textAlign: 'center',
            fontWeight: 600,
            marginTop: '12px'
          }}>
            🌟 Nenhuma dessas regiões foi anotada por humanos. A segmentação semântica é uma propriedade emergente pura da auto-destilação com momentum!
          </div>
        </div>
      </div>
    </div>
  );
}
