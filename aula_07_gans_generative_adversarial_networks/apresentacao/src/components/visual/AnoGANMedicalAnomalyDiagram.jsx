import React from 'react';
import MathView from '../MathView';

export default function AnoGANMedicalAnomalyDiagram() {
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
            Schlegl et al. (IPMI, 2017)
          </span>
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--infnet-dark-blue)' }}>
            Aplicação em Diagnóstico Visual: Detecção de Anomalias com AnoGAN e Inversão Latente
          </span>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <span className="badge badge-cyan" style={{ fontSize: '11px' }}>Treino Não-Supervisionado</span>
          <span className="badge badge-purple" style={{ fontSize: '11px' }}>Inversão no Espaço Latente</span>
          <span className="badge badge-green" style={{ fontSize: '11px' }}>Mapa Residual Diagnóstico</span>
        </div>
      </div>

      {/* Diagrama SVG Principal: Pipeline Completo de Diagnóstico */}
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
            <linearGradient id="grad-healthy" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>
            <linearGradient id="grad-query" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0284C7" />
              <stop offset="100%" stopColor="#0369A1" />
            </linearGradient>
            <linearGradient id="grad-residual" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EF4444" />
              <stop offset="100%" stopColor="#B91C1C" />
            </linearGradient>
            <marker id="arr-diag-blue" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#0284C7" />
            </marker>
            <marker id="arr-diag-red" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#EF4444" />
            </marker>
          </defs>

          {/* FASE 1: TREINAMENTO (APENAS COM SAUDÁVEIS) */}
          <g transform="translate(30, 25)">
            <rect x="0" y="0" width="1040" height="90" rx="8" fill="#F0FDF4" stroke="#86EFAC" strokeWidth="1.5" />
            <text x="25" y="24" fill="#15803D" fontSize="11" fontWeight="800">
              FASE 1: APRENDIZADO NÃO-SUPERVISIONADO DA VARIEDADE SAUDÁVEL ℳ_healthy
            </text>
            <text x="25" y="40" fill="#166534" fontSize="9">
              Treina-se a GAN (DCGAN ou WGAN) exclusivamente com imagens médicas normais (cérebro sem tumor, pulmão limpo, retina sem lesão).
            </text>

            <g transform="translate(560, 15)">
              <rect x="0" y="0" width="450" height="60" rx="6" fill="#FFFFFF" stroke="#86EFAC" />
              <text x="225" y="22" fill="#15803D" fontSize="9.5" fontWeight="700" textAnchor="middle">
                O Gerador G aprende o mapeamento: z ↦ G(z) ∈ ℳ_healthy
              </text>
              <text x="225" y="42" fill="#4B5563" fontSize="8.5" textAnchor="middle">
                G é incapaz de sintetizar tumores ou anomalias porque nunca viu dados patológicos no treino!
              </text>
            </g>
          </g>

          {/* FASE 2: TESTE & INVERSÃO LATENTE */}
          <text x="35" y="145" fill="#0A345D" fontSize="12" fontWeight="800" fontFamily="var(--font-title)">
            FASE 2: INFERÊNCIA CLÍNICA & MAPEAMENTO RESIDUAL DE PATOLOGIAS
          </text>

          {/* Bloco 1: Imagem do Paciente de Teste (x) */}
          <g transform="translate(35, 160)">
            <rect x="0" y="0" width="160" height="180" rx="8" fill="#F0F9FF" stroke="#BAE6FD" strokeWidth="1.5" />
            <text x="80" y="22" fill="#0284C7" fontSize="10" fontWeight="800" textAnchor="middle">1. Exame do Paciente (x)</text>
            
            {/* Desenho esquemático de cérebro com tumor */}
            <rect x="25" y="35" width="110" height="100" rx="10" fill="#E0F2FE" stroke="#38BDF8" />
            <circle cx="80" cy="85" r="35" fill="#BAE6FD" />
            {/* Lesão tumoral vermelha */}
            <circle cx="95" cy="75" r="14" fill="#EF4444" opacity="0.9" />
            <text x="95" y="78" fill="#FFFFFF" fontSize="7" fontWeight="800" textAnchor="middle">Tumor</text>

            <text x="80" y="152" fill="#0369A1" fontSize="8.5" fontWeight="700" textAnchor="middle">Imagem com Patologia</text>
            <text x="80" y="166" fill="#64748B" fontSize="7.5" textAnchor="middle">Contém anatomia normal + lesão</text>
          </g>

          <path d="M 195 250 L 250 250" fill="none" stroke="#0284C7" strokeWidth="2.5" markerEnd="url(#arr-diag-blue)" />

          {/* Bloco 2: Inversão no Espaço Latente (Encontrar z*) */}
          <g transform="translate(250, 160)">
            <rect x="0" y="0" width="280" height="180" rx="8" fill="#FAF5FF" stroke="#C084FC" strokeWidth="1.5" />
            <text x="140" y="22" fill="#7E22CE" fontSize="10.5" fontWeight="800" textAnchor="middle">
              2. Inversão Latente: Otimização de z*
            </text>

            <rect x="15" y="35" width="250" height="75" rx="6" fill="#FFFFFF" stroke="#DDD6FE" />
            <text x="125" y="52" fill="#6D28D9" fontSize="8.5" fontWeight="700" textAnchor="middle">
              Backprop até z mantendo G e D congelados:
            </text>
            <div style={{ transform: 'scale(0.85)' }}>
              <text x="145" y="75" fill="#0A345D" fontSize="8" textAnchor="middle" fontFamily="var(--font-code)">
                z* = argmin_z [ (1-λ)·||x - G(z)||₁ + λ·||f_D(x) - f_D(G(z))||₁ ]
              </text>
            </div>
            <text x="125" y="98" fill="#4B5563" fontSize="8" textAnchor="middle">
              γ passos de gradiente: z ← z - η·∇_z ℒ_ano
            </text>

            <text x="140" y="130" fill="#7C3AED" fontSize="8.5" fontWeight="700" textAnchor="middle">
              Encontra o "Gêmeo Saudável Mais Próximo"
            </text>
            <text x="140" y="145" fill="#64748B" fontSize="8" textAnchor="middle">
              z* projeta x na variedade ℳ_healthy
            </text>
          </g>

          <path d="M 530 250 L 585 250" fill="none" stroke="#0284C7" strokeWidth="2.5" markerEnd="url(#arr-diag-blue)" />

          {/* Bloco 3: Reconstrução Saudável G(z*) */}
          <g transform="translate(585, 160)">
            <rect x="0" y="0" width="160" height="180" rx="8" fill="#F0FDF4" stroke="#86EFAC" strokeWidth="1.5" />
            <text x="80" y="22" fill="#15803D" fontSize="10" fontWeight="800" textAnchor="middle">3. Reconstrução G(z*)</text>

            {/* Desenho de cérebro SAUDÁVEL reconstruído (sem tumor!) */}
            <rect x="25" y="35" width="110" height="100" rx="10" fill="#DCFCE7" stroke="#22C55E" />
            <circle cx="80" cy="85" r="35" fill="#86EFAC" />
            {/* Área antes tumoral agora regenerada saudável! */}
            <circle cx="95" cy="75" r="14" fill="#86EFAC" stroke="#15803D" strokeDasharray="2 2" />
            <text x="95" y="78" fill="#166534" fontSize="6.5" fontWeight="700" textAnchor="middle">Sadio</text>

            <text x="80" y="152" fill="#166534" fontSize="8.5" fontWeight="700" textAnchor="middle">Paciente Sadio Sintético</text>
            <text x="80" y="166" fill="#15803D" fontSize="7.5" textAnchor="middle">Tumor não foi reconstruído</text>
          </g>

          <path d="M 745 250 L 800 250" fill="none" stroke="#EF4444" strokeWidth="2.5" markerEnd="url(#arr-diag-red)" />

          {/* Bloco 4: Mapa Residual de Patologias |x - G(z*)| */}
          <g transform="translate(800, 160)">
            <rect x="0" y="0" width="220" height="180" rx="8" fill="#FEF2F2" stroke="#FCA5A5" strokeWidth="2" filter="drop-shadow(0 4px 8px rgba(239,68,68,0.2))" />
            <text x="110" y="22" fill="#B91C1C" fontSize="10.5" fontWeight="800" textAnchor="middle">
              4. Mapa Residual: R = |x - G(z*)|
            </text>

            {/* Desenho do mapa residual destacando estritamente a lesão */}
            <rect x="55" y="35" width="110" height="100" rx="10" fill="#1E293B" stroke="#475569" />
            <circle cx="110" cy="85" r="35" fill="#334155" opacity="0.4" />
            {/* Tumor brilha em vermelho/amarelo térmico */}
            <circle cx="125" cy="75" r="14" fill="#EF4444" filter="drop-shadow(0 0 8px #F59E0B)" />
            <text x="125" y="78" fill="#FFFFFF" fontSize="7.5" fontWeight="800" textAnchor="middle">LESÃO</text>

            <text x="110" y="152" fill="#DC2626" fontSize="9" fontWeight="800" textAnchor="middle">
              Localização Exata da Patologia
            </text>
            <text x="110" y="166" fill="#991B1B" fontSize="8" textAnchor="middle">
              Score de Anomalia: A(x) = ∑ R(x) &gt; Limiar τ
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
          <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 600 }}>PARADIGMA ZERO-DEFECT</div>
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>Treino Apenas com Normais</div>
          <div style={{ fontSize: '10.5px', color: '#475569', marginTop: '2px' }}>Dispensa anotação de biópsias ou defeitos industriais prévios</div>
        </div>
        <div className="card-infnet" style={{ padding: '8px 14px', background: '#F8FAFC' }}>
          <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--infnet-purple)' }}>LOSS DISCRIMINATIVA</div>
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--infnet-purple)' }}>Feature Matching f_D</div>
          <div style={{ fontSize: '10.5px', color: '#475569', marginTop: '2px' }}>Compara ativações na penúltima camada de D para preservar semântica</div>
        </div>
        <div className="card-infnet" style={{ padding: '8px 14px', background: '#F8FAFC' }}>
          <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 600 }}>EVOLUÇÃO RÁPIDA: f-AnoGAN</div>
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--infnet-green-accent)' }}>Encoder Rápido z = E(x)</div>
          <div style={{ fontSize: '10.5px', color: '#475569', marginTop: '2px' }}>Treina um encoder para mapear direto x ↦ z*, viabilizando inferência em tempo real</div>
        </div>
      </div>
    </div>
  );
}
