import React from 'react';

export default function DeiTTokenMechanicsDiagram() {
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
        background: '#FFFFFF',
        border: '1px solid #E2E8F0',
        borderRadius: '16px',
        padding: '20px',
        boxShadow: '0 8px 24px rgba(10, 52, 93, 0.08)'
      }}>
        {/* Top Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #E2E8F0',
          paddingBottom: '10px',
          marginBottom: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{
              background: '#FFEDD5',
              color: '#C2410C',
              padding: '4px 10px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 800
            }}>ANATOMIA DE TOKENS</span>
            <span style={{ color: 'var(--infnet-dark-blue)', fontSize: '16px', fontWeight: 700 }}>
              Mecânica do Distillation Token: Interação no Encoder e Decisão Conjunta
            </span>
          </div>
          <span style={{
            fontFamily: 'Fira Code, monospace',
            fontSize: '12px',
            color: '#C2410C',
            background: '#FFF7ED',
            border: '1px solid #FED7AA',
            padding: '3px 10px',
            borderRadius: '6px',
            fontWeight: 600
          }}>
            z₀ = [x_cls ; x_dist ; x_p¹·E ; ... ; x_p¹⁹⁶·E] + E_pos
          </span>
        </div>

        {/* 3 Camadas Verticais Claras */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* 1. Entrada de Tokens */}
          <div style={{
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: '12px',
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--infnet-dark-blue)', width: '150px' }}>
              SEQUÊNCIA DE ENTRADA:
            </div>
            <div style={{ display: 'flex', gap: '10px', flex: 1, justifyContent: 'center' }}>
              {/* Token CLS */}
              <div style={{
                background: '#E0F2FE',
                border: '2px solid #0284C7',
                borderRadius: '8px',
                padding: '8px 16px',
                textAlign: 'center',
                boxShadow: '0 2px 6px rgba(2, 132, 199, 0.15)'
              }}>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#0369A1' }}>[CLS] Token</div>
                <div style={{ fontSize: '10px', color: '#0284C7', fontFamily: 'Fira Code' }}>pos: 0 • D=768</div>
              </div>

              {/* Token DIST */}
              <div style={{
                background: '#FFEDD5',
                border: '2px solid #EA580C',
                borderRadius: '8px',
                padding: '8px 16px',
                textAlign: 'center',
                boxShadow: '0 2px 6px rgba(234, 88, 12, 0.15)'
              }}>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#C2410C' }}>[DIST] Token</div>
                <div style={{ fontSize: '10px', color: '#EA580C', fontFamily: 'Fira Code' }}>pos: 1 • D=768</div>
              </div>

              {/* Patches Visuais */}
              {['Patch 1', 'Patch 2', '...', 'Patch 196'].map((p, i) => (
                <div key={i} style={{
                  background: '#FFFFFF',
                  border: '1px solid #CBD5E1',
                  borderRadius: '8px',
                  padding: '8px 14px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#334155' }}>{p}</div>
                  <div style={{ fontSize: '10px', color: '#64748B', fontFamily: 'Fira Code' }}>x_p^{i === 2 ? '...' : i + 1}</div>
                </div>
              ))}
            </div>
            <div style={{
              fontFamily: 'Fira Code, monospace',
              fontSize: '12px',
              fontWeight: 700,
              color: '#15803D',
              background: '#DCFCE7',
              border: '1px solid #BBF7D0',
              padding: '6px 12px',
              borderRadius: '6px'
            }}>
              [B, 198, 768]
            </div>
          </div>

          {/* 2. Bloco Transformer com Atenção */}
          <div style={{
            background: '#FAF5FF',
            border: '1.5px solid #E9D5FF',
            borderRadius: '12px',
            padding: '14px',
            position: 'relative'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '8px'
            }}>
              <span style={{ fontSize: '13px', fontWeight: 800, color: '#7E22CE' }}>
                TRANSFORMER ENCODER (12 BLOCOS COM MULTI-HEAD SELF-ATTENTION)
              </span>
              <span style={{ fontSize: '11px', color: '#64748B' }}>
                Todos os tokens [CLS], [DIST] e Patches interagem através de Q, K, V
              </span>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
              padding: '8px 0',
              background: '#FFFFFF',
              borderRadius: '8px',
              border: '1px solid #F3E8FF'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '12px', color: '#0369A1', fontWeight: 700 }}>[CLS] aprende:</div>
                <div style={{ fontSize: '11px', color: '#475569' }}>Relações globais guiadas pelo Ground Truth</div>
              </div>
              <div style={{ fontSize: '14px', color: '#9333EA', fontWeight: 800 }}>⟷ Autoatenção Bidirecional ⟷</div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '12px', color: '#C2410C', fontWeight: 700 }}>[DIST] aprende:</div>
                <div style={{ fontSize: '11px', color: '#475569' }}>Representação correlacionada ao viés da CNN</div>
              </div>
            </div>
          </div>

          {/* 3. Camada de Saída e Decisão Final */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px'
          }}>
            {/* Cabeça Classificadora CLS */}
            <div style={{
              background: '#F0F9FF',
              border: '1.5px solid #BAE6FD',
              borderRadius: '10px',
              padding: '12px 14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ fontSize: '11px', color: '#0369A1', fontWeight: 800 }}>CABEÇA 1: CLASSIFICAÇÃO REAL</div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>Linear(z_cls) → Logits y_cls</div>
                <div style={{ fontSize: '11px', color: '#475569' }}>Supervisionada por Cross-Entropy com y_true</div>
              </div>
              <div style={{
                background: '#FFFFFF',
                color: '#0369A1',
                border: '1px solid #BAE6FD',
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '11px',
                fontFamily: 'Fira Code',
                fontWeight: 700
              }}>
                L_CE(y_cls, y)
              </div>
            </div>

            {/* Cabeça de Destilação DIST */}
            <div style={{
              background: '#FFF7ED',
              border: '1.5px solid #FED7AA',
              borderRadius: '10px',
              padding: '12px 14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ fontSize: '11px', color: '#C2410C', fontWeight: 800 }}>CABEÇA 2: DESTILAÇÃO</div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>Linear(z_dist) → Logits y_dist</div>
                <div style={{ fontSize: '11px', color: '#475569' }}>Supervisionada pelo professor CNN (Hard ou Soft)</div>
              </div>
              <div style={{
                background: '#FFFFFF',
                color: '#C2410C',
                border: '1px solid #FED7AA',
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '11px',
                fontFamily: 'Fira Code',
                fontWeight: 700
              }}>
                L_dist(y_dist, y_teacher)
              </div>
            </div>
          </div>
        </div>

        {/* Rodapé de Inferência */}
        <div style={{
          marginTop: '12px',
          background: '#F0FDF4',
          border: '1px solid #BBF7D0',
          borderRadius: '8px',
          padding: '10px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <span style={{ fontSize: '12px', color: '#166534' }}>
            <strong style={{ color: '#15803D' }}>Predição na Inferência:</strong> A classe final é calculada pela média dos dois classificadores: <code style={{ color: '#0F172A', fontWeight: 700 }}>ŷ = argmax( (y_cls + y_dist) / 2 )</code>.
          </span>
          <span style={{
            fontSize: '11px',
            color: '#15803D',
            fontWeight: 800,
            background: '#DCFCE7',
            padding: '3px 8px',
            borderRadius: '4px'
          }}>
            Ensemble de 2 Cabeças em 1 Modelo
          </span>
        </div>
      </div>
    </div>
  );
}
