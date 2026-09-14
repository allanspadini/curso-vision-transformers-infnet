import React, { useState } from 'react';

export default function CutMixConceptDiagram() {
  const [activeTechnique, setActiveTechnique] = useState('cutmix');

  const techniques = [
    { id: 'original', label: '1. Imagem Pura' },
    { id: 'cutout', label: '2. Cutout (Blackout)' },
    { id: 'mixup', label: '3. Mixup (Transparência)' },
    { id: 'cutmix', label: '4. CutMix (A Sacada!)' }
  ];

  const details = {
    original: {
      title: 'Treinamento Convencional (Sem Regularização)',
      desc: 'O modelo associa a classe a um detalhe óbvio (ex: a cabeça do cachorro). Se a cabeça for escondida, o modelo entra em colapso e erra a previsão.',
      badge: 'Risco de Overfitting',
      badgeClass: 'badge-orange',
      labelEquation: 'Classe: 100% Cachorro'
    },
    cutout: {
      title: 'Cutout: Apagar Regiões com Zeros',
      desc: 'Força o modelo a olhar para outros pontos do corpo, mas preenche a região cortada com pixels pretos (zeros), desperdiçando capacidade e gerando artefatos artificiais.',
      badge: 'Desperdício de Pixels',
      badgeClass: 'badge-navy',
      labelEquation: 'Classe: 100% Cachorro (com buraco negro)'
    },
    mixup: {
      title: 'Mixup: Combinação Linear de Transparência',
      desc: 'Interpola os pixels de duas imagens: x̃ = λ·A + (1-λ)·B. Gera imagens fantasma não-naturais, o que pode confundir a detecção de bordas e contornos das primeiras camadas.',
      badge: 'Imagens Fantasma',
      badgeClass: 'badge-purple',
      labelEquation: 'Rótulo: 60% Cachorro + 40% Gato'
    },
    cutmix: {
      title: 'CutMix: O Melhor dos Dois Mundos (Yun et al., 2019)',
      desc: 'Corta uma caixa delimitadora de uma imagem e COLA sobre outra! Todos os pixels permanecem naturais e nítidos, enquanto os rótulos são combinados proporcionalmente à área!',
      badge: 'Padrão em ViT e DeiT',
      badgeClass: 'badge-green',
      labelEquation: 'Rótulo Suave: 70% Cachorro + 30% Gato (Área)'
    }
  };

  const current = details[activeTechnique];

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {/* Barra de Seleção da Técnica */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#F8FAFC',
        border: '1px solid #E2E8F0',
        borderRadius: '8px',
        padding: '8px 16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
            Evolução da Regularização:
          </span>
          {techniques.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTechnique(t.id)}
              style={{
                padding: '4px 12px',
                borderRadius: '6px',
                border: activeTechnique === t.id ? '2px solid var(--infnet-cyan)' : '1px solid #CBD5E1',
                background: activeTechnique === t.id ? '#E0F2FE' : '#FFFFFF',
                color: activeTechnique === t.id ? 'var(--infnet-dark-blue)' : '#475569',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
        <span className={`badge ${current.badgeClass}`}>{current.badge}</span>
      </div>

      {/* Grid Principal: Demonstração Visual Lado a Lado */}
      <div style={{
        flex: 1,
        background: '#FFFFFF',
        borderRadius: '12px',
        border: '1px solid #E2E8F0',
        padding: '16px 20px',
        display: 'grid',
        gridTemplateColumns: '1.2fr 0.8fr',
        gap: '16px',
        minHeight: 0
      }}>
        {/* Painel Esquerdo: Ilustração SVG da Técnica */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#F8FAFC',
          borderRadius: '10px',
          border: '1px solid #E2E8F0',
          padding: '12px'
        }}>
          <svg viewBox="0 0 340 220" style={{ width: '100%', maxHeight: '210px' }}>
            {/* Base: Imagem A (Cachorro / Tom Marrom) */}
            <rect x="50" y="20" width="180" height="180" fill="#BAE6FD" stroke="#0284C7" strokeWidth="2.5" rx="10" />
            <circle cx="140" cy="90" r="45" fill="#0369A1" opacity="0.8" />
            <circle cx="125" cy="80" r="6" fill="#FFFFFF" />
            <circle cx="155" cy="80" r="6" fill="#FFFFFF" />
            <text x="140" y="160" textAnchor="middle" fill="#0A345D" fontSize="13" fontWeight="800">Imagem A (Cachorro)</text>

            {/* Variação Conforme a Técnica */}
            {activeTechnique === 'cutout' && (
              <g>
                <rect x="80" y="50" width="80" height="80" fill="#0F172A" stroke="#DC2626" strokeWidth="2" rx="4" />
                <text x="120" y="95" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="700">Zeros (Blackout)</text>
              </g>
            )}

            {activeTechnique === 'mixup' && (
              <g opacity="0.5">
                <rect x="50" y="20" width="180" height="180" fill="#FED7AA" stroke="#EA580C" strokeWidth="2" rx="10" />
                <polygon points="100,50 180,50 140,130" fill="#C2410C" />
                <text x="140" y="105" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="800">Gato (40% Alpha)</text>
              </g>
            )}

            {activeTechnique === 'cutmix' && (
              <g>
                {/* Bounding Box cortada e colada com Imagem B (Gato) */}
                <rect x="100" y="40" width="110" height="110" fill="#FED7AA" stroke="#EA580C" strokeWidth="2.5" rx="6" />
                <circle cx="155" cy="90" r="30" fill="#C2410C" />
                <circle cx="145" cy="85" r="4" fill="#FFFFFF" />
                <circle cx="165" cy="85" r="4" fill="#FFFFFF" />
                <text x="155" y="135" textAnchor="middle" fill="#7C2D12" fontSize="10" fontWeight="800">Patch Imagem B</text>
                <text x="155" y="30" textAnchor="middle" fill="#C2410C" fontSize="10" fontWeight="700">Recorte Nítido!</text>
              </g>
            )}

            {/* Badge de Rótulo Inferior */}
            <rect x="50" y="185" width="180" height="24" fill="#FFFFFF" stroke="#CBD5E1" rx="4" />
            <text x="140" y="201" textAnchor="middle" fill="#0A345D" fontSize="10.5" fontWeight="700">
              {current.labelEquation}
            </text>
          </svg>
        </div>

        {/* Painel Direito: Explicação do Impacto no Vision Transformer */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h4 style={{ fontSize: '16px', color: 'var(--infnet-dark-blue)', margin: '0 0 8px 0' }}>
              {current.title}
            </h4>
            <p style={{ fontSize: '12.5px', color: '#475569', lineHeight: 1.45, margin: 0 }}>
              {current.desc}
            </p>
          </div>

          {/* Por que o ViT Ama o CutMix? */}
          <div style={{
            background: '#F0FDF4',
            border: '1px solid #BBF7D0',
            borderRadius: '8px',
            padding: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px'
          }}>
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#166534' }}>
              🎯 POR QUE O CUTMIX SALVA O VISION TRANSFORMER?
            </div>
            <div style={{ fontSize: '11.5px', color: '#14532D', lineHeight: 1.4 }}>
              Como o ViT enxerga a imagem como uma sequência de <strong>patches independentes</strong>, o CutMix substitui blocos inteiros de patches. Isso obriga a autoatenção a correlacionar múltiplos sinais visuais em paralelo, impedindo que o modelo memorize um único patch!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
