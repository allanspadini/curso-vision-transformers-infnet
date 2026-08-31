import React, { useState } from 'react';
import { Layers, Zap, ShieldCheck, Cpu, ArrowRight, CheckCircle2 } from 'lucide-react';
import MathView from '../MathView';

const ALEXNET_TABLE_DATA = [
  {
    layer: 'In',
    name: 'Input',
    type: 'Entrada (RGB)',
    typeBadge: 'badge-blue',
    maps: 3,
    size: '224 × 224 × 3',
    kernel: '—',
    stride: '—',
    pad: '—',
    activation: '—',
    params: '0',
    gpu: '3 canais RGB',
    detail: 'Imagens coloridas de alta resolução do ImageNet (1.2M imagens em 1000 categorias).'
  },
  {
    layer: 'C1',
    name: 'Convolução 1',
    type: 'Convolução',
    typeBadge: 'badge-cyan',
    maps: 96,
    size: '55 × 55',
    kernel: '11 × 11',
    stride: '4',
    pad: '0',
    activation: 'ReLU',
    params: '35k',
    gpu: '48 por GPU',
    detail: '96 filtros amplos 11×11 com stride 4 para rápida redução espacial inicial.'
  },
  {
    layer: 'P1',
    name: 'Max Pooling 1',
    type: 'Max Pooling',
    typeBadge: 'badge-orange',
    maps: 96,
    size: '27 × 27',
    kernel: '3 × 3',
    stride: '2',
    pad: '0',
    activation: '—',
    params: '0',
    gpu: '48 por GPU',
    detail: 'Max Pooling sobreposto (kernel 3×3 com stride 2) reduzindo o erro Top-5 em ~0.4%.'
  },
  {
    layer: 'C2',
    name: 'Convolução 2',
    type: 'Convolução',
    typeBadge: 'badge-cyan',
    maps: 256,
    size: '27 × 27',
    kernel: '5 × 5',
    stride: '1',
    pad: '2',
    activation: 'ReLU',
    params: '307k',
    gpu: '128 por GPU',
    detail: 'Convoluções 5×5 com padding 2. Cada GPU processa seus próprios canais de forma isolada.'
  },
  {
    layer: 'P2',
    name: 'Max Pooling 2',
    type: 'Max Pooling',
    typeBadge: 'badge-orange',
    maps: 256,
    size: '13 × 13',
    kernel: '3 × 3',
    stride: '2',
    pad: '0',
    activation: '—',
    params: '0',
    gpu: '128 por GPU',
    detail: 'Segunda subamostragem espacial sobreposta (27×27 para 13×13).'
  },
  {
    layer: 'C3',
    name: 'Convolução 3',
    type: 'Conv (Cross-GPU)',
    typeBadge: 'badge-purple',
    maps: 384,
    size: '13 × 13',
    kernel: '3 × 3',
    stride: '1',
    pad: '1',
    activation: 'ReLU',
    params: '885k',
    gpu: '192 por GPU (Cross)',
    detail: 'Primeira camada onde as duas GPUs trocam informações cruzadas via barramento PCIe.'
  },
  {
    layer: 'C4',
    name: 'Convolução 4',
    type: 'Convolução',
    typeBadge: 'badge-cyan',
    maps: 384,
    size: '13 × 13',
    kernel: '3 × 3',
    stride: '1',
    pad: '1',
    activation: 'ReLU',
    params: '663k',
    gpu: '192 por GPU',
    detail: 'Convolução 3×3 mantendo a resolução espacial sem pooling intermediário.'
  },
  {
    layer: 'C5',
    name: 'Conv 5 + Pool',
    type: 'Conv + Pool',
    typeBadge: 'badge-cyan',
    maps: 256,
    size: '6 × 6',
    kernel: '3 × 3',
    stride: '1',
    pad: '1',
    activation: 'ReLU',
    params: '442k',
    gpu: '128 por GPU',
    detail: 'Última convolução seguida de MaxPool 3×3 (stride 2), gerando mapas 6×6×256.'
  },
  {
    layer: 'FC6',
    name: 'Fully Connected 6',
    type: 'Densa + Dropout',
    typeBadge: 'badge-purple',
    maps: '—',
    size: '4096',
    kernel: '—',
    stride: '—',
    pad: '—',
    activation: 'ReLU + Dropout',
    params: '37.7M',
    gpu: '2048 por GPU',
    detail: 'Representa >60% dos pesos da rede. Dropout (p=0.5) zera 50% dos nós a cada batch.'
  },
  {
    layer: 'FC7',
    name: 'Fully Connected 7',
    type: 'Densa + Dropout',
    typeBadge: 'badge-purple',
    maps: '—',
    size: '4096',
    kernel: '—',
    stride: '—',
    pad: '—',
    activation: 'ReLU + Dropout',
    params: '16.8M',
    gpu: '2048 por GPU',
    detail: 'Segunda camada densa de alta capacidade semântica com regularização estocástica.'
  },
  {
    layer: 'Out',
    name: 'Output (FC8)',
    type: 'Saída (Softmax)',
    typeBadge: 'badge-green',
    maps: '—',
    size: '1000',
    kernel: '—',
    stride: '—',
    pad: '—',
    activation: 'Softmax',
    params: '4.1M',
    gpu: '1000 classes',
    detail: 'Distribuição de probabilidades para as 1000 classes de objetos do ImageNet.'
  }
];

