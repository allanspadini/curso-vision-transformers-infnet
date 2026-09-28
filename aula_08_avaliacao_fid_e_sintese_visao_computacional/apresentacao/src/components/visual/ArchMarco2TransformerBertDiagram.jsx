import React from 'react';
import MathView from '../MathView';

export default function ArchMarco2TransformerBertDiagram() {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {/* Top Banner: Breadcrumb Evolutivo */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#EDF5FA',
        border: '1px solid #D0E3F0',
        borderRadius: '8px',
        padding: '8px 16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{
            background: 'var(--infnet-dark-blue)',
            color: '#FFFFFF',
            fontSize: '11px',
            fontWeight: 700,
            padding: '3px 8px',
            borderRadius: '4px',
            fontFamily: 'var(--font-code)'
          }}>
            MARCO 2 / 6
          </span>
          <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
            O Transformer Canônico & BERT: O Advento da Auto-Atenção Global e Encoders
          </span>
        </div>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <span style={{ padding: '3px 8px', borderRadius: '4px', background: '#F1F5F9', color: '#64748B', fontSize: '10px', fontWeight: 600 }}>1. CNN / U-Net</span>
          <span style={{ color: '#94A3B8', fontSize: '10px' }}>➔</span>
          <span style={{ padding: '3px 8px', borderRadius: '4px', background: '#0A345D', color: '#FFFFFF', fontSize: '10px', fontWeight: 700 }}>2. Transformer / BERT</span>
          <span style={{ color: '#94A3B8', fontSize: '10px' }}>➔</span>
          <span style={{ padding: '3px 8px', borderRadius: '4px', background: '#F1F5F9', color: '#64748B', fontSize: '10px', fontWeight: 600 }}>3. ViT</span>
          <span style={{ color: '#94A3B8', fontSize: '10px' }}>➔</span>
          <span style={{ padding: '3px 8px', borderRadius: '4px', background: '#F1F5F9', color: '#64748B', fontSize: '10px', fontWeight: 600 }}>4. Swin</span>
          <span style={{ color: '#94A3B8', fontSize: '10px' }}>➔</span>
          <span style={{ padding: '3px 8px', borderRadius: '4px', background: '#F1F5F9', color: '#64748B', fontSize: '10px', fontWeight: 600 }}>5. CLIP</span>
          <span style={{ color: '#94A3B8', fontSize: '10px' }}>➔</span>
          <span style={{ padding: '3px 8px', borderRadius: '4px', background: '#F1F5F9', color: '#64748B', fontSize: '10px', fontWeight: 600 }}>6. Difusão/GAN</span>
        </div>
      </div>

      {/* Main Grid: 2 Columns (MHA Mechanics + BERT Architecture) */}
      <div style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '12px',
        minHeight: 0
      }}>
        {/* Left Column: Transformer Self-Attention Block */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid var(--border-light)',
          borderRadius: '10px',
          padding: '12px 14px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#0284C7' }}></span>
                <strong style={{ fontSize: '12.5px', color: '#0A345D' }}>Multi-Head Attention (MHA) & Bloco Transformer</strong>
              </div>
              <span className="badge badge-cyan" style={{ fontSize: '9.5px' }}>Vaswani et al. (NeurIPS 2017)</span>
            </div>

            {/* SVG Visual Scheme of MHA Block */}
            <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '10px', position: 'relative' }}>
              <svg viewBox="0 0 380 145" style={{ width: '100%', height: '145px' }}>
                {/* Inputs X */}
                <rect x="20" y="55" width="45" height="35" rx="4" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1" />
                <text x="42" y="72" fontSize="9.5" fontWeight="bold" fill="#0369A1" textAnchor="middle">Token X</text>
                <text x="42" y="83" fontSize="7.5" fill="#64748B" textAnchor="middle">[B, T, d_model]</text>

                {/* Projections Q, K, V */}
                <path d="M 65 65 L 90 40" stroke="#0284C7" strokeWidth="1.5" fill="none" />
                <path d="M 65 72 L 90 72" stroke="#0284C7" strokeWidth="1.5" fill="none" />
                <path d="M 65 80 L 90 105" stroke="#0284C7" strokeWidth="1.5" fill="none" />

                <rect x="90" y="28" width="50" height="22" rx="4" fill="#FEF3C7" stroke="#D97706" strokeWidth="1" />
                <text x="115" y="42" fontSize="8.5" fontWeight="bold" fill="#92400E" textAnchor="middle">Query (Q)</text>

                <rect x="90" y="61" width="50" height="22" rx="4" fill="#DCFCE7" stroke="#16A34A" strokeWidth="1" />
                <text x="115" y="75" fontSize="8.5" fontWeight="bold" fill="#15803D" textAnchor="middle">Key (K)</text>

                <rect x="90" y="94" width="50" height="22" rx="4" fill="#F3E8FF" stroke="#9333EA" strokeWidth="1" />
                <text x="115" y="108" fontSize="8.5" fontWeight="bold" fill="#7E22CE" textAnchor="middle">Value (V)</text>

                {/* Scaled Dot Product Box */}
                <path d="M 140 39 L 165 55" stroke="#64748B" strokeWidth="1.2" fill="none" />
                <path d="M 140 72 L 165 72" stroke="#64748B" strokeWidth="1.2" fill="none" />
                <path d="M 140 105 L 165 90" stroke="#64748B" strokeWidth="1.2" fill="none" />

                <rect x="165" y="42" width="115" height="60" rx="6" fill="#FFFFFF" stroke="#0A345D" strokeWidth="1.5" />
                <text x="222" y="58" fontSize="9" fontWeight="bold" fill="#0A345D" textAnchor="middle">Scaled Dot-Product</text>
                <text x="222" y="74" fontSize="8.5" fontFamily="var(--font-code)" fill="#0284C7" textAnchor="middle">softmax(QK^T / √d_k)</text>
                <text x="222" y="90" fontSize="8" fill="#166534" textAnchor="middle">× V (Matriz de Contexto)</text>

                {/* Residual shortcut & MLP */}
                <path d="M 280 72 L 305 72" stroke="#0284C7" strokeWidth="1.5" fill="none" />
                <rect x="305" y="46" width="65" height="52" rx="5" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="1.5" />
                <text x="337" y="63" fontSize="8.5" fontWeight="bold" fill="#1D4ED8" textAnchor="middle">x + MHA</text>
                <text x="337" y="75" fontSize="8" fill="#475569" textAnchor="middle">LayerNorm</text>
                <text x="337" y="87" fontSize="8" fontWeight="bold" fill="#1E40AF" textAnchor="middle">MLP (GELU)</text>
              </svg>
            </div>
          </div>

          <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ background: '#F0F9FF', border: '1px solid #BAE6FD', borderRadius: '6px', padding: '6px 10px', fontSize: '10.5px', color: '#0369A1' }}>
              <strong>Inovação Central:</strong> A atenção calcula dinamicamente pesos cruzados entre quaisquer pares de tokens, permitindo paralelização massiva de treinamento em GPU sem a limitação sequencial de RNNs.
            </div>
          </div>
        </div>

        {/* Right Column: BERT Stack & [CLS] Token */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid var(--border-light)',
          borderRadius: '10px',
          padding: '12px 14px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#AB47BC' }}></span>
                <strong style={{ fontSize: '12.5px', color: '#0A345D' }}>BERT: O Encoder Bidirecional & Token [CLS]</strong>
              </div>
              <span className="badge badge-purple" style={{ fontSize: '9.5px' }}>Devlin et al. (NAACL 2019)</span>
            </div>

            {/* SVG Visual Scheme of BERT Architecture */}
            <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '10px', position: 'relative' }}>
              <svg viewBox="0 0 380 145" style={{ width: '100%', height: '145px' }}>
                {/* Inputs Tokens */}
                <rect x="25" y="105" width="45" height="22" rx="4" fill="#FDE047" stroke="#CA8A04" strokeWidth="1.5" />
                <text x="47" y="119" fontSize="8.5" fontWeight="bold" fill="#713F12" textAnchor="middle">[CLS]</text>

                <rect x="80" y="105" width="45" height="22" rx="4" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1" />
                <text x="102" y="119" fontSize="8.5" fill="#334155" textAnchor="middle">Token 1</text>

                <rect x="135" y="105" width="55" height="22" rx="4" fill="#FCA5A5" stroke="#DC2626" strokeWidth="1" />
                <text x="162" y="119" fontSize="8.5" fontWeight="bold" fill="#991B1B" textAnchor="middle">[MASK]</text>

                <rect x="200" y="105" width="45" height="22" rx="4" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1" />
                <text x="222" y="119" fontSize="8.5" fill="#334155" textAnchor="middle">Token 3</text>

                <text x="260" y="119" fontSize="12" fill="#64748B">...</text>

                {/* Vertical arrows to Encoder */}
                <path d="M 47 105 L 47 75" stroke="#0A345D" strokeWidth="1.5" markerEnd="url(#arrow-navy)" />
                <path d="M 102 105 L 102 75" stroke="#0A345D" strokeWidth="1.5" />
                <path d="M 162 105 L 162 75" stroke="#0A345D" strokeWidth="1.5" />
                <path d="M 222 105 L 222 75" stroke="#0A345D" strokeWidth="1.5" />

                {/* Bidirectional Encoder Stack */}
                <rect x="20" y="38" width="340" height="36" rx="6" fill="#FAF5FF" stroke="#9333EA" strokeWidth="2" />
                <text x="190" y="55" fontSize="10" fontWeight="bold" fill="#6B21A8" textAnchor="middle">
                  L = 12 Camadas de Transformer Encoder Bidirecional
                </text>
                <text x="190" y="66" fontSize="8" fill="#7E22CE" textAnchor="middle">
                  Atenção irrestrita esquerda ➔ direita e direita ➔ esquerda em todas as camadas
                </text>

                {/* CLS Output Header */}
                <path d="M 47 38 L 47 15" stroke="#EAB308" strokeWidth="2.5" />
                <rect x="15" y="5" width="95" height="20" rx="4" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1.5" />
                <text x="62" y="18" fontSize="8" fontWeight="bold" fill="#713F12" textAnchor="middle">h_[CLS] (Agregador Global)</text>

                {/* Head Pluggable */}
                <rect x="130" y="5" width="120" height="20" rx="4" fill="#F0FDF4" stroke="#16A34A" strokeWidth="1" />
                <text x="190" y="18" fontSize="8" fontWeight="bold" fill="#15803D" textAnchor="middle">Linear(d, Classes) ➔ Logits</text>
              </svg>
            </div>
          </div>

          <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ background: '#FAF5FF', border: '1px solid #E9D5FF', borderRadius: '6px', padding: '6px 10px', fontSize: '10.5px', color: '#6B21A8' }}>
              <strong>Inovação Central:</strong> Introduziu o token especial <code>[CLS]</code> na posição 0 como vetor resumo da sequência e a filosofia moderna de pré-treino auto-supervisionado com fine-tuning downstream.
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Evolutionary Link Banner */}
      <div style={{
        background: 'linear-gradient(90deg, #F8FAFC 0%, #EFF6FF 100%)',
        border: '1.5px solid #93C5FD',
        borderRadius: '8px',
        padding: '8px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '14px' }}>🔗</span>
          <span style={{ fontSize: '11px', fontWeight: 800, color: '#1E40AF', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            O Elo de Ligação com o Próximo Marco:
          </span>
          <span style={{ fontSize: '11px', color: '#1E293B' }}>
            O Transformer funcionou para sequências 1D de texto; mas em imagens 2D, pixels gerariam matrizes de atenção proibitivas <MathView math="O(N^2)" />. A solução de engenharia? <strong>Fatiar imagens em Patches Discretos de 16×16 (ViT)</strong>!
          </span>
        </div>
        <span style={{ fontSize: '11px', fontWeight: 700, color: '#0284C7', whiteSpace: 'nowrap' }}>
          Avanço: Tokens de Texto ➔ Fatiamento em Patches Visuais ➔
        </span>
      </div>
    </div>
  );
}
