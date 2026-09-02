import React from 'react';
import { GitFork } from 'lucide-react';

export default function MultiHeadAttentionDiagram() {
  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      fontSize: '13px'
    }}>
      {/* Top Banner */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#EDF5FA',
        padding: '8px 18px',
        borderRadius: '8px',
        border: '1px solid #D0E3F0',
        flexShrink: 0
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
          <GitFork size={18} color="var(--infnet-cyan)" />
          <span>Arquitetura Multi-Head Attention: Divisão em h Cabeças e Projeção Linear WO</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            fontFamily: 'var(--font-code)',
            fontSize: '11px',
            background: '#0A345D',
            color: '#64D9EF',
            padding: '4px 12px',
            borderRadius: '12px',
            fontWeight: 700
          }}>
            d_k = d_model / h = 768 / 12 = 64
          </span>
          <span style={{
            fontFamily: 'var(--font-code)',
            fontSize: '11px',
            background: '#F0FDF4',
            color: '#15803D',
            border: '1px solid #BBF7D0',
            padding: '4px 12px',
            borderRadius: '12px',
            fontWeight: 700
          }}>
            Entrada [T, 768] ➔ Saída [T, 768]
          </span>
        </div>
      </div>

      {/* Main Diagram Canvas Container */}
      <div style={{
        flex: 1,
        background: '#FFFFFF',
        border: '1px solid var(--border-light)',
        borderRadius: '10px',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: 'var(--shadow-sm)',
        minHeight: 0,
        position: 'relative'
      }}>
        <svg
          viewBox="0 0 980 430"
          style={{ width: '100%', height: '100%', maxHeight: '420px' }}
        >
          <defs>
            {/* Arrow Markers */}
            <marker id="arrowCyan" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 8 5 L 0 9 z" fill="#0284C7" />
            </marker>
            <marker id="arrowDark" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 8 5 L 0 9 z" fill="#0A345D" />
            </marker>
            <marker id="arrowGreen" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 8 5 L 0 9 z" fill="#16A34A" />
            </marker>
            <marker id="arrowPurple" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 8 5 L 0 9 z" fill="#7C3AED" />
            </marker>

            {/* Linear Gradients */}
            <linearGradient id="gradInput" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0A345D" />
              <stop offset="100%" stopColor="#061F38" />
            </linearGradient>
            <linearGradient id="gradHead1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F0F9FF" />
              <stop offset="100%" stopColor="#E0F2FE" />
            </linearGradient>
            <linearGradient id="gradHead2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FAF5FF" />
              <stop offset="100%" stopColor="#F3E8FF" />
            </linearGradient>
            <linearGradient id="gradHeadH" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F0FDF4" />
              <stop offset="100%" stopColor="#DCFCE7" />
            </linearGradient>
          </defs>

          {/* ======================================================== */}
          {/* 1. INPUT TENSOR (X / V, K, Q) */}
          {/* ======================================================== */}
          <g transform="translate(20, 140)">
            <rect x="0" y="0" width="130" height="150" rx="10" fill="url(#gradInput)" stroke="#1BB5D8" strokeWidth="2.5" />
            
            <rect x="15" y="16" width="100" height="24" rx="5" fill="#1BB5D8" fillOpacity="0.2" />
            <text x="65" y="32" fontSize="13" fontWeight="800" fill="#64D9EF" textAnchor="middle">ENTRADA X</text>
            
            <text x="65" y="65" fontSize="16" fontWeight="800" fill="#FFFFFF" textAnchor="middle">V, K, Q</text>
            <text x="65" y="85" fontSize="11" fill="#94A3B8" textAnchor="middle">Tokens Embeddings</text>
            
            <rect x="15" y="105" width="100" height="26" rx="6" fill="#061F38" stroke="#334155" />
            <text x="65" y="122" fontSize="11" fontFamily="monospace" fontWeight="700" fill="#64D9EF" textAnchor="middle">[T × 768]</text>
          </g>

          {/* ======================================================== */}
          {/* 2. FORK PATHS & LINEAR PROJECTIONS */}
          {/* ======================================================== */}
          {/* Fork Arrow to Head 1 */}
          <path d="M 150 180 C 185 180, 195 75, 235 75" stroke="#0284C7" strokeWidth="2.5" fill="none" markerEnd="url(#arrowCyan)" />
          <g transform="translate(165, 100)">
            <rect x="0" y="0" width="60" height="20" rx="4" fill="#E0F2FE" stroke="#0284C7" />
            <text x="30" y="14" fontSize="9.5" fontWeight="700" fill="#0369A1" textAnchor="middle">W_Q,K,V (1)</text>
          </g>

          {/* Fork Arrow to Head 2 */}
          <path d="M 150 215 L 235 215" stroke="#7C3AED" strokeWidth="2.5" fill="none" markerEnd="url(#arrowPurple)" />
          <g transform="translate(165, 203)">
            <rect x="0" y="0" width="60" height="20" rx="4" fill="#F3E8FF" stroke="#7C3AED" />
            <text x="30" y="14" fontSize="9.5" fontWeight="700" fill="#6D28D9" textAnchor="middle">W_Q,K,V (2)</text>
          </g>

          {/* Fork Arrow to Head h */}
          <path d="M 150 250 C 185 250, 195 355, 235 355" stroke="#16A34A" strokeWidth="2.5" fill="none" markerEnd="url(#arrowGreen)" />
          <g transform="translate(165, 308)">
            <rect x="0" y="0" width="60" height="20" rx="4" fill="#DCFCE7" stroke="#16A34A" />
            <text x="30" y="14" fontSize="9.5" fontWeight="700" fill="#15803D" textAnchor="middle">W_Q,K,V (h)</text>
          </g>

          {/* ======================================================== */}
          {/* 3. PARALLEL ATTENTION HEADS */}
          {/* ======================================================== */}

          {/* --- HEAD 1 (Blue) --- */}
          <g transform="translate(245, 25)">
            <rect x="0" y="0" width="285" height="100" rx="8" fill="url(#gradHead1)" stroke="#0284C7" strokeWidth="2" />
            
            {/* Header Badge */}
            <rect x="10" y="10" width="115" height="22" rx="4" fill="#0284C7" />
            <text x="67" y="25" fontSize="11" fontWeight="700" fill="#FFFFFF" textAnchor="middle">Cabeça 1: Sintaxe</text>

            <rect x="195" y="10" width="80" height="22" rx="4" fill="#FFFFFF" stroke="#BAE6FD" />
            <text x="235" y="25" fontSize="10" fontFamily="monospace" fontWeight="700" fill="#0369A1" textAnchor="middle">d_k = 64</text>

            {/* Function / Flow */}
            <text x="142" y="55" fontSize="11.5" fontWeight="700" fill="#0A345D" textAnchor="middle">
              Attention(Q₁, K₁, V₁) = softmax(Q₁K₁ᵀ / √64) V₁
            </text>

            {/* Role & Dim */}
            <text x="12" y="80" fontSize="10.5" fill="#475569">Foco: Concordância gramatical</text>
            <text x="275" y="80" fontSize="11" fontFamily="monospace" fontWeight="700" fill="#0284C7" textAnchor="end">Saída: [T × 64]</text>
          </g>

          {/* --- HEAD 2 (Purple) --- */}
          <g transform="translate(245, 165)">
            <rect x="0" y="0" width="285" height="100" rx="8" fill="url(#gradHead2)" stroke="#7C3AED" strokeWidth="2" />
            
            {/* Header Badge */}
            <rect x="10" y="10" width="130" height="22" rx="4" fill="#7C3AED" />
            <text x="75" y="25" fontSize="11" fontWeight="700" fill="#FFFFFF" textAnchor="middle">Cabeça 2: Semântica</text>

            <rect x="195" y="10" width="80" height="22" rx="4" fill="#FFFFFF" stroke="#DDD6FE" />
            <text x="235" y="25" fontSize="10" fontFamily="monospace" fontWeight="700" fill="#6D28D9" textAnchor="middle">d_k = 64</text>

            {/* Function / Flow */}
            <text x="142" y="55" fontSize="11.5" fontWeight="700" fill="#0A345D" textAnchor="middle">
              Attention(Q₂, K₂, V₂) = softmax(Q₂K₂ᵀ / √64) V₂
            </text>

            {/* Role & Dim */}
            <text x="12" y="80" fontSize="10.5" fill="#475569">Foco: Conceitos e entidades centrais</text>
            <text x="275" y="80" fontSize="11" fontFamily="monospace" fontWeight="700" fill="#7C3AED" textAnchor="end">Saída: [T × 64]</text>
          </g>

          {/* Dots Indicator between heads */}
          <g transform="translate(380, 278)">
            <circle cx="0" cy="0" r="3.5" fill="#94A3B8" />
            <circle cx="0" cy="12" r="3.5" fill="#94A3B8" />
            <circle cx="0" cy="24" r="3.5" fill="#94A3B8" />
            <text x="14" y="16" fontSize="11" fontWeight="700" fill="#64748B">h = 12 cabeças paralelas</text>
          </g>

          {/* --- HEAD h (Green) --- */}
          <g transform="translate(245, 305)">
            <rect x="0" y="0" width="285" height="100" rx="8" fill="url(#gradHeadH)" stroke="#16A34A" strokeWidth="2" />
            
            {/* Header Badge */}
            <rect x="10" y="10" width="145" height="22" rx="4" fill="#16A34A" />
            <text x="82" y="25" fontSize="11" fontWeight="700" fill="#FFFFFF" textAnchor="middle">Cabeça h: Longo Alcance</text>

            <rect x="195" y="10" width="80" height="22" rx="4" fill="#FFFFFF" stroke="#BBF7D0" />
            <text x="235" y="25" fontSize="10" fontFamily="monospace" fontWeight="700" fill="#15803D" textAnchor="middle">d_k = 64</text>

            {/* Function / Flow */}
            <text x="142" y="55" fontSize="11.5" fontWeight="700" fill="#0A345D" textAnchor="middle">
              Attention(Qₕ, Kₕ, Vₕ) = softmax(QₕKₕᵀ / √64) Vₕ
            </text>

            {/* Role & Dim */}
            <text x="12" y="80" fontSize="10.5" fill="#475569">Foco: Relações distantes e repetições</text>
            <text x="275" y="80" fontSize="11" fontFamily="monospace" fontWeight="700" fill="#16A34A" textAnchor="end">Saída: [T × 64]</text>
          </g>

          {/* ======================================================== */}
          {/* 4. CONCATENATION BLOCK */}
          {/* ======================================================== */}
          {/* Join Arrow from Head 1 */}
          <path d="M 530 75 C 570 75, 580 180, 615 180" stroke="#0284C7" strokeWidth="2.5" fill="none" markerEnd="url(#arrowCyan)" />

          {/* Join Arrow from Head 2 */}
          <path d="M 530 215 L 615 215" stroke="#7C3AED" strokeWidth="2.5" fill="none" markerEnd="url(#arrowPurple)" />

          {/* Join Arrow from Head h */}
          <path d="M 530 355 C 570 355, 580 250, 615 250" stroke="#16A34A" strokeWidth="2.5" fill="none" markerEnd="url(#arrowGreen)" />

          {/* Concat Box */}
          <g transform="translate(625, 140)">
            <rect x="0" y="0" width="115" height="150" rx="10" fill="#F8FAFC" stroke="#0A345D" strokeWidth="2.5" />
            
            <rect x="12" y="14" width="91" height="24" rx="4" fill="#0A345D" />
            <text x="57" y="30" fontSize="12" fontWeight="800" fill="#FFFFFF" textAnchor="middle">CONCAT</text>

            <text x="57" y="65" fontSize="11" fontWeight="700" fill="#0A345D" textAnchor="middle">[head₁, ..., head₁₂]</text>
            <text x="57" y="82" fontSize="9.5" fill="#64748B" textAnchor="middle">12 × 64 dim</text>

            <rect x="10" y="105" width="95" height="26" rx="6" fill="#EDF5FA" stroke="#CBD5E1" />
            <text x="57" y="122" fontSize="11" fontFamily="monospace" fontWeight="800" fill="#0284C7" textAnchor="middle">[T × 768]</text>
          </g>

          {/* Arrow to WO */}
          <path d="M 740 215 L 770 215" stroke="#0A345D" strokeWidth="3" fill="none" markerEnd="url(#arrowDark)" />

          {/* ======================================================== */}
          {/* 5. LINEAR PROJECTION WO */}
          {/* ======================================================== */}
          <g transform="translate(780, 140)">
            <rect x="0" y="0" width="85" height="150" rx="10" fill="#0A345D" stroke="#7CB342" strokeWidth="2.5" />
            
            <rect x="10" y="14" width="65" height="24" rx="4" fill="#7CB342" />
            <text x="42" y="30" fontSize="12" fontWeight="800" fill="#FFFFFF" textAnchor="middle">W_O</text>

            <text x="42" y="65" fontSize="11" fontWeight="700" fill="#7CB342" textAnchor="middle">Projeção</text>
            <text x="42" y="80" fontSize="10" fill="#94A3B8" textAnchor="middle">Linear</text>

            <rect x="8" y="105" width="69" height="26" rx="6" fill="#061F38" stroke="#334155" />
            <text x="42" y="122" fontSize="9.5" fontFamily="monospace" fontWeight="700" fill="#64D9EF" textAnchor="middle">[768, 768]</text>
          </g>

          {/* Arrow to Output */}
          <path d="M 865 215 L 890 215" stroke="#16A34A" strokeWidth="3" fill="none" markerEnd="url(#arrowGreen)" />

          {/* ======================================================== */}
          {/* 6. FINAL OUTPUT TENSOR */}
          {/* ======================================================== */}
          <g transform="translate(900, 155)">
            <rect x="0" y="0" width="65" height="120" rx="8" fill="#F0FDF4" stroke="#16A34A" strokeWidth="2.5" />
            <text x="32" y="30" fontSize="11" fontWeight="800" fill="#15803D" textAnchor="middle">SAÍDA</text>
            <text x="32" y="48" fontSize="9" fill="#166534" textAnchor="middle">Multi-Head</text>
            
            <rect x="6" y="75" width="53" height="30" rx="5" fill="#FFFFFF" stroke="#BBF7D0" />
            <text x="32" y="94" fontSize="10" fontFamily="monospace" fontWeight="800" fill="#15803D" textAnchor="middle">[T, 768]</text>
          </g>

          {/* ======================================================== */}
          {/* BOTTOM GLOBAL FORMULA */}
          {/* ======================================================== */}
          <g transform="translate(180, 416)">
            <text x="310" y="0" fontSize="11.5" fontWeight="600" fill="#64748B" textAnchor="middle">
              MultiHead(Q, K, V) = Concat(head₁, head₂, ..., head_h) · W_O
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
}
