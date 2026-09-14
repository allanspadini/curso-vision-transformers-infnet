import React, { useState } from 'react';

export default function PatchEmbeddingMechanicsDiagram() {
  const [viewMode, setViewMode] = useState('algebra'); // 'algebra' vs 'conv'

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {/* Barra de alternância de visão: Álgebra Linear vs Convolução Strided */}
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
            Perspectiva de Implementação:
          </span>
          {[
            { id: 'algebra', label: '1. Álgebra Linear (Flatten + Matriz E)' },
            { id: 'conv', label: '2. Truque de Engenharia (Conv2D com Stride=16)' }
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => setViewMode(mode.id)}
              style={{
                padding: '4px 12px',
                borderRadius: '6px',
                border: viewMode === mode.id ? '2px solid var(--infnet-cyan)' : '1px solid #CBD5E1',
                background: viewMode === mode.id ? '#E0F2FE' : '#FFFFFF',
                color: viewMode === mode.id ? 'var(--infnet-dark-blue)' : '#475569',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {mode.label}
            </button>
          ))}
        </div>
        <span className="badge badge-purple">Dimensão Latente: D = 768</span>
      </div>

      {/* Grid Principal */}
      <div style={{
        flex: 1,
        background: '#FFFFFF',
        borderRadius: '12px',
        border: '1px solid #E2E8F0',
        padding: '16px 20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: 0
      }}>
        {viewMode === 'algebra' ? (
          /* Visão Álgebra Linear Formal */
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <svg viewBox="0 0 850 200" style={{ width: '100%', maxHeight: '190px' }}>
              {/* Patch 16x16x3 */}
              <g transform="translate(30, 20)">
                <rect x="0" y="0" width="100" height="100" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2" rx="6" />
                <text x="50" y="45" textAnchor="middle" fill="#0369A1" fontSize="12" fontWeight="700">Patch i</text>
                <text x="50" y="65" textAnchor="middle" fill="#0284C7" fontSize="10" fontWeight="600">16 × 16 × 3</text>
                <text x="50" y="130" textAnchor="middle" fill="#0A345D" fontSize="12" fontWeight="800">x_p^i ∈ ℝ^(P²·C)</text>
              </g>

              {/* Seta Achatamento */}
              <g transform="translate(150, 60)">
                <path d="M 0 10 L 40 10" stroke="#0A345D" strokeWidth="2" markerEnd="url(#arrow-emb)" />
                <text x="20" y="-3" textAnchor="middle" fill="#64748B" fontSize="9" fontWeight="600">Flatten</text>
              </g>

              {/* Vetor 1D achatado 768 */}
              <g transform="translate(210, 25)">
                <rect x="0" y="0" width="30" height="90" fill="#BAE6FD" stroke="#0284C7" strokeWidth="1.5" rx="4" />
                <text x="15" y="50" textAnchor="middle" fill="#0369A1" fontSize="10" fontWeight="800">1 × 768</text>
                <text x="15" y="125" textAnchor="middle" fill="#475569" fontSize="11" fontWeight="600">768 pixels</text>
              </g>

              {/* Operador de Multiplicação */}
              <g transform="translate(265, 65)">
                <circle cx="10" cy="5" r="12" fill="#F1F5F9" stroke="#CBD5E1" />
                <text x="10" y="10" textAnchor="middle" fill="#0A345D" fontSize="14" fontWeight="800">×</text>
              </g>

              {/* Matriz de Projeção Linear E */}
              <g transform="translate(305, 10)">
                <rect x="0" y="0" width="120" height="120" fill="#FAF5FF" stroke="#A855F7" strokeWidth="2" rx="6" />
                <text x="60" y="55" textAnchor="middle" fill="#7E22CE" fontSize="13" fontWeight="800">Matriz E</text>
                <text x="60" y="75" textAnchor="middle" fill="#6B21A8" fontSize="11" fontWeight="600">768 × 768</text>
                <text x="60" y="145" textAnchor="middle" fill="#6B21A8" fontSize="12" fontWeight="800">E ∈ ℝ^(P²C × D)</text>
              </g>

              {/* Seta Igual */}
              <g transform="translate(450, 65)">
                <path d="M 0 5 L 40 5" stroke="#0A345D" strokeWidth="2.5" markerEnd="url(#arrow-emb)" />
                <text x="20" y="-4" textAnchor="middle" fill="#64748B" fontSize="10" fontWeight="700">Projeção</text>
              </g>

              {/* Vetor de Embedding Resultante z_0^i */}
              <g transform="translate(520, 20)">
                <rect x="0" y="0" width="45" height="100" fill="#DCFCE7" stroke="#16A34A" strokeWidth="2" rx="6" />
                <text x="22" y="55" textAnchor="middle" fill="#15803D" fontSize="11" fontWeight="800">z₀^i</text>
                <text x="22" y="135" textAnchor="middle" fill="#166534" fontSize="12" fontWeight="800">Token Visual</text>
                <text x="22" y="152" textAnchor="middle" fill="#15803D" fontSize="10" fontWeight="600">1 × 768 (D)</text>
              </g>

              {/* Caixa da Fórmula Matemática Canônica */}
              <g transform="translate(610, 30)">
                <rect x="0" y="0" width="210" height="80" fill="#F8FAFC" stroke="#0A345D" strokeWidth="1.5" rx="8" />
                <text x="105" y="30" textAnchor="middle" fill="#0A345D" fontSize="11" fontWeight="700">Equação dos Autores:</text>
                <text x="105" y="55" textAnchor="middle" fill="#0284C7" fontSize="13" fontWeight="800">z_0^i = x_p^i · E</text>
              </g>

              <defs>
                <marker id="arrow-emb" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <path d="M 0 0 L 6 3 L 0 6 z" fill="#0A345D" />
                </marker>
              </defs>
            </svg>
          </div>
        ) : (
          /* Visão do Truque de Engenharia da Convolução Strided */
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <svg viewBox="0 0 850 200" style={{ width: '100%', maxHeight: '190px' }}>
              <g transform="translate(40, 20)">
                <rect x="0" y="0" width="130" height="130" fill="#E2E8F0" stroke="#0A345D" strokeWidth="2" rx="6" />
                <text x="65" y="65" textAnchor="middle" fill="#0A345D" fontSize="13" fontWeight="800">Imagem 224×224</text>
                <text x="65" y="85" textAnchor="middle" fill="#64748B" fontSize="11" fontWeight="600">Canal = 3 (RGB)</text>
                <text x="65" y="155" textAnchor="middle" fill="#0A345D" fontSize="11" fontWeight="700">[B, 3, 224, 224]</text>
              </g>

              <g transform="translate(200, 75)">
                <path d="M 0 10 L 60 10" stroke="#0A345D" strokeWidth="3" markerEnd="url(#arrow-emb)" />
                <text x="30" y="-3" textAnchor="middle" fill="#0A345D" fontSize="11" fontWeight="700">Conv2D</text>
              </g>

              <g transform="translate(290, 15)">
                <rect x="0" y="0" width="240" height="140" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" rx="8" />
                <text x="120" y="35" textAnchor="middle" fill="#92400E" fontSize="13" fontWeight="800">Camada Convolucional Equidistante</text>
                <text x="120" y="60" textAnchor="middle" fill="#78350F" fontSize="11" fontWeight="600">• in_channels = 3</text>
                <text x="120" y="80" textAnchor="middle" fill="#78350F" fontSize="11" fontWeight="600">• out_channels = 768 (D)</text>
                <text x="120" y="100" textAnchor="middle" fill="#B45309" fontSize="11" fontWeight="800">• kernel_size = 16, stride = 16</text>
                <text x="120" y="120" textAnchor="middle" fill="#78350F" fontSize="10" fontWeight="600">Sem sobreposição de pixels!</text>
              </g>

              <g transform="translate(560, 75)">
                <path d="M 0 10 L 60 10" stroke="#0A345D" strokeWidth="3" markerEnd="url(#arrow-emb)" />
                <text x="30" y="-3" textAnchor="middle" fill="#0A345D" fontSize="11" fontWeight="700">Saída</text>
              </g>

              <g transform="translate(650, 20)">
                <rect x="0" y="0" width="160" height="130" fill="#DCFCE7" stroke="#16A34A" strokeWidth="2" rx="8" />
                <text x="80" y="50" textAnchor="middle" fill="#15803D" fontSize="12" fontWeight="800">Mapa de Features</text>
                <text x="80" y="70" textAnchor="middle" fill="#166534" fontSize="11" fontWeight="600">[B, 768, 14, 14]</text>
                <text x="80" y="95" textAnchor="middle" fill="#15803D" fontSize="10" fontWeight="700">Flatten + Transpose ➔</text>
                <text x="80" y="115" textAnchor="middle" fill="#047857" fontSize="12" fontWeight="800">[B, 196, 768]</text>
              </g>
            </svg>
          </div>
        )}

        {/* Rodapé Didático */}
        <div style={{
          background: '#F8FAFC',
          borderRadius: '8px',
          border: '1px solid #E2E8F0',
          padding: '8px 14px',
          fontSize: '11.5px',
          color: '#475569',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span>
            ⚡ <strong>Insight de Otimização GPU:</strong> A maioria das implementações na indústria (como PyTorch e TorchVision) utiliza <code>nn.Conv2d(3, 768, kernel_size=16, stride=16)</code> porque convoluções com stride aproveitam os núcleos tensoriais (Tensor Cores) com velocidade máxima.
          </span>
          <span className="badge badge-cyan">Zero Perda Algébrica</span>
        </div>
      </div>
    </div>
  );
}
