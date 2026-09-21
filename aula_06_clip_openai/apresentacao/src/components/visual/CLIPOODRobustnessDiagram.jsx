import React from 'react';

export default function CLIPOODRobustnessDiagram() {
  const benchmarks = [
    {
      name: 'ImageNet Padrão',
      desc: 'Validação IID (Mesma Distribuição)',
      resnet: 76.2,
      clip: 76.2,
      lossResnet: '0%',
      lossClip: '0%'
    },
    {
      name: 'ImageNet-V2',
      desc: 'Nova coleta com mesmo protocolo',
      resnet: 63.8,
      clip: 70.1,
      lossResnet: '-12.4 pp',
      lossClip: '-6.1 pp'
    },
    {
      name: 'ImageNet-R (Renditions)',
      desc: 'Cartuns, arte, brinquedos, esculturas',
      resnet: 36.1,
      clip: 77.7,
      lossResnet: '-40.1 pp',
      lossClip: '+1.5 pp'
    },
    {
      name: 'ImageNet-Sketch',
      desc: 'Esboços em preto e branco',
      resnet: 25.2,
      clip: 48.3,
      lossResnet: '-51.0 pp',
      lossClip: '-27.9 pp'
    },
    {
      name: 'ImageNet-A (Adversarial)',
      desc: 'Imagens naturais que enganam CNNs',
      resnet: 2.7,
      clip: 77.1,
      lossResnet: '-73.5 pp',
      lossClip: '+0.9 pp'
    }
  ];

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {/* Header explicativo */}
      <div style={{
        background: '#EDF5FA',
        border: '1px solid #D0E3F0',
        borderRadius: '8px',
        padding: '10px 18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ background: '#0A345D', color: '#FFFFFF', padding: '3px 8px', borderRadius: '4px', fontSize: '10.5px', fontWeight: 800 }}>
            BENCHMARK OFICIAL OPENAI
          </span>
          <span style={{ fontSize: '12.5px', color: 'var(--infnet-dark-blue)', fontWeight: 600 }}>
            Comparação empírica de acurácia Top-1: ResNet-50 Supervisionada vs CLIP ViT-L/14 Zero-Shot
          </span>
        </div>
        <div style={{ display: 'flex', gap: '16px', fontSize: '11px', fontWeight: 700 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#E53E3E' }}>
            <span style={{ width: '12px', height: '12px', background: '#E53E3E', borderRadius: '2px' }}></span>
            ResNet-50 (Supervisionada ImageNet)
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#10B981' }}>
            <span style={{ width: '12px', height: '12px', background: '#10B981', borderRadius: '2px' }}></span>
            CLIP ViT-L/14 (Zero-Shot)
          </span>
        </div>
      </div>

      {/* Gráfico Visual de Barras Lado a Lado */}
      <div style={{
        flex: 1,
        background: '#FFFFFF',
        border: '1.5px solid var(--border-light)',
        borderRadius: '12px',
        padding: '16px 20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: 'var(--shadow-sm)'
      }}>
        {benchmarks.map((b, idx) => (
          <div key={idx} style={{ display: 'grid', gridTemplateColumns: '220px 1fr 120px', alignItems: 'center', gap: '16px' }}>
            {/* Nome do Dataset */}
            <div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>{b.name}</div>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{b.desc}</div>
            </div>

            {/* Barras Comparativas */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {/* Barra ResNet */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  height: '14px',
                  width: `${b.resnet}%`,
                  background: '#EF4444',
                  borderRadius: '3px',
                  transition: 'width 0.5s ease'
                }} />
                <span style={{ fontSize: '10.5px', fontFamily: 'Fira Code', fontWeight: 700, color: '#B91C1C' }}>
                  {b.resnet}%
                </span>
              </div>

              {/* Barra CLIP */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  height: '14px',
                  width: `${b.clip}%`,
                  background: '#10B981',
                  borderRadius: '3px',
                  transition: 'width 0.5s ease'
                }} />
                <span style={{ fontSize: '10.5px', fontFamily: 'Fira Code', fontWeight: 700, color: '#047857' }}>
                  {b.clip}%
                </span>
              </div>
            </div>

            {/* Resumo de Queda */}
            <div style={{ textAlign: 'right' }}>
              <span style={{
                fontSize: '11px',
                fontFamily: 'Fira Code',
                fontWeight: 700,
                color: b.clip >= b.resnet ? '#059669' : '#DC2626',
                background: b.clip >= b.resnet ? '#ECFDF5' : '#FEF2F2',
                padding: '3px 8px',
                borderRadius: '4px',
                border: `1px solid ${b.clip >= b.resnet ? '#A7F3D0' : '#FECACA'}`
              }}>
                Δ CLIP: {b.lossClip}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Caixa de Diagnóstico Científico */}
      <div style={{
        background: '#FFFBEB',
        border: '1px solid #FDE68A',
        borderRadius: '8px',
        padding: '10px 18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <span style={{ fontSize: '11.5px', color: '#92400E', fontWeight: 600 }}>
          💡 <strong>Por que a ResNet supervisionada entra em colapso no ImageNet-A (2.7%) enquanto o CLIP mantém 77.1%?</strong>
          <br />
          Modelos supervisionados sofrem de <em>shortcut learning</em> (overfitting em texturas espúrias de fundo). O CLIP aprendeu semântica conceitual robusta com 400M de descrições humanas variadas.
        </span>
      </div>
    </div>
  );
}
