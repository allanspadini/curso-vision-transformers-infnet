import React, { useState } from 'react';

export default function PixelAttentionExplosionDiagram() {
  const [resolution, setResolution] = useState(224);

  const numPixels = resolution * resolution;
  const attentionOperations = Math.round(Math.pow(numPixels, 2) / 1e9 * 100) / 100; // Bilhões
  const memoryVRAM = Math.round((Math.pow(numPixels, 2) * 4) / (1024 * 1024 * 1024) * 10) / 10; // GB em float32

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {/* Barra de controle interativo da resolução */}
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
            Simular Resolução de Imagem:
          </span>
          {[64, 112, 224, 384].map((res) => (
            <button
              key={res}
              onClick={() => setResolution(res)}
              style={{
                padding: '4px 12px',
                borderRadius: '6px',
                border: resolution === res ? '2px solid var(--infnet-orange)' : '1px solid #CBD5E1',
                background: resolution === res ? '#FFF7ED' : '#FFFFFF',
                color: resolution === res ? '#C2410C' : '#475569',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {res} × {res} px
            </button>
          ))}
        </div>
        <div style={{ fontSize: '12px', color: '#64748B' }}>
          Complexidade Quadrática da Autoatenção: <strong style={{ color: 'var(--infnet-orange)' }}>O(N²)</strong>
        </div>
      </div>

      {/* Área Central: Visualização do Grid de Pixels vs Matriz de Atenção Gigante */}
      <div style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '16px',
        minHeight: 0
      }}>
        {/* Painel Esquerdo: Imagem como Grade de Pixels */}
        <div style={{
          background: '#FFFFFF',
          borderRadius: '12px',
          border: '1px solid #E2E8F0',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ textAlign: 'center' }}>
            <span className="badge badge-navy" style={{ marginBottom: '6px' }}>Entrada Espacial 2D</span>
            <h3 style={{ fontSize: '16px', color: 'var(--infnet-dark-blue)', margin: 0 }}>
              Imagem: {resolution} × {resolution} pixels
            </h3>
            <p style={{ fontSize: '12px', color: '#64748B', margin: '4px 0 0 0' }}>
              Total de tokens se cada pixel for tratado como um token independente:
            </p>
          </div>

          {/* SVG ilustrando a grade densa de pixels */}
          <svg viewBox="0 0 200 200" style={{ width: '170px', height: '170px' }}>
            <rect x="5" y="5" width="190" height="190" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="2" rx="8" />
            {/* Grade simbólica representando a densidade insana de pixels */}
            {Array.from({ length: 9 }).map((_, r) =>
              Array.from({ length: 9 }).map((_, c) => (
                <rect
                  key={`${r}-${c}`}
                  x={15 + c * 19}
                  y={15 + r * 19}
                  width="15"
                  height="15"
                  fill={(r + c) % 2 === 0 ? '#38BDF8' : '#0284C7'}
                  opacity={0.7}
                  rx="2"
                />
              ))
            )}
            <circle cx="100" cy="100" r="30" fill="rgba(15, 23, 42, 0.85)" />
            <text x="100" y="96" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="700">N = {numPixels.toLocaleString()}</text>
            <text x="100" y="112" textAnchor="middle" fill="#38BDF8" fontSize="9" fontWeight="600">pixels/tokens</text>
          </svg>

          {/* Cards de Métricas */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '10px',
            width: '100%'
          }}>
            <div style={{ background: '#F8FAFC', padding: '8px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', textAlign: 'center' }}>
              <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 600 }}>SEQUÊNCIA NLP TÍPICA</div>
              <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--infnet-dark-blue)' }}>L ≈ 512 tokens</div>
            </div>
            <div style={{ background: '#FEF2F2', padding: '8px 12px', borderRadius: '8px', border: '1px solid #FCA5A5', textAlign: 'center' }}>
              <div style={{ fontSize: '10px', color: '#B91C1C', fontWeight: 600 }}>SEQUÊNCIA DESTA IMAGEM</div>
              <div style={{ fontSize: '15px', fontWeight: 800, color: '#DC2626' }}>N = {numPixels.toLocaleString()}</div>
            </div>
          </div>
        </div>

        {/* Painel Direito: Explosão da Matriz de Autoatenção [N, N] */}
        <div style={{
          background: '#FFFFFF',
          borderRadius: '12px',
          border: '1px solid #E2E8F0',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ textAlign: 'center' }}>
            <span className="badge badge-orange" style={{ marginBottom: '6px' }}>Colapso Computacional</span>
            <h3 style={{ fontSize: '16px', color: '#9A3412', margin: 0 }}>
              Matriz de Atenção [N × N]
            </h3>
            <p style={{ fontSize: '12px', color: '#64748B', margin: '4px 0 0 0' }}>
              Cálculo de Softmax(Q·Kᵀ / √d) em escala de pixel puro:
            </p>
          </div>

          {/* Diagrama da Matriz [N x N] com alerta de explosão */}
          <div style={{
            width: '100%',
            background: '#FFF7ED',
            border: '2px dashed #FB923C',
            borderRadius: '10px',
            padding: '14px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#C2410C' }}>Dimensões da Matriz de Atenção:</span>
              <span style={{ fontSize: '13px', fontFamily: 'var(--font-mono)', fontWeight: 800, color: '#9A3412' }}>
                [{numPixels.toLocaleString()} × {numPixels.toLocaleString()}]
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#C2410C' }}>Operações por Cabeça:</span>
              <span style={{ fontSize: '13px', fontFamily: 'var(--font-mono)', fontWeight: 800, color: '#DC2626' }}>
                ~{attentionOperations} Bilhões de FLOPS
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#C2410C' }}>VRAM Só para a Matriz (Batch=1):</span>
              <span style={{ fontSize: '14px', fontFamily: 'var(--font-mono)', fontWeight: 800, color: '#DC2626' }}>
                ~{memoryVRAM} GB de VRAM!
              </span>
            </div>
          </div>

          {/* Conclusão de Engenharia */}
          <div style={{
            background: '#FEF2F2',
            border: '1px solid #F87171',
            borderRadius: '8px',
            padding: '10px 14px',
            width: '100%',
            fontSize: '11.5px',
            color: '#7F1D1D',
            lineHeight: 1.4
          }}>
            💥 <strong>Diagnóstico de Engenharia:</strong> Tratar pixels isolados como tokens resulta em erro instantâneo de <em>CUDA Out of Memory (OOM)</em>. A visão computacional precisava urgentemente de uma forma de <strong>discretizar a imagem em unidades semânticas maiores</strong>!
          </div>
        </div>
      </div>
    </div>
  );
}
