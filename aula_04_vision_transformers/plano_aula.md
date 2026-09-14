# Plano de Aula — Aula 04: Vision Transformers (ViT) e Classificação de Imagens

**Disciplina:** Visão Computacional com CNNs e Transformers  
**Curso:** Pós-Graduação em Inteligência Artificial & Machine Learning  
**Instituição:** Faculdade Infnet  
**Carga Horária:** 3 horas presenciais/síncronas + atividades assíncronas de laboratório  

---

## 1. Ementa da Aula

A extensão definitiva da arquitetura Transformer para o domínio visual: superando a hegemonia de uma década das Convolutional Neural Networks (CNNs). A situação-problema fundamental: o colapso quadrático de memória GPU $O(N^2)$ ao aplicar autoatenção diretamente em nível de pixels ($N = H \times W$). O contraste conceitual de viés indutivo (*Inductive Bias*): a rigidez estrutural das CNNs (localidade espacial e equivariância translacional rígidas) versus a flexibilidade global e agnóstica a dados do Transformer. A solução de engenharia pioneira do Vision Transformer (ViT, Dosovitskiy et al., ICLR 2021): fatiamento da imagem em patches $P \times P$ ($16 \times 16$) tratados como uma sequência de "palavras visuais". A mecânica do Patch Embedding: achatamento linear e a equivalência computacional com uma convolução 2D de `kernel_size=P` e `stride=P`. O papel do token sentinela `[CLS]` e a injeção de Position Embeddings unidimensionais aprendíveis para recuperação de ordem espacial. A anatomia do ViT Encoder Block: arquitetura Pre-Layer Normalization (Pre-LN), Multi-Head Self-Attention (MSA), conexões residuais (*skip connections*) e Feed-Forward Network (MLP) com expansão $4\times$ e ativação GELU. O gargalo da "fome de dados" (*Data Hunger*): subajuste e sobreajuste no ImageNet-1k versus supremacia no ImageNet-21k e JFT-300M. Soluções de engenharia para regularização: CutMix (Yun et al., 2019) e Mixup (Zhang et al., 2017). Formulação matemática do CutMix: amostragem de proporção $\lambda \sim \text{Beta}(\alpha, \alpha)$, cálculo de caixas delimitadoras $(\tilde{r}_x, \tilde{r}_y, \tilde{r}_w, \tilde{r}_h)$, interpolação espacial de patches e alvos suaves (*soft labels*) ponderados para perda Cross-Entropy. Interpretabilidade e explicabilidade em ViTs: o algoritmo Attention Rollout e mapas de saliência do token `[CLS]`. Famílias arquiteturais modernas: ViT Original (Base/Large/Huge), DeiT (Data-efficient Image Transformers via destilação de conhecimento de CNNs com distillation token) e Swin Transformer (atenção hierárquica por janelas deslocadas com complexidade linear $O(N)$). Rastreamento e álgebra de tensores em PyTorch.

---

## 2. Objetivos de Aprendizagem

### Objetivo Geral
Capacitar os pós-graduandos a compreender, analisar, projetar e regularizar modelos de visão computacional baseados em Transformers (Vision Transformers - ViT), dominando desde a quebra de complexidade computacional do fatiamento de patches até as formulações matemáticas de regularização via CutMix e técnicas de interpretabilidade por Attention Rollout.

### Objetivos Específicos
Ao final desta aula, o estudante será capaz de:
1. **Demonstrar matematicamente** por que a autoatenção direta em pixels resulta em explosão quadrática $O((H \cdot W)^2)$, contrastando com a redução drástica de complexidade obtida pelo agrupamento em patches $P \times P$.
2. **Avaliar criticamente o trade-off de Viés Indutivo (*Inductive Bias*)**: contrastar a eficiência de poucos dados das CNNs com o teto de acurácia superior dos Vision Transformers quando submetidos a regimes de grande volume de dados ou regularização avançada.
3. **Calcular e rastrear** com precisão as dimensões de tensores PyTorch ao longo de todo o pipeline do ViT: desde a entrada $[B, C, H, W]$, projeção para $[B, N, D]$, concatenação do `[CLS]` para $[B, N+1, D]$, soma dos Positional Embeddings e extração da cabeça de classificação $[B, \text{num\_classes}]$.
4. **Fundamentar a equivalência técnica** entre a projeção linear de patches e uma camada `torch.nn.Conv2d(in_channels=3, out_channels=D, kernel_size=P, stride=P)`.
5. **Explicar o fenômeno da "fome de dados" (*Data Hunger*)** e fundamentar a necessidade de técnicas de regularização mista (Mixup e CutMix) para treinar ViTs em datasets médios sem sofrer degradação catastrófica de generalização.
6. **Formular e calcular** a geometria de caixas delimitadoras e os rótulos interpolados (*soft labels*) do algoritmo CutMix, justificando seu impacto na prevenção de memorização superficial e na preservação da semântica dos patches.
7. **Interpretar mapas de atenção** em ViTs através do método Attention Rollout, correlacionando os pesos da matriz de autoatenção às regiões da imagem determinantes para a classificação final.
8. **Distinguir as variantes do ecossistema ViT**: ViT canônico (Dosovitskiy), DeiT (Touvron) com destilação supervisionada e Swin Transformer (Liu) com janelas hierárquicas $O(N)$.

