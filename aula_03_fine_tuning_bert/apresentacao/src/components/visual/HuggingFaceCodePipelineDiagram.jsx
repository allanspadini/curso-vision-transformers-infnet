import React, { useState } from 'react';

export default function HuggingFaceCodePipelineDiagram() {
  const [activeCode, setActiveCode] = useState('pipeline'); // 'pipeline' or 'custom'

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {/* Top Toggle Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#F8FAFC',
        border: '1px solid #E2E8F0',
        borderRadius: '8px',
        padding: '6px 14px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--infnet-dark-blue)' }}>
            Nível de Abstração Hugging Face:
          </span>
          <button
            onClick={() => setActiveCode('pipeline')}
            style={{
              padding: '4px 12px',
              borderRadius: '6px',
              border: activeCode === 'pipeline' ? '2px solid var(--infnet-cyan)' : '1px solid #CBD5E1',
              background: activeCode === 'pipeline' ? '#E0F2FE' : '#FFFFFF',
              color: activeCode === 'pipeline' ? 'var(--infnet-dark-blue)' : '#475569',
              fontWeight: 700,
              fontSize: '11px',
              cursor: 'pointer'
            }}
          >
            1. pipeline() (Alto Nível / Produção Imediata)
          </button>
          <button
            onClick={() => setActiveCode('custom')}
            style={{
              padding: '4px 12px',
              borderRadius: '6px',
              border: activeCode === 'custom' ? '2px solid var(--infnet-cyan)' : '1px solid #CBD5E1',
              background: activeCode === 'custom' ? '#E0F2FE' : '#FFFFFF',
              color: activeCode === 'custom' ? 'var(--infnet-dark-blue)' : '#475569',
              fontWeight: 700,
              fontSize: '11px',
              cursor: 'pointer'
            }}
          >
            2. AutoTokenizer + AutoModel + Trainer (Fine-Tuning)
          </button>
        </div>

        <div style={{ fontSize: '11px', color: '#64748B' }}>
          Biblioteca padrão da indústria: <strong>transformers &amp; datasets</strong>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{
        flex: 1,
        minHeight: 0,
        background: '#041220',
        border: '1px solid #1E4976',
        borderRadius: '10px',
        padding: '14px',
        display: 'grid',
        gridTemplateColumns: '1.2fr 0.8fr',
        gap: '14px'
      }}>
        {/* Left: Code Snippet */}
        <div style={{
          background: '#030E1A',
          border: '1px solid #1B3857',
          borderRadius: '8px',
          padding: '12px',
          overflowY: 'auto',
          fontFamily: 'var(--font-code)',
          fontSize: '11px',
          color: '#E2E8F0',
          lineHeight: 1.55
        }}>
          {activeCode === 'pipeline' ? (
            <pre style={{ margin: 0 }}>
              <span style={{ color: '#64748B' }}># 1. Inferência Instantânea com pipeline() de Alto Nível</span>{'\n'}
              <span style={{ color: '#FF7043' }}>from</span> transformers <span style={{ color: '#FF7043' }}>import</span> pipeline{'\n\n'}
              <span style={{ color: '#64748B' }}># Classificador de Sentimento Pronto para Uso</span>{'\n'}
              classifier = pipeline({'\n'}
              {'  '}<span style={{ color: '#7CB342' }}>"sentiment-analysis"</span>,{'\n'}
              {'  '}model=<span style={{ color: '#7CB342' }}>"distilbert-base-uncased-finetuned-sst-2-english"</span>,{'\n'}
              {'  '}device=<span style={{ color: '#64D9EF' }}>0</span>  <span style={{ color: '#64748B' }}># GPU 0</span>{'\n'}
              ){'\n\n'}
              resultado = classifier(<span style={{ color: '#7CB342' }}>"Este curso da Infnet superou todas as expectativas!"</span>){'\n'}
              <span style={{ color: '#64748B' }}>{"# Retorno: [{'label': 'POSITIVE', 'score': 0.9998}]"}</span>{'\n\n'}
              <span style={{ color: '#64748B' }}># Extração de Entidades Nomeadas (NER)</span>{'\n'}
              ner_pipe = pipeline(<span style={{ color: '#7CB342' }}>"ner"</span>, model=<span style={{ color: '#7CB342' }}>"dslim/bert-base-NER"</span>, aggregation_strategy=<span style={{ color: '#7CB342' }}>"simple"</span>){'\n'}
              entidades = ner_pipe(<span style={{ color: '#7CB342' }}>"Allan Spadini leciona inteligência artificial no Rio de Janeiro."</span>)
            </pre>
          ) : (
            <pre style={{ margin: 0 }}>
              <span style={{ color: '#64748B' }}># 2. Fine-Tuning de Baixo Nível com AutoClasses</span>{'\n'}
              <span style={{ color: '#FF7043' }}>from</span> transformers <span style={{ color: '#FF7043' }}>import</span> AutoTokenizer, AutoModelForSequenceClassification, Trainer, TrainingArguments{'\n\n'}
              <span style={{ color: '#64748B' }}># 1. Carregar Tokenizer e Modelo Pré-Treinado</span>{'\n'}
              model_name = <span style={{ color: '#7CB342' }}>"bert-base-uncased"</span>{'\n'}
              tokenizer = AutoTokenizer.from_pretrained(model_name){'\n'}
              model = AutoModelForSequenceClassification.from_pretrained(model_name, num_labels=<span style={{ color: '#64D9EF' }}>2</span>){'\n\n'}
              <span style={{ color: '#64748B' }}># 2. Configuração de Hiperparâmetros de Treino</span>{'\n'}
              training_args = TrainingArguments({'\n'}
              {'  '}output_dir=<span style={{ color: '#7CB342' }}>"./resultados_bert"</span>,{'\n'}
              {'  '}learning_rate=<span style={{ color: '#64D9EF' }}>2e-5</span>,          <span style={{ color: '#64748B' }}># LR pequeno para não destruir pesos</span>{'\n'}
              {'  '}per_device_train_batch_size=<span style={{ color: '#64D9EF' }}>16</span>,{'\n'}
              {'  '}num_train_epochs=<span style={{ color: '#64D9EF' }}>3</span>,{'\n'}
              {'  '}weight_decay=<span style={{ color: '#64D9EF' }}>0.01</span>,{'\n'}
              {'  '}evaluation_strategy=<span style={{ color: '#7CB342' }}>"epoch"</span>,{'\n'}
              {'  '}fp16=<span style={{ color: '#64D9EF' }}>True</span>                    <span style={{ color: '#64748B' }}># Aceleração Mista de Precisão</span>{'\n'}
              ){'\n\n'}
              <span style={{ color: '#64748B' }}># 3. Treinamento Automatizado</span>{'\n'}
              trainer = Trainer(model=model, args=training_args, train_dataset=dataset[<span style={{ color: '#7CB342' }}>"train"</span>], eval_dataset=dataset[<span style={{ color: '#7CB342' }}>"test"</span>]){'\n'}
              trainer.train()
            </pre>
          )}
        </div>

        {/* Right: Architectural Concepts */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '8px' }}>
          <div style={{ background: '#0D2742', padding: '10px', borderRadius: '6px', border: '1px solid #1E4976' }}>
            <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#64D9EF', display: 'block', marginBottom: '4px' }}>
              O Poder das "AutoClasses":
            </span>
            <p style={{ margin: 0, fontSize: '10.5px', color: '#CBD5E1', lineHeight: 1.4 }}>
              O <code style={{ color: '#64D9EF' }}>AutoTokenizer</code> e <code style={{ color: '#64D9EF' }}>AutoModel</code> inspecionam o repositório no Hugging Face Hub, identificam a arquitetura (BERT, RoBERTa, GPT) e instanciam a classe correta automaticamente sem você precisar importar cada variante manualmente!
            </p>
          </div>

          <div style={{ background: '#0D2742', padding: '10px', borderRadius: '6px', border: '1px solid #1E4976' }}>
            <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#7CB342', display: 'block', marginBottom: '4px' }}>
              Substituição Automática da Cabeça:
            </span>
            <p style={{ margin: 0, fontSize: '10.5px', color: '#CBD5E1', lineHeight: 1.4 }}>
              Ao passar <code style={{ color: '#7CB342' }}>num_labels=2</code>, o Hugging Face descarta a cabeça de pré-treino de 30.522 palavras (MLM) e instancia uma nova camada <code style={{ color: '#7CB342' }}>nn.Linear(768, 2)</code> com inicialização normal para a sua tarefa.
            </p>
          </div>

          <div style={{ background: 'rgba(27, 181, 216, 0.12)', padding: '8px 10px', borderRadius: '6px', border: '1px solid rgba(27, 181, 216, 0.3)', fontSize: '10px', color: '#E2E8F0' }}>
            📓 <strong>Hands-on Disponível:</strong> Toda essa lógica está implementada e pronta para execução no notebook <code style={{ color: '#64D9EF' }}>aula_03_bert_fine_tuning.ipynb</code>!
          </div>
        </div>
      </div>
    </div>
  );
}
