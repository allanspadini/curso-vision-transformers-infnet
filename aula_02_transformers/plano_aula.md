# Plano de Aula — Aula 02: Transformers

**Disciplina:** Visão Computacional com CNNs e Transformers  
**Curso:** Pós-Graduação em Inteligência Artificial & Machine Learning  
**Instituição:** Faculdade Infnet  
**Carga Horária:** 3 horas presenciais/síncronas + atividades assíncronas de laboratório  

---

## 1. Ementa da Aula
Recapitulação da Segmentação Semântica com arquitetura U-Net e conexões de atalho densas (skip connections). Transição da grade espacial 2D de pixels para o processamento de sequências. O paradigma da completação autorregressiva de próximo token ($P(x_t \mid x_{<t})$). Pré-processamento e tokenização estatística de subpalavras com o algoritmo Byte-Pair Encoding (BPE) e a biblioteca `tiktoken`. Espaços de representação vetorial: matrizes de Lookup de Embeddings de tokens e a janela de contexto ($T \times d_{\text{model}}$). Codificação de ordem: o dilema da invariância à permutação e Embeddings de Posição (Senoidais de Vaswani et al. vs Aprendidos de GPT/ViT). O Mecanismo de Atenção: Queries, Keys e Values como busca em dicionário diferenciável. Formalismo matemático da Scaled Dot-Product Attention: produto escalar matricial, fator de escala $\frac{1}{\sqrt{d_k}}$ para estabilização de gradientes, normalização Softmax e agregação linear de Values. Visualização e interpretabilidade de mapas de calor de atenção. Engenharia de pesos treináveis com matrizes de projeção linear ($W_Q, W_K, W_V, W_O$). Mecanismos de mascaramento causal para geração autorregressiva sem vazamento de futuro. Multi-Head Attention: múltiplos subespaços relacionais em paralelo ($d_k = d_{\text{model}} / h$). Variantes modernas: Self-Attention vs Cross-Attention, e otimização de hierarquia de memória GPU com FlashAttention. Anatomia do Bloco Transformer: normalização Pre-LN, conexões residuais e redes Feed-Forward (MLP) com expansão $4\times$ e ativações GELU. Macro-arquitetura completa de ponta a ponta e amarração de pesos (Weight Tying). Transição para a Visão Computacional: o Vision Transformer (ViT), fatiamento em patches $16\times 16$, token `[CLS]` e classificação de imagens no ImageNet.

---

## 2. Objetivos de Aprendizagem

### Objetivo Geral
Capacitar os estudantes a compreender os fundamentos teóricos, matemáticos e arquiteturais dos Transformers, desde a tokenização BPE e a autoatenção escalada até o empilhamento de blocos Pre-LN e a sua adaptação direta para a visão computacional com o Vision Transformer (ViT).

### Objetivos Específicos
Ao final desta aula, o estudante será capaz de:
1. **Explicar** o funcionamento da U-Net e contrastar o viés indutivo local das convoluções com o alcance global e dinâmico da autoatenção.
2. **Descrever** o algoritmo de tokenização Byte-Pair Encoding (BPE), compreendendo como ele elimina palavras fora do vocabulário (OOV) mantendo vocabulários compactos.
3. **Calcular e rastrear** as dimensões dos tensores em PyTorch nas etapas de Embedding, Projeção Linear, Atenção e Feed-Forward ($[B, T]$, $[B, T, d_{\text{model}}]$, $[B, h, T, d_k]$, $[B, h, T, T]$).
4. **Justificar matematicamente** a necessidade dos Embeddings de Posição e a função do fator de escala $\frac{1}{\sqrt{d_k}}$ para evitar a saturação da função Softmax.
5. **Implementar em PyTorch** as operações de Scaled Dot-Product Attention, Máscara Causal com `masked_fill`, Multi-Head Attention e Blocos Transformer Pre-LN utilizando `nn.Module`.
6. **Analisar trade-offs** de quantidade de parâmetros, consumo de memória VRAM e complexidade computacional quadrática $O(T^2)$.
7. **Articular** a equivalência entre sequências de texto em NLP e grades de patches $16\times 16$ no Vision Transformer (ViT).

