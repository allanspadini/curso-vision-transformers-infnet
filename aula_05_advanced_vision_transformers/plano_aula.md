# Plano de Aula — Aula 05: Modelos ViT Avançados (DeiT, PVT, Swin Transformer & DINO)

**Disciplina:** Visão Computacional com CNNs e Transformers  
**Curso:** Pós-Graduação em Inteligência Artificial & Machine Learning  
**Instituição:** Faculdade Infnet  
**Carga Horária:** 3 horas síncronas + atividades assíncronas de laboratório e projeto prático  
**Professor:** Allan Spadini  

---

## 1. Ementa da Aula

Revisão estrutural e rastreamento formal de tensores no pipeline do Vision Transformer canônico (ViT, Dosovitskiy et al.): do fatiamento em patches $P \times P$, projeção linear `Conv2d(stride=P)`, injeção do token sentinela `[CLS]`, Position Embeddings 1D e blocos Pre-LN Transformer Encoder até a cabeça de classificação. Diagnóstico das limitações de produção do ViT: a "fome de dados" (*Data Hunger*) e o subajuste no ImageNet-1k puro; a rigidez de escala única (arquitetura isotrópica colunar) e sua incompatibilidade com Feature Pyramid Networks (FPN); e a explosão de complexidade quadrática $O(N^2)$ em imagens de alta resolução. A árvore evolutiva dos modelos ViT modernos. Data-Efficient Image Transformers (DeiT, Touvron et al., Meta/Sorbonne, 2021): destilação de conhecimento com professor convolucional (RegNetY), introdução do *Distillation Token* `[DIST]`, formulação de Soft versus Hard Distillation e arsenal agressivo de regularização (RandAugment, Mixup, CutMix, Repeated Augmentations e Stochastic Depth). Pyramid Vision Transformer (PVT, Wang et al., 2021) para tarefas densas: estrutura hierárquica em 4 estágios progressivos ($H/4$, $H/8$, $H/16$, $H/32$) e o mecanismo Spatial-Reduction Attention (SRA) para redução de complexidade em chaves e valores por $R_i^2$. The Swin Transformer (Liu et al., ICCV 2021 Marr Prize): atenção em janelas locais não sobrepostas (W-MSA) com complexidade linear $O(N)$, conexão entre janelas via Shifted Windows (SW-MSA), o algoritmo de rolagem vetorial Cyclic Shift com Atenção Mascarada (*Masked Attention*) e macro-arquitetura hierárquica com camadas de *Patch Merging*. Aprendizado auto-supervisionado em ViTs com DINO (Caron et al., Meta AI, ICCV 2021): auto-destilação siamesa sem rótulos e sem pares negativos, estratégia Multi-Crop, Momentum Teacher (EMA), salvaguardas anti-colapso por Centering e Sharpening, e a propriedade emergente de segmentação semântica não-supervisionada nos mapas de atenção do token `[CLS]`. Fronteiras modernas: Masked Autoencoders (MAE, He et al., 2022) com 75% de mascaramento de patches e DINOv2 (Oquab et al., 2023) com modelos de fundação em escala de bilhão de parâmetros e *frozen features*. O contra-ataque convolucional com ConvNeXt (Liu et al., 2022): modernização sistemática da ResNet-50 aplicando lições do Swin (stem patchify, depthwise 7x7, inverted bottleneck, menos ativações e LayerNorm). Matriz de Decisão Arquitetural e Guia de Seleção Industrial para projetos reais.

---

## 2. Objetivos de Aprendizagem

### Objetivo Geral
Capacitar os pós-graduandos a dominar, diagnosticar, projetar e selecionar arquiteturas avançadas de Vision Transformers (DeiT, PVT, Swin Transformer e DINO) e CNNs modernizadas (ConvNeXt), compreendendo profundamente os trade-offs de eficiência de dados, hierarquia espacial, linearização computacional e aprendizado auto-supervisionado para aplicações corporativas e científicas de visão computacional.

