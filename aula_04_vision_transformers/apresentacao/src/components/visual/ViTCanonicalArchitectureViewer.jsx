import React, { useState } from 'react';
import { getAssetPath } from '../../utils/assetHelper';

export default function ViTCanonicalArchitectureViewer() {
  const [activeStep, setActiveStep] = useState('all');

  const steps = [
    { id: 'all', label: 'Visão Global Completa' },
    { id: 'input', label: '1. Fatiamento em Patches (Input)' },
    { id: 'projection', label: '2. Projeção Linear (Patch Embedding)' },
    { id: 'encoder', label: '3. Transformer Encoder (+ Positional & CLS)' },
    { id: 'dense', label: '4. Cabeça Densa de Classificação (Dense Top)' }
  ];

  const stepDetails = {
    all: {
      title: 'A Arquitetura Canônica do Vision Transformer (ViT)',
      desc: 'O diagrama clássico de Dosovitskiy et al. (ICLR 2021) demonstrando como um Transformer Encoder puro processa imagens com zero convoluções manuais intermediárias.',
      badge: 'Pipeline Completo',
      badgeClass: 'badge-navy'
    },
    input: {
      title: 'Estágio 1: Fatiamento da Imagem em Patches',
      desc: 'A imagem 2D é dividida em uma grade regular de patches (na figura, 3×3 = 9 patches de flores). Cada patch é achatado em um vetor 1D contínuo.',
      badge: 'Divisão em Patches',
      badgeClass: 'badge-cyan'
    },
    projection: {
      title: 'Estágio 2: Linear Projection of Flattened Patches',
      desc: 'Cada vetor de patch achatado passa por uma projeção linear treinável (matriz E), mapeando os pixels para a dimensão latente do Transformer (D = 768).',
      badge: 'Patch Embedding',
      badgeClass: 'badge-purple'
    },
    encoder: {
      title: 'Estágio 3: Injeção de Posição, Token [CLS] e Codificador',
      desc: 'O token especial agregador (0* na figura) é concatenado à sequência. Vetores de posição aprendidos (0 a 9) são somados elemento a elemento antes do Transformer Encoder.',
      badge: 'Transformer Encoder',
      badgeClass: 'badge-orange'
    },
    dense: {
      title: 'Estágio 4: Cabeça Densa de Saída (Dense Top)',
      desc: 'Apenas a representação do token 0* ([CLS]) na saída da última camada é alimentada na camada MLP linear de classificação para gerar as probabilidades das classes.',
      badge: 'Classificação Multiclasse',
      badgeClass: 'badge-green'
    }
  };

  const currentInfo = stepDetails[activeStep];

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {/* Seletor de Estágios */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#F8FAFC',
        border: '1px solid #E2E8F0',
        borderRadius: '8px',
        padding: '6px 14px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
            Explorar Estágios:
          </span>
          {steps.map((st) => (
            <button
              key={st.id}
              onClick={() => setActiveStep(st.id)}
              style={{
                padding: '4px 10px',
                borderRadius: '6px',
                border: activeStep === st.id ? '2px solid var(--infnet-cyan)' : '1px solid #CBD5E1',
                background: activeStep === st.id ? '#E0F2FE' : '#FFFFFF',
                color: activeStep === st.id ? 'var(--infnet-dark-blue)' : '#475569',
                fontSize: '11px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {st.label}
            </button>
          ))}
        </div>
        <span className={`badge ${currentInfo.badgeClass}`}>
          {currentInfo.badge}
        </span>
      </div>

      {/* Grid Principal: Imagem Canônica em Destaque + Painel de Inspeção Conceitual */}
      <div style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '1.25fr 0.75fr',
        gap: '14px',
        minHeight: 0
      }}>
        {/* Lado Esquerdo: Imagem Oficial do ViT com Moldura e Zoom de Estágio */}
        <div style={{
          background: '#FFFFFF',
          borderRadius: '12px',
          border: '2px solid #E2E8F0',
          padding: '12px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <img
            src={getAssetPath('vit_architecture.png')}
            alt="The ViT architecture - Figure 8-11"
            style={{
              maxWidth: '96%',
              maxHeight: '94%',
              objectFit: 'contain',
              borderRadius: '6px'
            }}
          />
        </div>

        {/* Lado Direito: Card de Exclusivo Aprofundamento Conceitual */}
        <div style={{
          background: '#FFFFFF',
          borderRadius: '12px',
          border: '1px solid #E2E8F0',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>
              Análise Anatômica
            </span>
            <h3 style={{ fontSize: '16px', color: 'var(--infnet-dark-blue)', margin: '4px 0 10px 0' }}>
              {currentInfo.title}
            </h3>
            <p style={{ fontSize: '12.5px', color: '#334155', lineHeight: 1.5, margin: 0 }}>
              {currentInfo.desc}
            </p>
          </div>

          {/* Destaques Técnicos do Estágio */}
          <div style={{
            background: '#F8FAFC',
            borderRadius: '8px',
            border: '1px solid #E2E8F0',
            padding: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
              CORRESPONDÊNCIA COM O BERT EM NLP:
            </div>
            <div style={{ fontSize: '11.5px', color: '#475569', lineHeight: 1.4 }}>
              {activeStep === 'input' && 'Assim como o texto é quebrado em tokens WordPiece, a imagem é discretizada na grade de patches bidimensionais.'}
              {activeStep === 'projection' && 'Equivalente à matriz de embedding de palavras (Embedding Lookup Table), projetando números crus para vetores densos de dimensão D.'}
              {activeStep === 'encoder' && 'Idêntico ao Transformer Encoder do BERT: autoatenção multi-cabeça bidirecional onde todo patch enxerga todos os demais patches.'}
              {activeStep === 'dense' && 'Idêntico à cabeça SequenceClassification: a decisão final baseia-se exclusivamente no vetor de contexto do token agregador especial.'}
              {activeStep === 'all' && 'O Vision Transformer reutiliza com maestria 100% da engenharia do Transformer de NLP, alterando apenas a camada de entrada (Patch Embedding).'}
            </div>
          </div>

          {/* Rodapé Informativo */}
          <div style={{ fontSize: '10.5px', color: '#94A3B8', borderTop: '1px solid #F1F5F9', paddingTop: '8px' }}>
            Referência Canônica: <em>An Image is Worth 16x16 Words</em> (Dosovitskiy et al., ICLR 2021)
          </div>
        </div>
      </div>
    </div>
  );
}
