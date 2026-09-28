import React from 'react';
import MathView from '../MathView';

export default function GenerativeEvaluationPitfallsDiagram() {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {/* Top Banner */}
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
            DILEMA METODOLÓGICO
          </span>
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--infnet-dark-blue)' }}>
            Por que Métricas Supervisionadas e Inception Score Falham na Avaliação de Redes Generativas
          </span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <span className="badge badge-orange" style={{ fontSize: '11px' }}>Sem Pares 1:1</span>
          <span className="badge badge-purple" style={{ fontSize: '11px' }}>Vulnerabilidade do IS</span>
        </div>
      </div>

      {/* Main 2-Column Grid */}
      <div style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '1.05fr 1.25fr',
        gap: '14px',
        minHeight: 0
      }}>
        {/* Left Column: Pixel-wise metrics failure */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid var(--border-light)',
          borderRadius: '12px',
          padding: '14px 16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '13px', fontWeight: 800, color: '#0A345D' }}>
                1. Falha das Métricas Pixel a Pixel
              </span>
              <span className="badge badge-red" style={{ fontSize: '10px' }}>Inaplicável a GANs</span>
            </div>
            <p style={{ fontSize: '11px', color: '#475569', lineHeight: '1.4', marginBottom: '10px' }}>
              Métricas clássicas como MSE, PSNR e SSIM exigem alinhamento pixel a pixel exato entre uma entrada e um alvo de referência (ground-truth).
            </p>

            <div style={{ background: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: '8px', padding: '10px 14px', marginBottom: '10px', textAlign: 'center' }}>
              <MathView math="\text{MSE} = \frac{1}{H \times W \times C} \sum_{i,j,k} (I_{\text{real}}(i,j,k) - I_{\text{gen}}(i,j,k))^2" block />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '8px 12px' }}>
                <strong style={{ fontSize: '11px', color: '#B91C1C' }}>• Inexistência de Par Ground-Truth:</strong>
                <p style={{ fontSize: '10px', color: '#334155', margin: '3px 0 0' }}>
                  Modelos gerativos amostram de ruído <MathView math="z \sim \mathcal{N}(0, I)" /> para criar novas instâncias plausíveis. Não existe uma imagem real idêntica pré-definida para comparar.
                </p>
              </div>

              <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '8px 12px' }}>
                <strong style={{ fontSize: '11px', color: '#B91C1C' }}>• Sensibilidade a Deslocamentos Espaciais:</strong>
                <p style={{ fontSize: '10px', color: '#334155', margin: '3px 0 0' }}>
                  Uma imagem gerada perfeitamente fotorrealista com um deslocamento de apenas 2 pixels gera um MSE massivo, penalizando o modelo mesmo com realismo impecável.
                </p>
              </div>
            </div>
          </div>

          <div style={{ background: '#FFF7ED', border: '1px solid #FED7AA', borderRadius: '8px', padding: '8px 12px', fontSize: '10.5px', color: '#9A3412', fontWeight: 600 }}>
            ⚠️ Conclusão: É mandatório comparar distribuições estatísticas no espaço latente, nunca pixels individuais.
          </div>
        </div>

        {/* Right Column: Inception Score Pitfalls */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid var(--border-light)',
          borderRadius: '12px',
          padding: '14px 16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '13px', fontWeight: 800, color: '#0A345D' }}>
                2. Vulnerabilidades Críticas do Inception Score (IS)
              </span>
              <span className="badge badge-purple" style={{ fontSize: '10px' }}>Salimans et al. (2016)</span>
            </div>

            <div style={{ background: '#F0F9FF', border: '1px solid #BAE6FD', borderRadius: '8px', padding: '8px 14px', marginBottom: '10px', textAlign: 'center' }}>
              <MathView math="IS(G) = \exp \left( \mathbb{E}_{x \sim p_g} \left[ D_{\text{KL}}(p(y|x) \parallel p(y)) \right] \right)" block />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px' }}>
              <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '8px 12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ background: '#E0F2FE', color: '#0284C7', fontWeight: 700, fontSize: '10px', padding: '2px 6px', borderRadius: '4px' }}>Falha 1</span>
                  <strong style={{ fontSize: '11px', color: '#0A345D' }}>Ausência de Comparação com Dados Reais</strong>
                </div>
                <p style={{ fontSize: '10px', color: '#334155', margin: '4px 0 0' }}>
                  O IS avalia apenas as predições do classificador Inception-v3 sobre as imagens sintéticas. Não mede se a distribuição gerada <MathView math="p_g" /> é similar aos dados reais <MathView math="p_{data}" />.
                </p>
              </div>

              <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '8px 12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ background: '#FEF3C7', color: '#D97706', fontWeight: 700, fontSize: '10px', padding: '2px 6px', borderRadius: '4px' }}>Falha 2</span>
                  <strong style={{ fontSize: '11px', color: '#0A345D' }}>Cegueira ao Colapso de Modo Intra-Classe</strong>
                </div>
                <p style={{ fontSize: '10px', color: '#334155', margin: '4px 0 0' }}>
                  Se o gerador memorizar e sintetizar exatamente uma única imagem perfeita para cada classe, <MathView math="p(y)" /> será perfeitamente uniforme e o IS será altíssimo, mascarando ausência total de diversidade.
                </p>
              </div>

              <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '8px 12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ background: '#FEE2E2', color: '#DC2626', fontWeight: 700, fontSize: '10px', padding: '2px 6px', borderRadius: '4px' }}>Falha 3</span>
                  <strong style={{ fontSize: '11px', color: '#0A345D' }}>Vieses Estritos de Categorias ImageNet</strong>
                </div>
                <p style={{ fontSize: '10px', color: '#334155', margin: '4px 0 0' }}>
                  A rede Inception foi treinada em 1.000 classes gerais (animais, veículos). Em domínios técnicos (imagens médicas, satélite, texturas), a probabilidade <MathView math="p(y|x)" /> perde sentido discriminativo.
                </p>
              </div>
            </div>
          </div>

          <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '8px', padding: '8px 12px', fontSize: '10.5px', color: '#166534', fontWeight: 600 }}>
            💡 Solução: O Fréchet Inception Distance (FID) compara as estatísticas completas das features contínuas!
          </div>
        </div>
      </div>
    </div>
  );
}
