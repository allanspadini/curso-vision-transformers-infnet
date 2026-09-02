import React, { useState } from 'react';
import { Layers, ArrowRight, GitFork, Sparkles, Image, Grid, Eye, RefreshCw, Cpu, CheckCircle } from 'lucide-react';

export default function SemanticSegmentationBridgeDiagram() {
  const [activeStage, setActiveStage] = useState('unet');

  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px'
    }}>
      {/* Top Header / Mode Switcher */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#EDF5FA',
        padding: '8px 16px',
        borderRadius: '8px',
        border: '1px solid #D0E3F0'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, color: 'var(--infnet-dark-blue)', fontSize: '13.5px' }}>
          <Layers size={18} color="var(--infnet-cyan)" />
          <span>Arquitetura da U-Net: Encoder-Decoder com Conexões de Atalho Densas (Skip Connections)</span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setActiveStage('unet')}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              border: 'none',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              background: activeStage === 'unet' ? 'var(--infnet-dark-blue)' : '#FFFFFF',
              color: activeStage === 'unet' ? '#FFFFFF' : 'var(--text-main)',
              boxShadow: 'var(--shadow-sm)',
              transition: 'all 0.2s ease'
            }}
          >
            🏛️ Arquitetura U-Net
          </button>
          <button
            onClick={() => setActiveStage('contrast')}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              border: 'none',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              background: activeStage === 'contrast' ? 'var(--infnet-dark-blue)' : '#FFFFFF',
              color: activeStage === 'contrast' ? '#FFFFFF' : 'var(--text-main)',
              boxShadow: 'var(--shadow-sm)',
              transition: 'all 0.2s ease'
            }}
          >
            ⚖️ CNN Local vs Transformer Global
          </button>
        </div>
      </div>

      {activeStage === 'unet' ? (
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          background: '#FFFFFF',
          border: '1px solid var(--border-light)',
          borderRadius: '12px',
          padding: '12px 18px',
          boxShadow: 'var(--shadow-sm)',
          position: 'relative',
          minHeight: 0
        }}>
          {/* Main Full-Width SVG Architecture Canvas */}
          <div style={{ flex: 1, position: 'relative', width: '100%', height: '100%' }}>
            <svg viewBox="0 0 920 380" style={{ width: '100%', height: '100%' }} preserveAspectRatio="xMidYMid meet">
              <defs>
                {/* Gradients */}
                <linearGradient id="inputGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#E2E8F0" />
                  <stop offset="100%" stopColor="#CBD5E1" />
                </linearGradient>
                <linearGradient id="encGradLarge" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0284C7" />
                  <stop offset="100%" stopColor="#0A345D" />
                </linearGradient>
                <linearGradient id="bottleneckGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#7E22CE" />
                  <stop offset="100%" stopColor="#0A345D" />
                </linearGradient>
                <linearGradient id="decGradLarge" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#7CB342" />
                  <stop offset="100%" stopColor="#15803D" />
                </linearGradient>
                <linearGradient id="maskGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#DCFCE7" />
                  <stop offset="100%" stopColor="#86EFAC" />
                </linearGradient>

                {/* Arrow Markers */}
                <marker id="downArrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 8 5 L 0 9 z" fill="#0284C7" />
                </marker>
                <marker id="upArrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 8 5 L 0 9 z" fill="#15803D" />
                </marker>
                <marker id="skipArrowLarge" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                  <path d="M 0 1 L 9 5 L 0 9 z" fill="#EA580C" />
                </marker>
              </defs>

              {/* Background regions for Encoder / Bottleneck / Decoder */}
              <rect x="95" y="10" width="310" height="300" rx="10" fill="#F0F9FF" fillOpacity="0.5" stroke="#BAE6FD" strokeDasharray="5 5" />
              <text x="250" y="28" fontSize="11" fontWeight="800" fill="#0369A1" textAnchor="middle" letterSpacing="0.05em">
                CAMINHO CONTRÁTIL (ENCODER)
              </text>

              <rect x="515" y="10" width="310" height="300" rx="10" fill="#F0FDF4" fillOpacity="0.5" stroke="#BBF7D0" strokeDasharray="5 5" />
              <text x="670" y="28" fontSize="11" fontWeight="800" fill="#15803D" textAnchor="middle" letterSpacing="0.05em">
                CAMINHO EXPANSIVO (DECODER)
              </text>

              {/* ========================================================================= */}
              {/* 1. INPUT IMAGE BLOCK */}
              {/* ========================================================================= */}
              <g transform="translate(10, 38)">
                <rect width="68" height="110" rx="8" fill="url(#inputGrad)" stroke="#64748B" strokeWidth="2" />
                <rect x="8" y="12" width="52" height="42" rx="4" fill="#94A3B8" fillOpacity="0.3" />
                <text x="34" y="38" fontSize="18" textAnchor="middle">🖼️</text>
                <text x="34" y="74" fontSize="12" fontWeight="800" fill="#0A345D" textAnchor="middle">Entrada</text>
                <text x="34" y="90" fontSize="10.5" fontWeight="600" fill="#334155" textAnchor="middle">Imagem</text>
                <text x="34" y="103" fontSize="9.5" fontFamily="var(--font-code)" fontWeight="700" fill="#0284C7" textAnchor="middle">H×W×3</text>
              </g>

              {/* Arrow from Input to Enc 1 */}
              <path d="M 78 93 L 105 93" stroke="#0284C7" strokeWidth="3" markerEnd="url(#downArrow)" fill="none" />

              {/* ========================================================================= */}
              {/* 2. ENCODER BLOCKS (Level 1, 2, 3) */}
              {/* ========================================================================= */}
              {/* Enc Level 1 (64 Canais) */}
              <g transform="translate(110, 42)">
                <rect width="70" height="102" rx="8" fill="url(#encGradLarge)" stroke="#0A345D" strokeWidth="2" />
                <text x="35" y="28" fontSize="12" fontWeight="800" fill="#64D9EF" textAnchor="middle">Bloco 1</text>
                <text x="35" y="48" fontSize="14" fontWeight="800" fill="#FFFFFF" textAnchor="middle">64 C</text>
                <text x="35" y="66" fontSize="10" fill="#E2E8F0" textAnchor="middle">2× Conv 3×3</text>
                <text x="35" y="80" fontSize="9" fill="#94A3B8" textAnchor="middle">+ ReLU</text>
                <text x="35" y="95" fontSize="9.5" fontFamily="var(--font-code)" fontWeight="700" fill="#64D9EF" textAnchor="middle">H × W</text>
              </g>

              {/* Downsampling Arrow Level 1 -> Level 2 */}
              <path d="M 145 144 L 145 162 L 205 162 L 205 175" stroke="#0284C7" strokeWidth="2.5" markerEnd="url(#downArrow)" fill="none" />
              <rect x="150" y="152" width="50" height="18" rx="4" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1" />
              <text x="175" y="165" fontSize="9" fontWeight="700" fill="#0369A1" textAnchor="middle">MaxPool ÷2</text>

              {/* Enc Level 2 (128 Canais) */}
              <g transform="translate(180, 180)">
                <rect width="74" height="85" rx="8" fill="url(#encGradLarge)" stroke="#0A345D" strokeWidth="2" />
                <text x="37" y="24" fontSize="11.5" fontWeight="800" fill="#64D9EF" textAnchor="middle">Bloco 2</text>
                <text x="37" y="42" fontSize="14" fontWeight="800" fill="#FFFFFF" textAnchor="middle">128 C</text>
                <text x="37" y="58" fontSize="9.5" fill="#E2E8F0" textAnchor="middle">2× Conv 3×3</text>
                <text x="37" y="76" fontSize="9" fontFamily="var(--font-code)" fontWeight="700" fill="#64D9EF" textAnchor="middle">H/2 × W/2</text>
              </g>

              {/* Downsampling Arrow Level 2 -> Level 3 */}
              <path d="M 217 265 L 217 278 L 285 278 L 285 288" stroke="#0284C7" strokeWidth="2.5" markerEnd="url(#downArrow)" fill="none" />
              <rect x="225" y="269" width="50" height="18" rx="4" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1" />
              <text x="250" y="282" fontSize="9" fontWeight="700" fill="#0369A1" textAnchor="middle">MaxPool ÷2</text>

              {/* Enc Level 3 (256 Canais) */}
              <g transform="translate(260, 292)">
                <rect width="80" height="74" rx="8" fill="url(#encGradLarge)" stroke="#0A345D" strokeWidth="2" />
                <text x="40" y="20" fontSize="11" fontWeight="800" fill="#64D9EF" textAnchor="middle">Bloco 3</text>
                <text x="40" y="38" fontSize="14" fontWeight="800" fill="#FFFFFF" textAnchor="middle">256 C</text>
                <text x="40" y="52" fontSize="9" fill="#E2E8F0" textAnchor="middle">2× Conv 3×3</text>
                <text x="40" y="66" fontSize="9" fontFamily="var(--font-code)" fontWeight="700" fill="#64D9EF" textAnchor="middle">H/4 × W/4</text>
              </g>

              {/* Downsampling Arrow Level 3 -> Bottleneck */}
              <path d="M 340 330 L 400 330" stroke="#7E22CE" strokeWidth="3" markerEnd="url(#downArrow)" fill="none" />
              <text x="370" y="324" fontSize="8.5" fontWeight="700" fill="#7E22CE" textAnchor="middle">MaxPool</text>

              {/* ========================================================================= */}
              {/* 3. BOTTLENECK (GARGALO CENTRAL 512 CANAIS) */}
              {/* ========================================================================= */}
              <g transform="translate(410, 285)">
                <rect width="100" height="88" rx="10" fill="url(#bottleneckGrad)" stroke="#A855F7" strokeWidth="3" filter="drop-shadow(0px 4px 8px rgba(168, 85, 247, 0.35))" />
                <text x="50" y="24" fontSize="12" fontWeight="900" fill="#F0ABFC" textAnchor="middle" letterSpacing="0.05em">BOTTLENECK</text>
                <text x="50" y="46" fontSize="17" fontWeight="900" fill="#FFFFFF" textAnchor="middle">512 Canais</text>
                <text x="50" y="63" fontSize="10" fill="#E9D5FF" textAnchor="middle">Alto Nível Semântico</text>
                <text x="50" y="79" fontSize="9.5" fontFamily="var(--font-code)" fontWeight="700" fill="#64D9EF" textAnchor="middle">H/8 × W/8</text>
              </g>

              {/* Upsampling Arrow Bottleneck -> Dec Level 3 */}
              <path d="M 510 330 L 570 330" stroke="#15803D" strokeWidth="3" markerEnd="url(#upArrow)" fill="none" />
              <text x="540" y="324" fontSize="8.5" fontWeight="700" fill="#15803D" textAnchor="middle">UpConv ×2</text>

              {/* ========================================================================= */}
              {/* 4. DECODER BLOCKS (Level 3, 2, 1) */}
              {/* ========================================================================= */}
              {/* Dec Level 3 (256 Canais) */}
              <g transform="translate(580, 292)">
                <rect width="80" height="74" rx="8" fill="url(#decGradLarge)" stroke="#15803D" strokeWidth="2" />
                <text x="40" y="20" fontSize="11" fontWeight="800" fill="#DCFCE7" textAnchor="middle">Up-Bloco 3</text>
                <text x="40" y="38" fontSize="14" fontWeight="800" fill="#FFFFFF" textAnchor="middle">256 C</text>
                <text x="40" y="52" fontSize="9" fill="#F0FDF4" textAnchor="middle">Concat + Conv</text>
                <text x="40" y="66" fontSize="9" fontFamily="var(--font-code)" fontWeight="700" fill="#FEF08A" textAnchor="middle">H/4 × W/4</text>
              </g>

              {/* Upsampling Arrow Level 3 -> Level 2 */}
              <path d="M 635 292 L 635 278 L 705 278 L 705 268" stroke="#15803D" strokeWidth="2.5" markerEnd="url(#upArrow)" fill="none" />
              <rect x="645" y="269" width="50" height="18" rx="4" fill="#DCFCE7" stroke="#15803D" strokeWidth="1" />
              <text x="670" y="282" fontSize="9" fontWeight="700" fill="#15803D" textAnchor="middle">UpConv ×2</text>

              {/* Dec Level 2 (128 Canais) */}
              <g transform="translate(665, 180)">
                <rect width="74" height="85" rx="8" fill="url(#decGradLarge)" stroke="#15803D" strokeWidth="2" />
                <text x="37" y="24" fontSize="11.5" fontWeight="800" fill="#DCFCE7" textAnchor="middle">Up-Bloco 2</text>
                <text x="37" y="42" fontSize="14" fontWeight="800" fill="#FFFFFF" textAnchor="middle">128 C</text>
                <text x="37" y="58" fontSize="9.5" fill="#F0FDF4" textAnchor="middle">Concat + Conv</text>
                <text x="37" y="76" fontSize="9" fontFamily="var(--font-code)" fontWeight="700" fill="#FEF08A" textAnchor="middle">H/2 × W/2</text>
              </g>

              {/* Upsampling Arrow Level 2 -> Level 1 */}
              <path d="M 715 180 L 715 162 L 775 162 L 775 148" stroke="#15803D" strokeWidth="2.5" markerEnd="url(#upArrow)" fill="none" />
              <rect x="720" y="152" width="50" height="18" rx="4" fill="#DCFCE7" stroke="#15803D" strokeWidth="1" />
              <text x="745" y="165" fontSize="9" fontWeight="700" fill="#15803D" textAnchor="middle">UpConv ×2</text>

              {/* Dec Level 1 (64 Canais) */}
              <g transform="translate(740, 42)">
                <rect width="70" height="102" rx="8" fill="url(#decGradLarge)" stroke="#15803D" strokeWidth="2" />
                <text x="35" y="28" fontSize="12" fontWeight="800" fill="#DCFCE7" textAnchor="middle">Up-Bloco 1</text>
                <text x="35" y="48" fontSize="14" fontWeight="800" fill="#FFFFFF" textAnchor="middle">64 C</text>
                <text x="35" y="66" fontSize="10" fill="#F0FDF4" textAnchor="middle">Concat + Conv</text>
                <text x="35" y="80" fontSize="9" fill="#DCFCE7" textAnchor="middle">Conv 1×1 (Classes)</text>
                <text x="35" y="95" fontSize="9.5" fontFamily="var(--font-code)" fontWeight="700" fill="#FEF08A" textAnchor="middle">H × W</text>
              </g>

              {/* Arrow from Dec 1 to Output */}
              <path d="M 810 93 L 838 93" stroke="#15803D" strokeWidth="3" markerEnd="url(#upArrow)" fill="none" />

              {/* ========================================================================= */}
              {/* 5. OUTPUT MASK BLOCK */}
              {/* ========================================================================= */}
              <g transform="translate(842, 38)">
                <rect width="68" height="110" rx="8" fill="url(#maskGrad)" stroke="#15803D" strokeWidth="2" />
                <rect x="8" y="12" width="52" height="42" rx="4" fill="#15803D" fillOpacity="0.15" />
                <text x="34" y="38" fontSize="18" textAnchor="middle">🎭</text>
                <text x="34" y="74" fontSize="12" fontWeight="800" fill="#15803D" textAnchor="middle">Máscara</text>
                <text x="34" y="90" fontSize="10" fontWeight="700" fill="#166534" textAnchor="middle">Predição</text>
                <text x="34" y="103" fontSize="9.5" fontFamily="var(--font-code)" fontWeight="700" fill="#15803D" textAnchor="middle">H×W×K</text>
              </g>

              {/* ========================================================================= */}
              {/* 6. SKIP CONNECTIONS (DENSE HORIZONTAL ATALHOS) */}
              {/* ========================================================================= */}
              {/* Level 1 Skip Connection */}
              <g>
                <path d="M 180 65 L 732 65" stroke="#EA580C" strokeWidth="3" strokeDasharray="6 4" markerEnd="url(#skipArrowLarge)" fill="none" />
                <rect x="360" y="52" width="200" height="24" rx="6" fill="#FFF7ED" stroke="#EA580C" strokeWidth="1.5" />
                <text x="460" y="68" fontSize="10" fontWeight="800" fill="#C2410C" textAnchor="middle">
                  🔗 SKIP 1: Concatena Alta Resolução (Bordas)
                </text>
              </g>

              {/* Level 2 Skip Connection */}
              <g>
                <path d="M 254 205 L 657 205" stroke="#EA580C" strokeWidth="3" strokeDasharray="6 4" markerEnd="url(#skipArrowLarge)" fill="none" />
                <rect x="375" y="193" width="170" height="22" rx="6" fill="#FFF7ED" stroke="#EA580C" strokeWidth="1.5" />
                <text x="460" y="208" fontSize="9.5" fontWeight="800" fill="#C2410C" textAnchor="middle">
                  🔗 SKIP 2: Texturas Intermediárias
                </text>
              </g>

              {/* Level 3 Skip Connection */}
              <g>
                <path d="M 340 310 L 572 310" stroke="#EA580C" strokeWidth="2.5" strokeDasharray="5 3" markerEnd="url(#skipArrowLarge)" fill="none" />
                <rect x="400" y="266" width="120" height="18" rx="4" fill="#FFF7ED" stroke="#EA580C" strokeWidth="1" />
                <text x="460" y="278" fontSize="8.5" fontWeight="800" fill="#C2410C" textAnchor="middle">
                  🔗 SKIP 3: Concat
                </text>
              </g>
            </svg>
          </div>

          {/* Bottom Summary Bar with 4 Key Architecture Badges */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '10px',
            marginTop: '8px',
            paddingTop: '8px',
            borderTop: '1px solid #E2E8F0'
          }}>
            <div style={{ background: '#F0F9FF', border: '1px solid #BAE6FD', borderRadius: '8px', padding: '8px 10px', textAlign: 'center' }}>
              <div style={{ fontSize: '11.5px', fontWeight: 800, color: '#0369A1' }}>1. ENCODER (Contração)</div>
              <div style={{ fontSize: '11px', color: '#334155', marginTop: '2px' }}>Convoluções + MaxPool (÷2) aumentam profundidade de canais</div>
            </div>

            <div style={{ background: '#FAF5FF', border: '1px solid #E9D8FD', borderRadius: '8px', padding: '8px 10px', textAlign: 'center' }}>
              <div style={{ fontSize: '11.5px', fontWeight: 800, color: '#7E22CE' }}>2. BOTTLENECK (Gargalo)</div>
              <div style={{ fontSize: '11px', color: '#334155', marginTop: '2px' }}>Espaço latente comprimido (512C) com contexto semântico máximo</div>
            </div>

            <div style={{ background: '#FFF7ED', border: '1px solid #FFEDD5', borderRadius: '8px', padding: '8px 10px', textAlign: 'center' }}>
              <div style={{ fontSize: '11.5px', fontWeight: 800, color: '#C2410C' }}>3. SKIP CONNECTIONS</div>
              <div style={{ fontSize: '11px', color: '#334155', marginTop: '2px' }}>Copia mapas 1:1 do Encoder ao Decoder preservando contornos</div>
            </div>

            <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '8px', padding: '8px 10px', textAlign: 'center' }}>
              <div style={{ fontSize: '11.5px', fontWeight: 800, color: '#15803D' }}>4. DECODER (Expansão)</div>
              <div style={{ fontSize: '11px', color: '#334155', marginTop: '2px' }}>UpConv (×2) restaura a resolução até a predição Softmax por pixel</div>
            </div>
          </div>
        </div>
      ) : (
        /* Contrast Mode: 2 Large Contrast Cards */
        <div style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px',
          minHeight: 0
        }}>
          {/* Card 1: CNN / U-Net */}
          <div style={{
            background: '#FFFFFF',
            border: '2px solid #0284C7',
            borderRadius: '12px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: 'var(--shadow-md)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px', borderBottom: '2px solid #E0F2FE', paddingBottom: '10px' }}>
              <div style={{ background: '#0284C7', color: '#FFF', padding: '8px', borderRadius: '8px' }}>
                <Grid size={24} />
              </div>
              <div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--infnet-dark-blue)' }}>Visão Convolucional (CNN / U-Net)</div>
                <div style={{ fontSize: '11.5px', color: '#0369A1', fontWeight: 600 }}>Processamento em Grade 2D Espacial</div>
              </div>
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', color: '#334155' }}>
              <div style={{ background: '#F8FAFC', padding: '10px 14px', borderRadius: '8px', borderLeft: '4px solid #0284C7' }}>
                <strong style={{ color: 'var(--infnet-dark-blue)', display: 'block', marginBottom: '2px' }}>🎯 Viés Indutivo Forte:</strong>
                Assume localidade espacial (pixels vizinhos são fortemente relacionados) e invariância à translação.
              </div>

              <div style={{ background: '#F8FAFC', padding: '10px 14px', borderRadius: '8px', borderLeft: '4px solid #0284C7' }}>
                <strong style={{ color: 'var(--infnet-dark-blue)', display: 'block', marginBottom: '2px' }}>🔭 Campo Receptivo Progressivo:</strong>
                Filtros 3×3 só enxergam a vizinhança imediata. Para alcançar o contexto global da imagem, precisa empilhar dezenas de camadas.
              </div>

              <div style={{ background: '#F8FAFC', padding: '10px 14px', borderRadius: '8px', borderLeft: '4px solid #0284C7' }}>
                <strong style={{ color: 'var(--infnet-dark-blue)', display: 'block', marginBottom: '2px' }}>🔒 Pesos Estáticos Compartilhados:</strong>
                O mesmo filtro convolucional estático é convoluído por toda a imagem, independente do conteúdo da cena.
              </div>
            </div>

            <div style={{ marginTop: '12px', background: '#E0F2FE', padding: '8px 12px', borderRadius: '6px', fontSize: '12px', color: '#0369A1', fontWeight: 700, textAlign: 'center' }}>
              Ideal para poucos dados e predições pixel a pixel densas
            </div>
          </div>

          {/* Card 2: Transformers / ViT */}
          <div style={{
            background: '#FFFFFF',
            border: '2px solid #15803D',
            borderRadius: '12px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: 'var(--shadow-md)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px', borderBottom: '2px solid #DCFCE7', paddingBottom: '10px' }}>
              <div style={{ background: '#15803D', color: '#FFF', padding: '8px', borderRadius: '8px' }}>
                <Sparkles size={24} />
              </div>
              <div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--infnet-dark-blue)' }}>Visão com Atenção (Transformers / ViT)</div>
                <div style={{ fontSize: '11.5px', color: '#15803D', fontWeight: 600 }}>Processamento Sequencial Global Direto</div>
              </div>
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', color: '#334155' }}>
              <div style={{ background: '#F8FAFC', padding: '10px 14px', borderRadius: '8px', borderLeft: '4px solid #15803D' }}>
                <strong style={{ color: '#15803D', display: 'block', marginBottom: '2px' }}>🌐 Alcance Global Instantâneo:</strong>
                Qualquer parte da imagem (patch) pode atender diretamente a qualquer outra na Camada 1, sem passar por dezenas de filtros.
              </div>

              <div style={{ background: '#F8FAFC', padding: '10px 14px', borderRadius: '8px', borderLeft: '4px solid #15803D' }}>
                <strong style={{ color: '#15803D', display: 'block', marginBottom: '2px' }}>⚡ Pesos Dinâmicos por Entrada:</strong>
                As matrizes de atenção Softmax(Q·Kᵀ/√d) mudam ativamente em função do conteúdo da imagem atual.
              </div>

              <div style={{ background: '#F8FAFC', padding: '10px 14px', borderRadius: '8px', borderLeft: '4px solid #15803D' }}>
                <strong style={{ color: '#15803D', display: 'block', marginBottom: '2px' }}>🧩 Viés Indutivo Mínimo:</strong>
                Não força formato 2D rígido; aprende relações complexas, multimodalidade e generalização com larga escala de dados.
              </div>
            </div>

            <div style={{ marginTop: '12px', background: '#DCFCE7', padding: '8px 12px', borderRadius: '6px', fontSize: '12px', color: '#15803D', fontWeight: 700, textAlign: 'center' }}>
              Fundamento unificado moderno para NLP, Visão Computacional e Multimodal
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
