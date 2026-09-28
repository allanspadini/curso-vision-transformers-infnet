import React from 'react';
import MathView from '../MathView';

export default function FeatureExtractionVsFineTuningDiagram() {
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
            REVISÃO TEÓRICA III
          </span>
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--infnet-dark-blue)' }}>
            Transfer Learning em CNNs: Feature Extraction vs Fine-Tuning de Grafo Completo
          </span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <span className="badge badge-purple" style={{ fontSize: '11px' }}>requires_grad = False</span>
          <span className="badge badge-cyan" style={{ fontSize: '11px' }}>AdaptiveAvgPool2d</span>
          <span className="badge badge-green" style={{ fontSize: '11px' }}>Taxas Diferenciais</span>
        </div>
      </div>

      {/* Main 2-Column Comparison Grid */}
      <div style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '14px',
        minHeight: 0
      }}>
        {/* Column 1: Feature Extraction */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid var(--border-light)',
          borderRadius: '12px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <strong style={{ fontSize: '13px', color: '#0A345D' }}>1. Feature Extraction (Backbone Congelado)</strong>
              <span className="badge badge-cyan" style={{ fontSize: '9.5px' }}>Ideal para Pequenos Datasets</span>
            </div>

            <p style={{ fontSize: '11px', color: '#475569', lineHeight: '1.4', marginBottom: '10px' }}>
              Todas as camadas convolucionais pré-treinadas têm seus gradientes desativados. Treina-se estritamente a nova camada linear de saída:
            </p>

            {/* Architecture Flow */}
            <div style={{
              background: '#F8FAFC',
              border: '1px solid #CBD5E1',
              borderRadius: '8px',
              padding: '10px 12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              marginBottom: '10px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#F1F5F9', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '6px 10px' }}>
                <span style={{ fontSize: '10.5px', color: '#334155' }}>Backbone Convolucional (ResNet-50)</span>
                <span style={{ background: '#CBD5E1', color: '#1E293B', fontSize: '9px', fontWeight: 700, padding: '2px 6px', borderRadius: '4px' }}>
                  🔒 Congelado (∇θ = 0)
                </span>
              </div>
              <div style={{ textAlign: 'center', color: '#64748B', fontSize: '11px' }}>⬇️ Global Average Pooling [B, 2048, 1, 1] ➔ [B, 2048]</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#ECFDF5', border: '1px solid #86EFAC', borderRadius: '6px', padding: '6px 10px' }}>
                <span style={{ fontSize: '10.5px', color: '#166534', fontWeight: 700 }}>Novo Head: nn.Linear(2048, C)</span>
                <span style={{ background: '#DCFCE7', color: '#166534', fontSize: '9px', fontWeight: 700, padding: '2px 6px', borderRadius: '4px' }}>
                  ⚡ Treinável (Gradientes Ativos)
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ fontSize: '10.5px', color: '#334155' }}>
                ✅ <strong>Zero Esquecimento Catastrófico:</strong> Os filtros de alta qualidade do ImageNet permanecem intactos.
              </div>
              <div style={{ fontSize: '10.5px', color: '#334155' }}>
                ⚡ <strong>Velocidade & Eficiência de VRAM:</strong> Pode-se pré-extrair as features para a RAM/GPU e treinar apenas o classificador em segundos.
              </div>
              <div style={{ fontSize: '10.5px', color: '#334155' }}>
                🛡️ <strong>Prevenção de Overfitting:</strong> Reduz dramaticamente a contagem de parâmetros treináveis (apenas <MathView math="2048 \times C" /> pesos).
              </div>
            </div>
          </div>

          <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '8px', padding: '6px 10px', fontSize: '10px', color: '#1E40AF', fontFamily: 'var(--font-code)' }}>
            for param in model.parameters(): param.requires_grad = False<br />
            model.fc = nn.Linear(model.fc.in_features, num_classes)
          </div>
        </div>

        {/* Column 2: Fine-Tuning */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid var(--border-light)',
          borderRadius: '12px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <strong style={{ fontSize: '13px', color: '#0A345D' }}>2. Fine-Tuning (Ajuste Fino Parcial ou Total)</strong>
              <span className="badge badge-purple" style={{ fontSize: '9.5px' }}>Adaptação a Novos Domínios</span>
            </div>

            <p style={{ fontSize: '11px', color: '#475569', lineHeight: '1.4', marginBottom: '10px' }}>
              Descongelam-se blocos convolucionais profundos (ex: Layer4 da ResNet) para reajustar filtros semânticos com taxas de aprendizado baixas:
            </p>

            {/* Architecture Flow */}
            <div style={{
              background: '#F8FAFC',
              border: '1px solid #CBD5E1',
              borderRadius: '8px',
              padding: '10px 12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              marginBottom: '10px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#F1F5F9', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '6px 10px' }}>
                <span style={{ fontSize: '10.5px', color: '#334155' }}>Camadas Iniciais (Bordas e Cores Gerais)</span>
                <span style={{ background: '#CBD5E1', color: '#1E293B', fontSize: '9px', fontWeight: 700, padding: '2px 6px', borderRadius: '4px' }}>
                  🔒 Congeladas
                </span>
              </div>
              <div style={{ textAlign: 'center', color: '#64748B', fontSize: '11px' }}>⬇️ Feedforward</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#FAF5FF', border: '1px solid #E9D5FF', borderRadius: '6px', padding: '6px 10px' }}>
                <span style={{ fontSize: '10.5px', color: '#6B21A8', fontWeight: 700 }}>Blocos Profundos + Novo Head Linear</span>
                <span style={{ background: '#F3E8FF', color: '#6B21A8', fontSize: '9px', fontWeight: 700, padding: '2px 6px', borderRadius: '4px' }}>
                  🔓 Taxas Diferenciais
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ fontSize: '10.5px', color: '#334155' }}>
                🎯 <strong>Especialização de Domínio:</strong> Re-orienta a representação interna se os dados divergirem do ImageNet (ex: satélite ou microscopia).
              </div>
              <div style={{ fontSize: '10.5px', color: '#334155' }}>
                ⚠️ <strong>Risco de Destruição de Pesos:</strong> Se <MathView math="\eta" /> for muito alto, gradientes ruidosos destroem a inicialização útil.
              </div>
              <div style={{ fontSize: '10.5px', color: '#334155' }}>
                ⚙️ <strong>Regra de Ouro:</strong> <MathView math="\eta_{\text{backbone}} \approx 10^{-5} \ll \eta_{\text{head}} \approx 10^{-3}" />.
              </div>
            </div>
          </div>

          <div style={{ background: '#FAF5FF', border: '1px solid #E9D5FF', borderRadius: '8px', padding: '6px 10px', fontSize: '10px', color: '#6B21A8', fontFamily: 'var(--font-code)' }}>
            optimizer = AdamW([<br />
            &nbsp;&nbsp;{'{'} 'params': model.layer4.parameters(), 'lr': 1e-5 {'}'},<br />
            &nbsp;&nbsp;{'{'} 'params': model.fc.parameters(), 'lr': 1e-3 {'}'}<br />
            ])
          </div>
        </div>
      </div>
    </div>
  );
}
