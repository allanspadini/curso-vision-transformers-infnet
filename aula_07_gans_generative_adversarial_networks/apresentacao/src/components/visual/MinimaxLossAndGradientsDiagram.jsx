import React from 'react';
import MathView from '../MathView';

export default function MinimaxLossAndGradientsDiagram() {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {/* Badges de Formalismo */}
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
            Formalismo Matemático Rigoroso
          </span>
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--infnet-dark-blue)' }}>
            Função de Valor Minimax, Discriminador Ótimo e a Heurística Não-Saturante de Goodfellow
          </span>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <span className="badge badge-cyan" style={{ fontSize: '11px' }}>JSD(p_data ∥ p_g)</span>
          <span className="badge badge-orange" style={{ fontSize: '11px' }}>Perda Não-Saturante: -log D</span>
        </div>
      </div>

      {/* Grid Principal com 2 Colunas: Fórmulas Matemáticas & Curvas de Gradiente */}
      <div style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '1.15fr 1fr',
        gap: '14px',
        minHeight: 0
      }}>
        {/* Painel Esquerdo: Teoria e Derivação Analítica */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid var(--border-light)',
          borderRadius: '12px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          overflowY: 'auto',
          boxShadow: 'var(--shadow-sm)'
        }}>
          {/* Card 1: Minimax */}
          <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '10px 14px' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#0A345D', marginBottom: '6px' }}>
              1. A FUNÇÃO DE VALOR DO JOGO MINIMAX (Goodfellow, 2014)
            </div>
            <div style={{ fontSize: '13px', textAlign: 'center', margin: '4px 0' }}>
              <MathView math="\min_G \max_D V(D, G) = \mathbb{E}_{x \sim p_{\text{data}}}[\log D(x)] + \mathbb{E}_{z \sim p_z}[\log(1 - D(G(z)))]" block />
            </div>
          </div>

          {/* Card 2: Discriminador Ótimo */}
          <div style={{ background: '#F0F9FF', border: '1px solid #BAE6FD', borderRadius: '8px', padding: '10px 14px' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#0284C7', marginBottom: '6px' }}>
              2. DERIVAÇÃO DO DISCRIMINADOR ÓTIMO D*(x) PARA G FIXO
            </div>
            <div style={{ fontSize: '11.5px', color: '#334155', lineHeight: '1.4' }}>
              Maximizando integrando <MathView math="p_{\text{data}}(x) \log D(x) + p_g(x) \log(1 - D(x))" />:
            </div>
            <div style={{ fontSize: '14px', textAlign: 'center', margin: '4px 0' }}>
              <MathView math="D^*(x) = \frac{p_{\text{data}}(x)}{p_{\text{data}}(x) + p_g(x)}" block />
            </div>
          </div>

          {/* Card 3: Conexão com Jensen-Shannon */}
          <div style={{ background: '#F0FDF4', border: '1px solid #86EFAC', borderRadius: '8px', padding: '10px 14px' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#15803D', marginBottom: '6px' }}>
              3. VALOR NO EQUILÍBRIO & DIVERGÊNCIA JENSEN-SHANNON
            </div>
            <div style={{ fontSize: '13px', textAlign: 'center', margin: '4px 0' }}>
              <MathView math="V(D^*, G) = -\log(4) + 2 \cdot D_{\text{JS}}(p_{\text{data}} \parallel p_g)" block />
            </div>
            <div style={{ fontSize: '10.5px', color: '#166534', marginTop: '4px' }}>
              O mínimo global ocorre estritamente quando <MathView math="p_g = p_{\text{data}}" />, resultando em <MathView math="D_{\text{JS}} = 0" />, <MathView math="V(D^*, G^*) = -\log 4 \approx -1.386" /> e <MathView math="D^*(x) = \frac{1}{2}" />.
            </div>
          </div>
        </div>

        {/* Painel Direito: O Dilema da Saturação do Gradiente */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid var(--border-light)',
          borderRadius: '12px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '11.5px', fontWeight: 800, color: '#0A345D' }}>
              DINÂMICA DE GRADIENTE DE G: SATURANTE vs NÃO-SATURANTE
            </span>
            <span className="badge badge-orange" style={{ fontSize: '9.5px' }}>Fix Prático Obrigatório</span>
          </div>

          {/* SVG com as Curvas de Perda */}
          <svg viewBox="0 0 460 220" style={{ width: '100%', height: '100%', maxHeight: '220px' }}>
            {/* Eixos */}
            <line x1="50" y1="180" x2="430" y2="180" stroke="#94A3B8" strokeWidth="1.5" />
            <line x1="50" y1="180" x2="50" y2="20" stroke="#94A3B8" strokeWidth="1.5" />
            <text x="430" y="195" fill="#475569" fontSize="9" textAnchor="end">Score D(G(z))</text>
            <text x="45" y="15" fill="#475569" fontSize="9" textAnchor="end">Perda L_G</text>

            {/* Marcações no eixo X */}
            <line x1="50" y1="180" x2="50" y2="185" stroke="#94A3B8" />
            <text x="50" y="195" fill="#64748B" fontSize="8" textAnchor="middle">0.0</text>
            <line x1="235" y1="180" x2="235" y2="185" stroke="#94A3B8" />
            <text x="235" y="195" fill="#64748B" fontSize="8" textAnchor="middle">0.5</text>
            <line x1="410" y1="180" x2="410" y2="185" stroke="#94A3B8" />
            <text x="410" y="195" fill="#64748B" fontSize="8" textAnchor="middle">1.0</text>

            {/* Linha Tracejada no início do treino (D(G(z)) ~ 0) */}
            <rect x="50" y="20" width="80" height="160" fill="rgba(239, 68, 68, 0.08)" />
            <text x="90" y="32" fill="#DC2626" fontSize="8" fontWeight="700" textAnchor="middle">Início do Treino</text>
            <text x="90" y="44" fill="#B91C1C" fontSize="7" textAnchor="middle">(D rejeita tudo: D≈0)</text>

            {/* Curva 1: Perda Minimax Original log(1 - D) [Saturante] */}
            {/* L = log(1 - D); para D de 0 a 0.95 -> de 0 a -3.0 */}
            <path
              d="M 50 178 Q 120 175 220 160 T 400 30"
              fill="none"
              stroke="#DC2626"
              strokeWidth="2.5"
              strokeDasharray="4 3"
            />

            {/* Curva 2: Perda Não-Saturante -log(D) */}
            {/* L = -log(D); para D de 0.01 a 1.0 -> de alto para 0 */}
            <path
              d="M 55 25 Q 70 90 140 135 T 410 178"
              fill="none"
              stroke="#2563EB"
              strokeWidth="3"
            />

            {/* Legenda das Curvas */}
            <g transform="translate(190, 45)">
              <rect x="0" y="0" width="220" height="60" rx="6" fill="#F8FAFC" stroke="#CBD5E1" />
              <line x1="12" y1="18" x2="35" y2="18" stroke="#DC2626" strokeWidth="2.5" strokeDasharray="4 3" />
              <text x="42" y="21" fill="#DC2626" fontSize="8.5" fontWeight="700">log(1 - D): Saturante</text>
              <text x="42" y="31" fill="#7F1D1D" fontSize="7.5">Gradiente nulo quando D≈0!</text>

              <line x1="12" y1="42" x2="35" y2="42" stroke="#2563EB" strokeWidth="3" />
              <text x="42" y="45" fill="#1D4ED8" fontSize="8.5" fontWeight="700">-log D: Não-Saturante (Padrão)</text>
              <text x="42" y="55" fill="#1E3A8A" fontSize="7.5">Gradiente fortíssimo no início</text>
            </g>
          </svg>

          {/* Comparativo de Gradientes em Tabela Resumida */}
          <div style={{
            width: '100%',
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: '6px',
            padding: '8px 12px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '8px',
            fontSize: '9px'
          }}>
            <div style={{ color: '#991B1B' }}>
              <span style={{ fontWeight: 700 }}>⚠️ Por que Minimax Falha no Início?</span><br />
              Quando <MathView math="D(G(z)) \approx 0" />, a derivada de <MathView math="\log(1 - D)" /> tem inclinação plana, gerando desvanecimento total de gradiente em <MathView math="\theta_g" />.
            </div>
            <div style={{ color: '#1E40AF' }}>
              <span style={{ fontWeight: 700 }}>💡 A Solução de Engenharia:</span><br />
              Minimizar <MathView math="-\log D(G(z))" /> inverte a concavidade: mesmo ponto fixo de equilíbrio, mas fornece sinal de erro massivo para empurrar <MathView math="G" /> rapidamente!
            </div>
          </div>
        </div>
      </div>

      {/* Footer com destaques teóricos */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '12px'
      }}>
        <div className="card-infnet" style={{ padding: '8px 14px', background: '#F8FAFC' }}>
          <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 600 }}>DIVERGÊNCIA JENSEN-SHANNON</div>
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>Simétrica e Limitada em [0, log 2]</div>
          <div style={{ fontSize: '10.5px', color: '#475569', marginTop: '2px' }}>D_JS(P ∥ Q) = 1/2 KL(P ∥ M) + 1/2 KL(Q ∥ M) onde M = (P+Q)/2</div>
        </div>
        <div className="card-infnet" style={{ padding: '8px 14px', background: '#F8FAFC' }}>
          <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 600 }}>DISCRIMINADOR ÓTIMO</div>
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--infnet-cyan)' }}>Razão Bayesiana de Densidades</div>
          <div style={{ fontSize: '10.5px', color: '#475569', marginTop: '2px' }}>D*(x) estima a razão de densidade p_data(x) / (p_data(x) + p_g(x))</div>
        </div>
        <div className="card-infnet" style={{ padding: '8px 14px', background: '#F8FAFC' }}>
          <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 600 }}>PADRÃO DA INDÚSTRIA</div>
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--infnet-orange)' }}>Perda Heurística Não-Saturante</div>
          <div style={{ fontSize: '10.5px', color: '#475569', marginTop: '2px' }}>Treina-se G maximizando log D(G(z)) via BCE com rótulos 1.0 reais</div>
        </div>
      </div>
    </div>
  );
}
