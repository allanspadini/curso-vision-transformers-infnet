import React from 'react';
import { RefreshCw, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import MathView from '../MathView';

export default function CycleConsistencyLossDiagram() {
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
          <RefreshCw size={20} color="var(--infnet-dark-blue)" />
          <span style={{ fontSize: '14.5px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
            Consistência de Ciclo (Cycle-Consistency Loss): Preservando a Morfologia Celular
          </span>
        </div>
        <div style={{
          background: 'rgba(21, 128, 61, 0.1)',
          border: '1px solid #86EFAC',
          borderRadius: '4px',
          padding: '3px 10px',
          fontSize: '11.5px',
          color: '#15803D',
          fontWeight: 700
        }}>
          Garantia Biunívoca Holografia ↔ Campo Claro
        </div>
      </div>

      {/* Two Cycles Comparison Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '14px',
        flex: 1
      }}>
        {/* Forward Cycle */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid var(--border-light)',
          borderRadius: '10px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          boxShadow: 'var(--shadow-sm)',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ color: 'var(--infnet-dark-blue)', fontWeight: 700, fontSize: '15px' }}>
                1. Ciclo Direto (Forward Consistency)
              </span>
              <span style={{ fontSize: '11px', fontWeight: 600, color: '#0369A1', background: '#F0F9FF', border: '1px solid #BAE6FD', padding: '2px 8px', borderRadius: '4px' }}>
                Holo ➔ Bright ➔ Holo
              </span>
            </div>
            <div style={{ fontSize: '12px', color: '#475569' }}>
              A imagem holográfica traduzida para campo claro deve ser perfeitamente revertida à holografia original.
            </div>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: '#F8FAFC',
            borderRadius: '8px',
            padding: '12px 16px',
            border: '1px solid #E2E8F0'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '12px', color: '#0369A1', fontWeight: 700 }}>x (Holograma)</div>
              <div style={{ fontSize: '10.5px', color: '#64748B', fontWeight: 600 }}>Entrada Real</div>
            </div>

            <ArrowRight size={18} color="#0284C7" strokeWidth={2.5} />

            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '12px', color: '#15803D', fontWeight: 700 }}>G(x)</div>
              <div style={{ fontSize: '10.5px', color: '#64748B', fontWeight: 600 }}>Campo Claro Falso</div>
            </div>

            <ArrowRight size={18} color="#0284C7" strokeWidth={2.5} />

            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '12px', color: '#0369A1', fontWeight: 700 }}>F(G(x))</div>
              <div style={{ fontSize: '10.5px', color: '#64748B', fontWeight: 600 }}>Reconstrução</div>
            </div>
          </div>

          <div style={{
            background: '#EDF5FA',
            border: '1px solid #D0E3F0',
            borderRadius: '8px',
            padding: '10px 14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            color: '#0A345D'
          }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>Penalidade L1:</span>
            <span style={{ fontWeight: 600 }}>
              <MathView math="\mathcal{L}_{cyc}^{forward} = \mathbb{E}_{x \sim p(x)}\left[ \|F(G(x)) - x\|_1 \right]" inline />
            </span>
          </div>

          <div style={{
            background: '#F8FAFC',
            padding: '10px 12px',
            borderRadius: '8px',
            border: '1px solid #E2E8F0',
            fontSize: '11.5px',
            color: '#1E293B',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '8px',
            lineHeight: 1.4
          }}>
            <CheckCircle2 size={16} color="#0284C7" style={{ flexShrink: 0, marginTop: '2px' }} />
            <span><b>Combate ao Colapso:</b> Se o gerador G mapear todos os hologramas em uma imagem fixa de célula bonita, o gerador reverso F jamais conseguirá recuperar as franjas de difração originais!</span>
          </div>
        </div>

        {/* Backward Cycle */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid var(--border-light)',
          borderRadius: '10px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          boxShadow: 'var(--shadow-sm)',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ color: 'var(--infnet-dark-blue)', fontWeight: 700, fontSize: '15px' }}>
                2. Ciclo Reverso (Backward Consistency)
              </span>
              <span style={{ fontSize: '11px', fontWeight: 600, color: '#15803D', background: '#F0FDF4', border: '1px solid #BBF7D0', padding: '2px 8px', borderRadius: '4px' }}>
                Bright ➔ Holo ➔ Bright
              </span>
            </div>
            <div style={{ fontSize: '12px', color: '#475569' }}>
              A imagem de campo claro convertida em holograma deve retornar ao campo claro original.
            </div>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: '#F8FAFC',
            borderRadius: '8px',
            padding: '12px 16px',
            border: '1px solid #E2E8F0'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '12px', color: '#15803D', fontWeight: 700 }}>y (Campo Claro)</div>
              <div style={{ fontSize: '10.5px', color: '#64748B', fontWeight: 600 }}>Entrada Real</div>
            </div>

            <ArrowRight size={18} color="#15803D" strokeWidth={2.5} />

            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '12px', color: '#0369A1', fontWeight: 700 }}>F(y)</div>
              <div style={{ fontSize: '10.5px', color: '#64748B', fontWeight: 600 }}>Holograma Falso</div>
            </div>

            <ArrowRight size={18} color="#15803D" strokeWidth={2.5} />

            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '12px', color: '#15803D', fontWeight: 700 }}>G(F(y))</div>
              <div style={{ fontSize: '10.5px', color: '#64748B', fontWeight: 600 }}>Reconstrução</div>
            </div>
          </div>

          <div style={{
            background: '#EDF5FA',
            border: '1px solid #D0E3F0',
            borderRadius: '8px',
            padding: '10px 14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            color: '#0A345D'
          }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>Penalidade L1:</span>
            <span style={{ fontWeight: 600 }}>
              <MathView math="\mathcal{L}_{cyc}^{backward} = \mathbb{E}_{y \sim p(y)}\left[ \|G(F(y)) - y\|_1 \right]" inline />
            </span>
          </div>

          <div style={{
            background: '#F8FAFC',
            padding: '10px 12px',
            borderRadius: '8px',
            border: '1px solid #E2E8F0',
            fontSize: '11.5px',
            color: '#1E293B',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '8px',
            lineHeight: 1.4
          }}>
            <CheckCircle2 size={16} color="#15803D" style={{ flexShrink: 0, marginTop: '2px' }} />
            <span><b>Fidelidade Citológica:</b> Garante que o diâmetro, a membrana e o núcleo de cada célula permaneçam exatamente nas mesmas coordenadas espaciais.</span>
          </div>
        </div>
      </div>

      {/* Identity Loss Footer */}
      <div style={{
        background: '#EDF5FA',
        border: '1px solid #D0E3F0',
        borderRadius: '8px',
        padding: '10px 18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Sparkles size={18} color="#C2410C" />
          <span style={{ fontSize: '12px', color: '#1E293B', lineHeight: 1.4 }}>
            <b>Perda de Identidade (Identity Loss):</b> <MathView math="\mathcal{L}_{idt} = \mathbb{E}[\|G(y) - y\|_1 + \|F(x) - x\|_1]" inline /> (Se a imagem já for Campo Claro, G não deve alterá-la!)
          </span>
        </div>
        <div style={{
          background: 'var(--infnet-dark-blue)',
          padding: '4px 10px',
          borderRadius: '4px',
          color: '#FFFFFF',
          fontWeight: 700,
          fontSize: '11px',
          fontFamily: 'var(--font-code)'
        }}>
          <MathView math="\lambda_{cyc} = 10, \; \lambda_{idt} = 5" inline />
        </div>
      </div>
    </div>
  );
}
