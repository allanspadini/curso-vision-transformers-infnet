import React from 'react';
import { ArrowRight, ArrowLeft, ShieldCheck, Microscope, CheckCircle2 } from 'lucide-react';
import MathView from '../MathView';

export default function CycleGANMacroArchitectureDiagram() {
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
          <Microscope size={20} color="var(--infnet-dark-blue)" />
          <span style={{ fontSize: '14.5px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
            Project 9C: Conversão Entre Microscopia Holográfica e Campo Claro (Holo2Bright com CycleGAN)
          </span>
        </div>
        <div style={{
          background: 'rgba(10, 52, 93, 0.08)',
          border: '1px solid #CBD5E1',
          borderRadius: '4px',
          padding: '3px 10px',
          fontSize: '11.5px',
          color: 'var(--infnet-dark-blue)',
          fontWeight: 700
        }}>
          Tradução Entre Modalidades Sem Pares Alinhados
        </div>
      </div>

      {/* Main Diagram Area */}
      <div style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        gap: '16px',
        alignItems: 'center'
      }}>
        {/* Domain X: Holographic */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid var(--border-light)',
          borderRadius: '10px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          height: '100%',
          justifyContent: 'space-between',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--infnet-dark-blue)', fontWeight: 700, fontSize: '15px' }}>
              Domínio X: Microscopia Holográfica
            </span>
            <span style={{ fontSize: '11px', fontWeight: 600, background: '#F0F9FF', border: '1px solid #BAE6FD', color: '#0369A1', padding: '2px 8px', borderRadius: '4px' }}>
              Sem Lentes • Amplo Campo
            </span>
          </div>

          <div style={{
            background: '#F0F9FF',
            borderRadius: '8px',
            padding: '12px 14px',
            textAlign: 'center',
            border: '1px solid #BAE6FD'
          }}>
            <div style={{ fontSize: '13px', color: '#0369A1', fontWeight: 700, marginBottom: '4px' }}>
              Amostra Real: <span style={{ color: '#0A345D' }}><MathView math="x \in X" inline /></span>
            </div>
            <div style={{ fontSize: '11.5px', color: '#334155', lineHeight: 1.4 }}>
              Padrões de difração e anéis de interferência de fase (ininteligíveis ao olho humano sem reconstrução numérica).
            </div>
          </div>

          {/* Discriminator DX */}
          <div style={{
            background: '#F8FAFC',
            border: '1px dashed #7DD3FC',
            borderRadius: '8px',
            padding: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#0284C7' }}>
                Discriminador <MathView math="D_X" inline />
              </span>
              <ShieldCheck size={18} color="#0284C7" />
            </div>
            <div style={{ fontSize: '11.5px', color: '#475569', lineHeight: 1.4 }}>
              Avalia se os hologramas são autênticos (<MathView math="x" inline />) ou sintetizados (<MathView math="F(y)" inline />).
            </div>
          </div>
        </div>

        {/* Central Translation Engines */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {/* Forward Generator G: X -> Y */}
          <div style={{
            background: '#F0FDF4',
            border: '2px solid #16A34A',
            borderRadius: '10px',
            padding: '14px 20px',
            textAlign: 'center',
            boxShadow: 'var(--shadow-sm)',
            minWidth: '230px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '4px' }}>
              <span style={{ color: '#15803D', fontWeight: 700, fontSize: '15px' }}>
                Gerador <MathView math="G: X \to Y" inline />
              </span>
              <ArrowRight size={18} color="#15803D" strokeWidth={2.5} />
            </div>
            <div style={{ fontSize: '12px', color: '#166534', fontWeight: 600 }}>
              Holograma ➔ Campo Claro
            </div>
            <div style={{ fontSize: '10.5px', color: '#15803D', marginTop: '4px', fontWeight: 500 }}>
              Reconstrói morfologia celular e textura óptica
            </div>
          </div>

          {/* Backward Generator F: Y -> X */}
          <div style={{
            background: '#FFF7ED',
            border: '2px solid #EA580C',
            borderRadius: '10px',
            padding: '14px 20px',
            textAlign: 'center',
            boxShadow: 'var(--shadow-sm)',
            minWidth: '230px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '4px' }}>
              <ArrowLeft size={18} color="#C2410C" strokeWidth={2.5} />
              <span style={{ color: '#C2410C', fontWeight: 700, fontSize: '15px' }}>
                Gerador <MathView math="F: Y \to X" inline />
              </span>
            </div>
            <div style={{ fontSize: '12px', color: '#9A3412', fontWeight: 600 }}>
              Campo Claro ➔ Holograma
            </div>
            <div style={{ fontSize: '10.5px', color: '#C2410C', marginTop: '4px', fontWeight: 500 }}>
              Simula a propagação de onda óptica de fase
            </div>
          </div>
        </div>

        {/* Domain Y: Bright-Field */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid var(--border-light)',
          borderRadius: '10px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          height: '100%',
          justifyContent: 'space-between',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--infnet-dark-blue)', fontWeight: 700, fontSize: '15px' }}>
              Domínio Y: Campo Claro (Bright-Field)
            </span>
            <span style={{ fontSize: '11px', fontWeight: 600, background: '#F0FDF4', border: '1px solid #BBF7D0', color: '#15803D', padding: '2px 8px', borderRadius: '4px' }}>
              Padrão-Ouro Histológico
            </span>
          </div>

          <div style={{
            background: '#F0FDF4',
            borderRadius: '8px',
            padding: '12px 14px',
            textAlign: 'center',
            border: '1px solid #BBF7D0'
          }}>
            <div style={{ fontSize: '13px', color: '#15803D', fontWeight: 700, marginBottom: '4px' }}>
              Amostra Real: <span style={{ color: '#0A345D' }}><MathView math="y \in Y" inline /></span>
            </div>
            <div style={{ fontSize: '11.5px', color: '#334155', lineHeight: 1.4 }}>
              Imagens com lentes objetivas: bordas celulares e organelas nítidas e familiares ao patologista.
            </div>
          </div>

          {/* Discriminator DY */}
          <div style={{
            background: '#F8FAFC',
            border: '1px dashed #86EFAC',
            borderRadius: '8px',
            padding: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#16A34A' }}>
                Discriminador <MathView math="D_Y" inline />
              </span>
              <ShieldCheck size={18} color="#16A34A" />
            </div>
            <div style={{ fontSize: '11.5px', color: '#475569', lineHeight: 1.4 }}>
              Avalia se as imagens de campo claro são reais (<MathView math="y" inline />) ou sintetizadas por G (<MathView math="G(x)" inline />).
            </div>
          </div>
        </div>
      </div>

      {/* Footer Insight */}
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
          <CheckCircle2 size={18} color="#15803D" />
          <span style={{ fontSize: '12px', color: '#1E293B', lineHeight: 1.4 }}>
            <b>Por que não há pares?</b> Células vivas movem-se e mudam de forma dinamicamente; registrar exatamente o mesmo campo sub-micrométrico em dois microscópios ópticos distintos é inviável na prática de laboratório!
          </span>
        </div>
        <div style={{
          background: 'var(--infnet-dark-blue)',
          color: '#FFFFFF',
          fontSize: '11px',
          fontWeight: 700,
          padding: '4px 10px',
          borderRadius: '4px',
          fontFamily: 'var(--font-code)'
        }}>
          Holo2Bright sem Pares
        </div>
      </div>
    </div>
  );
}
