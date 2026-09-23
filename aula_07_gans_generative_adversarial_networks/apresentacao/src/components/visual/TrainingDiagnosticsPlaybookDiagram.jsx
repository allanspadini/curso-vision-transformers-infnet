import React from 'react';

export default function TrainingDiagnosticsPlaybookDiagram() {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {/* Badges de Identificação */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#EDF5FA',
        border: '1px solid #D0E3F0',
        borderRadius: '8px',
        padding: '10px 18px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{
            background: 'var(--infnet-dark-blue)',
            color: '#FFFFFF',
            fontSize: '11px',
            fontWeight: 700,
            padding: '3px 10px',
            borderRadius: '4px',
            fontFamily: 'var(--font-code)'
          }}>
            Engenharia Prática & Telemetria
          </span>
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--infnet-dark-blue)' }}>
            Playbook de Diagnóstico Clínico: Como Interpretar Métricas no TensorBoard e Intervir
          </span>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <span className="badge badge-cyan" style={{ fontSize: '11px' }}>Telemetria GPU & Loss</span>
          <span className="badge badge-purple" style={{ fontSize: '11px' }}>Normas de Gradiente</span>
          <span className="badge badge-green" style={{ fontSize: '11px' }}>Ações Corretivas</span>
        </div>
      </div>

      {/* Grid Principal dos 4 Cenários Clínicos */}
      <div style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '12px',
        minHeight: 0
      }}>
        {/* CENÁRIO 1: D Venceu Rápido Demais */}
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
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#B91C1C' }}>
                🚨 CENÁRIO 1: DISCRIMINADOR VENCEU RAPIDAMENTE
              </span>
              <span className="badge badge-orange" style={{ fontSize: '8px' }}>L_D → 0 • L_G → ∞</span>
            </div>

            <div style={{ background: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: '6px', padding: '6px 10px', marginBottom: '8px', fontSize: '9px', color: '#991B1B' }}>
              <strong>Sintomas no TensorBoard:</strong> <br />
              • Acurácia de D atinge 100% logo nas primeiras épocas.<br />
              • Perda do gerador explode para valores acima de 8.0.<br />
              • Norma dos gradientes de G: <code style={{ fontFamily: 'var(--font-code)' }}>||∇_θg|| → 0</code> (colapso de fluxo).
            </div>

            <div style={{ fontSize: '9px', color: '#334155' }}>
              <strong>Prescrição de Engenharia:</strong><br />
              1. Aplicar <strong>One-Sided Label Smoothing (0.9)</strong> para mitigar a confiança de D.<br />
              2. Reduzir taxa de aprendizado de D ou número de camadas.<br />
              3. Migrar para <strong>WGAN-GP</strong> ou introduzir <strong>Spectral Normalization</strong>.
            </div>
          </div>
          <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '4px', padding: '4px 8px', fontSize: '8px', color: '#475569' }}>
            ⚡ <em>Regra prática:</em> Se L_D ficar abaixo de 0.1 por mais de 3 épocas consecutivas, o treino está morto.
          </div>
        </div>

        {/* CENÁRIO 2: Oscilações Caóticas Violentas */}
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
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#C2410C' }}>
                ⚡ CENÁRIO 2: OSCILAÇÕES CAÓTICAS E ÓRBITAS
              </span>
              <span className="badge badge-orange" style={{ fontSize: '8px' }}>Dentes de Serra</span>
            </div>

            <div style={{ background: '#FFFBEB', border: '1px solid #FCD34D', borderRadius: '6px', padding: '6px 10px', marginBottom: '8px', fontSize: '9px', color: '#92400E' }}>
              <strong>Sintomas no TensorBoard:</strong> <br />
              • L_D e L_G oscilam em ondas de amplitude violenta sem tendência média.<br />
              • FID flutua entre 30 e 140 de forma imprevisível época a época.<br />
              • Perseguição cíclica no espaço latente (mode hopping).
            </div>

            <div style={{ fontSize: '9px', color: '#334155' }}>
              <strong>Prescrição de Engenharia:</strong><br />
              1. Reduzir momento do Adam: definir <code style={{ fontFamily: 'var(--font-code)' }}>β₁ = 0.0</code> ou <code style={{ fontFamily: 'var(--font-code)' }}>0.5</code> (nunca 0.9!).<br />
              2. Aplicar <strong>TTUR</strong>: ajustar <code style={{ fontFamily: 'var(--font-code)' }}>lr_D = 4 * lr_G</code>.<br />
              3. Aumentar o tamanho do mini-batch para estabilizar o gradiente estocástico.
            </div>
          </div>
          <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '4px', padding: '4px 8px', fontSize: '8px', color: '#475569' }}>
            ⚡ <em>Regra prática:</em> Momentos altos no Adam provocam 'overshooting' contínuo ao redor do ponto de sela.
          </div>
        </div>

        {/* CENÁRIO 3: Mode Collapse Silencioso */}
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
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#7E22CE' }}>
                🧩 CENÁRIO 3: COLAPSO DE MODOS SILENCIOSO
              </span>
              <span className="badge badge-purple" style={{ fontSize: '8px' }}>Recall Desabando</span>
            </div>

            <div style={{ background: '#FAF5FF', border: '1px solid #DDD6FE', borderRadius: '6px', padding: '6px 10px', marginBottom: '8px', fontSize: '9px', color: '#6D28D9' }}>
              <strong>Sintomas no TensorBoard:</strong> <br />
              • Perda de G parece controlada e estável.<br />
              • Precision permanece em 90%+, porém <strong>Recall despenca para &lt; 25%</strong>.<br />
              • Amostras geradas no grid fixo exibem repetição crônica de poses e texturas.
            </div>

            <div style={{ fontSize: '9px', color: '#334155' }}>
              <strong>Prescrição de Engenharia:</strong><br />
              1. Introduzir <strong>Minibatch Discrimination</strong> ou camadas de diversidade estatística.<br />
              2. Utilizar <strong>WGAN-GP</strong> com penalidade de gradiente <code style={{ fontFamily: 'var(--font-code)' }}>λ = 10</code>.<br />
              3. Aumentar a dimensionalidade do ruído latente <code style={{ fontFamily: 'var(--font-code)' }}>nz</code> (ex: de 100 para 256/512).
            </div>
          </div>
          <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '4px', padding: '4px 8px', fontSize: '8px', color: '#475569' }}>
            ⚡ <em>Regra prática:</em> Monitore sempre o grid de validação com semente fixa (`fixed_noise`) para inspecionar repetições.
          </div>
        </div>

        {/* CENÁRIO 4: Treinamento Saudável em Equilíbrio */}
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
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#15803D' }}>
                ★ CENÁRIO 4: EQUILÍBRIO DE NASH SAUDÁVEL
              </span>
              <span className="badge badge-green" style={{ fontSize: '8px' }}>Convergência Estável</span>
            </div>

            <div style={{ background: '#F0FDF4', border: '1px solid #86EFAC', borderRadius: '6px', padding: '6px 10px', marginBottom: '8px', fontSize: '9px', color: '#166534' }}>
              <strong>Sintomas no TensorBoard:</strong> <br />
              • L_D flutua suavemente entre 0.5 e 0.7 (ou Wassertein Loss cai monotonicamente).<br />
              • Curva de FID decresce de forma consistente ao longo das épocas.<br />
              • Precision e Recall sobem de forma harmoniosa (&gt; 80% em ambos).
            </div>

            <div style={{ fontSize: '9px', color: '#334155' }}>
              <strong>Conduta de Engenharia:</strong><br />
              1. Manter taxa de aprendizado constante e salvar checkpoints periódicos.<br />
              2. Aplicar <strong>Exponential Moving Average (EMA)</strong> nos pesos do gerador.<br />
              3. Conduzir teste final com 50.000 amostras para cálculo oficial do FID.
            </div>
          </div>
          <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '4px', padding: '4px 8px', fontSize: '8px', color: '#15803D' }}>
            ✓ <em>Ponto ótimo:</em> O discriminador atua como um crítico construtivo, guiando G suavemente até a convergência.
          </div>
        </div>
      </div>

      {/* Footer com destaques */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '12px'
      }}>
        <div className="card-infnet" style={{ padding: '8px 14px', background: '#F8FAFC' }}>
          <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 600 }}>CHECKPOINTING COM VETOR FIXO</div>
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>Avaliação Consistente</div>
          <div style={{ fontSize: '10.5px', color: '#475569', marginTop: '2px' }}>Salve imagens geradas sempre do mesmo z_fixed para avaliar a evolução sem ruído</div>
        </div>
        <div className="card-infnet" style={{ padding: '8px 14px', background: '#F8FAFC' }}>
          <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 600 }}>WEIGHT EMA (EXPONENTIAL MOVING AVG)</div>
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--infnet-purple)' }}>Suavização Poliak de Pesos</div>
          <div style={{ fontSize: '10.5px', color: '#475569', marginTop: '2px' }}>G_ema = 0.999 · G_ema + 0.001 · G melhora o FID em até 15% na inferência</div>
        </div>
        <div className="card-infnet" style={{ padding: '8px 14px', background: '#F8FAFC' }}>
          <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 600 }}>PARADA PRECOCE (EARLY STOPPING)</div>
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--infnet-green-accent)' }}>Baseada Exclusivamente no FID</div>
          <div style={{ fontSize: '10.5px', color: '#475569', marginTop: '2px' }}>Nunca pare o treino baseado na loss; use o mínimo local do FID de validação</div>
        </div>
      </div>
    </div>
  );
}
