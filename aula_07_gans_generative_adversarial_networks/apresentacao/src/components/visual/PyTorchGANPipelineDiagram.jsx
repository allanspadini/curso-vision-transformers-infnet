import React from 'react';
import { Layers, ArrowRight, ShieldCheck, Database, CheckCircle2, GitCommit, Cpu, Award } from 'lucide-react';

export default function PyTorchGANPipelineDiagram() {
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
          <Cpu size={20} color="var(--infnet-dark-blue)" />
          <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
            Pipeline Estrutural de Treinamento e Integração Downstream
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
          Fluxo Conceitual de Grafos &amp; Auditoria
        </div>
      </div>

      {/* Main Structural Columns */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.1fr 1fr',
        gap: '16px',
        flex: 1
      }}>
        {/* Left: Computational Graph & Detach Concept */}
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
            <span style={{ color: 'var(--infnet-dark-blue)', fontWeight: 800, fontSize: '15px' }}>
              1. Dinâmica do Grafo Computacional e Desacoplamento
            </span>
            <div style={{ fontSize: '12px', color: '#475569', marginTop: '2px', fontWeight: 500 }}>
              Como gerenciar o fluxo de derivadas entre dois otimizadores concorrentes
            </div>
          </div>

          {/* Step 1 Graphic */}
          <div style={{
            background: '#F8FAFC',
            borderRadius: '8px',
            padding: '12px',
            border: '1px solid #E2E8F0'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#C2410C' }}>
                Passo A: Atualização do Discriminador D
              </span>
              <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>Pesos de G Congelados</span>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '11px',
              color: '#1E293B',
              background: '#FFF7ED',
              border: '1px solid #FDBA74',
              padding: '8px 10px',
              borderRadius: '6px'
            }}>
              <span style={{ fontWeight: 600 }}>Imagens Falsas G(z)</span>
              <span style={{ color: '#DC2626', fontWeight: 800, background: '#FEE2E2', border: '1px solid #FCA5A5', padding: '2px 8px', borderRadius: '4px' }}>
                [BARREIRA .detach()]
              </span>
              <span style={{ fontWeight: 600 }}>➔ Entrada D ➔ Backprop em θ_D</span>
            </div>
            <div style={{ fontSize: '11px', color: '#475569', marginTop: '8px', lineHeight: 1.35 }}>
              O bloqueio de gradiente impede que o cálculo retropropague para G, isolando as atualizações e economizando VRAM.
            </div>
          </div>

          {/* Step 2 Graphic */}
          <div style={{
            background: '#F8FAFC',
            borderRadius: '8px',
            padding: '12px',
            border: '1px solid #E2E8F0'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#15803D' }}>
                Passo B: Atualização do Gerador G
              </span>
              <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>Pesos de D Congelados</span>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '11px',
              color: '#1E293B',
              background: '#F0FDF4',
              border: '1px solid #86EFAC',
              padding: '8px 10px',
              borderRadius: '6px'
            }}>
              <span style={{ fontWeight: 600 }}>Grafo Conectado: G(z)</span>
              <span style={{ color: '#15803D', fontWeight: 800 }}>
                ➔ D(G(z)) ➔ Perda Não-Saturante
              </span>
              <span style={{ fontWeight: 600 }}>➔ Backprop até θ_G</span>
            </div>
            <div style={{ fontSize: '11px', color: '#475569', marginTop: '8px', lineHeight: 1.35 }}>
              Os gradientes atravessam o discriminador estático para guiar diretamente os pesos convolucionais do gerador.
            </div>
          </div>
        </div>

        {/* Right: Downstream Pipeline Workflow */}
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
            <span style={{ color: 'var(--infnet-dark-blue)', fontWeight: 800, fontSize: '15px' }}>
              2. Protocolo de Integração com Modelos Downstream
            </span>
            <div style={{ fontSize: '12px', color: '#475569', marginTop: '2px', fontWeight: 500 }}>
              As 4 fases do ciclo de desenvolvimento em visão computacional aplicada
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ background: '#F8FAFC', padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: 'var(--infnet-dark-blue)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 800, flexShrink: 0 }}>1</div>
              <div style={{ fontSize: '12px', color: '#1E293B', lineHeight: 1.35 }}>
                <b>Treino do Motor Generativo:</b> cGAN ou CycleGAN ajustada exclusivamente na partição de treino.
              </div>
            </div>

            <div style={{ background: '#F8FAFC', padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: 'var(--infnet-dark-blue)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 800, flexShrink: 0 }}>2</div>
              <div style={{ fontSize: '12px', color: '#1E293B', lineHeight: 1.35 }}>
                <b>Síntese de Augmentation:</b> Geração direcionada de amostras de classes escassas ou tradução de modalidade.
              </div>
            </div>

            <div style={{ background: '#F8FAFC', padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: 'var(--infnet-dark-blue)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 800, flexShrink: 0 }}>3</div>
              <div style={{ fontSize: '12px', color: '#1E293B', lineHeight: 1.35 }}>
                <b>Treinamento Downstream:</b> Classificador ou segmentador treinado na base expandida e balanceada.
              </div>
            </div>

            <div style={{ background: '#F0FDF4', padding: '10px 12px', borderRadius: '8px', border: '1px solid #86EFAC', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: '#15803D', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 800, flexShrink: 0 }}>4</div>
              <div style={{ fontSize: '12px', color: '#166534', fontWeight: 600, lineHeight: 1.35 }}>
                <b>Auditoria no Teste 100% Real:</b> Teste intocado com imagens reais para verificar o ganho fidedigno de Recall.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Golden Rule Footer */}
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
          <ShieldCheck size={20} color="#15803D" />
          <span style={{ fontSize: '12px', color: '#1E293B', lineHeight: 1.4 }}>
            <b>Princípio Fundamental:</b> Dados sintéticos pertencem exclusivamente ao conjunto de treinamento. O teste deve permanecer 100% real para garantir validação diagnóstica fidedigna.
          </span>
        </div>
        <div style={{ fontSize: '12px', color: '#0369A1', fontWeight: 700, whiteSpace: 'nowrap', marginLeft: '12px' }}>
          Sem Contaminação de Teste
        </div>
      </div>
    </div>
  );
}
