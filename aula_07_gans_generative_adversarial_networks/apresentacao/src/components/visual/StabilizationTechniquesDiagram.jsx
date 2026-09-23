import React from 'react';
import MathView from '../MathView';

export default function StabilizationTechniquesDiagram() {
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
            Engenharia de Estabilização Avançada
          </span>
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--infnet-dark-blue)' }}>
            Os 4 Pilares da Indústria para Treinamento Estável e Prevenção de Explosão de Gradientes
          </span>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <span className="badge badge-cyan" style={{ fontSize: '11px' }}>TTUR (Heusel 2017)</span>
          <span className="badge badge-purple" style={{ fontSize: '11px' }}>Spectral Norm (Miyato 2018)</span>
          <span className="badge badge-green" style={{ fontSize: '11px' }}>1-Lipschitz Contínuo</span>
        </div>
      </div>

      {/* Grid Principal com 4 Cards Técnicos Estruturados */}
      <div style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '14px',
        minHeight: 0
      }}>
        {/* PILAR 1: TTUR (Two Time-Scale Update Rule) */}
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ fontSize: '11.5px', fontWeight: 800, color: '#0A345D' }}>
                1. TTUR: Two Time-Scale Update Rule
              </span>
              <span className="badge badge-cyan" style={{ fontSize: '9px' }}>Heusel et al. (NeurIPS 2017)</span>
            </div>
            <div style={{ fontSize: '10px', color: '#475569', marginBottom: '8px' }}>
              Uso de taxas de aprendizado assimétricas separadas no tempo:
            </div>
            <div style={{ background: '#F0F9FF', border: '1px solid #BAE6FD', borderRadius: '6px', padding: '6px', textAlign: 'center' }}>
              <MathView math="\eta_D > \eta_G \quad (\text{ex: } \eta_D = 4 \times 10^{-4}, \; \eta_G = 1 \times 10^{-4})" block />
            </div>
            <div style={{ fontSize: '9.5px', color: '#334155', marginTop: '8px', lineHeight: '1.4' }}>
              <strong>Mecânica:</strong> Pela teoria de aproximação estocástica de Borkar, quando <MathView math="\eta_G / \eta_D \to 0" />, o gerador enxerga o discriminador como um sistema quase estático no ótimo local <MathView math="D^*(x)" />.
            </div>
          </div>
          <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '6px', fontSize: '8.5px', color: '#0369A1' }}>
            ✓ Evita órbitas cíclicas caóticas e garante convergência estacionária.
          </div>
        </div>

        {/* PILAR 2: One-Sided Label Smoothing */}
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ fontSize: '11.5px', fontWeight: 800, color: '#0A345D' }}>
                2. One-Sided Label Smoothing
              </span>
              <span className="badge badge-green" style={{ fontSize: '9px' }}>Salimans et al. (2016)</span>
            </div>
            <div style={{ fontSize: '10px', color: '#475569', marginBottom: '8px' }}>
              Suavização exclusiva dos rótulos reais para limitar a confiança de D:
            </div>
            <div style={{ background: '#F0FDF4', border: '1px solid #86EFAC', borderRadius: '6px', padding: '6px', textAlign: 'center' }}>
              <MathView math="y_{\text{real}} = 0.9 \quad \text{e} \quad y_{\text{fake}} = 0.0 \quad (\text{NUNCA } y_{\text{fake}} > 0!)" block />
            </div>
            <div style={{ fontSize: '9.5px', color: '#334155', marginTop: '8px', lineHeight: '1.4' }}>
              <strong>Por que unilateral?</strong> Se suavizarmos amostras falsas para 0.1, a fórmula ótima se torna <MathView math="D(x) = \frac{0.9 p_{data} + 0.1 p_g}{p_{data} + p_g}" />, forçando o discriminador a reforçar amostras ruins!
            </div>
          </div>
          <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '6px', fontSize: '8.5px', color: '#15803D' }}>
            ✓ Impede logits infinitos na sigmoid e estabiliza normas de gradiente.
          </div>
        </div>

        {/* PILAR 3: Instance Noise */}
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ fontSize: '11.5px', fontWeight: 800, color: '#0A345D' }}>
                3. Instance Noise (Injeção de Ruído)
              </span>
              <span className="badge badge-purple" style={{ fontSize: '9px' }}>Sønderby et al. (2016)</span>
            </div>
            <div style={{ fontSize: '10px', color: '#475569', marginBottom: '8px' }}>
              Engrossando artificialmente as variedades para forçar sobreposição:
            </div>
            <div style={{ background: '#FAF5FF', border: '1px solid #DDD6FE', borderRadius: '6px', padding: '6px', textAlign: 'center' }}>
              <MathView math="\tilde{x} = x + \epsilon, \quad \epsilon \sim \mathcal{N}(0, \sigma^2 I), \quad \sigma_t \to 0" block />
            </div>
            <div style={{ fontSize: '9.5px', color: '#334155', marginTop: '8px', lineHeight: '1.4' }}>
              <strong>Mecânica:</strong> Adicionar ruído com annealing decrescente cria volumes estocásticos ao redor dos suportes disjuntos de <MathView math="\mathcal{M}_{real}" /> e <MathView math="\mathcal{M}_{fake}" />, permitindo gradientes não-nulos.
            </div>
          </div>
          <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '6px', fontSize: '8.5px', color: '#6D28D9' }}>
            ✓ Evita que D separe os suportes com precisão perfeita logo no início.
          </div>
        </div>

        {/* PILAR 4: Spectral Normalization */}
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ fontSize: '11.5px', fontWeight: 800, color: '#0A345D' }}>
                4. Spectral Normalization (SN-GAN)
              </span>
              <span className="badge badge-orange" style={{ fontSize: '9px' }}>Miyato et al. (ICLR 2018)</span>
            </div>
            <div style={{ fontSize: '10px', color: '#475569', marginBottom: '8px' }}>
              Controle estrito da constante de Lipschitz dividindo pela norma espectral:
            </div>
            <div style={{ background: '#FFFBEB', border: '1px solid #FCD34D', borderRadius: '6px', padding: '6px', textAlign: 'center' }}>
              <MathView math="W_{\text{SN}} = \frac{W}{\sigma(W)}, \quad \text{onde } \sigma(W) = \max_{h \neq 0} \frac{\|Wh\|_2}{\|h\|_2}" block />
            </div>
            <div style={{ fontSize: '9.5px', color: '#334155', marginTop: '8px', lineHeight: '1.4' }}>
              <strong>Power Iteration:</strong> Calcula <MathView math="\sigma(W)" /> com 1 única iteração de autovetor por batch! Garante que o discriminador seja estritamente 1-Lipschitz contínuo sem destruir a capacidade dos pesos.
            </div>
          </div>
          <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '6px', fontSize: '8.5px', color: '#B45309' }}>
            ✓ Estado da arte em estabilização; padrão ouro em BigGAN e SAGAN.
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
          <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 600 }}>CUSTO COMPUTACIONAL DO SN</div>
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>Quase Zero Overhead</div>
          <div style={{ fontSize: '10.5px', color: '#475569', marginTop: '2px' }}>Power Iteration adiciona menos de 2% no tempo de treino por batch</div>
        </div>
        <div className="card-infnet" style={{ padding: '8px 14px', background: '#F8FAFC' }}>
          <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 600 }}>CONDIÇÃO 1-LIPSCHITZ</div>
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--infnet-purple)' }}>Limite Superior nas Derivadas</div>
          <div style={{ fontSize: '10.5px', color: '#475569', marginTop: '2px' }}>Impede que gradientes ||∇_x D|| explodam em descontinuidades locais</div>
        </div>
        <div className="card-infnet" style={{ padding: '8px 14px', background: '#F8FAFC' }}>
          <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 600 }}>APLICAÇÃO NO PYTORCH</div>
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--infnet-green-accent)' }}>Suporte Nativo Integrado</div>
          <div style={{ fontSize: '10.5px', color: '#475569', marginTop: '2px' }}>torch.nn.utils.parametrizations.spectral_norm(conv_layer)</div>
        </div>
      </div>
    </div>
  );
}
