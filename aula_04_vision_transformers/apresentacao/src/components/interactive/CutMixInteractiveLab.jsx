import React, { useState } from 'react';

export default function CutMixInteractiveLab() {
  const [lambdaVal, setLambdaVal] = useState(0.65); // Proporção da Imagem A
  const [boxPosition, setBoxPosition] = useState('center'); // 'center', 'top-left', 'bottom-right'

  // Classes simuladas
  const classA = 'Guepardo (Felino)';
  const classB = 'Águia Real (Ave)';

  // Proporções
  const percentA = Math.round(lambdaVal * 100);
  const percentB = 100 - percentA;

  // Dimensão da caixa cortada com base em 1 - lambda
  const cutFraction = Math.sqrt(1 - lambdaVal);
  const boxWidth = Math.round(180 * cutFraction);
  const boxHeight = Math.round(180 * cutFraction);

  let posX = 20;
  let posY = 20;
  if (boxPosition === 'center') {
    posX = 20 + Math.round((180 - boxWidth) / 2);
    posY = 20 + Math.round((180 - boxHeight) / 2);
  } else if (boxPosition === 'top-left') {
    posX = 25;
    posY = 25;
  } else if (boxPosition === 'bottom-right') {
    posX = 200 - boxWidth - 5;
    posY = 200 - boxHeight - 5;
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {/* Controles Interativos */}
      <div style={{
        background: '#F8FAFC',
        border: '1px solid #E2E8F0',
        borderRadius: '8px',
        padding: '8px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
              Proporção λ (Área Imagem A):
            </span>
            <input
              type="range"
              min="0.2"
              max="0.85"
              step="0.05"
              value={lambdaVal}
              onChange={(e) => setLambdaVal(parseFloat(e.target.value))}
              style={{ width: '120px', cursor: 'pointer' }}
            />
            <span style={{ fontSize: '12px', fontWeight: 800, color: '#0284C7', width: '35px' }}>
              {percentA}%
            </span>
          </div>

          <div style={{ borderLeft: '1px solid #CBD5E1', paddingLeft: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
              Posição do Corte:
            </span>
            {[
              { id: 'center', label: 'Centro' },
              { id: 'top-left', label: 'Superior Esquerdo' },
              { id: 'bottom-right', label: 'Inferior Direito' }
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => setBoxPosition(p.id)}
                style={{
                  padding: '3px 8px',
                  borderRadius: '4px',
                  border: boxPosition === p.id ? '2px solid var(--infnet-orange)' : '1px solid #CBD5E1',
                  background: boxPosition === p.id ? '#FFF7ED' : '#FFFFFF',
                  color: boxPosition === p.id ? '#C2410C' : '#475569',
                  fontSize: '11px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <span className="badge badge-green">Soft Target Gerado Dinamicamente</span>
      </div>

      {/* Grid Principal: Imagem Gerada + Distribuição de Rótulos */}
      <div style={{
        flex: 1,
        background: '#FFFFFF',
        borderRadius: '12px',
        border: '1px solid #E2E8F0',
        padding: '16px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '16px',
        minHeight: 0
      }}>
        {/* Painel Esquerdo: Visualização da Imagem Fundida com o Corte */}
        <div style={{
          background: '#F8FAFC',
          borderRadius: '10px',
          border: '1px solid #E2E8F0',
          padding: '12px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--infnet-dark-blue)', marginBottom: '8px' }}>
            Imagem Combinada x̃ (CutMix Aplicado)
          </div>

          <svg viewBox="0 0 220 220" style={{ width: '190px', height: '190px', borderRadius: '8px', border: '2px solid #0A345D' }}>
            {/* Fundo: Imagem A (Guepardo - Dourado / Bege) */}
            <rect x="10" y="10" width="200" height="200" fill="#FEF08A" rx="6" />
            {/* Pintas do guepardo */}
            <circle cx="40" cy="50" r="8" fill="#854D0E" />
            <circle cx="80" cy="90" r="10" fill="#854D0E" />
            <circle cx="50" cy="140" r="9" fill="#854D0E" />
            <circle cx="150" cy="170" r="8" fill="#854D0E" />
            <text x="35" y="30" fill="#713F12" fontSize="10" fontWeight="700">Imagem A ({percentA}%)</text>

            {/* Recorte: Imagem B (Águia - Céu Azul / Penas) */}
            <rect
              x={posX}
              y={posY}
              width={boxWidth}
              height={boxHeight}
              fill="#38BDF8"
              stroke="#EA580C"
              strokeWidth="2.5"
              strokeDasharray="4 4"
              rx="4"
            />
            {/* Detalhe da ave dentro da caixa */}
            <polygon
              points={`${posX + boxWidth * 0.3},${posY + boxHeight * 0.7} ${posX + boxWidth * 0.7},${posY + boxHeight * 0.7} ${posX + boxWidth * 0.5},${posY + boxHeight * 0.3}`}
              fill="#0369A1"
            />
            <text
              x={posX + boxWidth / 2}
              y={posY + boxHeight / 2 + 3}
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize="10"
              fontWeight="800"
            >
              Patch B ({percentB}%)
            </text>
          </svg>

          <div style={{ fontSize: '11px', color: '#64748B', marginTop: '6px' }}>
            Área Cortada: {boxWidth} × {boxHeight} px = {percentB}% da superfície total
          </div>
        </div>

        {/* Painel Direito: Vetor de Rótulos Suaves e Perda */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <h4 style={{ fontSize: '14px', color: 'var(--infnet-dark-blue)', margin: '0 0 10px 0' }}>
              Vetor Alvo Suave (Soft Target ỹ)
            </h4>

            {/* Barras de Probabilidade Alvo */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', marginBottom: '3px' }}>
                  <span style={{ fontWeight: 700, color: '#854D0E' }}>Classe A ({classA})</span>
                  <span style={{ fontWeight: 800, color: '#0A345D' }}>{percentA}% (λ = {lambdaVal.toFixed(2)})</span>
                </div>
                <div style={{ background: '#E2E8F0', height: '12px', borderRadius: '6px', overflow: 'hidden' }}>
                  <div style={{ width: `${percentA}%`, background: '#FACC15', height: '100%', transition: 'width 0.2s' }}></div>
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', marginBottom: '3px' }}>
                  <span style={{ fontWeight: 700, color: '#0284C7' }}>Classe B ({classB})</span>
                  <span style={{ fontWeight: 800, color: '#0A345D' }}>{percentB}% (1 - λ = {(1 - lambdaVal).toFixed(2)})</span>
                </div>
                <div style={{ background: '#E2E8F0', height: '12px', borderRadius: '6px', overflow: 'hidden' }}>
                  <div style={{ width: `${percentB}%`, background: '#38BDF8', height: '100%', transition: 'width 0.2s' }}></div>
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', marginBottom: '3px' }}>
                  <span style={{ color: '#94A3B8' }}>Demais Classes (ex: Carro, Navio, Cão)</span>
                  <span style={{ color: '#94A3B8' }}>0.0%</span>
                </div>
                <div style={{ background: '#E2E8F0', height: '8px', borderRadius: '4px' }}></div>
              </div>
            </div>
          </div>

          {/* Conclusão de Engenharia */}
          <div style={{
            background: '#FFF7ED',
            border: '1px solid #FED7AA',
            borderRadius: '8px',
            padding: '10px 12px',
            fontSize: '11.5px',
            color: '#9A3412',
            lineHeight: 1.4
          }}>
            🎯 <strong>Benefício Direto no ViT:</strong> Ao invés de forçar o classificador a ter certeza absoluta de que a imagem é 100% Guepardo, o modelo aprende que os patches azuis representam a Águia e os amarelos o Guepardo. A função de perda Cross-Entropy calcula o erro perfeitamente ponderado por λ!
          </div>
        </div>
      </div>
    </div>
  );
}
