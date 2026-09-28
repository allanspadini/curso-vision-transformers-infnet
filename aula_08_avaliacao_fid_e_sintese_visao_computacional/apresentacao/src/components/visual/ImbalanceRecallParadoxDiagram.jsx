import React from 'react';
import MathView from '../MathView';

export default function ImbalanceRecallParadoxDiagram() {
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
            REVISÃO TEÓRICA IV
          </span>
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--infnet-dark-blue)' }}>
            O Paradoxo da Acurácia sob Desbalanceamento Severo e a Primazia do Recall
          </span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <span className="badge badge-red" style={{ fontSize: '11px' }}>Paradoxo da Acurácia</span>
          <span className="badge badge-green" style={{ fontSize: '11px' }}>Recall / Sensibilidade</span>
          <span className="badge badge-purple" style={{ fontSize: '11px' }}>F1-Macro</span>
        </div>
      </div>

      {/* Main Grid */}
      <div style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '1fr 1.15fr',
        gap: '14px',
        minHeight: 0
      }}>
        {/* Left Column: The Paradox Demonstration */}
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
              <strong style={{ fontSize: '13px', color: '#0A345D' }}>1. A Armadilha da Acurácia Global</strong>
              <span className="badge badge-red" style={{ fontSize: '9px' }}>Colapso Trivial</span>
            </div>

            <p style={{ fontSize: '11px', color: '#475569', lineHeight: '1.4', marginBottom: '10px' }}>
              Considere um conjunto de teste com <strong>1.000 amostras</strong>: 900 são da classe comum (90%) e 100 são da classe rara/crítica (10%).
            </p>

            {/* Dummy Model Box */}
            <div style={{ background: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: '8px', padding: '10px', marginBottom: '10px' }}>
              <span style={{ fontSize: '10.5px', fontWeight: 700, color: '#991B1B' }}>
                Classificador Degenerado (Prediz Sempre Classe Majoritária):
              </span>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '6px' }}>
                <div style={{ background: '#FFFFFF', padding: '6px', borderRadius: '6px', textAlign: 'center' }}>
                  <span style={{ fontSize: '9px', color: '#64748B' }}>Acurácia Global:</span>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: '#166534', fontFamily: 'var(--font-code)' }}>90.0%</div>
                  <span style={{ fontSize: '8.5px', color: '#166534' }}>Parece "promissor"</span>
                </div>
                <div style={{ background: '#FFFFFF', padding: '6px', borderRadius: '6px', textAlign: 'center' }}>
                  <span style={{ fontSize: '9px', color: '#64748B' }}>Recall da Classe Rara:</span>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: '#DC2626', fontFamily: 'var(--font-code)' }}>0.0%</div>
                  <span style={{ fontSize: '8.5px', color: '#DC2626' }}>Ignora 100% dos casos!</span>
                </div>
              </div>
            </div>

            <div style={{ fontSize: '10.5px', color: '#334155', lineHeight: '1.5' }}>
              <p style={{ margin: '0 0 6px' }}>
                💥 <strong>Impacto Operacional & Clínico:</strong> O modelo é estatisticamente inútil e perigoso. Todos os 100 casos raros tornam-se <strong>Falsos Negativos (FN)</strong>, passando desapercebidos.
              </p>
              <p style={{ margin: 0 }}>
                Em qualquer sistema onde o custo do Falso Negativo supera o Falso Positivo, a acurácia global é uma métrica inteiramente descabida.
              </p>
            </div>
          </div>

          <div style={{ background: '#FFF7ED', border: '1px solid #FED7AA', borderRadius: '8px', padding: '8px 10px', fontSize: '10px', color: '#9A3412', fontWeight: 600 }}>
            ⚠️ Alerta Técnico: Equipes ingênuas encerram projetos reportando 90%+ de acurácia sem perceber que o Recall da classe crítica é nulo.
          </div>
        </div>

        {/* Right Column: Mathematical Formulas & Governance Metrics */}
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
              <strong style={{ fontSize: '13px', color: '#0A345D' }}>2. Métricas Diagnósticas Obrigatórias</strong>
              <span className="badge badge-green" style={{ fontSize: '9px' }}>Governança Técnica</span>
            </div>

            {/* Metrics Grid */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {/* Recall */}
              <div style={{ background: '#F0FDF4', border: '1px solid #86EFAC', borderRadius: '8px', padding: '8px 12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ fontSize: '11px', color: '#166534' }}>Sensibilidade / Recall (Taxa de Verdadeiros Positivos):</strong>
                  <MathView math="\text{Recall} = \frac{\text{TP}}{\text{TP} + \text{FN}}" />
                </div>
                <p style={{ fontSize: '9.5px', color: '#14532D', margin: '3px 0 0' }}>
                  Mede a capacidade do modelo de capturar todos os eventos críticos. Denominador inclui os casos omitidos (<MathView math="\text{FN}" />).
                </p>
              </div>

              {/* Precision */}
              <div style={{ background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '8px 12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ fontSize: '11px', color: '#0A345D' }}>Precisão (Valor Preditivo Positivo):</strong>
                  <MathView math="\text{Precision} = \frac{\text{TP}}{\text{TP} + \text{FP}}" />
                </div>
                <p style={{ fontSize: '9.5px', color: '#475569', margin: '3px 0 0' }}>
                  Fração de alarmes emitidos pelo modelo que realmente correspondiam a casos verdadeiros.
                </p>
              </div>

              {/* Specificity */}
              <div style={{ background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '8px 12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ fontSize: '11px', color: '#0A345D' }}>Especificidade:</strong>
                  <MathView math="\text{Especificidade} = \frac{\text{TN}}{\text{TN} + \text{FP}}" />
                </div>
                <p style={{ fontSize: '9.5px', color: '#475569', margin: '3px 0 0' }}>
                  Taxa de identificação correta dos casos negativos (ausência de alarmes falsos).
                </p>
              </div>

              {/* F1-Score */}
              <div style={{ background: '#FAF5FF', border: '1px solid #E9D5FF', borderRadius: '8px', padding: '8px 12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ fontSize: '11px', color: '#6B21A8' }}>F1-Score (Média Harmônica):</strong>
                  <MathView math="F_1 = 2 \cdot \frac{\text{Precision} \cdot \text{Recall}}{\text{Precision} + \text{Recall}}" />
                </div>
                <p style={{ fontSize: '9.5px', color: '#581C87', margin: '3px 0 0' }}>
                  Penaliza modelos com desequilíbrio entre Precisão e Recall. Se o Recall for zero, o <MathView math="F_1" /> é estritamente zero!
                </p>
              </div>
            </div>
          </div>

          <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '8px', padding: '8px 10px', fontSize: '10px', color: '#1E40AF', fontWeight: 600 }}>
            🎯 Regra de Governança: Modelos de triagem e alto risco devem ser otimizados visando maximizar o Recall da classe minoritária.
          </div>
        </div>
      </div>
    </div>
  );
}
