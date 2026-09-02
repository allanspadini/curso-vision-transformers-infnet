import React, { useState, useMemo } from 'react';
import { Sliders, Cpu, HardDrive, Zap, RefreshCw, Sparkles, Scale } from 'lucide-react';

export default function TransformerTradeoffsLab() {
  const [dModel, setDModel] = useState(768);
  const [numLayers, setNumLayers] = useState(12);
  const [numHeads, setNumHeads] = useState(12);
  const [seqLen, setSeqLen] = useState(1024);
  const [batchSize, setBatchSize] = useState(8);
  const [vocabSize, setVocabSize] = useState(50257);

  const PRESETS = [
    { label: 'GPT-2 Small (124M)', d: 768, layers: 12, heads: 12, seq: 1024, vocab: 50257 },
    { label: 'GPT-2 Medium (350M)', d: 1024, layers: 24, heads: 16, seq: 1024, vocab: 50257 },
    { label: 'BERT Base (110M)', d: 768, layers: 12, heads: 12, seq: 512, vocab: 30522 },
    { label: 'Transformer (2017)', d: 512, layers: 6, heads: 8, seq: 512, vocab: 37000 }
  ];

  const applyPreset = (p) => {
    setDModel(p.d);
    setNumLayers(p.layers);
    setNumHeads(p.heads);
    setSeqLen(p.seq);
    setVocabSize(p.vocab);
  };

  const metrics = useMemo(() => {
    // 1. Embeddings params: vocabSize * dModel + seqLen * dModel
    const embParams = vocabSize * dModel + seqLen * dModel;

    // 2. Per layer Attention params: 4 * dModel^2 (W_q, W_k, W_v, W_o)
    const attnParamsPerLayer = 4 * dModel * dModel;

    // 3. Per layer MLP params: 2 * (dModel * 4dModel) = 8 * dModel^2
    const mlpParamsPerLayer = 8 * dModel * dModel;

    // 4. LayerNorms & biases: ~4 * dModel per layer
    const lnParamsPerLayer = 4 * dModel;

    const layerParams = (attnParamsPerLayer + mlpParamsPerLayer + lnParamsPerLayer) * numLayers;
    const totalParams = embParams + layerParams;

    // Head dimension dk
    const dk = Math.round(dModel / numHeads);

    // FLOPs approximation per token: ~2 * totalParams
    const gflopsPerToken = ((2 * totalParams) / 1e9).toFixed(2);

    // VRAM for weights in FP16 (2 bytes / param) and FP32 (4 bytes / param)
    const weightsVramMb = ((totalParams * 2) / (1024 * 1024)).toFixed(1);
    
    // Adam Optimizer states (FP32 weights + momentum + variance = 16 bytes / param total)
    const trainVramMb = ((totalParams * 16) / (1024 * 1024 * 1024)).toFixed(2);

    // Attention Matrix memory per batch: numLayers * numHeads * batchSize * seqLen * seqLen * 2 bytes
    const attnMapMb = ((numLayers * numHeads * batchSize * seqLen * seqLen * 2) / (1024 * 1024)).toFixed(1);

    return {
      embParams: (embParams / 1e6).toFixed(1),
      layerParams: (layerParams / 1e6).toFixed(1),
      attnParamsTotal: ((attnParamsPerLayer * numLayers) / 1e6).toFixed(1),
      mlpParamsTotal: ((mlpParamsPerLayer * numLayers) / 1e6).toFixed(1),
      totalParamsM: (totalParams / 1e6).toFixed(1),
      dk,
      gflopsPerToken,
      weightsVramMb,
      trainVramMb,
      attnMapMb
    };
  }, [dModel, numLayers, numHeads, seqLen, batchSize, vocabSize]);

  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      fontSize: '13px'
    }}>
      {/* Top Banner & Presets */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '8px',
        background: '#EDF5FA',
        padding: '8px 14px',
        borderRadius: '8px',
        border: '1px solid #D0E3F0'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Scale size={18} color="var(--infnet-cyan)" />
          <span style={{ fontWeight: 700, color: 'var(--infnet-dark-blue)', fontSize: '13px' }}>
            Simulador de Trade-offs: Parâmetros, Memória VRAM &amp; Atenção $O(T^2)$
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>Presets:</span>
          {PRESETS.map((p, idx) => (
            <button
              key={idx}
              onClick={() => applyPreset(p)}
              style={{
                background: '#FFFFFF',
                color: 'var(--infnet-dark-blue)',
                border: '1px solid #CBD5E1',
                padding: '3px 8px',
                borderRadius: '4px',
                fontSize: '11px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Sliders Left, Real-time Specs Right */}
      <div style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '1.2fr 1.3fr',
        gap: '12px',
        minHeight: 0
      }}>
        {/* Sliders Panel */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-light)',
          borderRadius: '10px',
          padding: '12px 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          overflowY: 'auto'
        }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--infnet-dark-blue)', textTransform: 'uppercase' }}>
            Hiperparâmetros da Arquitetura
          </div>

          {/* Slider 1: d_model */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', marginBottom: '2px' }}>
              <span>Dimensão do Embedding (d_model):</span>
              <strong style={{ color: 'var(--infnet-dark-blue)' }}>{dModel}</strong>
            </div>
            <input
              type="range"
              min="128"
              max="1536"
              step="64"
              value={dModel}
              onChange={(e) => setDModel(parseInt(e.target.value))}
              style={{ width: '100%', cursor: 'pointer' }}
            />
          </div>

          {/* Slider 2: numLayers */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', marginBottom: '2px' }}>
              <span>Número de Camadas ($N$):</span>
              <strong style={{ color: 'var(--infnet-dark-blue)' }}>{numLayers} blocos</strong>
            </div>
            <input
              type="range"
              min="2"
              max="36"
              step="1"
              value={numLayers}
              onChange={(e) => setNumLayers(parseInt(e.target.value))}
              style={{ width: '100%', cursor: 'pointer' }}
            />
          </div>

          {/* Slider 3: numHeads */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', marginBottom: '2px' }}>
              <span>Cabeças de Atenção ($h$):</span>
              <strong style={{ color: 'var(--infnet-dark-blue)' }}>{numHeads} cabeças (d_k = {metrics.dk})</strong>
            </div>
            <input
              type="range"
              min="2"
              max="24"
              step="2"
              value={numHeads}
              onChange={(e) => setNumHeads(parseInt(e.target.value))}
              style={{ width: '100%', cursor: 'pointer' }}
            />
          </div>

          {/* Slider 4: seqLen */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', marginBottom: '2px' }}>
              <span>Janela de Contexto ($T$):</span>
              <strong style={{ color: '#D84315' }}>{seqLen} tokens / patches</strong>
            </div>
            <input
              type="range"
              min="64"
              max="4096"
              step="64"
              value={seqLen}
              onChange={(e) => setSeqLen(parseInt(e.target.value))}
              style={{ width: '100%', cursor: 'pointer' }}
            />
          </div>

          {/* Slider 5: batchSize */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', marginBottom: '2px' }}>
              <span>Batch Size ($B$):</span>
              <strong style={{ color: 'var(--infnet-dark-blue)' }}>{batchSize}</strong>
            </div>
            <input
              type="range"
              min="1"
              max="32"
              step="1"
              value={batchSize}
              onChange={(e) => setBatchSize(parseInt(e.target.value))}
              style={{ width: '100%', cursor: 'pointer' }}
            />
          </div>
        </div>

        {/* Real-Time Metrics Display */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1.5px solid var(--border-light)',
          borderRadius: '10px',
          padding: '14px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--infnet-dark-blue)', textTransform: 'uppercase' }}>
            Estimativa de Recursos e Memória da GPU
          </div>

          {/* Big Number Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
            <div style={{ background: '#FFFFFF', border: '1px solid var(--border-light)', borderRadius: '8px', padding: '10px', textAlign: 'center' }}>
              <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>Parâmetros Totais</div>
              <div style={{ fontFamily: 'var(--font-code)', fontSize: '20px', fontWeight: 800, color: 'var(--infnet-dark-blue)' }}>
                {metrics.totalParamsM}M
              </div>
              <div style={{ fontSize: '9.5px', color: '#64748B' }}>
                Attn: {metrics.attnParamsTotal}M | MLP: {metrics.mlpParamsTotal}M
              </div>
            </div>

            <div style={{ background: '#FFFFFF', border: '1px solid var(--border-light)', borderRadius: '8px', padding: '10px', textAlign: 'center' }}>
              <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>VRAM de Treino (Adam FP32)</div>
              <div style={{ fontFamily: 'var(--font-code)', fontSize: '20px', fontWeight: 800, color: '#D84315' }}>
                {metrics.trainVramMb} GB
              </div>
              <div style={{ fontSize: '9.5px', color: '#64748B' }}>
                Pesos puros FP16: {metrics.weightsVramMb} MB
              </div>
            </div>
          </div>

          {/* Detailed Breakdown */}
          <div style={{
            background: '#FFFFFF',
            border: '1px solid var(--border-light)',
            borderRadius: '8px',
            padding: '10px 12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            fontSize: '11.5px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Custo de Ativações dos Mapas T × T:</span>
              <strong style={{ color: '#D84315' }}>{metrics.attnMapMb} MB / batch</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Dimensão interna de cada cabeça ($d_k$):</span>
              <strong style={{ color: 'var(--infnet-dark-blue)' }}>{metrics.dk}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>GFLOPs estimados por token:</span>
              <strong style={{ color: '#15803D' }}>{metrics.gflopsPerToken} GFLOPs</strong>
            </div>
          </div>

          <div style={{
            fontSize: '11px',
            color: 'var(--infnet-dark-blue)',
            background: '#EDF5FA',
            padding: '6px 10px',
            borderRadius: '6px'
          }}>
            💡 <strong>Insight Prático:</strong> 2/3 de todos os parâmetros de cada bloco residem na rede Feed-Forward (MLP 4 × d_model), enquanto a maior parte da memória volátil no forward vem das matrizes de atenção T × T.
          </div>
        </div>
      </div>
    </div>
  );
}
