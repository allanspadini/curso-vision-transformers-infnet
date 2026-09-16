import React, { useState } from 'react';

export default function DeiTDistillationLab() {
  const [distillMode, setDistillMode] = useState('hard'); // 'hard' | 'soft'
  const [lambdaWeight, setLambdaWeight] = useState(0.5); // 0.0 to 1.0
  const [temperature, setTemperature] = useState(3.0); // 1.0 to 10.0
  const [selectedClass, setSelectedClass] = useState('golden_retriever');

  const samples = {
    golden_retriever: {
      name: 'Golden Retriever (Cão)',
      gt: { golden_retriever: 1.0, labrador: 0.0, dingo: 0.0, cocker_spaniel: 0.0 },
      teacherLogits: { golden_retriever: 8.5, labrador: 6.2, cocker_spaniel: 3.1, dingo: 1.2 },
      studentRawLogits: { golden_retriever: 4.8, labrador: 4.5, cocker_spaniel: 4.0, dingo: 3.8 }
    },
    sports_car: {
      name: 'Carro Esportivo',
      gt: { sports_car: 1.0, convertible: 0.0, race_car: 0.0, pickup: 0.0 },
      teacherLogits: { sports_car: 9.1, race_car: 6.8, convertible: 5.2, pickup: 0.8 },
      studentRawLogits: { sports_car: 4.2, convertible: 4.1, race_car: 4.0, pickup: 3.5 }
    }
  };

  const sample = samples[selectedClass];

  const computeSoftmax = (logits, temp = 1.0) => {
    const keys = Object.keys(logits);
    const expVals = keys.map((k) => Math.exp(logits[k] / temp));
    const sumExp = expVals.reduce((a, b) => a + b, 0);
    const probs = {};
    keys.forEach((k, idx) => {
      probs[k] = expVals[idx] / sumExp;
    });
    return probs;
  };

  const teacherProbs = computeSoftmax(sample.teacherLogits, distillMode === 'soft' ? temperature : 1.0);
  const studentRawProbs = computeSoftmax(sample.studentRawLogits, 1.0);

  const distilledProbs = {};
  Object.keys(sample.gt).forEach((k) => {
    if (distillMode === 'hard') {
      const teacherPredClass = Object.keys(sample.teacherLogits).reduce((a, b) =>
        sample.teacherLogits[a] > sample.teacherLogits[b] ? a : b
      );
      const hardTeacherVal = k === teacherPredClass ? 1.0 : 0.0;
      const combinedTarget = (1 - lambdaWeight) * sample.gt[k] + lambdaWeight * hardTeacherVal;
      distilledProbs[k] = (1 - lambdaWeight * 0.7) * studentRawProbs[k] + (lambdaWeight * 0.7) * combinedTarget;
    } else {
      distilledProbs[k] = (1 - lambdaWeight) * studentRawProbs[k] + lambdaWeight * teacherProbs[k];
    }
  });

  const sumDist = Object.values(distilledProbs).reduce((a, b) => a + b, 0);
  Object.keys(distilledProbs).forEach((k) => {
    distilledProbs[k] = distilledProbs[k] / sumDist;
  });

  const expectedAcc =
    distillMode === 'hard'
      ? (79.9 + lambdaWeight * 5.3).toFixed(1)
      : (79.9 + lambdaWeight * 4.2 - (temperature > 5 ? (temperature - 5) * 0.4 : 0)).toFixed(1);

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      padding: '8px 24px',
      boxSizing: 'border-box'
    }}>
      {/* Top Banner Claro */}
      <div style={{
        background: '#FFFFFF',
        border: '1px solid #E2E8F0',
        borderRadius: '12px',
        padding: '10px 18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '12px',
        boxShadow: '0 2px 8px rgba(10, 52, 93, 0.05)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{
            background: '#FFEDD5',
            color: '#C2410C',
            padding: '3px 8px',
            borderRadius: '4px',
            fontSize: '11px',
            fontWeight: 800
          }}>LAB INTERATIVO</span>
          <span style={{ color: 'var(--infnet-dark-blue)', fontSize: '14px', fontWeight: 700 }}>
            Simulador de Destilação de Conhecimento DeiT: Parâmetros & Comportamento dos Logits
          </span>
        </div>

        {/* Seletor de Amostra */}
        <div style={{ display: 'flex', gap: '8px' }}>
          {Object.keys(samples).map((k) => (
            <button
              key={k}
              onClick={() => setSelectedClass(k)}
              style={{
                background: selectedClass === k ? '#EA580C' : '#F8FAFC',
                color: selectedClass === k ? '#FFFFFF' : '#475569',
                border: selectedClass === k ? '1px solid #EA580C' : '1px solid #CBD5E1',
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '11px',
                cursor: 'pointer',
                fontWeight: selectedClass === k ? 700 : 500
              }}
            >
              {samples[k].name}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Principal Claro */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '360px 1fr',
        gap: '16px',
        flex: 1
      }}>
        {/* Painel de Controles */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: '12px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: '0 4px 12px rgba(10, 52, 93, 0.04)'
        }}>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--infnet-dark-blue)', marginBottom: '14px' }}>
              Parâmetros de Destilação
            </div>

            {/* Modo de Destilação */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '11px', color: '#64748B', display: 'block', marginBottom: '6px', fontWeight: 600 }}>
                ESTRATÉGIA DE DESTILAÇÃO:
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <button
                  onClick={() => setDistillMode('hard')}
                  style={{
                    background: distillMode === 'hard' ? '#EA580C' : '#F8FAFC',
                    color: distillMode === 'hard' ? '#FFFFFF' : '#334155',
                    border: distillMode === 'hard' ? '1px solid #EA580C' : '1px solid #CBD5E1',
                    padding: '8px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Hard (DeiT Padrão)
                </button>
                <button
                  onClick={() => setDistillMode('soft')}
                  style={{
                    background: distillMode === 'soft' ? '#0284C7' : '#F8FAFC',
                    color: distillMode === 'soft' ? '#FFFFFF' : '#334155',
                    border: distillMode === 'soft' ? '1px solid #0284C7' : '1px solid #CBD5E1',
                    padding: '8px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Soft (Hinton KL)
                </button>
              </div>
            </div>

            {/* Slider Peso Lambda */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontSize: '11px', color: '#334155', fontWeight: 600 }}>Peso do Professor (λ):</span>
                <span style={{ fontFamily: 'Fira Code', fontSize: '11px', color: '#C2410C', fontWeight: 700 }}>
                  {lambdaWeight.toFixed(2)}
                </span>
              </div>
              <input
                type="range"
                min="0.0"
                max="1.0"
                step="0.05"
                value={lambdaWeight}
                onChange={(e) => setLambdaWeight(parseFloat(e.target.value))}
                style={{ width: '100%', accentColor: '#EA580C', cursor: 'pointer' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', color: '#64748B' }}>
                <span>0.0 (ViT Puro)</span>
                <span>0.5 (DeiT Equilibrado)</span>
                <span>1.0 (Só Professor)</span>
              </div>
            </div>

            {/* Slider Temperatura */}
            <div style={{ marginBottom: '16px', opacity: distillMode === 'soft' ? 1 : 0.4 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontSize: '11px', color: '#334155', fontWeight: 600 }}>Temperatura Softmax (τ):</span>
                <span style={{ fontFamily: 'Fira Code', fontSize: '11px', color: '#0369A1', fontWeight: 700 }}>
                  {temperature.toFixed(1)}
                </span>
              </div>
              <input
                type="range"
                min="1.0"
                max="8.0"
                step="0.5"
                disabled={distillMode !== 'soft'}
                value={temperature}
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                style={{ width: '100%', accentColor: '#0284C7', cursor: 'pointer' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', color: '#64748B' }}>
                <span>1.0 (Harder)</span>
                <span>3.0 (Típico)</span>
                <span>8.0 (Suavizado)</span>
              </div>
            </div>
          </div>

          {/* Métrica de Desempenho */}
          <div style={{
            background: '#F0FDF4',
            border: '1.5px solid #BBF7D0',
            borderRadius: '8px',
            padding: '12px'
          }}>
            <div style={{ fontSize: '10px', color: '#166534', textTransform: 'uppercase', marginBottom: '2px', fontWeight: 700 }}>
              Acurácia Estimada ImageNet-1k (DeiT-Base):
            </div>
            <div style={{
              fontFamily: 'Fira Code',
              fontSize: '22px',
              fontWeight: 800,
              color: '#15803D'
            }}>
              {expectedAcc}% Top-1
            </div>
            <div style={{ fontSize: '11px', color: '#334155', marginTop: '4px' }}>
              ViT original sem destilação: <strong>79.9%</strong> (Salto de +{(expectedAcc - 79.9).toFixed(1)}%)
            </div>
          </div>
        </div>

        {/* Visualizador de Probabilidades Claro */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: '12px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: '0 4px 12px rgba(10, 52, 93, 0.04)'
        }}>
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '12px',
              borderBottom: '1px solid #E2E8F0',
              paddingBottom: '8px'
            }}>
              <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--infnet-dark-blue)' }}>
                Distribuição de Probabilidades Softmax por Classe
              </span>
              <div style={{ display: 'flex', gap: '12px', fontSize: '10px', fontWeight: 700 }}>
                <span style={{ color: '#16A34A' }}>■ CNN Teacher</span>
                <span style={{ color: '#EA580C' }}>■ ViT Puro</span>
                <span style={{ color: '#0284C7' }}>■ DeiT Destilado</span>
              </div>
            </div>

            {/* Barras Comparativas */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {Object.keys(sample.gt).map((className) => {
                const pTeacher = (teacherProbs[className] * 100).toFixed(1);
                const pRaw = (studentRawProbs[className] * 100).toFixed(1);
                const pDist = (distilledProbs[className] * 100).toFixed(1);

                return (
                  <div key={className} style={{
                    background: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px',
                    padding: '8px 12px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '6px' }}>
                      <span style={{ fontWeight: 700, color: '#0F172A', fontFamily: 'Fira Code' }}>
                        {className} {sample.gt[className] === 1.0 ? '★ (GT Real)' : ''}
                      </span>
                      <span style={{ fontSize: '10px', color: '#64748B' }}>
                        T: {pTeacher}% | ViT: {pRaw}% | <strong style={{ color: '#0369A1' }}>DeiT: {pDist}%</strong>
                      </span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      {/* Barra Teacher */}
                      <div style={{ height: '6px', width: '100%', background: '#E2E8F0', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ width: `${pTeacher}%`, height: '100%', background: '#16A34A' }} />
                      </div>
                      {/* Barra Student Puro */}
                      <div style={{ height: '6px', width: '100%', background: '#E2E8F0', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ width: `${pRaw}%`, height: '100%', background: '#EA580C' }} />
                      </div>
                      {/* Barra DeiT */}
                      <div style={{ height: '8px', width: '100%', background: '#E2E8F0', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ width: `${pDist}%`, height: '100%', background: '#0284C7' }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Rodapé Dinâmico */}
          <div style={{
            background: '#F0F9FF',
            border: '1px solid #BAE6FD',
            borderRadius: '8px',
            padding: '10px 14px',
            fontSize: '11px',
            color: '#334155',
            marginTop: '10px'
          }}>
            {distillMode === 'hard' ? (
              <span>
                💡 <strong>Hard Distillation em Ação:</strong> O token <code style={{ color: '#C2410C', fontWeight: 700 }}>[DIST]</code> é empurrado em direção à classe exata do professor CNN com força total, conferindo ao ViT a robustez e certeza de filtros de convolução.
              </span>
            ) : (
              <span>
                💡 <strong>Soft Distillation em Ação:</strong> Com temperatura <code style={{ color: '#0369A1', fontWeight: 700 }}>τ={temperature}</code>, as probabilidades do professor são espalhadas entre classes correlacionadas (ex: cães parecidos), transmitindo o "conhecimento escuro" (dark knowledge).
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
