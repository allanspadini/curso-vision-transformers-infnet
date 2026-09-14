import React, { useState } from 'react';

export default function AttentionRolloutDiagram() {
  const [selectedLayer, setSelectedLayer] = useState('final');

  const layers = [
    { id: 'early', label: '1. Camadas Iniciais (Bloco 1-3)' },
    { id: 'mid', label: '2. Camadas Intermediárias (Bloco 6-8)' },
    { id: 'final', label: '3. Camadas Finais (Bloco 11-12)' }
  ];

  const layerInfo = {
    early: {
      title: 'Atenção Inicial: Dispersa, Texturas e Bordas Locais',
      desc: 'Nas primeiras camadas, os patches atendem tanto a vizinhos imediatos quanto a pontos distantes com pesos baixos e distribuídos de forma homogênea.',
      focus: 'Fundo + Objeto (Difuso)'
    },
    mid: {
      title: 'Atenção Intermediária: Agrupamento de Partes Semânticas',
      desc: 'Os patches começam a se fundir em estruturas reconhecíveis (olhos, asas, rodas). O token [CLS] começa a concentrar atenção nas regiões de maior contraste.',
      focus: 'Silhueta e Partes Relevantes'
    },
    final: {
      title: 'Atenção Final (Rollout): Concentração Cirúrgica no Objeto',
      desc: 'O token [CLS] foca quase 100% dos seus pesos nos traços distintivos que definem a classe, ignorando completamente o céu, grama ou fundo desnecessário!',
      focus: 'Objeto Chave (Máxima Saliência)'
    }
  };

  const current = layerInfo[selectedLayer];

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {/* Barra de Filtro de Camadas */}
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
            Profundidade da Atenção:
          </span>
          {layers.map((l) => (
            <button
              key={l.id}
              onClick={() => setSelectedLayer(l.id)}
              style={{
                padding: '4px 12px',
                borderRadius: '6px',
                border: selectedLayer === l.id ? '2px solid var(--infnet-cyan)' : '1px solid #CBD5E1',
                background: selectedLayer === l.id ? '#E0F2FE' : '#FFFFFF',
                color: selectedLayer === l.id ? 'var(--infnet-dark-blue)' : '#475569',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {l.label}
            </button>
          ))}
        </div>
        <span className="badge badge-cyan">Algoritmo: Attention Rollout</span>
      </div>

      {/* Grid Principal: Imagem Original ➔ Mapa de Calor de Atenção ➔ Interpretação */}
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
        {/* Lado Esquerdo: Imagem Simbolizada e Mapa de Atenção Sobreposto */}
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
          <svg viewBox="0 0 360 220" style={{ width: '100%', maxHeight: '210px' }}>
            {/* Imagem de Fundo (Céu e Pássaro) */}
            <rect x="20" y="20" width="150" height="150" fill="#E2E8F0" stroke="#64748B" rx="8" />
            <path d="M 60 100 Q 95 60 130 90 Q 100 120 60 100" fill="#0A345D" />
            <circle cx="120" cy="85" r="4" fill="#FFFFFF" />
            <text x="95" y="195" textAnchor="middle" fill="#0A345D" fontSize="11" fontWeight="700">Imagem Original (Entrada)</text>

            {/* Seta de Atenção Rollout */}
            <path d="M 180 95 L 205 95" stroke="#0A345D" strokeWidth="2.5" markerEnd="url(#arrow-att)" />

            {/* Mapa de Calor de Atenção correspondente à camada */}
            <rect x="215" y="20" width="150" height="150" fill="#0F172A" stroke="#0A345D" rx="8" />

            {selectedLayer === 'early' && (
              /* Camada inicial: calor distribuído em quase todos os patches */
              <g opacity="0.6">
                <circle cx="270" cy="80" r="45" fill="#38BDF8" />
                <circle cx="310" cy="110" r="40" fill="#38BDF8" />
                <circle cx="250" cy="120" r="35" fill="#0284C7" />
              </g>
            )}

            {selectedLayer === 'mid' && (
              /* Camada média: calor focado na silhueta do animal */
              <g opacity="0.8">
                <ellipse cx="290" cy="95" rx="45" ry="25" fill="#F59E0B" />
                <circle cx="310" cy="90" r="18" fill="#EF4444" />
              </g>
            )}

            {selectedLayer === 'final' && (
              /* Camada final: foco cirúrgico na cabeça/olho do animal */
              <g>
                <circle cx="290" cy="95" r="30" fill="#EF4444" opacity="0.95" />
                <circle cx="315" cy="88" r="14" fill="#FACC15" />
                <circle cx="315" cy="88" r="6" fill="#FFFFFF" />
              </g>
            )}

            <text x="290" y="195" textAnchor="middle" fill="#0369A1" fontSize="11" fontWeight="700">
              Atenção [CLS] ➔ Patches
            </text>

            <defs>
              <marker id="arrow-att" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M 0 0 L 6 3 L 0 6 z" fill="#0A345D" />
              </marker>
            </defs>
          </svg>
        </div>

        {/* Lado Direito: Diagnóstico de Interpretabilidade */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <span className="badge badge-navy">Foco Observado:</span>
              <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--infnet-cyan)' }}>{current.focus}</span>
            </div>
            <h4 style={{ fontSize: '15px', color: 'var(--infnet-dark-blue)', margin: '0 0 8px 0' }}>
              {current.title}
            </h4>
            <p style={{ fontSize: '12px', color: '#475569', lineHeight: 1.45, margin: 0 }}>
              {current.desc}
            </p>
          </div>

          <div style={{
            background: '#F8FAFC',
            borderRadius: '8px',
            border: '1px solid #E2E8F0',
            padding: '12px',
            fontSize: '11.5px',
            color: '#334155'
          }}>
            🔍 <strong>Por que isso importa na prática?</strong><br />
            Diferente de métodos como Grad-CAM em CNNs (que exigem gradientes retropropagados), no Vision Transformer a explicabilidade é <strong>nativa do próprio mecanismo de atenção</strong>! Podemos inspecionar a matriz de atenção diretamente durante o forward pass.
          </div>
        </div>
      </div>
    </div>
  );
}
