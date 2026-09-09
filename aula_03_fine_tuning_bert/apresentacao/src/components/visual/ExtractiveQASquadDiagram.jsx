import React from 'react';
import MathView from '../MathView';

export default function ExtractiveQASquadDiagram() {
  const contextTokens = [
    { tok: 'A', isAnswer: false },
    { tok: 'Torre', isAnswer: true, role: 'START' },
    { tok: 'Eiffel', isAnswer: true, role: 'END' },
    { tok: 'foi', isAnswer: false },
    { tok: 'inaugurada', isAnswer: false },
    { tok: 'em', isAnswer: false },
    { tok: '1889', isAnswer: false },
    { tok: 'em', isAnswer: false },
    { tok: 'Paris', isAnswer: false },
    { tok: '.', isAnswer: false },
  ];

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {/* Top Math Banner */}
      <div style={{
        background: '#FFF7ED',
        border: '1px solid #FFEDD5',
        borderRadius: '8px',
        padding: '8px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#C2410C' }}>
            Mecanismo Extrativo de Span (SQuAD):
          </span>
          <MathView math="s_i = S \cdot h_i, \quad e_j = E \cdot h_j \implies \text{Span} = \arg\max_{j \ge i} (s_i + e_j)" />
        </div>
        <div style={{ fontSize: '11px', color: '#9A3412', fontWeight: 600 }}>
          Vetores Treináveis: S, E ∈ ℝ⁷⁶⁸
        </div>
      </div>

      {/* Main Diagram */}
      <div style={{
        flex: 1,
        minHeight: 0,
        background: '#FFFFFF',
        border: '1px solid #E2E8F0',
        borderRadius: '10px',
        padding: '14px',
        display: 'grid',
        gridTemplateColumns: '1.3fr 0.7fr',
        gap: '12px'
      }}>
        {/* Left Side: Span Prediction Visual */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          {/* Question Box */}
          <div style={{
            background: '#F0F9FF',
            border: '1px solid #BAE6FD',
            borderRadius: '6px',
            padding: '8px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#0369A1' }}>PERGUNTA:</span>
            <span style={{ fontSize: '12px', color: '#0A345D', fontWeight: 600 }}>
              "Qual monumento foi inaugurado em 1889?"
            </span>
          </div>

          {/* Start and End Probability Curves over Context */}
          <div style={{ background: '#F8FAFC', padding: '10px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 700, marginBottom: '6px' }}>
              <span style={{ color: '#16A34A' }}>▲ Probabilidade de INÍCIO (Start Logits via Vetor S)</span>
              <span style={{ color: '#DC2626' }}>▼ Probabilidade de FIM (End Logits via Vetor E)</span>
            </div>

            {/* Token Strip with Bars */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: '4px' }}>
              {contextTokens.map((t, idx) => {
                const startProb = idx === 1 ? 92 : idx === 2 ? 6 : 1;
                const endProb = idx === 2 ? 94 : idx === 1 ? 4 : 1;

                return (
                  <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px' }}>
                    {/* Start Bar */}
                    <div style={{ height: '35px', display: 'flex', alignItems: 'flex-end', width: '100%' }}>
                      <div
                        style={{
                          width: '100%',
                          height: `${startProb}%`,
                          background: idx === 1 ? '#16A34A' : '#CBD5E1',
                          borderRadius: '2px 2px 0 0'
                        }}
                      />
                    </div>

                    {/* Token Box */}
                    <div
                      style={{
                        width: '100%',
                        padding: '4px 2px',
                        borderRadius: '4px',
                        textAlign: 'center',
                        fontSize: '10.5px',
                        fontWeight: t.isAnswer ? 800 : 500,
                        background: t.isAnswer ? '#FEF3C7' : '#FFFFFF',
                        border: t.isAnswer ? '1.5px solid #F59E0B' : '1px solid #E2E8F0',
                        color: t.isAnswer ? '#92400E' : '#334155'
                      }}
                    >
                      {t.tok}
                    </div>

                    {/* End Bar */}
                    <div style={{ height: '35px', display: 'flex', alignItems: 'flex-start', width: '100%' }}>
                      <div
                        style={{
                          width: '100%',
                          height: `${endProb}%`,
                          background: idx === 2 ? '#DC2626' : '#CBD5E1',
                          borderRadius: '0 0 2px 2px'
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Extracted Answer Banner */}
          <div style={{
            background: '#F0FDF4',
            border: '1.5px solid #86EFAC',
            borderRadius: '8px',
            padding: '8px 14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <span style={{ fontSize: '10.5px', fontWeight: 800, color: '#166534', textTransform: 'uppercase' }}>
                Resposta Extrativa Extraída:
              </span>
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#14532D' }}>
                "Torre Eiffel" <span style={{ fontSize: '11px', fontWeight: 500 }}>(Span: [1, 2])</span>
              </div>
            </div>
            <div style={{ fontSize: '11px', color: '#15803D', fontWeight: 700 }}>
              Score Conjunto: 93.1%
            </div>
          </div>
        </div>

        {/* Right Side: Key Differences & Engineering Details */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ background: '#F8FAFC', padding: '10px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
            <strong style={{ fontSize: '11.5px', color: 'var(--infnet-dark-blue)', display: 'block', marginBottom: '4px' }}>
              Extrativo vs Generativo:
            </strong>
            <p style={{ margin: 0, fontSize: '10.5px', color: '#475569', lineHeight: 1.4 }}>
              Diferente de um modelo GPT que gera texto livre (podendo alucinar), o BERT é <strong>100% fiel ao documento original</strong>: ele apenas aponta os ponteiros de início e término no texto já existente.
            </p>
          </div>

          <div style={{ background: '#EFF6FF', padding: '10px', borderRadius: '8px', border: '1px solid #BFDBFE' }}>
            <strong style={{ fontSize: '11px', color: '#1D4ED8', display: 'block', marginBottom: '2px' }}>
              Formatação da Entrada com Segment IDs:
            </strong>
            <div style={{ fontSize: '10px', fontFamily: 'var(--font-code)', color: '#1E40AF', lineHeight: 1.4 }}>
              [CLS] Pergunta [SEP] Contexto [SEP]<br />
              Segment ID A = 0 (Pergunta)<br />
              Segment ID B = 1 (Contexto)
            </div>
          </div>

          <div style={{ background: '#FEF3C7', padding: '8px 10px', borderRadius: '6px', border: '1px solid #FCD34D', fontSize: '10px', color: '#92400E' }}>
            💡 <strong>Sem Resposta (Unanswerable Questions):</strong> Se o texto não contiver a resposta, o modelo aprende a apontar tanto o <em>Start</em> quanto o <em>End</em> para a posição 0 (o token <code>[CLS]</code>)!
          </div>
        </div>
      </div>
    </div>
  );
}
