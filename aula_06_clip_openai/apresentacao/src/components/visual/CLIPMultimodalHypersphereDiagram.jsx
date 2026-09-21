import React from 'react';

export default function CLIPMultimodalHypersphereDiagram() {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '20px', flex: 1 }}>
        
        {/* Esquerda: Visualização Geométrica da Hiperesfera Unitária */}
        <div style={{
          background: '#FFFFFF',
          border: '1.5px solid var(--border-light)',
          borderRadius: '12px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--infnet-dark-blue)' }}>
              Geometria da Hiperesfera Unitária S^{'{'}D-1{'}'} (D = 512)
            </span>
            <span style={{
              background: '#F0FDF4',
              color: '#15803D',
              border: '1px solid #BBF7D0',
              fontSize: '10.5px',
              fontWeight: 700,
              padding: '2px 8px',
              borderRadius: '12px'
            }}>
              Espaço Compartilhado
            </span>
          </div>

          <svg viewBox="0 0 540 320" style={{ width: '100%', height: '300px' }}>
            <defs>
              <radialGradient id="sphere-grad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#F8FAFC" />
                <stop offset="85%" stopColor="#EDF2F7" />
                <stop offset="100%" stopColor="#CBD5E1" />
              </radialGradient>
            </defs>

            {/* Círculo Principal da Hiperesfera */}
            <circle cx="270" cy="160" r="130" fill="url(#sphere-grad)" stroke="#0A345D" strokeWidth="2.5" />
            
            {/* Linhas de Longitude e Latitude para dar aspecto 3D esférico */}
            <ellipse cx="270" cy="160" rx="130" ry="40" fill="none" stroke="#94A3B8" strokeWidth="1" strokeDasharray="3 3" />
            <ellipse cx="270" cy="160" rx="40" ry="130" fill="none" stroke="#94A3B8" strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="270" cy="160" r="3" fill="#0A345D" />

            {/* Cluster 1: Animais / Caninos (Quadrante Superior Direito) */}
            <g transform="translate(345, 95)">
              <circle cx="0" cy="0" r="28" fill="#F0FDF4" stroke="#22C55E" strokeWidth="1.5" strokeDasharray="2 2" />
              {/* Ponto Imagem */}
              <circle cx="-8" cy="-6" r="5" fill="#0284C7" />
              <text x="-16" y="-10" textAnchor="end" fontSize="9" fontWeight="700" fill="#0284C7">I_husky</text>
              {/* Ponto Texto */}
              <circle cx="10" cy="8" r="5" fill="#9333EA" />
              <text x="18" y="14" textAnchor="start" fontSize="9" fontWeight="700" fill="#9333EA">"a dog in snow"</text>
              {/* Linha de Proximidade */}
              <line x1="-8" y1="-6" x2="10" y2="8" stroke="#16A34A" strokeWidth="1.5" />
              <text x="1" y="24" textAnchor="middle" fontSize="8" fontFamily="Fira Code" fill="#15803D">cos θ = 0.88</text>
            </g>

            {/* Cluster 2: Veículos / Aeronaves (Quadrante Superior Esquerdo) */}
            <g transform="translate(195, 95)">
              <circle cx="0" cy="0" r="28" fill="#F0F9FF" stroke="#0284C7" strokeWidth="1.5" strokeDasharray="2 2" />
              <circle cx="-10" cy="2" r="5" fill="#0284C7" />
              <text x="-18" y="5" textAnchor="end" fontSize="9" fontWeight="700" fill="#0284C7">I_avião</text>
              <circle cx="8" cy="-6" r="5" fill="#9333EA" />
              <text x="16" y="-8" textAnchor="start" fontSize="9" fontWeight="700" fill="#9333EA">"a jet flying"</text>
              <line x1="-10" y1="2" x2="8" y2="-6" stroke="#0284C7" strokeWidth="1.5" />
              <text x="-1" y="24" textAnchor="middle" fontSize="8" fontFamily="Fira Code" fill="#0369A1">cos θ = 0.84</text>
            </g>

            {/* Cluster 3: Alimentos (Quadrante Inferior) */}
            <g transform="translate(270, 240)">
              <circle cx="0" cy="0" r="28" fill="#FFF7ED" stroke="#EA580C" strokeWidth="1.5" strokeDasharray="2 2" />
              <circle cx="-8" cy="-4" r="5" fill="#0284C7" />
              <text x="-16" y="-8" textAnchor="end" fontSize="9" fontWeight="700" fill="#0284C7">I_pizza</text>
              <circle cx="10" cy="6" r="5" fill="#9333EA" />
              <text x="18" y="12" textAnchor="start" fontSize="9" fontWeight="700" fill="#9333EA">"slice of pizza"</text>
              <line x1="-8" y1="-4" x2="10" y2="6" stroke="#EA580C" strokeWidth="1.5" />
              <text x="1" y="24" textAnchor="middle" fontSize="8" fontFamily="Fira Code" fill="#C2410C">cos θ = 0.91</text>
            </g>

            {/* Vetores de Ortogonalidade entre clusters */}
            <line x1="195" y1="95" x2="345" y2="95" stroke="#94A3B8" strokeWidth="1.2" strokeDasharray="3 3" />
            <text x="270" y="85" textAnchor="middle" fontSize="8.5" fill="#64748B">cos(avião, cão) ≈ 0.04 (Ortogonais)</text>

            <line x1="270" y1="160" x2="345" y2="95" stroke="#16A34A" strokeWidth="1.5" />
            <line x1="270" y1="160" x2="195" y2="95" stroke="#0284C7" strokeWidth="1.5" />
            <line x1="270" y1="160" x2="270" y2="240" stroke="#EA580C" strokeWidth="1.5" />
          </svg>
        </div>

        {/* Direita: Propriedades Fundamentais do Espaço Latente */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          
          <div style={{
            background: '#F0F9FF',
            border: '1px solid #BAE6FD',
            borderRadius: '10px',
            padding: '14px',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px'
          }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#0369A1' }}>
              1. Isomorfismo Semântico Cross-Modal
            </span>
            <p style={{ fontSize: '11.5px', color: '#0F172A', lineHeight: '1.45', margin: 0 }}>
              Imagens e textos que compartilham significado convergem para a mesma vizinhança topológica na hiperesfera, independentemente da modalidade de origem.
            </p>
          </div>

          <div style={{
            background: '#FAF5FF',
            border: '1px solid #E9D5FF',
            borderRadius: '10px',
            padding: '14px',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px'
          }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#7E22CE' }}>
              2. Separação de Conceitos Não Relacionados
            </span>
            <p style={{ fontSize: '11.5px', color: '#0F172A', lineHeight: '1.45', margin: 0 }}>
              Conceitos semânticos ortogonais (ex: "avião a jato" vs "golden retriever") apresentam produto escalar próximo de zero na dimensão D=512, garantindo alta discriminação.
            </p>
          </div>

          <div style={{
            background: '#ECFDF5',
            border: '1px solid #A7F3D0',
            borderRadius: '10px',
            padding: '14px',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px'
          }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#065F46' }}>
              3. Aritmética Vetorial Multimodal
            </span>
            <p style={{ fontSize: '11.5px', color: '#0F172A', lineHeight: '1.45', margin: 0 }}>
              Assim como no Word2Vec, é possível somar e subtrair vetores:
              <br />
              <code style={{ fontSize: '10.5px', fontFamily: 'Fira Code', background: '#D1FAE5', padding: '2px 6px', borderRadius: '4px', display: 'inline-block', marginTop: '4px' }}>
                Emb(Imagem Homem) + Emb("óculos") ≈ Emb(Imagem Homem com Óculos)
              </code>
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