---

## 3. Metodologia Pedagógica

A aula é estruturada no framework pedagógico de 4 etapas consecutivas:

```
[ 1. Situação-Problema ] ──► [ 2. Solução de Engenharia ] ──► [ 3. Fundamento Teórico ] ──► [ 4. Aplicação Prática ]
```

1. **Situação-Problema:** Por que redes convolucionais sofrem para capturar contexto global distante em imagens e texto? Por que palavras raras geram erros de OOV? Por que o produto escalar sem escala quebra o treinamento em alta dimensão?
2. **Solução de Engenharia:** Análise das sacadas seminais: BPE com fusão de bytes, Self-Attention com Q/K/V, divisão em múltiplas cabeças $d_{\text{model}} / h$, Pre-LN e fatiamento da imagem em patches no ViT.
3. **Fundamento Teórico:** Formalização matemática rigorosa ($\text{Softmax}(Q K^T / \sqrt{d_k}) V$, derivadas parciais, variância unitária, fórmulas senoidais e complexidade de memória).
4. **Aplicação Prática:** Demonstrações interativas em React na apresentação com a letra de *All You Need Is Love* dos Beatles e codificação hands-on no Google Colab em PyTorch.

---

## 4. Conteúdo Programático Detalhado (Roteiro dos 26 Slides)

### Bloco 1: Recapitulação e a Gênese dos Tokens (Slides 1 a 6)
- **Slide 1:** Visão Geral da Disciplina e Abertura da Aula 2.
- **Slide 2:** Recapitulação: A Anatomia da Segmentação Semântica (*SemanticSegmentationBridgeDiagram*).
- **Slide 3:** O Paradigma da Completação: Previsão do Próximo Token (*CompletionParadigmDiagram*).
- **Slide 4:** O Pipeline Completo de Processamento em Transformers (BPE, Embeddings, MHA, LM Head).
- **Slide 5:** Tokenização Subword: O Algoritmo Byte-Pair Encoding (*BPETokenizerDiagram*).
- **Slide 6:** 🧪 *Laboratório Interativo 1: Explorador de Tokenização BPE (`BPETokenizerExplorer`)*.

### Bloco 2: Embeddings, Janela de Contexto, Mapa da Rede e Positional Encoding (Slides 7 a 12)
- **Slide 7:** O Que São Embeddings? Do One-Hot ao Hiperespaço Semântico (*SemanticEmbeddingSpaceDiagram*).
- **Slide 8:** A Matriz Look-up Table e o Tensor 3D de Entrada (*TokenEmbeddingContextDiagram*).
- **Slide 9:** Janela de Contexto: Quantidade de Tokens por Solicitação (*ContextWindowDiagram*).
- **Slide 10:** Mapa da Arquitetura: Onde Estamos na Rede Transformer? (*TransformerRoadmapDiagram*).
- **Slide 11:** Injeção de Posição: A Soma de Token Embedding + Position Embedding (*PositionalEmbeddingAdditionDiagram*).
- **Slide 12:** Comparativo: Encodings Senoidais vs Embeddings Aprendidos.

### Bloco 3: O Mecanismo de Autoatenção, Escala e Multi-Head (Slides 13 a 20)
- **Slide 13:** O Mecanismo de Atenção: Dimensões e a Matriz de Similaridade ($6 \times 6$) (*AttentionMatrixMultiplicationDiagram*).
- **Slide 14:** Understanding Attention: A Matemática do Scaled Dot-Product (*DotProductAttentionStepDiagram*).
- **Slide 15:** 🧪 *Laboratório Interativo 2: Simulador Matemático de Scaled Dot-Product (`DotProductCalculator`)*.
- **Slide 16:** Visualizing Attention: A Matriz de Atenção em Ação (*AttentionHeatmapVisualizer*).
- **Slide 17:** Tornando a Atenção Treinável: As Matrizes de Projeção $W_Q, W_K, W_V, W_O$ (*TrainableAttentionDiagram*).
- **Slide 18:** Causal Masking: Atenção Autorregressiva Sem Vazamento de Futuro (*CausalAttentionDiagram*).
- **Slide 19:** Multi-Head Attention: Múltiplos Subespaços de Representação (*MultiHeadAttentionDiagram*).
- **Slide 20:** 🧪 *Laboratório Interativo 3: Inspetor Visual de Multi-Head Attention (`MultiHeadInspector`)*.

