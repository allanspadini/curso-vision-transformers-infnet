import React, { useState } from 'react';
import { Search, Key, Database, ArrowRight, Sparkles, HelpCircle, CheckCircle } from 'lucide-react';

export default function AttentionIntuitionDiagram() {
  const [activeToken, setActiveToken] = useState('precisa');

  const tokenRoles = {
    precisa: {
      query: 'Quem precisa de algo? E do que precisa?',
      targets: [
        { word: 'você', keyRole: 'Sujeito agente da necessidade', affinity: 0.85, valueDesc: 'Identidade da 2ª pessoa' },
        { word: 'amor', keyRole: 'Objeto direto / complemento essencial', affinity: 0.92, valueDesc: 'Conceito central da canção' },
        { word: 'tudo', keyRole: 'Quantificador absoluto', affinity: 0.45, valueDesc: 'Totalidade' },
        { word: 'é', keyRole: 'Verbo de ligação', affinity: 0.15, valueDesc: 'Cópula sintática' }
      ]
    },
    amor: {
      query: 'Qual a relação do amor na frase?',
      targets: [
        { word: 'precisa', keyRole: 'Ação que requer amor', affinity: 0.88, valueDesc: 'Verbo principal' },
        { word: 'tudo', keyRole: 'Equivalência de valor ("amor é tudo")', affinity: 0.90, valueDesc: 'Completude' },
        { word: 'você', keyRole: 'Beneficiário do amor', affinity: 0.75, valueDesc: 'Pessoa' }
      ]
    }
  };

  const current = tokenRoles[activeToken] || tokenRoles['precisa'];

  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      fontSize: '13px'
    }}>
      {/* Top Banner */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#EDF5FA',
        padding: '8px 16px',
        borderRadius: '8px',
        border: '1px solid #D0E3F0'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, color: 'var(--infnet-dark-blue)' }}>
          <Search size={18} color="var(--infnet-cyan)" />
          <span>A Intuição da Atenção: Queries (Consultas), Keys (Chaves) e Values (Valores)</span>
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            onClick={() => setActiveToken('precisa')}
            style={{
              padding: '4px 10px',
              borderRadius: '6px',
              border: 'none',
              fontSize: '11.5px',
              fontWeight: 600,
              cursor: 'pointer',
              background: activeToken === 'precisa' ? 'var(--infnet-dark-blue)' : '#FFFFFF',
              color: activeToken === 'precisa' ? '#FFFFFF' : 'var(--text-main)',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            Token Query: "precisa"
          </button>
          <button
            onClick={() => setActiveToken('amor')}
            style={{
              padding: '4px 10px',
              borderRadius: '6px',
              border: 'none',
              fontSize: '11.5px',
              fontWeight: 600,
              cursor: 'pointer',
              background: activeToken === 'amor' ? 'var(--infnet-dark-blue)' : '#FFFFFF',
              color: activeToken === 'amor' ? '#FFFFFF' : 'var(--text-main)',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            Token Query: "amor"
          </button>
        </div>
      </div>

      {/* 3 Core Roles Cards */}
      <div className="grid-3col" style={{ flex: '0 0 auto', height: '105px' }}>
        <div className="card" style={{ padding: '10px 14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <div className="card-icon-wrapper icon-blue" style={{ width: '28px', height: '28px' }}>
              <Search size={16} />
            </div>
            <div style={{ fontWeight: 700, color: 'var(--infnet-dark-blue)', fontSize: '13px' }}>Query ($Q$)</div>
          </div>
          <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
            <strong>A Pergunta:</strong> "O que este token está procurando no contexto atual?"
          </div>
        </div>

        <div className="card" style={{ padding: '10px 14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <div className="card-icon-wrapper icon-cyan" style={{ width: '28px', height: '28px' }}>
              <Key size={16} />
            </div>
            <div style={{ fontWeight: 700, color: 'var(--infnet-cyan-dark)', fontSize: '13px' }}>Key ($K$)</div>
          </div>
          <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
            <strong>O Índice de Busca:</strong> "Qual a identidade e compatibilidade deste token com as Queries?"
          </div>
        </div>

        <div className="card" style={{ padding: '10px 14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <div className="card-icon-wrapper icon-green" style={{ width: '28px', height: '28px' }}>
              <Database size={16} />
            </div>
            <div style={{ fontWeight: 700, color: '#15803D', fontSize: '13px' }}>Value ($V$)</div>
          </div>
          <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
            <strong>O Conteúdo Real:</strong> "A informação semântica bruta que será agregada na média ponderada."
          </div>
        </div>
      </div>

      {/* Main Database-like Retrieval Visualization */}
      <div style={{
        flex: 1,
        background: 'var(--bg-card)',
        border: '1px solid var(--border-light)',
        borderRadius: '10px',
        padding: '14px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        minHeight: 0
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
            🔍 Query Emitida por <code style={{ color: '#0284C7' }}>"{activeToken}"</code>: <span style={{ fontWeight: 500, color: 'var(--text-muted)' }}>"{current.query}"</span>
          </div>
          <span style={{ fontSize: '11px', background: '#F0FDF4', color: '#15803D', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>
            Busca Fuzzy / Dicionário Diferenciável
          </span>
        </div>

        {/* Affinity Table */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1, justifyContent: 'center' }}>
          {current.targets.map((t, idx) => (
            <div
              key={idx}
              style={{
                background: '#FFFFFF',
                border: '1px solid var(--border-light)',
                borderRadius: '8px',
                padding: '8px 14px',
                display: 'grid',
                gridTemplateColumns: '120px 1fr 140px 110px',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontFamily: 'var(--font-code)', fontWeight: 700, fontSize: '13px', color: 'var(--infnet-dark-blue)' }}>
                  "{t.word}"
                </span>
              </div>

              <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
                <strong>Key:</strong> {t.keyRole}
              </div>

              {/* Progress bar of affinity score */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10.5px', marginBottom: '2px' }}>
                  <span>Afinidade $q · k$:</span>
                  <span style={{ fontWeight: 700, color: t.affinity > 0.8 ? '#15803D' : '#0284C7' }}>
                    {(t.affinity * 100).toFixed(0)}%
                  </span>
                </div>
                <div style={{ height: '8px', background: '#E2E8F0', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{
                    width: `${t.affinity * 100}%`,
                    height: '100%',
                    background: t.affinity > 0.8 ? '#15803D' : '#1BB5D8',
                    borderRadius: '4px'
                  }} />
                </div>
              </div>

              <div style={{ fontSize: '11px', color: '#334155', background: '#F8FAFC', padding: '4px 6px', borderRadius: '4px', textAlign: 'center' }}>
                Value: {t.valueDesc}
              </div>
            </div>
          ))}
        </div>

        <div style={{
          fontSize: '11.5px',
          color: 'var(--infnet-dark-blue)',
          background: '#EDF5FA',
          padding: '6px 12px',
          borderRadius: '6px'
        }}>
          💡 <strong>Média Ponderada:</strong> O novo vetor de representação de <code>"{activeToken}"</code> será z = ∑ Softmax(q · k_j) · v_j, agregando o contexto exato de que ele precisa!
        </div>
      </div>
    </div>
  );
}
