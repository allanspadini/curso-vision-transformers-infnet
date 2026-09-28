Uso de IAs: Sinal Verde 🟢
Neste trabalho, os alunos são incentivados a explorar o uso de ferramentas baseadas em IA para concluir as tarefas. Todas as fontes, incluindo ferramentas de IA, devem ser devidamente citadas. O uso de IA sem a devida citação será considerado má conduta acadêmica e estará sujeito à aplicação do código disciplinar. Observe que os resultados da IA podem ser tendenciosos e imprecisos. É sua responsabilidade garantir que as informações que você usa da IA sejam precisas. Aprender como usar ferramentas baseadas em IA de maneira cuidadosa e estratégica contribui para o desenvolvimento das habilidades, refinamento de seu trabalho e prepara o aluno para sua futura carreira.

Nesta disciplina você passa a ser um engenheiro que decide qual arquitetura usar, por quê e como adaptá-la ao problema. O projeto é composto por quatro atividades que cobrem o arco completo da disciplina: um projeto livre com Vision Transformers, busca semântica com CLIP, transfer learning com CNNs e dois estudos de caso onde você diagnostica falhas em projetos reais.

Em todas as atividades, executar o código é o pré-requisito, não o objetivo. A avaliação considera a qualidade da análise e a capacidade de justificar escolhas técnicas.

Atividade 1 Projeto Livre: Visão Computacional com Transformers

Escolha um problema de classificação de imagens de domínio real: saúde, varejo, indústria ou satélite, em qualquer área relevante para sua trajetória profissional. O dataset precisa ter ao menos duas classes e imagens rotuladas disponíveis publicamente.

Implemente a melhor solução que conseguir, aplicando os conceitos desta disciplina: mecanismo de attention, Vision Transformer construído sobre esses módulos e estratégias de pré-treinamento e fine-tuning. Não há arquitetura prescrita: a escolha é sua. O código deve rodar no Colab com o recurso de GPU (T4 ativado).

A entrega inclui os resultados obtidos com métricas e visualizações e a justificativa técnica de cada decisão: por que essa arquitetura para esse domínio, por que esses hiperparâmetros, o que os resultados revelam e o que você mudaria. Visualize os attention weights de ao menos um attention head e interprete por escrito o que o modelo aprende a ponderar no domínio escolhido.

Atividade 2 Reconhecimento Semântico em Publicidade Visual com CLIP

O ADS-16 (Computational Advertising Dataset) contém imagens de anúncios distribuídas em 16 categorias de produto. Nesta atividade você usa a arquitetura CLIP para extrair inteligência semântica do corpus sem treinar nenhum modelo: apenas os embeddings pré-treinados e consultas em linguagem natural.

2.1 — Ranking de objetos por frequência semântica

Dado o corpus de imagens do ADS-16 (ou subconjunto de ao menos 500 imagens selecionadas de forma representativa), implemente um pipeline CLIP que:

Para cada imagem, calcule a cosine similarity com ao menos 20 descrições de objetos ou conceitos distintos (ex: "a car", "a person", "food product", "outdoor scenery", "text and logo").
Retorne um ranking dos objetos mais frequentemente presentes com score médio de similaridade e frequência de ocorrência acima de um threshold definido e justificado.
Visualize os 5 objetos mais encontrados com exemplos de imagens do corpus confirmando cada categoria.
2.2 — Busca semântica por consulta textual

Implemente busca de imagens por texto: dada uma consulta em linguagem natural, retorne as top-5 imagens mais similares do corpus. Execute ao menos 8 consultas variando em especificidade (de genérico a específico, de concreto a abstrato). Para cada consulta, analise se o modelo recupera o que a consulta descreve ou interpreta de forma inesperada.

Atividade 3 Classificador com CNN Pré-treinada

O dataset disponível em kaggle.com/datasets/pavansanagapati/images-dataset contém 1.800 imagens distribuídas em categorias de objetos. Nesta atividade você constrói um classificador supervisionado por transfer learning usando uma CNN pré-treinada.

3.1 — Transfer learning por feature extraction

Carregue uma CNN pré-treinada (ResNet-50, EfficientNet-B0 ou equivalente compatível com Colab T4). Congele o backbone, substitua o classification head pelo número de classes do dataset e treine apenas a nova camada (um treino). Reporte accuracy por classe e accuracy global e documente as curvas de loss e accuracy por epoch.

3.2 — Análise e propostas de melhoria

Com base nos resultados obtidos, discuta por escrito quais melhorias você testaria e por quê. Considere entre as possibilidades:

