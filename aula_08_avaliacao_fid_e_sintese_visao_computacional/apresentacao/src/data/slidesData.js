/**
 * Matriz de Dados dos Slides - Aula 08
 * Avaliação de Modelos Generativos (FID) e Síntese Teórica da Visão Computacional
 * Faculdade Infnet - Pós-Graduação EAD
 */

export const slides = [
  // =========================================================================
  // BLOCO 0: ABERTURA E MAPA CONCEITUAL (Slides 1 e 2)
  // =========================================================================
  {
    id: 1,
    type: 'title',
    title: 'Avaliação de Modelos Generativos (FID) e Síntese Teórica da Disciplina',
    subtitle: 'Fréchet Inception Distance, Interpretabilidade, Multimodalidade e Metodologia Rigorosa de Projetos',
    category: 'Síntese Avançada & Avaliação',
    tag: 'Aula 08 • Etapa Final',
    badges: [
      'Fréchet Inception Distance (FID)',
      'Inception-v3 pool3 (2048-D)',
      '6 Marcos Arquiteturais do Curso',
      'Vision Transformers & Attention Maps',
      'Espaço Latente Multimodal CLIP',
      'Transfer Learning & Augmentation',
      'Oversampling Generativo cGAN/CycleGAN',
      'Governança Sem Vazamento de Dados'
    ],
    notes: `Olá a todos e sejam muito bem-vindos à nossa Aula 8 da disciplina de Visão Computacional com CNNs e Transformers da Faculdade Infnet!

Chegamos à nossa aula final, um momento de consolidação de todo o conhecimento avançado que construímos ao longo das sete semanas anteriores. Nesta aula, temos dois objetivos centrais de altíssimo nível técnico.

Primeiro, fecharemos a fronteira da modelagem generativa que iniciamos na aula passada: vamos dissecar com rigor matemático e prático a principal métrica quantitativa da literatura moderna de GANs e modelos generativos — o FID (Fréchet Inception Distance). Compreenderemos por que métricas clássicas de pixels e o Inception Score original falham, como o espaço latente de 2048 dimensões da Inception-v3 captura a fidelidade semântica e a diversidade estatística de distribuições visuais, e como calcular a distância de Wasserstein-2 entre gaussianas multivariadas.

Em segundo lugar, realizaremos uma revisão teórica aprofundada e integrada de todas as grandes arquiteturas estudadas no curso através de 6 Marcos Evolutivos: da ResNet e U-Net ao Transformer canônico, ViT, Swin Transformer, CLIP e à U-Net de difusão latente. Além disso, consolidaremos os mecanismos de interpretabilidade, a geometria da hiper-esfera multimodal e os protocolos de governança contra desbalanceamento e vazamento de dados. Tenham todos uma excelente aula de síntese!`
  },
  {
    id: 2,
    type: 'visual-component',
    component: 'CourseSynthesisRoadmapDiagram',
    title: 'Estrutura Pedagógica: Dos Fundamentos do FID à Síntese Teórica',
    subtitle: 'Quatro blocos estruturados articulando avaliação estatística, evolução arquitetural, interpretabilidade e governança',
    category: 'Roteiro da Sessão',
    tag: '23 Slides Estruturados',
    notes: `Vejam neste slide o nosso mapa de vôo para a aula de hoje. Estruturamos nossa sessão em quatro blocos pedagógicos rigorosamente articulados, totalizando 23 slides estruturados.

No Bloco 1, dos Slides 3 ao 6, dedicamo-nos integralmente à Métrica FID e à Avaliação Estatística de GANs. Analisaremos as limitações estruturais de métricas pixel a pixel como MSE e PSNR, as vulnerabilidades do Inception Score original, a extração de features na penúltima camada do Inception-v3 e as boas práticas de tamanho amostral e reprodutibilidade com o clean-fid.

No Bloco 2, dos Slides 7 ao 12, percorreremos a Evolução Arquitetural da Disciplina através dos seus 6 Grandes Marcos: Marco 1 (ResNet e U-Net), Marco 2 (Transformer e BERT), Marco 3 (Vision Transformer / ViT), Marco 4 (Swin Transformer), Marco 5 (CLIP Multimodal) e Marco 6 (Modelos Generativos e a U-Net de Difusão), evidenciando os elos evolutivos que conectam cada arquitetura à próxima.

No Bloco 3, dos Slides 13 ao 16, consolidamos a Interpretabilidade e a Multimodalidade na prática, com o pipeline de extração de attention maps no ViT, o laboratório interativo de auditoria de atalhos espúrios, a calibração de thresholds na hiperesfera do CLIP e o simulador de busca semântica em diferentes níveis de abstração.

Por fim, no Bloco 4, dos Slides 17 ao 23, abordamos a Governança de Transfer Learning em CNNs, o gerenciamento de desbalanceamento severo de classes, o protocolo científico de avaliação downstream para modelos generativos (cGAN e CycleGAN), os perigos do vazamento de dados por amostragem dependente e a mitigação de Covariate Shift, finalizando com o nosso Quiz de Fixação. Vamos em frente!`
  },

  // =========================================================================
  // BLOCO 1: AVALIAÇÃO DE GANs & A MÉTRICA FID (Slides 3 a 6)
  // =========================================================================
  {
    id: 3,
    type: 'visual-component',
    component: 'GenerativeEvaluationPitfallsDiagram',
    title: 'O Dilema da Avaliação Generativa: Por que MSE e Inception Score Falham',
    subtitle: 'A ausência de alinhamento pixel a pixel e as fragilidades estruturais do Inception Score',
    category: 'Avaliação de GANs',
    tag: 'Dilema Metodológico',
    notes: `Começamos com a Situação-Problema do Mundo Real: como avaliar quantitativamente se uma rede neural generativa aprendeu de fato a gerar boas imagens?

Em modelos supervisionados de classificação ou detecção, a avaliação é direta: temos rótulos verdadeiros e matrizes de confusão. Em tarefas de restauração ou super-resolução, temos uma imagem ground-truth pareada e calculamos MSE, PSNR ou SSIM.

Porém, em modelos generativos como GANs incondicionais, cGANs ou modelos de difusão, amostramos um vetor latente aleatório z de uma distribuição normal e a rede sintetiza uma imagem inédita. Não existe um par 'ground-truth' para comparar pixel a pixel! Se calcularmos o MSE entre uma imagem gerada de um cachorro realista e um cachorro real da base de teste, o MSE será astronômico simplesmente porque a pose, a rotação ou a iluminação diferem ligeiramente. Um deslocamento de apenas 2 pixels na mesma imagem real já explode o MSE!

Para contornar isso, Salimans et al. propuseram em 2016 o Inception Score (IS). O IS passa as imagens sintéticas por uma rede Inception-v3 pré-treinada no ImageNet e avalia duas propriedades da distribuição de probabilidade de classes p(y|x):
1. Nitidez da amostra individual: cada imagem deve receber predição com alta certeza em uma única classe (baixa entropia condicional).
2. Diversidade global de classes: a média marginal p(y) sobre todo o conjunto gerado deve ser uniforme (alta entropia marginal).

Embora engenhoso, o Inception Score possui três falhas capitais documentadas na literatura:
Primeira: ele NÃO compara as imagens geradas com os dados reais! O IS avalia apenas se a Inception-v3 tem certeza do que está vendo. Se o gerador sintetizar imagens abstratas com texturas que ativem fortemente uma classe do ImageNet, o IS será altíssimo sem que a imagem pareça real.
Segunda: o IS é cego ao colapso de modo intra-classe! Se o gerador produzir exatamente a mesma imagem de cachorro repetida 10.000 vezes para a classe 1, a mesma imagem de gato repetida 10.000 vezes para a classe 2, e assim por diante para as 1.000 classes, p(y) será perfeitamente uniforme e o IS será máximo!
Terceira: em domínios específicos como imagens biológicas, radiografias ou satélites, a distribuição de classes do ImageNet perde totalmente o sentido. Precisamos de uma métrica que compare diretamente as distribuições contínuas de características.`
  },
  {
    id: 4,
    type: 'visual-component',
    component: 'FIDInceptionFeaturePipelineDiagram',
    title: 'A Engenharia do FID: Extração de Features no Espaço Latente Inception-v3',
    subtitle: 'Mapeamento de distribuições visuais de alta dimensão para representações semânticas contínuas em R^2048',
    category: 'Engenharia do FID',
    tag: 'Espaço Contínuo R^2048',
    notes: `Aqui surge a Solução de Engenharia: em 2017, Martin Heusel e colaboradores apresentaram no NeurIPS o Fréchet Inception Distance (FID).

Qual foi a grande sacada dos autores? Em vez de olhar para os pixels discretos da imagem (um espaço de altíssima dimensão com 299x299x3 = 268.203 variáveis correlacionadas) e em vez de olhar para as probabilidades softmax discretas de 1.000 classes do Inception Score, nós devemos olhar para as representações semânticas contínuas intermediárias!

Acompanhem no diagrama o pipeline paralelo de duas vias:
Na via superior, pegamos um conjunto de N imagens REAIS do nosso dataset (X_r ~ p_data). Redimensionamos para 299x299 e passamos por uma rede Inception-v3 com pesos fixos pré-treinados no ImageNet. Interceptamos a penúltima camada da rede: a camada de pooling global médio 'pool3'. Nessa camada, cada imagem é transformada em um vetor contínuo de características de 2048 dimensões! Temos então uma matriz de features reais F_r com formato [N, 2048].

Na via inferior, fazemos exatamente o mesmo processo para N imagens SINTÉTICAS geradas pelo nosso modelo (X_g = G(z)). Passamos as imagens geradas pela MESMA Inception-v3 congelada e extraímos a matriz de features sintéticas F_g com formato [N, 2048].

Agora vem o salto estatístico: nós modelamos a nuvem de features reais como uma distribuição normal multivariada N(mu_r, Sigma_r) e a nuvem de features sintéticas como outra distribuição normal multivariada N(mu_g, Sigma_g).
O vetor mu representa a média empírica das 2048 features, e a matriz Sigma representa a matriz de covariância de 2048x2048.

Com essas duas gaussianas estimadas, calculamos a distância Wasserstein-2 entre elas. Esse é o Fréchet Inception Distance! Ele mede diretamente a discrepância geométrica entre a distribuição real e a distribuição gerada no espaço de conceitos semânticos da rede.`
  },
  {
    id: 5,
    type: 'interactive',
    component: 'FIDSimulatorLab',
    title: 'Laboratório Interativo: Simulador Paramétrico da Distância de Fréchet',
    subtitle: 'Manipule centroides, dispersão de covariância e modos de colapso para visualizar o impacto no FID em tempo real',
    category: 'Laboratório Interativo',
    tag: 'Simulador Paramétrico',
    notes: `Para consolidar a intuição física do FID e de seus termos matemáticos, desenvolvemos este simulador interativo. Aqui estamos projetando o espaço latente de alta dimensão em um plano bidimensional tratável para que vocês vejam geometricamente o que os dois termos matemáticos representam.

A elipse verde com traçado firme representa a distribuição dos dados reais N(mu_r, Sigma_r), centrada na origem com sua dispersão e orientação de covariância típicas. A elipse azul/colorida representa a distribuição gerada pela nossa rede neural N(mu_g, Sigma_g).

Experimentem manipular os controles na coluna esquerda:
1. No slider 'Deslocamento de Média (Delta mu)', desloquem o centroide. Observem no painel direito que o termo ||mu_r - mu_g||^2 dispara instantaneamente enquanto a elipse azul se afasta da verde, ilustrando perda de fidelidade semântica.
2. Agora cliquem no botão preset 'Mode Collapse' no topo ou reduzam o slider 'Escala de Variância' para 0.15x. Vejam o que acontece: o centroide pode até estar perfeitamente alinhado com a média real, mas a elipse azul encolhe para um ponto minúsculo! A covariância sintética quase zerou. Observem como o segundo termo Tr(Sigma_r + Sigma_g - 2*sqrt) sobe vertiginosamente, elevando o FID e ativando o alerta vermelho de Mode Collapse!
3. Por fim, testem o preset 'Ruído/Dispersão': o gerador espalha amostras aleatórias por todo o espaço, hiper-inflando a covariância e gerando outro tipo de penalização.

Esse laboratório demonstra visualmente por que o FID se consagrou como a métrica soberana: ele não se deixa enganar nem por imagens que apenas acertam a média sem variedade, nem por imagens variadas que erram a média do domínio.`
  },
  {
    id: 6,
    type: 'visual-component',
    component: 'FIDEngineeringPracticesDiagram',
    title: 'Práticas de Engenharia do FID: Tamanho Amostral, Viés e Padronização',
    subtitle: 'Diretrizes metodológicas para evitar medições espúrias e garantir reprodutibilidade experimental',
    category: 'Boas Práticas de Engenharia',
    tag: 'clean-fid & Viés N',
    notes: `Na prática profissional de machine learning, calcular o FID exige rigor metodológico estrito. Não basta rodar uma biblioteca qualquer sem conhecer os detalhes de engenharia. Observem os três pilares deste slide:

Pilar 1: O Viés Amostral Positivo em função de N.
O estimador empírico do FID é estatisticamente enviesado para cima quando avaliado em amostras pequenas. A esperança matemática do FID calculado com N amostras segue a relação assintótica: E[FID_N] = FID_infinito + C / N, onde C é uma constante positiva.
O que isso significa na prática? Se vocês calcularem o FID de um modelo usando apenas N = 1.000 imagens reais e 1.000 imagens sintéticas, o FID reportado será artificialmente mais alto em 10 a 20 pontos do que o valor real! Com N = 10.000 amostras, o valor estabiliza para prototipagem rápida. No entanto, o padrão ouro exigido em artigos e benchmarks internacionais é estritamente N = 50.000 imagens (conhecido como FID-50k). Sempre que reportarem um score de FID, indiquem o número de amostras utilizado!

Pilar 2: Reprodutibilidade e a biblioteca clean-fid (Parmar et al., CVPR 2022).
Pesquisadores da Carnegie Mellon documentaram que sutilezas aparentemente inofensivas no pré-processamento de imagens alteram o FID em até 8 pontos! Por exemplo: usar interpolação bilinear versus bicúbica ao redimensionar para 299x299; decodificar JPEGs via PIL versus OpenCV; ou salvar imagens em disco e recarregá-las versus passar tensores em memória. Para acabar com essa falta de padronização, a comunidade adotou bibliotecas auditadas como o 'clean-fid' e o 'torch-fidelity', que empacotam o pipeline exato de resize bicúbico e os pesos oficiais da Inception-v3.

Pilar 3: Decomposição em Precision e Recall para Distribuições (Sajjadi et al., NeurIPS 2018).
Embora o FID resuma a qualidade em um único escalar, em diagnósticos avançados decompomos a distância em duas métricas de suporte: Precision quantifica a fração de imagens geradas que residem dentro da variedade de dados reais (qualidade/fidelidade individual), enquanto Recall quantifica a fração da variedade real coberta pelo gerador (diversidade/ausência de colapso).`
  },

  // =========================================================================
  // BLOCO 2: OS 6 GRANDES MARCOS ARQUITETURAIS DA DISCIPLINA (Slides 7 a 12)
  // =========================================================================
  {
    id: 7,
    type: 'visual-component',
    component: 'ArchMarco1CnnUnetDiagram',
    title: 'Marco 1 — CNNs Profundas (ResNet) & U-Net: A Era dos Convolutivos e Conexões Residuais',
    subtitle: 'A superação da degradação de gradientes via atalhos residuais e a preservação de detalhes espaciais na U-Net',
    category: 'Evolução Arquitetural',
    tag: 'Marco 1 / 6',
    notes: `Iniciamos nossa grande viagem pela evolução arquitetural da disciplina revisitando o Marco 1, fundamentado na Aula 1: as Redes Convolucionais Profundas (ResNet) e a U-Net.

Situação-Problema do Mundo Real:
Até 2015, empilhar camadas convolucionais além de 20 ou 30 camadas causava o fenômeno da Degradação: contra-intuitivamente, a acurácia de treino piorava, mesmo sem overfitting! O fluxo de retropropagação saturava e os gradientes desapareciam ou explodiam ao atravessar sucessivas multiplicações de matrizes de pesos. Paralelamente, em tarefas de segmentação biomédica pixel a pixel, o downsampling progressivo destruía irreversivelmente os detalhes espaciais finos de bordas e microestruturas celulares.

Solução de Engenharia e Intuição:
He et al. (CVPR 2016) introduziram o Bloco Residual (BasicBlock/Bottleneck): em vez de forçar a camada a aprender o mapeamento subjacente direto H(x), a rede é parametrizada para aprender apenas o resíduo F(x) = H(x) - x, adicionando um atalho de identidade x + F(x). Se uma camada profunda não for necessária, os pesos convergem naturalmente a zero e a informação simplesmente flui pela identidade sem degradação!
Para a segmentação densa, Ronneberger et al. (MICCAI 2015) criaram a U-Net, estabelecendo conexões de salto (Skip Connections) diretas que concatenam mapas de ativação de alta resolução do encoder com as camadas correspondentes do decoder.

Teoria e Formalismo Rigoroso:
No BasicBlock, a saída é y = ReLU(F(x, {W_i}) + x). A derivada em relação à entrada é dL/dx = (dL/dy) * (dF/dx + 1). Observem o termo '+ 1': mesmo que dF/dx se anule, o gradiente dL/dy transita intacto de volta para as primeiras camadas!

O Elo de Ligação com o Próximo Marco:
As CNNs operam sob fortes vieses indutivos locais (filtros 3x3) e invariância à translação. O campo receptivo cresce muito lentamente com a profundidade, exigindo dezenas de camadas para correlacionar regiões distantes de uma cena. Como modelar dependências globais e relações cruzadas arbitrárias em um único passo? A resposta revolucionária veio do NLP: o mecanismo de Auto-Atenção Global do Transformer canônico!`
  },
  {
    id: 8,
    type: 'visual-component',
    component: 'ArchMarco2TransformerBertDiagram',
    title: 'Marco 2 — O Transformer Canônico & BERT: O Advento da Auto-Atenção Global e Encoders',
    subtitle: 'Projeções Query-Key-Value, matrizes de contexto e o token [CLS] como agregador de sequência',
    category: 'Evolução Arquitetural',
    tag: 'Marco 2 / 6',
    notes: `Chegamos ao Marco 2, fundamentado nas Aulas 2 e 3: o Transformer canônico de Vaswani et al. (NeurIPS 2017) e o modelo BERT de Devlin et al. (NAACL 2019).

Situação-Problema do Mundo Real:
O processamento de dados sequenciais dependia de RNNs e LSTMs. Esses modelos sofrem de dois gargalos fatais: primeiro, a dependência temporal estritamente sequencial h_t = f(h_{t-1}, x_t) impede a paralelização massiva em GPUs; segundo, gradientes e informações de contexto se degradam ao longo de sequências longas, limitando a retenção de memória.

Solução de Engenharia e Intuição:
A eliminação total da recorrência em favor da Auto-Atenção Multi-Head (MHA). Cada token da sequência é projetado em três subespaços funcionais distintos: Query (o que procuro), Key (o que ofereço) e Value (o conteúdo informativo). Ao calcular o produto escalar entre todas as Queries e todas as Keys, a rede determina dinamicamente o grau de afinidade entre qualquer par de posições da sequência em um único passo computacional!
O BERT expandiu esse conceito empilhando 12 camadas de Transformer Encoders com atenção bidirecional irrestrita e introduziu o token especial [CLS] na posição 0, que atua como um agregador contextual da sequência inteira para tarefas downstream.

Teoria e Formalismo Rigoroso:
O Scaled Dot-Product Attention é formalizado por:
Attention(Q, K, V) = softmax(Q * K^T / sqrt(d_k)) * V.
O fator de escala 1/sqrt(d_k) é vital: com dimensões altas (ex: d_k = 64), o produto interno Q * K^T tem variância proporcional a d_k; sem o escalonamento, os valores explodem para regiões onde a função softmax tem gradientes infinitesimais, congelando o aprendizado!

O Elo de Ligação com o Próximo Marco:
O Transformer e o BERT revolucionaram sequências unidimensionais de texto; mas como aplicar essa mecânica em visão computacional? Uma imagem de 224x224 pixels geraria uma sequência de 50.176 elementos, cuja matriz de atenção QK^T exigiria 2,5 bilhões de células por camada, estourando qualquer GPU moderna! A solução de engenharia foi o fatiamento em patches discretos no Vision Transformer (ViT)!`
  },
  {
    id: 9,
    type: 'visual-component',
    component: 'ArchMarco3ViTCanonicDiagram',
    title: 'Marco 3 — Vision Transformer (ViT): A Conquista da Atenção Pura em Visão sem Convoluções',
    subtitle: 'Fatiamento de imagens em patches de 16×16, projeção linear de embeddings e campo receptivo global imediato',
    category: 'Evolução Arquitetural',
    tag: 'Marco 3 / 6',
    notes: `Avançamos para o Marco 3, fundamentado na Aula 3: o Vision Transformer canônico (ViT) introduzido por Dosovitskiy et al. (ICLR 2021).

Situação-Problema do Mundo Real:
Como vimos, alimentar pixels individuais diretamente em um Transformer é computacionalmente proibitivo devido à complexidade quadrática O(N^2) da atenção. Além disso, as CNNs reinavam soberanas há uma década; acreditava-se que o viés indutivo convolucional (localidade e invariância à translação) era obrigatório para aprender visão computacional.

Solução de Engenharia e Intuição:
A grande sacada dos autores foi o 'Patch Slicing': fatiar a imagem bidimensional em pequenos blocos quadrados não-sobrepostos de 16x16 pixels. Cada patch é achatado em um vetor e tratado como se fosse uma 'palavra' de texto! Uma imagem 224x224x3 produz exatamente 196 patches. Esses 196 vetores são mapeados por uma matriz linear para 768 dimensões, concatenados com um token learnable [CLS] na posição 0 e somados a embeddings posicionais 1D, entrando em um Transformer Encoder padrão sem nenhuma convolução!

Teoria e Formalismo Rigoroso:
O tensor de patches x_p tem dimensões [B, N, P^2 * C], onde N = (HW)/P^2 = 196 e P^2 * C = 16*16*3 = 768.
A projeção linear de embeddings é dada por: z_0 = [x_class; x_p^1 E; ...; x_p^N E] + E_pos, gerando o tensor [B, 197, 768].
No ViT-Base, esse tensor atravessa L = 12 blocos encoder com LayerNorm pré-atenção, MHA com 12 cabeças e MLP com expansão 4x (3072 dims). Na saída da última camada, descartamos os 196 tokens de patches e classificamos a imagem exclusivamente através do vetor latente do token [CLS] (z_L^0).

O Elo de Ligação com o Próximo Marco:
Embora o ViT atinja campo receptivo global instantâneo já na camada 1, ele mantém resolução fixa durante todo o processamento e seu custo computacional ainda é quadrático O(N^2). Isso inviabiliza imagens de alta resolução (1K, 2K ou 4K) e impede a geração de mapas de características multiescala exigidos por detectores densos como Mask R-CNN e U-Net. Como recuperar a eficiência linear e a hierarquia multiescala? A solução genial foi o Swin Transformer!`
  },
  {
    id: 10,
    type: 'visual-component',
    component: 'ArchMarco4SwinTransformerDiagram',
    title: 'Marco 4 — Swin Transformer: Hierarquia Piramidal e Janelas Deslocadas Lineares',
    subtitle: 'Patch Merging em 4 estágios e atenção local W-MSA/SW-MSA com complexidade linear',
    category: 'Evolução Arquitetural',
    tag: 'Marco 4 / 6',
    notes: `Chegamos ao Marco 4, fundamentado na Aula 4: o Swin Transformer (Shifted Windows) de Liu et al. (ICCV 2021 Best Paper).

Situação-Problema do Mundo Real:
O ViT original é um encoder monotônico: processa uma grade fixa de patches (14x14) do início ao fim com atenção global. Isso gera dois problemas severos: primeiro, para imagens de alta resolução, o número de patches explode e a auto-atenção global torna-se computacionalmente intratável; segundo, tarefas densas como detecção de objetos e segmentação semântica dependem de características piramidais em múltiplas escalas (FPN, U-Net).

Solução de Engenharia e Intuição:
O Swin Transformer reconcilia a capacidade dos Transformers com a estrutura hierárquica das CNNs através de duas inovações seminais:
1. Pirâmide em 4 Estágios via Patch Merging: o modelo começa com patches pequenos de 4x4 e, a cada estágio, concatena grupos de 2x2 patches vizinhos e aplica uma projeção linear, reduzindo a resolução espacial à metade e dobrando a quantidade de canais (H/4 -> H/8 -> H/16 -> H/32).
2. Janelas Deslocadas (Shifted Windows): a atenção é calculada estritamente dentro de janelas locais de M x M patches (M=7), resultando em complexidade estritamente linear O(M^2 * N). Para permitir a comunicação entre janelas vizinhas sem custo extra, camadas consecutivas alternam entre janelas regulares (W-MSA) e janelas deslocadas (SW-MSA) com técnica de deslocamento cíclico (Cyclic Shift) e mascaramento.

Teoria e Formalismo Rigoroso:
A complexidade da atenção global do ViT é O(4 * H * W * C^2 + 2 * (H * W)^2 * C), quadrática em relação a HW. No Swin, a complexidade é O(4 * H * W * C^2 + 2 * M^2 * H * W * C). Como M é fixo em 7, o segundo termo é puramente linear em relação ao número total de pixels!

O Elo de Ligação com o Próximo Marco:
O Swin Transformer superou o gargalo de complexidade e consolidou-se como backbone universal para visão computacional; no entanto, tanto o ViT quanto o Swin foram concebidos para classificação fechada sob um número fixo de classes numéricas (ex: 1.000 classes do ImageNet). Como transcender rótulos discretos e conectar representações visuais com qualquer conceito expresso em linguagem natural? A resposta foi o aprendizado multimodal do CLIP!`
  },
  {
    id: 11,
    type: 'visual-component',
    component: 'ArchMarco5CLIPMultimodalDiagram',
    title: 'Marco 5 — CLIP: Alinhamento Multimodal Visão-Texto e Aprendizado Zero-Shot',
    subtitle: 'Arquitetura dual-encoder, projeção em hiperesfera unitária S^511 e otimização contrastiva InfoNCE',
    category: 'Evolução Arquitetural',
    tag: 'Marco 5 / 6',
    notes: `Entramos no Marco 5, fundamentado na Aula 6: o CLIP (Contrastive Language-Image Pre-training) de Radford et al. (OpenAI 2021).

Situação-Problema do Mundo Real:
Treinar modelos de visão com perdas de classificação convencionais exige anotação manual exaustiva de classes discretas fechadas. O modelo é cego para qualquer conceito fora do seu vocabulário pré-fixado de 1.000 classes e não consegue se comunicar com a linguagem humana natural.

Solução de Engenharia e Intuição:
A OpenAI descartou classificadores fechados e adotou uma arquitetura Dual-Encoder pré-treinada em 400 milhões de pares imagem-texto da internet (WIT). O Image Encoder (ViT ou ResNet) processa a imagem I_i, e o Text Encoder (Transformer) processa a legenda T_j. Ambos os vetores latentes são mapeados por projeções lineares W_I e W_T para um espaço compartilhado de dimensão d = 512.
O ponto crucial de engenharia é a Normalização L2 estrita: ambos os vetores são normalizados para norma unitária, residindo na superfície da hiper-esfera S^511. Isso faz com que o produto interno v^T * u meça com precisão a Similaridade de Cosseno entre os conceitos visuais e textuais!

Teoria e Formalismo Rigoroso:
Em um mini-batch de N pares, calcula-se a matriz de similaridade de cosseno escalonada S_{i,j} = (I_i_norm · T_j_norm) / tau. A otimização utiliza a perda InfoNCE simétrica: a média entre a Cross-Entropy nas linhas (Image-to-Text) e nas colunas (Text-to-Image), onde apenas a diagonal principal representa pares positivos verdadeiros.

O Elo de Ligação com o Próximo Marco:
O CLIP resolveu com maestria o alinhamento semântico discriminativo e a busca multimodal zero-shot; mas e se quisermos inverter o vetor e gerar imagens inteiramente novas e hiper-realistas a partir de descrições textuais? A grande solução de engenharia reuniu convoluções residuais, Transformers e condicionamento multimodal na moderna U-Net de Difusão Latente!`
  },
  {
    id: 12,
    type: 'visual-component',
    component: 'ArchMarco6GenerativeDiffusionDiagram',
    title: 'Marco 6 — Modelos Generativos & Difusão: A Grande Convergência Arquitetural do Curso',
    subtitle: 'A U-Net de difusão latente integrando convoluções residuais, cross-attention e atenção temporal',
    category: 'Evolução Arquitetural',
    tag: 'Marco 6 / 6',
    notes: `Concluímos a evolução arquitetural com o Marco 6, conectando as Aulas 5, 6 e 7: os Modelos Generativos e a Difusão Latente (Rombach et al., CVPR 2022).

Situação-Problema do Mundo Real:
O paradigma clássico de síntese visual baseado em GANs (Goodfellow et al., 2014) dependia de um jogo minimax instável entre Gerador e Discriminador, sofrendo frequentemente com colapso de modo (mode collapse) e gradientes instáveis. Além disso, sintetizar imagens em alta resolução diretamente no espaço de pixels era computacionalmente proibitivo.

Solução de Engenharia e Intuição:
A Difusão Latente (LDM / Stable Diffusion) resolveu esse impasse comprimindo a imagem para um espaço latente perceptual através de um VAE (redução de 8x na resolução, economizando 64x de computação). O processo generativo consiste em aprender a predizer e remover ruído gaussiano progressivo através de um objetivo convexo e estável.
E aqui está a revelação máxima da nossa disciplina: a U-Net de Difusão não é um módulo isolado, mas a CONVERGÊNCIA COMPLETA de todas as arquiteturas que estudamos ao longo do curso:
1. Convoluções Residuais da ResNet (Aula 1) formando os blocos estruturais do encoder e decoder;
2. Conexões Densas de Atalho (Skip Connections) da U-Net (Aula 1) preservando fidelidade morfológica;
3. Mecanismos de Auto-Atenção Multi-Head espaciais (Aulas 2, 3 e 4) conectando características latentes;
4. Mecanismos de Cross-Attention (Aulas 2 e 6) injetando embeddings de texto gerados pelo Text Encoder do CLIP como chaves e valores na U-Net;
5. Mecanismos de Atenção Temporal 1D (Aula 7) permitindo sintetizar vídeos coerentes quadro a quadro;
6. E tudo isso avaliado com rigor quantitativo através da Métrica FID que estudamos nesta aula!

Essa trajetória comprova a beleza e a sinergia da Visão Computacional moderna: cada componente arquitetural aprendido no curso é uma peça fundamental do ecossistema de inteligência artificial contemporâneo.`
  },

  // =========================================================================
  // BLOCO 3: INTERPRETABILIDADE & MULTIMODALIDADE NA PRÁTICA (Slides 13 a 16)
  // =========================================================================
  {
    id: 13,
    type: 'visual-component',
    component: 'AttentionMapExtractionDiagram',
    title: 'Interpretabilidade em ViT: Extração e Visualização de Mapas de Atenção',
    subtitle: 'Como dissecar a matriz de atenção QK^T para inspecionar onde o classificador foca seu raciocínio',
    category: 'Interpretabilidade & Auditoria',
    tag: 'Extração de Heatmap',
    notes: `Uma das vantagens mais extraordinárias dos Vision Transformers sobre as CNNs clássicas é a sua interpretabilidade geométrica nativa. Em CNNs, métodos de saliência como Grad-CAM exigem o cálculo de gradientes a posteriori em relação aos mapas de ativação da última camada convolucional. No ViT, os próprios pesos de atenção calculados no forward pass já nos dizem exatamente onde o modelo está prestando atenção!

Vamos dissecar o procedimento exato de engenharia em 4 passos:
Passo 1: Extração da Matriz de Atenção da última camada.
Registramos um hook na camada de self-attention final do modelo. Para cada cabeça h, a matriz de atenção normalizada é dada por:
A = softmax(Q * K^T / sqrt(d_k)), resultando em um tensor de formato [B, h, 197, 197].

Passo 2: Isolamento da Linha do Token [CLS].
Como a classificação final é tomada com base exclusiva no estado latente do [CLS], a pergunta correta de interpretabilidade é: 'Quanto o token [CLS] atendeu a cada patch da imagem?'.
Isso corresponde exatamente à linha 0 da matriz de atenção! Extraímos A[:, h, 0, 1:197], descartando o índice 0 de auto-atenção do [CLS] consigo mesmo. Temos agora um vetor unidimensional de 196 números positivos que somam aproximadamente 1.0.

Passo 3: Reshape Espacial e Upsampling Contínuo.
Como a imagem original tinha uma grade de 14x14 patches (14 * 14 = 196), remodelamos esse vetor [196] de volta para uma matriz bidimensional [14, 14] usando .view(14, 14). Em seguida, aplicamos uma interpolação bilinear ou bicúbica para reescalar essa matriz de 14x14 pixels para o tamanho original da imagem: 224x224 pixels!

Passo 4: Sobreposição com Colormap e Diagnóstico de Atalhos (Shortcut Learning).
Aplicamos um mapa de cores (como Jet, Viridis ou Inferno) e sobrepomos o heatmap semitransparente sobre a imagem de entrada.
Agora realizamos a auditoria técnica:
Se o mapa de atenção estiver concentrado sobre o objeto de interesse, temos alta evidência de generalização real.
Porém, se a atenção estiver concentrada em cantos escuros, marcas d’água, números de série ou texturas do fundo, descobrimos uma falha gravíssima: o modelo aprendeu um atalho espúrio (shortcut learning)! O modelo está prevendo a classe baseando-se em artefatos de aquisição, e não no objeto.`
  },
  {
    id: 14,
    type: 'interactive',
    component: 'ViTAttentionInspectorLab',
    title: 'Laboratório Interativo: Inspetor de Mapas de Atenção do Vision Transformer',
    subtitle: 'Explore a distribuição de atenção por cabeça e camada para auditar a interpretabilidade do modelo',
    category: 'Laboratório Interativo',
    tag: 'Auditoria de Atenção ViT',
    notes: `Coloquem as mãos na massa com este inspetor interativo de atenção do ViT-B/16.

Vocês têm à disposição três amostras visuais no canto superior direito: um objeto saliente em primeiro plano, uma cena com múltiplos objetos e ruído de fundo, e um exemplo clássico com artefato de atalho (marca d’água 'TAG #1' no canto inferior direito).

Experimentem alterar a profundidade da camada nos botões à esquerda:
- Na Camada 1 (inferior), vejam como a atenção é quase difusa e foca em bordas locais e transições de pixel de alta frequência. É a fase 'sintática' da rede neural.
- Na Camada 6 (intermediária), o modelo começa a agrupar partes de objetos distantes.
- Na Camada 12 (profunda), a atenção converge estritamente para o conceito semântico associado à classe!

Agora alternem entre as cabeças de atenção individuais:
Observem que cabeças diferentes se especializam em tarefas diferentes! Uma cabeça pode focar no contorno exterior, outra no centro geométrico, e uma terceira cabeça (como a Head 3) foca deliberadamente no contexto de fundo para entender o ambiente da cena. Clicando em 'Média', vocês obtêm o Attention Rollout consolidado de todas as cabeças combinadas.

Atenção especial ao selecionar a amostra 'Caso com Atalho':
Vejam como na Camada 12 a atenção se desloca com altíssima intensidade para a etiqueta do canto inferior direito! Esse é exatamente o tipo de diagnóstico que vocês devem saber conduzir: provar se a rede neural tomou uma decisão válida ou se foi enganada por um artefato de captura.`
  },
  {
    id: 15,
    type: 'visual-component',
    component: 'SemanticRetrievalThresholdDiagram',
    title: 'Busca Semântica com CLIP: Calibração de Thresholds e Prompt Engineering',
    subtitle: 'Como estruturar rankings de similaridade de cosseno e calibrar pontos de corte em espaços de alta dimensão',
    category: 'Busca Semântica & Decisão',
    tag: 'Calibração de Thresholds',
    notes: `Quando utilizamos o CLIP pré-treinado para busca semântica (Text-to-Image Retrieval) ou classificação zero-shot, nós não treinamos nenhum parâmetro; operamos puramente no espaço latente. Mas para transformar scores de cosseno contínuos em decisões de engenharia, precisamos dominar três conceitos fundamentais:

Conceito 1: A Geometria dos Scores em Alta Dimensão.
Em um espaço de 512 dimensões, o fenômeno da concentração de medida faz com que pares arbitrários de imagens e textos não-correlacionados não resultem em similaridade zero ou negativa, mas concentrem-se em uma faixa estreita entre 0.12 e 0.22!
Muitos profissionais cometem o erro grave de achar que similaridade de cosseno é uma probabilidade entre 0% e 100%. Uma similaridade de 0.28 em CLIP não significa '28% de certeza'; significa uma altíssima correlação semântica angular em R^512! Scores acima de 0.25 já indicam alinhamento conceitual forte.

Conceito 2: Calibração e Justificativa de Thresholds (Limiares de Corte).
Se queremos responder 'o conceito X está presente na imagem Y?', precisamos definir um limiar tau.
Se escolhermos um tau excessivamente alto (ex: 0.32), teremos alta Precisão (quase nenhum falso alarme), mas sofreremos com perda de Recall (muitos Falsos Negativos).
Se escolhermos um tau baixo demais (ex: 0.20), capturaremos tudo (alto Recall), mas seremos inundados por Falsos Positivos causados pelo ruído de fundo da hiper-esfera.
A justificativa técnica de um threshold deve ser empírica: calcula-se a distribuição de similaridades de consultas de controle negativas para encontrar o percentil de corte ideal.

Conceito 3: Engenharia de Prompts e Níveis de Abstração.
O Text Encoder do CLIP é extremamente sensível à estrutura das frases. Consultas concretas e literais ('a photo of a red bicycle') ativam padrões geométricos precisos. Consultas abstratas ou de estilo de vida ('healthy lifestyle') dependem de correlações semânticas mais sutis aprendidas no pré-treino. O uso de templates padronizados, como 'a clear photo of a [objeto]', elimina ruído léxico e ancora o vetor textual com maior estabilidade.`
  },
  {
    id: 16,
    type: 'interactive',
    component: 'CLIPSearchThresholdLab',
    title: 'Laboratório Interativo: Busca Semântica e Calibração de Thresholds com CLIP',
    subtitle: 'Teste consultas textuais variando em abstração, calibre o limiar de similaridade e avalie a recuperação semântica',
    category: 'Laboratório Interativo',
    tag: 'Retrieval & Métricas CLIP',
    notes: `Chegamos ao laboratório prático de recuperação semântica com CLIP.

Aqui simulamos um corpus visual avaliado contra três consultas de diferentes níveis de abstração:
1. Uma consulta concreta e literal: 'a photo of a modern sports car on a highway'.
2. Uma consulta técnica de domínio científico: 'a microscopic view of circular cell structures'.
3. Uma consulta puramente abstrata e subjetiva: 'a feeling of freedom, open sky and solitude'.

Observem o grid central: para a consulta selecionada, o modelo calculou o produto escalar v_til^T * u_til com os embeddings das imagens do banco e ordenou as amostras pelo score de similaridade decrescente.

Agora experimentem arrastar o slider 'Limiar de Corte (Threshold tau)' na coluna esquerda, variando entre 0.15 e 0.33:
- Quando vocês elevam o threshold para 0.30, vejam que apenas as imagens com match incontestável permanecem com status 'RECUPERADO' (borda verde). Na coluna direita, a Precisão vai a 100%, mas o Recall cai drasticamente e os Falsos Negativos disparam!
- Quando vocês reduzem o threshold para 0.18, imagens secundárias (como a bolha de sabão ou a motocicleta) são aceitas pelo modelo. O Recall sobe para 100%, mas a Precisão despenca por causa dos Falsos Positivos.

Reparem também como na consulta abstrata ('a feeling of freedom') o modelo associa conceitos conceituais como topo de montanhas, pássaros voando e praias desertas, enquanto penaliza pesadamente o engarrafamento urbano. Essa é a essência do raciocínio multimodal que vocês devem documentar e analisar nos seus pipelines de busca.`
  },

  // =========================================================================
  // BLOCO 4: GOVERNANÇA, DESBALANCEAMENTO E VALIDAÇÃO CIENTÍFICA (Slides 17 a 23)
  // =========================================================================
  {
    id: 17,
    type: 'visual-component',
    component: 'FeatureExtractionVsFineTuningDiagram',
    title: 'Transfer Learning em CNNs: Feature Extraction vs Fine-Tuning de Grafo Completo',
    subtitle: 'Diferenciação estrutural de grafos computacionais, fluxo de gradientes e gerenciamento de capacidade',
    category: 'Revisão Teórica III',
    tag: 'Transfer Learning em CNNs',
    notes: `Entramos no quarto bloco, focando nas decisões de engenharia fundamentais para treinar e auditar modelos em problemas reais.

Começamos com os dois grandes paradigmas de Transfer Learning em CNNs: Feature Extraction versus Fine-Tuning.

Na coluna esquerda, temos o paradigma de Feature Extraction:
Nós carregamos um backbone de alta performance (como uma ResNet-50 ou EfficientNet-B0) pré-treinado no ImageNet. Imediatamente congelamos todos os pesos das camadas convolucionais iterando por model.parameters() e marcando requires_grad = False!
Em seguida, substituímos a camada densa final (o classification head original de 1.000 classes) por uma nova camada linear compatível com o número de classes C do nosso dataset: model.fc = nn.Linear(2048, C).
Ao rodar o treinamento, os gradientes retropropagam exclusivamente sobre os parâmetros da nova camada final.
Quais são as imensas vantagens disso quando temos datasets pequenos (ex: menos de 2.000 amostras)?
Primeiro: é matematicamente impossível ocorrer Esquecimento Catastrófico (Catastrophic Forgetting), pois os filtros extratores de bordas e texturas estão fisicamente protegidos contra alterações.
Segundo: podemos extrair e salvar os vetores de features na memória uma única vez, treinando o classificador linear em segundos com custo computacional mínimo de GPU.

Na coluna direita, temos o paradigma de Fine-Tuning:
Aqui descongelamos blocos convolucionais profundos (como a Layer 4 da ResNet) ou toda a rede, permitindo que os pesos convolucionais se adaptem aos dados do novo domínio.
Mas atenção à regra de ouro de estabilidade:
Se vocês aplicarem uma taxa de aprendizado alta padrão (ex: lr = 1e-3) em um backbone descongelado, os gradientes iniciais ruidosos do classificador novo destruirão completamente a representação pré-treinada! No fine-tuning, é obrigatório utilizar Taxas de Aprendizado Diferenciais: uma taxa ultra-baixa para as convoluções (1e-5 a 1e-6) e uma taxa padrão para a cabeça linear (1e-3).`
  },
  {
    id: 18,
    type: 'visual-component',
    component: 'AugmentationTaxonomyRiskDiagram',
    title: 'Estratégias de Data Augmentation: Racional Teórico vs Riscos de Corrupção Semântica',
    subtitle: 'A fundamentação teórica de por que transformações cegas podem destruir o aprendizado de representações',
    category: 'Análise Crítica de Augmentation',
    tag: 'Preservação de Rótulo',
    notes: `Data Augmentation é uma das ferramentas mais poderosas para regularizar redes neurais e mitigar overfitting. No entanto, em engenharia avançada, nunca devemos aplicar técnicas de aumento às cegas sem justificar o impacto no domínio do problema!

Observem neste slide a taxonomia rigorosa dividida em três grupos e seus respectivos riscos de corrupção semântica:

Grupo 1: Aumentações Geométricas (RandomHorizontalFlip, RandomRotation, RandomResizedCrop).
O racional teórico é ensinar ao modelo invariância a transformações afins, permitindo reconhecer o objeto independentemente de enquadramento, ângulo de câmera ou orientação.
Qual é o risco de corrupção? Aplicar flips ou rotações em domínios onde a orientação espacial ou a assimetria lateral define o rótulo da classe! Por exemplo: em reconhecimento de dígitos, girar um 6 o transforma em um 9; em imagens médicas com assimetria anatômica (como radiografias de tórax onde o coração fica à esquerda e a anatomia pulmonar tem lobos assimétricos), um flip horizontal gera uma condição patológica artificial (situs inversus) e ensina o modelo de forma incorreta.

Grupo 2: Aumentações Fotométricas e de Cor (ColorJitter, RandomGrayscale).
O racional teórico é desacoplar o formato do objeto das variações de iluminação e ruído do sensor, forçando a rede a aprender contornos morfológicos.
Qual é o risco? Destrutivo quando a cor é o atributo discriminante primário! Se vocês aplicarem ColorJitter severo ou conversão para tons de cinza em imagens de semáforos, em fitas reagentes bioquímicas ou em patologias onde a coloração histológica identifica o tecido, vocês apagam a informação que diferencia as classes.

Grupo 3: Normalização Estatística (Média e Desvio Padrão do ImageNet).
Todo modelo pré-treinado no TorchVision exige a normalização com mean=[0.485, 0.456, 0.406] e std=[0.229, 0.224, 0.225]. Omitir essa etapa faz as ativações das primeiras camadas operarem fora da faixa dinâmica para a qual os pesos foram otimizados, degradando a velocidade de convergência e a acurácia final.`
  },
  {
    id: 19,
    type: 'visual-component',
    component: 'MulticlassAccuracyDecompositionDiagram',
    title: 'Avaliação Multiclasse: A Desagregação da Acurácia Global e a Acurácia por Classe',
    subtitle: 'Decomposição matemática de métricas e o mascaramento de classes minoritárias',
    category: 'Métricas & Diagnóstico',
    tag: 'Acurácia por Classe & B-Acc',
    notes: `Vamos analisar a matemática por trás da avaliação de modelos multiclasse e compreender por que a métrica de Acurácia Global isolada é frequentemente enganosa.

Acompanhem no slide a decomposição formal:
A Acurácia Global é a soma de todos os Verdadeiros Positivos de todas as classes dividida pelo número total de amostras N.
A Acurácia da Classe c (Acc_c) é a taxa de acerto restrita estritamente aos exemplos daquela classe: TP_c / N_c.
A Balanced Accuracy (Acurácia Balanceada) é a média aritmética simples (não ponderada) das acurácias de cada classe individual: (1/C) * soma(Acc_c).

Agora analisem o exemplo real apresentado na tabela do slide:
Temos um dataset com 4 classes e 1.650 amostras. A Classe 1 é abundante, com 1.200 amostras, e o modelo acerta 98% dela. A Classe 2 tem 300 amostras e acurácia de 80%.
Mas vejam o que acontece com as classes raras: a Classe 3 tem apenas 100 amostras e o modelo acerta ridículos 30%! A Classe 4 tem 50 amostras e o modelo acerta apenas 20%!

Se vocês calcularem apenas a Acurácia Global ponderada pelo volume, o resultado é impressionantes 88.2%! Um engenheiro desatento reportaria: 'Meu classificador tem quase 90% de acurácia global, o projeto é um sucesso!'.
Isso é uma mentira estatística! As classes 3 e 4 estão totalmente colapsadas.
Quando calculamos a Balanced Accuracy real, o resultado cai para 57.0%!
É por isso que em qualquer relatório técnico rigoroso é mandatório reportar:
1. A acurácia global acompanhada da acurácia desagregada por classe.
2. As curvas de loss e acurácia de treino e validação por época para diagnosticar overfitting.
3. A Matriz de Confusão completa, que revela exatamente para quais classes os erros estão migrando.`
  },
  {
    id: 20,
    type: 'visual-component',
    component: 'ImbalanceRecallParadoxDiagram',
    title: 'O Paradoxo da Acurácia sob Desbalanceamento Severo e a Primazia do Recall',
    subtitle: 'Por que predições triviais atingem 95% de acurácia global e causam falhas catastróficas em produção',
    category: 'Revisão Teórica IV',
    tag: 'Paradoxo da Acurácia & Recall',
    notes: `O problema anterior torna-se ainda mais crítico quando entramos no cenário de Desbalanceamento Severo — o clássico problema da agulha no palheiro, universal em visão computacional diagnóstica, detecção de falhas industriais e inspeção de segurança.

Acompanhem o exemplo didático da coluna esquerda:
Imaginem uma base de teste com 1.000 imagens: 900 são imagens normais/saudáveis (90%) e apenas 100 representam uma anomalia rara ou patologia grave (10%).
Se um programador treinar um classificador ingênuo sem tratar o desbalanceamento, a rede rapidamente descobre o atalho estatístico preguiçoso: prever SEMPRE a classe normal!
Qual é a Acurácia Global desse classificador que nunca detecta nada?
90.0%!
Para um leigo, 90% de acurácia parece excelente. Mas qual é a Sensibilidade ou Recall para a classe crítica?
Zero por cento! O modelo falhou em 100% dos casos reais. Todos os 100 casos raros tornaram-se Falsos Negativos (FN).

Em sistemas de triagem e aplicações de alto risco, um Falso Positivo causa apenas um reexame secundário, mas um Falso Negativo libera um paciente doente ou uma peça com rachadura estrutural, com consequências catastróficas.

Por isso, guardem este princípio de governança técnica:
Em bases desbalanceadas, a Acurácia Global é uma métrica nula e proibida como critério de sucesso!
As métricas mandatórias são:
1. Recall / Sensibilidade da classe minoritária: TP / (TP + FN), que mede a taxa de captura de eventos raros.
2. Especificidade: TN / (TN + FP), medindo a proteção contra alarmes falsos.
3. F1-Score e Macro-F1: a média harmônica entre Precisão e Recall. Se o Recall colapsar para zero, o F1-Score é forçado matematicamente a zero!`
  },
  {
    id: 21,
    type: 'visual-component',
    component: 'GenerativeMitigationProtocolDiagram',
    title: 'Estratégias Generativas (cGAN & CycleGAN) e o Protocolo Científico de Avaliação Downstream',
    subtitle: 'Protocolo rigoroso de ampliação de classes raras e validação estrita em conjuntos de teste reais',
    category: 'Mitigação Generativa',
    tag: 'Validação Downstream Blindada',
    notes: `Como podemos resolver tecnicamente a escassez extrema de imagens da classe rara quando técnicas clássicas de augmentation não são suficientes?
A resposta moderna reside nas Redes Generativas Adversariais!

Temos duas abordagens de ponta:
Abordagem A: GAN Condicional (cGAN).
Treinamos uma cGAN onde injetamos o rótulo de classe y no gerador G(z, y) e no discriminador D(x, y). Uma vez treinada, usamos a rede para realizar oversampling generativo no espaço contínuo de pixels, gerando centenas de imagens sintéticas inéditas exclusivamente da classe rara para equilibrar o conjunto de dados.

Abordagem B: CycleGAN (Tradução Não-Pareada).
Se tivermos um volume abundante de amostras de uma classe comum X (ex: tecidos normais) e pouquíssimas amostras da classe rara Y (ex: patologias), treinamos uma CycleGAN com dois geradores (G: X->Y e F: Y->X) e a perda de consistência de ciclo L_cyc = ||F(G(x)) - x||_1. A rede aprende a traduzir imagens abundantes para a aparência e fenótipo da classe rara, preservando toda a morfologia de conteúdo subjacente.

Agora atenção máxima ao Protocolo Científico Mandatório de Validação:
Como provar experimentalmente que a sua abordagem generativa resolveu o problema e não gerou apenas imagens bonitas?
Vocês devem seguir três regras invioláveis de governança:
Regra 1: As imagens geradas por cGAN ou CycleGAN entram EXCLUSIVAMENTE no conjunto de treinamento!
Regra 2: O conjunto de teste DEVE SER 100% REAL, não contaminado e intocado! Avaliar um classificador downstream em imagens sintéticas é uma aberração metodológica gravíssima que invalida qualquer projeto ou publicação científica.
Regra 3: A métrica final de sucesso é o Ganho no Recall Downstream (Delta Recall = Recall_com_GAN - Recall_sem_GAN). Vocês treinam o classificador supervisionado apenas com os dados reais desbalanceados e medem o Recall na classe minoritária do teste. Em seguida, treinam a mesma arquitetura adicionando as imagens geradas por GAN no treino e avaliam no MESMO conjunto de teste real. O salto no Recall comprova cientificamente o valor da sua engenharia!`
  },
  {
    id: 22,
    type: 'visual-component',
    component: 'ValidationPitfallsAndDomainShiftDiagram',
    title: 'Armadilhas Metodológicas em Visão: Divisão Estratificada, Vazamento por Grupos e Domain Shift',
    subtitle: 'Os três erros de protocolo mais comuns que invalidam sistemas em ambiente de produção',
    category: 'Metodologia & Governança',
    tag: 'Auditoria de Falhas de Produção',
    notes: `Para encerrar nossa revisão teórica, vamos auditar os três maiores erros metodológicos que sistematicamente levam projetos de visão computacional ao fracasso quando saem do ambiente acadêmico e vão para a produção:

Erro 1: Divisão Aleatória sem Estratificação (Stratified Split).
Em conjuntos de dados desbalanceados, rodar um train_test_split aleatório ingênuo pode fazer com que quase todas as amostras da classe rara fiquem no treino e apenas uma ou duas caiam no teste (ou vice-versa). A divisão estratificada preserva rigorosamente a mesma proporção percentual de cada classe em treino, validação e teste.

Erro 2: Vazamento de Dados por Grupo (Group / Cluster Data Leakage).
Este é o erro mais imperdoável e frequente na indústria: quando temos dados correlacionados — por exemplo, múltiplos frames de vídeo extraídos de uma mesma câmera urbana, múltiplas imagens tiradas do mesmo paciente ou múltiplos exames do mesmo equipamento.
Se vocês aplicarem uma divisão aleatória por amostra, frames do segundo 1 estarão no treino e frames do segundo 2 estarão no teste! A rede neural decorará a textura do asfalto, a iluminação do dia ou os artefatos de compressão daquela câmera específica, atingindo 98% de acurácia de validação.
Ao implantar em produção em uma câmera nova, a acurácia colapsa para 40%!
A solução mandatória de engenharia é o GroupKFold: particionar estritamente por ID de Câmera, ID de Paciente ou ID de Sessão. Os dados de teste devem provir de fontes ou dispositivos independentes que a rede jamais viu no treino!

Erro 3: Mudança de Distribuição e Covariate Shift (Domain Shift).
Modelos treinados sob condições ideais (dias ensolarados, iluminação de laboratório, ângulos de câmera fixos) falham sistematicamente quando expostos a variações ambientais de produção (chuva, noite, reflexos, novos ângulos ou sensores com ruído).
Em qualquer relatório de auditoria técnica de visão computacional, é fundamental planejar testes de estresse em conjuntos fora do domínio (Out-of-Distribution - OOD) e documentar planos de remediação baseados em data augmentation focado, calibração de câmeras e adaptação de domínio contínua.`
  },
  {
    id: 23,
    type: 'interactive',
    component: 'FinalCourseQuizLab',
    title: 'Laboratório Interativo: Quiz de Fixação da Disciplina',
    subtitle: 'Avalie seus conhecimentos consolidados em avaliação generativa, transformers, multimodalidade e governança',
    category: 'Laboratório Interativo',
    tag: 'Quiz de Fixação Final',
    notes: `Chegamos ao fechamento da nossa aula com o Quiz de Fixação da Disciplina.

Preparamos cinco questões desafiadoras de nível de pós-graduação, conectando todos os eixos teóricos que revisamos hoje:
1. Diagnóstico do FID decompondo termos de média e covariância.
2. Mecânica exata de extração de attention maps a partir do token [CLS] no ViT.
3. Justificativa matemática da normalização L2 e produto escalar na hiper-esfera do CLIP.
4. Riscos semânticos de Data Augmentation em Transfer Learning.
5. Governança contra vazamento de dados por amostragem dependente e primazia do Recall em desbalanceamento severo.

Naveguem pelas cinco questões, selecionem suas respostas e analisem os feedbacks detalhados. Esse exercício sintetiza exatamente a profundidade de julgamento crítico e a capacidade de justificativa técnica que esperamos de vocês como engenheiros especialistas em visão computacional.

Parabéns a todos pela dedicação ao longo de todo o curso, muito sucesso no desenvolvimento dos seus projetos da disciplina e até as nossas próximas jornadas em Inteligência Artificial na Faculdade Infnet!`
  }
];
