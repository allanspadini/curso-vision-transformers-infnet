import React, { useState, useMemo } from 'react';
import { Play, Pause, RotateCcw, Activity, ShieldCheck, AlertOctagon, CheckCircle2 } from 'lucide-react';
import MathView from '../MathView';

export default function GANTrainingStabilityLab() {
  const [modelType, setModelType] = useState('wgan_gp'); // 'vanilla', 'dcgan_ttur', 'wgan_gp'
  const [lrRatio, setLrRatio] = useState('asymmetric'); // 'symmetric' (lr_d = lr_g) vs 'asymmetric' (lr_d = 4x lr_g)
  const [labelSmoothing, setLabelSmoothing] = useState(true);

  // Gera dados simulados de curvas de treino ao longo de 40 épocas
  const history = useMemo(() => {
    const epochs = 40;
    const data = [];

    let dLoss = modelType === 'wgan_gp' ? -15.0 : 1.2;
    let gLoss = modelType === 'wgan_gp' ? 14.5 : 1.3;
    let fid = 180;
    let stabilityStatus = 'healthy';

    for (let e = 1; e <= epochs; e++) {
      if (modelType === 'vanilla') {
        if (lrRatio === 'symmetric') {
          // Órbita violenta e divergência após época 15
          const cycle = Math.sin(e * 0.7);
          dLoss = Math.max(0.02, 0.4 + cycle * 0.35 + (e > 25 ? -0.3 : 0));
          gLoss = Math.max(0.5, 2.5 - cycle * 1.8 + (e > 25 ? 4.5 : 0));
          fid = Math.max(45, 160 - e * 2 + (e > 22 ? Math.pow(e - 22, 1.8) : 0));
          stabilityStatus = e > 25 ? 'diverged' : 'oscillating';
        } else {
          // TTUR atenua um pouco, mas Vanilla sofre com suportes disjuntos
          dLoss = Math.max(0.08, 0.693 * Math.exp(-e * 0.05) + Math.sin(e * 0.5) * 0.1);
          gLoss = Math.min(8.0, 1.5 + e * 0.08);
          fid = Math.max(55, 150 - e * 2.5);
          stabilityStatus = 'unstable';
        }
      } else if (modelType === 'dcgan_ttur') {
        // DCGAN com TTUR + Label Smoothing
        const smoothingBonus = labelSmoothing ? 0.1 : 0.0;
        const noise = (Math.random() - 0.5) * 0.08;
        dLoss = 0.65 + Math.sin(e * 0.3) * (labelSmoothing ? 0.06 : 0.15) + noise;
        gLoss = 1.35 - Math.sin(e * 0.3) * (labelSmoothing ? 0.08 : 0.2) + noise;
        fid = Math.max(25, 170 - e * 3.8 + (labelSmoothing ? 0 : 15));
        stabilityStatus = 'stable';
      } else {
        // WGAN-GP: Wasserstein distance converge monotonicamente para perto de 0
        const progress = 1 - Math.exp(-e * 0.09);
        dLoss = -14.0 * (1 - progress) + (Math.random() - 0.5) * 0.3;
        gLoss = 13.5 * (1 - progress) + (Math.random() - 0.5) * 0.3;
        fid = Math.max(12, 175 * Math.exp(-e * 0.08));
        stabilityStatus = 'optimal';
      }

      data.push({
        epoch: e,
        dLoss: parseFloat(dLoss.toFixed(3)),
        gLoss: parseFloat(gLoss.toFixed(3)),
        fid: parseFloat(fid.toFixed(1)),
        stabilityStatus
      });
    }
    return data;
  }, [modelType, lrRatio, labelSmoothing]);

  const lastPoint = history[history.length - 1];

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {/* Controles do Laboratório */}
      <div style={{
        background: '#EDF5FA',
        border: '1px solid #D0E3F0',
        borderRadius: '8px',
        padding: '10px 18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Activity size={18} color="var(--infnet-dark-blue)" />
          <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
            Simulador de Estabilidade de Treinamento:
          </span>
        </div>

        {/* Seletor de Modelo */}
        <div style={{ display: 'flex', gap: '6px' }}>
          {[
            { id: 'vanilla', label: 'Vanilla GAN (Minimax)' },
            { id: 'dcgan_ttur', label: 'DCGAN + TTUR' },
            { id: 'wgan_gp', label: '★ WGAN-GP (Lipschitz)' }
          ].map((m) => (
            <button
              key={m.id}
              onClick={() => setModelType(m.id)}
              style={{
                padding: '5px 12px',
                fontSize: '11px',
                fontWeight: 700,
                borderRadius: '6px',
                border: modelType === m.id ? '2px solid var(--infnet-cyan)' : '1px solid #CBD5E1',
                background: modelType === m.id ? 'var(--infnet-dark-blue)' : '#FFFFFF',
                color: modelType === m.id ? '#FFFFFF' : '#334155',
                cursor: 'pointer'
              }}
            >
              {m.label}
            </button>
          ))}
        </div>

        {/* Opções de Otimização */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '11px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={lrRatio === 'asymmetric'}
              onChange={(e) => setLrRatio(e.target.checked ? 'asymmetric' : 'symmetric')}
            />
            <span style={{ fontWeight: 600, color: '#334155' }}>TTUR (lr_D 4x maior)</span>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={labelSmoothing}
              onChange={(e) => setLabelSmoothing(e.target.checked)}
              disabled={modelType === 'wgan_gp'}
            />
            <span style={{ fontWeight: 600, color: modelType === 'wgan_gp' ? '#94A3B8' : '#334155' }}>
              Label Smoothing (0.9)
            </span>
          </label>
        </div>
      </div>

      {/* Grid de Visualização: Gráficos de Curvas de Treino e Diagnóstico Clínico */}
      <div style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '1.25fr 1fr',
        gap: '12px',
        minHeight: 0
      }}>
        {/* Gráfico SVG de Curvas de Perda */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid var(--border-light)',
          borderRadius: '12px',
          padding: '14px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#0A345D' }}>
              CURVAS DE PERDA AO LONGO DAS ÉPOCAS (D vs G)
            </span>
            <div style={{ display: 'flex', gap: '10px', fontSize: '9px' }}>
              <span style={{ color: '#0284C7', fontWeight: 700 }}>― Perda do Discriminador / Crítico</span>
              <span style={{ color: '#8B5CF6', fontWeight: 700 }}>― Perda do Gerador</span>
            </div>
          </div>

          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg viewBox="0 0 540 210" style={{ width: '100%', height: '100%' }}>
              {/* Eixos */}
              <line x1="35" y1="180" x2="520" y2="180" stroke="#CBD5E1" strokeWidth="1.5" />
              <line x1="35" y1="180" x2="35" y2="15" stroke="#CBD5E1" strokeWidth="1.5" />
              <text x="520" y="195" fill="#64748B" fontSize="8" textAnchor="end">Época (1 a 40)</text>
              <text x="30" y="15" fill="#64748B" fontSize="8" textAnchor="end">Loss</text>

              {/* Traçado das Curvas */}
              {(() => {
                const minY = modelType === 'wgan_gp' ? -16 : 0;
                const maxY = modelType === 'wgan_gp' ? 16 : (modelType === 'vanilla' ? 7 : 3);
                const scaleY = (val) => 180 - ((val - minY) / (maxY - minY)) * 165;
                const scaleX = (ep) => 35 + ((ep - 1) / 39) * 485;

                const pathD = history.reduce((acc, pt, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${scaleX(pt.epoch)} ${scaleY(pt.dLoss)}`, '');
                const pathG = history.reduce((acc, pt, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${scaleX(pt.epoch)} ${scaleY(pt.gLoss)}`, '');

                return (
                  <g>
                    {/* Linha zero se WGAN-GP */}
                    {modelType === 'wgan_gp' && (
                      <line x1="35" y1={scaleY(0)} x2="520" y2={scaleY(0)} stroke="#CBD5E1" strokeDasharray="3 3" />
                    )}
                    {/* Curva D (Azul) */}
                    <path d={pathD} fill="none" stroke="#0284C7" strokeWidth="2.5" />
                    {/* Curva G (Roxa) */}
                    <path d={pathG} fill="none" stroke="#8B5CF6" strokeWidth="2.5" />
                  </g>
                );
              })()}
            </svg>
          </div>

          {/* Rodapé do Gráfico */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            background: '#F8FAFC',
            padding: '6px 10px',
            borderRadius: '6px',
            fontSize: '9.5px',
            border: '1px solid #E2E8F0'
          }}>
            <span>D Loss Final: <strong style={{ color: '#0284C7' }}>{lastPoint.dLoss}</strong></span>
            <span>G Loss Final: <strong style={{ color: '#8B5CF6' }}>{lastPoint.gLoss}</strong></span>
            <span>FID Estimado: <strong style={{ color: lastPoint.fid < 30 ? '#15803D' : '#DC2626' }}>{lastPoint.fid}</strong></span>
          </div>
        </div>

        {/* Painel Direito: Diagnóstico Clínico e Status de Engenharia */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid var(--border-light)',
          borderRadius: '12px',
          padding: '14px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#0A345D', marginBottom: '8px' }}>
              DIAGNÓSTICO CLÍNICO DA ESTABILIDADE
            </div>

            {/* Cartão de Status */}
            {lastPoint.stabilityStatus === 'optimal' && (
              <div style={{ background: '#F0FDF4', border: '1px solid #86EFAC', borderRadius: '8px', padding: '10px', marginBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ShieldCheck size={20} color="#16A34A" />
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: 800, color: '#15803D' }}>CONVERGÊNCIA ÓTIMA (WGAN-GP)</div>
                    <div style={{ fontSize: '8.5px', color: '#166534' }}>Condição 1-Lipschitz satisfeita pela penalidade de gradiente.</div>
                  </div>
                </div>
              </div>
            )}

            {lastPoint.stabilityStatus === 'stable' && (
              <div style={{ background: '#F0F9FF', border: '1px solid #BAE6FD', borderRadius: '8px', padding: '10px', marginBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={20} color="#0284C7" />
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: 800, color: '#0369A1' }}>EQUILÍBRIO ESTÁVEL (DCGAN + TTUR)</div>
                    <div style={{ fontSize: '8.5px', color: '#0284C7' }}>As perdas oscilam suavemente ao redor do ponto de equilíbrio.</div>
                  </div>
                </div>
              </div>
            )}

            {(lastPoint.stabilityStatus === 'diverged' || lastPoint.stabilityStatus === 'unstable' || lastPoint.stabilityStatus === 'oscillating') && (
              <div style={{ background: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: '8px', padding: '10px', marginBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <AlertOctagon size={20} color="#DC2626" />
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: 800, color: '#991B1B' }}>INSTABILIDADE DETECTADA!</div>
                    <div style={{ fontSize: '8.5px', color: '#7F1D1D' }}>Discriminador saturou ou o modelo entrou em órbitas divergentes.</div>
                  </div>
                </div>
              </div>
            )}

            {/* Checklist de Diagnóstico Clínico */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '9px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 8px', background: '#F8FAFC', borderRadius: '4px' }}>
                <span>Norma Espectral de D:</span>
                <strong style={{ color: modelType === 'wgan_gp' ? '#16A34A' : '#D97706' }}>
                  {modelType === 'wgan_gp' ? '||∇_x D|| ≈ 1.0 (Limitada)' : 'Desregulada (Risco)'}
                </strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 8px', background: '#F8FAFC', borderRadius: '4px' }}>
                <span>Risco de Mode Collapse:</span>
                <strong style={{ color: modelType === 'wgan_gp' ? '#16A34A' : (modelType === 'dcgan_ttur' ? '#D97706' : '#DC2626') }}>
                  {modelType === 'wgan_gp' ? 'MUITO BAIXO (< 5%)' : (modelType === 'dcgan_ttur' ? 'MODERADO (~20%)' : 'ALTO (> 70%)')}
                </strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 8px', background: '#F8FAFC', borderRadius: '4px' }}>
                <span>Interpretabilidade da Loss:</span>
                <strong style={{ color: modelType === 'wgan_gp' ? '#16A34A' : '#64748B' }}>
                  {modelType === 'wgan_gp' ? 'Correlação Direta com Qualidade' : 'Sem Correlação com Qualidade'}
                </strong>
              </div>
            </div>
          </div>

          <div style={{ background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '6px', padding: '8px', fontSize: '8.5px', color: '#334155' }}>
            <strong>💡 Recomendação de Produção:</strong> Em projetos profissionais de visão computacional com GANs, utilize estritamente <strong>WGAN-GP</strong> ou <strong>Spectral Normalization (SN-GAN)</strong>. Eles eliminam a necessidade de sintonia fina exaustiva de hiperparâmetros e previnem 90% das falhas catastróficas de treino.
          </div>
        </div>
      </div>
    </div>
  );
}