### Objetivos Específicos
Ao final desta aula, o estudante será capaz de:
1. **Rastrear e formalizar** com precisão matemática as dimensões dos tensores PyTorch em todo o pipeline do ViT canônico, identificando os gargalos práticos que motivaram a evolução arquitetural.
2. **Explicar e formular** a mecânica do *Distillation Token* no DeiT, contrastando a formulação de Hard versus Soft Distillation e justificando matematicamente a superioridade da destilação dura com CNNs.
3. **Analisar a incompatibilidade** da arquitetura isotrópica plana do ViT com tarefas de visão densa (Detecção e Segmentação) e justificar a necessidade de pirâmides hierárquicas multiescala (FPN).
4. **Demonstrar a formulação algébrica** do Spatial-Reduction Attention (SRA) no PVT, calculando a redução do tamanho da matriz de atenção e economia de VRAM em função da taxa de redução $R_i$.
5. **Calcular a complexidade computacional** comparativa entre o MSA global $O((hw)^2 C)$ e o W-MSA local $O(M^2 hw C)$ do Swin Transformer, provando a linearidade em relação ao número total de pixels.
6. **Descrever passo a passo** o algoritmo de *Cyclic Shift*, *Masked Self-Attention* (com valor $-\infty$ / $-100$) e *Reverse Shift*, fundamentando sua importância para a vetorização uniforme em GPUs sem desperdício com padding.
7. **Explicar o mecanismo de auto-destilação** sem pares negativos do DINO, analisando o papel do Momentum Teacher (EMA) e o equilíbrio entre *Centering* e *Sharpening* na prevenção do colapso de representação.
8. **Interpretar a propriedade emergente** de segmentação e recorte semântico de objetos a partir dos mapas de atenção do token `[CLS]` e de cabeças individuais em modelos DINO.
9. **Avaliar criticamente** as propostas do MAE (reconstrução com 75% de máscara), DINOv2 (*frozen features* universais) e ConvNeXt (modernização da convolução com lições do Swin).
10. **Aplicar a Matriz de Decisão Arquitetural** para orientar a seleção de backbones visuais em projetos industriais sob restrições reais de latência, hardware (GPU servidor vs NPU edge), volume de dados e anotações.

---

## 3. Metodologia Pedagógica

A aula é estruturada no método Infnet:
```
[ 1. Situação-Problema do Mundo Real ] ──► [ 2. Solução de Engenharia ] ──► [ 3. Teoria Rigorosa & Tensores ] ──► [ 4. Simulação & Decisão Prática ]
```

1. **Situação-Problema do Mundo Real (A Dor da Indústria):**
   - Treinar ViTs exige centenas de milhões de dados anotados (JFT-300M); no ImageNet-1k puro ele perde para ResNets.
   - Conectar ViT plano em detectores Mask R-CNN causa colapso de memória GPU ($1.6$ bilhão de pares de atenção em imagens $800 \times 800$).
   - O custo de anotação manual de milhões de máscaras e caixas é proibitivo para a maioria das empresas.

2. **Solução de Engenharia (A Sacada Arquitetural):**
   - **DeiT:** Injetar viés indutivo de uma CNN especialista congelada via Distillation Token dedicado `[DIST]`.
   - **PVT:** Construir 4 estágios piramidais e aplicar convoluções de stride nas chaves e valores (SRA).
   - **Swin:** Fatiar a autoatenção em janelas locais $M \times M$ fixas e interligá-las com Shifted Windows e rolagem cíclica.
   - **DINO:** Auto-destilação com visão global no professor e visões locais no aluno, equilibrando centering e sharpening.
   - **ConvNeXt:** Atualizar a ResNet com stems patchify, depthwise 7x7 e LayerNorm, mantendo a eficiência de deploy das CNNs.

3. **Teoria Rigorosa e Álgebra de Tensores:**
   - Formulação matemática exata de perdas, complexidades $\Omega(\text{W-MSA})$, matrizes de atenção mascarada $\text{Softmax}((QK^T/\sqrt{d}) + \text{Mask})V$, atualizações de Momentum Encoder $\theta_t \leftarrow \lambda \theta_t + (1-\lambda)\theta_s$.

