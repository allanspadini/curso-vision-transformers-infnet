import React, { useState } from 'react';
import { Calculator, ArrowRight, CheckCircle, HelpCircle, Layers, Sparkles } from 'lucide-react';

export default function DotProductAttentionStepDiagram() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: 1,
      title: '1. Produto Escalar Matricial (Q × Kᵀ)',
      formula: 'S = Q · Kᵀ',
      shape: '(B, T, d_k) × (B, d_k, T) → (B, T, T)',
      desc: 'Calcula o produto escalar entre todas as Queries e todas as Keys. Cada elemento S[i, j] representa a afinidade/similaridade bruta não normalizada entre o token i e o token j.',
      color: '#0A345D'
    },
    {
      num: 2,
      title: '2. Fator de Escala (÷ √dₖ)',
      formula: 'S_scaled = (Q · Kᵀ) / √d_k',
      shape: '(B, T, T)',
      desc: 'Quando d_k é grande (ex: 64 ou 128), a variância do produto escalar cresce proporcionalmente a d_k. Dividir por √d_k mantém a variância unitária (~1.0), evitando que o Softmax entre em regiões saturadas de gradiente quase nulo.',
      color: '#0284C7'
    },
    {
      num: 3,
      title: '3. Normalização Softmax por Linha',
      formula: 'A = softmax((Q Kᵀ) / √d_k)',
      shape: '(B, T, T)  —  ∑ A[i, j] = 1.0',
      desc: 'Aplica Softmax em cada linha i da matriz. Converte os scores em uma distribuição de probabilidade legítima (valores entre 0.0 e 1.0 com soma exatamente 1.0 por linha).',
      color: '#7CB342'
    },
    {
      num: 4,
      title: '4. Agregação Ponderada de Valores (A × V)',
      formula: 'Output = A · V',
      shape: '(B, T, T) × (B, T, d_v) → (B, T, d_v)',
      desc: 'Multiplica a matriz de pesos de atenção A pela matriz de valores V. Cada token de saída z_i passa a ser uma média ponderada linear de todos os vetores de valor v_j do contexto!',
      color: '#15803D'
    }
  ];

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
          <Calculator size={18} color="var(--infnet-cyan)" />
          <span>Understanding Attention: A Matemática do Scaled Dot-Product</span>
        </div>
        <div style={{
          fontFamily: 'var(--font-code)',
          fontSize: '12px',
          fontWeight: 700,
          background: 'var(--infnet-dark-blue)',
          color: 'var(--infnet-cyan-light)',
          padding: '4px 12px',
          borderRadius: '6px'
        }}>
          Attention(Q, K, V) = softmax(Q Kᵀ / √dₖ) V
        </div>
      </div>

      {/* Step Buttons */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
        {steps.map((s, idx) => (
          <button
            key={idx}
            onClick={() => setActiveStep(idx)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              padding: '8px 10px',
              borderRadius: '6px',
              border: activeStep === idx ? '2px solid var(--infnet-cyan)' : '1px solid var(--border-light)',
              background: activeStep === idx ? 'var(--infnet-dark-blue)' : '#FFFFFF',
              color: activeStep === idx ? '#FFFFFF' : 'var(--text-main)',
              fontSize: '11.5px',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: activeStep === idx ? 'var(--shadow-sm)' : 'none',
              transition: 'all 0.15s ease'
            }}
          >
            <span>Passo {s.num}</span>
          </button>
        ))}
      </div>

      {/* Active Step Visualizer Details */}
      <div style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '1.2fr 1fr',
        gap: '14px',
        minHeight: 0
      }}>
        {/* Left: Mathematical Card */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1.5px solid var(--border-light)',
          borderRadius: '10px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--infnet-cyan-dark)', textTransform: 'uppercase', marginBottom: '6px' }}>
              Fase Ativa de Execução
            </div>
            <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '18px', color: 'var(--infnet-dark-blue)', marginBottom: '12px' }}>
              {steps[activeStep].title}
            </h3>

            <div style={{
              background: '#FFFFFF',
              border: '1px solid #CBD5E1',
              borderRadius: '8px',
              padding: '14px',
              textAlign: 'center',
              marginBottom: '14px'
            }}>
              <div style={{ fontFamily: 'var(--font-code)', fontSize: '18px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
                {steps[activeStep].formula}
              </div>
              <div style={{ fontSize: '11.5px', fontFamily: 'var(--font-code)', color: '#64748B', marginTop: '6px' }}>
                Dimensões dos Tensores: <strong>{steps[activeStep].shape}</strong>
              </div>
            </div>

            <p style={{ fontSize: '12.5px', color: 'var(--text-main)', lineHeight: '1.6' }}>
              {steps[activeStep].desc}
            </p>
          </div>

          <div style={{
            background: '#F0FDF4',
            border: '1px solid #BBF7D0',
            padding: '8px 12px',
            borderRadius: '6px',
            fontSize: '11.5px',
            color: '#166534',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <CheckCircle size={16} flexShrink={0} />
            <span>Implementação nativa com <code>torch.bmm</code> (Batch Matrix Multiplication) ou <code>torch.matmul</code>.</span>
          </div>
        </div>

        {/* Right: Shape Flowchart Table */}
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
            Rastreamento de Formatos de Tensores em PyTorch
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11.5px', background: '#FFFFFF', borderRadius: '6px', overflow: 'hidden' }}>
            <thead>
              <tr style={{ background: '#EDF5FA', borderBottom: '1px solid #D0E3F0', textAlign: 'left' }}>
                <th style={{ padding: '6px 8px', color: 'var(--infnet-dark-blue)' }}>Símbolo</th>
                <th style={{ padding: '6px 8px', color: 'var(--infnet-dark-blue)' }}>Significado</th>
                <th style={{ padding: '6px 8px', color: 'var(--infnet-dark-blue)' }}>Shape</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '6px 8px', fontFamily: 'var(--font-code)', fontWeight: 700 }}>Q</td>
                <td style={{ padding: '6px 8px' }}>Queries projetadas</td>
                <td style={{ padding: '6px 8px', fontFamily: 'var(--font-code)', color: '#0284C7' }}>[B, T, d_k]</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '6px 8px', fontFamily: 'var(--font-code)', fontWeight: 700 }}>K^T</td>
                <td style={{ padding: '6px 8px' }}>Keys transpostas</td>
                <td style={{ padding: '6px 8px', fontFamily: 'var(--font-code)', color: '#0284C7' }}>[B, d_k, T]</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '6px 8px', fontFamily: 'var(--font-code)', fontWeight: 700 }}>Q K^T</td>
                <td style={{ padding: '6px 8px' }}>Scores de afinidade</td>
                <td style={{ padding: '6px 8px', fontFamily: 'var(--font-code)', color: '#D84315', fontWeight: 700 }}>[B, T, T]</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '6px 8px', fontFamily: 'var(--font-code)', fontWeight: 700 }}>A (Softmax)</td>
                <td style={{ padding: '6px 8px' }}>Pesos de atenção</td>
                <td style={{ padding: '6px 8px', fontFamily: 'var(--font-code)', color: '#15803D', fontWeight: 700 }}>[B, T, T]</td>
              </tr>
              <tr>
                <td style={{ padding: '6px 8px', fontFamily: 'var(--font-code)', fontWeight: 700 }}>A × V</td>
                <td style={{ padding: '6px 8px' }}>Saída contextualizada</td>
                <td style={{ padding: '6px 8px', fontFamily: 'var(--font-code)', color: 'var(--infnet-dark-blue)', fontWeight: 700 }}>[B, T, d_v]</td>
              </tr>
            </tbody>
          </table>

          <div style={{
            fontSize: '11px',
            color: 'var(--text-muted)',
            background: '#F8FAFC',
            padding: '8px',
            borderRadius: '6px'
          }}>
            ⚠️ <strong>O Gargalo Quadrático:</strong> A matriz intermédia $Q K^T$ tem dimensão $T × T$. Se $T=10.000$, essa matriz tem $100.000.000$ elementos por cabeça e batch!
          </div>
        </div>
      </div>
    </div>
  );
}
