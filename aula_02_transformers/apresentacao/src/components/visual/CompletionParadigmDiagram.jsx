import React, { useState } from 'react';
import { ArrowRight, Play, RefreshCw, Sparkles, MessageSquare, CheckCircle, Database } from 'lucide-react';

export default function CompletionParadigmDiagram() {
  const [step, setStep] = useState(0);

  const stepsData = [
    {
      promptTokens: ['Tudo', 'o', 'que', 'você', 'precisa', 'é', 'de'],
      nextPredicted: 'amor',
      candidates: [
        { token: 'amor', prob: 94.2, color: '#15803D' },
        { token: 'atenção', prob: 4.1, color: '#0284C7' },
        { token: 'paz', prob: 1.2, color: '#64748B' },
        { token: 'tempo', prob: 0.5, color: '#94A3B8' }
      ],
      description: 'O modelo recebe o prompt inicial da canção dos Beatles e calcula a distribuição de probabilidade sobre todo o vocabulário para a posição seguinte.'
    },
    {
      promptTokens: ['Tudo', 'o', 'que', 'você', 'precisa', 'é', 'de', 'amor'],
      nextPredicted: ',',
      candidates: [
        { token: ',', prob: 78.5, color: '#15803D' },
        { token: '.', prob: 12.3, color: '#0284C7' },
        { token: '!', prob: 6.8, color: '#64748B' },
        { token: 'amor', prob: 2.4, color: '#94A3B8' }
      ],
      description: 'O token "amor" é anexado à sequência de entrada. O modelo roda o próximo passo autorregressivo para prever a pontuação.'
    },
    {
      promptTokens: ['Tudo', 'o', 'que', 'você', 'precisa', 'é', 'de', 'amor', ','],
      nextPredicted: 'amor',
      candidates: [
        { token: 'amor', prob: 91.0, color: '#15803D' },
        { token: 'tudo', prob: 5.2, color: '#0284C7' },
        { token: 'o', prob: 2.1, color: '#64748B' },
        { token: 'é', prob: 1.7, color: '#94A3B8' }
      ],
      description: 'Prevendo o refrão repetitivo: "Tudo o que você precisa é de amor, amor..." A atenção conecta a repetição com alta precisão.'
    }
  ];

  const current = stepsData[step];

  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      fontSize: '13px'
    }}>
      {/* Top Banner */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#EDF5FA',
        padding: '8px 16px',
        borderRadius: '8px',
        border: '1px solid #D0E3F0'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, color: 'var(--infnet-dark-blue)' }}>
          <Sparkles size={18} color="var(--infnet-cyan)" />
          <span>O Paradigma Fundamental: Predição Autorregressiva do Próximo Token</span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setStep((prev) => (prev + 1) % stepsData.length)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 14px',
              borderRadius: '6px',
              border: 'none',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              background: 'var(--infnet-dark-blue)',
              color: '#FFFFFF',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <Play size={13} />
            <span>Avançar Passo Autorregressivo ({step + 1}/3)</span>
          </button>
        </div>
      </div>

      {/* Main Visualizer Area */}
      <div style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '1.4fr 1fr',
        gap: '14px',
        minHeight: 0
      }}>
        {/* Left Column: Interactive Sequence Flow */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-light)',
          borderRadius: '10px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px'
        }}>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--infnet-dark-blue)', textTransform: 'uppercase', marginBottom: '8px' }}>
              1. Sequência de Entrada (Prompt Contextual):
            </div>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '6px',
              background: '#FFFFFF',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid var(--border-light)',
              minHeight: '52px',
              alignItems: 'center'
            }}>
              {current.promptTokens.map((t, idx) => (
                <span
                  key={idx}
                  style={{
                    fontFamily: 'var(--font-code)',
                    fontSize: '13px',
                    fontWeight: 600,
                    background: idx >= 7 ? 'rgba(124, 179, 66, 0.15)' : '#EDF5FA',
                    color: idx >= 7 ? '#15803D' : 'var(--infnet-dark-blue)',
                    border: `1px solid ${idx >= 7 ? '#86EFAC' : '#CBD5E1'}`,
                    padding: '3px 8px',
                    borderRadius: '4px'
                  }}
                >
                  {t}
                </span>
              ))}
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                fontFamily: 'var(--font-code)',
                fontSize: '12px',
                color: '#94A3B8',
                animation: 'pulse 1.5s infinite'
              }}>
                [?]
              </span>
            </div>
          </div>

          {/* Model Processing Box */}
          <div style={{
            background: 'linear-gradient(135deg, #0A345D 0%, #061F38 100%)',
            borderRadius: '8px',
            padding: '14px',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: 'var(--shadow-md)'
          }}>
            <div>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--infnet-cyan-light)', fontWeight: 700 }}>
                Blocos de Atenção Causal (Transformer)
              </div>
              <div style={{ fontSize: '12px', opacity: 0.85, marginTop: '2px' }}>
                Processa $T$ tokens com Self-Attention e projeta d_model → |V_vocab|
              </div>
            </div>
            <div style={{
              fontFamily: 'var(--font-code)',
              fontSize: '11.5px',
              background: 'rgba(27, 181, 216, 0.2)',
              border: '1px solid var(--infnet-cyan)',
              padding: '4px 8px',
              borderRadius: '4px',
              color: 'var(--infnet-cyan-light)'
            }}>
              Softmax(Logits)
            </div>
          </div>

          {/* Next Token Result */}
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--infnet-dark-blue)', textTransform: 'uppercase', marginBottom: '8px' }}>
              2. Amostragem / Seleção do Próximo Token:
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              background: '#F0FDF4',
              border: '1.5px solid #86EFAC',
              padding: '10px 14px',
              borderRadius: '8px'
            }}>
              <CheckCircle size={22} color="#15803D" />
              <div>
                <div style={{ fontSize: '11px', color: '#166534', fontWeight: 600 }}>Token Escolhido (ArgMax / Top-p):</div>
                <div style={{ fontFamily: 'var(--font-code)', fontSize: '18px', fontWeight: 700, color: '#15803D' }}>
                  "{current.nextPredicted}" <span style={{ fontSize: '12px', fontWeight: 500 }}>(Probabilidade: {current.candidates[0].prob}%)</span>
                </div>
              </div>
            </div>
          </div>

          <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', background: '#F8FAFC', padding: '8px 10px', borderRadius: '6px' }}>
            💡 {current.description}
          </div>
        </div>

        {/* Right Column: Probability Distribution over Candidates */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-light)',
          borderRadius: '10px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--infnet-dark-blue)', textTransform: 'uppercase' }}>
            {'Distribuição Softmax no Vocabulário P(x_t | x_{<t})'}
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center' }}>
            {current.candidates.map((c, idx) => (
              <div key={idx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px', fontSize: '12px' }}>
                  <span style={{ fontFamily: 'var(--font-code)', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
                    "{c.token}"
                  </span>
                  <span style={{ fontWeight: 600, color: c.color }}>
                    {c.prob.toFixed(1)}%
                  </span>
                </div>
                <div style={{
                  height: '14px',
                  background: '#E2E8F0',
                  borderRadius: '7px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${c.prob}%`,
                    height: '100%',
                    background: c.color,
                    borderRadius: '7px',
                    transition: 'width 0.4s ease'
                  }} />
                </div>
              </div>
            ))}
          </div>

          <div style={{
            borderTop: '1px solid var(--border-light)',
            paddingTop: '10px',
            fontSize: '11.5px',
            color: 'var(--text-muted)'
          }}>
            <div style={{ fontWeight: 600, color: 'var(--infnet-dark-blue)', marginBottom: '4px' }}>Por que isso importa?</div>
            Toda tarefa de NLP moderna (geração de texto, tradução, código, e até visão como geração de sequências) é formulada como a previsão sequencial do próximo token condicionada ao histórico anterior.
          </div>
        </div>
      </div>
    </div>
  );
}
