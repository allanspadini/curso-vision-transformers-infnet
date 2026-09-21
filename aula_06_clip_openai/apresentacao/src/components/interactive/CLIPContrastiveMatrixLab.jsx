import React, { useState, useMemo } from 'react';
import { Sliders, RefreshCw, AlertCircle, CheckCircle2 } from 'lucide-react';
import MathView from '../MathView';

export default function CLIPContrastiveMatrixLab() {
  const [scenario, setScenario] = useState('aligned'); // 'aligned', 'initial', 'confused'
  const [temperature, setTemperature] = useState(0.07);
  const [activeTab, setActiveTab] = useState('logits'); // 'logits' | 'softmax_img' | 'softmax_txt'

  // Dados dos pares
  const pairs = [
    { id: 1, label: 'Cão (Golden)', img: 'Î₁', txt: 'T̂₁' },
    { id: 2, label: 'Carro Esportivo', img: 'Î₂', txt: 'T̂₂' },
    { id: 3, label: 'Avião Comercial', img: 'Î₃', txt: 'T̂₃' },
    { id: 4, label: 'Pizza de Forno', img: 'Î₄', txt: 'T̂₄' },
  ];

  // Matriz base de cossenos [-1.0, 1.0] dependendo do cenário
  const baseCosines = useMemo(() => {
    if (scenario === 'aligned') {
      return [
        [0.85, 0.05, -0.02, 0.04],
        [0.08, 0.92,  0.15, -0.05],
        [-0.01, 0.12, 0.88, 0.02],
        [0.03, -0.06, 0.01, 0.94],
      ];
    } else if (scenario === 'initial') {
      return [
        [0.12, 0.09, 0.11, 0.08],
        [0.07, 0.15, 0.13, 0.09],
        [0.10, 0.11, 0.14, 0.12],
        [0.08, 0.09, 0.11, 0.13],
      ];
    } else {
      // Confusão semântica: par (1, 4) com cosseno alto indevido
      return [
        [0.55, 0.04, -0.05, 0.52],
        [0.02, 0.89,  0.22, 0.01],
        [-0.02, 0.35, 0.65, 0.04],
        [0.48, 0.01,  0.03, 0.58],
      ];
    }
  }, [scenario]);

  // Cálculo de Logits S = Cosine / tau
  const logits = useMemo(() => {
    return baseCosines.map(row => row.map(v => v / temperature));
  }, [baseCosines, temperature]);

  // Softmax por Linhas (Image -> Text)
  const softmaxImg = useMemo(() => {
    return logits.map(row => {
      const maxVal = Math.max(...row);
      const exps = row.map(val => Math.exp(val - maxVal));
      const sumExps = exps.reduce((a, b) => a + b, 0);
      return exps.map(e => e / sumExps);
    });
  }, [logits]);

  // Softmax por Colunas (Text -> Image)
  const softmaxTxt = useMemo(() => {
    const B = logits.length;
    const res = Array.from({ length: B }, () => Array(B).fill(0));
    for (let j = 0; j < B; j++) {
      const col = logits.map(row => row[j]);
      const maxVal = Math.max(...col);
      const exps = col.map(val => Math.exp(val - maxVal));
      const sumExps = exps.reduce((a, b) => a + b, 0);
      for (let i = 0; i < B; i++) {
        res[i][j] = exps[i] / sumExps;
      }
    }
    return res;
  }, [logits]);

  // Perdas Cross-Entropy
  const { lossImg, lossTxt, totalLoss } = useMemo(() => {
    const B = logits.length;
    let sumImg = 0;
    let sumTxt = 0;

    for (let i = 0; i < B; i++) {
      sumImg += -Math.log(Math.max(softmaxImg[i][i], 1e-9));
      sumTxt += -Math.log(Math.max(softmaxTxt[i][i], 1e-9));
    }

    const lImg = sumImg / B;
    const lTxt = sumTxt / B;
    const lTot = 0.5 * (lImg + lTxt);

    return { lossImg: lImg, lossTxt: lTxt, totalLoss: lTot };
  }, [logits, softmaxImg, softmaxTxt]);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      
      {/* Barra de Controles do Laboratório */}
      <div style={{
        background: '#EDF5FA',
        border: '1px solid #D0E3F0',
        borderRadius: '10px',
        padding: '10px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        {/* Seletor de Cenário */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
            Cenário:
          </span>
          <button
            onClick={() => setScenario('aligned')}
            style={{
              padding: '4px 10px',
              borderRadius: '6px',
              fontSize: '11px',
              fontWeight: 600,
              cursor: 'pointer',
              border: 'none',
              background: scenario === 'aligned' ? '#16A34A' : '#FFFFFF',
              color: scenario === 'aligned' ? '#FFFFFF' : '#334155'
            }}
          >
            ✓ Convergido (Alinhado)
          </button>
          <button
            onClick={() => setScenario('initial')}
            style={{
              padding: '4px 10px',
              borderRadius: '6px',
              fontSize: '11px',
              fontWeight: 600,
              cursor: 'pointer',
              border: 'none',
              background: scenario === 'initial' ? '#0284C7' : '#FFFFFF',
              color: scenario === 'initial' ? '#FFFFFF' : '#334155'
            }}
          >
            ⚡ Início do Treino (Ruído)
          </button>
          <button
            onClick={() => setScenario('confused')}
            style={{
              padding: '4px 10px',
              borderRadius: '6px',
              fontSize: '11px',
              fontWeight: 600,
              cursor: 'pointer',
              border: 'none',
              background: scenario === 'confused' ? '#DC2626' : '#FFFFFF',
              color: scenario === 'confused' ? '#FFFFFF' : '#334155'
            }}
          >
            ⚠️ Confusão Semântica
          </button>
        </div>

        {/* Slider de Temperatura */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Sliders size={16} color="#0A345D" />
          <span style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
            Temperatura \tau:
          </span>
          <input
            type="range"
            min="0.01"
            max="0.50"
            step="0.01"
            value={temperature}
            onChange={(e) => setTemperature(parseFloat(e.target.value))}
            style={{ width: '110px', cursor: 'pointer' }}
          />
          <span style={{
            fontSize: '11.5px',
            fontFamily: 'Fira Code',
            fontWeight: 800,
            color: '#0A345D',
            background: '#FFFFFF',
            padding: '2px 8px',
            borderRadius: '4px',
            border: '1px solid #CBD5E1'
          }}>
            {temperature.toFixed(2)}
          </span>
          <button
            onClick={() => setTemperature(0.07)}
            title="Resetar para o padrão CLIP (0.07)"
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: '#64748B',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <RefreshCw size={14} />
          </button>
        </div>

        {/* Seletor de Visualização da Matriz */}
        <div style={{ display: 'flex', gap: '4px' }}>
          <button
            onClick={() => setActiveTab('logits')}
            style={{
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '10.5px',
              fontWeight: 700,
              cursor: 'pointer',
              border: 'none',
              background: activeTab === 'logits' ? 'var(--infnet-dark-blue)' : '#E2E8F0',
              color: activeTab === 'logits' ? '#FFFFFF' : '#475569'
            }}
          >
            Logits S = C/τ
          </button>
          <button
            onClick={() => setActiveTab('softmax_img')}
            style={{
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '10.5px',
              fontWeight: 700,
              cursor: 'pointer',
              border: 'none',
              background: activeTab === 'softmax_img' ? '#0284C7' : '#E2E8F0',
              color: activeTab === 'softmax_img' ? '#FFFFFF' : '#475569'
            }}
          >
            Softmax (Img➔Txt)
          </button>
          <button
            onClick={() => setActiveTab('softmax_txt')}
            style={{
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '10.5px',
              fontWeight: 700,
              cursor: 'pointer',
              border: 'none',
              background: activeTab === 'softmax_txt' ? '#9333EA' : '#E2E8F0',
              color: activeTab === 'softmax_txt' ? '#FFFFFF' : '#475569'
            }}
          >
            Softmax (Txt➔Img)
          </button>
        </div>
      </div>

      {/* Grid Central: Tabela Interativa + Painel de Perda */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 0.9fr', gap: '16px', flex: 1 }}>
        
        {/* Tabela Interativa de 4x4 */}
        <div style={{
          background: '#FFFFFF',
          border: '1.5px solid var(--border-light)',
          borderRadius: '12px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--infnet-dark-blue)' }}>
              {activeTab === 'logits' && `Matriz de Logits: S = Cosseno / ${temperature.toFixed(2)}`}
              {activeTab === 'softmax_img' && 'Distribuição Softmax por Linhas (P_img: Cada linha soma 100%)'}
              {activeTab === 'softmax_txt' && 'Distribuição Softmax por Colunas (P_txt: Cada coluna soma 100%)'}
            </span>
            <span style={{ fontSize: '10px', color: '#64748B' }}>
              Batch B = 4 pares
            </span>
          </div>

          {/* Tabela Visual */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '4px', textAlign: 'center' }}>
              <thead>
                <tr>
                  <th style={{ fontSize: '10px', color: '#64748B', padding: '4px' }}></th>
                  {pairs.map((p, j) => (
                    <th key={j} style={{ fontSize: '10.5px', fontWeight: 700, color: '#9333EA', padding: '4px' }}>
                      {p.txt} <br />
                      <span style={{ fontSize: '8.5px', color: '#6B21A8' }}>{p.label}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pairs.map((pRow, i) => (
                  <tr key={i}>
                    <td style={{ fontSize: '10.5px', fontWeight: 700, color: '#0284C7', padding: '4px', textAlign: 'right' }}>
                      {pRow.img} <span style={{ fontSize: '8.5px', color: '#0369A1' }}>{pRow.label}</span>
                    </td>
                    {pairs.map((pCol, j) => {
                      const isDiagonal = i === j;
                      const logitVal = logits[i][j];
                      const sImgVal = softmaxImg[i][j];
                      const sTxtVal = softmaxTxt[i][j];

                      let cellBg = '#FFFFFF';
                      let cellColor = '#0F172A';
                      let cellText = '';

                      if (activeTab === 'logits') {
                        cellText = logitVal.toFixed(1);
                        if (isDiagonal) {
                          cellBg = '#DCFCE7';
                          cellColor = '#15803D';
                        } else if (logitVal > 4.0) {
                          cellBg = '#FEE2E2';
                          cellColor = '#B91C1C';
                        } else {
                          cellBg = '#F8FAFC';
                          cellColor = '#475569';
                        }
                      } else if (activeTab === 'softmax_img') {
                        cellText = `${(sImgVal * 100).toFixed(1)}%`;
                        cellBg = isDiagonal ? `rgba(22, 163, 74, ${Math.max(sImgVal, 0.15)})` : `rgba(220, 38, 38, ${Math.max(sImgVal, 0.05)})`;
                        cellColor = isDiagonal ? (sImgVal > 0.6 ? '#FFFFFF' : '#15803D') : '#B91C1C';
                      } else {
                        cellText = `${(sTxtVal * 100).toFixed(1)}%`;
                        cellBg = isDiagonal ? `rgba(147, 51, 234, ${Math.max(sTxtVal, 0.15)})` : `rgba(220, 38, 38, ${Math.max(sTxtVal, 0.05)})`;
                        cellColor = isDiagonal ? (sTxtVal > 0.6 ? '#FFFFFF' : '#6B21A8') : '#B91C1C';
                      }

                      return (
                        <td
                          key={j}
                          style={{
                            background: cellBg,
                            color: cellColor,
                            fontWeight: isDiagonal ? 800 : 600,
                            padding: '10px 4px',
                            borderRadius: '6px',
                            fontSize: '11px',
                            fontFamily: 'Fira Code',
                            border: isDiagonal ? '2px solid #22C55E' : '1px solid #E2E8F0',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          {cellText}
                          {isDiagonal && (
                            <div style={{ fontSize: '8px', color: '#166534', fontWeight: 700 }}>
                              PAR CORRETO
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Painel da Perda Simétrica e Métricas */}
        <div style={{
          background: '#FFFFFF',
          border: '1.5px solid var(--border-light)',
          borderRadius: '12px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--infnet-dark-blue)' }}>
                Valores da Perda InfoNCE
              </span>
              <span style={{
                background: totalLoss < 0.2 ? '#DCFCE7' : totalLoss < 1.0 ? '#FEF3C7' : '#FEE2E2',
                color: totalLoss < 0.2 ? '#15803D' : totalLoss < 1.0 ? '#B45309' : '#B91C1C',
                padding: '2px 8px',
                borderRadius: '10px',
                fontSize: '10px',
                fontWeight: 800
              }}>
                {totalLoss < 0.2 ? 'Excelente' : totalLoss < 1.0 ? 'Moderado' : 'Alto'}
              </span>
            </div>

            {/* Caixa Perda Imagem */}
            <div style={{ background: '#F0F9FF', border: '1px solid #BAE6FD', padding: '10px', borderRadius: '8px', marginBottom: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#0369A1', fontWeight: 700 }}>
                <span>Perda Imagem ➔ Texto (L_img):</span>
                <span style={{ fontFamily: 'Fira Code', fontSize: '12px' }}>{lossImg.toFixed(4)}</span>
              </div>
              <div style={{ width: '100%', height: '6px', background: '#E0F2FE', borderRadius: '3px', marginTop: '6px' }}>
                <div style={{ height: '100%', width: `${Math.min(lossImg * 30, 100)}%`, background: '#0284C7', borderRadius: '3px' }} />
              </div>
            </div>

            {/* Caixa Perda Texto */}
            <div style={{ background: '#FAF5FF', border: '1px solid #E9D5FF', padding: '10px', borderRadius: '8px', marginBottom: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#7E22CE', fontWeight: 700 }}>
                <span>Perda Texto ➔ Imagem (L_txt):</span>
                <span style={{ fontFamily: 'Fira Code', fontSize: '12px' }}>{lossTxt.toFixed(4)}</span>
              </div>
              <div style={{ width: '100%', height: '6px', background: '#F3E8FF', borderRadius: '3px', marginTop: '6px' }}>
                <div style={{ height: '100%', width: `${Math.min(lossTxt * 30, 100)}%`, background: '#9333EA', borderRadius: '3px' }} />
              </div>
            </div>

            {/* Perda Total */}
            <div style={{ background: '#ECFDF5', border: '2px solid #22C55E', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#065F46' }}>
                PERDA TOTAL SIMÉTRICA L_CLIP = 0.5 × (L_img + L_txt)
              </div>
              <div style={{ fontSize: '26px', fontFamily: 'Fira Code', fontWeight: 800, color: '#15803D', margin: '4px 0' }}>
                {totalLoss.toFixed(4)}
              </div>
              <div style={{ fontSize: '9.5px', color: '#047857' }}>
                Teórico Mínimo: 0.0000 • Teórico Máximo: -log(1/4) = 1.3863
              </div>
            </div>
          </div>

          {/* Diagnóstico Pedagógico */}
          <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '10px', borderRadius: '6px', fontSize: '10.5px', color: '#334155' }}>
            <strong>Efeito da Temperatura:</strong> Se \tau for muito pequeno (&lt; 0.03), o Softmax vira uma função degrau rígida (gradientes saturam). Se \tau for alto (&gt; 0.3), a distribuição se espalha uniformemente e o modelo perde a capacidade de discriminar nuances finas.
          </div>
        </div>

      </div>
    </div>
  );
}
