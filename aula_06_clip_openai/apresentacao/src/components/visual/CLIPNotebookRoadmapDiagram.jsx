import React from 'react';
import { Terminal, Code, Cpu, Database, CheckCircle, ArrowRight } from 'lucide-react';

export default function CLIPNotebookRoadmapDiagram() {
  const blocks = [
    {
      step: 'Bloco 1',
      title: 'Ambiente & Carga',
      tech: 'uv pip install ftfy regex tqdm git+https://github.com/openai/CLIP.git',
      desc: 'Carregamento do modelo ViT-B/32 oficial e Hugging Face CLIPModel.',
      color: '#0284C7',
      bg: '#F0F9FF',
      border: '#BAE6FD'
    },
    {
      step: 'Bloco 2',
      title: 'Tensores & Normalização',
      tech: 'image_features /= image_features.norm(dim=-1, keepdim=True)',
      desc: 'Inspeção passo a passo de tensores [B, 512] e cálculo manual de similaridade.',
      color: '#16A34A',
      bg: '#F0FDF4',
      border: '#BBF7D0'
    },
    {
      step: 'Bloco 3',
      title: 'Zero-Shot no CIFAR-100',
      tech: 'logits = (100.0 * image_features @ text_features.T).softmax(dim=-1)',
      desc: 'Avaliação de acurácia com prompts customizados vs single word.',
      color: '#9333EA',
      bg: '#FAF5FF',
      border: '#E9D5FF'
    },
    {
      step: 'Bloco 4',
      title: 'Busca Semântica Multimodal',
      tech: 'scores, indices = torch.topk(image_features @ query_feat.T, k=5)',
      desc: 'Engine de busca Text-to-Image com galeria de fotos e ranking visual.',
      color: '#EA580C',
      bg: '#FFF7ED',
      border: '#FED7AA'
    },
    {
      step: 'Bloco 5',
      title: 'Detecção de Anomalias',
      tech: 'anomaly_score = P("damaged") / (P("pristine") + P("damaged"))',
      desc: 'Inspeção de peças industriais (MVTec AD) com threshold configurável.',
      color: '#0A345D',
      bg: '#EDF5FA',
      border: '#D0E3F0'
    }
  ];

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {/* Top Banner */}
      <div style={{
        background: '#EDF5FA',
        border: '1px solid #D0E3F0',
        borderRadius: '8px',
        padding: '10px 18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{
            background: 'var(--infnet-dark-blue)',
            color: '#FFFFFF',
            fontSize: '11px',
            fontWeight: 800,
            padding: '3px 8px',
            borderRadius: '4px'
          }}>
            PRÁTICA EM CÓDIGO
          </span>
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--infnet-dark-blue)' }}>
            Pipeline completo do Jupyter Notebook (Google Colab 1-Click via PyTorch & Transformers)
          </span>
        </div>
        <span style={{ fontSize: '11px', fontFamily: 'Fira Code', color: '#0284C7', fontWeight: 700 }}>
          Biblioteca Oficial CLIP + Hugging Face
        </span>
      </div>

      {/* Grid 5 Blocos em Linha */}
      <div style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '12px'
      }}>
        {blocks.map((b, idx) => (
          <div
            key={idx}
            style={{
              background: b.bg,
              border: `1.5px solid ${b.border}`,
              borderRadius: '10px',
              padding: '14px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{
                  background: b.color,
                  color: '#FFFFFF',
                  fontSize: '10px',
                  fontWeight: 800,
                  padding: '2px 6px',
                  borderRadius: '4px',
                  fontFamily: 'var(--font-code)'
                }}>
                  {b.step}
                </span>
                <span style={{ fontSize: '11px', fontWeight: 700, color: b.color }}>
                  #{idx + 1}
                </span>
              </div>

              <h3 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--infnet-dark-blue)', marginBottom: '6px' }}>
                {b.title}
              </h3>
              <p style={{ fontSize: '11px', color: 'var(--text-main)', lineHeight: '1.4', marginBottom: '10px' }}>
                {b.desc}
              </p>
            </div>

            <div style={{
              background: '#FFFFFF',
              border: `1px solid ${b.border}`,
              borderRadius: '6px',
              padding: '8px',
              fontFamily: 'Fira Code',
              fontSize: '9.5px',
              color: b.color,
              wordBreak: 'break-all'
            }}>
              {b.tech}
            </div>
          </div>
        ))}
      </div>

      {/* Caixa de Fechamento da Aula */}
      <div style={{
        background: '#F0FDF4',
        border: '1px solid #BBF7D0',
        borderRadius: '8px',
        padding: '12px 18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckCircle size={18} color="#16A34A" />
          <span style={{ fontSize: '12px', color: '#14532D', fontWeight: 600 }}>
            No laboratório de código, você colocará a mão na massa com GPU T4/A100 no Colab, executando cada uma das equações vistas hoje em PyTorch puro.
          </span>
        </div>
        <span style={{ fontSize: '11px', fontWeight: 700, color: '#15803D' }}>
          Pronto para o Notebook! ➔
        </span>
      </div>
    </div>
  );
}
