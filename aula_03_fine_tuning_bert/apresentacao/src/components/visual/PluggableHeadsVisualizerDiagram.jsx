import React, { useState } from 'react';

export default function PluggableHeadsVisualizerDiagram() {
  const [selectedHead, setSelectedHead] = useState('cls');

  const heads = [
    {
      id: 'cls',
      title: '1. Classificação de Sentença',
      task: 'Análise de Sentimento / Spam / Tópicos',
      inputTensor: 'h_[CLS] ∈ ℝ⁷⁶⁸',
      headStructure: 'Linear(768 ➔ K) + Softmax',
      output: 'Probabilidade de cada classe (Positivo / Negativo / Neutro)',
      color: '#0284C7',
      bgColor: '#F0F9FF',
      borderColor: '#BAE6FD',
      example: '[CLS] Este restaurante superou todas as expectativas! [SEP] ➔ Positivo (99.2%)'
    },
    {
      id: 'token',
      title: '2. Classificação de Tokens (NER)',
      task: 'Extração de Entidades Nomeadas & POS Tagging',
      inputTensor: 'Cada token individual h_i ∈ ℝ⁷⁶⁸',
      headStructure: 'Linear(768 ➔ C) + CrossEntropyLoss(-100)',
      output: 'Rótulo IOB para cada token (B-PER, I-PER, B-ORG, O...)',
      color: '#16A34A',
      bgColor: '#F0FDF4',
      borderColor: '#DCFCE7',
      example: 'Barack (B-PER) Obama (I-PER) discursou em Washington (B-LOC)'
    },
    {
      id: 'qa',
      title: '3. Question Answering Extrativo',
      task: 'SQuAD: Localização de Resposta em Texto',
      inputTensor: 'Todos os tokens do contexto h_i ∈ ℝ⁷⁶⁸',
      headStructure: 'Dois vetores aprendidos: W_start, W_end ∈ ℝ⁷⁶⁸',
      output: 'Índices [start, end] do trecho de resposta no contexto',
      color: '#EA580C',
      bgColor: '#FFF7ED',
      borderColor: '#FFEDD5',
      example: 'Pergunta: Onde fica o Louvre? Contexto: ...em Paris... ➔ Span: [Paris]'
    },
    {
      id: 'pair',
      title: '4. Par de Sentenças (NLI)',
      task: 'Inferência Natural: Entailment vs Contradição',
      inputTensor: 'h_[CLS] do par combinado [CLS] A [SEP] B [SEP]',
      headStructure: 'Linear(768 ➔ 3) + Softmax',
      output: 'Entailment (Implicação) / Contradição / Neutro',
      color: '#7C3AED',
      bgColor: '#FAF5FF',
      borderColor: '#F3E8FF',
      example: 'A: O homem está na praia. B: O homem está ao ar livre. ➔ Implicação'
    }
  ];

  const active = heads.find((h) => h.id === selectedHead);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {/* Selector Tabs */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '8px'
      }}>
        {heads.map((h) => (
          <button
            key={h.id}
            onClick={() => setSelectedHead(h.id)}
            style={{
              padding: '8px 10px',
              borderRadius: '8px',
              border: selectedHead === h.id ? `2px solid ${h.color}` : '1px solid #CBD5E1',
              background: selectedHead === h.id ? h.bgColor : '#FFFFFF',
              color: selectedHead === h.id ? h.color : '#475569',
              fontWeight: 700,
              fontSize: '11.5px',
              textAlign: 'left',
              cursor: 'pointer',
              transition: 'all 0.2s',
              display: 'flex',
              flexDirection: 'column',
              gap: '2px'
            }}
          >
            <span>{h.title}</span>
            <span style={{ fontSize: '9.5px', fontWeight: 500, color: '#64748B' }}>{h.task}</span>
          </button>
        ))}
      </div>

      {/* Main Modular Architecture SVG Diagram */}
      <div style={{
        flex: 1,
        minHeight: 0,
        background: '#FFFFFF',
        border: '1px solid #E2E8F0',
        borderRadius: '10px',
        padding: '12px',
        display: 'grid',
        gridTemplateColumns: '1.3fr 0.7fr',
        gap: '12px'
      }}>
        {/* Left Side: Modular Plug & Socket SVG */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg viewBox="0 0 540 360" style={{ width: '100%', height: '100%' }}>
            <defs>
              <marker id="arrow-plug" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 8 5 L 0 9 z" fill={active.color} />
              </marker>
            </defs>

            {/* PLUGGED HEAD AT THE TOP (SWAPPABLE MODULE) */}
            <g transform="translate(0, 10)">
              {/* Head Body Box */}
              <rect
                x="60"
                y="10"
                width="420"
                height="80"
                rx="10"
                fill={active.bgColor}
                stroke={active.color}
                strokeWidth="3"
              />
              <text x="270" y="38" textAnchor="middle" fill={active.color} fontSize="14" fontWeight="bold">
                CABEÇA CONECTADA: {active.title.toUpperCase()}
              </text>
              <text x="270" y="58" textAnchor="middle" fill="#334155" fontSize="11" fontFamily="var(--font-code)">
                {active.headStructure}
              </text>
              <text x="270" y="75" textAnchor="middle" fill="#64748B" fontSize="10">
                {active.output}
              </text>

              {/* Gold Modular Male/Female Connectors */}
              <rect x="120" y="88" width="24" height="14" rx="2" fill="#F59E0B" stroke="#D97706" />
              <rect x="258" y="88" width="24" height="14" rx="2" fill="#F59E0B" stroke="#D97706" />
              <rect x="396" y="88" width="24" height="14" rx="2" fill="#F59E0B" stroke="#D97706" />
            </g>

            {/* Connecting Bus Line with Signal Arrows */}
            <g transform="translate(0, 10)">
              <line x1="132" y1="140" x2="132" y2="108" stroke={active.color} strokeWidth="2.5" markerEnd="url(#arrow-plug)" />
              <line x1="270" y1="140" x2="270" y2="108" stroke={active.color} strokeWidth="2.5" markerEnd="url(#arrow-plug)" />
              <line x1="408" y1="140" x2="408" y2="108" stroke={active.color} strokeWidth="2.5" markerEnd="url(#arrow-plug)" />

              <text x="270" y="128" textAnchor="middle" fill="#64748B" fontSize="10" fontWeight="600">
                Interface de Tensores Ocultos [B, L, 768]
              </text>
            </g>

            {/* CENTRAL BERT BACKBONE (FIXED FOUNDATION) */}
            <g transform="translate(0, 10)">
              {/* BERT Box */}
              <rect
                x="60"
                y="145"
                width="420"
                height="120"
                rx="12"
                fill="#0A345D"
                stroke="#1BB5D8"
                strokeWidth="2.5"
              />
              <text x="270" y="175" textAnchor="middle" fill="#FFFFFF" fontSize="16" fontWeight="bold">
                BACKBONE BERT PRÉ-TREINADO (CONGELADO OU FINE-TUNING)
              </text>
              <text x="270" y="195" textAnchor="middle" fill="#64D9EF" fontSize="11">
                12 Camadas Transformer Encoder • 12 Attention Heads • H = 768 • 110M Parâmetros
              </text>

              {/* Sub-layers indicator */}
              <rect x="80" y="208" width="380" height="42" rx="6" fill="rgba(255,255,255,0.08)" stroke="rgba(27,181,216,0.3)" />
              <text x="270" y="233" textAnchor="middle" fill="#E2E8F0" fontSize="11" fontFamily="var(--font-code)">
                Self-Attention Bidirecional ➔ LayerNorm ➔ Feed-Forward (MLP 4×) ➔ LayerNorm
              </text>
            </g>

            {/* INPUT TOKENS AT THE BOTTOM */}
            <g transform="translate(0, 10)">
              <line x1="100" y1="300" x2="100" y2="270" stroke="#94A3B8" strokeWidth="1.5" />
              <line x1="185" y1="300" x2="185" y2="270" stroke="#94A3B8" strokeWidth="1.5" />
              <line x1="270" y1="300" x2="270" y2="270" stroke="#94A3B8" strokeWidth="1.5" />
              <line x1="355" y1="300" x2="355" y2="270" stroke="#94A3B8" strokeWidth="1.5" />
              <line x1="440" y1="300" x2="440" y2="270" stroke="#94A3B8" strokeWidth="1.5" />

              <rect x="75" y="300" width="50" height="24" rx="4" fill="#E0F2FE" stroke="#0284C7" />
              <text x="100" y="316" textAnchor="middle" fill="#0369A1" fontSize="10" fontWeight="bold">[CLS]</text>

              <rect x="160" y="300" width="50" height="24" rx="4" fill="#F8FAFC" stroke="#CBD5E1" />
              <text x="185" y="316" textAnchor="middle" fill="#334155" fontSize="10">token_1</text>

              <rect x="245" y="300" width="50" height="24" rx="4" fill="#F8FAFC" stroke="#CBD5E1" />
              <text x="270" y="316" textAnchor="middle" fill="#334155" fontSize="10">token_2</text>

              <rect x="330" y="300" width="50" height="24" rx="4" fill="#F8FAFC" stroke="#CBD5E1" />
              <text x="355" y="316" textAnchor="middle" fill="#334155" fontSize="10">token_3</text>

              <rect x="415" y="300" width="50" height="24" rx="4" fill="#E0F2FE" stroke="#0284C7" />
              <text x="440" y="316" textAnchor="middle" fill="#0369A1" fontSize="10" fontWeight="bold">[SEP]</text>
            </g>
          </svg>
        </div>

        {/* Right Side: Technical Specs of Selected Head */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: active.bgColor,
          border: `1px solid ${active.borderColor}`,
          borderRadius: '8px',
          padding: '12px'
        }}>
          <div>
            <div style={{
              display: 'inline-block',
              padding: '2px 8px',
              borderRadius: '4px',
              background: active.color,
              color: '#FFFFFF',
              fontSize: '10px',
              fontWeight: 700,
              marginBottom: '6px'
            }}>
              MODALIDADE SELECIONADA
            </div>
            <h4 style={{ fontSize: '14px', color: 'var(--infnet-dark-blue)', margin: '0 0 6px 0' }}>
              {active.title}
            </h4>
            <p style={{ fontSize: '11px', color: '#475569', margin: '0 0 10px 0', lineHeight: 1.4 }}>
              <strong>Caso de Uso:</strong> {active.task}
            </p>

            <div style={{ fontSize: '10.5px', color: '#334155', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div>
                <strong>Tensor de Entrada:</strong>
                <div style={{ background: '#FFF', padding: '4px 8px', borderRadius: '4px', border: '1px solid #E2E8F0', marginTop: '2px', fontFamily: 'var(--font-code)' }}>
                  {active.inputTensor}
                </div>
              </div>
              <div>
                <strong>Arquitetura da Cabeça:</strong>
                <div style={{ background: '#FFF', padding: '4px 8px', borderRadius: '4px', border: '1px solid #E2E8F0', marginTop: '2px', fontFamily: 'var(--font-code)' }}>
                  {active.headStructure}
                </div>
              </div>
            </div>
          </div>

          <div style={{
            background: '#FFFFFF',
            border: '1px solid rgba(0,0,0,0.08)',
            borderRadius: '6px',
            padding: '8px',
            fontSize: '10px',
            color: '#1E293B',
            marginTop: '8px'
          }}>
            <strong style={{ color: active.color, display: 'block', marginBottom: '2px' }}>Exemplo Prático:</strong>
            {active.example}
          </div>
        </div>
      </div>
    </div>
  );
}
