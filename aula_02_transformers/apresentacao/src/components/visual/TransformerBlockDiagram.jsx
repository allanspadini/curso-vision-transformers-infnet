import React, { useState } from 'react';
import { Layers, ArrowRight, GitFork, RefreshCw, Sparkles, CheckCircle2 } from 'lucide-react';

export default function TransformerBlockDiagram() {
  const [normType, setNormType] = useState('pre'); // 'pre' or 'post'

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
          <Layers size={18} color="var(--infnet-cyan)" />
          <span>A Anatomia do Bloco Transformer: Atenção + MLP + Residual + LayerNorm</span>
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            onClick={() => setNormType('pre')}
            style={{
              padding: '4px 12px',
              borderRadius: '6px',
              border: 'none',
              fontSize: '11.5px',
              fontWeight: 600,
              cursor: 'pointer',
              background: normType === 'pre' ? 'var(--infnet-dark-blue)' : '#FFFFFF',
              color: normType === 'pre' ? '#FFFFFF' : 'var(--text-main)',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            Pre-LN (Padrão Moderno: GPT / ViT)
          </button>
          <button
            onClick={() => setNormType('post')}
            style={{
              padding: '4px 12px',
              borderRadius: '6px',
              border: 'none',
              fontSize: '11.5px',
              fontWeight: 600,
              cursor: 'pointer',
              background: normType === 'post' ? 'var(--infnet-dark-blue)' : '#FFFFFF',
              color: normType === 'post' ? '#FFFFFF' : 'var(--text-main)',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            Post-LN (Vaswani Original 2017)
          </button>
        </div>
      </div>

      {/* Main Visual Schema */}
      <div style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '1.2fr 1fr',
        gap: '14px',
        minHeight: 0
      }}>
        {/* Left: SVG Architecture of Single Block */}
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
            Fluxo Interno ({normType === 'pre' ? 'Pre-LayerNorm' : 'Post-LayerNorm'})
          </div>

          <svg viewBox="0 0 380 290" style={{ width: '100%', height: '260px' }}>
            <defs>
              <marker id="arrowTb" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 8 5 L 0 9 z" fill="#1BB5D8" />
              </marker>
              <marker id="skipArrowTb" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 8 5 L 0 9 z" fill="#FF7043" />
              </marker>
            </defs>

            {/* Input x_l-1 */}
            <rect x="120" y="5" width="140" height="24" rx="4" fill="#0A345D" />
            <text x="190" y="21" fontSize="10" fontWeight="700" fill="#64D9EF" textAnchor="middle">Input: x_(l-1) [T, d_model]</text>

            {/* Down arrow */}
            <path d="M 190 29 L 190 45" stroke="#1BB5D8" strokeWidth="2" markerEnd="url(#arrowTb)" fill="none" />

            {/* LayerNorm 1 */}
            <rect x="130" y="48" width="120" height="22" rx="4" fill="#EDF5FA" stroke="#0284C7" strokeWidth="1.5" />
            <text x="190" y="63" fontSize="9.5" fontWeight="700" fill="#0A345D" textAnchor="middle">LayerNorm 1</text>

            {/* Down arrow */}
            <path d="M 190 70 L 190 85" stroke="#1BB5D8" strokeWidth="2" markerEnd="url(#arrowTb)" fill="none" />

            {/* Multi-Head Attention */}
            <rect x="110" y="88" width="160" height="32" rx="6" fill="#1BB5D8" stroke="#0A345D" strokeWidth="1.5" />
            <text x="190" y="108" fontSize="10.5" fontWeight="700" fill="#0A345D" textAnchor="middle">Multi-Head Attention</text>

            {/* Down arrow */}
            <path d="M 190 120 L 190 135" stroke="#1BB5D8" strokeWidth="2" markerEnd="url(#arrowTb)" fill="none" />

            {/* Residual Add 1 (+) */}
            <circle cx="190" cy="145" r="10" fill="#FFFFFF" stroke="#FF7043" strokeWidth="2" />
            <text x="190" y="149" fontSize="12" fontWeight="700" fill="#FF7043" textAnchor="middle">+</text>

            {/* Skip 1 Line */}
            <path d="M 120 17 L 70 17 L 70 145 L 178 145" stroke="#FF7043" strokeWidth="2" strokeDasharray="3 2" markerEnd="url(#skipArrowTb)" fill="none" />
            <text x="50" y="85" fontSize="7.5" fill="#FF7043" fontWeight="700">Skip + x</text>

            {/* Down arrow */}
            <path d="M 190 155 L 190 170" stroke="#1BB5D8" strokeWidth="2" markerEnd="url(#arrowTb)" fill="none" />

            {/* LayerNorm 2 */}
            <rect x="130" y="173" width="120" height="22" rx="4" fill="#EDF5FA" stroke="#0284C7" strokeWidth="1.5" />
            <text x="190" y="188" fontSize="9.5" fontWeight="700" fill="#0A345D" textAnchor="middle">LayerNorm 2</text>

            {/* Down arrow */}
            <path d="M 190 195 L 190 210" stroke="#1BB5D8" strokeWidth="2" markerEnd="url(#arrowTb)" fill="none" />

            {/* MLP / Feed Forward (4x expansion) */}
            <rect x="110" y="213" width="160" height="32" rx="6" fill="#7CB342" stroke="#0A345D" strokeWidth="1.5" />
            <text x="190" y="228" fontSize="10" fontWeight="700" fill="#FFF" textAnchor="middle">MLP (Feed-Forward)</text>
            <text x="190" y="240" fontSize="8" fill="#F0FDF4" textAnchor="middle">d_model → 4×d_model → d_model</text>

            {/* Down arrow */}
            <path d="M 190 245 L 190 260" stroke="#1BB5D8" strokeWidth="2" markerEnd="url(#arrowTb)" fill="none" />

            {/* Residual Add 2 (+) */}
            <circle cx="190" cy="270" r="10" fill="#FFFFFF" stroke="#FF7043" strokeWidth="2" />
            <text x="190" y="274" fontSize="12" fontWeight="700" fill="#FF7043" textAnchor="middle">+</text>

            {/* Skip 2 Line */}
            <path d="M 190 155 L 290 155 L 290 270 L 202 270" stroke="#FF7043" strokeWidth="2" strokeDasharray="3 2" markerEnd="url(#skipArrowTb)" fill="none" />
            <text x="310" y="215" fontSize="7.5" fill="#FF7043" fontWeight="700">Skip + x'</text>
          </svg>
        </div>

        {/* Right: Technical Explanation */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div className="card" style={{ flex: 1 }}>
            <div className="card-header">
              <div className="card-icon-wrapper icon-blue">
                <Layers size={18} />
              </div>
              <div className="card-title">Os 4 Pilares do Bloco</div>
            </div>
            <div className="card-body">
              <ul style={{ paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <li><strong>1. LayerNorm:</strong> Normaliza as ativações através da dimensão de features $d$ para média 0 e variância 1 (estabiliza gradientes).</li>
                <li><strong>2. Multi-Head Attention:</strong> Permite comunicação e mistura dinâmica de informações entre diferentes posições da sequência.</li>
                <li><strong>3. Skip Connections (Residuais):</strong> Supervias de gradiente direto que possibilitam empilhar 32, 64 ou mais camadas sem degradação.</li>
                <li><strong>4. MLP Position-wise (Expansão 4x):</strong> Rede linear de 2 camadas com ativação GELU ($768 → 3072 → 768$). Processa cada token individualmente, funcionando como uma "memória associativa".</li>
              </ul>
            </div>
          </div>

          <div style={{
            background: normType === 'pre' ? '#F0FDF4' : '#FFFBEB',
            border: `1px solid ${normType === 'pre' ? '#BBF7D0' : '#FDE68A'}`,
            padding: '8px 12px',
            borderRadius: '6px',
            fontSize: '11.5px',
            color: normType === 'pre' ? '#166534' : '#92400E'
          }}>
            {normType === 'pre' ? (
              <span>✅ <strong>Pre-LN:</strong> Permite treinar modelos profundos sem warm-up agressivo, sendo o padrão adotado no GPT-2, GPT-3 e Vision Transformer.</span>
            ) : (
              <span>⚠️ <strong>Post-LN:</strong> Formulação original de 2017; exigia taxa de aprendizado com aquecimento (learning rate warmup) para não divergir.</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
