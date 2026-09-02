import React from 'react';
import { Layers } from 'lucide-react';

export default function TransformerRoadmapDiagram() {
  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      fontSize: '13px'
    }}>
      {/* Top Header Banner */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#EDF5FA',
        padding: '6px 16px',
        borderRadius: '8px',
        border: '1px solid #D0E3F0',
        flexShrink: 0
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
          <Layers size={18} color="var(--infnet-cyan)" />
          <span>A Macro-Arquitetura Completa do Transformer (Vaswani et al., 2017)</span>
        </div>
        <span style={{
          fontSize: '11px',
          background: '#FFFFFF',
          padding: '3px 12px',
          borderRadius: '12px',
          fontWeight: 600,
          color: 'var(--infnet-dark-blue)',
          border: '1px solid #CBD5E1'
        }}>
          Attention Is All You Need • NeurIPS 2017
        </span>
      </div>

      {/* Main Full-Size Architectural Diagram Card */}
      <div style={{
        flex: 1,
        background: '#FFFFFF',
        border: '1px solid var(--border-light)',
        borderRadius: '10px',
        padding: '8px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: 'var(--shadow-sm)',
        minHeight: 0
      }}>
        <svg
          viewBox="0 0 880 540"
          style={{
            width: '100%',
            height: '100%',
            maxHeight: '520px',
            display: 'block'
          }}
        >
          <defs>
            {/* Arrowhead Markers */}
            <marker id="transArrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#0A345D" />
            </marker>
            <marker id="crossArrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#0284C7" />
            </marker>
            <marker id="attnArrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#0A345D" />
            </marker>
          </defs>

          {/* ================================================================ */}
          {/* LEFT TOWER: ENCODER                                              */}
          {/* ================================================================ */}
          <g transform="translate(100, 20)">
            {/* Encoder Big Gray Outer Container (Nx) */}
            <rect
              x="20"
              y="110"
              width="240"
              height="280"
              rx="16"
              fill="#F8FAFC"
              stroke="#94A3B8"
              strokeWidth="2"
            />
            <text x="-5" y="255" fontSize="16" fontWeight="800" fill="#64748B" textAnchor="middle">N×</text>

            {/* Sub-layer 2: Feed Forward & Add & Norm */}
            <g transform="translate(45, 142)">
              {/* Add & Norm 2 */}
              <rect x="0" y="0" width="190" height="32" rx="6" fill="#FEF9C3" stroke="#CA8A04" strokeWidth="1.8" />
              <text x="95" y="21" fontSize="12.5" fontWeight="700" fill="#854D0E" textAnchor="middle">Add &amp; Norm</text>

              {/* Feed Forward */}
              <rect x="0" y="40" width="190" height="38" rx="6" fill="#BFDBFE" stroke="#2563EB" strokeWidth="1.8" />
              <text x="95" y="64" fontSize="13" fontWeight="700" fill="#1E40AF" textAnchor="middle">Feed Forward</text>

              {/* Internal arrow from Feed Forward to Add & Norm */}
              <path d="M 95 40 L 95 32" stroke="#0A345D" strokeWidth="1.8" markerEnd="url(#transArrow)" />
            </g>

            {/* Arrow connecting Layer 1 to Layer 2 */}
            <path d="M 140 256 L 140 220" stroke="#0A345D" strokeWidth="1.8" markerEnd="url(#transArrow)" />

            {/* Sub-layer 1: Multi-Head Attention & Add & Norm */}
            <g transform="translate(45, 256)">
              {/* Add & Norm 1 */}
              <rect x="0" y="0" width="190" height="32" rx="6" fill="#FEF9C3" stroke="#CA8A04" strokeWidth="1.8" />
              <text x="95" y="21" fontSize="12.5" fontWeight="700" fill="#854D0E" textAnchor="middle">Add &amp; Norm</text>

              {/* Multi-Head Attention */}
              <rect
                x="0"
                y="40"
                width="190"
                height="46"
                rx="6"
                fill="#FED7AA"
                stroke="#F97316"
                strokeWidth="1.8"
              />
              <text x="95" y="68" fontSize="13" fontWeight="700" fill="#9A3412" textAnchor="middle">
                Multi-Head Attention
              </text>

              {/* Three input arrows to Multi-Head Attention */}
              <path d="M 45 98 L 45 86" stroke="#0A345D" strokeWidth="1.8" markerEnd="url(#attnArrow)" />
              <path d="M 95 98 L 95 86" stroke="#0A345D" strokeWidth="1.8" markerEnd="url(#attnArrow)" />
              <path d="M 145 98 L 145 86" stroke="#0A345D" strokeWidth="1.8" markerEnd="url(#attnArrow)" />

              {/* Internal arrow from MHA to Add & Norm */}
              <path d="M 95 40 L 95 32" stroke="#0A345D" strokeWidth="1.8" markerEnd="url(#transArrow)" />
            </g>

            {/* Residual Connections for Encoder */}
            {/* Residual 1: Around MHA */}
            <path d="M 140 368 L 28 368 L 28 272 L 45 272" fill="none" stroke="#64748B" strokeWidth="1.8" strokeDasharray="4 3" markerEnd="url(#transArrow)" />
            {/* Residual 2: Around FFN */}
            <path d="M 140 236 L 28 236 L 28 158 L 45 158" fill="none" stroke="#64748B" strokeWidth="1.8" strokeDasharray="4 3" markerEnd="url(#transArrow)" />

            {/* Sum Circle (+) + Positional Encoding */}
            <g transform="translate(125, 404)">
              <circle cx="15" cy="15" r="14" fill="#FFFFFF" stroke="#0A345D" strokeWidth="2" />
              <text x="15" y="21" fontSize="18" fontWeight="800" fill="#0A345D" textAnchor="middle">+</text>

              {/* Positional Encoding Wave Circle */}
              <g transform="translate(-50, 0)">
                <circle cx="15" cy="15" r="16" fill="#F0F9FF" stroke="#0284C7" strokeWidth="2" />
                <path d="M 5 15 Q 10 7 15 15 T 25 15" fill="none" stroke="#0284C7" strokeWidth="2.5" />
                <text x="15" y="44" fontSize="10.5" fontWeight="700" fill="#0284C7" textAnchor="middle">Positional</text>
                <text x="15" y="56" fontSize="10.5" fontWeight="700" fill="#0284C7" textAnchor="middle">Encoding</text>
                <path d="M 31 15 L 48 15" stroke="#0284C7" strokeWidth="1.8" markerEnd="url(#transArrow)" />
              </g>

              <path d="M 15 0 L 15 -14" stroke="#0A345D" strokeWidth="1.8" markerEnd="url(#transArrow)" />
            </g>

            {/* Input Embedding Box */}
            <g transform="translate(45, 442)">
              <rect
                x="0"
                y="0"
                width="190"
                height="38"
                rx="6"
                fill="#FCE7F3"
                stroke="#DB2777"
                strokeWidth="1.8"
              />
              <text x="95" y="24" fontSize="13" fontWeight="700" fill="#9D174D" textAnchor="middle">
                Input Embedding
              </text>
              <path d="M 95 0 L 95 -10" stroke="#0A345D" strokeWidth="1.8" markerEnd="url(#transArrow)" />
            </g>

            {/* Inputs Text */}
            <g transform="translate(45, 498)">
              <text x="95" y="14" fontSize="13" fontWeight="700" fill="#0A345D" textAnchor="middle">
                Inputs
              </text>
              <path d="M 95 0 L 95 -18" stroke="#0A345D" strokeWidth="1.8" markerEnd="url(#transArrow)" />
            </g>
          </g>

          {/* ================================================================ */}
          {/* CROSS-CONNECTION FROM ENCODER TO DECODER                         */}
          {/* ================================================================ */}
          <path
            d="M 360 162 L 480 162 L 480 278 L 525 278"
            fill="none"
            stroke="#0284C7"
            strokeWidth="2.5"
            strokeDasharray="6 3"
            markerEnd="url(#crossArrow)"
          />
          {/* Cross-Attention Branch to Key & Value */}
          <path
            d="M 480 278 L 480 292 L 545 292 L 545 298"
            fill="none"
            stroke="#0284C7"
            strokeWidth="2"
            markerEnd="url(#crossArrow)"
          />
          <path
            d="M 480 278 L 480 292 L 575 292 L 575 298"
            fill="none"
            stroke="#0284C7"
            strokeWidth="2"
            markerEnd="url(#crossArrow)"
          />

          {/* ================================================================ */}
          {/* RIGHT TOWER: DECODER                                             */}
          {/* ================================================================ */}
          <g transform="translate(480, 20)">
            {/* Top Linear + Softmax + Output Probabilities */}
            <g transform="translate(45, 0)">
              {/* Output Probabilities Label */}
              <text x="95" y="10" fontSize="13" fontWeight="800" fill="#0A345D" textAnchor="middle">
                Output Probabilities
              </text>
              <path d="M 95 24 L 95 14" stroke="#0A345D" strokeWidth="1.8" markerEnd="url(#transArrow)" />

              {/* Softmax Box */}
              <rect x="25" y="24" width="140" height="26" rx="6" fill="#BBF7D0" stroke="#16A34A" strokeWidth="1.8" />
              <text x="95" y="42" fontSize="12" fontWeight="700" fill="#15803D" textAnchor="middle">Softmax</text>
              <path d="M 95 58 L 95 50" stroke="#0A345D" strokeWidth="1.8" markerEnd="url(#transArrow)" />

              {/* Linear Box */}
              <rect x="25" y="58" width="140" height="26" rx="6" fill="#DDD6FE" stroke="#7C3AED" strokeWidth="1.8" />
              <text x="95" y="76" fontSize="12" fontWeight="700" fill="#5B21B6" textAnchor="middle">Linear</text>
              <path d="M 95 110 L 95 84" stroke="#0A345D" strokeWidth="1.8" markerEnd="url(#transArrow)" />
            </g>

            {/* Decoder Big Gray Outer Container (Nx) */}
            <rect
              x="20"
              y="110"
              width="240"
              height="280"
              rx="16"
              fill="#F8FAFC"
              stroke="#94A3B8"
              strokeWidth="2"
            />
            <text x="275" y="255" fontSize="16" fontWeight="800" fill="#64748B" textAnchor="middle">N×</text>

            {/* Sub-layer 3: Feed Forward & Add & Norm */}
            <g transform="translate(45, 134)">
              <rect x="0" y="0" width="190" height="24" rx="5" fill="#FEF9C3" stroke="#CA8A04" strokeWidth="1.5" />
              <text x="95" y="16" fontSize="11" fontWeight="700" fill="#854D0E" textAnchor="middle">Add &amp; Norm</text>

              <rect x="0" y="28" width="190" height="28" rx="5" fill="#BFDBFE" stroke="#2563EB" strokeWidth="1.5" />
              <text x="95" y="47" fontSize="11.5" fontWeight="700" fill="#1E40AF" textAnchor="middle">Feed Forward</text>
              <path d="M 95 28 L 95 24" stroke="#0A345D" strokeWidth="1.5" markerEnd="url(#transArrow)" />
            </g>

            {/* Arrow connecting Cross-Attention to FFN */}
            <path d="M 140 216 L 140 190" stroke="#0A345D" strokeWidth="1.5" markerEnd="url(#transArrow)" />

            {/* Sub-layer 2: Multi-Head Attention (Cross Attention) */}
            <g transform="translate(45, 216)">
              <rect x="0" y="0" width="190" height="24" rx="5" fill="#FEF9C3" stroke="#CA8A04" strokeWidth="1.5" />
              <text x="95" y="16" fontSize="11" fontWeight="700" fill="#854D0E" textAnchor="middle">Add &amp; Norm</text>

              <rect x="0" y="28" width="190" height="30" rx="5" fill="#FED7AA" stroke="#F97316" strokeWidth="1.5" />
              <text x="95" y="48" fontSize="12" fontWeight="700" fill="#9A3412" textAnchor="middle">Multi-Head Attention</text>
              <path d="M 95 28 L 95 24" stroke="#0A345D" strokeWidth="1.5" markerEnd="url(#transArrow)" />
            </g>

            {/* Arrow connecting Masked MHA to Cross-Attention */}
            <path d="M 140 298 L 140 274" stroke="#0A345D" strokeWidth="1.5" markerEnd="url(#transArrow)" />

            {/* Sub-layer 1: Masked Multi-Head Attention */}
            <g transform="translate(45, 298)">
              <rect x="0" y="0" width="190" height="24" rx="5" fill="#FEF9C3" stroke="#CA8A04" strokeWidth="1.5" />
              <text x="95" y="16" fontSize="11" fontWeight="700" fill="#854D0E" textAnchor="middle">Add &amp; Norm</text>

              <rect x="0" y="28" width="190" height="32" rx="5" fill="#FED7AA" stroke="#F97316" strokeWidth="1.5" />
              <text x="95" y="49" fontSize="11.5" fontWeight="700" fill="#9A3412" textAnchor="middle">
                Masked Multi-Head Attention
              </text>

              {/* Three input arrows into Masked MHA */}
              <path d="M 45 68 L 45 60" stroke="#0A345D" strokeWidth="1.5" markerEnd="url(#transArrow)" />
              <path d="M 95 68 L 95 60" stroke="#0A345D" strokeWidth="1.5" markerEnd="url(#transArrow)" />
              <path d="M 145 68 L 145 60" stroke="#0A345D" strokeWidth="1.5" markerEnd="url(#transArrow)" />

              <path d="M 95 28 L 95 24" stroke="#0A345D" strokeWidth="1.5" markerEnd="url(#transArrow)" />
            </g>

            {/* Residual Connections for Decoder */}
            <path d="M 140 368 L 245 368 L 245 310 L 235 310" fill="none" stroke="#64748B" strokeWidth="1.5" strokeDasharray="3 2" markerEnd="url(#transArrow)" />
            <path d="M 140 286 L 245 286 L 245 228 L 235 228" fill="none" stroke="#64748B" strokeWidth="1.5" strokeDasharray="3 2" markerEnd="url(#transArrow)" />
            <path d="M 140 200 L 245 200 L 245 146 L 235 146" fill="none" stroke="#64748B" strokeWidth="1.5" strokeDasharray="3 2" markerEnd="url(#transArrow)" />

            {/* Sum Circle (+) + Positional Encoding */}
            <g transform="translate(125, 404)">
              <circle cx="15" cy="15" r="14" fill="#FFFFFF" stroke="#0A345D" strokeWidth="2" />
              <text x="15" y="21" fontSize="18" fontWeight="800" fill="#0A345D" textAnchor="middle">+</text>

              {/* Positional Wave Circle */}
              <g transform="translate(45, 0)">
                <circle cx="15" cy="15" r="16" fill="#F0F9FF" stroke="#0284C7" strokeWidth="2" />
                <path d="M 5 15 Q 10 7 15 15 T 25 15" fill="none" stroke="#0284C7" strokeWidth="2.5" />
                <text x="15" y="44" fontSize="10.5" fontWeight="700" fill="#0284C7" textAnchor="middle">Positional</text>
                <text x="15" y="56" fontSize="10.5" fontWeight="700" fill="#0284C7" textAnchor="middle">Encoding</text>
                <path d="M 0 15 L -16 15" stroke="#0284C7" strokeWidth="1.8" markerEnd="url(#transArrow)" />
              </g>

              <path d="M 15 0 L 15 -14" stroke="#0A345D" strokeWidth="1.8" markerEnd="url(#transArrow)" />
            </g>

            {/* Output Embedding Box */}
            <g transform="translate(45, 442)">
              <rect x="0" y="0" width="190" height="38" rx="6" fill="#FCE7F3" stroke="#DB2777" strokeWidth="1.8" />
              <text x="95" y="24" fontSize="13" fontWeight="700" fill="#9D174D" textAnchor="middle">
                Output Embedding
              </text>
              <path d="M 95 0 L 95 -10" stroke="#0A345D" strokeWidth="1.8" markerEnd="url(#transArrow)" />
            </g>

            {/* Outputs (shifted right) */}
            <g transform="translate(45, 498)">
              <text x="95" y="14" fontSize="12" fontWeight="700" fill="#0A345D" textAnchor="middle">
                Outputs (shifted right)
              </text>
              <path d="M 95 0 L 95 -18" stroke="#0A345D" strokeWidth="1.8" markerEnd="url(#transArrow)" />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}
