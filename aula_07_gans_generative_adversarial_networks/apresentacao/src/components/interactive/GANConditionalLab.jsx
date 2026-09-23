import React, { useState } from 'react';
import { Sliders, RefreshCw, CheckCircle2, Dna } from 'lucide-react';
import MathView from '../MathView';

export default function GANConditionalLab() {
  const [selectedMarker, setSelectedMarker] = useState('neun'); // 'dapi', 'neun', 'gfp'
  const [seed, setSeed] = useState(42);
  const [conditionWeight, setConditionWeight] = useState(1.0);

  const markersConfig = {
    dapi: {
      name: 'DAPI (Núcleos Celulares)',
      code: 'y = 0',
      color: '#0284C7',
      glow: '#38BDF8',
      description: 'Coloração virtual azulada demarcando com precisão os núcleos esféricos das células.'
    },
    neun: {
      name: 'NeuN (Neurônios Motores)',
      code: 'y = 1',
      color: '#15803D',
      glow: '#4ADE80',
      description: 'Marcação celular específica do corpo celular (soma) de neurônios motores humanos.'
    },
    gfp: {
      name: 'GFP (Axônios e Dendritos)',
      code: 'y = 2',
      color: '#C2410C',
      glow: '#FB923C',
      description: 'Fluorescência extensa detalhando ramificações axonais e arborização dendrítica.'
    }
  };

  const currentMarker = markersConfig[selectedMarker];

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      boxSizing: 'border-box'
    }}>
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
          <Dna size={20} color="var(--infnet-dark-blue)" />
          <span style={{ fontSize: '14.5px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
            Laboratório Interativo: Virtual Staining com cGAN (Human Motor Neurons)
          </span>
        </div>
        <div style={{
          background: 'rgba(10, 52, 93, 0.08)',
          color: 'var(--infnet-dark-blue)',
          padding: '3px 10px',
          borderRadius: '4px',
          fontSize: '11.5px',
          fontWeight: 700
        }}>
          Project 9B • Coloração sob Demanda por Condição de Marcador
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '320px 1fr 310px',
        gap: '14px',
        flex: 1
      }}>
        {/* Controls Column */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid var(--border-light)',
          borderRadius: '10px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
            1. Selecionar Marcador Fluorescente (y):
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {Object.entries(markersConfig).map(([key, cfg]) => {
              const isSelected = selectedMarker === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedMarker(key)}
                  style={{
                    padding: '10px 12px',
                    borderRadius: '6px',
                    border: isSelected ? `2px solid ${cfg.color}` : '1px solid #CBD5E1',
                    background: isSelected ? '#F8FAFC' : '#FFFFFF',
                    cursor: 'pointer',
                    textAlign: 'left',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: isSelected ? cfg.color : '#1E293B' }}>
                      {cfg.name}
                    </div>
                    <div style={{ fontSize: '10.5px', color: '#64748B', fontWeight: 600 }}>{cfg.code}</div>
                  </div>
                  {isSelected && <CheckCircle2 size={16} color={cfg.color} strokeWidth={2.5} />}
                </button>
              );
            })}
          </div>

          <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#334155', fontWeight: 600, marginBottom: '6px' }}>
              <span>Intensidade da Condição (y):</span>
              <span style={{ color: currentMarker.color, fontWeight: 700 }}>{(conditionWeight * 100).toFixed(0)}%</span>
            </div>
            <input
              type="range"
              min="0.2"
              max="1.5"
              step="0.1"
              value={conditionWeight}
              onChange={(e) => setConditionWeight(parseFloat(e.target.value))}
              style={{ width: '100%', accentColor: currentMarker.color, cursor: 'pointer' }}
            />
          </div>

          <button
            onClick={() => setSeed(s => s + 1)}
            style={{
              padding: '10px',
              borderRadius: '6px',
              background: 'linear-gradient(135deg, var(--infnet-dark-blue), #0F172A)',
              color: '#FFFFFF',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              fontSize: '12px',
              fontWeight: 600,
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <RefreshCw size={14} /> Amostrar Novo Tecido z (Seed #{seed})
          </button>
        </div>

        {/* Center: Virtual Staining Canvas */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid var(--border-light)',
          borderRadius: '10px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: 'var(--shadow-sm)',
          position: 'relative'
        }}>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
              Tecido Virtualmente Corado: <span style={{ color: currentMarker.color }}><MathView math={`G(z, y_{${selectedMarker}})`} inline /></span>
            </span>
            <span style={{
              background: '#F1F5F9',
              border: `1px solid ${currentMarker.color}`,
              color: currentMarker.color,
              padding: '2px 8px',
              borderRadius: '4px',
              fontSize: '11px',
              fontWeight: 700
            }}>
              {currentMarker.name}
            </span>
          </div>

          {/* Simulated Microscopy Canvas SVG (Darkfield fluorescence) */}
          <div style={{
            width: '270px',
            height: '270px',
            background: '#040914',
            borderRadius: '12px',
            border: '2px solid #CBD5E1',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'inset 0 0 20px rgba(0,0,0,0.8)'
          }}>
            <svg width="270" height="270" viewBox="0 0 260 260">
              {/* Unstained Cell Matrix Background */}
              <circle cx="130" cy="130" r="110" fill="#070D1A" stroke="#1E293B" strokeWidth="1.5" />
              {/* Cell outlines (phase contrast simulation) */}
              <circle cx="90" cy="80" r="28" fill="none" stroke="#23354E" strokeWidth="1.5" />
              <circle cx="170" cy="95" r="32" fill="none" stroke="#23354E" strokeWidth="1.5" />
              <circle cx="125" cy="160" r="45" fill="none" stroke="#23354E" strokeWidth="1.5" />

              {/* DAPI: Nuclei staining */}
              {selectedMarker === 'dapi' && (
                <g opacity={Math.min(1.0, conditionWeight)}>
                  <circle cx="90" cy="80" r="12" fill="#38BDF8" filter="blur(1px)" />
                  <circle cx="170" cy="95" r="14" fill="#38BDF8" filter="blur(1px)" />
                  <circle cx="125" cy="160" r="18" fill="#38BDF8" filter="blur(1px)" />
                  <circle cx="60" cy="190" r="10" fill="#38BDF8" filter="blur(1px)" />
                  <circle cx="200" cy="180" r="11" fill="#38BDF8" filter="blur(1px)" />
                </g>
              )}

              {/* NeuN: Motor Neuron Soma Staining */}
              {selectedMarker === 'neun' && (
                <g opacity={Math.min(1.0, conditionWeight)}>
                  <path d="M 125,120 Q 155,140 160,175 Q 130,200 100,185 Q 85,145 125,120 Z" fill="#4ADE80" opacity="0.85" filter="blur(2px)" />
                  <circle cx="125" cy="160" r="12" fill="#15803D" opacity="0.7" />
                  <path d="M 90,60 Q 110,75 110,95 Q 85,105 75,85 Z" fill="#4ADE80" opacity="0.8" filter="blur(2px)" />
                </g>
              )}

              {/* GFP: Axon & Dendrite Ramifications */}
              {selectedMarker === 'gfp' && (
                <g opacity={Math.min(1.0, conditionWeight)}>
                  <circle cx="125" cy="160" r="22" fill="#FB923C" opacity="0.85" filter="blur(1px)" />
                  <path d="M 125,140 Q 110,90 90,40" stroke="#FB923C" strokeWidth="4" fill="none" opacity="0.9" />
                  <path d="M 140,150 Q 190,130 230,120" stroke="#FB923C" strokeWidth="3.5" fill="none" opacity="0.9" />
                  <path d="M 115,180 Q 90,210 50,230" stroke="#FB923C" strokeWidth="3" fill="none" opacity="0.9" />
                  <path d="M 145,175 Q 180,210 210,235" stroke="#FB923C" strokeWidth="3" fill="none" opacity="0.9" />
                </g>
              )}
            </svg>

            {/* Label Badge */}
            <div style={{
              position: 'absolute',
              bottom: '10px',
              left: '10px',
              background: 'rgba(0,0,0,0.75)',
              padding: '2px 8px',
              borderRadius: '4px',
              fontSize: '10px',
              fontFamily: 'var(--font-code)',
              color: '#F8FAFC'
            }}>
              Project 9B • Virtual Staining
            </div>
          </div>

          <div style={{ fontSize: '11.5px', color: '#475569', textAlign: 'center', lineHeight: 1.4 }}>
            {currentMarker.description}
          </div>
        </div>

        {/* Right: Discriminator Verification Panel */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid var(--border-light)',
          borderRadius: '10px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          justifyContent: 'space-between',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
            Resposta do Discriminador D(x, y):
          </div>

          <div style={{
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: '8px',
            padding: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#334155', fontWeight: 600, marginBottom: '4px' }}>
                <span>Realismo Celular Histológico:</span>
                <span style={{ color: '#15803D', fontWeight: 700 }}>95.4%</span>
              </div>
              <div style={{ width: '100%', height: '8px', background: '#E2E8F0', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '95%', height: '100%', background: '#16A34A' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#334155', fontWeight: 600, marginBottom: '4px' }}>
                <span>Correspondência com {currentMarker.code}:</span>
                <span style={{ color: currentMarker.color, fontWeight: 700 }}>
                  {(Math.min(0.99, 0.72 + conditionWeight * 0.25) * 100).toFixed(1)}%
                </span>
              </div>
              <div style={{ width: '100%', height: '8px', background: '#E2E8F0', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{
                  width: `${(Math.min(0.99, 0.72 + conditionWeight * 0.25) * 100)}%`,
                  height: '100%',
                  background: currentMarker.color
                }} />
              </div>
            </div>
          </div>

          <div style={{
            background: '#F0FDF4',
            border: '1px solid #86EFAC',
            borderRadius: '6px',
            padding: '10px 12px',
            fontSize: '11.5px',
            color: '#166534',
            lineHeight: 1.4
          }}>
            <b>Resultado Biológico:</b> O modelo colore tecidos vivos digitalmente sem fixação química, gerando bancos de dados equilibrados para classificação celular.
          </div>
        </div>
      </div>
    </div>
  );
}
