import React from 'react';
import MathView from '../MathView';

export default function AttentionMapExtractionDiagram() {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {/* Top Banner */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#EDF5FA',
        border: '1px solid #D0E3F0',
        borderRadius: '8px',
        padding: '10px 18px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{
            background: 'var(--infnet-dark-blue)',
            color: '#FFFFFF',
            fontSize: '11px',
            fontWeight: 700,
            padding: '3px 10px',
            borderRadius: '4px',
            fontFamily: 'var(--font-code)'
          }}>
            INTERPRETABILIDADE & AUDITORIA
          </span>
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--infnet-dark-blue)' }}>
            Extração de Attention Maps no ViT: Da Matriz de Atenção ao Heatmap Sobreposto
          </span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <span className="badge badge-purple" style={{ fontSize: '11px' }}>Token [CLS] Linha 0</span>
          <span className="badge badge-cyan" style={{ fontSize: '11px' }}>Reshape [14 × 14]</span>
          <span className="badge badge-orange" style={{ fontSize: '11px' }}>Auditoria de Atalhos</span>
        </div>
      </div>

      {/* Main Diagram Area */}
      <div style={{
        flex: 1,
        background: '#FFFFFF',
        border: '1px solid var(--border-light)',
        borderRadius: '12px',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: 'var(--shadow-sm)',
        minHeight: 0
      }}>
        {/* 4 Step Process Pipeline */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 20px 1fr 20px 1fr 20px 1fr',
          alignItems: 'center',
          gap: '8px'
        }}>
          {/* Step 1 */}
          <div style={{ background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '10px', padding: '12px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ background: '#E0F2FE', color: '#0369A1', fontSize: '9px', fontWeight: 700, padding: '2px 6px', borderRadius: '4px' }}>Passo 1</span>
                <span style={{ fontSize: '9.5px', color: '#64748B', fontFamily: 'var(--font-code)' }}>hook / return_weights</span>
              </div>
              <strong style={{ fontSize: '11.5px', color: '#0A345D', display: 'block', marginBottom: '6px' }}>
                Extração da Matriz A
              </strong>
              <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '6px', textAlign: 'center', marginBottom: '6px' }}>
                <MathView math="A = \text{softmax}\left(\frac{Q K^T}{\sqrt{d_k}}\right)" />
              </div>
              <p style={{ fontSize: '9.5px', color: '#475569', margin: 0 }}>
                Tensor de atenção da última camada: <code style={{ color: '#0284C7', fontWeight: 700 }}>[B, h, 197, 197]</code> com <MathView math="h" /> cabeças.
              </p>
            </div>
          </div>

          <div style={{ textAlign: 'center', color: '#0284C7', fontWeight: 800 }}>➔</div>

          {/* Step 2 */}
          <div style={{ background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '10px', padding: '12px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ background: '#FAF5FF', color: '#7E22CE', fontSize: '9px', fontWeight: 700, padding: '2px 6px', borderRadius: '4px' }}>Passo 2</span>
                <span style={{ fontSize: '9.5px', color: '#64748B', fontFamily: 'var(--font-code)' }}>A[:, head, 0, 1:]</span>
              </div>
              <strong style={{ fontSize: '11.5px', color: '#0A345D', display: 'block', marginBottom: '6px' }}>
                Isolamento do [CLS]
              </strong>
              <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '6px', textAlign: 'center', marginBottom: '6px' }}>
                <MathView math="w_{\text{cls}} \in \mathbb{R}^{196}" />
              </div>
              <p style={{ fontSize: '9.5px', color: '#475569', margin: 0 }}>
                Linha 0 representa o peso que o classificador atribui a cada um dos 196 patches espaciais (descarta o índice 0 de auto-atenção).
              </p>
            </div>
          </div>

          <div style={{ textAlign: 'center', color: '#7E22CE', fontWeight: 800 }}>➔</div>

          {/* Step 3 */}
          <div style={{ background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '10px', padding: '12px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ background: '#ECFDF5', color: '#059669', fontSize: '9px', fontWeight: 700, padding: '2px 6px', borderRadius: '4px' }}>Passo 3</span>
                <span style={{ fontSize: '9.5px', color: '#64748B', fontFamily: 'var(--font-code)' }}>.view(14, 14)</span>
              </div>
              <strong style={{ fontSize: '11.5px', color: '#0A345D', display: 'block', marginBottom: '6px' }}>
                Reshape & Interpolação
              </strong>
              <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '6px', textAlign: 'center', marginBottom: '6px' }}>
                <MathView math="[196] \to [14, 14] \xrightarrow{\text{bilinear}} [224, 224]" />
              </div>
              <p style={{ fontSize: '9.5px', color: '#475569', margin: 0 }}>
                Reconstitui a grade bidimensional espacial e faz upsampling contínuo para resolução da imagem.
              </p>
            </div>
          </div>

          <div style={{ textAlign: 'center', color: '#059669', fontWeight: 800 }}>➔</div>

          {/* Step 4 */}
          <div style={{ background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '10px', padding: '12px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ background: '#FFF7ED', color: '#EA580C', fontSize: '9px', fontWeight: 700, padding: '2px 6px', borderRadius: '4px' }}>Passo 4</span>
                <span style={{ fontSize: '9.5px', color: '#64748B', fontFamily: 'var(--font-code)' }}>colormap + overlay</span>
              </div>
              <strong style={{ fontSize: '11.5px', color: '#0A345D', display: 'block', marginBottom: '6px' }}>
                Heatmap & Diagnóstico
              </strong>
              <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '6px', textAlign: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '10px', fontWeight: 700, color: '#C2410C' }}>Auditoria de Justificativa</span>
              </div>
              <p style={{ fontSize: '9.5px', color: '#475569', margin: 0 }}>
                Sobreposição transparente (alpha=0.5) para auditar se o modelo foca no objeto relevante ou em artefatos de fundo.
              </p>
            </div>
          </div>
        </div>

        {/* Interpretability Insights in 2 Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '12px',
          marginTop: '12px'
        }}>
          <div style={{ background: '#F0FDF4', border: '1px solid #86EFAC', borderRadius: '8px', padding: '10px 14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <span style={{ fontSize: '14px' }}>🎯</span>
              <strong style={{ fontSize: '11px', color: '#166534' }}>Atenção Semântica Válida (Alta Confiança)</strong>
            </div>
            <p style={{ fontSize: '10px', color: '#14532D', margin: 0, lineHeight: '1.4' }}>
              Os picos de atenção concentram-se estritamente sobre as bordas morfológicas e elementos centrais do objeto discriminado. O modelo generalizará bem para novos ambientes e sensores.
            </p>
          </div>

          <div style={{ background: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: '8px', padding: '10px 14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <span style={{ fontSize: '14px' }}>⚠️</span>
              <strong style={{ fontSize: '11px', color: '#991B1B' }}>Atenção Espúria (Shortcut Learning / Vazamento)</strong>
            </div>
            <p style={{ fontSize: '10px', color: '#7F1D1D', margin: 0, lineHeight: '1.4' }}>
              O mapa de atenção foca em marcas d’água, cantos escuros, etiquetas ou texturas de fundo. O modelo aprendeu um atalho correlacional em vez da causa visual real, falhando fora do treino.
            </p>
          </div>
        </div>

        {/* PyTorch Hook Snippet Note */}
        <div style={{ background: '#F1F5F9', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '8px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '10px', color: '#334155' }}>
          <span>💻 <strong>Implementação PyTorch:</strong> Registre um <code>register_forward_hook</code> no módulo <code>encoder.layers[-1].self_attention</code> para interceptar a matriz sem alterar o grafo.</span>
          <span style={{ fontFamily: 'var(--font-code)', color: '#0284C7', fontWeight: 600 }}>model.encoder.layers[-1]</span>
        </div>
      </div>
    </div>
  );
}
