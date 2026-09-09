export const slidesData = [
  // =========================================================================
  // SLIDE 1: Título e Apresentação
  // =========================================================================
  {
    id: 1,
    type: 'title',
    category: 'Abertura & Apresentação',
    title: 'Visão Computacional com CNNs e Transformers — Aula 3',
    subtitle: 'BERT e Modelos Encoder-Only: Atenção Bidirecional Profunda, Pré-Treinamento (MLM & NSP) e Cabeças Plugáveis',
    author: 'Prof. Allan Spadini',
    topics: [
      'A Cegueira Unidirecional Causal',
      'Taxonomia Transformer: Encoder vs Decoder',
      'Anatomia Conceitual do BERT & StatQuest Flow',
      'O Superpoder das Cabeças Plugáveis',
      'Embeddings Triplos (Token, Segment, Position)',
      'Masked Language Model (MLM) & A Regra 80/10/10',
      'Next Sentence Prediction (NSP) & Coerência',
      'Fine-Tuning de Ponta a Ponta vs Feature Extraction',
      'Casos de Uso: Sentimento, NER (-100), SQuAD & SBERT',
      'Evolução do BERT: RoBERTa, DistilBERT & DeBERTa'
    ],
    notes: `Olá a todos e sejam muito bem-vindos à nossa Aula 3 da disciplina de Visão Computacional com CNNs e Transformers!

Na Aula 1, dominamos a evolução das redes neurais convolucionais (CNNs), analisando desde os filtros locais da AlexNet até as conexões residuais da ResNet e as arquiteturas de segmentação e detecção. Na Aula 2, desvendamos o mecanismo fundamental de Self-Attention, os tensores de Query, Key e Value, e o Bloco Transformer completo.

Hoje, entramos em um dos capítulos mais revolucionários de toda a inteligência artificial moderna: o modelo BERT — Bidirectional Encoder Representations from Transformers — e a família de redes Encoder-Only.

Compreenderemos por que os modelos autorregressivos sofrem de uma "cegueira unidirecional" ao processar texto e como o Google resolveu isso de forma genial com o Masked Language Model (MLM) e o Next Sentence Prediction (NSP). 

Mais importante ainda para a nossa disciplina: analisaremos a anatomia conceitual do BERT e a sacada arquitetural mais elegante da engenharia de Machine Learning: o conceito de CABEÇAS PLUGÁVEIS. Veremos como um mesmo backbone pré-treinado pode ter seu topo desacoplado para resolver classificação de sentimentos, reconhecimento de entidades com o desafio das subwords WordPiece, extração de respostas no SQuAD e busca semântica em milissegundos com Bi-Encoders.

E para coroar a aula, analisaremos as evoluções do BERT como RoBERTa, DistilBERT e DeBERTa, e consolidaremos todo o aprendizado em simuladores interativos de dimensionamento e no quiz de fixação técnica. Vamos começar!`
  },

  // =========================================================================
  // SLIDE 2: Situação-Problema do Mundo Real: A Cegueira Unidirecional
  // =========================================================================
  {
    id: 2,
    type: 'visual-component',
    component: 'BidirectionalContextDilemmaDiagram',
    category: 'Situação-Problema',
    tag: 'Causal vs Bidirecional',
    title: 'A Situação-Problema: A Cegueira Unidirecional',
    subtitle: 'Por que Modelos Causais (GPT e LSTMs) Falham na Compreensão Holística de Contexto',
    notes: `Para entender a genialidade do BERT, precisamos começar com a dor prática real enfrentada pela engenharia antes de 2018.

Até então, os modelos de linguagem predominantes eram autorregressivos, como o GPT-1 e as redes recorrentes LSTMs unidirecionais. Como funciona o aprendizado autorregressivo? Dado o início de uma frase, o modelo tenta prever estritamente o próximo token. Para que isso seja matematicamente possível sem que a rede "cole" da resposta, é obrigatório impor uma máscara causal triangular inferior na matriz de atenção. Ou seja: a palavra atual só tem permissão de olhar para trás, para o passado. O futuro é mascarado com menos infinito.

Vejam o exemplo no diagrama: a frase "O gerente do banco bloqueou meu cartão".
Se processamos a palavra "banco" de forma causal, o modelo só enxerga: "O gerente do banco". Ele não sabe o que vem a seguir! "Banco" é uma palavra altamente polissêmica: pode ser o banco da praça onde as pessoas sentam, ou uma instituição bancária financeira. É apenas quando lemos as palavras à direita — "bloqueou meu cartão" — que o cérebro humano desfaz instantaneamente a ambiguidade.

Se tentássemos rodar uma atenção bidirecional comum em um modelo tradicional, a rede "trapacearia": ela simplesmente copiaria a palavra visível da camada superior, arruinando o gradiente de perda.

Esse era o grande dilema da indústria: como permitir que uma rede neural enxergue simultaneamente para a esquerda e para a direita em todas as camadas, capturando o contexto tridimensional completo de uma palavra, sem que ela trapaceie no treinamento? É essa dor que gerou o BERT!`
  },

  // =========================================================================
  // SLIDE 3: A Família Transformer (Encoder vs Decoder vs Seq2Seq)
  // =========================================================================
  {
    id: 3,
    type: 'visual-component',
    component: 'TransformerFamilyTaxonomyDiagram',
    category: 'Solução de Engenharia',
    tag: 'Taxonomia Arquitetural',
    title: 'A Família Transformer: A Bifurcação das Arquiteturas',
    subtitle: 'Encoder-Only (BERT) vs Decoder-Only (GPT) vs Encoder-Decoder (T5)',
    notes: `Após a publicação do paper original de Vaswani et al. em 2017, a comunidade de deep learning descobriu que não precisava utilizar o Transformer completo com Encoder e Decoder para todos os problemas. A arquitetura se bifurcou em três grandes famílias, cada uma especializada em um tipo de cognição matemática:

1. À esquerda, temos a família ENCODER-ONLY, cujo expoente máximo é o BERT, além de RoBERTa, DeBERTa e o Vision Transformer (ViT). Aqui não existe máscara causal! A matriz de atenção é completa: cada token calcula o produto escalar com absolutamente todos os outros tokens da sequência. O objetivo não é gerar palavras uma a uma, mas sim extrair representações vetoriais ricas e densas que compreendam o significado global do texto.

2. No centro, temos a família DECODER-ONLY, celebrizada pela linha GPT da OpenAI, LLaMA da Meta, Claude e Mistral. Esses modelos usam atenção triangular mascarada. Seu único propósito é a geração contínua autorregressiva: prever a próxima palavra com base no histórico. São os motores por trás dos chatbots e assistentes conversacionais.

3. À direita, temos a família ENCODER-DECODER clássica, como o T5 e o BART. O Encoder lê uma sequência inteira bidirecionalmente e o Decoder gera uma nova sequência usando Cross-Attention. São ideais para tradução de idiomas (inglês para português) e sumarização de textos longos.

Na aula de hoje, o nosso foco absoluto está na primeira coluna: os modelos ENCODER-ONLY. Eles são a espinha dorsal de qualquer sistema de busca vetorial, análise de sentimentos, extração de dados em documentos fiscais e contratos, e como veremos no final da aula, são a estrutura exata adotada pela visão computacional moderna!`
  },

  // =========================================================================
  // SLIDE 4: A Anatomia da Arquitetura do BERT (StatQuest Style & Modular Output)
  // =========================================================================
  {
    id: 4,
    type: 'visual-component',
    component: 'BertHanddrawnStyleArchitectureDiagram',
    category: 'Arquitetura do BERT',
    tag: 'Fluxo Canônico',
    title: 'A Anatomia da Arquitetura do BERT: Da Palavra à Decisão',
    subtitle: 'Tokens, Projeções Lineares, Atenção Q/V/K, Context-Aware Embeddings e o Acoplamento de Cabeça',
    notes: `Observem com atenção este diagrama. Ele representa o modelo mental canônico que todo cientista de dados e engenheiro de machine learning deve ter gravado na memória ao trabalhar com BERT e redes Encoder-Only.

Vamos seguir o fluxo de baixo para cima, exatamente como os tensores fluem na GPU durante o forward pass:

1. Na base, temos as palavras de entrada: "Pizza", "is", "awesome", "great", e o token especial de encerramento.
2. Na etapa de Word Embedding, cada palavra é convertida em um vetor numérico inicial denso através de uma tabela de consulta (Lookup Table).
3. Esses vetores passam por uma projeção linear de pesos treináveis (as caixas diagonais) e recebem a adição (+) do Positional Encoding — aquelas curvas senoidais e gaussianas —, para que o modelo saiba onde cada palavra está posicionada na frase.
4. Agora vem o grande coração verde: o bloco de SELF-ATTENTION. Ali dentro ocorrem as projeções de Query (Q), Key (K) e Value (V). Diferente dos modelos causais, aqui todas as palavras calculam similaridade com todas as outras palavras simultaneamente.
5. Na saída da autoatenção, temos os retângulos horizontais: os CONTEXT-AWARE EMBEDDINGS (Embeddings Sensíveis ao Contexto). A palavra "Pizza" já não é um vetor estático de dicionário; ela agora carrega a informação contextual de que é "awesome" e "great"!
6. E no topo, vejam a seta magenta apontando para o gráfico: conectamos esses vetores contextuais a uma curva de classificação sigmóide com um "X" marcando a predição "Yes / No" (Sentimento positivo ou negativo)!

O grande insight pedagógico deste slide é o desacoplamento: o corpo do BERT (a parte inferior e intermediária) é um extrator de contexto universal. A cabeça no topo (o gráfico com a curva Yes/No) é apenas uma camada plugável que podemos trocar livremente para resolver qualquer tarefa do mundo real!`
  },

  // =========================================================================
  // SLIDE 5: O Conceito Chave: Cabeças Plugáveis (Task-Specific Heads)
  // =========================================================================
  {
    id: 5,
    type: 'visual-component',
    component: 'PluggableHeadsVisualizerDiagram',
    category: 'Solução de Engenharia',
    tag: 'Modularidade Extrema',
    title: 'O Conceito Chave: Cabeças Plugáveis (Task-Specific Heads)',
    subtitle: 'Um Único Backbone Pré-Treinado, Múltiplas Aplicações de Mercado',
    notes: `Antes do BERT, se uma empresa quisesse resolver quatro tarefas diferentes de linguagem natural — análise de sentimento em redes sociais, extração de nomes de clientes em contratos (NER), respostas a dúvidas de suporte (QA) e detecção de duplicatas —, ela precisava treinar quatro arquiteturas neurais completamente distintas do zero: uma rede LSTM para NER, uma CNN de texto para sentimento, uma rede siamesa para duplicatas.

O BERT inaugurou o paradigma moderno de fundação: "One Model to Rule Them All" (Um Modelo para Dominar Todos).

O backbone do BERT, com suas 12 camadas Transformer e 110 milhões de parâmetros treinados em bilhões de palavras da Wikipedia e BookCorpus, aprende a gramática, a sintaxe, as relações semânticas e o bom senso do idioma. Ele gera na saída um tensor de embeddings contextuais de dimensão [Batch, Comprimento, 768].

No topo desse tensor, nós simplesmente "plugamos" uma pequena cabeça linear específica para o nosso problema de negócio:
- Se o problema for Classificação de Sentimento ou Spam: plugamos uma camada Linear(768, K) sobre o vetor do token especial [CLS].
- Se o problema for Reconhecimento de Entidades Nomeadas (NER): plugamos uma camada Linear(768, C) sobre CADA token individual h_i.
- Se o problema for Question Answering Extrativo (SQuAD): plugamos dois vetores de 768 dimensões para prever os índices de Início e Fim da resposta no texto.
- Se o problema for Par de Sentenças (NLI): passamos as duas frases juntas e classificamos o [CLS] em Implicação ou Contradição.

Essa modularidade reduziu o tempo de desenvolvimento de semanas para poucas horas de Fine-Tuning!`
  },

  // =========================================================================
  // SLIDE 6: 🧪 Laboratório Interativo 1: Simulador de Cabeças Plugáveis do BERT
  // =========================================================================
  {
    id: 6,
    type: 'interactive',
    component: 'PluggableHeadsLab',
    category: 'Laboratório Interativo',
    tag: 'Hands-on Lab 1',
    title: '🧪 Laboratório 1: Simulador de Cabeças Plugáveis do BERT',
    subtitle: 'Alterne Entre as 4 Tarefas Canônicas e Inspecione os Tensores Conectados ao Topo',
    notes: `Vamos experimentar esse conceito na prática com o nosso primeiro laboratório interativo da aula.

Na tela, vocês têm quatro botões representando as quatro principais famílias de problemas de mercado:
1. Classificação de Sentimento;
2. Extração de Entidades (NER);
3. Question Answering Extrativo (SQuAD);
4. Par de Sentenças e Inferência Natural (NLI).

Ao clicar em cada tarefa, observem como o diagrama se reconfigura:
- Vejam o formato da entrada: em Sentimento temos uma frase única; em QA e NLI temos duas frases separadas pelo token [SEP].
- Observem o tensor que sobe do backbone do BERT: são sempre vetores de 768 dimensões.
- Reparem na cabeça conectada ao topo: em Sentimento, a cabeça é uma camada Linear(768, 3) que gera probabilidades para Positivo, Neutro e Negativo. Em NER, a cabeça atua sobre cada token para predizer se é B-PER (início de pessoa), I-PER (continuação de pessoa) ou B-LOC (localização). Em QA, reparem que a cabeça tem apenas 1.536 parâmetros no total (dois vetores de 768)!

Essa visualização cristaliza o poder da engenharia moderna: o modelo pesado já está pré-treinado; o engenheiro só precisa definir a interface da cabeça e calibrar os pesos finais!`
  },

  // =========================================================================
  // SLIDE 7: A Estrutura de Embeddings Tripla do BERT
  // =========================================================================
  {
    id: 7,
    type: 'visual-component',
    component: 'BertTripleEmbeddingDiagram',
    category: 'Teoria e Formalismo',
    tag: 'Embeddings 3D',
    title: 'A Estrutura de Embeddings Tripla do BERT',
    subtitle: 'A Soma Vetorial: Token Embeddings + Segment Embeddings + Position Embeddings',
    notes: `Vamos agora entrar no rigor formal de como o BERT constrói o tensor exato que entra na sua primeira camada Transformer.

Muitos pensam que a entrada do BERT é apenas o embedding da palavra mais o embedding da posição. No BERT original, existe uma terceira componente crucial: o Segment Embedding.

A equação fundamental de entrada é:
E_i = TokenEmbed(w_i) + SegmentEmbed(s_i) + PositionEmbed(i)

Observem as quatro faixas no slide:
1. Primeira faixa (Token Embeddings): O texto é tokenizado pelo algoritmo WordPiece (vocabulário de 30.522 tokens). Sempre iniciamos a sequência com o token especial [CLS] (índice 101) e usamos o token [SEP] (índice 102) como delimitador de frases.
2. Segunda faixa (Segment Embeddings): Para que o modelo saiba a qual frase pertence cada palavra quando passamos um par de frases (como em QA ou NSP), injetamos um vetor E_A para todos os tokens da Sentença A e um vetor E_B para todos os tokens da Sentença B.
3. Terceira faixa (Position Embeddings): Ao contrário de Vaswani et al. (2017), que utilizavam funções matemáticas fixas de seno e cosseno, o BERT utiliza vetores posicionais aprendidos via retropropagação de gradiente para cada índice de 0 a 511.

Esses três vetores de dimensão 768 são somados elemento a elemento (não concatenados!), resultando no tensor final que alimenta a primeira camada de Self-Attention com forma [Batch, Comprimento, 768].`
  },

  // =========================================================================
  // SLIDE 8: O Pré-Treinamento do BERT: O Objetivo 1 — Masked Language Model (MLM)
  // =========================================================================
  {
    id: 8,
    type: 'visual-component',
    component: 'MaskedLanguageModelDiagram',
    category: 'Treinamento & Objetivos',
    tag: 'Objetivo MLM',
    title: 'O Pré-Treinamento 1: Masked Language Model (MLM)',
    subtitle: 'A Tarefa Cloze, a Perda Cross-Entropy e a Regra de Ouro 80 / 10 / 10 da Google AI',
    notes: `Chegamos ao cerne da contribuição científica do paper do BERT: como treinar um modelo com atenção bidirecional profunda sem que ele trapaceie?

A resposta dos autores Jacob Devlin e colaboradores foi inspirada na clássica tarefa psicopedagógica de Cloze: mascarar palavras aleatórias no texto e pedir para o aluno preencher a lacuna.

No BERT, selecionamos aleatoriamente 15% de todos os tokens do texto. Apenas sobre essas posições calculamos o erro de previsão. Mas aqui entra uma sacada de engenharia espetacular da Google.

Se substituíssemos 100% dos tokens selecionados pelo token especial [MASK], ocorreria um grave problema chamado Discrepância de Pré-Treino vs Fine-Tuning. Por quê? Porque quando você colocar o modelo em produção na sua empresa para classificar um tweet ou contrato, o token [MASK] NUNCA estará presente no texto de entrada! Se a rede só soubesse raciocinar na presença de [MASK], suas representações para palavras normais seriam frágeis.

Para resolver isso, os pesquisadores criaram a famosa REGRA 80 / 10 / 10:
- Em 80% das vezes, o token selecionado é realmente substituído por [MASK] (ex: "meu cão é [MASK]");
- Em 10% das vezes, o token é substituído por uma palavra aleatória qualquer do vocabulário (ex: "meu cão é banana"), forçando o modelo a manter atenção vigilante e corrigir inconsistências contextuais;
- Em 10% das vezes, o token é mantido idêntico ao original (ex: "meu cão é fofo"), forçando a representação a preservar a identidade semântica da palavra real.

A função de perda é a Cross-Entropy computada estritamente sobre essas posições mascaradas, projetando o vetor de 768 dimensões de volta para as 30.522 probabilidades do vocabulário!`
  },

  // =========================================================================
  // SLIDE 9: 🧪 Laboratório Interativo 2: Simulador do Masked Language Model (MLM)
  // =========================================================================
  {
    id: 9,
    type: 'interactive',
    component: 'MLMInteractiveLab',
    category: 'Laboratório Interativo',
    tag: 'Hands-on Lab 2',
    title: '🧪 Laboratório 2: Simulador do Masked Language Model (MLM)',
    subtitle: 'Mascare Tokens em Tempo Real e Veja a Projeção de Softmax Sobre o Vocabulário',
    notes: `Vamos testar o Masked Language Model com as próprias mãos no nosso segundo laboratório interativo.

Temos na tela três frases de exemplo cobrindo diferentes domínios semânticos: finanças, geografia e redes neurais.
Observem a Frase 1: "O gerente do [MASK] bloqueou o cartão do cliente".

Vocês podem clicar em qualquer palavra para aplicar a máscara [MASK]. 
Vejam o que acontece no painel à direita:
- O vetor contextual oculto h_[MASK], que possui 768 números, é multiplicado pela matriz da cabeça do MLM de tamanho 30.522 por 768.
- O resultado passa pela função Softmax, gerando uma distribuição de probabilidades sobre todas as palavras possíveis do idioma.
- A palavra "banco" lidera com 88% de confiança, seguida por "sistema" (7%) e "aplicativo" (3%).
- Reparem na perda Cross-Entropy calculada no canto inferior esquerdo: ela é exatamente o logaritmo negativo da probabilidade atribuída à palavra correta: L = -log(0.88) = 0.1278. Quanto maior a certeza do modelo na palavra real, menor a perda!

Se testarem a Frase 2, verão que a palavra "capital" recebe 94% de probabilidade devido ao contexto forte de "Paris" e "França". O modelo aprendeu a estrutura do mundo sem nenhum rótulo humano supervisionado!`
  },

  // =========================================================================
  // SLIDE 10: O Pré-Treinamento do BERT: O Objetivo 2 — Next Sentence Prediction (NSP)
  // =========================================================================
  {
    id: 10,
    type: 'visual-component',
    component: 'NextSentencePredictionDiagram',
    category: 'Treinamento & Objetivos',
    tag: 'Objetivo NSP',
    title: 'O Pré-Treinamento 2: Next Sentence Prediction (NSP)',
    subtitle: 'Compreensão de Relacionamentos Inter-Sentenciais: IsNext (50%) vs NotNext (50%)',
    notes: `O Masked Language Model ensina o modelo a entender o relacionamento minucioso entre as palavras dentro de uma oração. Porém, muitas das tarefas mais valiosas de IA — como Question Answering, busca de documentos e inferência lógica —, exigem entender a relação de coerência entre DUAS frases inteiras.

Para ensinar essa habilidade ao modelo durante o pré-treinamento, os autores introduziram o segundo objetivo: o NEXT SENTENCE PREDICTION (NSP).

Como o NSP funciona na prática?
Construímos a entrada com duas frases A e B: [CLS] Sentença A [SEP] Sentença B [SEP].
- Em 50% das vezes, a Sentença B é a frase real que vinha logo em seguida no texto original (rotulada como IsNext, label = 1).
- Nos outros 50% das vezes, a Sentença B é uma frase escolhida aleatoriamente de qualquer outro documento do corpus (rotulada como NotNext, label = 0).

A predição é calculada exclusivamente no token especial [CLS] na posição zero. Uma pequena camada linear W_nsp multiplica o vetor h_[CLS] e aplica a função Softmax para gerar a probabilidade de continuidade. A função de custo é a entropia cruzada binária.

Embora variantes posteriores como o RoBERTa tenham demonstrado que o NSP pode ser descartado se treinarmos com sequências longas contínuas, o NSP foi o mecanismo seminal que permitiu ao BERT atingir resultados recordes no benchmark GLUE em 2018!`
  },

  // =========================================================================
  // SLIDE 11: 🧪 Laboratório Interativo 3: Inspetor de Pares e NSP
  // =========================================================================
  {
    id: 11,
    type: 'interactive',
    component: 'NSPInspectorLab',
    category: 'Laboratório Interativo',
    tag: 'Hands-on Lab 3',
    title: '🧪 Laboratório 3: Inspetor de Pares e NSP',
    subtitle: 'Inspecione a Coerência Semântica e a Decisão Binária no Vetor [CLS]',
    notes: `Chegamos ao nosso terceiro laboratório interativo, focado na inspeção de pares de frases e no comportamento do Next Sentence Prediction.

Experimentem alternar entre os três pares predefinidos na barra superior:
- O Par 1 apresenta a proposição da máquina universal de Turing seguida pela frase sobre os fundamentos da computação moderna. Observem o gráfico à direita: a probabilidade de "IsNext" salta para 98.5%! Por quê? Porque o mecanismo de atenção bidirecional cruzada conecta o termo "Esse modelo teórico" com "máquina universal".
- No Par 2, temos uma ruptura drástica: a frase A fala sobre redes Transformer e a frase B fala sobre a dieta de coalas. Vejam como o modelo atribui 99.2% de probabilidade para "NotNext"! Não há sobreposição lexical nem coerência temática.
- No Par 3, vemos a continuidade típica em operações bancárias (abertura de conta seguida por envio de cartão).

Observem a barra de formato no canto inferior esquerdo: o modelo processa tudo em um único tensor [Batch, Comprimento], mas graças aos Segment IDs (0 para A e 1 para B) e aos separadores [SEP], as representações internas mantêm as fronteiras de cada sentença perfeitamente delimitadas.`
  },

  // =========================================================================
  // SLIDE 12: A Função de Custo Conjunta e Especificações do BERT
  // =========================================================================
  {
    id: 12,
    type: 'visual-component',
    component: 'BertTrainingLossAndSpecsDiagram',
    category: 'Teoria e Infraestrutura',
    tag: 'Hiperparâmetros & Escala',
    title: 'A Função de Custo Conjunta e Especificações Oficiais',
    subtitle: 'Otimização Multitarefa: L_total = L_MLM + L_NSP e a Comparação BERT-Base vs Large',
    notes: `Vamos formalizar a mecânica de treinamento e a infraestrutura computacional que deu origem aos modelos oficiais disponibilizados pelo Google.

Durante o pré-treinamento, a perda total otimizada a cada passo de gradiente é simplesmente a soma das duas perdas:
L_total = L_MLM + L_NSP

O modelo é treinado de ponta a ponta com o otimizador AdamW (weight decay de 0.01), taxa de aprendizado de 1e-4 com aquecimento linear (warmup) nos primeiros 10.000 passos, e decaimento linear posterior. As ativações utilizam GELU (Gaussian Error Linear Unit) em vez de ReLU.

Vejam a tabela comparativa entre as duas variantes clássicas do paper:
- O BERT-Base possui 12 camadas Transformer Encoder, dimensão oculta H = 768, 12 cabeças de atenção (cada cabeça com dimensão d_k = 64), camada intermediária MLP de 3072 unidades, totalizando 110 milhões de parâmetros. Ele foi treinado em 16 Cloud TPUs durante 4 dias.
- O BERT-Large dobra o número de camadas para 24, eleva a dimensão oculta para H = 1024, 16 cabeças de atenção e MLP de 4096, totalizando 340 milhões de parâmetros. Ele exigiu 64 Cloud TPUs durante 4 dias contínuos.

O corpus de treinamento foi massivo para a época: o BookCorpus (800 milhões de palavras) somado a toda a Wikipedia em inglês (2.5 bilhões de palavras), totalizando mais de 3.3 bilhões de palavras processadas em lotes de 128.000 tokens por passo!`
  },

  // =========================================================================
  // SLIDE 13: Pre-training ➔ Fine-Tuning vs Feature Extraction
  // =========================================================================
  {
    id: 13,
    type: 'comparison',
    category: 'Estratégia de Engenharia',
    tag: 'Fine-Tuning vs Freeze',
    title: 'Estratégias de Aplicação: Fine-Tuning vs Feature Extraction',
    subtitle: 'Quando Descongelar o Backbone Inteiro e Quando Usar o BERT como Extrator Estático',
    cardLeft: {
      title: 'Opção A: Fine-Tuning de Ponta a Ponta',
      badge: 'Recomendado (Maior Acurácia)',
      points: [
        'Todos os 110M parâmetros do BERT permanecem destravados (requires_grad = True).',
        'Os gradientes da perda da sua tarefa fluem por todas as 12 camadas.',
        'Exige taxa de aprendizado muito baixa: entre 2e-5 e 5e-5 para não destruir o pré-treino (catastrophic forgetting).',
        'Convergência ultrarrápida: geralmente apenas 2 a 4 épocas de treino.',
        'Atinge a acurácia máxima em benchmarks como GLUE, SQuAD e SST-2.'
      ],
      highlight: 'Padrão da indústria para alcançar o Estado da Arte (SOTA).'
    },
    cardRight: {
      title: 'Opção B: Feature Extraction (Backbone Congelado)',
      badge: 'Econômico (Menos VRAM)',
      points: [
        'O backbone do BERT é 100% congelado (requires_grad = False).',
        'Atua como um conversor estático: texto bruto ➔ embedding vetorial de 768 dimensões.',
        'Treina-se apenas um classificador tradicional leve no topo: Regressão Logística, SVM, Random Forest ou MLP.',
        'Custo computacional irrisório: os embeddings podem ser pré-calculados e cacheados em disco uma única vez.',
        'Excelente para cenários de pouquíssimos dados anotados ou GPUs limitadas.'
      ],
      highlight: 'Ideal para prototipação rápida e bancos de dados vetoriais.'
    },
    callout: '💡 Regra de Ouro: Com GPU disponível e foco em performance máxima, adote SEMPRE o Fine-Tuning de ponta a ponta com AdamW e lr = 2e-5.',
    notes: `Ao aplicar o BERT em problemas reais de engenharia, você tem duas abordagens arquiteturais principais. É vital dominar os prós e contras de cada uma:

A Opção A é o FINE-TUNING DE PONTA A PONTA (End-to-End Fine-Tuning).
Aqui, acoplamos a cabeça da tarefa e deixamos todos os 110 milhões de parâmetros do modelo abertos para atualização. Mas atenção a uma armadilha clássica: você NUNCA deve usar a taxa de aprendizado padrão do PyTorch (como 1e-3 do Adam comum). Se você fizer isso, os gradientes iniciais altos destruirão os pesos refinados que o Google levou dias para aprender — fenômeno conhecido como Esquecimento Catastrófico (Catastrophic Forgetting). No fine-tuning do BERT, utilizamos taxas minúsculas, entre 2e-5 e 5e-5, e treinamos por apenas 2 a 4 épocas. O modelo adapta suas camadas superiores ao vocabulário específico do seu negócio e atinge o estado da arte.

A Opção B é a EXTRAÇÃO DE CARACTERÍSTICAS (Feature Extraction).
Aqui, congelamos 100% do BERT com torch.no_grad(). O modelo atua puramente como uma função matemática determinística que transforma qualquer texto em um vetor de 768 dimensões. Você pode rodar todo o seu dataset uma única vez, salvar esses vetores no disco ou no FAISS, e treinar um classificador simples como LogisticRegression ou SVM do scikit-learn. O treino leva segundos na CPU. É a escolha perfeita para protótipos e sistemas onde a GPU não está disponível para re-treinamento constante.`
  },

  // =========================================================================
  // SLIDE 14: Aplicação 1: Classificação de Sequências (Sentimento e Tópicos)
  // =========================================================================
  {
    id: 14,
    type: 'visual-component',
    component: 'SequenceClassificationArchitectureDiagram',
    category: 'Casos de Uso Práticos',
    tag: 'Sentimento & Tópicos',
    title: 'Aplicação 1: Classificação de Sequências de Texto',
    subtitle: 'Análise de Sentimentos, Detecção de Fraude e Tópicos com Pooling do Vetor [CLS]',
    notes: `Vamos agora dissecar em detalhes a primeira grande aplicação prática de mercado: a Classificação de Sequências (Sequence Classification).

Vejam o fluxo do tensor no diagrama:
O texto do cliente ("O serviço de atendimento ao cliente resolveu meu problema em minutos!") é tokenizado e recebe os delimitadores especiais [CLS] e [SEP]. O tensor resultante tem formato [Batch, Comprimento].

Esse tensor atravessa as 12 camadas de atenção bidirecional. Na saída da 12ª camada, temos o tensor last_hidden_state com formato [Batch, Comprimento, 768].
Agora vem a operação chave: o POOLING.
Em vez de fazer a média de todas as palavras, nós simplesmente extraímos a fatia de índice zero ao longo da dimensão da sequência:
h_[CLS] = last_hidden_state[:, 0, :]

Esse vetor de 768 números passa por uma camada de Dropout com probabilidade 0.1 e em seguida alimenta uma camada linear simples:
nn.Linear(in_features=768, out_features=num_labels)

Se estamos classificando sentimento em 3 categorias (Positivo, Neutro, Negativo), a camada gera 3 logits. A função Softmax converte esses logits na distribuição de probabilidade que vocês veem no painel à direita: 98.8% de probabilidade de sentimento positivo!

No Hugging Face, toda essa arquitetura é instanciada com apenas uma linha de código através da classe AutoModelForSequenceClassification!`
  },

  // =========================================================================
  // SLIDE 15: Aplicação 2: Classificação de Tokens (NER e o desafio do -100)
  // =========================================================================
  {
    id: 15,
    type: 'visual-component',
    component: 'TokenClassificationNERDiagram',
    category: 'Casos de Uso Práticos',
    tag: 'NER & POS Tagging',
    title: 'Aplicação 2: Classificação de Tokens (NER)',
    subtitle: 'Reconhecimento de Entidades e o Desafio Crítico de Alinhamento de Subwords com o Rótulo -100',
    notes: `A segunda aplicação prática é a Classificação de Tokens, utilizada em Reconhecimento de Entidades Nomeadas (NER) e etiquetagem morfossintática (POS Tagging).

Diferente da classificação de sentimentos, onde queremos um único rótulo para o texto inteiro, no NER queremos atribuir um rótulo a cada entidade mencionada: identificar nomes de pessoas (PER), empresas (ORG) e cidades (LOC).

Aqui surge um dos desafios de engenharia mais sutis e cruciais de todo o ecossistema NLP, que derruba muitos profissionais em entrevistas técnicas: o DESAFIO DO ALINHAMENTO DE SUBWORDS.

Vejam o exemplo na tela com a frase: "Steve Jobs fundou a Apple em Cupertino".
O tokenizer WordPiece quebra a palavra "Cupertino" em três subpalavras: "Cu", "##pert" e "##ino".
Se o nosso dataset de treino tinha o rótulo B-LOC para a palavra "Cupertino", o que fazemos com os pedaços "##pert" e "##ino"?
Se atribuirmos B-LOC para os três pedaços, o modelo achará que a frase menciona três cidades diferentes!

A solução de engenharia adotada pela comunidade é brilhante:
1. Atribuímos o rótulo real B-LOC apenas para a primeira subword ("Cu");
2. Para as subwords seguintes ("##pert" e "##ino"), assim como para os tokens especiais [CLS] e [SEP], atribuímos o rótulo numérico especial -100!
3. Por que exatamente o número -100? Porque no PyTorch, a função de perda nn.CrossEntropyLoss possui por padrão o parâmetro ignore_index = -100.

Ao encontrar o valor -100, a função de perda simplesmente ignora essa posição no cálculo do erro e na propagação do gradiente! Assim, o modelo aprende a reconhecer entidades sem ser penalizado pela fragmentação de subpalavras.`
  },

  // =========================================================================
  // SLIDE 16: Aplicação 3: Question Answering Extrativo (SQuAD)
  // =========================================================================
  {
    id: 16,
    type: 'visual-component',
    component: 'ExtractiveQASquadDiagram',
    category: 'Casos de Uso Práticos',
    tag: 'SQuAD & QA Extrativo',
    title: 'Aplicação 3: Question Answering Extrativo (SQuAD)',
    subtitle: 'Localização Precisa de Respostas em Documentos: Os Vetores de Start e End Logits',
    notes: `A terceira grande aplicação é o Question Answering Extrativo, popularizado pelo dataset SQuAD da Universidade de Stanford.

Em ambientes corporativos — como busca em manuais técnicos, apólices de seguro ou jurisprudência jurídica —, muitas vezes você não quer que uma IA generativa invente respostas livres que possam conter alucinações. Você quer que a IA localize e extraia o trecho exato e oficial do texto original que responde à pergunta do usuário.

Como o BERT resolve isso matematicamente?
A entrada é formatada concatenando a Pergunta e o Documento de Contexto:
[CLS] Qual monumento foi inaugurado em 1889? [SEP] A Torre Eiffel foi inaugurada em 1889 em Paris. [SEP]

O modelo aprende apenas DOIS vetores lineares durante o treino:
- O vetor de Início S (Start Vector) com dimensão 768;
- O vetor de Fim E (End Vector) com dimensão 768.

Para cada palavra do contexto com vetor contextual h_i, calculamos:
- A pontuação de início: s_i = S · h_i
- A pontuação de fim: e_j = E · h_j

Aplicamos a função Softmax sobre todos os tokens do contexto para obter a probabilidade de cada palavra ser o ponto de partida e o ponto de término da resposta.
A resposta final é o trecho de texto delimitado pelos índices (i, j) que maximiza a soma das pontuações s_i + e_j, com a restrição lógica de que o término j deve vir após o início i.

Vejam o gráfico no slide: o pico de início ocorre em "Torre" (92%) e o pico de fim ocorre em "Eiffel" (94%). O modelo extrai com precisão cirúrgica a resposta "Torre Eiffel" diretamente do documento original!`
  },

  // =========================================================================
  // SLIDE 17: Aplicação 4: Busca Semântica e Retrieval (Bi-Encoder vs Cross-Encoder)
  // =========================================================================
  {
    id: 17,
    type: 'visual-component',
    component: 'BiEncoderVsCrossEncoderDiagram',
    category: 'Casos de Uso Práticos',
    tag: 'Busca Semântica & RAG',
    title: 'Aplicação 4: Busca Semântica e Bancos Vetoriais',
    subtitle: 'A Revolução do Sentence-BERT: Como Sair de Horas para Milissegundos com Bi-Encoders',
    notes: `Chegamos à aplicação que sustenta a maioria das arquiteturas modernas de RAG (Retrieval-Augmented Generation) e motores de busca corporativos: a Busca Semântica Vetorial.

Aqui temos um gargalo clássico de computação em escala.
Se usarmos o BERT na forma tradicional de Cross-Encoder — passando a pergunta do usuário e um documento concatenados —, o modelo tem precisão altíssima, porque cada palavra da pergunta interage com cada palavra do documento em todas as 12 camadas de atenção. Mas imaginem que sua empresa tenha 10 milhões de documentos. Para cada busca de um cliente, você teria que rodar o BERT 10 milhões de vezes! A busca levaria horas e custaria milhares de dólares em GPUs.

A solução de engenharia definitiva foi criada por Nils Reimers em 2019 com o SENTENCE-BERT (SBERT) e a arquitetura de BI-ENCODERS.

Como o Bi-Encoder funciona?
Ele processa a Pergunta e os Documentos de forma independente.
1. Todos os 10 milhões de documentos da empresa são processados pelo BERT previamente, em batch offline. Para cada documento, calculamos o vetor médio das palavras (Mean Pooling) e obtemos um vetor numérico fixo de 768 dimensões.
2. Esses 10 milhões de vetores são salvos em um banco de dados vetorial indexado (como FAISS, Chroma ou Pinecone).
3. Quando o usuário digita uma busca em tempo real, rodamos o BERT uma única vez para converter a pergunta em um vetor u.
4. Fazemos a busca por Similaridade de Cosseno no banco vetorial. Graças a algoritmos de vizinhos mais próximos aproximados (ANN), encontramos os documentos mais similares em apenas 5 milissegundos!

Na indústria, o padrão ouro é o pipeline em dois estágios mostrado no slide: o Bi-Encoder recupera os 100 documentos mais relevantes em 5ms, e um Cross-Encoder BERT faz o reranking minucioso dos top 10 em 25ms. Precisão máxima e latência de tempo real!`
  },

  // =========================================================================
  // SLIDE 18: Evoluções do BERT: RoBERTa, DistilBERT, ALBERT e DeBERTa
  // =========================================================================
  {
    id: 18,
    type: 'visual-component',
    component: 'BertEvolutionFamilyTreeDiagram',
    category: 'Evolução Tecnológica',
    tag: 'Árvore Genealógica',
    title: 'A Árvore Genealógica das Evoluções do BERT',
    subtitle: 'De 2018 aos Dias Atuais: RoBERTa, DistilBERT, ALBERT e DeBERTa',
    notes: `Após o impacto monumental do paper do BERT em 2018, os principais laboratórios de pesquisa do mundo começaram a dissecar a arquitetura para entender o que realmente importava e onde estavam os gargalos. Isso deu origem a uma família brilhante de sucessores:

1. O RoBERTa (Robustly Optimized BERT Approach), desenvolvido pelo Facebook AI (Meta) em 2019. Os pesquisadores descobriram que o BERT original do Google estava severamente "subtreinado". Eles removeram completamente a tarefa de NSP (mostrando que ela não ajudava ou até atrapalhava), adotaram o mascaramento dinâmico (a cada época, palavras diferentes eram mascaradas), aumentaram o tamanho do batch de 256 para 8.000 sequências, e treinaram com 160 GB de texto — 10 vezes mais dados! O RoBERTa superou o BERT com folga em todos os benchmarks.

2. O DistilBERT, criado pela Hugging Face em 2019. Focado em eficiência de produção e latência em CPUs. Usando técnicas de destilação de conhecimento (onde um modelo professor guia o aluno), eles reduziram o BERT de 12 para 6 camadas. O DistilBERT é 40% menor, 60% mais rápido em inferência, e preserva 97% da capacidade do modelo completo. É o modelo padrão para APIs em tempo real.

3. O ALBERT (A Lite BERT), da Google e Toyota, que introduziu o compartilhamento de pesos entre camadas e a fatoração da matriz de embeddings, reduzindo parâmetros de 110M para apenas 12M.

4. E o DeBERTa (Decoding-enhanced BERT with Disentangled Attention), da Microsoft (2020/2021). O DeBERTa separou os vetores de conteúdo e posição relativa em matrizes desacopladas. Ele foi o primeiro modelo de linguagem a superar a linha de base humana média no rigoroso benchmark SuperGLUE.

Como engenheiros de IA, esse panorama nos dá clareza de escolha: DistilBERT para velocidade, RoBERTa para robustez geral e DeBERTa para precisão analítica extrema!`
  },

  // =========================================================================
  // SLIDE 19: 🧪 Laboratório Interativo 4: Comparador de Modelos Encoder-Only
  // =========================================================================
  {
    id: 19,
    type: 'interactive',
    component: 'EncoderModelsComparisonLab',
    category: 'Laboratório Interativo',
    tag: 'Hands-on Lab 4',
    title: '🧪 Laboratório 4: Comparador de Modelos Encoder-Only',
    subtitle: 'Simule o Consumo de VRAM, Latência de Inferência e Throughput em Função do Batch e Sequência',
    notes: `No nosso quarto laboratório interativo, vamos atuar como arquitetos de infraestrutura de Machine Learning, simulando o comportamento desses modelos sob diferentes cargas de trabalho.

Na interface superior, vocês podem selecionar entre DistilBERT, BERT-Base, RoBERTa, DeBERTa e BERT-Large.
Abaixo, temos dois controles deslizantes fundamentais para qualquer dimensionamento de cluster:
- O Tamanho do Batch (de 1 a 64 sequências);
- O Comprimento da Sequência de Tokens (de 32 até o limite máximo de 512 tokens).

Observem os cálculos em tempo real no painel à direita:
1. Reparem na VRAM Estimada: os pesos ocupam um espaço fixo (440MB para BERT-Base em FP32, 264MB para DistilBERT). Porém, a memória das ativações intermediárias cresce com o tamanho do batch e explode com o quadrado do comprimento da sequência devido ao termo O(L²) da atenção!
2. Experimentem puxar a sequência para 512 tokens e o batch para 64: vejam a VRAM necessária subir e a latência de inferência aumentar.
3. Comparem o DistilBERT com o BERT-Large: o DistilBERT atinge throughputs de centenas de sequências por segundo com apenas 4 milissegundos de latência, enquanto o BERT-Large requer hardware muito mais robusto.

Essa simulação permite tomar decisões conscientes de engenharia: dimensionar corretamente instâncias na AWS ou Google Cloud antes de colocar o modelo em produção!`
  },

  // =========================================================================
  // SLIDE 20: 🧪 Laboratório Interativo 5: Quiz de Fixação de Conhecimentos sobre BERT
  // =========================================================================
  {
    id: 20,
    type: 'interactive',
    component: 'QuizBert',
    category: 'Laboratório Interativo',
    tag: 'Hands-on Lab 5',
    title: '🧪 Laboratório 5: Quiz de Fixação de Conhecimentos sobre BERT',
    subtitle: 'Desafie seu Conhecimento em 4 Perguntas Rigorosas de Nível Pós-Graduação',
    notes: `Para encerrar a nossa aula com chave de ouro, vamos realizar o nosso Quiz Interativo de Fixação de Conhecimentos.

Este quiz contém quatro perguntas técnicas elaboradas rigorosamente sobre os conceitos-chave que exploramos hoje:
1. A motivação matemática do Masked Language Model vs Atenção Causal;
2. O papel essencial do valor -100 na CrossEntropyLoss para o tratamento de subwords no NER;
3. O funcionamento da cabeça de Question Answering Extrativo via vetores Start e End;
4. E a arquitetura de Bi-Encoders (Sentence-BERT) para busca semântica escalável em bancos vetoriais.

Respondam a cada questão na tela para receber feedback imediato, entender a justificativa analítica de cada alternativa e checar sua pontuação final de domínio do tema. Parabéns a todos pelo empenho e nos vemos na próxima aula!`
  }
];
