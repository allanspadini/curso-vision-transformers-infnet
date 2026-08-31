import React, { useState } from 'react';
import MathView from '../MathView';
import { Layers, ArrowRight, Zap, CheckCircle2, RefreshCw, Eye } from 'lucide-react';

export default function DepthwiseSeparableDiagram() {
  const [activeStep, setActiveStep] = useState('all'); // 'all', 'depthwise', 'pointwise'

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.35fr', gap: '16px', height: '100%', alignItems: 'stretch' }}>
      
      {/* ========================================================= */}
      {/* LEFT CARD: Standard 3D Convolution                        */}
      {/* ========================================================= */}
      <div style={{
        background: '#FFFFFF',
        border: '1.5px solid #CBD5E1',
        borderRadius: '10px',
        padding: '12px 14px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--infnet-dark-blue)' }}>
              1. Convolução Padrão 3D
            </span>
            <span className="badge badge-orange">Acoplado (Pesado)</span>
          </div>

          {/* Visual SVG Diagram for Standard Conv */}
          <div style={{
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: '8px',
            padding: '8px 4px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '8px'
          }}>
            <svg viewBox="0 0 280 135" style={{ width: '100%', height: '130px' }}>
              <defs>
                <marker id="arr-orange" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                  <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#EA580C" />
                </marker>
                <linearGradient id="vol-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#818CF8" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#C084FC" stopOpacity="0.8" />
                </linearGradient>
              </defs>

              {/* Input 3D Volume */}
              <g>
                <text x="45" y="16" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#475569">Entrada (H × W × C)</text>
                {/* Channel 3 */}
                <rect x="25" y="24" width="40" height="40" rx="3" fill="#E0E7FF" stroke="#6366F1" strokeWidth="1.2" />
                {/* Channel 2 */}
                <rect x="20" y="32" width="40" height="40" rx="3" fill="#BAE6FD" stroke="#0284C7" strokeWidth="1.2" />
                {/* Channel 1 */}
                <rect x="15" y="40" width="40" height="40" rx="3" fill="#7DD3FC" stroke="#0369A1" strokeWidth="1.5" />
                <text x="35" y="64" textAnchor="middle" fontSize="9" fontWeight="800" fill="#0C4A6E">3 Canais</text>
                <text x="35" y="93" textAnchor="middle" fontSize="8" fill="#64748B">C_in = 3</text>
              </g>

              {/* Convolution Operator */}
              <text x="80" y="62" textAnchor="middle" fontSize="16" fontWeight="900" fill="#EA580C">∗</text>

              {/* Full 3D Filter (K x K x C_in) */}
              <g>
                <text x="135" y="16" textAnchor="middle" fontSize="9.5" fontWeight="800" fill="#EA580C">Filtro 3D Monolítico</text>
                {/* 3D Kernel Block */}
                <rect x="110" y="32" width="30" height="30" rx="3" fill="#FFEDD5" stroke="#EA580C" strokeWidth="1.5" />
                <rect x="115" y="38" width="30" height="30" rx="3" fill="#FED7AA" stroke="#EA580C" strokeWidth="1.5" />
                <rect x="120" y="44" width="30" height="30" rx="3" fill="#FDBA74" stroke="#EA580C" strokeWidth="1.8" />
                <text x="135" y="63" textAnchor="middle" fontSize="8" fontWeight="800" fill="#9A3412">3×3×C</text>
                <text x="135" y="93" textAnchor="middle" fontSize="8" fontWeight="600" fill="#C2410C">Varre espaço E canais</text>
              </g>

              {/* Arrow to Output */}
              <line x1="165" y1="58" x2="195" y2="58" stroke="#EA580C" strokeWidth="2" markerEnd="url(#arr-orange)" />

              {/* Output Feature Map */}
              <g>
                <text x="235" y="16" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#475569">Saída (C_out)</text>
                {/* 4 Output Channels */}
                <rect x="225" y="24" width="32" height="32" rx="2" fill="#DDD6FE" stroke="#8B5CF6" strokeWidth="1" />
                <rect x="220" y="30" width="32" height="32" rx="2" fill="#C4B5FD" stroke="#7C3AED" strokeWidth="1" />
                <rect x="215" y="36" width="32" height="32" rx="2" fill="#A78BFA" stroke="#6D28D9" strokeWidth="1" />
                <rect x="210" y="42" width="32" height="32" rx="2" fill="#8B5CF6" stroke="#5B21B6" strokeWidth="1.2" />
                <text x="226" y="62" textAnchor="middle" fontSize="8" fontWeight="800" fill="#FFFFFF">1 Mapa/Filtro</text>
                <text x="226" y="93" textAnchor="middle" fontSize="8" fill="#64748B">C_out = N</text>
              </g>

              {/* Bottom formula summary */}
              <rect x="15" y="108" width="250" height="20" rx="4" fill="#FFF7ED" stroke="#FFEDD5" />
              <text x="140" y="122" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#9A3412">
                Custo: H × W × K² × C_in × C_out FLOPs
              </text>
            </svg>
          </div>

          {/* Formula Card */}
          <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '6px 10px', textAlign: 'center' }}>
            <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>Operação acoplada em 1 único passo:</div>
            <div style={{ fontFamily: 'var(--font-code)', fontSize: '12px', fontWeight: 800, color: 'var(--infnet-dark-blue)', marginTop: '2px' }}>
              Filtro 3D: K × K × C_in × C_out
            </div>
          </div>
        </div>

        <div style={{ background: '#FFF7ED', border: '1px solid #FFEDD5', borderRadius: '6px', padding: '7px 10px', fontSize: '10.5px', color: '#9A3412', lineHeight: 1.35 }}>
          ⚠️ <strong>Gargalo:</strong> Cada filtro precisa correlacionar o espaço 2D e todas as combinações de canais ao mesmo tempo.
        </div>
      </div>

      {/* ========================================================= */}
      {/* RIGHT CARD: Depthwise Separable Convolution               */}
      {/* ========================================================= */}
      <div style={{
        background: '#FFFFFF',
        border: '1.5px solid #86EFAC',
        borderRadius: '10px',
        padding: '12px 14px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', fontWeight: 800, color: '#166534' }}>
              2. Depthwise Separable (Xception / MobileNet)
            </span>
            <span className="badge badge-green">Desacoplado (~8.5x mais rápido)</span>
          </div>

          {/* Visual SVG Diagram for Depthwise Separable */}
          <div style={{
            background: '#F0FDF4',
            border: '1px solid #DCFCE7',
            borderRadius: '8px',
            padding: '8px 4px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '8px'
          }}>
            <svg viewBox="0 0 380 135" style={{ width: '100%', height: '130px' }}>
              <defs>
                <marker id="arr-step1" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                  <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#0284C7" />
                </marker>
                <marker id="arr-step2" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                  <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#15803D" />
                </marker>
              </defs>

              {/* ================= STAGE 1: DEPTHWISE ================= */}
              <g>
                <rect x="5" y="5" width="175" height="98" rx="6" fill="#EFF8FC" stroke="#BAE6FD" strokeWidth="1" />
                <text x="92" y="18" textAnchor="middle" fontSize="9" fontWeight="800" fill="#0369A1">Passo 1: Depthwise (Espacial Puro)</text>

                {/* Input Channels Isolated */}
                <rect x="15" y="27" width="22" height="20" rx="2" fill="#BAE6FD" stroke="#0284C7" />
                <rect x="15" y="50" width="22" height="20" rx="2" fill="#BAE6FD" stroke="#0284C7" />
                <rect x="15" y="73" width="22" height="20" rx="2" fill="#BAE6FD" stroke="#0284C7" />
                <text x="26" y="41" textAnchor="middle" fontSize="8" fontWeight="700" fill="#0369A1">C1</text>
                <text x="26" y="64" textAnchor="middle" fontSize="8" fontWeight="700" fill="#0369A1">C2</text>
                <text x="26" y="87" textAnchor="middle" fontSize="8" fontWeight="700" fill="#0369A1">C3</text>

                {/* Multiplication */}
                <text x="47" y="42" textAnchor="middle" fontSize="11" fontWeight="800" fill="#0284C7">∗</text>
                <text x="47" y="65" textAnchor="middle" fontSize="11" fontWeight="800" fill="#0284C7">∗</text>
                <text x="47" y="88" textAnchor="middle" fontSize="11" fontWeight="800" fill="#0284C7">∗</text>

                {/* 2D Kernels (1 per channel) */}
                <rect x="57" y="29" width="18" height="16" rx="2" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1.2" />
                <rect x="57" y="52" width="18" height="16" rx="2" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1.2" />
                <rect x="57" y="75" width="18" height="16" rx="2" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1.2" />
                <text x="66" y="40" textAnchor="middle" fontSize="6.5" fontWeight="800" fill="#0369A1">3×3</text>
                <text x="66" y="63" textAnchor="middle" fontSize="6.5" fontWeight="800" fill="#0369A1">3×3</text>
                <text x="66" y="86" textAnchor="middle" fontSize="6.5" fontWeight="800" fill="#0369A1">3×3</text>

                {/* Arrow to intermediate */}
                <line x1="80" y1="37" x2="98" y2="37" stroke="#0284C7" strokeWidth="1.2" markerEnd="url(#arr-step1)" />
                <line x1="80" y1="60" x2="98" y2="60" stroke="#0284C7" strokeWidth="1.2" markerEnd="url(#arr-step1)" />
                <line x1="80" y1="83" x2="98" y2="83" stroke="#0284C7" strokeWidth="1.2" markerEnd="url(#arr-step1)" />

                {/* Intermediate Maps */}
                <rect x="103" y="27" width="22" height="20" rx="2" fill="#7DD3FC" stroke="#0369A1" />
                <rect x="103" y="50" width="22" height="20" rx="2" fill="#7DD3FC" stroke="#0369A1" />
                <rect x="103" y="73" width="22" height="20" rx="2" fill="#7DD3FC" stroke="#0369A1" />
                <text x="114" y="41" textAnchor="middle" fontSize="7.5" fontWeight="700" fill="#0C4A6E">M1</text>
                <text x="114" y="64" textAnchor="middle" fontSize="7.5" fontWeight="700" fill="#0C4A6E">M2</text>
                <text x="114" y="87" textAnchor="middle" fontSize="7.5" fontWeight="700" fill="#0C4A6E">M3</text>

                <text x="150" y="60" textAnchor="middle" fontSize="7.5" fontWeight="700" fill="#0369A1">1 kernel 2D</text>
                <text x="150" y="70" textAnchor="middle" fontSize="7.5" fontWeight="700" fill="#0369A1">por canal</text>
              </g>

              {/* Connecting Arrow Between Steps */}
              <line x1="184" y1="54" x2="198" y2="54" stroke="#15803D" strokeWidth="2" markerEnd="url(#arr-step2)" />

              {/* ================= STAGE 2: POINTWISE ================= */}
              <g>
                <rect x="202" y="5" width="173" height="98" rx="6" fill="#F0FDF4" stroke="#BBF7D0" strokeWidth="1" />
                <text x="288" y="18" textAnchor="middle" fontSize="9" fontWeight="800" fill="#15803D">Passo 2: Pointwise (Canais Puro)</text>

                {/* Pointwise 1x1 Kernels */}
                <rect x="212" y="32" width="22" height="46" rx="3" fill="#DCFCE7" stroke="#16A34A" strokeWidth="1.2" />
                <text x="223" y="48" textAnchor="middle" fontSize="8" fontWeight="800" fill="#166534">1×1</text>
                <text x="223" y="62" textAnchor="middle" fontSize="7" fontWeight="700" fill="#166534">Conv</text>
                <text x="223" y="72" textAnchor="middle" fontSize="6" fill="#15803D">× C_out</text>

                {/* Arrow to Final Output */}
                <line x1="240" y1="54" x2="265" y2="54" stroke="#15803D" strokeWidth="1.8" markerEnd="url(#arr-step2)" />

                {/* Final Output Channels Stack */}
                <rect x="295" y="27" width="28" height="28" rx="2" fill="#BBF7D0" stroke="#16A34A" strokeWidth="1" />
                <rect x="290" y="33" width="28" height="28" rx="2" fill="#86EFAC" stroke="#15803D" strokeWidth="1" />
                <rect x="285" y="39" width="28" height="28" rx="2" fill="#4ADE80" stroke="#166534" strokeWidth="1" />
                <rect x="280" y="45" width="28" height="28" rx="2" fill="#22C55E" stroke="#14532D" strokeWidth="1.3" />
                <text x="294" y="62" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#FFFFFF">Saída</text>
                <text x="294" y="88" textAnchor="middle" fontSize="8" fontWeight="700" fill="#166534">C_out = N</text>

                <text x="345" y="52" textAnchor="middle" fontSize="7.5" fontWeight="700" fill="#15803D">Combina</text>
                <text x="345" y="62" textAnchor="middle" fontSize="7.5" fontWeight="700" fill="#15803D">canais</text>
                <text x="345" y="72" textAnchor="middle" fontSize="7.5" fontWeight="700" fill="#15803D">linearmente</text>
              </g>

              {/* Bottom formula summary */}
              <rect x="5" y="108" width="370" height="20" rx="4" fill="#DCFCE7" stroke="#BBF7D0" />
              <text x="190" y="122" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#166534">
                Custo: H × W × (K² × C_in + C_in × C_out) FLOPs
              </text>
            </svg>
          </div>

          {/* 2 Step Math Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '6px' }}>
            <div style={{ background: '#EFF8FC', border: '1px solid #CDE6F5', borderRadius: '6px', padding: '6px 8px', textAlign: 'center' }}>
              <div style={{ fontSize: '10px', fontWeight: 800, color: 'var(--infnet-dark-blue)' }}>1. Depthwise (Espaço)</div>
              <div style={{ fontSize: '9.5px', color: 'var(--text-muted)' }}>1 filtro 2D por canal</div>
              <div style={{ fontFamily: 'var(--font-code)', fontSize: '11px', fontWeight: 800, color: '#0284C7', marginTop: '1px' }}>
                K × K × C_in
              </div>
            </div>

            <div style={{ background: '#F0FDF4', border: '1px solid #DCFCE7', borderRadius: '6px', padding: '6px 8px', textAlign: 'center' }}>
              <div style={{ fontSize: '10px', fontWeight: 800, color: '#166534' }}>2. Pointwise (Canais)</div>
              <div style={{ fontSize: '9.5px', color: 'var(--text-muted)' }}>Conv 1×1 linear</div>
              <div style={{ fontFamily: 'var(--font-code)', fontSize: '11px', fontWeight: 800, color: '#15803D', marginTop: '1px' }}>
                1 × 1 × C_in × C_out
              </div>
            </div>
          </div>

          {/* Theoretical Cost Ratio */}
          <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '4px 8px', textAlign: 'center' }}>
            <MathView math="\frac{\text{Custo Depthwise}}{\text{Custo Padrão}} = \frac{1}{C_{out}} + \frac{1}{K^2} \approx \frac{1}{9} \quad (\text{para } K=3)" />
          </div>
        </div>

        {/* Bottom Takeaway */}
        <div style={{ background: '#DCFCE7', border: '1px solid #BBF7D0', borderRadius: '6px', padding: '6px 10px', fontSize: '10.5px', color: '#15803D', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px' }}>
          <CheckCircle2 size={14} color="#15803D" />
          <span>Economia de <strong>~88% de FLOPs</strong> sem comprometer a capacidade representacional!</span>
        </div>
      </div>

    </div>
  );
}
