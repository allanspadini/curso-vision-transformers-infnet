# Plano de Aula — Aula 01: CNN Architectures

**Disciplina:** Visão Computacional com CNNs e Transformers  
**Curso:** Pós-Graduação em Inteligência Artificial & Machine Learning  
**Instituição:** Faculdade Infnet  
**Carga Horária:** 3 horas presenciais/síncronas + atividades assíncronas de laboratório  

---

## 1. Ementa da Aula
Evolução histórica e moderna das Redes Neurais Convolucionais (CNNs). Limitações das redes rasas e o paradoxo da degradação em redes profundas. Arquiteturas fundamentais: LeNet-5, AlexNet, GoogLeNet (Inception e convoluções 1x1), ResNet (conexões residuais e atalhos de identidade), Xception (convoluções espacialmente separáveis) e SENet (atenção por canal via Squeeze-and-Excitation). Outras arquiteturas influentes: VGG, DenseNet, MobileNet e EfficientNet. Critérios de seleção de arquiteturas e trade-offs de produção (Acurácia vs FLOPs vs Latência vs VRAM). Engenharia de memória GPU: inferência vs treinamento e redes reversíveis (RevNets). Implementação de blocos residuais em PyTorch. Modelos pré-treinados e Transfer Learning com a API moderna do TorchVision (`weights.transforms()`). Expansão de tarefas de visão: Classificação + Localização, Detecção de Objetos (YOLO vs Faster R-CNN, IoU, NMS), Rastreamento Espaçotemporal (DeepSORT) e Segmentação Semântica (U-Net).

---

## 2. Objetivos de Aprendizagem

### Objetivo Geral
Capacitar os alunos a compreender a evolução arquitetural das CNNs, analisar trade-offs computacionais e de memória na GPU, implementar arquiteturas modulares em PyTorch e aplicar modelos pré-treinados via Transfer Learning em problemas reais de visão computacional (classificação, detecção, tracking e segmentação).

### Objetivos Específicos
Ao final desta aula, o estudante será capaz de:
1. **Diferenciar** as inovações arquiteturais que marcaram cada geração de CNNs (ReLU/Dropout no AlexNet, 1x1 conv no Inception, Skip Connections no ResNet, Depthwise Separable no Xception, Channel Attention no SENet).
2. **Explicar matematicamente** por que o atalho de identidade ($\mathcal{F}(x) + x$) resolve o problema de desvanecimento de gradiente e degradação em redes com centenas de camadas.
3. **Calcular e estimar** a alocação de memória VRAM da GPU diferenciando a pegada estática de inferência versus a retenção de ativações e estados de momentos de otimizadores (Adam) no treinamento.
4. **Implementar em PyTorch** classes modulares para `BasicBlock` e redes residuais completas herdando de `torch.nn.Module`.
5. **Aplicar Transfer Learning** utilizando a API moderna de `torchvision.models` (Weights enum), decidindo adequadamente entre *Feature Extraction* e *Fine-Tuning* com taxas de aprendizado diferenciais.
6. **Distinguir conceitual e operacionalmente** as tarefas de Classificação, Localização de Bounding Box, Detecção de Múltiplos Objetos, Rastreamento Temporal e Segmentação Pixel a Pixel.

---

## 3. Metodologia Pedagógica

A aula segue o framework pedagógico estruturado em 4 etapas consecutivas:

```
[ 1. Situação-Problema ] ──► [ 2. Solução de Engenharia ] ──► [ 3. Fundamento Teórico ] ──► [ 4. Aplicação Prática ]
```

1. **Situação-Problema:** Apresentação dos gargalos práticos reais (ex: platô de capacidade de redes rasas, degradação ao empilhar camadas, estouro de memória de GPU, escassez de dados para treinar do zero).
2. **Solução de Engenharia:** Análise intuitiva das sacadas arquiteturais propostas pelos autores seminais.
3. **Fundamento Teórico:** Formalização matemática leve (fluxo de derivadas parciais, operações matriciais 1x1, cálculo de IoU, perdas multitarefa).
4. **Aplicação Prática:** Demonstração interativa e codificação hands-on com PyTorch e TorchVision.

---

## 4. Conteúdo Programático Detalhado (Roteiro dos 23 Slides)

### Bloco 1: A Situação-Problema e a Linhagem Histórica (Slides 1 a 9)
- **Slide 1:** Visão Geral da Disciplina e Aula 1.
- **Slide 2:** O Limite das Redes Rasas: Platô de Capacidade Representacional (*ShallowPlateauDiagram*).
- **Slide 3:** O Paradoxo da Degradação e Desvanecimento de Gradiente (*DegradationVanishingDiagram*).
- **Slide 4:** O Mapa das Grandes Soluções Arquiteturais (Bottlenecks 1x1, ResNet, Separáveis, Atenção).
- **Slide 5:** LeNet-5: A Gênese das Redes Convolucionais (*LeNetVisualizer*).
- **Slide 6:** AlexNet: O Ponto de Virada do Deep Learning (*AlexNetVisualizer*).
- **Slide 7:** GoogLeNet: A Anatomia do Módulo Inception (*InceptionModuleVisualizer*).
- **Slide 8:** GoogLeNet: Arquitetura Completa e Fluxo em Cascata (*GoogLeNetArchitectureVisualizer*).
- **Slide 9:** O Truque da Convolução 1x1 (*Inception1x1Diagram*).

