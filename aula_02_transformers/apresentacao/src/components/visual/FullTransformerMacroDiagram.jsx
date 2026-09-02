import React from 'react';
import { Layers } from 'lucide-react';

export default function FullTransformerMacroDiagram() {
  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      fontSize: '13px'
    }}>
      {/* Top Banner */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#EDF5FA',
        padding: '6px 18px',
        borderRadius: '8px',
        border: '1px solid #D0E3F0',
        flexShrink: 0
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
          <Layers size={18} color="var(--infnet-cyan)" />
          <span>Macro-Arquitetura Completa de Ponta a Ponta: Fluxo de Execução e Treinamento</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            fontFamily: 'var(--font-code)',
            fontSize: '11px',
            background: 'var(--infnet-dark-blue)',
            color: 'var(--infnet-cyan-light)',
            padding: '3px 10px',
            borderRadius: '12px',
            fontWeight: 700
          }}>
            Seq2Seq Encoder-Decoder
          </span>
          <span style={{
            fontFamily: 'var(--font-code)',
            fontSize: '11px',
            background: '#F0FDF4',
            color: '#15803D',
            border: '1px solid #BBF7D0',
            padding: '3px 10px',
            borderRadius: '12px',
            fontWeight: 700
          }}>
            Supervised Training Loop
          </span>
        </div>
      </div>

      {/* Main Diagram Canvas */}
      <div style={{
        flex: 1,
        background: '#FFFFFF',
        border: '1px solid var(--border-light)',
        borderRadius: '10px',
        padding: '8px 12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: 'var(--shadow-sm)',
        minHeight: 0,
        position: 'relative'
      }}>
        <svg
          viewBox="0 0 960 515"
          style={{ width: '100%', height: '100%', maxHeight: '440px' }}
        >
          <defs>
            {/* Arrow Markers */}
            <marker
              id="arrowCyan"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 7 5 L 0 8.5 z" fill="#0284C7" />
            </marker>

            <marker
              id="arrowOrange"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 7 5 L 0 8.5 z" fill="#FF7043" />
            </marker>

            <marker
              id="arrowGreen"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 7 5 L 0 8.5 z" fill="#15803D" />
            </marker>

            {/* Linear Gradients matching Infnet Brand */}
            <linearGradient id="gradEncoder" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0A345D" />
              <stop offset="100%" stopColor="#061F38" />
            </linearGradient>

            <linearGradient id="gradDecoder" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4C1D95" />
              <stop offset="100%" stopColor="#2E1065" />
            </linearGradient>

            <linearGradient id="gradLinear" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF7043" />
              <stop offset="100%" stopColor="#EA580C" />
            </linearGradient>

            <linearGradient id="gradSoftmax" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0284C7" />
              <stop offset="100%" stopColor="#0369A1" />
            </linearGradient>

            <linearGradient id="gradLoss" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0A345D" />
              <stop offset="100%" stopColor="#061F38" />
            </linearGradient>
          </defs>

          {/* ======================================================== */}
          {/* TOP RIGHT: TARGET TEXT & CROSS ENTROPY LOSS */}
          {/* ======================================================== */}
          {/* Target Text Badge */}
          <g transform="translate(710, 8)">
            <rect
              x="0"
              y="0"
              width="190"
              height="28"
              rx="6"
              fill="#F0FDF4"
              stroke="#86EFAC"
              strokeWidth="1.5"
            />
            <text
              x="95"
              y="18"
              fontSize="12.5"
              fontWeight="700"
              fill="#15803D"
              textAnchor="middle"
              fontFamily="var(--font-code), monospace"
            >
              Te amo muito &lt;EOS&gt;
            </text>
          </g>

          {/* Arrow Target -> Loss */}
          <path
            d="M 805 38 L 805 58"
            stroke="#15803D"
            strokeWidth="2"
            fill="none"
            markerEnd="url(#arrowGreen)"
          />

          {/* Cross Entropy Loss Box */}
          <g transform="translate(710, 64)">
            <rect
              x="0"
              y="0"
              width="190"
              height="50"
              rx="8"
              fill="url(#gradLoss)"
              stroke="#7CB342"
              strokeWidth="2"
              filter="drop-shadow(0 3px 6px rgba(10,52,93,0.2))"
            />
            <text
              x="95"
              y="31"
              fontSize="13.5"
              fontWeight="700"
              fill="#FFFFFF"
              textAnchor="middle"
            >
              Cross Entropy Loss
            </text>
          </g>

          {/* ======================================================== */}
          {/* DECODER UPPER LAYERS (Softmax, Linear) */}
          {/* ======================================================== */}

          {/* Softmax Box */}
          <g transform="translate(500, 64)">
            <rect
              x="0"
              y="0"
              width="160"
              height="50"
              rx="8"
              fill="url(#gradSoftmax)"
              stroke="#64D9EF"
              strokeWidth="1.5"
              filter="drop-shadow(0 3px 5px rgba(2,132,199,0.2))"
            />
            <text
              x="80"
              y="31"
              fontSize="14"
              fontWeight="700"
              fill="#FFFFFF"
              textAnchor="middle"
            >
              Softmax
            </text>
          </g>

          {/* Arrow Softmax -> Cross Entropy Loss */}
          <path
            d="M 662 89 L 702 89"
            stroke="#0284C7"
            strokeWidth="2"
            fill="none"
            markerEnd="url(#arrowCyan)"
          />

          {/* Arrow Linear -> Softmax */}
          <path
            d="M 580 142 L 580 120"
            stroke="#FF7043"
            strokeWidth="2"
            fill="none"
            markerEnd="url(#arrowOrange)"
          />

          {/* Linear Box (LM Head) */}
          <g transform="translate(500, 146)">
            <rect
              x="0"
              y="0"
              width="160"
              height="50"
              rx="8"
              fill="url(#gradLinear)"
              stroke="#FED7AA"
              strokeWidth="1.5"
              filter="drop-shadow(0 3px 5px rgba(255,112,67,0.2))"
            />
            <text
              x="80"
              y="31"
              fontSize="14"
              fontWeight="700"
              fill="#FFFFFF"
              textAnchor="middle"
            >
              Linear
            </text>
          </g>

          {/* Arrow Decoder Output -> Linear */}
          <path
            d="M 580 224 L 580 202"
            stroke="#FF7043"
            strokeWidth="2"
            fill="none"
            markerEnd="url(#arrowOrange)"
          />

          {/* ======================================================== */}
          {/* DECODER BRANCH (Decoder Output, Decoder, Decoder Input) */}
          {/* ======================================================== */}

          {/* Decoder Output Box */}
          <g transform="translate(520, 228)">
            <rect
              x="0"
              y="0"
              width="120"
              height="50"
              rx="8"
              fill="url(#gradDecoder)"
              stroke="#A78BFA"
              strokeWidth="1.5"
              filter="drop-shadow(0 3px 5px rgba(76,29,149,0.15))"
            />
            <text
              x="60"
              y="23"
              fontSize="12.5"
              fontWeight="700"
              fill="#FFFFFF"
              textAnchor="middle"
            >
              Decoder
            </text>
            <text
              x="60"
              y="39"
              fontSize="12.5"
              fontWeight="700"
              fill="#C4B5FD"
              textAnchor="middle"
            >
              Output
            </text>
          </g>

          {/* Arrow Decoder -> Decoder Output */}
          <path
            d="M 580 304 L 580 284"
            stroke="#0284C7"
            strokeWidth="2"
            fill="none"
            markerEnd="url(#arrowCyan)"
          />

          {/* Decoder Box (Larger Stack Block) */}
          <g transform="translate(490, 308)">
            <rect
              x="0"
              y="0"
              width="180"
              height="58"
              rx="8"
              fill="url(#gradDecoder)"
              stroke="#C084FC"
              strokeWidth="2"
              filter="drop-shadow(0 4px 8px rgba(76,29,149,0.2))"
            />
            <text
              x="90"
              y="35"
              fontSize="15"
              fontWeight="800"
              fill="#FFFFFF"
              textAnchor="middle"
            >
              Decoder
            </text>
          </g>

          {/* Arrow Decoder Input -> Decoder */}
          <path
            d="M 580 388 L 580 372"
            stroke="#0284C7"
            strokeWidth="2"
            fill="none"
            markerEnd="url(#arrowCyan)"
          />

          {/* Decoder Input Box */}
          <g transform="translate(520, 392)">
            <rect
              x="0"
              y="0"
              width="120"
              height="50"
              rx="8"
              fill="url(#gradDecoder)"
              stroke="#A78BFA"
              strokeWidth="1.5"
              filter="drop-shadow(0 3px 5px rgba(76,29,149,0.15))"
            />
            <text
              x="60"
              y="23"
              fontSize="12.5"
              fontWeight="700"
              fill="#FFFFFF"
              textAnchor="middle"
            >
              Decoder
            </text>
            <text
              x="60"
              y="39"
              fontSize="12.5"
              fontWeight="700"
              fill="#C4B5FD"
              textAnchor="middle"
            >
              Input
            </text>
          </g>

          {/* Arrow Bottom Input -> Decoder Input */}
          <path
            d="M 580 468 L 580 448"
            stroke="#0284C7"
            strokeWidth="2"
            fill="none"
            markerEnd="url(#arrowCyan)"
          />

          {/* ======================================================== */}
          {/* ENCODER BRANCH (Encoder Output, Encoder, Encoder Input) */}
          {/* ======================================================== */}

          {/* Encoder Output Box */}
          <g transform="translate(190, 228)">
            <rect
              x="0"
              y="0"
              width="120"
              height="50"
              rx="8"
              fill="url(#gradEncoder)"
              stroke="#1BB5D8"
              strokeWidth="1.5"
              filter="drop-shadow(0 3px 5px rgba(10,52,93,0.2))"
            />
            <text
              x="60"
              y="23"
              fontSize="12.5"
              fontWeight="700"
              fill="#FFFFFF"
              textAnchor="middle"
            >
              Encoder
            </text>
            <text
              x="60"
              y="39"
              fontSize="12.5"
              fontWeight="700"
              fill="#64D9EF"
              textAnchor="middle"
            >
              Output
            </text>
          </g>

          {/* Cross-Attention Link: Encoder Output -> Decoder */}
          <path
            d="M 312 253 L 400 253 L 400 337 L 482 337"
            stroke="#FF7043"
            strokeWidth="2.4"
            fill="none"
            markerEnd="url(#arrowOrange)"
          />
          <g transform="translate(330, 285)">
            <rect x="0" y="0" width="86" height="20" rx="4" fill="#FFF7ED" stroke="#FF7043" />
            <text x="43" y="14" fontSize="9.5" fontWeight="700" fill="#EA580C" textAnchor="middle">
              Cross-Attn (K, V)
            </text>
          </g>

          {/* Arrow Encoder -> Encoder Output */}
          <path
            d="M 250 304 L 250 284"
            stroke="#0284C7"
            strokeWidth="2"
            fill="none"
            markerEnd="url(#arrowCyan)"
          />

          {/* Encoder Box (Larger Stack Block) */}
          <g transform="translate(160, 308)">
            <rect
              x="0"
              y="0"
              width="180"
              height="58"
              rx="8"
              fill="url(#gradEncoder)"
              stroke="#64D9EF"
              strokeWidth="2"
              filter="drop-shadow(0 4px 8px rgba(10,52,93,0.25))"
            />
            <text
              x="90"
              y="35"
              fontSize="15"
              fontWeight="800"
              fill="#FFFFFF"
              textAnchor="middle"
            >
              Encoder
            </text>
          </g>

          {/* Arrow Encoder Input -> Encoder */}
          <path
            d="M 250 388 L 250 372"
            stroke="#0284C7"
            strokeWidth="2"
            fill="none"
            markerEnd="url(#arrowCyan)"
          />

          {/* Encoder Input Box */}
          <g transform="translate(190, 392)">
            <rect
              x="0"
              y="0"
              width="120"
              height="50"
              rx="8"
              fill="url(#gradEncoder)"
              stroke="#1BB5D8"
              strokeWidth="1.5"
              filter="drop-shadow(0 3px 5px rgba(10,52,93,0.2))"
            />
            <text
              x="60"
              y="23"
              fontSize="12.5"
              fontWeight="700"
              fill="#FFFFFF"
              textAnchor="middle"
            >
              Encoder
            </text>
            <text
              x="60"
              y="39"
              fontSize="12.5"
              fontWeight="700"
              fill="#64D9EF"
              textAnchor="middle"
            >
              Input
            </text>
          </g>

          {/* Arrow Bottom Input -> Encoder Input */}
          <path
            d="M 250 468 L 250 448"
            stroke="#0284C7"
            strokeWidth="2"
            fill="none"
            markerEnd="url(#arrowCyan)"
          />

          {/* ======================================================== */}
          {/* BOTTOM BASELINE & INPUT SEQUENCES */}
          {/* ======================================================== */}
          {/* Bottom baseline line */}
          <line
            x1="30"
            y1="472"
            x2="930"
            y2="472"
            stroke="#CBD5E1"
            strokeWidth="2"
            strokeDasharray="4 4"
          />

          {/* Left Badge: Source sequence */}
          <g transform="translate(110, 480)">
            <rect
              x="0"
              y="0"
              width="280"
              height="28"
              rx="6"
              fill="#EDF5FA"
              stroke="#BAE6FD"
              strokeWidth="1.5"
            />
            <text
              x="140"
              y="18"
              fontSize="12.5"
              fontWeight="700"
              fill="#0A345D"
              textAnchor="middle"
              fontFamily="var(--font-code), monospace"
            >
              &lt;SOS&gt; I love you very much &lt;EOS&gt;
            </text>
          </g>

          {/* Right Badge: Target prefix sequence */}
          <g transform="translate(480, 480)">
            <rect
              x="0"
              y="0"
              width="200"
              height="28"
              rx="6"
              fill="#F5F3FF"
              stroke="#DDD6FE"
              strokeWidth="1.5"
            />
            <text
              x="100"
              y="18"
              fontSize="12.5"
              fontWeight="700"
              fill="#5B21B6"
              textAnchor="middle"
              fontFamily="var(--font-code), monospace"
            >
              &lt;SOS&gt; Te amo muito
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
}

