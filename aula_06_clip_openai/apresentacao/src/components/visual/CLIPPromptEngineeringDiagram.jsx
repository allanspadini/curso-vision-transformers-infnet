import React from 'react';

export default function CLIPPromptEngineeringDiagram() {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {/* Grid 3 Níveis de Prompting */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', flex: 1 }}>
        
        {/* Nível 1: Palavra Única */}
        <div style={{
          background: '#FFF5F5',
          border: '1.5px solid #FED7D7',
          borderRadius: '12px',
          padding: '18px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ background: '#FED7D7', color: '#9B2C2C', padding: '3px 8px', borderRadius: '4px', fontSize: '10.5px', fontWeight: 800 }}>
                Nível 1 (Baseline Fraco)
              </span>
              <span style={{ fontSize: '12px', fontFamily: 'Fira Code', fontWeight: 700, color: '#C53030' }}>
                Baseline
              </span>
            </div>

            <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#991B1B', marginBottom: '6px' }}>
              Palavra Isolada (Single Label)
            </h3>
            <p style={{ fontSize: '11.5px', color: '#7F1D1D', lineHeight: '1.45', marginBottom: '12px' }}>
              Passar apenas o rótulo puro como texto para o Text Encoder.
            </p>

            <div style={{ background: '#FFFFFF', border: '1px solid #FECACA', borderRadius: '6px', padding: '10px', fontFamily: 'Fira Code', fontSize: '11px', color: '#991B1B' }}>
              prompt = "crane"
            </div>

            <div style={{ marginTop: '12px', background: '#FEE2E2', padding: '10px', borderRadius: '6px' }}>
              <span style={{ fontSize: '10px', fontWeight: 800, color: '#991B1B', display: 'block', marginBottom: '4px' }}>
                ⚠️ Risco Crítico: Polissemia
              </span>
              <span style={{ fontSize: '10.5px', color: '#7F1D1D' }}>
                "crane" pode significar a ave pernalta (pássaro) ou o guindaste de construção civil! O embedding textual fica ambíguo no espaço latente.
              </span>
            </div>
          </div>

          <div style={{ borderTop: '1px solid #FED7D7', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', color: '#991B1B' }}>ImageNet Top-1:</span>
            <span style={{ fontSize: '13px', fontFamily: 'Fira Code', fontWeight: 800, color: '#991B1B' }}>67.5%</span>
          </div>
        </div>

        {/* Nível 2: Prompt Template Contextual */}
        <div style={{
          background: '#F0F9FF',
          border: '1.5px solid #BAE6FD',
          borderRadius: '12px',
          padding: '18px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ background: '#E0F2FE', color: '#0369A1', padding: '3px 8px', borderRadius: '4px', fontSize: '10.5px', fontWeight: 800 }}>
                Nível 2 (Prompt Engineering)
              </span>
              <span style={{ fontSize: '12px', fontFamily: 'Fira Code', fontWeight: 700, color: '#0284C7' }}>
                +1.3%
              </span>
            </div>

            <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0369A1', marginBottom: '6px' }}>
              Template com Contexto Visual
            </h3>
            <p style={{ fontSize: '11.5px', color: '#075985', lineHeight: '1.45', marginBottom: '12px' }}>
              Enquadrar a classe em uma estrutura de legenda fotográfica típica da web.
            </p>

            <div style={{ background: '#FFFFFF', border: '1px solid #BAE6FD', borderRadius: '6px', padding: '10px', fontFamily: 'Fira Code', fontSize: '11px', color: '#0369A1' }}>
              prompt = "a photo of a {'{'}c{'}'}."
              <br />
              <span style={{ color: '#0284C7', fontSize: '10px' }}>// ou: "a photo of a {'{'}c{'}'}, a type of bird."</span>
            </div>

            <div style={{ marginTop: '12px', background: '#E0F2FE', padding: '10px', borderRadius: '6px' }}>
              <span style={{ fontSize: '10px', fontWeight: 800, color: '#0369A1', display: 'block', marginBottom: '4px' }}>
                ✓ Insight de Engenharia
              </span>
              <span style={{ fontSize: '10.5px', color: '#075985' }}>
                Como o CLIP foi treinado em 400M de legendas reais, sentenças completas coincidem com a distribuição de texto pré-treinada do WIT.
              </span>
            </div>
          </div>

          <div style={{ borderTop: '1px solid #BAE6FD', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', color: '#0369A1' }}>ImageNet Top-1:</span>
            <span style={{ fontSize: '13px', fontFamily: 'Fira Code', fontWeight: 800, color: '#0284C7' }}>68.8% (+1.3%)</span>
          </div>
        </div>

        {/* Nível 3: Prompt Ensembling (80 Templates) */}
        <div style={{
          background: '#F0FDF4',
          border: '1.5px solid #BBF7D0',
          borderRadius: '12px',
          padding: '18px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ background: '#DCFCE7', color: '#15803D', padding: '3px 8px', borderRadius: '4px', fontSize: '10.5px', fontWeight: 800 }}>
                Nível 3 (Estado da Arte)
              </span>
              <span style={{ fontSize: '12px', fontFamily: 'Fira Code', fontWeight: 700, color: '#16A34A' }}>
                +5.0%
              </span>
            </div>

            <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#14532D', marginBottom: '6px' }}>
              Prompt Ensembling (80 Templates)
            </h3>
            <p style={{ fontSize: '11.5px', color: '#166534', lineHeight: '1.45', marginBottom: '12px' }}>
              Média dos embeddings normalizados de 80 variações de contexto estilístico.
            </p>

            <div style={{ background: '#FFFFFF', border: '1px solid #BBF7D0', borderRadius: '6px', padding: '10px', fontFamily: 'Fira Code', fontSize: '10px', color: '#15803D' }}>
              "a centered photo of a {'{'}c{'}'}."
              <br />
              "a cropped photo of the {'{'}c{'}'}."
              <br />
              "a photo of many {'{'}c{'}'}s."
              <br />
              "a close-up photo of a {'{'}c{'}'}."
              <br />
              <strong style={{ color: '#166534' }}>T_bar = Normalize(Sum(T_k))</strong>
            </div>

            <div style={{ marginTop: '12px', background: '#DCFCE7', padding: '10px', borderRadius: '6px' }}>
              <span style={{ fontSize: '10px', fontWeight: 800, color: '#14532D', display: 'block', marginBottom: '4px' }}>
                🚀 Ganho Maciço de Generalização
              </span>
              <span style={{ fontSize: '10.5px', color: '#15803D' }}>
                Cancela a variância de termos idiomáticos e estabiliza a direção latente na hiperesfera sem nenhum custo computacional na inferência da imagem!
              </span>
            </div>
          </div>

          <div style={{ borderTop: '1px solid #BBF7D0', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', color: '#14532D' }}>ImageNet Top-1:</span>
            <span style={{ fontSize: '13px', fontFamily: 'Fira Code', fontWeight: 800, color: '#16A34A' }}>72.5% (+5.0%)</span>
          </div>
        </div>

      </div>

      {/* Caixa de Regra Prática de Engenharia */}
      <div style={{
        background: '#FAF5FF',
        border: '1px solid #E9D5FF',
        borderRadius: '8px',
        padding: '10px 18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <span style={{ fontSize: '11.5px', color: '#6B21A8', fontWeight: 600 }}>
          💡 <strong>Equivalente de Engenharia:</strong> No paper seminal, Radford et al. provaram que o ganho de <strong>+5.0%</strong> com Prompt Ensembling equivale a treinar o modelo com <strong>4 vezes mais dados rotulados</strong>, a um custo computacional adicional ZERO no pipeline de produção!
        </span>
      </div>
    </div>
  );
}
