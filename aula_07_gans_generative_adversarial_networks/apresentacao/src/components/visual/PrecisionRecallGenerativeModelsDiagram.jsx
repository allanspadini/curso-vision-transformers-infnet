import React from 'react';
import MathView from '../MathView';

export default function PrecisionRecallGenerativeModelsDiagram() {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {/* Badges de Identificação */}
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
            Kynkäänniemi et al. (NeurIPS 2019)
          </span>
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--infnet-dark-blue)' }}>
            Precision and Recall para Modelos Generativos: O Diagnóstico Definitivo de Mode Collapse
          </span>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <span className="badge badge-cyan" style={{ fontSize: '11px' }}>Precision = Fidelidade</span>
          <span className="badge badge-purple" style={{ fontSize: '11px' }}>Recall = Cobertura</span>
          <span className="badge badge-orange" style={{ fontSize: '11px' }}>k-NN Manifold Estimation</span>
        </div>
      </div>

      {/* Grid Principal: Diagrama de Variedades k-NN e Matriz Diagnóstica */}
      <div style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '1.2fr 1fr',
        gap: '14px',
        minHeight: 0
      }}>
        {/* Painel Esquerdo: Ilustração Geométrica das Bolas de k-NN */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid var(--border-light)',
          borderRadius: '12px',
          padding: '14px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#0A345D' }}>
              ESTIMATIVA DE VARIEDADES VIA k-NN HYPERSPHERES
            </span>
            <span className="badge badge-green" style={{ fontSize: '9px' }}>k = 3 Vizinhança</span>
          </div>

          {/* SVG com Bolas k-NN de Dados Reais e Sintéticos */}
          <svg viewBox="0 0 500 230" style={{ width: '100%', height: '100%', maxHeight: '230px' }}>
            {/* 1. Manifold Real (Verde): 4 bolhas englobando dados reais */}
            <g transform="translate(40, 20)">
              {/* Bolas de k-NN Reais */}
              <circle cx="80" cy="70" r="45" fill="rgba(16, 185, 129, 0.15)" stroke="#10B981" strokeWidth="1.5" strokeDasharray="3 2" />
              <circle cx="150" cy="60" r="50" fill="rgba(16, 185, 129, 0.15)" stroke="#10B981" strokeWidth="1.5" strokeDasharray="3 2" />
              <circle cx="210" cy="90" r="40" fill="rgba(16, 185, 129, 0.15)" stroke="#10B981" strokeWidth="1.5" strokeDasharray="3 2" />
              <circle cx="250" cy="140" r="45" fill="rgba(16, 185, 129, 0.15)" stroke="#10B981" strokeWidth="1.5" strokeDasharray="3 2" />

              {/* Pontos de Amostras Reais */}
              <circle cx="80" cy="70" r="4" fill="#059669" />
              <circle cx="150" cy="60" r="4" fill="#059669" />
              <circle cx="210" cy="90" r="4" fill="#059669" />
              <circle cx="250" cy="140" r="4" fill="#059669" />
              <text x="140" y="25" fill="#047857" fontSize="10" fontWeight="800" textAnchor="middle">
                Manifold Real estimado B(x_r, r_k)
              </text>
            </g>

            {/* 2. Manifold Gerado (Roxo) ilustrando Mode Collapse Parcial */}
            <g transform="translate(140, 50)">
              {/* Cobre apenas um dos modos reais */}
              <circle cx="50" cy="70" r="38" fill="rgba(168, 85, 247, 0.25)" stroke="#A855F7" strokeWidth="2" />
              <circle cx="65" cy="60" r="4" fill="#7E22CE" />
              <circle cx="45" cy="80" r="4" fill="#7E22CE" />
              <circle cx="55" cy="72" r="4" fill="#7E22CE" />
              <text x="50" y="125" fill="#7E22CE" fontSize="9" fontWeight="800" textAnchor="middle">
                Manifold Gerado G(z)
              </text>
            </g>

            {/* Amostras Reais Descobertas (Fora do Manifold Gerado = FALTA DE RECALL) */}
            <g transform="translate(300, 150)">
              <rect x="0" y="0" width="160" height="45" rx="6" fill="#FEF2F2" stroke="#FCA5A5" />
              <text x="80" y="16" fill="#B91C1C" fontSize="8.5" fontWeight="800" textAnchor="middle">
                ⚠️ DADOS REAIS NÃO COBERTOS
              </text>
              <text x="80" y="32" fill="#7F1D1D" fontSize="7.5" textAnchor="middle">
                Amostras reais isoladas ⟹ Recall despenca!
              </text>
            </g>
          </svg>

          {/* Fórmulas Exatas */}
          <div style={{
            width: '100%',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '8px',
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: '6px',
            padding: '8px',
            fontSize: '9px'
          }}>
            <div>
              <strong style={{ color: '#0284C7' }}>Fórmula da Precision (Fidelidade):</strong>
              <div style={{ marginTop: '2px', textAlign: 'center' }}>
                <MathView math="\text{Prec} = \frac{1}{|Y|} \sum_{y \in Y} \mathbb{I}(y \in \text{Manifold}(X))" />
              </div>
            </div>
            <div>
              <strong style={{ color: '#7E22CE' }}>Fórmula do Recall (Cobertura):</strong>
              <div style={{ marginTop: '2px', textAlign: 'center' }}>
                <MathView math="\text{Rec} = \frac{1}{|X|} \sum_{x \in X} \mathbb{I}(x \in \text{Manifold}(Y))" />
              </div>
            </div>
          </div>
        </div>

        {/* Painel Direito: A Matriz Diagnóstica de 4 Quadrantes */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid var(--border-light)',
          borderRadius: '12px',
          padding: '14px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#0A345D', marginBottom: '8px' }}>
              MATRIZ DIAGNÓSTICA DE FIDELIDADE vs DIVERSIDADE
            </div>

            {/* Grid 2x2 dos 4 Cenários */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {/* Q1: Alta Prec + Alto Rec */}
              <div style={{ background: '#F0FDF4', border: '1px solid #86EFAC', borderRadius: '6px', padding: '8px' }}>
                <div style={{ fontSize: '9px', fontWeight: 800, color: '#15803D' }}>ALTA PREC / ALTO REC</div>
                <div style={{ fontSize: '8px', color: '#166534', marginTop: '2px' }}>
                  ★ <strong>Modelo Generativo Ideal</strong>: Amostras perfeitas e todas as classes representadas uniformemente.
                </div>
              </div>

              {/* Q2: Baixa Prec + Alto Rec */}
              <div style={{ background: '#FFFBEB', border: '1px solid #FCD34D', borderRadius: '6px', padding: '8px' }}>
                <div style={{ fontSize: '9px', fontWeight: 800, color: '#B45309' }}>BAIXA PREC / ALTO REC</div>
                <div style={{ fontSize: '8px', color: '#78350F', marginTop: '2px' }}>
                  ⚠️ <strong>Amostras Ruidosas/Borradas</strong>: Cobre todas as classes, mas com artefatos visuais severos.
                </div>
              </div>

              {/* Q3: ALTA PREC + BAIXO REC (O ASSINANTE DO MODE COLLAPSE) */}
              <div style={{ background: '#FEF2F2', border: '2px solid #EF4444', borderRadius: '6px', padding: '8px', gridColumn: 'span 2' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '9.5px', fontWeight: 800, color: '#DC2626' }}>
                    🚨 ALTA PRECISION + BAIXO RECALL (DIAGNÓSTICO CRÍTICO)
                  </span>
                  <span className="badge badge-orange" style={{ fontSize: '8px' }}>Mode Collapse</span>
                </div>
                <div style={{ fontSize: '8.5px', color: '#991B1B', marginTop: '4px', lineHeight: '1.3' }}>
                  <strong>Assinatura Inconfundível de Colapso de Modos:</strong> O gerador produz imagens com realismo cirúrgico (Precision &gt; 90%), porém concentradas em pouquíssimos modos ou cópias idênticas. Mais da metade dos dados reais é completamente ignorada (Recall &lt; 30%)!
                </div>
              </div>

              {/* Q4: Baixa Prec + Baixo Rec */}
              <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '8px', gridColumn: 'span 2' }}>
                <div style={{ fontSize: '9px', fontWeight: 800, color: '#64748B' }}>BAIXA PREC / BAIXO REC ➔ Falha Total de Treino</div>
                <div style={{ fontSize: '8px', color: '#475569', marginTop: '2px' }}>
                  O modelo não aprendeu nem a gerar pixels plausíveis nem a cobrir os modos (ruído puro).
                </div>
              </div>
            </div>
          </div>

          <div style={{ background: '#F0F9FF', border: '1px solid #BAE6FD', borderRadius: '6px', padding: '8px', fontSize: '8.5px', color: '#0369A1' }}>
            <strong>💡 Protocolo Prático:</strong> Ao avaliar GANs em produção, nunca confie exclusivamente no FID. Plote a curva <strong>Precision vs Recall</strong> ao longo das épocas. Se a Precision subir enquanto o Recall começar a cair, aborte o treino e injete regularização contra Mode Collapse!
          </div>
        </div>
      </div>

      {/* Footer com destaques */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '12px'
      }}>
        <div className="card-infnet" style={{ padding: '8px 14px', background: '#F8FAFC' }}>
          <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 600 }}>DESACOPLAMENTO MATEMÁTICO</div>
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>Fidelidade vs Diversidade</div>
          <div style={{ fontSize: '10.5px', color: '#475569', marginTop: '2px' }}>Substitui o escalar único do FID por um vetor bidimensional interpretável</div>
        </div>
        <div className="card-infnet" style={{ padding: '8px 14px', background: '#F8FAFC' }}>
          <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 600 }}>ROBUSTEZ GEOMÉTRICA</div>
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--infnet-purple)' }}>Livre de Hipóteses Gaussianas</div>
          <div style={{ fontSize: '10.5px', color: '#475569', marginTop: '2px' }}>O estimador k-NN adapta-se perfeitamente a variedades não-lineares arbitrárias</div>
        </div>
        <div className="card-infnet" style={{ padding: '8px 14px', background: '#F8FAFC' }}>
          <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 600 }}>BIBLIOTECAS MODERNAS</div>
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--infnet-green-accent)' }}>Implementação Pronta</div>
          <div style={{ fontSize: '10.5px', color: '#475569', marginTop: '2px' }}>torch-fidelity & clean-fid calculam Precision e Recall nativamente</div>
        </div>
      </div>
    </div>
  );
}
