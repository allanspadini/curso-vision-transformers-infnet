import React from 'react';
import MathView from '../MathView';

export default function WassersteinDistanceWGANShiftDiagram() {
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
            Arjovsky et al. (ICML 2017) & Gulrajani et al. (NeurIPS 2017)
          </span>
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--infnet-dark-blue)' }}>
            O Salto da Wasserstein GAN: Da Divergência JS para a Distância da TerraMovedora (Earth Mover)
          </span>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <span className="badge badge-purple" style={{ fontSize: '11px' }}>Distância Wasserstein-1</span>
          <span className="badge badge-green" style={{ fontSize: '11px' }}>WGAN-GP Gradient Penalty</span>
        </div>
      </div>

      {/* Grid Principal Comparativo */}
      <div style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '1.05fr 1.25fr',
        gap: '14px',
        minHeight: 0
      }}>
        {/* Painel Esquerdo: O Exemplo Canônico das Distribuições Paralelas */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid var(--border-light)',
          borderRadius: '12px',
          padding: '14px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#0A345D', marginBottom: '6px' }}>
              O EXEMPLO CANÔNICO: DISTRIBUIÇÕES PARALELAS EM ℝ²
            </div>
            <div style={{ fontSize: '9.5px', color: '#475569', marginBottom: '10px' }}>
              Considere <MathView math="P_0" /> sobre a reta <MathView math="x = 0" /> e <MathView math="P_\theta" /> deslocada em <MathView math="x = \theta" />:
            </div>

            {/* SVG Ilustrando as 2 retas e a distância theta */}
            <svg viewBox="0 0 400 130" style={{ width: '100%', height: '110px' }}>
              <line x1="40" y1="100" x2="360" y2="100" stroke="#CBD5E1" strokeWidth="1.5" />
              <line x1="120" y1="110" x2="120" y2="20" stroke="#CBD5E1" strokeWidth="1.5" />

              {/* Reta P_0 em x = 0 (Verde) */}
              <line x1="120" y1="95" x2="120" y2="30" stroke="#16A34A" strokeWidth="5" strokeLinecap="round" />
              <text x="120" y="20" fill="#15803D" fontSize="9" fontWeight="800" textAnchor="middle">P_0 (Real)</text>

              {/* Reta P_theta em x = theta (Roxo) */}
              <line x1="280" y1="95" x2="280" y2="30" stroke="#9333EA" strokeWidth="5" strokeLinecap="round" />
              <text x="280" y="20" fill="#7E22CE" fontSize="9" fontWeight="800" textAnchor="middle">P_θ (Gerado)</text>

              {/* Seta de Distância theta */}
              <line x1="125" y1="65" x2="275" y2="65" stroke="#0284C7" strokeWidth="2" strokeDasharray="3 3" />
              <polygon points="275,65 265,60 265,70" fill="#0284C7" />
              <polygon points="125,65 135,60 135,70" fill="#0284C7" />
              <rect x="180" y="52" width="40" height="24" rx="4" fill="#E0F2FE" stroke="#38BDF8" />
              <text x="200" y="68" fill="#0369A1" fontSize="10" fontWeight="800" textAnchor="middle">|θ|</text>
            </svg>

            {/* Comparativo de Resposta Matemática */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '4px' }}>
              <div style={{ background: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: '6px', padding: '6px 10px', fontSize: '9px' }}>
                <strong style={{ color: '#DC2626' }}>Divergência Jensen-Shannon (GAN Clássica):</strong><br />
                <MathView math="D_{\text{JS}}(P_0 \parallel P_\theta) = \log 2 \quad (\forall \theta \neq 0) \implies \frac{\partial D_{\text{JS}}}{\partial \theta} = 0" /><br />
                <span style={{ color: '#991B1B' }}>Degrau descontínuo! Gradiente é zero em toda parte.</span>
              </div>

              <div style={{ background: '#F0FDF4', border: '1px solid #86EFAC', borderRadius: '6px', padding: '6px 10px', fontSize: '9px' }}>
                <strong style={{ color: '#16A34A' }}>Distância Wasserstein-1 (WGAN):</strong><br />
                <MathView math="W(P_0, P_\theta) = |\theta| \implies \frac{\partial W}{\partial \theta} = \text{sign}(\theta) \neq 0" /><br />
                <span style={{ color: '#166534' }}>Totalmente contínua e suave! O gradiente é constante e orienta G.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Painel Direito: Formulação Dual e WGAN-GP */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid var(--border-light)',
          borderRadius: '12px',
          padding: '14px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#0A345D', marginBottom: '6px' }}>
              DUALIDADE DE KANTOROVICH-RUBINSTEIN & GRADIENT PENALTY (WGAN-GP)
            </div>

            {/* Formulação WGAN */}
            <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '8px 12px', marginBottom: '10px' }}>
              <div style={{ fontSize: '10px', fontWeight: 700, color: '#0A345D', marginBottom: '4px' }}>
                1. O Jogo Minimax com Crítico 1-Lipschitz contínuo:
              </div>
              <div style={{ fontSize: '11.5px', textAlign: 'center' }}>
                <MathView math="\min_G \max_{D \in \mathcal{D}_L} \mathbb{E}_{x \sim p_r}[D(x)] - \mathbb{E}_{\tilde{x} \sim p_g}[D(\tilde{x})]" block />
              </div>
              <div style={{ fontSize: '8.5px', color: '#64748B', marginTop: '4px', textAlign: 'center' }}>
                (D não é mais um classificador de probabilidade Sigmoid; é um crítico escalar irrestrito)
              </div>
            </div>

            {/* O Salto da Penalidade de Gradiente (WGAN-GP) */}
            <div style={{ background: '#F5F3FF', border: '1px solid #DDD6FE', borderRadius: '8px', padding: '8px 12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <span style={{ fontSize: '10px', fontWeight: 700, color: '#6D28D9' }}>
                  2. A Solução WGAN-GP (Gulrajani et al., 2017):
                </span>
                <span className="badge badge-purple" style={{ fontSize: '8px' }}>λ = 10</span>
              </div>
              <div style={{ fontSize: '9px', color: '#475569', marginBottom: '4px' }}>
                Forçar a norma do gradiente de D a ser exatamente 1 em pontos interpolados <MathView math="\hat{x} = \epsilon x + (1 - \epsilon)\tilde{x}" />:
              </div>
              <div style={{ fontSize: '12px', textAlign: 'center', margin: '4px 0' }}>
                <MathView math="\mathcal{L}_{\text{GP}} = \lambda \cdot \mathbb{E}_{\hat{x} \sim p_{\hat{x}}} \left[ \left( \|\nabla_{\hat{x}} D(\hat{x})\|_2 - 1 \right)^2 \right]" block />
              </div>
            </div>
          </div>

          {/* Destaque Prático */}
          <div style={{
            background: '#F0F9FF',
            border: '1px solid #BAE6FD',
            borderRadius: '6px',
            padding: '8px 12px',
            fontSize: '9px',
            color: '#0369A1'
          }}>
            <strong>💡 Por que WGAN-GP revolucionou a área?</strong> A função de perda da WGAN se correlaciona diretamente com a qualidade visual das imagens sintetizadas! Pela primeira vez na história das GANs, os engenheiros puderam acompanhar uma curva de perda monotonicamente decrescente para saber quando o modelo convergiu.
          </div>
        </div>
      </div>

      {/* Footer com destaques */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '12px'
      }}>
        <div className="card-infnet" style={{ padding: '8px 14px', background: '#F8FAFC' }}>
          <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 600 }}>EARTH MOVER'S DISTANCE</div>
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>Trabalho Mínimo de Transporte</div>
          <div style={{ fontSize: '10.5px', color: '#475569', marginTop: '2px' }}>Mede a quantidade de massa multiplicada pela distância percorrida</div>
        </div>
        <div className="card-infnet" style={{ padding: '8px 14px', background: '#F8FAFC' }}>
          <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 600 }}>ADEUS AO WEIGHT CLIPPING</div>
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--infnet-purple)' }}>Penalidade Suave de Gradiente</div>
          <div style={{ fontSize: '10.5px', color: '#475569', marginTop: '2px' }}>Clipping ingênuo [-c, c] destruía a capacidade e causava gradientes binários</div>
        </div>
        <div className="card-infnet" style={{ padding: '8px 14px', background: '#F8FAFC' }}>
          <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 600 }}>SEM BATCH NORMALIZATION EM D</div>
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--infnet-green-accent)' }}>Layer Normalization Obrigatória</div>
          <div style={{ fontSize: '10.5px', color: '#475569', marginTop: '2px' }}>BN introduz correlação intra-batch que invalida a penalidade de gradiente por amostra</div>
        </div>
      </div>
    </div>
  );
}
