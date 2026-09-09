import React, { useState } from 'react';
import MathView from '../MathView';

export default function NextSentencePredictionDiagram() {
  const [caseType, setCaseType] = useState('isNext'); // 'isNext' or 'notNext'

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {/* Selector of Example Case */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#F8FAFC',
        border: '1px solid #E2E8F0',
        borderRadius: '8px',
        padding: '6px 14px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
            Exemplo de Treinamento:
          </span>
          <button
            onClick={() => setCaseType('isNext')}
            style={{
              padding: '5px 14px',
              borderRadius: '6px',
              border: caseType === 'isNext' ? '2px solid #16A34A' : '1px solid #CBD5E1',
              background: caseType === 'isNext' ? '#DCFCE7' : '#FFFFFF',
              color: caseType === 'isNext' ? '#15803D' : '#475569',
              fontWeight: 700,
              fontSize: '11.5px',
              cursor: 'pointer'
            }}
          >
            ✓ 50% dos Pares: IsNext (Sequência Real)
          </button>
          <button
            onClick={() => setCaseType('notNext')}
            style={{
              padding: '5px 14px',
              borderRadius: '6px',
              border: caseType === 'notNext' ? '2px solid #DC2626' : '1px solid #CBD5E1',
              background: caseType === 'notNext' ? '#FEE2E2' : '#FFFFFF',
              color: caseType === 'notNext' ? '#B91C1C' : '#475569',
              fontWeight: 700,
              fontSize: '11.5px',
              cursor: 'pointer'
            }}
          >
            ✗ 50% dos Pares: NotNext (Frase Aleatória)
          </button>
        </div>

        <div style={{ fontSize: '11px', color: '#64748B' }}>
          Classificação binária calculada <strong>exclusivamente</strong> sobre o vetor <MathView math="h_{[CLS]}" />
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
        gridTemplateColumns: '1.25fr 0.75fr',
        gap: '14px'
      }}>
        {/* Left Side: SVG Pipeline */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <svg viewBox="0 0 520 300" style={{ width: '100%', height: '100%' }}>
            <defs>
              <marker id="arrow-nsp" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 8 5 L 0 9 z" fill={caseType === 'isNext' ? '#16A34A' : '#DC2626'} />
              </marker>
            </defs>

            {/* TOP: NSP CLASSIFICATION OUTPUT */}
            <rect
              x="30"
              y="15"
              width="200"
              height="55"
              rx="8"
              fill={caseType === 'isNext' ? '#F0FDF4' : '#FEF2F2'}
              stroke={caseType === 'isNext' ? '#16A34A' : '#DC2626'}
              strokeWidth="2.5"
            />
            <text x="130" y="38" textAnchor="middle" fill={caseType === 'isNext' ? '#15803D' : '#B91C1C'} fontSize="14" fontWeight="bold">
              PREDIÇÃO: {caseType === 'isNext' ? 'IsNext (1)' : 'NotNext (0)'}
            </text>
            <text x="130" y="55" textAnchor="middle" fill="#475569" fontSize="10.5">
              {caseType === 'isNext' ? 'Confiança: 98.7% (Continuidade)' : 'Confiança: 99.1% (Sem Relação)'}
            </text>

            {/* Arrow from [CLS] to NSP Head */}
            <line x1="80" y1="120" x2="80" y2="76" stroke={caseType === 'isNext' ? '#16A34A' : '#DC2626'} strokeWidth="2.5" markerEnd="url(#arrow-nsp)" />

            {/* Linear NSP Head Box */}
            <rect x="30" y="115" width="100" height="28" rx="4" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1.5" />
            <text x="80" y="133" textAnchor="middle" fill="#0369A1" fontSize="11" fontWeight="bold">
              W_nsp · h_[CLS]
            </text>

            {/* Inactive Tokens Arrows at Top (Show they are NOT used for NSP) */}
            <line x1="200" y1="150" x2="200" y2="100" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1="330" y1="150" x2="330" y2="100" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1="460" y1="150" x2="460" y2="100" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="3 3" />
            <text x="330" y="90" textAnchor="middle" fill="#94A3B8" fontSize="10">
              (Tokens de palavras h_i são usados pelo MLM, não pelo NSP)
            </text>

            {/* BERT ENCODER BACKBONE */}
            <rect x="20" y="150" width="480" height="60" rx="8" fill="#0A345D" stroke="#1BB5D8" strokeWidth="2" />
            <text x="260" y="185" textAnchor="middle" fill="#FFFFFF" fontSize="14" fontWeight="bold">
              BERT ENCODER (Atenção Bidirecional Cruza Sentença A e Sentença B)
            </text>

            {/* INPUT SENTENCES TOKENS */}
            <g transform="translate(0, 230)">
              {/* [CLS] */}
              <rect x="20" y="0" width="45" height="25" rx="4" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1.5" />
              <text x="42" y="16" textAnchor="middle" fill="#0369A1" fontSize="10" fontWeight="bold">[CLS]</text>

              {/* Sentença A */}
              <rect x="75" y="0" width="180" height="25" rx="4" fill="#EFF6FF" stroke="#93C5FD" />
              <text x="165" y="16" textAnchor="middle" fill="#1E40AF" fontSize="10.5">
                Sentença A: "O homem foi à padaria."
              </text>

              {/* [SEP] */}
              <rect x="265" y="0" width="45" height="25" rx="4" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1.5" />
              <text x="287" y="16" textAnchor="middle" fill="#0369A1" fontSize="10" fontWeight="bold">[SEP]</text>

              {/* Sentença B */}
              <rect
                x="320"
                y="0"
                width="180"
                height="25"
                rx="4"
                fill={caseType === 'isNext' ? '#F0FDF4' : '#FEF2F2'}
                stroke={caseType === 'isNext' ? '#86EFAC' : '#FCA5A5'}
              />
              <text x="410" y="16" textAnchor="middle" fill={caseType === 'isNext' ? '#166534' : '#991B1B'} fontSize="10.5">
                {caseType === 'isNext' ? 'Sentença B: "Comprou 2 pães."' : 'Sentença B: "Pinguins voam."'}
              </text>
            </g>

            {/* Segment IDs indicators */}
            <text x="165" y="275" textAnchor="middle" fill="#0284C7" fontSize="10" fontWeight="600">
              Segment ID: 0 (Sentença A)
            </text>
            <text x="410" y="275" textAnchor="middle" fill={caseType === 'isNext' ? '#16A34A' : '#DC2626'} fontSize="10" fontWeight="600">
              Segment ID: 1 (Sentença B)
            </text>
          </svg>
        </div>

        {/* Right Side: Rigorous Explanation & Loss */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ background: '#F8FAFC', padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--infnet-dark-blue)', display: 'block', marginBottom: '4px' }}>
              Formulaçāo Matemática do NSP:
            </span>
            <MathView math="P(\text{IsNext}) = \text{Softmax}(W_{\text{NSP}} \cdot h_{[CLS]} + b)" />
            <div style={{ marginTop: '8px' }}>
              <MathView math="\mathcal{L}_{\text{NSP}} = - y \log p - (1-y) \log(1-p)" />
            </div>
            <div style={{ fontSize: '10px', color: '#64748B', marginTop: '6px' }}>
              Onde <MathView math="y \in \{0, 1\}" /> indica se a Sentença B realmente sucedia a Sentença A no corpus original.
            </div>
          </div>

          <div style={{ background: '#F0FDF4', padding: '10px 12px', borderRadius: '8px', border: '1px solid #BBF7D0' }}>
            <strong style={{ fontSize: '11px', color: '#166534', display: 'block', marginBottom: '2px' }}>
              🔗 Por que o NSP é Essencial?
            </strong>
            <p style={{ margin: 0, fontSize: '10.5px', color: '#334155', lineHeight: 1.4 }}>
              O MLM ensina o modelo a entender o relacionamento entre palavras <em>dentro</em> de uma frase. O NSP ensina o modelo a compreender a coerência e lógica <em>entre duas frases distintas</em> (fundamental para QA e NLI).
            </p>
          </div>

          <div style={{ background: '#FFFBEB', padding: '8px 10px', borderRadius: '8px', border: '1px solid #FDE68A', fontSize: '10px', color: '#92400E' }}>
            <strong>Nota Histórica (RoBERTa):</strong> Em 2019, o Facebook AI demonstrou que removendo o NSP e treinando com blocos de texto contíguos de 512 tokens completos, o modelo mantinha ou até melhorava a precisão!
          </div>
        </div>
      </div>
    </div>
  );
}
