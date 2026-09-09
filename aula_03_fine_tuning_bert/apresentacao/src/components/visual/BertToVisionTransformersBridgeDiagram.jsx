import React, { useState } from 'react';

export default function BertToVisionTransformersBridgeDiagram() {
  const [activeDomain, setActiveDomain] = useState('both'); // 'nlp', 'vision', 'both'

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {/* Top Selector Banner */}
      <div style={{
        background: '#0A345D',
        borderRadius: '8px',
        padding: '8px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: '#FFFFFF'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '12px', fontWeight: 800, color: '#64D9EF', textTransform: 'uppercase' }}>
            A Ponte Conceitual Unificada:
          </span>
          <span style={{ fontSize: '12px', color: '#E2E8F0' }}>
            Como o Encoder-Only do BERT Conquistou a Visão Computacional
          </span>
        </div>
        <div style={{ fontSize: '11px', color: '#CBD5E1' }}>
          Equivalência: <strong>Palavras ➔ Tokens | Imagens ➔ Patches</strong>
        </div>
      </div>

      {/* Main Comparison: Side by Side NLP (BERT) vs Vision (ViT / MAE) */}
      <div style={{
        flex: 1,
        minHeight: 0,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '12px'
      }}>
        {/* Left: BERT no Processamento de Linguagem Natural (NLP) */}
        <div style={{
          background: '#F0F9FF',
          border: '2px solid #BAE6FD',
          borderRadius: '10px',
          padding: '12px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#0369A1', textTransform: 'uppercase' }}>
                NLP: O BERT Original (2018)
              </span>
              <span style={{ fontSize: '10px', background: '#0284C7', color: '#FFF', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>
                Texto Discreto
              </span>
            </div>

            {/* Pipeline Steps NLP */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '11px' }}>
              <div style={{ background: '#FFFFFF', padding: '6px 8px', borderRadius: '6px', border: '1px solid #CBD5E1' }}>
                <strong>1. Fatiamento:</strong> Texto fatiado em <em>Tokens de Subpalavras</em> (WordPiece).
              </div>
              <div style={{ background: '#FFFFFF', padding: '6px 8px', borderRadius: '6px', border: '1px solid #CBD5E1' }}>
                <strong>2. Vetorização:</strong> Token Embedding + Segment + Positional Encoding (1D).
              </div>
              <div style={{ background: '#FFFFFF', padding: '6px 8px', borderRadius: '6px', border: '1px solid #CBD5E1' }}>
                <strong>3. Agregação Global:</strong> Token especial <code style={{ fontFamily: 'var(--font-code)' }}>[CLS]</code> inserido na posição 0.
              </div>
              <div style={{ background: '#FFFFFF', padding: '6px 8px', borderRadius: '6px', border: '1px solid #CBD5E1' }}>
                <strong>4. Pré-Treino Auto-Supervisionado:</strong> <em>Masked Language Model (MLM)</em> — Mascara 15% das palavras e reconstrói o vocabulário.
              </div>
              <div style={{ background: '#FFFFFF', padding: '6px 8px', borderRadius: '6px', border: '1px solid #CBD5E1' }}>
                <strong>5. Cabeça Plugável:</strong> Classificador Linear plugado no vetor <code style={{ fontFamily: 'var(--font-code)' }}>h_[CLS]</code>.
              </div>
            </div>
          </div>

          <div style={{ background: '#E0F2FE', padding: '8px 10px', borderRadius: '6px', fontSize: '10.5px', color: '#0369A1', fontWeight: 600 }}>
            Entrada: Sequência 1D de IDs [B, 512] ➔ [B, 512, 768]
          </div>
        </div>

        {/* Right: Vision Transformer (ViT) & Masked Autoencoders (MAE) */}
        <div style={{
          background: '#F0FDF4',
          border: '2px solid #BBF7D0',
          borderRadius: '10px',
          padding: '12px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#166534', textTransform: 'uppercase' }}>
                VISÃO: ViT (2020) &amp; MAE (2021)
              </span>
              <span style={{ fontSize: '10px', background: '#16A34A', color: '#FFF', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>
                Imagens Contínuas
              </span>
            </div>

            {/* Pipeline Steps Vision */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '11px' }}>
              <div style={{ background: '#FFFFFF', padding: '6px 8px', borderRadius: '6px', border: '1px solid #CBD5E1' }}>
                <strong>1. Fatiamento:</strong> Imagem fatiada em <em>Patches de 16×16 pixels</em> (196 patches).
              </div>
              <div style={{ background: '#FFFFFF', padding: '6px 8px', borderRadius: '6px', border: '1px solid #CBD5E1' }}>
                <strong>2. Vetorização:</strong> Projeção Linear 2D (<code style={{ fontFamily: 'var(--font-code)' }}>nn.Conv2d</code>) + Positional Embedding 1D.
              </div>
              <div style={{ background: '#FFFFFF', padding: '6px 8px', borderRadius: '6px', border: '1px solid #CBD5E1' }}>
                <strong>3. Agregação Global:</strong> Token especial <code style={{ fontFamily: 'var(--font-code)' }}>[CLS]</code> inserido na posição 0.
              </div>
              <div style={{ background: '#FFFFFF', padding: '6px 8px', borderRadius: '6px', border: '1px solid #CBD5E1' }}>
                <strong>4. Pré-Treino Auto-Supervisionado:</strong> <em>Masked Autoencoders (MAE)</em> — Mascara 75% dos patches e reconstrói os pixels brutos!
              </div>
              <div style={{ background: '#FFFFFF', padding: '6px 8px', borderRadius: '6px', border: '1px solid #CBD5E1' }}>
                <strong>5. Cabeça Plugável:</strong> MLP Head no <code style={{ fontFamily: 'var(--font-code)' }}>h_[CLS]</code> (Classificação) ou Convoluções (Segmentação).
              </div>
            </div>
          </div>

          <div style={{ background: '#DCFCE7', padding: '8px 10px', borderRadius: '6px', fontSize: '10.5px', color: '#166534', fontWeight: 600 }}>
            Entrada: Patches 2D [B, 3, 224, 224] ➔ [B, 197, 768]
          </div>
        </div>
      </div>

      {/* Bottom Synthesis Callout */}
      <div style={{
        background: '#FAF5FF',
        border: '1px solid #E9D5FF',
        borderRadius: '8px',
        padding: '8px 14px',
        fontSize: '11px',
        color: '#7E22CE',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        <span>🚀</span>
        <div>
          <strong>A Conclusão Definitiva:</strong> O Vision Transformer (ViT) não inventou um novo modelo; ele <em>pegou o Encoder exato do BERT</em> e alimentou-o com pequenos recortes de imagem em vez de palavras! O mesmo algoritmo de Self-Attention que compreende sintaxe em frases agora conecta textura, cor e geometria no espaço visual.
        </div>
      </div>
    </div>
  );
}
