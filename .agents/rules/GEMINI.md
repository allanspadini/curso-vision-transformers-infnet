Este é um projeto de aulas usando PyTorch para um curso de pós-graduação EAD da Faculdade Infnet. O nome da disciplina é **Visão Computacional com CNNs e Transformers**. 

Devemos passar conceitos avançados e complexos com o máximo de clareza didática e profundidade técnica, utilizando estritamente a metodologia **Situação-Problema do Mundo Real ➔ Solução de Engenharia ➔ Teoria Rigorosa**.

---

### 🎯 Metodologia Pedagógica Central: Problema ➔ Solução ➔ Teoria

Todo conceito, módulo arquitetural ou técnica deve ser introduzido seguindo rigorosamente estas 3 etapas:

1. **1. Situação-Problema do Mundo Real (A Dor Prática)**:
   - **Nunca introduzir teoria no vácuo ou fórmulas abstratas sem motivação concreta.**
   - Começar SEMPRE com um gargalo real enfrentado em projetos e na indústria:
     - *Exemplos:* Saturação de gradientes ao multiplicar vetores em alta dimensão ($d_k=512$); palavras raras explodindo o vocabulário (erros de OOV); degradação de acurácia ao empilhar camadas profundas em CNNs; perda de detalhes espaciais finos em segmentação de imagens médicas; lentidão e custo quadrático de memória GPU $O(T^2)$ em contextos longos; impossibilidade de paralelizar RNNs no treino; etc.

2. **2. Solução de Engenharia (A Sacada Prática & Intuição)**:
   - Apresentar a solução conceitual e o insight de design criado pelos autores para contornar o problema:
     - *Exemplos:* Fator de escala $1/\sqrt{d_k}$ para estabilizar a variância; algoritmo Byte-Pair Encoding (BPE); atalhos residuais $x + F(x)$ na ResNet; conexões densas de atalho na U-Net; projeções em subespaços de Query/Key/Value; paralelização com *Teacher Forcing* e máscara causal; computação em blocos SRAM no FlashAttention; fatiamento de imagens em patches no ViT.

3. **3. Teoria e Formalismo Rigoroso (Matemática, Tensores e Código)**:
   - Formalizar o conceito com rigor matemático completo, rastreamento de tensores em PyTorch ($[B, T, d_{\text{model}}]$, $[B, h, T, d_k]$, etc.), formulação algébrica, derivadas parciais e implementação prática.

---

### 🧠 Profundidade Conceitual vs Abstração Visual dos Slides

Para manter a apresentação dinâmica e o conteúdo denso:
- **Slides (Visual Puro & Sem Poluição)**: O slide deve conter **apenas diagramas amplos, tensores, gráficos e fluxos visuais limpos**. Não utilize blocos de texto explicativos, parágrafos ou listas de justificativas nos slides.
- **Falas do Apresentador (`falas_apresentador.md` e `notes` no `slidesData.js`) & Notebooks (`.ipynb`) (Profundidade Máxima)**: Todo o aprofundamento conceitual, analogias intuitivas, rastreamento passo a passo de tensores, diferenciações cruciais (ex: treino paralelo via *Teacher Forcing* vs inferência autorregressiva token a token, papéis das matrizes $Q, K, V$, mecânica de backpropagation) devem estar **completamente detalhados nas falas do professor**. Nunca seja superficial nas falas!

---

### 📁 Estrutura Obrigatória de Cada Aula (`aula_XX_<nome_da_aula>/`)

Cada aula deve ficar em uma pasta dedicada contendo a seguinte estrutura de arquivos:
- `apresentacao/` (Aplicação React + Vite com os slides interativos)
- `falas_apresentador.md` (Roteiro de narração slide por slide para o professor)
- `plano_aula.md` (Plano pedagógico da aula detalhando objetivos, blocos e competências)
- `aula_XX_<nome_da_aula>.ipynb` (Jupyter Notebook para prática de código em PyTorch focado em Google Colab)
- `simulacao_<tema>.xlsx` (Planilha de simulação matemática sem código, quando aplicável)

---

### 💻 Padrão para Apresentações em React (`apresentacao/`)

Para a criação de apresentações, utilizaremos o framework **React** com **Vite**, seguindo estritamente a identidade visual do `Template de Slides para Aulas.odp` / `.pdf` localizado na raiz do projeto.

#### 1. Tecnologias & Dependências
- **React + Vite SPA** (`package.json`, `index.html`, `vite.config.js`).
- **KaTeX** (`katex`): Renderização de expressões matemáticas em LaTeX.
- **Lucide React** (`lucide-react`): Ícones modernos para interface.
- **Vanilla CSS / CSS Tokens**: Definição no `src/index.css` (evitar Tailwind a menos que solicitado).

