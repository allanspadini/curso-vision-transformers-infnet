import React from 'react';
import MathView from '../MathView';

export default function SemanticRetrievalThresholdDiagram() {
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
            BUSCA SEMÂNTICA & DECISÃO
          </span>
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--infnet-dark-blue)' }}>
            Mecânica de Retrieval do CLIP: Calibração de Thresholds e Engenharia de Prompts
          </span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <span className="badge badge-purple" style={{ fontSize: '11px' }}>Ranking Top-K</span>
          <span className="badge badge-cyan" style={{ fontSize: '11px' }}>Calibração de Limiar</span>
          <span className="badge badge-orange" style={{ fontSize: '11px' }}>Do Concreto ao Abstrato</span>
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
        {/* Card 1: Score Distribution */}
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
                1. Geometria em Alta Dimensão
              </span>
              <span className="badge badge-purple" style={{ fontSize: '9px' }}>Concentração de Medida</span>
            </div>

            <p style={{ fontSize: '11px', color: '#475569', lineHeight: '1.4', marginBottom: '10px' }}>
              No espaço latente <MathView math="\mathbb{R}^{512}" />, vetores ortogonais aleatórios possuem similaridade próxima a zero, mas pares imagem-texto não-correlacionados concentram-se em uma faixa estreita:
            </p>

            <div style={{ background: '#F0F9FF', border: '1px solid #BAE6FD', borderRadius: '8px', padding: '8px 12px', textAlign: 'center', marginBottom: '10px' }}>
              <div style={{ fontSize: '10.5px', fontWeight: 700, color: '#0369A1' }}>
                Faixa Típica de Ruído de Fundo:
              </div>
              <div style={{ fontSize: '14px', fontWeight: 800, fontFamily: 'var(--font-code)', color: '#0A345D', marginTop: '2px' }}>
                0.12 ≤ S_cosseno ≤ 0.22
              </div>
            </div>

            <ul style={{ fontSize: '10px', color: '#334155', paddingLeft: '16px', margin: 0, lineHeight: '1.5' }}>
              <li><strong>Erro Comum de Iniciantes:</strong> Esperar que similaridades variem de 0.0 a 1.0 como probabilidades.</li>
              <li><strong>Alinhamento Fraco:</strong> Scores entre 0.20 e 0.24 indicam vaga associação semântica.</li>
              <li><strong>Alinhamento Forte:</strong> Scores <MathView math="\ge 0.28" /> indicam alta correspondência conceitual.</li>
            </ul>
          </div>

          <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '8px', padding: '8px 10px', fontSize: '10px', color: '#1E40AF', fontWeight: 600 }}>
            📌 Nota: A similaridade de cosseno reflete ângulo angular, não probabilidade calibrada de classe.
          </div>
        </div>

        {/* Card 2: Threshold Calibration */}
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
                2. Calibração de Thresholds
              </span>
              <span className="badge badge-cyan" style={{ fontSize: '9px' }}>Ponto de Corte Justificado</span>
            </div>

            <p style={{ fontSize: '11px', color: '#475569', lineHeight: '1.4', marginBottom: '10px' }}>
              Para decidir se um objeto ou conceito está presente em uma imagem, define-se um limiar de corte <MathView math="\tau" />:
            </p>

            <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ fontSize: '10.5px', color: '#166534' }}>Threshold Alto (ex: τ = 0.30):</strong>
                <span className="badge badge-green" style={{ fontSize: '8.5px' }}>Alta Precisão</span>
              </div>
              <p style={{ fontSize: '9.5px', color: '#475569', margin: 0 }}>
                Retorna apenas detecções inequívocas, mas gera Falsos Negativos (baixo Recall).
              </p>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
                <strong style={{ fontSize: '10.5px', color: '#C2410C' }}>Threshold Baixo (ex: τ = 0.22):</strong>
                <span className="badge badge-orange" style={{ fontSize: '8.5px' }}>Alto Recall</span>
              </div>
              <p style={{ fontSize: '9.5px', color: '#475569', margin: 0 }}>
                Recupera a maioria das ocorrências, mas sofre com Falsos Positivos causados pelo ruído de fundo.
              </p>
            </div>
          </div>

          <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '8px', padding: '8px 10px', fontSize: '10px', color: '#166534', fontWeight: 600 }}>
            🎯 Critério Científico: O threshold deve ser calibrado com base no percentil 95% de pares negativos aleatórios.
          </div>
        </div>

        {/* Card 3: Prompt Engineering Spectrum */}
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
                3. Espectro de Consultas (Prompts)
              </span>
              <span className="badge badge-green" style={{ fontSize: '9px' }}>Engenharia Semântica</span>
            </div>

            <p style={{ fontSize: '11px', color: '#475569', lineHeight: '1.4', marginBottom: '10px' }}>
              O Text Encoder responde diferentemente conforme o nível de abstração da formulação textual:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '6px', padding: '8px 10px' }}>
                <span style={{ fontSize: '10px', fontWeight: 700, color: '#0284C7' }}>• Consultas Concretas:</span>
                <p style={{ fontSize: '9.5px', color: '#334155', margin: '2px 0 0' }}>
                  "a photo of a red bicycle" ➔ Ativações nítidas baseadas em geometria e cores literais.
                </p>
              </div>

              <div style={{ background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '6px', padding: '8px 10px' }}>
                <span style={{ fontSize: '10px', fontWeight: 700, color: '#7C3AED' }}>• Consultas Abstratas:</span>
                <p style={{ fontSize: '9.5px', color: '#334155', margin: '2px 0 0' }}>
                  "healthy lifestyle and wellness" ➔ Depende de correlações culturais e contexto indireto aprendido no pré-treino.
                </p>
              </div>

              <div style={{ background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '6px', padding: '8px 10px' }}>
                <span style={{ fontSize: '10px', fontWeight: 700, color: '#059669' }}>• Templates de Contexto:</span>
                <p style={{ fontSize: '9.5px', color: '#334155', margin: '2px 0 0' }}>
                  Usar prefixos como <code style={{ color: '#0A345D' }}>"a clear photo of [objeto]"</code> estabiliza os embeddings.
                </p>
              </div>
            </div>
          </div>

          <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: '8px', padding: '8px 10px', fontSize: '10px', color: '#92400E', fontWeight: 600 }}>
            💡 Análise Crítica: Sempre compare se o modelo recupera o sentido literal ou faz associações espúrias.
          </div>
        </div>
      </div>
    </div>
  );
}
