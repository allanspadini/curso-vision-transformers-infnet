# Plano de Aula — Aula 08: Avaliação de Modelos Generativos (FID) e Síntese Teórica da Disciplina

**Disciplina:** Visão Computacional com CNNs e Transformers  
**Curso:** Pós-Graduação EAD em Inteligência Artificial & Machine Learning  
**Instituição:** Faculdade Infnet  
**Carga Horária Estimada:** 4 horas (Teoria Rigorosa + Laboratórios Interativos + Prática em Python/PyTorch)  
**Instrutor / Coordenador:** Prof. Dr. Allan Spadini  

---

## 1. Ementa e Visão Geral

Estudo aprofundado da métrica padrão da literatura para avaliação quantitativa de modelos generativos: o **Fréchet Inception Distance (FID)** de Heusel et al. (NeurIPS 2017). Dissecação das limitações estruturais de métricas supervisionadas pixel a pixel (MSE, PSNR, SSIM) e do Inception Score (IS) original. Análise da extração de representações semânticas contínuas na camada de pooling global médio (`pool3`, dimensão 2048) da rede Inception-v3 pré-treinada. Formalização matemática rigorosa da distância de Wasserstein-2 entre distribuições normais multivariadas $\mathcal{N}(\mu_r, \Sigma_r)$ e $\mathcal{N}(\mu_g, \Sigma_g)$, com decomposição ortogonal entre deslocamento de médias $||\Delta \mu||_2^2$ e divergência de covariância $\text{Tr}(\Sigma_r + \Sigma_g - 2(\Sigma_r \Sigma_g)^{1/2})$. Boas práticas de engenharia: viés amostral assintótico em função de $N$ ($N \ge 50.000$), sensibilidade a pré-processamento e reprodutibilidade com a biblioteca `clean-fid`.

Revisão e síntese teórica integrada de todas as arquiteturas estudadas no curso através de **6 Grandes Marcos Evolutivos**, conectando os avanços de engenharia e formulações matemáticas que definem o estado da arte:
1. **Marco 1 — CNNs Profundas (ResNet) & U-Net**: A superação do problema da degradação em redes profundas via atalhos residuais de identidade $x + F(x)$ e a preservação de detalhes espaciais finos em segmentação densa com Skip Connections.
2. **Marco 2 — O Transformer Canônico & BERT**: A superação dos gargalos sequenciais de RNNs através de projeções Query, Key e Value, Scaled Dot-Product Attention $O(1)$ e o token agregador de sequência `[CLS]`.
3. **Marco 3 — Vision Transformer (ViT)**: O fatiamento em patches discretos $16 \times 16$, projeção linear de embeddings em $\mathbb{R}^{768}$, campo receptivo global instantâneo e a dispensa de vieses indutivos convolucionais.
4. **Marco 4 — Swin Transformer**: A reconciliação entre a auto-atenção e a pirâmide hierárquica multiescala via *Patch Merging* em 4 estágios e janelas locais deslocadas (W-MSA / SW-MSA) com complexidade estritamente linear $O(M^2 \cdot N)$.
5. **Marco 5 — CLIP (Contrastive Language-Image Pre-training)**: Arquitetura Dual-Encoder (Visão + Texto), projeção linear para espaço latente compartilhado $\mathbb{R}^{512}$, normalização $L_2$ mandatória na hiper-esfera unitária $\mathbb{S}^{511}$, perda InfoNCE simétrica e classificação *Zero-Shot* em vocabulário aberto.
6. **Marco 6 — Modelos Generativos & U-Net de Difusão Latente**: A superação da instabilidade minimax das GANs através do processo estocástico reverso de predição de ruído no espaço latente de VAE, integrando Convoluções Residuais (Aula 1), Skip Connections (Aula 1), Auto-Atenção Espacial (Aulas 2 a 4), Cross-Attention com prompts de texto do CLIP (Aula 6) e Atenção Temporal 1D para vídeo (Aula 7), avaliada com rigor pelo FID.

