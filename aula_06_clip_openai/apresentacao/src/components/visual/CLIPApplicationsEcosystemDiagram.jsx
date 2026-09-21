import React from 'react';
import { Search, Sparkles, Filter, ShieldAlert, ArrowUpRight } from 'lucide-react';

export default function CLIPApplicationsEcosystemDiagram() {
  const apps = [
    {
      icon: Search,
      title: 'Busca Semântica Cross-Modal',
      sub: 'Text-to-Image & Image-to-Text Retrieval',
      desc: 'Pesquise em bancos de bilhões de imagens utilizando linguagem natural livre ("cachorro usando óculos escuros na praia"), sem necessidade de tags pré-anotadas.',
      tech: 'Vetores normalizados + Indexação rápida Faiss / Qdrant',
      color: '#0284C7',
      bg: '#F0F9FF',
      border: '#BAE6FD'
    },
    {
      icon: Sparkles,
      title: 'Guia Semântico para IA Generativa',
      sub: 'DALL-E 2, Stable Diffusion, VQGAN+CLIP',
      desc: 'O CLIP atua como juiz multimodal: sua perda contrastiva guia a otimização de latentes nos modelos de difusão e autorregressivos para manter fidelidade ao texto.',
      tech: 'Gradientes de similaridade de cosseno d(cos)/dz',
      color: '#9333EA',
      bg: '#FAF5FF',
      border: '#E9D5FF'
    },
    {
      icon: Filter,
      title: 'Curadoria de Datasets Massivos',
      sub: 'Filtragem de Ruído em Bilhões de Amostras',
      desc: 'Construção automática do LAION-400M e LAION-5B: remoção de pares de internet onde o texto não corresponde ao conteúdo visual por threshold de cosseno.',
      tech: 'Filtro automático: descartar se cos(I, T) < 0.28',
      color: '#16A34A',
      bg: '#F0FDF4',
      border: '#BBF7D0'
    },
    {
      icon: ShieldAlert,
      title: 'Moderação de Conteúdo e Segurança',
      sub: 'Detecção de Violações Multimodais Sem Rótulos',
      desc: 'Identificação de conteúdo nocivo, discurso de ódio camuflado em memes e violações de diretrizes sem retreinar classificadores para cada nova ameaça.',
      tech: 'Prompts sentinelas: "a photo depicting violent behavior"',
      color: '#EA580C',
      bg: '#FFF7ED',
      border: '#FED7AA'
    }
  ];

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Grid 4 Cards de Aplicações */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', flex: 1 }}>
        {apps.map((app, idx) => {
          const Icon = app.icon;
          return (
            <div
              key={idx}
              style={{
                background: app.bg,
                border: `1.5px solid ${app.border}`,
                borderRadius: '12px',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: 'var(--shadow-sm)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    background: '#FFFFFF',
                    border: `1.5px solid ${app.border}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: app.color,
                    boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
                  }}>
                    <Icon size={22} />
                  </div>
                  <span style={{
                    background: '#FFFFFF',
                    color: app.color,
                    fontSize: '10.5px',
                    fontWeight: 700,
                    padding: '3px 8px',
                    borderRadius: '20px',
                    border: `1px solid ${app.border}`,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    Pilar {idx + 1} <ArrowUpRight size={12} />
                  </span>
                </div>

                <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--infnet-dark-blue)', marginBottom: '4px', fontFamily: 'var(--font-title)' }}>
                  {app.title}
                </h3>
                <div style={{ fontSize: '11.5px', fontWeight: 600, color: app.color, marginBottom: '10px' }}>
                  {app.sub}
                </div>
                <p style={{ fontSize: '12px', color: 'var(--text-main)', lineHeight: '1.5' }}>
                  {app.desc}
                </p>
              </div>

              <div style={{
                background: '#FFFFFF',
                border: `1px solid ${app.border}`,
                borderRadius: '6px',
                padding: '8px 12px',
                marginTop: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span style={{ fontSize: '9.5px', fontWeight: 800, color: app.color, textTransform: 'uppercase' }}>
                  Engenharia:
                </span>
                <span style={{ fontSize: '10.5px', fontFamily: 'Fira Code', color: '#334155' }}>
                  {app.tech}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Banner de Conclusão sobre Aprendizado Sem Supervisão */}
      <div style={{
        background: '#EDF5FA',
        border: '1px solid #D0E3F0',
        borderRadius: '8px',
        padding: '10px 18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ background: 'var(--infnet-dark-blue)', color: '#FFFFFF', padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 800 }}>
            PARADIGMA
          </span>
          <span style={{ fontSize: '12px', color: 'var(--infnet-dark-blue)', fontWeight: 600 }}>
            O aprendizado auto-supervisionado multimodal substitui o custo da anotação humana manual pela redundância semântica natural da linguagem presente na web.
          </span>
        </div>
        <span style={{ fontSize: '11px', color: '#0284C7', fontWeight: 700 }}>
          Sem classes fixas • Sem overfit de domínio
        </span>
      </div>
    </div>
  );
}
