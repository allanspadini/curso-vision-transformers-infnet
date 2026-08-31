import React, { useState, useMemo } from 'react';
import { Smartphone, Server, Gauge, Layers, Cpu, Check, ArrowRight, Table, Sparkles, Filter, Code2, Trophy } from 'lucide-react';

const TORCHVISION_MODELS = [
  {
    id: 'mobilenet_v3_small',
    name: 'MobileNet v3 small',
    torchName: 'mobilenet_v3_small',
    weightsEnum: 'MobileNet_V3_Small_Weights.DEFAULT',
    top1: 67.7,
    top5: 87.4,
    params: 2.5,
    gflops: 0.1,
    category: 'Mobile / Edge',
    tag: 'Ultra-Leve',
    description: 'Projetada para smartphones de baixo custo e microcontroladores. Menor consumo de energia e latência mínima.',
    idealFor: 'Drones, IoT, microcontroladores e apps mobile em tempo real.'
  },
  {
    id: 'efficientnet_b0',
    name: 'EfficientNet B0',
    torchName: 'efficientnet_b0',
    weightsEnum: 'EfficientNet_B0_Weights.DEFAULT',
    top1: 77.7,
    top5: 93.5,
    params: 5.3,
    gflops: 0.4,
    category: 'Mobile / Edge',
    tag: 'Campeão de Eficiência',
    description: 'Ponto de partida do Compound Scaling. Entrega 77.7% de acurácia com apenas 5.3M parâmetros.',
    idealFor: 'Aplicações mobile de alta acurácia e inferência em borda.'
  },
  {
    id: 'googlenet',
    name: 'GoogLeNet',
    torchName: 'googlenet',
    weightsEnum: 'GoogLeNet_Weights.DEFAULT',
    top1: 69.8,
    top5: 89.5,
    params: 6.6,
    gflops: 1.5,
    category: 'Clássica',
    tag: 'Módulos Inception',
    description: 'Pioneira em convoluções 1x1 e Global Average Pooling para eliminar parâmetros redundantes.',
    idealFor: 'Estudos arquiteturais e benchmarks clássicos.'
  },
  {
    id: 'densenet121',
    name: 'DenseNet 121',
    torchName: 'densenet121',
    weightsEnum: 'DenseNet121_Weights.DEFAULT',
    top1: 74.4,
    top5: 92.0,
    params: 8.0,
    gflops: 2.8,
    category: 'Intermediária',
    tag: 'Reuso de Features',
    description: 'Conecta cada camada a todas as subsequentes por concatenação. Alta eficiência de parâmetros.',
    idealFor: 'Imagens médicas e tarefas onde cada detalhe sutil importa.'
  },
  {
    id: 'efficientnet_v2_s',
    name: 'EfficientNet v2 small',
    torchName: 'efficientnet_v2_s',
    weightsEnum: 'EfficientNet_V2_S_Weights.DEFAULT',
    top1: 84.2,
    top5: 96.9,
    params: 21.5,
    gflops: 8.4,
    category: 'Intermediária',
    tag: 'Treino Rápido + Fused-MBConv',
    description: 'Usa convoluções Fused-MBConv e aprendizado progressivo. 84.2% Top-1 com convergência 4x mais rápida.',
    idealFor: 'Sistemas de produção em nuvem modernos e balanceados.'
  },
  {
    id: 'resnet34',
    name: 'ResNet 34',
    torchName: 'resnet34',
    weightsEnum: 'ResNet34_Weights.DEFAULT',
    top1: 73.3,
    top5: 91.4,
    params: 21.8,
    gflops: 3.7,
    category: 'Intermediária',
    tag: 'Padrão da Indústria',
    description: 'A espinha dorsal mais versátil e confiável para Transfer Learning em visão computacional geral.',
    idealFor: 'Linha de base sólida para classificação, detecção e segmentação.'
  },
  {
    id: 'inception_v3',
    name: 'Inception V3',
    torchName: 'inception_v3',
    weightsEnum: 'Inception_V3_Weights.DEFAULT',
    top1: 77.3,
    top5: 93.5,
    params: 27.2,
    gflops: 5.7,
    category: 'Intermediária',
    tag: 'Fatoração Assimétrica (1×7, 7×1)',
    description: 'Fatora convoluções espaciais para acelerar o processamento de imagens em alta resolução (299×299).',
    idealFor: 'Classificação de imagens com detalhes finos e alta resolução.'
  },
  {
    id: 'convnext_tiny',
    name: 'ConvNeXt Tiny',
    torchName: 'convnext_tiny',
    weightsEnum: 'ConvNeXt_Tiny_Weights.DEFAULT',
    top1: 82.6,
    top5: 96.1,
    params: 28.6,
    gflops: 4.5,
    category: 'Intermediária',
    tag: 'CNN Modernizada (2022)',
    description: 'Redesenha as CNNs puras com princípios dos Vision Transformers (kernels 7×7, LayerNorm, GELU).',
    idealFor: 'Aplicações modernas que buscam desempenho de Transformer com a simplicidade de CNN.'
  },
  {
    id: 'densenet161',
    name: 'DenseNet 161',
    torchName: 'densenet161',
    weightsEnum: 'DenseNet161_Weights.DEFAULT',
    top1: 77.1,
    top5: 93.6,
    params: 28.7,
    gflops: 7.7,
    category: 'Intermediária',
    tag: 'Alta Capacidade Densa',
    description: 'Versão mais profunda da DenseNet, maximizando o fluxo de gradiente e a preservação de informação.',
    idealFor: 'Imagens dermatológicas e radiológicas de alta sensibilidade.'
  },
  {
    id: 'resnet152',
    name: 'ResNet 152',
    torchName: 'resnet152',
    weightsEnum: 'ResNet152_Weights.DEFAULT',
    top1: 82.3,
    top5: 96.0,
    params: 60.2,
    gflops: 11.5,
    category: 'Alta Capacidade',
    tag: 'Profundidade Extrema',
    description: '152 camadas treinadas de ponta a ponta sem desvanecimento de gradiente graças às conexões residuais.',
    idealFor: 'Servidores de inferência de grande porte e backbones para detecção densa.'
  },
  {
    id: 'alexnet',
    name: 'AlexNet',
    torchName: 'alexnet',
    weightsEnum: 'AlexNet_Weights.DEFAULT',
    top1: 56.5,
    top5: 79.1,
    params: 61.1,
    gflops: 0.7,
    category: 'Clássica',
    tag: 'Marco Histórico (2012)',
    description: 'O início do Deep Learning moderno. Possui muitos parâmetros por causa das pesadas camadas FC finais.',
    idealFor: 'Fins educacionais e compreensão da evolução das arquiteturas.'
  },
  {
    id: 'efficientnet_b7',
    name: 'EfficientNet B7',
    torchName: 'efficientnet_b7',
    weightsEnum: 'EfficientNet_B7_Weights.DEFAULT',
    top1: 84.1,
    top5: 96.9,
    params: 66.3,
    gflops: 37.8,
    category: 'Alta Capacidade',
    tag: 'Compound Scaling Máximo v1',
    description: 'Escalonada com resolução de entrada 600×600 para extrair características em escala microscópica.',
    idealFor: 'Competições de visão computacional (Kaggle) e diagnósticos cirúrgicos.'
  },
  {
    id: 'resnext101_32x8d',
    name: 'ResNeXt 101 32x8D',
    torchName: 'resnext101_32x8d',
    weightsEnum: 'ResNeXt101_32X8D_Weights.DEFAULT',
    top1: 82.8,
    top5: 96.2,
    params: 88.8,
    gflops: 16.4,
    category: 'Alta Capacidade',
    tag: 'Convoluções Agrupadas (Cardinality)',
    description: 'Introduz a dimensão de Cardinalidade (32 caminhos paralelos), aumentando o poder expressivo sem elevar a densidade.',
    idealFor: 'Reconhecimento fino de espécies, veículos e padrões complexos.'
  },
  {
    id: 'efficientnet_v2_l',
    name: 'EfficientNet v2 large',
    torchName: 'efficientnet_v2_l',
    weightsEnum: 'EfficientNet_V2_L_Weights.DEFAULT',
    top1: 85.8,
    top5: 97.8,
    params: 118.5,
    gflops: 56.1,
    category: 'Alta Capacidade',
    tag: 'SOTA CNN TorchVision',
    description: 'Atinge impressionantes 85.8% Top-1 e 97.8% Top-5, competindo diretamente com Vision Transformers de grande porte.',
    idealFor: 'Missões críticas onde a máxima precisão possível é inegociável.'
  },
  {
    id: 'vgg11_bn',
    name: 'VGG 11 with BN',
    torchName: 'vgg11_bn',
    weightsEnum: 'VGG11_BN_Weights.DEFAULT',
    top1: 70.4,
    top5: 89.8,
    params: 132.9,
    gflops: 7.6,
    category: 'Clássica',
    tag: 'Camadas FC Densas',
    description: 'Arquitetura homogênea de 3×3. O alto número de parâmetros vem das matrizes totalmente conectadas na cabeça.',
    idealFor: 'Transferência de estilo neural e mapas de ativação explicáveis.'
  },
  {
    id: 'convnext_large',
    name: 'ConvNeXt Large',
    torchName: 'convnext_large',
    weightsEnum: 'ConvNeXt_Large_Weights.DEFAULT',
    top1: 84.4,
    top5: 97.0,
    params: 197.8,
    gflops: 34.4,
    category: 'Alta Capacidade',
    tag: 'CNN Pura em Escala Gigante',
    description: 'Modelo de altíssima capacidade representacional desenhado para provar que CNNs puras rivalizam com Transformers.',
    idealFor: 'Backbones para modelos multimodais e sensoriamento remoto.'
  }
];