Complementarmente, consolidam-se as diretrizes de governança técnica em visão computacional:
- Interpretabilidade no ViT via extração de Attention Maps do token `[CLS]` e auditoria de atalhos espúrios (*shortcut learning*).
- Calibração de limiares de corte ($\tau$) na hiper-esfera multimodal do CLIP e engenharia de prompts.
- Paradigmas de Transfer Learning em CNNs (*Feature Extraction* vs *Fine-Tuning*) e riscos semânticos de Data Augmentation.
- Gerenciamento de desbalanceamento severo de classes, primazia do Recall, oversampling generativo com teste 100% real, prevenção de vazamento de dados por grupos (*GroupKFold*) e mitigação de *Domain Shift*.

---

## 2. Metodologia Pedagógica: Problema ➔ Solução ➔ Teoria

A aula é estruturada rigorosamente na metodologia pedagógica central do curso:

```
[Situação-Problema do Mundo Real] ➔ [Solução de Engenharia & Intuição] ➔ [Formalismo Teórico & Tensores]
```

### 1. Situação-Problema do Mundo Real (A Dor Prática):
- *O dilema da avaliação generativa*: Modelos generativos sintetizam imagens inéditas a partir de ruído; não há imagens ground-truth pareadas 1:1, inviabilizando MSE e PSNR. O Inception Score não compara com dados reais e mascara o colapso de modo intra-classe.
- *O gargalo do campo receptivo em CNNs*: Redes convolucionais acumulam contexto muito lentamente através de filtros locais 3×3, exigindo redes excessivamente profundas para correlacionar regiões distantes de uma cena.
- *A explosão computacional de pixels em Transformers*: Aplicar atenção em pixels brutos de $224 \times 224$ gera sequências de 50.176 tokens, explodindo a memória GPU em $O(N^2)$ (2,5 bilhões de pares por camada).
- *A rigidez de vocabulário fechado*: Classificadores clássicos limitam-se a $K$ classes numéricas discretas (ex: 1.000 classes do ImageNet), exigindo retreino completo para qualquer conceito novo.
- *O perigo da acurácia global enganosa*: Em cenários com classes raras (5% a 10%), um modelo que prediz 100% a classe majoritária atinge 90% a 95% de acurácia global com **Recall = 0%**, liberando casos críticos sem detecção.
- *O vazamento silencioso de dados (Data Leakage)*: Divisões aleatórias em datasets com múltiplas imagens da mesma fonte/câmera/sessão inflam a acurácia para 98%, colapsando para 40% em ambiente de produção.

### 2. Solução de Engenharia (A Sacada Prática & Intuição):
- *Avaliação no Espaço de Conceitos (FID)*: Passar imagens reais e geradas pela mesma rede Inception-v3 e comparar as distribuições estatísticas contínuas das features em $\mathbb{R}^{2048}$.
- *Atalhos Residuais e Skip Connections*: Permitir fluxo direto de gradientes $x + F(x)$ e concatenação de mapas espaciais finos em U-Nets.
- *Fatiamento em Patches (ViT)*: Fatiar a imagem em blocos $16 \times 16$, convertendo $224 \times 224$ em apenas 196 tokens tratáveis.
- *Janelas Deslocadas (Swin)*: Restringir a atenção a janelas locais de $7 \times 7$ com deslocamento alternado entre camadas, atingindo complexidade linear.
- *Projeção em Hiperesfera Unitária (CLIP)*: Normalizar vetores de imagem e texto com norma $L_2$ e alinhar via perda contrastiva InfoNCE.
- *A U-Net de Difusão Latente*: Reconciliar convoluções, atenção espacial, condicionamento multimodal e atenção temporal em um framework generativo estável.

### 3. Teoria e Formalismo Rigoroso (Matemática, Tensores e Código):
- *Distância de Fréchet / Wasserstein-2*:
  $$\text{FID} = ||\mu_r - \mu_g||_2^2 + \text{Tr}\left(\Sigma_r + \Sigma_g - 2(\Sigma_r \Sigma_g)^{1/2}\right)$$
- *Scaled Dot-Product Attention*:
  $$\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{Q K^T}{\sqrt{d_k}}\right) V$$
