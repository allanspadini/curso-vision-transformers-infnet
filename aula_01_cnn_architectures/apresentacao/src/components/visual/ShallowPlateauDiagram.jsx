import React from 'react';
import { TrendingUp, AlertCircle, Layers, Image as ImageIcon } from 'lucide-react';

export default function ShallowPlateauDiagram() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '20px', height: '100%', alignItems: 'stretch' }}>
      {/* Visual Chart / Graph */}
      <div style={{
        background: '#FFFFFF',
        border: '1px solid var(--border-light)',
        borderRadius: '10px',
        padding: '16px 20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
            Curva de Capacidade Representacional
          </span>
          <span className="badge badge-orange">Platô Precoce</span>
        </div>

        {/* SVG Graph */}
        <div style={{ position: 'relative', height: '180px', width: '100%', margin: '10px 0' }}>
          <svg viewBox="0 0 400 180" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
            {/* Grid lines */}
            <line x1="40" y1="20" x2="380" y2="20" stroke="#E2E8F0" strokeDasharray="3 3" />
            <line x1="40" y1="70" x2="380" y2="70" stroke="#E2E8F0" strokeDasharray="3 3" />
            <line x1="40" y1="120" x2="380" y2="120" stroke="#E2E8F0" strokeDasharray="3 3" />
            <line x1="40" y1="150" x2="380" y2="150" stroke="#94A3B8" strokeWidth="1.5" />
            <line x1="40" y1="20" x2="40" y2="150" stroke="#94A3B8" strokeWidth="1.5" />

            {/* Labels */}
            <text x="35" y="15" fill="#64748B" fontSize="10" textAnchor="end">Acurácia</text>
            <text x="380" y="165" fill="#64748B" fontSize="10" textAnchor="end">Complexidade da Tarefa →</text>

            {/* Deep network curve (cyan) */}
            <path
              d="M 40 140 Q 120 70 240 40 T 380 30"
              fill="none"
              stroke="#1BB5D8"
              strokeWidth="3"
            />
            {/* Shallow network curve (orange dashed) */}
            <path
              d="M 40 140 Q 100 85 160 85 T 380 85"
              fill="none"
              stroke="#FF7043"
              strokeWidth="2.5"
              strokeDasharray="4 4"
            />

            {/* Plateau indicator */}
            <circle cx="200" cy="85" r="5" fill="#FF7043" />
            <line x1="200" y1="85" x2="250" y2="110" stroke="#FF7043" strokeWidth="1" />
            <rect x="250" y="100" width="125" height="22" rx="4" fill="#FBE9E7" stroke="#FFCCBC" />
            <text x="255" y="115" fill="#D84315" fontSize="9.5" fontWeight="bold">Platô de Rede Rasa</text>
          </svg>
        </div>

        <div style={{ display: 'flex', gap: '16px', fontSize: '11px', color: 'var(--text-muted)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '12px', height: '3px', background: '#FF7043', borderRadius: '2px' }}></span>
            <span>Rede Rasa (3–5 camadas)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '12px', height: '3px', background: '#1BB5D8', borderRadius: '2px' }}></span>
            <span>Rede Profunda (Hierárquica)</span>
          </div>
        </div>
      </div>

      {/* Visual Hierarchy Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ background: '#F8FAFC', border: '1px solid var(--border-light)', borderRadius: '8px', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div className="card-icon-wrapper icon-blue" style={{ width: '32px', height: '32px' }}>
            <span style={{ fontWeight: 800, fontSize: '12px' }}>L1-2</span>
          </div>
          <div>
            <div style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>Nível Baixo (Bordas & Cores)</div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Gradientes locais, arestas 45°/90°, manchas de cor</div>
          </div>
        </div>

        <div style={{ background: '#F8FAFC', border: '1px solid var(--border-light)', borderRadius: '8px', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div className="card-icon-wrapper icon-cyan" style={{ width: '32px', height: '32px' }}>
            <span style={{ fontWeight: 800, fontSize: '12px' }}>L3-6</span>
          </div>
          <div>
            <div style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>Nível Médio (Texturas & Padrões)</div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Malhas, curvas, cantos, círculos e listras</div>
          </div>
        </div>

        <div style={{ background: '#F8FAFC', border: '1px solid var(--border-light)', borderRadius: '8px', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div className="card-icon-wrapper icon-green" style={{ width: '32px', height: '32px' }}>
            <span style={{ fontWeight: 800, fontSize: '12px' }}>L7+</span>
          </div>
          <div>
            <div style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>Nível Alto (Partes & Semântica)</div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Rodas, faróis, olhos, focinhos, objetos inteiros</div>
          </div>
        </div>

        <div style={{ background: '#EFF8FC', border: '1px solid #CDE6F5', borderRadius: '6px', padding: '8px 12px', fontSize: '11.5px', color: 'var(--infnet-dark-blue)' }}>
          💡 <strong>Conclusão:</strong> Redes rasas não têm profundidade suficiente para compor representações semânticas de alto nível.
        </div>
      </div>
    </div>
  );
}