4. **Simulação Interativa e Tomada de Decisão:**
    - 3 laboratórios interativos em React para manipulação de hiperparâmetros em tempo real, visualização de VRAM e matriz de decisão industrial.

---

## 4. Estrutura dos Slides e Conteúdo Programático (17 Slides)

### Bloco 1: Revisão do ViT Canônico e Diagnóstico de Barreiras (Slides 1 a 4)
- **Slide 1: Capa & Visão Geral da Aula 05**
  - Componente: Layout de título com badges institucionais e roadmap temático.
- **Slide 2: Revisão: A Engenharia do Pipeline Canônico do ViT**
  - Componente: `ViTReviewPipelineDiagram`.
  - Rastreamento dos 5 estágios: Imagem $[B, 3, 224, 224]$, Patch Embedding $[B, 196, 768]$, $[CLS]$ + Pos $[B, 197, 768]$, 12 blocos Pre-LN Transformer, extração de $[B, 768]$ e classificação.
- **Slide 3: O Diagnóstico: As 3 Barreiras Críticas do ViT no Mundo Real**
  - Componente: `ViTLimitationsDiagnosticDiagram`.
  - Análise dos 3 gargalos: Fome de Dados (JFT-300M vs ImageNet-1k), Rigidez Isotrópica (incompatibilidade com FPN) e Custo Quadrático $O(N^2)$ (OOM em imagens de $800 \times 800$).
- **Slide 4: O Mapa Evolutivo: As Soluções de Engenharia para os Gargalos do ViT**
  - Componente: `ViTEvolutionMapDiagram`.
  - A árvore genealógica conectando o ViT (2020) ao DeiT (2021), PVT (2021), Swin (2021), DINO (2021), MAE (2022) e ConvNeXt (2022).

### Bloco 2: Data-Efficient Image Transformer (DeiT) (Slide 5)
- **Slide 5: DeiT: Data-Efficient Image Transformers via Destilação**
  - Componente: `DeiTDistillationOverviewDiagram`.
  - Paradigma Teacher-Student: CNN congelada (RegNetY) transferindo viés indutivo para o ViT sem dados externos.

### Bloco 3: Pyramid Vision Transformer (PVT) (Slides 6 a 8)
- **Slide 6: O Dilema das Tarefas Densas: Detecção de Objetos e Segmentação Semântica**
  - Componente: `DensePredictionBottleneckDiagram`.
  - Contraste entre a arquitetura colunar plana do ViT e a pirâmide progressiva exigida por FPNs e Mask R-CNN.
- **Slide 7: Pyramid Vision Transformer (PVT) e Spatial-Reduction Attention (SRA)**
  - Componente: `PVTArchitectureDiagram`.
  - Arquitetura em 4 estágios ($H/4$ a $H/32$) e o operador Spatial-Reduction Attention (SRA) com convoluções de stride $R_i$, reduzindo chaves e valores por $R_i^2$.
- **Slide 8: 🧪 Lab 1: Simulador de Pirâmide Visual e Spatial-Reduction Attention**
  - Componente: `PVTSimulatorLab`.
  - Manipulação de resoluções ($224$, $448$, $800$, $1024$) e visualização de consumo de VRAM (seguro vs CUDA OOM).

### Bloco 4: The Swin Transformer (Slides 9 a 11)
- **Slide 9: The Swin Transformer: Atenção em Janelas Locais (W-MSA)**
  - Componente: `SwinWindowPartitionDiagram`.
  - Partição em janelas $M \times M$ não sobrepostas e prova da complexidade linear $\Omega(\text{W-MSA}) = 4hwC^2 + 2M^2hwC$.
- **Slide 10: Shifted Windows (SW-MSA): Interligando Janelas sem Custo Global**
  - Componente: `SwinShiftedWindowDiagram`.
  - Alternância de pares de blocos e translação da grade por $(\lfloor M/2 \rfloor, \lfloor M/2 \rfloor)$ conectando janelas vizinhas.
