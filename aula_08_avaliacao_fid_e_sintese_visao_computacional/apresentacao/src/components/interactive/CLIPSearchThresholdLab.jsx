import React, { useState } from 'react';
import MathView from '../MathView';

export default function CLIPSearchThresholdLab() {
  const [selectedQuery, setSelectedQuery] = useState('car');
  const [threshold, setThreshold] = useState(0.25);

  const queries = {
    car: {
      text: 'a photo of a modern sports car on a highway',
      type: 'Concreta / Objeto Específico',
      scores: [
        { id: 1, title: 'Carro Esportivo Vermelho', trueMatch: true, sim: 0.34, icon: '🏎️', desc: 'Carro em alta velocidade' },
        { id: 2, title: 'Rodovia Movimentada', trueMatch: true, sim: 0.29, icon: '🛣️', desc: 'Estrada com veículos' },
        { id: 3, title: 'Motocicleta na Pista', trueMatch: false, sim: 0.24, icon: '🏍️', desc: 'Veículo sobre rodas de 2 eixos' },
        { id: 4, title: 'Interior de Escritório', trueMatch: false, sim: 0.16, icon: '🏢', desc: 'Mesa e computadores' },
        { id: 5, title: 'Paisagem Florestal', trueMatch: false, sim: 0.13, icon: '🌲', desc: 'Árvores e montanhas' },
        { id: 6, title: 'Avião Decolando', trueMatch: false, sim: 0.19, icon: '✈️', desc: 'Meio de transporte aéreo' }
      ]
    },
    cells: {
      text: 'a microscopic view of circular cell structures',
      type: 'Técnica / Domínio Científico',
      scores: [
        { id: 1, title: 'Microscopia Celular', trueMatch: true, sim: 0.32, icon: '🔬', desc: 'Membranas e núcleos' },
        { id: 2, title: 'Textura com Pontos', trueMatch: false, sim: 0.26, icon: '🫧', desc: 'Bolhas de sabão (formato esférico)' },
        { id: 3, title: 'Cultura de Bactérias', trueMatch: true, sim: 0.28, icon: '🧫', desc: 'Colônias em placa de Petri' },
        { id: 4, title: 'Carro Esportivo Vermelho', trueMatch: false, sim: 0.12, icon: '🏎️', desc: 'Veículo terrestre' },
        { id: 5, title: 'Tecido Textil', trueMatch: false, sim: 0.18, icon: '🧶', desc: 'Fibras entrelaçadas' },
        { id: 6, title: 'Cena Noturna Urbana', trueMatch: false, sim: 0.14, icon: '🌃', desc: 'Luzes de cidade' }
      ]
    },
    freedom: {
      text: 'a feeling of freedom, open sky and solitude',
      type: 'Conceitual / Abstrata',
      scores: [
        { id: 1, title: 'Pessoa no Topo da Montanha', trueMatch: true, sim: 0.29, icon: '🏔️', desc: 'Céu aberto e horizonte' },
        { id: 2, title: 'Pássaro Voando', trueMatch: true, sim: 0.27, icon: '🦅', desc: 'Voo livre nas nuvens' },
        { id: 3, title: 'Estrada Vazia ao Pôr do Sol', trueMatch: true, sim: 0.26, icon: '🌅', desc: 'Tranquilidade e solitude' },
        { id: 4, title: 'Engarrafamento de Trânsito', trueMatch: false, sim: 0.15, icon: '🚗', desc: 'Estresse urbano (antítese)' },
        { id: 5, title: 'Documento Escrito', trueMatch: false, sim: 0.11, icon: '📄', desc: 'Texto administrativo' },
        { id: 6, title: 'Praia Deserta', trueMatch: true, sim: 0.28, icon: '🏖️', desc: 'Mar calmo e horizonte' }
      ]
    }
  };

  const currentData = queries[selectedQuery];
  const sortedItems = [...currentData.scores].sort((a, b) => b.sim - a.sim);

  const accepted = sortedItems.filter((item) => item.sim >= threshold);
  const truePositives = accepted.filter((item) => item.trueMatch).length;
  const falsePositives = accepted.filter((item) => !item.trueMatch).length;
  const totalTrueMatches = sortedItems.filter((item) => item.trueMatch).length;
  const falseNegatives = totalTrueMatches - truePositives;

  const precision = accepted.length > 0 ? (truePositives / accepted.length) * 100 : 100;
  const recall = totalTrueMatches > 0 ? (truePositives / totalTrueMatches) * 100 : 0;

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
        padding: '8px 16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{
            background: 'var(--infnet-dark-blue)',
            color: '#FFFFFF',
            fontSize: '11px',
            fontWeight: 700,
            padding: '3px 10px',
            borderRadius: '4px',
            fontFamily: 'var(--font-code)'
          }}>
            LAB INTERATIVO
          </span>
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--infnet-dark-blue)' }}>
            Simulador de Busca Semântica e Calibração de Thresholds no CLIP
          </span>
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            onClick={() => setSelectedQuery('car')}
            style={{
              padding: '4px 10px',
              fontSize: '10.5px',
              fontWeight: 700,
              borderRadius: '6px',
              border: selectedQuery === 'car' ? '2px solid #0284C7' : '1px solid #CBD5E1',
              background: selectedQuery === 'car' ? '#F0F9FF' : '#FFFFFF',
              color: selectedQuery === 'car' ? '#0369A1' : '#475569',
              cursor: 'pointer'
            }}
          >
            Consulta Concreta (Carro)
          </button>
          <button
            onClick={() => setSelectedQuery('cells')}
            style={{
              padding: '4px 10px',
              fontSize: '10.5px',
              fontWeight: 700,
              borderRadius: '6px',
              border: selectedQuery === 'cells' ? '2px solid #7C3AED' : '1px solid #CBD5E1',
              background: selectedQuery === 'cells' ? '#FAF5FF' : '#FFFFFF',
              color: selectedQuery === 'cells' ? '#6B21A8' : '#475569',
              cursor: 'pointer'
            }}
          >
            Consulta Técnica (Microscopia)
          </button>
          <button
            onClick={() => setSelectedQuery('freedom')}
            style={{
              padding: '4px 10px',
              fontSize: '10.5px',
              fontWeight: 700,
              borderRadius: '6px',
              border: selectedQuery === 'freedom' ? '2px solid #059669' : '1px solid #CBD5E1',
              background: selectedQuery === 'freedom' ? '#ECFDF5' : '#FFFFFF',
              color: selectedQuery === 'freedom' ? '#059669' : '#475569',
              cursor: 'pointer'
            }}
          >
            Consulta Abstrata (Liberdade)
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '310px 1fr 270px',
        gap: '12px',
        minHeight: 0
      }}>
        {/* Left Column: Query Config & Threshold Slider */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid var(--border-light)',
          borderRadius: '12px',
          padding: '14px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div>
            <span style={{ fontSize: '12px', fontWeight: 800, color: '#0A345D' }}>
              Consulta em Linguagem Natural
            </span>

            <div style={{ background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '10px', marginTop: '8px', marginBottom: '14px' }}>
              <span style={{ fontSize: '9px', textTransform: 'uppercase', color: '#64748B', fontWeight: 700 }}>
                {currentData.type}
              </span>
              <div style={{ fontSize: '11.5px', fontStyle: 'italic', color: '#0F172A', marginTop: '4px', fontWeight: 600 }}>
                "{currentData.text}"
              </div>
            </div>

            {/* Threshold Slider */}
            <div style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#1E293B' }}>
                  Limiar de Corte (Threshold τ):
                </span>
                <span style={{ fontFamily: 'var(--font-code)', fontSize: '13px', fontWeight: 800, color: '#0284C7' }}>
                  {threshold.toFixed(2)}
                </span>
              </div>
              <input
                type="range"
                min="0.15"
                max="0.33"
                step="0.01"
                value={threshold}
                onChange={(e) => setThreshold(parseFloat(e.target.value))}
                style={{ width: '100%', accentColor: '#0284C7' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', color: '#64748B', marginTop: '2px' }}>
                <span>0.15 (Permissivo / Alto Recall)</span>
                <span>0.33 (Rigoroso / Alta Precisão)</span>
              </div>
            </div>

            <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '8px', padding: '8px 10px', fontSize: '10px', color: '#1E40AF' }}>
              ℹ️ Apenas imagens com similaridade <MathView math="S \ge \tau" /> são consideradas detecções positivas da consulta textual.
            </div>
          </div>

          <div style={{ fontSize: '9.5px', color: '#64748B' }}>
            Baseado no modelo CLIP ViT-B/32 com embeddings normalizados L2.
          </div>
        </div>

        {/* Center Column: Ranked Images Grid */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid var(--border-light)',
          borderRadius: '12px',
          padding: '14px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '12px', fontWeight: 800, color: '#0A345D' }}>
              Ranking Ordenado por Similaridade de Cosseno (Top-6)
            </span>
            <span style={{ fontSize: '10px', color: '#64748B' }}>
              Recuperados: <strong style={{ color: '#0A345D' }}>{accepted.length} de {sortedItems.length}</strong>
            </span>
          </div>

          <div style={{
            flex: 1,
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '10px'
          }}>
            {sortedItems.map((item, idx) => {
              const isAccepted = item.sim >= threshold;
              return (
                <div
                  key={item.id}
                  style={{
                    background: isAccepted ? '#F0FDF4' : '#F8FAFC',
                    border: isAccepted ? '2px solid #86EFAC' : '1px dashed #CBD5E1',
                    borderRadius: '8px',
                    padding: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    opacity: isAccepted ? 1.0 : 0.45,
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <span style={{ fontSize: '10px', fontWeight: 700, color: '#64748B' }}>#{idx + 1}</span>
                      <span style={{
                        background: isAccepted ? '#DCFCE7' : '#F1F5F9',
                        color: isAccepted ? '#166534' : '#64748B',
                        fontSize: '9px',
                        fontWeight: 700,
                        padding: '2px 6px',
                        borderRadius: '4px'
                      }}>
                        {isAccepted ? 'RECUPERADO' : 'REJEITADO'}
                      </span>
                    </div>

                    <div style={{ textAlign: 'center', fontSize: '26px', margin: '4px 0' }}>
                      {item.icon}
                    </div>

                    <strong style={{ fontSize: '11px', color: '#0F172A', display: 'block', textAlign: 'center' }}>
                      {item.title}
                    </strong>
                    <span style={{ fontSize: '9px', color: '#64748B', display: 'block', textAlign: 'center', marginTop: '2px' }}>
                      {item.desc}
                    </span>
                  </div>

                  <div style={{
                    marginTop: '8px',
                    background: isAccepted ? '#FFFFFF' : '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: '6px',
                    padding: '4px 8px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span style={{ fontSize: '9px', color: '#64748B' }}>Score cos:</span>
                    <span style={{ fontFamily: 'var(--font-code)', fontSize: '11px', fontWeight: 800, color: isAccepted ? '#166534' : '#64748B' }}>
                      {item.sim.toFixed(2)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Retrieval Metrics & Precision/Recall */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid var(--border-light)',
          borderRadius: '12px',
          padding: '14px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div>
            <span style={{ fontSize: '12px', fontWeight: 800, color: '#0A345D' }}>
              Métricas do Retrieval
            </span>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' }}>
              {/* Precision Card */}
              <div style={{ background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '8px 10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '10px', color: '#475569', fontWeight: 600 }}>Precisão:</span>
                  <span style={{ fontFamily: 'var(--font-code)', fontSize: '13px', fontWeight: 800, color: '#0A345D' }}>
                    {precision.toFixed(1)}%
                  </span>
                </div>
                <span style={{ fontSize: '8.5px', color: '#64748B' }}>Acertos / Total Recuperados ({truePositives}/{accepted.length})</span>
              </div>

              {/* Recall Card */}
              <div style={{ background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '8px 10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '10px', color: '#475569', fontWeight: 600 }}>Recall (Cobertura):</span>
                  <span style={{ fontFamily: 'var(--font-code)', fontSize: '13px', fontWeight: 800, color: '#0284C7' }}>
                    {recall.toFixed(1)}%
                  </span>
                </div>
                <span style={{ fontSize: '8.5px', color: '#64748B' }}>Acertos / Relevantes Existentes ({truePositives}/{totalTrueMatches})</span>
              </div>

              {/* False Positives & Negatives */}
              <div style={{ background: '#FFF7ED', border: '1px solid #FED7AA', borderRadius: '8px', padding: '8px 10px', fontSize: '9.5px', color: '#9A3412' }}>
                <div>Falsos Positivos: <strong>{falsePositives}</strong></div>
                <div>Falsos Negativos: <strong>{falseNegatives}</strong></div>
              </div>
            </div>
          </div>

          <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '8px', padding: '8px 10px', fontSize: '9.5px', color: '#166534' }}>
            🎯 <strong>Diretriz do Projeto:</strong> Ao implementar busca semântica, varie o threshold e documente as imagens recuperadas para ao menos 8 consultas distintas.
          </div>
        </div>
      </div>
    </div>
  );
}
