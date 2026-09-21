import React from 'react';
import { AlertOctagon, CheckCircle2, ShieldCheck, Cpu } from 'lucide-react';

export default function CLIPAnomalyDetectionMechanicsDiagram() {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', flex: 1 }}>
        
        {/* Abordagem 1: Prompting Contrastivo de Anomalia */}
        <div style={{
          background: '#FFFFFF',
          border: '1.5px solid #FED7D7',
          borderRadius: '12px',
          padding: '18px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ background: '#FEE2E2', color: '#DC2626', padding: '6px', borderRadius: '6px' }}>
                <AlertOctagon size={18} />
              </div>
              <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#991B1B', margin: 0, fontFamily: 'var(--font-title)' }}>
                Abordagem 1: Prompts Opostos de Integridade
              </h3>
            </div>
            <span style={{ background: '#FEE2E2', color: '#991B1B', fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '12px' }}>
              Text-Driven Zero-Shot
            </span>
          </div>

          <p style={{ fontSize: '11.5px', color: 'var(--text-main)', lineHeight: '1.45', marginBottom: '12px' }}>
            Define-se pares textuais antagônicos de normalidade versus modos de falha conhecidos da peça industrial:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px' }}>
            <div style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', padding: '8px 12px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '10.5px', fontFamily: 'Fira Code', color: '#065F46' }}>
                T_normal = "a photo of a flawless, pristine transistor"
              </span>
              <CheckCircle2 size={16} color="#10B981" />
            </div>

            <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', padding: '8px 12px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '10.5px', fontFamily: 'Fira Code', color: '#991B1B' }}>
                T_anomaly = "a photo of a cracked, damaged, burned transistor"
              </span>
              <AlertOctagon size={16} color="#EF4444" />
            </div>
          </div>

          <div style={{
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: '8px',
            padding: '12px',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '8px'
          }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
              Cálculo do Score de Anomalia Relativo:
            </div>
            <div style={{ background: '#FFFFFF', border: '1px solid #CBD5E1', padding: '8px 16px', borderRadius: '6px', fontFamily: 'Fira Code', fontSize: '11.5px', color: '#0F172A' }}>
              S_anomaly = \frac{'{'} \exp(I \cdot T_anom / \tau) {'}'}{'{'} \exp(I \cdot T_norm / \tau) + \exp(I \cdot T_anom / \tau) {'}'}
            </div>
            <span style={{ fontSize: '10px', color: '#64748B' }}>
              Se S_anomaly &gt; Limiar \theta (ex: 0.5), classifica como DEFEITO.
            </span>
          </div>
        </div>

        {/* Abordagem 2: Densidade de Embedding / Distância ao Centroide Normal */}
        <div style={{
          background: '#FFFFFF',
          border: '1.5px solid #BAE6FD',
          borderRadius: '12px',
          padding: '18px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ background: '#E0F2FE', color: '#0284C7', padding: '6px', borderRadius: '6px' }}>
                <ShieldCheck size={18} />
              </div>
              <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0369A1', margin: 0, fontFamily: 'var(--font-title)' }}>
                Abordagem 2: Densidade e Distância Latente
              </h3>
            </div>
            <span style={{ background: '#E0F2FE', color: '#0284C7', fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '12px' }}>
              Few-Shot Normal Memory
            </span>
          </div>

          <p style={{ fontSize: '11.5px', color: 'var(--text-main)', lineHeight: '1.45', marginBottom: '12px' }}>
            Coleta-se 10 a 50 imagens de peças perfeitamente sadias, extrai-se os embeddings visuais congelados do CLIP e calcula-se o centroide normal <code style={{ fontFamily: 'Fira Code' }}>\mu_{'{'}norm{'}'}</code>.
          </p>

          {/* SVG Centroide vs Anomalia */}
          <div style={{
            background: '#F0F9FF',
            borderRadius: '8px',
            border: '1px solid #BAE6FD',
            padding: '10px',
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <svg viewBox="0 0 460 160" style={{ width: '100%', height: '150px' }}>
              {/* Cluster de Peças Sadias */}
              <circle cx="160" cy="80" r="50" fill="#DCFCE7" stroke="#22C55E" strokeWidth="2" strokeDasharray="3 3" />
              <circle cx="160" cy="80" r="5" fill="#15803D" />
              <text x="160" y="70" textAnchor="middle" fontSize="9" fontWeight="800" fill="#15803D">Centroide μ_norm</text>

              {/* Pontos Normais */}
              <circle cx="140" cy="70" r="3.5" fill="#16A34A" />
              <circle cx="180" cy="85" r="3.5" fill="#16A34A" />
              <circle cx="155" cy="95" r="3.5" fill="#16A34A" />
              <circle cx="170" cy="65" r="3.5" fill="#16A34A" />

              {/* Peça Anômala Fora do Cluster */}
              <circle cx="340" cy="80" r="6" fill="#EF4444" />
              <text x="340" y="65" textAnchor="middle" fontSize="9.5" fontWeight="800" fill="#DC2626">Amostra Anômala</text>
              <text x="340" y="105" textAnchor="middle" fontSize="8.5" fontFamily="Fira Code" fill="#991B1B">cos(I_test, μ) = 0.32</text>

              {/* Vetor de Distância Euclidiana / Cosseno */}
              <line x1="165" y1="80" x2="332" y2="80" stroke="#EF4444" strokeWidth="2" strokeDasharray="4 2" />
              <text x="250" y="72" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#B91C1C">Distância Latente Alta ➔ ALARME</text>
            </svg>
          </div>

          <div style={{ marginTop: '10px', fontSize: '10.5px', color: '#0369A1', textAlign: 'center' }}>
            ✓ Não requer nenhuma amostra defeituosa no treinamento (Unsupervised Anomaly Detection).
          </div>
        </div>

      </div>

      {/* Destaque MVTec AD */}
      <div style={{
        background: '#EDF5FA',
        border: '1px solid #D0E3F0',
        borderRadius: '8px',
        padding: '10px 18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <span style={{ fontSize: '11.5px', color: 'var(--infnet-dark-blue)', fontWeight: 600 }}>
          🏭 <strong>Aplicações na Manufatura (MVTec AD):</strong> O CLIP permite inspecionar peças de silício, garrafas de remédio, parafusos e tecidos sem precisar treinar redes complexas do zero, reduzindo o setup de inspeção de semanas para minutos.
        </span>
      </div>
    </div>
  );
}