#### 2. Estrutura de Componentes & Arquivos
```
apresentacao/
├── public/
│   ├── infnet_logo.png
│   └── (imagens da apresentação)
└── src/
    ├── main.jsx
    ├── index.css (tokens de cores, fontes, viewport 16:9 e animações)
    ├── App.jsx (gerenciamento de estado, atalhos de teclado e navegação)
    ├── data/
    │   └── slidesData.js (matriz central com todos os slides e propriedades)
    ├── components/
    │   ├── Header.jsx (Onda SVG cyan superior, logo da Infnet, título e subtítulo)
    │   ├── Footer.jsx (Nome do curso/instituição, atalhos, contador Slide X/Y)
    │   ├── Controls.jsx (Botões Anterior/Próximo e Autoplay)
    │   ├── NotesDrawer.jsx (Drawer lateral com falas do autor - atalho 'N')
    │   ├── OverviewModal.jsx (Grid visual com miniaturas de todos os slides - atalho 'G')
    │   ├── MathView.jsx (Renderizador de KaTeX inline e block)
    │   ├── visual/ (Diagramas SVG arquiteturais, anatômicos e matemáticos)
    │   └── interactive/ (Simuladores interativos com estados, sliders e tabelas)
    └── utils/
        └── assetHelper.js (Tratamento de caminhos de imagens)
```

#### 3. Identidade Visual & Design System (`index.css`)
- **Cores Oficiais Infnet**:
  - Dark Blue / Branding: `--infnet-dark-blue` (`#0A345D`)
  - Deep Navy / Fundo App: `--infnet-navy-deep` (`#061F38`)
  - Cyan Accent / Detalhes: `--infnet-cyan` (`#1BB5D8`) e `--infnet-cyan-light` (`#64D9EF`)
  - Green Accent / Destaques: `--infnet-green-accent` (`#7CB342`)
  - Orange / Alertas: `--infnet-orange` (`#FF7043`)
  - Purple / Variáveis: `--infnet-purple` (`#AB47BC`)
- **Tipografia**:
  - Títulos: Google Fonts `'Outfit'`, sans-serif.
  - Corpo / Textos: Google Fonts `'Inter'`, sans-serif.
  - Código / Matemática: Google Fonts `'Fira Code'`, monospace.
- **Viewport dos Slides**:
  - Moldura fixa em proporção 16:9 (`.slide-viewport`, max 1366x768px).
  - Suporte a Fullscreen puro no navegador via tecla `F` sem barras pretas.

#### 4. Recursos & Atalhos de Navegação
- `Seta Direita` / `Espaço` / `PageDown`: Próximo slide.
- `Seta Esquerda` / `PageUp`: Slide anterior.
- `Home` / `End`: Ir para o primeiro / último slide.
- `N`: Abrir/Fechar Gaveta de Falas do Apresentador (`NotesDrawer`).
- `G`: Abrir/Fechar Visão Geral / Grid de Slides (`OverviewModal`).
- `F`: Alternar modo Tela Cheia (Fullscreen).

#### 5. Formato dos Dados dos Slides (`slidesData.js`)
Cada slide no arquivo `slidesData.js` deve possuir:
- `id`: Número sequencial do slide.
- `type`: Tipo de layout (`title`, `instructor`, `roadmap`, `comparison`, `flow`, `image-text`, `formula`, `custom`, `quiz`, `card-grid`, `interactive`, `visual-component`).
- `title` e `subtitle`: Título e subtítulo do slide.
- `notes`: Texto com a fala completa do apresentador para o slide (deve ser **estritamente idêntico** ao arquivo `falas_apresentador.md`).
- Propriedades específicas do tipo (`steps`, `cardLeft`/`cardRight`, `component`, `formula`, `variables`, `quizQuestions`).

#### 6. Diretrizes para Visualizações & Componentes
- **Foco Visual Absoluto nos Slides**: Os slides devem ser primariamente visuais. **Não coloque blocos de texto explicativos, parágrafos ou listas longas nos slides**. Todo o aprofundamento teórico, justificativas conceituais e detalhes devem residir nas **falas do apresentador** (`falas_apresentador.md` e `notes` no `slidesData.js`).
- **Diagramas e Figuras em Destaque**: Quando um slide apresentar uma arquitetura ou diagrama técnico, a figura/SVG deve ocupar a área principal do slide em tamanho amplo e legível, sem ser comprimida por cards laterais de texto.
- **Evitar Animações 3D Pesadas/Genéricas**: Em vez de WebGL/Three.js excessivo, priorizar diagramas vetoriais SVG claros, tabelas arquiteturais estruturadas (Camada, Tipo, Tamanho de Entrada, Kernel/Stride, Tamanho de Saída, Parâmetros) e fluxo em cascata.
- **Divisão Didática de Arquiteturas Complexas**:
  1. *Slide 1*: A Anatomia do Bloco Construtivo Isolado (ex: Módulo Inception, BasicBlock Residual, Patch Attention).
  2. *Slide 2*: A Macro-Arquitetura Completa de ponta a ponta (como os blocos se empilham com Stem, Pooling e Classificador).
