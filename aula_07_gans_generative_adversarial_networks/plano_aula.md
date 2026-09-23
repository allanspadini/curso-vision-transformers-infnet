# Plano de Aula — Aula 07: Generative Adversarial Networks (GANs)

**Disciplina:** Visão Computacional com CNNs e Transformers  
**Curso:** Pós-Graduação EAD em Inteligência Artificial & Machine Learning  
**Instituição:** Faculdade Infnet  
**Carga Horária Estimada:** 4 horas (Teoria Estrutural + Laboratórios Interativos + Prática em Python/PyTorch)  
**Instrutor / Coordenador:** Prof. Dr. Allan Spadini  

---

## 1. Ementa e Visão Geral

Estudo aprofundado dos modelos generativos baseados em redes adversariais (**Generative Adversarial Networks - GANs**), com ênfase na macro-arquitetura, soluções estruturais e resolução de gargalos reais em visão computacional biomédica e diagnóstica. Aborda a transição fundamental dos modelos de densidade explícita (PixelCNN autoregressivo e Autoencoders Variacionais - VAEs) para a amostragem implícita feedforward direta em tempo constante $O(1)$.

Disseca a macro e micro-arquitetura convolucional profunda (**DCGAN** de Radford et al., 2015), o rastreamento de tensores em PyTorch ($[B, 100, 1, 1] \to [B, C, 64, 64]$ e vice-versa), o jogo minimax de dois jogadores e a formulação da **heurística não-saturante** ($-\log D$) para eliminação do desvanecimento de gradientes no gerador.

Apresenta os limites das GANs incondicionais (amostragem cega e colapso de modos) e introduz as duas grandes soluções estruturais modernas fundamentadas no livro-texto:
1. **GANs Condicionais (cGAN) & Coloração Virtual (Project 9B: Human Motor Neurons Dataset)**: Injeção de condições/marcadores biológicos $y \in \{\text{DAPI}, \text{NeuN}, \text{GFP}\}$ no gerador $G(z, y)$ e no discriminador $D(x, y)$ para síntese direcionada de classes e fenótipos raros sob demanda sem destruição de amostras.
2. **CycleGAN & Tradução Não-Pareada (Project 9C: Holo2Bright Dataset)**: Mapeamento bidirecional entre microscopia holográfica (Holo) e campo claro (Bright-Field) com dois geradores ($G: X \to Y$, $F: Y \to X$), dois discriminadores ($D_X, D_Y$), a formulação da **Perda de Consistência de Ciclo** ($\mathcal{L}_{cyc}$) para preservação morfológica biunívoca ($F(G(x)) \approx x$) e a Perda de Identidade ($\mathcal{L}_{idt}$).

Conecta a teoria diretamente com a resolução da **escassez de dados em classes raras e diagnósticos críticos**, abordando técnicas de engenharia de treinamento viáveis no Google Colab com GPU T4 (PatchGAN 70x70, Replay Buffer de imagens e Automatic Mixed Precision Float16). Formaliza os 5 maiores problemas técnicos em visão computacional biomédica e estabelece a **avaliação downstream** centrada no **Recall (Sensibilidade)** da classe minoritária como métrica mandatória de governança diagnóstica para redução de Falsos Negativos.

---

## 2. Metodologia Pedagógica: Problema ➔ Solução ➔ Teoria

A aula é estruturada rigorosamente na metodologia pedagógica central do curso:

```
[Situação-Problema do Mundo Real] ➔ [Solução de Engenharia & Intuição] ➔ [Formalismo Teórico & Tensores]
```

### 1. Situação-Problema do Mundo Real (A Dor Prática):
- *O gargalo computacional e a perda de nitidez dos métodos clássicos*: Modelos autoregressivos exigem $O(N^2)$ passes sequenciais lentos pela GPU; VAEs minimizam perdas $L_2$ pixel a pixel que forçam imagens borradas sob incerteza.
- *O desvanecimento de gradiente no início do treino*: O discriminador rejeita amostras falsas com facilidade ($D \approx 0$), fazendo a perda original $\log(1 - D)$ saturar com gradiente nulo em $\theta_g$.
- *A falta de controle na GAN incondicional*: O gerador recebe apenas ruído $z$ aleatório, impedindo a síntese controlada de biomarcadores ou patologias específicas para balancear bases de dados.
- *A ausência de dados pareados na microscopia e clínica*: Células vivas movem-se e alteram sua forma rapidamente, tornando fisicamente impossível obter a mesma célula viva exatamente alinhada sob múltiplos microscópios físicos distintos (holográfico e campo claro), inviabilizando modelos supervisionados como Pix2Pix.
- *O perigo diagnóstico dos Falsos Negativos*: Em bases com 85% a 95% de amostras comuns/saudáveis e 5% a 15% de casos raros/patológicos, classificadores atingem alta acurácia global prevendo apenas a classe majoritária, colapsando o Recall e liberando casos críticos sem detecção.

