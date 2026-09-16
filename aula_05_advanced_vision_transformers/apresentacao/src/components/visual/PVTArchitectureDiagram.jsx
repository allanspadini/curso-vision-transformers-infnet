import React, { useState } from 'react';

export default function PVTArchitectureDiagram() {
  const [activeStage, setActiveStage] = useState(null);

  const stages = [
    {
      id: 1,
      name: 'Estágio 1',
      featureMap: 'F₁',
      dim: '64 × 48 × 64',
      resFormula: 'H/4 × W/4 × C₁',
      reduction: 'R₁ = 8',
      patchSize: 'Patch 4×4',
      channels: 64,
      desc: 'Alta resolução espacial para detecção de objetos minúsculos e bordas finas.',
      frontColor: '#E0F2FE',
      sideColor: '#7DD3FC',
      topColor: '#BAE6FD',
      strokeColor: '#0284C7',
      textColor: '#0369A1',
      x: 275,
      y: 130,
      w: 18,
      h: 240,
      dx: 22,
      dy: -18
    },
    {
      id: 2,
      name: 'Estágio 2',
      featureMap: 'F₂',
      dim: '32 × 24 × 128',
      resFormula: 'H/8 × W/8 × C₂',
      reduction: 'R₂ = 4',
      patchSize: 'Patch 2×2',
      channels: 128,
      desc: 'Resolução intermediária balanceando semântica e localização para objetos médios.',
      frontColor: '#DCFCE7',
      sideColor: '#86EFAC',
      topColor: '#BBF7D0',
      strokeColor: '#16A34A',
      textColor: '#15803D',
      x: 480,
      y: 170,
      w: 34,
      h: 160,
      dx: 26,
      dy: -20
    },
    {
      id: 3,
      name: 'Estágio 3',
      featureMap: 'F₃',
      dim: '16 × 12 × 320',
      resFormula: 'H/16 × W/16 × C₃',
      reduction: 'R₃ = 2',
      patchSize: 'Patch 2×2',
      channels: 320,
      desc: 'Profundidade semântica rica para reconhecimento de partes e contexto regional.',
      frontColor: '#F3E8FF',
      sideColor: '#D8B4FE',
      topColor: '#E9D5FF',
      strokeColor: '#9333EA',
      textColor: '#7E22CE',
      x: 690,
      y: 200,
      w: 52,
      h: 100,
      dx: 30,
      dy: -22
    },
    {
      id: 4,
      name: 'Estágio 4',
      featureMap: 'F₄',
      dim: '8 × 6 × 512',
      resFormula: 'H/32 × W/32 × C₄',
      reduction: 'R₄ = 1 (MSA)',
      patchSize: 'Patch 2×2',
      channels: 512,
      desc: 'Representação global de cena para objetos gigantescos e classificação de cena.',
      frontColor: '#FFEDD5',
      sideColor: '#FDBA74',
      topColor: '#FED7AA',
      strokeColor: '#EA580C',
      textColor: '#C2410C',
      x: 895,
      y: 215,
      w: 72,
      h: 70,
      dx: 36,
      dy: -24
    }
  ];

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '4px 16px',
      boxSizing: 'border-box'
    }}>
      {/* Contêiner Principal da Figura SVG */}
      <div style={{
        width: '100%',
        maxWidth: '1280px',
        height: '565px',
        background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)',
        border: '1.5px solid #E2E8F0',
        borderRadius: '16px',
        boxShadow: '0 6px 24px rgba(10, 52, 93, 0.05)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Barra de Título Técnica Superior */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 20px',
          borderBottom: '1px solid #E2E8F0',
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(4px)',
          zIndex: 10
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{
              background: 'var(--infnet-dark-blue)',
              color: '#FFFFFF',
              fontFamily: 'Fira Code',
              fontSize: '11px',
              fontWeight: 800,
              padding: '3px 8px',
              borderRadius: '4px'
            }}>
              FIGURE 16-5
            </span>
            <span style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A' }}>
              Pyramid Vision Transformer (PVT) for Dense Prediction Tasks
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              background: '#E0F2FE',
              color: '#0369A1',
              fontSize: '11px',
              fontWeight: 700,
              padding: '3px 8px',
              borderRadius: '4px',
              border: '1px solid #BAE6FD'
            }}>
              Wang et al. (ICCV 2021)
            </span>
            <span style={{
              background: '#DCFCE7',
              color: '#15803D',
              fontSize: '11px',
              fontWeight: 700,
              padding: '3px 8px',
              borderRadius: '4px',
              border: '1px solid #BBF7D0'
            }}>
              4 Estágios Hierárquicos
            </span>
            <span style={{
              background: '#FAF5FF',
              color: '#7E22CE',
              fontSize: '11px',
              fontWeight: 700,
              padding: '3px 8px',
              borderRadius: '4px',
              border: '1px solid #E9D5FF'
            }}>
              Compatível com FPN
            </span>
          </div>
        </div>

        {/* Diagrama SVG Vetorial */}
        <div style={{ flex: 1, width: '100%', height: '100%', position: 'relative' }}>
          <svg
            viewBox="0 0 1200 495"
            style={{ width: '100%', height: '100%', display: 'block' }}
          >
            <defs>
              {/* Marcador de seta preta */}
              <marker id="pvt-arrow-black" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                <path d="M 0 1 L 7 4 L 0 7 Z" fill="#0F172A" />
              </marker>

              {/* Marcador de seta downstream */}
              <marker id="pvt-arrow-downstream" markerWidth="10" markerHeight="10" refX="7" refY="4" orient="auto">
                <path d="M 0 1 L 8 4 L 0 7 Z" fill="#0A345D" />
              </marker>

              {/* Marcador de seta de módulo */}
              <marker id="pvt-arrow-module" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                <path d="M 0 1 L 7 4 L 0 7 Z" fill="#0284C7" />
              </marker>

              {/* Gradiente da Imagem de Entrada (Paisagem / Arquitetura) */}
              <linearGradient id="pvt-sky-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="40%" stopColor="#BAE6FD" />
                <stop offset="70%" stopColor="#FDE68A" />
                <stop offset="100%" stopColor="#F59E0B" />
              </linearGradient>

              {/* Sombra suave dos blocos 3D */}
              <filter id="pvt-shadow" x="-10%" y="-10%" width="130%" height="130%">
                <feDropShadow dx="3" dy="5" stdDeviation="4" floodColor="#0F172A" floodOpacity="0.12" />
              </filter>
            </defs>

            {/* ============================================================= */}
            {/* 1. IMAGEM DE ENTRADA EM PERSPECTIVA (256 × 192 × 3) */}
            {/* ============================================================= */}
            <g id="input-image-group">
              {/* Plano de Fundo da Imagem com perspectiva */}
              <polygon
                points="50,75 160,115 160,370 50,395"
                fill="url(#pvt-sky-grad)"
                stroke="#0F172A"
                strokeWidth="1.8"
                filter="url(#pvt-shadow)"
              />

              {/* Ilustração vetorial interna da imagem (Montanhas e Pagoda / Torre) */}
              {/* Montanhas ao fundo */}
              <polygon
                points="50,310 95,260 130,285 160,250 160,370 50,395"
                fill="#475569"
                opacity="0.5"
              />
              <polygon
                points="50,335 110,290 160,320 160,370 50,395"
                fill="#1E293B"
                opacity="0.7"
              />

              {/* Árvores / Vegetação na base */}
              <polygon
                points="50,360 85,340 120,355 160,335 160,370 50,395"
                fill="#15803D"
                opacity="0.85"
              />

              {/* Torre / Pagoda arquitetural estilizada */}
              <g opacity="0.9">
                {/* Nível 1 base */}
                <polygon points="78,350 96,345 96,305 78,308" fill="#B91C1C" stroke="#7F1D1D" strokeWidth="0.8" />
                {/* Telhado 1 */}
                <polygon points="72,308 102,301 98,295 76,301" fill="#D97706" />
                {/* Nível 2 */}
                <polygon points="80,298 94,294 94,265 80,268" fill="#DC2626" stroke="#7F1D1D" strokeWidth="0.8" />
                {/* Telhado 2 */}
                <polygon points="74,268 100,262 96,256 78,261" fill="#F59E0B" />
                {/* Nível 3 */}
                <polygon points="82,258 92,255 92,230 82,232" fill="#EF4444" stroke="#7F1D1D" strokeWidth="0.8" />
                {/* Pináculo */}
                <polygon points="86,230 88,230 87,205" fill="#FEF08A" stroke="#B45309" strokeWidth="0.8" />
              </g>

              {/* Grade de Patches em Branco (Divisões 4 colunas x 6 linhas) */}
              {/* Linhas Verticais com perspectiva */}
              <line x1="77.5" y1="85" x2="77.5" y2="389" stroke="#FFFFFF" strokeWidth="1.4" strokeOpacity="0.85" />
              <line x1="105" y1="95" x2="105" y2="382" stroke="#FFFFFF" strokeWidth="1.4" strokeOpacity="0.85" />
              <line x1="132.5" y1="105" x2="132.5" y2="376" stroke="#FFFFFF" strokeWidth="1.4" strokeOpacity="0.85" />

              {/* Linhas Horizontais com perspectiva */}
              <line x1="50" y1="128" x2="160" y2="157" stroke="#FFFFFF" strokeWidth="1.4" strokeOpacity="0.85" />
              <line x1="50" y1="181" x2="160" y2="200" stroke="#FFFFFF" strokeWidth="1.4" strokeOpacity="0.85" />
              <line x1="50" y1="234" x2="160" y2="242" stroke="#FFFFFF" strokeWidth="1.4" strokeOpacity="0.85" />
              <line x1="50" y1="287" x2="160" y2="285" stroke="#FFFFFF" strokeWidth="1.4" strokeOpacity="0.85" />
              <line x1="50" y1="341" x2="160" y2="327" stroke="#FFFFFF" strokeWidth="1.4" strokeOpacity="0.85" />

              {/* Rótulo da Dimensão da Imagem */}
              <text x="105" y="420" textAnchor="middle" fontFamily="Fira Code" fontSize="14" fontWeight="800" fill="#0F172A">
                256 × 192 × 3
              </text>
              <text x="105" y="437" textAnchor="middle" fontSize="11" fontWeight="600" fill="#64748B">
                Entrada RGB (H × W × 3)
              </text>
            </g>

            {/* Seta e Tokens de Entrada para Estágio 1 */}
            <g id="token-input-stage1">
              <path d="M 162 235 L 210 235" stroke="#0F172A" strokeWidth="2" />
              {/* Tokens coloridos (Patch tokens) */}
              <rect x="180" y="227" width="14" height="16" rx="2" fill="#FED7AA" stroke="#EA580C" strokeWidth="1.2" />
              <rect x="196" y="227" width="14" height="16" rx="2" fill="#BAE6FD" stroke="#0284C7" strokeWidth="1.2" />
              <path d="M 212 235 L 265 235" stroke="#0F172A" strokeWidth="2" markerEnd="url(#pvt-arrow-black)" />
            </g>

            {/* ============================================================= */}
            {/* 2. OS 4 BLOCOS 3D DOS ESTÁGIOS DA PIRÂMIDE (F1, F2, F3, F4) */}
            {/* ============================================================= */}
            {stages.map((stg) => {
              const isHovered = activeStage === stg.id;

              return (
                <g
                  key={stg.id}
                  id={`stage-${stg.id}`}
                  onMouseEnter={() => setActiveStage(stg.id)}
                  onMouseLeave={() => setActiveStage(null)}
                  style={{ cursor: 'pointer', transition: 'all 0.2s ease' }}
                >
                  {/* Sombra da base do bloco */}
                  <polygon
                    points={`
                      ${stg.x},${stg.y + stg.h} 
                      ${stg.x + stg.w},${stg.y + stg.h} 
                      ${stg.x + stg.w + stg.dx},${stg.y + stg.h + stg.dy} 
                      ${stg.x + stg.dx},${stg.y + stg.h + stg.dy}
                    `}
                    fill="#0F172A"
                    opacity={isHovered ? '0.18' : '0.08'}
                  />

                  {/* Top Face (Face Superior) */}
                  <polygon
                    points={`
                      ${stg.x},${stg.y} 
                      ${stg.x + stg.dx},${stg.y + stg.dy} 
                      ${stg.x + stg.w + stg.dx},${stg.y + stg.dy} 
                      ${stg.x + stg.w},${stg.y}
                    `}
                    fill={isHovered ? '#FFFFFF' : stg.topColor}
                    stroke={stg.strokeColor}
                    strokeWidth="1.6"
                  />

                  {/* Side Face (Face Lateral Direita) */}
                  <polygon
                    points={`
                      ${stg.x + stg.w},${stg.y} 
                      ${stg.x + stg.w + stg.dx},${stg.y + stg.dy} 
                      ${stg.x + stg.w + stg.dx},${stg.y + stg.h + stg.dy} 
                      ${stg.x + stg.w},${stg.y + stg.h}
                    `}
                    fill={stg.sideColor}
                    stroke={stg.strokeColor}
                    strokeWidth="1.6"
                  />

                  {/* Front Face (Face Frontal) */}
                  <polygon
                    points={`
                      ${stg.x},${stg.y} 
                      ${stg.x + stg.w},${stg.y} 
                      ${stg.x + stg.w},${stg.y + stg.h} 
                      ${stg.x},${stg.y + stg.h}
                    `}
                    fill={stg.frontColor}
                    stroke={stg.strokeColor}
                    strokeWidth="1.8"
                    filter="url(#pvt-shadow)"
                  />

                  {/* Badge Identificador do Estágio acima do Bloco */}
                  <rect
                    x={stg.x + stg.w / 2 + stg.dx / 2 - 38}
                    y={stg.y + stg.dy - 26}
                    width="76"
                    height="20"
                    rx="10"
                    fill={stg.frontColor}
                    stroke={stg.strokeColor}
                    strokeWidth="1.4"
                  />
                  <text
                    x={stg.x + stg.w / 2 + stg.dx / 2}
                    y={stg.y + stg.dy - 12}
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight="800"
                    fill={stg.textColor}
                  >
                    {stg.name} ({stg.featureMap})
                  </text>

                  {/* Dimensão do Tensor abaixo do Bloco */}
                  <text
                    x={stg.x + stg.w / 2}
                    y="395"
                    textAnchor="middle"
                    fontFamily="Fira Code"
                    fontSize="14"
                    fontWeight="800"
                    fill="#0F172A"
                  >
                    {stg.dim}
                  </text>
                  <text
                    x={stg.x + stg.w / 2}
                    y="412"
                    textAnchor="middle"
                    fontFamily="Fira Code"
                    fontSize="11"
                    fontWeight="700"
                    fill={stg.textColor}
                  >
                    {stg.resFormula}
                  </text>
                  <text
                    x={stg.x + stg.w / 2}
                    y="428"
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight="700"
                    fill="#64748B"
                  >
                    {stg.reduction}
                  </text>

                  {/* Linha Vertical de Conexão com o Barramento Downstream */}
                  <line
                    x1={stg.x + stg.w / 2}
                    y1="436"
                    x2={stg.x + stg.w / 2}
                    y2="465"
                    stroke="#0F172A"
                    strokeWidth="2.2"
                  />
                  {/* Círculo de junção */}
                  <circle
                    cx={stg.x + stg.w / 2}
                    cy="465"
                    r="4"
                    fill="#0A345D"
                  />
                </g>
              );
            })}

            {/* ============================================================= */}
            {/* TRANSIÇÕES ENTRE OS ESTÁGIOS (Seta + Tokens) */}
            {/* ============================================================= */}
            {/* Estágio 1 ➔ Estágio 2 */}
            <g id="transition-1-2">
              <path d="M 315 250 L 360 250" stroke="#0F172A" strokeWidth="2" />
              <rect x="362" y="242" width="14" height="16" rx="2" fill="#FED7AA" stroke="#EA580C" strokeWidth="1.2" />
              <rect x="378" y="242" width="14" height="16" rx="2" fill="#BAE6FD" stroke="#0284C7" strokeWidth="1.2" />
              <path d="M 395 250 L 470 250" stroke="#0F172A" strokeWidth="2" markerEnd="url(#pvt-arrow-black)" />
            </g>

            {/* Estágio 2 ➔ Estágio 3 (Com destaque da caixa pontilhada de módulo) */}
            <g id="transition-2-3">
              <path d="M 540 250 L 580 250" stroke="#0F172A" strokeWidth="2" />
              {/* Caixa pontilhada destacando o bloco conceitual */}
              <rect
                x="585"
                y="238"
                width="42"
                height="24"
                rx="6"
                fill="rgba(241, 245, 249, 0.6)"
                stroke="#0F172A"
                strokeWidth="1.6"
                strokeDasharray="3 3"
              />
              <rect x="590" y="242" width="14" height="16" rx="2" fill="#FED7AA" stroke="#EA580C" strokeWidth="1.2" />
              <rect x="606" y="242" width="14" height="16" rx="2" fill="#BAE6FD" stroke="#0284C7" strokeWidth="1.2" />
              <path d="M 630 250 L 680 250" stroke="#0F172A" strokeWidth="2" markerEnd="url(#pvt-arrow-black)" />
            </g>

            {/* Estágio 3 ➔ Estágio 4 */}
            <g id="transition-3-4">
              <path d="M 772 250 L 810 250" stroke="#0F172A" strokeWidth="2" />
              <rect x="812" y="242" width="14" height="16" rx="2" fill="#FED7AA" stroke="#EA580C" strokeWidth="1.2" />
              <rect x="828" y="242" width="14" height="16" rx="2" fill="#BAE6FD" stroke="#0284C7" strokeWidth="1.2" />
              <path d="M 845 250 L 885 250" stroke="#0F172A" strokeWidth="2" markerEnd="url(#pvt-arrow-black)" />
            </g>

            {/* ============================================================= */}
            {/* 3. CALLOUT SUPERIOR: ESTRUTURA INTERNA DE CADA ESTÁGIO */}
            {/* ============================================================= */}
            <g id="upper-stage-module-callout">
              {/* Linhas conectores pontilhadas que descem até o bloco do Estágio 2/3 */}
              <path
                d="M 465 72 C 430 72, 430 140, 585 240"
                fill="none"
                stroke="#0F172A"
                strokeWidth="1.6"
                strokeDasharray="4 4"
              />
              <path
                d="M 865 72 C 900 72, 900 140, 630 240"
                fill="none"
                stroke="#0F172A"
                strokeWidth="1.6"
                strokeDasharray="4 4"
              />

              {/* Contêiner Geral do Módulo Interno */}
              <rect
                x="440"
                y="38"
                width="450"
                height="68"
                rx="14"
                fill="#FFFFFF"
                stroke="#CBD5E1"
                strokeWidth="1.5"
                filter="url(#pvt-shadow)"
              />

              {/* Título do Box */}
              <text x="455" y="55" fontSize="10" fontWeight="800" fill="#64748B" letterSpacing="0.5">
                ESTRUTURA MODULAR INTERNA DE CADA ESTÁGIO i:
              </text>

              {/* Bloco 1: Patch Embedding */}
              <rect
                x="475"
                y="62"
                width="125"
                height="34"
                rx="8"
                fill="#FEF3C7"
                stroke="#D97706"
                strokeWidth="1.6"
              />
              <text x="537" y="78" textAnchor="middle" fontSize="12" fontWeight="800" fill="#92400E">
                Patch Embedding
              </text>
              <text x="537" y="90" textAnchor="middle" fontFamily="Fira Code" fontSize="9" fontWeight="700" fill="#B45309">
                Conv2D(stride=P)
              </text>

              {/* Seta conectora com soma de Position Embedding */}
              <line x1="600" y1="79" x2="630" y2="79" stroke="#0F172A" strokeWidth="1.8" />

              {/* Círculo de Adição do Position Embedding */}
              <circle cx="642" cy="79" r="10" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.8" />
              <text x="642" y="83" textAnchor="middle" fontSize="13" fontWeight="800" fill="#0F172A">
                +
              </text>
              <text x="642" y="65" textAnchor="middle" fontStyle="italic" fontSize="11" fontWeight="700" fill="#0F172A">
                Pos.
              </text>

              {/* Seta para o Transformer Encoder */}
              <line x1="652" y1="79" x2="678" y2="79" stroke="#0F172A" strokeWidth="1.8" markerEnd="url(#pvt-arrow-module)" />

              {/* Bloco 2: Transformer Encoder (com SRA) */}
              <rect
                x="682"
                y="62"
                width="175"
                height="34"
                rx="8"
                fill="#E0F2FE"
                stroke="#0284C7"
                strokeWidth="1.6"
              />
              <text x="769" y="78" textAnchor="middle" fontSize="12" fontWeight="800" fill="#0369A1">
                Transformer Encoder
              </text>
              <text x="769" y="90" textAnchor="middle" fontFamily="Fira Code" fontSize="9" fontWeight="700" fill="#0284C7">
                Spatial-Reduction Attn (SRA)
              </text>

              {/* Seta de saída do Encoder */}
              <line x1="857" y1="79" x2="880" y2="79" stroke="#0F172A" strokeWidth="1.8" markerEnd="url(#pvt-arrow-black)" />
            </g>

            {/* ============================================================= */}
            {/* 4. BARRAMENTO DOWNSTREAM TASKS (Linha Inferior Unificada) */}
            {/* ============================================================= */}
            <g id="downstream-tasks-bus">
              {/* Linha horizontal mestra de downstream */}
              <line
                x1={stages[0].x + stages[0].w / 2}
                y1="465"
                x2="1010"
                y2="465"
                stroke="#0A345D"
                strokeWidth="2.8"
                markerEnd="url(#pvt-arrow-downstream)"
              />

              {/* Card Terminal: Downstream Tasks */}
              <g
                transform="translate(1018, 442)"
                filter="url(#pvt-shadow)"
                style={{ cursor: 'pointer' }}
              >
                <rect
                  x="0"
                  y="0"
                  width="168"
                  height="45"
                  rx="10"
                  fill="var(--infnet-dark-blue)"
                  stroke="#1BB5D8"
                  strokeWidth="1.6"
                />
                <text x="14" y="20" fontSize="12" fontWeight="800" fill="#64D9EF">
                  Downstream Tasks ➔
                </text>
                <text x="14" y="35" fontSize="10" fontWeight="600" fill="#E2E8F0">
                  FPN • Mask R-CNN • RetinaNet
                </text>
              </g>
            </g>
          </svg>
        </div>

        {/* Rodapé Dinâmico com Detalhes do Estágio Selecionado */}
        <div style={{
          padding: '6px 20px',
          background: '#F1F5F9',
          borderTop: '1px solid #E2E8F0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '11px',
          color: '#334155'
        }}>
          {activeStage ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontWeight: 800, color: stages[activeStage - 1].textColor }}>
                ✦ {stages[activeStage - 1].name} ({stages[activeStage - 1].featureMap}):
              </span>
              <span>{stages[activeStage - 1].desc}</span>
              <span style={{ fontFamily: 'Fira Code', fontWeight: 700, color: '#0F172A', background: '#FFFFFF', padding: '1px 6px', borderRadius: '4px', border: '1px solid #CBD5E1' }}>
                Dimensão: {stages[activeStage - 1].dim}
              </span>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
                💡 Visão Piramidal:
              </span>
              <span>
                Cada estágio comprime a resolução espacial pela metade e dobra canais, gerando a pirâmide <code>[F₁, F₂, F₃, F₄]</code> que alimenta cabeças de detecção e segmentação sem estourar a VRAM!
              </span>
            </div>
          )}

          <div style={{ fontWeight: 700, color: '#64748B', fontStyle: 'italic' }}>
            Passe o mouse sobre os estágios para inspecionar
          </div>
        </div>
      </div>
    </div>
  );
}
