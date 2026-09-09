# Plano de Aula — Aula 03: BERT e Redes Encoder-Only

**Disciplina:** Visão Computacional com CNNs e Transformers  
**Curso:** Pós-Graduação em Inteligência Artificial & Machine Learning  
**Instituição:** Faculdade Infnet  
**Carga Horária:** 3 horas presenciais/síncronas + atividades assíncronas de laboratório  

---

## 1. Ementa da Aula
A limitação da cegueira unidirecional em modelos autorregressivos causais e redes recorrentes (LSTMs). O dilema de vazamento de informação e a solução de engenharia do modelo BERT (Bidirectional Encoder Representations from Transformers). Taxonomia da família Transformer: Encoder-Only vs Decoder-Only vs Encoder-Decoder. A anatomia do BERT: fluxo de tokens, embeddings de palavras, projeção linear, injeção posicional, bloco de autoatenção bidirecional profunda e embeddings sensíveis ao contexto. O conceito-chave de Cabeças Plugáveis (Task-Specific Heads) sobre um mesmo backbone fundacional. A estrutura de embeddings tripla: Token Embeddings (WordPiece), Segment Embeddings ($E_A, E_B$) e Position Embeddings aprendidos. Objetivos de pré-treinamento auto-supervisionado: Masked Language Model (MLM), a tarefa Cloze, a regra 80/10/10 da Google AI, tied weights e função de perda Cross-Entropy nas posições mascaradas. O objetivo Next Sentence Prediction (NSP): coerência discursiva, formulação binária no token `[CLS]` e perda conjunta $\mathcal{L}_{\text{total}} = \mathcal{L}_{\text{MLM}} + \mathcal{L}_{\text{NSP}}$. Especificações do BERT-Base (110M) e BERT-Large (340M). Estratégias de adaptação: Fine-Tuning de ponta a ponta com taxa de aprendizado reduzida ($2 \times 10^{-5}$) vs Feature Extraction com backbone congelado. Aplicações práticas de mercado: Classificação de Sequências (Sentimento/Fraude via pooling do `[CLS]`); Classificação de Tokens (NER e POS Tagging) com o alinhamento de subwords WordPiece e a máscara `-100` (`ignore_index`); Question Answering Extrativo (SQuAD) via vetores de pontuação de início ($S$) e término ($E$); Busca Semântica e Retrieval em milissegundos com Bi-Encoders (Sentence-BERT / SBERT) e bancos de dados vetoriais (FAISS). Evoluções arquiteturais: RoBERTa, DistilBERT, ALBERT e DeBERTa. A ponte definitiva para a visão computacional: do fatiamento de texto ao fatiamento de imagens em patches $16 \times 16$ no Vision Transformer (ViT) e o pré-treinamento auto-supervisionado com Masked Autoencoders (MAE). Implementação e engenharia com o ecossistema Hugging Face (`transformers`, `AutoTokenizer`, `AutoModel`, `pipeline` e `Trainer`).

---

## 2. Objetivos de Aprendizagem

### Objetivo Geral
Capacitar os pós-graduandos a projetar, adaptar e implementar redes neurais baseadas na arquitetura Transformer Encoder-Only (BERT e sucessores), dominando a teoria da atenção bidirecional profunda, os objetivos de pré-treino (MLM e NSP), a substituição modular de cabeças lineares para problemas de mercado e a transição direta desses conceitos para os modelos fundacionais de visão computacional.

