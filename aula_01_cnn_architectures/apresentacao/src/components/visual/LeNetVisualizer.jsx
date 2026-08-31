import React, { useState } from 'react';
import { Layers, Zap, Info, CheckCircle2, ArrowRight } from 'lucide-react';
import MathView from '../MathView';

const LENET_TABLE_DATA = [
  {
    layer: 'In',
    name: 'Input',
    type: 'Entrada (Imagem)',
    typeBadge: 'badge-blue',
    maps: 1,
    size: '32 × 32',
    kernel: '—',
    stride: '—',
    pad: '—',
    activation: '—',
    params: '0',
    formula: '1 canal (Escala de cinza)',
    detail: 'Dígitos manuscritos do dataset MNIST normalizados e centralizados em 32×32.'
  },
  {
    layer: 'C1',
    name: 'Convolução 1',
    type: 'Convolução',
    typeBadge: 'badge-cyan',
    maps: 6,
    size: '28 × 28',
    kernel: '5 × 5',
    stride: '1',
    pad: '0',
    activation: 'tanh',
    params: '156',
    formula: '(5 × 5 × 1 + 1) × 6 = 156',
    detail: '6 filtros 5×5 aprendem padrões locais de baixo nível (bordas e ângulos). Tamanho: 32 - 5 + 1 = 28.'
  },
  {
    layer: 'S2',
    name: 'Subamostragem 1',
    type: 'Avg Pooling',
    typeBadge: 'badge-orange',
    maps: 6,
    size: '14 × 14',
    kernel: '2 × 2',
    stride: '2',
    pad: '0',
    activation: 'tanh',
    params: '12',
    formula: '(1 peso + 1 bias) × 6 = 12',
    detail: 'Average Pooling 2×2 reduz a resolução espacial pela metade (28 / 2 = 14) com coeficiente aprendível.'
  },
  {
    layer: 'C3',
    name: 'Convolução 2',
    type: 'Convolução',
    typeBadge: 'badge-cyan',
    maps: 16,
    size: '10 × 10',
    kernel: '5 × 5',
    stride: '1',
    pad: '0',
    activation: 'tanh',
    params: '1.516',
    formula: 'Conexões esparsas = 1.516',
    detail: 'Combina subconjuntos de mapas de S2 para criar representações ricas e limitar o número de pesos.'
  },
  {
    layer: 'S4',
    name: 'Subamostragem 2',
    type: 'Avg Pooling',
    typeBadge: 'badge-orange',
    maps: 16,
    size: '5 × 5',
    kernel: '2 × 2',
    stride: '2',
    pad: '0',
    activation: 'tanh',
    params: '32',
    formula: '(1 peso + 1 bias) × 16 = 32',
    detail: 'Segunda redução espacial (10 / 2 = 5). Gera 16 mapas compactos de características de 5×5.'
  },
  {
    layer: 'C5',
    name: 'Convolução Densa',
    type: 'Convolução',
    typeBadge: 'badge-cyan',
    maps: 120,
    size: '1 × 1',
    kernel: '5 × 5',
    stride: '1',
    pad: '0',
    activation: 'tanh',
    params: '48.120',
    formula: '(5 × 5 × 16 + 1) × 120 = 48.120',
    detail: 'Como o mapa de entrada é 5×5 e o filtro é 5×5, a saída fica 1×1, agindo como transição para FC.'
  },
  {
    layer: 'F6',
    name: 'Fully Connected',
    type: 'Densa (FC)',
    typeBadge: 'badge-purple',
    maps: '—',
    size: '84',
    kernel: '—',
    stride: '—',
    pad: '—',
    activation: 'tanh',
    params: '10.164',
    formula: '(120 + 1) × 84 = 10.164',
    detail: 'Camada densa clássica para correlacionar todos os 120 atributos extraídos com representações gráficas.'
  },
  {
    layer: 'Out',
    name: 'Output (RBF)',
    type: 'Saída (RBF / FC)',
    typeBadge: 'badge-green',
    maps: '—',
    size: '10',
    kernel: '—',
    stride: '—',
    pad: '—',
    activation: 'Euclidean RBF',
    params: '0',
    formula: '10 classes (dígitos 0 a 9)',
    detail: 'Calcula a distância euclidiana para o centróide bitmap de cada um dos 10 dígitos decimais.'
  }
];

