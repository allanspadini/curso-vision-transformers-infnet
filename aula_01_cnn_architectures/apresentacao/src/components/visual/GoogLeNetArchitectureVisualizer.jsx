import React, { useState } from 'react';
import { Layers, Zap, Info, CheckCircle2, ShieldCheck, ArrowRight, HelpCircle } from 'lucide-react';
import MathView from '../MathView';

const STAGE_DATA = {
  stem: {
    title: '1. Stem de Entrada (Camadas Iniciais)',
    badge: 'badge-blue',
    desc: 'Processamento convolucional clássico (7×7 com stride 2 e Max Pooling) para reduzir rapidamente a resolução espacial de 224×224 para 28×28 antes de entrar nos blocos Inception.',
    details: [
      'Conv 7×7 (stride 2) + MaxPool 3×3 (stride 2) → Redução espacial de 4x.',
      'Convoluções adicionais 1×1 e 3×3 preparam 192 canais para o primeiro módulo Inception.',
      'Local Response Normalization (LRN): normalização lateral histórica usada na época.'
    ]
  },
  inception3: {
    title: '2. Estágio Inception 3 (Módulos 3a e 3b)',
    badge: 'badge-yellow',
    desc: 'Primeiro par de módulos Inception operando na resolução espacial de 28×28. Os módulos 3a e 3b aumentam a capacidade semântica de 192 para 480 canais.',
    details: [
      'Inception 3a: Entrada 192 canais → Saída Depth Concat com 256 canais.',
      'Inception 3b: Entrada 256 canais → Saída Depth Concat com 480 canais.',
      'Seguido por MaxPool 3×3 (stride 2) que reduz a resolução espacial para 14×14.'
    ]
  },
  inception4: {
    title: '3. Estágio Inception 4 (Módulos 4a até 4e)',
    badge: 'badge-yellow',
    desc: 'O coração do GoogLeNet: 5 módulos Inception empilhados em resolução 14×14 com 512 a 832 canais, capturando representações de nível intermediário a alto.',
    details: [
      'Inception 4a, 4b, 4c, 4d e 4e: Extração massiva de atributos multi-escala.',
      'Classificadores Auxiliares: Nos módulos 4a e 4d, a rede possuía saídas auxiliares com perda ponderada (0.3) para injetar gradiente no meio da rede.',
      'Seguido por MaxPool 3×3 (stride 2) que reduz a resolução para 7×7.'
    ]
  },
  inception5: {
    title: '4. Estágio Inception 5 (Módulos 5a e 5b)',
    badge: 'badge-yellow',
    desc: 'Últimos 2 módulos Inception operando em resolução 7×7, gerando os 1024 mapas de características de mais alto nível semântico.',
    details: [
      'Inception 5a: Produz 832 canais na resolução 7×7.',
      'Inception 5b: Produz 1024 canais ricos em semântica global de objetos.'
    ]
  },
  head: {
    title: '5. Head Classificador: Global Average Pooling',
    badge: 'badge-green',
    desc: 'A grande revolução em eficiência: substituiu as pesadas camadas densas (FC) da AlexNet por Global Average Pooling (GAP) de 7×7 para 1×1.',
    details: [
      'Global Avg Pool: Transforma 7×7×1024 em um único vetor 1D de 1024 características (zero parâmetros adicionais).',
      'Dropout (40%): Regularização antes da camada linear final.',
      'Linear + Softmax: Apenas 1024 × 1000 = ~1M de pesos para classificar as 1000 classes do ImageNet.'
    ]
  }
};

