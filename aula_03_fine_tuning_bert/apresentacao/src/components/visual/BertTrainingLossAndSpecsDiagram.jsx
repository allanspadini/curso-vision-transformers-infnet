import React from 'react';
import MathView from '../MathView';

export default function BertTrainingLossAndSpecsDiagram() {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {/* Top Joint Loss Banner */}
      <div style={{
        background: '#0A345D',
        borderRadius: '8px',
        padding: '10px 18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: '#FFFFFF'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '12px', fontWeight: 800, color: '#64D9EF', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
            Objetivo Conjunto de Pré-Treinamento:
          </span>
          <MathView math="\mathcal{L}_{\text{total}} = \mathcal{L}_{\text{MLM}} + \mathcal{L}_{\text{NSP}}" />
        </div>
        <div style={{ fontSize: '11px', color: '#CBD5E1' }}>
          Otimizador: <strong>AdamW</strong> • Warmup linear nos primeiros 10.000 steps
        </div>
      </div>

      {/* Main Grid: Specifications Table + Pre-training Setup */}
      <div style={{
        flex: 1,
        minHeight: 0,
        display: 'grid',
        gridTemplateColumns: '1.2fr 0.8fr',
        gap: '12px'
      }}>
        {/* Left: Architecture Specs Table */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: '10px',
          padding: '12px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--infnet-dark-blue)', marginBottom: '8px' }}>
              Especificações Arquiteturais das Variantes Oficiais:
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
              <thead>
                <tr style={{ background: '#F8FAFC', borderBottom: '2px solid #CBD5E1' }}>
                  <th style={{ padding: '8px 10px', textAlign: 'left', color: '#475569' }}>Hiperparâmetro</th>
                  <th style={{ padding: '8px 10px', textAlign: 'center', color: '#0284C7', fontWeight: 700 }}>BERT-Base</th>
                  <th style={{ padding: '8px 10px', textAlign: 'center', color: '#7C3AED', fontWeight: 700 }}>BERT-Large</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '7px 10px', fontWeight: 600, color: '#334155' }}>Camadas Encoder (L)</td>
                  <td style={{ padding: '7px 10px', textAlign: 'center', fontFamily: 'var(--font-code)' }}>12</td>
                  <td style={{ padding: '7px 10px', textAlign: 'center', fontFamily: 'var(--font-code)', fontWeight: 700 }}>24</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #F1F5F9', background: '#F8FAFC' }}>
                  <td style={{ padding: '7px 10px', fontWeight: 600, color: '#334155' }}>Dimensão Oculta (H / d_model)</td>
                  <td style={{ padding: '7px 10px', textAlign: 'center', fontFamily: 'var(--font-code)' }}>768</td>
                  <td style={{ padding: '7px 10px', textAlign: 'center', fontFamily: 'var(--font-code)', fontWeight: 700 }}>1024</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '7px 10px', fontWeight: 600, color: '#334155' }}>Attention Heads (A)</td>
                  <td style={{ padding: '7px 10px', textAlign: 'center', fontFamily: 'var(--font-code)' }}>12 (d_k = 64)</td>
                  <td style={{ padding: '7px 10px', textAlign: 'center', fontFamily: 'var(--font-code)', fontWeight: 700 }}>16 (d_k = 64)</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #F1F5F9', background: '#F8FAFC' }}>
                  <td style={{ padding: '7px 10px', fontWeight: 600, color: '#334155' }}>Feed-Forward Interno (4H)</td>
                  <td style={{ padding: '7px 10px', textAlign: 'center', fontFamily: 'var(--font-code)' }}>3072</td>
                  <td style={{ padding: '7px 10px', textAlign: 'center', fontFamily: 'var(--font-code)', fontWeight: 700 }}>4096</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '7px 10px', fontWeight: 600, color: '#334155' }}>Ativação Não Linear</td>
                  <td style={{ padding: '7px 10px', textAlign: 'center' }}>GELU</td>
                  <td style={{ padding: '7px 10px', textAlign: 'center' }}>GELU</td>
                </tr>
                <tr style={{ background: '#EFF6FF', fontWeight: 800 }}>
                  <td style={{ padding: '8px 10px', color: 'var(--infnet-dark-blue)' }}>Total de Parâmetros</td>
                  <td style={{ padding: '8px 10px', textAlign: 'center', color: '#0284C7' }}>110 Milhões</td>
                  <td style={{ padding: '8px 10px', textAlign: 'center', color: '#7C3AED' }}>340 Milhões</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style={{ fontSize: '10.5px', color: '#64748B', lineHeight: 1.35, marginTop: '6px' }}>
            📌 <strong>Regra de Memória:</strong> O BERT-Base roda confortavelmente em GPUs intermediárias (8GB a 16GB VRAM). O BERT-Large exige ao menos 24GB VRAM (ou técnicas como Gradient Accumulation e FP16).
          </div>
        </div>

        {/* Right: Data Corpus & Infrastructure Info */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '8px' }}>
          {/* Corpus Box */}
          <div style={{ background: '#F8FAFC', padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
            <strong style={{ fontSize: '11.5px', color: 'var(--infnet-dark-blue)', display: 'block', marginBottom: '4px' }}>
              📚 Corpus de Pré-Treinamento (3.3B Palavras):
            </strong>
            <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '11px', color: '#475569', lineHeight: 1.45 }}>
              <li><strong>BookCorpus:</strong> 800 milhões de palavras extraídas de livros não publicados (ideal para capturar narrativa contínua e long-range context).</li>
              <li><strong>English Wikipedia:</strong> 2.500 milhões de palavras (artigos informativos enciclopédicos completos).</li>
            </ul>
          </div>

          {/* Training Scale Box */}
          <div style={{ background: '#F0FDF4', padding: '10px 12px', borderRadius: '8px', border: '1px solid #DCFCE7' }}>
            <strong style={{ fontSize: '11.5px', color: '#166534', display: 'block', marginBottom: '4px' }}>
              ⚡ Escala Computacional Google:
            </strong>
            <div style={{ fontSize: '10.5px', color: '#14532D', lineHeight: 1.4 }}>
              <div>• <strong>BERT-Base:</strong> 16 Cloud TPUs (64 chips) por 4 dias contínuos.</div>
              <div>• <strong>BERT-Large:</strong> 64 Cloud TPUs (256 chips) por 4 dias contínuos.</div>
              <div>• <strong>Batch Size:</strong> 256 sequências de 512 tokens = 128.000 tokens por passo, totalizando 1 milhão de passos de gradiente.</div>
            </div>
          </div>

          {/* Fine-Tuning Superpower */}
          <div style={{ background: '#FEF3C7', padding: '8px 12px', borderRadius: '8px', border: '1px solid #FDE68A', fontSize: '10.5px', color: '#92400E' }}>
            🚀 <strong>O Grande Benefício para a Indústria:</strong> O Google gastou milhares de dólares em TPUs para pré-treinar o BERT. Nós podemos fazer <em>Fine-Tuning</em> para o nosso negócio em apenas alguns minutos no Google Colab!
          </div>
        </div>
      </div>
    </div>
  );
}