### 2. Solução de Engenharia (A Sacada Prática & Intuição):
- *Amostragem Implícita Paralela*: Rede feedforward direta $G(z)$ mapeia ruído latente em tensores de imagem em um único passo $O(1)$.
- *Função de Perda Dinâmica Adaptativa*: O discriminador atua como uma loss aprendível que ensina o gerador a corrigir texturas e bordas finas.
- *Heurística Não-Saturante*: Otimizar $-\log D(G(z))$ provê gradiente proporcional a $(1 - D) \approx 1.0$ no início do treino, eliminando a saturação.
- *Condicionamento por Marcador/Classe (cGAN - Project 9B)*: Concatenação de embeddings de marcador $y$ no ruído latente e na entrada convolucional de $D$.
- *Tradução Não-Supervisionada (CycleGAN - Project 9C)*: Ciclo de ida e volta garantido por $\mathcal{L}_{cyc}$, forçando a preservação morfológica e estrutural celular durante a mudança de modalidade óptica.
- *Otimização para Colab T4*: PatchGAN 70x70, Replay Buffer de 50 amostras e Automatic Mixed Precision (`torch.cuda.amp.autocast()`).
- *Data Augmentation Generativo*: Expansão da classe minoritária sinteticamente para balanceamento e salto expressivo no Recall downstream.

### 3. Teoria e Formalismo Rigoroso (Matemática, Tensores e Código):
- *Rastreamento Tensorial DCGAN*:
  - Gerador: $[B, 100, 1, 1] \to [B, 512, 4, 4] \to [B, 256, 8, 8] \to [B, 128, 16, 16] \to [B, 64, 32, 32] \to [B, C, 64, 64]$
  - Discriminador: $[B, C, 64, 64] \to [B, 64, 32, 32] \to [B, 128, 16, 16] \to [B, 256, 8, 8] \to [B, 512, 4, 4] \to [B, 1]$
- *Função de Valor Condicional (cGAN)*:
  $$\min_G \max_D V(D, G) = \mathbb{E}_{x, y}[\log D(x, y)] + \mathbb{E}_{z, y}[\log(1 - D(G(z, y), y))]$$
- *Objetivo Completo da CycleGAN*:
  $$\mathcal{L}(G, F, D_X, D_Y) = \mathcal{L}_{adv}(G, D_Y) + \mathcal{L}_{adv}(F, D_X) + \lambda_{cyc} \mathcal{L}_{cyc}(G, F) + \lambda_{idt} \mathcal{L}_{idt}(G, F)$$
  $$\mathcal{L}_{cyc}(G, F) = \mathbb{E}_{x}[\|F(G(x)) - x\|_1] + \mathbb{E}_{y}[\|G(F(y)) - y\|_1]$$
- *Métrica Clínica de Recall / Sensibilidade*:
  $$\text{Recall} = \frac{\text{TP}}{\text{TP} + \text{FN}}, \quad \text{Especificidade} = \frac{\text{TN}}{\text{TN} + \text{FP}}$$

---

## 3. Objetivos de Aprendizagem (Competências)

Ao final desta aula, o aluno de pós-graduação será capaz de:

1. **Explicar a macro-arquitetura das GANs**, diferenciando a amostragem feedforward $O(1)$ das abordagens autoregressivas e variacionais.
2. **Implementar a arquitetura DCGAN** em PyTorch, dominando convoluções transpostas (`ConvTranspose2d`), convoluções strided e o fluxo de grafos com `.detach()`.
3. **Formular e justificar a perda não-saturante**, demonstrando como $-\log D$ previne o desvanecimento de gradientes em $G$.
4. **Construir GANs Condicionais (cGAN)**, aplicando técnicas de embedding e broadcast espacial para direcionar a síntese de marcadores biológicos e classes minoritárias (Project 9B).
5. **Projetar pipelines de CycleGAN**, justificando matematicamente o papel da perda de consistência de ciclo ($\mathcal{L}_{cyc}$) e de identidade ($\mathcal{L}_{idt}$) para tradução entre modalidades ópticas sem pares alinhados (Project 9C: Holo2Bright).
6. **Aplicar técnicas de engenharia de GPU**, treinando modelos generativos de forma estável no Google Colab T4 com PatchGAN 70x70, Replay Buffer e Automatic Mixed Precision.
7. **Auditar sistemas de visão computacional biomédica**, identificando os 5 problemas técnicos clássicos (desbalanceamento, atalhos de aquisição/shortcut learning, vazamento por paciente/espécime, alucinações e acurácia enganosa).
8. **Avaliar modelos generativos via impacto diagnóstico downstream**, demonstrando experimentalmente o aumento no Recall da classe minoritária e a redução drástica de Falsos Negativos em conjuntos de teste 100% reais.

---

## 4. Conteúdo Programático Detalhado (Roteiro dos 15 Slides)

### Bloco 1: Fundamentação das GANs e Estrutura Macro (Slides 1 a 5)
- **Slide 1:** Título & Apresentação da Aula 07: Da DCGAN à Tradução com CycleGAN.
- **Slide 2:** A Estrutura Macro do Jogo Adversarial: Gerador vs Discriminador (*AdversarialGameMinimaxDiagram*).
- **Slide 3:** A Anatomia Estrutural da DCGAN e Rastreamento de Tensores (*GeneratorDiscriminatorArchitectureDiagram*).
- **Slide 4:** Dinâmica de Treinamento Minimax e a Heurística Não-Saturante (*MinimaxLossAndGradientsDiagram*).
- **Slide 5:** Laboratório Interativo 1: Dinâmica do Jogo Minimax e Gradientes (*GANMinimaxGameLab*).

### Bloco 2: Do Colapso de Modos à Geração Condicional (cGAN) (Slides 6 a 8)
- **Slide 6:** O Limite da GAN Incondicional: Amostragem Cega e Colapso de Modos (*ModeCollapseAnatomyDiagram*).
- **Slide 7:** Solução Estrutural 1: GANs Condicionais (cGAN) & Coloração Virtual (*CGANArchitectureDiagram*).
- **Slide 8:** Laboratório Interativo 2: Síntese sob Demanda com GAN Condicional (Project 9B) (*GANConditionalLab*).

### Bloco 3: CycleGAN e Tradução de Domínio Sem Dados Pareados (Slides 9 a 12)
- **Slide 9:** O Dilema da Tradução de Imagens: Pix2Pix vs Realidade Não-Pareada (*StabilizationTechniquesDiagram*).
- **Slide 10:** Solução Estrutural 2: CycleGAN — Tradução de Domínio Sem Dados Pareados (Project 9C: Holo2Bright) (*CycleGANMacroArchitectureDiagram*).
- **Slide 11:** A Perda de Consistência de Ciclo: Preservação Morfológica em Holo2Bright (*CycleConsistencyLossDiagram*).
- **Slide 12:** Laboratório Interativo 3: Consistência de Ciclo no Holo2Bright (*CycleGANConsistencyLab*).

### Bloco 4: Avaliação Downstream, Impacto no Recall e Fixação (Slides 13 a 15)
- **Slide 13:** Avaliação de Modelos Generativos: Do FID ao Impacto Downstream (*EvaluationMetricsISFIDDiagram*).
- **Slide 14:** Laboratório Interativo 4: Impacto no Recall Downstream com Augmentation Generativa (*DownstreamEvaluationLab*).
- **Slide 15:** Quiz Formativo de Fixação: GANs Estruturais, cGAN, CycleGAN e Métricas de Impacto (*GANQuizLab*).

---

## 5. Laboratórios Interativos em React

A apresentação conta com 5 laboratórios interativos em tempo real desenvolvidos em React:

1. **Laboratório 1 — Dinâmica do Jogo Minimax e Gradientes (`GANMinimaxGameLab`)**:
   - Ajuste em tempo real da separação entre $p_{data}$ e $p_g$.
   - Comparação analítica das curvas de perda e intensidade de gradiente entre $\log(1 - D)$ e a heurística não-saturante $-\log D$.