- **Slide 11: Cyclic Shift & Masked Attention: O Golpe de Mestre da Implementação**
  - Componente: `SwinCyclicShiftDiagram`.
  - Os 4 passos: Partição com Shift, Rolagem Cíclica, Atenção Mascarada com $-100$ e Rolagem Reversa.

### Bloco 5: DINO — Aprendizado Auto-Supervisionado em ViTs (Slides 12 a 14)
- **Slide 12: DINO: Self-Supervised Vision Transformers sem Rótulos**
  - Componente: `DINOOverviewDiagram`.
  - Auto-destilação siamesa, estratégia Multi-Crop (visões globais no professor, globais + locais no aluno) e Cross-Entropy sem pares negativos.
- **Slide 13: A Mecânica do DINO: Prevenção de Colapso e a Propriedade Emergente**
  - Componente: `DINOMouseMechanicsDiagram`.
  - Momentum Encoder (EMA), forças opostas de Centering e Sharpening, e a descoberta de segmentação espontânea do token `[CLS]`.
- **Slide 14: 🧪 Lab 2: Visualizador de Mapas de Atenção: DINO vs ViT Supervisionado**
  - Componente: `DINOAttentionViewerLab`.
  - Comparativo visual de saliência em imagens reais e inspeção das 6 cabeças de atenção especializadas em partes anatômicas.

### Bloco 6: Modelos Majoritários, ConvNeXt e Guia de Decisão Industrial (Slides 15 a 17)
- **Slide 15: MAE & DINOv2: As Fronteiras Modernas do Pré-Treinamento Visual**
  - Componente: `MAEAndDINOv2Diagram`.
  - Masked Autoencoder com 75% de patches descartados e encoder assimétrico leve; DINOv2 com modelos de fundação de 1B de parâmetros em LVD-142M e *frozen features*.
- **Slide 16: ConvNeXt: A Modernização da Convolução nos Anos 2020**
  - Componente: `ConvNeXtEvolutionDiagram`.
  - Evolução passo a passo da ResNet-50 ao ConvNeXt-T (stem patchify, depthwise 7x7, inverted bottleneck, GELU e LayerNorm) com 82.1% no ImageNet.
- **Slide 17: 🧪 Lab 3: Quiz de Fixação & Matriz de Decisão Arquitetural**
  - Componente: `ViTAdvancedQuizLab`.
  - 4 questões profundas com justificativas e guia interativo de seleção de backbones por caso de uso industrial.

---

## 5. Competências e Habilidades Desenvolvidas

- **Diagnóstico Arquitetural:** Capacidade de inspecionar gargalos de memória GPU e propor a substituição de atenção global por janelas locais (Swin) ou redução espacial (PVT).
- **Eficiência de Treinamento:** Habilidade para implementar destilação de conhecimento com token dedicado (DeiT) e regularizações avançadas quando datasets forem limitados.
- **Fundação Visual Auto-Supervisionada:** Compreensão para utilizar modelos DINO e DINOv2 como extratores de representações congeladas de alto nível para tarefas a jusante (*downstream tasks*).
- **Visão Sistêmica de Engenharia:** Discernimento para escolher entre Transformers puros (Swin) e Convoluções modernizadas (ConvNeXt) avaliando restrições de latência, consumo de silício e facilidade de compilação para dispositivos móveis e embarcados.

---

## 6. Referências Bibliográficas Seminais

