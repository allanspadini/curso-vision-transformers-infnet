import React, { useState } from 'react';

export default function PVTSimulatorLab() {
  const [resolution, setResolution] = useState(800); // 224, 448, 800, 1024
  const [useSRA, setUseSRA] = useState(true);
  const [rFactor1, setRFactor1] = useState(8);

  const h1 = resolution / 4;
  const n1 = h1 * h1;
  const r1 = useSRA ? rFactor1 : 1;
  const kLen1 = Math.round(n1 / (r1 * r1));
  const attnMatrix1 = n1 * kLen1;

  const h2 = resolution / 8;
  const n2 = h2 * h2;
  const r2 = useSRA ? 4 : 1;
  const kLen2 = Math.round(n2 / (r2 * r2));
  const attnMatrix2 = n2 * kLen2;

  const h3 = resolution / 16;
  const n3 = h3 * h3;
  const r3 = useSRA ? 2 : 1;
  const kLen3 = Math.round(n3 / (r3 * r3));
  const attnMatrix3 = n3 * kLen3;

  const h4 = resolution / 32;
  const n4 = h4 * h4;
  const r4 = 1;
  const kLen4 = n4;
  const attnMatrix4 = n4 * kLen4;

  const totalAttnElements = attnMatrix1 + attnMatrix2 + attnMatrix3 + attnMatrix4;
  const vramMB = (totalAttnElements * 8 * 2 * 4) / (1024 * 1024);
  const isOOM = vramMB > 16000;

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      padding: '8px 24px',
      boxSizing: 'border-box'
    }}>
      {/* Header Claro */}
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
            background: '#DCFCE7',
            color: '#15803D',
            padding: '3px 8px',
            borderRadius: '4px',
            fontSize: '11px',
            fontWeight: 800
          }}>LAB INTERATIVO</span>
          <span style={{ color: 'var(--infnet-dark-blue)', fontSize: '14px', fontWeight: 700 }}>
            Simulador de Pirâmide Visual: Viabilidade de Resoluções Altas com SRA vs MSA Canônico
          </span>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          {[224, 448, 800, 1024].map((res) => (
            <button
              key={res}
              onClick={() => setResolution(res)}
              style={{
                background: resolution === res ? '#16A34A' : '#F8FAFC',
                color: resolution === res ? '#FFFFFF' : '#475569',
                border: resolution === res ? '1px solid #16A34A' : '1px solid #CBD5E1',
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '11px',
                cursor: 'pointer',
                fontWeight: resolution === res ? 800 : 500
              }}
            >
              {res}×{res} {res === 800 ? '(COCO)' : res === 1024 ? '(Médica)' : ''}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Principal */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '340px 1fr',
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
              Configuração de Atenção
            </div>

            {/* Alternar SRA vs MSA */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '11px', color: '#64748B', display: 'block', marginBottom: '6px', fontWeight: 600 }}>
                ALGORITMO DE AUTOATENÇÃO:
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <button
                  onClick={() => setUseSRA(true)}
                  style={{
                    background: useSRA ? '#16A34A' : '#F8FAFC',
                    color: useSRA ? '#FFFFFF' : '#334155',
                    border: useSRA ? '1px solid #16A34A' : '1px solid #CBD5E1',
                    padding: '8px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  SRA (PVT Reduzido)
                </button>
                <button
                  onClick={() => setUseSRA(false)}
                  style={{
                    background: !useSRA ? '#EA580C' : '#F8FAFC',
                    color: !useSRA ? '#FFFFFF' : '#334155',
                    border: !useSRA ? '1px solid #EA580C' : '1px solid #CBD5E1',
                    padding: '8px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  MSA Canônico
                </button>
              </div>
            </div>

            {/* Fator R1 */}
            <div style={{ marginBottom: '16px', opacity: useSRA ? 1 : 0.4 }}>
              <label style={{ fontSize: '11px', color: '#334155', display: 'block', marginBottom: '4px', fontWeight: 600 }}>
                Fator de Redução R₁ no Estágio 1:
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' }}>
                {[1, 2, 4, 8].map((f) => (
                  <button
                    key={f}
                    disabled={!useSRA}
                    onClick={() => setRFactor1(f)}
                    style={{
                      background: rFactor1 === f && useSRA ? '#0284C7' : '#F8FAFC',
                      color: rFactor1 === f && useSRA ? '#FFFFFF' : '#475569',
                      border: rFactor1 === f && useSRA ? '1px solid #0284C7' : '1px solid #CBD5E1',
                      padding: '6px',
                      borderRadius: '4px',
                      fontSize: '11px',
                      fontWeight: 700,
                      cursor: useSRA ? 'pointer' : 'not-allowed'
                    }}
                  >
                    R={f}
                  </button>
                ))}
              </div>
              <div style={{ fontSize: '10px', color: '#64748B', marginTop: '4px' }}>
                Reduz chaves e valores K, V por um fator de <strong>R₁² = {r1 * r1}×</strong>
              </div>
            </div>
          </div>

          {/* Medidor de VRAM */}
          <div style={{
            background: isOOM ? '#FFF1F2' : '#F0FDF4',
            border: isOOM ? '2px solid #F43F5E' : '1.5px solid #86EFAC',
            borderRadius: '10px',
            padding: '14px'
          }}>
            <div style={{ fontSize: '10px', color: isOOM ? '#BE123C' : '#166534', textTransform: 'uppercase', marginBottom: '2px', fontWeight: 700 }}>
              Memória VRAM Matriz de Atenção (Batch=2, H=8):
            </div>
            <div style={{
              fontFamily: 'Fira Code',
              fontSize: '22px',
              fontWeight: 800,
              color: isOOM ? '#E11D48' : '#15803D'
            }}>
              {vramMB > 1024 ? `${(vramMB / 1024).toFixed(1)} GB` : `${vramMB.toFixed(0)} MB`}
            </div>

            <div style={{
              marginTop: '8px',
              padding: '4px 8px',
              borderRadius: '4px',
              background: isOOM ? '#E11D48' : '#DCFCE7',
              color: isOOM ? '#FFFFFF' : '#15803D',
              fontSize: '11px',
              fontWeight: 700,
              textAlign: 'center'
            }}>
              {isOOM ? '💥 CUDA OUT OF MEMORY!' : '✓ GPU Operando com Segurança'}
            </div>
          </div>
        </div>

        {/* Tabela Interativa */}
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
            <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--infnet-dark-blue)', marginBottom: '12px' }}>
              Decomposição por Estágio na Resolução {resolution}×{resolution}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { stage: 'Estágio 1 (H/4)', res: `${h1}×${h1}`, qTokens: n1, kTokens: kLen1, r: r1, elements: attnMatrix1, color: '#16A34A', bg: '#F0FDF4', border: '#BBF7D0' },
                { stage: 'Estágio 2 (H/8)', res: `${h2}×${h2}`, qTokens: n2, kTokens: kLen2, r: r2, elements: attnMatrix2, color: '#0284C7', bg: '#F0F9FF', border: '#BAE6FD' },
                { stage: 'Estágio 3 (H/16)', res: `${h3}×${h3}`, qTokens: n3, kTokens: kLen3, r: r3, elements: attnMatrix3, color: '#9333EA', bg: '#FAF5FF', border: '#E9D5FF' },
                { stage: 'Estágio 4 (H/32)', res: `${h4}×${h4}`, qTokens: n4, kTokens: kLen4, r: r4, elements: attnMatrix4, color: '#EA580C', bg: '#FFF7ED', border: '#FED7AA' }
              ].map((s, idx) => (
                <div key={idx} style={{
                  background: s.bg,
                  border: `1px solid ${s.border}`,
                  borderRadius: '8px',
                  padding: '10px 14px',
                  display: 'grid',
                  gridTemplateColumns: '1.2fr 1fr 1fr 1fr',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <div>
                    <span style={{ fontSize: '12px', fontWeight: 800, color: s.color }}>
                      {s.stage}
                    </span>
                    <div style={{ fontSize: '10px', color: '#64748B' }}>Res: {s.res}</div>
                  </div>

                  <div>
                    <span style={{ fontSize: '10px', color: '#64748B' }}>Tokens Q:</span>
                    <div style={{ fontFamily: 'Fira Code', fontSize: '12px', color: '#0F172A', fontWeight: 700 }}>
                      {s.qTokens.toLocaleString()}
                    </div>
                  </div>

                  <div>
                    <span style={{ fontSize: '10px', color: '#64748B' }}>Tokens K, V (R={s.r}):</span>
                    <div style={{ fontFamily: 'Fira Code', fontSize: '12px', color: s.color, fontWeight: 700 }}>
                      {s.kTokens.toLocaleString()}
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '10px', color: '#64748B' }}>Matriz Q·Kᵀ:</span>
                    <div style={{ fontFamily: 'Fira Code', fontSize: '12px', color: '#0F172A', fontWeight: 700 }}>
                      {(s.elements / 1e6).toFixed(2)}M pares
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: '8px',
            padding: '10px 14px',
            fontSize: '11px',
            color: '#334155',
            marginTop: '12px'
          }}>
            {!useSRA ? (
              <span style={{ color: '#C2410C', fontWeight: 600 }}>
                ⚠️ <strong>Atenção sem SRA:</strong> No Estágio 1 com {resolution}×{resolution}, o MSA padrão gera <strong>{(attnMatrix1 / 1e6).toFixed(1)} milhões de pares</strong> de autoatenção em cada camada. Em GPUs comerciais de 12GB ou 16GB, isso causa um crash imediato de OOM.
              </span>
            ) : (
              <span>
                💡 <strong>SRA em Ação:</strong> Com R={rFactor1}, o número de chaves no Estágio 1 cai de {n1.toLocaleString()} para apenas <strong>{kLen1.toLocaleString()}</strong>, tornando viável treinar detectores Mask R-CNN com backbones Transformers!
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