---

## 3. Metodologia Pedagógica

A aula segue estritamente o método de 4 etapas:

```
[ 1. Situação-Problema ] ──► [ 2. Solução de Engenharia ] ──► [ 3. Teoria Rigorosa ] ──► [ 4. Aplicação & Regularização ]
```

1. **Situação-Problema do Mundo Real:**
   - A explosão quadrática de memória e FLOPS ao calcular matrizes de atenção pixel a pixel: uma imagem simples de $224 \times 224$ gera uma matriz de $50.176 \times 50.176$ (~2,5 bilhões de elementos por cabeça, causando OOM instantâneo em GPUs modernas).
   - A armadilha da "fome de dados": ViTs treinados apenas no ImageNet-1k atingem acurácia inferior a uma ResNet-50 devido à ausência de viés indutivo de localidade.

2. **Solução de Engenharia:**
   - **Patch Slicing**: fatiar a imagem em patches de $16 \times 16$, reduzindo a sequência de $50.176$ pixels para apenas $196$ patches, viabilizando o cálculo de autoatenção global.
   - **Token `[CLS]` e Posições 1D**: introdução do token sentinela agregador (herdado do BERT) e embeddings posicionais aprendíveis.
   - **Regularização com CutMix e Mixup**: sintetizar novos exemplos misturando patches de diferentes imagens e interpolando targets, impedindo que o modelo memorize padrões locais espúrios.

