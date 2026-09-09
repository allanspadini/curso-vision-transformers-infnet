import React, { useState } from 'react';
import MathView from '../MathView';

export default function MaskedLanguageModelDiagram() {
  const [activeTab, setActiveTab] = useState('flow'); // 'flow' or 'rule'

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {/* Top Banner with Toggle */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#F0FDF4',
        border: '1px solid #BBF7D0',
        borderRadius: '8px',
        padding: '6px 14px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#166534' }}>
            Objetivo Auto-Supervisionado:
          </span>
          <button
            onClick={() => setActiveTab('flow')}
            style={{
              padding: '4px 12px',
              borderRadius: '6px',
              border: activeTab === 'flow' ? '2px solid #16A34A' : '1px solid #CBD5E1',
              background: activeTab === 'flow' ? '#DCFCE7' : '#FFFFFF',
              color: activeTab === 'flow' ? '#15803D' : '#475569',
              fontWeight: 600,
              fontSize: '11px',
              cursor: 'pointer'
            }}
          >
            Fluxo do MLM &amp; Projeção Vocab
          </button>
          <button
            onClick={() => setActiveTab('rule')}
            style={{
              padding: '4px 12px',
              borderRadius: '6px',
              border: activeTab === 'rule' ? '2px solid #16A34A' : '1px solid #CBD5E1',
              background: activeTab === 'rule' ? '#DCFCE7' : '#FFFFFF',
              color: activeTab === 'rule' ? '#15803D' : '#475569',
              fontWeight: 600,
              fontSize: '11px',
              cursor: 'pointer'
            }}
          >
            A Regra 80 / 10 / 10 da Google AI
          </button>
        </div>

        <div style={{ fontSize: '11px', color: '#166534', fontWeight: 600 }}>
          Perda aplicada estritamente sobre os 15% de tokens mascarados
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{
        flex: 1,
        minHeight: 0,
        background: '#FFFFFF',
        border: '1px solid #E2E8F0',
        borderRadius: '10px',
        padding: '14px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>
        {activeTab === 'flow' ? (
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '14px', height: '100%' }}>
            {/* Left Diagram: Vector Projection to Vocab */}
            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <svg viewBox="0 0 520 300" style={{ width: '100%', height: '100%' }}>
                <defs>
                  <marker id="arrow-green-mlm" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 1 L 8 5 L 0 9 z" fill="#16A34A" />
                  </marker>
                  <marker id="arrow-blue-mlm" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 1 L 8 5 L 0 9 z" fill="#0284C7" />
                  </marker>
                </defs>

                {/* Top: Softmax Distribution & Target Word */}
                <rect x="180" y="10" width="180" height="40" rx="6" fill="#F0FDF4" stroke="#16A34A" strokeWidth="2" />
                <text x="270" y="26" textAnchor="middle" fill="#15803D" fontSize="11" fontWeight="bold">
                  P(w | contexto) = Softmax(z)
                </text>
                <text x="270" y="42" textAnchor="middle" fill="#166534" fontSize="11" fontWeight="800">
                  Top 1: "fofo" (96.4%) ✓
                </text>

                {/* Arrow down to projection matrix */}
                <line x1="270" y1="85" x2="270" y2="55" stroke="#16A34A" strokeWidth="2" markerEnd="url(#arrow-green-mlm)" />

                {/* Vocabulary Projection Layer: 768 -> 30522 */}
                <rect x="100" y="85" width="340" height="42" rx="6" fill="#EFF6FF" stroke="#0284C7" strokeWidth="1.5" />
                <text x="270" y="104" textAnchor="middle" fill="#0369A1" fontSize="12" fontWeight="bold">
                  MLM Head: Matriz de Projeção W_vocab ∈ ℝ³⁰⁵²² ˣ ⁷⁶⁸
                </text>
                <text x="270" y="120" textAnchor="middle" fill="#475569" fontSize="10">
                  Tied Weights: W_vocab é compartilhado com a matriz de Word Embeddings de entrada!
                </text>

                {/* Arrow down to BERT Encoder */}
                <line x1="270" y1="160" x2="270" y2="132" stroke="#0284C7" strokeWidth="2" markerEnd="url(#arrow-blue-mlm)" />

                {/* Hidden Vector representation h_[MASK] */}
                <rect x="210" y="155" width="120" height="24" rx="4" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1.5" />
                <text x="270" y="171" textAnchor="middle" fill="#92400E" fontSize="11" fontWeight="bold">
                  h_[MASK] ∈ ℝ⁷⁶⁸
                </text>

                {/* BERT Encoder Backbone Box */}
                <rect x="50" y="190" width="440" height="50" rx="8" fill="#0A345D" stroke="#1BB5D8" strokeWidth="2" />
                <text x="270" y="220" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="bold">
                  BERT ENCODER (12 CAMADAS COM ATENÇÃO BIDIRECIONAL COMPLETA)
                </text>

                {/* Input Tokens */}
                <line x1="100" y1="275" x2="100" y2="245" stroke="#64748B" strokeWidth="1.5" />
                <line x1="180" y1="275" x2="180" y2="245" stroke="#64748B" strokeWidth="1.5" />
                <line x1="270" y1="275" x2="270" y2="245" stroke="#EF4444" strokeWidth="2.5" />
                <line x1="360" y1="275" x2="360" y2="245" stroke="#64748B" strokeWidth="1.5" />
                <line x1="440" y1="275" x2="440" y2="245" stroke="#64748B" strokeWidth="1.5" />

                <rect x="75" y="275" width="50" height="22" rx="4" fill="#F8FAFC" stroke="#CBD5E1" />
                <text x="100" y="290" textAnchor="middle" fill="#334155" fontSize="10">[CLS]</text>

                <rect x="155" y="275" width="50" height="22" rx="4" fill="#F8FAFC" stroke="#CBD5E1" />
                <text x="180" y="290" textAnchor="middle" fill="#334155" fontSize="10">Meu</text>

                {/* MASKED TOKEN HIGHLIGHT */}
                <rect x="235" y="273" width="70" height="25" rx="5" fill="#FEE2E2" stroke="#EF4444" strokeWidth="2" />
                <text x="270" y="290" textAnchor="middle" fill="#DC2626" fontSize="11" fontWeight="bold">[MASK]</text>

                <rect x="335" y="275" width="50" height="22" rx="4" fill="#F8FAFC" stroke="#CBD5E1" />
                <text x="360" y="290" textAnchor="middle" fill="#334155" fontSize="10">é</text>

                <rect x="415" y="275" width="50" height="22" rx="4" fill="#F8FAFC" stroke="#CBD5E1" />
                <text x="440" y="290" textAnchor="middle" fill="#334155" fontSize="10">lindo</text>
              </svg>
            </div>

            {/* Right Side: Math & Technical Insight */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--infnet-dark-blue)', marginBottom: '4px' }}>
                  Função de Perda Cross-Entropy do MLM:
                </div>
                <MathView
                  block
                  math="\mathcal{L}_{\text{MLM}} = - \sum_{i \in \mathcal{M}} \log P(x_i = w_i^* \mid \tilde{X})"
                />
                <div style={{ fontSize: '10px', color: '#64748B', marginTop: '6px', lineHeight: 1.4 }}>
                  Onde <MathView math="\mathcal{M}" /> é o conjunto das posições mascaradas e <MathView math="w_i^*" /> é a palavra real original do texto.
                </div>
              </div>

              <div style={{ background: '#EFF6FF', padding: '10px 12px', borderRadius: '8px', border: '1px solid #BFDBFE' }}>
                <strong style={{ fontSize: '11px', color: '#1E40AF', display: 'block', marginBottom: '2px' }}>
                  🎯 Por que o MLM Revolucionou o Pré-Treino?
                </strong>
                <p style={{ margin: 0, fontSize: '10.5px', color: '#334155', lineHeight: 1.4 }}>
                  Se usássemos atenção bidirecional comum para prever a próxima palavra, a rede simplesmente <em>copiaria</em> a palavra que já está visível à frente. Ao substituir a palavra por <code>[MASK]</code>, a rede é obrigada a deduzir a semântica a partir do contexto circundante!
                </p>
              </div>

              <div style={{ background: '#FEF3C7', padding: '8px 12px', borderRadius: '8px', border: '1px solid #FDE68A', fontSize: '10px', color: '#92400E' }}>
                ⚡ <strong>Tied Weights (Amarração de Pesos):</strong> A matriz da cabeça linear final <MathView math="W_{\text{vocab}}" /> usa os mesmos pesos transpostos da matriz de Word Embeddings da entrada, economizando 23.4 milhões de parâmetros!
              </div>
            </div>
          </div>
        ) : (
          /* Tab 2: The 80/10/10 Rule Breakdown */
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', height: '100%' }}>
            <div style={{ fontSize: '12px', color: '#475569', lineHeight: 1.4 }}>
              No corpus de pré-treinamento, selecionamos aleatoriamente <strong>15% de todos os tokens</strong>. Desses 15% selecionados, aplicamos a seguinte partição engenhosa:
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: '12px' }}>
              {/* 80% */}
              <div style={{
                background: '#FEF2F2',
                border: '2px solid #FCA5A5',
                borderRadius: '8px',
                padding: '12px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontSize: '20px', fontWeight: 800, color: '#DC2626' }}>80%</span>
                  <span style={{ fontSize: '10px', background: '#DC2626', color: '#FFF', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>[MASK]</span>
                </div>
                <strong style={{ fontSize: '12px', color: '#991B1B', display: 'block', marginBottom: '4px' }}>
                  Substituído por [MASK]
                </strong>
                <p style={{ margin: 0, fontSize: '10.5px', color: '#7F1D1D', lineHeight: 1.35 }}>
                  Força o modelo a reconstruir a representação do token a partir do contexto esquerdo e direito. Exemplo: <em>"meu cão é [MASK]"</em>.
                </p>
              </div>

              {/* 10% */}
              <div style={{
                background: '#FFFBEB',
                border: '2px solid #FCD34D',
                borderRadius: '8px',
                padding: '12px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontSize: '20px', fontWeight: 800, color: '#D97706' }}>10%</span>
                  <span style={{ fontSize: '10px', background: '#D97706', color: '#FFF', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>ALEATÓRIO</span>
                </div>
                <strong style={{ fontSize: '12px', color: '#92400E', display: 'block', marginBottom: '4px' }}>
                  Token Aleatório do Vocab
                </strong>
                <p style={{ margin: 0, fontSize: '10.5px', color: '#78350F', lineHeight: 1.35 }}>
                  Injeta ruído semântico. Força a rede a verificar se a palavra faz sentido no contexto. Exemplo: <em>"meu cão é [banana]"</em>.
                </p>
              </div>

              {/* 10% */}
              <div style={{
                background: '#F0FDF4',
                border: '2px solid #86EFAC',
                borderRadius: '8px',
                padding: '12px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontSize: '20px', fontWeight: 800, color: '#16A34A' }}>10%</span>
                  <span style={{ fontSize: '10px', background: '#16A34A', color: '#FFF', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>IDÊNTICO</span>
                </div>
                <strong style={{ fontSize: '12px', color: '#166534', display: 'block', marginBottom: '4px' }}>
                  Mantido Inalterado
                </strong>
                <p style={{ margin: 0, fontSize: '10.5px', color: '#14532D', lineHeight: 1.35 }}>
                  Garante que os embeddings finais retenham a identidade semântica do token real observado. Exemplo: <em>"meu cão é fofo"</em>.
                </p>
              </div>
            </div>

            <div style={{
              background: '#EFF6FF',
              padding: '10px 14px',
              borderRadius: '8px',
              border: '1px solid #BAE6FD',
              fontSize: '11px',
              color: '#0369A1',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <span style={{ fontSize: '18px' }}>💡</span>
              <div>
                <strong>A Sacada Pedagógica da Google:</strong> Se usassem 100% de <code>[MASK]</code>, o modelo sofreria de uma <em>discrepância pré-treino vs fine-tuning</em>, pois em tarefas reais de produção (como classificação de sentimento) o token <code>[MASK]</code> <strong>nunca existe</strong>! A regra 80/10/10 treina o modelo a construir representações úteis para qualquer palavra real.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
