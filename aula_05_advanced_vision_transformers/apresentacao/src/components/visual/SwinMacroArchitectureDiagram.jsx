import React from 'react';

export default function SwinMacroArchitectureDiagram() {
  const models = [
    { name: 'Swin-T (Tiny)', c: 96, layers: '[2, 2, 6, 2]', params: '28M', flops: '4.5G', top1: '81.3%' },
    { name: 'Swin-S (Small)', c: 96, layers: '[2, 2, 18, 2]', params: '50M', flops: '8.7G', top1: '83.0%' },
    { name: 'Swin-B (Base)', c: 128, layers: '[2, 2, 18, 2]', params: '88M', flops: '15.4G', top1: '83.5% (85.2% c/ 22k)' },
    { name: 'Swin-L (Large)', c: 192, layers: '[2, 2, 18, 2]', params: '197M', flops: '34.5G', top1: '86.4% (c/ 22k)' }
  ];

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '8px 24px',
      boxSizing: 'border-box'
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.2fr 0.8fr',
        gap: '20px'
      }}>
        {/* Lado Esquerdo: Macro-Fluxo com Patch Merging Claro */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: '16px',
          padding: '18px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: '0 4px 16px rgba(10, 52, 93, 0.06)'
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
              <span style={{ fontSize: '15px', fontWeight: 800, color: 'var(--infnet-dark-blue)' }}>
                Macro-Arquitetura: 4 Estágios & Patch Merging
              </span>
              <span style={{
                background: '#E0F2FE',
                color: '#0369A1',
                fontSize: '11px',
                fontWeight: 800,
                padding: '3px 8px',
                borderRadius: '4px'
              }}>
                Pares [W-MSA + SW-MSA]
              </span>
            </div>

            {/* Fluxo Vertical dos 4 Estágios */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{
                background: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                padding: '8px 12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <span style={{ fontSize: '12px', color: '#334155' }}>
                  <strong>Entrada & Patch Partition:</strong> Imagem H×W×3 fatiada em 4×4
                </span>
                <span style={{ fontFamily: 'Fira Code', fontSize: '11px', color: '#0369A1', fontWeight: 700 }}>
                  H/4 × W/4 × 48
                </span>
              </div>

              {/* Estágio 1 */}
              <div style={{
                background: '#F0F9FF',
                border: '1px solid #BAE6FD',
                borderRadius: '8px',
                padding: '8px 12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <span style={{ fontSize: '12px', fontWeight: 800, color: '#0369A1' }}>Estágio 1:</span>{' '}
                  <span style={{ fontSize: '11px', color: '#64748B' }}>Linear Proj (C) + [W-MSA / SW-MSA] × 2</span>
                </div>
                <span style={{ fontFamily: 'Fira Code', fontSize: '11px', color: '#0369A1', fontWeight: 700 }}>
                  H/4 × W/4 × C
                </span>
              </div>

              {/* Patch Merging 1 */}
              <div style={{
                background: '#FFF7ED',
                border: '1px dashed #FDBA74',
                borderRadius: '6px',
                padding: '5px 12px',
                fontSize: '11px',
                color: '#C2410C',
                display: 'flex',
                justifyContent: 'space-between',
                fontWeight: 600
              }}>
                <span>↳ Patch Merging: Concat 2×2 vizinhos (4C) → Linear(4C, 2C)</span>
                <span style={{ fontFamily: 'Fira Code' }}>H/8 × W/8 × 2C</span>
              </div>

              {/* Estágio 2 */}
              <div style={{
                background: '#F0F9FF',
                border: '1px solid #BAE6FD',
                borderRadius: '8px',
                padding: '8px 12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <span style={{ fontSize: '12px', fontWeight: 800, color: '#0369A1' }}>Estágio 2:</span>{' '}
                  <span style={{ fontSize: '11px', color: '#64748B' }}>[W-MSA / SW-MSA] × 2</span>
                </div>
                <span style={{ fontFamily: 'Fira Code', fontSize: '11px', color: '#0369A1', fontWeight: 700 }}>
                  H/8 × W/8 × 2C
                </span>
              </div>

              {/* Patch Merging 2 */}
              <div style={{
                background: '#FFF7ED',
                border: '1px dashed #FDBA74',
                borderRadius: '6px',
                padding: '5px 12px',
                fontSize: '11px',
                color: '#C2410C',
                display: 'flex',
                justifyContent: 'space-between',
                fontWeight: 600
              }}>
                <span>↳ Patch Merging: Concat 2×2 vizinhos (8C) → Linear(8C, 4C)</span>
                <span style={{ fontFamily: 'Fira Code' }}>H/16 × W/16 × 4C</span>
              </div>

              {/* Estágio 3 */}
              <div style={{
                background: '#F0F9FF',
                border: '1px solid #BAE6FD',
                borderRadius: '8px',
                padding: '8px 12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <span style={{ fontSize: '12px', fontWeight: 800, color: '#0369A1' }}>Estágio 3 (Core):</span>{' '}
                  <span style={{ fontSize: '11px', color: '#64748B' }}>[W-MSA / SW-MSA] × 6 (ou 18)</span>
                </div>
                <span style={{ fontFamily: 'Fira Code', fontSize: '11px', color: '#0369A1', fontWeight: 700 }}>
                  H/16 × W/16 × 4C
                </span>
              </div>

              {/* Estágio 4 */}
              <div style={{
                background: '#F0F9FF',
                border: '1px solid #BAE6FD',
                borderRadius: '8px',
                padding: '8px 12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <span style={{ fontSize: '12px', fontWeight: 800, color: '#0369A1' }}>Estágio 4:</span>{' '}
                  <span style={{ fontSize: '11px', color: '#64748B' }}>Patch Merging + [W-MSA / SW-MSA] × 2</span>
                </div>
                <span style={{ fontFamily: 'Fira Code', fontSize: '11px', color: '#0369A1', fontWeight: 700 }}>
                  H/32 × W/32 × 8C
                </span>
              </div>
            </div>
          </div>

          <div style={{
            fontSize: '11px',
            color: '#334155',
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
            padding: '8px 12px',
            borderRadius: '6px',
            marginTop: '8px'
          }}>
            O <strong>Patch Merging</strong> desempenha o papel exato do Pooling / Stride-2 das CNNs, reduzindo a resolução à metade e dobrando a dimensionalidade do canal.
          </div>
        </div>

        {/* Lado Direito: Tabela de Portes Clara */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: '16px',
          padding: '18px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: '0 4px 16px rgba(10, 52, 93, 0.06)'
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
              <span style={{ fontSize: '15px', fontWeight: 800, color: 'var(--infnet-dark-blue)' }}>
                Variantes do Swin Transformer
              </span>
              <span style={{ fontSize: '11px', color: '#64748B' }}>
                Trade-off Tamanho vs Acurácia
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {models.map((m, idx) => (
                <div key={idx} style={{
                  background: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  borderRadius: '10px',
                  padding: '10px 12px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 800, color: '#0369A1' }}>
                      {m.name}
                    </span>
                    <span style={{
                      fontSize: '12px',
                      fontWeight: 800,
                      color: '#15803D',
                      fontFamily: 'Fira Code'
                    }}>
                      {m.top1}
                    </span>
                  </div>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '11px',
                    color: '#64748B',
                    fontFamily: 'Fira Code'
                  }}>
                    <span>C = {m.c}</span>
                    <span>Camadas: {m.layers}</span>
                    <span>{m.params}</span>
                    <span>{m.flops}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{
            background: '#F0FDF4',
            border: '1.5px solid #BBF7D0',
            borderRadius: '8px',
            padding: '10px 12px',
            marginTop: '12px'
          }}>
            <div style={{ fontSize: '12px', fontWeight: 800, color: '#15803D', marginBottom: '2px' }}>
              Recordes Históricos do Swin (2021):
            </div>
            <div style={{ fontSize: '11px', color: '#334155' }}>
              • COCO Detecção (Cascade Mask R-CNN): <strong>58.7 box AP</strong> (+2.7 AP sobre Deformable DETR)<br />
              • ADE20K Segmentação Semântica (UperNet): <strong>53.5 mIoU</strong> (+3.2 sobre anteriores)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
