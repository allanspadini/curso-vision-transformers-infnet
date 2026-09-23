import React from 'react';
import MathView from '../MathView';

export default function EvaluationMetricsISFIDDiagram() {
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
            Diagnóstico Quantitativo Rigoroso
          </span>
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--infnet-dark-blue)' }}>
            Métricas de Avaliação de GANs: Inception Score (IS) vs Fréchet Inception Distance (FID)
          </span>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <span className="badge badge-purple" style={{ fontSize: '11px' }}>Inception-v3 pool3 (d=2048)</span>
          <span className="badge badge-green" style={{ fontSize: '11px' }}>Wasserstein-2 Gaussiano</span>
        </div>
      </div>

      {/* Grid Principal Comparativo de Fórmulas e Arquitetura */}
      <div style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '1.05fr 1.25fr',
        gap: '14px',
        minHeight: 0
      }}>
        {/* Lado Esquerdo: Inception Score (IS) */}
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
                1. INCEPTION SCORE (IS)
              </span>
              <span className="badge badge-cyan" style={{ fontSize: '9px' }}>Salimans et al. (2016)</span>
            </div>
            <div style={{ fontSize: '9.5px', color: '#475569', marginBottom: '8px' }}>
              Mede simultaneamente a nitidez individual e a variedade marginal de classes:
            </div>

            {/* Fórmula do IS */}
            <div style={{ background: '#F0F9FF', border: '1px solid #BAE6FD', borderRadius: '8px', padding: '8px 12px', textAlign: 'center', marginBottom: '8px' }}>
              <MathView math="IS(G) = \exp \left( \mathbb{E}_{x \sim p_g} \left[ D_{\text{KL}}(p(y|x) \parallel p(y)) \right] \right)" block />
            </div>

            {/* Decomposição dos 2 Critérios */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '6px 10px', fontSize: '9px' }}>
                <strong style={{ color: '#0284C7' }}>• Nitidez da Amostra p(y|x):</strong> Cada imagem deve ter predição confiável e unívoca no classificador (baixa entropia condicional).
              </div>
              <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '6px 10px', fontSize: '9px' }}>
                <strong style={{ color: '#0284C7' }}>• Diversidade de Classes p(y):</strong> A média marginal <MathView math="p(y) = \frac{1}{N}\sum_i p(y|x_i)" /> deve ser uniforme (alta entropia).
              </div>
            </div>
          </div>

          {/* Calcanhar de Aquiles do IS */}
          <div style={{ background: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: '8px', padding: '8px 10px', fontSize: '8.5px', color: '#991B1B' }}>
            <strong>⚠️ Falha Crítica do IS:</strong> O IS <em>não compara as amostras com o dataset de treino real</em>! Um modelo que memoriza apenas 1 imagem por classe do ImageNet obtém um IS excelente, mascarando completamente um colapso de modos severo dentro de cada classe.
          </div>
        </div>

        {/* Lado Direito: Fréchet Inception Distance (FID) */}
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
                2. FRÉCHET INCEPTION DISTANCE (FID)
              </span>
              <span className="badge badge-green" style={{ fontSize: '9px' }}>Heusel et al. (NeurIPS 2017)</span>
            </div>
            <div style={{ fontSize: '9.5px', color: '#475569', marginBottom: '8px' }}>
              Distância Wasserstein-2 entre gaussianas no espaço de features InceptionV3 (`pool3`, <MathView math="D=2048" />):
            </div>

            {/* Fórmula Master do FID */}
            <div style={{ background: '#F0FDF4', border: '1px solid #86EFAC', borderRadius: '8px', padding: '10px 14px', textAlign: 'center', marginBottom: '10px' }}>
              <div style={{ fontSize: '13px' }}>
                <MathView math="\text{FID} = \|\mu_r - \mu_g\|_2^2 + \text{Tr}\left(\Sigma_r + \Sigma_g - 2(\Sigma_r \Sigma_g)^{1/2}\right)" block />
              </div>
            </div>

            {/* Decomposição Anatômica da Fórmula */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '9px' }}>
              <div style={{ background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '6px', padding: '8px' }}>
                <div style={{ fontWeight: 800, color: '#0A345D', marginBottom: '2px' }}>Termo 1: Médias ||μ_r - μ_g||²</div>
                <div style={{ color: '#475569' }}>
                  Distância euclidiana entre os centróides globais. Detecta desvio de cor, brilho, texturas médias e realismo global.
                </div>
              </div>
              <div style={{ background: '#FAF5FF', border: '1px solid #DDD6FE', borderRadius: '6px', padding: '8px' }}>
                <div style={{ fontWeight: 800, color: '#6D28D9', marginBottom: '2px' }}>Termo 2: Traço das Covariâncias</div>
                <div style={{ color: '#475569' }}>
                  Mede a dispersão espacial e diversidade. <strong>Se houver Mode Collapse, Σ_g colapsa para matriz singular e o traço explode!</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Destaque Prático de Engenharia */}
          <div style={{ background: '#F0FDF4', border: '1px solid #86EFAC', borderRadius: '8px', padding: '8px 10px', fontSize: '8.5px', color: '#166534' }}>
            <strong>★ Por que o FID é o Padrão Ouro Internacional?</strong> Quanto menor o valor do FID, mais próximas estão as distribuições real e sintética (FID = 0.0 é idêntico). Ele é altamente sensível a ruído gaussiano, borrões, perda de modos inteiros e artefatos de grade.
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
          <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 600 }}>PROTOCOLO DE AMOSTRAGEM FID</div>
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>50.000 Imagens Mínimas</div>
          <div style={{ fontSize: '10.5px', color: '#475569', marginTop: '2px' }}>FID em batches pequenos (&lt; 10k) sofre de viés amostral positivo artificial</div>
        </div>
        <div className="card-infnet" style={{ padding: '8px 14px', background: '#F8FAFC' }}>
          <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 600 }}>CALCANHAR DE AQUILES DO FID</div>
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--infnet-purple)' }}>Hipótese Gaussiana Rígida</div>
          <div style={{ fontSize: '10.5px', color: '#475569', marginTop: '2px' }}>Assume que as 2048 dimensões de ativação seguem uma normal multivariada</div>
        </div>
        <div className="card-infnet" style={{ padding: '8px 14px', background: '#F8FAFC' }}>
          <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 600 }}>A SOLUÇÃO MODERNA</div>
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--infnet-green-accent)' }}>Precision and Recall</div>
          <div style={{ fontSize: '10.5px', color: '#475569', marginTop: '2px' }}>Desacopla nitidez visual de cobertura de diversidade sem hipótese gaussiana</div>
        </div>
      </div>
    </div>
  );
}
