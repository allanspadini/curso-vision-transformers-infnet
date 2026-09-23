import React, { useState } from 'react';
import { RefreshCw, AlertTriangle, CheckCircle2, Microscope } from 'lucide-react';
import MathView from '../MathView';

export default function CycleGANConsistencyLab() {
  const [lambdaCyc, setLambdaCyc] = useState(10);
  const [cycleDirection, setCycleDirection] = useState('forward'); // 'forward' (Holo -> Bright -> Holo) or 'backward'

  // Computed metrics based on lambdaCyc
  const cycleLoss = (2.8 / (1 + lambdaCyc * 0.28)).toFixed(3);
  const morphologyDrift = Math.max(2, Math.round(80 / (1 + lambdaCyc * 0.32)));
  const isCollapsed = lambdaCyc < 2;
  const isOverConstrained = lambdaCyc > 25;

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      padding: '12px 20px',
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
          <Microscope size={20} color="var(--infnet-dark-blue)" />
          <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
            Laboratório Interativo: Consistência de Ciclo no Holo2Bright (Project 9C)
          </span>
        </div>
        <div style={{ fontSize: '12px', color: '#334155', fontWeight: 500 }}>
          Regulagem do Hiperparâmetro <span style={{ color: 'var(--infnet-dark-blue)', fontWeight: 700 }}><MathView math="\lambda_{cyc}" inline /></span> para Preservação Citológica
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '300px 1fr',
        gap: '16px',
        flex: 1
      }}>
        {/* Left: Controls & Diagnostics */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid var(--border-light)',
          borderRadius: '10px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          justifyContent: 'space-between',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--infnet-dark-blue)', marginBottom: '8px' }}>
              1. Sentido da Tradução:
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setCycleDirection('forward')}
                style={{
                  flex: 1,
                  padding: '8px 6px',
                  borderRadius: '6px',
                  border: cycleDirection === 'forward' ? '2px solid var(--infnet-cyan)' : '1px solid #CBD5E1',
                  background: cycleDirection === 'forward' ? '#EFF6FF' : '#F8FAFC',
                  color: cycleDirection === 'forward' ? '#0369A1' : '#475569',
                  cursor: 'pointer',
                  fontSize: '11px',
                  fontWeight: 700,
                  transition: 'all 0.15s ease'
                }}
              >
                Holo ➔ Bright ➔ Holo
              </button>
              <button
                onClick={() => setCycleDirection('backward')}
                style={{
                  flex: 1,
                  padding: '8px 6px',
                  borderRadius: '6px',
                  border: cycleDirection === 'backward' ? '2px solid #16A34A' : '1px solid #CBD5E1',
                  background: cycleDirection === 'backward' ? '#F0FDF4' : '#F8FAFC',
                  color: cycleDirection === 'backward' ? '#15803D' : '#475569',
                  cursor: 'pointer',
                  fontSize: '11px',
                  fontWeight: 700,
                  transition: 'all 0.15s ease'
                }}
              >
                Bright ➔ Holo ➔ Bright
              </button>
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#1E293B', marginBottom: '6px' }}>
              <span style={{ fontWeight: 600 }}>Peso do Ciclo (<MathView math="\lambda_{cyc}" inline />):</span>
              <span style={{ color: 'var(--infnet-dark-blue)', fontWeight: 800, fontSize: '13px' }}>{lambdaCyc}</span>
            </div>
            <input
              type="range"
              min="0"
              max="30"
              step="1"
              value={lambdaCyc}
              onChange={(e) => setLambdaCyc(parseInt(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--infnet-dark-blue)', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#64748B', marginTop: '3px', fontWeight: 500 }}>
              <span>0 (Sem Ciclo)</span>
              <span>10 (Padrão Zhu)</span>
              <span>30 (Rígido)</span>
            </div>
          </div>

          {/* Telemetry Metrics */}
          <div style={{
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: '8px',
            padding: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
              <span style={{ color: '#475569', fontWeight: 600 }}>Perda de Ciclo (L1):</span>
              <span style={{ color: '#0F172A', fontFamily: 'monospace', fontWeight: 700 }}>{cycleLoss}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
              <span style={{ color: '#475569', fontWeight: 600 }}>Distorção Citológica:</span>
              <span style={{
                color: isCollapsed ? '#DC2626' : morphologyDrift < 15 ? '#15803D' : '#C2410C',
                fontWeight: 800
              }}>
                {morphologyDrift}%
              </span>
            </div>
          </div>

          {/* Status Message */}
          <div style={{
            padding: '10px 12px',
            borderRadius: '6px',
            fontSize: '11px',
            lineHeight: 1.4,
            background: isCollapsed
              ? '#FEF2F2'
              : isOverConstrained
              ? '#FFF7ED'
              : '#F0FDF4',
            border: isCollapsed
              ? '1px solid #FCA5A5'
              : isOverConstrained
              ? '1px solid #FDBA74'
              : '1px solid #86EFAC',
            color: isCollapsed ? '#991B1B' : isOverConstrained ? '#9A3412' : '#166534'
          }}>
            {isCollapsed && (
              <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                <AlertTriangle size={15} style={{ flexShrink: 0, marginTop: '2px', color: '#DC2626' }} />
                <span><b>Alerta:</b> Sem consistência de ciclo (λ=0), o gerador alucina artefatos celulares que não existem no holograma original!</span>
              </div>
            )}
            {!isCollapsed && !isOverConstrained && (
              <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                <CheckCircle2 size={15} style={{ flexShrink: 0, marginTop: '2px', color: '#16A34A' }} />
                <span><b>Regime Ótimo (λ=10):</b> Tradução precisa de campo claro preservando as posições micrométricas e morfologia das células.</span>
              </div>
            )}
            {isOverConstrained && (
              <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                <AlertTriangle size={15} style={{ flexShrink: 0, marginTop: '2px', color: '#EA580C' }} />
                <span><b>Sobre-Restrito (λ &gt; 25):</b> O ciclo domina excessivamente, deixando a imagem de campo claro borrada ou com franjas residuais.</span>
              </div>
            )}
          </div>
        </div>

        {/* Right: The 3-Stage Visual Pipeline */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid var(--border-light)',
          borderRadius: '10px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
            Fluxo Visual: Imagem Original ➔ Traduzida ➔ Reconstruída
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '14px',
            margin: 'auto 0'
          }}>
            {/* Panel 1: Original */}
            <div style={{
              background: '#F8FAFC',
              borderRadius: '8px',
              border: '1px solid #E2E8F0',
              padding: '12px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '11px', color: '#0369A1', fontWeight: 700, marginBottom: '8px' }}>
                1. Entrada Real {cycleDirection === 'forward' ? 'x (Holograma)' : 'y (Campo Claro)'}
              </div>
              <div style={{
                width: '130px',
                height: '130px',
                margin: '0 auto',
                background: '#0F172A',
                borderRadius: '6px',
                border: '1px solid #CBD5E1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}>
                <svg width="120" height="120" viewBox="0 0 120 120">
                  {cycleDirection === 'forward' ? (
                    // Hologram fringes
                    <g>
                      <circle cx="60" cy="60" r="12" fill="#334155" opacity="0.6" />
                      <circle cx="60" cy="60" r="24" fill="none" stroke="#64D9EF" strokeWidth="1.2" strokeDasharray="3,2" opacity="0.85" />
                      <circle cx="60" cy="60" r="38" fill="none" stroke="#64D9EF" strokeWidth="1.4" strokeDasharray="4,3" opacity="0.7" />
                      <circle cx="60" cy="60" r="52" fill="none" stroke="#64D9EF" strokeWidth="1" opacity="0.45" />
                    </g>
                  ) : (
                    // Bright field cell
                    <g>
                      <circle cx="60" cy="60" r="34" fill="#F1F5F9" opacity="0.3" stroke="#94A3B8" strokeWidth="1.5" />
                      <circle cx="60" cy="60" r="14" fill="#64748B" opacity="0.8" />
                    </g>
                  )}
                </svg>
              </div>
              <div style={{ fontSize: '11px', color: '#475569', fontWeight: 600, marginTop: '8px' }}>Amostra de Entrada</div>
            </div>

            {/* Panel 2: Translated */}
            <div style={{
              background: '#F8FAFC',
              borderRadius: '8px',
              border: '1px solid #E2E8F0',
              padding: '12px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '11px', color: '#15803D', fontWeight: 700, marginBottom: '8px' }}>
                2. Traduzida {cycleDirection === 'forward' ? 'G(x) [Campo Claro]' : 'F(y) [Holograma]'}
              </div>
              <div style={{
                width: '130px',
                height: '130px',
                margin: '0 auto',
                background: '#0F172A',
                borderRadius: '6px',
                border: '1px solid #CBD5E1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}>
                <svg width="120" height="120" viewBox="0 0 120 120">
                  {cycleDirection === 'forward' ? (
                    // Translated to brightfield
                    <g>
                      <circle
                        cx={isCollapsed ? "75" : "60"}
                        cy={isCollapsed ? "45" : "60"}
                        r={isCollapsed ? "22" : "34"}
                        fill="#F1F5F9"
                        opacity={isOverConstrained ? 0.15 : 0.35}
                        stroke={isCollapsed ? "#EF4444" : "#22C55E"}
                        strokeWidth="2"
                      />
                      <circle
                        cx={isCollapsed ? "75" : "60"}
                        cy={isCollapsed ? "45" : "60"}
                        r={isCollapsed ? "8" : "14"}
                        fill={isCollapsed ? "#EF4444" : "#16A34A"}
                        opacity="0.9"
                      />
                    </g>
                  ) : (
                    // Translated to hologram
                    <g>
                      <circle cx="60" cy="60" r="12" fill="#334155" opacity="0.6" />
                      <circle cx="60" cy="60" r="24" fill="none" stroke="#22C55E" strokeWidth="1.2" strokeDasharray="3,2" opacity="0.85" />
                      <circle cx="60" cy="60" r="38" fill="none" stroke="#22C55E" strokeWidth="1.4" opacity="0.65" />
                    </g>
                  )}
                </svg>
              </div>
              <div style={{ fontSize: '11px', color: isCollapsed ? '#DC2626' : '#15803D', fontWeight: 600, marginTop: '8px' }}>
                {isCollapsed ? 'Distorção Morfológica!' : 'Fidelidade Óptica'}
              </div>
            </div>

            {/* Panel 3: Reconstructed */}
            <div style={{
              background: '#F8FAFC',
              borderRadius: '8px',
              border: '1px solid #E2E8F0',
              padding: '12px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '11px', color: '#C2410C', fontWeight: 700, marginBottom: '8px' }}>
                3. Reconstruída {cycleDirection === 'forward' ? 'F(G(x))' : 'G(F(y))'}
              </div>
              <div style={{
                width: '130px',
                height: '130px',
                margin: '0 auto',
                background: '#0F172A',
                borderRadius: '6px',
                border: '1px solid #CBD5E1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}>
                <svg width="120" height="120" viewBox="0 0 120 120">
                  {cycleDirection === 'forward' ? (
                    <g>
                      <circle cx="60" cy="60" r="12" fill="#334155" opacity="0.6" />
                      <circle cx="60" cy="60" r="24" fill="none" stroke={isCollapsed ? "#EF4444" : "#64D9EF"} strokeWidth="1.2" strokeDasharray="3,2" opacity="0.85" />
                      <circle cx="60" cy="60" r="38" fill="none" stroke={isCollapsed ? "#EF4444" : "#64D9EF"} strokeWidth="1.4" opacity="0.65" />
                      {isCollapsed && <circle cx="45" cy="45" r="16" fill="#EF4444" opacity="0.5" filter="blur(2px)" />}
                    </g>
                  ) : (
                    <g>
                      <circle cx="60" cy="60" r="34" fill="#F1F5F9" opacity="0.3" stroke={isCollapsed ? "#EF4444" : "#94A3B8"} strokeWidth="1.5" />
                      <circle cx="60" cy="60" r="14" fill="#64748B" opacity="0.8" />
                    </g>
                  )}
                </svg>
              </div>
              <div style={{ fontSize: '11px', color: isCollapsed ? '#DC2626' : '#15803D', fontWeight: 600, marginTop: '8px' }}>
                {isCollapsed ? 'Falha no Ciclo' : 'Recuperação Exata (L1 ≈ 0)'}
              </div>
            </div>
          </div>

          <div style={{
            background: '#EDF5FA',
            border: '1px solid #D0E3F0',
            borderRadius: '6px',
            padding: '8px 14px',
            fontSize: '12px',
            color: 'var(--infnet-dark-blue)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span><b>Fórmula Avaliada:</b> <MathView math="\|F(G(x)) - x\|_1" inline /></span>
            <span style={{ color: '#0369A1', fontWeight: 700 }}>O ciclo impede alucinação de artefatos celulares</span>
          </div>
        </div>
      </div>
    </div>
  );
}
