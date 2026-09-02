export const slidesData = [
  // =========================================================================
  // SLIDE 1: Título e Apresentação
  // =========================================================================
  {
    id: 1,
    type: 'title',
    category: 'Abertura & Apresentação',
    title: 'Visão Computacional com CNNs e Transformers — Aula 2',
    subtitle: 'Tudo o Que Você Precisa É de Atenção: Tokenização BPE, Self-Attention e o Bloco Transformer Completo',
    author: 'Prof. Allan Spadini',
    topics: [
      'Recap: Segmentação U-Net',
      'Completação & BPE Tokenizer',
      'O Que São Embeddings & Semântica',
      'A Matriz Look-up Table & Contexto',
      'Dot-Product Attention (Q, K, V)',
      'O Dilema da Ordem & Embeddings de Posição',
      'Máscara Causal & Multi-Head',
      'Arquitetura Seq2Seq para Tradução',
      'Bloco Transformer, Pre-LN & ViT'
    ],
    notes: `Olá a todos e sejam muito bem-vindos à nossa Aula 2 da disciplina de Visão Computacional com CNNs e Transformers!

Na aula anterior, estudamos a evolução histórica das redes convolucionais, desde o LeNet-5 e AlexNet até os blocos residuais da ResNet e modelos pré-treinados do TorchVision. Como na última aula não deu tempo de aprofundar no desenho da arquitetura de segmentação semântica, começaremos hoje com uma breve recapitulação visual da U-Net e de suas conexões de atalho, criando a ponte conceitual perfeita para os Transformers.

O grande coração da aula de hoje é desmistificar os Transformers de ponta a ponta, de maneira extremamente didática, intuitiva e rigorosa. Veremos o paradigma da completação de sequências, a tokenização Byte-Pair Encoding (BPE), os embeddings contínuos no espaço latente, o mecanismo de atenção produto escalar escalado passo a passo (Queries, Keys e Values), o dilema da ordem e a injeção de embeddings de posição, a máscara causal e a Multi-Head Attention, a arquitetura clássica de tradução Encoder-Decoder, até juntarmos tudo no Bloco Transformer completo e mostrarmos como tudo isso se conecta diretamente à visão computacional com os Vision Transformers (ViT).

Para tornar essa jornada leve e memorável, usaremos ao longo da aula exemplos inspirados na icônica canção dos Beatles: 'All You Need Is Love' — ou melhor, 'Tudo o que você precisa é de atenção'! Vamos começar!`
  },

  // =========================================================================
  // SLIDE 2: Recapitulação da Segmentação Semântica (U-Net)
  // =========================================================================
  {
    id: 2,
    type: 'visual-component',
    component: 'SemanticSegmentationBridgeDiagram',
    category: 'Recapitulação & Ponte',
    tag: 'U-Net vs Transformers',
    title: 'Recapitulação: A Anatomia da Segmentação Semântica',
    subtitle: 'U-Net, Conexões Skip Densas e a Transição da Grade de Pixels para Sequências',
    notes: `Para começarmos, vamos honrar o tópico pendente da Aula 1: a arquitetura da Segmentação Semântica.

Diferente da classificação ou detecção de bounding boxes, na segmentação semântica nossa meta é classificar cada pixel individual da imagem em uma categoria (rua, pedestre, carro, fundo).

A arquitetura clássica que revolucionou essa tarefa é a U-Net, criada por Olaf Ronneberger em 2015. Observem o diagrama em formato de 'U':
1. À esquerda, temos o Encoder (Caminho Contrátil), que aplica convoluções e MaxPool para comprimir a resolução espacial e extrair características semânticas de alto nível no Gargalo (Bottleneck);
2. À direita, temos o Decoder (Caminho Expansivo), que aplica convoluções transpostas para restaurar a imagem à resolução original H × W;
3. O grande segredo da U-Net são as Skip Connections horizontais (em laranja): elas copiam os mapas de alta resolução do Encoder diretamente para o Decoder, preservando contornos e bordas finas que se perderiam na compressão.

Ao final, uma convolução 1x1 aplica a função Softmax em cada coordenada (x, y) para gerar a máscara de classes. 

Mas reparem na limitação inerente: as convoluções processam janelas locais 3x3. E se quiséssemos que qualquer parte da imagem se comunicasse instantaneamente com qualquer outra, com alcance global? É exatamente essa a faísca que nos leva aos Transformers!`
  },

  // =========================================================================
  // SLIDE 3: O Paradigma da Completação (Next-Token Prediction)
  // =========================================================================
  {
    id: 3,
    type: 'visual-component',
    component: 'CompletionParadigmDiagram',
    category: 'Fundamentos de Sequências',
    tag: 'Next-Token Generation',
    title: 'O Paradigma da Completação: Previsão do Próximo Token',
    subtitle: 'Modelagem de Linguagem Autorregressiva: P(xt | x1, ..., xt-1)',
    notes: `Vamos entrar agora no núcleo dos Transformers compreendendo o grande paradigma que move toda a inteligência artificial moderna: a Predição Autorregressiva do Próximo Token.

Em vez de treinar modelos para tarefas isoladas e engessadas, formulamos o aprendizado como um jogo de completação de sequências: dado um histórico de tokens anteriores x_1 até x_{t-1}, qual é a probabilidade do token seguinte x_t?

Vejam a animação na tela usando a letra dos Beatles:
- Se passamos como prompt contextual: "Tudo o que você precisa é de...", o Transformer processa todas essas palavras simultaneamente e calcula uma distribuição de probabilidades sobre todo o seu vocabulário;
- A palavra "amor" recebe a maior probabilidade (94.2%). O modelo seleciona "amor" e o anexa ao prompt;
- No passo seguinte, com "Tudo o que você precisa é de amor", o modelo prevê a vírgula (",");
- Em seguida, prevê a repetição rítmica: "amor"!

O que torna esse paradigma genial é que qualquer problema — seja gerar código, traduzir idiomas, responder perguntas ou até gerar pixels de uma imagem — pode ser reduzido a prever o próximo elemento de uma sequência condicionado ao contexto!`
  },

  // =========================================================================
  // SLIDE 4: O Pipeline Completo de um Transformer
  // =========================================================================
  {
    id: 4,
    type: 'card-grid',
    category: 'Visão Geral',
    tag: 'End-to-End Pipeline',
    title: 'O Pipeline Completo de Processamento em Transformers',
    subtitle: 'Da String Bruta à Distribuição de Probabilidades no Vocabulário',
    cards: [
      {
        icon: 'Scissors',
        iconColor: 'icon-blue',
        title: '1. Tokenização BPE',
        points: [
          'Decompõe o texto bruto em subpalavras estatísticas e bytes.',
          'Mapeia cada pedaço para um índice inteiro único no vocabulário.',
          'Elimina completamente o problema de palavras fora do vocabulário (OOV).'
        ]
      },
      {
        icon: 'Database',
        iconColor: 'icon-cyan',
        title: '2. Embeddings & Posição',
        points: [
          'Converte os IDs inteiros em vetores densos contínuos em ℝ^d_model.',
          'Injeta sinal de ordem espacial/temporal via Embeddings de Posição.',
          'Forma a matriz de entrada do modelo com formato [Batch, T, d_model].'
        ]
      },
      {
        icon: 'GitFork',
        iconColor: 'icon-green',
        title: '3. Atenção Multi-Head',
        points: [
          'Múltiplas cabeças projetam o sinal em Queries, Keys e Values.',
          'Calcula matrizes de afinidade direta entre todos os pares de tokens.',
          'Aplica máscara causal (se autorregressivo) e conexões residuais.'
        ]
      },
      {
        icon: 'Sparkles',
        iconColor: 'icon-orange',
        title: '4. MLP & Head de Saída',
        points: [
          'Rede Feed-Forward com expansão 4x atua como memória associativa.',
          'Camada Linear projeta os vetores de volta para a dimensão do vocabulário |V|.',
          'Softmax gera as probabilidades finais de completação ou classe.'
        ]
      }
    ],
    callout: 'Tudo o que você precisa é de atenção: cada componente do pipeline desempenha um papel matemático estrito na transformação de símbolos em inteligência.',
    notes: `Antes de mergulharmos nas fórmulas matemáticas de cada etapa, vamos olhar o mapa completo da montanha que escalaremos hoje. O processamento de um Transformer é estruturado em 4 grandes fases consecutivas:

1. A Tokenização BPE, que transforma texto em números discretos (IDs inteiros);
2. A Tabela de Embeddings e a Injeção de Posição, que convertem esses inteiros em vetores contínuos no espaço latente e avisam a rede sobre a ordem da frase;
3. O Bloco de Autoatenção Multi-Head, que permite que as palavras conversem entre si e misturem seus significados dinamicamente;
4. As Camadas Feed-Forward (MLP) e o LM Head de saída, que refinam as representações e projetam as probabilidades finais no vocabulário.

Vamos dissecar agora cada uma dessas etapas, começando pela porta de entrada: a Tokenização Subword!`
  },

  // =========================================================================
  // SLIDE 5: Tokenização Subword & Byte-Pair Encoding (BPE)
  // =========================================================================
  {
    id: 5,
    type: 'visual-component',
    component: 'BPETokenizerDiagram',
    category: 'Pré-Processamento',
    tag: 'BPE & Tiktoken',
    title: 'Tokenização Subword: O Algoritmo Byte-Pair Encoding (BPE)',
    subtitle: 'Superando o Dilema entre Caracteres Isolados e Palavras Inteiras',
    notes: `Como uma rede neural só entende números e tensores, precisamos de uma forma de converter texto em números. Historicamente, tínhamos dois extremos ruins:
- Tokenização por caractere: gerava sequências gigantescas e exigia um custo computacional proibitivo, além de caracteres isolados carregarem pouca semântica;
- Tokenização por palavra inteira: gerava vocabulários infinitos e qualquer erro de digitação ou palavra rara virava [UNK] (Out of Vocabulary).

A solução que virou padrão absoluto na indústria é a tokenização por subpalavras, em especial o algoritmo Byte-Pair Encoding (BPE), utilizado pelo GPT-2, GPT-4 (via tiktoken) e LLaMA.

O BPE funciona por fusão estatística iterativa:
1. Começa com todos os 256 bytes UTF-8 individuais como vocabulário base;
2. Percorre um gigantesco corpus de treino e conta os pares adjacentes mais frequentes;
3. Funde os pares mais frequentes (ex: 'a' + 'm' vira 'am', e 'am' + 'or' vira 'amor');
4. Repete até atingir o tamanho de vocabulário desejado (ex: 50.257 tokens no GPT-2).

O resultado é brilhante: palavras comuns viram 1 único token; palavras complexas viram 2 ou 3 pedaços; e emojis ou bytes raros são representados perfeitamente sem nunca dar erro de OOV!`
  },

  // =========================================================================
  // SLIDE 6: 🧪 Laboratório Interativo 1: Tokenizador BPE
  // =========================================================================
  {
    id: 6,
    type: 'interactive',
    component: 'BPETokenizerExplorer',
    category: 'Laboratório Prático',
    tag: 'Hands-on BPE',
    title: 'Laboratório Interativo 1: Explorador de Tokenização BPE',
    subtitle: 'Experimente com Letras dos Beatles e Inspecione IDs, Bytes e Embeddings',
    notes: `Chegamos ao nosso primeiro Laboratório Interativo! Convido todos a experimentarem na tela.

Temos aqui versos clássicos da canção 'All You Need Is Love':
- Cliquem no botão 'Refrão Principal': "Tudo o que você precisa é de amor";
- Notem como o tokenizador quebra a frase em chips coloridos. Reparem que o espaço antes das palavras é preservado como parte do token;
- Cliquem no chip 'amor' ou 'precisa' para abrir o Inspetor à direita: vocês verão o ID numérico associado no vocabulário, a sequência de bytes UTF-8 em hexadecimal e um preview do vetor de embedding correspondente na memória;
- Testem o verso 'Verso Complexo 1': "não há nada que você possa fazer que não possa ser feito". Vejam a taxa de compressão: 55 caracteres foram codificados em apenas 12 tokens!

Esse mapeamento discreto de IDs é a entrada que será convertida em tensores contínuos no próximo slide.`
  },

  // =========================================================================
  // SLIDE 7: O Que São Embeddings? Do One-Hot ao Hiperespaço Semântico
  // =========================================================================
  {
    id: 7,
    type: 'visual-component',
    component: 'SemanticEmbeddingSpaceDiagram',
    category: 'Representação Vetorial',
    tag: 'Semantic Space & Learning',
    title: 'O Que São Embeddings? Do One-Hot ao Hiperespaço Semântico',
    subtitle: 'Hipótese Distribucional de Firth, Similaridade Cosseno e o Treinamento End-to-End',
    notes: `Uma das dúvidas mais frequentes quando começamos a estudar Transformers é: afinal, como transformamos palavras ou tokens em embeddings? Isso é feito por um modelo separado? E como a rede consegue capturar a relação entre palavras de significado próximo?

Vamos esclarecer isso em 3 pontos fundamentais:

1. É um modelo separado?
Historicamente, na década passada (2013-2014), utilizávamos modelos independentes como o Word2Vec (Skip-Gram/CBOW) ou GloVe para gerar vetores estáticos de palavras. Mas nos Transformers modernos — como GPT-4, LLaMA e Vision Transformers — o embedding NÃO é um modelo externo! Ele é simplesmente a primeiríssima camada treinável da própria rede neural: a Look-up Table de pesos W_E, declarada no PyTorch via nn.Embedding(vocab_size, d_model).

2. Qual a grande vantagem em relação ao One-Hot Encoding?
Se usássemos One-Hot Encoding, cada palavra seria um vetor gigante de 50.257 posições contendo apenas um número '1' e milhares de 'zeros'. Além de um desperdício colossal de memória, vetores One-Hot são estritamente ortogonais: o produto escalar entre qualquer par de palavras é sempre zero! Para um One-Hot, a palavra 'amor' é tão distante de 'afeto' ou 'carinho' quanto é de 'computador' ou 'trator'. Com embeddings densos em 768 dimensões contínuas, representamos o significado através de coordenadas no espaço latente. A proximidade semântica é medida naturalmente pela Similaridade Cosseno (cos θ), onde palavras afins apontam para direções quase idênticas!

3. Como o modelo aprende essas relações semânticas?
Os embeddings começam com números completamente aleatórios. O aprendizado acontece graças à célebre Hipótese Distribucional da linguística formulada por John Rupert Firth em 1957: 'Você conhecerá uma palavra pela companhia que ela mantém'. Quando o Transformer é treinado em bilhões de textos para prever a próxima palavra, frases como 'Tudo o que você precisa é de amor' e 'Tudo o que você precisa é de carinho' produzem previsões e erros similares. O algoritmo de Backpropagation atualiza as linhas da tabela de embeddings na mesma direção de gradiente. Com isso, o hiperespaço se auto-organiza organicamente em clusters semânticos (sentimentos, ações, objetos) e desenvolve propriedades geométricas surpreendentes, permitindo até álgebra vetorial — como a famosa analogia 'rei - homem + mulher ≈ rainha'!`
  },

  // =========================================================================
  // SLIDE 8: A Matriz Look-up Table e o Tensor 3D de Saída
  // =========================================================================
  {
    id: 8,
    type: 'visual-component',
    component: 'TokenEmbeddingContextDiagram',
    category: 'Representação Vetorial',
    tag: 'Look-up Table & Tensors',
    title: 'A Matriz Look-up Table e o Tensor 3D de Saída',
    subtitle: 'Mapeamento WE ∈ ℝ^(|V| × d_model), Leitura O(1) e o Tensor [B, T, d_model]',
    notes: `Agora que compreendemos a teoria e a geometria dos embeddings semânticos, vamos ver como essa camada opera na prática dentro da arquitetura Transformer.

No PyTorch, a camada nn.Embedding(50257, 768) funciona como uma gigantesca matriz Look-up Table de 50.257 linhas por 768 colunas:
1. Para cada token discreto da nossa sequência de entrada — como 'Tudo' (ID 1420) ou 'amor' (ID 8954) —, a GPU realiza uma leitura direta de linha na memória VRAM em tempo constante O(1), sem nenhuma multiplicação matricial cara;
2. Esses vetores contínuos de 768 números float são empilhados para formar o nosso Tensor Denso 3D de saída, com formato [Batch, Sequence Length T, d_model];
3. Em termos de consumo de memória, uma sequência de T=1024 com d=768 e lote B=16 consome cerca de 50 MB apenas nesta ativação.

Agora, como essa sequência de tokens é delimitada e enviada para o modelo gerar novas previsões? Vamos entender a fundo o conceito de Janela de Contexto no próximo slide!`
  },

  // =========================================================================
  // SLIDE 9: Janela de Contexto: Quantidade de Tokens por Solicitação
  // =========================================================================
  {
    id: 9,
    type: 'visual-component',
    component: 'ContextWindowDiagram',
    category: 'Representação Vetorial',
    tag: 'Janela de Contexto & Autogeração',
    title: 'Janela de Contexto: Quantidade de Tokens por Solicitação',
    subtitle: 'A Matriz de Entrada [T × d_model] e o Paradigma da Completação Autoregressiva',
    notes: `Com a matriz de embeddings compreendida, chegamos a um conceito central no ecossistema de LLMs e Transformers: a Janela de Contexto (Context Window).

A Janela de Contexto define exatamente a quantidade máxima de tokens que o modelo consegue processar simultaneamente em uma única passagem direta.

Vejamos como isso se estrutura na prática:
1. No diagrama à esquerda, temos a nossa matriz de sequência para a famosa frase de Sócrates: "Eu sei que nada". Cada linha representa a posição de uma palavra no tempo (t=0, t=1, t=2, t=3), e cada coluna armazena as suas 768 dimensões contínuas de features;
2. Para uma janela com context = 4, o tensor de entrada possui formato [Batch, T=4, d=768]. O modelo enxerga toda a oração de uma só vez na memória;
3. No lado direito, temos a pergunta fundamental que move o treinamento e a geração de texto: "Qual a completação desse texto?". O Transformer processa os 4 tokens e calcula uma distribuição Softmax sobre todo o vocabulário para prever o próximo token na posição t=4: a palavra "sei" surge com 94.2% de probabilidade, completando com perfeição o pensamento "Eu sei que nada sei";
4. Reparem no controle interativo: se reduzirmos a janela para context = 2 (deixando apenas "que nada"), o modelo perde o sujeito inicial "Eu", e a predição fica difusa e confusa.

A janela de contexto impõe um desafio computacional enorme porque a autoatenção possui custo quadrático O(T²). No próximo slide, vamos fazer uma pausa estratégica para olhar o mapa geral da arquitetura e ver exatamente onde estamos na rede antes de mergulhar na Autoatenção!`
  },

  // =========================================================================
  // SLIDE 10: Mapa da Arquitetura: Onde Estamos na Rede Transformer?
  // =========================================================================
  {
    id: 10,
    type: 'visual-component',
    component: 'TransformerRoadmapDiagram',
    category: 'Macro-Arquitetura',
    tag: 'Architecture Roadmap',
    title: 'Mapa da Arquitetura: Onde Estamos na Rede Transformer?',
    subtitle: 'Consolidando a Base de Entrada e Situando o Salto para a Autoatenção (Q, K, V)',
    notes: `Antes de mergulharmos no coração matemático do Transformer, vamos fazer uma pausa estratégica para olhar o mapa completo da arquitetura de Vaswani et al. (2017) e nos localizarmos na jornada.

Até aqui, cobrimos com sucesso toda a base fundamental de entrada da rede:
1. Começamos com o texto bruto e vimos a tokenização BPE transformando caracteres em IDs inteiros;
2. Vimos como a camada de Input Embedding converte esses IDs em vetores contínuos densos no hiperespaço semântico através da matriz Look-up Table W_E;
3. E acabamos de entender como a Janela de Contexto delimita o tensor tridimensional de entrada [Batch, Sequence T, d_model].

Reparem no diagrama clássico na tela: logo acima do Input Embedding, temos a operação de soma (+) com o Positional Encoding antes de entrar no bloco Multi-Head Attention!

Por que essa injeção de coordenada posicional é estritamente necessária? Vamos entender no próximo slide com um exemplo visual claro!`
  },

  // =========================================================================
  // SLIDE 11: Injeção de Posição: A Soma de Token Embedding + Position Embedding
  // =========================================================================
  {
    id: 11,
    type: 'visual-component',
    component: 'PositionalEmbeddingAdditionDiagram',
    category: 'Codificação Posicional',
    tag: 'Positional Encoding',
    title: 'Injeção de Posição: A Soma de Token Embedding + Position Embedding',
    subtitle: 'Como o Transformer Diferencia Palavras Idênticas em Posições Distintas (X = E_token + E_pos)',
    notes: `Vejamos por que a injeção de posição é indispensável antes de qualquer cálculo de atenção:

1. Observem a frase na tela: "YOUR CAT IS A LOVELY CAT". A palavra "CAT" aparece duas vezes: na posição 1 como sujeito ("Seu gato...") e na posição 5 como predicado ("...um lindo gato");
2. Como a Look-up Table de embeddings só enxerga o ID do vocabulário (ID 4242), o vetor de Embedding de "CAT" na posição 1 e na posição 5 é rigorosamente idêntico;
3. Se passássemos apenas esses vetores para o modelo, ele sofreria do 'Paradoxo do Saco de Palavras': a autoatenção é uma operação sobre conjuntos e não saberia a ordem das palavras;
4. Para quebrar essa simetria, somamos elemento a elemento o vetor Position Embedding específico de cada coordenada temporal (pos = 0, 1, 2, 3, 4, 5);
5. O resultado final (Encoder Input X = E_token + E_pos) torna cada palavra única e posicionada no tempo e no espaço, mantendo a dimensão d_model constante!

No próximo slide, vamos comparar as duas formas de gerar esses vetores de posição: fórmulas senoidais fixas versus embeddings aprendidos.`
  },

  // =========================================================================
  // SLIDE 12: O Dilema da Posição: Senoidal vs Aprendido
  // =========================================================================
  {
    id: 12,
    type: 'comparison',
    category: 'Trade-offs Arquiteturais',
    tag: 'Sinusoidal vs Learned',
    title: 'Comparativo: Encodings Senoidais vs Embeddings Aprendidos',
    subtitle: 'Vaswani et al. (2017) vs GPT-2 / BERT',
    cardLeft: {
      title: 'Embeddings Senoidais Fixos (Vaswani 2017)',
      badge: 'Determinístico & Sem Parâmetros',
      points: [
        'Fórmulas trigonométricas analíticas: PE(pos, 2i) = sin(...) e PE(pos, 2i+1) = cos(...).',
        'Não adiciona nenhum parâmetro treinável ao modelo.',
        'Permite, em teoria, extrapolar para sequências mais longas que as vistas no treino.',
        'Relação de posição relativa PE(pos + k) pode ser expressa como transformação linear de PE(pos).'
      ],
      highlight: 'Usado no Transformer original (Attention Is All You Need).'
    },
    cardRight: {
      title: 'Embeddings Aprendidos (GPT-2, BERT, LLaMA)',
      badge: 'Treinável via Backpropagation',
      points: [
        'Matriz de parâmetros livres W_pos ∈ ℝ^(T_max × d_model) inicializada aleatoriamente.',
        'O modelo aprende autonomamente as representações de distância ideais para o domínio.',
        'Implementação direta e limpa em PyTorch com nn.Embedding(max_positions, d_model).',
        'Desempenho empírico idêntico ou superior em tarefas de linguagem natural e visão.'
      ],
      highlight: 'Padrão adotado na maioria dos LLMs modernos como GPT-2 e BERT.'
    },
    callout: 'Na prática de Deep Learning moderna, tanto funções senoidais quanto tabelas aprendidas entregam excelente performance!',
    notes: `Neste comparativo, detalhamos as duas grandes escolas de codificação posicional:

À esquerda, os Encodings Senoidais do artigo original de 2017. A grande elegância dessa abordagem é que ela é puramente matemática e não adiciona nenhum parâmetro extra para treinar. Por ter funções com comprimentos de onda de 2π a 10.000 × 2π, ela forma uma espécie de 'relógio binário' contínuo.

À direita, os Embeddings de Posição Aprendidos, adotados por GPT-2, BERT e GPT-3. Aqui, tratamos as posições 0, 1, 2, ..., 1023 como índices de uma tabela nn.Embedding treinável. O modelo ajusta esses vetores durante o pré-treinamento para capturar noções de distância contextual.

Agora que cada token carrega seu significado semântico E sua coordenada posicional no tensor X, estamos prontos para entrar na caixa principal: o Mecanismo de Autoatenção!`
  },

  // =========================================================================
  // SLIDE 13: O Mecanismo de Atenção: Dimensões e a Matriz de Similaridade
  // =========================================================================
  {
    id: 13,
    type: 'visual-component',
    component: 'AttentionMatrixMultiplicationDiagram',
    category: 'Mecanismo de Atenção',
    tag: 'Attention Dimensions & Matrix',
    title: 'O Mecanismo de Atenção: Dimensões e a Matriz de Similaridade (6 × 6)',
    subtitle: 'A Operação Softmax((Q × Kᵀ) / √dk) Gerando a Distribuição de Probabilidade com Σ = 1',
    notes: `Chegamos ao coração do Scaled Dot-Product Attention: vamos entender como as matrizes Q e K interagem dimensionalmente para calcular a atenção entre todas as palavras!

Observem o fluxo matemático na tela:
1. Temos a nossa sequência de 6 tokens: "YOUR CAT IS A LOVELY CAT", onde cada token possui uma dimensão d_k = 512;
2. A matriz de Queries (Q) tem dimensão [6 × 512] e a matriz de Chaves transposta (K^T) tem dimensão [512 × 6];
3. Ao multiplicarmos Q × K^T, as 512 dimensões internas se anulam através do produto escalar, resultando exatamente em uma matriz quadrada [6 × 6];
4. Dividimos todos os valores pelo fator de escala √512 ≈ 22.63 para evitar que os números fiquem grandes demais e saturem os gradientes;
5. Aplicamos a função Softmax em cada linha: reparem na coluna Σ à direita, todas as linhas somam rigorosamente 1.0 (100%)!
6. Cada elemento da matriz [i, j] representa a probabilidade ou peso de atenção que a palavra da linha i dedica à palavra da coluna j.

No próximo slide, vamos ver o passo a passo completo da multiplicação final por V e o cálculo detalhado!`
  },

  // =========================================================================
  // SLIDE 14: Understanding Attention: A Matemática do Scaled Dot-Product
  // =========================================================================
  {
    id: 14,
    type: 'visual-component',
    component: 'DotProductAttentionStepDiagram',
    category: 'Formalismo Matemático',
    tag: 'Scaled Dot-Product',
    title: 'Understanding Attention: A Matemática do Scaled Dot-Product',
    subtitle: 'Passo a Passo Rigoroso: Q · Kᵀ, Escala 1/√dk, Softmax e Multiplicação por V',
    notes: `Vamos agora formalizar matematicamente cada etapa da fórmula do Scaled Dot-Product Attention:
Attention(Q, K, V) = softmax( (Q K^T) / √d_k ) V

Observem os 4 passos no diagrama interativo:
1. Multiplicação Q · K^T: Multiplicamos a matriz de Queries (T × d_k) pela matriz transposta de Keys (d_k × T). O resultado é uma matriz quadrada T × T com todos os scores de similaridade par a par;
2. Divisão pelo fator de escala √d_k: Se d_k for grande (ex: 64), o produto escalar atinge valores altos (15, 20, 30). Quando aplicamos o Softmax em números tão altos, ele satura e vira quase uma função degrau com derivadas próximas de zero. Dividir por √d_k normaliza a variância para 1.0 e salva o fluxo de gradientes!
3. Aplicação do Softmax por linha: Transforma os scores em probabilidades legítimas (valores entre 0 e 1 que somam 100% em cada linha);
4. Multiplicação pelos Values V: Multiplicamos a matriz de pesos A (T × T) pela matriz V (T × d_v), gerando a saída final com formato [Batch, T, d_v].

Cada vetor de saída é uma combinação linear perfeita de todos os tokens do contexto!`
  },

  // =========================================================================
  // SLIDE 15: 🧪 Laboratório Interativo 2: Simulador Matemático de Scaled Dot-Product
  // =========================================================================
  {
    id: 15,
    type: 'interactive',
    component: 'DotProductCalculator',
    category: 'Laboratório Prático',
    tag: 'Hands-on Dot-Product',
    title: 'Laboratório Interativo 2: Simulador Matemático de Scaled Dot-Product',
    subtitle: 'Calcule Tensores, Altere dk e Comprove a Função Estabilizadora de 1/√dk',
    notes: `Neste segundo Laboratório Interativo, vocês podem manipular as matrizes reais do Scaled Dot-Product com tokens da nossa canção: ['Tudo', 'precisa', 'é', 'amor'].

Vejam o que acontece nos controles superiores:
- Alterem a dimensão d_k entre 4, 16 e 64;
- Cliquem no botão 'Escala 1/√dk' para alternar entre ATIVADA e DESATIVADA;
- Quando desativamos a escala com d_k = 64, observem a tabela de pesos Softmax à direita: os valores entram em saturação extrema (quase 100% em um único token e 0% nos demais), disparando o alerta de gradientes nulos;
- Ao reativar a escala dividindo por √64 = 8, a distribuição volta a ser suave, permitindo que todos os tokens recebam gradiente e aprendam juntos durante o treino.

É essa elegância matemática que permite treinar Transformers com centenas de bilhões de parâmetros!`
  },

  // =========================================================================
  // SLIDE 16: Visualizing Attention: A Matriz de Atenção em Ação
  // =========================================================================
  {
    id: 16,
    type: 'visual-component',
    component: 'AttentionHeatmapVisualizer',
    category: 'Visualização e Interpretabilidade',
    tag: 'Attention Heatmaps',
    title: 'Visualizing Attention: A Matriz de Atenção em Ação',
    subtitle: 'Inspeção do Mapa de Calor T × T e Relações Semânticas na Letra dos Beatles',
    notes: `Uma das características mais fascinantes dos Transformers é a sua interpretabilidade visual através das Matrizes de Atenção (Attention Heatmaps).

Temos aqui na tela o mapa de calor 8 × 8 para a frase: "Tudo o que você precisa é de amor".
- Cliquem no token 'precisa': observem que ele distribui 38% de sua atenção para o sujeito 'você' e 28% para o complemento 'amor';
- Cliquem no token 'amor': ele atende fortemente de volta para 'precisa' (32%) e 'Tudo' (25%), capturando a equivalência poética da letra;
- Agora, cliquem no botão superior 'Máscara Causal (GPT)': vejam como todo o triângulo superior da matriz é imediatamente zerado! Em modelos causais, uma palavra no início não tem autorização para enxergar o que vem depois dela.

Essa visualização prova visualmente que o Transformer aprende gramática, sintaxe e semântica de forma puramente estatística!`
  },

  // =========================================================================
  // SLIDE 17: Tornando a Atenção Treinável: As Projeções W_Q, W_K, W_V
  // =========================================================================
  {
    id: 17,
    type: 'visual-component',
    component: 'TrainableAttentionDiagram',
    category: 'Engenharia de Pesos',
    tag: 'Trainable Projections',
    title: 'Tornando a Atenção Treinável: As Matrizes de Projeção W_Q, W_K, W_V',
    subtitle: 'Transformações Lineares Aprendíveis e Propagação de Gradientes em PyTorch',
    notes: `Até agora, falamos de Q, K e V conceitualmente. Mas de onde eles surgem na prática?

Eles surgem a partir de 3 matrizes de projeção linear aprendíveis: W_Q, W_K e W_V.
Quando o tensor de entrada X (T × d_model) chega na camada de atenção:
- Q = X · W_Q  (projeta no espaço de busca);
- K = X · W_K  (projeta no espaço de chaves);
- V = X · W_V  (projeta no espaço de valores);
- E após a atenção, multiplicamos por uma quarta matriz W_O (matriz de saída).

Vejam o bloco de código PyTorch à direita: isso é implementado com apenas 4 camadas nn.Linear(d_model, d_k, bias=False).
Durante o treinamento com backpropagation, o otimizador calcula as derivadas parciais ∂L/∂W_Q, ∂L/∂W_K, ∂L/∂W_V e ajusta esses pesos para que a atenção aprenda exatamente quais correlações minimizam o erro de predição!`
  },

  // =========================================================================
  // SLIDE 18: Causal Attention: Atenção Autorregressiva com Máscara
  // =========================================================================
  {
    id: 18,
    type: 'visual-component',
    component: 'CausalAttentionDiagram',
    category: 'Mecanismo Causal',
    tag: 'Causal Masking',
    title: 'Causal Masking: Atenção Autorregressiva Sem Vazamento de Futuro',
    subtitle: 'A Máscara Triangular Inferior e o Truque de -∞ no Softmax',
    notes: `Vamos entender agora o truque de engenharia que viabiliza o treinamento massivo de LLMs modernos na GPU: a Máscara Causal.

No momento da inferência, quando o modelo está gerando texto, as palavras futuras simplesmente não existem ainda. Mas durante o treinamento, temos a frase inteira disponível. Se passássemos a frase inteira sem proteção, o token 'precisa' poderia simplesmente olhar para a frente e ler que a próxima palavra é 'amor', tornando a tarefa trivial e inútil.

Para treinar a frase inteira em paralelo na GPU sem vazamento de dados futuros:
1. Criamos uma máscara triangular inferior com torch.tril(torch.ones(T, T));
2. Onde a máscara for 0 (posições futuras j > i), substituímos o score por -infinito (-float('inf'));
3. Quando o Softmax calcula exp(-infinito) / soma, o resultado é rigorosamente 0.0!

Assim, a posição 1 só atende a 1; a posição 5 atende de 1 a 5; e a rede treina em velocidade máxima na GPU sem espiar o gabarito!`
  },

  // =========================================================================
  // SLIDE 19: Multi-Head Attention: Múltiplos Subespaços de Representação
  // =========================================================================
  {
    id: 19,
    type: 'visual-component',
    component: 'MultiHeadAttentionDiagram',
    category: 'Atenção Multicabeça',
    tag: 'Multi-Head Attention',
    title: 'Multi-Head Attention: Múltiplos Subespaços de Representação',
    subtitle: 'Por Que Uma Cabeça Não Basta? Divisão em h Cabeças e Projeção WO',
    notes: `Por que usamos Múltiplas Cabeças de Atenção (Multi-Head Attention) em vez de uma única cabeça grande?

Se tivéssemos apenas uma cabeça de atenção, ela seria obrigada a fazer uma média de todas as relações semânticas possíveis. O token 'precisa' teria que diluir seu único vetor de atenção entre concordância verbal, objeto, negação e contexto global.

A grande sacada da Multi-Head Attention é dividir a dimensão d_model em h subespaços de representação paralelos:
1. Especialização de Foco: Cada cabeça aprende a focar em um aspecto linguístico ou visual diferente:
   - Cabeça 1 foca em concordância gramatical e sintaxe (ex: você ↔ precisa);
   - Cabeça 2 foca em associações semânticas e conceituais (ex: precisa ↔ amor);
   - Cabeça h foca em dependências de longo alcance e repetições (ex: amor ↔ amor).
2. Custo Computacional Idêntico: Como cada cabeça opera em dimensão reduzida d_k = d_model / h (por exemplo, 768 / 12 = 64 dimensões por cabeça), calcular 12 cabeças de dimensão 64 custa exatamente a mesma quantidade de operações que calcular 1 cabeça gigante de dimensão 768!
3. Concatenação e Projeção W_O: As saídas de todas as h cabeças são concatenadas lado a lado (12 × 64 = 768) e multiplicadas pela matriz de projeção linear W_O, misturando e sintetizando as informações de todos os subespaços de volta na dimensão original d_model.

Como referência para a indústria: o GPT-2 Small e o Vision Transformer (ViT-Base) utilizam h = 12 cabeças, enquanto modelos maiores como o GPT-3 utilizam h = 96 cabeças em paralelo!`
  },

  // =========================================================================
  // SLIDE 20: 🧪 Laboratório Interativo 3: Inspetor de Multi-Head Attention
  // =========================================================================
  {
    id: 20,
    type: 'interactive',
    component: 'MultiHeadInspector',
    category: 'Laboratório Prático',
    tag: 'Hands-on Multi-Head',
    title: 'Laboratório Interativo 3: Inspetor Visual de Multi-Head Attention',
    subtitle: 'Alterne Entre Cabeças Sintáticas, Semânticas e Rítmicas na Canção dos Beatles',
    notes: `Neste terceiro Laboratório Interativo, vamos inspecionar as cabeças de atenção especializadas sobre um dos versos mais ricos da música:
"(Amor) não há nada que você possa fazer que não possa ser feito"

Cliquem nos botões superiores para alternar entre as 4 cabeças:
- Cabeça 1 (Azul - Sintaxe): Vejam os arcos conectando 'você ↔ possa' (sujeito-verbo) e 'fazer ↔ feito' (paralelismo modal);
- Cabeça 2 (Roxa - Negação): Vejam a conexão forte entre 'não' e 'nada', capturando a dupla negação enfática;
- Cabeça 3 (Verde - Métrica): Conecta repetições líricas de longo alcance entre o início e o fim da estrofe;
- Cabeça 4 (Laranja - Local): Conecta palavras vizinhas como 'não há' e 'ser feito'.

É a combinação simultânea dessas 12 ou mais perspectivas que confere aos Transformers sua impressionante capacidade de compreensão contextual!`
  },

  // =========================================================================
  // SLIDE 21: A Arquitetura Original para Tradução: Encoder-Decoder e Cross-Attention
  // =========================================================================
  {
    id: 21,
    type: 'visual-component',
    component: 'TransformerTranslationDiagram',
    category: 'Arquitetura Clássica (Seq2Seq)',
    tag: 'Encoder-Decoder & Translation',
    title: 'A Arquitetura Original para Tradução: Encoder-Decoder',
    subtitle: 'Como Vaswani et al. (2017) Conectaram Fonte e Alvo com Cross-Attention',
    notes: `Agora que dominamos a atenção autorregressiva e a máscara causal, vamos conhecer a macro-arquitetura seminal concebida no artigo de 2017 ('Attention Is All You Need') para a tarefa de Tradução Automática (Seq2Seq).

Vejam o fluxo da tradução da nossa canção na tela:
1. O Encoder (à esquerda): Recebe a frase na língua de origem em inglês: "All you need is love". Ele aplica Self-Attention Bidirecional completa (sem máscara), gerando representações ricas de contexto. A saída do Encoder são as matrizes de Chaves (K_enc) e Valores (V_enc);
2. O Decoder (à direita): Gera a frase na língua alvo em português: "Tudo o que você precisa é de...". Ele possui duas camadas de atenção:
   - Primeiro, uma Masked Self-Attention causal para processar o histórico em português já gerado;
   - Em seguida, a camada mais importante: a Cross-Attention (ou Encoder-Decoder Attention)!
3. A Cross-Attention atua como a 'Ponte de Tradução': As Queries (Q) vêm do português (ex: "precisa") e fazem a busca nas Chaves (K) e Valores (V) do inglês (atendendo fortemente para "need").

Ao final, a camada Linear e o Softmax prevêem a próxima palavra em português com altíssima confiança: "amor"! Essa arquitetura estabeleceu as bases de tradutores como Google Tradutor e modelos multimodais modernos.`
  },

  // =========================================================================
  // SLIDE 22: Variantes da Atenção: Cross-Attention e FlashAttention
  // =========================================================================
  {
    id: 22,
    type: 'visual-component',
    component: 'OtherAttentionMechanismsDiagram',
    category: 'Otimização e Variantes',
    tag: 'Cross-Attn & FlashAttention',
    title: 'Variantes da Atenção: Cross-Attention, FlashAttention e Eficiência',
    subtitle: 'Self vs Cross-Attention e Otimizações de Memória SRAM na GPU',
    notes: `Conforme o campo evoluiu, surgiram variantes cruciais do mecanismo de atenção:

1. Self-Attention vs Cross-Attention:
Na Self-Attention, Q, K e V vêm da mesma sequência. Na Cross-Attention, as Queries vêm do Decoder, mas as Keys e Values vêm de uma sequência externa (do Encoder). Isso é a base dos modelos multimodais como Stable Diffusion (onde o texto guia a geração dos pixels) e DETR na detecção de objetos.

2. FlashAttention (Tri Dao, Stanford 2022/2023):
Como vimos, a matriz Q K^T tem tamanho T × T. Para contextos longos (32k tokens), gravar essa matriz gigante na memória global da GPU (HBM) causa um gargalo severo de largura de banda.
O FlashAttention divide o cálculo em pequenos blocos (*tiles*) que cabem na memória cache SRAM ultrarrápida dos núcleos CUDA, calculando o Softmax online sem jamais materializar a matriz T × T na HBM.

O resultado? Treinamento de 2x a 4x mais rápido e redução drástica do consumo de VRAM!`
  },

  // =========================================================================
  // SLIDE 23: A Anatomia do Bloco Transformer: MHA, MLP, Residuais e LayerNorm
  // =========================================================================
  {
    id: 23,
    type: 'visual-component',
    component: 'TransformerBlockDiagram',
    category: 'Bloco Construtivo',
    tag: 'Transformer Block',
    title: 'A Anatomia do Bloco Transformer: MHA, MLP, Residuais e LayerNorm',
    subtitle: 'O Padrão Pre-LN, Expansão 4x no Feed-Forward e Ativações GELU',
    notes: `Agora que dominamos a atenção, vamos analisar o Bloco Transformer completo — a unidade modular fundamental que será empilhada dezenas de vezes.

Cada Bloco Transformer possui 4 componentes vitais:
1. Multi-Head Attention: Onde ocorre a comunicação e troca de informações entre diferentes tokens da sequência;
2. Conexões Residuais (Skip Connections): Como aprendemos na Aula 1 com a ResNet, o atalho x + F(x) cria supervias de gradiente que impedem a degradação;
3. Layer Normalization (Pre-LN): Normaliza as ativações através da dimensão d_model para média 0 e variância 1 antes de cada subcamada, garantindo estabilidade no treinamento de modelos profundos;
4. Position-wise Feed-Forward Network (MLP): Uma rede neural de duas camadas lineares com expansão de 4 vezes (d_model → 4 × d_model → d_model, ou seja, 768 → 3072 → 768) com ativação GELU. Essa camada processa cada token isoladamente, funcionando como uma 'memória associativa de fatos'.

Reparem no seletor superior: hoje o padrão da indústria é Pre-LN (LayerNorm antes da atenção e do MLP), superando o Post-LN original de 2017.`
  },

  // =========================================================================
  // SLIDE 24: O Transformer Tudo Junto: Macro-Arquitetura Completa
  // =========================================================================
  {
    id: 24,
    type: 'visual-component',
    component: 'FullTransformerMacroDiagram',
    category: 'Macro-Arquitetura',
    tag: 'Full Model Architecture',
    title: 'O Transformer Tudo Junto: Macro-Arquitetura de Ponta a Ponta',
    subtitle: 'O Fluxo de Execução e Treinamento Seq2Seq: Encoder, Decoder, Softmax e Loss',
    notes: `Vamos agora contemplar a Macro-Arquitetura Completa de ponta a ponta no fluxo de treinamento Supervisionado (Seq2Seq):

1. Ramo do Encoder (à esquerda):
   - Recebe a sequência de entrada na língua de origem: "<SOS> I love you very much <EOS>";
   - Os tokens passam pelo Encoder Input (Embeddings + Codificação Posicional);
   - O Encoder processa a sentença inteira com Self-Attention bidirecional;
   - O Encoder Output gera as representações de contexto ricas (Chaves e Valores) que são injetadas diretamente na Cross-Attention do Decoder.

2. Ramo do Decoder (ao centro):
   - Durante o treino, recebe o prefixo da língua alvo já deslocado (Teacher Forcing): "<SOS> Te amo muito";
   - Passa pelo Decoder Input e pelo bloco Decoder, integrando seu histórico causal às informações vindas do Encoder Output;
   - O Decoder Output passa pela projeção Linear e pela função Softmax, gerando a distribuição de probabilidade para cada token.

3. Cálculo da Perda e Otimização (à direita):
   - As probabilidades calculadas no Softmax são comparadas com a sequência alvo real ("Te amo muito <EOS>") através da Cross Entropy Loss;
   - O gradiente do erro é retropropagado por todo o grafo computacional, ajustando os pesos do Decoder e do Encoder de ponta a ponta!

Esse diagrama sintetiza com máxima clareza o ciclo de treinamento dos modelos de sequência e visão!`
  },

  // =========================================================================
  // SLIDE 25: 🧪 Laboratório Interativo 4: Simulador de Parâmetros e Trade-offs
  // =========================================================================
  {
    id: 25,
    type: 'interactive',
    component: 'TransformerTradeoffsLab',
    category: 'Laboratório Prático',
    tag: 'Hands-on Trade-offs',
    title: 'Laboratório Interativo 4: Simulador de Parâmetros e Complexidade',
    subtitle: 'Ajuste Camadas, Dimensões e Contexto para Estimar Parâmetros e VRAM da GPU',
    notes: `No nosso quarto laboratório, vocês têm em mãos um simulador completo de engenharia de hardware e parâmetros para modelos baseados em Transformers (GPT-2, BERT, Vaswani 2017).

Vocês podem usar os presets para alternar entre GPT-2 Small, GPT-2 Medium, BERT Base e Transformer Original:
- Ajustem os sliders de d_model, número de camadas N e comprimento de contexto T;
- Vejam o cálculo dinâmico da quantidade de parâmetros treináveis e o orçamento de VRAM da GPU;
- Notem como a memória consumida pelas ativações das matrizes de atenção cresce quadraticamente O(T^2) com a janela de contexto;
- Observem também que dois terços dos parâmetros do modelo residem nas camadas MLP Feed-Forward.

Esse laboratório é uma ferramenta essencial para dimensionar modelos e escolher instâncias de GPU (A100, H100, T4) em projetos reais!`
  },

  // =========================================================================
  // SLIDE 26: 🧪 Laboratório Interativo 5: Quiz de Fixação em Transformers
  // =========================================================================
  {
    id: 26,
    type: 'interactive',
    component: 'QuizTransformers',
    category: 'Avaliação Interativa',
    tag: 'Knowledge Quiz',
    title: 'Laboratório Interativo 5: Quiz de Fixação de Conhecimentos',
    subtitle: 'Avalie Seu Domínio Sobre BPE, Scaled Dot-Product, Máscaras e Bloco Transformer',
    notes: `Chegou a hora de testarmos a fixação de todo o conteúdo da aula de hoje em nosso Quiz Interativo de encerramento!

Temos 5 questões criteriosamente elaboradas cobrindo:
1. A vantagem da tokenização BPE em eliminar palavras fora do vocabulário;
2. A razão matemática da divisão por √d_k para evitar saturação do Softmax;
3. O papel da máscara causal em zerar o futuro durante o treinamento paralelo;
4. O motivo pelo qual usamos múltiplas cabeças em subespaços menores d_k = d_model / h;
5. O papel da camada Feed-Forward (MLP) com expansão 4x no processamento de cada token.

Respondam às perguntas na tela e confiram os feedbacks explicativos detalhados para cada alternativa.

Parabéns pelo percurso até aqui! Agora convido todos a explorarem os notebooks práticos em PyTorch no Google Colab. Na próxima aula (Aula 3), mergulharemos a fundo na adaptação do Transformer para imagens com os Vision Transformers (ViT, Swin Transformer e DINO).

Muito obrigado a todos e até a próxima aula!`
  }
];
