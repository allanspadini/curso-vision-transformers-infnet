import React from 'react';

export default function ClsTokenPositionalDiagram() {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {/* Banner Superior */}
      <div style={{
        background: '#FAF5FF',
        border: '1px solid #E9D5FF',
        borderRadius: '8px',
        padding: '8px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ fontSize: '12.5px', color: '#6B21A8', fontWeight: 600 }}>
          🧩 <strong>Injeção Dupla:</strong> 1. Token [CLS] agregador de classe + 2. Position Embeddings para recuperar a ordem espacial 2D perdida.
        </div>
        <span className="badge badge-purple">Dimensão Resultante: [B, 197, 768]</span>
      </div>

      {/* Área Central: Diagrama Visual de Concatenação e Adição Posicional */}
      <div style={{
        flex: 1,
        background: '#FFFFFF',
        borderRadius: '12px',
        border: '1px solid #E2E8F0',
        padding: '16px 20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: 0
      }}>
        <svg viewBox="0 0 880 230" style={{ width: '100%', maxHeight: '220px' }}>
          {/* Fila dos 196 Patches Lineares */}
          <g transform="translate(140, 20)">
            <text x="180" y="-6" textAnchor="middle" fill="#0A345D" fontSize="11" fontWeight="700">Sequência de 196 Patches Projetados [B, 196, 768]</text>
            {[1, 2, 3, 4, 5, 6].map((p, idx) => (
              <g key={p} transform={`translate(${idx * 60}, 10)`}>
                <rect x="0" y="0" width="50" height="50" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1.5" rx="4" />
                <text x="25" y="30" textAnchor="middle" fill="#0369A1" fontSize="11" fontWeight="700">P{p}</text>
              </g>
            ))}
            <text x="400" y="42" textAnchor="start" fill="#64748B" fontSize="14" fontWeight="800">... P₁₉₆</text>
          </g>

          {/* Token Especial [CLS] prepended à esquerda */}
          <g transform="translate(30, 20)">
            <text x="45" y="-6" textAnchor="middle" fill="#6B21A8" fontSize="11" fontWeight="800">Token [CLS]</text>
            <rect x="15" y="10" width="60" height="50" fill="#AB47BC" stroke="#6B21A8" strokeWidth="2" rx="6" />
            <text x="45" y="40" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="800">[CLS]</text>
          </g>

          {/* Seta de Concatenação */}
          <g transform="translate(95, 45)">
            <text x="10" y="10" textAnchor="middle" fill="#6B21A8" fontSize="16" fontWeight="900">⊕</text>
          </g>

          {/* Operador de Adição Element-Wise com Position Embeddings */}
          <g transform="translate(20, 100)">
            <text x="20" y="25" fill="#C2410C" fontSize="14" fontWeight="900">+</text>
          </g>

          {/* Fila dos Position Embeddings (E_pos) */}
          <g transform="translate(45, 95)">
            <rect x="0" y="0" width="60" height="40" fill="#FFEDD5" stroke="#EA580C" strokeWidth="1.5" rx="4" />
            <text x="30" y="25" textAnchor="middle" fill="#C2410C" fontSize="10" fontWeight="700">Pos 0</text>
          </g>

          <g transform="translate(140, 95)">
            {[1, 2, 3, 4, 5, 6].map((p, idx) => (
              <g key={p} transform={`translate(${idx * 60}, 0)`}>
                <rect x="0" y="0" width="50" height="40" fill="#FFEDD5" stroke="#EA580C" strokeWidth="1.5" rx="4" />
                <text x="25" y="25" textAnchor="middle" fill="#C2410C" fontSize="10" fontWeight="700">Pos {p}</text>
              </g>
            ))}
            <text x="400" y="26" textAnchor="start" fill="#EA580C" fontSize="13" fontWeight="700">... Pos 196</text>
            <text x="180" y="60" textAnchor="middle" fill="#9A3412" fontSize="11" fontWeight="700">Position Embeddings Aprendidos: E_pos ∈ ℝ^(197 × 768)</text>
          </g>

          {/* Seta para Baixo Indicando a Saída para o Bloco 1 */}
          <g transform="translate(680, 50)">
            <path d="M 0 0 L 0 80" stroke="#16A34A" strokeWidth="3" markerEnd="url(#arrow-green)" />
            <text x="15" y="45" fill="#15803D" fontSize="11" fontWeight="800">Entrada z₀</text>
          </g>

          {/* Caixa de Destaque da Equação Canônica */}
          <g transform="translate(730, 40)">
            <rect x="0" y="0" width="130" height="100" fill="#F0FDF4" stroke="#16A34A" strokeWidth="2" rx="8" />
            <text x="65" y="28" textAnchor="middle" fill="#166534" fontSize="11" fontWeight="800">Formato Final:</text>
            <text x="65" y="52" textAnchor="middle" fill="#0A345D" fontSize="13" fontWeight="900">197 tokens</text>
            <text x="65" y="72" textAnchor="middle" fill="#15803D" fontSize="11" fontWeight="700">d = 768</text>
            <text x="65" y="88" textAnchor="middle" fill="#64748B" fontSize="9" fontWeight="600">[B, 197, 768]</text>
          </g>

          <defs>
            <marker id="arrow-green" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
              <path d="M 0 0 L 8 4 L 0 8 z" fill="#16A34A" />
            </marker>
          </defs>
        </svg>

        {/* Rodapé Comparativo */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '12px',
          background: '#F8FAFC',
          borderRadius: '8px',
          border: '1px solid #E2E8F0',
          padding: '10px 14px',
          fontSize: '11.5px',
          color: '#334155'
        }}>
          <div>
            <strong>Por que o Token [CLS]?</strong> Em vez de fazer uma média arbitrária de todos os patches (que pode diluir partes essenciais como a cabeça de um animal), o token [CLS] atua como um coletor dinâmico via autoatenção global.
          </div>
          <div>
            <strong>Por que Embeddings 1D e não 2D?</strong> Os autores testaram embeddings baseados em coordenadas cartesianas $(x, y)$. No treino em larga escala, os vetores 1D aprenderam sozinhos a topologia bidirecional sem diferença estatística!
          </div>
        </div>
      </div>
    </div>
  );
}
