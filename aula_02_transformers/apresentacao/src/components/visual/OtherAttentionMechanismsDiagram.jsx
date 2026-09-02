import React, { useState } from 'react';
import { Layers, Zap, ArrowRight, Cpu, HardDrive, Sparkles } from 'lucide-react';

export default function OtherAttentionMechanismsDiagram() {
  const [activeTab, setActiveTab] = useState('cross');

  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      fontSize: '13px'
    }}>
      {/* Top Banner */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#EDF5FA',
        padding: '8px 16px',
        borderRadius: '8px',
        border: '1px solid #D0E3F0'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, color: 'var(--infnet-dark-blue)' }}>
          <Layers size={18} color="var(--infnet-cyan)" />
          <span>Variantes da Atenção: Cross-Attention, FlashAttention e Mecanismos Modernos</span>
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            onClick={() => setActiveTab('cross')}
            style={{
              padding: '4px 12px',
              borderRadius: '6px',
              border: 'none',
              fontSize: '11.5px',
              fontWeight: 600,
              cursor: 'pointer',
              background: activeTab === 'cross' ? 'var(--infnet-dark-blue)' : '#FFFFFF',
              color: activeTab === 'cross' ? '#FFFFFF' : 'var(--text-main)',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            Self vs Cross-Attention
          </button>
          <button
            onClick={() => setActiveTab('flash')}
            style={{
              padding: '4px 12px',
              borderRadius: '6px',
              border: 'none',
              fontSize: '11.5px',
              fontWeight: 600,
              cursor: 'pointer',
              background: activeTab === 'flash' ? 'var(--infnet-dark-blue)' : '#FFFFFF',
              color: activeTab === 'flash' ? '#FFFFFF' : 'var(--text-main)',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            FlashAttention (GPU IO-Aware)
          </button>
        </div>
      </div>

      {activeTab === 'cross' ? (
        <div className="grid-2col" style={{ flex: 1, minHeight: 0 }}>
          {/* Self-Attention Card */}
          <div className="card card-highlight">
            <div className="card-header">
              <div className="card-icon-wrapper icon-blue">
                <Layers size={18} />
              </div>
              <div className="card-title">1. Self-Attention (Autoatenção)</div>
            </div>
            <div className="card-body">
              <div style={{ background: '#FFFFFF', padding: '8px', borderRadius: '6px', border: '1px solid #D0E3F0', marginBottom: '10px', textAlign: 'center' }}>
                <code style={{ color: 'var(--infnet-dark-blue)', fontWeight: 700 }}>Q = X·W_Q,  K = X·W_K,  V = X·W_V</code>
              </div>
              <ul style={{ paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <li><strong>Origem Única:</strong> Queries, Keys e Values derivam da <em>mesma</em> sequência de entrada $X$.</li>
                <li><strong>Propósito:</strong> Cada token contextualiza seu significado em relação aos outros tokens da mesma frase/imagem.</li>
                <li><strong>Onde é usado:</strong> No encoder de ViT, nos blocos do GPT e no BERT.</li>
              </ul>
            </div>
          </div>

          {/* Cross-Attention Card */}
          <div className="card card-highlight-green">
            <div className="card-header">
              <div className="card-icon-wrapper icon-green">
                <Zap size={18} />
              </div>
              <div className="card-title">2. Cross-Attention (Atenção Cruzada)</div>
            </div>
            <div className="card-body">
              <div style={{ background: '#FFFFFF', padding: '8px', borderRadius: '6px', border: '1px solid #DCFCE7', marginBottom: '10px', textAlign: 'center' }}>
                <code style={{ color: '#15803D', fontWeight: 700 }}>Q = X_dec·W_Q,  K = Y_enc·W_K,  V = Y_enc·W_V</code>
              </div>
              <ul style={{ paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <li><strong>Duas Sequências Distintas:</strong> Queries vêm do Decoder (X_dec); Keys e Values vêm do Encoder (Y_enc).</li>
                <li><strong>Propósito:</strong> Permite que o Decoder consulte representações externas ricas (ex: imagem, texto em outro idioma ou áudio).</li>
                <li><strong>Onde é usado:</strong> Modelos Multimodais (Flamingo, CLIP, Stable Diffusion onde o texto guia a geração da imagem, DETR na detecção).</li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        /* FlashAttention Showcase */
        <div style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: '14px',
          minHeight: 0
        }}>
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-light)',
            borderRadius: '10px',
            padding: '14px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--infnet-dark-blue)', textTransform: 'uppercase' }}>
              FlashAttention: Otimização de Hierarquia de Memória GPU (Dao et al.)
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              flex: 1,
              justifyContent: 'center'
            }}>
              <div style={{ background: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '10px' }}>
                <div style={{ fontWeight: 700, color: '#B91C1C', fontSize: '12px', marginBottom: '4px' }}>
                  ❌ Atenção Padrão (Gargalo de Leitura/Escrita na HBM):
                </div>
                <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
                  Q, K → HBM → calcula Q Kᵀ (T × T) → grava na HBM → lê da HBM → Softmax → grava na HBM → multiplica V.
                  <br />O tráfego de dados na memória global da GPU satura a largura de banda!
                </div>
              </div>

              <div style={{ background: '#F0FDF4', border: '1.5px solid #86EFAC', borderRadius: '8px', padding: '10px' }}>
                <div style={{ fontWeight: 700, color: '#15803D', fontSize: '12px', marginBottom: '4px' }}>
                  ⚡ FlashAttention (Tiling em SRAM Ultrarrápida):
                </div>
                <div style={{ fontSize: '11.5px', color: '#166534' }}>
                  Divide $Q, K, V$ em pequenos blocos (*tiles*) que cabem na memória cache <strong>SRAM</strong> interna dos núcleos CUDA. O Softmax e o produto por $V$ são calculados online sem jamais gravar a matriz gigante $T × T$ na HBM!
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div className="card" style={{ flex: 1 }}>
              <div className="card-header">
                <div className="card-icon-wrapper icon-green">
                  <Zap size={18} />
                </div>
                <div className="card-title">Ganhos em Produção</div>
              </div>
              <div className="card-body">
                <ul style={{ paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <li><strong>2x a 4x mais rápido</strong> em treinamento e inferência.</li>
                  <li><strong>Economia de Memória de $O(T^2)$ para $O(T)$:</strong> Permite janelas de contexto muito maiores (ex: de 2k para 32k ou 128k tokens).</li>
                  <li><strong>Disponível no PyTorch 2.0+:</strong> Integrado nativamente via <code>torch.nn.functional.scaled_dot_product_attention</code>.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
