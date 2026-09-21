import React from 'react';

export default function CLIPMacroArchitectureDiagram() {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {/* Header com badges informativas */}
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
            Radford et al. (OpenAI, 2021)
          </span>
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--infnet-dark-blue)' }}>
            Dataset WIT: 400 Milhões de pares (Imagem, Texto) raspados da Web
          </span>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <span className="badge badge-cyan" style={{ fontSize: '11px' }}>Two-Tower Network</span>
          <span className="badge badge-green" style={{ fontSize: '11px' }}>L2 Hypersphere D=512</span>
        </div>
      </div>

      {/* Diagrama SVG Principal */}
      <div style={{
        flex: 1,
        background: '#FFFFFF',
        border: '1px solid var(--border-light)',
        borderRadius: '12px',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <svg viewBox="0 0 1100 400" style={{ width: '100%', height: '100%', maxHeight: '420px' }}>
          <defs>
            <linearGradient id="grad-img" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0284C7" />
              <stop offset="100%" stopColor="#0369A1" />
            </linearGradient>
            <linearGradient id="grad-txt" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#9333EA" />
              <stop offset="100%" stopColor="#6B21A8" />
            </linearGradient>
            <linearGradient id="grad-latent" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>
            <marker id="arrow-blue" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#0284C7" />
            </marker>
            <marker id="arrow-purple" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#9333EA" />
            </marker>
            <marker id="arrow-green" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#10B981" />
            </marker>
          </defs>

          {/* ==================== TORRE SUPERIOR: IMAGEM ==================== */}
          {/* Caixa de Entrada de Imagens */}
          <g transform="translate(30, 40)">
            <rect x="0" y="0" width="130" height="110" rx="8" fill="#F0F9FF" stroke="#BAE6FD" strokeWidth="1.5" />
            <rect x="15" y="15" width="100" height="60" rx="6" fill="#BAE6FD" stroke="#0284C7" strokeWidth="1" strokeDasharray="3 2" />
            <text x="65" y="42" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0369A1">Batch Imagens</text>
            <text x="65" y="60" textAnchor="middle" fontSize="9.5" fontFamily="Fira Code" fill="#0284C7">I_1, I_2, ..., I_N</text>
            <text x="65" y="94" textAnchor="middle" fontSize="9.5" fontFamily="Fira Code" fill="#0369A1">[N, 3, 224, 224]</text>
          </g>

          {/* Seta Imagem -> Vision Encoder */}
          <path d="M 170 95 L 210 95" stroke="#0284C7" strokeWidth="2.5" markerEnd="url(#arrow-blue)" />

          {/* Vision Encoder */}
          <g transform="translate(220, 25)">
            <rect x="0" y="0" width="165" height="140" rx="10" fill="url(#grad-img)" />
            <text x="82" y="32" textAnchor="middle" fontSize="13" fontWeight="800" fill="#FFFFFF">Image Encoder</text>
            <text x="82" y="52" textAnchor="middle" fontSize="10.5" fill="#E0F2FE">Vision Transformer (ViT)</text>
            <text x="82" y="68" textAnchor="middle" fontSize="9.5" fill="#BAE6FD">ou ResNet-50 / ResNet-101</text>

            <rect x="15" y="85" width="135" height="42" rx="6" fill="#0B4B75" />
            <text x="82" y="102" textAnchor="middle" fontSize="9.5" fill="#93C5FD">Saída Representação</text>
            <text x="82" y="118" textAnchor="middle" fontSize="10.5" fontFamily="Fira Code" fontWeight="700" fill="#FFFFFF">[N, d_v = 768]</text>
          </g>

          {/* Seta Vision Encoder -> Projeção Linear */}
          <path d="M 395 95 L 435 95" stroke="#0284C7" strokeWidth="2.5" markerEnd="url(#arrow-blue)" />

          {/* Projeção Linear de Imagem */}
          <g transform="translate(445, 45)">
            <rect x="0" y="0" width="125" height="100" rx="8" fill="#F0F9FF" stroke="#0284C7" strokeWidth="1.5" />
            <text x="62" y="28" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0369A1">Projeção W_v</text>
            <text x="62" y="46" textAnchor="middle" fontSize="9" fontFamily="Fira Code" fill="#0284C7">Linear(d_v → D)</text>
            <rect x="12" y="58" width="101" height="30" rx="4" fill="#E0F2FE" />
            <text x="62" y="74" textAnchor="middle" fontSize="9" fontWeight="600" fill="#0369A1">+ Norm L_2 (Unitário)</text>
            <text x="62" y="86" textAnchor="middle" fontSize="8" fontFamily="Fira Code" fill="#075985">||I_i|| = 1</text>
          </g>

          {/* Seta para Matriz de Logits */}
          <path d="M 580 95 L 680 150" stroke="#0284C7" strokeWidth="2.5" strokeDasharray="4 3" markerEnd="url(#arrow-blue)" />
          <text x="635" y="110" textAnchor="middle" fontSize="10" fontFamily="Fira Code" fontWeight="700" fill="#0284C7">I_emb [N, D]</text>


          {/* ==================== TORRE INFERIOR: TEXTO ==================== */}
          {/* Caixa de Entrada de Texto */}
          <g transform="translate(30, 240)">
            <rect x="0" y="0" width="130" height="110" rx="8" fill="#FAF5FF" stroke="#E9D5FF" strokeWidth="1.5" />
            <rect x="15" y="15" width="100" height="60" rx="6" fill="#E9D5FF" stroke="#9333EA" strokeWidth="1" strokeDasharray="3 2" />
            <text x="65" y="42" textAnchor="middle" fontSize="11" fontWeight="700" fill="#7E22CE">Batch Textos</text>
            <text x="65" y="60" textAnchor="middle" fontSize="9.5" fontFamily="Fira Code" fill="#9333EA">T_1, T_2, ..., T_N</text>
            <text x="65" y="94" textAnchor="middle" fontSize="9.5" fontFamily="Fira Code" fill="#7E22CE">[N, L = 77 tokens]</text>
          </g>

          {/* Seta Texto -> Text Encoder */}
          <path d="M 170 295 L 210 295" stroke="#9333EA" strokeWidth="2.5" markerEnd="url(#arrow-purple)" />

          {/* Text Encoder */}
          <g transform="translate(220, 225)">
            <rect x="0" y="0" width="165" height="140" rx="10" fill="url(#grad-txt)" />
            <text x="82" y="32" textAnchor="middle" fontSize="13" fontWeight="800" fill="#FFFFFF">Text Encoder</text>
            <text x="82" y="52" textAnchor="middle" fontSize="10.5" fill="#F3E8FF">Transformer Encoder</text>
            <text x="82" y="68" textAnchor="middle" fontSize="9.5" fill="#E9D5FF">CBOW / Masked Attention</text>

            <rect x="15" y="85" width="135" height="42" rx="6" fill="#581C87" />
            <text x="82" y="102" textAnchor="middle" fontSize="9.5" fill="#D8B4FE">Token [EOS] (Fim Sentença)</text>
            <text x="82" y="118" textAnchor="middle" fontSize="10.5" fontFamily="Fira Code" fontWeight="700" fill="#FFFFFF">[N, d_t = 512]</text>
          </g>

          {/* Seta Text Encoder -> Projeção Linear */}
          <path d="M 395 295 L 435 295" stroke="#9333EA" strokeWidth="2.5" markerEnd="url(#arrow-purple)" />

          {/* Projeção Linear de Texto */}
          <g transform="translate(445, 245)">
            <rect x="0" y="0" width="125" height="100" rx="8" fill="#FAF5FF" stroke="#9333EA" strokeWidth="1.5" />
            <text x="62" y="28" textAnchor="middle" fontSize="11" fontWeight="700" fill="#7E22CE">Projeção W_t</text>
            <text x="62" y="46" textAnchor="middle" fontSize="9" fontFamily="Fira Code" fill="#9333EA">Linear(d_t → D)</text>
            <rect x="12" y="58" width="101" height="30" rx="4" fill="#F3E8FF" />
            <text x="62" y="74" textAnchor="middle" fontSize="9" fontWeight="600" fill="#7E22CE">+ Norm L_2 (Unitário)</text>
            <text x="62" y="86" textAnchor="middle" fontSize="8" fontFamily="Fira Code" fill="#6B21A8">||T_j|| = 1</text>
          </g>

          {/* Seta para Matriz de Logits */}
          <path d="M 580 295 L 680 240" stroke="#9333EA" strokeWidth="2.5" strokeDasharray="4 3" markerEnd="url(#arrow-purple)" />
          <text x="635" y="285" textAnchor="middle" fontSize="10" fontFamily="Fira Code" fontWeight="700" fill="#9333EA">T_emb [N, D]</text>


          {/* ==================== CENTRO DIREITA: MATRIZ DE PRODUTO ESCALAR ==================== */}
          <g transform="translate(710, 85)">
            <rect x="0" y="0" width="220" height="220" rx="10" fill="#F8FAFC" stroke="#0F172A" strokeWidth="2" />
            
            {/* Header da Matriz */}
            <text x="110" y="22" textAnchor="middle" fontSize="12" fontWeight="800" fill="#0F172A">Matriz de Similaridade</text>
            <text x="110" y="38" textAnchor="middle" fontSize="10" fontFamily="Fira Code" fill="#475569">S = (I · T^T) · exp(log τ)</text>

            {/* Grid 4x4 ilustrativo da Matriz */}
            <g transform="translate(25, 48)">
              {/* Linha 1 */}
              <rect x="0" y="0" width="38" height="34" fill="#22C55E" rx="3" />
              <text x="19" y="22" textAnchor="middle" fontSize="10" fontWeight="700" fill="#FFFFFF">I₁·T₁</text>

              <rect x="42" y="0" width="38" height="34" fill="#FEE2E2" rx="3" />
              <text x="61" y="22" textAnchor="middle" fontSize="9" fill="#991B1B">I₁·T₂</text>

              <rect x="84" y="0" width="38" height="34" fill="#FEE2E2" rx="3" />
              <text x="103" y="22" textAnchor="middle" fontSize="9" fill="#991B1B">I₁·T₃</text>

              <rect x="126" y="0" width="38" height="34" fill="#FEE2E2" rx="3" />
              <text x="145" y="22" textAnchor="middle" fontSize="9" fill="#991B1B">I₁·T₄</text>

              {/* Linha 2 */}
              <rect x="0" y="38" width="38" height="34" fill="#FEE2E2" rx="3" />
              <text x="19" y="60" textAnchor="middle" fontSize="9" fill="#991B1B">I₂·T₁</text>

              <rect x="42" y="38" width="38" height="34" fill="#22C55E" rx="3" />
              <text x="61" y="60" textAnchor="middle" fontSize="10" fontWeight="700" fill="#FFFFFF">I₂·T₂</text>

              <rect x="84" y="38" width="38" height="34" fill="#FEE2E2" rx="3" />
              <text x="103" y="60" textAnchor="middle" fontSize="9" fill="#991B1B">I₂·T₃</text>

              <rect x="126" y="38" width="38" height="34" fill="#FEE2E2" rx="3" />
              <text x="145" y="60" textAnchor="middle" fontSize="9" fill="#991B1B">I₂·T₄</text>

              {/* Linha 3 */}
              <rect x="0" y="76" width="38" height="34" fill="#FEE2E2" rx="3" />
              <text x="19" y="98" textAnchor="middle" fontSize="9" fill="#991B1B">I₃·T₁</text>

              <rect x="42" y="76" width="38" height="34" fill="#FEE2E2" rx="3" />
              <text x="61" y="98" textAnchor="middle" fontSize="9" fill="#991B1B">I₃·T₂</text>

              <rect x="84" y="76" width="38" height="34" fill="#22C55E" rx="3" />
              <text x="103" y="98" textAnchor="middle" fontSize="10" fontWeight="700" fill="#FFFFFF">I₃·T₃</text>

              <rect x="126" y="76" width="38" height="34" fill="#FEE2E2" rx="3" />
              <text x="145" y="98" textAnchor="middle" fontSize="9" fill="#991B1B">I₃·T₄</text>

              {/* Linha 4 */}
              <rect x="0" y="114" width="38" height="34" fill="#FEE2E2" rx="3" />
              <text x="19" y="136" textAnchor="middle" fontSize="9" fill="#991B1B">I₄·T₁</text>

              <rect x="42" y="114" width="38" height="34" fill="#FEE2E2" rx="3" />
              <text x="61" y="136" textAnchor="middle" fontSize="9" fill="#991B1B">I₄·T₂</text>

              <rect x="84" y="114" width="38" height="34" fill="#FEE2E2" rx="3" />
              <text x="103" y="136" textAnchor="middle" fontSize="9" fill="#991B1B">I₄·T₃</text>

              <rect x="126" y="114" width="38" height="34" fill="#22C55E" rx="3" />
              <text x="145" y="136" textAnchor="middle" fontSize="10" fontWeight="700" fill="#FFFFFF">I₄·T₄</text>
            </g>
          </g>

          {/* Seta Matriz -> Loss */}
          <path d="M 940 195 L 980 195" stroke="#10B981" strokeWidth="2.5" markerEnd="url(#arrow-green)" />

          {/* Bloco Simétrico da Loss */}
          <g transform="translate(990, 115)">
            <rect x="0" y="0" width="100" height="160" rx="8" fill="#ECFDF5" stroke="#10B981" strokeWidth="1.5" />
            <text x="50" y="24" textAnchor="middle" fontSize="11" fontWeight="800" fill="#065F46">Loss Simétrica</text>
            
            <rect x="8" y="36" width="84" height="42" rx="4" fill="#D1FAE5" />
            <text x="50" y="52" textAnchor="middle" fontSize="9" fontWeight="700" fill="#047857">Cross-Entropy</text>
            <text x="50" y="68" textAnchor="middle" fontSize="8.5" fontFamily="Fira Code" fill="#065F46">L_img (Eixo I)</text>

            <text x="50" y="92" textAnchor="middle" fontSize="14" fontWeight="800" fill="#10B981">+</text>

            <rect x="8" y="102" width="84" height="42" rx="4" fill="#D1FAE5" />
            <text x="50" y="118" textAnchor="middle" fontSize="9" fontWeight="700" fill="#047857">Cross-Entropy</text>
            <text x="50" y="134" textAnchor="middle" fontSize="8.5" fontFamily="Fira Code" fill="#065F46">L_txt (Eixo T)</text>
          </g>
        </svg>
      </div>

      {/* Legenda inferior de fluxo */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '12px'
      }}>
        <div style={{ background: '#F0F9FF', border: '1px solid #BAE6FD', padding: '8px 12px', borderRadius: '6px' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: '#0369A1', display: 'block' }}>1. Duas Torres Assíncronas</span>
          <span style={{ fontSize: '10px', color: '#0284C7' }}>Vision e Text processam batch separadamente</span>
        </div>
        <div style={{ background: '#FAF5FF', border: '1px solid #E9D5FF', padding: '8px 12px', borderRadius: '6px' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: '#7E22CE', display: 'block' }}>2. Projeção Linear & Norm L2</span>
          <span style={{ fontSize: '10px', color: '#9333EA' }}>Ambos vetores caem na hiperesfera unitária D=512</span>
        </div>
        <div style={{ background: '#F8FAFC', border: '1px solid #CBD5E1', padding: '8px 12px', borderRadius: '6px' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: '#334155', display: 'block' }}>3. Matriz N × N de Similaridade</span>
          <span style={{ fontSize: '10px', color: '#64748B' }}>Produto escalar de todos os pares escalado por τ</span>
        </div>
        <div style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', padding: '8px 12px', borderRadius: '6px' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: '#065F46', display: 'block' }}>4. Otimização InfoNCE</span>
          <span style={{ fontSize: '10px', color: '#059669' }}>Maximiza diagonal verde e minimiza pares falsos</span>
        </div>
      </div>
    </div>
  );
}
