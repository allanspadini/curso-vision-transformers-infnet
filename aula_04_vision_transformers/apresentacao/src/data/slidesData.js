/**
 * slidesData.js - Matriz central de dados da Aula 04: Vision Transformers & Classificação de Imagens
 * Disciplina: Visão Computacional com CNNs e Transformers - Faculdade Infnet
 */

export const slides = [
  // =========================================================================
  // BLOCO 1: DO DILEMA DO PIXEL AO VIÉS INDUTIVO (Slides 1 a 4)
  // =========================================================================
  {
    id: 1,
    type: 'title',
    title: 'Vision Transformers (ViT) e Classificação Visual',
    subtitle: 'Da Tirania do Pixel ao Fatiamento em Patches, Atenção Global e Regularização com CutMix',
    category: 'Módulo 4 • Transformers em Visão',
    tag: 'Aula 04',
    notes: `Olá a todos e sejam muito bem-vindos à nossa Aula 4 da disciplina de Visão Computacional com CNNs e Transformers da Faculdade Infnet!

Nas primeiras aulas, dominamos as Redes Convolucionais clássicas e modernas, desde as ResNets até as U-Nets de segmentação. Na sequência, mergulhamos nos Transformers e no BERT para NLP, compreendendo como o mecanismo de autoatenção bidirecional profunda revolucionou o processamento de texto.

Hoje chegamos ao ponto de inflexão mais aguardado de todo o curso: a união definitiva entre Transformers e Visão Computacional através do Vision Transformer, ou simplesmente ViT! 

Nesta aula, vamos entender por que aplicar autoatenção diretamente em pixels é computacionalmente inviável, como a genial ideia de fatiar imagens em patches de 16 por 16 pixels transformou uma imagem em palavras visuais, como o modelo é estruturado de ponta a ponta, e por que a técnica de regularização com CutMix é essencial para que o modelo aprenda sem sofrer overfitting. Preparem-se para uma aula densa, visual e repleta de intuição de engenharia!`
  },
  {
    id: 2,
    type: 'visual-component',
    component: 'PixelAttentionExplosionDiagram',
    title: 'A Tirania do Pixel e a Explosão da Autoatenção',
    subtitle: 'Por que não podemos aplicar o mecanismo de atenção diretamente em cada pixel da imagem?',
    category: 'Situação-Problema do Mundo Real',
    tag: 'Gargalo O(N²)',
    notes: `Vamos começar rigorosamente pela nossa metodologia pedagógica: a Situação-Problema do Mundo Real. 

Quando o artigo seminal 'Attention Is All You Need' foi publicado em 2017 e demonstrou a superioridade do Transformer em NLP, todo pesquisador de visão computacional teve a mesma ideia imediata: 'Por que não substituímos todas as convoluções por autoatenção pura sobre os pixels de uma imagem?'

Aqui nos deparamos com o que chamo de 'A Tirania do Pixel'. Em processamento de linguagem natural, uma sentença típica tem entre 50 e 512 tokens. A matriz de autoatenção calcula o produto escalar entre todas as palavras, resultando em um custo de O(L ao quadrado). Para 512 tokens, 512 ao quadrado são cerca de 262 mil operações de produto interno por cabeça. As GPUs modernas realizam isso em frações de milissegundo.

Porém, vejam o diagrama na tela: uma imagem padrão de benchmark tem resolução de 224 por 224 pixels. Se considerarmos cada pixel como um token individual, temos 224 vezes 224, o que dá exatamente 50.176 pixels!

Ao calcular a autoatenção quadrática entre 50.176 tokens, a matriz de atenção Q vezes K transposto possui 50.176 linhas por 50.176 colunas. Isso equivale a mais de dois bilhões e meio de operações de atenção por cabeça e por camada! Pior ainda: apenas para armazenar essa matriz de atenção em memória VRAM em ponto flutuante de 32 bits, uma única camada com 12 cabeças exigiria mais de 10 gigabytes de memória para um batch de tamanho um!

Conclusão de engenharia: aplicar autoatenção no nível de pixel bruto é matematicamente proibitivo e causaria um erro instantâneo de CUDA Out of Memory até nas GPUs mais potentes da atualidade.`
  },
  {
    id: 3,
    type: 'visual-component',
    component: 'InductiveBiasTradeoffDiagram',
    title: 'O Dilema do Viés Indutivo: CNN vs Transformer',
    subtitle: 'Premissas estruturais rígidas de localidade versus liberdade total de relações espaciais',
    category: 'Fundamentação Teórica',
    tag: 'Inductive Bias',
    notes: `Para entender a barreira conceitual entre CNNs e Transformers, precisamos discutir um dos conceitos mais importantes do aprendizado de máquina moderno: o Viés Indutivo, ou Inductive Bias.

O que é viés indutivo? É o conjunto de suposições que uma arquitetura impõe antes de ver qualquer dado do mundo.

Nas Redes Convolucionais (lado esquerdo do slide), existe um viés indutivo fortíssimo. O kernel de convolução 3 por 3 assume rigidamente duas coisas:
Primeiro, Localidade Bidimensional: pixels vizinhos têm forte correlação semântica entre si, enquanto pixels distantes têm pouca relevância imediata.
Segundo, Equivariância à Translação: se um filtro aprendeu a detectar um olho no canto superior esquerdo, o mesmo filtro desliza e reconhece o mesmo olho no canto inferior direito. 
Graças a essas premissas embutidas no silício da rede, as CNNs aprendem muito rápido, mesmo com datasets moderados como o ImageNet-1k, pois não precisam aprender do zero que pixels adjacentes formam bordas. A desvantagem? O campo receptivo cresce lentamente camada a camada, tornando a visão global do contexto limitada.

Agora olhem para o Vision Transformer (lado direito do slide). O Transformer possui um viés indutivo quase nulo para imagens! Ele não assume localidade espacial nem equivariância de translação por padrão. Para a camada de autoatenção, o patch do canto superior esquerdo pode conversar livremente com o patch do canto inferior direito logo no Bloco 1, com o mesmo custo de atenção que conversa com o patch vizinho.

Essa liberdade concede ao ViT um teto de aprendizado assintótico muito maior. Porém, cria uma contrapartida severa: sem o viés indutivo que guia o modelo, ele precisa aprender a própria noção de estrutura espacial a partir dos dados! E como veremos adiante, isso gera uma fome insaciável de dados no treinamento.`
  },
  {
    id: 4,
    type: 'visual-component',
    component: 'PatchSlicingDiagram',
    title: "A Sacada dos Patches: 'An Image is Worth 16x16 Words'",
    subtitle: 'Fatiando a matriz 2D contínua em uma sequência discreta de tokens visuais',
    category: 'Solução de Engenharia',
    tag: 'Dosovitskiy et al. (2020)',
    notes: `Diante da impossibilidade computacional de usar pixels individuais e da ambição de usar autoatenção global, pesquisadores da Google Brain liderados por Alexey Dosovitskiy publicaram no ICLR 2021 o artigo revolucionário cujo título é uma obra de arte da engenharia: 'An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale'.

Qual foi o grande insight? Em vez de tratar pixels como tokens, por que não agrupamos os pixels em blocos quadrados contíguos chamados Patches?

Observem o fluxo visual na tela:
Começamos com a imagem de entrada de 224 por 224 pixels com 3 canais de cores (RGB). Ela possui 150.528 valores numéricos contínuos.
Em seguida, definimos o tamanho do patch P, tipicamente 16 por 16 pixels.
Quantos patches cabem na imagem? 224 dividido por 16 dá 14 patches na vertical e 14 patches na horizontal. 14 vezes 14 resulta em exatamente 196 patches!

Vejam a mágica matemática que aconteceu: reduzimos uma sequência proibitiva de 50.176 pixels para apenas 196 patches! 196 tokens é uma sequência perfeitamente compatível com a capacidade de memória dos Transformers de NLP, menor inclusive que o contexto padrão de 512 tokens do BERT!

Cada patch de 16 por 16 com 3 canais contém 768 pixels, que são achatados em um vetor 1D e transformados em um token visual. Vamos agora experimentar interativamente essa relação de escala no nosso primeiro laboratório!`
  },

  // =========================================================================
  // BLOCO 2: A ANATOMIA COMPLETA DO VISION TRANSFORMER (Slides 5 a 10)
  // =========================================================================
  {
    id: 5,
    type: 'interactive',
    component: 'PatchSlicingLab',
    title: '🧪 Lab 1: Simulador de Patches e Complexidade',
    subtitle: 'Explore a relação entre resolução da imagem, tamanho do patch (P) e custo computacional',
    category: 'Laboratório Interativo',
    tag: 'Simulação Interativa',
    notes: `Neste primeiro laboratório interativo, convido vocês a experimentarem os trade-offs de fatiamento de imagens.

No topo, vocês podem alternar a resolução da imagem entre 112, 224 e 384 pixels, e o tamanho do patch entre 8, 14, 16 e 32 pixels.

Vejam o que acontece quando estamos na configuração canônica do ViT: imagem 224 por 224 e patch 16 por 16. O número de patches é 196, gerando uma matriz de autoatenção de 197 por 197 (incluindo o token CLS). O consumo de memória de atenção por camada é de apenas alguns kilobytes, permitindo treinar batches confortáveis em GPUs comerciais.

Agora, cliquem no botão de patch 8 por 8 mantendo a resolução em 224. Observem como a grade espacial se torna muito mais densa: pulamos para 784 patches! A matriz de atenção salta para mais de 600 mil elementos, multiplicando o custo quadrático da autoatenção por 16 vezes!

E se aumentarmos a imagem para 384 por 384 mantendo o patch em 16 por 16? Teremos 576 patches espaciais, somando 577 tokens com o CLS. Notem que o simulador atualiza em tempo real as dimensões e o percentual de ocupação em relação ao contexto clássico de NLP. É exatamente esse equilíbrio geométrico que viabilizou o Vision Transformer na prática!`
  },
  {
    id: 6,
    type: 'visual-component',
    component: 'ViTCanonicalArchitectureViewer',
    title: 'A Macro-Arquitetura do Vision Transformer (ViT)',
    subtitle: 'O pipeline canônico completo: fatiamento, projeção linear, codificador e cabeça densa',
    category: 'Arquitetura de Ponta a Ponta',
    tag: 'Figura Canônica 8-11',
    notes: `Na tela, temos o diagrama mais icônico da visão computacional moderna: a arquitetura canônica do ViT apresentada na Figura 8-11 do livro clássico de Deep Learning.

Vamos dissecar o pipeline em 4 estágios essenciais utilizando os botões de exploração no topo:

Primeiro, no canto inferior esquerdo, temos o Input: a imagem real (na figura, flores coloridas em um jardim) é fatiada em uma grade 3 por 3 de 9 patches. Observem a seta horizontal desenrolando esses patches em uma fila sequencial.

Segundo, cada patch achatado entra no bloco rosa: 'Linear projection of flattened patches'. É aqui que os pixels brutos são convertidos nos primeiros embeddings vetoriais contínuos.

Terceiro, observem os círculos lilases com números de 0 a 9 logo acima. Notem o token 0 com uma estrela: ele é o token especial CLS! Ao lado dele, os tokens de 1 a 9 representam os patches espaciais. Reparem no sinal de soma '+' somando um círculo com a posição: essa é a injeção dos Position Embeddings para que o modelo saiba onde cada flor estava na imagem original! Todos entram juntos no bloco cinza: o 'Transformer encoder'.

Quarto e último estágio, no topo: do Transformer encoder, do exato token 0 com estrela, sai uma seta direta apontando para o bloco ciano: 'Dense top'. Apenas o vetor resultante do token CLS é alimentado na camada densa de classificação que produz o Output final da classe!

Vejam a elegância conceitual: nenhum pixel intermediário passa por convoluções manuais ou pooling ad-hoc. O modelo aprende a classificar a cena inteira por pura troca de atenção entre os patches!`
  },
  {
    id: 7,
    type: 'visual-component',
    component: 'PatchEmbeddingMechanicsDiagram',
    title: 'Patch Embedding: Achatamento e Projeção Linear',
    subtitle: 'Como transformar matrizes 3D de pixels em vetores latentes D = 768 via álgebra ou convolução strided',
    category: 'Engenharia de Tensores',
    tag: 'Projeção de Entrada',
    notes: `Vamos agora mergulhar na matemática do bloco rosa da imagem anterior: a camada de Patch Embedding.

Na visão teórica de álgebra linear (cliquem no primeiro botão), cada patch de tamanho 16 por 16 com 3 canais de cor RGB contém 16 vezes 16 vezes 3 = 768 valores. Nós achatamos esse bloco tridimensional em um vetor unidimensional de 768 posições. Em seguida, multiplicamos esse vetor pela matriz de projeção linear treinável E, de dimensões 768 por 768. O resultado é o primeiro token visual latente z_0 de dimensão D = 768.

Agora, cliquem no segundo botão: 'Truque de Engenharia'. Como essa operação é implementada na prática em frameworks como PyTorch e TorchVision?
Será que fatiamos a imagem manualmente com loops em Python e multiplicamos matrizes lineares? Jamais! Isso seria extremamente lento na GPU.

O segredo de engenharia é que uma projeção linear de patches não sobrepostos é matematicamente idêntica a uma camada convolucional 2D com kernel_size igual a 16 e stride igual a 16! 
Ao passar a imagem por nn.Conv2d(3, 768, kernel_size=16, stride=16), o stride de 16 faz o filtro pular exatamente de 16 em 16 pixels, sem sobreposição. O mapa de características resultante tem dimensões [Batch, 768, 14, 14]. Em seguida, basta achatar as dimensões espaciais e transpor os eixos para obter exatamente o tensor [Batch, 196, 768]! 

Essa sacada permite utilizar os núcleos aceleradores (Tensor Cores) das GPUs para realizar todo o patch embedding em uma única operação paralelizada de alto rendimento!`
  },
  {
    id: 8,
    type: 'visual-component',
    component: 'ClsTokenPositionalDiagram',
    title: 'O Token [CLS] e os Position Embeddings 1D',
    subtitle: 'Injeção de ordem espacial e o papel do vetor agregador global herdado do BERT',
    category: 'Representação Latente',
    tag: 'Tokens & Posições',
    notes: `Temos agora os 196 patches projetados como vetores de dimensão 768. Mas antes de alimentá-los no Transformer Encoder, precisamos resolver dois problemas fundamentais:

Problema 1: Qual patch representa a classe da imagem? Se a imagem contém um leopardo no centro e grama ao redor, qual dos 196 vetores deve calcular a perda Cross-Entropy de classificação? Se fizermos uma média simples de todos os patches, os patches irrelevantes de grama vão diluir a representação do leopardo.
Solução: Os autores reaproveitaram a sacada genial do BERT em NLP: criar um token especial aprendível, chamado token [CLS], que é anexado no início da sequência. O tensor salta de 196 para 197 tokens. Como o mecanismo de autoatenção é bidirecional, o token [CLS] interage com todos os outros 196 patches ao longo de todas as camadas, aprendendo a absorver seletivamente apenas as características mais discriminantes para a classificação!

Problema 2: Quando alinhamos os patches em uma fila de 1 a 196, o Transformer não sabe quem era vizinho de quem na grade bidimensional original. A atenção é invariante à permutação!
Solução: Somamos vetores aprendidos de posição espacial, os Position Embeddings E_pos, de dimensão 197 por 768. Cada posição (do token 0 ao 196) tem seu próprio vetor contínuo que é somado elemento a elemento antes da primeira camada.

Curiosidade de pesquisa: os autores testaram Position Embeddings 2D explícitos com coordenadas X e Y separadas. No entanto, o embedding 1D simples convergiu tão bem quanto o 2D! O modelo aprendeu sozinho as distâncias espaciais euclidianas apenas ajustando os pesos pelo gradiente!`
  },
  {
    id: 9,
    type: 'visual-component',
    component: 'ViTBlockAnatomyDiagram',
    title: 'Anatomia do Bloco Transformer Encoder',
    subtitle: 'Pre-LayerNorm, Multi-Head Self-Attention, conexões residuais e expansão 4× no MLP',
    category: 'Módulo Construtivo',
    tag: 'Bloco Encoder',
    notes: `Uma vez que o tensor z_0 com formato [Batch, 197, 768] está montado, ele atravessa uma pilha de 12 blocos Transformer idênticos (no ViT-Base). Vamos analisar a anatomia de um único bloco no diagrama da tela.

Cada bloco possui duas grandes subcamadas residuais:
A primeira subcamada (cliquem no botão 1) é a de Multi-Head Self-Attention (MSA). Observem que a normalização LayerNorm é aplicada ANTES da atenção. Isso é chamado de Pre-LayerNorm. Ao contrário do Transformer original de 2017 que usava Post-LN, o Pre-LN mantém o caminho residual desobstruído por normalizações, permitindo treinar redes extremamente profundas com estabilidade numérica exemplar. A saída da atenção é somada à entrada original através do skip connection residual: z' = MSA(LN(z)) + z.

A segunda subcamada (cliquem no botão 2) é o bloco MLP (Multi-Layer Perceptron). Ele é composto por uma primeira projeção linear que quadruplica a dimensão de 768 para 3072, seguida pela função de ativação não-linear GELU (Gaussian Error Linear Unit), e uma segunda projeção linear que comprime de volta de 3072 para 768. Essa expansão de 4 vezes é onde a rede armazena o conhecimento semântico e as correlações complexas de alto nível.

Novamente, o resultado do MLP é somado via conexão residual. O tensor de saída z_l preserva exatamente as mesmas dimensões [Batch, 197, 768]. O modelo pode assim empilhar 12, 24 ou até 32 blocos sem nenhuma alteração no formato dos tensores!`
  },
  {
    id: 10,
    type: 'interactive',
    component: 'ViTTensorTrackerLab',
    title: '🧪 Lab 2: Rastreador Dimensional de Tensores',
    subtitle: 'Acompanhe passo a passo o formato exato dos tensores em cada etapa do forward pass do ViT',
    category: 'Laboratório Interativo',
    tag: 'Depuração PyTorch',
    notes: `No nosso segundo laboratório interativo, colocamos na prática a regra de ouro da nossa disciplina: rastrear rigorosamente as dimensões dos tensores do PyTorch em cada etapa do fluxo.

Cliquem nos botões do topo para navegar pelos 7 passos do forward pass:

Passo 1: Entramos com o lote de imagens [Batch, 3, 224, 224].
Passo 2: Após o Patch Embedding (Conv2D com stride 16), o tensor é achatado e transposto para [Batch, 196, 768].
Passo 3: Concatenamos o vetor do token [CLS] no início da dimensão temporal. O formato se torna [Batch, 197, 768].
Passo 4: Somamos elemento a elemento o tensor de Position Embeddings [1, 197, 768]. O formato permanece [Batch, 197, 768].
Passo 5: O tensor atravessa os 12 blocos do Transformer Encoder. Cada bloco processa os 197 tokens com autoatenção multi-cabeça e MLP, preservando estritamente o formato [Batch, 197, 768].
Passo 6: No Pooling, fazemos o fatiamento x[:, 0], extraindo apenas a primeira linha de cada sequência. O tensor agora possui formato [Batch, 768].
Passo 7: A cabeça linear densa multiplica o vetor 768 pela matriz de pesos de saída, gerando os logits finais [Batch, 1000] prontos para a função Softmax de classificação!

Notem como a compreensão dimensional torna o modelo previsível, elegante e transparente para depuração em código!`
  },

  // =========================================================================
  // BLOCO 3: O DESAFIO DO TREINAMENTO E A REGULARIZAÇÃO COM CUTMIX (Slides 11 e 12)
  // =========================================================================
  {
    id: 11,
    type: 'visual-component',
    component: 'DataHungerOverfittingDiagram',
    title: 'A Situação-Problema: A Fome de Dados do ViT',
    subtitle: 'Por que treinar um Vision Transformer do zero em datasets moderados (ImageNet-1k) fracassa?',
    category: 'Situação-Problema do Mundo Real',
    tag: 'Fome de Dados',
    notes: `Chegamos agora à nossa segunda grande Situação-Problema do Mundo Real: o paradoxo do treinamento do Vision Transformer.

Quando o ViT foi treinado pela primeira vez pela equipe da Google diretamente no dataset ImageNet-1k (que contém 1,3 milhão de imagens e é considerado o padrão ouro acadêmico), o resultado foi decepcionante: o ViT-Large atingiu acurácia significativamente inferior a uma ResNet-152 tradicional!

Observem o gráfico na tela, retirado diretamente dos experimentos originais de Dosovitskiy et al.:
No primeiro ponto (ImageNet-1k com 1.3M imagens), a ResNet (linha azul escuro) supera com folga o ViT (linha ciano). O ViT sofreu severo overfitting!
No ponto intermediário (ImageNet-21k com 14 milhões de imagens), o ViT empata com a ResNet.
Apenas no terceiro ponto (o dataset gigantesco JFT-300M com 300 milhões de imagens proprietárias da Google), o ViT dispara e supera qualquer arquitetura convolucional conhecida!

Por que isso acontece? Lembram da nossa discussão sobre Viés Indutivo no Slide 3?
Sem as convoluções restringindo a busca aos pixels vizinhos, o Vision Transformer tem liberdade matemática absoluta. Com apenas um milhão de imagens, ele memoriza os detalhes acidentais e o ruído de fundo dos patches em vez de aprender conceitos visuais generalizáveis.

Isso gerou um problema gigantesco para a comunidade de IA: a grande maioria das empresas, laboratórios e estudantes de pós-graduação não possui 300 milhões de imagens nem clusters com centenas de TPUs. Como podemos treinar um ViT em datasets menores sem cair no colapso do overfitting? É aqui que entra a solução de engenharia do CutMix!`
  },
  {
    id: 12,
    type: 'visual-component',
    component: 'CutMixConceptDiagram',
    title: 'A Sacada do CutMix: Quebrando o Overfitting',
    subtitle: 'Forçando o ViT a correlacionar múltiplos patches sem gerar artefatos artificiais nos pixels',
    category: 'Solução de Engenharia',
    tag: 'Yun et al. (ICCV 2019)',
    notes: `Para quebrar a fome de dados do ViT e permitir seu treinamento com sucesso em datasets moderados (conforme demonstrado no paper do DeiT da Meta), os pesquisadores recorreram a técnicas avançadas de Regularização de Dados, com destaque absoluto para o CutMix!

Vamos entender a genialidade do CutMix comparando as técnicas na tela:

Técnica 1: Treinamento Tradicional. Uma foto pura de cachorro com classe 100% Cachorro. O modelo aprende a olhar apenas para o detalhe mais fácil (ex: as orelhas ou focinho). Se as orelhas forem obstruídas, o classificador erra.

Técnica 2: Cutout (cliquem no botão 2). O Cutout corta um retângulo da imagem e preenche com pixels pretos (zeros). Isso força o modelo a olhar para outros pontos do corpo, mas desperdiça capacidade computacional ao passar pixels pretos artificiais pelo Transformer.

Técnica 3: Mixup (cliquem no botão 3). O Mixup faz uma média ponderada linear de duas imagens inteiras com transparência (ex: 60% Cachorro + 40% Gato). Isso suaviza os rótulos, mas cria imagens 'fantasma' com duas texturas sobrepostas, algo que não existe na vida real e que confunde a identificação de contornos pelo Transformer.

Técnica 4: CutMix (cliquem no botão 4)! Publicado por Sangdoo Yun et al. no ICCV 2019, o CutMix é a fusão perfeita: cortamos uma janela retangular da Imagem B (o Gato) e COLAMOS exatamente sobre a Imagem A (o Cachorro)!
Vejam a sacada: todos os pixels continuam sendo fotos 100% nítidas e reais da natureza! O Transformer não precisa lidar com transparências esquisitas nem com buracos pretos. E o melhor: como o ViT opera em patches, o CutMix substitui blocos inteiros de tokens visuais, forçando o token CLS a aprender que uma parte dos patches pertence ao Gato e a outra parte pertence ao Cachorro! Além disso, o rótulo de treino é suavemente ajustado de forma proporcional à área colada (por exemplo, 70% Cachorro e 30% Gato), calibrando perfeitamente a perda Cross-Entropy sem ambiguidades.`
  },

  // =========================================================================
  // BLOCO 4: INTERPRETABILIDADE, FAMÍLIA DE MODELOS E FIXAÇÃO (Slides 13 a 16)
  // =========================================================================
  {
    id: 13,
    type: 'visual-component',
    component: 'AttentionRolloutDiagram',
    title: 'Interpretabilidade: Mapas de Atenção do ViT',
    subtitle: 'Visualizando a autoatenção entre o token [CLS] e os patches espaciais (Attention Rollout)',
    category: 'Explicabilidade Visual',
    tag: 'Attention Rollout',
    notes: `Uma das características mais extraordinárias do Vision Transformer em relação às CNNs é a sua explicabilidade e interpretabilidade nativa.

Nas Redes Convolucionais clássicas, para tentar entender onde a rede estava olhando, precisávamos de métodos indiretos de pós-processamento como o Grad-CAM, que dependem de calcular derivadas parciais retropropagadas e gerar mapas de calor grosseiros e borrados na última camada convolucional.

No Vision Transformer, a interpretabilidade é uma propriedade direta do próprio modelo! Como cada camada calcula uma matriz de autoatenção explícita entre todos os pares de patches, podemos simplesmente inspecionar os pesos de atenção que conectam o token [CLS] a cada um dos 196 patches da imagem, utilizando um algoritmo elegante chamado Attention Rollout (Abnar & Zuidema, 2020).

Observem as 3 fases no slide:
Fase 1 (Camadas Iniciais): A atenção é dispersa. O token [CLS] atende amplamente a quase todos os patches com pesos baixos e uniformes, coletando informações de textura geral, cores e iluminação de fundo.
Fase 2 (Camadas Intermediárias): A atenção começa a convergir. Os patches com alto contraste que formam o contorno do animal recebem pesos de atenção progressivamente maiores.
Fase 3 (Camadas Finais): O token [CLS] concentra praticamente toda a sua massa de probabilidade de atenção nos traços biológicos distintivos do animal (a cabeça, o bico e os olhos da ave), ignorando quase que por completo o céu e o fundo irrelevante!

No nosso próximo laboratório prático em notebook, vamos implementar exatamente essa rotina de extração dos pesos de atenção para gerar esses mapas de calor com nossas próprias mãos!`
  },
  {
    id: 14,
    type: 'visual-component',
    component: 'ViTArchitecturesComparisonDiagram',
    title: 'A Família ViT: Configurações, Parâmetros e Desempenho',
    subtitle: 'Comparativo técnico entre variantes ViT-Base, ViT-Large, ViT-Huge, ResNet e ConvNeXt',
    category: 'Benchmarking de Modelos',
    tag: 'Tabela Canônica',
    notes: `Neste slide, sintetizamos a taxonomia completa da família Vision Transformer comparada com os marcos das Redes Convolucionais modernas no ImageNet-1k.

Vejam as configurações na tabela:
1. ViT-Base / 16: É o cavalo de batalha da indústria. Possui 12 camadas Transformer, dimensão oculta de 768, 12 cabeças de atenção e patches de 16 por 16. Totaliza cerca de 86,6 milhões de parâmetros e atinge 81.2% de acurácia Top-1 no ImageNet quando pré-treinado adequadamente, superando a ResNet-152 com folga!
2. ViT-Base / 32: Utiliza patches maiores de 32 por 32. Como a imagem 224 por 224 gera apenas 7 vezes 7 = 49 patches, o custo computacional despenca para 4.4 GFLOPs (quatro vezes mais rápido), mas a acurácia cai para 77.9% devido à perda de detalhes visuais finos.
3. ViT-Large / 16: O modelo robusto de alto desempenho. 24 camadas, dimensão oculta de 1024, 16 cabeças e 304 milhões de parâmetros, atingindo 85.2% de acurácia Top-1.
4. ViT-Huge / 14: O modelo massivo. 32 camadas, dimensão oculta de 1280, patches de 14 por 14 e 632 milhões de parâmetros, atingindo incríveis 88.5% de acurácia no ImageNet!
5. ConvNeXt-Base: Uma resposta brilhante da comunidade convolucional em 2022, modernizando as ResNets com blocos inspirados no ViT para atingir 83.8% com 88M de parâmetros.

Utilizem os botões de filtro no topo para comparar as famílias e memorizem essa referência para seus projetos de pós-graduação!`
  },
  {
    id: 15,
    type: 'interactive',
    component: 'ViTModelTradeoffLab',
    title: '🧪 Lab 3: Explorador de Trade-offs (ViT vs CNN)',
    subtitle: 'Compare acurácia, latência de inferência, uso de VRAM e throughput para tomada de decisão em produção',
    category: 'Laboratório Interativo',
    tag: 'Decisão de Engenharia',
    notes: `No nosso terceiro laboratório interativo, colocamos vocês na cadeira de um Arquiteto de Soluções de Inteligência Artificial para responder à pergunta clássica de reuniões de engenharia: 'Qual modelo devemos colocar em produção no nosso projeto?'

Cliquem nos 3 cenários disponíveis:

Cenário 1: Dispositivo de Borda (Edge / Mobile, como drones, câmeras de tráfego ou celulares). A latência precisa ser inferior a 15 milissegundos e a bateria é restrita. Recomendação: ResNet-50 ou MobileNetV3. Os blocos convolucionais aproveitam as NPUs embarcadas com altíssima eficiência energética e sem o overhead de memória de ativações quadráticas.

Cenário 2: Servidor em Nuvem com Alta Concorrência (sistemas de catálogo de e-commerce, moderação de conteúdo em tempo real). Recomendação: ViT-Base / 16 pré-treinado e ajustado com CutMix. Oferece o equilíbrio perfeito entre altíssima precisão (acima de 82%), processamento em lotes acelerado por Tensor Cores e consumo de memória gerenciável em GPUs corporativas.

Cenário 3: Aplicações de Missão Crítica (diagnóstico médico oncológico, análise de imagens de satélite para inteligência geoespacial). O objetivo é a máxima acurácia possível, onde frações de ponto percentual salvam vidas. Recomendação: ViT-Large ou ViT-Huge. O poder do mecanismo de autoatenção em encontrar correlações sutis entre patches distantes supera qualquer modelo convolucional.

Essa análise prova que engenharia sênior não é sobre usar o modelo mais novo cegamente, mas sim saber selecionar a ferramenta certa para cada requisito de negócio!`
  },
  {
    id: 16,
    type: 'quiz',
    component: 'ViTInteractiveQuiz',
    title: 'Quiz Interativo de Fixação',
    subtitle: 'Teste seu domínio sobre fatiamento de patches, viés indutivo e regularização com CutMix',
    category: 'Avaliação Formativa',
    tag: 'Fixação de Conceitos',
    notes: `Chegamos ao encerramento da nossa aula teórica com o nosso Quiz Interativo de Fixação de Conceitos da Aula 4!

Temos 3 questões selecionadas com rigor para avaliar seu entendimento sobre os temas centrais de hoje:
Questão 1: O cálculo exato de patches e tokens ao variar a resolução da imagem para 384 por 384 com patch 16 por 16.
Questão 2: O papel do Viés Indutivo fraco e por que o ViT requer técnicas especiais ao treinar em datasets moderados.
Questão 3: A mecânica geométrica e probabilística do CutMix e como a área cortada recalibra a função de perda Cross-Entropy.

Respondam com calma, analisem as opções e cliquem em 'Confirmar Respostas' para conferir o feedback imediato de cada alternativa. 

Com essa base sólida dominada, estamos prontos para o nosso próximo passo: o laboratório de código em PyTorch onde faremos o fine-tuning de um Vision Transformer com visualização interativa dos pesos de atenção! Muito obrigado pela atenção de todos e nos vemos no código!`
  }
];
