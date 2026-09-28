import React, { useState } from 'react';
import MathView from '../MathView';

export default function ViTAttentionInspectorLab() {
  const [selectedLayer, setSelectedLayer] = useState(12); // 1, 6, 12
  const [selectedHead, setSelectedHead] = useState('mean'); // '1', '2', '3', '4', 'mean'
  const [opacity, setOpacity] = useState(0.65);
  const [sample, setSample] = useState('object'); // 'object', 'noisy', 'shortcut'

  // Metadata for layer behavior
  const layerInfo = {
    1: { name: 'Camada 1 (Inferior)', type: 'Bordas Locais', desc: 'Atenção difusa e concentrada em patches vizinhos imediatos, capturando contornos e frequências espaciais.' },
    6: { name: 'Camada 6 (Intermediária)', type: 'Partes de Objetos', desc: 'Agregação semântica parcial de peças (rodas, olhos, membros) conectando regiões distantes.' },
    12: { name: 'Camada 12 (Profunda)', type: 'Conceito Global [CLS]', desc: 'Atenção semântica de alto nível diretamente associada à classe discriminada no final da rede.' }
  };

  // Interpretation depending on selection
  let focusTitle = '';
  let focusDesc = '';
  let statusBadge = { label: 'Válido', class: 'badge-green', color: '#166534' };

  if (sample === 'shortcut') {
    focusTitle = 'Alerta: Atenção Espúria Detectada (Shortcut)';
    focusDesc = 'A cabeça foca intensamente no canto inferior direito onde há uma marca d’água / artefato de aquisição, ignorando o objeto principal.';
    statusBadge = { label: 'Vazamento / Atalho', class: 'badge-red', color: '#B91C1C' };
  } else if (selectedLayer === 1) {
    focusTitle = 'Atenção de Baixo Nível (Sintaxe Visual)';
    focusDesc = 'Distribuição isotrópica com dispersão em gradientes de cor e micro-texturas locais. Não reflete a classe ainda.';
    statusBadge = { label: 'Pré-Semântico', class: 'badge-cyan', color: '#0369A1' };
  } else if (selectedHead === '3') {
    focusTitle = 'Cabeça de Contexto de Fundo';
    focusDesc = 'Esta cabeça específica mapeia o ambiente circundante para contextualizar a cena em relação ao objeto.';
    statusBadge = { label: 'Contextual', class: 'badge-purple', color: '#7E22CE' };
  } else {
    focusTitle = 'Atenção Semântica Focalizada no Alvo';
    focusDesc = 'O token [CLS] pondera fortemente os patches correspondentes à anatomia/morfologia discriminante do objeto central.';
    statusBadge = { label: 'Fidelidade Alta', class: 'badge-green', color: '#166534' };
  }

  // Predefined heat patterns for 14x14 grid based on layer & sample
  // Generate coordinates for SVG circles to render a simulated heatmap
  const getHeatPoints = () => {
    if (sample === 'shortcut') {
      return [
        { x: 180, y: 180, r: 45, intensity: 0.95 },
        { x: 190, y: 190, r: 35, intensity: 1.0 },
        { x: 100, y: 100, r: 25, intensity: 0.2 }
      ];
    }
    if (selectedLayer === 1) {
      return [
        { x: 60, y: 60, r: 25, intensity: 0.5 },
        { x: 120, y: 70, r: 28, intensity: 0.6 },
        { x: 160, y: 140, r: 26, intensity: 0.5 },
        { x: 80, y: 170, r: 25, intensity: 0.6 },
        { x: 110, y: 110, r: 30, intensity: 0.5 }
      ];
    }
    if (selectedHead === '3') {
      // background
      return [
        { x: 40, y: 40, r: 45, intensity: 0.7 },
        { x: 180, y: 50, r: 40, intensity: 0.6 },
        { x: 50, y: 180, r: 42, intensity: 0.7 }
      ];
    }
    // High layer target focus
    return [
      { x: 110, y: 110, r: 55, intensity: 0.95 },
      { x: 115, y: 105, r: 40, intensity: 0.9 },
      { x: 90, y: 120, r: 35, intensity: 0.75 },
      { x: 130, y: 125, r: 35, intensity: 0.8 }
    ];
  };

  const heatPoints = getHeatPoints();

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {/* Top Banner */}
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
            padding: '3px 10px',
            borderRadius: '4px',
            fontFamily: 'var(--font-code)'
          }}>
            LAB INTERATIVO
          </span>
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--infnet-dark-blue)' }}>
            Inspetor de Mapas de Atenção do Vision Transformer (ViT-B/16)
          </span>
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            onClick={() => setSample('object')}
            className="btn-control"
            style={{ fontSize: '10.5px', padding: '4px 10px', background: sample === 'object' ? '#EFF6FF' : '#FFFFFF', color: '#1E40AF', border: '1px solid #93C5FD' }}
          >
            Objeto Saliente
          </button>
          <button
            onClick={() => setSample('noisy')}
            className="btn-control"
            style={{ fontSize: '10.5px', padding: '4px 10px', background: sample === 'noisy' ? '#EFF6FF' : '#FFFFFF', color: '#1E40AF', border: '1px solid #93C5FD' }}
          >
            Cena Complexa
          </button>
          <button
            onClick={() => setSample('shortcut')}
            className="btn-control"
            style={{ fontSize: '10.5px', padding: '4px 10px', background: sample === 'shortcut' ? '#FEF2F2' : '#FFFFFF', color: '#991B1B', border: '1px solid #FCA5A5' }}
          >
            ⚠️ Caso com Atalho
          </button>
        </div>
      </div>

      {/* Main Grid: Controls + Visualizer + Diagnostic */}
      <div style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '290px 1fr 310px',
        gap: '12px',
        minHeight: 0
      }}>
        {/* Left Column: Controls */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid var(--border-light)',
          borderRadius: '12px',
          padding: '14px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div>
            <span style={{ fontSize: '12px', fontWeight: 800, color: '#0A345D' }}>
              Configuração da Auditoria
            </span>

            {/* Layer Selector */}
            <div style={{ marginTop: '10px', marginBottom: '14px' }}>
              <span style={{ fontSize: '11px', fontWeight: 600, color: '#1E293B', display: 'block', marginBottom: '6px' }}>
                1. Profundidade do Encoder:
              </span>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px' }}>
                {[1, 6, 12].map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setSelectedLayer(lvl)}
                    style={{
                      padding: '6px 4px',
                      fontSize: '10px',
                      fontWeight: 700,
                      borderRadius: '6px',
                      border: selectedLayer === lvl ? '2px solid #0284C7' : '1px solid #CBD5E1',
                      background: selectedLayer === lvl ? '#F0F9FF' : '#F8FAFC',
                      color: selectedLayer === lvl ? '#0369A1' : '#475569',
                      cursor: 'pointer'
                    }}
                  >
                    Camada {lvl}
                  </button>
                ))}
              </div>
              <span style={{ fontSize: '9px', color: '#64748B', marginTop: '4px', display: 'block' }}>
                {layerInfo[selectedLayer].name} — {layerInfo[selectedLayer].type}
              </span>
            </div>

            {/* Head Selector */}
            <div style={{ marginBottom: '14px' }}>
              <span style={{ fontSize: '11px', fontWeight: 600, color: '#1E293B', display: 'block', marginBottom: '6px' }}>
                2. Cabeça de Atenção (Head):
              </span>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '4px' }}>
                {['1', '2', '3', '4', 'mean'].map((h) => (
                  <button
                    key={h}
                    onClick={() => setSelectedHead(h)}
                    style={{
                      padding: '6px 2px',
                      fontSize: '10px',
                      fontWeight: 700,
                      borderRadius: '6px',
                      border: selectedHead === h ? '2px solid #7C3AED' : '1px solid #CBD5E1',
                      background: selectedHead === h ? '#FAF5FF' : '#F8FAFC',
                      color: selectedHead === h ? '#6B21A8' : '#475569',
                      cursor: 'pointer'
                    }}
                  >
                    {h === 'mean' ? 'Média' : `H${h}`}
                  </button>
                ))}
              </div>
              <span style={{ fontSize: '9px', color: '#64748B', marginTop: '4px', display: 'block' }}>
                {selectedHead === 'mean' ? 'Attention Rollout (todas as 12 cabeças)' : `Head isolada ${selectedHead}`}
              </span>
            </div>

            {/* Opacity Slider */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}>
                <span style={{ fontWeight: 600, color: '#1E293B' }}>Opacidade da Sobreposição:</span>
                <span style={{ fontFamily: 'var(--font-code)', fontWeight: 700, color: '#0A345D' }}>
                  {Math.round(opacity * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0.1"
                max="1.0"
                step="0.05"
                value={opacity}
                onChange={(e) => setOpacity(parseFloat(e.target.value))}
                style={{ width: '100%', accentColor: '#0A345D' }}
              />
            </div>
          </div>

          <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '8px 10px', fontSize: '9.5px', color: '#475569' }}>
            💡 Inspecionar cabeças individuais revela se o modelo divide o trabalho (ex: H1 bordas, H2 semântica central, H3 contexto).
          </div>
        </div>

        {/* Center Column: Visual Map Overlay */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid var(--border-light)',
          borderRadius: '12px',
          padding: '12px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: 800, color: '#0A345D' }}>
              Visualização Espacial dos 196 Patches (14 × 14)
            </span>
            <span style={{ fontSize: '10px', fontFamily: 'var(--font-code)', color: '#64748B' }}>
              Resolução: 224 × 224
            </span>
          </div>

          <div style={{
            flex: 1,
            position: 'relative',
            background: '#F1F5F9',
            borderRadius: '8px',
            border: '1px solid #CBD5E1',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {/* SVG Canvas rendering mock scene and heat overlay */}
            <svg viewBox="0 0 224 224" style={{ width: '260px', height: '260px', background: '#E2E8F0' }}>
              <defs>
                <radialGradient id="heatGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#EF4444" stopOpacity={opacity} />
                  <stop offset="50%" stopColor="#F59E0B" stopOpacity={opacity * 0.7} />
                  <stop offset="85%" stopColor="#3B82F6" stopOpacity={opacity * 0.3} />
                  <stop offset="100%" stopColor="#1E3A8A" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Base synthetic image shapes */}
              {sample === 'object' && (
                <g>
                  <circle cx="112" cy="112" r="45" fill="#64748B" opacity="0.6" />
                  <rect x="90" y="85" width="44" height="54" rx="6" fill="#334155" opacity="0.8" />
                  <circle cx="112" cy="112" r="15" fill="#0A345D" />
                </g>
              )}

              {sample === 'noisy' && (
                <g>
                  <rect x="30" y="40" width="60" height="70" fill="#94A3B8" opacity="0.5" />
                  <circle cx="140" cy="130" r="40" fill="#475569" opacity="0.7" />
                  <polygon points="120,40 180,40 150,90" fill="#64748B" opacity="0.6" />
                </g>
              )}

              {sample === 'shortcut' && (
                <g>
                  <circle cx="90" cy="90" r="35" fill="#64748B" opacity="0.5" />
                  {/* Artifact watermark on bottom right */}
                  <rect x="160" y="160" width="50" height="50" rx="4" fill="#E2E8F0" stroke="#DC2626" strokeWidth="2" strokeDasharray="3 3" />
                  <text x="165" y="190" fontSize="10" fill="#DC2626" fontWeight="bold">TAG #1</text>
                </g>
              )}

              {/* Grid 14x14 overlay (subtle) */}
              {Array.from({ length: 14 }).map((_, i) => (
                <line key={`v-${i}`} x1={i * 16} y1={0} x2={i * 16} y2={224} stroke="rgba(255,255,255,0.25)" strokeWidth="0.5" />
              ))}
              {Array.from({ length: 14 }).map((_, i) => (
                <line key={`h-${i}`} x1={0} y1={i * 16} x2={224} y2={i * 16} stroke="rgba(255,255,255,0.25)" strokeWidth="0.5" />
              ))}

              {/* Attention Heat Blobs */}
              {heatPoints.map((pt, idx) => (
                <circle
                  key={idx}
                  cx={pt.x}
                  cy={pt.y}
                  r={pt.r}
                  fill="url(#heatGrad)"
                />
              ))}
            </svg>
          </div>
        </div>

        {/* Right Column: Diagnostic & Technical Analysis */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid var(--border-light)',
          borderRadius: '12px',
          padding: '14px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: 800, color: '#0A345D' }}>
                Diagnóstico de Atenção
              </span>
              <span className={`badge ${statusBadge.class}`} style={{ fontSize: '9.5px' }}>
                {statusBadge.label}
              </span>
            </div>

            <div style={{ background: '#F8FAFC', border: `1px solid ${statusBadge.color}35`, borderRadius: '8px', padding: '10px', marginBottom: '10px' }}>
              <strong style={{ fontSize: '11px', color: statusBadge.color, display: 'block', marginBottom: '4px' }}>
                {focusTitle}
              </strong>
              <p style={{ fontSize: '10px', color: '#334155', margin: 0, lineHeight: '1.45' }}>
                {focusDesc}
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ background: '#F1F5F9', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '6px 10px', display: 'flex', justifyContent: 'space-between', fontSize: '10px' }}>
                <span style={{ color: '#475569' }}>Entropia de Atenção:</span>
                <span style={{ fontFamily: 'var(--font-code)', fontWeight: 700, color: '#0A345D' }}>
                  {selectedLayer === 1 ? '5.12 nats (Alta/Difusa)' : '1.84 nats (Focalizada)'}
                </span>
              </div>
              <div style={{ background: '#F1F5F9', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '6px 10px', display: 'flex', justifyContent: 'space-between', fontSize: '10px' }}>
                <span style={{ color: '#475569' }}>Patches Acima de 2σ:</span>
                <span style={{ fontFamily: 'var(--font-code)', fontWeight: 700, color: '#0A345D' }}>
                  {sample === 'shortcut' ? '6 / 196 (Canto Inf)' : '24 / 196 (Centroide)'}
                </span>
              </div>
            </div>
          </div>

          <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: '8px', padding: '8px 10px', fontSize: '9.5px', color: '#92400E' }}>
            📝 <strong>Requisito do Projeto:</strong> Documente e interprete por escrito o que os attention weights de ao menos uma cabeça revelam no seu domínio de aplicação.
          </div>
        </div>
      </div>
    </div>
  );
}