### Bloco 2: Arquiteturas Modernas e Eficiência Extrema (Slides 10 a 14)
- **Slide 10:** ResNet: O Conceito do Aprendizado Residual e Skip Connections (*ResidualConceptDiagram*).
- **Slide 11:** ResNet: A Revolução Residual ($F(x) + x$) — *Laboratório Interativo 1 (`ResidualExplorer`)*.
- **Slide 12:** Xception: Convoluções Espacialmente Separáveis (*DepthwiseSeparableDiagram*).
- **Slide 13:** Galeria de Arquiteturas Notáveis: VGG, DenseNet, MobileNet e EfficientNet.
- **Slide 14:** Como Escolher a Arquitetura Certa em Produção — *Laboratório Interativo 2 (`ArchitectureSelector` / Tabela 12-3)*.

### Bloco 3: Hardware, VRAM e Transfer Learning com PyTorch (Slides 15 a 17)
- **Slide 15:** Memória GPU RAM: Inferência vs Treinamento (*VRAMBreakdownDiagram*).
- **Slide 16:** Modelos Pré-Treinados no TorchVision: Weights Enum e `weights.transforms()`.
- **Slide 17:** Transfer Learning na Prática: Feature Extraction vs Fine-Tuning — *Laboratório Interativo 3 (`TransferLearningSimulator`)*.

### Bloco 4: Além da Classificação — O Espectro Completo da Visão (Slides 18 a 23)
- **Slide 18:** Classificação com Localização de Objeto Único (*DualHeadDiagram*).
- **Slide 19:** Detecção de Múltiplos Objetos: Two-Stage (Faster R-CNN) vs One-Stage (YOLO/SSD), IoU e NMS.
- **Slide 20:** Rastreamento de Objetos (Object Tracking): DeepSORT, Filtro de Kalman, ReID e Oclusão (*ObjectTrackingVisualizer*).
- **Slide 21:** Segmentação Semântica: U-Net e Skip Connections Densas (*UNetDiagram*).
- **Slide 22:** Comparativo Integrado das 5 Grandes Tarefas — *Laboratório Interativo 4 (`VisionTasksShowcase`)*.
- **Slide 23:** Quiz Interativo de Fixação — *Laboratório Interativo 5 (`QuizComponent`)*.

---

## 5. Recursos Didáticos & Tecnologias
- **Apresentação de Slides:**
  - Versão Web Interativa (React + Vite, 23 slides, KaTeX e 5 simuladores interativos).
  - Versão em PDF para Impressão e Leitura Offline (`aula_01_apresentacao.pdf`).
- **Roteiro do Professor (`falas_apresentador.md`):** Script completo de narração slide a slide.
- **Notebooks Práticos Executáveis (Google Colab):**
  - `aula_01_cnn_architectures.ipynb`: ResNet-34 do Zero e Transfer Learning com CIFAR-10.
  - `aula_01_faster_rcnn.ipynb`: Detecção Two-Stage com Faster R-CNN (ResNet-50 FPN V2), download via `kagglehub` e Motor de Inferência Visual.
  - `aula_01_yolo_detection.ipynb`: Detecção One-Stage com YOLO (Ultralytics), Inferência Zero-Shot Off-the-Shelf e Fine-Tuning com `kagglehub`.
  - `aula_01_semantic_segmentation.ipynb`: Segmentação Semântica com U-Net do Zero, DeepLabV3 Pré-Treinado, Cityscapes via `kagglehub` e Alpha-Blend Overlay.

---

## 6. Referências Bibliográficas

1. **LeCun, Y., Bottou, L., Bengio, Y., & Haffner, P.** (1998). *Gradient-based learning applied to document recognition*. Proceedings of the IEEE, 86(11), 2278-2324.
2. **Krizhevsky, A., Sutskever, I., & Hinton, G. E.** (2012). *ImageNet classification with deep convolutional neural networks*. Advances in Neural Information Processing Systems (NeurIPS), 25, 1097-1105.
3. **Szegedy, C., et al.** (2015). *Going deeper with convolutions*. IEEE Conference on Computer Vision and Pattern Recognition (CVPR), 1-9.
4. **He, K., Zhang, X., Ren, S., & Sun, J.** (2016). *Deep residual learning for image recognition*. IEEE Conference on Computer Vision and Pattern Recognition (CVPR), 770-778.
5. **Chollet, F.** (2017). *Xception: Deep learning with depthwise separable convolutions*. IEEE Conference on Computer Vision and Pattern Recognition (CVPR), 1251-1258.
6. **Hu, J., Shen, L., & Sun, G.** (2018). *Squeeze-and-excitation networks*. IEEE Conference on Computer Vision and Pattern Recognition (CVPR), 7132-7141.
7. **Gomez, A. N., Ren, M., Urtasun, R., & Grosse, R. B.** (2017). *The Reversible Residual Network: Backpropagation Without Storing Activations*. Advances in Neural Information Processing Systems (NeurIPS), 30.
8. **Ronneberger, O., Fischer, P., & Brox, T.** (2015). *U-Net: Convolutional networks for biomedical image segmentation*. Medical Image Computing and Computer-Assisted Intervention (MICCAI), 234-241.
9. **Redmon, J., Divvala, S., Girshick, R., & Farhadi, A.** (2016). *You only look once: Unified, real-time object detection*. IEEE Conference on Computer Vision and Pattern Recognition (CVPR), 779-788.
10. **Wojke, N., Bewley, A., & Paulus, D.** (2017). *Simple online and realtime tracking with a deep association metric (DeepSORT)*. IEEE International Conference on Image Processing (ICIP), 3645-3649.