- *Extração de Atenção ViT*:
  $$A = \text{softmax}\left(\frac{Q K^T}{\sqrt{d_k}}\right) \in \mathbb{R}^{B \times h \times 197 \times 197}, \quad w_{\text{cls}} = A[:, h, 0, 1:197] \xrightarrow{\text{view}} [14, 14] \xrightarrow{\text{bilinear}} [224, 224]$$
- *Similaridade Multimodal Normalizada (CLIP)*:
  $$S_{i, j} = \frac{v_i \cdot u_j}{||v_i||_2 ||u_j||_2} = \tilde{v}_i^T \tilde{u}_j = \cos(\theta)$$
- *Métricas Diagnósticas e Balanced Accuracy*:
  $$\text{Recall} = \frac{\text{TP}}{\text{TP} + \text{FN}}, \quad \text{Balanced Accuracy} = \frac{1}{C}\sum_{c=1}^C \frac{\text{TP}_c}{N_c}$$

---

## 3. Objetivos de Aprendizagem (Competências)

Ao final desta aula, o aluno de pós-graduação será capaz de:

1. **Explicar e formular a métrica FID**, decompondo algebricamente a distância Wasserstein-2 entre centroides médios $||\Delta \mu||_2^2$ e divergência de covariância $\text{Tr}(\dots)$.
2. **Identificar o viés amostral do FID**, justificando o uso de $N \ge 50.000$ amostras e ferramentas padronizadas (`clean-fid`, `torch-fidelity`).
3. **Mapear a evolução arquitetural da disciplina através dos 6 grandes marcos**, justificando como cada modelo (ResNet/U-Net ➔ Transformer ➔ ViT ➔ Swin ➔ CLIP ➔ Difusão) resolveu gargalos conceituais do modelo predecessor.
4. **Extrair e visualizar Attention Maps no ViT**, isolando os pesos da linha do token `[CLS]`, remodelando espacialmente e interpretando criticamente focos semânticos versus atalhos espúrios (*shortcut learning*).
5. **Construir pipelines multimodais com CLIP**, manipulando embeddings normalizados $L_2$, calculando similaridades de cosseno e calibrando empiricamente limiares de corte ($\tau$).
6. **Diferenciar Feature Extraction e Fine-Tuning em CNNs**, aplicando congelamento seletivo de grafos com `requires_grad = False` e taxas de aprendizado diferenciais.
7. **Avaliar criticamente pipelines de Data Augmentation**, identificando transformações benéficas e riscos de corrupção semântica em domínios sensíveis à cor e orientação.
8. **Diagnosticar e mitigar o Paradoxo da Acurácia sob desbalanceamento severo**, priorizando o Recall da classe minoritária e desenhando experimentos de oversampling generativo com validação downstream blindada em dados 100% reais.
9. **Auditar falhas de generalização em produção**, aplicando divisões estratificadas por grupo (*Group Split*) para eliminar vazamento de dados e planejando testes de robustez contra *Covariate Shift*.

---

## 4. Conteúdo Programático Detalhado (Roteiro dos 23 Slides)

### Bloco 1: A Métrica FID & Avaliação Estatística de GANs (Slides 1 a 6)
- **Slide 1**: Capa da Aula e Apresentação do Curso
- **Slide 2**: Mapa Conceitual da Aula (Roadmap dos 4 Blocos Pedagógicos — 23 Slides)
- **Slide 3**: O Dilema da Avaliação Generativa: Por que MSE e Inception Score Falham
- **Slide 4**: A Engenharia do FID: Extração de Features no Espaço Latente Inception-v3 (`pool3`, $\mathbb{R}^{2048}$)
- **Slide 5**: **Laboratório Interativo 1**: Simulador Paramétrico da Distância de Fréchet (FID)
- **Slide 6**: Práticas de Engenharia do FID: Tamanho Amostral $N$, Viés Assintótico e Padronização (`clean-fid`)