### Bloco 4: Tradução Seq2Seq, Macro-Arquitetura e Avaliação (Slides 21 a 26)
- **Slide 21:** A Arquitetura Original para Tradução: Encoder-Decoder e Cross-Attention (*TransformerTranslationDiagram*).
- **Slide 22:** Variantes da Atenção: Cross-Attention, FlashAttention e Eficiência (*OtherAttentionMechanismsDiagram*).
- **Slide 23:** A Anatomia do Bloco Transformer: MHA, MLP, Residuais e LayerNorm (*TransformerBlockDiagram*).
- **Slide 24:** O Transformer Tudo Junto: Macro-Arquitetura de Ponta a Ponta (*FullTransformerMacroDiagram*).
- **Slide 25:** 🧪 *Laboratório Interativo 4: Simulador de Parâmetros e Complexidade (`TransformerTradeoffsLab`)*.
- **Slide 26:** 🧪 *Laboratório Interativo 5: Quiz de Fixação de Conhecimentos (`QuizTransformers`)*.

---

## 5. Recursos Didáticos & Tecnologias
- **Apresentação de Slides Interativa & Versão em PDF:**
  - Aplicação React + Vite (26 slides, KaTeX, diagramas SVG em alta resolução e 5 simuladores interativos).
  - Versão em PDF para Leitura Offline e Impressão (`aula_02_apresentacao.pdf`).
  - Teleprompter integrado com as falas do professor (Atalho `N`).
  - Navegação em grade (Atalho `G`) e modo Tela Cheia (Atalho `F`).
- **Roteiro do Professor (`falas_apresentador.md`):** Script completo de narração slide a slide.
- **Notebooks Práticos Executáveis (Google Colab):**
  - Implementação de Attention e Multi-Head Attention do zero em PyTorch.
  - Treinamento autorregressivo em GPU com `AdamW` e `CosineAnnealingLR`.
  - Tokenização real com a biblioteca `tiktoken` da OpenAI.

---

## 6. Referências Bibliográficas

1. **Vaswani, A., Shazeer, N., Parmar, N., Uszkoreit, J., Jones, L., Gomez, A. N., Kaiser, Ł., & Polosukhin, I.** (2017). *Attention is all you need*. Advances in Neural Information Processing Systems (NeurIPS), 30, 5998-6008.
2. **Dosovitskiy, A., Beyer, L., Kolesnikov, A., Weissenborn, D., Zhai, X., Unterthiner, T., Dehghani, M., Minderer, M., Heigold, G., Gelly, S., Uszkoreit, J., & Houlsby, N.** (2020). *An image is worth 16x16 words: Transformers for image recognition at scale*. International Conference on Learning Representations (ICLR 2021).
3. **Sennrich, R., Haddow, B., & Birch, A.** (2016). *Neural machine translation of rare words with subword units*. Association for Computational Linguistics (ACL), 1715-1725.
4. **Radford, A., Wu, J., Child, R., Luan, D., Amodei, D., & Sutskever, I.** (2019). *Language models are unsupervised multitask learners*. OpenAI Technical Report.
5. **Dao, T., Fu, D. Y., Ermon, S., Rudra, A., & Ré, C.** (2022). *FlashAttention: Fast and memory-efficient exact attention with IO-awareness*. Advances in Neural Information Processing Systems (NeurIPS), 35, 16344-16359.
6. **Ronneberger, O., Fischer, P., & Brox, T.** (2015). *U-Net: Convolutional networks for biomedical image segmentation*. Medical Image Computing and Computer-Assisted Intervention (MICCAI), 234-241.
7. **Ba, J. L., Kiros, J. R., & Hinton, G. E.** (2016). *Layer normalization*. arXiv preprint arXiv:1607.06450.
8. **Hendrycks, D., & Gimpel, K.** (2016). *Gaussian error linear units (GELUs)*. arXiv preprint arXiv:1606.08415.
