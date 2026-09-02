import React, { useState } from 'react';
import { Scissors, ArrowRight, Database, Hash, Sparkles, Check } from 'lucide-react';

export default function BPETokenizerDiagram() {
  const [activeTab, setActiveTab] = useState('algorithm');

  const bpeSteps = [
    { step: '1. Inicialização', text: 'T u d o _ o _ q u e _ v o c ê _ p r e c i s a _ é _ d e _ a m o r', desc: 'Cada caractere ou byte inicial é um token individual no vocabulário base (256 bytes).' },
    { step: '2. Par Mais Frequente', text: 'T u d o _ o _ q u e _ v o c ê _ p r e c i s a _ é _ d e _ [a m] o r', desc: 'O algoritmo conta a frequência de todos os pares adjacentes no corpus. O par ("a", "m") se funde em "am".' },
    { step: '3. Fusão Sucessiva', text: 'T u d o _ o _ q u e _ v o c ê _ p r e c i s a _ é _ d e _ [amor]', desc: 'O par ("am", "or") se funde no token único "amor" (ID 8954). O mesmo ocorre com "você" e "precisa".' },
    { step: '4. Vocabulário Final', text: '[Tudo] [o] [que] [você] [precisa] [é] [de] [amor]', desc: 'Subwords frequentes viram tokens únicos. Palavras raras ou neologismos são decompostos em sub-pedaços sem erro de OOV!' }
  ];

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
          <Scissors size={18} color="var(--infnet-cyan)" />
          <span>Tokenização Subword: O Algoritmo Byte-Pair Encoding (BPE)</span>
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            onClick={() => setActiveTab('algorithm')}
            style={{
              padding: '4px 12px',
              borderRadius: '6px',
              border: 'none',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              background: activeTab === 'algorithm' ? 'var(--infnet-dark-blue)' : '#FFFFFF',
              color: activeTab === 'algorithm' ? '#FFFFFF' : 'var(--text-main)',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            Mecânica do Algoritmo
          </button>
          <button
            onClick={() => setActiveTab('comparison')}
            style={{
              padding: '4px 12px',
              borderRadius: '6px',
              border: 'none',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              background: activeTab === 'comparison' ? 'var(--infnet-dark-blue)' : '#FFFFFF',
              color: activeTab === 'comparison' ? '#FFFFFF' : 'var(--text-main)',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            Níveis de Tokenização
          </button>
        </div>
      </div>

      {activeTab === 'algorithm' ? (
        <div style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: '1.3fr 1fr',
          gap: '14px',
          minHeight: 0
        }}>
          {/* Left: Step-by-Step BPE walkthrough */}
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-light)',
            borderRadius: '10px',
            padding: '14px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--infnet-dark-blue)', textTransform: 'uppercase' }}>
              Evolução das Fusões no BPE (Exemplo da Canção dos Beatles)
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1, justifyContent: 'center' }}>
              {bpeSteps.map((s, idx) => (
                <div
                  key={idx}
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid var(--border-light)',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 700, color: 'var(--infnet-dark-blue)', fontSize: '12px' }}>{s.step}</span>
                    <span style={{ fontSize: '10px', background: '#EDF5FA', padding: '2px 6px', borderRadius: '4px', color: 'var(--infnet-cyan-dark)', fontWeight: 600 }}>Passo {idx + 1}</span>
                  </div>
                  <div style={{ fontFamily: 'var(--font-code)', fontSize: '11.5px', color: '#0A345D', background: '#F8FAFC', padding: '4px 8px', borderRadius: '4px' }}>
                    {s.text}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    {s.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: BPE Key Properties & Tiktoken */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div className="card" style={{ flex: 1 }}>
              <div className="card-header">
                <div className="card-icon-wrapper icon-green">
                  <Database size={18} />
                </div>
                <div className="card-title">Por que o BPE Venceu?</div>
              </div>
              <div className="card-body">
                <ul style={{ paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <li><strong>Zero Out-of-Vocabulary (OOV):</strong> Qualquer caractere desconhecido ou emoji pode ser decomposto nos seus bytes UTF-8 individuais.</li>
                  <li><strong>Vocabulário Fixo:</strong> Tamanho controlado (ex: GPT-2 usa 50.257 tokens; GPT-4/tiktoken usa 100k tokens).</li>
                  <li><strong>Compressão Equilibrada:</strong> Palavras comuns usam 1 único token; palavras complexas ou derivadas usam 2 a 3 subwords.</li>
                  <li><strong>Espaço em Branco é Token:</strong> Espaços (ex: <code>Ġlove</code> ou <code>_amor</code>) são codificados explicitamente junto com a palavra.</li>
                </ul>
              </div>
            </div>

            <div style={{
              background: '#F0FDF4',
              border: '1px solid #BBF7D0',
              padding: '8px 12px',
              borderRadius: '8px',
              fontSize: '11.5px',
              color: '#166534',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <Check size={16} flexShrink={0} />
              <span><strong>Tiktoken / GPT-2:</strong> A biblioteca padrão para tokenização em PyTorch rápida em Rust/C++ que veremos no laboratório a seguir!</span>
            </div>
          </div>
        </div>
      ) : (
        /* Comparison of 3 Tokenization Levels */
        <div className="grid-3col" style={{ flex: 1, minHeight: 0 }}>
          <div className="card">
            <div className="card-header">
              <div className="card-icon-wrapper icon-orange">
                <Hash size={18} />
              </div>
              <div className="card-title">Nível Caractere</div>
            </div>
            <div className="card-body">
              <p style={{ color: 'var(--infnet-red)', fontWeight: 600, marginBottom: '6px' }}>❌ Desvantagens:</p>
              <ul style={{ paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <li>Sequências extremamente longas ($T$ explode).</li>
                <li>Custo quadrático de atenção $O(T^2)$ inviabiliza textos longos.</li>
                <li>Caractere isolado carrega pouquíssima semântica.</li>
              </ul>
              <div style={{ marginTop: '10px', fontSize: '11px', background: '#FFF5F5', padding: '6px', borderRadius: '4px', border: '1px solid #FED7D7' }}>
                Ex: "a", "m", "o", "r" (4 tokens)
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <div className="card-icon-wrapper icon-purple">
                <Database size={18} />
              </div>
              <div className="card-title">Nível Palavra Inteira</div>
            </div>
            <div className="card-body">
              <p style={{ color: 'var(--infnet-red)', fontWeight: 600, marginBottom: '6px' }}>❌ Desvantagens:</p>
              <ul style={{ paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <li>Vocabulário infinito (|V| &gt; 1.000.000).</li>
                <li>Palavras raras ou erros de digitação viram <code>[UNK]</code> (Out of Vocabulary).</li>
                <li>Não aproveita raízes morfológicas (cantar, cantado, cantando).</li>
              </ul>
              <div style={{ marginTop: '10px', fontSize: '11px', background: '#FAF5FF', padding: '6px', borderRadius: '4px', border: '1px solid #E9D8FD' }}>
                Ex: "superdesenvolvimento" $→$ [UNK]
              </div>
            </div>
          </div>

          <div className="card card-highlight-green">
            <div className="card-header">
              <div className="card-icon-wrapper icon-green">
                <Sparkles size={18} />
              </div>
              <div className="card-title">Subword BPE (Padrão)</div>
            </div>
            <div className="card-body">
              <p style={{ color: '#15803D', fontWeight: 600, marginBottom: '6px' }}>✅ O Ponto Ótimo:</p>
              <ul style={{ paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <li>Vocabulário compacto e controlado (50k a 100k).</li>
                <li>Comprimento de sequência eficiente (1 token $≈$ 0.75 palavras).</li>
                <li>Generaliza perfeitamente para qualquer idioma e neologismo.</li>
              </ul>
              <div style={{ marginTop: '10px', fontSize: '11px', background: '#F0FDF4', padding: '6px', borderRadius: '4px', border: '1px solid #BBF7D0' }}>
                Ex: "desenvolvimento" $→$ ["desenvolve", "mento"]
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
