import React from 'react';
import { Target, Layers, Sparkles } from 'lucide-react';

export default function CLIPOpenVocabularyVisionDiagram() {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', flex: 1 }}>
        
        {/* Lado Esquerdo: Detecção de Objetos Open-Vocabulary (OWL-ViT) */}
        <div style={{
          background: '#FFFFFF',
          border: '1.5px solid #BAE6FD',
          borderRadius: '12px',
          padding: '18px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ background: '#E0F2FE', color: '#0284C7', padding: '6px', borderRadius: '6px' }}>
                <Target size={18} />
              </div>
              <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--infnet-dark-blue)', margin: 0, fontFamily: 'var(--font-title)' }}>
                OWL-ViT (Google) / GLIP
              </h3>
            </div>
            <span style={{ background: '#E0F2FE', color: '#0369A1', fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '12px' }}>
              Open-Vocabulary Detection
            </span>
          </div>

          <p style={{ fontSize: '11.5px', color: 'var(--text-main)', lineHeight: '1.45', marginBottom: '12px' }}>
            Substitui a cabeça de 80 classes fixas (COCO) de detectores por similaridade entre <strong>tokens de patches espaciais do ViT</strong> e o <strong>prompt de texto livre</strong>.
          </p>

          {/* SVG Esquemático OWL-ViT */}
          <div style={{ flex: 1, background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg viewBox="0 0 460 180" style={{ width: '100%', height: '170px' }}>
              {/* Imagem com Bounding Boxes Livres */}
              <rect x="20" y="20" width="130" height="130" rx="8" fill="#E2E8F0" stroke="#94A3B8" />
              <circle cx="85" cy="85" r="45" fill="#CBD5E1" />
              
              {/* Box 1 detectada por texto */}
              <rect x="35" y="45" width="70" height="80" rx="4" fill="none" stroke="#22C55E" strokeWidth="2.5" />
              <rect x="35" y="28" width="80" height="16" rx="2" fill="#22C55E" />
              <text x="75" y="40" textAnchor="middle" fontSize="8" fontWeight="700" fill="#FFFFFF">"golden retriever"</text>

              {/* Box 2 detectada por texto */}
              <rect x="100" y="80" width="40" height="50" rx="4" fill="none" stroke="#0284C7" strokeWidth="2" strokeDasharray="3 2" />
              <rect x="100" y="65" width="45" height="14" rx="2" fill="#0284C7" />
              <text x="122" y="75" textAnchor="middle" fontSize="7.5" fontWeight="700" fill="#FFFFFF">"red ball"</text>

              {/* Seta */}
              <path d="M 160 85 L 210 85" stroke="#64748B" strokeWidth="2" />

              {/* Mecanismo Patch Tokens vs Text Tokens */}
              <g transform="translate(220, 20)">
                <rect x="0" y="0" width="220" height="130" rx="8" fill="#FFFFFF" stroke="#BAE6FD" strokeWidth="1.5" />
                <text x="110" y="24" textAnchor="middle" fontSize="10.5" fontWeight="800" fill="#0369A1">Atenção Cruzada Patch-Texto</text>
                
                <rect x="15" y="36" width="190" height="24" rx="4" fill="#F0F9FF" />
                <text x="110" y="52" textAnchor="middle" fontSize="8.5" fontFamily="Fira Code" fill="#0284C7">
                  Tokens Visuais Espaciais: [N_patches, D]
                </text>

                <text x="110" y="74" textAnchor="middle" fontSize="11" fontWeight="800" fill="#64748B">×</text>

                <rect x="15" y="82" width="190" height="24" rx="4" fill="#FAF5FF" />
                <text x="110" y="98" textAnchor="middle" fontSize="8.5" fontFamily="Fira Code" fill="#9333EA">
                  Text Query: "find the red ball"
                </text>

                <text x="110" y="120" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#16A34A">
                  ➔ Bounding Box gerada sem retraining
                </text>
              </g>
            </svg>
          </div>
        </div>

        {/* Lado Direito: Segmentação Semântica Open-Vocabulary (CLIPSeg) */}
        <div style={{
          background: '#FFFFFF',
          border: '1.5px solid #E9D5FF',
          borderRadius: '12px',
          padding: '18px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ background: '#F3E8FF', color: '#9333EA', padding: '6px', borderRadius: '6px' }}>
                <Layers size={18} />
              </div>
              <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#7E22CE', margin: 0, fontFamily: 'var(--font-title)' }}>
                CLIPSeg / MaskCLIP
              </h3>
            </div>
            <span style={{ background: '#F3E8FF', color: '#7E22CE', fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '12px' }}>
              Open-Vocabulary Segmentation
            </span>
          </div>

          <p style={{ fontSize: '11.5px', color: 'var(--text-main)', lineHeight: '1.45', marginBottom: '12px' }}>
            Produz máscaras densas de segmentação pixel a pixel condicionadas por qualquer prompt de linguagem ou imagem de exemplo.
          </p>

          {/* SVG Esquemático CLIPSeg */}
          <div style={{ flex: 1, background: '#FAF5FF', borderRadius: '8px', border: '1px solid #E9D5FF', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg viewBox="0 0 460 180" style={{ width: '100%', height: '170px' }}>
              {/* Máscara Semântica */}
              <rect x="20" y="20" width="130" height="130" rx="8" fill="#F1F5F9" stroke="#94A3B8" />
              {/* Objeto segmentado */}
              <path d="M 40 70 Q 70 40 100 65 Q 120 100 90 125 Q 50 120 40 70 Z" fill="#C084FC" opacity="0.6" stroke="#9333EA" strokeWidth="2" />
              <rect x="35" y="28" width="90" height="16" rx="2" fill="#9333EA" />
              <text x="80" y="40" textAnchor="middle" fontSize="8" fontWeight="700" fill="#FFFFFF">"leather jacket"</text>

              {/* Seta */}
              <path d="M 160 85 L 210 85" stroke="#7E22CE" strokeWidth="2" />

              {/* Decoder U-Net Leve */}
              <g transform="translate(220, 20)">
                <rect x="0" y="0" width="220" height="130" rx="8" fill="#FFFFFF" stroke="#E9D5FF" strokeWidth="1.5" />
                <text x="110" y="24" textAnchor="middle" fontSize="10.5" fontWeight="800" fill="#7E22CE">Decoder Espacial + Prompt</text>
                
                <rect x="15" y="36" width="190" height="24" rx="4" fill="#FAF5FF" />
                <text x="110" y="52" textAnchor="middle" fontSize="8.5" fontFamily="Fira Code" fill="#9333EA">
                  Feature Maps ViT: [H/16, W/16, D]
                </text>

                <text x="110" y="74" textAnchor="middle" fontSize="11" fontWeight="800" fill="#64748B">+</text>

                <rect x="15" y="82" width="190" height="24" rx="4" fill="#F0FDF4" />
                <text x="110" y="98" textAnchor="middle" fontSize="8.5" fontFamily="Fira Code" fill="#15803D">
                  Upsampling 16× com ConvTranspose
                </text>

                <text x="110" y="120" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#047857">
                  ➔ Máscara Binária [H, W] calculada
                </text>
              </g>
            </svg>
          </div>
        </div>

      </div>

      {/* Caixa de Impacto Industrial */}
      <div style={{
        background: '#EDF5FA',
        border: '1px solid #D0E3F0',
        borderRadius: '8px',
        padding: '10px 18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <span style={{ fontSize: '11.5px', color: 'var(--infnet-dark-blue)', fontWeight: 600 }}>
          🚀 <strong>O Salto Tecnológico:</strong> OWL-ViT e CLIPSeg aposentaram a necessidade de treinar um modelo para cada objeto novo. Se você consegue descrever a entidade em linguagem natural, o sistema é capaz de localizá-la e segmentá-la imediatamente.
        </span>
      </div>
    </div>
  );
}
