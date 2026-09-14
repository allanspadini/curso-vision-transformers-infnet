import React, { useState } from 'react';

export default function InductiveBiasTradeoffDiagram() {
  const [selectedArch, setSelectedArch] = useState('both'); // 'cnn', 'vit', 'both'

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {/* Barra de Filtro de Arquitetura */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#F8FAFC',
        border: '1px solid #E2E8F0',
        borderRadius: '8px',
        padding: '8px 16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
            Comparar Paradigmas:
          </span>
          {[
            { id: 'both', label: 'Confronto Direto (Lado a Lado)' },
            { id: 'cnn', label: 'CNN: Viés Indutivo Forte' },
            { id: 'vit', label: 'ViT: Atenção Global Livre' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedArch(item.id)}
              style={{
                padding: '4px 12px',
                borderRadius: '6px',
                border: selectedArch === item.id ? '2px solid var(--infnet-cyan)' : '1px solid #CBD5E1',
                background: selectedArch === item.id ? '#E0F2FE' : '#FFFFFF',
                color: selectedArch === item.id ? 'var(--infnet-dark-blue)' : '#475569',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div style={{ fontSize: '12px', color: '#64748B' }}>
          Trade-off: <strong>Suposições Rígidas</strong> vs <strong>Liberdade Total de Relações</strong>
        </div>
      </div>

      {/* Grid Principal dos Dois Paradigmas */}
      <div style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: selectedArch === 'both' ? '1fr 1fr' : '1fr',
        gap: '16px',
        minHeight: 0
      }}>
        {/* Bloco 1: Convolução (CNN) */}
        {(selectedArch === 'both' || selectedArch === 'cnn') && (
          <div style={{
            background: '#FFFFFF',
            border: '2px solid #E2E8F0',
            borderRadius: '12px',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: selectedArch === 'cnn' ? '0 4px 12px rgba(10, 52, 93, 0.08)' : 'none'
          }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span className="badge badge-navy">Redes Convolucionais (CNN)</span>
                <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>Desde LeNet (1998)</span>
              </div>
              <h3 style={{ fontSize: '16px', color: 'var(--infnet-dark-blue)', margin: '0 0 6px 0' }}>
                Viés Indutivo Forte (*Hard-Coded*)
              </h3>
              <p style={{ fontSize: '12px', color: '#475569', margin: 0, lineHeight: 1.4 }}>
                A operação convolucional <strong>impõe por design</strong> duas premissas estruturais rígidas na imagem:
              </p>
            </div>

            {/* Diagrama SVG Ampliado de Kernel Local e Translação */}
            <div style={{
              background: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: '10px',
              padding: '10px 14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              minHeight: '210px',
              maxHeight: '250px'
            }}>
              <svg viewBox="0 0 520 210" style={{ width: '100%', height: '100%', maxHeight: '240px' }}>
                <defs>
                  <marker id="arrow-bias" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                    <path d="M 0 0 L 6 3 L 0 6 z" fill="#0A345D" />
                  </marker>
                  <marker id="arrow-cyan" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                    <path d="M 0 0 L 6 3 L 0 6 z" fill="#0284C7" />
                  </marker>
                  <linearGradient id="grad-kernel" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#0284C7" stopOpacity="0.2" />
                  </linearGradient>
                </defs>

                {/* 1. Grade da Imagem de Entrada (5x5 pixels) */}
                <g transform="translate(15, 15)">
                  {/* Fundo da imagem */}
                  <rect x="0" y="0" width="135" height="135" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="1.5" rx="6" />
                  {/* Linhas da grade 5x5 */}
                  {[27, 54, 81, 108].map((pos) => (
                    <React.Fragment key={pos}>
                      <line x1={pos} y1="0" x2={pos} y2="135" stroke="#E2E8F0" strokeWidth="1.2" />
                      <line x1="0" y1={pos} x2="135" y2={pos} stroke="#E2E8F0" strokeWidth="1.2" />
                    </React.Fragment>
                  ))}

                  {/* Janela de Kernel 3x3 em Destaque */}
                  <rect x="27" y="27" width="81" height="81" fill="url(#grad-kernel)" stroke="#0284C7" strokeWidth="2.5" rx="4" />
                  {/* Pixel central em foco */}
                  <rect x="54" y="54" width="27" height="27" fill="#0284C7" rx="3" />
                  <text x="67.5" y="71" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="800">xᵢ,ⱼ</text>

                  {/* Badge do Filtro Local */}
                  <rect x="32" y="32" width="48" height="18" fill="#0A345D" rx="4" />
                  <text x="56" y="45" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="800">Filtro 3×3</text>

                  {/* Legenda inferior */}
                  <text x="67.5" y="156" textAnchor="middle" fill="#0A345D" fontSize="11" fontWeight="800">1. Localidade Estrita 2D</text>
                  <text x="67.5" y="172" textAnchor="middle" fill="#64748B" fontSize="9.5" fontWeight="600">Apenas vizinhos imediatos (3×3)</text>
                </g>

                {/* 2. Operação de Convolução e Deslize (Sliding Window) */}
                <g transform="translate(160, 50)">
                  <path d="M 0 35 L 35 35" stroke="#0A345D" strokeWidth="2.5" markerEnd="url(#arrow-bias)" />
                  <path d="M 5 15 C 15 5, 25 5, 32 20" fill="none" stroke="#0284C7" strokeWidth="2" strokeDasharray="3 2" markerEnd="url(#arrow-cyan)" />
                  <text x="18" y="2" textAnchor="middle" fill="#0A345D" fontSize="9.5" fontWeight="800">Sliding</text>
                  <text x="18" y="54" textAnchor="middle" fill="#0284C7" fontSize="9" fontWeight="700">Stride s</text>
                  <text x="18" y="66" textAnchor="middle" fill="#64748B" fontSize="8.5">W idêntico</text>
                </g>

                {/* 3. Mapa de Características Resultante (Feature Map) */}
                <g transform="translate(208, 25)">
                  {/* Linhas de projeção do campo receptivo */}
                  <line x1="-85" y1="17" x2="35" y2="40" stroke="#0284C7" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.5" />
                  <line x1="-85" y1="98" x2="35" y2="75" stroke="#0284C7" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.5" />

                  {/* Grade do Feature Map (3x3) */}
                  <rect x="0" y="5" width="105" height="105" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1.5" rx="6" />
                  <line x1="35" y1="5" x2="35" y2="110" stroke="#BAE6FD" strokeWidth="1.2" />
                  <line x1="70" y1="5" x2="70" y2="110" stroke="#BAE6FD" strokeWidth="1.2" />
                  <line x1="0" y1="40" x2="105" y2="40" stroke="#BAE6FD" strokeWidth="1.2" />
                  <line x1="0" y1="75" x2="105" y2="75" stroke="#BAE6FD" strokeWidth="1.2" />

                  {/* Célula de ativação correspondente */}
                  <rect x="35" y="40" width="35" height="35" fill="#0284C7" rx="4" />
                  <text x="52.5" y="62" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="800">yᵢ,ⱼ</text>

                  {/* Legenda inferior */}
                  <text x="52.5" y="146" textAnchor="middle" fill="#0A345D" fontSize="11" fontWeight="800">2. Equivariância</text>
                  <text x="52.5" y="162" textAnchor="middle" fill="#64748B" fontSize="9.5" fontWeight="600">Translação preservada</text>
                </g>

                {/* 4. Painel Lateral com Princípios Fundamentais */}
                <g transform="translate(330, 15)">
                  <rect x="0" y="0" width="175" height="180" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" rx="8" />
                  {/* Cabeçalho */}
                  <rect x="0" y="0" width="175" height="28" fill="#0A345D" rx="8" />
                  <rect x="0" y="18" width="175" height="10" fill="#0A345D" />
                  <text x="87.5" y="18" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="800">PREMISSA ESTRUTURAL</text>

                  {/* Tópico 1: Localidade */}
                  <text x="12" y="48" fill="#0284C7" fontSize="12" fontWeight="900">●</text>
                  <text x="24" y="48" fill="#0F172A" fontSize="10" fontWeight="700">Localidade 2D:</text>
                  <text x="12" y="64" fill="#475569" fontSize="9">Pixels vizinhos formam arestas,</text>
                  <text x="12" y="76" fill="#475569" fontSize="9">texturas e partes anatômicas.</text>

                  {/* Tópico 2: Equivariância */}
                  <text x="12" y="98" fill="#16A34A" fontSize="12" fontWeight="900">●</text>
                  <text x="24" y="98" fill="#0F172A" fontSize="10" fontWeight="700">Equivariância Translacional:</text>
                  <text x="12" y="114" fill="#475569" fontSize="9">Um padrão visual é detectado</text>
                  <text x="12" y="126" fill="#475569" fontSize="9">em qualquer canto da imagem.</text>

                  {/* Badge de Impacto */}
                  <rect x="10" y="142" width="155" height="26" fill="#ECFDF5" stroke="#A7F3D0" rx="5" />
                  <text x="87.5" y="159" textAnchor="middle" fill="#065F46" fontSize="9" fontWeight="800">
                    ⚡ Convergência com poucos dados
                  </text>
                </g>
              </svg>
            </div>

            {/* Pontos Chave */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '11.5px', color: '#334155' }}>
              <div style={{ display: 'flex', gap: '6px', alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--infnet-green-accent)', fontWeight: 800 }}>✓</span>
                <span><strong>Aprende rápido com poucos dados:</strong> Não precisa reaprender que pixels vizinhos formam arestas e olhos.</span>
              </div>
              <div style={{ display: 'flex', gap: '6px', alignItems: 'flex-start' }}>
                <span style={{ color: '#EF4444', fontWeight: 800 }}>✗</span>
                <span><strong>Miopia Global:</strong> O campo receptivo só se expande empilhando muitas camadas profundas.</span>
              </div>
            </div>
          </div>
        )}

        {/* Bloco 2: Vision Transformer (ViT) */}
        {(selectedArch === 'both' || selectedArch === 'vit') && (
          <div style={{
            background: '#FFFFFF',
            border: '2px solid #E2E8F0',
            borderRadius: '12px',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: selectedArch === 'vit' ? '0 4px 12px rgba(27, 181, 216, 0.1)' : 'none'
          }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span className="badge badge-cyan">Vision Transformer (ViT)</span>
                <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>Dosovitskiy et al. (2020)</span>
              </div>
              <h3 style={{ fontSize: '16px', color: 'var(--infnet-dark-blue)', margin: '0 0 6px 0' }}>
                Viés Indutivo Fraco (*Quase Nulo*)
              </h3>
              <p style={{ fontSize: '12px', color: '#475569', margin: 0, lineHeight: 1.4 }}>
                O Transformer <strong>não sabe a priori</strong> o que é uma imagem 2D; ele trata patches como tokens de texto livres:
              </p>
            </div>

            {/* Diagrama SVG Ampliado de Atenção Total entre Patches */}
            <div style={{
              background: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: '10px',
              padding: '10px 14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              minHeight: '210px',
              maxHeight: '250px'
            }}>
              <svg viewBox="0 0 520 210" style={{ width: '100%', height: '100%', maxHeight: '240px' }}>
                <defs>
                  <linearGradient id="grad-cls" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#C084FC" />
                    <stop offset="100%" stopColor="#7E22CE" />
                  </linearGradient>
                  <linearGradient id="grad-patch" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#38BDF8" />
                    <stop offset="100%" stopColor="#0284C7" />
                  </linearGradient>
                  <filter id="glow-cls" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#A855F7" floodOpacity="0.4" />
                  </filter>
                </defs>

                {/* 1. Grafo de Autoatenção Completa entre Patches */}
                <g transform="translate(10, 10)">
                  {/* Linhas de Atenção entre todos os Patches O(N²) */}
                  <path d="M 40 45 Q 85 10 130 35" fill="none" stroke="#64D9EF" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.8" />
                  <path d="M 130 35 Q 175 10 220 35" fill="none" stroke="#64D9EF" strokeWidth="2" strokeDasharray="3 3" opacity="0.9" />
                  <path d="M 220 35 Q 265 10 305 45" fill="none" stroke="#64D9EF" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.8" />
                  <path d="M 40 45 Q 175 -15 305 45" fill="none" stroke="#64D9EF" strokeWidth="1.2" strokeDasharray="2 2" opacity="0.5" />

                  {/* Linhas de Atenção Direta do Token [CLS] para todos os Patches */}
                  <line x1="175" y1="125" x2="40" y2="45" stroke="#A855F7" strokeWidth="2" opacity="0.85" />
                  <line x1="175" y1="125" x2="130" y2="35" stroke="#A855F7" strokeWidth="2.8" opacity="0.95" />
                  <line x1="175" y1="125" x2="220" y2="35" stroke="#A855F7" strokeWidth="3.2" opacity="1" />
                  <line x1="175" y1="125" x2="305" y2="45" stroke="#A855F7" strokeWidth="2.2" opacity="0.85" />

                  {/* Nós dos Patches Visuais */}
                  {[
                    { id: 'P₁', x: 40, y: 45, label: 'Patch Top-Left' },
                    { id: 'P₂', x: 130, y: 35, label: 'Patch Top-Mid' },
                    { id: 'P₃', x: 220, y: 35, label: 'Patch Bot-Mid' },
                    { id: 'P₄', x: 305, y: 45, label: 'Patch Bot-Right' }
                  ].map((pt) => (
                    <g key={pt.id} transform={`translate(${pt.x}, ${pt.y})`}>
                      <circle cx="0" cy="0" r="20" fill="url(#grad-patch)" stroke="#FFFFFF" strokeWidth="2.5" />
                      <text x="0" y="5" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="800">{pt.id}</text>
                    </g>
                  ))}

                  {/* Nó Central Especial: Token [CLS] */}
                  <g transform="translate(175, 125)">
                    <circle cx="0" cy="0" r="26" fill="url(#grad-cls)" stroke="#FFFFFF" strokeWidth="3" filter="url(#glow-cls)" />
                    <text x="0" y="5" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="900">[CLS]</text>
                    <rect x="-35" y="32" width="70" height="18" fill="#7E22CE" rx="4" />
                    <text x="0" y="44" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="800">Token Agregador</text>
                  </g>

                  {/* Legenda inferior do Grafo */}
                  <text x="175" y="188" textAnchor="middle" fill="#0A345D" fontSize="11" fontWeight="800">Atenção Cruzada Completa O(N²)</text>
                  <text x="175" y="202" textAnchor="middle" fill="#64748B" fontSize="9.5" fontWeight="600">Softmax(Q·Kᵀ / √d) calcula correlação dinâmica</text>
                </g>

                {/* 2. Painel Lateral com Princípios Fundamentais */}
                <g transform="translate(330, 15)">
                  <rect x="0" y="0" width="175" height="180" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" rx="8" />
                  {/* Cabeçalho */}
                  <rect x="0" y="0" width="175" height="28" fill="#0284C7" rx="8" />
                  <rect x="0" y="18" width="175" height="10" fill="#0284C7" />
                  <text x="87.5" y="18" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="800">LIBERDADE RELACIONAL</text>

                  {/* Tópico 1: Alcance Global */}
                  <text x="12" y="48" fill="#9333EA" fontSize="12" fontWeight="900">●</text>
                  <text x="24" y="48" fill="#0F172A" fontSize="10" fontWeight="700">Atenção Sem Limites:</text>
                  <text x="12" y="64" fill="#475569" fontSize="9">P₁ conversa com P₄ tão</text>
                  <text x="12" y="76" fill="#475569" fontSize="9">diretamente quanto com P₂.</text>

                  {/* Tópico 2: Posição Aprendida */}
                  <text x="12" y="98" fill="#E11D48" fontSize="12" fontWeight="900">●</text>
                  <text x="24" y="98" fill="#0F172A" fontSize="10" fontWeight="700">Agnóstico à Grade 2D:</text>
                  <text x="12" y="114" fill="#475569" fontSize="9">A geometria espacial só é</text>
                  <text x="12" y="126" fill="#475569" fontSize="9">conhecida via Position Embeddings.</text>

                  {/* Badge de Impacto */}
                  <rect x="10" y="142" width="155" height="26" fill="#FEF2F2" stroke="#FECACA" rx="5" />
                  <text x="87.5" y="159" textAnchor="middle" fill="#991B1B" fontSize="9" fontWeight="800">
                    ⚠️ Exige volumes massivos (JFT/21k)
                  </text>
                </g>
              </svg>
            </div>

            {/* Pontos Chave */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '11.5px', color: '#334155' }}>
              <div style={{ display: 'flex', gap: '6px', alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--infnet-green-accent)', fontWeight: 800 }}>✓</span>
                <span><strong>Alcance Global Imediato:</strong> Qualquer parte da imagem pode conversar com qualquer outra desde o Bloco 1.</span>
              </div>
              <div style={{ display: 'flex', gap: '6px', alignItems: 'flex-start' }}>
                <span style={{ color: '#EF4444', fontWeight: 800 }}>✗</span>
                <span><strong>Fome de Dados Massiva:</strong> Sem viés indutivo, precisa aprender relações espaciais puramente a partir de dados!</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
