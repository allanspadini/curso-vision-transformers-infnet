import React from 'react';

export default function CLIPTensorTrackingDiagram() {
  const steps = [
    {
      stage: 'Passo 1',
      title: 'Entrada Bruta',
      imgShape: '[B, 3, 224, 224]',
      imgDesc: 'Imagens RGB normalizadas',
      txtShape: '[B, 77]',
      txtDesc: 'Tokens BPE com [SOS] e [EOS]',
      color: '#0A345D'
    },
    {
      stage: 'Passo 2',
      title: 'Backbone Encoders',
      imgShape: '[B, 768] (ViT-B/32)',
      imgDesc: 'Extração via token [CLS]',
      txtShape: '[B, 512] (Transformer)',
      txtDesc: 'Extração via token [EOS]',
      color: '#0284C7'
    },
    {
      stage: 'Passo 3',
      title: 'Projeção Linear W',
      imgShape: '[B, 512] = [B, 768] × W_v',
      imgDesc: 'Matriz W_v: [768, 512]',
      txtShape: '[B, 512] = [B, 512] × W_t',
      txtDesc: 'Matriz W_t: [512, 512]',
      color: '#9333EA'
    },
    {
      stage: 'Passo 4',
      title: 'Normalização L2',
      imgShape: 'Î = I / ||I||_2 ∈ S^(D-1)',
      imgDesc: 'Norma euclidiana unitária',
      txtShape: 'T̂ = T / ||T||_2 ∈ S^(D-1)',
      txtDesc: 'Norma euclidiana unitária',
      color: '#16A34A'
    },
    {
      stage: 'Passo 5',
      title: 'Logits & Perda',
      imgShape: 'Logits: [B, B] = (Î · T̂^T) / τ',
      imgDesc: 'Similaridade de cosseno em lote',
      txtShape: 'Loss: 0.5 × (L_img + L_txt)',
      txtDesc: 'Cross-Entropy Simétrica',
      color: '#EA580C'
    }
  ];

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Top Banner de Resumo de Tensores */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '12px'
      }}>
        {steps.map((st, i) => (
          <div key={i} style={{
            background: '#FFFFFF',
            border: `1.5px solid ${st.color}`,
            borderRadius: '10px',
            padding: '12px',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{
                background: st.color,
                color: '#FFFFFF',
                fontSize: '10px',
                fontWeight: 800,
                padding: '2px 6px',
                borderRadius: '4px',
                fontFamily: 'var(--font-code)'
              }}>
                {st.stage}
              </span>
              <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
                {st.title}
              </span>
            </div>

            {/* Caixa Imagem */}
            <div style={{ background: '#F0F9FF', border: '1px solid #BAE6FD', padding: '6px 8px', borderRadius: '6px' }}>
              <div style={{ fontSize: '9px', fontWeight: 800, color: '#0369A1' }}>📷 VISÃO</div>
              <div style={{ fontSize: '10.5px', fontFamily: 'Fira Code', fontWeight: 700, color: '#0284C7', margin: '2px 0' }}>
                {st.imgShape}
              </div>
              <div style={{ fontSize: '8.5px', color: '#075985' }}>{st.imgDesc}</div>
            </div>

            {/* Caixa Texto */}
            <div style={{ background: '#FAF5FF', border: '1px solid #E9D5FF', padding: '6px 8px', borderRadius: '6px' }}>
              <div style={{ fontSize: '9px', fontWeight: 800, color: '#7E22CE' }}>📝 TEXTO</div>
              <div style={{ fontSize: '10.5px', fontFamily: 'Fira Code', fontWeight: 700, color: '#9333EA', margin: '2px 0' }}>
                {st.txtShape}
              </div>
              <div style={{ fontSize: '8.5px', color: '#6B21A8' }}>{st.txtDesc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Diagrama Esquemático Central com Pipeline Vetorial */}
      <div style={{
        flex: 1,
        background: '#FFFFFF',
        border: '1px solid var(--border-light)',
        borderRadius: '12px',
        padding: '16px 20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <svg viewBox="0 0 1100 240" style={{ width: '100%', height: '100%' }}>
          {/* Linha Guia Imagem */}
          <line x1="80" y1="60" x2="1020" y2="60" stroke="#BAE6FD" strokeWidth="3" strokeDasharray="4 4" />
          
          {/* Linha Guia Texto */}
          <line x1="80" y1="180" x2="1020" y2="180" stroke="#E9D5FF" strokeWidth="3" strokeDasharray="4 4" />

          {/* Nós Imagem */}
          <circle cx="100" cy="60" r="22" fill="#0284C7" />
          <text x="100" y="65" textAnchor="middle" fontSize="11" fontWeight="800" fill="#FFFFFF">X_img</text>
          <text x="100" y="30" textAnchor="middle" fontSize="10" fontFamily="Fira Code" fontWeight="700" fill="#0369A1">[B, 3, 224, 224]</text>

          <circle cx="320" cy="60" r="22" fill="#0284C7" />
          <text x="320" y="65" textAnchor="middle" fontSize="10" fontWeight="800" fill="#FFFFFF">CLS</text>
          <text x="320" y="30" textAnchor="middle" fontSize="10" fontFamily="Fira Code" fontWeight="700" fill="#0369A1">[B, 768]</text>

          <circle cx="550" cy="60" r="22" fill="#0284C7" />
          <text x="550" y="65" textAnchor="middle" fontSize="10" fontWeight="800" fill="#FFFFFF">I_proj</text>
          <text x="550" y="30" textAnchor="middle" fontSize="10" fontFamily="Fira Code" fontWeight="700" fill="#0369A1">[B, 512]</text>

          <circle cx="780" cy="60" r="22" fill="#16A34A" />
          <text x="780" y="65" textAnchor="middle" fontSize="11" fontWeight="800" fill="#FFFFFF">Î</text>
          <text x="780" y="30" textAnchor="middle" fontSize="10" fontFamily="Fira Code" fontWeight="700" fill="#15803D">||Î_i|| = 1.0</text>


          {/* Nós Texto */}
          <circle cx="100" cy="180" r="22" fill="#9333EA" />
          <text x="100" y="185" textAnchor="middle" fontSize="11" fontWeight="800" fill="#FFFFFF">X_txt</text>
          <text x="100" y="218" textAnchor="middle" fontSize="10" fontFamily="Fira Code" fontWeight="700" fill="#7E22CE">[B, 77]</text>

          <circle cx="320" cy="180" r="22" fill="#9333EA" />
          <text x="320" y="185" textAnchor="middle" fontSize="10" fontWeight="800" fill="#FFFFFF">EOS</text>
          <text x="320" y="218" textAnchor="middle" fontSize="10" fontFamily="Fira Code" fontWeight="700" fill="#7E22CE">[B, 512]</text>

          <circle cx="550" cy="180" r="22" fill="#9333EA" />
          <text x="550" y="185" textAnchor="middle" fontSize="10" fontWeight="800" fill="#FFFFFF">T_proj</text>
          <text x="550" y="218" textAnchor="middle" fontSize="10" fontFamily="Fira Code" fontWeight="700" fill="#7E22CE">[B, 512]</text>

          <circle cx="780" cy="180" r="22" fill="#16A34A" />
          <text x="780" y="185" textAnchor="middle" fontSize="11" fontWeight="800" fill="#FFFFFF">T̂</text>
          <text x="780" y="218" textAnchor="middle" fontSize="10" fontFamily="Fira Code" fontWeight="700" fill="#15803D">||T̂_j|| = 1.0</text>


          {/* Conexão para Matriz de Logits */}
          <path d="M 805 60 C 880 60, 880 110, 940 115" stroke="#16A34A" strokeWidth="2.5" fill="none" />
          <path d="M 805 180 C 880 180, 880 130, 940 125" stroke="#16A34A" strokeWidth="2.5" fill="none" />

          {/* Caixa Logits */}
          <rect x="940" y="95" width="130" height="50" rx="8" fill="#ECFDF5" stroke="#16A34A" strokeWidth="2" />
          <text x="1005" y="116" textAnchor="middle" fontSize="11" fontWeight="800" fill="#15803D">Logits = Î · T̂^T</text>
          <text x="1005" y="134" textAnchor="middle" fontSize="9.5" fontFamily="Fira Code" fontWeight="700" fill="#047857">[B, B] / τ</text>
        </svg>
      </div>

      {/* Caixa de Destaque Técnico */}
      <div style={{
        background: '#FFFBEB',
        border: '1px solid #FDE68A',
        borderRadius: '8px',
        padding: '10px 18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ background: '#F59E0B', color: '#FFFFFF', padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 800 }}>
            INSIGHT CRÍTICO
          </span>
          <span style={{ fontSize: '12px', color: '#92400E', fontWeight: 600 }}>
            A normalização L2 prévia transforma o produto matricial puro diretamente em Cosseno de Ângulo: 
            <code style={{ fontFamily: 'Fira Code', marginLeft: '6px', background: '#FEF3C7', padding: '1px 6px', borderRadius: '3px' }}>
              cos(θ_ij) = Î_i · T̂_j ∈ [-1.0, +1.0]
            </code>
          </span>
        </div>
        <span style={{ fontSize: '11px', color: '#B45309', fontFamily: 'Fira Code' }}>
          τ_init = 0.07 (clamp max: 100)
        </span>
      </div>
    </div>
  );
}
