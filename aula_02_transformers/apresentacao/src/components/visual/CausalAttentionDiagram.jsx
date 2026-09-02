import React from 'react';
import { Shield, Lock, ArrowRight, EyeOff, CheckCircle, Code } from 'lucide-react';

export default function CausalAttentionDiagram() {
  const TOKENS = ['Tudo', 'o', 'que', 'você', 'precisa', 'é', 'de', 'amor'];

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
          <Shield size={18} color="var(--infnet-cyan)" />
          <span>Causal Masking: Impedindo o Modelo de "Espiar o Futuro"</span>
        </div>
        <span style={{ fontSize: '11.5px', color: 'var(--infnet-dark-blue)', background: '#FFFFFF', padding: '3px 10px', borderRadius: '12px', fontWeight: 600 }}>
          scores.masked_fill(mask == 0, float('-inf'))
        </span>
      </div>

      {/* Main Grid */}
      <div style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '1.2fr 1fr',
        gap: '14px',
        minHeight: 0
      }}>
        {/* Left: Triangular Mask Matrix Table */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-light)',
          borderRadius: '10px',
          padding: '14px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--infnet-dark-blue)', textTransform: 'uppercase' }}>
              Matriz de Atenção Causal Pós-Softmax ($8 × 8$)
            </span>
            <span style={{ fontSize: '10.5px', color: '#15803D', fontWeight: 600 }}>
              Triângulo Superior Bloqueado (0.0)
            </span>
          </div>

          <div style={{
            flex: 1,
            background: '#FFFFFF',
            border: '1px solid var(--border-light)',
            borderRadius: '8px',
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <table style={{ borderCollapse: 'collapse', textAlign: 'center', fontSize: '10px' }}>
              <thead>
                <tr>
                  <th style={{ padding: '3px', color: '#64748B' }}>Pos</th>
                  {TOKENS.map((t, idx) => (
                    <th key={idx} style={{ padding: '3px 5px', color: 'var(--infnet-dark-blue)', fontFamily: 'var(--font-code)', fontSize: '9px' }}>
                      {t.slice(0, 3)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TOKENS.map((qTok, i) => (
                  <tr key={i}>
                    <td style={{ padding: '3px 5px', fontWeight: 700, color: 'var(--infnet-dark-blue)', fontFamily: 'var(--font-code)', fontSize: '9.5px' }}>
                      {i + 1}. {qTok.slice(0, 3)}
                    </td>
                    {TOKENS.map((kTok, j) => {
                      const isFuture = j > i;
                      return (
                        <td
                          key={j}
                          style={{
                            width: '32px',
                            height: '24px',
                            padding: '2px',
                            background: isFuture ? '#FEE2E2' : '#F0FDF4',
                            border: '1px solid #CBD5E1',
                            color: isFuture ? '#B91C1C' : '#15803D',
                            fontWeight: 700,
                            fontSize: '9px',
                            fontFamily: 'var(--font-code)'
                          }}
                        >
                          {isFuture ? '0.0' : (1 / (i + 1)).toFixed(2).replace('0.', '.')}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
            🛡️ Posições em <span style={{ color: '#B91C1C', fontWeight: 700 }}>vermelho (0.0)</span> foram pré-preenchidas com $-∞$ antes do Softmax, garantindo que $\exp(-∞) / ∑ = 0.0$.
          </div>
        </div>

        {/* Right: Technical Explanation & PyTorch Code */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div className="card" style={{ flex: 1 }}>
            <div className="card-header">
              <div className="card-icon-wrapper icon-blue">
                <Lock size={18} />
              </div>
              <div className="card-title">Por Que a Máscara é Obrigatória?</div>
            </div>
            <div className="card-body">
              <ul style={{ paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <li><strong>Geração Autoregressiva:</strong> Durante a inferência, os tokens futuros <em>ainda não foram gerados</em>.</li>
                <li><strong>Treinamento em Paralelo:</strong> Durante o treino, passamos a sequência inteira de uma vez para máxima velocidade na GPU, mas usamos a máscara causal para que o modelo não "trapaceie" olhando a resposta certa à frente.</li>
                <li><strong>Construto em PyTorch:</strong> Criamos uma máscara triangular inferior usando <code>torch.tril(torch.ones(T, T))</code> e registramos no módulo com <code>register_buffer</code>.</li>
              </ul>
            </div>
          </div>

          <div style={{
            background: '#061F38',
            color: '#64D9EF',
            padding: '10px 12px',
            borderRadius: '8px',
            fontFamily: 'var(--font-code)',
            fontSize: '11px',
            lineHeight: '1.4'
          }}>
            <div># Máscara Causal em PyTorch:</div>
            <div style={{ color: '#FCD34D' }}>mask = torch.tril(torch.ones(T, T))</div>
            <div style={{ color: '#FCD34D' }}>scores = scores.masked_fill(mask == 0, -float('inf'))</div>
            <div style={{ color: '#86EFAC' }}>A = torch.softmax(scores, dim=-1) # Zeros no futuro!</div>
          </div>
        </div>
      </div>
    </div>
  );
}