Geometric augmentation: flip horizontal, rotação leve, recorte aleatório.
Color augmentation: color jitter, conversão aleatória para grayscale.
Scale variation: resize aleatório com crop, multi-scale training.
Normalização: média e desvio padrão do pré-treinamento do modelo escolhido (ex: ImageNet).
Para cada opção considerada, justifique se ela seria benéfica para as categorias do dataset e aponte para quais classes ela poderia introduzir distorções ou prejudicar a aprendizagem.

Atividade 4 Estudos de Caso

4.1 — Detecção de COVID-19 em Radiografias de Tórax

A triagem automatizada de doenças respiratórias em radiografias de tórax é uma das aplicações de maior impacto clínico em IA médica. Durante a pandemia de COVID-19, sistemas de triagem por imagem foram desenvolvidos em resposta à sobrecarga dos sistemas de saúde, mas muitos projetos apresentaram falhas metodológicas graves que os tornaram clinicamente inúteis ou perigosos. Nour & Tariq (2023), em estudo publicado no Scientific Reports (Nature Publishing Group), documentaram que modelos com alta accuracy global frequentemente apresentavam recall inferior a 60% para a classe COVID-19 em datasets desbalanceados, identificando augmentation insuficiente, desbalanceamento não tratado e métricas inadequadas como causas recorrentes. O artigo está disponível em: https://www.nature.com/articles/s41598-023-37743-4

Um grupo anterior desenvolveu um sistema de triagem de pneumonia e COVID-19 e encerrou o projeto com os resultados marcados como "promissores", mas o time clínico relatou que o modelo "ignora casos positivos". O projeto usou 1.200 imagens de raio-X em três classes: Normal (840), Pneumonia (240) e COVID-19 (120), com divisão 80/20 sem estratificação. O modelo foi uma ResNet-18 sem pré-treinamento, treinada com SGD, learning rate fixo de 0.01 e 15 epochs, sem augmentation. Avaliação por accuracy global apenas. Resultado reportado: 93% de accuracy de treino, 61% de validação.

Analise o projeto e identifique ao menos cinco problemas técnicos com seus impactos clínicos esperados. Escolha e implemente uma abordagem com redes generativas para endereçar a escassez de imagens da classe COVID-19 (GAN condicional para augmentation sintética ou CycleGAN para tradução entre domínios, compatível com Colab T4). Avalie experimentalmente o impacto na recall da classe minoritária comparando treinos com e sem as imagens geradas. Escreva um plano de melhoria integrado endereçando todos os problemas identificados.

4.2 — Transfer Learning para Análise de Tráfego Urbano

O transfer learning tornou-se a estratégia padrão para adaptar modelos pré-treinados de visão a novos domínios. Em análise de tráfego urbano, o raciocínio parece direto: modelos treinados em ImageNet reconhecem objetos visuais e veículos são objetos visuais. Na prática, porém, aplicações de monitoramento de fluxo real esbarram em problemas que modelos de visão genéricos sistematicamente falham em endereçar. Referência sobre os desafios da área: https://www.meegle.com/en_us/topics/transfer-learning/transfer-learning-for-traffic-analysis

Um grupo construiu um sistema de classificação de fluxo de tráfego, categorizando câmeras urbanas como "livre", "moderado" ou "congestionado", usando ResNet-50 pré-treinada em ImageNet com fine-tuning em 800 frames rotulados de 12 câmeras distintas. O sistema apresentou accuracy de 78% em validação e foi implantado. Em produção, falhas sistemáticas emergiram em condições de chuva, períodos noturnos e câmeras com ângulos não presentes no treino.

Analise o projeto, identifique ao menos quatro problemas técnicos e metodológicos com seus impactos operacionais esperados e discuta por escrito como você abordaria cada um. Não é necessário implementar nenhuma solução.

Entregáveis
Notebooks ou scripts reprodutíveis:

Um por atividade com código (A1 a A4.1), organizados como A1_vision_transformers.ipynb, A2_clip_ads16.ipynb, A3_cnn_kaggle.ipynb, A4_estudo_caso_raio_x.ipynb.
Cada notebook deve ser executável do início ao fim no Colab T4 sem modificações além de montar o Google Drive se necessário.
Especifique no início de cada notebook os requisitos de memória e tempo estimado de execução.
Relatório técnico (PDF):

Documento único cobrindo todas as quatro atividades.
Para cada atividade: definição do problema abordado, decisões técnicas tomadas e justificativa, resultados com métricas e gráficos e análise crítica dos resultados.
O item 4.2 (tráfego) é entregue apenas no relatório, sem notebook.
Nome do arquivo: nome_sobrenome_deep-learning-and-vision_computer-vision.pdf.
Assim que terminar, salve o seu arquivo ZIP e poste no Moodle. Utilize o seu nome para nomear o arquivo, identificando também a disciplina no seguinte formato: “nomedoaluno_nomedadisciplina_pd.ZIP”.
