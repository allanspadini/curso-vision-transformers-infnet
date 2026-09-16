import React from 'react';

export default function DensePredictionBottleneckDiagram() {
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
        padding: '22px 20px',
        boxShadow: '0 8px 24px rgba(10, 52, 93, 0.08)'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #E2E8F0',
          paddingBottom: '10px',
          marginBottom: '18px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{
              background: '#DCFCE7',
              color: '#15803D',
              padding: '4px 10px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 800
            }}>SITUAÇÃO-PROBLEMA</span>
            <span style={{ color: 'var(--infnet-dark-blue)', fontSize: '16px', fontWeight: 700 }}>
              O Dilema da Visão Densa: Por que o ViT Canônico Falha em Detecção e Segmentação?
            </span>
          </div>
          <span style={{
            fontSize: '12px',
            color: '#C2410C',
            background: '#FFF7ED',
            border: '1px solid #FED7AA',
            padding: '3px 10px',
            borderRadius: '6px',
            fontFamily: 'Fira Code',
            fontWeight: 700
          }}>
            Falta de Pirâmide Espacial + Complexidade O(N²)
          </span>
        </div>

        {/* 2 Colunas Claras: ViT Isotrópico vs Pirâmide FPN */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '20px'
        }}>
          {/* Lado Esquerdo: O ViT Isotrópico (Inadequado) */}
          <div style={{
            background: '#FFF7ED',
            border: '1.5px solid #FDBA74',
            borderRadius: '12px',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{ color: '#EA580C', fontSize: '18px', fontWeight: 900 }}>✕</span>
              <span style={{ fontSize: '14px', fontWeight: 800, color: '#7C2D12' }}>
                ViT Canônico: Arquitetura Isotrópica (Coluna Fixa)
              </span>
            </div>
            <p style={{ fontSize: '11px', color: '#475569', marginBottom: '12px' }}>
              Uma única resolução espacial (H/16 × W/16) mantida fixa em todos os blocos.
            </p>

            {/* Ilustração Colunar Clara */}
            <div style={{
              background: '#FFFFFF',
              border: '1px solid #FED7AA',
              borderRadius: '8px',
              padding: '14px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              alignItems: 'center',
              marginBottom: '14px'
            }}>
              {['Bloco L (14×14, D=768)', '...', 'Bloco 2 (14×14, D=768)', 'Bloco 1 (14×14, D=768)'].map((b, i) => (
                <div key={i} style={{
                  width: '85%',
                  background: '#FFF7ED',
                  border: '1px solid #FED7AA',
                  padding: '6px',
                  borderRadius: '4px',
                  textAlign: 'center',
                  fontSize: '11px',
                  fontFamily: 'Fira Code',
                  fontWeight: 600,
                  color: '#9A3412'
                }}>
                  {b}
                </div>
              ))}
            </div>

            <div style={{
              background: '#FFFFFF',
              borderRadius: '6px',
              padding: '10px',
              borderLeft: '3px solid #EA580C',
              fontSize: '11px',
              color: '#334155'
            }}>
              <strong>O Gargalo Fatal:</strong> Objetos pequenos (ex: pedestres em 16×16px) ocupam apenas 1 token e perdem contornos finos. Objetos gigantes cobrem dezenas de tokens sem agregação multiescala.
            </div>
          </div>

          {/* Lado Direito: A Necessidade da Pirâmide FPN */}
          <div style={{
            background: '#F0FDF4',
            border: '1.5px solid #86EFAC',
            borderRadius: '12px',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{ color: '#16A34A', fontSize: '18px', fontWeight: 900 }}>✓</span>
              <span style={{ fontSize: '14px', fontWeight: 800, color: '#14532D' }}>
                O Padrão de Ouro: Pirâmide Hierárquica (FPN / CNN)
              </span>
            </div>
            <p style={{ fontSize: '11px', color: '#475569', marginBottom: '12px' }}>
              Redução progressiva da resolução espacial com enriquecimento de canais semânticos.
            </p>

            {/* Ilustração Piramidal Clara */}
            <div style={{
              background: '#FFFFFF',
              border: '1px solid #BBF7D0',
              borderRadius: '8px',
              padding: '14px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              alignItems: 'center',
              marginBottom: '14px'
            }}>
              <div style={{
                width: '40%',
                background: '#DCFCE7',
                border: '1px solid #16A34A',
                padding: '5px',
                borderRadius: '4px',
                textAlign: 'center',
                fontSize: '10px',
                fontFamily: 'Fira Code',
                fontWeight: 700,
                color: '#14532D'
              }}>
                Estágio 4: H/32 × W/32 (C4)
              </div>
              <div style={{
                width: '60%',
                background: '#F0FDF4',
                border: '1px solid #4ADE80',
                padding: '5px',
                borderRadius: '4px',
                textAlign: 'center',
                fontSize: '10px',
                fontFamily: 'Fira Code',
                fontWeight: 700,
                color: '#166534'
              }}>
                Estágio 3: H/16 × W/16 (C3)
              </div>
              <div style={{
                width: '78%',
                background: '#F0FDF4',
                border: '1px solid #86EFAC',
                padding: '5px',
                borderRadius: '4px',
                textAlign: 'center',
                fontSize: '10px',
                fontFamily: 'Fira Code',
                fontWeight: 700,
                color: '#15803D'
              }}>
                Estágio 2: H/8 × W/8 (C2)
              </div>
              <div style={{
                width: '95%',
                background: '#F0FDF4',
                border: '1px solid #BBF7D0',
                padding: '5px',
                borderRadius: '4px',
                textAlign: 'center',
                fontSize: '10px',
                fontFamily: 'Fira Code',
                fontWeight: 700,
                color: '#166534'
              }}>
                Estágio 1: H/4 × W/4 (C1 - Alta Resolução)
              </div>
            </div>

            <div style={{
              background: '#FFFFFF',
              borderRadius: '6px',
              padding: '10px',
              borderLeft: '3px solid #16A34A',
              fontSize: '11px',
              color: '#334155'
            }}>
              <strong>O Desafio de Engenharia:</strong> No Estágio 1 (H/4 × W/4), uma imagem de 800×800 gera <strong>40.000 tokens</strong>. Como calcular autoatenção sem estourar a GPU?
            </div>
          </div>
        </div>

        {/* Rodapé Resumo Claro */}
        <div style={{
          marginTop: '16px',
          background: '#F8FAFC',
          borderRadius: '8px',
          padding: '10px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          border: '1px solid #E2E8F0'
        }}>
          <span style={{ fontSize: '12px', color: '#334155' }}>
            A resposta veio com dois marcos da literatura em 2021: <strong>PVT</strong> (Spatial-Reduction Attention) e <strong>Swin Transformer</strong> (Janelas Locais O(N)).
          </span>
          <span style={{
            fontSize: '11px',
            color: '#0284C7',
            fontFamily: 'Fira Code',
            fontWeight: 700
          }}>
            Próximo passo: PVT ➔
          </span>
        </div>
      </div>
    </div>
  );
}
