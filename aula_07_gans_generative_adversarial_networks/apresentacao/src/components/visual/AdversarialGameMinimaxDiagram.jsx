import React from 'react';

export default function AdversarialGameMinimaxDiagram() {
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
            Teoria dos Jogos de Soma Zero
          </span>
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--infnet-dark-blue)' }}>
            O Jogo Minimax entre Gerador (Falsificador) e Discriminador (Polícia Investigativa)
          </span>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <span className="badge badge-purple" style={{ fontSize: '11px' }}>Espaço Latente z ~ N(0, I)</span>
          <span className="badge badge-green" style={{ fontSize: '11px' }}>Equilíbrio de Nash: D(x) = 1/2</span>
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
        <svg viewBox="0 0 1100 420" style={{ width: '100%', height: '100%', maxHeight: '420px' }}>
          <defs>
            <linearGradient id="grad-gen" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#6D28D9" />
            </linearGradient>
            <linearGradient id="grad-disc" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0EA5E9" />
              <stop offset="100%" stopColor="#0369A1" />
            </linearGradient>
            <linearGradient id="grad-real" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>
            <marker id="arr-purple" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#8B5CF6" />
            </marker>
            <marker id="arr-cyan" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#0EA5E9" />
            </marker>
            <marker id="arr-green" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#10B981" />
            </marker>
            <marker id="arr-red" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#EF4444" />
            </marker>
          </defs>

          {/* 1. ESPAÇO LATENTE z */}
          <g transform="translate(30, 80)">
            <rect x="0" y="0" width="130" height="90" rx="8" fill="#F5F3FF" stroke="#DDD6FE" strokeWidth="1.5" />
            <circle cx="65" cy="35" r="22" fill="#EDE9FE" stroke="#8B5CF6" strokeWidth="1.5" strokeDasharray="3 3" />
            <text x="65" y="38" fill="#7C3AED" fontSize="13" fontWeight="700" textAnchor="middle" fontFamily="var(--font-code)">z</text>
            <text x="65" y="68" fill="#6D28D9" fontSize="10" fontWeight="700" textAnchor="middle">Vetor Latente</text>
            <text x="65" y="80" fill="#8B5CF6" fontSize="8.5" textAnchor="middle" fontFamily="var(--font-code)">z ~ N(0, I) ∈ ℝ¹⁰⁰</text>
          </g>

          {/* Seta z -> Gerador */}
          <path d="M 160 125 L 210 125" fill="none" stroke="#8B5CF6" strokeWidth="2.5" markerEnd="url(#arr-purple)" />

          {/* 2. O GERADOR G(z) */}
          <g transform="translate(210, 60)">
            <rect x="0" y="0" width="160" height="130" rx="10" fill="url(#grad-gen)" filter="drop-shadow(0 6px 12px rgba(139,92,246,0.25))" />
            <text x="80" y="30" fill="#FFFFFF" fontSize="13" fontWeight="800" textAnchor="middle">
              GERADOR G(z; θ_g)
            </text>
            <text x="80" y="46" fill="#DDD6FE" fontSize="9" fontWeight="600" textAnchor="middle">
              "O Falsificador"
            </text>
            <rect x="15" y="58" width="130" height="58" rx="6" fill="rgba(255,255,255,0.12)" />
            <text x="80" y="74" fill="#FFFFFF" fontSize="8.5" textAnchor="middle">Mapeia ruído em imagem</text>
            <text x="80" y="88" fill="#C4B5FD" fontSize="8" textAnchor="middle" fontFamily="var(--font-code)">z ↦ G(z) ~ p_g</text>
            <text x="80" y="104" fill="#FFFFFF" fontSize="8" fontWeight="700" textAnchor="middle">Objetivo: Enganar D</text>
          </g>

          {/* Seta G -> Imagem Sintética */}
          <path d="M 370 125 L 430 125" fill="none" stroke="#8B5CF6" strokeWidth="2.5" markerEnd="url(#arr-purple)" />

          {/* 3. IMAGEM SINTÉTICA (FAKE) */}
          <g transform="translate(430, 80)">
            <rect x="0" y="0" width="120" height="90" rx="8" fill="#FAF5FF" stroke="#C084FC" strokeWidth="1.5" />
            <rect x="15" y="12" width="90" height="46" rx="4" fill="#F3E8FF" stroke="#A855F7" strokeWidth="1" strokeDasharray="2 2" />
            <text x="60" y="38" fill="#9333EA" fontSize="10.5" fontWeight="700" textAnchor="middle">x_fake = G(z)</text>
            <text x="60" y="72" fill="#7E22CE" fontSize="9" fontWeight="600" textAnchor="middle">Amostra Sintética</text>
            <text x="60" y="82" fill="#A855F7" fontSize="8" textAnchor="middle">Rótulo: y = 0</text>
          </g>

          {/* 4. DADOS REAIS (DATASET REAL) */}
          <g transform="translate(430, 240)">
            <rect x="0" y="0" width="120" height="90" rx="8" fill="#F0FDF4" stroke="#86EFAC" strokeWidth="1.5" />
            <rect x="15" y="12" width="90" height="46" rx="4" fill="#DCFCE7" stroke="#22C55E" strokeWidth="1" />
            <text x="60" y="38" fill="#15803D" fontSize="10.5" fontWeight="700" textAnchor="middle">x_real ~ p_data</text>
            <text x="60" y="72" fill="#166534" fontSize="9" fontWeight="600" textAnchor="middle">Amostra Real</text>
            <text x="60" y="82" fill="#22C55E" fontSize="8" textAnchor="middle">Rótulo: y = 1</text>
          </g>

          {/* Setas para o Discriminador */}
          <path d="M 550 125 L 610 170" fill="none" stroke="#8B5CF6" strokeWidth="2" markerEnd="url(#arr-purple)" />
          <path d="M 550 285 L 610 230" fill="none" stroke="#10B981" strokeWidth="2" markerEnd="url(#arr-green)" />

          {/* 5. O DISCRIMINADOR D(x) */}
          <g transform="translate(610, 140)">
            <rect x="0" y="0" width="180" height="135" rx="10" fill="url(#grad-disc)" filter="drop-shadow(0 6px 14px rgba(14,165,233,0.25))" />
            <text x="90" y="30" fill="#FFFFFF" fontSize="13" fontWeight="800" textAnchor="middle">
              DISCRIMINADOR D(x; θ_d)
            </text>
            <text x="90" y="46" fill="#BAE6FD" fontSize="9" fontWeight="600" textAnchor="middle">
              "A Polícia Investigativa"
            </text>
            <rect x="15" y="58" width="150" height="62" rx="6" fill="rgba(255,255,255,0.12)" />
            <text x="90" y="76" fill="#FFFFFF" fontSize="8.5" textAnchor="middle">Classificador Binário de Verdade</text>
            <text x="90" y="92" fill="#E0F2FE" fontSize="8" textAnchor="middle" fontFamily="var(--font-code)">D(x) = P(x ∈ Real | x)</text>
            <text x="90" y="108" fill="#FFFFFF" fontSize="8" fontWeight="700" textAnchor="middle">D(real) → 1 | D(fake) → 0</text>
          </g>

          {/* Seta D -> Escalar de Probabilidade */}
          <path d="M 790 207 L 850 207" fill="none" stroke="#0EA5E9" strokeWidth="2.5" markerEnd="url(#arr-cyan)" />

          {/* 6. VEREDITO DE PROBABILIDADE */}
          <g transform="translate(850, 150)">
            <rect x="0" y="0" width="140" height="115" rx="8" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
            <text x="70" y="24" fill="#334155" fontSize="10" fontWeight="700" textAnchor="middle">
              VEREDITO D(x)
            </text>
            <rect x="15" y="36" width="110" height="34" rx="4" fill="#E0F2FE" stroke="#38BDF8" strokeWidth="1" />
            <text x="70" y="58" fill="#0284C7" fontSize="12" fontWeight="800" textAnchor="middle" fontFamily="var(--font-code)">
              P ∈ [0.0, 1.0]
            </text>
            <text x="70" y="86" fill="#64748B" fontSize="8">1.0 = Certamente Real</text>
            <text x="70" y="98" fill="#64748B" fontSize="8">0.0 = Certamente Fake</text>
          </g>

          {/* 7. LOOP DE RETROPROPAGAÇÃO DE GRADIENTES */}
          {/* Gradiente para D */}
          <path d="M 700 275 L 700 350 L 590 350" fill="none" stroke="#0EA5E9" strokeWidth="2" strokeDasharray="4 3" markerEnd="url(#arr-cyan)" />
          <g transform="translate(420, 335)">
            <rect x="0" y="0" width="160" height="28" rx="4" fill="#E0F2FE" stroke="#38BDF8" />
            <text x="80" y="18" fill="#0369A1" fontSize="9" fontWeight="700" textAnchor="middle">
              ∇_θd: Maximizar log D
            </text>
          </g>

          {/* Gradiente para G através de D */}
          <path d="M 680 140 L 680 25 L 300 25 L 300 60" fill="none" stroke="#EF4444" strokeWidth="2" strokeDasharray="4 3" markerEnd="url(#arr-red)" />
          <g transform="translate(410, 10)">
            <rect x="0" y="0" width="220" height="30" rx="4" fill="#FEF2F2" stroke="#F87171" />
            <text x="110" y="20" fill="#B91C1C" fontSize="9.5" fontWeight="700" textAnchor="middle">
              ∇_θg via D: ∇_G log(1 - D(G(z)))
            </text>
          </g>

          {/* CAIXA DE EQUILÍBRIO DE NASH NO CANTO INFERIOR DIREITO */}
          <g transform="translate(810, 285)">
            <rect x="0" y="0" width="230" height="85" rx="8" fill="#F0FDF4" stroke="#86EFAC" strokeWidth="1.5" />
            <text x="115" y="20" fill="#15803D" fontSize="10" fontWeight="800" textAnchor="middle">
              ★ EQUILÍBRIO DE NASH GLOBAL
            </text>
            <text x="15" y="40" fill="#166534" fontSize="9" fontWeight="600">
              1. Distribuições idênticas: p_g = p_data
            </text>
            <text x="15" y="56" fill="#166534" fontSize="9" fontWeight="600">
              2. Discriminador em dúvida cega: D*(x) = 1/2
            </text>
            <text x="15" y="72" fill="#15803D" fontSize="8.5" fontFamily="var(--font-code)">
              V(D*, G*) = -log(4) ≈ -1.386
            </text>
          </g>
        </svg>
      </div>

      {/* Footer com destaques */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '12px'
      }}>
        <div className="card-infnet" style={{ padding: '8px 14px', background: '#F8FAFC' }}>
          <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 600 }}>PAPEL DO GERADOR</div>
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--infnet-purple)' }}>Aprender o Mapeamento Inverso</div>
          <div style={{ fontSize: '10.5px', color: '#475569', marginTop: '2px' }}>Transporta medida do espaço latente z para o espaço de dados reais</div>
        </div>
        <div className="card-infnet" style={{ padding: '8px 14px', background: '#F8FAFC' }}>
          <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 600 }}>PAPEL DO DISCRIMINADOR</div>
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--infnet-cyan)' }}>Guia Não-Paramétrico de Gradiente</div>
          <div style={{ fontSize: '10.5px', color: '#475569', marginTop: '2px' }}>Fornece o gradiente de supervisão que orienta as melhorias do Gerador</div>
        </div>
        <div className="card-infnet" style={{ padding: '8px 14px', background: '#F8FAFC' }}>
          <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 600 }}>JOGO DE SOMA ZERO</div>
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--infnet-green-accent)' }}>Interdependência Mútua Dinâmica</div>
          <div style={{ fontSize: '10.5px', color: '#475569', marginTop: '2px' }}>Nenhum jogador pode melhorar sua estratégia unilateralmente no ótimo</div>
        </div>
      </div>
    </div>
  );
}
