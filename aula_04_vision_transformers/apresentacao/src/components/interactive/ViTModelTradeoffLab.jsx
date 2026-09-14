import React, { useState } from 'react';

export default function ViTModelTradeoffLab() {
  const [useCase, setUseCase] = useState('server'); // 'edge', 'server', 'critical'

  const scenarios = {
    edge: {
      name: '1. Dispositivo Edge / Mobile (Drones, Câmeras)',
      target: 'Latência Ultrabaixa (<15ms) e Consumo Mínimo de Bateria',
      recommendation: 'ResNet-50 ou MobileNetV3 / EfficientNet',
      why: 'CNNs clássicas possuem viés indutivo e núcleos convolucionais otimizados em silício (NPU / DSP). ViTs consomem muita memória de ativação para autoatenção em chips compactos.',
      accuracy: '76.1% ~ 80.2%',
      latency: '8 ms',
      vram: '0.8 GB',
      badgeClass: 'badge-navy'
    },
    server: {
      name: '2. Servidor de Alta Concorrência (E-commerce, Moderação)',
      target: 'Equilíbrio Ótimo entre Acurácia Top-1 (>82%) e Throughput',
      recommendation: 'ViT-Base / 16 (Fine-Tuned com CutMix) ou ConvNeXt-Base',
      why: 'O ViT-Base com 86M de parâmetros atinge 81.2% a 84.5% no ImageNet, processando batches grandes em GPUs corporativas (A100, L4) com alta eficiência em Tensor Cores.',
      accuracy: '81.2% ~ 84.5%',
      latency: '22 ms',
      vram: '3.2 GB',
      badgeClass: 'badge-cyan'
    },
    critical: {
      name: '3. Aplicações Críticas (Diagnóstico Médico, Sensoriamento Remoto)',
      target: 'Máxima Acurácia Top-1 Absoluta (>88%) sem Restrição de Tempo Real',
      recommendation: 'ViT-Large / 16 ou ViT-Huge / 14 (Pré-treinado JFT/IN-21k)',
      why: 'Em tarefas onde 0.5% de erro pode significar vidas ou milhões de reais, o ViT-Large/Huge é insuperável. Sua capacidade de relacionar patches em escala global detecta sutilezas anatômicas invisíveis.',
      accuracy: '86.2% ~ 88.5%',
      latency: '78 ms',
      vram: '12.5 GB',
      badgeClass: 'badge-purple'
    }
  };

  const sc = scenarios[useCase];

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {/* Barra de Seleção de Cenário de Produção */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#F8FAFC',
        border: '1px solid #E2E8F0',
        borderRadius: '8px',
        padding: '8px 16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
            Cenário de Produção:
          </span>
          {[
            { id: 'edge', label: 'Dispositivo de Borda (Edge)' },
            { id: 'server', label: 'Servidor Nuvem (Padrão)' },
            { id: 'critical', label: 'Acurácia Crítica (SOTA)' }
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => setUseCase(btn.id)}
              style={{
                padding: '4px 12px',
                borderRadius: '6px',
                border: useCase === btn.id ? '2px solid var(--infnet-cyan)' : '1px solid #CBD5E1',
                background: useCase === btn.id ? '#E0F2FE' : '#FFFFFF',
                color: useCase === btn.id ? 'var(--infnet-dark-blue)' : '#475569',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {btn.label}
            </button>
          ))}
        </div>
        <span className={`badge ${sc.badgeClass}`}>Decisão de Engenharia</span>
      </div>

      {/* Grid Principal: Detalhamento do Cenário */}
      <div style={{
        flex: 1,
        background: '#FFFFFF',
        borderRadius: '12px',
        border: '1px solid #E2E8F0',
        padding: '18px 22px',
        display: 'grid',
        gridTemplateColumns: '1.2fr 0.8fr',
        gap: '16px',
        minHeight: 0
      }}>
        {/* Painel Esquerdo: Recomendação e Racional Técnico */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>
              Recomendação Arquitetural
            </span>
            <h3 style={{ fontSize: '18px', color: 'var(--infnet-dark-blue)', margin: '4px 0 8px 0' }}>
              {sc.recommendation}
            </h3>
            <div style={{ fontSize: '12px', color: '#0284C7', fontWeight: 700, marginBottom: '12px' }}>
              Objetivo: {sc.target}
            </div>
            <p style={{ fontSize: '12.5px', color: '#334155', lineHeight: 1.5, margin: 0 }}>
              {sc.why}
            </p>
          </div>

          <div style={{
            background: '#F8FAFC',
            borderRadius: '8px',
            border: '1px solid #E2E8F0',
            padding: '12px',
            fontSize: '11.5px',
            color: '#475569'
          }}>
            ⚖️ <strong>Regra de Ouro da Arquitetura:</strong> Não existe modelo universalmente superior. Para datasets médios e hardware restrito, CNNs e híbridos dominam; para datasets massivos com suporte a paralelismo de tensores na nuvem, Vision Transformers são imbatíveis.
          </div>
        </div>

        {/* Painel Direito: Cartões de Métricas Estimadas */}
        <div style={{
          background: '#F8FAFC',
          borderRadius: '10px',
          border: '1px solid #E2E8F0',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '12px'
        }}>
          <div>
            <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 700, marginBottom: '4px' }}>
              ACURÁCIA ESPERADA (TOP-1)
            </div>
            <div style={{ fontSize: '22px', fontWeight: 900, color: 'var(--infnet-dark-blue)' }}>
              {sc.accuracy}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 700, marginBottom: '4px' }}>
              LATÊNCIA DE INFERÊNCIA (GPU)
            </div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#0284C7' }}>
              ~{sc.latency}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 700, marginBottom: '4px' }}>
              CONSUMO DE MEMÓRIA VRAM (INFERÊNCIA)
            </div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#7E22CE' }}>
              ~{sc.vram}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
