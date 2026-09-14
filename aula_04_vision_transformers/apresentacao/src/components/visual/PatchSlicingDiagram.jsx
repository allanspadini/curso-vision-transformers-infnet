import React from 'react';

export default function PatchSlicingDiagram() {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {/* Banner de Roteamento Conceitual */}
      <div style={{
        background: '#F0FDF4',
        border: '1px solid #BBF7D0',
        borderRadius: '8px',
        padding: '8px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ fontSize: '12.5px', color: '#166534', fontWeight: 600 }}>
          💡 <strong>A Grande Sacada (Dosovitskiy et al., 2020):</strong> Substituir cada <em>palavra de texto</em> por um <em>patch 2D de pixels</em> ($16 \times 16$).
        </div>
        <span className="badge badge-green">Fórmula: N = (H · W) / P²</span>
      </div>

      {/* Área Central: O Fluxo de Transformação Visual da Imagem em Patches */}
      <div style={{
        flex: 1,
        background: '#FFFFFF',
        borderRadius: '12px',
        border: '1px solid #E2E8F0',
        padding: '16px 20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 0
      }}>
        <svg viewBox="0 0 900 280" style={{ width: '100%', maxHeight: '270px' }}>
          {/* Estágio 1: Imagem Original 224x224x3 */}
          <g transform="translate(40, 20)">
            <rect x="0" y="0" width="160" height="160" fill="#E2E8F0" stroke="#0A345D" strokeWidth="2.5" rx="8" />
            {/* Grade pontilhada 14x14 indicando o corte */}
            {Array.from({ length: 7 }).map((_, i) => (
              <React.Fragment key={i}>
                <line x1={i * 22.8} y1="0" x2={i * 22.8} y2="160" stroke="#64748B" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="0" y1={i * 22.8} x2="160" y2={i * 22.8} stroke="#64748B" strokeWidth="1" strokeDasharray="3 3" />
              </React.Fragment>
            ))}
            {/* Patch destacado em ciano */}
            <rect x="45.6" y="45.6" width="22.8" height="22.8" fill="#1BB5D8" stroke="#0A345D" strokeWidth="2" />
            <text x="80" y="195" textAnchor="middle" fill="#0A345D" fontSize="13" fontWeight="800">Imagem de Entrada</text>
            <text x="80" y="215" textAnchor="middle" fill="#64748B" fontSize="11" fontWeight="600">x ∈ ℝ^(224 × 224 × 3)</text>
            <text x="80" y="235" textAnchor="middle" fill="#0284C7" fontSize="11" fontWeight="700">150.528 valores contínuos</text>
          </g>

          {/* Seta 1: Fatiamento em Grade */}
          <g transform="translate(230, 90)">
            <path d="M 0 10 L 60 10" stroke="#0A345D" strokeWidth="3" markerEnd="url(#arrow-slice)" />
            <text x="30" y="-5" textAnchor="middle" fill="#0A345D" fontSize="11" fontWeight="700">Fatiamento</text>
            <text x="30" y="32" textAnchor="middle" fill="#166534" fontSize="10" fontWeight="700">Grade 14 × 14</text>
          </g>

          {/* Estágio 2: Conjunto de Patches Desacoplados */}
          <g transform="translate(320, 25)">
            <rect x="0" y="0" width="180" height="150" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" rx="8" />
            {/* Vários patches flutuando organizadamente */}
            {[
              { x: 15, y: 15, label: 'x_p¹' },
              { x: 70, y: 15, label: 'x_p²' },
              { x: 125, y: 15, label: 'x_p³' },
              { x: 15, y: 80, label: 'x_p⁴' },
              { x: 70, y: 80, label: '...' },
              { x: 125, y: 80, label: 'x_p¹⁹⁶' }
            ].map((p, idx) => (
              <g key={idx} transform={`translate(${p.x}, ${p.y})`}>
                <rect x="0" y="0" width="40" height="40" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1.5" rx="4" />
                <text x="20" y="25" textAnchor="middle" fill="#0369A1" fontSize="11" fontWeight="700">{p.label}</text>
              </g>
            ))}
            <text x="90" y="190" textAnchor="middle" fill="#0A345D" fontSize="13" fontWeight="800">196 Patches Espaciais</text>
            <text x="90" y="210" textAnchor="middle" fill="#64748B" fontSize="11" fontWeight="600">Cada patch: 16 × 16 × 3</text>
            <text x="90" y="230" textAnchor="middle" fill="#7C3AED" fontSize="11" fontWeight="700">768 pixels por patch</text>
          </g>

          {/* Seta 2: Linearização */}
          <g transform="translate(530, 90)">
            <path d="M 0 10 L 60 10" stroke="#0A345D" strokeWidth="3" markerEnd="url(#arrow-slice)" />
            <text x="30" y="-5" textAnchor="middle" fill="#0A345D" fontSize="11" fontWeight="700">Unroll 1D</text>
            <text x="30" y="32" textAnchor="middle" fill="#475569" fontSize="10" fontWeight="600">Flattening</text>
          </g>

          {/* Estágio 3: Sequência Linear para o Transformer */}
          <g transform="translate(620, 40)">
            <rect x="0" y="0" width="240" height="120" fill="#FAF5FF" stroke="#A855F7" strokeWidth="2" rx="8" />
            <g transform="translate(15, 20)">
              {/* Representação dos vetores enfileirados */}
              {[0, 1, 2, 3, 4].map((col) => (
                <rect
                  key={col}
                  x={col * 42}
                  y="0"
                  width="36"
                  height="80"
                  fill={col === 0 ? '#AB47BC' : '#38BDF8'}
                  opacity={0.85}
                  rx="4"
                  stroke={col === 0 ? '#6B21A8' : '#0284C7'}
                  strokeWidth="1.5"
                />
              ))}
              <text x="18" y="45" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="800">CLS</text>
              <text x="60" y="45" textAnchor="middle" fill="#0F172A" fontSize="10" fontWeight="700">P₁</text>
              <text x="102" y="45" textAnchor="middle" fill="#0F172A" fontSize="10" fontWeight="700">P₂</text>
              <text x="144" y="45" textAnchor="middle" fill="#0F172A" fontSize="10" fontWeight="700">P₃</text>
              <text x="186" y="45" textAnchor="middle" fill="#0F172A" fontSize="10" fontWeight="700">...</text>
            </g>
            <text x="120" y="175" textAnchor="middle" fill="#6B21A8" fontSize="13" fontWeight="800">Sequência de Tokens Visuais</text>
            <text x="120" y="195" textAnchor="middle" fill="#475569" fontSize="11" fontWeight="600">Tensor: [Batch, 197, 768]</text>
            <text x="120" y="215" textAnchor="middle" fill="#16A34A" fontSize="11" fontWeight="700">Compatível com Transformer Encoder!</text>
          </g>

          <defs>
            <marker id="arrow-slice" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M 0 0 L 8 4 L 0 8 z" fill="#0A345D" />
            </marker>
          </defs>
        </svg>
      </div>
    </div>
  );
}
