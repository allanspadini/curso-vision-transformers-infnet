import React from 'react';
import MathView from '../MathView';

export default function ArchMarco3ViTCanonicDiagram() {
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
            MARCO 3 / 6
          </span>
          <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
            Vision Transformer (ViT): A Conquista da Atenção Pura em Visão sem Convoluções
          </span>
        </div>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <span style={{ padding: '3px 8px', borderRadius: '4px', background: '#F1F5F9', color: '#64748B', fontSize: '10px', fontWeight: 600 }}>1. CNN / U-Net</span>
          <span style={{ color: '#94A3B8', fontSize: '10px' }}>➔</span>
          <span style={{ padding: '3px 8px', borderRadius: '4px', background: '#F1F5F9', color: '#64748B', fontSize: '10px', fontWeight: 600 }}>2. Transformer</span>
          <span style={{ color: '#94A3B8', fontSize: '10px' }}>➔</span>
          <span style={{ padding: '3px 8px', borderRadius: '4px', background: '#0A345D', color: '#FFFFFF', fontSize: '10px', fontWeight: 700 }}>3. ViT Canônico</span>
          <span style={{ color: '#94A3B8', fontSize: '10px' }}>➔</span>
          <span style={{ padding: '3px 8px', borderRadius: '4px', background: '#F1F5F9', color: '#64748B', fontSize: '10px', fontWeight: 600 }}>4. Swin</span>
          <span style={{ color: '#94A3B8', fontSize: '10px' }}>➔</span>
          <span style={{ padding: '3px 8px', borderRadius: '4px', background: '#F1F5F9', color: '#64748B', fontSize: '10px', fontWeight: 600 }}>5. CLIP</span>
          <span style={{ color: '#94A3B8', fontSize: '10px' }}>➔</span>
          <span style={{ padding: '3px 8px', borderRadius: '4px', background: '#F1F5F9', color: '#64748B', fontSize: '10px', fontWeight: 600 }}>6. Difusão/GAN</span>
        </div>
      </div>

      {/* Main Grid: 2 Architectural Columns (Patch Projection + ViT Transformer Stack) */}
      <div style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '12px',
        minHeight: 0
      }}>
        {/* Left Column: Patch Projection & Token Sequence */}
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
                <strong style={{ fontSize: '12.5px', color: '#0A345D' }}>Fatiamento em Patches & Projeção Linear</strong>
              </div>
              <span className="badge badge-cyan" style={{ fontSize: '9.5px' }}>Dosovitskiy et al. (ICLR 2021)</span>
            </div>

            {/* SVG Visual Scheme */}
            <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '10px', position: 'relative' }}>
              <svg viewBox="0 0 380 145" style={{ width: '100%', height: '145px' }}>
                {/* Imagem 224x224 */}
                <rect x="15" y="35" width="55" height="55" rx="4" fill="#E2E8F0" stroke="#0A345D" strokeWidth="1.5" />
                <line x1="28.75" y1="35" x2="28.75" y2="90" stroke="#94A3B8" strokeWidth="1" strokeDasharray="2 2" />
                <line x1="42.5" y1="35" x2="42.5" y2="90" stroke="#94A3B8" strokeWidth="1" strokeDasharray="2 2" />
                <line x1="56.25" y1="35" x2="56.25" y2="90" stroke="#94A3B8" strokeWidth="1" strokeDasharray="2 2" />
                <line x1="15" y1="48.75" x2="70" y2="48.75" stroke="#94A3B8" strokeWidth="1" strokeDasharray="2 2" />
                <line x1="15" y1="62.5" x2="70" y2="62.5" stroke="#94A3B8" strokeWidth="1" strokeDasharray="2 2" />
                <line x1="15" y1="76.25" x2="70" y2="76.25" stroke="#94A3B8" strokeWidth="1" strokeDasharray="2 2" />
                <text x="42.5" y="103" fontSize="8" fontWeight="bold" fill="#0A345D" textAnchor="middle">224×224×3</text>
                <text x="42.5" y="114" fontSize="7.5" fill="#64748B" textAnchor="middle">196 patches 16×16</text>

                {/* Seta para Flatten & Linear Projection */}
                <path d="M 75 62 L 98 62" stroke="#0284C7" strokeWidth="1.5" fill="none" />
                <polygon points="98,59 104,62 98,65" fill="#0284C7" />

                {/* Flattened Patches */}
                <rect x="108" y="32" width="50" height="60" rx="4" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="1" />
                <text x="133" y="50" fontSize="8" fontWeight="bold" fill="#1D4ED8" textAnchor="middle">Flatten</text>
                <text x="133" y="63" fontSize="7.5" fill="#1E40AF" textAnchor="middle">16×16×3</text>
                <text x="133" y="76" fontSize="8" fontWeight="bold" fill="#0369A1" textAnchor="middle">= 768 dim</text>

                {/* Seta para Projeção Linear + Pos Embed */}
                <path d="M 163 62 L 186 62" stroke="#0284C7" strokeWidth="1.5" fill="none" />
                <polygon points="186,59 192,62 186,65" fill="#0284C7" />

                {/* Sequence [CLS] + 196 Tokens */}
                <rect x="195" y="15" width="170" height="115" rx="6" fill="#FFFFFF" stroke="#0A345D" strokeWidth="1.2" />
                <text x="280" y="30" fontSize="8.5" fontWeight="bold" fill="#0A345D" textAnchor="middle">Sequência de Tokens + Pos. 1D</text>

                {/* [CLS] Token */}
                <rect x="205" y="42" width="34" height="26" rx="4" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1.5" />
                <text x="222" y="58" fontSize="8" fontWeight="bold" fill="#713F12" textAnchor="middle">[CLS]</text>
                <text x="222" y="80" fontSize="7.5" fill="#CA8A04" textAnchor="middle">+ E_pos_0</text>

                {/* Patch 1 Token */}
                <rect x="245" y="42" width="34" height="26" rx="4" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1" />
                <text x="262" y="58" fontSize="8" fontWeight="bold" fill="#0369A1" textAnchor="middle">x_p1 · E</text>
                <text x="262" y="80" fontSize="7.5" fill="#0284C7" textAnchor="middle">+ E_pos_1</text>

                {/* Patch 2 Token */}
                <rect x="285" y="42" width="34" height="26" rx="4" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1" />
                <text x="302" y="58" fontSize="8" fontWeight="bold" fill="#0369A1" textAnchor="middle">x_p2 · E</text>
                <text x="302" y="80" fontSize="7.5" fill="#0284C7" textAnchor="middle">+ E_pos_2</text>

                <text x="335" y="58" fontSize="12" fill="#94A3B8">...</text>

                <rect x="205" y="94" width="150" height="22" rx="4" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1" />
                <text x="280" y="108" fontSize="8" fontFamily="var(--font-code)" fill="#0F172A" textAnchor="middle">
                  Z_0 ∈ ℝ^(197 × 768)
                </text>
              </svg>
            </div>
          </div>

          <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ background: '#F0F9FF', border: '1px solid #BAE6FD', borderRadius: '6px', padding: '6px 10px', fontSize: '10.5px', color: '#0369A1' }}>
              <strong>Inovação Central:</strong> Trata a imagem exatamente como palavras no NLP. Remove o viés indutivo de localidade convolucional; ganha capacidade representacional ilimitada quando pré-treinado em escala massiva (JFT-300M).
            </div>
          </div>
        </div>

        {/* Right Column: Transformer Encoders Stack & Head */}
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
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#7CB342' }}></span>
                <strong style={{ fontSize: '12.5px', color: '#0A345D' }}>Pilha de Encoders & Head [CLS]</strong>
              </div>
              <span className="badge badge-green" style={{ fontSize: '9.5px' }}>ViT-Base (12 Layers, 86M Parâmetros)</span>
            </div>

            {/* SVG Visual Scheme */}
            <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '10px', position: 'relative' }}>
              <svg viewBox="0 0 380 145" style={{ width: '100%', height: '145px' }}>
                {/* Input tensor bar */}
                <rect x="30" y="115" width="320" height="20" rx="4" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="1" />
                <text x="190" y="129" fontSize="8.5" fontFamily="var(--font-code)" fill="#334155" textAnchor="middle">
                  Entrada Z_0: [Batch, 197, 768] (Prepend [CLS] + Patches)
                </text>

                {/* Seta para Bloco Transformer */}
                <path d="M 190 115 L 190 95" stroke="#0A345D" strokeWidth="1.5" />
                <polygon points="187,95 190,89 193,95" fill="#0A345D" />

                {/* Stack de 12 Blocos */}
                <rect x="25" y="42" width="330" height="46" rx="6" fill="#F0FDF4" stroke="#16A34A" strokeWidth="1.8" />
                <text x="190" y="58" fontSize="9.5" fontWeight="bold" fill="#15803D" textAnchor="middle">
                  L = 12 × Blocos Transformer (Pre-LayerNorm)
                </text>
                <text x="190" y="74" fontSize="8" fill="#166534" textAnchor="middle">
                  z'&ell; = MSA(LN(z_&ell;-1)) + z_&ell;-1  |  z_&ell; = MLP(LN(z'&ell;)) + z'&ell;
                </text>

                {/* Seta do CLS para Head */}
                <path d="M 90 42 L 90 26" stroke="#CA8A04" strokeWidth="2" />
                <polygon points="87,26 90,20 93,26" fill="#CA8A04" />

                {/* Output CLS Vector */}
                <rect x="40" y="5" width="100" height="20" rx="4" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1.2" />
                <text x="90" y="18" fontSize="8" fontWeight="bold" fill="#713F12" textAnchor="middle">Vetor z_L^0 ([CLS])</text>

                {/* MLP Classification Head */}
                <path d="M 140 15 L 175 15" stroke="#CA8A04" strokeWidth="1.5" />
                <polygon points="175,12 181,15 175,18" fill="#CA8A04" />

                <rect x="185" y="5" width="170" height="20" rx="4" fill="#EFF6FF" stroke="#2563EB" strokeWidth="1.2" />
                <text x="270" y="18" fontSize="8" fontWeight="bold" fill="#1E40AF" textAnchor="middle">
                  MLP Head ➔ Softmax (1.000 Classes)
                </text>
              </svg>
            </div>
          </div>

          <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '6px', padding: '6px 10px', fontSize: '10.5px', color: '#166534' }}>
              <strong>Inovação Central:</strong> O mecanismo de auto-atenção global estabelece conexões diretas entre qualquer par de patches na camada 1, obtendo um campo receptivo global instantâneo impossível em CNNs convencionais.
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
            O ViT é global, mas seu custo computacional é quadrático <MathView math="O(N^2)" /> e sua resolução espacial é estática (sem pirâmide multiescala), inviabilizando segmentação densa e alta resolução. A solução de engenharia? <strong>O Swin Transformer com Janelas Deslocadas e Pirâmide Hierárquica!</strong>
          </span>
        </div>
        <span style={{ fontSize: '11px', fontWeight: 700, color: '#0284C7', whiteSpace: 'nowrap' }}>
          Avanço: Atenção Global Quadrática ➔ Janelas Deslocadas Lineares ➔
        </span>
      </div>
    </div>
  );
}
