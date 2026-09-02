export const slidesData = [
  // ==========================================
  // SLIDE 1: Title Slide
  // ==========================================
  {
    id: 1,
    type: 'title',
    category: 'Pós-Graduação Infnet',
    tag: 'Aula 01',
    title: 'Visão Computacional com CNNs e Transformers',
    subtitle: 'Aula 1: Arquiteturas CNN Clássicas e Modernas — Evolução, Transfer Learning e Além da Classificação',
    author: 'Faculdade Infnet',
    topics: [
      'LeNet-5 & AlexNet',
      'GoogLeNet & ResNet',
      'Xception & SENet',
      'VGG, MobileNet & EfficientNet',
      'GPU RAM: Inferência vs Treino',
      'RevNets (Reversible Nets)',
      'ResNet-34 em PyTorch',
      'Transfer Learning no TorchVision',
      'Detecção (YOLO), Tracking & Segmentação'
    ],
    notes: `Olá a todos e sejam muito bem-vindos à nossa disciplina de Visão Computacional com CNNs e Transformers!

Nesta primeira aula, vamos construir uma base sólida e moderna sobre a evolução das Redes Neurais Convolucionais. Como vocês já conhecem os fundamentos de redes neurais e as operações convolucionais básicas, nosso objetivo aqui não é repetir o que é um filtro ou stride, mas sim entender as grandes sacadas de engenharia que transformaram modelos simples em sistemas de visão ultra-profundos e de alta precisão.

Vamos cobrir a linhagem histórica desde o LeNet-5 e AlexNet, passar pela revolução dos blocos residuais da ResNet, explorar convoluções separáveis no Xception e atenção aos canais no SENet, desvendar para onde vai a memória da GPU no treino versus inferência, implementar uma ResNet-34 em PyTorch, dominar Transfer Learning com TorchVision e, finalmente, expandir nossa visão para detecção de objetos, rastreamento e segmentação semântica. Vamos começar!`
  },

  // ==========================================
  // SLIDE 2: Shallow Networks Limit (Visual Diagram)
  // ==========================================
  {
    id: 2,
    type: 'visual-component',
    category: 'Situação-Problema',
    tag: 'O Limite das Redes Rasas',
    title: 'O Limite das Redes Rasas: Platô de Capacidade',
    subtitle: 'A composição de características visuais complexas exige profundidade hierárquica',
    component: 'ShallowPlateauDiagram',
    notes: `Vamos começar investigando o primeiro grande problema da visão computacional clássica: o limite de capacidade das redes neurais rasas.

Imagens do mundo real são compostas de forma hierárquica natural:
- As camadas mais iniciais detectam elementos básicos como bordas em ângulos específicos e variações de cor;
- As camadas intermediárias combinam essas bordas para formar texturas, cantos e formas geométricas;
- E apenas as camadas mais profundas conseguem montar partes complexas como rodas, olhos ou a silhueta de um carro.

Quando tentamos resolver problemas de visão usando redes com poucas camadas (3 a 5 camadas), a rede atinge um platô de acurácia muito rápido. Ela simplesmente não tem profundidade para abstrair conceitos semânticos complexos.`
  },

  // ==========================================
  // SLIDE 3: Degradation Paradox & Vanishing Gradient (Visual Diagram)
  // ==========================================
  {
    id: 3,
    type: 'visual-component',
    category: 'Situação-Problema',
    tag: 'O Grande Paradoxo',
    title: 'O Paradoxo da Degradação e o Desvanecimento de Gradiente',
    subtitle: 'Por que simplesmente empilhar camadas convencionais fazia a rede piorar até no treino?',
    component: 'DegradationVanishingDiagram',
    notes: `Se redes rasas atingem um platô, a solução óbvia seria: 'vamos empilhar mais camadas convolucionais!'. Porém, os pesquisadores se depararam com o que chamamos de Paradoxo da Degradação.

Vejam o gráfico à esquerda: no experimento clássico de Kaiming He em 2015, uma rede puramente empilhada de 56 camadas teve uma acurácia significativamente menor do que uma de 20 camadas. E atenção: esse desempenho inferior ocorreu TANTO no teste QUANTO no conjunto de treinamento! Isso provou que o problema não era overfitting, mas sim uma falha gravíssima de otimização.

O culpado está no diagrama à direita: pela regra da cadeia do backpropagation, sucessivas multiplicações matriciais amortecem o gradiente exponencialmente até que ele se torne praticamente zero nas primeiras camadas, impedindo que os pesos iniciais aprendam qualquer coisa.`
  },

  // ==========================================
  // SLIDE 4: Architectural Solutions Overview
  // ==========================================
  {
    id: 4,
    type: 'card-grid',
    category: 'Soluções de Engenharia',
    tag: 'Os 4 Pilares',
    title: 'O Mapa das Grandes Soluções Arquiteturais',
    subtitle: 'As inovações matemáticas que destravaram o treinamento de redes ultra-profundas',
    cards: [
      {
        icon: 'Layers',
        iconColor: 'icon-cyan',
        title: '1. Bottlenecks 1x1',
        points: [
          'GoogLeNet / Inception (2014)',
          'Compressão dimensional de canais',
          'Reduz custos quadráticos em até 75%'
        ]
      },
      {
        icon: 'Zap',
        iconColor: 'icon-green',
        title: '2. Conexões Residuais',
        points: [
          'ResNet (2015) — F(x) + x',
          'Atalhos diretos de identidade',
          'Supervia de gradiente (+1) no backward'
        ]
      },
      {
        icon: 'Split',
        iconColor: 'icon-blue',
        title: '3. Convoluções Separáveis',
        points: [
          'Xception & MobileNet (2017)',
          'Desacoplamento: Espaço 2D vs Canais',
          'Economia de ~8x a 9x em FLOPs'
        ]
      },
      {
        icon: 'Sliders',
        iconColor: 'icon-purple',
        title: '4. Atenção aos Canais',
        points: [
          'SENet (2017) — Squeeze & Excitation',
          'Recalibração adaptativa dinâmica',
          '< 1% de parâmetros extras'
        ]
      }
    ],
    callout: 'Esses quatro pilares formam a espinha dorsal de praticamente todas as CNNs modernas em produção hoje.',
    link: {
      url: 'https://docs.pytorch.org/vision/stable/models',
      label: 'Modelos Pré-treinados no PyTorch'
    },
    notes: `Para superar esses obstáculos, a comunidade desenvolveu quatro grandes soluções de engenharia que moldaram a visão moderna:

1. Os Bottlenecks 1x1 do GoogLeNet, que comprimem os canais antes de aplicar filtros pesados;
2. As Conexões Residuais da ResNet, que abriram supervias de propagação de gradiente com o atalho de identidade F(x) + x;
3. As Convoluções Espacialmente Separáveis do Xception e MobileNet, que dividem a operação em Depthwise e Pointwise, reduzindo em quase 9 vezes o custo computacional;
4. Os Módulos Squeeze-and-Excitation do SENet, que introduziram autoatenção aos canais com custo marginal de parâmetros.

Disponibilizamos também o link direto para o catálogo oficial de modelos pré-treinados do PyTorch (TorchVision Models) para consulta. Vamos analisar agora cada um deles em detalhes!`
  },

  // ==========================================
  // SLIDE 5: LeNet-5 Architecture (3D Visual Component)
  // ==========================================
  {
    id: 5,
    type: 'visual-component',
    category: 'Linhagem Histórica',
    tag: 'LeCun et al. • 1998',
    title: 'LeNet-5: A Gênese das Redes Convolucionais',
    subtitle: 'A arquitetura pioneira que estabeleceu o paradigma convolucional para leitura de dígitos manuscritos',
    component: 'LeNetVisualizer',
    notes: `Em 1998, Yann LeCun e seus colaboradores apresentaram a LeNet-5 no artigo clássico 'Gradient-Based Learning Applied to Document Recognition'.

Embora a rede tivesse apenas cerca de 60 mil parâmetros e operasse com imagens em escala de cinza de 32 por 32 pixels, ela introduziu a espinha dorsal de qualquer CNN: camadas convolucionais com filtros 5x5 que aprendem bordas locais, seguidas de subamostragem espacial por Average Pooling e camadas densas finais.

Vocês podem explorar o pipeline 3D na tela: a rede recebia o dígito MNIST, passava pelas convoluções C1, S2, C3, S4, C5 e F6 com funções Tanh, até classificar o dígito na saída. Foi um sucesso comercial enorme nos bancos americanos, mas por 14 anos o Deep Learning ficou limitado pela falta de poder computacional de GPUs e escassez de grandes conjuntos de dados.`
  },

  // ==========================================
  // SLIDE 6: AlexNet Architecture (3D Visual Component)
  // ==========================================
  {
    id: 6,
    type: 'visual-component',
    category: 'Linhagem Histórica',
    tag: 'ImageNet 2012 • Ponto de Virada',
    title: 'AlexNet: O Ponto de Virada do Deep Learning',
    subtitle: 'A convergência histórica entre GPUs paralelas, função ReLU, Dropout e Big Data no ImageNet',
    component: 'AlexNetVisualizer',
    notes: `Tudo mudou em 2012 com a AlexNet, desenvolvida por Alex Krizhevsky, Ilya Sutskever e Geoffrey Hinton. A AlexNet venceu a competição ImageNet esmagando as abordagens tradicionais e reduzindo o erro Top-5 de 26% para 15.3%.

Observem na visualização 3D a grande sacada de engenharia de hardware da época: as placas de vídeo NVIDIA GTX 580 tinham apenas 3GB de memória. Para acomodar os 61 milhões de parâmetros da rede, os autores dividiram o modelo em dois fluxos paralelos em GPUs separadas que trocavam informações em estágios estratégicos como a Conv3 e as camadas densas.

A AlexNet consolidou os 4 pilares modernos: a função de ativação ReLU (que treinou 6 vezes mais rápido que a Tanh sem saturar gradientes), a técnica de Dropout (0.5) para evitar overfitting nos 58 milhões de pesos das camadas densas, o treinamento massivo em GPUs e técnicas agressivas de Data Augmentation.`
  },

  // ==========================================
  // SLIDE 7: GoogLeNet & Módulos Inception (Visual Diagram)
  // ==========================================
  {
    id: 7,
    type: 'visual-component',
    category: 'Arquiteturas Clássicas',
    tag: 'ImageNet 2014 • Szegedy et al.',
    title: 'GoogLeNet: A Anatomia do Módulo Inception',
    subtitle: 'Extração multirresolução em 4 ramos paralelos com redução de dimensão 1×1 e concatenação de profundidade',
    component: 'InceptionModuleVisualizer',
    notes: `Em 2014, pesquisadores do Google liderados por Christian Szegedy apresentaram o GoogLeNet (ou Inception-v1), vencedor da competição ImageNet com uma marca histórica: atingiu 6.7% de erro Top-5 utilizando apenas 6.8 milhões de parâmetros — quase dez vezes menos pesos que a AlexNet!

O grande segredo dessa eficiência está no bloco construtivo que vemos em destaque na tela: o Módulo Inception.

A motivação original foi solucionar um dilema clássico no design de redes convolucionais: qual tamanho de filtro devemos escolher para cada camada?
- Filtros 1x1 são excelentes para combinar correlações pontuais entre canais na mesma posição espacial;
- Filtros 3x3 capturam texturas e padrões locais médios;
- Filtros 5x5 capturam estruturas maiores e contexto espacial global;
- E operações de pooling preservam os atributos mais salientes com invariância espacial a pequenas translações.

Em vez de forçar o projetista a fixar um único tamanho arbitrário, o Módulo Inception executa 4 ramos em paralelo:
1. Ramo 1 (à esquerda): Convolução 1×1 direta (64 filtros), atuando como projeção linear rápida ponto a ponto;
2. Ramo 2: Convolução 1×1 de redução (bottleneck para 96 canais) seguida de Convolução 3×3 (128 filtros);
3. Ramo 3: Convolução 1×1 de redução agressiva (para 16 canais) antes da Convolução 5×5 (32 filtros), impedindo a explosão de FLOPs;
4. Ramo 4 (à direita): Max Pooling 3×3 com stride 1 seguido por uma Convolução 1×1 de redução (32 filtros) para fixar a profundidade de saída.

Reparem na regra de ouro da geometria espacial: todas as convoluções e o pooling operam com stride 1 e 'same padding'. Dessa forma, todas as 4 saídas preservam rigorosamente a mesma altura e largura da entrada (H × W). No topo, elas convergem para a caixa verde: o 'Depth Concat', que empilha os mapas ao longo do eixo dos canais: 64 + 128 + 32 + 32 = 256 canais na saída do primeiro bloco Inception.

Vocês podem alternar no botão superior para a versão 'Ingênua': sem as convoluções 1x1 de compressão antes dos filtros 3x3 e 5x5, a quantidade de operações e mapas de ativação explodiria a cada estágio. O truque dos bottlenecks 1x1 é a grande sacada de engenharia que permitiu empilhar 9 desses blocos em 22 camadas profundas mantendo a rede leve e ultra-rápida.`
  },

  // ==========================================
  // SLIDE 8: GoogLeNet Macro Architecture (Visual Diagram)
  // ==========================================
  {
    id: 8,
    type: 'visual-component',
    category: 'Arquiteturas Clássicas',
    tag: 'Macro-Arquitetura • 22 Camadas',
    title: 'GoogLeNet: Arquitetura Completa e Fluxo em Cascata',
    subtitle: 'A distribuição dos 9 módulos Inception entre o Stem inicial e o Global Average Pooling',
    component: 'GoogLeNetArchitectureVisualizer',
    notes: `Agora que entendemos como funciona um módulo Inception isolado, vejam onde eles entram na arquitetura completa do GoogLeNet.

A rede se organiza em 3 grandes seções conectadas em cascata:
1. O Stem de Entrada (Coluna 1): reduz rapidamente a resolução espacial da imagem de 224x224 para 28x28 com convoluções 7x7 e pooling;
2. Os Módulos Inception (Colunas 2 e 3): empilham 9 blocos Inception (3a-3b em 28x28, 4a-4e em 14x14 e 5a-5b em 7x7);
3. O Head de Saída: substitui as pesadas camadas densas da AlexNet por Global Average Pooling, transformando o mapa 7x7x1024 em um único vetor 1D e usando apenas uma camada linear para as 1000 classes.

Além disso, reparem nas saídas auxiliares nos blocos 4a e 4d: elas injetavam gradiente no meio do treinamento para combater o desvanecimento.`
  },

  // ==========================================
  // SLIDE 9: 1x1 Convolutions Bottleneck (Visual Diagram)
  // ==========================================
  {
    id: 9,
    type: 'visual-component',
    category: 'Engenharia de Convoluções',
    tag: 'O Truque do Bottleneck',
    title: 'O Truque da Convolução 1x1 (Bottlenecks)',
    subtitle: 'Compressão linear de canais que reduz o custo computacional em mais de 75%',
    component: 'Inception1x1Diagram',
    notes: `Como o GoogLeNet conseguiu rodar múltiplos filtros em paralelo sem explodir a memória? Através das Convoluções 1x1!

Uma convolução 1x1 preserva a altura e largura da imagem, mas comprime ou projeta o número de canais. No exemplo da tela:
Se aplicarmos uma convolução 3x3 direta de 256 canais para 256 canais, gastamos 462 milhões de FLOPs.
Mas se colocarmos um bottleneck 1x1 que comprime de 256 para 64 canais antes da 3x3 e depois expande de volta para 256, o custo cai para apenas 115 milhões de FLOPs — uma economia de 75% com a mesma capacidade de representação!`
  },

  // ==========================================
  // SLIDE 10: ResNet Residual Learning Concept (Visual Diagram)
  // ==========================================
  {
    id: 10,
    type: 'visual-component',
    category: 'Arquiteturas Modernas',
    tag: 'A Ideia Seminal • He et al., 2015',
    title: 'ResNet: O Conceito do Aprendizado Residual',
    subtitle: 'Por que aprender a perturbação f(x) = h(x) - x com atalho direto é mais fácil do que aprender h(x) do zero',
    component: 'ResidualConceptDiagram',
    notes: `Antes de analisarmos a ResNet em profundidade, precisamos entender a genialidade teórica do Aprendizado Residual.

No bloco convencional (lado esquerdo), as camadas são forçadas a aprender o mapeamento completo h(x). Se uma camada profunda não for necessária, a rede precisa forçar seus pesos a aprender a função identidade exata (W = I, b = 0), o que é extremamente difícil em funções não-lineares.

No bloco residual (lado direito), nós adicionamos um atalho direto (Skip Connection) que passa x intacto. As camadas convolucionais agora só precisam aprender a diferença residual: f(x) = h(x) - x.
Se a camada for supérflua, basta que seus pesos conv convirjam para zero (f(x) = 0), e a saída será automaticamente a identidade perfeita h(x) = x! Além disso, a derivada do atalho é +1, criando uma via expressa para os gradientes.`
  },

  // ==========================================
  // SLIDE 11: ResNet & Skip Connections (Interactive Explorer)
  // ==========================================
  {
    id: 11,
    type: 'interactive',
    category: 'Arquiteturas Modernas',
    tag: 'ImageNet 2015 • Vencedor Absoluto',
    title: 'ResNet: Explorador de Profundidade e Gradientes',
    subtitle: 'Simule o fluxo de gradiente através de dezenas de camadas com e sem conexões de atalho',
    component: 'ResidualExplorer',
    notes: `Vejam agora o impacto prático do Aprendizado Residual no fluxo de gradientes.

Usem o controle deslizante no componente acima para variar a profundidade da rede de 18 até 152 camadas.
No modo sem skip (Plain Net), conforme a profundidade aumenta, a magnitude do gradiente decai exponencialmente até zero nas primeiras camadas, tornando o treino impossível.
Mas ao ativar a Conexão Residual (+ x), o termo da derivada do atalho (+1) mantém os gradientes vivos e fortes em todas as 152 camadas, permitindo uma convergência estável e rápida.`
  },

  // ==========================================
  // SLIDE 12: Xception & Depthwise Separable (Visual Diagram)
  // ==========================================
  {
    id: 12,
    type: 'visual-component',
    category: 'Arquiteturas Modernas',
    tag: 'François Chollet • 2017',
    title: 'Xception: Convoluções Espacialmente Separáveis',
    subtitle: 'Desacoplando a filtragem espacial 2D da combinação linear entre canais',
    component: 'DepthwiseSeparableDiagram',
    notes: `Em 2017, François Chollet propôs o Xception (Extreme Inception).

A convolução convencional mistura espaço e canais ao mesmo tempo. O Xception desacopla essa operação em dois passos cirúrgicos:
1. Convolução Depthwise: aplica um kernel 3x3 para cada canal de forma isolada;
2. Convolução Pointwise: aplica um kernel 1x1 para combinar todos os canais linearmente.

O resultado matemático demonstrado no slide é que o custo computacional cai para aproximadamente 1/9 do custo original (para K=3). Essa é a base de todas as redes leves atuais, como a família MobileNet.`
  },

  // ==========================================
  // SLIDE 13: Other Noteworthy Architectures
  // ==========================================
  {
    id: 13,
    type: 'card-grid',
    category: 'Panorama do Ecossistema',
    tag: 'VGG, DenseNet, MobileNet, EfficientNet',
    title: 'Galeria de Arquiteturas Notáveis',
    subtitle: 'A linha do tempo da inovação: da força bruta ao escalonamento composto',
    cards: [
      {
        icon: 'Layers',
        iconColor: 'icon-blue',
        title: 'VGG-16 / VGG-19 (2014)',
        points: [
          'Pilhas homogêneas de filtros pequenos 3x3.',
          'Excelente para extração de features e Neural Style Transfer.',
          'Muito pesada: 138M parâmetros (dominada por camadas FC).'
        ]
      },
      {
        icon: 'GitFork',
        iconColor: 'icon-cyan',
        title: 'DenseNet (2017)',
        points: [
          'Conecta cada camada a todas as camadas seguintes via concatenação.',
          'Reutilização máxima de características (Feature Reuse).',
          'Excelente eficiência de parâmetros, mas alto consumo de VRAM.'
        ]
      },
      {
        icon: 'Smartphone',
        iconColor: 'icon-green',
        title: 'MobileNet Family (v1-v3)',
        points: [
          'Inverted Residuals & Linear Bottlenecks (v2).',
          'Otimização por Neural Architecture Search (NAS) e h-swish (v3).',
          'Projetada para smartphones, drones e microcontroladores.'
        ]
      },
      {
        icon: 'Award',
        iconColor: 'icon-purple',
        title: 'EfficientNet (v1-v2)',
        points: [
          'Compound Scaling: balanceia profundidade (d), largura (w) e resolução (r).',
          'Máxima acurácia no ImageNet com até 8.4x menos parâmetros.',
          'Padrão estado da arte em eficiência antes dos ViTs.'
        ]
      }
    ],
    callout: 'Evolução: Força Bruta (VGG) → Atalhos (DenseNet) → Edge Computing (MobileNet) → Escalonamento Guiado por AutoML (EfficientNet).',
    notes: `Completando o ecossistema das CNNs clássicas e modernas:
- A VGG provou que pilhas de filtros 3x3 substituem filtros grandes com menos pesos;
- A DenseNet explorou a concatenação total de features entre todas as camadas;
- A MobileNet popularizou os blocos residuais invertidos para celulares;
- E a EfficientNet introduziu o Compound Scaling, ajustando de forma proporcional profundidade, largura e resolução de imagem.`
  },

  // ==========================================
  // SLIDE 14: Choosing the Right Architecture (Interactive)
  // ==========================================
  {
    id: 14,
    type: 'interactive',
    category: 'Engenharia de Produção',
    tag: 'Tabela 12-3 • TorchVision',
    title: 'Como Escolher a Arquitetura CNN Certa?',
    subtitle: 'Navegando pela Tabela 12-3 do TorchVision: Acurácia Top-1/Top-5 vs Parâmetros vs GFLOPs',
    component: 'ArchitectureSelector',
    notes: `No mercado e na indústria, a escolha de um modelo é sempre um compromisso de engenharia (trade-off) entre acurácia, latência e custo computacional.

A Tabela 12-3 na tela reúne os principais modelos pré-treinados disponíveis no TorchVision, ordenados por tamanho (parâmetros):
- No segmento Mobile & Edge (< 10M parâmetros): modelos como MobileNet v3 small (2.5M, 0.1 GFLOPs) e EfficientNet B0 (5.3M, 0.4 GFLOPs) entregam altíssima velocidade em celulares e microcontroladores.
- No segmento Equilibrado (10M a 50M): ResNet-34 (21.8M), Inception V3 (27.2M) e ConvNeXt Tiny (28.6M) equilibram alta acurácia (82.6% Top-1) com custo viável.
- No segmento de Alta Capacidade (> 50M): modelos como EfficientNet v2 large (118.5M, 85.8% Top-1) e ConvNeXt Large (197.8M, 84.4% Top-1) rivalizam diretamente com os grandes Vision Transformers.

Cliquem em qualquer linha da tabela para inspecionar os detalhes e o código PyTorch de carregamento com Weights Enum.`
  },

  // ==========================================
  // SLIDE 15: GPU RAM Breakdown (Visual Diagram)
  // ==========================================
  {
    id: 15,
    type: 'visual-component',
    category: 'Sistemas & Hardware',
    tag: 'Engenharia de Memória',
    title: 'Memória GPU RAM: Inferência vs Treinamento',
    subtitle: 'Entendendo a física da VRAM para evitar erros CUDA Out of Memory (OOM)',
    component: 'VRAMBreakdownDiagram',
    notes: `Um dos maiores choques para quem está começando em Deep Learning é a diferença abissal de consumo de GPU entre inferência e treinamento.

Na inferência, com torch.no_grad(), uma ResNet-50 consome cerca de 100 megabytes de VRAM, porque o PyTorch descarta as ativações assim que avança para a próxima camada.

No treinamento, porém, o consumo salta para mais de 8 Gigabytes! Por quê? Porque o backpropagation precisa de TODOS os mapas de ativação de TODAS as camadas salvos simultaneamente para calcular as derivadas na volta. Como mostra a barra do slide, mais de 80% da sua VRAM no treino é ocupada por ativações!`
  },

  // ==========================================
  // SLIDE 16: TorchVision Pretrained Models
  // ==========================================
  {
    id: 16,
    type: 'card-grid',
    category: 'TorchVision Moderno',
    tag: 'Weights Enum API',
    title: 'Modelos Pré-Treinados no TorchVision',
    subtitle: 'Aproveitando pesos de alta precisão e pipelines de transformações automáticas',
    cards: [
      {
        icon: 'Package',
        iconColor: 'icon-cyan',
        title: 'Nova API de Pesos (torchvision.models)',
        points: [
          'Substitui o antigo e ambíguo pretrained=True.',
          'Padrão moderno com enum de checkpoint explícito:',
          'from torchvision.models import resnet34, ResNet34_Weights',
          'weights = ResNet34_Weights.DEFAULT',
          'model = resnet34(weights=weights)'
        ]
      },
      {
        icon: 'Sliders',
        iconColor: 'icon-green',
        title: 'Transformações Automáticas Perfeitas',
        points: [
          'Garante a normalização exata (média e desvio padrão do ImageNet):',
          'preprocess = weights.transforms()',
          'tensor = preprocess(imagem_pil)',
          'Evita bugs silenciosos de pré-processamento incorreto em produção.'
        ]
      }
    ],
    callout: 'Regra de Ouro: Sempre utilize weights.transforms() para garantir que a imagem de teste receba o mesmo tratamento estatístico usado no treinamento original do modelo.',
    notes: `No TorchVision moderno, não usamos mais o argumento depreciado "pretrained=True". A biblioteca agora utiliza o padrão Weights Enum (por exemplo, ResNet34_Weights.DEFAULT).

Essa mudança trouxe um benefício crucial: o método weights.transforms(). Antigamente, os desenvolvedores esqueciam de normalizar as imagens com a média e desvio padrão exatos do ImageNet ([0.485, 0.456, 0.406] e [0.229, 0.224, 0.225]), o que degradava silenciosamente a acurácia do modelo em produção.

Agora, o próprio objeto de pesos fornece a cadeia de pré-processamento ideal para o modelo. Vamos ver isso em ação no nosso laboratório de Transfer Learning a seguir.`
  },

  // ==========================================
  // SLIDE 17: Transfer Learning Laboratory (Interactive)
  // ==========================================
  {
    id: 17,
    type: 'interactive',
    category: 'Transfer Learning',
    tag: 'Laboratório Interativo',
    title: 'Transfer Learning: Feature Extraction vs Fine-Tuning',
    subtitle: 'Simule o congelamento de parâmetros, troca do classificador e taxas de aprendizado diferenciais',
    component: 'TransferLearningSimulator',
    notes: `Transfer Learning é a técnica mais utilizada em visão computacional aplicada. Mas como decidir entre Feature Extraction e Fine-Tuning?

A regra de ouro depende de duas variáveis:
1. Tamanho do seu dataset de destino.
2. Similaridade do seu dataset com o ImageNet.

Experimentem as 3 estratégias no simulador acima:
- Se você tem poucas imagens (ex: 200 fotos de peças industriais com defeito), use Feature Extraction: congele todo o backbone com param.requires_grad = False e treine apenas a nova camada FC. Isso impede que o modelo decore os dados (overfitting).
- Se você tem um volume moderado a alto de dados, use Fine-Tuning Parcial ou Completo, mas com taxas de aprendizado diferenciais: coloque uma taxa muito baixa (1e-5) no backbone para ajustar sutilmente os pesos e uma taxa maior (1e-3) na cabeça de saída.`
  },

  // ==========================================
  // SLIDE 18: Classification + Localization (Visual Diagram)
  // ==========================================
  {
    id: 18,
    type: 'visual-component',
    category: 'Além da Classificação',
    tag: 'Dupla Cabeça (Dual Head)',
    title: 'Classificação com Localização de Objeto Único',
    subtitle: 'Prevendo simultaneamente a categoria e as coordenadas contínuas da Bounding Box [x, y, w, h]',
    component: 'DualHeadDiagram',
    notes: `Até agora, nossas CNNs respondiam apenas: "O que é essa imagem?". Mas na maioria das aplicações reais de robótica, veículos e saúde, precisamos saber também: "Onde o objeto está?".

Vejam o exemplo na tela: alimentamos a imagem de um gato em nosso backbone ResNet compartilhado. A partir do mesmo vetor de características latente de 512 dimensões, a rede se divide em duas cabeças especializadas:
1. Uma cabeça classifica com Cross-Entropy e prevê a classe 'Gato' com 97.4% de confiança.
2. A outra cabeça faz a regressão linear de 4 números contínuos representando as coordenadas normalizadas da bounding box [x, y, w, h] com Smooth L1 Loss.

Para avaliar se a caixa prevista está correta, usamos a métrica de IoU (Intersection over Union). Se a sobreposição for maior ou igual a 0.5 (no nosso exemplo, IoU = 0.91), consideramos a detecção um sucesso absoluto.`
  },

  // ==========================================
  // SLIDE 19: Detecção de Objetos (Two-Stage vs One-Stage)
  // ==========================================
  {
    id: 19,
    type: 'comparison',
    category: 'Detecção de Objetos',
    tag: 'Faster R-CNN vs YOLO',
    title: 'Detecção de Objetos: Two-Stage vs One-Stage',
    subtitle: 'Localizando múltiplos objetos através de propostas de região versus grade direta em tempo real',
    cardLeft: {
      title: 'Two-Stage (Faster R-CNN)',
      badge: 'Foco: Máxima Precisão (mAP)',
      points: [
        'Etapa 1 (RPN): Rede escaneia e gera ~2000 regiões candidatas de interesse.',
        'Etapa 2 (RoI Align): Recorta, redimensiona e classifica cada proposta.',
        'Desempenho: 5 a 15 FPS (mais lento, porém cirúrgico em objetos pequenos).'
      ],
      highlight: 'Ideal para exames médicos, satélites e imagens de altíssima resolução.'
    },
    cardRight: {
      title: 'One-Stage (Família YOLO / SSD)',
      badge: 'Foco: Tempo Real (30 a 120+ FPS)',
      points: [
        'Passada Única: Divide a imagem em grade e prevê caixas e classes diretamente.',
        'Filtragem NMS: Elimina caixas sobrepostas com base em confiança e IoU.',
        'Desempenho: Altíssima velocidade para inferência em borda e vídeo em tempo real.'
      ],
      highlight: 'Ideal para carros autônomos, robôs móveis e monitoramento urbano.'
    },
    notes: `Quando a imagem contém múltiplos objetos de tamanhos e categorias diferentes, entramos no domínio da Detecção de Objetos.

Historicamente, dividimos as arquiteturas em dois grandes paradigmas:
1. Detectores Two-Stage (como o Faster R-CNN): primeiro geram milhares de regiões candidatas com a Region Proposal Network (RPN) e depois classificam cada uma. São muito precisos, mas mais lentos.
2. Detectores One-Stage (como a famosa família YOLO): processam a imagem em uma única passada pela rede convolucional, dividindo o espaço em uma grade e prevendo diretamente coordenadas e classes ao mesmo tempo.

Para limpar as dezenas de caixas sobrepostas que a rede gera para um mesmo objeto, aplicamos o algoritmo de Não-Supressão Máxima (NMS), mantendo apenas a caixa de maior confiança e descartando as que têm alto IoU com ela.`
  },

  // ==========================================
  // SLIDE 20: Object Tracking (Visual Diagram)
  // ==========================================
  {
    id: 20,
    type: 'visual-component',
    category: 'Visão Espaçotemporal',
    tag: 'DeepSORT • Fluxo de Vídeo',
    title: 'Rastreamento de Objetos (Object Tracking)',
    subtitle: 'Mantendo identificadores únicos e trajetórias consistentes mesmo com oclusões temporárias',
    component: 'ObjectTrackingVisualizer',
    notes: `O próximo passo evolutivo da visão é o processamento de vídeo através do Rastreamento de Objetos (Object Tracking).

Se rodarmos apenas um detector como o YOLO frame a frame, ele detectará objetos isolados, mas se um objeto for parcialmente ocluído, o detector pode falhar ou atribuir um novo ID (ID Switch).

Vejam o exemplo na tela: o gato está caminhando na calçada e se esconde parcialmente atrás de um poste de madeira.
A abordagem estado da arte é o Tracking-by-Detection com o algoritmo DeepSORT, baseado em 3 pilares:
1. Filtro de Kalman: estima a cinemática e prediz a posição do corpo do gato mesmo quando oculto pelo poste;
2. Re-Identificação Visual (ReID): uma CNN siamesa extrai a assinatura visual (embedding) da face/pelagem e calcula a similaridade de cosseno (94.2% de match);
3. Algoritmo Húngaro: resolve a atribuição ótima 1-para-1 na matriz de custo combinada.

Com isso, o sistema preserva o ID #07 ativo sem interrupção ou troca de identidade.`
  },

  // ==========================================
  // SLIDE 21: Semantic Segmentation (Visual Diagram)
  // ==========================================
  {
    id: 21,
    type: 'visual-component',
    category: 'Visão Densa',
    tag: 'Predição por Pixel • U-Net',
    title: 'Segmentação Semântica: U-Net & FCN',
    subtitle: 'Arquiteturas Encoder-Decoder com skip connections para geração de máscaras de alta resolução',
    component: 'UNetDiagram',
    notes: `Por fim, chegamos à tarefa mais detalhada e de maior granularidade espacial: a Segmentação Semântica.

Em tarefas de classificação e detecção, nós aceitamos perder resolução espacial para ganhar abstração semântica. Mas em segmentação médica (como delinear as bordas de um tumor para cirurgia) ou em carros autônomos (onde cada centímetro da calçada importa), precisamos classificar cada pixel individual da imagem.

A arquitetura campeã e padrão absoluto da indústria é a U-Net (Ronneberger et al., 2015). A U-Net tem formato de "U":
O lado esquerdo é o Encoder, que reduz a imagem para extrair semântica;
O lado direito é o Decoder, que faz upsampling com convoluções transpostas;
E no meio, pontes diretas (skip connections) transferem as texturas de altíssima resolução das camadas rasas para o decoder, garantindo bordas perfeitamente nítidas nas máscaras.`
  },

  // ==========================================
  // SLIDE 22: Vision Tasks Comparison (Interactive)
  // ==========================================
  {
    id: 22,
    type: 'interactive',
    category: 'Síntese Visual',
    tag: 'Laboratório Interativo',
    title: 'Comparativo Integrado: As 5 Grandes Tarefas de Visão',
    subtitle: 'Visualize a mesma cena do mundo real sob a perspectiva de cada paradigma de visão computacional',
    component: 'VisionTasksShowcase',
    notes: `Este laboratório interativo sintetiza com perfeição toda a segunda metade da nossa aula.

Naveguem pelos 5 botões superiores para observar a mesmíssima cena sob 5 lentes computacionais distintas:
1. Classificação Simples: retorna um único rótulo global ('Veículo');
2. Classificação + Localização: adiciona uma caixa única $[x, y, w, h]$;
3. Detecção de Objetos (YOLO): localiza múltiplos objetos com caixas independentes e confianças individuais;
4. Rastreamento (Tracking): atribui identificadores persistentes e vetores de velocidade ao longo do tempo;
5. Segmentação Semântica: pinta cada pixel da cena com sua respectiva classe (Céu, Pista, Veículo, Calçada).

Observem como os tensores de saída e as funções de perda mudam radicalmente em cada uma das modalidades.`
  },

  // ==========================================
  // SLIDE 23: Interactive Knowledge Quiz
  // ==========================================
  {
    id: 23,
    type: 'interactive',
    category: 'Consolidação',
    tag: 'Desafio Prático',
    title: 'Quiz Interativo de Engenharia de CNNs',
    subtitle: 'Teste seus conhecimentos práticos sobre arquiteturas, fluxo de gradientes e gerenciamento de hardware',
    component: 'QuizComponent',
    notes: `Chegou o momento de testarmos nossos conhecimentos com 3 questões práticas de engenharia de visão computacional!

Leiam atentamente cada pergunta na tela, selecionem a alternativa que julgarem correta e cliquem em 'Confirmar Resposta' para receberem a explicação detalhada de cada conceito.

Essas perguntas foram elaboradas com base em desafios reais de mercado e decisões arquiteturais de projetos de visão computacional.`
  }
];
