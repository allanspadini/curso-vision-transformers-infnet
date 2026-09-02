import React from 'react';
import { Image, ArrowRight, Grid, Sparkles, CheckCircle, Layers } from 'lucide-react';

export default function VisionTransformerBridgeDiagram() {
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
          <Image size={18} color="var(--infnet-cyan)" />
          <span>Da Linguagem à Visão: O Salto para o Vision Transformer (ViT)</span>
        </div>
        <div style={{
          fontFamily: 'var(--font-code)',
          fontSize: '11px',
          background: 'var(--infnet-dark-blue)',
          color: 'var(--infnet-cyan-light)',
          padding: '3px 10px',
          borderRadius: '6px'
        }}>
          "An Image is Worth 16x16 Words" (ICLR 2021)
        </div>
      </div>

      {/* Main Grid */}
      <div style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '1.4fr 1fr',
        gap: '14px',
        minHeight: 0
      }}>
        {/* Left: ViT Architecture SVG */}
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
            Como o ViT Transforma Pixels 2D em Tokens de Sequência 1D
          </div>

          <svg viewBox="0 0 540 270" style={{ width: '100%', height: '235px', marginTop: '14px' }}>
            <defs>
              <marker id="vitArrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 8 5 L 0 9 z" fill="#1BB5D8" />
              </marker>
            </defs>

            {/* Step 1: Input Image 224x224 */}
            <g transform="translate(15, 30)">
              <rect x="0" y="0" width="70" height="70" rx="4" fill="#E2E8F0" stroke="#0A345D" strokeWidth="1.5" />
              {/* Grid 3x3 inside representing patches */}
              <line x1="23" y1="0" x2="23" y2="70" stroke="#94A3B8" strokeDasharray="2 1" />
              <line x1="46" y1="0" x2="46" y2="70" stroke="#94A3B8" strokeDasharray="2 1" />
              <line x1="0" y1="23" x2="70" y2="23" stroke="#94A3B8" strokeDasharray="2 1" />
              <line x1="0" y1="46" x2="70" y2="46" stroke="#94A3B8" strokeDasharray="2 1" />
              <text x="35" y="83" fontSize="8.5" fontWeight="700" fill="#0A345D" textAnchor="middle">Imagem 224×224</text>
              <text x="35" y="94" fontSize="7.5" fill="#64748B" textAnchor="middle">RGB (3 canais)</text>
            </g>

            <path d="M 90 65 L 120 65" stroke="#1BB5D8" strokeWidth="2" markerEnd="url(#vitArrow)" fill="none" />

            {/* Step 2: 16x16 Patches Extraction */}
            <g transform="translate(125, 20)">
              <rect x="0" y="0" width="90" height="90" rx="6" fill="#EDF5FA" stroke="#0284C7" strokeWidth="1.5" />
              <text x="45" y="20" fontSize="9" fontWeight="700" fill="#0A345D" textAnchor="middle">196 Patches</text>
              
              {/* Mini Patch squares */}
              <rect x="15" y="30" width="16" height="16" rx="2" fill="#0284C7" />
              <rect x="37" y="30" width="16" height="16" rx="2" fill="#1BB5D8" />
              <rect x="59" y="30" width="16" height="16" rx="2" fill="#7CB342" />
              <rect x="15" y="52" width="16" height="16" rx="2" fill="#FF7043" />
              <rect x="37" y="52" width="16" height="16" rx="2" fill="#AB47BC" />
              <text x="67" y="65" fontSize="10" fill="#64748B">...</text>
              
              <text x="45" y="80" fontSize="7.5" fill="#64748B" textAnchor="middle">16×16×3 = 768 floats</text>
            </g>

            <path d="M 220 65 L 245 65" stroke="#1BB5D8" strokeWidth="2" markerEnd="url(#vitArrow)" fill="none" />

            {/* Step 3: Linear Projection + [CLS] + Pos */}
            <g transform="translate(250, 15)">
              <rect x="0" y="0" width="105" height="100" rx="6" fill="#F0FDF4" stroke="#7CB342" strokeWidth="1.5" />
              <text x="52" y="18" fontSize="8.5" fontWeight="700" fill="#15803D" textAnchor="middle">Patch Embeddings</text>
              
              <rect x="10" y="26" width="85" height="16" rx="3" fill="#AB47BC" />
              <text x="52" y="38" fontSize="7.5" fontWeight="700" fill="#FFF" textAnchor="middle">+ [CLS] Token (aprendível)</text>

              <rect x="10" y="46" width="85" height="16" rx="3" fill="#0A345D" />
              <text x="52" y="58" fontSize="7.5" fontWeight="700" fill="#64D9EF" textAnchor="middle">196 Patch Tokens [768]</text>

              <rect x="10" y="66" width="85" height="16" rx="3" fill="#FF7043" />
              <text x="52" y="78" fontSize="7.5" fontWeight="700" fill="#FFF" textAnchor="middle">+ Pos Embeddings 1D</text>

              <text x="52" y="94" fontSize="7.5" fontFamily="monospace" fill="#166534" textAnchor="middle">Shape: [197, 768]</text>
            </g>

            <path d="M 360 65 L 385 65" stroke="#1BB5D8" strokeWidth="2" markerEnd="url(#vitArrow)" fill="none" />

            {/* Step 4: Standard Transformer Encoder */}
            <g transform="translate(390, 10)">
              <rect x="0" y="0" width="130" height="110" rx="6" fill="linear-gradient(135deg, #0A345D 0%, #061F38 100%)" stroke="#64D9EF" strokeWidth="2" />
              <text x="65" y="22" fontSize="9.5" fontWeight="700" fill="#64D9EF" textAnchor="middle">Transformer Encoder</text>
              <text x="65" y="35" fontSize="7.5" fill="#FFF" textAnchor="middle">N=12 Blocos Padrão</text>

              <rect x="15" y="45" width="100" height="20" rx="3" fill="#1BB5D8" />
              <text x="65" y="59" fontSize="8" fontWeight="700" fill="#0A345D" textAnchor="middle">Multi-Head Self-Attention</text>

              <rect x="15" y="70" width="100" height="20" rx="3" fill="#7CB342" />
              <text x="65" y="84" fontSize="8" fontWeight="700" fill="#FFF" textAnchor="middle">MLP Feed-Forward</text>

              <text x="65" y="102" fontSize="7.5" fill="#94A3B8" textAnchor="middle">Saída do [CLS] Token</text>
            </g>

            {/* Arrow down to Classifier Head */}
            <path d="M 455 125 L 455 155" stroke="#1BB5D8" strokeWidth="2" markerEnd="url(#vitArrow)" fill="none" />

            {/* Step 5: MLP Classifier Head */}
            <g transform="translate(380, 165)">
              <rect x="0" y="0" width="150" height="55" rx="6" fill="#FFFFFF" stroke="#15803D" strokeWidth="2" />
              <text x="75" y="20" fontSize="9.5" fontWeight="700" fill="#15803D" textAnchor="middle">MLP Head de Classificação</text>
              <text x="75" y="34" fontSize="8" fill="#64748B" textAnchor="middle">LayerNorm → Linear(768, 1000)</text>
              <text x="75" y="46" fontSize="8" fontWeight="700" fill="#0A345D" textAnchor="middle">Predição: "Gato", "Cachorro", "Carro"</text>
            </g>

            {/* Bottom Note */}
            <g transform="translate(20, 165)">
              <rect x="0" y="0" width="340" height="55" rx="6" fill="#EDF5FA" stroke="#D0E3F0" />
              <text x="170" y="22" fontSize="9" fontWeight="700" fill="#0A345D" textAnchor="middle">
                Por que isso foi uma revolução na Visão Computacional?
              </text>
              <text x="170" y="38" fontSize="8" fill="#334155" textAnchor="middle">
                Elimina completamente qualquer convolução 2D. A imagem é tratada exatamente
              </text>
              <text x="170" y="49" fontSize="8" fill="#334155" textAnchor="middle">
                como um texto de 196 "palavras visuais"!
              </text>
            </g>
          </svg>
        </div>

        {/* Right: Vision vs Language Comparison */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div className="card" style={{ flex: 1 }}>
            <div className="card-header">
              <div className="card-icon-wrapper icon-blue">
                <Grid size={18} />
              </div>
              <div className="card-title">Dicionário de Analogias ViT ↔ NLP</div>
            </div>
            <div className="card-body">
              <table style={{ width: '100%', fontSize: '11px', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#EDF5FA', borderBottom: '1px solid #D0E3F0', textAlign: 'left' }}>
                    <th style={{ padding: '4px', color: 'var(--infnet-dark-blue)' }}>Processamento de Texto</th>
                    <th style={{ padding: '4px', color: 'var(--infnet-dark-blue)' }}>Vision Transformer (ViT)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '5px 4px' }}>Frase com $T$ palavras</td>
                    <td style={{ padding: '5px 4px', fontWeight: 600 }}>Imagem fatiada em 196 patches</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '5px 4px' }}>Token Subword (BPE)</td>
                    <td style={{ padding: '5px 4px', fontWeight: 600 }}>Patch $16 × 16$ pixels ($d=768$)</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '5px 4px' }}>Token <code>[CLS]</code> de Sentimento</td>
                    <td style={{ padding: '5px 4px', fontWeight: 600 }}>Token <code>[CLS]</code> de Classe da Imagem</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '5px 4px' }}>Posição da palavra na frase</td>
                    <td style={{ padding: '5px 4px', fontWeight: 600 }}>Coordenada 1D do patch na grade</td>
                  </tr>
                </tbody>
              </table>
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
            🎓 <strong>Prévia da Próxima Aula:</strong> Na Aula 3, implementaremos o ViT do zero em PyTorch e exploraremos DINO e Masked Autoencoders (MAE)!
          </div>
        </div>
      </div>
    </div>
  );
}
