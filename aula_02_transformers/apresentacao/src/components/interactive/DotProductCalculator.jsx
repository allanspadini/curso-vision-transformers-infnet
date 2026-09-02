import React, { useState, useMemo } from 'react';
import { Calculator, ToggleLeft, ToggleRight, Sparkles, AlertTriangle, CheckCircle, RefreshCw } from 'lucide-react';

export default function DotProductCalculator() {
  const [tokens, setTokens] = useState(['Tudo', 'precisa', 'é', 'amor']);
  const [dk, setDk] = useState(16);
  const [useScale, setUseScale] = useState(true);

  // Deterministic sample vectors for the tokens based on their semantics
  const vectors = useMemo(() => {
    // Generate deterministic vectors of length dk for each token
    const qMat = [];
    const kMat = [];
    const vMat = [];

    tokens.forEach((t, tIdx) => {
      const qRow = [];
      const kRow = [];
      const vRow = [];

      for (let i = 0; i < dk; i++) {
        // semantic pseudo-weights
        const base = Math.sin((tIdx + 1) * (i + 1) * 0.7);
        qRow.push(base * 1.5);
        kRow.push(Math.cos((tIdx + 1) * (i + 1) * 0.7) * 1.5);
        vRow.push(Math.sin((tIdx + 1) * 2 + i) * 1.0);
      }
      qMat.push(qRow);
      kMat.push(kRow);
      vMat.push(vRow);
    });

    // 1. Raw Dot Product Q * K^T
    const rawScores = [];
    for (let i = 0; i < tokens.length; i++) {
      const row = [];
      for (let j = 0; j < tokens.length; j++) {
        let dot = 0;
        for (let d = 0; d < dk; d++) {
          dot += qMat[i][d] * kMat[j][d];
        }
        row.push(dot);
      }
      rawScores.push(row);
    }

    // 2. Scaled Scores
    const scaleFactor = useScale ? Math.sqrt(dk) : 1.0;
    const scaledScores = rawScores.map((row) => row.map((val) => val / scaleFactor));

    // 3. Softmax per row
    const softmaxWeights = scaledScores.map((row) => {
      const maxVal = Math.max(...row);
      const exps = row.map((v) => Math.exp(v - maxVal));
      const sumExps = exps.reduce((a, b) => a + b, 0);
      return exps.map((v) => v / sumExps);
    });

    return { qMat, kMat, vMat, rawScores, scaledScores, softmaxWeights, scaleFactor };
  }, [tokens, dk, useScale]);

  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      fontSize: '13px'
    }}>
      {/* Top Toolbar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '8px',
        background: '#EDF5FA',
        padding: '8px 14px',
        borderRadius: '8px',
        border: '1px solid #D0E3F0'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Calculator size={18} color="var(--infnet-cyan)" />
          <span style={{ fontWeight: 700, color: 'var(--infnet-dark-blue)', fontSize: '13px' }}>
            Laboratório Matemático: Scaled Dot-Product Attention Simulator
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* dk selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--text-muted)' }}>Dimensão $d_k$:</span>
            {[4, 16, 64].map((val) => (
              <button
                key={val}
                onClick={() => setDk(val)}
                style={{
                  background: dk === val ? 'var(--infnet-dark-blue)' : '#FFFFFF',
                  color: dk === val ? '#FFFFFF' : 'var(--infnet-dark-blue)',
                  border: '1px solid #CBD5E1',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  fontSize: '11px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                {val}
              </button>
            ))}
          </div>

          {/* Scale Toggle */}
          <button
            onClick={() => setUseScale((prev) => !prev)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: useScale ? '#F0FDF4' : '#FEF2F2',
              border: `1.5px solid ${useScale ? '#86EFAC' : '#FECACA'}`,
              color: useScale ? '#15803D' : '#B91C1C',
              padding: '3px 10px',
              borderRadius: '6px',
              fontSize: '11.5px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            {useScale ? 'Escala 1/√dk: ATIVADA (÷' + Math.sqrt(dk).toFixed(1) + ')' : 'Escala 1/√dk: DESATIVADA'}
          </button>
        </div>
      </div>

      {/* Main Grid with Matrices */}
      <div style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '12px',
        minHeight: 0
      }}>
        {/* Left: Raw Scores / Scaled Scores */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-light)',
          borderRadius: '10px',
          padding: '12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--infnet-dark-blue)', textTransform: 'uppercase' }}>
              1. Matriz de Scores ({useScale ? 'Scaled: Q Kᵀ / √dk' : 'Raw: Q Kᵀ'})
            </span>
            <span style={{ fontSize: '10.5px', color: '#64748B', fontFamily: 'var(--font-code)' }}>
              dk = {dk}
            </span>
          </div>

          <div style={{
            flex: 1,
            background: '#FFFFFF',
            border: '1px solid var(--border-light)',
            borderRadius: '8px',
            padding: '10px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', fontSize: '12px' }}>
              <thead>
                <tr>
                  <th style={{ padding: '4px', color: '#64748B', fontSize: '10.5px' }}>Q \ K</th>
                  {tokens.map((t, idx) => (
                    <th key={idx} style={{ padding: '4px', color: 'var(--infnet-dark-blue)', fontWeight: 700, fontSize: '11px' }}>
                      "{t}"
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tokens.map((qTok, i) => (
                  <tr key={i} style={{ borderTop: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '6px 4px', fontWeight: 700, color: 'var(--infnet-dark-blue)', fontSize: '11px' }}>
                      "{qTok}"
                    </td>
                    {vectors.scaledScores[i].map((val, j) => {
                      const isHigh = val > 3.0;
                      return (
                        <td
                          key={j}
                          style={{
                            padding: '6px 4px',
                            fontFamily: 'var(--font-code)',
                            fontSize: '11.5px',
                            fontWeight: 600,
                            color: isHigh ? '#B91C1C' : '#0A345D',
                            background: isHigh ? '#FEE2E2' : val > 0 ? '#EFF6FF' : '#F8FAFC'
                          }}
                        >
                          {val.toFixed(2)}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
            {!useScale && dk >= 16 ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#B91C1C', fontWeight: 600 }}>
                <AlertTriangle size={14} />
                <span>Alerta: Valores de produto escalar muito altos (&gt; 10)! Risco de saturação do Softmax.</span>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#15803D' }}>
                <CheckCircle size={14} />
                <span>Scores com variância controlada próxima de 1.0.</span>
              </div>
            )}
          </div>
        </div>

        {/* Right: Softmax Attention Weights */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1.5px solid var(--border-light)',
          borderRadius: '10px',
          padding: '12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--infnet-dark-blue)', textTransform: 'uppercase' }}>
              2. Pesos de Atenção Finais A = Softmax(...)
            </span>
            <span style={{ fontSize: '10.5px', color: '#15803D', fontWeight: 700 }}>
              Soma da linha = 100%
            </span>
          </div>

          <div style={{
            flex: 1,
            background: '#FFFFFF',
            border: '1px solid var(--border-light)',
            borderRadius: '8px',
            padding: '10px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', fontSize: '12px' }}>
              <thead>
                <tr>
                  <th style={{ padding: '4px', color: '#64748B', fontSize: '10.5px' }}>Token i</th>
                  {tokens.map((t, idx) => (
                    <th key={idx} style={{ padding: '4px', color: 'var(--infnet-dark-blue)', fontWeight: 700, fontSize: '11px' }}>
                      "{t}"
                    </th>
                  ))}
                  <th style={{ padding: '4px', color: '#15803D', fontSize: '10px' }}>Σ</th>
                </tr>
              </thead>
              <tbody>
                {tokens.map((qTok, i) => {
                  const rowSum = vectors.softmaxWeights[i].reduce((a, b) => a + b, 0);
                  return (
                    <tr key={i} style={{ borderTop: '1px solid #F1F5F9' }}>
                      <td style={{ padding: '6px 4px', fontWeight: 700, color: 'var(--infnet-dark-blue)', fontSize: '11px' }}>
                        "{qTok}"
                      </td>
                      {vectors.softmaxWeights[i].map((w, j) => {
                        const pct = (w * 100).toFixed(1);
                        const alpha = Math.min(1, Math.max(0.08, w));
                        return (
                          <td
                            key={j}
                            style={{
                              padding: '6px 4px',
                              fontFamily: 'var(--font-code)',
                              fontSize: '11.5px',
                              fontWeight: 700,
                              color: w > 0.4 ? '#FFFFFF' : '#0A345D',
                              background: `rgba(27, 181, 216, ${alpha})`
                            }}
                          >
                            {pct}%
                          </td>
                        );
                      })}
                      <td style={{ padding: '6px 4px', fontFamily: 'var(--font-code)', fontSize: '10.5px', color: '#15803D', fontWeight: 700 }}>
                        {(rowSum * 100).toFixed(0)}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div style={{
            fontSize: '11px',
            color: 'var(--infnet-dark-blue)',
            background: '#EDF5FA',
            padding: '6px 10px',
            borderRadius: '6px'
          }}>
            💡 <strong>Conclusão:</strong> Sem a escala $√d_k$, com $d_k=64$, o Softmax vira quase uma função degrau (0% / 100%), matando os gradientes de todas as outras posições durante o treino!
          </div>
        </div>
      </div>
    </div>
  );
}
