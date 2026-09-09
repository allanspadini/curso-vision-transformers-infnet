import React, { useState } from 'react';
import { getAssetPath } from '../../utils/assetHelper';

export default function BertHanddrawnStyleArchitectureDiagram() {
  const [activeStage, setActiveStage] = useState('all'); // 'embedding', 'positional', 'attention', 'context', 'output'

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {/* Interactive Stage Selector */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#F8FAFC',
        border: '1px solid #E2E8F0',
        borderRadius: '8px',
        padding: '6px 14px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
            Destaque Arquitetural:
          </span>
          {[
            { id: 'all', label: 'Visão Completa' },
            { id: 'embedding', label: '1. Word Embeddings' },
            { id: 'positional', label: '2. Positional Encoding (+)' },
            { id: 'attention', label: '3. Self-Attention (Q, K, V)' },
            { id: 'context', label: '4. Context Aware Embeddings' },
            { id: 'output', label: '5. Cabeça de Classificação (Yes/No)' }
          ].map((st) => (
            <button
              key={st.id}
              onClick={() => setActiveStage(st.id)}
              style={{
                padding: '4px 10px',
                borderRadius: '6px',
                border: activeStage === st.id ? '2px solid var(--infnet-cyan)' : '1px solid #CBD5E1',
                background: activeStage === st.id ? '#E0F2FE' : '#FFFFFF',
                color: activeStage === st.id ? 'var(--infnet-dark-blue)' : '#475569',
                fontSize: '11px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {st.label}
            </button>
          ))}
        </div>
        <div style={{ fontSize: '11.5px', color: '#64748B' }}>
          Arquitetura Didática Modular: <strong>Tokens ➔ Q,V,K ➔ Classificação</strong>
        </div>
      </div>

      {/* Main Diagram Area: Left SVG Architecture Diagram + Right Reference & Tensor Card */}
      <div style={{
        flex: 1,
        minHeight: 0,
        display: 'grid',
        gridTemplateColumns: '1.2fr 0.8fr',
        gap: '12px'
      }}>
        {/* Left Side: Modern Crisp SVG Recreating the StatQuest Flow */}
        <div style={{
          background: '#FFF8F8',
          border: '2px solid #FBCFE8',
          borderRadius: '12px',
          padding: '12px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <svg viewBox="0 0 540 500" style={{ width: '100%', height: '100%', maxHeight: '460px' }}>
            <defs>
              <marker id="pink-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 8 5 L 0 9 z" fill="#E11D48" />
              </marker>
              <marker id="cyan-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 8 5 L 0 9 z" fill="#0284C7" />
              </marker>
              <marker id="green-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 8 5 L 0 9 z" fill="#16A34A" />
              </marker>
            </defs>

            {/* ========================================================
                TOP: TASK CLASSIFIER / SIGMOID GRAPH (YES / NO)
                ======================================================== */}
            <g opacity={activeStage === 'all' || activeStage === 'output' ? 1 : 0.35}>
              {/* Graph Frame Box */}
              <rect x="70" y="15" width="200" height="95" rx="8" fill="#FFFFFF" stroke="#334155" strokeWidth="2.5" />
              {/* Axes */}
              <line x1="110" y1="25" x2="110" y2="95" stroke="#334155" strokeWidth="2.5" />
              <line x1="110" y1="95" x2="255" y2="95" stroke="#334155" strokeWidth="2.5" />
              {/* Labels */}
              <text x="80" y="42" fill="#1E293B" fontSize="13" fontWeight="bold">Yes</text>
              <text x="80" y="92" fill="#1E293B" fontSize="13" fontWeight="bold">No</text>
              {/* Sigmoid Green Curve */}
              <path
                d="M 112 92 C 150 92 170 85 190 60 C 210 35 230 30 252 28"
                fill="none"
                stroke="#16A34A"
                strokeWidth="4"
                strokeLinecap="round"
              />
              {/* Red Cross on Curve */}
              <g transform="translate(195, 55)">
                <line x1="-8" y1="-8" x2="8" y2="8" stroke="#DC2626" strokeWidth="4.5" strokeLinecap="round" />
                <line x1="8" y1="-8" x2="-8" y2="8" stroke="#DC2626" strokeWidth="4.5" strokeLinecap="round" />
              </g>
              {/* Magenta annotation pointing to head */}
              <path d="M 430 45 L 280 52" fill="none" stroke="#E11D48" strokeWidth="2.5" markerEnd="url(#pink-arrow)" />
              <text x="435" y="48" fill="#BE123C" fontSize="13" fontWeight="bold">
                Cabeça de Classificação (Ex: Sentimento)
              </text>
              <text x="435" y="66" fill="#64748B" fontSize="10.5">
                Pluga-se no topo dos embeddings!
              </text>
            </g>

            {/* Magenta arrows connecting Context Aware Embeddings to Graph */}
            <g opacity={activeStage === 'all' || activeStage === 'output' ? 1 : 0.35}>
              <line x1="140" y1="130" x2="140" y2="118" stroke="#E11D48" strokeWidth="2.5" markerEnd="url(#pink-arrow)" />
              <line x1="200" y1="130" x2="200" y2="118" stroke="#E11D48" strokeWidth="2.5" markerEnd="url(#pink-arrow)" />
            </g>

            {/* ========================================================
                CONTEXT AWARE EMBEDDINGS (VECTORS)
                ======================================================== */}
            <g opacity={activeStage === 'all' || activeStage === 'context' ? 1 : 0.35}>
              <rect x="110" y="132" width="60" height="22" rx="4" fill="#FFFFFF" stroke="#334155" strokeWidth="2" />
              <rect x="180" y="132" width="60" height="22" rx="4" fill="#FFFFFF" stroke="#334155" strokeWidth="2" />
              
              {/* Magenta Arrow Annotation */}
              <path d="M 370 143 L 250 143" fill="none" stroke="#E11D48" strokeWidth="2" markerEnd="url(#pink-arrow)" />
              <text x="375" y="147" fill="#BE123C" fontSize="13" fontWeight="bold">
                Context Aware Embeddings
              </text>
              <text x="375" y="162" fill="#64748B" fontSize="10.5">
                Embeddings enriquecidos com atenção global
              </text>
            </g>

            {/* Arrows from Self-Attention to Context Embeddings */}
            <g opacity={activeStage === 'all' || activeStage === 'context' || activeStage === 'attention' ? 1 : 0.35}>
              <line x1="140" y1="185" x2="140" y2="162" stroke="#E11D48" strokeWidth="2" markerEnd="url(#pink-arrow)" />
              <line x1="200" y1="185" x2="200" y2="162" stroke="#E11D48" strokeWidth="2" markerEnd="url(#pink-arrow)" />
            </g>

            {/* ========================================================
                SELF-ATTENTION BLOCK (GREEN BOX WITH Q, V, K)
                ======================================================== */}
            <g opacity={activeStage === 'all' || activeStage === 'attention' ? 1 : 0.35}>
              <rect x="90" y="185" width="170" height="70" rx="12" fill="#F0FDF4" stroke="#16A34A" strokeWidth="3" />
              {/* Q, V, K Text inside */}
              <text x="118" y="222" fill="#1E293B" fontSize="22" fontWeight="bold" fontFamily="serif">Q</text>
              <text x="175" y="220" fill="#16A34A" fontSize="26" fontWeight="bold" fontFamily="serif">V</text>
              <text x="230" y="222" fill="#BE123C" fontSize="22" fontWeight="bold" fontFamily="serif">K</text>
              {/* Branch Lines under Q, V, K meeting at stem */}
              <path d="M 125 228 L 125 240 L 235 240 L 235 228" fill="none" stroke="#1E293B" strokeWidth="2" />
              <line x1="175" y1="228" x2="175" y2="248" stroke="#16A34A" strokeWidth="2.5" />

              {/* Magenta Arrow Annotation */}
              <path d="M 370 220 L 270 220" fill="none" stroke="#E11D48" strokeWidth="2" markerEnd="url(#pink-arrow)" />
              <text x="375" y="224" fill="#BE123C" fontSize="14" fontWeight="bold">
                Self-Attention (Q, K, V)
              </text>
              <text x="375" y="240" fill="#166534" fontSize="10.5">
                Multi-Head Dot-Product Attention
              </text>
            </g>

            {/* Arrows from Positional/Linear to Self-Attention */}
            <g opacity={activeStage === 'all' || activeStage === 'attention' || activeStage === 'positional' ? 1 : 0.35}>
              <line x1="140" y1="285" x2="140" y2="262" stroke="#16A34A" strokeWidth="2" markerEnd="url(#green-arrow)" />
              <line x1="200" y1="285" x2="200" y2="262" stroke="#16A34A" strokeWidth="2" markerEnd="url(#green-arrow)" />
            </g>

            {/* Intermediate Vector Boxes */}
            <g opacity={activeStage === 'all' || activeStage === 'positional' ? 1 : 0.35}>
              <rect x="110" y="287" width="60" height="20" rx="3" fill="#FFFFFF" stroke="#334155" strokeWidth="1.8" />
              <rect x="180" y="287" width="60" height="20" rx="3" fill="#FFFFFF" stroke="#334155" strokeWidth="1.8" />
            </g>

            {/* Arrows with [+] addition */}
            <g opacity={activeStage === 'all' || activeStage === 'positional' ? 1 : 0.35}>
              {/* First token addition */}
              <line x1="140" y1="340" x2="140" y2="313" stroke="#EA580C" strokeWidth="2" markerEnd="url(#arrow-orange)" />
              <circle cx="140" cy="326" r="8" fill="#FFFFFF" stroke="#1E293B" strokeWidth="1.8" />
              <text x="140" y="330" textAnchor="middle" fill="#1E293B" fontSize="13" fontWeight="bold">+</text>

              {/* Sine Wave Box for Positional Encoding */}
              <rect x="75" y="315" width="26" height="24" rx="4" fill="#DCFCE7" stroke="#16A34A" strokeWidth="2" />
              <path d="M 78 327 Q 84 319 91 327 T 100 327" fill="none" stroke="#16A34A" strokeWidth="2" />
              <line x1="103" y1="327" x2="130" y2="327" stroke="#16A34A" strokeWidth="2" markerEnd="url(#green-arrow)" />

              {/* Second token addition */}
              <line x1="200" y1="340" x2="200" y2="313" stroke="#EA580C" strokeWidth="2" markerEnd="url(#arrow-orange)" />
              <circle cx="200" cy="326" r="8" fill="#FFFFFF" stroke="#1E293B" strokeWidth="1.8" />
              <text x="200" y="330" textAnchor="middle" fill="#1E293B" fontSize="13" fontWeight="bold">+</text>

              {/* Bell Curve Box for Positional Encoding */}
              <rect x="235" y="315" width="26" height="24" rx="4" fill="#FFEDD5" stroke="#EA580C" strokeWidth="2" />
              <path d="M 238 333 Q 248 318 258 333" fill="none" stroke="#EA580C" strokeWidth="2" />
              <line x1="233" y1="327" x2="210" y2="327" stroke="#EA580C" strokeWidth="2" markerEnd="url(#arrow-orange)" />

              {/* Magenta Arrow Annotation for Positional Encoding */}
              <path d="M 370 327 L 270 327" fill="none" stroke="#E11D48" strokeWidth="2" markerEnd="url(#pink-arrow)" />
              <text x="375" y="331" fill="#BE123C" fontSize="13" fontWeight="bold">
                Positional Encoding
              </text>
              <text x="375" y="347" fill="#64748B" fontSize="10.5">
                Injeção de ordem sequencial no espaço latente
              </text>
            </g>

            {/* ========================================================
                LINEAR PROJECTION LAYER (DIAGONAL BOXES [/])
                ======================================================== */}
            <g opacity={activeStage === 'all' || activeStage === 'embedding' ? 1 : 0.35}>
              <rect x="125" y="343" width="30" height="24" rx="3" fill="#FFF7ED" stroke="#EA580C" strokeWidth="2" />
              <line x1="128" y1="363" x2="152" y2="347" stroke="#1E293B" strokeWidth="2.5" />

              <rect x="185" y="343" width="30" height="24" rx="3" fill="#FFF7ED" stroke="#EA580C" strokeWidth="2" />
              <line x1="188" y1="363" x2="212" y2="347" stroke="#1E293B" strokeWidth="2.5" />

              {/* Dense connections from Word Tokens to Projection */}
              <path d="M 70 410 L 135 372" stroke="#0284C7" strokeWidth="1.2" opacity="0.6" />
              <path d="M 120 410 L 138 372" stroke="#16A34A" strokeWidth="1.2" opacity="0.6" />
              <path d="M 170 410 L 145 372" stroke="#DC2626" strokeWidth="1.2" opacity="0.6" />

              <path d="M 170 410 L 195 372" stroke="#DC2626" strokeWidth="1.2" opacity="0.6" />
              <path d="M 220 410 L 202 372" stroke="#EA580C" strokeWidth="1.2" opacity="0.6" />
              <path d="M 270 410 L 208 372" stroke="#64748B" strokeWidth="1.2" opacity="0.6" />
            </g>

            {/* ========================================================
                BOTTOM: WORD TOKENS & WORD EMBEDDING BOXES
                ======================================================== */}
            <g opacity={activeStage === 'all' || activeStage === 'embedding' ? 1 : 0.35}>
              {/* Token Boxes */}
              <rect x="60" y="415" width="28" height="22" rx="3" fill="#FFFFFF" stroke="#0284C7" strokeWidth="2" />
              <rect x="105" y="415" width="28" height="22" rx="3" fill="#FFFFFF" stroke="#16A34A" strokeWidth="2" />
              <rect x="155" y="415" width="28" height="22" rx="3" fill="#FFFFFF" stroke="#DC2626" strokeWidth="2" />
              <rect x="205" y="415" width="28" height="22" rx="3" fill="#FFFFFF" stroke="#EA580C" strokeWidth="2" />
              <rect x="255" y="415" width="28" height="22" rx="3" fill="#FFFFFF" stroke="#64748B" strokeWidth="2" />

              {/* Words below tokens */}
              <text x="74" y="455" textAnchor="middle" fill="#1E293B" fontSize="12" fontWeight="600" transform="rotate(-25 74 455)">Pizza</text>
              <text x="119" y="455" textAnchor="middle" fill="#1E293B" fontSize="12" fontWeight="600" transform="rotate(-25 119 455)">is</text>
              <text x="169" y="455" textAnchor="middle" fill="#1E293B" fontSize="12" fontWeight="600" transform="rotate(-25 169 455)">awesome</text>
              <text x="219" y="455" textAnchor="middle" fill="#1E293B" fontSize="12" fontWeight="600" transform="rotate(-25 219 455)">great</text>
              <text x="269" y="455" textAnchor="middle" fill="#1E293B" fontSize="12" fontWeight="600" transform="rotate(-25 269 455)">&lt;EOS&gt;</text>

              {/* Magenta Arrow Annotation for Word Embedding */}
              <path d="M 370 426 L 290 426" fill="none" stroke="#E11D48" strokeWidth="2" markerEnd="url(#pink-arrow)" />
              <text x="375" y="430" fill="#BE123C" fontSize="14" fontWeight="bold">
                Word Embedding
              </text>
              <text x="375" y="446" fill="#64748B" fontSize="10.5">
                Mapeia palavras para vetores densos contínuos
              </text>
            </g>
          </svg>
        </div>

        {/* Right Side: Detailed Engineering Explanation & Reference Comparison */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '8px'
        }}>
          {/* Card 1: Original Sketch Reference */}
          <div style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '10px',
            padding: '10px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <img
              src={getAssetPath('bert_statquest_architecture.png')}
              alt="Diagrama Didático StatQuest"
              style={{
                width: '78px',
                height: '110px',
                objectFit: 'contain',
                borderRadius: '6px',
                border: '1px solid #E2E8F0',
                background: '#FFF'
              }}
            />
            <div style={{ flex: 1, fontSize: '11px', color: '#475569' }}>
              <strong style={{ color: 'var(--infnet-dark-blue)', display: 'block', fontSize: '12px' }}>
                O Diagrama Mental Canônico
              </strong>
              Mostra a essência do Encoder: uma pilha vertical onde a entrada é contextualizada por <em>Self-Attention</em> e o topo conecta-se a <strong>qualquer função de perda</strong> (Sigmoid, Softmax, Regressão linear).
            </div>
          </div>

          {/* Card 2: Tensor Dimensions & Mathematics */}
          <div style={{
            background: '#F0F9FF',
            border: '1px solid #BAE6FD',
            borderRadius: '10px',
            padding: '10px 12px',
            fontSize: '11px',
            color: '#0369A1'
          }}>
            <strong style={{ display: 'block', marginBottom: '4px', fontSize: '12px', color: 'var(--infnet-dark-blue)' }}>
              Tensores ao Longo da Pilha (BERT-Base):
            </strong>
            <ul style={{ margin: 0, paddingLeft: '16px', lineHeight: 1.5 }}>
              <li><strong>Entrada de Tokens:</strong> <code style={{ fontFamily: 'var(--font-code)' }}>[B, L]</code> inteiros de 0 a 30.521.</li>
              <li><strong>Embeddings + Posição:</strong> <code style={{ fontFamily: 'var(--font-code)' }}>[B, L, 768]</code>.</li>
              <li><strong>Projeções Q, K, V:</strong> <code style={{ fontFamily: 'var(--font-code)' }}>[B, h=12, L, d_k=64]</code>.</li>
              <li><strong>Context Aware (H):</strong> <code style={{ fontFamily: 'var(--font-code)' }}>[B, L, 768]</code> em todas as 12 camadas.</li>
              <li><strong>Saída da Cabeça:</strong> <code style={{ fontFamily: 'var(--font-code)' }}>[B, K]</code> logits de classificação.</li>
            </ul>
          </div>

          {/* Card 3: Modular Engineering Key Insight */}
          <div style={{
            background: '#FDF2F8',
            border: '1px solid #FBCFE8',
            borderRadius: '10px',
            padding: '10px 12px',
            fontSize: '11px',
            color: '#9D174D'
          }}>
            <strong style={{ display: 'block', marginBottom: '2px', fontSize: '12px', color: '#BE123C' }}>
              🔌 O Segredo: A Saída é Totalmente Desacoplada!
            </strong>
            O corpo do BERT aprende a semântica da linguagem. A cabeça de saída no topo (o gráfico Yes/No) é apenas uma pequena camada linear substituível!
          </div>
        </div>
      </div>
    </div>
  );
}
