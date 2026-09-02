import React, { useState } from 'react';
import { Compass, Sparkles, HelpCircle, GitMerge, CheckCircle2, ArrowRight } from 'lucide-react';

export default function SemanticEmbeddingSpaceDiagram() {
  const semanticWords = [
    // Cluster 1: Afeto / Sentimento (Beatles theme)
    { id: 'amor', label: 'amor', x: 410, y: 105, cluster: 'afeto', color: '#E11D48', vec: [0.88, 0.31, -0.15, 0.59] },
    { id: 'paixao', label: 'paixão', x: 450, y: 130, cluster: 'afeto', color: '#E11D48', vec: [0.85, 0.35, -0.12, 0.55] },
    { id: 'carinho', label: 'carinho', x: 385, y: 145, cluster: 'afeto', color: '#E11D48', vec: [0.82, 0.28, -0.18, 0.61] },
    { id: 'afeto', label: 'afeto', x: 425, y: 170, cluster: 'afeto', color: '#E11D48', vec: [0.80, 0.33, -0.10, 0.58] },
    
    // Cluster 2: Verbos / Ação
    { id: 'precisa', label: 'precisa', x: 180, y: 195, cluster: 'acao', color: '#0284C7', vec: [0.12, 0.78, 0.45, -0.22] },
    { id: 'deseja', label: 'deseja', x: 225, y: 225, cluster: 'acao', color: '#0284C7', vec: [0.18, 0.74, 0.41, -0.19] },
    { id: 'quer', label: 'quer', x: 160, y: 240, cluster: 'acao', color: '#0284C7', vec: [0.15, 0.81, 0.39, -0.25] },

    // Cluster 3: Arte / Música
    { id: 'musica', label: 'música', x: 640, y: 200, cluster: 'arte', color: '#16A34A', vec: [-0.45, -0.12, 0.79, 0.31] },
    { id: 'cancao', label: 'canção', x: 675, y: 170, cluster: 'arte', color: '#16A34A', vec: [-0.42, -0.09, 0.82, 0.28] },
    { id: 'som', label: 'som', x: 700, y: 225, cluster: 'arte', color: '#16A34A', vec: [-0.39, -0.15, 0.75, 0.35] }
  ];

  const [compareWordA, setCompareWordA] = useState('amor');
  const [compareWordB, setCompareWordB] = useState('carinho');

  const wordA = semanticWords.find(w => w.id === compareWordA) || semanticWords[0];
  const wordB = semanticWords.find(w => w.id === compareWordB) || semanticWords[2];

  // Dot product and cosine similarity calculation
  const dot = (v1, v2) => v1.reduce((acc, val, i) => acc + val * v2[i], 0);
  const norm = v => Math.sqrt(v.reduce((acc, val) => acc + val * val, 0));
  const cosSim = (dot(wordA.vec, wordB.vec) / (norm(wordA.vec) * norm(wordB.vec))).toFixed(3);

  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
          <Compass size={18} color="var(--infnet-cyan)" />
          <span>O Que São Embeddings? O Hiperespaço Semântico Contínuo</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '11px', background: '#FFFFFF', padding: '3px 10px', borderRadius: '12px', fontWeight: 600, color: 'var(--infnet-dark-blue)', border: '1px solid #D0E3F0' }}>
            Hipótese Distribucional (Firth, 1957)
          </span>
          <span style={{ fontSize: '11px', background: '#DCFCE7', padding: '3px 10px', borderRadius: '12px', fontWeight: 700, color: '#15803D' }}>
            Treinado End-to-End via Backpropagation
          </span>
        </div>
      </div>

      {/* Main Grid: 2D Interactive Space (Left) + Theoretical Cards (Right) */}
      <div style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '1.35fr 1fr',
        gap: '12px',
        minHeight: 0
      }}>
        {/* Left: 2D Interactive Semantic Vector Space Map */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-light)',
          borderRadius: '10px',
          padding: '12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--infnet-dark-blue)', textTransform: 'uppercase' }}>
              Projeção 2D do Espaço Latente (ℝ^768 → ℝ^2 via t-SNE / PCA)
            </span>
            <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
              (Clique em duas palavras para calcular o Cosseno)
            </span>
          </div>

          {/* 2D Coordinate Space SVG */}
          <div style={{ flex: 1, background: '#FFFFFF', borderRadius: '8px', border: '1px solid #CBD5E1', position: 'relative', minHeight: '220px' }}>
            <svg viewBox="0 0 800 300" style={{ width: '100%', height: '100%' }}>
              {/* Axes and Grid Lines */}
              <line x1="50" y1="150" x2="750" y2="150" stroke="#F1F5F9" strokeWidth="1.5" />
              <line x1="400" y1="20" x2="400" y2="280" stroke="#F1F5F9" strokeWidth="1.5" />

              {/* Cluster regions backgrounds */}
              {/* Cluster 1: Sentimento/Afeto (Red) */}
              <ellipse cx="415" cy="138" rx="85" ry="52" fill="#FFE4E6" fillOpacity="0.5" stroke="#FDA4AF" strokeDasharray="3 2" />
              <text x="415" y="76" fontSize="9" fontWeight="700" fill="#E11D48" textAnchor="middle">
                Cluster 1: Afeto / Sentimento (Beatles)
              </text>

              {/* Cluster 2: Ação / Necessidade (Blue) */}
              <ellipse cx="188" cy="220" rx="72" ry="48" fill="#E0F2FE" fillOpacity="0.5" stroke="#BAE6FD" strokeDasharray="3 2" />
              <text x="188" y="160" fontSize="9" fontWeight="700" fill="#0284C7" textAnchor="middle">
                Cluster 2: Verbos de Necessidade
              </text>

              {/* Cluster 3: Arte / Música (Green) */}
              <ellipse cx="670" cy="200" rx="72" ry="48" fill="#DCFCE7" fillOpacity="0.5" stroke="#86EFAC" strokeDasharray="3 2" />
              <text x="670" y="142" fontSize="9" fontWeight="700" fill="#15803D" textAnchor="middle">
                Cluster 3: Expressão Artística
              </text>

              {/* Connection line between compare words */}
              {wordA && wordB && (
                <line
                  x1={wordA.x}
                  y1={wordA.y}
                  x2={wordB.x}
                  y2={wordB.y}
                  stroke="#0A345D"
                  strokeWidth="2"
                  strokeDasharray="4 2"
                />
              )}

              {/* Words as Interactive Vector Points */}
              {semanticWords.map((w) => {
                const isA = w.id === compareWordA;
                const isB = w.id === compareWordB;
                const isSelected = isA || isB;

                return (
                  <g
                    key={w.id}
                    onClick={() => {
                      if (!isA) {
                        setCompareWordB(w.id);
                      } else {
                        setCompareWordA(w.id === 'amor' ? 'precisa' : 'amor');
                      }
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    {/* Circle Point */}
                    <circle
                      cx={w.x}
                      cy={w.y}
                      r={isSelected ? '8' : '5.5'}
                      fill={isSelected ? '#0A345D' : w.color}
                      stroke={isSelected ? '#64D9EF' : '#FFFFFF'}
                      strokeWidth="2"
                    />

                    {/* Label badge */}
                    <rect
                      x={w.x + 9}
                      y={w.y - 11}
                      width={w.label.length * 7.5 + 10}
                      height="18"
                      rx="4"
                      fill={isSelected ? '#0A345D' : '#FFFFFF'}
                      stroke={isSelected ? '#1BB5D8' : '#CBD5E1'}
                      strokeWidth={isSelected ? '1.5' : '1'}
                    />
                    <text
                      x={w.x + 14}
                      y={w.y + 2}
                      fontSize="9"
                      fontWeight="700"
                      fill={isSelected ? '#FFFFFF' : '#0A345D'}
                    >
                      {w.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Live Cosine Similarity Calculation Widget */}
          <div style={{
            background: '#FFFFFF',
            border: '1px solid var(--border-light)',
            borderRadius: '8px',
            padding: '8px 12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Compass size={16} color="var(--infnet-cyan)" />
              <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
                Comparador Semântico:
              </span>
              <span style={{ background: '#FFE4E6', color: '#E11D48', padding: '2px 8px', borderRadius: '4px', fontWeight: 700, fontSize: '11px' }}>
                "{wordA.label}"
              </span>
              <span style={{ fontSize: '11px', color: '#64748B' }}>vs</span>
              <span style={{ background: '#E0F2FE', color: '#0284C7', padding: '2px 8px', borderRadius: '4px', fontWeight: 700, fontSize: '11px' }}>
                "{wordB.label}"
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Similaridade Cosseno:</span>
              <span style={{
                fontSize: '12px',
                fontWeight: 800,
                fontFamily: 'var(--font-code)',
                color: Number(cosSim) > 0.7 ? '#15803D' : Number(cosSim) > 0.3 ? '#0284C7' : '#DC2626',
                background: Number(cosSim) > 0.7 ? '#DCFCE7' : Number(cosSim) > 0.3 ? '#E0F2FE' : '#FEE2E2',
                padding: '2px 8px',
                borderRadius: '6px'
              }}>
                cos(θ) = {cosSim} {Number(cosSim) > 0.7 ? '🔥 (Próximos)' : Number(cosSim) > 0.3 ? '⚡ (Moderado)' : '❄️ (Distantes)'}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Explanatory Theory Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', minHeight: 0 }}>
          {/* Card 1: É um modelo separado? */}
          <div className="card" style={{ padding: '12px 14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
              <HelpCircle size={16} color="var(--infnet-cyan)" />
              <span style={{ fontWeight: 700, fontSize: '12px', color: 'var(--infnet-dark-blue)' }}>
                1. É um modelo separado? Como aprende?
              </span>
            </div>
            <p style={{ fontSize: '11.5px', color: 'var(--text-main)', lineHeight: '1.45' }}>
              <strong>Nos Transformers modernos, NÃO é um modelo externo!</strong> É simplesmente a primeira camada de pesos (<code style={{ fontFamily: 'var(--font-code)', color: 'var(--infnet-cyan)' }}>nn.Embedding</code>) treinada <strong>end-to-end</strong> com a rede.
            </p>
            <div style={{
              marginTop: '6px',
              background: '#EDF5FA',
              padding: '6px 10px',
              borderRadius: '6px',
              fontSize: '11px',
              color: 'var(--infnet-dark-blue)',
              lineHeight: '1.4'
            }}>
              📖 <em>Hipótese Distribucional (Firth, 1957):</em> Palavras que aparecem nos mesmos contextos recebem atualizações de gradiente parecidas pelo Backpropagation, convergindo para o mesmo cone no espaço vetorial!
            </div>
          </div>

          {/* Card 2: Por Que Não One-Hot? */}
          <div className="card" style={{ flex: 1, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <GitMerge size={16} color="var(--infnet-green-accent)" />
              <span style={{ fontWeight: 700, fontSize: '12px', color: 'var(--infnet-dark-blue)' }}>
                2. Por Que Não Usar One-Hot Encoding?
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '11px' }}>
              <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', padding: '8px', borderRadius: '6px' }}>
                <span style={{ fontWeight: 700, color: '#991B1B' }}>❌ One-Hot (50.257-d)</span>
                <ul style={{ paddingLeft: '12px', marginTop: '4px', color: '#7F1D1D', lineHeight: '1.35' }}>
                  <li>Vetores esparsos gigantes.</li>
                  <li><strong>Ortogonais:</strong> u · v = 0.</li>
                  <li>"amor" e "carinho" parecem tão distantes quanto "amor" e "trator".</li>
                </ul>
              </div>

              <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', padding: '8px', borderRadius: '6px' }}>
                <span style={{ fontWeight: 700, color: '#166534' }}>✅ Dense Embed (768-d)</span>
                <ul style={{ paddingLeft: '12px', marginTop: '4px', color: '#14532D', lineHeight: '1.35' }}>
                  <li>Vetores densos compactos.</li>
                  <li><strong>Semântica Contínua:</strong> cos(θ) reflete afinidade.</li>
                  <li><strong>Álgebra Vetorial:</strong> rei - homem + mulher ≈ rainha.</li>
                </ul>
              </div>
            </div>

            <div style={{
              background: '#FEF3C7',
              border: '1px solid #FDE68A',
              padding: '6px 10px',
              borderRadius: '6px',
              fontSize: '10.5px',
              color: '#92400E',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              marginTop: 'auto'
            }}>
              <Sparkles size={16} flexShrink={0} />
              <span><strong>Generalização:</strong> O aprendizado sobre "amor" se transfere automaticamente para "afeto" e "carinho"!</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
