import React from 'react';

export default function CLIPDownstreamAdaptationDiagram() {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {/* Grid 3 Estratégias Downstream */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', flex: 1 }}>
        
        {/* Estratégia 1: Linear Probe */}
        <div style={{
          background: '#F0F9FF',
          border: '1.5px solid #BAE6FD',
          borderRadius: '12px',
          padding: '18px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ background: '#E0F2FE', color: '#0369A1', padding: '3px 8px', borderRadius: '4px', fontSize: '10.5px', fontWeight: 800 }}>
                Estratégia 1
              </span>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#0284C7' }}>
                Zero Esquecimento
              </span>
            </div>

            <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--infnet-dark-blue)', marginBottom: '6px' }}>
              Linear Probe
            </h3>
            <p style={{ fontSize: '11.5px', color: 'var(--text-main)', lineHeight: '1.45', marginBottom: '12px' }}>
              Congela 100% dos encoders do CLIP e treina exclusivamente uma camada linear (regressão logística / Ridge) sobre os embeddings <code style={{ fontFamily: 'Fira Code' }}>Î</code>.
            </p>

            <div style={{ background: '#FFFFFF', border: '1px solid #BAE6FD', borderRadius: '6px', padding: '10px' }}>
              <div style={{ fontSize: '9.5px', fontWeight: 800, color: '#0369A1', marginBottom: '4px' }}>ESTADO DOS PESOS:</div>
              <div style={{ fontSize: '10.5px', fontFamily: 'Fira Code', color: '#0284C7' }}>
                Vision Backbone: <strong>CONGELADO ❄️</strong>
                <br />
                Head: <strong>TREINÁVEL 🔥 (W_new)</strong>
              </div>
            </div>

            <div style={{ marginTop: '12px', background: '#E0F2FE', padding: '10px', borderRadius: '6px' }}>
              <span style={{ fontSize: '10px', fontWeight: 800, color: '#0369A1', display: 'block', marginBottom: '2px' }}>
                ✓ Vantagem de Produção:
              </span>
              <span style={{ fontSize: '10.5px', color: '#075985' }}>
                Treina em segundos na CPU via Scikit-Learn ou PyTorch; preserva 100% da robustez OOD original.
              </span>
            </div>
          </div>

          <div style={{ borderTop: '1px solid #BAE6FD', paddingTop: '10px' }}>
            <span style={{ fontSize: '11px', color: '#0369A1', fontWeight: 600 }}>Custo Treino: Muito Baixo</span>
          </div>
        </div>

        {/* Estratégia 2: Full Fine-Tuning */}
        <div style={{
          background: '#FFF5F5',
          border: '1.5px solid #FED7D7',
          borderRadius: '12px',
          padding: '18px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ background: '#FEE2E2', color: '#991B1B', padding: '3px 8px', borderRadius: '4px', fontSize: '10.5px', fontWeight: 800 }}>
                Estratégia 2
              </span>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#DC2626' }}>
                Alto Risco OOD
              </span>
            </div>

            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#991B1B', marginBottom: '6px' }}>
              Full Fine-Tuning
            </h3>
            <p style={{ fontSize: '11.5px', color: 'var(--text-main)', lineHeight: '1.45', marginBottom: '12px' }}>
              Descongela todos os parâmetros do Vision Encoder com taxa de aprendizado ultra-baixa (ex: 1e-5) para ajustar os pesos ao dataset específico.
            </p>

            <div style={{ background: '#FFFFFF', border: '1px solid #FECACA', borderRadius: '6px', padding: '10px' }}>
              <div style={{ fontSize: '9.5px', fontWeight: 800, color: '#991B1B', marginBottom: '4px' }}>ESTADO DOS PESOS:</div>
              <div style={{ fontSize: '10.5px', fontFamily: 'Fira Code', color: '#B91C1C' }}>
                Vision Backbone: <strong>TREINÁVEL 🔥</strong>
                <br />
                Head: <strong>TREINÁVEL 🔥</strong>
              </div>
            </div>

            <div style={{ marginTop: '12px', background: '#FEE2E2', padding: '10px', borderRadius: '6px' }}>
              <span style={{ fontSize: '10px', fontWeight: 800, color: '#991B1B', display: 'block', marginBottom: '2px' }}>
                ⚠️ O Perigo do Catastrophic Forgetting:
              </span>
              <span style={{ fontSize: '10.5px', color: '#7F1D1D' }}>
                Ganha 1% no dataset alvo, mas destrói a robustez fora do domínio (OOD) e aniquila a capacidade zero-shot.
              </span>
            </div>
          </div>

          <div style={{ borderTop: '1px solid #FED7D7', paddingTop: '10px' }}>
            <span style={{ fontSize: '11px', color: '#991B1B', fontWeight: 600 }}>Custo Treino: Muito Alto</span>
          </div>
        </div>

        {/* Estratégia 3: Prompt Tuning / CoOp */}
        <div style={{
          background: '#FAF5FF',
          border: '1.5px solid #E9D5FF',
          borderRadius: '12px',
          padding: '18px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ background: '#F3E8FF', color: '#7E22CE', padding: '3px 8px', borderRadius: '4px', fontSize: '10.5px', fontWeight: 800 }}>
                Estratégia 3 (Moderna)
              </span>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#9333EA' }}>
                CoOp / PEFT
              </span>
            </div>

            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#7E22CE', marginBottom: '6px' }}>
              Context Optimization (CoOp)
            </h3>
            <p style={{ fontSize: '11.5px', color: 'var(--text-main)', lineHeight: '1.45', marginBottom: '12px' }}>
              Zhou et al. (2022): Substitui palavras manuais do prompt por vetores contínuos aprendíveis <code style={{ fontFamily: 'Fira Code' }}>[V_1] [V_2] ... [V_M] [CLASS]</code> mantendo os dois backbones 100% congelados!
            </p>

            <div style={{ background: '#FFFFFF', border: '1px solid #E9D5FF', borderRadius: '6px', padding: '10px' }}>
              <div style={{ fontSize: '9.5px', fontWeight: 800, color: '#7E22CE', marginBottom: '4px' }}>ESTADO DOS PESOS:</div>
              <div style={{ fontSize: '10.5px', fontFamily: 'Fira Code', color: '#6B21A8' }}>
                Backbones: <strong>CONGELADOS ❄️ (Zero GPU)</strong>
                <br />
                Prompt Tokens: <strong>APRENDÍVEIS ✨</strong>
              </div>
            </div>

            <div style={{ marginTop: '12px', background: '#F3E8FF', padding: '10px', borderRadius: '6px' }}>
              <span style={{ fontSize: '10px', fontWeight: 800, color: '#7E22CE', display: 'block', marginBottom: '2px' }}>
                🚀 Equilíbrio Perfeito:
              </span>
              <span style={{ fontSize: '10.5px', color: '#581C87' }}>
                Aprende com 1 a 16 exemplos (few-shot) superando engenharia manual e preservando a generalização multimodal.
              </span>
            </div>
          </div>

          <div style={{ borderTop: '1px solid #E9D5FF', paddingTop: '10px' }}>
            <span style={{ fontSize: '11px', color: '#7E22CE', fontWeight: 600 }}>Custo Treino: Mínimo (PEFT)</span>
          </div>
        </div>

      </div>

      {/* Destaque Metodológico */}
      <div style={{
        background: '#EDF5FA',
        border: '1px solid #D0E3F0',
        borderRadius: '8px',
        padding: '10px 18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <span style={{ fontSize: '11.5px', color: 'var(--infnet-dark-blue)', fontWeight: 600 }}>
          💡 <strong>Recomendação Prática:</strong> Para aplicações empresariais com datasets especializados (ex: imagens de satélite, patologia médica), inicie SEMPRE com <strong>Linear Probe</strong> ou <strong>CoOp</strong> antes de arriscar Fine-Tuning completo.
        </span>
      </div>
    </div>
  );
}
