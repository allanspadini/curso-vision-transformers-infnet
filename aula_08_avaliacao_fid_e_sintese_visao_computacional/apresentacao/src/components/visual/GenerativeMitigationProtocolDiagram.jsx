import React from 'react';
import MathView from '../MathView';

export default function GenerativeMitigationProtocolDiagram() {
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
            MITIGAÇÃO GENERATIVA & PROTOCOLO
          </span>
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--infnet-dark-blue)' }}>
            Estratégias Generativas (cGAN & CycleGAN) e o Protocolo Científico de Avaliação Downstream
          </span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <span className="badge badge-purple" style={{ fontSize: '11px' }}>cGAN / CycleGAN</span>
          <span className="badge badge-green" style={{ fontSize: '11px' }}>Teste 100% Real</span>
          <span className="badge badge-cyan" style={{ fontSize: '11px' }}>Δ Recall Downstream</span>
        </div>
      </div>

      {/* Main Grid */}
      <div style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '1.15fr 1fr',
        gap: '14px',
        minHeight: 0
      }}>
        {/* Left Column: Generative Architectures for Imbalance */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid var(--border-light)',
          borderRadius: '12px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div>
            <span style={{ fontSize: '12.5px', fontWeight: 800, color: '#0A345D' }}>
              1. Abordagens Generativas para Escassez de Amostras
            </span>
            <p style={{ fontSize: '11px', color: '#475569', margin: '4px 0 10px' }}>
              Quando técnicas tradicionais de rotação e flip não trazem diversidade suficiente para a classe rara:
            </p>

            {/* Approach A: cGAN */}
            <div style={{ background: '#F0FDF4', border: '1px solid #86EFAC', borderRadius: '10px', padding: '10px 12px', marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <strong style={{ fontSize: '11.5px', color: '#166534' }}>Abordagem A: GAN Condicional (cGAN)</strong>
                <span className="badge badge-green" style={{ fontSize: '8.5px' }}>Oversampling Direcionado</span>
              </div>
              <div style={{ background: '#FFFFFF', border: '1px solid #BBF7D0', borderRadius: '6px', padding: '6px 8px', textAlign: 'center', margin: '4px 0' }}>
                <MathView math="G(z, y_{\text{rara}}) \in \mathbb{R}^{C \times H \times W} \quad \text{onde } y = \text{classe minoritária}" />
              </div>
              <p style={{ fontSize: '10px', color: '#14532D', margin: 0, lineHeight: '1.4' }}>
                Injeta o rótulo da classe rara no gerador e discriminador. O modelo aprende a variedade interna da classe minoritária e gera amostras sintéticas sob demanda para equilibrar o lote.
              </p>
            </div>

            {/* Approach B: CycleGAN */}
            <div style={{ background: '#EFF6FF', border: '1px solid #93C5FD', borderRadius: '10px', padding: '10px 12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <strong style={{ fontSize: '11.5px', color: '#1E40AF' }}>Abordagem B: CycleGAN (Tradução Não-Pareada)</strong>
                <span className="badge badge-cyan" style={{ fontSize: '8.5px' }}>Transferência de Domínio</span>
              </div>
              <div style={{ background: '#FFFFFF', border: '1px solid #BAE6FD', borderRadius: '6px', padding: '6px 8px', textAlign: 'center', margin: '4px 0' }}>
                <MathView math="\mathcal{L}_{\text{cyc}}(G, F) = \mathbb{E}_x [\|F(G(x)) - x\|_1] + \mathbb{E}_y [\|G(F(y)) - y\|_1]" />
              </div>
              <p style={{ fontSize: '10px', color: '#1E3A8A', margin: 0, lineHeight: '1.4' }}>
                Converte imagens de uma classe abundante (<MathView math="X" />) para a aparência/estilo da classe rara (<MathView math="Y" />), preservando a morfologia estrutural através do ciclo bidirecional.
              </p>
            </div>
          </div>

          <div style={{ background: '#FAF5FF', border: '1px solid #E9D5FF', borderRadius: '8px', padding: '6px 10px', fontSize: '9.5px', color: '#6B21A8' }}>
            💡 Ambas as soluções geram dados no espaço contínuo de pixels sem exigir pares alinhados.
          </div>
        </div>

        {/* Right Column: The Scientific Evaluation Protocol */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid var(--border-light)',
          borderRadius: '12px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '12.5px', fontWeight: 800, color: '#0A345D' }}>
                2. Protocolo Científico Mandatório
              </span>
              <span className="badge badge-purple" style={{ fontSize: '9px' }}>Validação Blindada</span>
            </div>

            <p style={{ fontSize: '11px', color: '#475569', lineHeight: '1.4', marginBottom: '10px' }}>
              Para comprovar tecnicamente a utilidade dos dados sintéticos, deve-se seguir estritamente o protocolo experimental:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '8px 10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ background: '#0A345D', color: '#FFFFFF', fontSize: '9px', fontWeight: 700, padding: '1px 5px', borderRadius: '3px' }}>Regra 1</span>
                  <strong style={{ fontSize: '10.5px', color: '#0A345D' }}>Injeção Exclusiva no Treinamento:</strong>
                </div>
                <p style={{ fontSize: '9.5px', color: '#475569', margin: '3px 0 0' }}>
                  As imagens geradas por GAN entram <strong>única e exclusivamente</strong> no conjunto de treino (<MathView math="D_{\text{train}} = D_{\text{real}} \cup D_{\text{sint}}" />).
                </p>
              </div>

              <div style={{ background: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: '8px', padding: '8px 10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ background: '#DC2626', color: '#FFFFFF', fontSize: '9px', fontWeight: 700, padding: '1px 5px', borderRadius: '3px' }}>Regra 2</span>
                  <strong style={{ fontSize: '10.5px', color: '#991B1B' }}>Conjunto de Teste 100% Real e Intocado:</strong>
                </div>
                <p style={{ fontSize: '9.5px', color: '#7F1D1D', margin: '3px 0 0' }}>
                  O conjunto de teste <strong>NUNCA</strong> pode conter imagens sintéticas! Avaliar em imagens geradas é uma falha metodológica que invalida a pesquisa.
                </p>
              </div>

              <div style={{ background: '#F0FDF4', border: '1px solid #86EFAC', borderRadius: '8px', padding: '8px 10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ background: '#166534', color: '#FFFFFF', fontSize: '9px', fontWeight: 700, padding: '1px 5px', borderRadius: '3px' }}>Regra 3</span>
                  <strong style={{ fontSize: '10.5px', color: '#166534' }}>Métrica de Sucesso: Ganho de Recall:</strong>
                </div>
                <div style={{ background: '#FFFFFF', border: '1px solid #BBF7D0', borderRadius: '6px', padding: '4px', textAlign: 'center', margin: '4px 0' }}>
                  <MathView math="\Delta \text{Recall} = \text{Recall}_{\text{com GAN}} - \text{Recall}_{\text{sem GAN}}" />
                </div>
                <p style={{ fontSize: '9.5px', color: '#14532D', margin: 0 }}>
                  A GAN é bem-sucedida se, e somente se, elevar a Sensibilidade no teste real sem colapsar a Precisão.
                </p>
              </div>
            </div>
          </div>

          <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '8px', padding: '8px 10px', fontSize: '10px', color: '#1E40AF', fontWeight: 600 }}>
            📊 Comparativo Obrigatório: Compare duas curvas de aprendizado: Treino Base (sem GAN) vs Treino Aumentado (com GAN).
          </div>
        </div>
      </div>
    </div>
  );
}
