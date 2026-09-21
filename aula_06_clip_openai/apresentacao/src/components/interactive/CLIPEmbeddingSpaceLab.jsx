import React, { useState } from 'react';
import { Compass, Filter, Sparkles, Eye } from 'lucide-react';

export default function CLIPEmbeddingSpaceLab() {
  const [selectedPointId, setSelectedPointId] = useState('img_husky');
  const [clusterFilter, setClusterFilter] = useState('all'); // 'all', 'animals', 'vehicles', 'food'

  // Pontos no espaço unitário 2D (raio r = 130 no SVG centralizado em (220, 160))
  // Ângulos em radianos em torno do círculo para formar clusters semânticos
  const points = [
    // Cluster 1: Animais / Caninos (Ângulos ~ 30° a 70°)
    { id: 'img_husky', type: 'image', label: 'Foto: Husky na Neve', category: 'animals', angle: 40, icon: '🐺', color: '#0284C7' },
    { id: 'txt_husky', type: 'text', label: '"a siberian husky dog"', category: 'animals', angle: 48, icon: '📝', color: '#9333EA' },
    { id: 'img_golden', type: 'image', label: 'Foto: Golden Retriever', category: 'animals', angle: 65, icon: '🦮', color: '#0284C7' },
    { id: 'txt_golden', type: 'text', label: '"a happy golden dog"', category: 'animals', angle: 72, icon: '📝', color: '#9333EA' },

    // Cluster 2: Veículos / Aeronaves (Ângulos ~ 130° a 170°)
    { id: 'img_jet', type: 'image', label: 'Foto: Caça Militar', category: 'vehicles', angle: 135, icon: '✈️', color: '#0284C7' },
    { id: 'txt_jet', type: 'text', label: '"supersonic jet aircraft"', category: 'vehicles', angle: 142, icon: '📝', color: '#9333EA' },
    { id: 'img_car', type: 'image', label: 'Foto: Carro de F1', category: 'vehicles', angle: 165, icon: '🏎️', color: '#0284C7' },
    { id: 'txt_car', type: 'text', label: '"red racing sports car"', category: 'vehicles', angle: 172, icon: '📝', color: '#9333EA' },

    // Cluster 3: Alimentos (Ângulos ~ 250° a 290°)
    { id: 'img_pizza', type: 'image', label: 'Foto: Pizza Pepperoni', category: 'food', angle: 255, icon: '🍕', color: '#0284C7' },
    { id: 'txt_pizza', type: 'text', label: '"delicious hot pizza slice"', category: 'food', angle: 262, icon: '📝', color: '#9333EA' },
    { id: 'img_burger', type: 'image', label: 'Foto: Hambúrguer', category: 'food', angle: 285, icon: '🍔', color: '#0284C7' },
    { id: 'txt_burger', type: 'text', label: '"cheeseburger with fries"', category: 'food', angle: 292, icon: '📝', color: '#9333EA' },
  ];

  // Centro e Raio da Hiperesfera 2D
  const cx = 220;
  const cy = 160;
  const radius = 120;

  // Converter ângulo para coordenadas (x, y)
  const coords = points.map(p => {
    const rad = (p.angle * Math.PI) / 180;
    const x = cx + radius * Math.cos(rad);
    const y = cy + radius * Math.sin(rad);
    return { ...p, x, y, rad };
  });

  const selectedPoint = coords.find(p => p.id === selectedPointId) || coords[0];

  // Calcular similaridade de cosseno com todos os outros pontos: cos(theta) = cos(angle1 - angle2)
  const similarities = coords
    .filter(p => clusterFilter === 'all' || p.category === clusterFilter)
    .map(p => {
      const diffRad = selectedPoint.rad - p.rad;
      const cosine = Math.cos(diffRad);
      return { ...p, cosine };
    })
    .sort((a, b) => b.cosine - a.cosine);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '14px' }}>
      
      {/* Barra de Controles e Filtro */}
      <div style={{
        background: '#EDF5FA',
        border: '1px solid #D0E3F0',
        borderRadius: '10px',
        padding: '10px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Compass size={18} color="#0A345D" />
          <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
            Navegador da Hiperesfera Multimodal S^1:
          </span>
          <span style={{ fontSize: '11px', color: '#64748B' }}>
            Clique em qualquer ponto do círculo unitário para inspecionar similaridades
          </span>
        </div>

        {/* Filtro de Categoria */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Filter size={15} color="#0A345D" />
          <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
            Clusters:
          </span>
          <button
            onClick={() => setClusterFilter('all')}
            style={{
              padding: '3px 8px',
              borderRadius: '4px',
              fontSize: '10.5px',
              fontWeight: 700,
              cursor: 'pointer',
              border: 'none',
              background: clusterFilter === 'all' ? 'var(--infnet-dark-blue)' : '#FFFFFF',
              color: clusterFilter === 'all' ? '#FFFFFF' : '#475569'
            }}
          >
            Todos (3 Clusters)
          </button>
          <button
            onClick={() => setClusterFilter('animals')}
            style={{
              padding: '3px 8px',
              borderRadius: '4px',
              fontSize: '10.5px',
              fontWeight: 700,
              cursor: 'pointer',
              border: 'none',
              background: clusterFilter === 'animals' ? '#16A34A' : '#FFFFFF',
              color: clusterFilter === 'animals' ? '#FFFFFF' : '#475569'
            }}
          >
            🐺 Animais
          </button>
          <button
            onClick={() => setClusterFilter('vehicles')}
            style={{
              padding: '3px 8px',
              borderRadius: '4px',
              fontSize: '10.5px',
              fontWeight: 700,
              cursor: 'pointer',
              border: 'none',
              background: clusterFilter === 'vehicles' ? '#0284C7' : '#FFFFFF',
              color: clusterFilter === 'vehicles' ? '#FFFFFF' : '#475569'
            }}
          >
            🏎️ Veículos
          </button>
          <button
            onClick={() => setClusterFilter('food')}
            style={{
              padding: '3px 8px',
              borderRadius: '4px',
              fontSize: '10.5px',
              fontWeight: 700,
              cursor: 'pointer',
              border: 'none',
              background: clusterFilter === 'food' ? '#EA580C' : '#FFFFFF',
              color: clusterFilter === 'food' ? '#FFFFFF' : '#475569'
            }}
          >
            🍕 Alimentos
          </button>
        </div>
      </div>

      {/* Grid Principal: Esfera 2D + Tabela de Distâncias de Cosseno */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '16px', flex: 1 }}>
        
        {/* Gráfico da Hiperesfera SVG */}
        <div style={{
          background: '#FFFFFF',
          border: '1.5px solid var(--border-light)',
          borderRadius: '12px',
          padding: '14px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'var(--shadow-sm)',
          position: 'relative'
        }}>
          <div style={{ position: 'absolute', top: '12px', left: '16px', fontSize: '11px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
            Projeção 2D da Hiperesfera ||z||_2 = 1.0
          </div>

          <div style={{ position: 'absolute', top: '12px', right: '16px', display: 'flex', gap: '12px', fontSize: '10.5px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#0284C7', fontWeight: 700 }}>
              <span style={{ width: '8px', height: '8px', background: '#0284C7', borderRadius: '50%' }}></span> Imagem
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#9333EA', fontWeight: 700 }}>
              <span style={{ width: '8px', height: '8px', background: '#9333EA', borderRadius: '50%' }}></span> Texto
            </span>
          </div>

          <svg viewBox="0 0 440 320" style={{ width: '100%', height: '290px' }}>
            {/* Círculo da Hiperesfera */}
            <circle cx={cx} cy={cy} r={radius} fill="#F8FAFC" stroke="#0A345D" strokeWidth="2.5" />
            
            {/* Eixos Cartesianos Pontilhados */}
            <line x1={cx - radius - 15} y1={cy} x2={cx + radius + 15} y2={cy} stroke="#CBD5E1" strokeWidth="1" strokeDasharray="3 3" />
            <line x1={cx} y1={cy - radius - 15} x2={cx} y2={cy + radius + 15} stroke="#CBD5E1" strokeWidth="1" strokeDasharray="3 3" />
            <circle cx={cx} cy={cy} r="3" fill="#0A345D" />

            {/* Raio Vetorial do Ponto Selecionado */}
            <line x1={cx} y1={cy} x2={selectedPoint.x} y2={selectedPoint.y} stroke={selectedPoint.color} strokeWidth="2.5" />

            {/* Linhas de Conexão com outros pontos visíveis */}
            {coords.map(p => {
              if (p.id === selectedPoint.id) return null;
              const isClose = Math.abs(selectedPoint.rad - p.rad) < 0.6;
              return (
                <line
                  key={`line-${p.id}`}
                  x1={selectedPoint.x}
                  y1={selectedPoint.y}
                  x2={p.x}
                  y2={p.y}
                  stroke={isClose ? '#22C55E' : '#E2E8F0'}
                  strokeWidth={isClose ? 1.8 : 0.8}
                  strokeDasharray={isClose ? 'none' : '2 2'}
                />
              );
            })}

            {/* Pontos Clicáveis na Borda da Esfera */}
            {coords.map(p => {
              const isSelected = p.id === selectedPoint.id;
              const isVisible = clusterFilter === 'all' || p.category === clusterFilter;

              if (!isVisible) return null;

              return (
                <g
                  key={p.id}
                  transform={`translate(${p.x}, ${p.y})`}
                  onClick={() => setSelectedPointId(p.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <circle
                    r={isSelected ? 14 : 9}
                    fill={isSelected ? p.color : '#FFFFFF'}
                    stroke={p.color}
                    strokeWidth={isSelected ? 3 : 2}
                  />
                  <text
                    y="3"
                    textAnchor="middle"
                    fontSize={isSelected ? '11' : '8'}
                    fill={isSelected ? '#FFFFFF' : p.color}
                  >
                    {p.icon}
                  </text>

                  {/* Rótulo Flutuante */}
                  <text
                    x={p.x > cx ? 16 : -16}
                    y="4"
                    textAnchor={p.x > cx ? 'start' : 'end'}
                    fontSize="9"
                    fontWeight={isSelected ? '800' : '600'}
                    fill={isSelected ? 'var(--infnet-dark-blue)' : '#64748B'}
                  >
                    {p.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Lista de Similaridade de Cosseno com o Ponto Selecionado */}
        <div style={{
          background: '#FFFFFF',
          border: '1.5px solid var(--border-light)',
          borderRadius: '12px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--infnet-dark-blue)' }}>
                Âncoras de Similaridade com:
              </span>
              <span style={{
                background: selectedPoint.type === 'image' ? '#E0F2FE' : '#F3E8FF',
                color: selectedPoint.color,
                fontSize: '10px',
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: '8px'
              }}>
                {selectedPoint.label}
              </span>
            </div>

            {/* Ranking de Cossenos */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '230px', overflowY: 'auto' }}>
              {similarities.map((item, idx) => {
                const isSelf = item.id === selectedPoint.id;
                const isPositive = item.cosine > 0.5;

                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedPointId(item.id)}
                    style={{
                      background: isSelf ? '#ECFDF5' : isPositive ? '#F0F9FF' : '#F8FAFC',
                      border: `1px solid ${isSelf ? '#A7F3D0' : isPositive ? '#BAE6FD' : '#E2E8F0'}`,
                      borderRadius: '6px',
                      padding: '6px 10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      transition: 'background 0.2s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '13px' }}>{item.icon}</span>
                      <div>
                        <div style={{ fontSize: '11px', fontWeight: isSelf ? 800 : 600, color: '#1E293B' }}>
                          {item.label}
                        </div>
                        <div style={{ fontSize: '8.5px', color: '#64748B' }}>
                          Modalidade: {item.type.toUpperCase()} • {item.category}
                        </div>
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <span style={{
                        fontSize: '11px',
                        fontFamily: 'Fira Code',
                        fontWeight: 800,
                        color: isSelf ? '#16A34A' : isPositive ? '#0284C7' : '#64748B'
                      }}>
                        cos: {item.cosine.toFixed(2)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{
            background: '#F0FDF4',
            border: '1px solid #BBF7D0',
            borderRadius: '6px',
            padding: '8px 12px',
            fontSize: '10.5px',
            color: '#15803D'
          }}>
            🎯 <strong>Insight do Espaço:</strong> Note como o texto <em>"a siberian husky dog"</em> possui cosseno de ~0.99 com a foto do Husky, mas cai para &lt; 0.0 com a foto da Pizza, demonstrando a ortogonalidade de tópicos sem supervisão prévia.
          </div>
        </div>

      </div>
    </div>
  );
}
