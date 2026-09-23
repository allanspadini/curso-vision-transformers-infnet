import React from 'react';

export default function GenerativeModelsLandscapeDiagram() {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {/* Header com badges de taxonomia */}
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
            Ian Goodfellow et al. (NIPS, 2014)
          </span>
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--infnet-dark-blue)' }}>
            Taxonomia de Modelos Generativos Profundos: Da Densidade Explícita aos Modelos Implícitos
          </span>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <span className="badge badge-cyan" style={{ fontSize: '11px' }}>Densidade Implícita</span>
          <span className="badge badge-green" style={{ fontSize: '11px' }}>Amostragem O(1) Direta</span>
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
            <linearGradient id="grad-root" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0A345D" />
              <stop offset="100%" stopColor="#061F38" />
            </linearGradient>
            <linearGradient id="grad-explicit" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#475569" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>
            <linearGradient id="grad-implicit" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1BB5D8" />
              <stop offset="100%" stopColor="#0D8CA8" />
            </linearGradient>
            <linearGradient id="grad-gan-box" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7CB342" />
              <stop offset="100%" stopColor="#558B2F" />
            </linearGradient>
            <marker id="arrow-gray" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#94A3B8" />
            </marker>
            <marker id="arrow-cyan" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#1BB5D8" />
            </marker>
          </defs>

          {/* NÓ RAIZ */}
          <g transform="translate(430, 20)">
            <rect x="0" y="0" width="240" height="50" rx="8" fill="url(#grad-root)" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.15))" />
            <text x="120" y="25" fill="#FFFFFF" fontSize="13" fontWeight="700" textAnchor="middle" dominantBaseline="middle" fontFamily="var(--font-title)">
              MODELOS GENERATIVOS
            </text>
            <text x="120" y="40" fill="#64D9EF" fontSize="10" fontWeight="600" textAnchor="middle" fontFamily="var(--font-code)">
              Aprender Distribuição p(x)
            </text>
          </g>

          {/* LINHAS RAMO ESQUERDO E DIREITO */}
          <path d="M 480 70 L 480 110 L 260 110 L 260 140" fill="none" stroke="#94A3B8" strokeWidth="2" markerEnd="url(#arrow-gray)" />
          <path d="M 620 70 L 620 110 L 840 110 L 840 140" fill="none" stroke="#1BB5D8" strokeWidth="2.5" markerEnd="url(#arrow-cyan)" />

          {/* RAMO ESQUERDO: DENSIDADE EXPLÍCITA */}
          <g transform="translate(130, 140)">
            <rect x="0" y="0" width="260" height="46" rx="6" fill="url(#grad-explicit)" />
            <text x="130" y="20" fill="#FFFFFF" fontSize="12" fontWeight="700" textAnchor="middle" dominantBaseline="middle">
              DENSIDADE EXPLÍCITA: p_model(x; θ)
            </text>
            <text x="130" y="35" fill="#CBD5E1" fontSize="9.5" textAnchor="middle" fontFamily="var(--font-code)">
              Maximizar Log-Verossimilhança E[log p(x)]
            </text>
          </g>

          {/* SUB-RAMIFICAÇÃO ESQUERDA: TRATÁVEL VS APROXIMADO */}
          <path d="M 210 186 L 210 220 L 130 220 L 130 245" fill="none" stroke="#94A3B8" strokeWidth="1.5" markerEnd="url(#arrow-gray)" />
          <path d="M 310 186 L 310 220 L 370 220 L 370 245" fill="none" stroke="#94A3B8" strokeWidth="1.5" markerEnd="url(#arrow-gray)" />

          {/* Bloco 1.1: Tratáveleis (Autoregressivos / Normalizing Flows) */}
          <g transform="translate(30, 245)">
            <rect x="0" y="0" width="200" height="135" rx="8" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
            <rect x="10" y="10" width="180" height="24" rx="4" fill="#E2E8F0" />
            <text x="100" y="24" fill="#334155" fontSize="10.5" fontWeight="700" textAnchor="middle">
              Tratáveis (Tractable)
            </text>
            <text x="15" y="52" fill="#0A345D" fontSize="10" fontWeight="600">PixelCNN / PixelRNN</text>
            <text x="15" y="68" fill="#64748B" fontSize="9">p(x) = ∏ p(xᵢ | x₁,...,xᵢ₋₁)</text>
            
            <rect x="10" y="85" width="180" height="40" rx="4" fill="#FEF2F2" stroke="#FCA5A5" strokeWidth="1" />
            <text x="15" y="100" fill="#DC2626" fontSize="9" fontWeight="700">⚠️ Gargalo de Produção:</text>
            <text x="15" y="115" fill="#991B1B" fontSize="8.5">Lentidão O(N²); geração pixel a pixel</text>
          </g>

          {/* Bloco 1.2: Aproximados (VAEs) */}
          <g transform="translate(270, 245)">
            <rect x="0" y="0" width="200" height="135" rx="8" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
            <rect x="10" y="10" width="180" height="24" rx="4" fill="#E2E8F0" />
            <text x="100" y="24" fill="#334155" fontSize="10.5" fontWeight="700" textAnchor="middle">
              Aproximados (Variational)
            </text>
            <text x="15" y="52" fill="#0A345D" fontSize="10" fontWeight="600">VAEs (Autoencoders Variacionais)</text>
            <text x="15" y="68" fill="#64748B" fontSize="9">Otimização do ELBO (KL + Recon)</text>
            
            <rect x="10" y="85" width="180" height="40" rx="4" fill="#FFFBEB" stroke="#FCD34D" strokeWidth="1" />
            <text x="15" y="100" fill="#D97706" fontSize="9" fontWeight="700">⚠️ Gargalo Visual:</text>
            <text x="15" y="115" fill="#92400E" fontSize="8.5">Imagens borradas por perda L1/L2</text>
          </g>

          {/* RAMO DIREITO: DENSIDADE IMPLÍCITA (GANS) */}
          <g transform="translate(710, 140)">
            <rect x="0" y="0" width="260" height="46" rx="6" fill="url(#grad-implicit)" filter="drop-shadow(0 3px 6px rgba(27,181,216,0.25))" />
            <text x="130" y="20" fill="#FFFFFF" fontSize="12" fontWeight="700" textAnchor="middle" dominantBaseline="middle">
              DENSIDADE IMPLÍCITA: G(z)
            </text>
            <text x="130" y="35" fill="#E0F7FA" fontSize="9.5" textAnchor="middle" fontFamily="var(--font-code)">
              Amostragem Direta sem p(x) Analítico
            </text>
          </g>

          <path d="M 840 186 L 840 235" fill="none" stroke="#1BB5D8" strokeWidth="2" markerEnd="url(#arrow-cyan)" />

          {/* Bloco Destaque GAN: Generative Adversarial Networks */}
          <g transform="translate(680, 240)">
            <rect x="0" y="0" width="320" height="150" rx="10" fill="#F0FDF4" stroke="#86EFAC" strokeWidth="2" filter="drop-shadow(0 6px 14px rgba(124,179,66,0.15))" />
            
            <rect x="15" y="12" width="290" height="32" rx="6" fill="url(#grad-gan-box)" />
            <text x="160" y="28" fill="#FFFFFF" fontSize="12" fontWeight="800" textAnchor="middle" dominantBaseline="middle">
              GANs (Generative Adversarial Networks)
            </text>
            <text x="160" y="39" fill="#DCFCE7" fontSize="8.5" fontWeight="600" textAnchor="middle">
              Paradigma de Teoria dos Jogos • Goodfellow (2014)
            </text>

            {/* Vantagens em Pílulas Visuais */}
            <g transform="translate(20, 56)">
              <rect x="0" y="0" width="135" height="40" rx="4" fill="#FFFFFF" stroke="#86EFAC" />
              <text x="67" y="16" fill="#15803D" fontSize="9" fontWeight="700" textAnchor="middle">Amostragem Paralela</text>
              <text x="67" y="30" fill="#4B5563" fontSize="8.5" textAnchor="middle">Inferência 1-Passo O(1)</text>

              <rect x="145" y="0" width="135" height="40" rx="4" fill="#FFFFFF" stroke="#86EFAC" />
              <text x="212" y="16" fill="#15803D" fontSize="9" fontWeight="700" textAnchor="middle">Nitidez Foto-realista</text>
              <text x="212" y="30" fill="#4B5563" fontSize="8.5" textAnchor="middle">Sem perda pixel borrada L2</text>
            </g>

            {/* Desafio de Treino */}
            <g transform="translate(20, 104)">
              <rect x="0" y="0" width="280" height="34" rx="4" fill="#EFF6FF" stroke="#93C5FD" />
              <text x="140" y="15" fill="#1D4ED8" fontSize="9" fontWeight="700" textAnchor="middle">⚡ O Custo da Engenharia:</text>
              <text x="140" y="27" fill="#1E40AF" fontSize="8" textAnchor="middle">Treinamento Minimax Não-Convexo & Equilíbrio de Nash Instável</text>
            </g>
          </g>
        </svg>
      </div>

      {/* Footer com parâmetros de engenharia */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '12px'
      }}>
        <div className="card-infnet" style={{ padding: '8px 14px', background: '#F8FAFC' }}>
          <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 600 }}>PARADIGMA TRADICIONAL</div>
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#0A345D' }}>Máxima Verossimilhança Explícita</div>
          <div style={{ fontSize: '10.5px', color: '#475569', marginTop: '2px' }}>Exige integrar espaço latente ou fatoração autoregressiva</div>
        </div>
        <div className="card-infnet" style={{ padding: '8px 14px', background: '#F8FAFC' }}>
          <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 600 }}>PARADIGMA DAS GANS</div>
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--infnet-cyan)' }}>Aprendizado por Amostragem Implícita</div>
          <div style={{ fontSize: '10.5px', color: '#475569', marginTop: '2px' }}>O discriminador define a função de perda adaptativa</div>
        </div>
        <div className="card-infnet" style={{ padding: '8px 14px', background: '#F8FAFC' }}>
          <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 600 }}>TRADE-OFF COMPUTACIONAL</div>
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--infnet-green-accent)' }}>Inferência Ultra Rápida vs Treino Difícil</div>
          <div style={{ fontSize: '10.5px', color: '#475569', marginTop: '2px' }}>Gera imagens 100x mais rápido que difusão ou PixelCNN</div>
        </div>
      </div>
    </div>
  );
}
