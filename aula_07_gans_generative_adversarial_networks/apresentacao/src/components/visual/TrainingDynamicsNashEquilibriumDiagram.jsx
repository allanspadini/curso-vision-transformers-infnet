import React from 'react';
import MathView from '../MathView';

export default function TrainingDynamicsNashEquilibriumDiagram() {
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
            Dinâmica de Otimização Minimax
          </span>
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--infnet-dark-blue)' }}>
            Por que o Gradiente Descendente Padrão Falha na Busca pelo Equilíbrio de Nash?
          </span>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <span className="badge badge-purple" style={{ fontSize: '11px' }}>Jogo Não-Cooperativo</span>
          <span className="badge badge-orange" style={{ fontSize: '11px' }}>Órbitas Cíclicas & Caos</span>
          <span className="badge badge-green" style={{ fontSize: '11px' }}>Ponto de Sela Instável</span>
        </div>
      </div>

      {/* Grid Principal Comparativo */}
      <div style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '1fr 1.2fr',
        gap: '14px',
        minHeight: 0
      }}>
        {/* Lado Esquerdo: Otimização Clássica vs Jogo Minimax */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid var(--border-light)',
          borderRadius: '12px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ fontSize: '11.5px', fontWeight: 800, color: '#0A345D' }}>
            DUAS NATUREZAS MATEMÁTICAS COMPLETAMENTE DISTINTAS
          </div>

          {/* Card 1: Otimização Padrão */}
          <div style={{ background: '#F0FDF4', border: '1px solid #86EFAC', borderRadius: '8px', padding: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#15803D' }}>
                1. OTIMIZAÇÃO SUPERVISIONADA (CNNs / ViTs)
              </span>
              <span className="badge badge-green" style={{ fontSize: '8.5px' }}>Convergência Confiável</span>
            </div>
            <div style={{ fontSize: '10px', color: '#166534', lineHeight: '1.4' }}>
              Minimização de uma superfície estática de energia escalar <MathView math="\min_\theta \mathcal{L}(\theta)" />. O gradiente negativo <MathView math="-\nabla_\theta \mathcal{L}" /> sempre aponta para o vale local. Atrator estável tipo poço de potencial.
            </div>
          </div>

          {/* Card 2: Jogo Minimax */}
          <div style={{ background: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: '8px', padding: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#991B1B' }}>
                2. JOGO ADVERSARIAL MINIMAX (GANs)
              </span>
              <span className="badge badge-orange" style={{ fontSize: '8.5px' }}>Sistema Dinâmico Acoplado</span>
            </div>
            <div style={{ fontSize: '10px', color: '#7F1D1D', lineHeight: '1.4' }}>
              Não existe função de perda única! A paisagem de <MathView math="G" /> se deforma a cada passo de <MathView math="D" />, e vice-versa:
              <div style={{ margin: '6px 0', textAlign: 'center', fontWeight: 700 }}>
                <MathView math="\theta_G^{(t+1)} = \theta_G^{(t)} - \eta_G \nabla_{\theta_G} \mathcal{L}_G(\theta_G, \theta_D)" />
              </div>
              <div style={{ margin: '4px 0', textAlign: 'center', fontWeight: 700 }}>
                <MathView math="\theta_D^{(t+1)} = \theta_D^{(t)} - \eta_D \nabla_{\theta_D} \mathcal{L}_D(\theta_G, \theta_D)" />
              </div>
            </div>
          </div>

          {/* Card 3: Exemplo Canônico do Toy Problem f(x, y) = xy */}
          <div style={{ background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '10px' }}>
            <div style={{ fontSize: '10px', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
              O Exemplo Canônico: <MathView math="\min_x \max_y (x \cdot y)" />
            </div>
            <div style={{ fontSize: '9.5px', color: '#475569', lineHeight: '1.4' }}>
              Equilíbrio de Nash no ponto de sela <MathView math="(x^*, y^*) = (0, 0)" />. Mas o fluxo de gradiente é <MathView math="\dot{x} = -y" /> e <MathView math="\dot{y} = x" />. As trajetórias são círculos concêntricos fechados <MathView math="x^2 + y^2 = r^2" />! A otimização discreta espirala para fora e diverge!
            </div>
          </div>
        </div>

        {/* Lado Direito: Visualização Gráfica do Campo Vetorial de Órbitas */}
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
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#0A345D' }}>
              CAMPO VETORIAL DO ESPAÇO DE PARÂMETROS (θ_G vs θ_D)
            </span>
            <span className="badge badge-purple" style={{ fontSize: '9px' }}>Órbitas Rotacionais</span>
          </div>

          {/* SVG com o Campo Vetorial e Órbitas Cíclicas */}
          <svg viewBox="0 0 460 250" style={{ width: '100%', height: '100%', maxHeight: '250px' }}>
            {/* Eixos Cartesianos cruzados no centro (230, 125) */}
            <line x1="30" y1="125" x2="430" y2="125" stroke="#94A3B8" strokeWidth="1.5" />
            <line x1="230" y1="20" x2="230" y2="230" stroke="#94A3B8" strokeWidth="1.5" />
            <text x="425" y="140" fill="#475569" fontSize="9" textAnchor="end">Parâmetro de D (θ_D)</text>
            <text x="240" y="25" fill="#475569" fontSize="9">Parâmetro de G (θ_G)</text>

            {/* Ponto de Equilíbrio de Nash no centro (0, 0) */}
            <circle cx="230" cy="125" r="5" fill="#16A34A" />
            <text x="245" y="120" fill="#15803D" fontSize="9" fontWeight="800">Equilíbrio (Nash)</text>

            {/* Órbitas Cíclicas Elípticas ao Redor do Centro */}
            <ellipse cx="230" cy="125" rx="70" ry="50" fill="none" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.7" />
            <ellipse cx="230" cy="125" rx="130" ry="85" fill="none" stroke="#818CF8" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />

            {/* Trajetória Espiral Divergente do Gradiente Descendente Discreto */}
            <path
              d="M 270 125 
                 C 270 155, 250 175, 230 175 
                 C 195 175, 175 150, 175 125 
                 C 175 90, 205 65, 230 65 
                 C 275 65, 310 95, 310 125 
                 C 310 175, 275 210, 230 210 
                 C 165 210, 130 165, 130 125 
                 C 130 65, 185 20, 230 20"
              fill="none"
              stroke="#EF4444"
              strokeWidth="2.5"
            />

            {/* Setinhas no fluxo espiral */}
            <polygon points="230,175 220,170 220,180" fill="#EF4444" />
            <polygon points="310,125 305,135 315,135" fill="#EF4444" />
            <polygon points="230,20 220,15 220,25" fill="#EF4444" />

            {/* Ponto Atual Orbitando */}
            <circle cx="130" cy="125" r="6" fill="#DC2626" stroke="#FFFFFF" strokeWidth="2" />
            <rect x="50" y="95" width="130" height="22" rx="4" fill="#1E293B" opacity="0.85" />
            <text x="115" y="110" fill="#FFFFFF" fontSize="8" fontWeight="700" textAnchor="middle">
              Espiral Divergente (Euler)
            </text>
          </svg>

          {/* Diagnóstico da Órbita */}
          <div style={{
            background: '#FFFBEB',
            border: '1px solid #FCD34D',
            borderRadius: '6px',
            padding: '8px 12px',
            fontSize: '9.5px',
            color: '#78350F'
          }}>
            <strong>⚡ O Perigo da Perseguição Cíclica:</strong> Sem amortecimento especial de momento ou taxas assimétricas (TTUR), os passos discretos de gradiente acumulam erro ortogonal, fazendo os pesos orbitarem em espiral para fora — gerando instabilidade catastrófica e explosão de perdas.
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
          <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 600 }}>EQUILÍBRIO DE NASH</div>
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>Ponto de Sela Estacionário</div>
          <div style={{ fontSize: '10.5px', color: '#475569', marginTop: '2px' }}>V(D*, G*) tal que nenhum jogador pode reduzir sua perda mudando isoladamente</div>
        </div>
        <div className="card-infnet" style={{ padding: '8px 14px', background: '#F8FAFC' }}>
          <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 600 }}>CICLOS LIMITES</div>
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--infnet-purple)' }}>Perseguição Gato e Rato</div>
          <div style={{ fontSize: '10.5px', color: '#475569', marginTop: '2px' }}>D aprende a detectar a falsificação atual; G muda de estratégia; D reaprende</div>
        </div>
        <div className="card-infnet" style={{ padding: '8px 14px', background: '#F8FAFC' }}>
          <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 600 }}>SOLUÇÃO MATEMÁTICA</div>
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--infnet-green-accent)' }}>Taxas Assimétricas (TTUR)</div>
          <div style={{ fontSize: '10.5px', color: '#475569', marginTop: '2px' }}>Fazer D convergir mais rápido que G quebra a simetria de órbitas caóticas</div>
        </div>
      </div>
    </div>
  );
}
