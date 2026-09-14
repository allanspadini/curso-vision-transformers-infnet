import React, { useState } from 'react';

export default function ViTTensorTrackerLab() {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      id: 0,
      name: '1. Imagem de Entrada',
      shape: '[B, 3, 224, 224]',
      color: '#0A345D',
      pytorch: 'x = images # Tensor float32 normalizado',
      desc: 'Lote de B imagens coloridas com altura e largura de 224 pixels e 3 canais de cor (RGB).'
    },
    {
      id: 1,
      name: '2. Patch Embedding',
      shape: '[B, 196, 768]',
      color: '#0284C7',
      pytorch: 'x = patch_embed(x).flatten(2).transpose(1, 2)',
      desc: 'Cada patch 16×16×3 (768 valores) é projetado linearmente para o vetor latente D=768. N = 14×14 = 196 patches.'
    },
    {
      id: 2,
      name: '3. Prepend [CLS] Token',
      shape: '[B, 197, 768]',
      color: '#7E22CE',
      pytorch: 'x = torch.cat([cls_token.expand(B, -1, -1), x], dim=1)',
      desc: 'O token agregador [CLS] é inserido no início da sequência. O comprimento salta de 196 para 197 tokens.'
    },
    {
      id: 3,
      name: '4. Soma Posicional (+)',
      shape: '[B, 197, 768]',
      color: '#EA580C',
      pytorch: 'x = x + pos_embed # E_pos com shape [1, 197, 768]',
      desc: 'Soma elemento a elemento com os embeddings de posição aprendidos para recuperar a relação espacial 2D.'
    },
    {
      id: 4,
      name: '5. Transformer Encoder (12 Blocos)',
      shape: '[B, 197, 768]',
      color: '#16A34A',
      pytorch: 'for block in blocks: x = block(x)',
      desc: '12 camadas de autoatenção multi-cabeça e MLPs. Os 197 tokens trocam informações globais sem alterar o formato dimensional.'
    },
    {
      id: 5,
      name: '6. Pooling do Token [CLS]',
      shape: '[B, 768]',
      color: '#0369A1',
      pytorch: 'cls_out = x[:, 0] # Apenas o primeiro vetor',
      desc: 'Descarta-se os 196 patches espaciais e extrai-se unicamente o vetor do token [CLS], que agregou o contexto da imagem toda.'
    },
    {
      id: 6,
      name: '7. Cabeça Linear (Logits)',
      shape: '[B, 1000]',
      color: '#15803D',
      pytorch: 'logits = head(norm(cls_out))',
      desc: 'Projeção linear final de 768 para o número de classes (ex: 1.000 classes do ImageNet ou C classes personalizadas).'
    }
  ];

  const st = steps[currentStep];

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {/* Barra de Progresso Interativa dos Passos */}
      <div style={{
        background: '#F8FAFC',
        border: '1px solid #E2E8F0',
        borderRadius: '8px',
        padding: '8px 12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', gap: '6px', overflowX: 'auto' }}>
          {steps.map((step, idx) => (
            <button
              key={step.id}
              onClick={() => setCurrentStep(idx)}
              style={{
                padding: '4px 8px',
                borderRadius: '6px',
                border: currentStep === idx ? `2px solid ${step.color}` : '1px solid #CBD5E1',
                background: currentStep === idx ? '#FFFFFF' : '#F1F5F9',
                color: currentStep === idx ? step.color : '#64748B',
                fontSize: '11px',
                fontWeight: currentStep === idx ? 800 : 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              Passo {idx + 1}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
            disabled={currentStep === 0}
            style={{
              padding: '4px 10px',
              borderRadius: '4px',
              border: '1px solid #CBD5E1',
              background: '#FFFFFF',
              cursor: currentStep === 0 ? 'not-allowed' : 'pointer',
              fontSize: '11px',
              opacity: currentStep === 0 ? 0.5 : 1
            }}
          >
            ◀ Anterior
          </button>
          <button
            onClick={() => setCurrentStep(prev => Math.min(steps.length - 1, prev + 1))}
            disabled={currentStep === steps.length - 1}
            style={{
              padding: '4px 10px',
              borderRadius: '4px',
              border: '1px solid var(--infnet-cyan)',
              background: 'var(--infnet-cyan)',
              color: '#FFFFFF',
              cursor: currentStep === steps.length - 1 ? 'not-allowed' : 'pointer',
              fontSize: '11px',
              fontWeight: 700,
              opacity: currentStep === steps.length - 1 ? 0.5 : 1
            }}
          >
            Próximo ▶
          </button>
        </div>
      </div>

      {/* Área Central: Visualização do Tensor Ativo */}
      <div style={{
        flex: 1,
        background: '#FFFFFF',
        borderRadius: '12px',
        border: '1px solid #E2E8F0',
        padding: '16px 20px',
        display: 'grid',
        gridTemplateColumns: '1.1fr 0.9fr',
        gap: '16px',
        minHeight: 0
      }}>
        {/* Painel Esquerdo: Representação Gráfica do Tensor */}
        <div style={{
          background: '#F8FAFC',
          borderRadius: '10px',
          border: '1px solid #E2E8F0',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px'
        }}>
          <span className="badge" style={{ background: st.color, color: '#FFFFFF' }}>
            {st.name}
          </span>

          <div style={{
            background: '#FFFFFF',
            border: `2px solid ${st.color}`,
            borderRadius: '10px',
            padding: '16px 24px',
            textAlign: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
          }}>
            <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 700, marginBottom: '4px' }}>
              FORMATO DO TENSOR EM MEMÓRIA
            </div>
            <div style={{
              fontSize: '24px',
              fontFamily: 'var(--font-mono)',
              fontWeight: 900,
              color: st.color,
              letterSpacing: '0.5px'
            }}>
              {st.shape}
            </div>
          </div>

          <p style={{ fontSize: '12.5px', color: '#334155', textAlign: 'center', margin: 0, maxWidth: '320px', lineHeight: 1.45 }}>
            {st.desc}
          </p>
        </div>

        {/* Painel Direito: Linha de Comando PyTorch & Análise Semântica */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', marginBottom: '6px' }}>
              OPERAÇÃO PYTORCH EQUIVALENTE:
            </div>
            <div style={{
              background: '#0F172A',
              borderRadius: '8px',
              padding: '12px',
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              color: '#38BDF8',
              lineHeight: 1.4,
              overflowX: 'auto'
            }}>
              {st.pytorch}
            </div>
          </div>

          <div style={{
            background: '#F0FDF4',
            border: '1px solid #BBF7D0',
            borderRadius: '8px',
            padding: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px'
          }}>
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#166534' }}>
              💡 RASTREIO DE DIMENSÕES:
            </div>
            <div style={{ fontSize: '11.5px', color: '#14532D', lineHeight: 1.4 }}>
              Observe como a dimensão oculta <strong>D = 768</strong> permanece rigorosamente estável da etapa 2 à etapa 6. O Transformer preserva a dimensionalidade latente ao longo de todas as 12 camadas!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
