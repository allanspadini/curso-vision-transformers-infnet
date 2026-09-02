import React, { useState } from 'react';
import { Compass, Shuffle, Sparkles, Plus, CheckCircle, Activity } from 'lucide-react';

export default function PositionalEncodingDiagram() {
  const [showWaves, setShowWaves] = useState(true);

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
          <Compass size={18} color="var(--infnet-cyan)" />
          <span>Embeddings de Posição: Por Que a Atenção Precisa de Senso de Ordem?</span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setShowWaves((prev) => !prev)}
            style={{
              padding: '4px 12px',
              borderRadius: '6px',
              border: 'none',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              background: 'var(--infnet-dark-blue)',
              color: '#FFFFFF',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            {showWaves ? 'Ver Fórmula Senoidal' : 'Ver Esquema de Soma'}
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '1.3fr 1fr',
        gap: '14px',
        minHeight: 0
      }}>
        {/* Left Visual Area */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-light)',
          borderRadius: '10px',
          padding: '14px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative'
        }}>
          {showWaves ? (
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--infnet-dark-blue)', textTransform: 'uppercase' }}>
                Ondas Senoidais em Múltiplas Frequências (Vaswani et al., 2017)
              </div>

              {/* Sine / Cosine Wave Visualizer */}
              <svg viewBox="0 0 450 170" style={{ width: '100%', height: '150px', background: '#FFFFFF', borderRadius: '8px', border: '1px solid #CBD5E1' }}>
                {/* Axes */}
                <line x1="30" y1="85" x2="430" y2="85" stroke="#E2E8F0" strokeWidth="1.5" />
                <line x1="30" y1="15" x2="30" y2="155" stroke="#CBD5E1" strokeWidth="1.5" />
                <text x="30" y="12" fontSize="8" fill="#64748B" textAnchor="middle">+1</text>
                <text x="30" y="165" fontSize="8" fill="#64748B" textAnchor="middle">-1</text>
                <text x="430" y="98" fontSize="8" fill="#64748B">Posição (pos)</text>

                {/* High frequency wave (dimension 0: sin) */}
                <path
                  d="M 30 85 Q 55 15 80 85 T 130 85 T 180 85 T 230 85 T 280 85 T 330 85 T 380 85 T 430 85"
                  fill="none"
                  stroke="#1BB5D8"
                  strokeWidth="2.5"
                />
                <text x="410" y="35" fontSize="8" fill="#0284C7" fontWeight="700">Dim 0 (Alta Freq)</text>

                {/* Medium frequency wave (dimension 128: sin) */}
                <path
                  d="M 30 85 Q 105 25 180 85 T 330 85 T 430 85"
                  fill="none"
                  stroke="#7CB342"
                  strokeWidth="2"
                />
                <text x="390" y="65" fontSize="8" fill="#15803D" fontWeight="700">Dim 128 (Média)</text>

                {/* Low frequency wave (dimension 512: sin) */}
                <path
                  d="M 30 85 Q 230 35 430 85"
                  fill="none"
                  stroke="#FF7043"
                  strokeWidth="2"
                />
                <text x="370" y="145" fontSize="8" fill="#D84315" fontWeight="700">Dim 512 (Baixa Freq)</text>
              </svg>

              <div style={{
                background: '#FFFFFF',
                padding: '8px 12px',
                borderRadius: '6px',
                border: '1px solid #D0E3F0',
                fontSize: '11px',
                fontFamily: 'var(--font-code)',
                color: 'var(--infnet-dark-blue)'
              }}>
                <div>PE(pos, 2i)   = sin(pos / 10000^(2i / d_model))</div>
                <div>PE(pos, 2i+1) = cos(pos / 10000^(2i / d_model))</div>
              </div>
            </div>
          ) : (
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--infnet-dark-blue)', textTransform: 'uppercase' }}>
                Combinação Aditiva de Vetores
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                padding: '16px',
                background: '#FFFFFF',
                borderRadius: '8px',
                border: '1px solid #D0E3F0'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Token Embedding</div>
                  <div style={{
                    background: '#EDF5FA',
                    border: '1.5px solid var(--infnet-cyan)',
                    padding: '8px 14px',
                    borderRadius: '6px',
                    fontWeight: 700,
                    fontFamily: 'var(--font-code)',
                    color: 'var(--infnet-dark-blue)'
                  }}>
                    E("amor")
                  </div>
                  <div style={{ fontSize: '9px', color: '#64748B', marginTop: '4px' }}>[d_model]</div>
                </div>

                <Plus size={20} color="var(--infnet-cyan)" />

                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Positional Embedding</div>
                  <div style={{
                    background: '#F0FDF4',
                    border: '1.5px solid #86EFAC',
                    padding: '8px 14px',
                    borderRadius: '6px',
                    fontWeight: 700,
                    fontFamily: 'var(--font-code)',
                    color: '#15803D'
                  }}>
                    P(posição 7)
                  </div>
                  <div style={{ fontSize: '9px', color: '#64748B', marginTop: '4px' }}>[d_model]</div>
                </div>

                <div style={{ fontWeight: 700, fontSize: '16px', color: 'var(--infnet-dark-blue)' }}>=</div>

                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Entrada do Transformer</div>
                  <div style={{
                    background: 'linear-gradient(135deg, #0A345D 0%, #061F38 100%)',
                    border: '1.5px solid var(--infnet-cyan-light)',
                    padding: '8px 14px',
                    borderRadius: '6px',
                    fontWeight: 700,
                    fontFamily: 'var(--font-code)',
                    color: '#FFFFFF'
                  }}>
                    X = E + P
                  </div>
                  <div style={{ fontSize: '9px', color: '#64D9EF', marginTop: '4px' }}>[d_model]</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Explanation */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div className="card" style={{ flex: 1 }}>
            <div className="card-header">
              <div className="card-icon-wrapper icon-purple">
                <Shuffle size={18} />
              </div>
              <div className="card-title">O Paradoxo do "Saco de Tokens"</div>
            </div>
            <div className="card-body">
              <ul style={{ paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <li><strong>Invariância à Permutação:</strong> O produto escalar da Self-Attention opera em pares de conjuntos sem considerar a ordem de leitura.</li>
                <li><strong>Frases com Sentidos Opostos:</strong><br />
                  1. <em>"O amor é tudo que você precisa"</em> (Beatles)<br />
                  2. <em>"Você precisa que tudo é o amor"</em><br />
                  Sem posições, a matriz de atenção produziria exatamente o mesmo resultado!
                </li>
                <li><strong>Como Funciona a Injeção:</strong> Somamos o vetor de posição diretamente ao vetor de conteúdo. Como a dimensão $d$ é grande (ex: 768), o espaço vetorial tem capacidade suficiente para codificar conteúdo semântico E posição simultaneamente.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