- **Tabelas de Modelos com Métricas Reais**: Em tabelas de modelos pré-treinados (ex: Tabela 12-3 do TorchVision), incluir dados fiéis (Top-1, Top-5, Parâmetros, GFLOPs) e filtros rápidos por porte/categoria com inspetor de código PyTorch.
- **Componentes Interativos**: Cada aula deve conter de 3 a 5 laboratórios interativos em React (simuladores de parâmetros, seletor de trade-offs, visualizadores de tensores e quiz final).

#### 7. Diretrizes de Qualidade e Sincronização
- **Zero Poluição Visual / Baixíssima densidade de texto por slide**: Prefira rótulos visuais, badges de dimensões e ícones discretos integrados ao próprio diagrama.
- **Vários slides por aula**: Divida o conteúdo em 18 a 25 slides por apresentação.
- **Sem slide de síntese/resumo final**: Não é necessário ter um slide de síntese da aula no encerramento; a aula pode concluir diretamente com o Quiz Interativo de Fixação ou no último conteúdo prático.
- **Sincronia Total de Documentos**: Sempre que um slide for adicionado, removido ou alterado, sincronize simultaneamente: `slidesData.js`, `falas_apresentador.md` e `plano_aula.md`.
- **Verificação Visual**: Sempre rode `npm run build` para garantir integridade e 0 erros de compilação.

---

### 📓 Padrão para Jupyter Notebooks (`aula_XX_<nome>.ipynb`)

Os notebooks devem ser desenvolvidos com foco em execução no **Google Colab**:

1. **Badge do Colab**: Incluir no topo o badge oficial `Open in Colab` apontando para o repositório.
2. **Setup Automático de GPU**:
   - Verificação dinâmica de acelerador CUDA (`torch.cuda.is_available()`, `torch.cuda.get_device_name(0)` e memória VRAM).
   - Fixação de sementes (`random`, `numpy`, `torch.manual_seed(42)`).
3. **Zero Download Local Manual e Download Rápido via KaggleHub**:
   - O download de dados deve ser 100% programático e automático:
     - **Kaggle via `kagglehub` (Altamente Recomendado)**: Para datasets do Kaggle públicos, utilize a biblioteca oficial `kagglehub` (rápida, leve e não exige configuração manual de tokens para datasets abertos):
       ```python
       import kagglehub
       path = kagglehub.dataset_download("dataset-owner/dataset-name")
       ```
     - **TorchVision Datasets**: `torchvision.datasets` (ex: `CIFAR10`, `OxfordIIITPet`, `Flowers102`, `EuroSAT`, `VOCDetection`).
     - **Hugging Face Datasets**: `datasets.load_dataset(...)`.
   - **Nunca usar MNIST ou Fashion-MNIST** para pós-graduação; preferir datasets de imagens do mundo real (RGB).
4. **Estrutura Pedagógica Obrigatória do Notebook**:
   - **Parte 1 — Exploração de Dados**: Data Augmentation, DataLoaders com `batch_size` e função de desnormalização para plotar amostras com nomes de classes reais.
   - **Parte 2 — Arquitetura do Zero**: Implementação modular em PyTorch (`nn.Module`) com Blocos Construtivos (ex: `BasicBlock`) e classe principal com contagem de parâmetros treináveis.
   - **Parte 3 — Treinamento do Zero**: Loop de treino e avaliação modular com `tqdm`, `CrossEntropyLoss`, `AdamW` e agendador `CosineAnnealingLR`.
   - **Parte 4 — Transfer Learning Moderno**:
     - Carregamento com a API moderna de **Weights Enum** (`from torchvision.models import <modelo>, <Modelo>_Weights`).
     - Utilização obrigatória de `weights.transforms()` para pré-processamento perfeito.
     - Demonstração prática de *Feature Extraction* (congelamento do backbone) e *Fine-Tuning*.
   - **Parte 5 — Comparativo de Performance**: Curvas gráficas lado a lado (Acurácia e Perda: Do Zero vs Pré-Treinado).
   - **Parte 6 — Inferência Visual**: Predição com barras de confiança Softmax (Top-3 / Top-5) em imagens de teste.
   - **Parte 7 — Desafios Práticos**: Exercícios propostos para os alunos explorarem em casa.

---

### 📦 Gerenciadores de Pacotes e Execução

- **🐍 Ecossistema Python**:
  - Utilize **estritamente o `uv`** para instalar pacotes Python, gerenciar ambientes virtuais e executar scripts Python locais (ex: `uv run python script.py`, `uv pip install ...`, `uv add ...`).
  - **Nunca utilize `pip` ou `python` diretamente sem o `uv`**.
  
- **🌐 Ecossistema Frontend / Apresentações (React + Vite)**:
  - Utilize o **`npm`** (Node.js) para gerenciar dependências e scripts do frontend:
    - Instalar pacotes: `npm install`
    - Servidor de desenvolvimento: `npm run dev`
    - Build de validação e produção: `npm run build`


 