3. **Teoria Rigorosa & Formalismo Matemático:**
   - Álgebra de Tensores:
     $$N = \frac{H \cdot W}{P^2} = \frac{224 \times 224}{16 \times 16} = 196 \text{ patches}$$
     $$\mathbf{z}_0 = [\mathbf{x}_{\text{class}}; \mathbf{x}_p^1 \mathbf{E}; \dots; \mathbf{x}_p^N \mathbf{E}] + \mathbf{E}_{\text{pos}}, \quad \mathbf{E} \in \mathbb{R}^{(P^2 C) \times D}$$
   - Equações do Bloco Encoder:
     $$\mathbf{z}'_\ell = \text{MSA}(\text{LN}(\mathbf{z}_{\ell-1})) + \mathbf{z}_{\ell-1}$$
     $$\mathbf{z}_\ell = \text{MLP}(\text{LN}(\mathbf{z}'_\ell)) + \mathbf{z}'_\ell$$
   - Formulação do CutMix:
     $$\tilde{\mathbf{x}} = \mathbf{M} \odot \mathbf{x}_A + (\mathbf{1} - \mathbf{M}) \odot \mathbf{x}_B$$
     $$\tilde{y} = \lambda y_A + (1 - \lambda) y_B, \quad \lambda = 1 - \frac{r_w r_h}{W H}, \quad \lambda \sim \text{Beta}(\alpha, \alpha)$$

4. **Aplicação, Diagnóstico & Trade-offs:**
   - Visualização de mapas de atenção (Attention Rollout) para auditoria de decisões de modelos de visão em produção.
   - Matriz de decisão de engenharia: quando utilizar ResNets/ConvNeXt vs ViT Base vs Swin Transformer com base no orçamento de dados, latência em inferência e restrições de VRAM.

---

## 4. Conteúdo Programático Detalhado (Roteiro dos 16 Slides)

### Bloco 1: A Crise do Pixel, Viés Indutivo e a Solução dos Patches (Slides 1 a 5)
- **Slide 1: Abertura & Visão Geral da Aula**
  - Apresentação do curso, disciplina e do roteiro temático da aula: da crise computacional do pixel à maturidade dos Vision Transformers.
- **Slide 2: A Situação-Problema — O Colapso do Pixel-Level Self-Attention**
  - Componente: `PixelAttentionExplosionDiagram`.
  - Análise matemática do custo quadrático $O(N^2)$ com $N = H \times W = 50.176$. A impossibilidade prática da atenção pura em pixels.
- **Slide 3: O Dilema de Engenharia — Viés Indutivo: CNNs vs Transformers**
  - Componente: `InductiveBiasTradeoffDiagram`.
  - Comparação: viés de localidade e equivariância translacional nas CNNs vs liberdade relacional e campo receptivo global imediato nos ViTs.
- **Slide 4: A Solução de Engenharia — Imagens como Sequências de Palavras Visuais**
  - Componente: `PatchSlicingDiagram`.
  - O fatiamento da imagem $224 \times 224 \times 3$ em uma grade regular de $14 \times 14 = 196$ patches de dimensão $16 \times 16 \times 3 = 768$.
- **Slide 5: 🧪 Laboratório Interativo 1 — Simulador de Fatiamento de Patches**
  - Componente: `PatchSlicingLab`.
  - Manipulação em tempo real da resolução da imagem ($112$, $224$, $384$, $512$) e do tamanho do patch ($8$, $14$, $16$, $32$), observando a contagem de tokens $N$ e o custo quadrático da matriz de atenção.

### Bloco 2: A Arquitetura Canônica do ViT e Fluxo de Tensores (Slides 6 a 10)
- **Slide 6: A Arquitetura Canônica do Vision Transformer (ViT)**
  - Componente: `ViTCanonicalArchitectureViewer` (Figura 8-11 oficial do ViT).
  - Visão panorâmica de ponta a ponta: do patch slicing ao Patch Embedding, injeção posicional, pilha de Encoders e cabeça MLP de classificação.
- **Slide 7: A Mecânica do Patch Embedding — Da Matriz 2D ao Vetor Latente**
  - Componente: `PatchEmbeddingMechanicsDiagram`.
  - Demonstração do achatamento vetorial $\mathbb{R}^{768} \to \mathbb{R}^{D}$ e a equivalência formal com `nn.Conv2d(3, D, kernel_size=16, stride=16)`.
- **Slide 8: O Token [CLS] e Embeddings Posicionais 1D**
  - Componente: `ClsTokenPositionalDiagram`.
  - O porquê do token `[CLS]` sentinela para agregar a semântica global sem favorecer nenhum patch e a recuperação da geometria espacial via vetores de posição aprendíveis.
- **Slide 9: A Anatomia do ViT Encoder Block — Pre-LN, MSA e MLP Residual**
  - Componente: `ViTBlockAnatomyDiagram`.
  - Detalhamento estrutural do bloco: Pre-Layer Normalization para estabilização de gradientes, Multi-Head Self-Attention, conexões residuais e camada MLP com expansão $4 \times$ e ativação GELU.
- **Slide 10: 🧪 Laboratório Interativo 2 — Rastreador de Tensores PyTorch no ViT**
  - Componente: `ViTTensorTrackerLab`.
  - Inspeção passo a passo do formato de tensores PyTorch em cada estágio arquitetural ($[B, 3, 224, 224] \to [B, 196, 768] \to [B, 197, 768] \to [B, 1000]$) com seletor de hiperparâmetros (ViT-Base vs ViT-Large).

### Bloco 3: O Fenômeno da "Fome de Dados" e Regularização com CutMix (Slides 11 e 12)
- **Slide 11: A Situação-Problema 2 — O Gargalo da "Fome de Dados" (Data Hunger)**
  - Componente: `DataHungerOverfittingDiagram`.
  - Análise dos dados originais do Google: por que o ViT perde para a ResNet no ImageNet-1k (1,3M imagens), empata no ImageNet-21k (14M) e domina no JFT-300M (300M).
- **Slide 12: A Solução de Engenharia — Regularização Avançada: CutMix vs Cutout vs Mixup**
  - Componente: `CutMixConceptDiagram`.
  - Comparativo conceitual: perda de informação no Cutout, imagens fantasmagóricas no Mixup e a preservação semântica de patches com rótulos suaves proporcionais à área no CutMix.

### Bloco 4: Interpretabilidade, Ecossistema Moderno e Fixação (Slides 13 a 16)
- **Slide 13: Interpretabilidade em ViTs — Attention Rollout e Mapas de Saliência**
  - Componente: `AttentionRolloutDiagram`.
  - O fluxo da matriz de atenção através das camadas profundas: como o algoritmo Attention Rollout rastreia a contribuição de cada patch para a predição final do `[CLS]`.
- **Slide 14: O Ecossistema Moderno de ViTs — Da Teoria aos Benchmarks de Produção**
  - Componente: `ViTArchitecturesComparisonDiagram`.
  - Comparativo entre ViT Original, DeiT (com token de destilação de conhecimento), Swin Transformer (janelas deslocadas com atenção $O(N)$) e ConvNeXt.
- **Slide 15: 🧪 Laboratório Interativo 3 — Matriz de Trade-offs e Dimensionamento para Produção**
  - Componente: `ViTModelTradeoffLab`.
  - Explorador dinâmico de modelos para seleção de backbone em produção, filtrando por critérios de Acurácia Top-1, Parâmetros, GFLOPs, Requisito Mínimo de Dataset e Latência.
- **Slide 16: Quiz Formativo de Fixação sobre Vision Transformers**
  - Componente: `ViTInteractiveQuiz`.
  - 3 questões conceituais desafiadoras cobrindo o custo quadrático do pixel, o mecanismo geométrico do CutMix e o papel do viés indutivo, com feedback pedagógico analítico imediato.

---

## 5. Recursos Didáticos & Tecnologias

- **Apresentação de Slides:**
  - Versão Web Interativa (React + Vite, 16 slides visuais com KaTeX, 10 componentes SVG e 4 atividades interativas).
  - Versão em PDF para Leitura Offline e Impressão (`aula_04_apresentacao.pdf`).
  - Teleprompter integrado com as falas completas do professor (Atalho `N`).
  - Visão Geral em Grade (Atalho `G`) e modo Tela Cheia sem barras pretas (Atalho `F`).
- **Roteiro do Professor (`falas_apresentador.md`):**
  - Script minucioso de narração slide por slide, rigorosamente sincronizado com os `notes` do `slidesData.js`, fornecendo profundidade matemática e conceitual sem poluir a área visual dos slides.
- **Notebooks Práticos de Apoio (Google Colab):**
  - `aula_04_vision_transformers.ipynb`: Caderno principal de Fine-Tuning do Vision Transformer com Hugging Face `transformers` no dataset Agritech `beans`, inferência zero-shot ImageNet, regularização CutMix e explicabilidade por Attention Rollout.
  - `aula_04_resolucao_desafios_bert_lora.ipynb`: Resolução passo a passo dos desafios avançados da aula anterior (BERTimbau PT-BR, parametrização LoRA / PEFT e Mean Pooling semântico).

---

## 6. Referências Bibliográficas

1. **DOSOVITSKIY, Alexey et al.** An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale. *International Conference on Learning Representations (ICLR)*, 2021. [arXiv:2010.11929](https://arxiv.org/abs/2010.11929).
2. **YUN, Sangdoo et al.** CutMix: Regularization Strategy to Train Strong Classifiers with Localizable Features. *IEEE/CVF International Conference on Computer Vision (ICCV)*, 2019. [arXiv:1905.04899](https://arxiv.org/abs/1905.04899).
3. **ZHANG, Hongyi et al.** mixup: Beyond Empirical Risk Minimization. *International Conference on Learning Representations (ICLR)*, 2018. [arXiv:1710.09412](https://arxiv.org/abs/1710.09412).
4. **TOUVRON, Hugo et al.** Training data-efficient image transformers & distillation through attention. *International Conference on Machine Learning (ICML)*, 2021. [arXiv:2012.12877](https://arxiv.org/abs/2012.12877).
5. **LIU, Ze et al.** Swin Transformer: Hierarchical Vision Transformer using Shifted Windows. *IEEE/CVF International Conference on Computer Vision (ICCV)*, 2021. [arXiv:2103.14030](https://arxiv.org/abs/2103.14030).
6. **ABNAR, Samira; ZUIDEMA, Willem.** Quantifying Attention Flow in Transformers. *Association for Computational Linguistics (ACL)*, 2020. [arXiv:2005.00928](https://arxiv.org/abs/2005.00928).
7. **VASWANI, Ashish et al.** Attention Is All You Need. *Advances in Neural Information Processing Systems (NeurIPS)*, 2017. [arXiv:1706.03762](https://arxiv.org/abs/1706.03762).
8. **LIU, Zhuang et al.** A ConvNet for the 2020s. *IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR)*, 2022. [arXiv:2201.03545](https://arxiv.org/abs/2201.03545).
