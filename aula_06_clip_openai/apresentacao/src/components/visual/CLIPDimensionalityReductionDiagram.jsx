import React from 'react';

export default function CLIPDimensionalityReductionDiagram() {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '20px', flex: 1 }}>
        
        {/* Esquerda: Diagrama do Gargalo de Informação (Information Bottleneck) */}
        <div style={{
          background: '#FFFFFF',
          border: '1.5px solid var(--border-light)',
          borderRadius: '12px',
          padding: '18px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--infnet-dark-blue)' }}>
              Mapeamento Linear e Gargalo de Informação (Tishby Bottleneck)
            </span>
            <span style={{ background: '#FAF5FF', color: '#7E22CE', border: '1px solid #E9D5FF', fontSize: '10.5px', fontWeight: 700, padding: '2px 8px', borderRadius: '12px' }}>
              d_v, d_t ➔ D
            </span>
          </div>

          <svg viewBox="0 0 540 280" style={{ width: '100%', height: '270px' }}>
            {/* Espaço de Entrada Visual */}
            <g transform="translate(20, 25)">
              <rect x="0" y="0" width="120" height="90" rx="8" fill="#F0F9FF" stroke="#BAE6FD" strokeWidth="1.5" />
              <text x="60" y="24" textAnchor="middle" fontSize="10.5" fontWeight="800" fill="#0369A1">Espaço Visual</text>
              <text x="60" y="42" textAnchor="middle" fontSize="9" fontFamily="Fira Code" fill="#0284C7">d_v = 768 / 2048</text>
              <text x="60" y="60" textAnchor="middle" fontSize="8" fill="#075985">Pixels, texturas locais,</text>
              <text x="60" y="72" textAnchor="middle" fontSize="8" fill="#075985">ruído de fundo, iluminação</text>
            </g>

            {/* Espaço de Entrada Texto */}
            <g transform="translate(20, 155)">
              <rect x="0" y="0" width="120" height="90" rx="8" fill="#FAF5FF" stroke="#E9D5FF" strokeWidth="1.5" />
              <text x="60" y="24" textAnchor="middle" fontSize="10.5" fontWeight="800" fill="#7E22CE">Espaço Texto</text>
              <text x="60" y="42" textAnchor="middle" fontSize="9" fontFamily="Fira Code" fill="#9333EA">d_t = 512</text>
              <text x="60" y="60" textAnchor="middle" fontSize="8" fill="#6B21A8">Sintaxe gramatical,</text>
              <text x="60" y="72" textAnchor="middle" fontSize="8" fill="#6B21A8">stopwords, idiomatismos</text>
            </g>

            {/* Funil de Compressão / Projeção Linear */}
            {/* Visual Funnel */}
            <path d="M 140 70 L 260 115" stroke="#0284C7" strokeWidth="2.5" />
            <path d="M 140 200 L 260 155" stroke="#9333EA" strokeWidth="2.5" />

            {/* Caixa da Projeção Matricial */}
            <g transform="translate(210, 85)">
              <rect x="0" y="0" width="110" height="100" rx="10" fill="#0F172A" />
              <text x="55" y="24" textAnchor="middle" fontSize="10.5" fontWeight="800" fill="#FFFFFF">Gargalo W</text>
              <text x="55" y="42" textAnchor="middle" fontSize="8.5" fontFamily="Fira Code" fill="#94A3B8">W_v: [d_v, D]</text>
              <text x="55" y="56" textAnchor="middle" fontSize="8.5" fontFamily="Fira Code" fill="#94A3B8">W_t: [d_t, D]</text>
              
              <rect x="10" y="66" width="90" height="24" rx="4" fill="#1E293B" />
              <text x="55" y="82" textAnchor="middle" fontSize="9" fontWeight="700" fill="#38BDF8">Filtro de Ruído</text>
            </g>

            {/* Seta para Hiperesfera Reduzida */}
            <path d="M 330 135 L 370 135" stroke="#16A34A" strokeWidth="3" markerEnd="url(#red-arrow-green)" />

            {/* Hiperesfera Latente Compacta D=512 */}
            <g transform="translate(380, 50)">
              <circle cx="85" cy="85" r="75" fill="#F0FDF4" stroke="#16A34A" strokeWidth="2.5" strokeDasharray="4 2" />
              <text x="85" y="45" textAnchor="middle" fontSize="10" fontWeight="800" fill="#166534">Hiperesfera S^{'{'}D-1{'}'}</text>
              <text x="85" y="62" textAnchor="middle" fontSize="9.5" fontFamily="Fira Code" fontWeight="700" fill="#15803D">Dimensão D = 512</text>
              
              <rect x="25" y="80" width="120" height="50" rx="6" fill="#DCFCE7" />
              <text x="85" y="98" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#14532D">Apenas Invariantes</text>
              <text x="85" y="112" textAnchor="middle" fontSize="8" fill="#166534">Semânticas Compartilhadas</text>
              <text x="85" y="124" textAnchor="middle" fontSize="7.5" fontFamily="Fira Code" fill="#047857">||z||_2 = 1.0</text>
            </g>
          </svg>
        </div>

        {/* Direita: 3 Mecanismos Fundamentais da Redução */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          
          <div style={{
            background: '#F0F9FF',
            border: '1px solid #BAE6FD',
            borderRadius: '10px',
            padding: '14px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px'
          }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#0369A1' }}>
              1. Compressão Semântica
            </span>
            <p style={{ fontSize: '11px', color: '#0F172A', lineHeight: '1.4', margin: 0 }}>
              Ao forçar a representação de 768 ou 2048 canais a passar por uma matriz linear para 512 dimensões unitárias, o modelo é obrigado a descartar variações irrelevantes (iluminação, texturas aleatórias) e preservar apenas o conceito.
            </p>
          </div>

          <div style={{
            background: '#FAF5FF',
            border: '1px solid #E9D5FF',
            borderRadius: '10px',
            padding: '14px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px'
          }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#7E22CE' }}>
              2. Alinhamento de Subespaços
            </span>
            <p style={{ fontSize: '11px', color: '#0F172A', lineHeight: '1.4', margin: 0 }}>
              Rede de Visão e Rede de Texto possuem espaços métricos intrinsecamente incompatíveis. As matrizes de projeção aprendem uma rotação e escala conjuntas que sobrepõem os dois subespaços.
            </p>
          </div>

          <div style={{
            background: '#ECFDF5',
            border: '1px solid #A7F3D0',
            borderRadius: '10px',
            padding: '14px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px'
          }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#065F46' }}>
              3. Eficiência de Indexação Vetorial
            </span>
            <p style={{ fontSize: '11px', color: '#0F172A', lineHeight: '1.4', margin: 0 }}>
              Vetores de 512 floats (apenas 2 KB por imagem) viabilizam buscas em bilhão de itens com bancos vetoriais como FAISS ou Milvus em milissegundos com quantização escalar (PQ / HNSW).
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
