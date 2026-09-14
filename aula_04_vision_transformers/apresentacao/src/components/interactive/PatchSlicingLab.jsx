import React, { useState } from 'react';

export default function PatchSlicingLab() {
  const [imageSize, setImageSize] = useState(224);
  const [patchSize, setPatchSize] = useState(16);

  const gridDimension = Math.floor(imageSize / patchSize);
  const numPatches = gridDimension * gridDimension;
  const totalTokens = numPatches + 1; // + CLS
  const attentionMatrixSize = totalTokens * totalTokens;
  const vramKb = Math.round((attentionMatrixSize * 4 * 12) / 1024 * 10) / 10; // 12 cabeças, float32

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {/* Controles do Simulador */}
      <div style={{
        background: '#F8FAFC',
        border: '1px solid #E2E8F0',
        borderRadius: '8px',
        padding: '10px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div>
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--infnet-dark-blue)', marginRight: '6px' }}>
              Resolução (H = W):
            </span>
            {[112, 224, 384].map((res) => (
              <button
                key={res}
                onClick={() => setImageSize(res)}
                style={{
                  padding: '3px 8px',
                  borderRadius: '4px',
                  border: imageSize === res ? '2px solid var(--infnet-cyan)' : '1px solid #CBD5E1',
                  background: imageSize === res ? '#E0F2FE' : '#FFFFFF',
                  color: imageSize === res ? 'var(--infnet-dark-blue)' : '#475569',
                  fontSize: '11px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  marginRight: '4px'
                }}
              >
                {res}px
              </button>
            ))}
          </div>

          <div style={{ borderLeft: '1px solid #CBD5E1', paddingLeft: '16px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--infnet-dark-blue)', marginRight: '6px' }}>
              Tamanho do Patch (P):
            </span>
            {[8, 14, 16, 32].map((p) => (
              <button
                key={p}
                onClick={() => setPatchSize(p)}
                style={{
                  padding: '3px 8px',
                  borderRadius: '4px',
                  border: patchSize === p ? '2px solid var(--infnet-purple)' : '1px solid #CBD5E1',
                  background: patchSize === p ? '#F3E8FF' : '#FFFFFF',
                  color: patchSize === p ? '#6B21A8' : '#475569',
                  fontSize: '11px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  marginRight: '4px'
                }}
              >
                {p}×{p}
              </button>
            ))}
          </div>
        </div>

        <span className="badge badge-green">N = ({imageSize} / {patchSize})² = {numPatches}</span>
      </div>

      {/* Grid Principal: Visualização da Grade Espacial + Painel Métrico de Complexidade */}
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
        {/* Painel Esquerdo: Renderização Dinâmica da Imagem Fatiada */}
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
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--infnet-dark-blue)', marginBottom: '8px' }}>
            Grade Espacial: {gridDimension} × {gridDimension} ({numPatches} Patches 2D)
          </div>

          {/* Grade dinâmica simulada em SVG */}
          <svg viewBox="0 0 224 224" style={{ width: '200px', height: '200px', background: '#BAE6FD', borderRadius: '8px', border: '2px solid #0A345D' }}>
            {/* Desenho simbólico no fundo (árvore/montanha) */}
            <circle cx="112" cy="112" r="70" fill="#38BDF8" opacity="0.6" />
            <polygon points="40,180 184,180 112,60" fill="#0284C7" opacity="0.7" />

            {/* Linhas da grade geradas dinamicamente */}
            {Array.from({ length: gridDimension + 1 }).map((_, i) => {
              const pos = (224 / gridDimension) * i;
              return (
                <React.Fragment key={i}>
                  <line x1={pos} y1="0" x2={pos} y2="224" stroke="#0F172A" strokeWidth={gridDimension > 20 ? 0.5 : 1} strokeDasharray={gridDimension > 16 ? '2 2' : 'none'} />
                  <line x1="0" y1={pos} x2="224" y2={pos} stroke="#0F172A" strokeWidth={gridDimension > 20 ? 0.5 : 1} strokeDasharray={gridDimension > 16 ? '2 2' : 'none'} />
                </React.Fragment>
              );
            })}
          </svg>

          <div style={{ fontSize: '11px', color: '#64748B', marginTop: '6px' }}>
            Cada célula é projetada para um vetor latente de dimensão D = 768
          </div>
        </div>

        {/* Painel Direito: Métricas em Tempo Real */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <h4 style={{ fontSize: '15px', color: 'var(--infnet-dark-blue)', margin: '0 0 10px 0' }}>
              Impacto Computacional no Transformer
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <div style={{ background: '#F8FAFC', padding: '10px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 600 }}>NÚMERO DE PATCHES (N)</div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--infnet-dark-blue)' }}>{numPatches}</div>
                <div style={{ fontSize: '10px', color: '#0284C7' }}>+ 1 token [CLS] = {totalTokens}</div>
              </div>

              <div style={{ background: '#F8FAFC', padding: '10px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 600 }}>MATRIZ DE ATENÇÃO</div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#7E22CE' }}>{attentionMatrixSize.toLocaleString()}</div>
                <div style={{ fontSize: '10px', color: '#6B21A8' }}>{totalTokens} × {totalTokens} elementos</div>
              </div>

              <div style={{ background: '#F8FAFC', padding: '10px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 600 }}>MEMÓRIA ATENÇÃO (12 HEADS)</div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: vramKb > 5000 ? '#DC2626' : '#15803D' }}>
                  {vramKb > 1024 ? `${(vramKb / 1024).toFixed(1)} MB` : `${vramKb} KB`}
                </div>
                <div style={{ fontSize: '10px', color: '#64748B' }}>por camada (Batch=1)</div>
              </div>

              <div style={{ background: '#F8FAFC', padding: '10px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 600 }}>RELAÇÃO COM NLP</div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: totalTokens > 512 ? '#C2410C' : '#0A345D' }}>
                  {Math.round((totalTokens / 512) * 100)}%
                </div>
                <div style={{ fontSize: '10px', color: '#64748B' }}>do contexto de 512 do BERT</div>
              </div>
            </div>
          </div>

          {/* Análise Didática */}
          <div style={{
            background: numPatches > 500 ? '#FEF2F2' : '#F0FDF4',
            border: numPatches > 500 ? '1px solid #F87171' : '1px solid #BBF7D0',
            borderRadius: '8px',
            padding: '10px 12px',
            fontSize: '11.5px',
            color: numPatches > 500 ? '#7F1D1D' : '#14532D',
            lineHeight: 1.4
          }}>
            {numPatches > 500 ? (
              <>⚠️ <strong>Alerta de Custo Quadrático:</strong> Ao reduzir o patch para 8×8 em alta resolução, o número de tokens explode para {numPatches}, multiplicando o custo da autoatenção por 16×!</>
            ) : (
              <>✅ <strong>Ponto Ótimo de Engenharia:</strong> Patch 16×16 gera 196 tokens para imagens 224×224. Esse tamanho permite que o Transformer processe a imagem inteira com custo computacional menor que uma sentença longa de NLP!</>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