1. **ViT Original:** Dosovitskiy, A., et al. (2020). *An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale*. ICLR 2021.
2. **DeiT:** Touvron, H., et al. (2021). *Training data-efficient image transformers & distillation through attention*. ICML 2021.
3. **PVT:** Wang, W., et al. (2021). *Pyramid Vision Transformer: A Versatile Backbone for Dense Prediction without Convolutions*. ICCV 2021.
4. **Swin Transformer:** Liu, Z., et al. (2021). *Swin Transformer: Hierarchical Vision Transformer using Shifted Windows*. ICCV 2021 (Best Paper - Marr Prize).
5. **DINO:** Caron, M., et al. (2021). *Emerging Properties in Self-Supervised Vision Transformers*. ICCV 2021.
6. **MAE:** He, K., et al. (2022). *Masked Autoencoders Are Scalable Vision Learners*. CVPR 2022.
7. **ConvNeXt:** Liu, Z., et al. (2022). *A ConvNet for the 2020s*. CVPR 2022.
8. **DINOv2:** Oquab, M., et al. (2023). *DINOv2: Learning Robust Visual Features without Supervision*. Transactions on Machine Learning Research (TMLR).

---

## 7. Cadernos Práticos de Laboratório (Jupyter Notebooks)

A Aula 05 conta com três laboratórios práticos focados em execução direta no Google Colab com `AutoImageProcessor` da Hugging Face:

1. **Notebook 1 — Revisão Prática do ViT com Hugging Face (`aula_05_advanced_vision_transformers.ipynb`)**:
   - **Objetivo:** Revisitar o pipeline de fine-tuning do Vision Transformer canônico (`google/vit-base-patch16-224`) de maneira elegante, simples e modular.
   - **Dataset:** Imagens de satélite EuroSAT (`timm/eurosat-rgb`), focando em 3 classes distintas de uso do solo.
   - **Componentes-Chave:** `AutoImageProcessor.from_pretrained()`, `AutoModelForImageClassification`, extração de tensores `last_hidden_state`, loop de fine-tuning limpo e inferência com gráficos de confiança Softmax.

2. **Notebook 2 — DeiT: Destilação de Conhecimento com Professor Convolucional (`aula_05_deit_distillation_transfer_learning.ipynb`)**:
   - **Objetivo:** Implementar o paradigma Teacher-Student do DeiT (`facebook/deit-tiny-distilled-patch16-224`), onde um modelo convolucional forte e congelado (ResNet-18 🔒) guia o aluno Vision Transformer através do *Distillation Token* `[DIST]`.
   - **Dataset:** Classificação binária de alta fidelidade visual com `Bingsu/Cat_and_Dog`.
   - **Componentes-Chave:** Injeção do token `[DIST]`, arquitetura dual-head (`cls_classifier` e `distillation_classifier`), cálculo da perda de *Hard Distillation* ($\mathcal{L}_{\text{total}} = \frac{1}{2}\mathcal{L}_{\text{CE}}(\text{cls}, y) + \frac{1}{2}\mathcal{L}_{\text{CE}}(\text{dist}, \hat{y}_{\text{teacher}})$), comitê de decisão $(y_{\text{cls}} + y_{\text{dist}})/2$, e inspeção visual de probabilidades com barras de confiança.

3. **Notebook 3 — DINO: Auto-Supervisão com Hugging Face Transformers (`aula_05_dino_self_supervised_vision.ipynb`)**:
   - **Objetivo:** Explorar o aprendizado auto-supervisionado puro com DINO (`facebook/dino-vits16`) e DINOv2 via biblioteca `transformers`, comprovando na prática como a autoatenção descobre objetos e gera segmentação espontânea sem um único rótulo ou máscara anotada.
   - **Dataset:** Imagens reais de animais domésticos com `Bingsu/Cat_and_Dog`.
   - **Componentes-Chave:** `AutoImageProcessor.from_pretrained()`, `AutoModel.from_pretrained(..., attn_implementation="eager")`, `pipeline("image-classification", model="facebook/dinov2-small-imagenet1k-1-layer")`, classificação sem cabeça classificadora via **Nearest Mean Classifier** (centróide médio de representações por classe), extração da matriz de atenção `[1, 6, 197, 197]` da última camada, interpolação bicúbica para $224 \times 224$, visualização da segmentação espontânea do `[CLS]`, réplica da Figura 16-8 com inspeção das 6 cabeças anatômicas especializadas e busca visual por similaridade (CBIR).


