import React, { useState } from 'react';
import { Layers, ArrowRight, CheckCircle2, Zap, AlertTriangle, ShieldCheck, RefreshCw } from 'lucide-react';
import MathView from '../MathView';

export default function ResidualConceptDiagram() {
  const [isIdentityMode, setIsIdentityMode] = useState(false);
  const [hoveredBlock, setHoveredBlock] = useState(null);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '16px', height: '100%', alignItems: 'stretch' }}>
      {/* Left Column: Visual Side-by-Side Diagram */}
      <div style={{
        background: '#FFFFFF',
        border: '1px solid var(--border-light)',
        borderRadius: '10px',
        padding: '12px 16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: 'var(--shadow-sm)'
      }}>
        {/* Header & Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--infnet-dark-blue)' }}>
              A Ideia Central: Aprendizado Residual (He et al., 2015)
            </span>
          </div>

          <button
            onClick={() => setIsIdentityMode(!isIdentityMode)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              border: 'none',
              padding: '4px 10px',
              borderRadius: '6px',
              fontSize: '11px',
              fontWeight: 700,
              cursor: 'pointer',
              background: isIdentityMode ? 'var(--infnet-green-accent)' : '#F1F5F9',
              color: isIdentityMode ? '#FFFFFF' : 'var(--infnet-dark-blue)',
              transition: 'all 0.15s ease',
              boxShadow: isIdentityMode ? '0 2px 6px rgba(124, 179, 66, 0.4)' : 'none'
            }}
          >
            <RefreshCw size={12} />
            {isIdentityMode ? 'Simulando: Função Identidade h(x) = x' : 'Simular Caso Ótimo: Identidade'}
          </button>
        </div>

        {/* SVG Side-by-Side Comparison */}
        <div style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: '#FAFAFA',
          border: '1px solid #E2E8F0',
          borderRadius: '8px',
          padding: '6px',
          overflow: 'hidden'
        }}>
          <svg viewBox="0 0 540 310" style={{ width: '100%', height: '100%', maxHeight: '270px' }}>
            <defs>
              <marker id="arr-blk" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#0F172A" />
              </marker>
              <marker id="arr-blue" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#0284C7" />
              </marker>
              <marker id="arr-green" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#15803D" />
              </marker>
            </defs>

            {/* Separator Line */}
            <line x1="250" y1="20" x2="250" y2="290" stroke="#E2E8F0" strokeWidth="1.5" strokeDasharray="4 4" />

            {/* ======================================================== */}
            {/* LEFT: PLAIN NETWORK BLOCK                                */}
            {/* ======================================================== */}
            <g
              onMouseEnter={() => setHoveredBlock('plain')}
              onMouseLeave={() => setHoveredBlock(null)}
              style={{ cursor: 'pointer' }}
            >
              {/* Column Label */}
              <text x="120" y="25" textAnchor="middle" fontSize="12" fontWeight="800" fill="#64748B">
                Bloco Convencional (Plain)
              </text>

              {/* Input x */}
              <text x="120" y="295" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0F172A">
                Entrada x
              </text>
              <line x1="120" y1="280" x2="120" y2="245" stroke="#0F172A" strokeWidth="2.2" markerEnd="url(#arr-blk)" />

              {/* Layer 1 */}
              <rect
                x="55"
                y="195"
                width="130"
                height="45"
                rx="8"
                fill={isIdentityMode ? "#FEE2E2" : "#93C5FD"}
                stroke="#0F172A"
                strokeWidth="1.8"
              />
              <text x="120" y="215" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0F172A">Camada 1</text>
              <text x="120" y="230" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="#334155">
                {isIdentityMode ? 'Difícil aprender W ≈ I' : 'Conv 3×3 + ReLU'}
              </text>

              {/* Arrow Layer 1 -> Layer 2 */}
              <line x1="120" y1="195" x2="120" y2="160" stroke="#0F172A" strokeWidth="2.2" markerEnd="url(#arr-blk)" />

              {/* Layer 2 */}
              <rect
                x="55"
                y="110"
                width="130"
                height="45"
                rx="8"
                fill={isIdentityMode ? "#FEE2E2" : "#93C5FD"}
                stroke="#0F172A"
                strokeWidth="1.8"
              />
              <text x="120" y="130" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0F172A">Camada 2</text>
              <text x="120" y="145" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="#334155">
                {isIdentityMode ? 'Mapeamento rígido' : 'Conv 3×3 + ReLU'}
              </text>

              {/* Output arrow */}
              <line x1="120" y1="110" x2="120" y2="65" stroke="#0F172A" strokeWidth="2.2" markerEnd="url(#arr-blk)" />
              <text x="120" y="55" textAnchor="middle" fontSize="13" fontWeight="800" fill="#0F172A">
                h(x)
              </text>

              {/* Bracket showing h(x) */}
              <path d="M 195 125 C 205 125, 205 175, 215 175 C 205 175, 205 225, 195 225" fill="none" stroke="#0F172A" strokeWidth="1.5" />
              <text x="228" y="180" fontSize="12" fontWeight="700" fill="#0F172A">h(x)</text>
            </g>

            {/* ======================================================== */}
            {/* RIGHT: RESIDUAL NETWORK BLOCK (ResNet)                   */}
            {/* ======================================================== */}
            <g
              onMouseEnter={() => setHoveredBlock('residual')}
              onMouseLeave={() => setHoveredBlock(null)}
              style={{ cursor: 'pointer' }}
            >
              {/* Column Label */}
              <text x="400" y="25" textAnchor="middle" fontSize="12" fontWeight="800" fill="#0284C7">
                Bloco Residual (ResNet)
              </text>

              {/* Input x */}
              <text x="415" y="295" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0F172A">
                Entrada x
              </text>
              <line x1="415" y1="280" x2="415" y2="245" stroke="#0F172A" strokeWidth="2.2" markerEnd="url(#arr-blk)" />

              {/* Shortcut Connection Line (Skip connection) */}
              <path
                d="M 415 265 L 305 265 L 305 78 L 392 78"
                fill="none"
                stroke={isIdentityMode ? "#15803D" : "#0F172A"}
                strokeWidth={isIdentityMode ? "3.2" : "2.5"}
                markerEnd={isIdentityMode ? "url(#arr-green)" : "url(#arr-blk)"}
              />
              <text x="295" y="165" textAnchor="middle" fontSize="10.5" fontWeight="700" fill={isIdentityMode ? "#15803D" : "#0284C7"} transform="rotate(-90 295 165)">
                Skip connection (Atalho direto x)
              </text>

              {/* Layer 1 */}
              <rect
                x="350"
                y="195"
                width="130"
                height="45"
                rx="8"
                fill={isIdentityMode ? "#DCFCE7" : "#93C5FD"}
                stroke="#0F172A"
                strokeWidth="1.8"
              />
              <text x="415" y="215" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0F172A">Camada 1</text>
              <text x="415" y="230" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="#334155">
                {isIdentityMode ? 'Pesos f(x) → 0' : 'Conv 3×3 + BN + ReLU'}
              </text>

              {/* Arrow Layer 1 -> Layer 2 */}
              <line x1="415" y1="195" x2="415" y2="160" stroke="#0F172A" strokeWidth="2.2" markerEnd="url(#arr-blk)" />

              {/* Layer 2 */}
              <rect
                x="350"
                y="110"
                width="130"
                height="45"
                rx="8"
                fill={isIdentityMode ? "#DCFCE7" : "#93C5FD"}
                stroke="#0F172A"
                strokeWidth="1.8"
              />
              <text x="415" y="130" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0F172A">Camada 2</text>
              <text x="415" y="145" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="#334155">
                {isIdentityMode ? 'Pesos f(x) → 0' : 'Conv 3×3 + BN'}
              </text>

              {/* Arrow to Add Node */}
              <line x1="415" y1="110" x2="415" y2="92" stroke="#0F172A" strokeWidth="2.2" markerEnd="url(#arr-blk)" />

              {/* Addition (+) Node */}
              <rect
                x="395"
                y="63"
                width="40"
                height="28"
                rx="6"
                fill="#FEF08A"
                stroke="#0F172A"
                strokeWidth="2"
              />
              <text x="415" y="82" textAnchor="middle" fontSize="16" fontWeight="900" fill="#0F172A">+</text>

              {/* Output arrow from (+) */}
              <line x1="415" y1="63" x2="415" y2="38" stroke="#0F172A" strokeWidth="2.5" markerEnd="url(#arr-blk)" />
              <text x="415" y="32" textAnchor="middle" fontSize="13" fontWeight="800" fill="#0F172A">
                {isIdentityMode ? 'h(x) = x' : 'h(x)'}
              </text>

              {/* Bracket showing f(x) = h(x) - x */}
              <path d="M 490 125 C 500 125, 500 175, 510 175 C 500 175, 500 225, 490 225" fill="none" stroke="#0F172A" strokeWidth="1.5" />
              <text x="515" y="172" fontSize="10.5" fontWeight="700" fill="#0284C7">f(x) =</text>
              <text x="515" y="186" fontSize="10.5" fontWeight="700" fill="#0284C7">h(x) - x</text>
            </g>
          </svg>
        </div>

        {/* Legend / Takeaway */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: 'var(--text-muted)' }}>
          <span style={{ fontWeight: 600 }}>
            {isIdentityMode ? '🟢 No Bloco Residual, para aprender a Identidade basta que as camadas conv aprendam zero (f(x) = 0)!' : '💡 A rede só precisa aprender a modificação residual f(x) necessária sobre a entrada x.'}
          </span>
        </div>
      </div>

      {/* Right Column: Theory, Intuition & Math */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'space-between' }}>
        {/* Core Mathematical Formulation */}
        <div style={{
          background: '#FFFFFF',
          border: '1.5px solid var(--infnet-cyan)',
          borderRadius: '10px',
          padding: '14px 16px',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
            <Zap size={15} color="#0284C7" />
            <span style={{ fontSize: '13.5px', fontWeight: 800, color: 'var(--infnet-dark-blue)' }}>
              A Formulação Matemática Residual
            </span>
          </div>

          <p style={{ fontSize: '11px', color: 'var(--text-main)', margin: '4px 0 8px 0', lineHeight: 1.45 }}>
            Seja <MathView math="h(\mathbf{x})" /> o mapeamento que queremos aprender. A ResNet divide o problema em dois termos:
          </p>

          <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '8px 10px', textAlign: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--infnet-dark-blue)' }}>
              <MathView math="h(\mathbf{x}) = f(\mathbf{x}) + \mathbf{x} \iff f(\mathbf{x}) = h(\mathbf{x}) - \mathbf{x}" />
            </span>
          </div>

          <div style={{ fontSize: '11px', color: 'var(--text-main)', lineHeight: 1.4 }}>
            <strong>Por que é mais fácil?</strong> Em vez de aprender toda a estrutura da imagem do zero, as camadas só precisam aprender o <em>resíduo</em> (a pequena correção ou detalhe novo a ser somado).
          </div>
        </div>

        {/* The 2 Main Intuitions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ background: '#FFFFFF', border: '1px solid var(--border-light)', borderRadius: '8px', padding: '9px 12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
              <ShieldCheck size={14} color="#15803D" />
              <span style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
                1. Facilidade de Aprender a Identidade
              </span>
            </div>
            <div style={{ fontSize: '10.5px', color: 'var(--text-muted)', lineHeight: 1.35 }}>
              Se uma camada profunda for inútil, empurrar os pesos para zero (<MathView math="f(\mathbf{x}) \to 0" />) é muito fácil. A rede preserva o desempenho sem piorar (degradação zero).
            </div>
          </div>

          <div style={{ background: '#FFFFFF', border: '1px solid var(--border-light)', borderRadius: '8px', padding: '9px 12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
              <CheckCircle2 size={14} color="#0284C7" />
              <span style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
                2. A "Supervia" de Gradiente (+1)
              </span>
            </div>
            <div style={{ fontSize: '10.5px', color: 'var(--text-muted)', lineHeight: 1.35 }}>
              Na derivada <MathView math="\frac{\partial h}{\partial \mathbf{x}} = \frac{\partial f}{\partial \mathbf{x}} + 1" />, o termo <MathView math="+1" /> garante que o gradiente sempre flui intacto até a primeira camada da rede!
            </div>
          </div>
        </div>

        {/* Bottom Takeaway */}
        <div style={{ background: '#EFF8FC', border: '1px solid #CDE6F5', borderRadius: '6px', padding: '8px 10px', fontSize: '11px', color: 'var(--infnet-dark-blue)' }}>
          🏆 <strong>Resultado Seminal:</strong> Permitiu que a ResNet treinasse redes de <strong>34, 50, 101 e até 152 camadas</strong> com erro de apenas 3.57% no ImageNet 2015.
        </div>
      </div>
    </div>
  );
}