2. **Laboratório 2 — Síntese sob Demanda com GAN Condicional (`GANConditionalLab`)**:
   - Controle dinâmico do biomarcador alvo (DAPI vs NeuN vs GFP) no contexto do Project 9B.
   - Simulação de amostras sintetizadas em tempo real e telemetria das probabilidades do discriminador condicional $D(x, y)$.
3. **Laboratório 3 — Consistência de Ciclo no Holo2Bright (`CycleGANConsistencyLab`)**:
   - Calibração do hiperparâmetro de consistência de ciclo $\lambda_{cyc}$ (0 a 30).
   - Visualização do tríptico celular (Holográfico Original ➔ Campo Claro Traduzido ➔ Holográfico Reconstruído) e demonstração empírica de distorção morfológica quando $\lambda_{cyc} = 0$.
4. **Laboratório 4 — Impacto no Recall Downstream com Augmentation Generativa (`DownstreamEvaluationLab`)**:
   - Simulação de dataset de teste diagnóstico fixo 100% real (850 Amostras Comuns + 150 Casos Raros).
   - Slider de quantidade de dados sintéticos adicionados ao treino (0 a 3.000 imagens).
   - Atualização em tempo real da Matriz de Confusão, Sensibilidade/Recall (de 58% para > 93%), Falsos Negativos e selo de segurança diagnóstica.
5. **Laboratório 5 — Quiz Formativo de Fixação (`GANQuizLab`)**:
   - 4 questões avançadas de múltipla escolha com justificativa teórica imediata sobre gradientes minimax, cGAN, CycleGAN e governança de Recall clínico.

---

## 6. Critérios de Avaliação e Competências do Projeto da Disciplina

As competências trabalhadas nesta aula preparam integralmente os alunos para o projeto da disciplina:
- **Auditoria Técnica**: Identificação precisa dos 5 problemas técnicos (desbalanceamento, atalhos de aquisição/shortcut learning, vazamento por paciente/espécime, alucinações e acurácia enganosa) e seus respectivos impactos diagnósticos e clínicos.
- **Engenharia Generativa**: Implementação de cGAN ou CycleGAN compatível com Colab T4 (PatchGAN 70x70, AMP Float16, ResNet leve).
- **Validação Diagnóstica Downstream**: Comparação experimental do classificador antes e depois da augmentation sintética, demonstrando o salto no Recall da classe minoritária sem contaminação do teste 100% real.

---

## 7. Cadernos Práticos em Python / PyTorch (Google Colab GPU T4)

A aula disponibiliza três cadernos práticos complementares para experimentação em nuvem:

1. **Caderno 1: Implementação e Treinamento de uma DCGAN do Zero (`aula_07_dcgan_cifar10_treinamento.ipynb`)**:
   - Construção modular do Gerador e Discriminador convolucionais para imagens RGB $32\times 32$ do CIFAR-10.
   - Rastreamento de tensores, inicialização normal $\mathcal{N}(0, 0.02^2)$, heurística não-saturante ($-\log D$) e barreira `.detach()`.
   - Monitoramento visual de épocas com ruído fixo $z_{\text{fixed}}$, curvas de perda e interpolação contínua no espaço latente ($z_A \to z_B$).

2. **Caderno 2: cGAN Condicional & Avaliação de Recall Downstream (`aula_07_gans_generative_adversarial_networks.ipynb`)**:
   - Injeção de condições/marcadores biológicos via embeddings no grafo de $G$ e $D$ (Project 9B).
   - Mitigação de desbalanceamento severo com data augmentation generativo e comprovação experimental do aumento de Recall/Sensibilidade em teste 100% real.

3. **Caderno 3: Tradução de Domínios Não-Pareada com CycleGAN (`aula_07_cyclegan_holo2bright_traducao_dominios.ipynb`)**:
   - Arquitetura quádrupla com dois geradores ResNet (6 blocos residuais) e dois discriminadores PatchGAN $70\times 70$ (Project 9C: Holo2Bright).
   - Formulação e otimização da Perda de Consistência de Ciclo ($\mathcal{L}_{cyc} = 10.0$), Perda de Identidade ($\mathcal{L}_{idt} = 5.0$) e perda LSGAN.
   - Replay Buffer de imagens históricas (50 amostras) e avaliação bidirecional completa dos ciclos ópticos ($X \to Y \to X$ e $Y \to X \to Y$).