export default function ArchitectureSelector() {
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('params'); // 'params', 'top1', 'gflops'
  const [selectedId, setSelectedId] = useState('resnet34');

  const filteredAndSortedModels = useMemo(() => {
    return TORCHVISION_MODELS
      .filter(m => {
        if (filterCategory === 'mobile') return m.params < 10;
        if (filterCategory === 'mid') return m.params >= 10 && m.params <= 50;
        if (filterCategory === 'heavy') return m.params > 50;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'params') return a.params - b.params;
        if (sortBy === 'top1') return b.top1 - a.top1;
        if (sortBy === 'gflops') return a.gflops - b.gflops;
        return 0;
      });
  }, [filterCategory, sortBy]);

  const selectedModel = useMemo(() => {
    return TORCHVISION_MODELS.find(m => m.id === selectedId) || TORCHVISION_MODELS[5];
  }, [selectedId]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', height: '100%' }}>
      {/* Header Controls & Filter Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#EDF5FA',
        padding: '6px 12px',
        borderRadius: '8px',
        border: '1px solid #D0E3F0'
      }}>
        {/* Category Filters */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--infnet-dark-blue)', marginRight: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Filter size={12} /> Porte:
          </span>

          {[
            { id: 'all', label: 'Todos (16)' },
            { id: 'mobile', label: 'Mobile & Edge (<10M)' },
            { id: 'mid', label: 'Equilibrados (10M-50M)' },
            { id: 'heavy', label: 'Alta Capacidade (>50M)' }
          ].map(btn => (
            <button
              key={btn.id}
              onClick={() => setFilterCategory(btn.id)}
              style={{
                padding: '4px 10px',
                borderRadius: '5px',
                border: '1px solid',
                borderColor: filterCategory === btn.id ? 'var(--infnet-cyan)' : '#CBD5E1',
                background: filterCategory === btn.id ? '#E0F7FC' : '#FFFFFF',
                color: filterCategory === btn.id ? 'var(--infnet-dark-blue)' : 'var(--text-muted)',
                fontSize: '11px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Sort Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)' }}>Ordenar por:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              padding: '3px 8px',
              borderRadius: '5px',
              border: '1px solid #CBD5E1',
              background: '#FFFFFF',
              fontSize: '11px',
              fontWeight: 700,
              color: 'var(--infnet-dark-blue)',
              cursor: 'pointer'
            }}
          >
            <option value="params">Tamanho (Parâmetros ↑)</option>
            <option value="top1">Acurácia Top-1 (↓)</option>
            <option value="gflops">Custo Computacional (GFLOPs ↑)</option>
          </select>
        </div>
      </div>

      {/* Main Content Area: Table on Left + Inspector on Right */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.45fr 1fr', gap: '12px', flex: 1, minHeight: 0 }}>
        
        {/* LEFT: Scrollable Interactive Official Table 12-3 */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid var(--border-light)',
          borderRadius: '8px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--shadow-sm)'
        }}>
          {/* Table Header with reference */}
          <div style={{
            background: '#F8FAFC',
            borderBottom: '1px solid #E2E8F0',
            padding: '7px 12px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Table size={14} color="var(--infnet-dark-blue)" />
              <span style={{ fontSize: '11.5px', fontWeight: 800, color: 'var(--infnet-dark-blue)' }}>
                Tabela 12-3: Modelos Pré-Treinados no TorchVision (Ordenados por Tamanho)
              </span>
            </div>
            <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
              {filteredAndSortedModels.length} modelos exibidos
            </span>
          </div>

          {/* Table Content */}
          <div style={{ flex: 1, overflowY: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11.5px' }}>
              <thead>
                <tr style={{ background: '#F1F5F9', borderBottom: '1.5px solid #CBD5E1', color: '#475569', textAlign: 'left' }}>
                  <th style={{ padding: '6px 10px', fontWeight: 800 }}>Modelo (Class Name)</th>
                  <th style={{ padding: '6px 8px', fontWeight: 800, textAlign: 'right' }}>Top-1 Acc</th>
                  <th style={{ padding: '6px 8px', fontWeight: 800, textAlign: 'right' }}>Top-5 Acc</th>
                  <th style={{ padding: '6px 8px', fontWeight: 800, textAlign: 'right' }}>Params</th>
                  <th style={{ padding: '6px 10px', fontWeight: 800, textAlign: 'right' }}>GFLOPs</th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedModels.map((model, idx) => {
                  const isSelected = selectedId === model.id;
                  return (
                    <tr
                      key={model.id}
                      onClick={() => setSelectedId(model.id)}
                      style={{
                        background: isSelected ? '#E0F7FC' : idx % 2 === 0 ? '#FFFFFF' : '#F8FAFC',
                        cursor: 'pointer',
                        borderBottom: '1px solid #E2E8F0',
                        borderLeft: isSelected ? '4px solid var(--infnet-cyan)' : '4px solid transparent',
                        transition: 'background 0.1s ease'
                      }}
                    >
                      <td style={{ padding: '5px 10px' }}>
                        <div style={{ fontWeight: isSelected ? 800 : 700, color: isSelected ? 'var(--infnet-dark-blue)' : '#1E293B' }}>
                          {model.name}
                        </div>
                      </td>
                      <td style={{ padding: '5px 8px', textAlign: 'right' }}>
                        <span style={{
                          fontWeight: 700,
                          color: model.top1 >= 80 ? '#15803D' : model.top1 >= 70 ? '#0284C7' : '#D97706'
                        }}>
                          {model.top1.toFixed(1)}%
                        </span>
                      </td>
                      <td style={{ padding: '5px 8px', textAlign: 'right', color: '#64748B', fontWeight: 600 }}>
                        {model.top5.toFixed(1)}%
                      </td>
                      <td style={{ padding: '5px 8px', textAlign: 'right', fontWeight: 700, color: '#334155' }}>
                        {model.params.toFixed(1)}M
                      </td>
                      <td style={{ padding: '5px 10px', textAlign: 'right', fontWeight: 700, color: '#64748B' }}>
                        {model.gflops.toFixed(1)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT: Selected Model Deep-Dive Card */}
        <div style={{
          background: '#FFFFFF',
          border: '1.5px solid var(--infnet-cyan)',
          borderRadius: '8px',
          padding: '12px 14px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div>
            {/* Header Badge & Title */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
              <div>
                <span className="badge badge-cyan" style={{ fontSize: '10px', marginBottom: '4px' }}>
                  {selectedModel.category}
                </span>
                <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '17px', fontWeight: 800, color: 'var(--infnet-dark-blue)', margin: 0 }}>
                  {selectedModel.name}
                </h3>
              </div>
              <span className="badge badge-green" style={{ fontSize: '10.5px' }}>
                {selectedModel.tag}
              </span>
            </div>

            {/* Description */}
            <p style={{ fontSize: '11.5px', color: 'var(--text-main)', lineHeight: 1.45, margin: '6px 0 10px 0' }}>
              {selectedModel.description}
            </p>

            {/* 4 Metric Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px', marginBottom: '10px' }}>
              <div style={{ background: '#F8FAFC', padding: '6px 4px', borderRadius: '6px', textAlign: 'center', border: '1px solid #E2E8F0' }}>
                <div style={{ fontSize: '9px', color: 'var(--text-muted)', fontWeight: 600 }}>Top-1 Acc</div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#15803D', marginTop: '2px' }}>
                  {selectedModel.top1}%
                </div>
              </div>

              <div style={{ background: '#F8FAFC', padding: '6px 4px', borderRadius: '6px', textAlign: 'center', border: '1px solid #E2E8F0' }}>
                <div style={{ fontSize: '9px', color: 'var(--text-muted)', fontWeight: 600 }}>Top-5 Acc</div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#0284C7', marginTop: '2px' }}>
                  {selectedModel.top5}%
                </div>
              </div>

              <div style={{ background: '#F8FAFC', padding: '6px 4px', borderRadius: '6px', textAlign: 'center', border: '1px solid #E2E8F0' }}>
                <div style={{ fontSize: '9px', color: 'var(--text-muted)', fontWeight: 600 }}>Parâmetros</div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--infnet-dark-blue)', marginTop: '2px' }}>
                  {selectedModel.params}M
                </div>
              </div>

              <div style={{ background: '#F8FAFC', padding: '6px 4px', borderRadius: '6px', textAlign: 'center', border: '1px solid #E2E8F0' }}>
                <div style={{ fontSize: '9px', color: 'var(--text-muted)', fontWeight: 600 }}>GFLOPs</div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#D97706', marginTop: '2px' }}>
                  {selectedModel.gflops}
                </div>
              </div>
            </div>

            {/* PyTorch TorchVision Call Snippet */}
            <div style={{ background: '#0F172A', borderRadius: '6px', padding: '8px 10px', color: '#F8FAFC', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '9.5px', color: '#94A3B8', marginBottom: '4px' }}>
                <Code2 size={12} color="#38BDF8" /> Chamada no PyTorch (Weights Enum):
              </div>
              <code style={{ fontFamily: 'var(--font-code)', fontSize: '10.5px', color: '#64D9EF', display: 'block', lineHeight: 1.4 }}>
                from torchvision.models import {selectedModel.torchName}, {selectedModel.weightsEnum.split('.')[0]}<br />
                model = {selectedModel.torchName}(weights={selectedModel.weightsEnum})
              </code>
            </div>
          </div>

          {/* Practical Recommendation Box */}
          <div style={{ background: '#EFF8FC', border: '1px solid #CDE6F5', borderRadius: '6px', padding: '8px 10px', fontSize: '11px', color: 'var(--infnet-dark-blue)' }}>
            <strong>💡 Recomendação de Uso:</strong> {selectedModel.idealFor}
          </div>
        </div>

      </div>
    </div>
  );
}
