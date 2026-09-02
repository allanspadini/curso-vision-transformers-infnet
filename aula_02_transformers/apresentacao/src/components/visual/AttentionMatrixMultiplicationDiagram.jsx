import React, { useState } from 'react';
import { Sparkles, Calculator, CheckCircle2, ArrowRight } from 'lucide-react';
import MathView from '../MathView';

export default function AttentionMatrixMultiplicationDiagram() {
  const [selectedRow, setSelectedRow] = useState(null);

  const tokens = ['YOUR', 'CAT', 'IS', 'A', 'LOVELY', 'CAT'];

  const matrixData = [
    { token: 'YOUR', values: [0.23899, 0.11911, 0.13134, 0.15092, 0.18093, 0.15593] },
    { token: 'CAT', values: [0.14242, 0.27829, 0.20799, 0.12935, 0.15534, 0.11192] },
    { token: 'IS', values: [0.14470, 0.13211, 0.26622, 0.21902, 0.21874, 0.12503] },
    { token: 'A', values: [0.14660, 0.12899, 0.20684, 0.21314, 0.11814, 0.19724] },
    { token: 'LOVELY', values: [0.21000, 0.15794, 0.15712, 0.14537, 0.27277, 0.17407] },
    { token: 'CAT', values: [0.19559, 0.01144, 0.20309, 0.10455, 0.18342, 0.30191] }
  ];

  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      fontSize: '12px'
    }}>
      {/* Top Banner */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#EDF5FA',
        padding: '6px 16px',
        borderRadius: '8px',
        border: '1px solid #D0E3F0',
        flexShrink: 0
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
          <Calculator size={18} color="var(--infnet-cyan)" />
          <span>A Mecânica do Scaled Dot-Product: Dimensões e Matriz de Atenção (6 × 6)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            fontSize: '11px',
            background: '#FFFFFF',
            padding: '3px 10px',
            borderRadius: '12px',
            fontWeight: 700,
            color: '#0A345D',
            border: '1px solid #CBD5E1',
            fontFamily: 'var(--font-code)'
          }}>
            T = 6 tokens | d_k = 512
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{
        flex: 1,
        background: '#FFFFFF',
        border: '1px solid var(--border-light)',
        borderRadius: '10px',
        padding: '12px 16px',
        display: 'grid',
        gridTemplateColumns: '1fr 1.35fr',
        gap: '20px',
        alignItems: 'center',
        boxShadow: 'var(--shadow-sm)',
        minHeight: 0
      }}>
        {/* Left Column: Mathematical Formulation & Dimension Boxes */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '14px',
          height: '100%'
        }}>
          {/* Main Canonical Equation */}
          <div style={{
            background: '#F8FAFC',
            padding: '10px 14px',
            borderRadius: '8px',
            border: '1px solid #E2E8F0',
            textAlign: 'center'
          }}>
            <MathView
              math="\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{Q K^T}{\sqrt{d_k}}\right) V"
              block
            />
          </div>

          {/* Matrix Dimension Visualization: softmax((Q x K^T) / sqrt(512)) */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}>
            {/* Softmax label */}
            <span style={{
              fontSize: '16px',
              fontWeight: 700,
              color: '#0A345D',
              fontFamily: 'var(--font-code)'
            }}>
              softmax
            </span>

            {/* Left Big Bracket */}
            <div style={{
              fontSize: '68px',
              fontWeight: 200,
              color: '#0A345D',
              lineHeight: 1,
              userSelect: 'none'
            }}>
              (
            </div>

            {/* Fraction (Numerator & Denominator) */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px'
            }}>
              {/* Numerator: Q x K^T */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {/* Q Box */}
                <div style={{
                  border: '2px solid #0284C7',
                  background: '#F0F9FF',
                  borderRadius: '6px',
                  padding: '8px 14px',
                  textAlign: 'center',
                  boxShadow: 'var(--shadow-sm)'
                }}>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: '#0369A1', fontStyle: 'italic' }}>Q</div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#475569', fontFamily: 'var(--font-code)' }}>(6, 512)</div>
                </div>

                <span style={{ fontSize: '18px', fontWeight: 700, color: '#64748B' }}>×</span>

                {/* K^T Box */}
                <div style={{
                  border: '2px solid #0284C7',
                  background: '#F0F9FF',
                  borderRadius: '6px',
                  padding: '8px 14px',
                  textAlign: 'center',
                  boxShadow: 'var(--shadow-sm)'
                }}>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: '#0369A1', fontStyle: 'italic' }}>Kᵀ</div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#475569', fontFamily: 'var(--font-code)' }}>(512, 6)</div>
                </div>
              </div>

              {/* Fraction Divider Line */}
              <div style={{ width: '100%', height: '2.5px', background: '#0A345D', borderRadius: '2px' }} />

              {/* Denominator: sqrt(512) */}
              <div style={{
                fontSize: '14px',
                fontWeight: 700,
                color: '#0A345D',
                fontFamily: 'var(--font-code)'
              }}>
                √512 ≈ 22.63
              </div>
            </div>

            {/* Right Big Bracket */}
            <div style={{
              fontSize: '68px',
              fontWeight: 200,
              color: '#0A345D',
              lineHeight: 1,
              userSelect: 'none'
            }}>
              )
            </div>

            {/* Equals Sign */}
            <span style={{
              fontSize: '26px',
              fontWeight: 800,
              color: '#0A345D',
              marginLeft: '4px'
            }}>
              =
            </span>
          </div>

          {/* Explanation Callout */}
          <div style={{
            background: '#F1F5F9',
            border: '1px solid #CBD5E1',
            borderRadius: '6px',
            padding: '8px 12px',
            fontSize: '11px',
            color: '#334155',
            lineHeight: 1.4
          }}>
            <strong style={{ color: '#0A345D' }}>Por que o resultado é [6, 6]?</strong>
            <br />
            Ao multiplicar a matriz de Queries <code style={{ color: '#0369A1' }}>[6 × 512]</code> pela transposta de Keys <code style={{ color: '#0369A1' }}>[512 × 6]</code>, a dimensão interna 512 é eliminada, gerando os scores de afinidade entre todas as 6 palavras com todas as 6 palavras!
          </div>
        </div>

        {/* Right Column: The (6, 6) Attention Matrix Table */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: '100%',
          justifyContent: 'center'
        }}>
          {/* Dimension Tag [6, 6] */}
          <div style={{
            marginBottom: '4px',
            border: '2px solid #E11D48',
            background: '#FFE4E6',
            color: '#BE123C',
            fontWeight: 800,
            fontSize: '12px',
            padding: '2px 14px',
            borderRadius: '4px',
            fontFamily: 'var(--font-code)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            [6, 6]
          </div>

          {/* Matrix Table Container */}
          <div style={{
            width: '100%',
            overflowX: 'auto',
            border: '1px solid #0A345D',
            borderRadius: '6px',
            overflow: 'hidden'
          }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              textAlign: 'center',
              fontFamily: 'var(--font-code)',
              fontSize: '10px'
            }}>
              <thead>
                <tr style={{ background: '#0A345D', color: '#FFFFFF' }}>
                  <th style={{ padding: '6px 4px', borderRight: '1px solid #1E40AF', fontSize: '9px' }}>Q \ K</th>
                  {tokens.map((t, idx) => (
                    <th key={idx} style={{ padding: '6px 2px', borderRight: '1px solid #1E40AF', fontSize: '9.5px', fontWeight: 700 }}>
                      {t}
                    </th>
                  ))}
                  <th style={{ padding: '6px 4px', background: '#3B82F6', color: '#FFFFFF', fontSize: '11px', fontWeight: 800 }}>
                    Σ
                  </th>
                </tr>
              </thead>
              <tbody>
                {matrixData.map((row, rIdx) => {
                  const isHovered = selectedRow === rIdx;
                  return (
                    <tr
                      key={rIdx}
                      onMouseEnter={() => setSelectedRow(rIdx)}
                      onMouseLeave={() => setSelectedRow(null)}
                      style={{
                        background: isHovered ? '#E0F2FE' : (rIdx % 2 === 0 ? '#F8FAFC' : '#FFFFFF'),
                        borderBottom: '1px solid #E2E8F0',
                        cursor: 'pointer',
                        transition: 'background 0.15s ease'
                      }}
                    >
                      {/* Row Header (Query Token) */}
                      <td style={{
                        background: isHovered ? '#0284C7' : '#0A345D',
                        color: '#FFFFFF',
                        fontWeight: 800,
                        padding: '5px 4px',
                        borderRight: '1px solid #CBD5E1',
                        fontSize: '9.5px'
                      }}>
                        {row.token}
                      </td>

                      {/* Values */}
                      {row.values.map((val, cIdx) => {
                        const isHigh = val > 0.24;
                        return (
                          <td
                            key={cIdx}
                            style={{
                              padding: '5px 2px',
                              borderRight: '1px solid #E2E8F0',
                              color: isHigh ? '#0369A1' : '#334155',
                              fontWeight: isHigh ? 800 : (isHovered ? 600 : 400),
                              background: isHigh ? '#BAE6FD' : 'transparent'
                            }}
                          >
                            {val.toFixed(5)}
                          </td>
                        );
                      })}

                      {/* Row Sum Column */}
                      <td style={{
                        padding: '5px 4px',
                        background: isHovered ? '#93C5FD' : '#DBEAFE',
                        color: '#1E40AF',
                        fontWeight: 800,
                        fontSize: '10.5px'
                      }}>
                        1
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Bottom Caption */}
          <div style={{
            marginTop: '6px',
            fontSize: '10.5px',
            color: '#64748B',
            textAlign: 'center'
          }}>
            Cada linha representa uma distribuição de probabilidade <strong style={{ color: '#0A345D' }}>Softmax</strong> (soma = 1) indicando quanto cada palavra atende às demais.
          </div>
        </div>
      </div>
    </div>
  );
}
