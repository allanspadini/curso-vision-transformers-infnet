import React from 'react';
import { AlertTriangle, CheckCircle2, Lock, Unlock, Database, Cpu, ArrowRight } from 'lucide-react';

export default function CLIPClosedVocabBottleneckDiagram() {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', flex: 1 }}>
        
        {/* Lado Esquerdo: Paradigma Fechado Tradicional */}
        <div style={{
          background: 'linear-gradient(180deg, #FFF5F5 0%, #FFFFFF 100%)',
          border: '1.5px solid #FED7D7',
          borderRadius: '12px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 4px 16px rgba(229, 62, 62, 0.06)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                background: '#FED7D7',
                color: '#C53030',
                padding: '6px',
                borderRadius: '8px',
                display: 'flex'
              }}>
                <Lock size={18} />
              </div>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#9B2C2C', margin: 0, fontFamily: 'var(--font-title)' }}>
                  Visão Supervisionada de Vocabulário Fechado
                </h3>
                <span style={{ fontSize: '11px', color: '#E53E3E', fontWeight: 600 }}>
                  ImageNet 1k • Softmax de Dimensão Fixa (C = 1.000)
                </span>
              </div>
            </div>
            <span style={{
              background: '#FED7D7',
              color: '#9B2C2C',
              fontSize: '10.5px',
              fontWeight: 700,
              padding: '3px 8px',
              borderRadius: '12px'
            }}>
              Gargalo Crítico
            </span>
          </div>

          {/* Diagrama SVG do Pipeline Fechado */}
          <div style={{
            background: '#FFFFFF',
            border: '1px solid #FED7D7',
            borderRadius: '10px',
            padding: '16px',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '12px'
          }}>
            <svg viewBox="0 0 540 180" style={{ width: '100%', height: '180px' }}>
              {/* Imagem Entrada */}
              <rect x="15" y="45" width="80" height="80" rx="8" fill="#FEE2E2" stroke="#EF4444" strokeWidth="2" />
              <text x="55" y="82" textAnchor="middle" fontSize="11" fontWeight="700" fill="#991B1B">Imagem 2D</text>
              <text x="55" y="98" textAnchor="middle" fontSize="9.5" fontFamily="Fira Code" fill="#B91C1C">[3, 224, 224]</text>

              {/* Seta 1 */}
              <path d="M 105 85 L 140 85" stroke="#DC2626" strokeWidth="2" markerEnd="url(#red-arrow)" />

              {/* Backbone CNN / ViT */}
              <rect x="150" y="30" width="105" height="110" rx="8" fill="#F8FAFC" stroke="#64748B" strokeWidth="1.5" />
              <text x="202" y="60" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1E293B">Backbone</text>
              <text x="202" y="78" textAnchor="middle" fontSize="10" fill="#475569">CNN ou ViT</text>
              <rect x="165" y="92" width="75" height="22" rx="4" fill="#E2E8F0" />
              <text x="202" y="107" textAnchor="middle" fontSize="9" fontFamily="Fira Code" fill="#0F172A">d = 2048</text>

              {/* Seta 2 */}
              <path d="M 265 85 L 300 85" stroke="#DC2626" strokeWidth="2" />

              {/* Cabeça Linear Fixa */}
              <rect x="310" y="30" width="105" height="110" rx="8" fill="#FFF1F2" stroke="#F43F5E" strokeWidth="1.5" />
              <text x="362" y="60" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#9F1239">Linear Head</text>
              <text x="362" y="78" textAnchor="middle" fontSize="10" fill="#BE123C">W: [2048, 1000]</text>
              <rect x="325" y="92" width="75" height="22" rx="4" fill="#FFE4E6" />
              <text x="362" y="107" textAnchor="middle" fontSize="9" fontFamily="Fira Code" fill="#881337">Softmax(1k)</text>

              {/* Seta 3 */}
              <path d="M 425 85 L 455 85" stroke="#DC2626" strokeWidth="2" />

              {/* Classes One-Hot */}
              <g transform="translate(465, 35)">
                <rect x="0" y="0" width="65" height="22" rx="4" fill="#FEE2E2" stroke="#EF4444" strokeWidth="1" />
                <text x="32" y="15" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#991B1B">id: 0 (cão)</text>

                <rect x="0" y="30" width="65" height="22" rx="4" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1" />
                <text x="32" y="45" textAnchor="middle" fontSize="9.5" fill="#64748B">id: 1 (gato)</text>

                <text x="32" y="72" textAnchor="middle" fontSize="12" fill="#94A3B8">...</text>

                <rect x="0" y="80" width="65" height="22" rx="4" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1" />
                <text x="32" y="95" textAnchor="middle" fontSize="9.5" fill="#64748B">id: 999</text>
              </g>

              {/* Barreira Bloqueio Nova Classe */}
              <rect x="445" y="138" width="85" height="32" rx="6" fill="#7F1D1D" />
              <text x="487" y="158" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#FEF2F2">Nova Classe? ✕</text>
            </svg>

            {/* Badges de Limitações */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', width: '100%', marginTop: '6px' }}>
              <div style={{ background: '#FFF1F2', padding: '8px', borderRadius: '6px', textAlign: 'center' }}>
                <span style={{ fontSize: '10px', color: '#9F1239', fontWeight: 700, display: 'block' }}>Rotulagem Cara</span>
                <span style={{ fontSize: '9px', color: '#BE123C' }}>Anotação manual finita</span>
              </div>
              <div style={{ background: '#FFF1F2', padding: '8px', borderRadius: '6px', textAlign: 'center' }}>
                <span style={{ fontSize: '10px', color: '#9F1239', fontWeight: 700, display: 'block' }}>Semântica Nula</span>
                <span style={{ fontSize: '9px', color: '#BE123C' }}>Índices numéricos isolados</span>
              </div>
              <div style={{ background: '#FFF1F2', padding: '8px', borderRadius: '6px', textAlign: 'center' }}>
                <span style={{ fontSize: '10px', color: '#9F1239', fontWeight: 700, display: 'block' }}>Rigidez Zero-Shot</span>
                <span style={{ fontSize: '9px', color: '#BE123C' }}>Incapaz de prever classe nova</span>
              </div>
            </div>
          </div>
        </div>

        {/* Lado Direito: Paradigma Aberto Multimodal (CLIP) */}
        <div style={{
          background: 'linear-gradient(180deg, #F0FDF4 0%, #FFFFFF 100%)',
          border: '1.5px solid #BBF7D0',
          borderRadius: '12px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 4px 16px rgba(22, 163, 74, 0.06)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                background: '#DCFCE7',
                color: '#15803D',
                padding: '6px',
                borderRadius: '8px',
                display: 'flex'
              }}>
                <Unlock size={18} />
              </div>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#14532D', margin: 0, fontFamily: 'var(--font-title)' }}>
                  Visão Multimodal de Vocabulário Aberto (Open-Vocabulary)
                </h3>
                <span style={{ fontSize: '11px', color: '#16A34A', fontWeight: 600 }}>
                  CLIP • Aprendizado Contrastivo com Linguagem Natural
                </span>
              </div>
            </div>
            <span style={{
              background: '#DCFCE7',
              color: '#15803D',
              fontSize: '10.5px',
              fontWeight: 700,
              padding: '3px 8px',
              borderRadius: '12px'
            }}>
              Solução Universal
            </span>
          </div>

          {/* Diagrama SVG do Pipeline Aberto */}
          <div style={{
            background: '#FFFFFF',
            border: '1px solid #BBF7D0',
            borderRadius: '10px',
            padding: '16px',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '12px'
          }}>
            <svg viewBox="0 0 540 180" style={{ width: '100%', height: '180px' }}>
              {/* Imagem + Texto */}
              <rect x="15" y="20" width="80" height="55" rx="6" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1.5" />
              <text x="55" y="45" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0369A1">Imagem 2D</text>
              <text x="55" y="60" textAnchor="middle" fontSize="8.5" fontFamily="Fira Code" fill="#0284C7">[3, 224, 224]</text>

              <rect x="15" y="105" width="80" height="55" rx="6" fill="#F3E8FF" stroke="#9333EA" strokeWidth="1.5" />
              <text x="55" y="130" textAnchor="middle" fontSize="10" fontWeight="700" fill="#7E22CE">Texto Livre</text>
              <text x="55" y="145" textAnchor="middle" fontSize="8" fill="#6B21A8">"a dog in snow"</text>

              {/* Setas para Encoders */}
              <path d="M 100 48 L 135 48" stroke="#0284C7" strokeWidth="2" />
              <path d="M 100 132 L 135 132" stroke="#9333EA" strokeWidth="2" />

              {/* Torres de Encoders */}
              <rect x="145" y="15" width="105" height="65" rx="8" fill="#F0F9FF" stroke="#0284C7" strokeWidth="1.5" />
              <text x="197" y="42" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#0369A1">Image Encoder</text>
              <text x="197" y="58" textAnchor="middle" fontSize="8.5" fontFamily="Fira Code" fill="#0284C7">ViT / ResNet → D</text>

              <rect x="145" y="100" width="105" height="65" rx="8" fill="#FAF5FF" stroke="#9333EA" strokeWidth="1.5" />
              <text x="197" y="127" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#7E22CE">Text Encoder</text>
              <text x="197" y="143" textAnchor="middle" fontSize="8.5" fontFamily="Fira Code" fill="#9333EA">Transformer → D</text>

              {/* Projeção para Espaço Conjunto */}
              <path d="M 260 48 L 320 80" stroke="#0284C7" strokeWidth="2" strokeDasharray="3 3" />
              <path d="M 260 132 L 320 100" stroke="#9333EA" strokeWidth="2" strokeDasharray="3 3" />

              {/* Hiperesfera Latente Compartilhada */}
              <circle cx="370" cy="90" r="55" fill="#F0FDF4" stroke="#16A34A" strokeWidth="2" strokeDasharray="4 2" />
              <circle cx="370" cy="90" r="4" fill="#15803D" />
              <text x="370" y="55" textAnchor="middle" fontSize="9" fontWeight="700" fill="#166534">Espaço Latente Comum</text>
              
              {/* Pontos Alinhados */}
              <circle cx="355" cy="85" r="5" fill="#0284C7" />
              <text x="350" y="75" textAnchor="end" fontSize="8" fontWeight="600" fill="#0284C7">I_img</text>

              <circle cx="385" cy="95" r="5" fill="#9333EA" />
              <text x="390" y="110" textAnchor="start" fontSize="8" fontWeight="600" fill="#9333EA">T_txt</text>

              <line x1="355" y1="85" x2="385" y2="95" stroke="#16A34A" strokeWidth="1.5" />
              <text x="370" y="105" textAnchor="middle" fontSize="7.5" fontFamily="Fira Code" fill="#166534">cos θ ≈ 1</text>

              {/* Saída Aberta */}
              <path d="M 435 90 L 465 90" stroke="#16A34A" strokeWidth="2" />
              <rect x="475" y="65" width="60" height="50" rx="6" fill="#DCFCE7" stroke="#16A34A" strokeWidth="1.5" />
              <text x="505" y="86" textAnchor="middle" fontSize="9" fontWeight="700" fill="#14532D">Zero-Shot</text>
              <text x="505" y="102" textAnchor="middle" fontSize="8" fill="#166534">Infinitas Classes</text>
            </svg>

            {/* Badges de Vantagens */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', width: '100%', marginTop: '6px' }}>
              <div style={{ background: '#F0FDF4', padding: '8px', borderRadius: '6px', textAlign: 'center' }}>
                <span style={{ fontSize: '10px', color: '#166534', fontWeight: 700, display: 'block' }}>Supervisão Web</span>
                <span style={{ fontSize: '9px', color: '#15803D' }}>400M pares da internet</span>
              </div>
              <div style={{ background: '#F0FDF4', padding: '8px', borderRadius: '6px', textAlign: 'center' }}>
                <span style={{ fontSize: '10px', color: '#166534', fontWeight: 700, display: 'block' }}>Semântica Rica</span>
                <span style={{ fontSize: '9px', color: '#15803D' }}>Frases e conceitos abertos</span>
              </div>
              <div style={{ background: '#F0FDF4', padding: '8px', borderRadius: '6px', textAlign: 'center' }}>
                <span style={{ fontSize: '10px', color: '#166534', fontWeight: 700, display: 'block' }}>Zero-Shot Nativo</span>
                <span style={{ fontSize: '9px', color: '#15803D' }}>Qualquer categoria em texto</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
