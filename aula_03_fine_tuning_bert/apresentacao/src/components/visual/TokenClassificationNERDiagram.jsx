import React from 'react';
import MathView from '../MathView';

export default function TokenClassificationNERDiagram() {
  const tokens = [
    { subword: '[CLS]', word: '-', tag: 'IGNORE', id: -100, isSub: false },
    { subword: 'Steve', word: 'Steve', tag: 'B-PER', id: 1, isSub: false },
    { subword: 'Jobs', word: 'Jobs', tag: 'I-PER', id: 2, isSub: false },
    { subword: 'fundou', word: 'fundou', tag: 'O', id: 0, isSub: false },
    { subword: 'a', word: 'a', tag: 'O', id: 0, isSub: false },
    { subword: 'Apple', word: 'Apple', tag: 'B-ORG', id: 3, isSub: false },
    { subword: 'em', word: 'em', tag: 'O', id: 0, isSub: false },
    { subword: 'Cu', word: 'Cupertino', tag: 'B-LOC', id: 4, isSub: false },
    { subword: '##pert', word: 'Cupertino', tag: 'IGNORE', id: -100, isSub: true },
    { subword: '##ino', word: 'Cupertino', tag: 'IGNORE', id: -100, isSub: true },
    { subword: '[SEP]', word: '-', tag: 'IGNORE', id: -100, isSub: false },
  ];

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {/* Top Banner */}
      <div style={{
        background: '#EFF6FF',
        border: '1px solid #BFDBFE',
        borderRadius: '8px',
        padding: '8px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
            O Desafio de Engenharia do NER com WordPiece:
          </span>
          <span style={{ fontSize: '12px', color: '#1E40AF' }}>
            A Máscara do Rótulo Especial <code>-100</code> no PyTorch
          </span>
        </div>
        <div style={{ fontSize: '11px', color: '#0369A1', fontWeight: 600 }}>
          nn.CrossEntropyLoss(ignore_index=-100)
        </div>
      </div>

      {/* Main Interactive Matrix Table */}
      <div style={{
        flex: 1,
        minHeight: 0,
        background: '#FFFFFF',
        border: '1px solid #E2E8F0',
        borderRadius: '10px',
        padding: '14px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>
        {/* Table of Subwords, Vectors, and NER Heads */}
        <div style={{ overflowX: 'auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(11, 1fr)', gap: '6px' }}>
            {tokens.map((t, idx) => {
              const isMasked = t.id === -100;
              const isSub = t.isSub;
              return (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  {/* Top: Output Entity Tag */}
                  <div
                    style={{
                      width: '100%',
                      padding: '6px 2px',
                      borderRadius: '6px',
                      textAlign: 'center',
                      fontSize: '11px',
                      fontWeight: 800,
                      background: isMasked
                        ? '#F1F5F9'
                        : t.tag.includes('PER')
                        ? '#DCFCE7'
                        : t.tag.includes('ORG')
                        ? '#FEF3C7'
                        : t.tag.includes('LOC')
                        ? '#FCE7F3'
                        : '#EFF6FF',
                      color: isMasked
                        ? '#94A3B8'
                        : t.tag.includes('PER')
                        ? '#166534'
                        : t.tag.includes('ORG')
                        ? '#92400E'
                        : t.tag.includes('LOC')
                        ? '#9D174D'
                        : '#1E40AF',
                      border: isMasked ? '1px dashed #CBD5E1' : '1.5px solid currentColor'
                    }}
                  >
                    {t.tag}
                  </div>

                  {/* Arrow */}
                  <div style={{ fontSize: '12px', color: isMasked ? '#CBD5E1' : '#0284C7' }}>↑</div>

                  {/* Vector h_i Box */}
                  <div
                    style={{
                      width: '100%',
                      padding: '4px 2px',
                      borderRadius: '4px',
                      textAlign: 'center',
                      fontSize: '9.5px',
                      fontFamily: 'var(--font-code)',
                      background: '#0A345D',
                      color: '#FFFFFF',
                      border: '1px solid #1BB5D8'
                    }}
                  >
                    h_{idx}
                  </div>

                  {/* Arrow */}
                  <div style={{ fontSize: '12px', color: '#94A3B8' }}>↑</div>

                  {/* Subword Token Box */}
                  <div
                    style={{
                      width: '100%',
                      padding: '6px 2px',
                      borderRadius: '6px',
                      textAlign: 'center',
                      fontSize: '10.5px',
                      fontWeight: 600,
                      fontFamily: 'var(--font-code)',
                      background: isSub ? '#FEE2E2' : '#F8FAFC',
                      border: isSub ? '1.5px solid #EF4444' : '1px solid #CBD5E1',
                      color: isSub ? '#DC2626' : '#1E293B'
                    }}
                  >
                    {t.subword}
                  </div>

                  {/* Label ID row */}
                  <div
                    style={{
                      fontSize: '9px',
                      fontFamily: 'var(--font-code)',
                      color: isMasked ? '#EF4444' : '#16A34A',
                      fontWeight: 700
                    }}
                  >
                    y = {t.id}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Explanatory Row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 0.8fr',
          gap: '12px',
          background: '#F8FAFC',
          borderRadius: '8px',
          padding: '10px 14px',
          border: '1px solid #E2E8F0'
        }}>
          <div>
            <span style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--infnet-dark-blue)', display: 'block', marginBottom: '4px' }}>
              Por que usar y = -100 nas Subwords seguintes?
            </span>
            <p style={{ margin: 0, fontSize: '11px', color: '#475569', lineHeight: 1.4 }}>
              A palavra <strong>"Cupertino"</strong> foi fragmentada pelo tokenizer WordPiece em 3 pedaços: <code>["Cu", "##pert", "##ino"]</code>. Se atribuíssemos <code>B-LOC</code> a todos os 3 pedaços, o modelo preveria 3 cidades separadas. Ao rotular apenas a 1ª subword com <code>B-LOC</code> e as subsequentes com <code>-100</code>, o gradiente não é computado nos fragmentos e a entidade é preservada como uma unidade inteira!
            </p>
          </div>

          <div style={{ background: '#FFFFFF', padding: '8px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '10.5px' }}>
            <span style={{ fontWeight: 700, color: '#0284C7', display: 'block', marginBottom: '2px' }}>
              Tensor de Saída PyTorch:
            </span>
            <div style={{ fontFamily: 'var(--font-code)', color: '#334155' }}>
              logits = Linear(768, num_tags=9)(h)<br />
              Shape: <strong>[Batch, SeqLen=11, num_tags=9]</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
