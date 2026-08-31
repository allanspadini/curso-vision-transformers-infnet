import React, { useState } from 'react';
import { Eye, Target, Crosshair, Navigation, Grid } from 'lucide-react';
import MathView from '../MathView';

const TASKS = [
  {
    id: 'classification',
    title: '1. Classificação Simples',
    icon: <Eye size={16} />,
    tag: 'Uma imagem → Uma classe',
    question: 'O que está nesta imagem?',
    outputShape: '[Batch, Num_Classes]',
    loss: '\\mathcal{L}_{CE} = -\\sum y_i \\log(\\hat{y}_i)',
    description: 'Prevê uma distribuição de probabilidade global sobre classes discretas para a imagem inteira.',
    visualOverlay: (
      <div style={{ position: 'absolute', top: 12, left: 12, background: 'rgba(10,52,93,0.85)', color: '#FFFFFF', padding: '6px 12px', borderRadius: '6px', fontSize: '13px', fontWeight: 700, border: '1px solid #1BB5D8' }}>
        🏷️ Classe: Veículo Autônomo (98.4%)
      </div>
    )
  },
  {
    id: 'localization',
    title: '2. Classificação + Localização',
    icon: <Crosshair size={16} />,
    tag: 'Uma classe + 1 Bounding Box',
    question: 'O que é e onde está o objeto principal?',
    outputShape: '[Batch, 4 + Num_Classes]',
    loss: '\\mathcal{L} = \\mathcal{L}_{CE} + \\lambda \\mathcal{L}_{SmoothL1}(bbox, \\hat{bbox})',
    description: 'Dupla cabeça de saída: uma Softmax para a classe e 4 neurônios com regressão linear para coordenadas [x, y, w, h].',
    visualOverlay: (
      <>
        <div style={{
          position: 'absolute',
          top: '35%',
          left: '32%',
          width: '36%',
          height: '42%',
          border: '3px solid #1BB5D8',
          borderRadius: '4px',
          background: 'rgba(27, 181, 216, 0.15)',
          boxShadow: '0 0 12px rgba(27,181,216,0.6)'
        }}>
          <span style={{ position: 'absolute', top: -24, left: 0, background: '#1BB5D8', color: '#0A345D', fontSize: '11px', fontWeight: 800, padding: '2px 6px', borderRadius: '3px' }}>
            Carro: [x=0.32, y=0.35, w=0.36, h=0.42]
          </span>
        </div>
      </>
    )
  },
  {
    id: 'detection',
    title: '3. Detecção de Objetos (YOLO)',
    icon: <Target size={16} />,
    tag: 'Múltiplos objetos + Bboxes',
    question: 'Quais e onde estão todos os objetos?',
    outputShape: '[Batch, N_{âncoras}, (5 + Num_Classes)]',
    loss: '\\mathcal{L} = \\mathcal{L}_{box} + \\mathcal{L}_{obj} + \\mathcal{L}_{cls} \\quad (CIoU + BCE)',
    description: 'Gera centenas de caixas candidatas através de grades ou propostas de região, filtradas por Não-Supressão Máxima (NMS) e IoU.',
    visualOverlay: (
      <>
        {/* Box 1: Carro Central */}
        <div style={{ position: 'absolute', top: '35%', left: '32%', width: '36%', height: '42%', border: '2.5px solid #22C55E', background: 'rgba(34, 197, 94, 0.12)' }}>
          <span style={{ position: 'absolute', top: -20, left: 0, background: '#22C55E', color: '#FFFFFF', fontSize: '10px', fontWeight: 700, padding: '1px 5px' }}>
            Carro (0.96)
          </span>
        </div>
        {/* Box 2: Pedestre Direita */}
        <div style={{ position: 'absolute', top: '25%', right: '10%', width: '14%', height: '55%', border: '2.5px solid #EAB308', background: 'rgba(234, 179, 8, 0.12)' }}>
          <span style={{ position: 'absolute', top: -20, left: 0, background: '#EAB308', color: '#000', fontSize: '10px', fontWeight: 700, padding: '1px 5px' }}>
            Pedestre (0.91)
          </span>
        </div>
        {/* Box 3: Semáforo */}
        <div style={{ position: 'absolute', top: '10%', left: '8%', width: '10%', height: '30%', border: '2.5px solid #EC4899', background: 'rgba(236, 72, 153, 0.12)' }}>
          <span style={{ position: 'absolute', top: -20, left: 0, background: '#EC4899', color: '#FFFFFF', fontSize: '10px', fontWeight: 700, padding: '1px 5px' }}>
            Semáforo (0.88)
          </span>
        </div>
      </>
    )
  },
  {
    id: 'tracking',
    title: '4. Rastreamento (Tracking)',
    icon: <Navigation size={16} />,
    tag: 'Detecção + Associação Temporal',
    question: 'Para onde os objetos estão se movendo?',
    outputShape: 'ID Persistente + Trajetória [x_t, y_t]',
    loss: '\\text{DeepSORT} = \\text{Distância Mahalanobis (Kalman)} + \\text{Dist. Cosseno (ReID)}',
    description: 'Combina detecção frame a frame com Filtro de Kalman para previsão espacial e CNNs siamesas de Re-Identificação (ReID).',
    visualOverlay: (
      <>
        {/* Box Carro com rastro */}
        <div style={{ position: 'absolute', top: '35%', left: '32%', width: '36%', height: '42%', border: '2.5px solid #06B6D4' }}>
          <span style={{ position: 'absolute', top: -20, left: 0, background: '#06B6D4', color: '#FFFFFF', fontSize: '10px', fontWeight: 800, padding: '1px 5px' }}>
            ID #102 [Carro] • 45 km/h
          </span>
          {/* Motion trail line */}
          <div style={{ position: 'absolute', bottom: '50%', left: '-40px', width: '40px', height: '2px', background: 'repeating-linear-gradient(90deg, #06B6D4, #06B6D4 4px, transparent 4px, transparent 8px)' }}></div>
        </div>
        {/* Box Pedestre com rastro */}
        <div style={{ position: 'absolute', top: '25%', right: '10%', width: '14%', height: '55%', border: '2.5px solid #F97316' }}>
          <span style={{ position: 'absolute', top: -20, left: 0, background: '#F97316', color: '#FFFFFF', fontSize: '10px', fontWeight: 800, padding: '1px 5px' }}>
            ID #405 [Pedestre]
          </span>
          <div style={{ position: 'absolute', bottom: '10px', right: '-30px', width: '30px', height: '2px', background: '#F97316' }}></div>
        </div>
      </>
    )
  },
  {
    id: 'segmentation',
    title: '5. Segmentação Semântica',
    icon: <Grid size={16} />,
    tag: 'Classificação por Pixel (Dense)',
    question: 'A qual classe pertence exatamente cada pixel?',
    outputShape: '[Batch, Num_Classes, H, W]',
    loss: '\\mathcal{L}_{PixelCE} = -\\frac{1}{HW}\\sum_{i,j} \\log(p_{i,j,c})',
    description: 'Arquiteturas Encoder-Decoder (ex: U-Net, DeepLabv3, SegNet) que reconstroem a resolução original com skip connections de alta resolução.',
    visualOverlay: (
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', display: 'flex', flexDirection: 'column' }}>
        {/* Sky / background */}
        <div style={{ height: '30%', background: 'rgba(59, 130, 246, 0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1E3A8A', fontWeight: 700, fontSize: '11px' }}>
          Céu [Classe 1]
        </div>
        {/* Road and objects */}
        <div style={{ height: '70%', background: 'rgba(107, 114, 128, 0.3)', position: 'relative' }}>
          {/* Car mask */}
          <div style={{ position: 'absolute', top: '10%', left: '32%', width: '36%', height: '60%', background: 'rgba(239, 68, 68, 0.45)', borderRadius: '12px', border: '2px dashed #DC2626', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF', fontWeight: 800, fontSize: '12px' }}>
            Máscara Pixel [Veículo]
          </div>
          {/* Sidewalk mask */}
          <div style={{ position: 'absolute', bottom: 0, right: 0, width: '30%', height: '80%', background: 'rgba(16, 185, 129, 0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#064E3B', fontWeight: 700, fontSize: '11px' }}>
            Calçada [Classe 4]
          </div>
          <span style={{ position: 'absolute', bottom: 10, left: 10, background: 'rgba(0,0,0,0.6)', color: '#FFF', padding: '2px 8px', borderRadius: '4px', fontSize: '10px' }}>
            Pista [Classe 2]
          </span>
        </div>
      </div>
    )
  }
];

export default function VisionTasksShowcase() {
  const [selectedTask, setSelectedTask] = useState('classification');
  const task = TASKS.find(t => t.id === selectedTask) || TASKS[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', height: '100%' }}>
      {/* Task Selection Tabs */}
      <div style={{ display: 'flex', gap: '6px', background: '#EDF5FA', padding: '6px', borderRadius: '8px', border: '1px solid #D0E3F0' }}>
        {TASKS.map(t => (
          <button
            key={t.id}
            onClick={() => setSelectedTask(t.id)}
            style={{
              flex: 1,
              padding: '6px 8px',
              borderRadius: '6px',
              border: '1px solid',
              borderColor: selectedTask === t.id ? 'var(--infnet-cyan)' : 'transparent',
              background: selectedTask === t.id ? '#FFFFFF' : 'transparent',
              color: selectedTask === t.id ? 'var(--infnet-dark-blue)' : 'var(--text-muted)',
              fontSize: '11.5px',
              fontWeight: selectedTask === t.id ? 700 : 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              boxShadow: selectedTask === t.id ? 'var(--shadow-sm)' : 'none',
              transition: 'all 0.15s ease'
            }}
          >
            {t.icon}
            <span>{t.title.split('. ')[1]}</span>
          </button>
        ))}
      </div>

      {/* Main Split Demo Area */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '14px', flex: 1, minHeight: 0 }}>
        {/* Simulated Camera Viewport */}
        <div style={{
          position: 'relative',
          background: 'linear-gradient(180deg, #1E293B 0%, #0F172A 100%)',
          borderRadius: '8px',
          border: '1px solid #334155',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          {/* Simulated Street Scene Background */}
          <div style={{ position: 'absolute', inset: 0, opacity: 0.15, background: 'radial-gradient(circle at 50% 50%, #60A5FA 0%, transparent 80%)' }}></div>
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '45%', background: '#111827', borderTop: '2px solid #374151' }}></div>
          <div style={{ position: 'absolute', bottom: 0, left: '48%', width: '4%', height: '45%', borderLeft: '2px dashed #9CA3AF' }}></div>

          {/* Dynamic Task Overlay */}
          {task.visualOverlay}

          {/* Camera Info HUD */}
          <div style={{ position: 'relative', zIndex: 5, padding: '10px 14px', display: 'flex', justifyContent: 'space-between', color: '#94A3B8', fontSize: '10.5px' }}>
            <span>CAM_01 • 1920x1080 @ 60 FPS</span>
            <span>MODO: {task.tag.toUpperCase()}</span>
          </div>

          <div style={{ position: 'relative', zIndex: 5, padding: '8px 14px', background: 'rgba(0,0,0,0.6)', color: '#CBD5E1', fontSize: '11px', display: 'flex', justifyContent: 'space-between' }}>
            <span>❓ Pergunta: <strong>{task.question}</strong></span>
          </div>
        </div>

        {/* Technical Specification Card */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid var(--border-light)',
          borderRadius: '8px',
          padding: '14px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '16px', color: 'var(--infnet-dark-blue)', margin: 0 }}>
                {task.title}
              </h3>
              <span className="badge badge-cyan">{task.tag}</span>
            </div>

            <p style={{ fontSize: '12.5px', color: 'var(--text-main)', lineHeight: 1.5, marginBottom: '10px' }}>
              {task.description}
            </p>
          </div>

          <div>
            {/* Output Shape Box */}
            <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '8px 10px', marginBottom: '8px' }}>
              <div style={{ fontSize: '10.5px', fontWeight: 600, color: 'var(--text-muted)' }}>Formato do Tensor de Saída:</div>
              <div style={{ fontFamily: 'var(--font-code)', fontSize: '12px', fontWeight: 700, color: 'var(--infnet-dark-blue)', marginTop: '2px' }}>
                {task.outputShape}
              </div>
            </div>

            {/* Loss Function Box */}
            <div style={{ background: '#F0FDF4', border: '1px solid #DCFCE7', borderRadius: '6px', padding: '8px 10px' }}>
              <div style={{ fontSize: '10.5px', fontWeight: 600, color: '#166534' }}>Função de Custo Típica (Loss):</div>
              <div style={{ fontSize: '11.5px', color: '#14532D', marginTop: '3px' }}>
                <MathView math={task.loss} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
