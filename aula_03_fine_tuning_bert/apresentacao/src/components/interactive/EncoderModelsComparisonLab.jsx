import React, { useState } from 'react';
import MathView from '../MathView';

export default function EncoderModelsComparisonLab() {
  const [selectedModel, setSelectedModel] = useState('bert-base');
  const [batchSize, setBatchSize] = useState(16);
  const [seqLen, setSeqLen] = useState(128);

  const models = {
    'distilbert': {
      name: 'DistilBERT',
      params: 66,
      layers: 6,
      hidden: 768,
      heads: 12,
      glue: 77.0,
      baseSpeedMs: 4,
      color: '#EA580C',
      ideal: 'Microsserviços de ultra-baixa latência e dispositivos de borda.'
    },
    'bert-base': {
      name: 'BERT-Base',
      params: 110,
      layers: 12,
      hidden: 768,
      heads: 12,
      glue: 79.6,
      baseSpeedMs: 8,
      color: '#0284C7',
      ideal: 'Padrão didático da literatura acadêmica e classificação geral.'
    },
    'roberta-base': {
      name: 'RoBERTa-Base',
      params: 125,
      layers: 12,
      hidden: 768,
      heads: 12,
      glue: 86.4,
      baseSpeedMs: 8.5,
      color: '#16A34A',
      ideal: 'A escolha robusta para tarefas de produção sem restrição severa de latência.'
    },
    'deberta-v3': {
      name: 'DeBERTa-v3-Base',
      params: 86,
      layers: 12,
      hidden: 768,
      heads: 12,
      glue: 88.1,
      baseSpeedMs: 11,
      color: '#7C3AED',
      ideal: 'Estado da arte em acurácia para tarefas analíticas complexas e NLI.'
    },
    'bert-large': {
      name: 'BERT-Large',
      params: 340,
      layers: 24,
      hidden: 1024,
      heads: 16,
      glue: 82.1,
      baseSpeedMs: 24,
      color: '#E11D48',
      ideal: 'Alta capacidade semântica quando há GPU de 24GB+ disponível.'
    }
  };

  const current = models[selectedModel];

  // Dynamic calculations
  // Weights size in MB (FP32 = 4 bytes per param, FP16 = 2 bytes)
  const weightsMemMB = (current.params * 4).toFixed(0);
  // Activations rough estimate: O(B * L * H * layers * 4 bytes) + Attention quadratic O(B * heads * L^2 * layers * 2 bytes)
  const actMemMB = (((batchSize * seqLen * current.hidden * current.layers * 4) + (batchSize * current.heads * seqLen * seqLen * current.layers * 2)) / (1024 * 1024)).toFixed(1);
  const totalMemMB = (parseFloat(weightsMemMB) + parseFloat(actMemMB) * 1.5).toFixed(0);
  
  // Latency rough estimate
  const gpuLatency = (current.baseSpeedMs * (seqLen / 128) * Math.sqrt(batchSize / 16)).toFixed(1);
  const throughput = ((batchSize / (gpuLatency / 1000))).toFixed(0);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {/* Model Selection Tabs */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '6px'
      }}>
        {Object.entries(models).map(([key, m]) => (
          <button
            key={key}
            onClick={() => setSelectedModel(key)}
            style={{
              padding: '6px 8px',
              borderRadius: '6px',
              border: selectedModel === key ? `2px solid ${m.color}` : '1px solid #CBD5E1',
              background: selectedModel === key ? '#FFFFFF' : '#F8FAFC',
              color: selectedModel === key ? m.color : '#475569',
              fontWeight: 700,
              fontSize: '11px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              textAlign: 'center',
              boxShadow: selectedModel === key ? '0 2px 8px rgba(0,0,0,0.06)' : 'none'
            }}
          >
            <div>{m.name}</div>
            <div style={{ fontSize: '9.5px', color: '#64748B', fontWeight: 500 }}>{m.params}M • GLUE {m.glue}</div>
          </button>
        ))}
      </div>

      {/* Main Controls & Simulation Display */}
      <div style={{
        flex: 1,
        minHeight: 0,
        background: '#FFFFFF',
        border: '1px solid #E2E8F0',
        borderRadius: '10px',
        padding: '12px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '14px'
      }}>
        {/* Left: Sliders & Parameter Config */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--infnet-dark-blue)', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>
              Controles de Inferência / Carga de Trabalho:
            </span>

            {/* Batch Size Slider */}
            <div style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}>
                <span style={{ fontWeight: 600, color: '#334155' }}>Tamanho do Batch (B):</span>
                <strong style={{ color: current.color }}>{batchSize} sequências</strong>
              </div>
              <input
                type="range"
                min="1"
                max="64"
                step="1"
                value={batchSize}
                onChange={(e) => setBatchSize(parseInt(e.target.value))}
                style={{ width: '100%', accentColor: current.color }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', color: '#94A3B8' }}>
                <span>1 (Tempo Real)</span>
                <span>16</span>
                <span>32</span>
                <span>64 (Batch Process)</span>
              </div>
            </div>

            {/* Sequence Length Slider */}
            <div style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}>
                <span style={{ fontWeight: 600, color: '#334155' }}>Comprimento da Sequência (L):</span>
                <strong style={{ color: current.color }}>{seqLen} tokens</strong>
              </div>
              <input
                type="range"
                min="32"
                max="512"
                step="32"
                value={seqLen}
                onChange={(e) => setSeqLen(parseInt(e.target.value))}
                style={{ width: '100%', accentColor: current.color }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', color: '#94A3B8' }}>
                <span>32 (Tweets/Frases)</span>
                <span>128</span>
                <span>256</span>
                <span>512 (Máx BERT)</span>
              </div>
            </div>
          </div>

          {/* Recommendation Note */}
          <div style={{ background: '#F8FAFC', padding: '10px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
            <strong style={{ fontSize: '11px', color: current.color, display: 'block', marginBottom: '2px' }}>
              Recomendação de Arquitetura:
            </strong>
            <div style={{ fontSize: '10.5px', color: '#475569', lineHeight: 1.35 }}>
              {current.ideal}
            </div>
          </div>
        </div>

        {/* Right: Metrics & Estimated Costs */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            {/* Metric 1: VRAM */}
            <div style={{ background: '#F0F9FF', border: '1px solid #BAE6FD', borderRadius: '8px', padding: '8px 10px' }}>
              <span style={{ fontSize: '10px', color: '#0369A1', fontWeight: 700 }}>VRAM ESTIMADA (FP32)</span>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#0A345D', marginTop: '2px' }}>
                ~{totalMemMB} MB
              </div>
              <span style={{ fontSize: '9.5px', color: '#64748B' }}>Pesos: {weightsMemMB}MB + Ativações: {actMemMB}MB</span>
            </div>

            {/* Metric 2: Latency */}
            <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '8px', padding: '8px 10px' }}>
              <span style={{ fontSize: '10px', color: '#166534', fontWeight: 700 }}>LATÊNCIA GPU (ESTIMADA)</span>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#15803D', marginTop: '2px' }}>
                ~{gpuLatency} ms
              </div>
              <span style={{ fontSize: '9.5px', color: '#64748B' }}>Tempo para lote de {batchSize}</span>
            </div>

            {/* Metric 3: Throughput */}
            <div style={{ background: '#FFF7ED', border: '1px solid #FFEDD5', borderRadius: '8px', padding: '8px 10px' }}>
              <span style={{ fontSize: '10px', color: '#C2410C', fontWeight: 700 }}>THROUGHPUT</span>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#9A3412', marginTop: '2px' }}>
                ~{throughput} seq/s
              </div>
              <span style={{ fontSize: '9.5px', color: '#64748B' }}>Vazão contínua em GPU</span>
            </div>

            {/* Metric 4: Benchmark Score */}
            <div style={{ background: '#FAF5FF', border: '1px solid #E9D5FF', borderRadius: '8px', padding: '8px 10px' }}>
              <span style={{ fontSize: '10px', color: '#7E22CE', fontWeight: 700 }}>GLUE BENCHMARK</span>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#6B21A8', marginTop: '2px' }}>
                {current.glue} pts
              </div>
              <span style={{ fontSize: '9.5px', color: '#64748B' }}>Média de precisão geral</span>
            </div>
          </div>

          <div style={{
            background: '#F1F5F9',
            padding: '8px 10px',
            borderRadius: '6px',
            fontSize: '10px',
            color: '#475569',
            marginTop: '8px',
            lineHeight: 1.35
          }}>
            ⚖️ <strong>Trade-off Fundamental:</strong> O custo de memória quadrático da autoatenção <MathView math="O(L^2)" /> torna sequências longas (512 tokens) 16× mais pesadas na camada de atenção do que frases curtas (128 tokens).
          </div>
        </div>
      </div>
    </div>
  );
}
