import React from 'react';
import { Lock, Sparkles, Layers, Cpu, ShieldCheck } from 'lucide-react';

export default function DeiTDistillationOverviewDiagram() {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '4px 20px',
      boxSizing: 'border-box'
    }}>
      <div style={{
        background: '#FFFFFF',
        border: '1px solid #E2E8F0',
        borderRadius: '16px',
        padding: '16px 20px',
        boxShadow: '0 4px 20px rgba(10, 52, 93, 0.08)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        maxHeight: '620px',
        boxSizing: 'border-box'
      }}>
        {/* Header Superior Limpo */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #E2E8F0',
          paddingBottom: '8px',
          marginBottom: '10px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{
              background: '#0284C7',
              color: '#FFFFFF',
              padding: '3px 10px',
              borderRadius: '6px',
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '0.5px'
            }}>ARQUITETURA DEIT</span>
            <span style={{ color: 'var(--infnet-dark-blue)', fontSize: '15px', fontWeight: 700 }}>
              Destilação Através da Atenção com o Distillation Token (Touvron et al., Meta/Sorbonne 2021)
            </span>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <span style={{
              fontSize: '11px',
              color: '#15803D',
              background: '#F0FDF4',
              border: '1px solid #BBF7D0',
              padding: '2px 8px',
              borderRadius: '4px',
              fontWeight: 600
            }}>
              Zero Dados Externos • 100% ImageNet-1k
            </span>
            <span style={{
              fontSize: '11px',
              color: '#0369A1',
              background: '#F0F9FF',
              border: '1px solid #BAE6FD',
              padding: '2px 8px',
              borderRadius: '4px',
              fontWeight: 600
            }}>
              Top-1: 79.9% ➔ 85.2% (+5.3%)
            </span>
          </div>
        </div>

        {/* Área Central: Diagrama Arquitetural Recriado em SVG Vetorial */}
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative'
        }}>
          <svg
            viewBox="0 0 1060 410"
            style={{ width: '100%', height: '100%', maxHeight: '430px' }}
          >
            <defs>
              {/* Marcadores de Seta */}
              <marker
                id="arrow-black"
                markerWidth="8"
                markerHeight="8"
                refX="6"
                refY="4"
                orient="auto"
              >
                <path d="M 0 1 L 7 4 L 0 7 Z" fill="#0F172A" />
              </marker>

              <marker
                id="arrow-red"
                markerWidth="8"
                markerHeight="8"
                refX="6"
                refY="4"
                orient="auto"
              >
                <path d="M 0 1 L 7 4 L 0 7 Z" fill="#DC2626" />
              </marker>

              <marker
                id="arrow-red-start"
                markerWidth="8"
                markerHeight="8"
                refX="1"
                refY="4"
                orient="auto"
              >
                <path d="M 7 1 L 0 4 L 7 7 Z" fill="#DC2626" />
              </marker>

              {/* Gradiente da Imagem de Entrada */}
              <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#7DD3FC" />
                <stop offset="60%" stopColor="#BAE6FD" />
                <stop offset="100%" stopColor="#FDE68A" />
              </linearGradient>

              {/* Gradiente do Encoder */}
              <linearGradient id="encoderGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#E0F2FE" />
                <stop offset="100%" stopColor="#BAE6FD" />
              </linearGradient>

              {/* Gradiente da CNN Teacher */}
              <linearGradient id="cnnGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFF7ED" />
                <stop offset="100%" stopColor="#FFEDD5" />
              </linearGradient>

              {/* Sombra Suave dos Blocos */}
              <filter id="boxShadow" x="-5%" y="-5%" width="110%" height="115%">
                <feDropShadow dx="0" dy="3" stdDeviation="4" floodOpacity="0.08" />
              </filter>
            </defs>

            {/* ========================================================================= */}
            {/* 1. IMAGEM DE ENTRADA (Inferior Esquerdo) */}
            {/* ========================================================================= */}
            <g id="input-image-group">
              {/* Moldura da Imagem */}
              <rect
                x="30"
                y="260"
                width="120"
                height="120"
                rx="6"
                fill="url(#skyGrad)"
                stroke="#475569"
                strokeWidth="1.5"
                filter="url(#boxShadow)"
              />

              {/* Ilustração Paisagem/Monumento Estilizado */}
              {/* Montanhas */}
              <polygon points="30,360 65,310 100,360" fill="#047857" opacity="0.6" />
              <polygon points="70,365 110,300 150,365" fill="#065F46" opacity="0.8" />
              {/* Pagoda / Edifício Central */}
              <rect x="72" y="315" width="36" height="45" fill="#B91C1C" rx="1" />
              <polygon points="66,315 90,295 114,315" fill="#991B1B" />
              <polygon points="70,332 90,320 110,332" fill="#7F1D1D" />
              <rect x="85" y="340" width="10" height="20" fill="#FEF08A" />
              {/* Solo */}
              <rect x="30" y="360" width="120" height="20" fill="#15803D" />

              {/* Grade de Patches Sobreposta (Tracejada) */}
              <line x1="60" y1="260" x2="60" y2="380" stroke="#FFFFFF" strokeWidth="1.2" strokeDasharray="3,3" />
              <line x1="90" y1="260" x2="90" y2="380" stroke="#FFFFFF" strokeWidth="1.2" strokeDasharray="3,3" />
              <line x1="120" y1="260" x2="120" y2="380" stroke="#FFFFFF" strokeWidth="1.2" strokeDasharray="3,3" />
              <line x1="30" y1="290" x2="150" y2="290" stroke="#FFFFFF" strokeWidth="1.2" strokeDasharray="3,3" />
              <line x1="30" y1="320" x2="150" y2="320" stroke="#FFFFFF" strokeWidth="1.2" strokeDasharray="3,3" />
              <line x1="30" y1="350" x2="150" y2="350" stroke="#FFFFFF" strokeWidth="1.2" strokeDasharray="3,3" />

              <text x="90" y="398" textAnchor="middle" fontSize="11" fontWeight="700" fill="#475569">
                Imagem (x)
              </text>
            </g>

            {/* Seta da Imagem para os Patches */}
            <path d="M 90 260 L 90 220" stroke="#0F172A" strokeWidth="2" markerEnd="url(#arrow-black)" />

            {/* ========================================================================= */}
            {/* 2. SEQUÊNCIA DE PATCHES FATIADOS */}
            {/* ========================================================================= */}
            <g id="patches-group">
              {/* Patch 1 (Céu) */}
              <rect x="25" y="185" width="22" height="22" rx="3" fill="#7DD3FC" stroke="#0284C7" strokeWidth="1.2" />
              {/* Patch 2 (Céu/Nuvem) */}
              <rect x="52" y="185" width="22" height="22" rx="3" fill="#BAE6FD" stroke="#0284C7" strokeWidth="1.2" />
              {/* Patch 3 (Telhado) */}
              <rect x="79" y="185" width="22" height="22" rx="3" fill="#FCA5A5" stroke="#DC2626" strokeWidth="1.2" />
              {/* Patch 4 (Monumento) */}
              <rect x="106" y="185" width="22" height="22" rx="3" fill="#B91C1C" stroke="#991B1B" strokeWidth="1.2" />
              {/* Reticências */}
              <text x="138" y="198" fontSize="14" fontWeight="800" fill="#64748B">···</text>
              {/* Patch N-1 */}
              <rect x="152" y="185" width="22" height="22" rx="3" fill="#15803D" stroke="#166534" strokeWidth="1.2" />
              {/* Patch N */}
              <rect x="179" y="185" width="22" height="22" rx="3" fill="#065F46" stroke="#064E3B" strokeWidth="1.2" />

              <text x="50" y="222" fontSize="12" fontWeight="700" fontStyle="italic" fill="#DC2626">
                Patches
              </text>
            </g>

            {/* Seta dos Patches para a Projeção Linear */}
            <path d="M 106 182 L 106 142" stroke="#0F172A" strokeWidth="2" markerEnd="url(#arrow-black)" />

            {/* ========================================================================= */}
            {/* 3. BLOCO LINEAR PROJECTION */}
            {/* ========================================================================= */}
            <g id="linear-projection-group">
              <rect
                x="35"
                y="95"
                width="145"
                height="44"
                rx="8"
                fill="url(#encoderGrad)"
                stroke="#0284C7"
                strokeWidth="1.8"
                filter="url(#boxShadow)"
              />
              <text x="107" y="117" textAnchor="middle" fontSize="14" fontWeight="800" fill="#0A345D">
                Linear
              </text>
              <text x="107" y="131" textAnchor="middle" fontSize="10" fontWeight="600" fill="#0369A1" fontFamily="Fira Code">
                Projection (E)
              </text>
            </g>

            {/* Linha Condutora do Linear para a Sequência de Patch Tokens */}
            {/* Sai da direita do Linear (x: 180, y: 117), vai até x: 235, desce até y: 350, vira para a direita até a base dos patch tokens */}
            <path
              d="M 180 117 L 235 117 L 235 350 L 290 350"
              fill="none"
              stroke="#0F172A"
              strokeWidth="2.2"
              strokeLinejoin="round"
              markerEnd="url(#arrow-black)"
            />

            {/* ========================================================================= */}
            {/* 4. SEQUÊNCIA DE ENTRADA DO ENCODER: [CLS] + PATCH TOKENS + [DST] */}
            {/* ========================================================================= */}
            <g id="token-sequence-group">
              {/* Token [CLS] (Coluna Azul Celeste de 4 quadradinhos) */}
              <g id="cls-token-column">
                <text x="322" y="200" textAnchor="middle" fontSize="12" fontWeight="800" fill="#0284C7">
                  [CLS]
                </text>
                <rect x="312" y="210" width="20" height="16" rx="2" fill="#BAE6FD" stroke="#0284C7" strokeWidth="1.2" />
                <rect x="312" y="228" width="20" height="16" rx="2" fill="#BAE6FD" stroke="#0284C7" strokeWidth="1.2" />
                <rect x="312" y="246" width="20" height="16" rx="2" fill="#BAE6FD" stroke="#0284C7" strokeWidth="1.2" />
                <rect x="312" y="264" width="20" height="16" rx="2" fill="#BAE6FD" stroke="#0284C7" strokeWidth="1.2" />
              </g>

              {/* Patch Tokens (Colunas Vermelhas de 4 quadradinhos) */}
              <g id="patch-token-columns">
                {/* Coluna 1 */}
                <rect x="338" y="210" width="20" height="16" rx="2" fill="#FCA5A5" stroke="#DC2626" strokeWidth="1.2" />
                <rect x="338" y="228" width="20" height="16" rx="2" fill="#FCA5A5" stroke="#DC2626" strokeWidth="1.2" />
                <rect x="338" y="246" width="20" height="16" rx="2" fill="#FCA5A5" stroke="#DC2626" strokeWidth="1.2" />
                <rect x="338" y="264" width="20" height="16" rx="2" fill="#FCA5A5" stroke="#DC2626" strokeWidth="1.2" />

                {/* Coluna 2 */}
                <rect x="360" y="210" width="20" height="16" rx="2" fill="#FCA5A5" stroke="#DC2626" strokeWidth="1.2" />
                <rect x="360" y="228" width="20" height="16" rx="2" fill="#FCA5A5" stroke="#DC2626" strokeWidth="1.2" />
                <rect x="360" y="246" width="20" height="16" rx="2" fill="#FCA5A5" stroke="#DC2626" strokeWidth="1.2" />
                <rect x="360" y="264" width="20" height="16" rx="2" fill="#FCA5A5" stroke="#DC2626" strokeWidth="1.2" />

                {/* Coluna 3 */}
                <rect x="382" y="210" width="20" height="16" rx="2" fill="#FCA5A5" stroke="#DC2626" strokeWidth="1.2" />
                <rect x="382" y="228" width="20" height="16" rx="2" fill="#FCA5A5" stroke="#DC2626" strokeWidth="1.2" />
                <rect x="382" y="246" width="20" height="16" rx="2" fill="#FCA5A5" stroke="#DC2626" strokeWidth="1.2" />
                <rect x="382" y="264" width="20" height="16" rx="2" fill="#FCA5A5" stroke="#DC2626" strokeWidth="1.2" />

                {/* Reticências centrais */}
                <text x="416" y="248" fontSize="16" fontWeight="800" fill="#64748B">···</text>

                {/* Coluna N-1 */}
                <rect x="436" y="210" width="20" height="16" rx="2" fill="#FCA5A5" stroke="#DC2626" strokeWidth="1.2" />
                <rect x="436" y="228" width="20" height="16" rx="2" fill="#FCA5A5" stroke="#DC2626" strokeWidth="1.2" />
                <rect x="436" y="246" width="20" height="16" rx="2" fill="#FCA5A5" stroke="#DC2626" strokeWidth="1.2" />
                <rect x="436" y="264" width="20" height="16" rx="2" fill="#FCA5A5" stroke="#DC2626" strokeWidth="1.2" />

                {/* Coluna N */}
                <rect x="458" y="210" width="20" height="16" rx="2" fill="#FCA5A5" stroke="#DC2626" strokeWidth="1.2" />
                <rect x="458" y="228" width="20" height="16" rx="2" fill="#FCA5A5" stroke="#DC2626" strokeWidth="1.2" />
                <rect x="458" y="246" width="20" height="16" rx="2" fill="#FCA5A5" stroke="#DC2626" strokeWidth="1.2" />
                <rect x="458" y="264" width="20" height="16" rx="2" fill="#FCA5A5" stroke="#DC2626" strokeWidth="1.2" />

                {/* Coluna N+1 */}
                <rect x="480" y="210" width="20" height="16" rx="2" fill="#FCA5A5" stroke="#DC2626" strokeWidth="1.2" />
                <rect x="480" y="228" width="20" height="16" rx="2" fill="#FCA5A5" stroke="#DC2626" strokeWidth="1.2" />
                <rect x="480" y="246" width="20" height="16" rx="2" fill="#FCA5A5" stroke="#DC2626" strokeWidth="1.2" />
                <rect x="480" y="264" width="20" height="16" rx="2" fill="#FCA5A5" stroke="#DC2626" strokeWidth="1.2" />
              </g>

              {/* Chave Horizontal e Rótulo "Patch tokens" */}
              <path
                d="M 338 286 C 338 296, 419 292, 419 302 C 419 292, 500 296, 500 286"
                fill="none"
                stroke="#0F172A"
                strokeWidth="1.5"
              />
              <text x="419" y="354" textAnchor="middle" fontSize="13" fontWeight="800" fill="#0F172A">
                Patch tokens
              </text>

              {/* Token [DST] / [DIST] (Coluna Verde de 4 quadradinhos) */}
              <g id="dist-token-column">
                <text x="514" y="200" textAnchor="middle" fontSize="12" fontWeight="800" fill="#15803D">
                  [DST]
                </text>
                <rect x="504" y="210" width="20" height="16" rx="2" fill="#86EFAC" stroke="#16A34A" strokeWidth="1.2" />
                <rect x="504" y="228" width="20" height="16" rx="2" fill="#86EFAC" stroke="#16A34A" strokeWidth="1.2" />
                <rect x="504" y="246" width="20" height="16" rx="2" fill="#86EFAC" stroke="#16A34A" strokeWidth="1.2" />
                <rect x="504" y="264" width="20" height="16" rx="2" fill="#86EFAC" stroke="#16A34A" strokeWidth="1.2" />
              </g>
            </g>

            {/* Seta Central de Entrada para o Encoder com Símbolo de Adição Posicional */}
            <path d="M 419 205 L 419 146" stroke="#0F172A" strokeWidth="2" markerEnd="url(#arrow-black)" />
            {/* Círculo com + Pos. */}
            <circle cx="419" cy="172" r="10" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.8" />
            <line x1="414" y1="172" x2="424" y2="172" stroke="#0F172A" strokeWidth="1.8" />
            <line x1="419" y1="167" x2="419" y2="177" stroke="#0F172A" strokeWidth="1.8" />
            <text x="434" y="176" fontSize="12" fontWeight="700" fontStyle="italic" fill="#0F172A">
              Pos.
            </text>

            {/* ========================================================================= */}
            {/* 5. BLOCO TRANSFORMER ENCODER */}
            {/* ========================================================================= */}
            <g id="encoder-group">
              <rect
                x="298"
                y="92"
                width="246"
                height="50"
                rx="10"
                fill="url(#encoderGrad)"
                stroke="#0284C7"
                strokeWidth="2"
                filter="url(#boxShadow)"
              />
              <text x="421" y="123" textAnchor="middle" fontSize="17" fontWeight="800" fill="#0A345D">
                Encoder
              </text>
            </g>

            {/* ========================================================================= */}
            {/* 6. CABEÇAS CLASSIFICADORAS (CLASSIFIER HEADS) */}
            {/* ========================================================================= */}
            {/* Seta do [CLS] subindo do Encoder para a Cabeça da Esquerda */}
            <path d="M 322 92 L 322 64" stroke="#0F172A" strokeWidth="2" markerEnd="url(#arrow-black)" />

            {/* Seta do [DST] subindo do Encoder para a Cabeça da Direita */}
            <path d="M 514 92 L 514 64" stroke="#0F172A" strokeWidth="2" markerEnd="url(#arrow-black)" />

            {/* Cabeça Classificadora Esquerda (Associada ao [CLS]) */}
            <g id="head-left">
              <rect x="296" y="48" width="52" height="12" rx="4" fill="#BAE6FD" stroke="#0284C7" strokeWidth="1.2" />
              <rect x="296" y="34" width="52" height="12" rx="4" fill="#C084FC" stroke="#9333EA" strokeWidth="1.2" />
            </g>

            {/* Rótulo Central "Classifier heads" */}
            <text x="419" y="52" textAnchor="middle" fontSize="13" fontWeight="700" fontStyle="italic" fill="#0F172A">
              Classifier heads
            </text>

            {/* Cabeça Classificadora Direita (Associada ao [DST]) */}
            <g id="head-right">
              <rect x="488" y="48" width="52" height="12" rx="4" fill="#BAE6FD" stroke="#0284C7" strokeWidth="1.2" />
              <rect x="488" y="34" width="52" height="12" rx="4" fill="#C084FC" stroke="#9333EA" strokeWidth="1.2" />
            </g>

            {/* ========================================================================= */}
            {/* 7. ALVOS DE PERDA: HARD TARGET vs SOFT TARGET */}
            {/* ========================================================================= */}
            {/* Hard Target (Acima da Cabeça Esquerda) */}
            <g id="hard-target-group">
              <line
                x1="322"
                y1="30"
                x2="322"
                y2="10"
                stroke="#DC2626"
                strokeWidth="2"
                markerStart="url(#arrow-red-start)"
                markerEnd="url(#arrow-red)"
              />
              <text x="322" y="-2" textAnchor="middle" fontSize="13" fontWeight="800" fontStyle="italic" fill="#DC2626">
                Hard target
              </text>
            </g>

            {/* Soft Target (Acima da Cabeça Direita) */}
            <g id="soft-target-group">
              <line
                x1="514"
                y1="30"
                x2="514"
                y2="10"
                stroke="#DC2626"
                strokeWidth="2"
                markerStart="url(#arrow-red-start)"
                markerEnd="url(#arrow-red)"
              />
              <text x="514" y="-2" textAnchor="middle" fontSize="13" fontWeight="800" fontStyle="italic" fill="#DC2626">
                Soft target
              </text>
            </g>

            {/* ========================================================================= */}
            {/* 8. TEACHER CNN (Superior Direito) */}
            {/* ========================================================================= */}
            <g id="teacher-cnn-group">
              {/* Bloco CNN */}
              <rect
                x="590"
                y="34"
                width="78"
                height="62"
                rx="12"
                fill="url(#cnnGrad)"
                stroke="#EA580C"
                strokeWidth="2"
                filter="url(#boxShadow)"
              />
              <text x="629" y="72" textAnchor="middle" fontSize="16" fontWeight="900" fill="#7C2D12">
                CNN
              </text>

              {/* Cadeado de Modelo Congelado (Frozen 🔒) */}
              <g transform="translate(650, 20)">
                <rect x="0" y="7" width="16" height="13" rx="2" fill="#EA580C" stroke="#7C2D12" strokeWidth="1.2" />
                <path d="M 3 7 L 3 4 C 3 1.5, 13 1.5, 13 4 L 13 7" fill="none" stroke="#7C2D12" strokeWidth="1.6" />
                <circle cx="8" cy="13" r="1.5" fill="#FFFFFF" />
              </g>

              {/* Seta Vermelha saindo da CNN para o Soft Target */}
              {/* Sai do topo da CNN (x: 630, y: 34), sobe até y: 6, vira à esquerda até x: 554 com ponta de seta vermelha */}
              <path
                d="M 630 34 L 630 6 L 555 6"
                fill="none"
                stroke="#DC2626"
                strokeWidth="2.2"
                strokeLinejoin="round"
                markerEnd="url(#arrow-red)"
              />
            </g>

            {/* ========================================================================= */}
            {/* 9. LINHA CONDUTORA DA IMAGEM PARA A CNN */}
            {/* ========================================================================= */}
            {/* Sai da imagem original (x: 150, y: 320), vai para a direita até x: 630, e sobe até a base da CNN (y: 96) */}
            <path
              d="M 150 320 L 630 320 L 630 102"
              fill="none"
              stroke="#0F172A"
              strokeWidth="2.2"
              strokeLinejoin="round"
              markerEnd="url(#arrow-black)"
            />

            {/* ========================================================================= */}
            {/* 10. PAINEL DE LEGENDA PEDAGÓGICA (Lado Direito) */}
            {/* ========================================================================= */}
            <g transform="translate(700, 10)">
              {/* Container Geral da Legenda */}
              <rect
                x="0"
                y="0"
                width="350"
                height="390"
                rx="12"
                fill="#F8FAFC"
                stroke="#E2E8F0"
                strokeWidth="1.5"
                filter="url(#boxShadow)"
              />

              <text x="18" y="28" fontSize="13" fontWeight="800" fill="#0A345D">
                MECÂNICA DE DESTILAÇÃO DO DEIT
              </text>

              {/* Item 1: Token [CLS] */}
              <g transform="translate(16, 42)">
                <rect x="0" y="0" width="318" height="68" rx="8" fill="#F0F9FF" stroke="#BAE6FD" strokeWidth="1" />
                <text x="12" y="18" fontSize="11" fontWeight="800" fill="#0284C7">
                  1. Token de Classe [CLS] ➔ Hard Target
                </text>
                <text x="12" y="34" fontSize="10.5" fill="#334155">
                  Supervisionado diretamente pelo rótulo real (Ground Truth y).
                </text>
                <text x="12" y="50" fontSize="10" fontFamily="Fira Code" fontWeight="600" fill="#0369A1">
                  L_CE = -log(Softmax(z_cls)[y])
                </text>
              </g>

              {/* Item 2: Token [DST] */}
              <g transform="translate(16, 118)">
                <rect x="0" y="0" width="318" height="74" rx="8" fill="#F0FDF4" stroke="#BBF7D0" strokeWidth="1" />
                <text x="12" y="18" fontSize="11" fontWeight="800" fill="#15803D">
                  2. Distillation Token [DST] ➔ Teacher Target
                </text>
                <text x="12" y="34" fontSize="10.5" fill="#334155">
                  Forçado a reproduzir a predição da CNN especialista.
                </text>
                <text x="12" y="50" fontSize="10" fontFamily="Fira Code" fontWeight="600" fill="#166534">
                  Absorve o viés indutivo de localidade 2D!
                </text>
              </g>

              {/* Item 3: CNN Teacher Congelada */}
              <g transform="translate(16, 200)">
                <rect x="0" y="0" width="318" height="66" rx="8" fill="#FFF7ED" stroke="#FED7AA" strokeWidth="1" />
                <text x="12" y="18" fontSize="11" fontWeight="800" fill="#EA580C">
                  3. Teacher CNN (RegNet / ResNet) 🔒
                </text>
                <text x="12" y="34" fontSize="10.5" fill="#334155">
                  Totalmente congelado: zero gradientes na backprop.
                </text>
                <text x="12" y="50" fontSize="10" fontWeight="600" fill="#C2410C">
                  Fornece alvos estáveis (Soft ou Hard) para o ViT.
                </text>
              </g>

              {/* Item 4: Inferência em Produção */}
              <g transform="translate(16, 274)">
                <rect x="0" y="0" width="318" height="68" rx="8" fill="#FAF5FF" stroke="#E9D5FF" strokeWidth="1" />
                <text x="12" y="18" fontSize="11" fontWeight="800" fill="#7E22CE">
                  4. Inferência em Produção (Sem a CNN!)
                </text>
                <text x="12" y="34" fontSize="10.5" fill="#334155">
                  A CNN é descartada! A predição final combina as duas cabeças:
                </text>
                <text x="12" y="52" fontSize="11" fontFamily="Fira Code" fontWeight="700" fill="#6B21A8">
                  y_final = ½ ( y_cls + y_dist )
                </text>
              </g>

              {/* Dica de Engenharia */}
              <text x="175" y="365" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#64748B">
                💡 O [DST] atua como um 'aluno ouvinte' dedicado à CNN.
              </text>
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
