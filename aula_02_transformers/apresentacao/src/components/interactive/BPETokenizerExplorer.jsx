import React, { useState, useMemo } from 'react';
import { Scissors, RefreshCw, Hash, Binary, Sparkles, BookOpen, Layers } from 'lucide-react';

export default function BPETokenizerExplorer() {
  const PRESETS = [
    { label: 'Refrão Principal', text: 'Tudo o que você precisa é de amor' },
    { label: 'Refrão em Inglês', text: 'All you need is love, love, love' },
    { label: 'Verso Complexo 1', text: 'não há nada que você possa fazer que não possa ser feito' },
    { label: 'Verso Complexo 2', text: 'nada que você possa cantar que não possa ser cantado' },
    { label: 'Final Icônico', text: 'O amor é tudo que você precisa (She loves you, yeah!)' }
  ];

  const [inputText, setInputText] = useState(PRESETS[0].text);
  const [selectedTokenIdx, setSelectedTokenIdx] = useState(null);

  // Deterministic Mock BPE Tokenizer for realistic illustration
  const tokens = useMemo(() => {
    if (!inputText) return [];

    // Simple realistic subword partitioner simulation
    const regex = /(\s+|[A-Za-zÀ-ÿ0-9]+|[^\s\w])/g;
    const matches = inputText.match(regex) || [];
    
    const result = [];
    let runningCharPos = 0;

    matches.forEach((segment) => {
      // simulate subword splits for long or complex words
      let subSegments = [segment];
      if (segment.toLowerCase() === 'precisa') {
        subSegments = ['prec', 'isa'];
      } else if (segment.toLowerCase() === 'cantado') {
        subSegments = ['cant', 'ado'];
      } else if (segment.toLowerCase() === 'conhecido') {
        subSegments = ['conhec', 'ido'];
      }

      subSegments.forEach((sub) => {
        // Deterministic pseudo hash ID (like GPT-2 vocabulary)
        let hash = 0;
        for (let i = 0; i < sub.length; i++) {
          hash = (hash * 31 + sub.charCodeAt(i)) % 50257;
        }
        const tokenId = Math.abs(hash) + 1000;
        
        // UTF-8 bytes
        const encoder = new TextEncoder();
        const bytes = Array.from(encoder.encode(sub));

        // Simulated embedding vector (8 dimensions for preview)
        const emb = [
          (Math.sin(tokenId * 0.1) * 0.8).toFixed(2),
          (Math.cos(tokenId * 0.2) * 0.8).toFixed(2),
          (Math.sin(tokenId * 0.3) * 0.8).toFixed(2),
          (Math.cos(tokenId * 0.4) * 0.8).toFixed(2),
          (Math.sin(tokenId * 0.5) * 0.8).toFixed(2),
          (Math.cos(tokenId * 0.6) * 0.8).toFixed(2),
          (Math.sin(tokenId * 0.7) * 0.8).toFixed(2),
          (Math.cos(tokenId * 0.8) * 0.8).toFixed(2)
        ];

        result.push({
          text: sub,
          id: tokenId,
          bytes: bytes,
          byteLength: bytes.length,
          charLength: sub.length,
          embedding: emb,
          isSpace: /^\s+$/.test(sub)
        });
      });
    });

    return result;
  }, [inputText]);

  const stats = useMemo(() => {
    const chars = inputText.length;
    const words = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;
    const tokenCount = tokens.length;
    const ratio = words > 0 ? (tokenCount / words).toFixed(2) : '0';
    return { chars, words, tokenCount, ratio };
  }, [inputText, tokens]);

  const COLORS = [
    '#E0F2FE', '#DCFCE7', '#FEF3C7', '#FCE7F3', '#EDE9FE',
    '#CCFBF1', '#FFEDD5', '#F1F5F9', '#DBEAFE', '#F3E8FF'
  ];

  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      fontSize: '13px'
    }}>
      {/* Top Controls & Presets */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '8px',
        background: '#EDF5FA',
        padding: '8px 14px',
        borderRadius: '8px',
        border: '1px solid #D0E3F0'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Scissors size={18} color="var(--infnet-cyan)" />
          <span style={{ fontWeight: 700, color: 'var(--infnet-dark-blue)', fontSize: '13.5px' }}>
            Laboratório BPE: Tokenização e Mapeamento de IDs
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>Exemplos da Canção:</span>
          {PRESETS.map((p, idx) => (
            <button
              key={idx}
              onClick={() => {
                setInputText(p.text);
                setSelectedTokenIdx(null);
              }}
              style={{
                background: inputText === p.text ? 'var(--infnet-dark-blue)' : '#FFFFFF',
                color: inputText === p.text ? '#FFFFFF' : 'var(--infnet-dark-blue)',
                border: '1px solid #CBD5E1',
                padding: '3px 8px',
                borderRadius: '4px',
                fontSize: '11px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input Field */}
      <div>
        <input
          type="text"
          value={inputText}
          onChange={(e) => {
            setInputText(e.target.value);
            setSelectedTokenIdx(null);
          }}
          placeholder="Digite ou edite o texto da canção aqui..."
          style={{
            width: '100%',
            padding: '8px 12px',
            borderRadius: '6px',
            border: '1.5px solid var(--border-light)',
            fontFamily: 'var(--font-code)',
            fontSize: '13px',
            color: 'var(--infnet-dark-blue)',
            outline: 'none'
          }}
        />
      </div>

      {/* Main Grid: Left Tokens + Metrics, Right Token Inspector */}
      <div style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '1.4fr 1fr',
        gap: '12px',
        minHeight: 0
      }}>
        {/* Left Column: Visual Tokens Display */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-light)',
          borderRadius: '10px',
          padding: '12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--infnet-dark-blue)', textTransform: 'uppercase' }}>
              Sequência de Tokens Subword Gerada ({tokens.length} tokens):
            </span>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              Clique em um token para inspecionar
            </span>
          </div>

          {/* Token Chips */}
          <div style={{
            flex: 1,
            background: '#FFFFFF',
            border: '1px solid var(--border-light)',
            borderRadius: '8px',
            padding: '10px',
            display: 'flex',
            flexWrap: 'wrap',
            alignContent: 'flex-start',
            gap: '6px',
            overflowY: 'auto'
          }}>
            {tokens.map((t, idx) => {
              const bg = COLORS[idx % COLORS.length];
              const isSelected = selectedTokenIdx === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedTokenIdx(idx)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    background: isSelected ? 'var(--infnet-dark-blue)' : bg,
                    color: isSelected ? '#FFFFFF' : '#0A345D',
                    border: `1.5px solid ${isSelected ? 'var(--infnet-cyan)' : '#CBD5E1'}`,
                    padding: '4px 8px',
                    borderRadius: '6px',
                    fontFamily: 'var(--font-code)',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transform: isSelected ? 'scale(1.05)' : 'none',
                    transition: 'all 0.15s ease',
                    boxShadow: isSelected ? 'var(--shadow-md)' : 'none'
                  }}
                >
                  <span>{t.isSpace ? '␣' : t.text}</span>
                  <span style={{
                    fontSize: '9.5px',
                    opacity: 0.75,
                    background: isSelected ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.06)',
                    padding: '1px 3px',
                    borderRadius: '3px'
                  }}>
                    #{t.id}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Metrics bar */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '8px',
            background: '#EDF5FA',
            padding: '8px 10px',
            borderRadius: '6px',
            textAlign: 'center'
          }}>
            <div>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Caracteres</div>
              <div style={{ fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>{stats.chars}</div>
            </div>
            <div>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Palavras</div>
              <div style={{ fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>{stats.words}</div>
            </div>
            <div>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Tokens BPE</div>
              <div style={{ fontWeight: 700, color: 'var(--infnet-cyan-dark)' }}>{stats.tokenCount}</div>
            </div>
            <div>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Tokens / Palavra</div>
              <div style={{ fontWeight: 700, color: '#15803D' }}>{stats.ratio}x</div>
            </div>
          </div>
        </div>

        {/* Right Column: Selected Token Inspector */}
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
            Inspetor de Token &amp; Projeção para Embedding
          </div>

          {selectedTokenIdx !== null && tokens[selectedTokenIdx] ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
              <div style={{
                background: '#FFFFFF',
                border: '1px solid var(--border-light)',
                borderRadius: '8px',
                padding: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>Token String:</div>
                  <div style={{ fontFamily: 'var(--font-code)', fontSize: '16px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
                    "{tokens[selectedTokenIdx].text}"
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>Vocab ID:</div>
                  <div style={{ fontFamily: 'var(--font-code)', fontSize: '16px', fontWeight: 700, color: 'var(--infnet-cyan-dark)' }}>
                    {tokens[selectedTokenIdx].id}
                  </div>
                </div>
              </div>

              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                Bytes UTF-8: <code>[{tokens[selectedTokenIdx].bytes.join(', ')}]</code>
              </div>

              {/* Embedding Vector Preview */}
              <div style={{
                background: '#F8FAFC',
                border: '1px solid var(--border-light)',
                borderRadius: '8px',
                padding: '10px'
              }}>
                <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--infnet-dark-blue)', marginBottom: '6px' }}>
                  Vetor no Espaço Latente ($W_E[ID]$):
                </div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '4px',
                  fontFamily: 'var(--font-code)',
                  fontSize: '10.5px'
                }}>
                  {tokens[selectedTokenIdx].embedding.map((val, eIdx) => (
                    <div
                      key={eIdx}
                      style={{
                        background: '#FFFFFF',
                        border: '1px solid #E2E8F0',
                        padding: '4px',
                        borderRadius: '4px',
                        textAlign: 'center',
                        color: parseFloat(val) >= 0 ? '#15803D' : '#B91C1C'
                      }}
                    >
                      {val}
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: '10px', color: '#64748B', marginTop: '6px', textAlign: 'center' }}>
                  Dimensão real d_model = 768 (GPT-2) ou 1024 (GPT-3)
                </div>
              </div>

              <div style={{
                background: '#EDF5FA',
                padding: '8px 10px',
                borderRadius: '6px',
                fontSize: '11px',
                color: 'var(--infnet-dark-blue)'
              }}>
                📌 <strong>Lookup Table:</strong> O PyTorch busca este vetor diretamente da matriz <code>nn.Embedding(vocab_size, d_model)</code> na linha correspondente ao índice ID.
              </div>
            </div>
          ) : (
            <div style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-muted)',
              textAlign: 'center',
              padding: '20px'
            }}>
              <Sparkles size={28} color="var(--infnet-cyan)" style={{ marginBottom: '8px' }} />
              <p style={{ fontWeight: 600 }}>Clique em qualquer token à esquerda</p>
              <p style={{ fontSize: '11.5px', marginTop: '4px' }}>
                Para visualizar os bytes UTF-8, o ID no vocabulário e a projeção vetorial no embedding.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
