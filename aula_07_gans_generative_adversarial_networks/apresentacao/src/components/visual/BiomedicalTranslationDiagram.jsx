import React from 'react';
import { Microscope, Dna, ArrowRight, TrendingUp, CheckCircle2 } from 'lucide-react';

export default function BiomedicalTranslationDiagram() {
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
            Aplicações em Imagens Biomédicas: Virtual Staining (cGAN) e Holo2Bright (CycleGAN)
          </span>
        </div>
        <div style={{
          background: '#E0F2FE',
          border: '1px solid #7DD3FC',
          borderRadius: '4px',
          padding: '3px 10px',
          fontSize: '12px',
          color: '#0369A1',
          fontWeight: 700
        }}>
          Impacto em Tarefas Downstream
        </div>
      </div>

      {/* 2 Case Studies Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '16px',
        flex: 1
      }}>
        {/* Case 1: Virtual Staining (cGAN) */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid var(--border-light)',
          borderRadius: '10px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '12px',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <Dna size={18} color="#0284C7" />
              <span style={{ fontSize: '15px', fontWeight: 800, color: 'var(--infnet-dark-blue)' }}>
                Project 9B: Virtual Staining (cGAN)
              </span>
            </div>
            <div style={{ fontSize: '12px', color: '#475569', fontWeight: 500 }}>
              Coloração Computacional de Neurônios Motores Humanos
            </div>
          </div>

          <div style={{
            background: '#F8FAFC',
            borderRadius: '8px',
            padding: '14px 10px',
            border: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 600 }}>Tecido Não-Corado</div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#1E293B' }}>Microscopia Fase</div>
            </div>
            <ArrowRight size={18} color="#0284C7" />
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '10px', color: '#C2410C', fontWeight: 600 }}>Condição y</div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#C2410C' }}>Marcador DAPI/GFP</div>
            </div>
            <ArrowRight size={18} color="#0284C7" />
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '10px', color: '#15803D', fontWeight: 600 }}>Saída Sintética</div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#15803D' }}>Fluorescência Virtual</div>
            </div>
          </div>

          <div style={{
            background: '#EFF6FF',
            border: '1px solid #BFDBFE',
            padding: '12px',
            borderRadius: '8px',
            fontSize: '12px',
            color: '#1E293B',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            lineHeight: 1.4
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 size={15} color="#0284C7" style={{ flexShrink: 0 }} />
              <span><b>Preservação Celular:</b> Elimina fixação química e fototoxicidade em culturas vivas.</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 size={15} color="#16A34A" style={{ flexShrink: 0 }} />
              <span><b>Multiplexing Digital:</b> Gera múltiplos marcadores virtuais para a mesma lâmina biológica.</span>
            </div>
          </div>
        </div>

        {/* Case 2: Holo2Bright (CycleGAN) */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid var(--border-light)',
          borderRadius: '10px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '12px',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <Microscope size={18} color="#15803D" />
              <span style={{ fontSize: '15px', fontWeight: 800, color: 'var(--infnet-dark-blue)' }}>
                Project 9C: Holo2Bright (CycleGAN)
              </span>
            </div>
            <div style={{ fontSize: '12px', color: '#475569', fontWeight: 500 }}>
              Conversão Holográfica para Histologia de Campo Claro
            </div>
          </div>

          <div style={{
            background: '#F8FAFC',
            borderRadius: '8px',
            padding: '14px 10px',
            border: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 600 }}>Holograma Portátil</div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#0369A1' }}>Franjas Difração</div>
            </div>
            <ArrowRight size={18} color="#16A34A" />
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '10px', color: '#15803D', fontWeight: 600 }}>CycleGAN (G)</div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#15803D' }}>Sem Pares Reais</div>
            </div>
            <ArrowRight size={18} color="#16A34A" />
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '10px', color: '#C2410C', fontWeight: 600 }}>Campo Claro</div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#C2410C' }}>Padrão Patológico</div>
            </div>
          </div>

          <div style={{
            background: '#F0FDF4',
            border: '1px solid #BBF7D0',
            padding: '12px',
            borderRadius: '8px',
            fontSize: '12px',
            color: '#1E293B',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            lineHeight: 1.4
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 size={15} color="#16A34A" style={{ flexShrink: 0 }} />
              <span><b>Telemedicina de Baixo Custo:</b> Microscópios sem lentes custam uma fração de um confocal.</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 size={15} color="#0284C7" style={{ flexShrink: 0 }} />
              <span><b>Consistência de Ciclo:</b> Impede a criação de artefatos espúrios e mantém o contorno celular exato.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Downstream Impact Footer */}
      <div style={{
        background: '#EDF5FA',
        border: '1px solid #D0E3F0',
        borderRadius: '8px',
        padding: '10px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <TrendingUp size={20} color="#15803D" />
          <span style={{ fontSize: '12px', color: '#1E293B', lineHeight: 1.4 }}>
            <b>Conexão com Tarefas Downstream:</b> Redes generativas ampliam classes raras e traduzem modalidades, alimentando classificadores e segmentadores com dados de alta fidelidade para elevar o <b>Recall</b> de patologias raras.
          </span>
        </div>
        <div style={{ fontSize: '12px', color: '#0369A1', fontWeight: 700, whiteSpace: 'nowrap', marginLeft: '12px' }}>
          Alavancagem de Sensibilidade
        </div>
      </div>
    </div>
  );
}
