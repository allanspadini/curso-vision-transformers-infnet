import React from 'react';
import MathView from '../MathView';

export default function ModeCollapseAnatomyDiagram() {
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
            Patologia Clássica em GANs
          </span>
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--infnet-dark-blue)' }}>
            A Anatomia do Colapso de Modos: Colapso Total, Colapso Parcial e a Dinâmica de "Mode Hopping"
          </span>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <span className="badge badge-orange" style={{ fontSize: '11px' }}>Mode-Seeking Behavior</span>
          <span className="badge badge-purple" style={{ fontSize: '11px' }}>KL Reversa: KL(p_g ∥ p_data)</span>
        </div>
      </div>

      {/* Diagrama SVG Principal dos 3 Cenários de Modos */}
      <div style={{
        flex: 1,
        background: '#FFFFFF',
        border: '1px solid var(--border-light)',
        borderRadius: '12px',
        padding: '14px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <svg viewBox="0 0 1100 400" style={{ width: '100%', height: '100%', maxHeight: '420px' }}>
          <defs>
            <linearGradient id="grad-mode-real" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
            <linearGradient id="grad-mode-fake" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A855F7" />
              <stop offset="100%" stopColor="#7E22CE" />
            </linearGradient>
          </defs>

          {/* ========================================================= */}
          {/* CENÁRIO 1: DISTRIBUIÇÃO MULTIMODAL REAL (8 MODOS GAUSSIANOS) */}
          {/* ========================================================= */}
          <g transform="translate(30, 30)">
            <rect x="0" y="0" width="310" height="340" rx="10" fill="#F0FDF4" stroke="#86EFAC" strokeWidth="1.5" />
            <rect x="15" y="15" width="280" height="32" rx="6" fill="#DCFCE7" />
            <text x="155" y="32" fill="#15803D" fontSize="11" fontWeight="800" textAnchor="middle">
              1. DISTRIBUIÇÃO REAL p_data
            </text>
            <text x="155" y="42" fill="#166534" fontSize="8" textAnchor="middle">8 Modos Distintos em Anel (Alta Diversidade)</text>

            {/* Círculo com 8 Modos Verdes */}
            <g transform="translate(155, 180)">
              {/* Círculo guia */}
              <circle cx="0" cy="0" r="85" fill="none" stroke="#BBF7D0" strokeWidth="1" strokeDasharray="3 3" />
              
              {/* 8 Modos */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => {
                const rad = (angle * Math.PI) / 180;
                const cx = Math.cos(rad) * 85;
                const cy = Math.sin(rad) * 85;
                return (
                  <g key={idx}>
                    <circle cx={cx} cy={cy} r="18" fill="url(#grad-mode-real)" opacity="0.85" filter="drop-shadow(0 2px 4px rgba(16,185,129,0.3))" />
                    <text x={cx} y={cy + 3} fill="#FFFFFF" fontSize="8" fontWeight="800" textAnchor="middle">M_{idx+1}</text>
                  </g>
                );
              })}
              <circle cx="0" cy="0" r="14" fill="#FFFFFF" stroke="#86EFAC" />
              <text x="0" y="4" fill="#15803D" fontSize="8" fontWeight="800" textAnchor="middle">Real</text>
            </g>

            <rect x="15" y="295" width="280" height="32" rx="4" fill="#FFFFFF" stroke="#86EFAC" />
            <text x="155" y="310" fill="#166534" fontSize="8.5" fontWeight="700" textAnchor="middle">
              Recall = 100% • Entropia Máxima
            </text>
            <text x="155" y="322" fill="#15803D" fontSize="8" textAnchor="middle">
              Todos os subespaços de dados representados
            </text>
          </g>

          {/* ========================================================= */}
          {/* CENÁRIO 2: COLAPSO TOTAL DE MODOS (FULL MODE COLLAPSE) */}
          {/* ========================================================= */}
          <g transform="translate(380, 30)">
            <rect x="0" y="0" width="310" height="340" rx="10" fill="#FEF2F2" stroke="#FCA5A5" strokeWidth="1.5" />
            <rect x="15" y="15" width="280" height="32" rx="6" fill="#FEE2E2" />
            <text x="155" y="32" fill="#B91C1C" fontSize="11" fontWeight="800" textAnchor="middle">
              2. COLAPSO TOTAL DE MODOS
            </text>
            <text x="155" y="42" fill="#991B1B" fontSize="8" textAnchor="middle">G aloca 100% da probabilidade no Modo M_1</text>

            {/* Círculo com apenas 1 modo gerado concentrado */}
            <g transform="translate(155, 180)">
              <circle cx="0" cy="0" r="85" fill="none" stroke="#FECACA" strokeWidth="1" strokeDasharray="3 3" />
              {/* Modos reais apagados em cinza */}
              {[45, 90, 135, 180, 225, 270, 315].map((angle, idx) => {
                const rad = (angle * Math.PI) / 180;
                const cx = Math.cos(rad) * 85;
                const cy = Math.sin(rad) * 85;
                return (
                  <circle key={idx} cx={cx} cy={cy} r="14" fill="#F3F4F6" stroke="#D1D5DB" strokeDasharray="2 2" />
                );
              })}
              {/* O único modo hiper-denso concentrado */}
              <circle cx="85" cy="0" r="32" fill="url(#grad-mode-fake)" filter="drop-shadow(0 4px 8px rgba(168,85,247,0.4))" />
              <text x="85" y="3" fill="#FFFFFF" fontSize="9" fontWeight="800" textAnchor="middle">100% G(z)</text>
              <text x="85" y="14" fill="#F3E8FF" fontSize="7.5" textAnchor="middle">em M_1</text>
            </g>

            <rect x="15" y="295" width="280" height="32" rx="4" fill="#FFFFFF" stroke="#FCA5A5" />
            <text x="155" y="310" fill="#DC2626" fontSize="8.5" fontWeight="700" textAnchor="middle">
              Precision = 99% • Recall = 12.5% (1/8)
            </text>
            <text x="155" y="322" fill="#991B1B" fontSize="8" textAnchor="middle">
              Amostras idênticas no batch • Perda de diversidade
            </text>
          </g>

          {/* ========================================================= */}
          {/* CENÁRIO 3: DINÂMICA DE "MODE HOPPING" (PULO CÍCLICO) */}
          {/* ========================================================= */}
          <g transform="translate(730, 30)">
            <rect x="0" y="0" width="340" height="340" rx="10" fill="#FFFBEB" stroke="#FCD34D" strokeWidth="1.5" />
            <rect x="15" y="15" width="310" height="32" rx="6" fill="#FEF3C7" />
            <text x="170" y="32" fill="#B45309" fontSize="11" fontWeight="800" textAnchor="middle">
              3. O CICLO DE "MODE HOPPING"
            </text>
            <text x="170" y="42" fill="#92400E" fontSize="8" textAnchor="middle">G persegue um modo de cada vez sem convergir</text>

            {/* Ilustração das Épocas pulando de modo */}
            <g transform="translate(30, 75)">
              {/* Passo 1 */}
              <rect x="0" y="0" width="280" height="50" rx="6" fill="#FFFFFF" stroke="#FCD34D" />
              <text x="15" y="20" fill="#B45309" fontSize="9" fontWeight="800">Época 10 ➔ G colapsa no Modo A</text>
              <text x="15" y="38" fill="#64748B" fontSize="8">D ainda não sabe e é enganado por A; D_loss sobe</text>

              {/* Passo 2 */}
              <rect x="0" y="60" width="280" height="50" rx="6" fill="#FFFFFF" stroke="#FCD34D" />
              <text x="15" y="80" fill="#0284C7" fontSize="9" fontWeight="800">Época 12 ➔ D aprende a rejeitar Modo A</text>
              <text x="15" y="98" fill="#64748B" fontSize="8">D(A) → 0. G sofre penalidade massiva em A</text>

              {/* Passo 3 */}
              <rect x="0" y="120" width="280" height="50" rx="6" fill="#FFFFFF" stroke="#FCD34D" />
              <text x="15" y="140" fill="#7E22CE" fontSize="9" fontWeight="800">Época 15 ➔ G salta inteiramente para o Modo B</text>
              <text x="15" y="158" fill="#64748B" fontSize="8">G abandona A completamente; D é pego de surpresa</text>

              {/* Passo 4 */}
              <rect x="0" y="180" width="280" height="30" rx="6" fill="#FEF3C7" stroke="#F59E0B" />
              <text x="140" y="200" fill="#78350F" fontSize="8.5" fontWeight="700" textAnchor="middle">
                ↺ Ciclo Infinito: G nunca aprende a diversidade simultânea!
              </text>
            </g>

            <rect x="15" y="295" width="310" height="32" rx="4" fill="#FFFFFF" stroke="#FCD34D" />
            <text x="170" y="310" fill="#D97706" fontSize="8.5" fontWeight="700" textAnchor="middle">
              Causa Teórica: Assimetria da Divergência KL Reversa
            </text>
            <text x="170" y="322" fill="#78350F" fontSize="8" textAnchor="middle">
              KL(p_g ∥ p_data) penaliza severamente gerar fora do suporte (Mode Seeking)
            </text>
          </g>
        </svg>
      </div>

      {/* Footer com destaques */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '12px'
      }}>
        <div className="card-infnet" style={{ padding: '8px 14px', background: '#F8FAFC' }}>
          <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 600 }}>COMPORTAMENTO MODE-SEEKING</div>
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>A Falha de Foco Local</div>
          <div style={{ fontSize: '10.5px', color: '#475569', marginTop: '2px' }}>O gerador descobre um ponto fraco do discriminador e despeja toda massa ali</div>
        </div>
        <div className="card-infnet" style={{ padding: '8px 14px', background: '#F8FAFC' }}>
          <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 600 }}>SINTOMA VISUAL NO TREINO</div>
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--infnet-orange)' }}>Batch Clone Syndrome</div>
          <div style={{ fontSize: '10.5px', color: '#475569', marginTop: '2px' }}>O grid de validação começa a exibir rostos ou objetos com traços e fundos idênticos</div>
        </div>
        <div className="card-infnet" style={{ padding: '8px 14px', background: '#F8FAFC' }}>
          <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 600 }}>COMO DETECTAR QUANTITATIVAMENTE</div>
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--infnet-purple)' }}>Queda Abrupta no Recall</div>
          <div style={{ fontSize: '10.5px', color: '#475569', marginTop: '2px' }}>A métrica de Recall para modelos generativos despenca enquanto Precision se mantém</div>
        </div>
      </div>
    </div>
  );
}
