import React from 'react';

export default function GeneratorDiscriminatorArchitectureDiagram() {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {/* Badges de Arquitetura */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#EDF5FA',
        border: '1px solid #D0E3F0',
        borderRadius: '8px',
        padding: '10px 18px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{
            background: 'var(--infnet-dark-blue)',
            color: '#FFFFFF',
            fontSize: '11px',
            fontWeight: 700,
            padding: '3px 10px',
            borderRadius: '4px',
            fontFamily: 'var(--font-code)'
          }}>
            Radford, Metz & Chintala (ICLR, 2016)
          </span>
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--infnet-dark-blue)' }}>
            Arquitetura DCGAN (Deep Convolutional GAN): Rastreamento de Tensores de Ponta a Ponta
          </span>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <span className="badge badge-cyan" style={{ fontSize: '11px' }}>ConvTranspose2d</span>
          <span className="badge badge-purple" style={{ fontSize: '11px' }}>Strided Conv2d</span>
          <span className="badge badge-green" style={{ fontSize: '11px' }}>LeakyReLU α=0.2</span>
        </div>
      </div>

      {/* Diagrama SVG Principal */}
      <div style={{
        flex: 1,
        background: '#FFFFFF',
        border: '1px solid var(--border-light)',
        borderRadius: '12px',
        padding: '14px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <svg viewBox="0 0 1100 420" style={{ width: '100%', height: '100%', maxHeight: '420px' }}>
          <defs>
            <linearGradient id="grad-block-g" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#6D28D9" />
            </linearGradient>
            <linearGradient id="grad-block-d" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0EA5E9" />
              <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>
            <marker id="arrow-purp" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#8B5CF6" />
            </marker>
            <marker id="arrow-blue" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#0EA5E9" />
            </marker>
          </defs>

          {/* ========================================================= */}
          {/* SEÇÃO SUPERIOR: GERADOR G (Upsampling via Convolução Transposta) */}
          {/* ========================================================= */}
          <text x="25" y="28" fill="#6D28D9" fontSize="12" fontWeight="800" fontFamily="var(--font-title)">
            TORRE DO GERADOR G(z): Expansão Espacial de Ruído Latente para Imagem Sintética
          </text>

          {/* Bloco 1: Entrada z */}
          <g transform="translate(25, 42)">
            <rect x="0" y="0" width="115" height="110" rx="6" fill="#F5F3FF" stroke="#DDD6FE" strokeWidth="1.5" />
            <text x="57" y="20" fill="#7C3AED" fontSize="10" fontWeight="700" textAnchor="middle">Vetor Latente z</text>
            <rect x="15" y="30" width="85" height="34" rx="4" fill="#EDE9FE" />
            <text x="57" y="52" fill="#6D28D9" fontSize="9.5" fontWeight="700" textAnchor="middle" fontFamily="var(--font-code)">
              [B, 100, 1, 1]
            </text>
            <text x="57" y="80" fill="#64748B" fontSize="8" textAnchor="middle">Prior N(0, I)</text>
            <text x="57" y="94" fill="#8B5CF6" fontSize="7.5" fontWeight="600" textAnchor="middle">nz = 100 escalares</text>
          </g>

          <path d="M 140 97 L 165 97" fill="none" stroke="#8B5CF6" strokeWidth="2" markerEnd="url(#arrow-purp)" />

          {/* Bloco 2: ConvTransp 1 -> 4x4 */}
          <g transform="translate(165, 42)">
            <rect x="0" y="0" width="135" height="110" rx="6" fill="#FAF5FF" stroke="#C084FC" strokeWidth="1.5" />
            <text x="67" y="18" fill="#9333EA" fontSize="9" fontWeight="700" textAnchor="middle">ConvTranspose2d</text>
            <text x="67" y="30" fill="#64748B" fontSize="7.5" textAnchor="middle">k=4, s=1, p=0 + BN + ReLU</text>
            <rect x="15" y="36" width="105" height="30" rx="4" fill="#F3E8FF" />
            <text x="67" y="55" fill="#7E22CE" fontSize="9" fontWeight="700" textAnchor="middle" fontFamily="var(--font-code)">
              [B, 512, 4, 4]
            </text>
            <rect x="35" y="72" width="65" height="28" rx="2" fill="#DDD6FE" stroke="#A855F7" />
            <text x="67" y="89" fill="#581C87" fontSize="7.5" textAnchor="middle">512 canais 4x4</text>
          </g>

          <path d="M 300 97 L 325 97" fill="none" stroke="#8B5CF6" strokeWidth="2" markerEnd="url(#arrow-purp)" />

          {/* Bloco 3: ConvTransp 2 -> 8x8 */}
          <g transform="translate(325, 42)">
            <rect x="0" y="0" width="135" height="110" rx="6" fill="#FAF5FF" stroke="#C084FC" strokeWidth="1.5" />
            <text x="67" y="18" fill="#9333EA" fontSize="9" fontWeight="700" textAnchor="middle">ConvTranspose2d</text>
            <text x="67" y="30" fill="#64748B" fontSize="7.5" textAnchor="middle">k=4, s=2, p=1 + BN + ReLU</text>
            <rect x="15" y="36" width="105" height="30" rx="4" fill="#F3E8FF" />
            <text x="67" y="55" fill="#7E22CE" fontSize="9" fontWeight="700" textAnchor="middle" fontFamily="var(--font-code)">
              [B, 256, 8, 8]
            </text>
            <rect x="30" y="72" width="75" height="28" rx="2" fill="#DDD6FE" stroke="#A855F7" />
            <text x="67" y="89" fill="#581C87" fontSize="7.5" textAnchor="middle">256 canais 8x8</text>
          </g>

          <path d="M 460 97 L 485 97" fill="none" stroke="#8B5CF6" strokeWidth="2" markerEnd="url(#arrow-purp)" />

          {/* Bloco 4: ConvTransp 3 -> 16x16 */}
          <g transform="translate(485, 42)">
            <rect x="0" y="0" width="135" height="110" rx="6" fill="#FAF5FF" stroke="#C084FC" strokeWidth="1.5" />
            <text x="67" y="18" fill="#9333EA" fontSize="9" fontWeight="700" textAnchor="middle">ConvTranspose2d</text>
            <text x="67" y="30" fill="#64748B" fontSize="7.5" textAnchor="middle">k=4, s=2, p=1 + BN + ReLU</text>
            <rect x="15" y="36" width="105" height="30" rx="4" fill="#F3E8FF" />
            <text x="67" y="55" fill="#7E22CE" fontSize="9" fontWeight="700" textAnchor="middle" fontFamily="var(--font-code)">
              [B, 128, 16, 16]
            </text>
            <rect x="25" y="72" width="85" height="28" rx="2" fill="#DDD6FE" stroke="#A855F7" />
            <text x="67" y="89" fill="#581C87" fontSize="7.5" textAnchor="middle">128 canais 16x16</text>
          </g>

          <path d="M 620 97 L 645 97" fill="none" stroke="#8B5CF6" strokeWidth="2" markerEnd="url(#arrow-purp)" />

          {/* Bloco 5: ConvTransp 4 -> 32x32 */}
          <g transform="translate(645, 42)">
            <rect x="0" y="0" width="135" height="110" rx="6" fill="#FAF5FF" stroke="#C084FC" strokeWidth="1.5" />
            <text x="67" y="18" fill="#9333EA" fontSize="9" fontWeight="700" textAnchor="middle">ConvTranspose2d</text>
            <text x="67" y="30" fill="#64748B" fontSize="7.5" textAnchor="middle">k=4, s=2, p=1 + BN + ReLU</text>
            <rect x="15" y="36" width="105" height="30" rx="4" fill="#F3E8FF" />
            <text x="67" y="55" fill="#7E22CE" fontSize="9" fontWeight="700" textAnchor="middle" fontFamily="var(--font-code)">
              [B, 64, 32, 32]
            </text>
            <rect x="20" y="72" width="95" height="28" rx="2" fill="#DDD6FE" stroke="#A855F7" />
            <text x="67" y="89" fill="#581C87" fontSize="7.5" textAnchor="middle">64 canais 32x32</text>
          </g>

          <path d="M 780 97 L 805 97" fill="none" stroke="#8B5CF6" strokeWidth="2" markerEnd="url(#arrow-purp)" />

          {/* Bloco 6: Saída do Gerador -> Tanh [-1, +1] */}
          <g transform="translate(805, 42)">
            <rect x="0" y="0" width="165" height="110" rx="8" fill="#F0FDF4" stroke="#86EFAC" strokeWidth="2" filter="drop-shadow(0 4px 6px rgba(124,179,66,0.15))" />
            <text x="82" y="18" fill="#15803D" fontSize="10" fontWeight="800" textAnchor="middle">ConvTranspose2d + Tanh</text>
            <text x="82" y="30" fill="#166534" fontSize="7.5" textAnchor="middle">k=4, s=2, p=1 (Sem BN!)</text>
            <rect x="15" y="36" width="135" height="32" rx="4" fill="#DCFCE7" />
            <text x="82" y="56" fill="#14532D" fontSize="10" fontWeight="800" textAnchor="middle" fontFamily="var(--font-code)">
              [B, 3, 64, 64]
            </text>
            <text x="82" y="82" fill="#15803D" fontSize="8" fontWeight="700" textAnchor="middle">Espaço de Cores RGB</text>
            <text x="82" y="96" fill="#4B5563" fontSize="7.5" textAnchor="middle">Pixels normalizados em [-1, 1]</text>
          </g>

          {/* ========================================================= */}
          {/* SEÇÃO INFERIOR: DISCRIMINADOR D (Downsampling Convolucional) */}
          {/* ========================================================= */}
          <text x="25" y="215" fill="#0284C7" fontSize="12" fontWeight="800" fontFamily="var(--font-title)">
            TORRE DO DISCRIMINADOR D(x): Compressão Espacial com Stride=2 e Extração de Features
          </text>

          {/* Bloco D1: Entrada de Imagem */}
          <g transform="translate(25, 230)">
            <rect x="0" y="0" width="145" height="110" rx="6" fill="#F0F9FF" stroke="#BAE6FD" strokeWidth="1.5" />
            <text x="72" y="20" fill="#0284C7" fontSize="10" fontWeight="700" textAnchor="middle">Imagem Entrada x</text>
            <rect x="15" y="30" width="115" height="32" rx="4" fill="#E0F2FE" />
            <text x="72" y="51" fill="#0369A1" fontSize="9.5" fontWeight="700" textAnchor="middle" fontFamily="var(--font-code)">
              [B, 3, 64, 64]
            </text>
            <text x="72" y="80" fill="#64748B" fontSize="8" textAnchor="middle">Real ou Sintética</text>
            <text x="72" y="94" fill="#0284C7" fontSize="7.5" fontWeight="600" textAnchor="middle">Sem BatchNorm na Entrada</text>
          </g>

          <path d="M 170 285 L 195 285" fill="none" stroke="#0EA5E9" strokeWidth="2" markerEnd="url(#arrow-blue)" />

          {/* Bloco D2: Conv 1 -> 32x32 */}
          <g transform="translate(195, 230)">
            <rect x="0" y="0" width="140" height="110" rx="6" fill="#F0F9FF" stroke="#BAE6FD" strokeWidth="1.5" />
            <text x="70" y="18" fill="#0284C7" fontSize="9" fontWeight="700" textAnchor="middle">Conv2d (Stride=2)</text>
            <text x="70" y="30" fill="#64748B" fontSize="7.5" textAnchor="middle">k=4, s=2, p=1 + LeakyReLU(0.2)</text>
            <rect x="15" y="36" width="110" height="30" rx="4" fill="#E0F2FE" />
            <text x="70" y="55" fill="#0369A1" fontSize="9" fontWeight="700" textAnchor="middle" fontFamily="var(--font-code)">
              [B, 64, 32, 32]
            </text>
            <text x="70" y="88" fill="#0284C7" fontSize="7.5" textAnchor="middle">Redução 2x de Resolução</text>
          </g>

          <path d="M 335 285 L 360 285" fill="none" stroke="#0EA5E9" strokeWidth="2" markerEnd="url(#arrow-blue)" />

          {/* Bloco D3: Conv 2 -> 16x16 */}
          <g transform="translate(360, 230)">
            <rect x="0" y="0" width="140" height="110" rx="6" fill="#F0F9FF" stroke="#BAE6FD" strokeWidth="1.5" />
            <text x="70" y="18" fill="#0284C7" fontSize="9" fontWeight="700" textAnchor="middle">Conv2d + BN</text>
            <text x="70" y="30" fill="#64748B" fontSize="7.5" textAnchor="middle">k=4, s=2, p=1 + LeakyReLU(0.2)</text>
            <rect x="15" y="36" width="110" height="30" rx="4" fill="#E0F2FE" />
            <text x="70" y="55" fill="#0369A1" fontSize="9" fontWeight="700" textAnchor="middle" fontFamily="var(--font-code)">
              [B, 128, 16, 16]
            </text>
            <text x="70" y="88" fill="#0284C7" fontSize="7.5" textAnchor="middle">Filtros dobram de canal</text>
          </g>

          <path d="M 500 285 L 525 285" fill="none" stroke="#0EA5E9" strokeWidth="2" markerEnd="url(#arrow-blue)" />

          {/* Bloco D4: Conv 3 -> 8x8 */}
          <g transform="translate(525, 230)">
            <rect x="0" y="0" width="140" height="110" rx="6" fill="#F0F9FF" stroke="#BAE6FD" strokeWidth="1.5" />
            <text x="70" y="18" fill="#0284C7" fontSize="9" fontWeight="700" textAnchor="middle">Conv2d + BN</text>
            <text x="70" y="30" fill="#64748B" fontSize="7.5" textAnchor="middle">k=4, s=2, p=1 + LeakyReLU(0.2)</text>
            <rect x="15" y="36" width="110" height="30" rx="4" fill="#E0F2FE" />
            <text x="70" y="55" fill="#0369A1" fontSize="9" fontWeight="700" textAnchor="middle" fontFamily="var(--font-code)">
              [B, 256, 8, 8]
            </text>
            <text x="70" y="88" fill="#0284C7" fontSize="7.5" textAnchor="middle">Sem Max-Pooling!</text>
          </g>

          <path d="M 665 285 L 690 285" fill="none" stroke="#0EA5E9" strokeWidth="2" markerEnd="url(#arrow-blue)" />

          {/* Bloco D5: Conv 4 -> 4x4 */}
          <g transform="translate(690, 230)">
            <rect x="0" y="0" width="140" height="110" rx="6" fill="#F0F9FF" stroke="#BAE6FD" strokeWidth="1.5" />
            <text x="70" y="18" fill="#0284C7" fontSize="9" fontWeight="700" textAnchor="middle">Conv2d + BN</text>
            <text x="70" y="30" fill="#64748B" fontSize="7.5" textAnchor="middle">k=4, s=2, p=1 + LeakyReLU(0.2)</text>
            <rect x="15" y="36" width="110" height="30" rx="4" fill="#E0F2FE" />
            <text x="70" y="55" fill="#0369A1" fontSize="9" fontWeight="700" textAnchor="middle" fontFamily="var(--font-code)">
              [B, 512, 4, 4]
            </text>
            <text x="70" y="88" fill="#0284C7" fontSize="7.5" textAnchor="middle">Deep Representation</text>
          </g>

          <path d="M 830 285 L 855 285" fill="none" stroke="#0EA5E9" strokeWidth="2" markerEnd="url(#arrow-blue)" />

          {/* Bloco D6: Classificação Final Sigmoid */}
          <g transform="translate(855, 230)">
            <rect x="0" y="0" width="170" height="110" rx="8" fill="#FFFBEB" stroke="#FCD34D" strokeWidth="2" filter="drop-shadow(0 4px 6px rgba(217,119,6,0.15))" />
            <text x="85" y="18" fill="#B45309" fontSize="10" fontWeight="800" textAnchor="middle">Conv2d + Sigmoid</text>
            <text x="85" y="30" fill="#92400E" fontSize="7.5" textAnchor="middle">k=4, s=1, p=0 (1 canal final)</text>
            <rect x="15" y="36" width="140" height="32" rx="4" fill="#FEF3C7" />
            <text x="85" y="56" fill="#78350F" fontSize="10" fontWeight="800" textAnchor="middle" fontFamily="var(--font-code)">
              [B, 1, 1, 1] → [B]
            </text>
            <text x="85" y="82" fill="#B45309" fontSize="8" fontWeight="700" textAnchor="middle">Score Escalar D(x)</text>
            <text x="85" y="96" fill="#78350F" fontSize="7.5" textAnchor="middle">Probabilidade P(Real | x)</text>
          </g>

          {/* NOTA DE DESIGN DCGAN NO CANTO INFERIOR */}
          <g transform="translate(25, 360)">
            <rect x="0" y="0" width="1050" height="46" rx="6" fill="#F8FAFC" stroke="#E2E8F0" />
            <text x="20" y="18" fill="#0A345D" fontSize="9.5" fontWeight="700">
              📌 As 5 Regras de Ouro de Radford et al. para Estabilidade da DCGAN:
            </text>
            <text x="20" y="34" fill="#475569" fontSize="8.5">
              1. Convoluções com stride (D) e convoluções transpostas (G) no lugar de pooling • 2. BatchNorm em G e D (exceto saídas) • 3. Remover camadas densas/lineares ocultas • 4. ReLU em G com Tanh na saída • 5. LeakyReLU (α=0.2) em todas as camadas de D
            </text>
          </g>
        </svg>
      </div>

      {/* Footer com destaques tensoriais */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '12px'
      }}>
        <div className="card-infnet" style={{ padding: '8px 14px', background: '#F8FAFC' }}>
          <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 600 }}>TRANSPOSIÇÃO CONVOLUCIONAL</div>
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--infnet-purple)' }}>Upsampling com Parâmetros Treináveis</div>
          <div style={{ fontSize: '10.5px', color: '#475569', marginTop: '2px' }}>Fórmula de saída: H_out = (H_in - 1)·stride - 2·pad + kernel</div>
        </div>
        <div className="card-infnet" style={{ padding: '8px 14px', background: '#F8FAFC' }}>
          <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 600 }}>POR QUE LEAKY RELU EM D?</div>
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--infnet-cyan)' }}>Prevenção de Neurônios Mortos</div>
          <div style={{ fontSize: '10.5px', color: '#475569', marginTop: '2px' }}>A inclinação α=0.2 permite gradiente reverso mesmo quando a ativação é negativa</div>
        </div>
        <div className="card-infnet" style={{ padding: '8px 14px', background: '#F8FAFC' }}>
          <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 600 }}>SEM POOLING ESPACIAL</div>
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--infnet-green-accent)' }}>Downsampling Aprendível</div>
          <div style={{ fontSize: '10.5px', color: '#475569', marginTop: '2px' }}>Convoluções com stride=2 aprendem sua própria redução de dimensionalidade</div>
        </div>
      </div>
    </div>
  );
}
