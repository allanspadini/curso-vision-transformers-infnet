import React from 'react';
import MathView from '../MathView';

export default function ValidationPitfallsAndDomainShiftDiagram() {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {/* Top Banner */}
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
            METODOLOGIA & GOVERNANÇA
          </span>
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--infnet-dark-blue)' }}>
            Armadilhas Metodológicas em Visão: Divisão Estratificada, Vazamento por Grupos e Domain Shift
          </span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <span className="badge badge-purple" style={{ fontSize: '11px' }}>Stratified Split</span>
          <span className="badge badge-red" style={{ fontSize: '11px' }}>Vazamento por Grupo</span>
          <span className="badge badge-orange" style={{ fontSize: '11px' }}>Covariate Shift</span>
        </div>
      </div>

      {/* Main 3-Card Grid */}
      <div style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: '14px',
        minHeight: 0
      }}>
        {/* Pitfall 1: Stratified Split */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid var(--border-light)',
          borderRadius: '12px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '12.5px', fontWeight: 800, color: '#0A345D' }}>
                1. Divisão Estratificada
              </span>
              <span className="badge badge-purple" style={{ fontSize: '9px' }}>Preservação Proporcional</span>
            </div>

            <p style={{ fontSize: '11px', color: '#475569', lineHeight: '1.4', marginBottom: '10px' }}>
              Em datasets com classes raras (ex: 5% a 10%), uma divisão aleatória ingênua (<code style={{ color: '#0A345D' }}>train_test_split</code> sem estratificação) introduz forte variância estocástica:
            </p>

            <div style={{ background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '10px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ fontSize: '10px', color: '#DC2626' }}>
                ❌ <strong>Divisão Aleatória Pura:</strong> Risco severo de alocar quase nenhuma amostra da classe minoritária no conjunto de teste, inviabilizando o cálculo do Recall.
              </div>
              <div style={{ fontSize: '10px', color: '#166534' }}>
                ✅ <strong>Divisão Estratificada (Stratified):</strong> Garante que Treino, Validação e Teste contenham exatamente a mesma proporção percentual de cada classe.
              </div>
            </div>
          </div>

          <div style={{ background: '#F0FDF4', border: '1px solid #86EFAC', borderRadius: '8px', padding: '8px 10px', fontSize: '10px', color: '#166534', fontFamily: 'var(--font-code)' }}>
            train_test_split(..., stratify=y, test_size=0.2)
          </div>
        </div>

        {/* Pitfall 2: Group / Cluster Data Leakage */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid var(--border-light)',
          borderRadius: '12px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '12.5px', fontWeight: 800, color: '#0A345D' }}>
                2. Vazamento de Dados por Grupo
              </span>
              <span className="badge badge-red" style={{ fontSize: '9px' }}>Data Leakage Crítico</span>
            </div>

            <p style={{ fontSize: '11px', color: '#475569', lineHeight: '1.4', marginBottom: '10px' }}>
              O erro metodológico mais devastador em visão computacional:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ background: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: '6px', padding: '8px 10px' }}>
                <strong style={{ fontSize: '10.5px', color: '#991B1B' }}>• A Falha:</strong>
                <p style={{ fontSize: '9.5px', color: '#7F1D1D', margin: '2px 0 0' }}>
                  Sortear frames de vídeo consecutivas, imagens da mesma câmera ou do mesmo paciente entre treino e teste.
                </p>
              </div>

              <div style={{ background: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: '6px', padding: '8px 10px' }}>
                <strong style={{ fontSize: '10.5px', color: '#991B1B' }}>• A Ilusão:</strong>
                <p style={{ fontSize: '9.5px', color: '#7F1D1D', margin: '2px 0 0' }}>
                  A rede decora o fundo, a iluminação do dia ou a textura da câmera, atingindo 98% de acurácia em validação.
                </p>
              </div>

              <div style={{ background: '#F0FDF4', border: '1px solid #86EFAC', borderRadius: '6px', padding: '8px 10px' }}>
                <strong style={{ fontSize: '10.5px', color: '#166534' }}>• A Solução: GroupKFold</strong>
                <p style={{ fontSize: '9.5px', color: '#14532D', margin: '2px 0 0' }}>
                  Particionar estritamente por ID de Câmera, Sessão ou Paciente. A câmera do teste nunca deve ter sido vista no treino!
                </p>
              </div>
            </div>
          </div>

          <div style={{ background: '#FFF7ED', border: '1px solid #FED7AA', borderRadius: '8px', padding: '6px 10px', fontSize: '9.5px', color: '#9A3412', fontWeight: 600 }}>
            ⚠️ Se o ambiente for idêntico no teste, você não está medindo inteligência, mas memorização de fundo!
          </div>
        </div>

        {/* Pitfall 3: Covariate Shift / Domain Shift */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid var(--border-light)',
          borderRadius: '12px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '12.5px', fontWeight: 800, color: '#0A345D' }}>
                3. Mudança de Distribuição (Shift)
              </span>
              <span className="badge badge-orange" style={{ fontSize: '9px' }}>Out-of-Distribution</span>
            </div>

            <p style={{ fontSize: '11px', color: '#475569', lineHeight: '1.4', marginBottom: '10px' }}>
              Por que modelos bem avaliados no laboratório colapsam após o deploy em produção real:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '8px 10px' }}>
                <strong style={{ fontSize: '10.5px', color: '#0A345D' }}>• Covariate Shift P(X):</strong>
                <p style={{ fontSize: '9.5px', color: '#475569', margin: '2px 0 0' }}>
                  A distribuição de entrada muda drasticamente: chuva, noite, névoa, poeira na lente ou novos ângulos de câmera não presentes no dataset.
                </p>
              </div>

              <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '8px 10px' }}>
                <strong style={{ fontSize: '10.5px', color: '#0A345D' }}>• Discrepância de Resolução e Sensor:</strong>
                <p style={{ fontSize: '9.5px', color: '#475569', margin: '2px 0 0' }}>
                  Câmeras analógicas de baixa qualidade produzem ruído de compressão que corrompe as features extraídas de modelos ImageNet de alta definição.
                </p>
              </div>
            </div>
          </div>

          <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '8px', padding: '8px 10px', fontSize: '10px', color: '#1E40AF', fontWeight: 600 }}>
            🛡️ Remediação: Teste de estresse em conjuntos OOD intencionalmente degradados (ruído, iluminação adversa).
          </div>
        </div>
      </div>
    </div>
  );
}
