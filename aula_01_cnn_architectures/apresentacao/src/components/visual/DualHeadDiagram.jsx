import React, { useState } from 'react';
import MathView from '../MathView';
import { Crosshair, Eye, Target, ArrowRight, Layers, CheckCircle2, Sliders, Sparkles } from 'lucide-react';
import { getAssetPath } from '../../utils/assetHelper';

export default function DualHeadDiagram() {
  const [showIoUComparison, setShowIoUComparison] = useState(false);

  // Bounding box coordinates normalized [x, y, w, h]
  const predBox = { left: '26%', top: '9%', width: '48%', height: '83%' };
  const groundTruthBox = { left: '28%', top: '10%', width: '45%', height: '81%' };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr 1.35fr', gap: '14px', height: '100%', alignItems: 'stretch' }}>
      
      {/* ========================================================================= */}
      {/* 1. INPUT IMAGE WITH CAT & BOUNDING BOX                                    */}
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Target size={15} color="var(--infnet-cyan)" />
            <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
              1. Imagem de Entrada
            </span>
          </div>
          <span className="badge badge-cyan" style={{ fontSize: '10px' }}>Tensor [3, 224, 224]</span>
        </div>

        {/* Cat Image Viewport with Bounding Box Overlay */}
        <div style={{
          position: 'relative',
          width: '100%',
          flex: 1,
          minHeight: '260px',
          borderRadius: '8px',
          overflow: 'hidden',
          border: '1px solid #CBD5E1',
          background: '#0F172A',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {/* Photo of the Cat */}
          <img
            src={getAssetPath('cat_sample.jpg')}
            alt="Gato para classificação e localização"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block'
            }}
          />

          {/* Ground Truth Bbox (Visible when toggled) */}
          {showIoUComparison && (
            <div style={{
              position: 'absolute',
              top: groundTruthBox.top,
              left: groundTruthBox.left,
              width: groundTruthBox.width,
              height: groundTruthBox.height,
              border: '2px dashed #22C55E',
              backgroundColor: 'rgba(34, 197, 94, 0.15)',
              borderRadius: '4px',
              pointerEvents: 'none',
              zIndex: 3
            }}>
              <span style={{
                position: 'absolute',
                bottom: '-20px',
                right: '0',
                background: '#22C55E',
                color: '#FFFFFF',
                fontSize: '9.5px',
                fontWeight: 700,
                padding: '1px 5px',
                borderRadius: '3px',
                whiteSpace: 'nowrap'
              }}>
                Ground Truth (Real)
              </span>
            </div>
          )}

          {/* Predicted Bounding Box Overlay */}
          <div style={{
            position: 'absolute',
            top: predBox.top,
            left: predBox.left,
            width: predBox.width,
            height: predBox.height,
            border: '2.5px solid #1BB5D8',
            backgroundColor: showIoUComparison ? 'rgba(27, 181, 216, 0.22)' : 'rgba(27, 181, 216, 0.18)',
            borderRadius: '4px',
            boxShadow: '0 0 14px rgba(27, 181, 216, 0.6), inset 0 0 8px rgba(27, 181, 216, 0.2)',
            zIndex: 4,
            pointerEvents: 'none',
            transition: 'all 0.2s ease'
          }}>
            {/* Corner Target Markers */}
            <div style={{ position: 'absolute', top: -3, left: -3, width: 8, height: 8, borderTop: '3px solid #64D9EF', borderLeft: '3px solid #64D9EF' }} />
            <div style={{ position: 'absolute', top: -3, right: -3, width: 8, height: 8, borderTop: '3px solid #64D9EF', borderRight: '3px solid #64D9EF' }} />
            <div style={{ position: 'absolute', bottom: -3, left: -3, width: 8, height: 8, borderBottom: '3px solid #64D9EF', borderLeft: '3px solid #64D9EF' }} />
            <div style={{ position: 'absolute', bottom: -3, right: -3, width: 8, height: 8, borderBottom: '3px solid #64D9EF', borderRight: '3px solid #64D9EF' }} />

            {/* Classification & Confidence Tag */}
            <div style={{
              position: 'absolute',
              top: '-24px',
              left: '-2px',
              background: 'linear-gradient(90deg, var(--infnet-dark-blue) 0%, #0E4E8A 100%)',
              color: '#FFFFFF',
              fontSize: '11px',
              fontWeight: 800,
              padding: '2px 7px',
              borderRadius: '4px',
              border: '1px solid var(--infnet-cyan)',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
              whiteSpace: 'nowrap'
            }}>
              <span>🐱 Gato</span>
              <span style={{ color: '#64D9EF', fontWeight: 700 }}>97.4%</span>
            </div>

            {/* Coordinates HUD */}
            <div style={{
              position: 'absolute',
              bottom: '4px',
              left: '4px',
              background: 'rgba(6, 31, 56, 0.85)',
              color: '#CBD5E1',
              fontFamily: 'var(--font-code)',
              fontSize: '9px',
              padding: '2px 5px',
              borderRadius: '3px',
              border: '1px solid rgba(27, 181, 216, 0.4)'
            }}>
              [x:0.28, y:0.10, w:0.48, h:0.82]
            </div>
          </div>

          {/* Top HUD Overlay */}
          <div style={{
            position: 'absolute',
            top: 6,
            right: 6,
            background: 'rgba(6, 31, 56, 0.8)',
            color: '#94A3B8',
            fontSize: '9.5px',
            padding: '2px 6px',
            borderRadius: '4px',
            zIndex: 5
          }}>
            CAM_INFERENCE • RGB
          </div>
        </div>

        {/* Toggle Mode Button */}
        <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
          <button
            onClick={() => setShowIoUComparison(!showIoUComparison)}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '5px',
              padding: '5px 8px',
              borderRadius: '6px',
              border: '1px solid',
              borderColor: showIoUComparison ? 'var(--infnet-green-accent)' : '#CBD5E1',
              background: showIoUComparison ? '#F0FDF4' : '#F8FAFC',
              color: showIoUComparison ? '#15803D' : 'var(--infnet-dark-blue)',
              fontSize: '10.5px',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            <Sliders size={12} />
            {showIoUComparison ? 'Ocultar Ground Truth' : 'Comparar IoU com Ground Truth'}
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. SHARED BACKBONE PIPELINE                                               */}
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Layers size={15} color="var(--infnet-dark-blue)" />
            <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
              2. Backbone ResNet
            </span>
          </div>
          <span className="badge badge-blue" style={{ fontSize: '10px' }}>Compartilhado</span>
        </div>

        {/* Backbone Flow Diagram */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', margin: '6px 0' }}>
          {/* Conv Block 1 */}
          <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '6px 10px', borderRadius: '6px', fontSize: '11px', textAlign: 'center' }}>
            <div style={{ fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>Stem + Residual Blocks</div>
            <div style={{ fontSize: '9.5px', color: 'var(--text-muted)' }}>Convoluções 7x7, 3x3 + MaxPool</div>
          </div>

          <div style={{ textAlign: 'center', color: '#94A3B8', fontSize: '11px', lineHeight: 1 }}>↓</div>

          {/* Residual Stages */}
          <div style={{ background: '#F0F7FD', border: '1px solid #BAE6FD', padding: '6px 10px', borderRadius: '6px', fontSize: '11px', textAlign: 'center' }}>
            <div style={{ fontWeight: 700, color: '#0369A1' }}>Estágios Residuais (1 a 4)</div>
            <div style={{ fontSize: '9.5px', color: '#0284C7' }}>Mapas espaciais 7x7 x 512 canais</div>
          </div>

          <div style={{ textAlign: 'center', color: '#94A3B8', fontSize: '11px', lineHeight: 1 }}>↓</div>

          {/* GAP */}
          <div style={{ background: '#EFF8FC', border: '1px solid #CDE6F5', padding: '6px 10px', borderRadius: '6px', fontSize: '11px', textAlign: 'center' }}>
            <div style={{ fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>Global Average Pooling (GAP)</div>
            <div style={{ fontSize: '9.5px', color: 'var(--text-muted)' }}>Achata tensor 7x7 para vetor 1D</div>
          </div>

          <div style={{ textAlign: 'center', color: '#94A3B8', fontSize: '11px', lineHeight: 1 }}>↓</div>

          {/* Shared Latent Vector */}
          <div style={{
            background: 'linear-gradient(135deg, #0A345D 0%, #082847 100%)',
            color: '#FFFFFF',
            padding: '8px 10px',
            borderRadius: '6px',
            textAlign: 'center',
            boxShadow: '0 2px 6px rgba(10,52,93,0.2)'
          }}>
            <div style={{ fontSize: '10px', color: '#64D9EF', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Vetor de Features Latente
            </div>
            <div style={{ fontFamily: 'var(--font-code)', fontSize: '12.5px', fontWeight: 800, marginTop: '2px' }}>
              [512 dimensões]
            </div>
          </div>
        </div>

        {/* Note */}
        <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '6px 8px', borderRadius: '6px', fontSize: '10px', color: 'var(--text-muted)', textAlign: 'center' }}>
          💡 Um único forward pass extrai representação rica para ambas as tarefas.
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. DUAL HEADS & MULTITASK LOSS                                            */}
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Eye size={15} color="var(--infnet-dark-blue)" />
            <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
              3. Dupla Cabeça + Perdas
            </span>
          </div>
          <span className="badge badge-cyan" style={{ fontSize: '10px' }}>Multitarefa</span>
        </div>

        {/* 2 Parallel Specialized Heads */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', margin: '4px 0' }}>
          
          {/* Head 1: Classification */}
          <div style={{ background: '#F0FDF4', border: '1px solid #DCFCE7', borderRadius: '6px', padding: '8px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', fontWeight: 700, color: '#166534' }}>
                <Eye size={13} /> Cabeça 1: Classe ("O quê?")
              </div>
              <div style={{ fontSize: '9.5px', color: 'var(--text-muted)', marginTop: '2px' }}>Linear(512, C) → Softmax</div>
              
              {/* Class probabilities */}
              <div style={{ marginTop: '6px', display: 'flex', flexDirection: 'column', gap: '3px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', fontWeight: 700, color: '#15803D' }}>
                  <span>🐱 Gato:</span>
                  <span>97.4%</span>
                </div>
                <div style={{ height: '4px', background: '#DCFCE7', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ width: '97.4%', height: '100%', background: '#22C55E' }} />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', color: '#64748B', marginTop: '2px' }}>
                  <span>🐶 Cão:</span>
                  <span>1.8%</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', color: '#64748B' }}>
                  <span>🦜 Pássaro:</span>
                  <span>0.8%</span>
                </div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid #DCFCE7', paddingTop: '4px', marginTop: '6px', textAlign: 'center' }}>
              <div style={{ fontSize: '9px', color: '#166534', fontWeight: 600 }}>Cross-Entropy Loss:</div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#15803D' }}>
                <MathView math="\mathcal{L}_{CE} = -\sum y_i \log(\hat{y}_i)" />
              </div>
            </div>
          </div>

          {/* Head 2: Regression (Localization) */}
          <div style={{ background: '#FFF7ED', border: '1px solid #FFEDD5', borderRadius: '6px', padding: '8px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', fontWeight: 700, color: '#9A3412' }}>
                <Crosshair size={13} /> Cabeça 2: BBox ("Onde?")
              </div>
              <div style={{ fontSize: '9.5px', color: 'var(--text-muted)', marginTop: '2px' }}>Linear(512, 4) → Regressão</div>

              {/* Coordinates predicted */}
              <div style={{ marginTop: '6px', background: '#FFEDD5', padding: '4px 6px', borderRadius: '4px', fontSize: '9.5px', fontFamily: 'var(--font-code)', color: '#9A3412', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px' }}>
                <div>x: <strong>0.28</strong></div>
                <div>y: <strong>0.10</strong></div>
                <div>w: <strong>0.48</strong></div>
                <div>h: <strong>0.82</strong></div>
              </div>
              
              <div style={{ fontSize: '9px', color: '#C2410C', marginTop: '4px', textAlign: 'center' }}>
                Normalizado entre [0.0, 1.0]
              </div>
            </div>

            <div style={{ borderTop: '1px solid #FFEDD5', paddingTop: '4px', marginTop: '6px', textAlign: 'center' }}>
              <div style={{ fontSize: '9px', color: '#9A3412', fontWeight: 600 }}>Smooth L1 Loss:</div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#EA580C' }}>
                <MathView math="\mathcal{L}_{\text{Smooth L1}}(\text{box}, \hat{\text{box}})" />
              </div>
            </div>
          </div>
        </div>

        {/* Global Multi-task Loss & IoU Metric */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '6px' }}>
          <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '6px 8px', textAlign: 'center' }}>
            <div style={{ fontSize: '9.5px', color: 'var(--text-muted)', fontWeight: 600 }}>Função de Custo Total (Multitarefa):</div>
            <div style={{ fontSize: '11px', marginTop: '2px' }}>
              <MathView math="\mathcal{L}_{\text{total}} = \mathcal{L}_{\text{CE}} + \lambda \cdot \mathcal{L}_{\text{Smooth L1}}" />
            </div>
          </div>

          <div style={{ background: '#EFF8FC', border: '1px solid #CDE6F5', borderRadius: '6px', padding: '6px 8px', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ fontSize: '9.5px', color: 'var(--infnet-dark-blue)', fontWeight: 700 }}>Métrica IoU:</div>
            <div style={{ fontSize: '10.5px', fontWeight: 800, color: '#0369A1', marginTop: '1px' }}>
              IoU = 0.91 <span style={{ fontSize: '9px', color: '#15803D' }}>(≥ 0.50 ✅)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
