# Plano de Aula — Aula 06: OpenAI CLIP
**Disciplina:** Visão Computacional com CNNs e Transformers  
**Curso:** Pós-Graduação EAD em Inteligência Artificial & Machine Learning  
**Instituição:** Faculdade Infnet  
**Carga Horária Estimada:** 4 horas (Teoria + Laboratórios Interativos + Prática em Python)  
**Instrutor / Coordenador:** Prof. Dr. Allan Spadini  

---

## 1. Ementa e Visão Geral

Estudo aprofundado do modelo **CLIP (Contrastive Language-Image Pre-training)** da OpenAI, explorando a transição de classificadores supervisionados de vocabulário fechado (ImageNet-1k) para representações visuais universais de vocabulário aberto (*Open-Vocabulary*) aprendidas via supervisão em linguagem natural em escala de internet (400 milhões de pares do dataset WIT).

Aborda a arquitetura de duas torres (*Two-Tower Network*), rastreamento minucioso de tensores em PyTorch, a formulação algébrica da perda contrastiva InfoNCE simétrica com temperatura aprendível $\tau$, geometria da hiperesfera unitária $S^{D-1}$, robustez fora da distribuição (*Out-of-Distribution - OOD*), classificação *Zero-Shot*, engenharia e *ensembling* de prompts, adaptação para tarefas *downstream* (*Linear Probe*, *Fine-Tuning*, *CoOp*), visão de vocabulário aberto para detecção (OWL-ViT) e segmentação (CLIPSeg), e técnicas de detecção de anomalias industriais sem dados prévios de defeitos.

---

## 2. Metodologia Pedagógica: Problema ➔ Solução ➔ Teoria

A aula é estruturada rigorosamente na metodologia pedagógica central do curso:

```
[Situação-Problema do Mundo Real] ➔ [Solução de Engenharia & Intuição] ➔ [Formalismo Teórico & Tensores]
```

1. **Situação-Problema do Mundo Real (A Dor Prática)**:
   - *O gargalo do vocabulário fechado*: Classificadores clássicos operam com Softmax de $C = 1.000$ classes fixas. Novas categorias exigem anotação humana manual de milhões de dólares e retreinamento.
   - *Shortcut learning e fragilidade OOD*: Redes supervisionadas aprendem atalhos de textura e entram em colapso catastrófico em distribuições adversárias (queda de 76% para 2.7% no ImageNet-A).
   - *Desbalanceamento na detecção de anomalias*: Em manufatura, falhas são raras e imprevisíveis, impossibilitando a coleta prévia de todas as classes de defeitos.

2. **Solução de Engenharia (A Sacada Prática & Intuição)**:
   - *Mineração em Escala de Internet (WIT)*: Treinamento em 400M de pares (imagem, texto) livres sem anotação humana.
   - *Arquitetura Two-Tower Contrastiva*: Image Encoder (ViT/ResNet) e Text Encoder (Transformer) projetados assincronamente para um espaço latente comum.
   - *Zero-Shot Transfer*: Classificação como produto escalar com sentenças de texto livres pré-computadas (`"a photo of a {c}."`).
   - *Prompt Ensembling*: Média de 80 templates estilísticos cancelando ruído e polissemia (+5.0% de acurácia com custo computacional nulo de inferência).
   - *Text-Driven Anomaly Detection*: Prompts de integridade antagônicos (`"flawless"` vs `"damaged"`).

3. **Teoria e Formalismo Rigoroso (Matemática, Tensores e Código)**:
   - *Rastreamento de Tensores*:
     - Imagens: $[B, 3, 224, 224] \to [B, d_v] \to [B, D] \xrightarrow{\text{Norm } L_2} [B, D]$
     - Textos: $[B, 77] \to [B, d_t] \to [B, D] \xrightarrow{\text{Norm } L_2} [B, D]$
   - *Normalização $L_2$*: $\hat{I}_i = \frac{I_i}{\|I_i\|_2}$, $\hat{T}_j = \frac{T_j}{\|T_j\|_2}$, garantindo $\hat{I}_i \cdot \hat{T}_j = \cos(\theta_{ij}) \in [-1.0, +1.0]$.
   - *Perda InfoNCE Simétrica*:
     $$\mathcal{L}_{\text{img}} = -\frac{1}{B} \sum_{i=1}^B \log \frac{\exp(\hat{I}_i \cdot \hat{T}_i / \tau)}{\sum_{j=1}^B \exp(\hat{I}_i \cdot \hat{T}_j / \tau)}$$
     $$\mathcal{L}_{\text{txt}} = -\frac{1}{B} \sum_{j=1}^B \log \frac{\exp(\hat{I}_j \cdot \hat{T}_j / \tau)}{\sum_{i=1}^B \exp(\hat{I}_i \cdot \hat{T}_j / \tau)}$$
     $$\mathcal{L}_{\text{CLIP}} = \frac{1}{2} \left( \mathcal{L}_{\text{img}} + \mathcal{L}_{\text{txt}} \right)$$