### Bloco 2: A Evolução das Arquiteturas Neurais: Os 6 Grandes Marcos (Slides 7 a 12)
- **Slide 7**: Marco 1 — CNNs Profundas (ResNet) & U-Net: A Era dos Convolutivos e Conexões Residuais
- **Slide 8**: Marco 2 — O Transformer Canônico & BERT: O Advento da Auto-Atenção Global e Encoders
- **Slide 9**: Marco 3 — Vision Transformer (ViT): A Conquista da Atenção Pura em Visão sem Convoluções
- **Slide 10**: Marco 4 — Swin Transformer: Hierarquia Piramidal e Janelas Deslocadas Lineares
- **Slide 11**: Marco 5 — CLIP: Alinhamento Multimodal Visão-Texto e Aprendizado Zero-Shot
- **Slide 12**: Marco 6 — Modelos Generativos & Difusão: A Grande Convergência Arquitetural do Curso

### Bloco 3: Interpretabilidade & Multimodalidade na Prática (Slides 13 a 16)
- **Slide 13**: Interpretabilidade em ViT: Extração e Visualização de Mapas de Atenção do Token `[CLS]`
- **Slide 14**: **Laboratório Interativo 2**: Inspetor de Mapas de Atenção do Vision Transformer (ViT-B/16)
- **Slide 15**: Busca Semântica com CLIP: Calibração de Thresholds e Prompt Engineering
- **Slide 16**: **Laboratório Interativo 3**: Simulador de Busca Semântica e Calibração de Thresholds no CLIP

### Bloco 4: Governança, Desbalanceamento e Validação Científica (Slides 17 a 23)
- **Slide 17**: Transfer Learning em CNNs: Feature Extraction vs Fine-Tuning de Grafo Completo
- **Slide 18**: Estratégias de Data Augmentation: Racional Teórico vs Riscos de Corrupção Semântica
- **Slide 19**: Avaliação Multiclasse: A Desagregação da Acurácia Global e a Acurácia por Classe
- **Slide 20**: O Paradoxo da Acurácia sob Desbalanceamento Severo e a Primazia do Recall
- **Slide 21**: Estratégias Generativas (cGAN & CycleGAN) e o Protocolo Científico de Avaliação Downstream
- **Slide 22**: Armadilhas Metodológicas em Visão: Divisão Estratificada, Vazamento por Grupos e Domain Shift
- **Slide 23**: **Laboratório Interativo 4**: Quiz de Fixação da Disciplina (5 Questões Consolidadas)

---

## 5. Recursos Didáticos & Ferramentas

- **Apresentação de Slides**:
  - Versão Web Interativa (React + Vite, 23 slides 16:9, suporte a tela cheia, drawer de anotações do apresentador e visão geral em grade).
  - Versão em PDF para Leitura Offline e Impressão (`aula_08_apresentacao.pdf`, 23 páginas em alta resolução).
- **Roteiro do Apresentador**: Narração completa e profunda slide por slide no arquivo `falas_apresentador.md`.
- **Laboratórios Interativos em React**:
  1. `FIDSimulatorLab.jsx`: Manipulação dinâmica de centroides, covariância e diagnóstico de colapso de modo.
  2. `ViTAttentionInspectorLab.jsx`: Inspeção espacial de mapas de atenção por camada e cabeça.
  3. `CLIPSearchThresholdLab.jsx`: Busca semântica multimodal com variação de limiar de similaridade.
  4. `FinalCourseQuizLab.jsx`: Quiz interativo com justificativas imediatas para consolidação conceitual.
- **Cadernos Práticos em PyTorch (Google Colab GPU T4)**:
  1. `aula_08_metricas_fid_e_sintese_visao_computacional.ipynb`: Cálculo do FID do zero via Inception-v3 e scipy, extração de mapas de atenção do token `[CLS]` em ViT com interpolação bicúbica, busca multimodal e calibração de thresholds com CLIP, e protocolo experimental de avaliação de Recall sob desbalanceamento severo.
  2. `aula_08_unet_condicionamento_texto_e_consistencia_video.ipynb`: Geração de imagens fotorrealistas no espaço latente via Hugging Face `diffusers` (SD-Turbo / SD v1.5); fine-tuning eficiente de adaptadores de baixo posto LoRA (`peft`) nas camadas de Cross-Attention da U-Net; e transição para síntese de sequências de vídeo temporalmente consistentes através do framework **AnimateDiff** (`MotionAdapter` com auto-atenção temporal 1D), eliminando o *temporal flickering* e exportando arquivos GIF animados.
