import React, { useState } from 'react';

export default function ViTArchitecturesComparisonDiagram() {
  const [filterFamily, setFilterFamily] = useState('all'); // 'all', 'vit', 'cnn'

  const models = [
    { name: 'ResNet-50', family: 'cnn', layers: '50', dim: '2048', heads: '—', patch: '—', params: '25.6 M', flops: '4.1 G', top1: '76.1%', highlight: false },
    { name: 'ResNet-152', family: 'cnn', layers: '152', dim: '2048', heads: '—', patch: '—', params: '60.2 M', flops: '11.5 G', top1: '78.3%', highlight: false },
    { name: 'ViT-Base / 32', family: 'vit', layers: '12', dim: '768', heads: '12', patch: '32 × 32', params: '88.2 M', flops: '4.4 G', top1: '77.9%', highlight: false },
    { name: 'ViT-Base / 16', family: 'vit', layers: '12', dim: '768', heads: '12', patch: '16 × 16', params: '86.6 M', flops: '17.6 G', top1: '81.2%', highlight: true },
    { name: 'ViT-Large / 16', family: 'vit', layers: '24', dim: '1024', heads: '16', patch: '16 × 16', params: '304.3 M', flops: '61.6 G', top1: '85.2%', highlight: true },
    { name: 'ViT-Huge / 14', family: 'vit', layers: '32', dim: '1280', heads: '16', patch: '14 × 14', params: '632.0 M', flops: '167.3 G', top1: '88.5%', highlight: false },
    { name: 'ConvNeXt-Base', family: 'cnn', layers: '36', dim: '1024', heads: '—', patch: '7 × 7', params: '88.6 M', flops: '15.4 G', top1: '83.8%', highlight: false }
  ];

  const filtered = filterFamily === 'all' ? models : models.filter(m => m.family === filterFamily);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {/* Barra de Filtro de Família */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#F8FAFC',
        border: '1px solid #E2E8F0',
        borderRadius: '8px',
        padding: '6px 14px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
            Filtrar Arquiteturas:
          </span>
          {[
            { id: 'all', label: 'Todos os Modelos' },
            { id: 'vit', label: 'Apenas Família ViT' },
            { id: 'cnn', label: 'Linha CNN / Híbridos' }
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => setFilterFamily(btn.id)}
              style={{
                padding: '4px 10px',
                borderRadius: '6px',
                border: filterFamily === btn.id ? '2px solid var(--infnet-cyan)' : '1px solid #CBD5E1',
                background: filterFamily === btn.id ? '#E0F2FE' : '#FFFFFF',
                color: filterFamily === btn.id ? 'var(--infnet-dark-blue)' : '#475569',
                fontSize: '11px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {btn.label}
            </button>
          ))}
        </div>
        <span className="badge badge-navy">Métricas ImageNet-1k (Top-1)</span>
      </div>

      {/* Tabela Estruturada de Arquiteturas */}
      <div style={{
        flex: 1,
        background: '#FFFFFF',
        borderRadius: '12px',
        border: '1px solid #E2E8F0',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0
      }}>
        <div style={{ overflowY: 'auto', flex: 1 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#F1F5F9', borderBottom: '2px solid #CBD5E1', color: 'var(--infnet-dark-blue)', fontWeight: 800 }}>
                <th style={{ padding: '10px 14px' }}>Modelo</th>
                <th style={{ padding: '10px 10px' }}>Família</th>
                <th style={{ padding: '10px 10px' }}>Camadas</th>
                <th style={{ padding: '10px 10px' }}>Dim Oculta (D)</th>
                <th style={{ padding: '10px 10px' }}>Cabeças</th>
                <th style={{ padding: '10px 10px' }}>Patch Size</th>
                <th style={{ padding: '10px 10px' }}>Parâmetros</th>
                <th style={{ padding: '10px 10px' }}>GFLOPs</th>
                <th style={{ padding: '10px 14px', textAlign: 'right' }}>Top-1 Acurácia</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row, idx) => (
                <tr
                  key={row.name}
                  style={{
                    borderBottom: '1px solid #F1F5F9',
                    background: row.highlight ? '#F0FDF4' : idx % 2 === 0 ? '#FFFFFF' : '#F8FAFC',
                    fontWeight: row.highlight ? 700 : 500
                  }}
                >
                  <td style={{ padding: '9px 14px', color: row.highlight ? '#15803D' : 'var(--infnet-dark-blue)', fontWeight: 700 }}>
                    {row.name} {row.highlight && <span style={{ color: '#16A34A' }}>★</span>}
                  </td>
                  <td style={{ padding: '9px 10px' }}>
                    <span className={`badge ${row.family === 'vit' ? 'badge-cyan' : 'badge-navy'}`} style={{ fontSize: '10px', padding: '2px 6px' }}>
                      {row.family.toUpperCase()}
                    </span>
                  </td>
                  <td style={{ padding: '9px 10px' }}>{row.layers}</td>
                  <td style={{ padding: '9px 10px', fontFamily: 'var(--font-mono)' }}>{row.dim}</td>
                  <td style={{ padding: '9px 10px' }}>{row.heads}</td>
                  <td style={{ padding: '9px 10px', fontFamily: 'var(--font-mono)' }}>{row.patch}</td>
                  <td style={{ padding: '9px 10px', fontWeight: 600 }}>{row.params}</td>
                  <td style={{ padding: '9px 10px', color: '#64748B' }}>{row.flops}</td>
                  <td style={{ padding: '9px 14px', textAlign: 'right', fontWeight: 800, color: row.highlight ? '#16A34A' : '#0A345D' }}>
                    {row.top1}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Rodapé Informativo */}
        <div style={{
          background: '#F8FAFC',
          borderTop: '1px solid #E2E8F0',
          padding: '8px 14px',
          fontSize: '11px',
          color: '#475569',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span>
            💡 <strong>Padrão de Mercado:</strong> O <code>ViT-Base/16</code> (86M parâmetros) é o cavalo de batalha da indústria, oferecendo equilíbrio perfeito entre velocidade e precisão.
          </span>
          <span style={{ color: '#0369A1', fontWeight: 600 }}>★ Configurações Recomendadas</span>
        </div>
      </div>
    </div>
  );
}
