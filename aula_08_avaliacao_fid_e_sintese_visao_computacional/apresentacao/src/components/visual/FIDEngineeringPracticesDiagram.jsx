import React from 'react';
import MathView from '../MathView';

export default function FIDEngineeringPracticesDiagram() {
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
            BOAS PRÁTICAS DE ENGENHARIA
          </span>
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--infnet-dark-blue)' }}>
            Diretrizes Metodológicas do FID: Tamanho Amostral, Reprodutibilidade e Precision vs Recall
          </span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <span className="badge badge-purple" style={{ fontSize: '11px' }}>Viés Amostral N</span>
          <span className="badge badge-cyan" style={{ fontSize: '11px' }}>clean-fid</span>
          <span className="badge badge-green" style={{ fontSize: '11px' }}>Precision & Recall</span>
        </div>
      </div>

      {/* Main 3-Column Grid */}
      <div style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: '14px',
        minHeight: 0
      }}>
        {/* Card 1: Sample Size Bias */}
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
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '12.5px', fontWeight: 800, color: '#0A345D' }}>
                1. O Viés Amostral Positivo (N)
              </span>
              <span className="badge badge-red" style={{ fontSize: '9.5px' }}>Viés O(1/N)</span>
            </div>

            <p style={{ fontSize: '11px', color: '#475569', lineHeight: '1.4', marginBottom: '10px' }}>
              O estimador empírico do FID possui um viés matemático sistemático para conjuntos de amostras pequenos.
            </p>

            <div style={{ background: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: '8px', padding: '8px 12px', textAlign: 'center', marginBottom: '10px' }}>
              <MathView math="\mathbb{E}[\text{FID}_N] = \text{FID}_\infty + \frac{\mathcal{C}}{N}" block />
            </div>

            <ul style={{ fontSize: '10.5px', color: '#334155', paddingLeft: '16px', margin: 0, lineHeight: '1.5' }}>
              <li><strong>N = 1.000:</strong> O FID medido é artificialmente inflado em 10 a 20 pontos mesmo para distribuições idênticas.</li>
              <li><strong>N = 10.000:</strong> Mínimo aceitável para prototipagem rápida e acompanhamento de curvas.</li>
              <li><strong>N = 50.000:</strong> Padrão ouro mandatório na literatura científica (<MathView math="\text{FID}_{50k}" />) para estabilização assintótica.</li>
            </ul>
          </div>

          <div style={{ background: '#FFF7ED', border: '1px solid #FED7AA', borderRadius: '8px', padding: '8px 10px', fontSize: '10px', color: '#9A3412', fontWeight: 600 }}>
            ⚠️ Regra: Sempre reporte o tamanho exato de amostras N ao publicar ou comparar scores de FID.
          </div>
        </div>

        {/* Card 2: Preprocessing & clean-fid */}
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
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '12.5px', fontWeight: 800, color: '#0A345D' }}>
                2. Reprodutibilidade & clean-fid
              </span>
              <span className="badge badge-cyan" style={{ fontSize: '9.5px' }}>Parmar et al. (2022)</span>
            </div>

            <p style={{ fontSize: '11px', color: '#475569', lineHeight: '1.4', marginBottom: '10px' }}>
              Pequenas diferenças operacionais no pipeline de entrada corrompem drasticamente o valor absoluto do FID:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '8px 10px' }}>
                <strong style={{ fontSize: '11px', color: '#0284C7' }}>• Algoritmo de Rescaling:</strong>
                <p style={{ fontSize: '10px', color: '#334155', margin: '3px 0 0' }}>
                  Bilinear vs Bicúbico altera o FID em até 5 a 8 pontos para o mesmo modelo exato!
                </p>
              </div>

              <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '8px 10px' }}>
                <strong style={{ fontSize: '11px', color: '#0284C7' }}>• Biblioteca de Imagem:</strong>
                <p style={{ fontSize: '10px', color: '#334155', margin: '3px 0 0' }}>
                  Decodificação via PIL, OpenCV ou PyTorch gera pequenas discrepâncias de quantização.
                </p>
              </div>

              <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '8px 10px' }}>
                <strong style={{ fontSize: '11px', color: '#0284C7' }}>• Solução Padronizada:</strong>
                <p style={{ fontSize: '10px', color: '#334155', margin: '3px 0 0' }}>
                  Utilizar bibliotecas consagradas como <code style={{ color: '#0A345D', fontWeight: 700 }}>torch-fidelity</code> ou <code style={{ color: '#0A345D', fontWeight: 700 }}>clean-fid</code> com pesos Inception-v3 idênticos.
                </p>
              </div>
            </div>
          </div>

          <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '8px', padding: '8px 10px', fontSize: '10px', color: '#1E40AF', fontWeight: 600 }}>
            🛡️ Boas Práticas: Armazene estatísticas pré-computadas (μ_r, Σ_r) do conjunto real para acelerar execuções.
          </div>
        </div>

        {/* Card 3: Precision & Recall for Generative Models */}
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
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '12.5px', fontWeight: 800, color: '#0A345D' }}>
                3. Precision vs Recall de Variedades
              </span>
              <span className="badge badge-purple" style={{ fontSize: '9.5px' }}>Sajjadi / Kynkäänniemi</span>
            </div>

            <p style={{ fontSize: '11px', color: '#475569', lineHeight: '1.4', marginBottom: '10px' }}>
              O FID resume tudo em um único número. Para diagnóstico refinado, decompõe-se em duas métricas ortogonais:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ background: '#F0FDF4', border: '1px solid #86EFAC', borderRadius: '8px', padding: '8px 10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ fontSize: '11px', color: '#166534' }}>Precision (Fidelidade):</strong>
                  <span className="badge badge-green" style={{ fontSize: '8.5px' }}>Qualidade</span>
                </div>
                <p style={{ fontSize: '10px', color: '#14532D', margin: '4px 0 0' }}>
                  Fração das imagens geradas que caem dentro do suporte da variedade de dados reais (ausência de alucinações irreais).
                </p>
              </div>

              <div style={{ background: '#FAF5FF', border: '1px solid #D8B4FE', borderRadius: '8px', padding: '8px 10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ fontSize: '11px', color: '#6B21A8' }}>Recall (Diversidade):</strong>
                  <span className="badge badge-purple" style={{ fontSize: '8.5px' }}>Cobertura</span>
                </div>
                <p style={{ fontSize: '10px', color: '#581C87', margin: '4px 0 0' }}>
                  Fração da variedade de dados reais coberta pelas amostras geradas (sensível a mode collapse e omissão de classes).
                </p>
              </div>
            </div>
          </div>

          <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '8px', padding: '8px 10px', fontSize: '10px', color: '#166534', fontWeight: 600 }}>
            ✨ Insight: Um modelo pode ter alta Precision gerando apenas poucas imagens nítidas, mas terá baixo Recall!
          </div>
        </div>
      </div>
    </div>
  );
}