---

## 3. Objetivos de Aprendizagem (Competências)

Ao final desta aula, o aluno de pós-graduação será capaz de:

1. **Analisar as limitações estruturais** de classificadores supervisionados de vocabulário fechado e justificar a adoção de modelos de vocabulário aberto (*Open-Vocabulary*).
2. **Implementar e rastrear o fluxo tensorial completo** do CLIP em PyTorch, dominando as projeções lineares $W_v$, $W_t$, a normalização $L_2$ e a temperatura aprendível $\tau$.
3. **Calcular analiticamente e simular em código** a perda contrastiva InfoNCE simétrica e a dinâmica dos gradientes entre pares positivos e negativos.
4. **Construir pipelines de classificação *Zero-Shot*** com estratégias de *Prompt Engineering* e *Prompt Ensembling*, mitigando ambiguidades e polissemia.
5. **Avaliar e selecionar estratégias de transferência *downstream*** (*Linear Probe* vs *Full Fine-Tuning* vs *CoOp*), compreendendo os riscos de *Catastrophic Forgetting* e degradação OOD.
6. **Desenvolver soluções práticas de detecção de anomalias industriais** (*Anomaly Detection*) com CLIP no benchmark MVTec AD sem necessitar de dados defeituosos no treino.

---

## 4. Estrutura dos Módulos e Slides da Apresentação

A apresentação interativa em React + Vite (`apresentacao/`) contém 17 slides distribuídos em 6 blocos, acompanhada de versão compilada em PDF de alta definição (`aula_06_apresentacao.pdf`):

| Bloco | Slides | Título / Tema Principal | Tipo de Componente |
| :--- | :--- | :--- | :--- |
| **B1** | 1 | Abertura e Metadados da Aula 06 | `title` |
| **B1** | 2 | O Gargalo da Visão Supervisionada Tradicional: Vocabulário Fechado | `CLIPClosedVocabBottleneckDiagram` |
| **B1** | 3 | A Solução CLIP: Contrastive Language-Image Pre-training | `CLIPMacroArchitectureDiagram` |
| **B1** | 4 | A Matriz de Similaridade e a Perda Contrastiva Simétrica | `CLIPContrastiveLossDiagram` |
| **B1** | 5 | **Lab Interativo 1**: Simulador da Perda Contrastiva e Temperatura $\tau$ | `CLIPContrastiveMatrixLab` |
| **B2** | 6 | Aplicações do Aprendizado Não Supervisionado Multimodal | `CLIPApplicationsEcosystemDiagram` |
| **B2** | 7 | Representações Gerais e a Geometria da Hiperesfera Multimodal | `CLIPMultimodalHypersphereDiagram` |
| **B2** | 8 | Robustez Fora da Distribuição (OOD): Quebrando o Overfitting | `CLIPOODRobustnessDiagram` |
| **B3** | 9 | Zero-Shot Classification: Inferência Direta sem Novos Pesos | `CLIPZeroShotInferenceDiagram` |
| **B3** | 10 | Engenharia de Prompts e Ensembling de Prompts no CLIP | `CLIPPromptEngineeringDiagram` |
| **B3** | 11 | **Lab Interativo 2**: Simulador de Zero-Shot e Prompt Engineering | `CLIPZeroShotLab` |
| **B4** | 12 | Pesos Pré-Treinados para Tarefas Downstream: Linear Probe vs CoOp | `CLIPDownstreamAdaptationDiagram` |
| **B4** | 13 | Visão de Vocabulário Aberto: Detecção (OWL-ViT) e Segmentação (CLIPSeg) | `CLIPOpenVocabularyVisionDiagram` |
| **B5** | 14 | Detecção de Anomalias com CLIP: Paradigma Zero-Shot e OOD Industrial | `CLIPAnomalyDetectionMechanicsDiagram` |
| **B5** | 15 | **Lab Interativo 3**: Simulador de Detecção de Anomalias Industriais | `CLIPAnomalyDetectionLab` |
| **B6** | 16 | **Lab Interativo 4**: Quiz de Fixação de Alto Nível (5 Questões) | `CLIPQuizLab` |
| **B6** | 17 | Do Conceito ao Código: O Roteiro Prático do Notebook | `CLIPNotebookRoadmapDiagram` |

---

## 5. Laboratórios Interativos na Apresentação

1. **Laboratório 1 (`CLIPContrastiveMatrixLab`)**:
   - Simulação numérica de uma matriz de logits $4 \times 4$.
   - Controle dinâmico da temperatura $\tau \in [0.01, 0.50]$.
   - Alternância entre cenários (Convergido, Início com Ruído, Confusão Semântica).
   - Visualização das probabilidades Softmax Img $\to$ Txt e Txt $\to$ Img e valor analítico da perda $\mathcal{L}_{\text{CLIP}}$.

