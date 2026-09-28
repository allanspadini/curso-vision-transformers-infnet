import React from 'react';
import MathView from '../MathView';

export default function ArchMarco4SwinTransformerDiagram() {
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
            MARCO 4 / 6
          </span>
          <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
            Swin Transformer: Hierarquia Piramidal e Janelas Deslocadas Lineares
          </span>
        </div>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <span style={{ padding: '3px 8px', borderRadius: '4px', background: '#F1F5F9', color: '#64748B', fontSize: '10px', fontWeight: 600 }}>1. CNN / U-Net</span>
          <span style={{ color: '#94A3B8', fontSize: '10px' }}>➔</span>
          <span style={{ padding: '3px 8px', borderRadius: '4px', background: '#F1F5F9', color: '#64748B', fontSize: '10px', fontWeight: 600 }}>2. Transformer</span>
          <span style={{ color: '#94A3B8', fontSize: '10px' }}>➔</span>
          <span style={{ padding: '3px 8px', borderRadius: '4px', background: '#F1F5F9', color: '#64748B', fontSize: '10px', fontWeight: 600 }}>3. ViT</span>
          <span style={{ color: '#94A3B8', fontSize: '10px' }}>➔</span>
          <span style={{ padding: '3px 8px', borderRadius: '4px', background: '#0A345D', color: '#FFFFFF', fontSize: '10px', fontWeight: 700 }}>4. Swin Transformer</span>
          <span style={{ color: '#94A3B8', fontSize: '10px' }}>➔</span>
          <span style={{ padding: '3px 8px', borderRadius: '4px', background: '#F1F5F9', color: '#64748B', fontSize: '10px', fontWeight: 600 }}>5. CLIP</span>
          <span style={{ color: '#94A3B8', fontSize: '10px' }}>➔</span>
          <span style={{ padding: '3px 8px', borderRadius: '4px', background: '#F1F5F9', color: '#64748B', fontSize: '10px', fontWeight: 600 }}>6. Difusão/GAN</span>
        </div>
      </div>

      {/* Main Grid: 2 Architectural Columns (Hierarchical Stages + W-MSA / SW-MSA) */}
      <div style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '12px',
        minHeight: 0
      }}>
        {/* Left Column: Hierarchical 4 Stages & Patch Merging */}
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
                <strong style={{ fontSize: '12.5px', color: '#0A345D' }}>Pirâmide Multiescala & Patch Merging</strong>
              </div>
              <span className="badge badge-cyan" style={{ fontSize: '9.5px' }}>Liu et al. (ICCV 2021 Best Paper)</span>
            </div>

            {/* SVG Visual Scheme */}
            <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '10px', position: 'relative' }}>
              <svg viewBox="0 0 380 145" style={{ width: '100%', height: '145px' }}>
                {/* Stage 1 */}
                <rect x="10" y="20" width="75" height="105" rx="5" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="1.5" />
                <text x="47" y="36" fontSize="9" fontWeight="bold" fill="#1E40AF" textAnchor="middle">Estágio 1</text>
                <text x="47" y="50" fontSize="7.5" fill="#3B82F6" textAnchor="middle">H/4 × W/4</text>
                <text x="47" y="62" fontSize="7.5" fontWeight="bold" fill="#0369A1" textAnchor="middle">Dim = C (96)</text>
                <rect x="20" y="70" width="55" height="45" rx="3" fill="#FFFFFF" stroke="#93C5FD" strokeWidth="1" />
                <text x="47" y="87" fontSize="7.5" fontWeight="bold" fill="#0A345D" textAnchor="middle">Blocos Swin</text>
                <text x="47" y="101" fontSize="7" fill="#64748B" textAnchor="middle">W-MSA / SW</text>

                {/* Seta Merging 1->2 */}
                <path d="M 85 72 L 100 72" stroke="#0284C7" strokeWidth="1.5" />
                <polygon points="100,69 105,72 100,75" fill="#0284C7" />

                {/* Stage 2 */}
                <rect x="105" y="28" width="75" height="97" rx="5" fill="#F0FDF4" stroke="#16A34A" strokeWidth="1.5" />
                <text x="142" y="44" fontSize="9" fontWeight="bold" fill="#15803D" textAnchor="middle">Estágio 2</text>
                <text x="142" y="58" fontSize="7.5" fill="#16A34A" textAnchor="middle">H/8 × W/8</text>
                <text x="142" y="70" fontSize="7.5" fontWeight="bold" fill="#15803D" textAnchor="middle">Dim = 2C (192)</text>
                <rect x="115" y="76" width="55" height="40" rx="3" fill="#FFFFFF" stroke="#86EFAC" strokeWidth="1" />
                <text x="142" y="93" fontSize="7.5" fontWeight="bold" fill="#0A345D" textAnchor="middle">Patch Merging</text>
                <text x="142" y="105" fontSize="7" fill="#166534" textAnchor="middle">Concat 2×2 + Lin</text>

                {/* Seta Merging 2->3 */}
                <path d="M 180 72 L 195 72" stroke="#0284C7" strokeWidth="1.5" />
                <polygon points="195,69 200,72 195,75" fill="#0284C7" />

                {/* Stage 3 */}
                <rect x="200" y="38" width="75" height="87" rx="5" fill="#FEF3C7" stroke="#D97706" strokeWidth="1.5" />
                <text x="237" y="54" fontSize="9" fontWeight="bold" fill="#92400E" textAnchor="middle">Estágio 3</text>
                <text x="237" y="68" fontSize="7.5" fill="#D97706" textAnchor="middle">H/16 × W/16</text>
                <text x="237" y="80" fontSize="7.5" fontWeight="bold" fill="#B45309" textAnchor="middle">Dim = 4C (384)</text>
                <rect x="210" y="86" width="55" height="32" rx="3" fill="#FFFFFF" stroke="#FDE68A" strokeWidth="1" />
                <text x="237" y="103" fontSize="7.5" fontWeight="bold" fill="#0A345D" textAnchor="middle">Deep Stack</text>

                {/* Seta Merging 3->4 */}
                <path d="M 275 72 L 290 72" stroke="#0284C7" strokeWidth="1.5" />
                <polygon points="290,69 295,72 290,75" fill="#0284C7" />

                {/* Stage 4 */}
                <rect x="295" y="48" width="75" height="77" rx="5" fill="#FAF5FF" stroke="#9333EA" strokeWidth="1.5" />
                <text x="332" y="64" fontSize="9" fontWeight="bold" fill="#6B21A8" textAnchor="middle">Estágio 4</text>
                <text x="332" y="78" fontSize="7.5" fill="#9333EA" textAnchor="middle">H/32 × W/32</text>
                <text x="332" y="90" fontSize="7.5" fontWeight="bold" fill="#7E22CE" textAnchor="middle">Dim = 8C (768)</text>
                <text x="332" y="112" fontSize="7" fill="#64748B" textAnchor="middle">➔ Global Pool / FPN</text>
              </svg>
            </div>
          </div>

          <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ background: '#F0F9FF', border: '1px solid #BAE6FD', borderRadius: '6px', padding: '6px 10px', fontSize: '10.5px', color: '#0369A1' }}>
              <strong>Inovação Central:</strong> Resgata a estrutura piramidal hierárquica das CNNs via <em>Patch Merging</em> (reduz resolução em 2× e dobra canais), tornando-se compatível direto com FPN, U-Net e Mask R-CNN.
            </div>
          </div>
        </div>

        {/* Right Column: Shifted Window Attention (W-MSA & SW-MSA) */}
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
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#FF7043' }}></span>
                <strong style={{ fontSize: '12.5px', color: '#0A345D' }}>Janelas Deslocadas: W-MSA ➔ SW-MSA</strong>
              </div>
              <span className="badge badge-orange" style={{ fontSize: '9.5px' }}>Complexidade Linear O(M² · N)</span>
            </div>

            {/* SVG Visual Scheme */}
            <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '10px', position: 'relative' }}>
              <svg viewBox="0 0 380 145" style={{ width: '100%', height: '145px' }}>
                {/* Camada l: Regular Windows W-MSA */}
                <g transform="translate(20, 15)">
                  <rect x="0" y="0" width="105" height="105" rx="4" fill="#FFFFFF" stroke="#0284C7" strokeWidth="1.5" />
                  <line x1="52.5" y1="0" x2="52.5" y2="105" stroke="#0284C7" strokeWidth="1.5" />
                  <line x1="0" y1="52.5" x2="105" y2="52.5" stroke="#0284C7" strokeWidth="1.5" />
                  {/* Sub-patches dentro das janelas */}
                  <circle cx="26" cy="26" r="3" fill="#0284C7" />
                  <circle cx="78" cy="26" r="3" fill="#0284C7" />
                  <circle cx="26" cy="78" r="3" fill="#0284C7" />
                  <circle cx="78" cy="78" r="3" fill="#0284C7" />
                  <text x="52.5" y="120" fontSize="8.5" fontWeight="bold" fill="#0369A1" textAnchor="middle">
                    Camada &ell;: W-MSA (4 Janelas)
                  </text>
                </g>

                {/* Seta de Deslocamento */}
                <path d="M 140 65 L 175 65" stroke="#FF7043" strokeWidth="2" strokeDasharray="3 3" />
                <polygon points="175,61 183,65 175,69" fill="#FF7043" />
                <text x="160" y="55" fontSize="7.5" fontWeight="bold" fill="#C2410C" textAnchor="middle">
                  Shift (&lfloor;M/2&rfloor;)
                </text>

                {/* Camada l+1: Shifted Windows SW-MSA */}
                <g transform="translate(195, 15)">
                  <rect x="0" y="0" width="105" height="105" rx="4" fill="#FFFFFF" stroke="#EA580C" strokeWidth="1.5" />
                  <line x1="30" y1="0" x2="30" y2="105" stroke="#EA580C" strokeWidth="1.5" strokeDasharray="2 2" />
                  <line x1="82.5" y1="0" x2="82.5" y2="105" stroke="#EA580C" strokeWidth="1.5" strokeDasharray="2 2" />
                  <line x1="0" y1="30" x2="105" y2="30" stroke="#EA580C" strokeWidth="1.5" strokeDasharray="2 2" />
                  <line x1="0" y1="82.5" x2="105" y2="82.5" stroke="#EA580C" strokeWidth="1.5" strokeDasharray="2 2" />
                  {/* Central Cross-window link */}
                  <rect x="30" y="30" width="52.5" height="52.5" fill="#FFEDD5" opacity="0.6" />
                  <text x="56" y="58" fontSize="7.5" fontWeight="bold" fill="#9A3412" textAnchor="middle">Janela Cruzada</text>
                  <text x="52.5" y="120" fontSize="8.5" fontWeight="bold" fill="#C2410C" textAnchor="middle">
                    Camada &ell;+1: SW-MSA
                  </text>
                </g>

                {/* Right callout: Cyclic shift */}
                <rect x="312" y="25" width="60" height="85" rx="4" fill="#FFF7ED" stroke="#FDBA74" strokeWidth="1" />
                <text x="342" y="42" fontSize="7.5" fontWeight="bold" fill="#9A3412" textAnchor="middle">Cyclic Shift</text>
                <text x="342" y="55" fontSize="7" fill="#C2410C" textAnchor="middle">+ Masking</text>
                <text x="342" y="75" fontSize="6.5" fill="#475569" textAnchor="middle">Mantém 4</text>
                <text x="342" y="86" fontSize="6.5" fill="#475569" textAnchor="middle">janelas sem</text>
                <text x="342" y="97" fontSize="6.5" fill="#475569" textAnchor="middle">overhead!</text>
              </svg>
            </div>
          </div>

          <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ background: '#FFF7ED', border: '1px solid #FFEDD5', borderRadius: '6px', padding: '6px 10px', fontSize: '10.5px', color: '#9A3412' }}>
              <strong>Inovação Central:</strong> Calcula auto-atenção apenas dentro de janelas locais de tamanho fixo <MathView math="M \times M" /> (<MathView math="M=7" />). O deslocamento na camada seguinte permite comunicação entre janelas mantendo custo estritamente linear <MathView math="O(M^2 \cdot N)" />.
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
            O Swin otimizou o custo linear e a multiescala em visão, mas ainda dependia de rótulos categóricos fechados (ex: 1.000 classes do ImageNet). A solução de engenharia? <strong>O CLIP: Unificação Multimodal Visão-Linguagem via Aprendizado Contrastivo em Hiperesfera!</strong>
          </span>
        </div>
        <span style={{ fontSize: '11px', fontWeight: 700, color: '#0284C7', whiteSpace: 'nowrap' }}>
          Avanço: Classes Fixas ➔ Espaço Semântico Aberto Zero-Shot ➔
        </span>
      </div>
    </div>
  );
}
