import React, { useState } from 'react';

export default function DataHungerOverfittingDiagram() {
  const [selectedScale, setSelectedScale] = useState('all');

  const scales = [
    { id: 'all', label: 'Curva Completa de Escala' },
    { id: 'in1k', label: '1. ImageNet-1k (1,3M imagens)' },
    { id: 'in21k', label: '2. ImageNet-21k (14M imagens)' },
    { id: 'jft', label: '3. JFT-300M (300M imagens)' }
  ];

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {/* Barra de Filtro de Regime de Dados */}
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
            Regime de Pré-treino:
          </span>
          {scales.map((sc) => (
            <button
              key={sc.id}
              onClick={() => setSelectedScale(sc.id)}
              style={{
                padding: '4px 12px',
                borderRadius: '6px',
                border: selectedScale === sc.id ? '2px solid var(--infnet-orange)' : '1px solid #CBD5E1',
                background: selectedScale === sc.id ? '#FFF7ED' : '#FFFFFF',
                color: selectedScale === sc.id ? '#C2410C' : '#475569',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {sc.label}
            </button>
          ))}
        </div>
        <span className="badge badge-orange">Descoberta Chave do Artigo ViT</span>
      </div>

      {/* Área Central: Gráfico Comparativo de Desempenho por Volume de Dados */}
      <div style={{
        flex: 1,
        background: '#FFFFFF',
        borderRadius: '12px',
        border: '1px solid #E2E8F0',
        padding: '16px 20px',
        display: 'grid',
        gridTemplateColumns: '1.3fr 0.7fr',
        gap: '16px',
        minHeight: 0
      }}>
        {/* Gráfico SVG Curva de Acurácia: ResNet vs ViT */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <svg viewBox="0 0 500 240" style={{ width: '100%', maxHeight: '230px' }}>
            {/* Eixos */}
            <line x1="60" y1="200" x2="480" y2="200" stroke="#94A3B8" strokeWidth="2" />
            <line x1="60" y1="20" x2="60" y2="200" stroke="#94A3B8" strokeWidth="2" />

            {/* Rótulos dos Eixos */}
            <text x="270" y="232" textAnchor="middle" fill="#475569" fontSize="11" fontWeight="700">Tamanho do Dataset de Pré-Treinamento (Escala Log)</text>
            <text x="25" y="110" textAnchor="middle" fill="#475569" fontSize="11" fontWeight="700" transform="rotate(-90 25 110)">Acurácia Top-1 (%)</text>

            {/* Marcadores dos 3 Datasets */}
            <line x1="120" y1="25" x2="120" y2="200" stroke="#E2E8F0" strokeDasharray="3 3" />
            <text x="120" y="215" textAnchor="middle" fill="#64748B" fontSize="10" fontWeight="600">ImageNet-1k (1.3M)</text>

            <line x1="260" y1="25" x2="260" y2="200" stroke="#E2E8F0" strokeDasharray="3 3" />
            <text x="260" y="215" textAnchor="middle" fill="#64748B" fontSize="10" fontWeight="600">ImageNet-21k (14M)</text>

            <line x1="420" y1="25" x2="420" y2="200" stroke="#E2E8F0" strokeDasharray="3 3" />
            <text x="420" y="215" textAnchor="middle" fill="#64748B" fontSize="10" fontWeight="600">JFT-300M (300M)</text>

            {/* Curva 1: ResNet-152 (Viés Indutivo Forte - Satura mais cedo) */}
            <path
              d="M 120 120 Q 260 90 420 80"
              fill="none"
              stroke="#0A345D"
              strokeWidth="3.5"
            />
            <circle cx="120" cy="120" r="5" fill="#0A345D" />
            <circle cx="260" cy="95" r="5" fill="#0A345D" />
            <circle cx="420" cy="80" r="5" fill="#0A345D" />
            <text x="425" y="75" fill="#0A345D" fontSize="10" fontWeight="800">ResNet (Biased)</text>

            {/* Curva 2: ViT-Large (Sem Viés Indutivo - Começa pior, escala ao infinito) */}
            <path
              d="M 120 160 Q 260 95 420 45"
              fill="none"
              stroke="#1BB5D8"
              strokeWidth="3.5"
            />
            <circle cx="120" cy="160" r="5" fill="#DC2626" />
            <circle cx="260" cy="95" r="5" fill="#1BB5D8" />
            <circle cx="420" cy="45" r="6" fill="#16A34A" />
            <text x="425" y="40" fill="#0284C7" fontSize="11" fontWeight="800">ViT-Large (SOTA!)</text>

            {/* Destaque 1: Ponto Fraco no ImageNet-1k */}
            {(selectedScale === 'all' || selectedScale === 'in1k') && (
              <g>
                <rect x="70" y="130" width="100" height="24" fill="#FEF2F2" stroke="#EF4444" rx="4" />
                <text x="120" y="146" textAnchor="middle" fill="#DC2626" fontSize="9" fontWeight="800">ViT perde por ~4%</text>
              </g>
            )}

            {/* Destaque 2: Empate no ImageNet-21k */}
            {(selectedScale === 'all' || selectedScale === 'in21k') && (
              <g>
                <rect x="210" y="65" width="100" height="24" fill="#FFFBEB" stroke="#F59E0B" rx="4" />
                <text x="260" y="81" textAnchor="middle" fill="#D97706" fontSize="9" fontWeight="800">Ponto de Empate</text>
              </g>
            )}

            {/* Destaque 3: Vitória Massiva no JFT-300M */}
            {(selectedScale === 'all' || selectedScale === 'jft') && (
              <g>
                <rect x="360" y="15" width="120" height="24" fill="#F0FDF4" stroke="#16A34A" rx="4" />
                <text x="420" y="31" textAnchor="middle" fill="#15803D" fontSize="9" fontWeight="800">ViT vence com folga!</text>
              </g>
            )}
          </svg>
        </div>

        {/* Painel Direito: Análise de Causa-Raiz */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <span className="badge badge-orange" style={{ marginBottom: '6px' }}>Causa-Raiz Teórica</span>
            <h4 style={{ fontSize: '15px', color: 'var(--infnet-dark-blue)', margin: '0 0 8px 0' }}>
              Por que o ViT Falha com Poucos Dados?
            </h4>
            <p style={{ fontSize: '12px', color: '#475569', lineHeight: 1.45, margin: 0 }}>
              Sem as convoluções forçando o modelo a olhar para pixels vizinhos, o ViT tem <strong>graus de liberdade demais</strong>. Em datasets com menos de 10 milhões de imagens, ele memoriza o ruído em vez de aprender a estrutura visual!
            </p>
          </div>

          <div style={{
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: '8px',
            padding: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
              A GRANDE PERGUNTA DA INDÚSTRIA:
            </div>
            <div style={{ fontSize: '12px', color: '#334155', lineHeight: 1.4 }}>
              "Como treinar um Vision Transformer com alta acurácia quando <strong>não temos 300 milhões de imagens</strong> proprietárias da Google?"
            </div>
            <div style={{ fontSize: '11.5px', color: 'var(--infnet-cyan)', fontWeight: 700 }}>
              ➔ Resposta: Regularização Pesada com CutMix e Mixup!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
