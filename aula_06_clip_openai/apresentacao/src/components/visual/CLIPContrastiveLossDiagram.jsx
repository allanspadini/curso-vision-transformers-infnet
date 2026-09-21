import React from 'react';
import MathView from '../MathView';

export default function CLIPContrastiveLossDiagram() {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '20px', flex: 1 }}>
        
        {/* Lado Esquerdo: Matriz de Similaridade B x B */}
        <div style={{
          background: '#FFFFFF',
          border: '1.5px solid var(--border-light)',
          borderRadius: '12px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--infnet-dark-blue)' }}>
              Matriz de Logits Multimodal: S_{'{'}i,j{'}'} = \frac{'{\\hat{I}_i \\cdot \\hat{T}_j}'}{'{\\tau}'}
            </span>
            <span style={{
              background: '#DCFCE7',
              color: '#15803D',
              fontSize: '10px',
              fontWeight: 800,
              padding: '2px 8px',
              borderRadius: '12px'
            }}>
              Diagonal Positiva
            </span>
          </div>

          {/* SVG Interativo da Matriz */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg viewBox="0 0 460 280" style={{ width: '100%', height: '270px' }}>
              {/* Rótulos Colunas de Texto */}
              <text x="50" y="20" fontSize="10" fontWeight="700" fill="#9333EA">Textos →</text>
              <text x="130" y="32" textAnchor="middle" fontSize="10" fontFamily="Fira Code" fill="#9333EA">T̂₁ (cão)</text>
              <text x="210" y="32" textAnchor="middle" fontSize="10" fontFamily="Fira Code" fill="#9333EA">T̂₂ (carro)</text>
              <text x="290" y="32" textAnchor="middle" fontSize="10" fontFamily="Fira Code" fill="#9333EA">T̂₃ (avião)</text>
              <text x="370" y="32" textAnchor="middle" fontSize="10" fontFamily="Fira Code" fill="#9333EA">T̂₄ (gato)</text>

              {/* Rótulos Linhas de Imagens */}
              <text x="15" y="55" fontSize="10" fontWeight="700" fill="#0284C7">Imagens ↓</text>
              <text x="75" y="80" textAnchor="end" fontSize="10" fontFamily="Fira Code" fill="#0284C7">Î₁ (cão)</text>
              <text x="75" y="135" textAnchor="end" fontSize="10" fontFamily="Fira Code" fill="#0284C7">Î₂ (carro)</text>
              <text x="75" y="190" textAnchor="end" fontSize="10" fontFamily="Fira Code" fill="#0284C7">Î₃ (avião)</text>
              <text x="75" y="245" textAnchor="end" fontSize="10" fontFamily="Fira Code" fill="#0284C7">Î₄ (gato)</text>

              {/* Grid de Células */}
              {/* Linha 1 */}
              <rect x="95" y="48" width="70" height="50" rx="6" fill="#22C55E" stroke="#16A34A" strokeWidth="2" />
              <text x="130" y="72" textAnchor="middle" fontSize="11" fontWeight="800" fill="#FFFFFF">+24.5</text>
              <text x="130" y="88" textAnchor="middle" fontSize="9" fill="#DCFCE7">Par Correto</text>

              <rect x="175" y="48" width="70" height="50" rx="6" fill="#FEE2E2" stroke="#FCA5A5" strokeWidth="1" />
              <text x="210" y="78" textAnchor="middle" fontSize="10" fill="#991B1B">-1.2</text>

              <rect x="255" y="48" width="70" height="50" rx="6" fill="#FEE2E2" stroke="#FCA5A5" strokeWidth="1" />
              <text x="290" y="78" textAnchor="middle" fontSize="10" fill="#991B1B">-3.4</text>

              <rect x="335" y="48" width="70" height="50" rx="6" fill="#FEE2E2" stroke="#FCA5A5" strokeWidth="1" />
              <text x="370" y="78" textAnchor="middle" fontSize="10" fill="#991B1B">+4.1</text>

              {/* Linha 2 */}
              <rect x="95" y="103" width="70" height="50" rx="6" fill="#FEE2E2" stroke="#FCA5A5" strokeWidth="1" />
              <text x="130" y="133" textAnchor="middle" fontSize="10" fill="#991B1B">-2.8</text>

              <rect x="175" y="103" width="70" height="50" rx="6" fill="#22C55E" stroke="#16A34A" strokeWidth="2" />
              <text x="210" y="127" textAnchor="middle" fontSize="11" fontWeight="800" fill="#FFFFFF">+28.2</text>
              <text x="210" y="143" textAnchor="middle" fontSize="9" fill="#DCFCE7">Par Correto</text>

              <rect x="255" y="103" width="70" height="50" rx="6" fill="#FEE2E2" stroke="#FCA5A5" strokeWidth="1" />
              <text x="290" y="133" textAnchor="middle" fontSize="10" fill="#991B1B">+3.2</text>

              <rect x="335" y="103" width="70" height="50" rx="6" fill="#FEE2E2" stroke="#FCA5A5" strokeWidth="1" />
              <text x="370" y="133" textAnchor="middle" fontSize="10" fill="#991B1B">-5.1</text>

              {/* Linha 3 */}
              <rect x="95" y="158" width="70" height="50" rx="6" fill="#FEE2E2" stroke="#FCA5A5" strokeWidth="1" />
              <text x="130" y="188" textAnchor="middle" fontSize="10" fill="#991B1B">-4.5</text>

              <rect x="175" y="158" width="70" height="50" rx="6" fill="#FEE2E2" stroke="#FCA5A5" strokeWidth="1" />
              <text x="210" y="188" textAnchor="middle" fontSize="10" fill="#991B1B">+2.1</text>

              <rect x="255" y="158" width="70" height="50" rx="6" fill="#22C55E" stroke="#16A34A" strokeWidth="2" />
              <text x="290" y="182" textAnchor="middle" fontSize="11" fontWeight="800" fill="#FFFFFF">+26.9</text>
              <text x="290" y="198" textAnchor="middle" fontSize="9" fill="#DCFCE7">Par Correto</text>

              <rect x="335" y="158" width="70" height="50" rx="6" fill="#FEE2E2" stroke="#FCA5A5" strokeWidth="1" />
              <text x="370" y="188" textAnchor="middle" fontSize="10" fill="#991B1B">-3.8</text>

              {/* Linha 4 */}
              <rect x="95" y="213" width="70" height="50" rx="6" fill="#FEE2E2" stroke="#FCA5A5" strokeWidth="1" />
              <text x="130" y="243" textAnchor="middle" fontSize="10" fill="#991B1B">+3.9</text>

              <rect x="175" y="213" width="70" height="50" rx="6" fill="#FEE2E2" stroke="#FCA5A5" strokeWidth="1" />
              <text x="210" y="243" textAnchor="middle" fontSize="10" fill="#991B1B">-4.2</text>

              <rect x="255" y="213" width="70" height="50" rx="6" fill="#FEE2E2" stroke="#FCA5A5" strokeWidth="1" />
              <text x="290" y="243" textAnchor="middle" fontSize="10" fill="#991B1B">-2.1</text>

              <rect x="335" y="213" width="70" height="50" rx="6" fill="#22C55E" stroke="#16A34A" strokeWidth="2" />
              <text x="370" y="237" textAnchor="middle" fontSize="11" fontWeight="800" fill="#FFFFFF">+25.4</text>
              <text x="370" y="253" textAnchor="middle" fontSize="9" fill="#DCFCE7">Par Correto</text>
            </svg>
          </div>
        </div>

        {/* Lado Direito: Formulação Algébrica e Perda Simétrica */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          
          {/* Card 1: Perda Text-to-Image */}
          <div style={{
            background: '#F0F9FF',
            border: '1.5px solid #BAE6FD',
            borderRadius: '10px',
            padding: '12px 16px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#0369A1' }}>
                1. Perda Imagem ➔ Texto (Por Linhas)
              </span>
              <span style={{ fontSize: '10px', color: '#0284C7', fontFamily: 'Fira Code' }}>Softmax ao longo das colunas</span>
            </div>
            <div style={{ padding: '4px 0', fontSize: '13px' }}>
              <MathView math="\mathcal{L}_{\text{img}} = -\frac{1}{B} \sum_{i=1}^{B} \log \frac{\exp(S_{i,i})}{\sum_{j=1}^{B} \exp(S_{i,j})}" block />
            </div>
          </div>

          {/* Card 2: Perda Image-to-Text */}
          <div style={{
            background: '#FAF5FF',
            border: '1.5px solid #E9D5FF',
            borderRadius: '10px',
            padding: '12px 16px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#7E22CE' }}>
                2. Perda Texto ➔ Imagem (Por Colunas)
              </span>
              <span style={{ fontSize: '10px', color: '#9333EA', fontFamily: 'Fira Code' }}>Softmax ao longo das linhas</span>
            </div>
            <div style={{ padding: '4px 0', fontSize: '13px' }}>
              <MathView math="\mathcal{L}_{\text{txt}} = -\frac{1}{B} \sum_{j=1}^{B} \log \frac{\exp(S_{j,j})}{\sum_{i=1}^{B} \exp(S_{i,j})}" block />
            </div>
          </div>

          {/* Card 3: Perda Total Simétrica */}
          <div style={{
            background: '#ECFDF5',
            border: '1.5px solid #A7F3D0',
            borderRadius: '10px',
            padding: '12px 16px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#065F46' }}>
                3. Perda CLIP Simétrica Total
              </span>
              <span style={{ fontSize: '10px', color: '#047857', fontFamily: 'Fira Code' }}>Média Aritmética</span>
            </div>
            <div style={{ padding: '4px 0', fontSize: '14px' }}>
              <MathView math="\mathcal{L}_{\text{CLIP}} = \frac{1}{2} \left( \mathcal{L}_{\text{img}} + \mathcal{L}_{\text{txt}} \right)" block />
            </div>
          </div>

          {/* Card 4: Temperatura Aprendível */}
          <div style={{
            background: '#FFFBEB',
            border: '1px solid #FDE68A',
            borderRadius: '10px',
            padding: '10px 14px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px'
          }}>
            <span style={{ fontSize: '10.5px', fontWeight: 800, color: '#92400E' }}>
              🔥 Temperatura Aprendível: \tau = \exp(\log \tau)
            </span>
            <span style={{ fontSize: '10px', color: '#B45309', lineHeight: '1.4' }}>
              Evita hiperparâmetro manual; o próprio gradiente ajusta a escala dinâmica dos logits para afinar a nitidez das probabilidades Softmax. No PyTorch: <code>logit_scale = nn.Parameter(torch.ones([]) * np.log(1 / 0.07))</code>.
            </span>
          </div>

        </div>

      </div>
    </div>
  );
}