2. **Laboratório 2 (`CLIPZeroShotLab`)**:
   - Classificação Zero-Shot de imagens reais (Guindaste, Pássaro Crane, Husky, Carro Esportivo).
   - Comparação instantânea entre *Single Word*, *Template Visual*, *Desambiguação Rica* e *Prompt Customizado*.
   - Visualização do ranking Top-5 com probabilidades Softmax em tempo real.

3. **Laboratório 3 (`CLIPAnomalyDetectionLab`)**:
   - Estação de inspeção de qualidade industrial com peças do MVTec AD (PCB, Parafusos, Vidro).
   - Ajuste do limiar de anomalia $\theta \in [0.20, 0.80]$ com veredito de aprovação/rejeição.
   - Demonstração prática de detecção de falhas sem treinamento prévio de amostras defeituosas.

4. **Laboratório 4 (`CLIPQuizLab`)**:
   - 5 questões conceituais desafiadoras de pós-graduação com justificativas técnicas detalhadas e placar.

---

## 6. Roteiro do Notebook Prático (`aula_06_clip_openai.ipynb`)

O laboratório prático associado a esta aula foi desenvolvido com foco no **Google Colab** utilizando aceleradores GPU (T4 / A100), estruturado em torno da dualidade metodológica entre **Produção Ágil (High-Level)** e **Engenharia Tensorial (Under the Hood)**:

- **Passo 1 — Setup & Blindagem**: Configuração do ambiente, detecção dinâmica de GPU e carregamento resiliente de imagens da web (`load_image_safely`) com headers de navegador e fallback automático para mitigar erros HTTP 403 no Colab.
- **Passo 2 — Checkpoint Oficial**: Carregamento de `CLIPProcessor` e `CLIPModel` (`openai/clip-vit-base-patch32`) e inspeção dos hiperparâmetros de projeção linear ($W_v, W_t$) e fator de temperatura $\tau$.
- **Passo 3 — Produção com `transformers.pipeline`**: Classificação *Zero-Shot* em 1 linha de código com `pipeline("zero-shot-image-classification")` e uso nativo de templates de prompt (`hypothesis_template`).
- **Passo 4 — Rastreamento Passo a Passo em PyTorch**: Cálculo manual da normalização euclidiana na hiperesfera $S^{D-1}$, produto escalar de cosseno e escalonamento por $\tau$, validando analiticamente a correspondência exata com `outputs.logits_per_image`.
- **Passo 5 — Engenharia de Prompts & Ensembling**: Avaliação comparativa de ganho de confiança entre *Single Word*, *Single Template* e o *Ensemble de 8 Prompts* da OpenAI.
- **Passo 6 — Engine de Busca Semântica (*Cross-Modal Retrieval*)**: Indexação vetorial offline de galeria de imagens e consultas livres em linguagem natural com ranking por produto escalar e exibição gráfica dos resultados.
- **Passo 7 — Visualização Geométrica com t-SNE**: Projeção bidimensional conjunta de vetores de imagens e frases, demonstrando o alinhamento de conceitos afins no espaço compartilhado de 512D.
- **Passo 8 — Detecção de Anomalias Industriais Zero-Shot**: Inspeção de defeitos industriais no benchmark MVTec AD através do pipeline com pares textuais de integridade antagônicos.
- **Passo 9 — Downstream Transfer (*Linear Probe*)**: Treinamento de classificador linear sobre embeddings visuais congelados com Scikit-Learn.

---

## 7. Referências Bibliográficas Seminais

1. **Radford, A., Kim, J. W., Hallacy, C., Ramesh, A., Goh, G., Agarwal, S., ... & Sutskever, I. (2021)**. *Learning Transferable Visual Models From Natural Language Supervision*. In International Conference on Machine Learning (ICML 2021), PMLR, pp. 8748-8763.
2. **Zhou, K., Yang, J., Loy, C. C., & Liu, Z. (2022)**. *Learning to Prompt for Vision-Language Models (CoOp)*. International Journal of Computer Vision (IJCV), 130(9), 2337-2348.
3. **Minderer, M., Gritsenko, A., Stone, A., Neumann, M., Weissenborn, D., Dosovitskiy, A., ... & Houlsby, N. (2022)**. *Simple Open-Vocabulary Object Detection with Vision Transformers (OWL-ViT)*. In European Conference on Computer Vision (ECCV 2022).
4. **Lüddecke, T., & Ecker, A. (2022)**. *Image Segmentation Using Text and Image Prompts (CLIPSeg)*. In Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR 2022), pp. 7086-7096.
5. **Bergmann, P., Batzner, K., Fauser, M., Sattlegger, D., & Steger, C. (2021)**. *The MVTec Anomaly Detection Dataset: A Comprehensive Real-World Dataset for Unsupervised Anomaly Detection*. International Journal of Computer Vision, 129(4), 1038-1059.
6. **Kumar, A., Shenrun, A., Ma, T., & Liang, P. (2022)**. *Fine-Tuning can Distort Pretrained Features and Underperform Out-of-Distribution*. In International Conference on Learning Representations (ICLR 2022).
