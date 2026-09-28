import React from 'react';
import MathView from '../MathView';

export default function ArchMarco6GenerativeDiffusionDiagram() {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {/* Top Banner: Breadcrumb Evolutivo */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#EDF5FA',
        border: '1px solid #D0E3F0',
        borderRadius: '8px',
        padding: '8px 16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{
            background: 'var(--infnet-dark-blue)',
            color: '#FFFFFF',
            fontSize: '11px',
            fontWeight: 700,
            padding: '3px 8px',
            borderRadius: '4px',
            fontFamily: 'var(--font-code)'
          }}>
            MARCO 6 / 6
          </span>
          <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
            Modelos Generativos & Difusão: A Grande Convergência Arquitetural do Curso
          </span>
        </div>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <span style={{ padding: '3px 8px', borderRadius: '4px', background: '#F1F5F9', color: '#64748B', fontSize: '10px', fontWeight: 600 }}>1. CNN / U-Net</span>
          <span style={{ color: '#94A3B8', fontSize: '10px' }}>➔</span>
          <span style={{ padding: '3px 8px', borderRadius: '4px', background: '#F1F5F9', color: '#64748B', fontSize: '10px', fontWeight: 600 }}>2. Transformer</span>
          <span style={{ color: '#94A3B8', fontSize: '10px' }}>➔</span>
          <span style={{ padding: '3px 8px', borderRadius: '4px', background: '#F1F5F9', color: '#64748B', fontSize: '10px', fontWeight: 600 }}>3. ViT</span>
          <span style={{ color: '#94A3B8', fontSize: '10px' }}>➔</span>
          <span style={{ padding: '3px 8px', borderRadius: '4px', background: '#F1F5F9', color: '#64748B', fontSize: '10px', fontWeight: 600 }}>4. Swin</span>
          <span style={{ color: '#94A3B8', fontSize: '10px' }}>➔</span>
          <span style={{ padding: '3px 8px', borderRadius: '4px', background: '#F1F5F9', color: '#64748B', fontSize: '10px', fontWeight: 600 }}>5. CLIP</span>
          <span style={{ color: '#94A3B8', fontSize: '10px' }}>➔</span>
          <span style={{ padding: '3px 8px', borderRadius: '4px', background: '#0A345D', color: '#FFFFFF', fontSize: '10px', fontWeight: 700 }}>6. Difusão / Síntese</span>
        </div>
      </div>

      {/* Main Grid: 2 Architectural Columns (GANs to Latent Diffusion + The Unified Diffusion U-Net) */}
      <div style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '12px',
        minHeight: 0
      }}>
        {/* Left Column: From GANs to Latent Diffusion */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid var(--border-light)',
          borderRadius: '10px',
          padding: '12px 14px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#0284C7' }}></span>
                <strong style={{ fontSize: '12.5px', color: '#0A345D' }}>Evolução: De GANs à Difusão Latente (LDM)</strong>
              </div>
              <span className="badge badge-cyan" style={{ fontSize: '9.5px' }}>Rombach et al. (CVPR 2022)</span>
            </div>

            {/* SVG Visual Scheme */}
            <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '10px', position: 'relative' }}>
              <svg viewBox="0 0 380 145" style={{ width: '100%', height: '145px' }}>
                {/* Mini GAN block top */}
                <g transform="translate(10, 5)">
                  <rect x="0" y="0" width="360" height="34" rx="4" fill="#FFF7ED" stroke="#FDBA74" strokeWidth="1" />
                  <text x="10" y="15" fontSize="8" fontWeight="bold" fill="#C2410C">Paradigma GAN (2014-2020):</text>
                  <text x="10" y="27" fontSize="7.5" fill="#7C2D12">
                    Jogo Minimax: G vs D ➔ Risco de Colapso de Modo & Instabilidade de Treino
                  </text>
                  <rect x="260" y="7" width="90" height="20" rx="3" fill="#FEE2E2" stroke="#EF4444" strokeWidth="0.8" />
                  <text x="305" y="20" fontSize="7" fontWeight="bold" fill="#991B1B" textAnchor="middle">Gargalo: Não-convergente</text>
                </g>

                {/* Main LDM Flow */}
                <g transform="translate(10, 46)">
                  {/* Real Image */}
                  <rect x="0" y="20" width="46" height="34" rx="3" fill="#E2E8F0" stroke="#0A345D" strokeWidth="1" />
                  <text x="23" y="34" fontSize="7" fontWeight="bold" fill="#0A345D" textAnchor="middle">Pixel Space</text>
                  <text x="23" y="45" fontSize="6.5" fill="#475569" textAnchor="middle">512×512×3</text>

                  {/* VAE Encoder */}
                  <path d="M 46 37 L 62 37" stroke="#0284C7" strokeWidth="1.2" />
                  <rect x="62" y="20" width="36" height="34" rx="3" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1" />
                  <text x="80" y="34" fontSize="7.5" fontWeight="bold" fill="#0369A1" textAnchor="middle">VAE</text>
                  <text x="80" y="46" fontSize="7" fill="#0284C7" textAnchor="middle">Enc E</text>

                  {/* Latent Space Process */}
                  <path d="M 98 37 L 114 37" stroke="#0284C7" strokeWidth="1.2" />
                  <rect x="114" y="6" width="140" height="64" rx="5" fill="#FFFFFF" stroke="#0A345D" strokeWidth="1.5" />
                  <text x="184" y="20" fontSize="8" fontWeight="bold" fill="#0A345D" textAnchor="middle">
                    Espaço Latente Comprimido (f=8)
                  </text>
                  <text x="184" y="32" fontSize="7" fill="#64748B" textAnchor="middle">
                    z_0 ∈ ℝ^(64×64×4) ➔ z_t ➔ z_T ~ N(0, I)
                  </text>
                  <rect x="124" y="38" width="120" height="24" rx="3" fill="#FEF3C7" stroke="#D97706" strokeWidth="1" />
                  <text x="184" y="52" fontSize="7.5" fontWeight="bold" fill="#B45309" textAnchor="middle">
                    Denoising Reverso ε_θ(z_t, t, c)
                  </text>

                  {/* VAE Decoder */}
                  <path d="M 254 37 L 270 37" stroke="#16A34A" strokeWidth="1.2" />
                  <rect x="270" y="20" width="36" height="34" rx="3" fill="#DCFCE7" stroke="#16A34A" strokeWidth="1" />
                  <text x="288" y="34" fontSize="7.5" fontWeight="bold" fill="#15803D" textAnchor="middle">VAE</text>
                  <text x="288" y="46" fontSize="7" fill="#16A34A" textAnchor="middle">Dec D</text>

                  {/* Generated Output */}
                  <path d="M 306 37 L 322 37" stroke="#16A34A" strokeWidth="1.2" />
                  <rect x="322" y="16" width="38" height="42" rx="3" fill="#F0FDF4" stroke="#16A34A" strokeWidth="1.5" />
                  <text x="341" y="34" fontSize="7" fontWeight="bold" fill="#15803D" textAnchor="middle">Imagem</text>
                  <text x="341" y="44" fontSize="6.5" fill="#166534" textAnchor="middle">Sintetizada</text>
                  <text x="341" y="54" fontSize="6.5" fontWeight="bold" fill="#0A345D" textAnchor="middle">512×512</text>
                </g>
              </svg>
            </div>
          </div>

          <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ background: '#F0F9FF', border: '1px solid #BAE6FD', borderRadius: '6px', padding: '6px 10px', fontSize: '10.5px', color: '#0369A1' }}>
              <strong>Inovação Central:</strong> Desloca o processo de difusão de pixels para um espaço latente perceptual comprimido por VAE (fator 8×), reduzindo o custo computacional em 64× e garantindo fidelidade estocástica estável.
            </div>
          </div>
        </div>

        {/* Right Column: The Unified Diffusion U-Net */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid var(--border-light)',
          borderRadius: '10px',
          padding: '12px 14px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#AB47BC' }}></span>
                <strong style={{ fontSize: '12.5px', color: '#0A345D' }}>A U-Net de Difusão: Síntese de Todas as Aulas</strong>
              </div>
              <span className="badge badge-purple" style={{ fontSize: '9.5px' }}>Convergência do Curso</span>
            </div>

            {/* SVG Visual Scheme */}
            <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '10px', position: 'relative' }}>
              <svg viewBox="0 0 380 145" style={{ width: '100%', height: '145px' }}>
                {/* Framework U-Net */}
                <path d="M 40 20 L 40 100 L 190 100 L 190 20" stroke="#0A345D" strokeWidth="2" fill="none" />
                <path d="M 190 20 L 190 100 L 340 100 L 340 20" stroke="#0A345D" strokeWidth="2" fill="none" />

                {/* Skip connections */}
                <path d="M 40 45 L 340 45" stroke="#9333EA" strokeWidth="1.5" strokeDasharray="3 3" />
                <path d="M 40 75 L 340 75" stroke="#9333EA" strokeWidth="1.5" strokeDasharray="3 3" />

                {/* Course Modules Tagged */}
                {/* 1. ResNet Blocks */}
                <rect x="15" y="32" width="60" height="24" rx="3" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="1" />
                <text x="45" y="44" fontSize="7" fontWeight="bold" fill="#1D4ED8" textAnchor="middle">ResNet Block</text>
                <text x="45" y="53" fontSize="6" fill="#1E40AF" textAnchor="middle">Convoluções (A1)</text>

                {/* 2. Skip Connections */}
                <rect x="150" y="32" width="80" height="24" rx="3" fill="#FAF5FF" stroke="#9333EA" strokeWidth="1" />
                <text x="190" y="44" fontSize="7" fontWeight="bold" fill="#6B21A8" textAnchor="middle">Skip Connection</text>
                <text x="190" y="53" fontSize="6" fill="#7E22CE" textAnchor="middle">Preserva Detalhes (A1)</text>

                {/* 3. Self-Attention */}
                <rect x="15" y="65" width="60" height="24" rx="3" fill="#FEF3C7" stroke="#D97706" strokeWidth="1" />
                <text x="45" y="77" fontSize="7" fontWeight="bold" fill="#92400E" textAnchor="middle">Self-Attention</text>
                <text x="45" y="86" fontSize="6" fill="#B45309" textAnchor="middle">Atenção 2D (A2-A4)</text>

                {/* 4. Cross-Attention CLIP Prompt */}
                <rect x="140" y="65" width="100" height="26" rx="3" fill="#F0FDF4" stroke="#16A34A" strokeWidth="1.2" />
                <text x="190" y="77" fontSize="7.5" fontWeight="bold" fill="#15803D" textAnchor="middle">Cross-Attention CLIP</text>
                <text x="190" y="87" fontSize="6.5" fill="#166534" textAnchor="middle">Prompt de Texto (A6)</text>

                {/* 5. Temporal Attention */}
                <rect x="295" y="65" width="65" height="24" rx="3" fill="#EFF6FF" stroke="#0284C7" strokeWidth="1" />
                <text x="327" y="77" fontSize="7" fontWeight="bold" fill="#0369A1" textAnchor="middle">Temporal 1D</text>
                <text x="327" y="86" fontSize="6" fill="#0284C7" textAnchor="middle">Vídeo Síntese (A7)</text>

                {/* 6. Avaliação FID (Bottom Tag) */}
                <rect x="70" y="115" width="240" height="22" rx="4" fill="#EDF5FA" stroke="#0A345D" strokeWidth="1.2" />
                <text x="190" y="129" fontSize="8" fontWeight="bold" fill="#0A345D" textAnchor="middle">
                  Avaliação Quantitativa: Distância de Fréchet (FID) (Aula 8)
                </text>
              </svg>
            </div>
          </div>

          <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ background: '#FAF5FF', border: '1px solid #E9D5FF', borderRadius: '6px', padding: '6px 10px', fontSize: '10.5px', color: '#6B21A8' }}>
              <strong>Inovação Central:</strong> A U-Net de difusão é a obra-prima unificadora do curso: integra convoluções residuais (Aula 1), atenção multi-head espacial e multiescala (Aulas 2 a 4), condicionamento CLIP (Aula 6) e atenção temporal (Aula 7).
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Evolutionary Link Banner: Synthesis & Conclusion */}
      <div style={{
        background: 'linear-gradient(90deg, #F0FDF4 0%, #EFF6FF 100%)',
        border: '1.5px solid #86EFAC',
        borderRadius: '8px',
        padding: '8px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '14px' }}>🏆</span>
          <span style={{ fontSize: '11px', fontWeight: 800, color: '#166534', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Síntese do Ecossistema da Disciplina:
          </span>
          <span style={{ fontSize: '11px', color: '#1E293B' }}>
            Cada arquitetura respondeu a um gargalo do mundo real: <strong>ResNet/U-Net</strong> superaram a degradação; <strong>Transformers/ViT</strong> romperam o campo receptivo estático; <strong>Swin</strong> garantiu escala linear; <strong>CLIP</strong> abriu o vocabulário para a linguagem; e a <strong>Difusão</strong> unificou tudo para criar imagens do zero!
          </span>
        </div>
        <span style={{ fontSize: '11px', fontWeight: 700, color: '#15803D', whiteSpace: 'nowrap' }}>
          Jornada Completa: Da Convolução à Difusão Latente ✓
        </span>
      </div>
    </div>
  );
}