export default function AlexNetVisualizer() {
  const [selectedIdx, setSelectedIdx] = useState(1);
  const activeLayer = ALEXNET_TABLE_DATA[selectedIdx];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.45fr 1fr', gap: '16px', height: '100%', alignItems: 'stretch' }}>
      {/* Left Column: Pedagogical Architecture Table */}
      <div style={{
        background: '#FFFFFF',
        border: '1px solid var(--border-light)',
        borderRadius: '10px',
        padding: '12px 16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--infnet-dark-blue)' }}>
                Tabela Arquitetural: AlexNet (Krizhevsky et al., 2012)
              </span>
              <span className="badge badge-purple">~61M Parâmetros</span>
            </div>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              Clique na linha para inspecionar
            </span>
          </div>

          {/* Table */}
          <div style={{ overflowX: 'auto', border: '1px solid #E2E8F0', borderRadius: '8px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#F1F5F9', color: 'var(--infnet-dark-blue)', borderBottom: '2px solid #CBD5E1' }}>
                  <th style={{ padding: '5px 7px', fontWeight: 700 }}>Layer</th>
                  <th style={{ padding: '5px 7px', fontWeight: 700 }}>Tipo</th>
                  <th style={{ padding: '5px 7px', fontWeight: 700 }}>Mapas</th>
                  <th style={{ padding: '5px 7px', fontWeight: 700 }}>Tamanho (H × W)</th>
                  <th style={{ padding: '5px 7px', fontWeight: 700 }}>Kernel</th>
                  <th style={{ padding: '5px 7px', fontWeight: 700 }}>Stride</th>
                  <th style={{ padding: '5px 7px', fontWeight: 700 }}>Ativação</th>
                  <th style={{ padding: '5px 7px', fontWeight: 700 }}>Pesos</th>
                </tr>
              </thead>
              <tbody>
                {ALEXNET_TABLE_DATA.map((row, idx) => {
                  const isSelected = selectedIdx === idx;
                  return (
                    <tr
                      key={row.layer}
                      onClick={() => setSelectedIdx(idx)}
                      style={{
                        background: isSelected ? '#E0F2FE' : idx % 2 === 0 ? '#FFFFFF' : '#F8FAFC',
                        cursor: 'pointer',
                        transition: 'background 0.15s ease',
                        borderBottom: '1px solid #E2E8F0'
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected) e.currentTarget.style.background = '#F1F5F9';
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) e.currentTarget.style.background = idx % 2 === 0 ? '#FFFFFF' : '#F8FAFC';
                      }}
                    >
                      <td style={{ padding: '4px 7px', fontWeight: 800, color: isSelected ? '#0284C7' : 'var(--infnet-dark-blue)' }}>
                        {row.layer}
                      </td>
                      <td style={{ padding: '4px 7px' }}>
                        <span className={`badge ${row.typeBadge}`} style={{ fontSize: '9.5px', padding: '1px 5px' }}>
                          {row.type}
                        </span>
                      </td>
                      <td style={{ padding: '4px 7px', fontWeight: 600 }}>{row.maps}</td>
                      <td style={{ padding: '4px 7px', fontFamily: 'var(--font-code)', fontSize: '10.5px', fontWeight: 700 }}>
                        {row.size}
                      </td>
                      <td style={{ padding: '4px 7px', fontFamily: 'var(--font-code)' }}>{row.kernel}</td>
                      <td style={{ padding: '4px 7px' }}>{row.stride}</td>
                      <td style={{ padding: '4px 7px', fontFamily: 'var(--font-code)', color: '#0284C7', fontWeight: 700 }}>
                        {row.activation}
                      </td>
                      <td style={{ padding: '4px 7px', fontWeight: 700, color: row.params !== '0' ? '#15803D' : 'var(--text-muted)' }}>
                        {row.params}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Total Summary Footer */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: '#F8FAFC',
          border: '1px solid #E2E8F0',
          borderRadius: '6px',
          padding: '6px 12px',
          fontSize: '11px',
          marginTop: '6px'
        }}>
          <span style={{ color: 'var(--text-muted)' }}>Comparação com LeNet (60k):</span>
          <span style={{ fontWeight: 700, color: '#C2410C' }}>1000× mais parâmetros</span>
          <span style={{ fontWeight: 800, color: '#15803D' }}>Total: 61.000.000 (61M)</span>
        </div>
      </div>

      {/* Right Column: Layer Inspector & 4 Innovations */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'space-between' }}>
        {/* Active Layer Details Card */}
        <div style={{
          background: '#FFFFFF',
          border: '1.5px solid var(--infnet-cyan)',
          borderRadius: '10px',
          padding: '12px 14px',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--infnet-dark-blue)' }}>
                Camada {activeLayer.layer}: {activeLayer.name}
              </div>
              <span className={`badge ${activeLayer.typeBadge}`} style={{ marginTop: '2px' }}>
                {activeLayer.type} • Ativação: {activeLayer.activation}
              </span>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'block' }}>Dimensão</span>
              <strong style={{ fontSize: '11.5px', color: 'var(--infnet-dark-blue)', fontFamily: 'var(--font-code)' }}>
                {activeLayer.size}
              </strong>
            </div>
          </div>

          <p style={{ fontSize: '11px', color: 'var(--text-main)', margin: '5px 0 8px 0', lineHeight: 1.4 }}>
            {activeLayer.detail}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', background: '#F8FAFC', padding: '5px 8px', borderRadius: '6px', fontSize: '10.5px' }}>
            <div>
              <span style={{ color: 'var(--text-muted)', display: 'block' }}>Alocação em Hardware:</span>
              <strong style={{ color: '#0284C7' }}>{activeLayer.gpu}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)', display: 'block' }}>Pesos na Camada:</span>
              <strong style={{ color: activeLayer.params !== '0' ? '#15803D' : 'var(--text-muted)' }}>
                {activeLayer.params}
              </strong>
            </div>
          </div>
        </div>

        {/* 4 Pillars of AlexNet */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
          <div style={{ background: '#FFFFFF', border: '1px solid var(--border-light)', borderRadius: '6px', padding: '7px 8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '2px' }}>
              <Zap size={13} color="#0284C7" />
              <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>Ativação ReLU</span>
            </div>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
              Substituiu Tanh: convergiu 6× mais rápido sem saturação.
            </div>
          </div>

          <div style={{ background: '#FFFFFF', border: '1px solid var(--border-light)', borderRadius: '6px', padding: '7px 8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '2px' }}>
              <ShieldCheck size={13} color="#EA580C" />
              <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>Dropout (p = 0.5)</span>
            </div>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
              Regularizou as camadas densas FC6 e FC7 contra overfitting.
            </div>
          </div>

          <div style={{ background: '#FFFFFF', border: '1px solid var(--border-light)', borderRadius: '6px', padding: '7px 8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '2px' }}>
              <Cpu size={13} color="#16A34A" />
              <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>2× GPUs GTX 580</span>
            </div>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
              Divisão em 2 GPUs (3GB cada) com conexões cruzadas.
            </div>
          </div>

          <div style={{ background: '#FFFFFF', border: '1px solid var(--border-light)', borderRadius: '6px', padding: '7px 8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '2px' }}>
              <Layers size={13} color="#7C3AED" />
              <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>Data Augmentation</span>
            </div>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
              Cortes 224×224, espelhamento horizontal e PCA de cor.
            </div>
          </div>
        </div>

        {/* Bottom Takeaway */}
        <div style={{ background: '#EFF8FC', border: '1px solid #CDE6F5', borderRadius: '6px', padding: '7px 10px', fontSize: '11px', color: 'var(--infnet-dark-blue)' }}>
          🚀 <strong>Ponto de Virada:</strong> Venceu o ImageNet 2012 reduzindo o erro Top-5 de 26% para 15.3%, iniciando a era do Deep Learning.
        </div>
      </div>
    </div>
  );
}
