import React from 'react';

export default function CLIPZeroShotInferenceDiagram() {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {/* Top Banner de Resumo */}
      <div style={{
        background: '#EDF5FA',
        border: '1px solid #D0E3F0',
        borderRadius: '8px',
        padding: '10px 18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{
            background: 'var(--infnet-dark-blue)',
            color: '#FFFFFF',
            fontSize: '11px',
            fontWeight: 800,
            padding: '3px 8px',
            borderRadius: '4px'
          }}>
            INFERÊNCIA ZERO-SHOT
          </span>
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--infnet-dark-blue)' }}>
            Como classificar qualquer conjunto de C classes sem nenhum dado de treino
          </span>
        </div>
        <span style={{ fontSize: '11px', fontFamily: 'Fira Code', color: '#0284C7', fontWeight: 700 }}>
          W_class = Normalize(TextEncoder(Prompts)) ∈ R^(C × D)
        </span>
      </div>

      {/* Diagrama Principal SVG */}
      <div style={{
        flex: 1,
        background: '#FFFFFF',
        border: '1.5px solid var(--border-light)',
        borderRadius: '12px',
        padding: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <svg viewBox="0 0 1100 360" style={{ width: '100%', height: '100%', maxHeight: '380px' }}>
          <defs>
            <marker id="zs-arrow-blue" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#0284C7" />
            </marker>
            <marker id="zs-arrow-purple" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#9333EA" />
            </marker>
            <marker id="zs-arrow-green" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#16A34A" />
            </marker>
          </defs>

          {/* ================= TORRE SUPERIOR: PROMPTS E TEXT ENCODER ================= */}
          {/* Caixa 1: Conjunto de C classes */}
          <g transform="translate(30, 30)">
            <rect x="0" y="0" width="140" height="110" rx="8" fill="#FAF5FF" stroke="#E9D5FF" strokeWidth="1.5" />
            <text x="70" y="24" textAnchor="middle" fontSize="11" fontWeight="800" fill="#7E22CE">Classes Alvo (C)</text>
            
            <rect x="12" y="34" width="116" height="20" rx="3" fill="#FFFFFF" stroke="#D8B4FE" />
            <text x="70" y="48" textAnchor="middle" fontSize="9" fill="#6B21A8">1. "plane"</text>

            <rect x="12" y="58" width="116" height="20" rx="3" fill="#FFFFFF" stroke="#D8B4FE" />
            <text x="70" y="72" textAnchor="middle" fontSize="9" fill="#6B21A8">2. "car"</text>

            <text x="70" y="92" textAnchor="middle" fontSize="12" fill="#9333EA">...</text>

            <rect x="12" y="98" width="116" height="20" rx="3" fill="#FFFFFF" stroke="#D8B4FE" />
            <text x="70" y="112" textAnchor="middle" fontSize="9" fill="#6B21A8">C. "dog"</text>
          </g>

          <path d="M 180 85 L 210 85" stroke="#9333EA" strokeWidth="2" markerEnd="url(#zs-arrow-purple)" />

          {/* Caixa 2: Prompt Engineering */}
          <g transform="translate(220, 30)">
            <rect x="0" y="0" width="150" height="110" rx="8" fill="#F3E8FF" stroke="#C084FC" strokeWidth="1.5" />
            <text x="75" y="24" textAnchor="middle" fontSize="11" fontWeight="800" fill="#6B21A8">Prompt Template</text>
            <text x="75" y="40" textAnchor="middle" fontSize="9" fill="#7E22CE">"a photo of a {'{'}c{'}'}."</text>

            <rect x="10" y="52" width="130" height="48" rx="4" fill="#FFFFFF" />
            <text x="75" y="68" textAnchor="middle" fontSize="8.5" fill="#581C87">"a photo of a plane."</text>
            <text x="75" y="82" textAnchor="middle" fontSize="8.5" fill="#581C87">"a photo of a car."</text>
            <text x="75" y="94" textAnchor="middle" fontSize="8.5" fill="#581C87">"a photo of a dog."</text>
          </g>

          <path d="M 380 85 L 410 85" stroke="#9333EA" strokeWidth="2" markerEnd="url(#zs-arrow-purple)" />

          {/* Caixa 3: Text Encoder Congelado */}
          <g transform="translate(420, 25)">
            <rect x="0" y="0" width="150" height="120" rx="8" fill="#9333EA" />
            <text x="75" y="32" textAnchor="middle" fontSize="12" fontWeight="800" fill="#FFFFFF">Text Encoder</text>
            <text x="75" y="50" textAnchor="middle" fontSize="9.5" fill="#E9D5FF">Pesos Congelados</text>
            <rect x="15" y="65" width="120" height="42" rx="4" fill="#6B21A8" />
            <text x="75" y="82" textAnchor="middle" fontSize="9" fill="#D8B4FE">Projeção + Norm L2</text>
            <text x="75" y="98" textAnchor="middle" fontSize="10.5" fontFamily="Fira Code" fontWeight="700" fill="#FFFFFF">W_txt: [C, D]</text>
          </g>

          <path d="M 580 85 L 680 150" stroke="#9333EA" strokeWidth="2" strokeDasharray="3 3" markerEnd="url(#zs-arrow-purple)" />
          <text x="635" y="105" textAnchor="middle" fontSize="9.5" fontFamily="Fira Code" fontWeight="700" fill="#9333EA">T̂_c ∈ [C, 512]</text>


          {/* ================= TORRE INFERIOR: IMAGEM DE TESTE ================= */}
          {/* Caixa 4: Imagem de Teste */}
          <g transform="translate(100, 220)">
            <rect x="0" y="0" width="130" height="100" rx="8" fill="#F0F9FF" stroke="#BAE6FD" strokeWidth="1.5" />
            <text x="65" y="24" textAnchor="middle" fontSize="11" fontWeight="800" fill="#0369A1">Imagem de Teste</text>
            <rect x="15" y="34" width="100" height="42" rx="4" fill="#BAE6FD" />
            <text x="65" y="58" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0284C7">Foto de Cão</text>
            <text x="65" y="90" textAnchor="middle" fontSize="9" fontFamily="Fira Code" fill="#0369A1">[1, 3, 224, 224]</text>
          </g>

          <path d="M 240 270 L 410 270" stroke="#0284C7" strokeWidth="2" markerEnd="url(#zs-arrow-blue)" />

          {/* Caixa 5: Image Encoder Congelado */}
          <g transform="translate(420, 210)">
            <rect x="0" y="0" width="150" height="120" rx="8" fill="#0284C7" />
            <text x="75" y="32" textAnchor="middle" fontSize="12" fontWeight="800" fill="#FFFFFF">Vision Encoder</text>
            <text x="75" y="50" textAnchor="middle" fontSize="9.5" fill="#BAE6FD">ViT-B/32 Congelado</text>
            <rect x="15" y="65" width="120" height="42" rx="4" fill="#0369A1" />
            <text x="75" y="82" textAnchor="middle" fontSize="9" fill="#93C5FD">Projeção + Norm L2</text>
            <text x="75" y="98" textAnchor="middle" fontSize="10.5" fontFamily="Fira Code" fontWeight="700" fill="#FFFFFF">Î_test: [1, D]</text>
          </g>

          <path d="M 580 270 L 680 210" stroke="#0284C7" strokeWidth="2" strokeDasharray="3 3" markerEnd="url(#zs-arrow-blue)" />
          <text x="635" y="255" textAnchor="middle" fontSize="9.5" fontFamily="Fira Code" fontWeight="700" fill="#0284C7">Î_test ∈ [1, 512]</text>


          {/* ================= PRODUTO ESCALAR E SOFTMAX ================= */}
          {/* Caixa 6: Multiplicação Matricial */}
          <g transform="translate(700, 140)">
            <rect x="0" y="0" width="150" height="80" rx="8" fill="#F8FAFC" stroke="#0F172A" strokeWidth="2" />
            <text x="75" y="24" textAnchor="middle" fontSize="11" fontWeight="800" fill="#0F172A">Produto Escalar</text>
            <text x="75" y="44" textAnchor="middle" fontSize="11" fontFamily="Fira Code" fontWeight="700" fill="#0284C7">
              logits = Î · T̂^T
            </text>
            <text x="75" y="64" textAnchor="middle" fontSize="9.5" fontFamily="Fira Code" fill="#64748B">
              shape: [1, C] / τ
            </text>
          </g>

          <path d="M 860 180 L 890 180" stroke="#16A34A" strokeWidth="2.5" markerEnd="url(#zs-arrow-green)" />

          {/* Caixa 7: Probabilidades Softmax */}
          <g transform="translate(900, 110)">
            <rect x="0" y="0" width="170" height="140" rx="8" fill="#ECFDF5" stroke="#16A34A" strokeWidth="2" />
            <text x="85" y="24" textAnchor="middle" fontSize="11" fontWeight="800" fill="#065F46">Softmax(logits)</text>

            <g transform="translate(15, 38)">
              {/* Barra Plane */}
              <text x="0" y="12" fontSize="9" fill="#047857">plane:</text>
              <rect x="40" y="3" width="10" height="12" rx="2" fill="#94A3B8" />
              <text x="60" y="13" fontSize="8.5" fontFamily="Fira Code" fill="#64748B">1.2%</text>

              {/* Barra Car */}
              <text x="0" y="32" fontSize="9" fill="#047857">car:</text>
              <rect x="40" y="23" width="8" height="12" rx="2" fill="#94A3B8" />
              <text x="60" y="33" fontSize="8.5" fontFamily="Fira Code" fill="#64748B">0.8%</text>

              {/* Barra Dog (Vencedor) */}
              <text x="0" y="54" fontSize="9.5" fontWeight="800" fill="#15803D">dog:</text>
              <rect x="40" y="44" width="80" height="14" rx="2" fill="#22C55E" />
              <text x="125" y="55" fontSize="9" fontFamily="Fira Code" fontWeight="700" fill="#15803D">95.4%</text>
            </g>

            <rect x="15" y="105" width="140" height="24" rx="4" fill="#16A34A" />
            <text x="85" y="121" textAnchor="middle" fontSize="10" fontWeight="800" fill="#FFFFFF">Predição: "dog"</text>
          </g>
        </svg>
      </div>

      {/* Destaque Prático */}
      <div style={{
        background: '#F0FDF4',
        border: '1px solid #BBF7D0',
        borderRadius: '8px',
        padding: '10px 18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <span style={{ fontSize: '11.5px', color: '#14532D', fontWeight: 600 }}>
          ⚡ <strong>Custo de Inferência Zero-Shot:</strong> As representações textuais <code style={{ fontFamily: 'Fira Code', background: '#DCFCE7', padding: '1px 4px', borderRadius: '3px' }}>T̂_c</code> das C classes são pré-computadas e cacheadas apenas UMA vez! Para cada nova imagem, executa-se apenas a torre visual e um produto vetorial ultra-rápido.
        </span>
      </div>
    </div>
  );
}
