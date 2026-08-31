import React, { useState } from 'react';
import { Lock, Unlock, Zap, Copy, Check } from 'lucide-react';

export default function TransferLearningSimulator() {
  const [strategy, setStrategy] = useState('feature_extraction'); // 'feature_extraction' | 'fine_tuning_partial' | 'fine_tuning_full'
  const [numClasses, setNumClasses] = useState(2);
  const [copied, setCopied] = useState(false);

  const isLayerFrozen = (layerName) => {
    if (strategy === 'fine_tuning_full') return false;
    if (strategy === 'fine_tuning_partial') {
      return layerName !== 'layer4' && layerName !== 'fc';
    }
    // feature extraction
    return layerName !== 'fc';
  };

  const getCodeSnippet = () => {
    if (strategy === 'feature_extraction') {
      return `import torch
import torch.nn as nn
from torchvision.models import resnet34, ResNet34_Weights

# 1. Carrega modelo pré-treinado no ImageNet-1k
weights = ResNet34_Weights.DEFAULT
model = resnet34(weights=weights)

# 2. Congela todos os parâmetros do backbone
for param in model.parameters():
    param.requires_grad = False

# 3. Substitui a cabeça de classificação (fc)
in_features = model.fc.in_features  # 512
model.fc = nn.Linear(in_features, ${numClasses})

# 4. Apenas os pesos de model.fc serão atualizados no otimizador
optimizer = torch.optim.Adam(model.fc.parameters(), lr=1e-3)`;
    } else if (strategy === 'fine_tuning_partial') {
      return `import torch
import torch.nn as nn
from torchvision.models import resnet34, ResNet34_Weights

weights = ResNet34_Weights.DEFAULT
model = resnet34(weights=weights)

# Congela camadas iniciais (conv1 até layer3)
for name, param in model.named_parameters():
    if not (name.startswith('layer4') or name.startswith('fc')):
        param.requires_grad = False

# Substitui a cabeça de classificação
model.fc = nn.Linear(model.fc.in_features, ${numClasses})

# Otimizador com taxas de aprendizado diferenciais
optimizer = torch.optim.Adam([
    {'params': model.layer4.parameters(), 'lr': 1e-5},
    {'params': model.fc.parameters(), 'lr': 1e-3}
])`;
    } else {
      return `import torch
import torch.nn as nn
from torchvision.models import resnet34, ResNet34_Weights

weights = ResNet34_Weights.DEFAULT
model = resnet34(weights=weights)

# Substitui o classificador final
model.fc = nn.Linear(model.fc.in_features, ${numClasses})

# Fine-tuning completo: todos os parâmetros recebem gradiente
optimizer = torch.optim.Adam([
    {'params': [p for n, p in model.named_parameters() if 'fc' not in n], 'lr': 1e-5},
    {'params': model.fc.parameters(), 'lr': 1e-3}
])`;
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getCodeSnippet());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const layersList = [
    { name: 'conv1 + bn1', type: 'Camada de Entrada (Low-level edges/colors)', dim: '64 filters' },
    { name: 'layer1 (3 blocks)', type: 'Texturas e Padrões Básicos', dim: '64 channels' },
    { name: 'layer2 (4 blocks)', type: 'Motivos e Partes Simples', dim: '128 channels' },
    { name: 'layer3 (6 blocks)', type: 'Estruturas de Objetos Complexos', dim: '256 channels' },
    { name: 'layer4 (3 blocks)', type: 'Semântica de Alto Nível / Classes', dim: '512 channels' },
    { name: 'fc (Classifier)', type: `Nova Cabeça Customizada (${numClasses} classes)`, dim: `512 → ${numClasses}` }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', height: '100%' }}>
      {/* Strategy selector and class slider */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#EDF5FA',
        padding: '8px 14px',
        borderRadius: '8px',
        border: '1px solid #D0E3F0'
      }}>
        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            onClick={() => setStrategy('feature_extraction')}
            style={{
              padding: '5px 10px',
              borderRadius: '6px',
              border: '1px solid',
              borderColor: strategy === 'feature_extraction' ? 'var(--infnet-cyan)' : '#CBD5E1',
              background: strategy === 'feature_extraction' ? '#E0F7FC' : '#FFFFFF',
              color: strategy === 'feature_extraction' ? 'var(--infnet-dark-blue)' : 'var(--text-muted)',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            🔒 Feature Extraction (Backbone Fixo)
          </button>

          <button
            onClick={() => setStrategy('fine_tuning_partial')}
            style={{
              padding: '5px 10px',
              borderRadius: '6px',
              border: '1px solid',
              borderColor: strategy === 'fine_tuning_partial' ? 'var(--infnet-cyan)' : '#CBD5E1',
              background: strategy === 'fine_tuning_partial' ? '#E0F7FC' : '#FFFFFF',
              color: strategy === 'fine_tuning_partial' ? 'var(--infnet-dark-blue)' : 'var(--text-muted)',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            ⚡ Fine-Tuning Parcial (Layer4 + FC)
          </button>

          <button
            onClick={() => setStrategy('fine_tuning_full')}
            style={{
              padding: '5px 10px',
              borderRadius: '6px',
              border: '1px solid',
              borderColor: strategy === 'fine_tuning_full' ? 'var(--infnet-cyan)' : '#CBD5E1',
              background: strategy === 'fine_tuning_full' ? '#E0F7FC' : '#FFFFFF',
              color: strategy === 'fine_tuning_full' ? 'var(--infnet-dark-blue)' : 'var(--text-muted)',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            🔥 Fine-Tuning Completo
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--infnet-dark-blue)' }}>
          <span>Classes de Saída: <strong>{numClasses}</strong></span>
          <select
            value={numClasses}
            onChange={(e) => setNumClasses(Number(e.target.value))}
            style={{
              padding: '4px 8px',
              borderRadius: '4px',
              border: '1px solid #CBD5E1',
              background: '#FFFFFF',
              fontSize: '12px',
              fontWeight: 600
            }}
          >
            <option value={2}>2 (Binário: Ex. Cão vs Gato)</option>
            <option value={10}>10 (Ex. CIFAR-10)</option>
            <option value={100}>100 (Ex. Produtos Varejo)</option>
            <option value={1000}>1000 (ImageNet Original)</option>
          </select>
        </div>
      </div>

      {/* Main Split View: Visual Network Architecture + Generated Code */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '12px', flex: 1, minHeight: 0 }}>
        {/* Visual Network Hierarchy */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid var(--border-light)',
          borderRadius: '8px',
          padding: '12px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
              Estado dos Parâmetros no PyTorch
            </span>
            <span className="badge badge-blue">ResNet-34 Backbone</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {layersList.map((layer) => {
              const frozen = isLayerFrozen(layer.name.split(' ')[0]);
              const isHead = layer.name.startsWith('fc');
              return (
                <div
                  key={layer.name}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '6px 10px',
                    borderRadius: '6px',
                    border: '1px solid',
                    borderColor: isHead ? '#1BB5D8' : frozen ? '#E2E8F0' : '#86EFAC',
                    background: isHead ? '#EFF8FC' : frozen ? '#F8FAFC' : '#F0FDF4',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {frozen ? (
                      <Lock size={14} color="#94A3B8" />
                    ) : (
                      <Unlock size={14} color={isHead ? '#0284C7' : '#16A34A'} />
                    )}
                    <div>
                      <div style={{ fontSize: '12px', fontWeight: 700, color: isHead ? '#0284C7' : 'var(--infnet-dark-blue)' }}>
                        {layer.name}
                      </div>
                      <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{layer.type}</div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <span style={{
                      fontSize: '10.5px',
                      fontWeight: 600,
                      color: frozen ? '#64748B' : isHead ? '#0369A1' : '#15803D',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      background: frozen ? '#E2E8F0' : isHead ? '#BAE6FD' : '#DCFCE7'
                    }}>
                      {frozen ? 'requires_grad = False' : 'requires_grad = True'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '6px' }}>
            💡 <em>Dica:</em> Bloquear camadas iniciais preserva detectores de borda universais e reduz o tempo de treinamento em mais de 70%.
          </div>
        </div>

        {/* Dynamic Code Display */}
        <div style={{
          background: '#091C30',
          borderRadius: '8px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '12px',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#64D9EF', fontFamily: 'var(--font-code)' }}>
              script_transfer_learning.py
            </span>
            <button
              onClick={handleCopy}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '4px',
                padding: '3px 8px',
                color: '#FFFFFF',
                fontSize: '10.5px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                cursor: 'pointer'
              }}
            >
              {copied ? <Check size={12} color="#4ADE80" /> : <Copy size={12} />}
              {copied ? 'Copiado!' : 'Copiar'}
            </button>
          </div>

          <pre style={{
            flex: 1,
            margin: 0,
            fontFamily: 'var(--font-code)',
            fontSize: '11px',
            lineHeight: 1.4,
            color: '#E2E8F0',
            overflowY: 'auto',
            whiteSpace: 'pre-wrap'
          }}>
            {getCodeSnippet()}
          </pre>
        </div>
      </div>
    </div>
  );
}
