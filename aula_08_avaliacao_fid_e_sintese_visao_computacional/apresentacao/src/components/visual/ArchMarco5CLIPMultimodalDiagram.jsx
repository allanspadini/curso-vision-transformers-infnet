import React from 'react';
import MathView from '../MathView';

export default function ArchMarco5CLIPMultimodalDiagram() {
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
            MARCO 5 / 6
          </span>
          <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
            CLIP: Alinhamento Multimodal Visão-Texto e Aprendizado Zero-Shot
          </span>
        </div>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <span style={{ padding: '3px 8px', borderRadius: '4px', background: '#F1F5F9', color: '#64748B', fontSize: '10px', fontWeight: 600 }}>1. CNN / U-Net</span>
          <span style={{ color: '#94A3B8', fontSize: '10px' }}>➔</span>
          <span style={{ padding: '3px 8px', borderRadius: '4px', background: '#F1F5F9', color: '#64748B', fontSize: '10px', fontWeight: 600 }}>2. Transformer</span>
          <span style={{ color: '#94A3B8', fontSize: '10px' }}>➔</span>
          <span style={{ padding: '3px 8px', borderRadius: '4px', background: '#F1F5F9', color: '#64748B', fontSize: '10px', fontWeight: 600 }}>3. ViT</span>
          <span style={{ color: '#94A3B8', fontSize: '10px' }}>➔</span>
          <span style={{ padding: '3px 8px', borderRadius: '4px', background: '#F1F5F9', color: '#64748B', fontSize: '10px', fontWeight: 600 }}>4. Swin</span>
          <span style={{ color: '#94A3B8', fontSize: '10px' }}>➔</span>
          <span style={{ padding: '3px 8px', borderRadius: '4px', background: '#0A345D', color: '#FFFFFF', fontSize: '10px', fontWeight: 700 }}>5. CLIP</span>
          <span style={{ color: '#94A3B8', fontSize: '10px' }}>➔</span>
          <span style={{ padding: '3px 8px', borderRadius: '4px', background: '#F1F5F9', color: '#64748B', fontSize: '10px', fontWeight: 600 }}>6. Difusão/GAN</span>
        </div>
      </div>

      {/* Main Grid: 2 Architectural Columns (Dual-Encoder Hypersphere + Contrastive Matrix) */}
      <div style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '12px',
        minHeight: 0
      }}>
        {/* Left Column: Dual Encoder & Shared Hypersphere */}
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
                <strong style={{ fontSize: '12.5px', color: '#0A345D' }}>Arquitetura Dual-Encoder & Hiperesfera S⁵¹¹</strong>
              </div>
              <span className="badge badge-cyan" style={{ fontSize: '9.5px' }}>Radford et al. (OpenAI 2021)</span>
            </div>

            {/* SVG Visual Scheme */}
            <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '10px', position: 'relative' }}>
              <svg viewBox="0 0 380 145" style={{ width: '100%', height: '145px' }}>
                {/* Visual Stream (Top) */}
                <rect x="15" y="16" width="60" height="34" rx="4" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="1" />
                <text x="45" y="30" fontSize="8" fontWeight="bold" fill="#1E40AF" textAnchor="middle">Imagem I_i</text>
                <text x="45" y="42" fontSize="7" fill="#64748B" textAnchor="middle">[3, 224, 224]</text>

                <path d="M 75 33 L 95 33" stroke="#0284C7" strokeWidth="1.5" />
                <polygon points="95,30 100,33 95,36" fill="#0284C7" />

                <rect x="100" y="16" width="85" height="34" rx="4" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1.2" />
                <text x="142" y="30" fontSize="8" fontWeight="bold" fill="#0369A1" textAnchor="middle">Image Encoder</text>
                <text x="142" y="42" fontSize="7" fill="#0284C7" textAnchor="middle">ViT-B/32 ou ResNet</text>

                <path d="M 185 33 L 205 33" stroke="#0284C7" strokeWidth="1.5" />
                <polygon points="205,30 210,33 205,36" fill="#0284C7" />

                <rect x="210" y="16" width="60" height="34" rx="4" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="1" />
                <text x="240" y="30" fontSize="8" fontWeight="bold" fill="#1D4ED8" textAnchor="middle">Proj W_I + ℓ₂</text>
                <text x="240" y="42" fontSize="7" fill="#1E40AF" textAnchor="middle">||I_i|| = 1</text>

                {/* Text Stream (Bottom) */}
                <rect x="15" y="92" width="60" height="34" rx="4" fill="#FAF5FF" stroke="#9333EA" strokeWidth="1" />
                <text x="45" y="106" fontSize="7.5" fontWeight="bold" fill="#6B21A8" textAnchor="middle">Texto T_j</text>
                <text x="45" y="118" fontSize="7" fill="#7E22CE" textAnchor="middle">"a photo of a..."</text>

                <path d="M 75 109 L 95 109" stroke="#9333EA" strokeWidth="1.5" />
                <polygon points="95,106 100,109 95,112" fill="#9333EA" />

                <rect x="100" y="92" width="85" height="34" rx="4" fill="#F3E8FF" stroke="#9333EA" strokeWidth="1.2" />
                <text x="142" y="106" fontSize="8" fontWeight="bold" fill="#6B21A8" textAnchor="middle">Text Encoder</text>
                <text x="142" y="118" fontSize="7" fill="#9333EA" textAnchor="middle">Transformer (CBOW)</text>

                <path d="M 185 109 L 205 109" stroke="#9333EA" strokeWidth="1.5" />
                <polygon points="205,106 210,109 205,112" fill="#9333EA" />

                <rect x="210" y="92" width="60" height="34" rx="4" fill="#FAF5FF" stroke="#9333EA" strokeWidth="1" />
                <text x="240" y="106" fontSize="8" fontWeight="bold" fill="#7E22CE" textAnchor="middle">Proj W_T + ℓ₂</text>
                <text x="240" y="118" fontSize="7" fill="#6B21A8" textAnchor="middle">||T_j|| = 1</text>

                {/* Hypersphere Convergence Circle */}
                <circle cx="325" cy="71" r="38" fill="#F8FAFC" stroke="#0A345D" strokeWidth="1.5" strokeDasharray="3 2" />
                <text x="325" y="66" fontSize="8.5" fontWeight="bold" fill="#0A345D" textAnchor="middle">Hiperesfera</text>
                <text x="325" y="78" fontSize="8" fontFamily="var(--font-code)" fill="#0284C7" textAnchor="middle">S⁵¹¹ ⊂ ℝ⁵¹²</text>
                <text x="325" y="90" fontSize="7" fill="#16A34A" textAnchor="middle">cos(θ) → 1</text>

                {/* Vectors into sphere */}
                <path d="M 270 33 C 290 33, 305 45, 312 52" stroke="#0284C7" strokeWidth="1.5" />
                <polygon points="310,50 316,56 314,48" fill="#0284C7" />

                <path d="M 270 109 C 290 109, 305 97, 312 90" stroke="#9333EA" strokeWidth="1.5" />
                <polygon points="314,94 316,86 310,92" fill="#9333EA" />
              </svg>
            </div>
          </div>

          <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ background: '#F0F9FF', border: '1px solid #BAE6FD', borderRadius: '6px', padding: '6px 10px', fontSize: '10.5px', color: '#0369A1' }}>
              <strong>Inovação Central:</strong> Desacoplamento modal com projeção em hiperesfera unitária de 512 dimensões. Elimina cabeças de classificação pré-fixadas e viabiliza classificação <em>Zero-Shot</em> em qualquer vocabulário.
            </div>
          </div>
        </div>

        {/* Right Column: Similarity Matrix & InfoNCE Loss */}
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
                <strong style={{ fontSize: '12.5px', color: '#0A345D' }}>Matriz de Similaridade & Perda InfoNCE</strong>
              </div>
              <span className="badge badge-green" style={{ fontSize: '9.5px' }}>400M Pares (WIT Dataset)</span>
            </div>

            {/* SVG Visual Scheme */}
            <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '10px', position: 'relative' }}>
              <svg viewBox="0 0 380 145" style={{ width: '100%', height: '145px' }}>
                {/* Matriz N x N */}
                <g transform="translate(35, 10)">
                  <text x="65" y="10" fontSize="8" fontWeight="bold" fill="#0A345D" textAnchor="middle">Embeddings de Texto (T_1 ... T_N)</text>
                  <text x="-5" y="65" fontSize="8" fontWeight="bold" fill="#0A345D" textAnchor="middle" transform="rotate(-90 -5 65)">Imagens (I)</text>

                  {/* Grid 4x4 */}
                  {/* Row 1 */}
                  <rect x="20" y="20" width="22" height="22" fill="#86EFAC" stroke="#16A34A" strokeWidth="1.5" />
                  <text x="31" y="34" fontSize="8.5" fontWeight="bold" fill="#14532D" textAnchor="middle">I₁·T₁</text>

                  <rect x="44" y="20" width="22" height="22" fill="#FEE2E2" stroke="#F87171" strokeWidth="0.8" />
                  <text x="55" y="34" fontSize="7" fill="#991B1B" textAnchor="middle">I₁·T₂</text>

                  <rect x="68" y="20" width="22" height="22" fill="#FEE2E2" stroke="#F87171" strokeWidth="0.8" />
                  <rect x="92" y="20" width="22" height="22" fill="#FEE2E2" stroke="#F87171" strokeWidth="0.8" />

                  {/* Row 2 */}
                  <rect x="20" y="44" width="22" height="22" fill="#FEE2E2" stroke="#F87171" strokeWidth="0.8" />
                  <rect x="44" y="44" width="22" height="22" fill="#86EFAC" stroke="#16A34A" strokeWidth="1.5" />
                  <text x="55" y="58" fontSize="8.5" fontWeight="bold" fill="#14532D" textAnchor="middle">I₂·T₂</text>
                  <rect x="68" y="44" width="22" height="22" fill="#FEE2E2" stroke="#F87171" strokeWidth="0.8" />
                  <rect x="92" y="44" width="22" height="22" fill="#FEE2E2" stroke="#F87171" strokeWidth="0.8" />

                  {/* Row 3 */}
                  <rect x="20" y="68" width="22" height="22" fill="#FEE2E2" stroke="#F87171" strokeWidth="0.8" />
                  <rect x="44" y="68" width="22" height="22" fill="#FEE2E2" stroke="#F87171" strokeWidth="0.8" />
                  <rect x="68" y="68" width="22" height="22" fill="#86EFAC" stroke="#16A34A" strokeWidth="1.5" />
                  <text x="79" y="82" fontSize="8.5" fontWeight="bold" fill="#14532D" textAnchor="middle">I₃·T₃</text>
                  <rect x="92" y="68" width="22" height="22" fill="#FEE2E2" stroke="#F87171" strokeWidth="0.8" />

                  {/* Row 4 */}
                  <rect x="20" y="92" width="22" height="22" fill="#FEE2E2" stroke="#F87171" strokeWidth="0.8" />
                  <rect x="44" y="92" width="22" height="22" fill="#FEE2E2" stroke="#F87171" strokeWidth="0.8" />
                  <rect x="68" y="92" width="22" height="22" fill="#FEE2E2" stroke="#F87171" strokeWidth="0.8" />
                  <rect x="92" y="92" width="22" height="22" fill="#86EFAC" stroke="#16A34A" strokeWidth="1.5" />
                  <text x="103" y="106" fontSize="8.5" fontWeight="bold" fill="#14532D" textAnchor="middle">Iₙ·Tₙ</text>
                </g>

                {/* Seta para fórmula da Loss */}
                <path d="M 160 70 L 180 70" stroke="#0A345D" strokeWidth="1.5" />
                <polygon points="180,67 185,70 180,73" fill="#0A345D" />

                {/* Formula Box */}
                <g transform="translate(190, 20)">
                  <rect x="0" y="0" width="165" height="98" rx="6" fill="#F0FDF4" stroke="#86EFAC" strokeWidth="1.2" />
                  <text x="82" y="18" fontSize="8.5" fontWeight="bold" fill="#15803D" textAnchor="middle">Perda Contrastiva Simétrica</text>
                  <text x="82" y="38" fontSize="8" fontFamily="var(--font-code)" fill="#0F172A" textAnchor="middle">
                    L = (L_I→T + L_T→I) / 2
                  </text>
                  <text x="82" y="58" fontSize="7.5" fill="#166534" textAnchor="middle">
                    Diagonal: Maximize cos(I_i, T_i)
                  </text>
                  <text x="82" y="72" fontSize="7.5" fill="#991B1B" textAnchor="middle">
                    Fora da Diagonal: Minimize cos(I_i, T_j)
                  </text>
                  <text x="82" y="88" fontSize="7" fill="#475569" textAnchor="middle">
                    Temperatura aprendível τ ajusta a escala
                  </text>
                </g>
              </svg>
            </div>
          </div>

          <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '6px', padding: '6px 10px', fontSize: '10.5px', color: '#166534' }}>
              <strong>Inovação Central:</strong> Otimização contrastiva simultânea em batch de $N$ pares: alinha pares verdadeiros na diagonal e repele todos os pares falsos, produzindo representações semânticas robustas e transferíveis.
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
            O CLIP conecta texto e imagem para busca e discriminação; mas como **gerar imagens realistas inéditas a partir de descrições textuais**? A solução de engenharia? <strong>Modelos Generativos & U-Net de Difusão Latente condicionada por Cross-Attention do CLIP!</strong>
          </span>
        </div>
        <span style={{ fontSize: '11px', fontWeight: 700, color: '#0284C7', whiteSpace: 'nowrap' }}>
          Avanço: Alinhamento Discriminativo ➔ Síntese Generativa de Pixels ➔
        </span>
      </div>
    </div>
  );
}
