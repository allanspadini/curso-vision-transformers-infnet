import React, { useState } from 'react';
import MathView from '../MathView';
import { Activity, Fingerprint, CheckCircle2, Navigation, AlertTriangle, ShieldCheck, Eye, RefreshCw, Sliders } from 'lucide-react';
import { getAssetPath } from '../../utils/assetHelper';

export default function ObjectTrackingVisualizer() {
  const [activeMode, setActiveMode] = useState('deepsort'); // 'naive' | 'deepsort' | 'kalman_only'

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 1.25fr', gap: '14px', height: '100%', alignItems: 'stretch' }}>
      
      {/* ========================================================================= */}
      {/* 1. LEFT: CAMERA VIEWPORT WITH CAT OCCLUDED BY POLE                        */}
      {/* ========================================================================= */}
      <div style={{
        background: '#FFFFFF',
        border: '1px solid var(--border-light)',
        borderRadius: '10px',
        padding: '12px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: 'var(--shadow-sm)'
      }}>
        {/* Header Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Navigation size={15} color="var(--infnet-cyan)" />
            <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
              Câmera de Monitoramento • Frame #148
            </span>
          </div>
          <span className="badge badge-cyan" style={{ fontSize: '10px' }}>30 FPS • Ao Vivo</span>
        </div>

        {/* Video Viewport */}
        <div style={{
          position: 'relative',
          width: '100%',
          flex: 1,
          minHeight: '270px',
          borderRadius: '8px',
          overflow: 'hidden',
          border: '1px solid #CBD5E1',
          background: '#0F172A',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {/* Photo: Cat peeking behind the wooden pole */}
          <img
            src={getAssetPath('cat_tracking.jpg')}
            alt="Gato se escondendo atrás de poste sendo rastreado"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block'
            }}
          />

          {/* Top HUD Stats */}
          <div style={{
            position: 'absolute',
            top: 8,
            left: 8,
            background: 'rgba(6, 31, 56, 0.85)',
            color: '#FFFFFF',
            fontSize: '9.5px',
            padding: '3px 8px',
            borderRadius: '4px',
            border: '1px solid rgba(27, 181, 216, 0.4)',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22C55E', display: 'inline-block' }} />
            <span>STREAM: TRACKER_ONLINE</span>
          </div>

          <div style={{
            position: 'absolute',
            top: 8,
            right: 8,
            background: 'rgba(6, 31, 56, 0.85)',
            color: '#E2E8F0',
            fontSize: '9.5px',
            fontFamily: 'var(--font-code)',
            padding: '3px 8px',
            borderRadius: '4px',
            zIndex: 10
          }}>
            t = 4.93s [Frame 148]
          </div>

          {/* Trajectory Trail (Past positions t-3, t-2, t-1) */}
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 3 }}>
            {/* Motion trajectory curve from bottom left approaching pole */}
            <path
              d="M 60 250 Q 110 220, 160 200 T 230 180"
              fill="none"
              stroke="#1BB5D8"
              strokeWidth="2.5"
              strokeDasharray="4 4"
              opacity="0.85"
            />
            <circle cx="60" cy="250" r="3.5" fill="#1BB5D8" />
            <circle cx="120" cy="215" r="3.5" fill="#1BB5D8" />
            <circle cx="175" cy="195" r="4" fill="#64D9EF" />
            <text x="70" y="260" fill="#64D9EF" fontSize="9" fontWeight="700">t-3</text>
            <text x="130" y="225" fill="#64D9EF" fontSize="9" fontWeight="700">t-2</text>
            <text x="185" y="205" fill="#64D9EF" fontSize="9" fontWeight="700">t-1</text>
          </svg>

          {/* ======================================================== */}
          {/* TRACKING BOXES BASED ON ACTIVE MODE                      */}
          {/* ======================================================== */}

          {/* NAIVE DETECTION MODE (Detection fails / ID Switch) */}
          {activeMode === 'naive' && (
            <>
              {/* Only partial head detected, assigned wrong ID or fragmented */}
              <div style={{
                position: 'absolute',
                top: '36%',
                left: '42%',
                width: '24%',
                height: '26%',
                border: '2.5px solid #EF4444',
                background: 'rgba(239, 68, 68, 0.15)',
                borderRadius: '4px',
                zIndex: 6
              }}>
                <div style={{
                  position: 'absolute',
                  top: '-22px',
                  left: 0,
                  background: '#EF4444',
                  color: '#FFFFFF',
                  fontSize: '10px',
                  fontWeight: 800,
                  padding: '2px 6px',
                  borderRadius: '3px',
                  whiteSpace: 'nowrap'
                }}>
                  ❌ Novo ID #42? (Confiança Baixa: 51%)
                </div>
              </div>

              {/* Warning HUD */}
              <div style={{
                position: 'absolute',
                bottom: 10,
                left: 10,
                right: 10,
                background: 'rgba(239, 68, 68, 0.92)',
                color: '#FFFFFF',
                padding: '6px 10px',
                borderRadius: '6px',
                fontSize: '10.5px',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                zIndex: 10
              }}>
                <AlertTriangle size={14} />
                <span>Detector puro perdeu o corpo atrás do poste! Gerou um ID Switch incorreto.</span>
              </div>
            </>
          )}

          {/* DEEPSORT MODE (Successful Persistent Tracking with Kalman + ReID) */}
          {activeMode === 'deepsort' && (
            <>
              {/* Full Predicted Body Bbox (Spanning behind the pole) */}
              <div style={{
                position: 'absolute',
                top: '34%',
                left: '6%',
                width: '58%',
                height: '62%',
                border: '2.5px solid #22C55E',
                background: 'rgba(34, 197, 94, 0.12)',
                borderRadius: '5px',
                boxShadow: '0 0 16px rgba(34, 197, 94, 0.5), inset 0 0 8px rgba(34, 197, 94, 0.15)',
                zIndex: 5
              }}>
                {/* Corner reticles */}
                <div style={{ position: 'absolute', top: -3, left: -3, width: 8, height: 8, borderTop: '3px solid #86EFAC', borderLeft: '3px solid #86EFAC' }} />
                <div style={{ position: 'absolute', top: -3, right: -3, width: 8, height: 8, borderTop: '3px solid #86EFAC', borderRight: '3px solid #86EFAC' }} />
                <div style={{ position: 'absolute', bottom: -3, left: -3, width: 8, height: 8, borderBottom: '3px solid #86EFAC', borderLeft: '3px solid #86EFAC' }} />
                <div style={{ position: 'absolute', bottom: -3, right: -3, width: 8, height: 8, borderBottom: '3px solid #86EFAC', borderRight: '3px solid #86EFAC' }} />

                {/* Main Persistent ID Tag */}
                <div style={{
                  position: 'absolute',
                  top: '-26px',
                  left: '0px',
                  background: 'linear-gradient(90deg, #15803D 0%, #166534 100%)',
                  color: '#FFFFFF',
                  fontSize: '11px',
                  fontWeight: 800,
                  padding: '3px 8px',
                  borderRadius: '4px',
                  border: '1px solid #86EFAC',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.35)',
                  whiteSpace: 'nowrap'
                }}>
                  <ShieldCheck size={13} color="#86EFAC" />
                  <span>ID #07 [GATO] • ATIVO</span>
                  <span style={{ background: '#22C55E', color: '#052E16', fontSize: '9.5px', padding: '0 4px', borderRadius: '3px', fontWeight: 900 }}>
                    ReID 94.2%
                  </span>
                </div>

                {/* Occlusion Indicator over the Pole */}
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  left: '28%',
                  width: '38%',
                  height: '80%',
                  border: '1.5px dashed #F59E0B',
                  background: 'rgba(245, 158, 11, 0.18)',
                  borderRadius: '4px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '4px',
                  textAlign: 'center'
                }}>
                  <span style={{ fontSize: '9px', fontWeight: 800, color: '#FEF3C7', background: 'rgba(180, 83, 9, 0.9)', padding: '1px 5px', borderRadius: '3px' }}>
                    Oclusão: Poste
                  </span>
                  <span style={{ fontSize: '8px', color: '#FEF3C7', marginTop: '2px', fontWeight: 600 }}>
                    Kalman prevê corpo oculto
                  </span>
                </div>

                {/* Coordinates HUD */}
                <div style={{
                  position: 'absolute',
                  bottom: '4px',
                  right: '4px',
                  background: 'rgba(6, 31, 56, 0.85)',
                  color: '#A7F3D0',
                  fontFamily: 'var(--font-code)',
                  fontSize: '9px',
                  padding: '2px 6px',
                  borderRadius: '3px',
                  border: '1px solid rgba(34, 197, 94, 0.4)'
                }}>
                  vel: 1.2 m/s • dir: ↗
                </div>
              </div>

              {/* Bottom Success Banner */}
              <div style={{
                position: 'absolute',
                bottom: 8,
                left: 8,
                right: 8,
                background: 'rgba(10, 52, 93, 0.92)',
                border: '1px solid #1BB5D8',
                color: '#FFFFFF',
                padding: '6px 10px',
                borderRadius: '6px',
                fontSize: '10.5px',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                zIndex: 10
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={14} color="#64D9EF" />
                  <span>Associação DeepSORT: Mantido <strong>ID #07</strong> com sucesso!</span>
                </div>
                <span style={{ color: '#64D9EF', fontSize: '9.5px', fontWeight: 700 }}>Zero ID Switches</span>
              </div>
            </>
          )}

          {/* KALMAN ONLY MODE */}
          {activeMode === 'kalman_only' && (
            <>
              <div style={{
                position: 'absolute',
                top: '34%',
                left: '6%',
                width: '58%',
                height: '62%',
                border: '2px dashed #0284C7',
                background: 'rgba(2, 132, 199, 0.12)',
                borderRadius: '5px',
                zIndex: 5
              }}>
                <div style={{
                  position: 'absolute',
                  top: '-22px',
                  left: 0,
                  background: '#0284C7',
                  color: '#FFFFFF',
                  fontSize: '10px',
                  fontWeight: 700,
                  padding: '2px 6px',
                  borderRadius: '3px'
                }}>
                  Estimativa Cinemática: Kalman [x, y, v_x, v_y]
                </div>
              </div>

              <div style={{
                position: 'absolute',
                bottom: 8,
                left: 8,
                right: 8,
                background: 'rgba(2, 132, 199, 0.92)',
                color: '#FFFFFF',
                padding: '6px 10px',
                borderRadius: '6px',
                fontSize: '10.5px',
                fontWeight: 600,
                zIndex: 10
              }}>
                ℹ️ Kalman estima a física da trajetória, mas precisa da ReID para confirmar a identidade.
              </div>
            </>
          )}
        </div>

        {/* Mode Selector Buttons */}
        <div style={{ display: 'flex', gap: '6px', marginTop: '8px' }}>
          <button
            onClick={() => setActiveMode('deepsort')}
            style={{
              flex: 1,
              padding: '5px 6px',
              borderRadius: '6px',
              border: '1px solid',
              borderColor: activeMode === 'deepsort' ? '#22C55E' : '#CBD5E1',
              background: activeMode === 'deepsort' ? '#F0FDF4' : '#F8FAFC',
              color: activeMode === 'deepsort' ? '#15803D' : 'var(--text-main)',
              fontSize: '10.5px',
              fontWeight: activeMode === 'deepsort' ? 700 : 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px'
            }}
          >
            <ShieldCheck size={12} />
            <span>DeepSORT Completo</span>
          </button>

          <button
            onClick={() => setActiveMode('naive')}
            style={{
              flex: 1,
              padding: '5px 6px',
              borderRadius: '6px',
              border: '1px solid',
              borderColor: activeMode === 'naive' ? '#EF4444' : '#CBD5E1',
              background: activeMode === 'naive' ? '#FEF2F2' : '#F8FAFC',
              color: activeMode === 'naive' ? '#B91C1C' : 'var(--text-main)',
              fontSize: '10.5px',
              fontWeight: activeMode === 'naive' ? 700 : 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px'
            }}
          >
            <AlertTriangle size={12} />
            <span>Sem Tracking (Detecção Pura)</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. RIGHT: THE 3 PILLARS OF DEEPSORT EXPLAINED                            */}
      {/* ========================================================================= */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        height: '100%',
        justifyContent: 'space-between'
      }}>
        {/* Pillar 1: Kalman Filter */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid var(--border-light)',
          borderRadius: '8px',
          padding: '10px 12px',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
              <Activity size={14} color="var(--infnet-cyan)" />
              <span>1. Estimativa Cinemática: Filtro de Kalman</span>
            </div>
            <span className="badge badge-blue" style={{ fontSize: '9.5px' }}>Trajetória Espacial</span>
          </div>
          <p style={{ fontSize: '11px', color: 'var(--text-main)', lineHeight: 1.4, margin: '2px 0 4px 0' }}>
            Modela posição [x, y], proporção de aspecto e velocidades lineares [v_x, v_y]. Prediz onde o gato estará no próximo instante mesmo quando oculto pelo poste.
          </p>
          <div style={{ background: '#F0F7FD', padding: '4px 8px', borderRadius: '4px', fontSize: '10px', color: '#0369A1', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Métrica Espacial (Mahalanobis):</span>
            <MathView math={'d^{(1)}(i, j) \\le t^{(1)}'} />
          </div>
        </div>

        {/* Pillar 2: Visual ReID CNN */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid var(--border-light)',
          borderRadius: '8px',
          padding: '10px 12px',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
              <Fingerprint size={14} color="var(--infnet-purple)" />
              <span>2. Re-Identificação Visual (ReID Embedding)</span>
            </div>
            <span className="badge badge-cyan" style={{ fontSize: '9.5px' }}>Assinatura Visual</span>
          </div>
          <p style={{ fontSize: '11px', color: 'var(--text-main)', lineHeight: 1.4, margin: '2px 0 4px 0' }}>
            CNN siamesa extrai um vetor compacto de 128 dimensões da pelagem/face do gato. Compara a similaridade de cosseno com a galeria dos últimos 100 frames.
          </p>
          <div style={{ background: '#FAF5FF', border: '1px solid #F3E8FF', padding: '4px 8px', borderRadius: '4px', fontSize: '10px', color: '#7E22CE', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Similaridade Cosseno:</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <MathView math={'r_j^T r_k^{(i)} \\ge 0.85'} />
              <strong>(Match: 94.2% ✅)</strong>
            </div>
          </div>
        </div>

        {/* Pillar 3: Hungarian Algorithm */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid var(--border-light)',
          borderRadius: '8px',
          padding: '10px 12px',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
              <CheckCircle2 size={14} color="var(--infnet-green-accent)" />
              <span>3. Associação Ótima: Algoritmo Húngaro</span>
            </div>
            <span className="badge badge-green" style={{ fontSize: '9.5px' }}>Atribuição 1-para-1</span>
          </div>
          <p style={{ fontSize: '11px', color: 'var(--text-main)', lineHeight: 1.4, margin: '2px 0 4px 0' }}>
            Combina proximidade cinemática + aparência visual em uma matriz de custo ponderada. Resolve o problema de atribuição linear em tempo polinomial.
          </p>
          <div style={{ background: '#F0FDF4', border: '1px solid #DCFCE7', padding: '4px 8px', borderRadius: '4px', fontSize: '10.5px', color: '#166534', textAlign: 'center' }}>
            <MathView math={'C_{i,j} = \\lambda \\cdot D_{\\text{Kalman}} + (1 - \\lambda) \\cdot D_{\\text{ReID}}'} />
          </div>
        </div>

        {/* Takeaway Callout */}
        <div style={{
          background: 'linear-gradient(90deg, #EFF8FC 0%, #E0F2FE 100%)',
          border: '1px solid #BAE6FD',
          borderRadius: '8px',
          padding: '8px 12px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '11px',
          color: 'var(--infnet-dark-blue)'
        }}>
          <span style={{ fontSize: '14px' }}>🐱</span>
          <span>
            <strong>Resultado Prático:</strong> Mesmo que o gato fique 80% oculto atrás do poste por vários frames, o DeepSORT preserva o <strong>ID #07</strong> sem alternância de identificação.
          </span>
        </div>
      </div>
    </div>
  );
}
