/**
 * slidesData.js - Matriz central de dados da Aula 07: Generative Adversarial Networks (GANs)
 * Disciplina: Visão Computacional com CNNs e Transformers - Faculdade Infnet
 */

export const slides = [
  // =========================================================================
  // BLOCO 1: FUNDAMENTAÇÃO DAS GANS E ESTRUTURA MACRO (Slides 1 a 5)
  // =========================================================================
  {
    id: 1,
    type: 'title',
    title: 'GANs: Da DCGAN à Tradução com CycleGAN',
    subtitle: 'Arquiteturas Estruturais, Síntese Condicional e Tradução Biomédica em Visão Computacional',
    category: 'Módulo 7 • Modelagem Generativa & Visão Computacional Aplicada',
    tag: 'Aula 07',
    badges: [
      'Modelagem Generativa Macro',
      'DCGAN & Tensores PyTorch',
      'Heurística Não-Saturante',
      'GAN Condicional (cGAN)',
      'Coloração Virtual (Project 9B)',
      'CycleGAN Não-Pareada',
      'Holo2Bright (Project 9C)',
      'Avaliação Downstream & Recall'
    ],
    notes: `Olá a todos e sejam muito bem-vindos à nossa Aula 7 da disciplina de Visão Computacional com CNNs e Transformers da Faculdade Infnet!

Nas seis primeiras aulas do curso, exploramos exaustivamente modelos discriminativos: construímos e refinamos redes neurais convolucionais clássicas e modernas, compreendemos o poder dos mecanismos de atenção com Vision Transformers, realizamos transfer learning em modelos pré-treinados, estudamos variantes auto-supervisionadas como DeiT e DINO e exploramos a conexão multimodal de visão e linguagem com o CLIP.

Hoje, entramos em uma fronteira transformadora da inteligência artificial: a Modelagem Generativa. Como uma rede neural pode aprender a criar imagens realistas inéditas a partir do zero? Mais do que isso: como podemos usar redes generativas não apenas para fins artísticos, mas como uma ferramenta prática de engenharia para resolver o maior pesadelo de sistemas de visão computacional aplicados à saúde e biologia: a escassez severa de dados em classes e fenótipos raros?

Ao longo desta aula, adotaremos uma abordagem estrutural e macro. Vamos entender o jogo adversarial de soma zero entre Gerador e Discriminador, a anatomia convolucional da DCGAN, as soluções estruturais para controle de classes com GANs Condicionais (cGANs) aplicadas à Coloração Virtual de Tecidos (Project 9B: Human Motor Neurons), e a genialidade da CycleGAN para traduzir imagens entre domínios ópticos sem a necessidade de pares alinhados (Project 9C: Holo2Bright). Por fim, conectaremos essa teoria diretamente com a avaliação downstream, demonstrando como a geração sintética é capaz de alavancar a métrica que realmente importa no diagnóstico: o Recall da classe minoritária. Tenham todos uma excelente aula!`
  },
  {
    id: 2,
    type: 'visual-component',
    component: 'AdversarialGameMinimaxDiagram',
    title: 'A Estrutura Macro do Jogo Adversarial: Gerador vs Discriminador',
    subtitle: 'O falsificador de cédulas contra o perito policial: O Discriminador como uma função de perda aprendível',
    category: 'Solução de Engenharia • Teoria dos Jogos',
    tag: 'Jogo Minimax de Dois Jogadores',
    notes: `Vamos compreender a mecânica macro que faz as GANs funcionarem: o jogo adversarial de soma zero entre dois competidores neurais.

A clássica analogia de Ian Goodfellow é extremamente didática: imaginem o Gerador G como um falsificador de dinheiro que nunca viu uma cédula real na vida, mas possui tintas e papéis em branco (representados pelo vetor de ruído z). Ele gera uma nota sintética e a coloca em circulação.

Do outro lado temos o Discriminador D, que atua como o perito da polícia. Ele recebe uma mistura contínua de cédulas: algumas são notas reais extraídas do dataset genuíno, e outras são as cédulas falsas produzidas por G. A função de D é exclusivamente classificar cada imagem recebida com uma nota de 0 a 1, indicando a probabilidade de ela ser genuína.

Observem o fluxo dinâmico no diagrama: o Discriminador é treinado para acertar as reais (D(x) ≈ 1) e rejeitar as falsas (D(G(z)) ≈ 0). Já o Gerador é treinado para fazer o discriminador errar, ajustando seus pesos para que D(G(z)) se aproxime de 1.

O insight técnico fundamental aqui é: o Discriminador funciona como uma função de perda dinâmica e aprendível! Em vez de nós, engenheiros, termos que programar manualmente regras frágeis sobre como deve ser a borda de uma membrana celular ou a textura de um tecido, o próprio discriminador descobre essas falhas e passa gradientes de correção através de suas camadas congeladas diretamente para os pesos do gerador. No equilíbrio de Nash ideal, o gerador sintetiza imagens perfeitamente realistas e o discriminador fica em dúvida total, prevendo D = 0.5.`
  },
  {
    id: 3,
    type: 'visual-component',
    component: 'GeneratorDiscriminatorArchitectureDiagram',
    title: 'A Anatomia Estrutural da DCGAN e Rastreamento de Tensores',
    subtitle: 'Radford et al. (2015): Convoluções com stride, convoluções transpostas e o fluxo [B, z] ➔ [B, C, H, W]',
    category: 'Arquitetura Convolucional Profunda',
    tag: 'DCGAN & Tensores PyTorch',
    notes: `As primeiras GANs utilizavam camadas densas totalmente conectadas (MLPs) e mal conseguiam sintetizar dígitos de 28x28 do MNIST. A transformação das GANs em ferramentas modernas para visão computacional ocorreu com a DCGAN (Deep Convolutional GAN), apresentada por Alec Radford e colaboradores no ICLR 2016.

Vamos acompanhar o rastreamento macro dos tensores em PyTorch no slide. Observem a torre superior: o Gerador G. Ele recebe na entrada um mini-batch de vetores latentes z com formato [B, 100, 1, 1]. Para expandir esse ruído para uma imagem bidimensional de 64x64 pixels, a DCGAN utiliza convoluções transpostas fracionadas (ConvTranspose2d).

A cada camada de convolução transposta com stride=2 e padding=1, a resolução espacial dobra e o número de canais cai pela metade: começamos em 4x4 com 512 canais, expandimos para 8x8x256, 16x16x128, 32x32x64 e, finalmente, 64x64x3 (ou 1 canal no caso de imagens monocromáticas de microscopia). Na camada final, aplicamos a ativação Tanh, garantindo que os valores dos pixels fiquem estritamente normalizados no intervalo de -1 a +1.

Agora olhem para a torre inferior: o Discriminador D. Ele recebe o tensor de imagem [B, C, 64, 64] e realiza a compressão hierárquica usando convoluções padrão com stride=2. A DCGAN aboliu completamente o Max-Pooling, porque descartar pixels reduz o fluxo de gradientes finos; a própria rede aprende o downsampling ideal. Os canais dobram enquanto o tamanho espacial cai pela metade, até que uma convolução final reduz para um escalar unitário [B, 1], passado por uma Sigmoid para indicar a probabilidade de realismo.

As regras de ouro de engenharia da DCGAN que devem guiar o código de vocês são: usar convoluções com stride em vez de pooling, usar Batch Normalization nas camadas intermediárias, adotar ReLU no gerador com Tanh na saída, e usar estritamente LeakyReLU com inclinação de 0.2 em todas as camadas do discriminador.`
  },
  {
    id: 4,
    type: 'visual-component',
    component: 'MinimaxLossAndGradientsDiagram',
    title: 'Dinâmica de Treinamento Minimax e a Heurística Não-Saturante',
    subtitle: 'Por que o gerador maximiza log D em vez de minimizar log(1 - D) para evitar gradientes mortos',
    category: 'Dinâmica de Treinamento',
    tag: 'Perda Não-Saturante',
    notes: `Vamos agora entender uma correção prática que todo engenheiro de machine learning precisa aplicar ao implementar o loop de treino de uma GAN em PyTorch.

Na teoria pura do artigo original de 2014, a função de perda minimax prescrevia que o gerador deveria minimizar a quantidade log(1 - D(G(z))). No papel isso parece ótimo, mas no hardware da GPU essa fórmula sofre de uma falha letal: saturação precoce de gradientes.

No início do treinamento, o gerador não sabe nada e produz apenas borrões ruidosos. Já o discriminador aprende com enorme facilidade a distinguir esse ruído das fotos reais, atribuindo rapidamente pontuações D(G(z)) muito próximas de zero.

Olhem para o gráfico no painel direito: quando D se aproxima de 0, a curva da função log(1 - D) torna-se praticamente horizontal! A derivada com respeito às ativações é proporcional a D; se D ≈ 0, o gradiente recebido pelo gerador colapsa para zero! O gerador simplesmente para de aprender no instante exato em que ele mais precisa de sinal para sair do ruído inicial.

Para resolver essa armadilha, Ian Goodfellow propôs a Heurística Não-Saturante (Non-Saturating Loss): em vez de minimizar log(1 - D), treinamos o gerador para maximizar log D — ou seja, minimizar -log D(G(z)). Observem a curva azul contínua: ela possui a mesma direção de otimização, mas inverte a inclinação! Quando D ≈ 0, a derivada é gigantesca (proporcional a 1 - D ≈ 1.0), entregando um impulso potente de gradiente que puxa o gerador rapidamente para longe do regime de ruído. É essa formulação que codificamos em PyTorch usando Binary Cross-Entropy contra rótulos 1.0.`
  },
  {
    id: 5,
    type: 'interactive',
    component: 'GANMinimaxGameLab',
    title: 'Laboratório Interativo: Dinâmica do Jogo Minimax e Gradientes',
    subtitle: 'Simule em tempo real a curva do discriminador D(x), compare as funções de perda e analise o vetor de gradiente',
    category: 'Laboratório Interativo 1',
    tag: 'Simulador Minimax',
    notes: `Chegamos ao nosso primeiro laboratório interativo da aula! Convido todos a interagirem diretamente com os controles na tela.

Aqui modelamos um cenário contínuo unidimensional onde a distribuição real p_data é a curva verde centrada na origem, e a distribuição gerada p_g é a curva roxa que vocês podem transladar com o slider de separação.

Experimentem arrastar o slider de 'Separação p_data vs p_g' para 3.5 sigmas, simulando o início do treinamento quando o gerador ainda está muito distante dos dados reais:
Observem o que ocorre no painel direito! Sob a perda saturante log(1 - D), a barra de gradiente cai para míseros 1% ou 2% — a barra fica vermelha com o alerta de 'Gradiente Nulo'! Se usássemos a fórmula teórica pura, o gerador ficaria completamente estagnado. Em contrapartida, sob a perda não-saturante -log(D), a barra azul exibe mais de 98% de força de gradiente, fornecendo o torque necessário para puxar a distribuição roxa em direção à verde.

Agora, arrastem a separação para 0.0 ou cliquem no botão 'Equilíbrio (Nash)':
Vejam a convergência diante de vocês: as distribuições verde e roxa se sobrepõem perfeitamente, a linha do discriminador se estabiliza em D(x) = 0.5 para qualquer entrada, e o valor do jogo converge para o mínimo teórico de -1.386 (-log 4). Esse laboratório consolida a intuição de por que a engenharia de funções de perda é crucial no treinamento adversarial.`
  },

  // =========================================================================
  // BLOCO 2: DO COLAPSO DE MODOS À GERAÇÃO CONDICIONAL (CGAN) (Slides 6 a 8)
  // =========================================================================
  {
    id: 6,
    type: 'visual-component',
    component: 'ModeCollapseAnatomyDiagram',
    title: 'O Limite da GAN Incondicional: Amostragem Cega e Colapso de Modos',
    subtitle: 'Por que a GAN pura não escolhe a classe gerada e a armadilha de memorizar modos repetitivos',
    category: 'Patologia & Diagnóstico',
    tag: 'Mode Collapse',
    notes: `Mesmo quando o jogo minimax funciona, a GAN clássica incondicional que estudamos até aqui tem duas limitações severas para problemas do mundo real.

A primeira limitação é a amostragem incondicional cega: a rede recebe apenas um vetor de ruído latente aleatório z. Você não tem controle algum sobre o que a rede vai gerar! Se você treinar a DCGAN em um dataset biomédico contendo diferentes linhagens celulares, tecidos e biomarcadores, você simplesmente não consegue dizer: 'Gere para mim especificamente uma imagem do marcador neuronal GFP'. O gerador gera o que ele quiser aleatoriamente.

A segunda limitação crítica é a patologia de Colapso de Modos (Mode Collapse), ilustrada no slide. Em estatística, 'modos' são as regiões de alta densidade no espaço de dados — por exemplo, diferentes morfologias celulares, variações de densidade e padrões morfológicos.

No painel central, observamos o Colapso Total: o gerador descobre que se produzir com grande perfeição um tipo específico de célula, ele engana o discriminador com alta pontuação. Em vez de explorar toda a diversidade biológica do dataset, ele colapsa seu espaço latente e passa a gerar variações idênticas daquela mesma célula repetidas vezes!

E no painel direito, temos o 'Mode Hopping': o gerador pula de um modo para outro a cada época para fugir do discriminador, sem nunca cobrir a distribuição conjuntamente. Em aplicações práticas, o colapso de modos é fatal: se o gerador for usado para aumentar dados e gerar sempre a mesma morfologia sintética, ele não agregará diversidade alguma aos modelos subsequentes.`
  },
  {
    id: 7,
    type: 'visual-component',
    component: 'CGANArchitectureDiagram',
    title: 'Solução Estrutural 1: GANs Condicionais (cGAN) & Coloração Virtual',
    subtitle: 'Mirza & Osindero (2014) • Project 9B: Condicionamento de Marcadores em Neurônios Motores Humanos',
    category: 'Arquitetura Estrutural',
    tag: 'cGAN & Virtual Staining',
    notes: `Como podemos assumir o controle do volante generativo e forçar a rede a sintetizar exatamente a classe ou marcador biológico que precisamos para suprir a escassez de dados?

Apresento a vocês a primeira grande solução estrutural da literatura: a GAN Condicional (cGAN), concebida por Mehdi Mirza e Simon Osindero em 2014, e apresentada no livro-texto através do Project 9B: Virtually Staining a Biological Tissue (Human Motor Neurons Dataset).

Observem o painel esquerdo: no Gerador Condicional G(z, y), não injetamos apenas o vetor de ruído z. Injetamos simultaneamente o rótulo da condição desejada y — por exemplo, os biomarcadores fluorescentes y = 0 (DAPI - núcleos), y = 1 (NeuN - corpos celulares neuronais) ou y = 2 (GFP - axônios e dendritos motores)! Esse rótulo passa por uma camada de Embedding que o transforma em um vetor denso, que é concatenado diretamente ao ruído latente z. À medida que as camadas convolucionais transpostas expandem o tensor, as ativações são condicionadas pelo vetor de marcador, forçando o gerador a construir as características fenotípicas daquele marcador biológico específico.

Agora olhem para o painel direito: o Discriminador Condicional D(x, y) também recebe o rótulo y! Ele recebe a imagem x (que pode ser real ou gerada) acompanhada do mapa espacial correspondente à classe y.

Qual é a sacada de engenharia disso? O discriminador agora tem duas exigências obrigatórias:
Primeiro, ele avalia se a imagem x possui qualidade visual e textura biológica verossímil.
Segundo, ele verifica se a imagem corresponde rigorosamente ao marcador y fornecido! Se o gerador sintetizar um núcleo celular lindo e nítido, mas a condição solicitada for GFP (axônios motores), o discriminador D(x, y) atribuirá nota ZERO! Isso obriga o gerador a associar a morfologia correta a cada canal biológico. Com a cGAN, temos um sintetizador sob demanda para balancear conjuntos de dados.`
  },
  {
    id: 8,
    type: 'interactive',
    component: 'GANConditionalLab',
    title: 'Laboratório Interativo: Síntese Condicional & Coloração Virtual (Project 9B)',
    subtitle: 'Alterne os biomarcadores (DAPI vs NeuN vs GFP), ajuste a força do condicionamento e analise a telemetria de D(x, y)',
    category: 'Laboratório Interativo 2',
    tag: 'Simulador cGAN Project 9B',
    notes: `Chegamos ao nosso segundo laboratório interativo! Aqui vocês podem experimentar diretamente o poder de controle de classes de uma cGAN operando na coloração virtual de tecidos neuronais humanos (Project 9B).

No menu à esquerda, escolham o biomarcador alvo que desejam sintetizar:
1. 'DAPI (Núcleos Celulares)' (y = 0): Reparem no simulador central a concentração de corpos ovais de alta intensidade correspondentes à fluorescência nuclear.
2. 'NeuN (Corpos Neuronais)' (y = 1): Surgem somas neuronais bem definidos com ramificações citoplasmáticas.
3. 'GFP (Axônios e Dendritos de Neurônios Motores)' (y = 2): Observem a emergência de uma densa malha de filamentos axonais e projeções sinápticas em tons verde-esmeralda!

Experimentem mover o slider de 'Força do Condicionamento' e clicar em 'Amostrar Novo Ruído z':
Vejam como o vetor de condição guia a morfologia biológica enquanto o ruído z altera variações anatômicas naturais — como o posicionamento espacial das células e o calibre das projeções axonais!

Olhem para o painel da direita: observem a telemetria do discriminador D(x, y). Ele reporta a probabilidade de realismo e a conformidade com o biomarcador solicitado. É essa capacidade de gerar amostras de fenótipos escassos com alta diversidade intra-classe que permite à cGAN atuar como motor de data augmentation para balancear bases científicas e laboratoriais.`
  },

  // =========================================================================
  // BLOCO 3: CYCLEGAN E TRADUÇÃO DE DOMÍNIO SEM DADOS PAREADOS (Slides 9 a 13)
  // =========================================================================
  {
    id: 9,
    type: 'visual-component',
    component: 'StabilizationTechniquesDiagram',
    title: 'O Dilema da Tradução de Imagens: Pix2Pix vs Realidade Não-Pareada',
    subtitle: 'Por que não é possível alinhar células vivas sob múltiplos microscópios e a necessidade de tradução não-supervisionada',
    category: 'Situação-Problema do Mundo Real',
    tag: 'O Dilema dos Dados Pareados',
    notes: `Apesar do poder da cGAN, quando trabalhamos com dados biológicos e ópticos complexos, enfrentamos uma nova barreira prática: gerar uma imagem inteira a partir do puro ruído z pode ser desafiador se o volume de dados de treino for limitado.

Surge então uma ideia poderosa: e se em vez de gerar do zero a partir de ruído z, nós pegássemos uma imagem real obtida por microscopia quantitativa sem contraste (label-free) e apenas 'traduzíssemos' seu domínio para microscopia de campo claro diagnóstica? Essa tarefa chama-se Tradução de Imagem para Imagem (Image-to-Image Translation).

Em 2016, Isola et al. apresentaram o Pix2Pix, que realiza exatamente essa tradução condicional. No entanto, o Pix2Pix tem um requisito que frequentemente o inviabiliza na microscopia: ele exige pares de treinamento perfeitamente alinhados pixel a pixel (como fotos de satélite pareadas com mapas vetoriais)!

Pensem comigo no contexto de células vivas (Project 9C: Holo2Bright): é fisicamente impossível obter um dataset pareado perfeito! Células biológicas vivas movem-se, alteram sua morfologia em questão de segundos e sofrem fototoxidade. Você não pode registrar a mesma célula viva exatamente na mesma posição, no mesmo instante e no mesmo ângulo sob dois microscópios físicos distintos (holográfico e campo claro)!

Tudo o que nós temos são dois conjuntos independentes e não-alinhados: um conjunto com imagens de microscopia holográfica (Domínio X) e outro conjunto com imagens de campo claro (Domínio Y). Como traduzir entre esses dois mundos sem nenhum par de treinamento prévio? A resposta é uma das maiores obras-primas da IA moderna: a CycleGAN!`
  },
  {
    id: 10,
    type: 'visual-component',
    component: 'CycleGANMacroArchitectureDiagram',
    title: 'Solução Estrutural 2: CycleGAN — Tradução de Domínio Sem Dados Pareados',
    subtitle: 'Zhu et al. (2017) • Project 9C: Holo2Bright — Mapeamento Bidirecional Entre Holografia e Campo Claro',
    category: 'Arquitetura Estrutural Macro',
    tag: 'CycleGAN Holo2Bright (9C)',
    notes: `Em 2017, Jun-Yan Zhu, Taesung Park, Phillip Isola e Alexei Efros publicaram no ICCV o artigo divisor de águas: 'Unpaired Image-to-Image Translation using Cycle-Consistent Adversarial Networks' — a célebre CycleGAN, cuja aplicação é explorada no Project 9C: Converting Between Holographic and Bright-Field Microscopy Images.

Vamos analisar a elegância da macro-arquitetura na tela. A CycleGAN não possui apenas um gerador e um discriminador; ela opera com uma estrutura quádrupla: dois geradores e dois discriminadores espelhados!

Do lado esquerdo, temos o Domínio X: imagens de microscopia holográfica digital (Holo), que registram padrões de difração e fase sem destruir a amostra biológica.
Do lado direito, temos o Domínio Y: imagens de microscopia de campo claro (Bright-Field), o padrão óptico clássico com contraste absorvente.

O primeiro motor é o Gerador G: X ➔ Y. Ele recebe uma imagem holográfica real x e aprende a sintetizar uma imagem G(x) que parece pertencer ao domínio de campo claro, sintetizando contraste e bordas celulares típicas.
Para garantir que G(x) seja crível, temos o Discriminador D_Y, que compara amostras reais de campo claro (y) contra as falsificações geradas G(x).

Simetricamente, temos o caminho reverso! O Gerador F: Y ➔ X recebe uma imagem de campo claro real y e aprende a sintetizar uma holografia correspondente F(y), recriando os anéis de difração de fase.
E o Discriminador D_X avalia se as imagens sintetizadas por F parecem holografias autênticas.

Contudo, se usássemos apenas as perdas adversariais comuns de G e F, o sistema falharia catastroficamente: o gerador G poderia simplesmente memorizar uma única imagem bonita de campo claro do domínio Y e cuspir essa mesma imagem para qualquer holograma de entrada! Como impedir que isso aconteça? É aí que entra a Consistência de Ciclo!`
  },
  {
    id: 11,
    type: 'visual-component',
    component: 'CycleConsistencyLossDiagram',
    title: 'A Perda de Consistência de Ciclo: Preservação Morfológica em Holo2Bright',
    subtitle: 'x ➔ G(x) ➔ F(G(x)) ≈ x: Como o ciclo bidirecional impede distorções celulares e colapso de modos',
    category: 'Engenharia de Perdas',
    tag: 'Cycle-Consistency & Identity Loss',
    notes: `A Consistência de Ciclo (Cycle-Consistency Loss) é a grande sacada teórica que torna a CycleGAN viável e segura para aplicações biomédicas e ópticas.

Pensem na analogia de tradução de idiomas: se você pegar uma frase em português, traduzi-la para o francês pelo Google Tradutor e, em seguida, pegar essa frase em francês e traduzi-la de volta para o português, você deve recuperar exatamente a frase original! Se você começou com 'A célula apresenta membrana íntegra' e a volta resultar em 'O satélite entrou em órbita', o tradutor está quebrado!

Essa é exatamente a restrição matemática formulada por Zhu et al. no slide:
Olhem para o Ciclo Direto (Forward Cycle) no painel esquerdo: pegamos a imagem holográfica x, passamos pelo gerador G para sintetizar o campo claro G(x), e em seguida passamos esse resultado imediatamente pelo gerador reverso F! O resultado F(G(x)) deve ser idêntico à holografia original x!
Calculamos a perda L1 entre a reconstrução de volta e o original: ||F(G(x)) - x||_1.

Vejam por que essa perda impede o colapso de modos: se o gerador G tentasse trapacear transformando todas as holografias na mesma imagem fixa de campo claro, o gerador F jamais teria informação suficiente para adivinhar a distribuição espacial específica dos anéis de difração do holograma original de volta! A perda de ciclo explodiria. Portanto, para minimizar essa perda, o gerador G é forçado a manter intocada toda a morfologia e localização das células, alterando estritamente a textura e o contraste óptico!

Adicionalmente, usamos a Perda de Identidade (Identity Loss): se fornecermos ao gerador G uma imagem que JÁ É de campo claro, ela não deve ser alterada: ||G(y) - y||_1. Essa perda regulariza a rede e impede que ela altere tonalidades desnecessariamente.`
  },
  {
    id: 12,
    type: 'interactive',
    component: 'CycleGANConsistencyLab',
    title: 'Laboratório Interativo: Consistência de Ciclo no Holo2Bright (Project 9C)',
    subtitle: 'Ajuste o peso lambda_cyc e observe a transição entre colapso morfológico celular e reconstrução fiel',
    category: 'Laboratório Interativo 3',
    tag: 'Simulador Cycle-Consistency (9C)',
    notes: `Sejam bem-vindos ao terceiro laboratório interativo da nossa aula! Aqui vocês têm nas mãos a bancada de calibração da perda de ciclo da CycleGAN aplicada à conversão Holo2Bright (Project 9C).

Observem o slider central: 'Peso do Ciclo (lambda_cyc)'. Ele controla a importância relativa entre a perda adversarial (enganar o perito) e a perda de consistência (preservar a morfologia celular).

Experimentem puxar o slider para zero (lambda_cyc = 0):
Vejam o desastre acontecer no tríptico visual à direita! Sem a restrição de ciclo, o gerador não tem nenhum compromisso de manter o arranjo celular de entrada. Na etapa 2 (Traduzida), as células colapsam em posições arbitrárias e membranas celulares desaparecem. Na etapa 3 (Reconstruída), a volta falha completamente e o painel acende o alarme vermelho: 'Colapso de Modos: Células Deslocadas!'. Esse modelo seria inútil para quantificação celular.

Agora, ajustem o slider para o valor clássico recomendado por Zhu et al.: lambda_cyc = 10:
Vejam a mágica acontecer! A distorção morfológica cai para menos de 4%. O campo claro traduzido preserva com precisão micrométrica a posição de cada célula e a integridade de suas membranas, injetando apenas o contraste óptico absorvente característico. E no painel 3, a reconstrução F(G(x)) recupera a holografia de entrada quase com perfeição pixel a pixel!

Por fim, experimentem empurrar o slider para além de 25:
Notem o efeito sobre-restrito: o ciclo torna-se tão rígido que a rede fica com medo de fazer qualquer modificação de contraste óptico, preservando anéis de difração indesejados. O valor lambda=10 é exatamente o ponto ótimo de equilíbrio entre fidelidade óptica e conservação morfológica.`
  },
  // =========================================================================
  // BLOCO 4: AVALIAÇÃO DOWNSTREAM, IMPACTO NO RECALL E FIXAÇÃO (Slides 13 a 15)
  // =========================================================================
  {
    id: 13,
    type: 'visual-component',
    component: 'EvaluationMetricsISFIDDiagram',
    title: 'Avaliação de Modelos Generativos: Do FID ao Impacto Downstream',
    subtitle: 'Por que o realismo estatístico não basta: A validação mandatória pelo ganho de Recall na tarefa a jusante',
    category: 'Métricas de Avaliação',
    tag: 'FID vs Impacto Downstream',
    notes: `Como avaliamos tecnicamente se um modelo generativo foi bem-sucedido? Muitos profissionais inexperientes cometem o erro de olhar apenas para as imagens a olho nu: 'Ah, a imagem parece bonita, então a GAN funcionou'. Na engenharia rigorosa e nas ciências biológicas, isso é inaceitável.

Na literatura de IA generativa, a métrica quantitativa padrão é o FID (Fréchet Inception Distance), proposto por Heusel et al. em 2017. O FID extrai vetores de características da penúltima camada da rede Inception-v3 para imagens reais e geradas, modela essas ativações como gaussianas multivariadas e calcula a distância Wasserstein-2 entre elas. Quanto menor o FID, mais próxima a distribuição sintética está da distribuição real. Um FID baixo indica excelente fidelidade estatística.

Porém, prestem muita atenção a esta diretriz de engenharia:
O FID mede apenas a fidelidade estatística global das imagens geradas; ele NÃO garante que os dados sintéticos sejam úteis para a tarefa analítica final!

A avaliação definitiva e mandatória em projetos de IA aplicada é a Avaliação Downstream (na tarefa a jusante): treinamos um classificador ou detector com e sem as imagens sintéticas e medimos o ganho na métrica diagnóstica crítica: a Sensibilidade (Recall) da classe minoritária rara! Se a GAN apresentar um FID baixo, mas o classificador downstream não apresentar melhora de Recall no teste, a geração de dados foi inútil. É o salto no Recall que comprova o sucesso da engenharia.`
  },
  {
    id: 14,
    type: 'interactive',
    component: 'DownstreamEvaluationLab',
    title: 'Laboratório Interativo: Impacto no Recall Downstream com Augmentation Generativa',
    subtitle: 'Simule a adição de amostras sintéticas de classes raras e observe a queda de Falsos Negativos e o salto no Recall',
    category: 'Laboratório Interativo 4',
    tag: 'Simulador de Recall Downstream',
    notes: `Chegamos ao nosso quarto laboratório interativo, que demonstra quantitativamente o impacto da modelagem generativa no desempenho de um classificador downstream!

Temos aqui um conjunto de teste diagnóstico fixo de 1.000 amostras 100% REAIS (850 amostras do fenótipo comum e 150 amostras da condição patológica rara).

Observem a situação com o slider em 0 amostras sintéticas (Baseline sem GAN):
Olhem para a matriz de confusão: a acurácia é de 89.5% — parece boa para quem não entende de estatística médica. Mas olhem a célula vermelha dos Falsos Negativos (FN): 63 casos patológicos foram classificados erroneamente como normais! O Recall é de apenas 58.0% e o alerta do sistema aponta 'Risco Crítico de Triagem'.

Agora, comecem a arrastar o slider para a direita, adicionando de 1.000 a 3.000 amostras sintéticas geradas da classe rara no conjunto de treinamento:
Vejam como a matriz de confusão reage em tempo real! À medida que o classificador recebe exemplos sintéticos bem condicionados, a fronteira de decisão se calibra adequadamente.
O número de Verdadeiros Positivos (TP) sobe de 87 para mais de 140!
Os Falsos Negativos despencam de 63 para menos de 10 casos!
O Recall salta de 58% para expressivos 93% a 94%, ultrapassando a meta de segurança diagnóstica de 90%, enquanto a especificidade permanece estável acima de 92%. O selo verde de 'Segurança Diagnóstica Atingida' se acende! Esse experimento comprova com dados o valor do data augmentation generativo.`
  },
  {
    id: 15,
    type: 'interactive',
    component: 'GANQuizLab',
    title: 'Quiz Formativo de Fixação: GANs Estruturais, cGAN, CycleGAN e Métricas de Impacto',
    subtitle: 'Avalie seus conhecimentos com 4 questões práticas e conceituais abordando Projects 9B, 9C e avaliação downstream',
    category: 'Laboratório Interativo 5',
    tag: 'Quiz de Fixação Formativo',
    notes: `Chegamos ao encerramento da nossa Aula 7 com o Quiz Interativo de Fixação de Conhecimento!

Este quiz consolida os quatro grandes eixos de competência que desenvolvemos hoje e que serão fundamentais para a realização do projeto da disciplina:

Na Questão 1, revisamos a mecânica da perda não-saturante de Goodfellow e como a derivada proporcional a (1 - D) impede o desvanecimento de gradientes no início do treino.
Na Questão 2, testamos a estrutura das GANs Condicionais (cGANs) e a injeção do vetor de condição biológica (Project 9B) tanto no gerador quanto no discriminador.
Na Questão 3, consolidamos o funcionamento da CycleGAN e o papel vital da consistência de ciclo para mapear entre microscopia holográfica e de campo claro (Project 9C) sem dados pareados.
E na Questão 4, fechamos com a governança diagnóstica de dados desbalanceados, reforçando por que a Sensibilidade (Recall) da classe minoritária é a métrica mandatória que comprova a eficácia da síntese generativa.

Respondam às quatro questões na tela, analisem com atenção os feedbacks didáticos e utilizem esses aprendizados como base para o projeto prático. Parabéns a todos pelo excelente percurso e dedicação ao longo desta aula!`
  }
];
