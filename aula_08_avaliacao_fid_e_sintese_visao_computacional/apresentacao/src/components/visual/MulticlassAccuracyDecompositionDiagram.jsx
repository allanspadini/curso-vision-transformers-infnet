import React from 'react';
import MathView from '../MathView';

export default function MulticlassAccuracyDecompositionDiagram() {
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
            MÉTRICAS & DIAGNÓSTICO
          </span>
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--infnet-dark-blue)' }}>
            Avaliação Multiclasse: A Desagregação da Acurácia Global e a Acurácia por Classe
          </span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <span className="badge badge-red" style={{ fontSize: '11px' }}>Acurácia Ilusória</span>
          <span className="badge badge-cyan" style={{ fontSize: '11px' }}>Acurácia por Classe</span>
          <span className="badge badge-green" style={{ fontSize: '11px' }}>Balanced Accuracy</span>
        </div>
      </div>

      {/* Main Grid */}
      <div style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '1.15fr 1fr',
        gap: '14px',
        minHeight: 0
      }}>
        {/* Left Column: Mathematical Breakdown & Concrete Demonstration */}
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
            <span style={{ fontSize: '12.5px', fontWeight: 800, color: '#0A345D' }}>
              Decomposição Formal das Métricas
            </span>

            {/* Formula Block */}
            <div style={{ background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '10px', margin: '8px 0 12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '10px', color: '#0A345D', fontWeight: 700 }}>Acurácia Global:</span>
                <MathView math="\text{Acc}_{\text{global}} = \frac{\sum_{c=1}^C \text{TP}_c}{\sum_{c=1}^C N_c}" />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '10px', color: '#0369A1', fontWeight: 700 }}>Acurácia da Classe c:</span>
                <MathView math="\text{Acc}_c = \frac{\text{TP}_c}{N_c}" />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '10px', color: '#166534', fontWeight: 700 }}>Balanced Accuracy:</span>
                <MathView math="\text{B-Acc} = \frac{1}{C}\sum_{c=1}^C \text{Acc}_c" />
              </div>
            </div>

            {/* Demonstration Table */}
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#1E293B', display: 'block', marginBottom: '6px' }}>
              Exemplo Real de Mascaramento Estatístico (4 Classes):
            </span>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '10px', textAlign: 'center' }}>
              <thead>
                <tr style={{ background: '#F1F5F9', color: '#0A345D', borderBottom: '2px solid #CBD5E1' }}>
                  <th style={{ padding: '6px', textAlign: 'left' }}>Classe</th>
                  <th style={{ padding: '6px' }}>Amostras (N)</th>
                  <th style={{ padding: '6px' }}>Acertos (TP)</th>
                  <th style={{ padding: '6px' }}>Acurácia por Classe</th>
                  <th style={{ padding: '6px' }}>Diagnóstico</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #E2E8F0', background: '#F0FDF4' }}>
                  <td style={{ padding: '5px', textAlign: 'left', fontWeight: 600 }}>Classe 1 (Majoritária)</td>
                  <td style={{ padding: '5px' }}>1.200</td>
                  <td style={{ padding: '5px' }}>1.176</td>
                  <td style={{ padding: '5px', fontWeight: 700, color: '#166534' }}>98.0%</td>
                  <td style={{ padding: '5px', color: '#166534' }}>Excelente</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                  <td style={{ padding: '5px', textAlign: 'left', fontWeight: 600 }}>Classe 2</td>
                  <td style={{ padding: '5px' }}>300</td>
                  <td style={{ padding: '5px' }}>240</td>
                  <td style={{ padding: '5px', fontWeight: 700, color: '#0284C7' }}>80.0%</td>
                  <td style={{ padding: '5px', color: '#0284C7' }}>Bom</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #E2E8F0', background: '#FEF2F2' }}>
                  <td style={{ padding: '5px', textAlign: 'left', fontWeight: 600 }}>Classe 3 (Rara)</td>
                  <td style={{ padding: '5px' }}>100</td>
                  <td style={{ padding: '5px' }}>30</td>
                  <td style={{ padding: '5px', fontWeight: 700, color: '#DC2626' }}>30.0%</td>
                  <td style={{ padding: '5px', color: '#DC2626' }}>Crítico</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #E2E8F0', background: '#FEF2F2' }}>
                  <td style={{ padding: '5px', textAlign: 'left', fontWeight: 600 }}>Classe 4 (Muito Rara)</td>
                  <td style={{ padding: '5px' }}>50</td>
                  <td style={{ padding: '5px' }}>10</td>
                  <td style={{ padding: '5px', fontWeight: 700, color: '#DC2626' }}>20.0%</td>
                  <td style={{ padding: '5px', color: '#DC2626' }}>Crítico</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Comparison Result */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '10px' }}>
            <div style={{ background: '#FFF7ED', border: '1px solid #FED7AA', borderRadius: '8px', padding: '8px 10px', textAlign: 'center' }}>
              <span style={{ fontSize: '9.5px', color: '#9A3412', fontWeight: 700 }}>Acurácia Global Média:</span>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#C2410C', fontFamily: 'var(--font-code)' }}>88.2%</div>
              <span style={{ fontSize: '8.5px', color: '#7C2D12' }}>Parece excelente, mas mascara o colapso!</span>
            </div>
            <div style={{ background: '#F0FDF4', border: '1px solid #86EFAC', borderRadius: '8px', padding: '8px 10px', textAlign: 'center' }}>
              <span style={{ fontSize: '9.5px', color: '#166534', fontWeight: 700 }}>Balanced Accuracy Real:</span>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#166534', fontFamily: 'var(--font-code)' }}>57.0%</div>
              <span style={{ fontSize: '8.5px', color: '#14532D' }}>Média não-ponderada penaliza o fracasso</span>
            </div>
          </div>
        </div>

        {/* Right Column: Confusion Matrix & Diagnostic Principles */}
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '12.5px', fontWeight: 800, color: '#0A345D' }}>
                O Papel Mandatório da Matriz de Confusão
              </span>
              <span className="badge badge-purple" style={{ fontSize: '9px' }}>Auditoria Direcional</span>
            </div>

            <p style={{ fontSize: '11px', color: '#475569', lineHeight: '1.4', marginBottom: '10px' }}>
              A matriz de confusão não informa apenas quantos erros ocorreram, mas <strong>onde</strong> o classificador está se confundindo:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '8px 10px' }}>
                <strong style={{ fontSize: '10.5px', color: '#0A345D' }}>1. Confusão Simétrica vs Assimétrica:</strong>
                <p style={{ fontSize: '9.5px', color: '#475569', margin: '2px 0 0' }}>
                  Identifica se a Classe A é confundida com a Classe B de forma recíproca ou se o modelo tem forte tendência unidirecional para a classe com mais amostras.
                </p>
              </div>

              <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '8px 10px' }}>
                <strong style={{ fontSize: '10.5px', color: '#0A345D' }}>2. Análise de Custo Operacional:</strong>
                <p style={{ fontSize: '9.5px', color: '#475569', margin: '2px 0 0' }}>
                  Em aplicações reais, classificar uma peça com defeito como 'perfeita' possui custo financeiro ou de risco ordens de magnitude maior que o erro oposto.
                </p>
              </div>

              <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '8px 10px' }}>
                <strong style={{ fontSize: '10.5px', color: '#0A345D' }}>3. Guia para Data Augmentation:</strong>
                <p style={{ fontSize: '9.5px', color: '#475569', margin: '2px 0 0' }}>
                  Se a Classe 3 for sistematicamente confundida com a Classe 1, foca-se o aumento de dados e a regularização especificamente na fronteira dessas duas classes.
                </p>
              </div>
            </div>
          </div>

          <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '8px', padding: '8px 10px', fontSize: '10px', color: '#1E40AF', fontWeight: 600 }}>
            📝 <strong>Requisito Acadêmico:</strong> Sempre reporte a acurácia global acompanhada obrigatoriamente da acurácia por classe e curvas de loss/epoch.
          </div>
        </div>
      </div>
    </div>
  );
}
