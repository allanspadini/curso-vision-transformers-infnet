import React, { useState } from 'react';
import MathView from '../MathView';

export default function PluggableHeadsLab() {
  const [task, setTask] = useState('sentiment');
  const [threshold, setThreshold] = useState(0.5);

  const tasks = {
    sentiment: {
      title: 'Classificação de Sentimento (Sequência Única)',
      input: '[CLS] O novo algoritmo superou todas as metas da equipe! [SEP]',
      tokens: ['[CLS]', 'O', 'novo', 'algoritmo', 'superou', 'todas', 'as', 'metas', 'da', 'equipe', '!', '[SEP]'],
      pooling: 'Vetor h_[CLS] (índice 0) condensa toda a oração',
      headName: 'nn.Linear(in_features=768, out_features=3) + Softmax',
      headDim: 'W ∈ ℝ³ ˣ ⁷⁶⁸, b ∈ ℝ³',
      classes: [
        { name: 'Positivo', prob: 0.94 },
        { name: 'Neutro', prob: 0.04 },
        { name: 'Negativo', prob: 0.02 }
      ],
      color: '#0284C7',
      bg: '#F0F9FF'
    },
    ner: {
      title: 'Reconhecimento de Entidades Nomeadas (Token-Level)',
      input: '[CLS] Alan Turing trabalhou em Bletchley Park [SEP]',
      tokens: ['[CLS]', 'Alan', 'Turing', 'trabalhou', 'em', 'Bletchley', 'Park', '[SEP]'],
      pooling: 'Cada vetor oculto h_i passa independentemente pela mesma cabeça linear',
      headName: 'nn.Linear(in_features=768, out_features=7) + Softmax por token',
      headDim: 'W ∈ ℝ⁷ ˣ ⁷⁶⁸ compartilhado entre todos os tokens',
      tokenPredictions: [
        { tok: 'Alan', tag: 'B-PER', prob: 0.98, color: '#16A34A' },
        { tok: 'Turing', tag: 'I-PER', prob: 0.97, color: '#16A34A' },
        { tok: 'trabalhou', tag: 'O', prob: 0.99, color: '#64748B' },
        { tok: 'em', tag: 'O', prob: 0.99, color: '#64748B' },
        { tok: 'Bletchley', tag: 'B-LOC', prob: 0.95, color: '#9333EA' },
        { tok: 'Park', tag: 'I-LOC', prob: 0.94, color: '#9333EA' }
      ],
      color: '#16A34A',
      bg: '#F0FDF4'
    },
    qa: {
      title: 'Question Answering Extrativo (SQuAD Span)',
      input: '[CLS] Onde nasceu Turing? [SEP] Alan Turing nasceu em Londres no ano de 1912. [SEP]',
      tokens: ['[CLS]', 'Onde', 'nasceu', '?', '[SEP]', 'Alan', 'Turing', 'nasceu', 'em', 'Londres', 'em', '1912', '[SEP]'],
      pooling: 'Dois vetores aprendidos (Start Vector S e End Vector E) realizam produto escalar com cada h_i',
      headName: 's_i = S · h_i,  e_j = E · h_j  (S, E ∈ ℝ⁷⁶⁸)',
      headDim: 'Apenas 2 vetores de 768 parâmetros (Total: 1.536 parâmetros!)',
      spanResult: {
        answer: 'Londres',
        startIdx: 9,
        endIdx: 9,
        startProb: 0.96,
        endProb: 0.97
      },
      color: '#EA580C',
      bg: '#FFF7ED'
    },
    nli: {
      title: 'Par de Sentenças / Inferência Natural (NLI)',
      input: '[CLS] Premissa: Dois cães correm na grama. [SEP] Hipótese: Há animais ao ar livre. [SEP]',
      tokens: ['[CLS]', 'Premissa', '...', '[SEP]', 'Hipótese', '...', '[SEP]'],
      pooling: 'Vetor h_[CLS] condensa o cruzamento de atenção entre Premissa e Hipótese',
      headName: 'nn.Linear(in_features=768, out_features=3) + Softmax',
      headDim: 'W ∈ ℝ³ ˣ ⁷⁶⁸ (Entailment, Contradiction, Neutral)',
      classes: [
        { name: 'Entailment (Implicação)', prob: 0.96 },
        { name: 'Neutral (Neutro)', prob: 0.03 },
        { name: 'Contradiction (Contradição)', prob: 0.01 }
      ],
      color: '#7C3AED',
      bg: '#FAF5FF'
    }
  };

  const current = tasks[task];

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {/* Task Selector Buttons */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '8px'
      }}>
        {[
          { id: 'sentiment', name: '1. Classificação Sentimento', icon: '💬' },
          { id: 'ner', name: '2. Extração Entidades (NER)', icon: '🏷️' },
          { id: 'qa', name: '3. QA Extrativo (SQuAD)', icon: '❓' },
          { id: 'nli', name: '4. Par de Sentenças (NLI)', icon: '⚖️' }
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTask(t.id)}
            style={{
              padding: '8px 10px',
              borderRadius: '8px',
              border: task === t.id ? `2px solid ${tasks[t.id].color}` : '1px solid #CBD5E1',
              background: task === t.id ? tasks[t.id].bg : '#FFFFFF',
              color: task === t.id ? tasks[t.id].color : '#475569',
              fontWeight: 700,
              fontSize: '11px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>{t.icon}</span>
            <span>{t.name}</span>
          </button>
        ))}
      </div>

      {/* Main Interactive Workspace */}
      <div style={{
        flex: 1,
        minHeight: 0,
        background: '#FFFFFF',
        border: '1px solid #E2E8F0',
        borderRadius: '10px',
        padding: '12px',
        display: 'grid',
        gridTemplateColumns: '1.2fr 0.8fr',
        gap: '12px'
      }}>
        {/* Left: Dynamic Backbone + Head Visualization */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          {/* Output Head Connected */}
          <div style={{
            background: current.bg,
            border: `2px solid ${current.color}`,
            borderRadius: '8px',
            padding: '10px',
            position: 'relative'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
              <span style={{ fontSize: '10px', background: current.color, color: '#FFF', padding: '2px 6px', borderRadius: '4px', fontWeight: 800 }}>
                CABEÇA MODULAR CONECTADA AO TOPO
              </span>
              <span style={{ fontSize: '10px', fontFamily: 'var(--font-code)', color: '#475569' }}>
                {current.headDim}
              </span>
            </div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: current.color }}>
              {current.headName}
            </div>
            <div style={{ fontSize: '10.5px', color: '#64748B', marginTop: '2px' }}>
              {current.pooling}
            </div>
          </div>

          {/* Bus Arrow Connection */}
          <div style={{ textAlign: 'center', margin: '4px 0', color: current.color, fontSize: '14px', fontWeight: 'bold' }}>
            ▲ ▲ ▲ Tensores Ocultos Contextuais [Batch, L, 768] ▲ ▲ ▲
          </div>

          {/* Central BERT Encoder Box */}
          <div style={{
            background: 'linear-gradient(135deg, #0A345D 0%, #061F38 100%)',
            border: '2px solid #1BB5D8',
            borderRadius: '8px',
            padding: '12px',
            color: '#FFFFFF',
            textAlign: 'center',
            boxShadow: '0 4px 14px rgba(10, 52, 93, 0.2)'
          }}>
            <div style={{ fontSize: '13px', fontWeight: 800, color: '#64D9EF', letterSpacing: '0.5px' }}>
              BACKBONE BERT PRÉ-TREINADO (110M PARÂMETROS)
            </div>
            <div style={{ fontSize: '10.5px', color: '#CBD5E1', marginTop: '4px' }}>
              12 Camadas de Atenção Bidirecional 360° • Sem máscaras causais • Pesos Universais
            </div>
          </div>

          {/* Input Sequence Strip */}
          <div style={{
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: '8px',
            padding: '8px 10px',
            marginTop: '6px'
          }}>
            <div style={{ fontSize: '10px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '4px' }}>
              Entrada Formatada com Tokens Especiais:
            </div>
            <div style={{ fontSize: '11px', fontFamily: 'var(--font-code)', color: '#0A345D', background: '#FFFFFF', padding: '6px', borderRadius: '4px', border: '1px solid #CBD5E1' }}>
              {current.input}
            </div>
          </div>
        </div>

        {/* Right: Live Interactive Output Inspector */}
        <div style={{
          background: '#F8FAFC',
          border: '1px solid #E2E8F0',
          borderRadius: '8px',
          padding: '12px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--infnet-dark-blue)', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
              Predição em Tempo Real:
            </span>

            {/* If Sentiment or NLI: Bar charts */}
            {current.classes && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {current.classes.map((c, idx) => (
                  <div key={idx}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '2px' }}>
                      <span style={{ fontWeight: 600, color: '#334155' }}>{c.name}</span>
                      <strong style={{ color: idx === 0 ? current.color : '#64748B' }}>
                        {(c.prob * 100).toFixed(1)}%
                      </strong>
                    </div>
                    <div style={{ width: '100%', height: '8px', background: '#E2E8F0', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: `${c.prob * 100}%`, height: '100%', background: idx === 0 ? current.color : '#94A3B8' }}></div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* If NER: Token pills */}
            {current.tokenPredictions && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ fontSize: '10.5px', color: '#64748B', marginBottom: '2px' }}>
                  Tags previstas por subtoken:
                </div>
                {current.tokenPredictions.map((tp, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#FFFFFF', padding: '4px 8px', borderRadius: '4px', border: '1px solid #E2E8F0', fontSize: '11px' }}>
                    <span style={{ fontFamily: 'var(--font-code)', fontWeight: 600 }}>{tp.tok}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ background: tp.color, color: '#FFF', padding: '1px 6px', borderRadius: '3px', fontWeight: 700, fontSize: '10px' }}>
                        {tp.tag}
                      </span>
                      <span style={{ fontSize: '10px', color: '#64748B' }}>{(tp.prob * 100).toFixed(0)}%</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* If QA: Span indicator */}
            {current.spanResult && (
              <div style={{ background: '#FFFFFF', padding: '10px', borderRadius: '6px', border: '1px solid #FED7AA' }}>
                <div style={{ fontSize: '11px', color: '#9A3412', fontWeight: 700, marginBottom: '4px' }}>
                  Trecho Extraído do Contexto:
                </div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#C2410C', fontFamily: 'var(--font-title)' }}>
                  "{current.spanResult.answer}"
                </div>
                <div style={{ fontSize: '10.5px', color: '#475569', marginTop: '6px', lineHeight: 1.4 }}>
                  • Início (Start Logit): Índice {current.spanResult.startIdx} ({(current.spanResult.startProb * 100).toFixed(0)}%)<br />
                  • Término (End Logit): Índice {current.spanResult.endIdx} ({(current.spanResult.endProb * 100).toFixed(0)}%)
                </div>
              </div>
            )}
          </div>

          {/* Key Insight Footer */}
          <div style={{
            background: '#FFFFFF',
            border: '1px solid #CBD5E1',
            borderRadius: '6px',
            padding: '8px',
            fontSize: '10.5px',
            color: '#334155',
            marginTop: '8px'
          }}>
            💡 <strong>Conclusão Técnica:</strong> Note como o <em>mesmo</em> modelo BERT serve para 4 tarefas radicalmente distintas. Mudamos apenas a camada final de projeção e a função de custo!
          </div>
        </div>
      </div>
    </div>
  );
}
