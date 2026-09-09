import React, { useState } from 'react';
import MathView from '../MathView';

export default function NSPInspectorLab() {
  const pairs = [
    {
      id: 0,
      sentA: 'Alan Turing propôs o conceito da máquina universal.',
      sentB: 'Esse modelo teórico definiu os fundamentos da computação moderna.',
      isNext: true,
      probIsNext: 0.985,
      coherenceReason: 'Forte coesão anafórica: "Esse modelo teórico" conecta-se diretamente com "máquina universal".'
    },
    {
      id: 1,
      sentA: 'A arquitetura Transformer dispensou o uso de camadas recorrentes.',
      sentB: 'Os coalas alimentam-se exclusivamente de folhas de eucalipto.',
      isNext: false,
      probIsNext: 0.008,
      coherenceReason: 'Ruptura semântica total: Tópicos pertencem a domínios completamente distintos (IA vs Zoologia).'
    },
    {
      id: 2,
      sentA: 'O cliente solicitou a abertura de uma conta bancária digital.',
      sentB: 'O banco enviou o cartão de crédito e a senha por aplicativo.',
      isNext: true,
      probIsNext: 0.962,
      coherenceReason: 'Continuidade procedimental típica em operações financeiras e de varejo bancário.'
    }
  ];

  const [selectedPair, setSelectedPair] = useState(0);
  const current = pairs[selectedPair];

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {/* Top Sentence Pair Selector */}
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
            Selecione um Par de Sentenças:
          </span>
          {pairs.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => setSelectedPair(idx)}
              style={{
                padding: '4px 12px',
                borderRadius: '6px',
                border: selectedPair === idx ? (p.isNext ? '2px solid #16A34A' : '2px solid #DC2626') : '1px solid #CBD5E1',
                background: selectedPair === idx ? (p.isNext ? '#DCFCE7' : '#FEE2E2') : '#FFFFFF',
                color: selectedPair === idx ? (p.isNext ? '#166534' : '#B91C1C') : '#475569',
                fontWeight: 700,
                fontSize: '11px',
                cursor: 'pointer'
              }}
            >
              Par {idx + 1} ({p.isNext ? 'IsNext' : 'NotNext'})
            </button>
          ))}
        </div>

        <div style={{ fontSize: '11px', color: '#64748B' }}>
          Objetivo: Treinar compreensão de relacionamentos entre múltiplas frases
        </div>
      </div>

      {/* Main Interactive Comparison Grid */}
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
        {/* Left: Input Construction Details */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          {/* Sentence A Box */}
          <div style={{ background: '#EFF6FF', border: '1px solid #BAE6FD', borderRadius: '8px', padding: '8px 12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
              <span style={{ fontSize: '10px', fontWeight: 800, color: '#0369A1' }}>SENTENÇA A (Segment ID = 0)</span>
              <span style={{ fontSize: '10px', color: '#64748B' }}>Tokens 1 a N</span>
            </div>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#0A345D' }}>
              "{current.sentA}"
            </div>
          </div>

          {/* Special Separator Token Tag */}
          <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
            <span style={{ background: '#E0F2FE', color: '#0369A1', border: '1.5px solid #0284C7', padding: '2px 10px', borderRadius: '4px', fontSize: '11px', fontWeight: 800 }}>
              [SEP] (Divisor de Sequências)
            </span>
          </div>

          {/* Sentence B Box */}
          <div style={{
            background: current.isNext ? '#F0FDF4' : '#FEF2F2',
            border: current.isNext ? '1px solid #86EFAC' : '1px solid #FCA5A5',
            borderRadius: '8px',
            padding: '8px 12px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
              <span style={{ fontSize: '10px', fontWeight: 800, color: current.isNext ? '#166534' : '#B91C1C' }}>
                SENTENÇA B (Segment ID = 1)
              </span>
              <span style={{ fontSize: '10px', color: '#64748B' }}>Tokens N+2 a M</span>
            </div>
            <div style={{ fontSize: '12px', fontWeight: 600, color: current.isNext ? '#14532D' : '#991B1B' }}>
              "{current.sentB}"
            </div>
          </div>

          {/* Full Sequence Format */}
          <div style={{ background: '#F8FAFC', padding: '8px 10px', borderRadius: '6px', border: '1px solid #E2E8F0', fontSize: '10px', fontFamily: 'var(--font-code)', color: '#334155' }}>
            Formato: <strong>[CLS]</strong> Sentença A <strong>[SEP]</strong> Sentença B <strong>[SEP]</strong>
          </div>
        </div>

        {/* Right: NSP Classification Output Meter */}
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
            <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--infnet-dark-blue)', textTransform: 'uppercase', marginBottom: '8px' }}>
              Classificador Binário NSP:
            </div>

            {/* IsNext Probability Bar */}
            <div style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '2px' }}>
                <span style={{ fontWeight: 600, color: '#166534' }}>IsNext (Continuação Real):</span>
                <strong style={{ color: '#16A34A' }}>{(current.probIsNext * 100).toFixed(1)}%</strong>
              </div>
              <div style={{ width: '100%', height: '10px', background: '#E2E8F0', borderRadius: '5px', overflow: 'hidden' }}>
                <div style={{ width: `${current.probIsNext * 100}%`, height: '100%', background: '#16A34A' }}></div>
              </div>
            </div>

            {/* NotNext Probability Bar */}
            <div style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '2px' }}>
                <span style={{ fontWeight: 600, color: '#B91C1C' }}>NotNext (Frase Aleatória):</span>
                <strong style={{ color: '#DC2626' }}>{((1 - current.probIsNext) * 100).toFixed(1)}%</strong>
              </div>
              <div style={{ width: '100%', height: '10px', background: '#E2E8F0', borderRadius: '5px', overflow: 'hidden' }}>
                <div style={{ width: `${(1 - current.probIsNext) * 100}%`, height: '100%', background: '#DC2626' }}></div>
              </div>
            </div>

            {/* Reason Explanatory Box */}
            <div style={{ background: '#FFFFFF', padding: '8px 10px', borderRadius: '6px', border: '1px solid #E2E8F0', fontSize: '10.5px' }}>
              <strong style={{ color: current.isNext ? '#16A34A' : '#DC2626', display: 'block', marginBottom: '2px' }}>
                Veredito do Modelo:
              </strong>
              {current.coherenceReason}
            </div>
          </div>

          <div style={{
            background: '#EFF6FF',
            padding: '8px',
            borderRadius: '6px',
            border: '1px solid #BAE6FD',
            fontSize: '10px',
            color: '#0369A1'
          }}>
            📌 <strong>Vetor de Decisão:</strong> Toda essa inferência é calculada com base única e exclusiva no vetor <code>h_[CLS]</code>!
          </div>
        </div>
      </div>
    </div>
  );
}
