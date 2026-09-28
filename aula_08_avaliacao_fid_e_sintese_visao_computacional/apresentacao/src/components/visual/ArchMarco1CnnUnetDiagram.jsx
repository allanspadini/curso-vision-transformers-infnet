import React from 'react';
import MathView from '../MathView';

export default function ArchMarco1CnnUnetDiagram() {
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
            MARCO 1 / 6
          </span>
          <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
            CNNs Profundas (ResNet) & U-Net: A Era dos Convolutivos e Conexões Residuais
          </span>
        </div>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <span style={{ padding: '3px 8px', borderRadius: '4px', background: '#0A345D', color: '#FFFFFF', fontSize: '10px', fontWeight: 700 }}>1. CNN / U-Net</span>
          <span style={{ color: '#94A3B8', fontSize: '10px' }}>➔</span>
          <span style={{ padding: '3px 8px', borderRadius: '4px', background: '#F1F5F9', color: '#64748B', fontSize: '10px', fontWeight: 600 }}>2. Transformer</span>
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

      {/* Main Grid: 2 Architectural Columns (ResNet + U-Net) */}
      <div style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '12px',
        minHeight: 0
      }}>
        {/* Left Column: ResNet & BasicBlock */}
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
                <strong style={{ fontSize: '12.5px', color: '#0A345D' }}>ResNet: O Atalho Residual x + F(x)</strong>
              </div>
              <span className="badge badge-cyan" style={{ fontSize: '9.5px' }}>He et al. (CVPR 2016)</span>
            </div>

            {/* SVG Visual Scheme of Residual Block */}
            <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '10px', position: 'relative' }}>
              <svg viewBox="0 0 380 145" style={{ width: '100%', height: '145px' }}>
                {/* Input tensor */}
                <rect x="20" y="55" width="55" height="35" rx="5" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1.5" />
                <text x="47" y="72" fontSize="10" fontWeight="bold" fill="#0369A1" textAnchor="middle">Input x</text>
                <text x="47" y="84" fontSize="8" fill="#475569" textAnchor="middle">[B, C, H, W]</text>

                {/* Main Branch: Conv1 */}
                <path d="M 75 72 L 105 72" stroke="#0284C7" strokeWidth="2" fill="none" markerEnd="url(#arrow-cyan)" />
                <rect x="105" y="52" width="70" height="40" rx="5" fill="#FFFFFF" stroke="#0A345D" strokeWidth="1.5" />
                <text x="140" y="68" fontSize="9.5" fontWeight="bold" fill="#0A345D" textAnchor="middle">Conv 3×3</text>
                <text x="140" y="82" fontSize="8" fill="#64748B" textAnchor="middle">BN + ReLU</text>

                {/* Main Branch: Conv2 */}
                <path d="M 175 72 L 205 72" stroke="#0284C7" strokeWidth="2" fill="none" markerEnd="url(#arrow-cyan)" />
                <rect x="205" y="52" width="70" height="40" rx="5" fill="#FFFFFF" stroke="#0A345D" strokeWidth="1.5" />
                <text x="240" y="68" fontSize="9.5" fontWeight="bold" fill="#0A345D" textAnchor="middle">Conv 3×3</text>
                <text x="240" y="82" fontSize="8" fill="#64748B" textAnchor="middle">BN (F(x))</text>

                {/* Sum node */}
                <path d="M 275 72 L 305 72" stroke="#0284C7" strokeWidth="2" fill="none" />
                <circle cx="315" cy="72" r="10" fill="#F0FDF4" stroke="#16A34A" strokeWidth="2" />
                <text x="315" y="76" fontSize="13" fontWeight="bold" fill="#15803D" textAnchor="middle">⊕</text>

                {/* Residual shortcut curved path */}
                <path d="M 60 55 L 60 22 Q 60 14 70 14 L 305 14 Q 315 14 315 22 L 315 62" stroke="#16A34A" strokeWidth="2.5" strokeDasharray="4 2" fill="none" />
                <rect x="155" y="5" width="85" height="18" rx="4" fill="#DCFCE7" stroke="#86EFAC" strokeWidth="1" />
                <text x="197" y="17" fontSize="8.5" fontWeight="bold" fill="#166534" textAnchor="middle">Identidade x (Atalho)</text>

                {/* Output */}
                <path d="M 325 72 L 345 72" stroke="#0284C7" strokeWidth="2" fill="none" />
                <rect x="345" y="55" width="30" height="35" rx="5" fill="#FEF3C7" stroke="#D97706" strokeWidth="1.5" />
                <text x="360" y="70" fontSize="8.5" fontWeight="bold" fill="#92400E" textAnchor="middle">ReLU</text>
                <text x="360" y="82" fontSize="7.5" fill="#B45309" textAnchor="middle">F+x</text>

                {/* Gradient Highway Annotation */}
                <path d="M 325 105 L 55 105" stroke="#9333EA" strokeWidth="1.5" strokeDasharray="3 2" fill="none" />
                <text x="190" y="120" fontSize="8.5" fontWeight="bold" fill="#7E22CE" textAnchor="middle">
                  Rodovia de Gradiente: dL/dx = dL/dy · (1 + dF/dx) ➔ Sem Vanishing Gradient!
                </text>
              </svg>
            </div>
          </div>

          <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ background: '#F0F9FF', border: '1px solid #BAE6FD', borderRadius: '6px', padding: '6px 10px', fontSize: '10.5px', color: '#0369A1' }}>
              <strong>Inovação Central:</strong> Permitiu treinar redes com 50, 101 e 152 camadas sem degradação, onde o atalho de identidade garante fluxo ininterrupto de gradientes até as primeiras camadas.
            </div>
          </div>
        </div>

        {/* Right Column: U-Net & Skip Connections */}
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
                <strong style={{ fontSize: '12.5px', color: '#0A345D' }}>U-Net: Encoder-Decoder Simétrico com Skips</strong>
              </div>
              <span className="badge badge-green" style={{ fontSize: '9.5px' }}>Ronneberger et al. (MICCAI 2015)</span>
            </div>

            {/* SVG Visual Scheme of U-Net */}
            <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '10px', position: 'relative' }}>
              <svg viewBox="0 0 380 145" style={{ width: '100%', height: '145px' }}>
                {/* Level 1: High Res */}
                <rect x="20" y="15" width="60" height="24" rx="4" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1" />
                <text x="50" y="30" fontSize="8.5" fontWeight="bold" fill="#0369A1" textAnchor="middle">Enc 1 [224²]</text>

                <rect x="300" y="15" width="60" height="24" rx="4" fill="#DCFCE7" stroke="#16A34A" strokeWidth="1" />
                <text x="330" y="30" fontSize="8.5" fontWeight="bold" fill="#15803D" textAnchor="middle">Dec 1 [224²]</text>

                <path d="M 80 27 L 300 27" stroke="#0284C7" strokeWidth="2" strokeDasharray="3 2" fill="none" />
                <text x="190" y="23" fontSize="8" fontWeight="bold" fill="#0284C7" textAnchor="middle">Skip Connection Longa (Bordas Finas)</text>

                {/* Level 2: Mid Res */}
                <rect x="50" y="55" width="55" height="22" rx="4" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1" />
                <text x="77" y="69" fontSize="8" fontWeight="bold" fill="#0369A1" textAnchor="middle">Enc 2 [112²]</text>

                <rect x="275" y="55" width="55" height="22" rx="4" fill="#DCFCE7" stroke="#16A34A" strokeWidth="1" />
                <text x="302" y="69" fontSize="8" fontWeight="bold" fill="#15803D" textAnchor="middle">Dec 2 [112²]</text>

                <path d="M 105 66 L 275 66" stroke="#0284C7" strokeWidth="1.5" strokeDasharray="3 2" fill="none" />

                {/* Level 3: Central Bottleneck */}
                <rect x="120" y="98" width="140" height="26" rx="5" fill="#FAF5FF" stroke="#9333EA" strokeWidth="2" />
                <text x="190" y="112" fontSize="9" fontWeight="bold" fill="#6B21A8" textAnchor="middle">⚡ Bottleneck Central [28²]</text>
                <text x="190" y="121" fontSize="7.5" fill="#7E22CE" textAnchor="middle">Máxima Abstração Semântica</text>

                {/* Contracting path arrows */}
                <path d="M 50 39 L 65 55" stroke="#64748B" strokeWidth="1.5" fill="none" />
                <path d="M 77 77 L 125 98" stroke="#64748B" strokeWidth="1.5" fill="none" />

                {/* Expanding path arrows */}
                <path d="M 255 98 L 290 77" stroke="#64748B" strokeWidth="1.5" fill="none" />
                <path d="M 310 55 L 325 39" stroke="#64748B" strokeWidth="1.5" fill="none" />
              </svg>
            </div>
          </div>

          <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ background: '#F0FDF4', border: '1px solid #86EFAC', borderRadius: '6px', padding: '6px 10px', fontSize: '10.5px', color: '#166534' }}>
              <strong>Inovação Central:</strong> A combinação de contração e expansão com pontes de atalho copiou detalhes anatômicos e de pixel diretamente para a saída, tornando-se a base de segmentação e de **modelos de difusão**.
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
            Filtros 3×3 possuem <strong>viés indutivo estritamente local</strong>. Para capturar relações globais em sequências longas e entre pontos distantes da imagem sem empilhar dezenas de convoluções, surge a <strong>Auto-Atenção Pura (Transformers)</strong>.
          </span>
        </div>
        <span style={{ fontSize: '11px', fontWeight: 700, color: '#0284C7', whiteSpace: 'nowrap' }}>
          Avanço: Convolução Local ➔ Auto-Atenção Global ➔
        </span>
      </div>
    </div>
  );
}