export default function GoogLeNetArchitectureVisualizer() {
  const [selectedStage, setSelectedStage] = useState('inception3');
  const stage = STAGE_DATA[selectedStage] || STAGE_DATA.inception3;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.45fr 1fr', gap: '16px', height: '100%', alignItems: 'stretch' }}>
      {/* Left Column: Full GoogLeNet Macro Architecture SVG */}
      <div style={{
        background: '#FFFFFF',
        border: '1px solid var(--border-light)',
        borderRadius: '10px',
        padding: '10px 14px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--infnet-dark-blue)' }}>
              GoogLeNet: Arquitetura Completa (22 Camadas)
            </span>
            <span className="badge badge-purple">9 Módulos Inception</span>
          </div>
          <span style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>
            Clique nas seções para explorar
          </span>
        </div>

        {/* SVG Container representing Figure 12-15 */}
        <div style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: '#FAFAFA',
          border: '1px solid #E2E8F0',
          borderRadius: '8px',
          padding: '4px',
          overflow: 'hidden'
        }}>
          <svg viewBox="0 0 540 375" style={{ width: '100%', height: '100%', maxHeight: '315px' }}>
            <defs>
              <marker id="arrow-blk" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#0F172A" />
              </marker>
              <marker id="arrow-act" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#0284C7" />
              </marker>
            </defs>

            {/* Snake Route Connecting Line 1 -> 2 */}
            <path
              d="M 80 50 L 80 32 L 175 32 L 175 348 L 260 348 L 260 340"
              fill="none"
              stroke="#000000"
              strokeWidth="2"
              markerEnd="url(#arrow-blk)"
            />

            {/* Snake Route Connecting Line 2 -> 3 */}
            <path
              d="M 260 50 L 260 32 L 355 32 L 355 348 L 440 348 L 440 340"
              fill="none"
              stroke="#000000"
              strokeWidth="2"
              markerEnd="url(#arrow-blk)"
            />

            {/* Output Arrow at Top of Column 3 */}
            <line x1="440" y1="50" x2="440" y2="15" stroke="#000000" strokeWidth="2.5" markerEnd="url(#arrow-blk)" />

            {/* ======================================================== */}
            {/* COLUMN 1: STEM (Input, Initial Convs, LRN, Pool)         */}
            {/* ======================================================== */}
            <g onClick={() => setSelectedStage('stem')} style={{ cursor: 'pointer' }}>
              {/* Input text at bottom */}
              <text x="80" y="365" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0F172A">Input</text>
              <line x1="80" y1="352" x2="80" y2="330" stroke="#000000" strokeWidth="2" markerEnd="url(#arrow-blk)" />

              {/* Conv 7x7 */}
              <rect x="25" y="292" width="110" height="34" rx="6" fill="#93C5FD" stroke="#000000" strokeWidth="1.8" />
              <text x="80" y="306" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#0F172A">Convolution</text>
              <text x="80" y="318" textAnchor="middle" fontSize="9" fontWeight="600" fill="#0F172A">64, 7×7+2(S)</text>

              {/* Max Pool */}
              <rect x="25" y="252" width="110" height="34" rx="6" fill="#FECDD3" stroke="#000000" strokeWidth="1.8" />
              <text x="80" y="266" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#0F172A">Max pool</text>
              <text x="80" y="278" textAnchor="middle" fontSize="9" fontWeight="600" fill="#0F172A">64, 3×3+2(S)</text>

              {/* LRN 1 */}
              <rect x="25" y="212" width="110" height="34" rx="6" fill="#15803D" stroke="#000000" strokeWidth="1.8" />
              <text x="80" y="226" textAnchor="middle" fontSize="9" fontWeight="700" fill="#FFFFFF">Local response</text>
              <text x="80" y="238" textAnchor="middle" fontSize="9" fontWeight="700" fill="#FFFFFF">normalization</text>

              {/* Conv 1x1 */}
              <rect x="25" y="172" width="110" height="34" rx="6" fill="#93C5FD" stroke="#000000" strokeWidth="1.8" />
              <text x="80" y="186" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#0F172A">Convolution</text>
              <text x="80" y="198" textAnchor="middle" fontSize="9" fontWeight="600" fill="#0F172A">64, 1×1+1(S)</text>

              {/* Conv 3x3 */}
              <rect x="25" y="132" width="110" height="34" rx="6" fill="#93C5FD" stroke="#000000" strokeWidth="1.8" />
              <text x="80" y="146" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#0F172A">Convolution</text>
              <text x="80" y="158" textAnchor="middle" fontSize="9" fontWeight="600" fill="#0F172A">192, 3×3+1(S)</text>

              {/* LRN 2 */}
              <rect x="25" y="92" width="110" height="34" rx="6" fill="#15803D" stroke="#000000" strokeWidth="1.8" />
              <text x="80" y="106" textAnchor="middle" fontSize="9" fontWeight="700" fill="#FFFFFF">Local response</text>
              <text x="80" y="118" textAnchor="middle" fontSize="9" fontWeight="700" fill="#FFFFFF">normalization</text>

              {/* Max Pool 192 */}
              <rect x="25" y="52" width="110" height="34" rx="6" fill="#FECDD3" stroke="#000000" strokeWidth="1.8" />
              <text x="80" y="66" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#0F172A">Max pool</text>
              <text x="80" y="78" textAnchor="middle" fontSize="9" fontWeight="600" fill="#0F172A">192, 3×3+2(S)</text>
            </g>

            {/* ======================================================== */}
            {/* COLUMN 2: INCEPTION STAGE 3 & 4 (3a, 3b, 4a, 4b, 4c, 4d) */}
            {/* ======================================================== */}
            {/* Inception 3a */}
            <g onClick={() => setSelectedStage('inception3')} style={{ cursor: 'pointer' }}>
              <rect x="205" y="292" width="110" height="34" rx="6" fill="#FEF9C3" stroke="#000000" strokeWidth="1.8" />
              <text x="260" y="306" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#0F172A">64 128 32 32</text>
              <text x="260" y="318" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#0F172A">✇ 96 16 (3a)</text>
            </g>

            {/* Inception 3b */}
            <g onClick={() => setSelectedStage('inception3')} style={{ cursor: 'pointer' }}>
              <rect x="205" y="252" width="110" height="34" rx="6" fill="#FEF9C3" stroke="#000000" strokeWidth="1.8" />
              <text x="260" y="266" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#0F172A">128 192 96 64</text>
              <text x="260" y="278" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#0F172A">✇ 128 32 (3b)</text>
            </g>

            {/* Max Pool 480 */}
            <g onClick={() => setSelectedStage('inception4')} style={{ cursor: 'pointer' }}>
              <rect x="205" y="212" width="110" height="34" rx="6" fill="#FECDD3" stroke="#000000" strokeWidth="1.8" />
              <text x="260" y="226" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#0F172A">Max pool</text>
              <text x="260" y="238" textAnchor="middle" fontSize="9" fontWeight="600" fill="#0F172A">480, 3×3+2(S)</text>
            </g>

            {/* Inception 4a */}
            <g onClick={() => setSelectedStage('inception4')} style={{ cursor: 'pointer' }}>
              <rect x="205" y="172" width="110" height="34" rx="6" fill="#FEF9C3" stroke="#000000" strokeWidth="1.8" />
              <text x="260" y="186" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#0F172A">192 208 48 64</text>
              <text x="260" y="198" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#0F172A">✇ 96 16 (4a)</text>
            </g>

            {/* Inception 4b */}
            <g onClick={() => setSelectedStage('inception4')} style={{ cursor: 'pointer' }}>
              <rect x="205" y="132" width="110" height="34" rx="6" fill="#FEF9C3" stroke="#000000" strokeWidth="1.8" />
              <text x="260" y="146" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#0F172A">160 224 64 64</text>
              <text x="260" y="158" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#0F172A">✇ 112 24 (4b)</text>
            </g>

            {/* Inception 4c */}
            <g onClick={() => setSelectedStage('inception4')} style={{ cursor: 'pointer' }}>
              <rect x="205" y="92" width="110" height="34" rx="6" fill="#FEF9C3" stroke="#000000" strokeWidth="1.8" />
              <text x="260" y="106" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#0F172A">128 256 64 64</text>
              <text x="260" y="118" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#0F172A">✇ 128 24 (4c)</text>
            </g>

            {/* Inception 4d */}
            <g onClick={() => setSelectedStage('inception4')} style={{ cursor: 'pointer' }}>
              <rect x="205" y="52" width="110" height="34" rx="6" fill="#FEF9C3" stroke="#000000" strokeWidth="1.8" />
              <text x="260" y="66" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#0F172A">112 288 64 64</text>
              <text x="260" y="78" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#0F172A">✇ 144 32 (4d)</text>
            </g>

            {/* ======================================================== */}
            {/* COLUMN 3: INCEPTION 4e, 5a, 5b & CLASSIFIER HEAD         */}
            {/* ======================================================== */}
            {/* Inception 4e */}
            <g onClick={() => setSelectedStage('inception4')} style={{ cursor: 'pointer' }}>
              <rect x="385" y="292" width="110" height="34" rx="6" fill="#FEF9C3" stroke="#000000" strokeWidth="1.8" />
              <text x="440" y="306" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#0F172A">256 320 128 128</text>
              <text x="440" y="318" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#0F172A">✇ 160 32 (4e)</text>
            </g>

            {/* Max Pool 832 */}
            <g onClick={() => setSelectedStage('inception5')} style={{ cursor: 'pointer' }}>
              <rect x="385" y="252" width="110" height="34" rx="6" fill="#FECDD3" stroke="#000000" strokeWidth="1.8" />
              <text x="440" y="266" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#0F172A">Max pool</text>
              <text x="440" y="278" textAnchor="middle" fontSize="9" fontWeight="600" fill="#0F172A">832, 3×3+2(S)</text>
            </g>

            {/* Inception 5a */}
            <g onClick={() => setSelectedStage('inception5')} style={{ cursor: 'pointer' }}>
              <rect x="385" y="212" width="110" height="34" rx="6" fill="#FEF9C3" stroke="#000000" strokeWidth="1.8" />
              <text x="440" y="226" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#0F172A">256 320 128 128</text>
              <text x="440" y="238" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#0F172A">✇ 160 32 (5a)</text>
            </g>

            {/* Inception 5b */}
            <g onClick={() => setSelectedStage('inception5')} style={{ cursor: 'pointer' }}>
              <rect x="385" y="172" width="110" height="34" rx="6" fill="#FEF9C3" stroke="#000000" strokeWidth="1.8" />
              <text x="440" y="186" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#0F172A">384 384 128 128</text>
              <text x="440" y="198" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#0F172A">✇ 192 48 (5b)</text>
            </g>

            {/* Global Avg Pool */}
            <g onClick={() => setSelectedStage('head')} style={{ cursor: 'pointer' }}>
              <rect x="385" y="132" width="110" height="34" rx="6" fill="#FECDD3" stroke="#000000" strokeWidth="1.8" />
              <text x="440" y="146" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#0F172A">Global avg pool</text>
              <text x="440" y="158" textAnchor="middle" fontSize="9" fontWeight="600" fill="#0F172A">1024</text>
            </g>

            {/* Dropout 40% */}
            <g onClick={() => setSelectedStage('head')} style={{ cursor: 'pointer' }}>
              <rect x="385" y="92" width="110" height="34" rx="6" fill="#15803D" stroke="#000000" strokeWidth="1.8" />
              <text x="440" y="112" textAnchor="middle" fontSize="10" fontWeight="700" fill="#FFFFFF">Dropout 40%</text>
            </g>

            {/* Fully Connected */}
            <g onClick={() => setSelectedStage('head')} style={{ cursor: 'pointer' }}>
              <rect x="385" y="52" width="110" height="34" rx="6" fill="#93C5FD" stroke="#000000" strokeWidth="1.8" />
              <text x="440" y="66" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#0F172A">Fully connected</text>
              <text x="440" y="78" textAnchor="middle" fontSize="9" fontWeight="600" fill="#0F172A">1000 units</text>
            </g>

            {/* Softmax Output */}
            <g onClick={() => setSelectedStage('head')} style={{ cursor: 'pointer' }}>
              <rect x="385" y="12" width="110" height="34" rx="6" fill="#FED7AA" stroke="#000000" strokeWidth="1.8" />
              <text x="440" y="32" textAnchor="middle" fontSize="11" fontWeight="800" fill="#0F172A">Softmax</text>
            </g>
          </svg>
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '10.5px', marginTop: '4px', color: 'var(--text-muted)' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
              <span style={{ width: '9px', height: '9px', background: '#93C5FD', borderRadius: '2px', border: '1px solid #000' }} />
              Conv
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
              <span style={{ width: '9px', height: '9px', background: '#FECDD3', borderRadius: '2px', border: '1px solid #000' }} />
              Pool
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
              <span style={{ width: '9px', height: '9px', background: '#FEF9C3', borderRadius: '2px', border: '1px solid #000' }} />
              Inception
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
              <span style={{ width: '9px', height: '9px', background: '#15803D', borderRadius: '2px', border: '1px solid #000' }} />
              Norm/Drop
            </span>
          </div>
          <span style={{ fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
            ✇ = Módulo Inception (9 blocos no total)
          </span>
        </div>
      </div>

      {/* Right Column: Stage Details & Architectural Highlights */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'space-between' }}>
        {/* Active Stage Details Card */}
        <div style={{
          background: '#FFFFFF',
          border: '1.5px solid var(--infnet-cyan)',
          borderRadius: '10px',
          padding: '14px 16px',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
            <div>
              <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--infnet-dark-blue)' }}>
                {stage.title}
              </span>
            </div>
            <span className={`badge ${stage.badge}`}>
              Seção Ativa
            </span>
          </div>

          <p style={{ fontSize: '11.5px', color: 'var(--text-main)', margin: '4px 0 8px 0', lineHeight: 1.4 }}>
            {stage.desc}
          </p>

          <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '8px 10px' }}>
            <ul style={{ margin: 0, paddingLeft: '14px', fontSize: '11px', color: 'var(--text-main)', lineHeight: 1.45 }}>
              {stage.details.map((item, idx) => (
                <li key={idx} style={{ marginBottom: '3px' }}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Global Average Pooling vs Dense Layers */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ background: '#FFFFFF', border: '1px solid var(--border-light)', borderRadius: '8px', padding: '9px 12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
              <CheckCircle2 size={14} color="#15803D" />
              <span style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
                Eliminação das Camadas Densas (GAP)
              </span>
            </div>
            <div style={{ fontSize: '10.5px', color: 'var(--text-muted)', lineHeight: 1.35 }}>
              A AlexNet gastava 58M de pesos nas camadas FC. O GoogLeNet substituiu tudo por Global Average Pooling, usando apenas 1 camada linear no final.
            </div>
          </div>

          <div style={{ background: '#FFFFFF', border: '1px solid var(--border-light)', borderRadius: '8px', padding: '9px 12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
              <Zap size={14} color="#0284C7" />
              <span style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
                Classificadores Auxiliares (Auxiliary Loss)
              </span>
            </div>
            <div style={{ fontSize: '10.5px', color: 'var(--text-muted)', lineHeight: 1.35 }}>
              Em 4a e 4d, saídas intermediárias injetavam gradiente adicional no treino para vencer o desvanecimento em 22 camadas.
            </div>
          </div>
        </div>

        {/* Bottom Takeaway */}
        <div style={{ background: '#EFF8FC', border: '1px solid #CDE6F5', borderRadius: '6px', padding: '8px 10px', fontSize: '11px', color: 'var(--infnet-dark-blue)' }}>
          🏗️ <strong>Visão Macro:</strong> A rede inteira empilha <strong>9 módulos Inception</strong> em 3 resoluções ($28\times 28 \to 14\times 14 \to 7\times 7$), totalizando apenas <strong>6.8M parâmetros</strong>.
        </div>
      </div>
    </div>
  );
}