### Objetivos Específicos
Ao final desta aula, o estudante será capaz de:
1. **Contrastar** formalmente o mecanismo de atenção causal triangular (Decoder) com a atenção bidirecional plena (Encoder), justificando o ganho semântico em tarefas de compreensão.
2. **Explicar** a mecânica do Masked Language Model (MLM) e fundamentar a necessidade da regra 80/10/10 para mitigar a discrepância entre pré-treinamento e inferência.
3. **Calcular e rastrear** as dimensões exatas de tensores em PyTorch nas etapas de Embedding Triplo ($[B, L, 768]$), Multi-Head Attention, Pooling do token `[CLS]` e projeções lineares das cabeças.
4. **Implementar e depurar** o alinhamento de subwords no Reconhecimento de Entidades Nomeadas (NER), aplicando a máscara `y = -100` para evitar a contagem errônea de subpalavras fragmentadas pelo WordPiece.
5. **Formular matematicamente** a cabeça extrativa de Question Answering (SQuAD) com os vetores de início ($S$) e término ($E$).
6. **Avaliar trade-offs** de custo computacional e latência entre Cross-Encoders ($O(N)$ passagens de BERT) e Bi-Encoders Sentence-BERT para busca vetorial de larga escala ($O(1)$ passagens com similaridade de cosseno em milissegundos).
7. **Articular** a equivalência estrutural entre o Encoder do BERT e o Vision Transformer (ViT), correlacionando o Masked Language Model com os Masked Autoencoders (MAE) em visão.

---

## 3. Metodologia Pedagógica

A aula segue estritamente o método de 4 etapas:

```
[ 1. Situação-Problema ] ──► [ 2. Solução de Engenharia ] ──► [ 3. Teoria Rigorosa ] ──► [ 4. Aplicação de Mercado ]
```

1. **Situação-Problema do Mundo Real:** A limitação da atenção causal que só olha para trás ("o banco..."); a incapacidade de treinar atenção bidirecional sem trapaça de gradiente; o custo inviável de rodar modelos pesados para busca em milhões de documentos.
2. **Solução de Engenharia:** A tarefa Cloze com mascaramento 80/10/10 (MLM); a representação agregadora no token `[CLS]`; a cabeça desacoplada e plugável para múltiplas tarefas; os Bi-Encoders com indexação vetorial pré-computada.
3. **Teoria Rigorosa:** Equações de embeddings somados ($E = E_{\text{tok}} + E_{\text{seg}} + E_{\text{pos}}$); função de custo conjunta $\mathcal{L}_{\text{total}} = \mathcal{L}_{\text{MLM}} + \mathcal{L}_{\text{NSP}}$; equações de span do SQuAD ($s_i = S \cdot h_i, e_j = E \cdot h_j$); tensores do Hugging Face e PyTorch.
4. **Aplicação de Mercado:** Classificação de avaliações de e-commerce, extração de entidades em relatórios corporativos, motores de busca semântica em bancos vetoriais e execução prática no Google Colab.

---

## 4. Conteúdo Programático Detalhado (Roteiro dos 22 Slides)

### Bloco 1: Fundamentos, Situação-Problema e Anatomia Modular (Slides 1 a 6)
- **Slide 1:** Abertura da Aula 3 e Apresentação do Roteiro.
- **Slide 2:** A Situação-Problema: A Cegueira Unidirecional Causal e a Ambiguidade Contextual (*BidirectionalContextDilemmaDiagram*).
- **Slide 3:** A Família Transformer: A Bifurcação em Encoder-Only, Decoder-Only e Seq2Seq (*TransformerFamilyTaxonomyDiagram*).
- **Slide 4:** A Anatomia da Arquitetura do BERT: Da Palavra à Decisão — O Diagrama Canônico StatQuest (*BertHanddrawnStyleArchitectureDiagram*).
- **Slide 5:** O Conceito Chave: Cabeças Plugáveis (Task-Specific Heads) sobre o Backbone Universal (*PluggableHeadsVisualizerDiagram*).
- **Slide 6:** 🧪 *Laboratório Interativo 1: Simulador de Cabeças Plugáveis do BERT (`PluggableHeadsLab`)*.

### Bloco 2: Embeddings Triplos e Objetivos de Pré-Treino: MLM & NSP (Slides 7 a 12)
- **Slide 7:** A Estrutura de Embeddings Tripla: Token Embeddings + Segment Embeddings + Position Embeddings (*BertTripleEmbeddingDiagram*).
- **Slide 8:** O Pré-Treinamento 1: Masked Language Model (MLM), a Tarefa Cloze e a Regra 80/10/10 (*MaskedLanguageModelDiagram*).
- **Slide 9:** 🧪 *Laboratório Interativo 2: Simulador do Masked Language Model (`MLMInteractiveLab`)*.
- **Slide 10:** O Pré-Treinamento 2: Next Sentence Prediction (NSP) e Pares de Frases IsNext vs NotNext (*NextSentencePredictionDiagram*).
- **Slide 11:** 🧪 *Laboratório Interativo 3: Inspetor de Pares e NSP (`NSPInspectorLab`)*.
- **Slide 12:** A Função de Custo Multitarefa Conjunta e Especificações Oficiais de BERT-Base vs Large (*BertTrainingLossAndSpecsDiagram*).

