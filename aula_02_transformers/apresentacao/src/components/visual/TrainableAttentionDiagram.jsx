import React from 'react';
import { Sliders, ArrowRight, GitPullRequest, Code, Sparkles, Layers } from 'lucide-react';

export default function TrainableAttentionDiagram() {
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
          <Sliders size={18} color="var(--infnet-cyan)" />
          <span>Tornando a Atenção Treinável: As Matrizes de Projeção $W_Q, W_K, W_V, W_O$</span>
        </div>
        <span style={{ fontSize: '11.5px', color: 'var(--infnet-dark-blue)', background: '#FFFFFF', padding: '3px 10px', borderRadius: '12px', fontWeight: 600 }}>
          nn.Linear(d_model, d_k, bias=False)
        </span>
      </div>

      {/* Main Grid */}
      <div style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '1.4fr 1fr',
        gap: '14px',
        minHeight: 0
      }}>
        {/* Left: SVG Diagram of Linear Projections */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-light)',
          borderRadius: '10px',
          padding: '12px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            top: '8px',
            left: '12px',
            fontSize: '11px',
            fontWeight: 700,
            color: 'var(--infnet-dark-blue)',
            textTransform: 'uppercase'
          }}>
            Projeções Lineares Aprendíveis a Partir do Input $X$
          </div>

          <svg viewBox="0 0 540 260" style={{ width: '100%', height: '220px', marginTop: '14px' }}>
            <defs>
              <marker id="arrowProj" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 8 5 L 0 9 z" fill="#1BB5D8" />
              </marker>
            </defs>

            {/* Input Tensor X */}
            <rect x="20" y="70" width="75" height="110" rx="6" fill="#0A345D" stroke="#64D9EF" strokeWidth="2" />
            <text x="57" y="105" fontSize="13" fontWeight="800" fill="#64D9EF" textAnchor="middle">X</text>
            <text x="57" y="125" fontSize="8.5" fill="#FFFFFF" textAnchor="middle">Entrada</text>
            <text x="57" y="145" fontSize="8" fontFamily="monospace" fill="#94A3B8" textAnchor="middle">[T, d_model]</text>

            {/* Fork Arrows to 3 weights */}
            <path d="M 95 100 L 160 50" stroke="#1BB5D8" strokeWidth="2" markerEnd="url(#arrowProj)" fill="none" />
            <path d="M 95 125 L 160 125" stroke="#1BB5D8" strokeWidth="2" markerEnd="url(#arrowProj)" fill="none" />
            <path d="M 95 150 L 160 200" stroke="#1BB5D8" strokeWidth="2" markerEnd="url(#arrowProj)" fill="none" />

            {/* Weight Matrices W_Q, W_K, W_V */}
            <g transform="translate(170, 25)">
              <rect x="0" y="0" width="95" height="45" rx="5" fill="#EDF5FA" stroke="#0284C7" strokeWidth="1.5" />
              <text x="47" y="20" fontSize="10" fontWeight="700" fill="#0A345D" textAnchor="middle">W_Q (Pesos)</text>
              <text x="47" y="34" fontSize="8" fontFamily="monospace" fill="#64748B" textAnchor="middle">[d_model × d_k]</text>
            </g>

            <g transform="translate(170, 102)">
              <rect x="0" y="0" width="95" height="45" rx="5" fill="#EDF5FA" stroke="#1BB5D8" strokeWidth="1.5" />
              <text x="47" y="20" fontSize="10" fontWeight="700" fill="#0A345D" textAnchor="middle">W_K (Pesos)</text>
              <text x="47" y="34" fontSize="8" fontFamily="monospace" fill="#64748B" textAnchor="middle">[d_model × d_k]</text>
            </g>

            <g transform="translate(170, 178)">
              <rect x="0" y="0" width="95" height="45" rx="5" fill="#F0FDF4" stroke="#7CB342" strokeWidth="1.5" />
              <text x="47" y="20" fontSize="10" fontWeight="700" fill="#15803D" textAnchor="middle">W_V (Pesos)</text>
              <text x="47" y="34" fontSize="8" fontFamily="monospace" fill="#64748B" textAnchor="middle">[d_model × d_v]</text>
            </g>

            {/* Arrows from W to Q, K, V */}
            <path d="M 265 47 L 315 47" stroke="#0284C7" strokeWidth="2" markerEnd="url(#arrowProj)" fill="none" />
            <path d="M 265 125 L 315 125" stroke="#1BB5D8" strokeWidth="2" markerEnd="url(#arrowProj)" fill="none" />
            <path d="M 265 200 L 315 200" stroke="#7CB342" strokeWidth="2" markerEnd="url(#arrowProj)" fill="none" />

            {/* Resulting Q, K, V Tensors */}
            <g transform="translate(325, 25)">
              <rect x="0" y="0" width="65" height="45" rx="4" fill="#0284C7" />
              <text x="32" y="22" fontSize="12" fontWeight="700" fill="#FFF" textAnchor="middle">Q</text>
              <text x="32" y="35" fontSize="7.5" fontFamily="monospace" fill="#E0F2FE" textAnchor="middle">[T, d_k]</text>
            </g>

            <g transform="translate(325, 102)">
              <rect x="0" y="0" width="65" height="45" rx="4" fill="#1BB5D8" />
              <text x="32" y="22" fontSize="12" fontWeight="700" fill="#0A345D" textAnchor="middle">K</text>
              <text x="32" y="35" fontSize="7.5" fontFamily="monospace" fill="#0A345D" textAnchor="middle">[T, d_k]</text>
            </g>

            <g transform="translate(325, 178)">
              <rect x="0" y="0" width="65" height="45" rx="4" fill="#7CB342" />
              <text x="32" y="22" fontSize="12" fontWeight="700" fill="#FFF" textAnchor="middle">V</text>
              <text x="32" y="35" fontSize="7.5" fontFamily="monospace" fill="#F0FDF4" textAnchor="middle">[T, d_v]</text>
            </g>

            {/* Dot Product Attention Engine Box */}
            <g transform="translate(420, 50)">
              <rect x="0" y="0" width="105" height="150" rx="8" fill="#FFFFFF" stroke="#0A345D" strokeWidth="2" />
              <text x="52" y="35" fontSize="10" fontWeight="700" fill="#0A345D" textAnchor="middle">Dot-Product</text>
              <text x="52" y="52" fontSize="9" fontWeight="700" fill="#1BB5D8" textAnchor="middle">Attention</text>
              
              <line x1="10" y1="65" x2="95" y2="65" stroke="#E2E8F0" />
              
              <text x="52" y="85" fontSize="8" fill="#64748B" textAnchor="middle">softmax(QKᵀ/√d)V</text>
              <text x="52" y="115" fontSize="8.5" fontWeight="700" fill="#15803D" textAnchor="middle">Saída [T, d_v]</text>
              <text x="52" y="132" fontSize="7.5" fill="#64748B" textAnchor="middle">× W_O → [T, d_model]</text>
            </g>
          </svg>
        </div>

        {/* Right: Code & Pedagogical Explanation */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div className="card" style={{ flex: 1 }}>
            <div className="card-header">
              <div className="card-icon-wrapper icon-blue">
                <Code size={18} />
              </div>
              <div className="card-title">Implementação PyTorch</div>
            </div>
            <div className="card-body">
              <pre style={{
                background: '#061F38',
                color: '#64D9EF',
                padding: '10px',
                borderRadius: '6px',
                fontFamily: 'var(--font-code)',
                fontSize: '11px',
                lineHeight: '1.5',
                overflowX: 'auto'
              }}>
{`class SelfAttention(nn.Module):
    def __init__(self, d_model, d_k):
        super().__init__()
        self.W_q = nn.Linear(d_model, d_k, bias=False)
        self.W_k = nn.Linear(d_model, d_k, bias=False)
        self.W_v = nn.Linear(d_model, d_k, bias=False)
        self.W_o = nn.Linear(d_k, d_model, bias=False)
        self.d_k = d_k

    def forward(self, x):
        Q = self.W_q(x)  # (B, T, d_k)
        K = self.W_k(x)  # (B, T, d_k)
        V = self.W_v(x)  # (B, T, d_k)
        scores = (Q @ K.transpose(-2, -1)) / math.sqrt(self.d_k)
        A = torch.softmax(scores, dim=-1)
        out = A @ V      # (B, T, d_k)
        return self.W_o(out)`}
              </pre>
            </div>
          </div>

          <div style={{
            background: '#F0FDF4',
            border: '1px solid #BBF7D0',
            padding: '8px 12px',
            borderRadius: '6px',
            fontSize: '11.5px',
            color: '#166534'
          }}>
            ✅ <strong>Treinamento de Ponta a Ponta:</strong> Os parâmetros em $W_Q, W_K, W_V, W_O$ são ajustados pelo otimizador AdamW através do cálculo padrão de gradientes com perda Cross-Entropy.
          </div>
        </div>
      </div>
    </div>
  );
}
