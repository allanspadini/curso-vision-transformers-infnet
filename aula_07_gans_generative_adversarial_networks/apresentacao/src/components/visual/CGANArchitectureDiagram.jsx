import React from 'react';
import { CheckCircle2, ArrowRight, Dna } from 'lucide-react';
import MathView from '../MathView';

export default function CGANArchitectureDiagram() {
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
            Project 9B: Coloração Virtual de Tecidos Biológicos (Virtual Staining com cGAN)
          </span>
        </div>
        <div style={{
          background: 'rgba(27, 181, 216, 0.12)',
          border: '1px solid rgba(27, 181, 216, 0.4)',
          borderRadius: '4px',
          padding: '3px 10px',
          fontSize: '11.5px',
          color: '#0369A1',
          fontWeight: 700
        }}>
          Síntese Condicional sob Demanda (Human Motor Neurons)
        </div>
      </div>

      {/* Main Structural Flow */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '14px',
        flex: 1
      }}>
        {/* Generator Panel */}
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
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ color: 'var(--infnet-dark-blue)', fontWeight: 700, fontSize: '15px' }}>
                1. Gerador Condicional: <span style={{ color: '#0284C7' }}><MathView math="G(z, y)" inline /></span>
              </span>
              <span style={{ fontSize: '11px', fontWeight: 600, color: '#0369A1', background: '#F0F9FF', border: '1px solid #BAE6FD', padding: '2px 8px', borderRadius: '4px' }}>
                Entrada Condicionada
              </span>
            </div>
            <div style={{ fontSize: '12px', color: '#475569', lineHeight: 1.4 }}>
              Mapeamento de ruído latente e condição de biomarcador para tecido virtualmente corado.
            </div>
          </div>

          <div style={{
            background: '#F8FAFC',
            borderRadius: '8px',
            padding: '12px 14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            border: '1px solid #E2E8F0'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '11px', fontWeight: 600, color: '#64748B', marginBottom: '4px' }}>Vetor Latente</div>
              <div style={{ background: '#FFFFFF', padding: '6px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', color: '#0F172A', fontWeight: 600 }}>
                <MathView math="z \sim \mathcal{N}(0, I)" inline />
                <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 500 }}>[B, 100, 1, 1]</div>
              </div>
            </div>

            <div style={{ fontSize: '20px', color: '#0284C7', fontWeight: 'bold' }}>+</div>

            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '11px', fontWeight: 600, color: '#C2410C', marginBottom: '4px' }}>Marcador Alvo (y)</div>
              <div style={{ background: '#FFF7ED', padding: '6px 12px', borderRadius: '6px', border: '1px solid #FDBA74' }}>
                <span style={{ color: '#C2410C', fontWeight: 700, fontSize: '12px' }}>Neurônio Motor</span>
                <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 500 }}>Embedding [B, 16, 1, 1]</div>
              </div>
            </div>

            <ArrowRight size={18} color="#0284C7" strokeWidth={2.5} />

            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '11px', fontWeight: 600, color: '#15803D', marginBottom: '4px' }}>Tecido Corado</div>
              <div style={{ background: '#F0FDF4', padding: '6px 12px', borderRadius: '6px', border: '1px solid #86EFAC' }}>
                <span style={{ color: '#15803D', fontWeight: 700, fontSize: '12px' }}>x̃ (Virtual)</span>
                <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 500 }}>[B, C, H, W]</div>
              </div>
            </div>
          </div>

          <div style={{
            background: '#F8FAFC',
            padding: '10px 14px',
            borderRadius: '8px',
            border: '1px solid #E2E8F0',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            fontSize: '12px',
            color: '#1E293B'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 size={15} color="#0284C7" />
              <span><b>Síntese Não-Destrutiva:</b> Descarta reagentes químicos tóxicos e fotobranqueamento.</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 size={15} color="#15803D" />
              <span><b>Direcionamento Específico:</b> Gera a fluorescência exata do neurônio motor solicitado.</span>
            </div>
          </div>
        </div>

        {/* Discriminator Panel */}
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
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ color: 'var(--infnet-dark-blue)', fontWeight: 700, fontSize: '15px' }}>
                2. Discriminador Condicional: <span style={{ color: '#C2410C' }}><MathView math="D(x, y)" inline /></span>
              </span>
              <span style={{ fontSize: '11px', fontWeight: 600, color: '#C2410C', background: '#FFF7ED', border: '1px solid #FFEDD5', padding: '2px 8px', borderRadius: '4px' }}>
                Perito com Contexto
              </span>
            </div>
            <div style={{ fontSize: '12px', color: '#475569', lineHeight: 1.4 }}>
              Avalia conjuntamente o fotorrealismo celular e a fidelidade ao marcador biológico solicitado.
            </div>
          </div>

          <div style={{
            background: '#F8FAFC',
            borderRadius: '8px',
            padding: '12px 14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            border: '1px solid #E2E8F0'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '11px', fontWeight: 600, color: '#64748B', marginBottom: '4px' }}>Imagem de Tecido</div>
              <div style={{ background: '#FFFFFF', padding: '6px 12px', borderRadius: '6px', border: '1px solid #CBD5E1' }}>
                <span style={{ color: '#0F172A', fontWeight: 700, fontSize: '12px' }}>x (Real ou Fake)</span>
                <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 500 }}>[B, C, H, W]</div>
              </div>
            </div>

            <div style={{ fontSize: '20px', color: '#C2410C', fontWeight: 'bold' }}>+</div>

            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '11px', fontWeight: 600, color: '#0369A1', marginBottom: '4px' }}>Canal de Marcador</div>
              <div style={{ background: '#F0F9FF', padding: '6px 12px', borderRadius: '6px', border: '1px solid #BAE6FD' }}>
                <span style={{ color: '#0369A1', fontWeight: 700, fontSize: '12px' }}>Mapa Espacial y</span>
                <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 500 }}>Broadcast [B, 1, H, W]</div>
              </div>
            </div>

            <ArrowRight size={18} color="#C2410C" strokeWidth={2.5} />

            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '11px', fontWeight: 600, color: '#C2410C', marginBottom: '4px' }}>Validação</div>
              <div style={{ background: '#FFF7ED', padding: '6px 12px', borderRadius: '6px', border: '1px solid #FDBA74', color: '#C2410C', fontWeight: 700 }}>
                <MathView math="D(x, y) \in [0, 1]" inline />
              </div>
            </div>
          </div>

          <div style={{
            background: '#F8FAFC',
            padding: '10px 14px',
            borderRadius: '8px',
            border: '1px solid #E2E8F0',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            fontSize: '12px',
            color: '#1E293B'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 size={15} color="#C2410C" />
              <span><b>Filtro Duplo:</b> Rejeita tecidos borrados E tecidos que apresentem o padrão celular errado.</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 size={15} color="#15803D" />
              <span><b>Equilíbrio Minimax:</b> O gerador aprende a estrutura espacial precisa dos somas e axônios.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Objective */}
      <div style={{
        background: '#EDF5FA',
        border: '1px solid #D0E3F0',
        borderRadius: '8px',
        padding: '10px 18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <span style={{ fontSize: '13px', color: 'var(--infnet-dark-blue)', fontWeight: 700 }}>Objetivo Minimax Condicional:</span>
          <span style={{ color: '#0A345D', fontSize: '13px', fontWeight: 600 }}>
            <MathView math="\min_G \max_D V(D, G) = \mathbb{E}_{x, y \sim p_{data}}[\log D(x, y)] + \mathbb{E}_{z \sim p_z, y \sim p_y}[\log(1 - D(G(z, y), y))]" inline />
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
          Controle Estrutural de Síntese
        </div>
      </div>
    </div>
  );
}
