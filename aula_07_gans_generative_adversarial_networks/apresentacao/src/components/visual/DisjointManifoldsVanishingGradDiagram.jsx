import React from 'react';
import MathView from '../MathView';

export default function DisjointManifoldsVanishingGradDiagram() {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {/* Badges de Identificação */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#EDF5FA',
        border: '1px solid #D0E3F0',
        borderRadius: '8px',
        padding: '10px 18px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{
            background: 'var(--infnet-dark-blue)',
            color: '#FFFFFF',
            fontSize: '11px',
            fontWeight: 700,
            padding: '3px 10px',
            borderRadius: '4px',
            fontFamily: 'var(--font-code)'
          }}>
            Arjovsky & Bottou (ICLR, 2017)
          </span>
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--infnet-dark-blue)' }}>
            A Geometria da Instabilidade: O Teorema dos Suportes Disjuntos em Alta Dimensão
          </span>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <span className="badge badge-purple" style={{ fontSize: '11px' }}>Dimensão Intrínseca d ≪ D</span>
          <span className="badge badge-orange" style={{ fontSize: '11px' }}>JSD = log(2) Constante</span>
          <span className="badge badge-green" style={{ fontSize: '11px' }}>Gradiente ∇_x D → 0</span>
        </div>
      </div>

      {/* Diagrama SVG Principal */}
      <div style={{
        flex: 1,
        background: '#FFFFFF',
        border: '1px solid var(--border-light)',
        borderRadius: '12px',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <svg viewBox="0 0 1100 400" style={{ width: '100%', height: '100%', maxHeight: '420px' }}>
          <defs>
            <linearGradient id="grad-manifold-real" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
            <linearGradient id="grad-manifold-fake" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A855F7" />
              <stop offset="100%" stopColor="#7E22CE" />
            </linearGradient>
            <linearGradient id="grad-boundary" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0EA5E9" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#0284C7" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {/* ESPAÇO AMBIENTE TOTAL: R^D (ex: 64x64x3 = 12.288 dimensões) */}
          <rect x="30" y="20" width="1040" height="360" rx="10" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
          <text x="50" y="45" fill="#64748B" fontSize="12" fontWeight="700" fontFamily="var(--font-code)">
            Espaço Ambiente de Imagens ℝ^D (Ex: D = 64 × 64 × 3 = 12.288 dimensões)
          </text>

          {/* 1. VARIEDADE REAL M_r (Verde) */}
          <g transform="translate(80, 80)">
            {/* Superfície curva simulando sub-variedade 2D em espaço 3D/ND */}
            <path
              d="M 20 80 Q 90 20 180 50 T 320 70 L 300 210 Q 200 170 120 200 T 0 220 Z"
              fill="url(#grad-manifold-real)"
              opacity="0.85"
              filter="drop-shadow(0 6px 12px rgba(16,185,129,0.25))"
            />
            {/* Linhas de malha da variedade */}
            <path d="M 20 80 Q 120 140 300 210" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
            <path d="M 180 50 Q 170 130 120 200" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />

            <text x="140" y="110" fill="#FFFFFF" fontSize="12" fontWeight="800" textAnchor="middle">
              Variedade Real ℳ_real
            </text>
            <text x="140" y="128" fill="#DCFCE7" fontSize="9.5" fontWeight="600" textAnchor="middle">
              Suporte Suave de Dimensão d ≪ D
            </text>
            <text x="140" y="144" fill="#FFFFFF" fontSize="9" textAnchor="middle" fontFamily="var(--font-code)">
              x ~ p_data (Imagens Naturais)
            </text>
          </g>

          {/* 2. HIPERPLANO SEPARADOR PERFEITO DE D (Fronteira de Decisão) */}
          <g transform="translate(480, 60)">
            <rect x="0" y="0" width="140" height="270" rx="8" fill="url(#grad-boundary)" stroke="#0284C7" strokeWidth="2" strokeDasharray="5 3" />
            <text x="70" y="30" fill="#0A345D" fontSize="11" fontWeight="800" textAnchor="middle">
              Fronteira D*(x)
            </text>
            <text x="70" y="46" fill="#0369A1" fontSize="9" fontWeight="700" textAnchor="middle">
              Separador Perfeito
            </text>

            <rect x="15" y="65" width="110" height="42" rx="4" fill="#FFFFFF" stroke="#BAE6FD" />
            <text x="70" y="82" fill="#0369A1" fontSize="8.5" fontWeight="700" textAnchor="middle">Lado Real:</text>
            <text x="70" y="98" fill="#15803D" fontSize="9" fontWeight="800" textAnchor="middle" fontFamily="var(--font-code)">D(x_real) = 1.0</text>

            <rect x="15" y="120" width="110" height="42" rx="4" fill="#FFFFFF" stroke="#BAE6FD" />
            <text x="70" y="137" fill="#0369A1" fontSize="8.5" fontWeight="700" textAnchor="middle">Lado Fake:</text>
            <text x="70" y="153" fill="#7E22CE" fontSize="9" fontWeight="800" textAnchor="middle" fontFamily="var(--font-code)">D(x_fake) = 0.0</text>

            {/* Aviso de Gradiente Nulo */}
            <rect x="10" y="180" width="120" height="70" rx="6" fill="#FEF2F2" stroke="#FCA5A5" />
            <text x="70" y="198" fill="#DC2626" fontSize="9" fontWeight="800" textAnchor="middle">⚠️ GRADIENTE MORTO</text>
            <text x="70" y="214" fill="#991B1B" fontSize="8" textAnchor="middle">Fora da fronteira:</text>
            <text x="70" y="228" fill="#B91C1C" fontSize="9" fontWeight="800" textAnchor="middle" fontFamily="var(--font-code)">∇_x D(x) → 0</text>
            <text x="70" y="242" fill="#7F1D1D" fontSize="7.5" textAnchor="middle">Sem sinal para G!</text>
          </g>

          {/* 3. VARIEDADE GERADA M_g (Roxa) */}
          <g transform="translate(680, 80)">
            <path
              d="M 40 60 Q 120 10 240 40 T 340 90 L 320 220 Q 220 190 140 210 T 20 230 Z"
              fill="url(#grad-manifold-fake)"
              opacity="0.85"
              filter="drop-shadow(0 6px 12px rgba(168,85,247,0.25))"
            />
            {/* Linhas de malha */}
            <path d="M 40 60 Q 150 140 320 220" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
            <path d="M 240 40 Q 200 130 140 210" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />

            <text x="180" y="110" fill="#FFFFFF" fontSize="12" fontWeight="800" textAnchor="middle">
              Variedade Gerada ℳ_fake
            </text>
            <text x="180" y="128" fill="#F3E8FF" fontSize="9.5" fontWeight="600" textAnchor="middle">
              Suporte Sintético de Dimensão d_z
            </text>
            <text x="180" y="144" fill="#FFFFFF" fontSize="9" textAnchor="middle" fontFamily="var(--font-code)">
              x_fake = G(z), z ∈ ℝ¹⁰⁰
            </text>
          </g>

          {/* DISTÂNCIA ENTRE SUPORTES E TEOREMA DE ARJOVSKY */}
          <g transform="translate(420, 340)">
            <rect x="0" y="0" width="260" height="32" rx="4" fill="#F1F5F9" stroke="#94A3B8" />
            <text x="130" y="15" fill="#0A345D" fontSize="8.5" fontWeight="700" textAnchor="middle">
              Teorema: Interseção tem Medida Quase Nula:
            </text>
            <text x="130" y="27" fill="#475569" fontSize="8" textAnchor="middle" fontFamily="var(--font-code)">
              μ(ℳ_real ∩ ℳ_fake) = 0 ⟹ JSD = log(2) constante
            </text>
          </g>
        </svg>
      </div>

      {/* Footer com destaques do teorema */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '12px'
      }}>
        <div className="card-infnet" style={{ padding: '8px 14px', background: '#F8FAFC' }}>
          <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 600 }}>HIPÓTESE DA VARIEDADE</div>
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>Dimensão Intrínseca Ínfima</div>
          <div style={{ fontSize: '10.5px', color: '#475569', marginTop: '2px' }}>Imagens naturais não preenchem uniformemente ℝ^D; vivem em dobras estreitas</div>
        </div>
        <div className="card-infnet" style={{ padding: '8px 14px', background: '#F8FAFC' }}>
          <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 600 }}>O PARADOXO DO DISCRIMINADOR</div>
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--infnet-orange)' }}>Perfeição Causa Cegueira em G</div>
          <div style={{ fontSize: '10.5px', color: '#475569', marginTop: '2px' }}>Quanto melhor D distingue os suportes, mais rápido o gradiente em G desaparece</div>
        </div>
        <div className="card-infnet" style={{ padding: '8px 14px', background: '#F8FAFC' }}>
          <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 600 }}>FALHA DA DIVERGÊNCIA JS</div>
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--infnet-red)' }}>Degrau Descontínuo sem Derivada</div>
          <div style={{ fontSize: '10.5px', color: '#475569', marginTop: '2px' }}>Se não há sobreposição, JSD = log 2 independe da distância real entre as imagens</div>
        </div>
      </div>
    </div>
  );
}