### Bloco 3: Estratégias de Aplicação e Casos de Uso de Mercado (Slides 13 a 17)
- **Slide 13:** Estratégias de Aplicação: Fine-Tuning de Ponta a Ponta vs Feature Extraction (Backbone Congelado).
- **Slide 14:** Aplicação 1: Classificação de Sequências de Texto com Pooling do Vetor `[CLS]` (*SequenceClassificationArchitectureDiagram*).
- **Slide 15:** Aplicação 2: Classificação de Tokens (NER) e o Alinhamento de Subwords com a Máscara `-100` (*TokenClassificationNERDiagram*).
- **Slide 16:** Aplicação 3: Question Answering Extrativo (SQuAD) e os Vetores de Span $S$ e $E$ (*ExtractiveQASquadDiagram*).
- **Slide 17:** Aplicação 4: Busca Semântica e Bancos Vetoriais — Bi-Encoders (Sentence-BERT) vs Cross-Encoders (*BiEncoderVsCrossEncoderDiagram*).

### Bloco 4: Evolução Tecnológica e Fixação (Slides 18 a 20)
- **Slide 18:** A Árvore Genealógica das Evoluções do BERT: RoBERTa, DistilBERT, ALBERT e DeBERTa (*BertEvolutionFamilyTreeDiagram*).
- **Slide 19:** 🧪 *Laboratório Interativo 4: Comparador de Modelos Encoder-Only e Dimensionamento de VRAM (`EncoderModelsComparisonLab`)*.
- **Slide 20:** 🧪 *Laboratório Interativo 5: Quiz de Fixação de Conhecimentos sobre BERT (`QuizBert`)*.

---

## 5. Recursos Didáticos & Tecnologias
- **Apresentação de Slides Interativa (React + Vite):**
  - Aplicação SPA com 20 slides interativos, KaTeX para renderização de fórmulas, diagramas vetoriais SVG de alta resolução e 5 simuladores interativos.
  - Teleprompter integrado com as falas do professor (Atalho `N`).
  - Navegação em grade (Atalho `G`) e modo Tela Cheia (Atalho `F`).
- **Roteiro do Professor (`falas_apresentador.md`):** Script completo de narração slide por slide, rigorosamente sincronizado com os slides.
- **Notebooks Práticos Executáveis (Google Colab):**
  - `aula_03_bert_fine_tuning.ipynb`: Inferência com `pipeline()`, Fine-Tuning do BERT para análise de sentimentos e NER com máscara `-100`.
  - `aula_03_transformer_pytorch.ipynb`: Tradução Seq2Seq com `torch.nn.Transformer` nativo.

---

## 6. Referências Bibliográficas
1. **DEVLIN, Jacob et al.** BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding. *arXiv preprint arXiv:1810.04805*, 2018.
2. **LIU, Yinhan et al.** RoBERTa: A Robustly Optimized BERT Approach. *arXiv preprint arXiv:1907.11692*, 2019.
3. **SANH, Victor et al.** DistilBERT, a distilled version of BERT: smaller, faster, cheaper and lighter. *arXiv preprint arXiv:1910.01108*, 2019.
4. **REIMERS, Nils; GUREVYCH, Iryna.** Sentence-BERT: Sentence Embeddings using Siamese BERT-Networks. *EMNLP*, 2019.
5. **HE, Kaiming et al.** Masked Autoencoders Are Scalable Vision Learners. *CVPR*, 2022.
6. **DOSOVITSKIY, Alexey et al.** An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale. *ICLR*, 2021.
7. **WOLF, Thomas et al.** Transformers: State-of-the-Art Natural Language Processing. *EMNLP: System Demonstrations*, 2020.
