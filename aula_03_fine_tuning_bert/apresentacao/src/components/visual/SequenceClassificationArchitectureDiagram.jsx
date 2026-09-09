import React, { useState } from 'react';
import MathView from '../MathView';

export default function SequenceClassificationArchitectureDiagram() {
  const [selectedExample, setSelectedExample] = useState(0);

  const examples = [
    {
      text: 'O serviço de atendimento ao cliente resolveu meu problema em minutos!',
      tokens: ['[CLS]', 'O', 'serviço', 'de', 'atendimento', 'resolveu', 'meu', 'problema', '[SEP]'],
      label: 'Positivo',
      confidence: '98.8%',
      color: '#16A34A',
      probs: [0.988, 0.008, 0.004]
    },
    {
      text: 'A entrega atrasou duas semanas e o produto chegou com avaria grave.',
      tokens: ['[CLS]', 'A', 'entrega', 'atrasou', 'duas', 'semanas', 'e', 'chegou', 'avariado', '[SEP]'],
      label: 'Negativo',
      confidence: '99.4%',
      color: '#DC2626',
      probs: [0.003, 0.003, 0.994]
    }
  ];

  const current = examples[selectedExample];

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {/* Sample Selector */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#F8FAFC',
        border: '1px solid #E2E8F0',
        borderRadius: '8px',
        padding: '6px 14px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
            Exemplo de Avaliação de Mercado:
          </span>
          {examples.map((ex, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedExample(idx)}
              style={{
                padding: '4px 12px',
                borderRadius: '6px',
                border: selectedExample === idx ? `2px solid ${ex.color}` : '1px solid #CBD5E1',
                background: selectedExample === idx ? (idx === 0 ? '#DCFCE7' : '#FEE2E2') : '#FFFFFF',
                color: selectedExample === idx ? ex.color : '#475569',
                fontWeight: 700,
                fontSize: '11px',
                cursor: 'pointer'
              }}
            >
              Avaliação {idx + 1} ({ex.label})
            </button>
          ))}
        </div>

        <div style={{ fontSize: '11px', color: '#64748B' }}>
          Mapeamento canônico: <strong>h_[CLS] ➔ Dropout ➔ Linear(768, K) ➔ Softmax</strong>
        </div>
      </div>

      {/* Main Flow SVG & Tensor Tracker */}
      <div style={{
        flex: 1,
        minHeight: 0,
        background: '#FFFFFF',
        border: '1px solid #E2E8F0',
        borderRadius: '10px',
        padding: '12px',
        display: 'grid',
        gridTemplateColumns: '1.25fr 0.75fr',
        gap: '12px'
      }}>
        {/* Left Side: SVG Tensor Pipeline */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <svg viewBox="0 0 520 310" style={{ width: '100%', height: '100%' }}>
            <defs>
              <marker id="arrow-seq" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 8 5 L 0 9 z" fill="#0284C7" />
              </marker>
            </defs>

            {/* TOP: CLASSIFICATION PROBABILITIES */}
            <rect x="25" y="10" width="220" height="55" rx="8" fill="#F0F9FF" stroke="#0284C7" strokeWidth="2" />
            <text x="135" y="32" textAnchor="middle" fill="#0369A1" fontSize="13" fontWeight="bold">
              PREDIÇÃO: {current.label} ({current.confidence})
            </text>
            <text x="135" y="50" textAnchor="middle" fill="#475569" fontSize="10.5">
              Softmax(z) ➔ Distribuição sobre K=3 classes
            </text>

            {/* Arrow from Classifier Head */}
            <line x1="135" y1="90" x2="135" y2="70" stroke="#0284C7" strokeWidth="2" markerEnd="url(#arrow-seq)" />

            {/* Linear Classification Head */}
            <rect x="50" y="90" width="170" height="35" rx="6" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="1.5" />
            <text x="135" y="108" textAnchor="middle" fill="#1D4ED8" fontSize="11" fontWeight="bold">
              nn.Linear(768, num_labels=3)
            </text>
            <text x="135" y="120" textAnchor="middle" fill="#64748B" fontSize="9.5">
              + Dropout(p=0.1)
            </text>

            {/* Arrow from [CLS] to Head */}
            <line x1="80" y1="150" x2="80" y2="130" stroke="#0284C7" strokeWidth="2.5" markerEnd="url(#arrow-seq)" />

            {/* Arrow pooling badge */}
            <rect x="180" y="130" width="160" height="20" rx="4" fill="#FEF3C7" stroke="#F59E0B" />
            <text x="260" y="144" textAnchor="middle" fill="#92400E" fontSize="10" fontWeight="bold">
              Pooling: apenas o índice [:, 0, :]
            </text>

            {/* Discarded Word Token Arrows at Top */}
            <line x1="200" y1="150" x2="200" y2="120" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="320" y1="150" x2="320" y2="120" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="440" y1="150" x2="440" y2="120" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="3 3" />

            {/* BERT BACKBONE */}
            <rect x="20" y="150" width="480" height="70" rx="8" fill="#0A345D" stroke="#1BB5D8" strokeWidth="2" />
            <text x="260" y="180" textAnchor="middle" fill="#FFFFFF" fontSize="14" fontWeight="bold">
              BERT ENCODER (AutoModelForSequenceClassification)
            </text>
            <text x="260" y="202" textAnchor="middle" fill="#64D9EF" fontSize="11">
              Todos os tokens comunicam-se bidirecionalmente • Vetor [CLS] condensa o sentido global
            </text>

            {/* Bottom: Sequence Tokens */}
            <g transform="translate(0, 245)">
              <rect x="20" y="0" width="48" height="26" rx="4" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2" />
              <text x="44" y="17" textAnchor="middle" fill="#0369A1" fontSize="11" fontWeight="bold">[CLS]</text>

              <rect x="75" y="0" width="375" height="26" rx="4" fill="#F8FAFC" stroke="#CBD5E1" />
              <text x="262" y="17" textAnchor="middle" fill="#334155" fontSize="11">
                "{current.text.slice(0, 52)}..."
              </text>

              <rect x="455" y="0" width="45" height="26" rx="4" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2" />
              <text x="477" y="17" textAnchor="middle" fill="#0369A1" fontSize="11" fontWeight="bold">[SEP]</text>
            </g>
          </svg>
        </div>

        {/* Right Side: Tensor Shapes & PyTorch Code */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          {/* Tensor Dimensions */}
          <div style={{ background: '#F8FAFC', padding: '10px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--infnet-dark-blue)', display: 'block', marginBottom: '4px' }}>
              Rastreamento de Tensores PyTorch:
            </span>
            <div style={{ fontSize: '10.5px', fontFamily: 'var(--font-code)', color: '#334155', lineHeight: 1.5 }}>
              <div>• <code>input_ids</code>: [Batch, SeqLen=128]</div>
              <div>• <code>attention_mask</code>: [Batch, SeqLen=128]</div>
              <div>• <code>last_hidden_state</code>: [Batch, SeqLen, 768]</div>
              <div>• <code>cls_rep = h[:, 0, :]</code>: [Batch, 768]</div>
              <div>• <code>logits = W(cls_rep)</code>: [Batch, num_classes=3]</div>
            </div>
          </div>

          {/* Probabilities Output Card */}
          <div style={{ background: '#F0FDF4', padding: '10px', borderRadius: '8px', border: '1px solid #BBF7D0' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#166534', display: 'block', marginBottom: '6px' }}>
              Distribuição Softmax Prevista:
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Positivo:</span>
                <strong>{(current.probs[0] * 100).toFixed(1)}%</strong>
              </div>
              <div style={{ width: '100%', height: '6px', background: '#DCFCE7', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: `${current.probs[0] * 100}%`, height: '100%', background: '#16A34A' }}></div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Neutro:</span>
                <strong>{(current.probs[1] * 100).toFixed(1)}%</strong>
              </div>
              <div style={{ width: '100%', height: '6px', background: '#FEF3C7', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: `${current.probs[1] * 100}%`, height: '100%', background: '#F59E0B' }}></div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Negativo:</span>
                <strong>{(current.probs[2] * 100).toFixed(1)}%</strong>
              </div>
              <div style={{ width: '100%', height: '6px', background: '#FEE2E2', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: `${current.probs[2] * 100}%`, height: '100%', background: '#DC2626' }}></div>
              </div>
            </div>
          </div>

          {/* Loss function */}
          <div style={{ background: '#EFF6FF', padding: '8px 10px', borderRadius: '6px', border: '1px solid #BAE6FD', fontSize: '10px', color: '#0369A1' }}>
            <strong>Função de Perda no Treino:</strong> <MathView math="\mathcal{L} = \text{CrossEntropyLoss}(\text{logits}, y)" />
          </div>
        </div>
      </div>
    </div>
  );
}