export default function LeNetVisualizer() {
  const [selectedIdx, setSelectedIdx] = useState(1);
  const activeLayer = LENET_TABLE_DATA[selectedIdx];

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
                Tabela Arquitetural: LeNet-5 (LeCun et al., 1998)
              </span>
              <span className="badge badge-blue">~60k Parâmetros</span>
            </div>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              Clique na linha para inspecionar
            </span>
          </div>

          {/* Table */}
          <div style={{ overflowX: 'auto', border: '1px solid #E2E8F0', borderRadius: '8px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11.5px', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#F1F5F9', color: 'var(--infnet-dark-blue)', borderBottom: '2px solid #CBD5E1' }}>
                  <th style={{ padding: '6px 8px', fontWeight: 700 }}>Layer</th>
                  <th style={{ padding: '6px 8px', fontWeight: 700 }}>Tipo</th>
                  <th style={{ padding: '6px 8px', fontWeight: 700 }}>Mapas</th>
                  <th style={{ padding: '6px 8px', fontWeight: 700 }}>Tamanho (H × W)</th>
                  <th style={{ padding: '6px 8px', fontWeight: 700 }}>Kernel</th>
                  <th style={{ padding: '6px 8px', fontWeight: 700 }}>Stride</th>
                  <th style={{ padding: '6px 8px', fontWeight: 700 }}>Ativação</th>
                  <th style={{ padding: '6px 8px', fontWeight: 700 }}>Pesos</th>
                </tr>
              </thead>
              <tbody>
                {LENET_TABLE_DATA.map((row, idx) => {
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
                      <td style={{ padding: '5px 8px', fontWeight: 800, color: isSelected ? '#0284C7' : 'var(--infnet-dark-blue)' }}>
                        {row.layer}
                      </td>
                      <td style={{ padding: '5px 8px' }}>
                        <span className={`badge ${row.typeBadge}`} style={{ fontSize: '10px', padding: '1px 6px' }}>
                          {row.type}
                        </span>
                      </td>
                      <td style={{ padding: '5px 8px', fontWeight: 600 }}>{row.maps}</td>
                      <td style={{ padding: '5px 8px', fontFamily: 'var(--font-code)', fontSize: '11px', fontWeight: 700 }}>
                        {row.size}
                      </td>
                      <td style={{ padding: '5px 8px', fontFamily: 'var(--font-code)' }}>{row.kernel}</td>
                      <td style={{ padding: '5px 8px' }}>{row.stride}</td>
                      <td style={{ padding: '5px 8px', fontFamily: 'var(--font-code)', color: '#D97706', fontWeight: 600 }}>
                        {row.activation}
                      </td>
                      <td style={{ padding: '5px 8px', fontWeight: 700, color: row.params !== '0' ? '#15803D' : 'var(--text-muted)' }}>
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
          <span style={{ color: 'var(--text-muted)' }}>Fórmula de Dimensão:</span>
          <span style={{ fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
            <MathView math="O = \frac{W - K + 2P}{S} + 1" />
          </span>
          <span style={{ fontWeight: 800, color: '#15803D' }}>Total: 60.000 parâmetros</span>
        </div>
      </div>

      {/* Right Column: Layer Inspector & Conceptual Connection */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'space-between' }}>
        {/* Active Layer Details Card */}
        <div style={{
          background: '#FFFFFF',
          border: '1.5px solid var(--infnet-cyan)',
          borderRadius: '10px',
          padding: '14px 16px',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '15px', fontWeight: 800, color: 'var(--infnet-dark-blue)' }}>
                  Camada {activeLayer.layer}: {activeLayer.name}
                </span>
              </div>
              <span className={`badge ${activeLayer.typeBadge}`} style={{ marginTop: '3px' }}>
                {activeLayer.type} • Ativação: {activeLayer.activation}
              </span>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'block' }}>Saída</span>
              <strong style={{ fontSize: '12.5px', color: 'var(--infnet-dark-blue)', fontFamily: 'var(--font-code)' }}>
                {activeLayer.size}
              </strong>
            </div>
          </div>

          <p style={{ fontSize: '11.5px', color: 'var(--text-main)', margin: '6px 0 10px 0', lineHeight: 1.45 }}>
            {activeLayer.detail}
          </p>

          <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '6px 10px', fontSize: '11px' }}>
            <span style={{ color: 'var(--text-muted)', display: 'block' }}>Cálculo de Pesos Aprendíveis:</span>
            <strong style={{ color: 'var(--infnet-dark-blue)', fontFamily: 'var(--font-code)', fontSize: '11.5px' }}>
              {activeLayer.formula}
            </strong>
          </div>
        </div>

        {/* Pedagogical Connection: Standard Pattern */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ background: '#FFFFFF', border: '1px solid var(--border-light)', borderRadius: '8px', padding: '10px 12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <CheckCircle2 size={15} color="#15803D" />
              <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
                O Padrão Fundamental que Vocês Já Conhecem
              </span>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              background: '#F1F5F9',
              padding: '6px',
              borderRadius: '6px',
              fontSize: '11.5px',
              fontWeight: 700,
              color: 'var(--infnet-dark-blue)',
              margin: '4px 0'
            }}>
              <span style={{ color: '#0284C7' }}>[Conv → Pool]</span>
              <ArrowRight size={13} />
              <span style={{ color: '#0284C7' }}>[Conv → Pool]</span>
              <ArrowRight size={13} />
              <span style={{ color: '#7C3AED' }}>[FC → FC]</span>
            </div>
            <div style={{ fontSize: '10.5px', color: 'var(--text-muted)', marginTop: '2px' }}>
              A LeNet-5 foi a primeira rede a consolidar a extração espacial hierárquica seguida de classificação densa.
            </div>
          </div>
        </div>

        {/* Bottom Takeaway */}
        <div style={{ background: '#EFF8FC', border: '1px solid #CDE6F5', borderRadius: '6px', padding: '8px 10px', fontSize: '11px', color: 'var(--infnet-dark-blue)' }}>
          💡 <strong>Marco Histórico:</strong> Com apenas 60k pesos, operava com 99.2% de precisão no MNIST e leu milhões de cheques nos bancos dos EUA nos anos 90.
        </div>
      </div>
    </div>
  );
}
