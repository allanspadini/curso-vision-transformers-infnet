import React, { useState } from 'react';

export default function ViTBlockAnatomyDiagram() {
  const [highlight, setHighlight] = useState('all');

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {/* Barra Superior */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#F8FAFC',
        border: '1px solid #E2E8F0',
        borderRadius: '8px',
        padding: '8px 16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
            Destacar Subcamada:
          </span>
          {[
            { id: 'all', label: 'Bloco Completo' },
            { id: 'msa', label: '1. Pre-LN + Multi-Head Attention' },
            { id: 'mlp', label: '2. Pre-LN + MLP (Expansão 4×)' }
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => setHighlight(btn.id)}
              style={{
                padding: '4px 12px',
                borderRadius: '6px',
                border: highlight === btn.id ? '2px solid var(--infnet-cyan)' : '1px solid #CBD5E1',
                background: highlight === btn.id ? '#E0F2FE' : '#FFFFFF',
                color: highlight === btn.id ? 'var(--infnet-dark-blue)' : '#475569',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {btn.label}
            </button>
          ))}
        </div>
        <span className="badge badge-cyan">Pre-LayerNorm Standard</span>
      </div>

      {/* Área Central: Diagrama em SVG do Bloco Transformer */}
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
        {/* Painel Esquerdo: Diagrama Vetorial em SVG do Fluxo Residual */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <svg viewBox="0 0 360 380" style={{ width: '100%', maxHeight: '360px' }}>
            {/* Entrada z_(l-1) */}
            <rect x="110" y="340" width="140" height="30" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="1.5" rx="6" />
            <text x="180" y="360" textAnchor="middle" fill="#0A345D" fontSize="12" fontWeight="700">Entrada: z_(ℓ-1)</text>

            {/* Linha de bypass residual 1 (à esquerda) */}
            <path d="M 110 355 L 60 355 L 60 195 L 155 195" fill="none" stroke="#0284C7" strokeWidth="2" strokeDasharray="3 3" />
            <text x="50" y="275" textAnchor="middle" fill="#0284C7" fontSize="9" fontWeight="700" transform="rotate(-90 50 275)">Skip Residual 1</text>

            {/* Submódulo 1: Pre-LN + MSA */}
            <g opacity={highlight === 'mlp' ? 0.35 : 1.0}>
              {/* LayerNorm 1 */}
              <rect x="110" y="285" width="140" height="30" fill="#FEF3C7" stroke="#D97706" strokeWidth="1.5" rx="6" />
              <text x="180" y="305" textAnchor="middle" fill="#92400E" fontSize="11" fontWeight="700">LayerNorm (Pre-LN)</text>
              <line x1="180" y1="340" x2="180" y2="315" stroke="#0A345D" strokeWidth="2" markerEnd="url(#arrow-blk)" />

              {/* Multi-Head Self-Attention */}
              <rect x="90" y="225" width="180" height="35" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2" rx="6" />
              <text x="180" y="247" textAnchor="middle" fill="#0369A1" fontSize="12" fontWeight="800">Multi-Head Attention (MSA)</text>
              <line x1="180" y1="285" x2="180" y2="260" stroke="#0A345D" strokeWidth="2" markerEnd="url(#arrow-blk)" />

              {/* Soma Residual 1 */}
              <circle cx="180" cy="195" r="14" fill="#FFFFFF" stroke="#0284C7" strokeWidth="2" />
              <text x="180" y="200" textAnchor="middle" fill="#0284C7" fontSize="15" fontWeight="900">+</text>
              <line x1="180" y1="225" x2="180" y2="209" stroke="#0A345D" strokeWidth="2" markerEnd="url(#arrow-blk)" />
            </g>

            {/* Linha de bypass residual 2 (à direita) */}
            <path d="M 200 195 L 300 195 L 300 45 L 200 45" fill="none" stroke="#7C3AED" strokeWidth="2" strokeDasharray="3 3" />
            <text x="312" y="120" textAnchor="middle" fill="#7C3AED" fontSize="9" fontWeight="700" transform="rotate(90 312 120)">Skip Residual 2</text>

            {/* Submódulo 2: Pre-LN + MLP */}
            <g opacity={highlight === 'msa' ? 0.35 : 1.0}>
              {/* LayerNorm 2 */}
              <rect x="110" y="130" width="140" height="30" fill="#FEF3C7" stroke="#D97706" strokeWidth="1.5" rx="6" />
              <text x="180" y="150" textAnchor="middle" fill="#92400E" fontSize="11" fontWeight="700">LayerNorm (Pre-LN)</text>
              <line x1="180" y1="181" x2="180" y2="160" stroke="#0A345D" strokeWidth="2" markerEnd="url(#arrow-blk)" />

              {/* MLP (Feed-Forward com GELU) */}
              <rect x="90" y="70" width="180" height="35" fill="#FAF5FF" stroke="#A855F7" strokeWidth="2" rx="6" />
              <text x="180" y="92" textAnchor="middle" fill="#7E22CE" fontSize="12" fontWeight="800">MLP (Linear ➔ GELU ➔ Linear)</text>
              <line x1="180" y1="130" x2="180" y2="105" stroke="#0A345D" strokeWidth="2" markerEnd="url(#arrow-blk)" />

              {/* Soma Residual 2 */}
              <circle cx="180" cy="45" r="14" fill="#FFFFFF" stroke="#7C3AED" strokeWidth="2" />
              <text x="180" y="50" textAnchor="middle" fill="#7C3AED" fontSize="15" fontWeight="900">+</text>
              <line x1="180" y1="70" x2="180" y2="59" stroke="#0A345D" strokeWidth="2" markerEnd="url(#arrow-blk)" />
            </g>

            {/* Saída z_l */}
            <line x1="180" y1="31" x2="180" y2="8" stroke="#16A34A" strokeWidth="2.5" markerEnd="url(#arrow-blk)" />
            <rect x="110" y="-8" width="140" height="24" fill="#DCFCE7" stroke="#16A34A" strokeWidth="1.5" rx="4" />
            <text x="180" y="8" textAnchor="middle" fill="#15803D" fontSize="11" fontWeight="800">Saída: z_ℓ [B, 197, 768]</text>

            <defs>
              <marker id="arrow-blk" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M 0 0 L 6 3 L 0 6 z" fill="#0A345D" />
              </marker>
            </defs>
          </svg>
        </div>

        {/* Painel Direito: Equações e Detalhes de Arquitetura */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <h4 style={{ fontSize: '15px', color: 'var(--infnet-dark-blue)', margin: '0 0 10px 0' }}>
              Formulações Oficiais do Bloco
            </h4>
            <div style={{
              background: '#F8FAFC',
              borderRadius: '8px',
              border: '1px solid #E2E8F0',
              padding: '12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}>
              <div>
                <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 700 }}>1. AUTOATENÇÃO RESIDUAL:</span>
                <div style={{ fontSize: '13px', fontFamily: 'var(--font-mono)', color: '#0369A1', fontWeight: 700, marginTop: '2px' }}>
                  z'ℓ = MSA(LN(z_(ℓ-1))) + z_(ℓ-1)
                </div>
              </div>
              <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '8px' }}>
                <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 700 }}>2. MLP RESIDUAL (EXPANSÃO 4×):</span>
                <div style={{ fontSize: '13px', fontFamily: 'var(--font-mono)', color: '#7E22CE', fontWeight: 700, marginTop: '2px' }}>
                  zℓ = MLP(LN(z'ℓ)) + z'ℓ
                </div>
              </div>
            </div>
          </div>

          {/* Destaques de Design */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '11.5px', color: '#475569' }}>
            <div style={{ display: 'flex', gap: '6px' }}>
              <span style={{ color: 'var(--infnet-cyan)', fontWeight: 800 }}>•</span>
              <span><strong>Pre-LayerNorm:</strong> A normalização é aplicada ANTES da atenção e do MLP, garantindo fluxo limpo de gradientes sem saturação.</span>
            </div>
            <div style={{ display: 'flex', gap: '6px' }}>
              <span style={{ color: 'var(--infnet-purple)', fontWeight: 800 }}>•</span>
              <span><strong>Expansão 4× do MLP:</strong> O vetor de dimensão $768$ é projetado linearmente para $3072$ com ativação GELU e depois rebaixado de volta para $768$.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
