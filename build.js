import fs from 'fs-extra';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = __dirname;
const DIST_DIR = path.join(ROOT_DIR, 'dist');

console.log('🚀 Iniciando build unificado do portal para GitHub Pages...');

// 1. Limpar / Criar diretório dist
fs.emptyDirSync(DIST_DIR);
console.log('📁 Diretório dist/ preparado.');

// 2. Build da Apresentação da Aula 01
const aula01Dir = path.join(ROOT_DIR, 'aula_01_cnn_architectures', 'apresentacao');
console.log('📦 Compilando apresentação da Aula 01 (React + Vite)...');
execSync('npm run build', { cwd: aula01Dir, stdio: 'inherit' });

// 3. Copiar dist da Aula 01 para dist/aula_01_cnn_architectures
const aula01Dist = path.join(aula01Dir, 'dist');
const destAula01 = path.join(DIST_DIR, 'aula_01_cnn_architectures');
fs.copySync(aula01Dist, destAula01);

const pdfPath = path.join(ROOT_DIR, 'aula_01_cnn_architectures', 'aula_01_apresentacao.pdf');
if (fs.existsSync(pdfPath)) {
  fs.copySync(pdfPath, path.join(destAula01, 'aula_01_apresentacao.pdf'));
  console.log('✅ PDF da Aula 01 copiado para dist/aula_01_cnn_architectures/aula_01_apresentacao.pdf');
}
console.log('✅ Apresentação da Aula 01 copiada para dist/aula_01_cnn_architectures/');

// 3.1 Build da Apresentação da Aula 02
const aula02Dir = path.join(ROOT_DIR, 'aula_02_transformers', 'apresentacao');
console.log('📦 Compilando apresentação da Aula 02 (React + Vite)...');
execSync('npm run build', { cwd: aula02Dir, stdio: 'inherit' });

// 3.2 Copiar dist da Aula 02 para dist/aula_02_transformers
const aula02Dist = path.join(aula02Dir, 'dist');
const destAula02 = path.join(DIST_DIR, 'aula_02_transformers');
fs.copySync(aula02Dist, destAula02);

const pdfPath02 = path.join(ROOT_DIR, 'aula_02_transformers', 'aula_02_apresentacao.pdf');
if (fs.existsSync(pdfPath02)) {
  fs.copySync(pdfPath02, path.join(destAula02, 'aula_02_apresentacao.pdf'));
  console.log('✅ PDF da Aula 02 copiado para dist/aula_02_transformers/aula_02_apresentacao.pdf');
}
console.log('✅ Apresentação da Aula 02 copiada para dist/aula_02_transformers/');

// 3.3 Build da Apresentação da Aula 03
const aula03Dir = path.join(ROOT_DIR, 'aula_03_fine_tuning_bert', 'apresentacao');
console.log('📦 Compilando apresentação da Aula 03 (React + Vite)...');
execSync('npm run build', { cwd: aula03Dir, stdio: 'inherit' });

// 3.4 Copiar dist da Aula 03 para dist/aula_03_fine_tuning_bert
const aula03Dist = path.join(aula03Dir, 'dist');
const destAula03 = path.join(DIST_DIR, 'aula_03_fine_tuning_bert');
fs.copySync(aula03Dist, destAula03);

const pdfPath03 = path.join(ROOT_DIR, 'aula_03_fine_tuning_bert', 'aula_03_apresentacao.pdf');
if (fs.existsSync(pdfPath03)) {
  fs.copySync(pdfPath03, path.join(destAula03, 'aula_03_apresentacao.pdf'));
  console.log('✅ PDF da Aula 03 copiado para dist/aula_03_fine_tuning_bert/aula_03_apresentacao.pdf');
}
console.log('✅ Apresentação da Aula 03 copiada para dist/aula_03_fine_tuning_bert/');

// 3.5 Build da Apresentação da Aula 04
const aula04Dir = path.join(ROOT_DIR, 'aula_04_vision_transformers', 'apresentacao');
console.log('📦 Compilando apresentação da Aula 04 (React + Vite)...');
execSync('npm run build', { cwd: aula04Dir, stdio: 'inherit' });

// 3.6 Copiar dist da Aula 04 para dist/aula_04_vision_transformers
const aula04Dist = path.join(aula04Dir, 'dist');
const destAula04 = path.join(DIST_DIR, 'aula_04_vision_transformers');
fs.copySync(aula04Dist, destAula04);

const pdfPath04 = path.join(ROOT_DIR, 'aula_04_vision_transformers', 'aula_04_apresentacao.pdf');
if (fs.existsSync(pdfPath04)) {
  fs.copySync(pdfPath04, path.join(destAula04, 'aula_04_apresentacao.pdf'));
  console.log('✅ PDF da Aula 04 copiado para dist/aula_04_vision_transformers/aula_04_apresentacao.pdf');
}
console.log('✅ Apresentação da Aula 04 copiada para dist/aula_04_vision_transformers/');

// 3.7 Build da Apresentação da Aula 05
const aula05Dir = path.join(ROOT_DIR, 'aula_05_advanced_vision_transformers', 'apresentacao');
console.log('📦 Compilando apresentação da Aula 05 (React + Vite)...');
execSync('npm run build', { cwd: aula05Dir, stdio: 'inherit' });

// 3.8 Copiar dist da Aula 05 para dist/aula_05_advanced_vision_transformers
const aula05Dist = path.join(aula05Dir, 'dist');
const destAula05 = path.join(DIST_DIR, 'aula_05_advanced_vision_transformers');
fs.copySync(aula05Dist, destAula05);

const pdfPath05 = path.join(ROOT_DIR, 'aula_05_advanced_vision_transformers', 'aula_05_apresentacao.pdf');
if (fs.existsSync(pdfPath05)) {
  fs.copySync(pdfPath05, path.join(destAula05, 'aula_05_apresentacao.pdf'));
  console.log('✅ PDF da Aula 05 copiado para dist/aula_05_advanced_vision_transformers/aula_05_apresentacao.pdf');
}

const nbPath05 = path.join(ROOT_DIR, 'aula_05_advanced_vision_transformers', 'aula_05_advanced_vision_transformers.ipynb');
if (fs.existsSync(nbPath05)) {
  fs.copySync(nbPath05, path.join(destAula05, 'aula_05_advanced_vision_transformers.ipynb'));
  console.log('✅ Notebook 1 da Aula 05 copiado para dist/aula_05_advanced_vision_transformers/aula_05_advanced_vision_transformers.ipynb');
}

const nbDeitPath05 = path.join(ROOT_DIR, 'aula_05_advanced_vision_transformers', 'aula_05_deit_distillation_transfer_learning.ipynb');
if (fs.existsSync(nbDeitPath05)) {
  fs.copySync(nbDeitPath05, path.join(destAula05, 'aula_05_deit_distillation_transfer_learning.ipynb'));
  console.log('✅ Notebook 2 (DeiT) da Aula 05 copiado para dist/aula_05_advanced_vision_transformers/aula_05_deit_distillation_transfer_learning.ipynb');
}

const nbDinoPath05 = path.join(ROOT_DIR, 'aula_05_advanced_vision_transformers', 'aula_05_dino_self_supervised_vision.ipynb');
if (fs.existsSync(nbDinoPath05)) {
  fs.copySync(nbDinoPath05, path.join(destAula05, 'aula_05_dino_self_supervised_vision.ipynb'));
  console.log('✅ Notebook 3 (DINO) da Aula 05 copiado para dist/aula_05_advanced_vision_transformers/aula_05_dino_self_supervised_vision.ipynb');
}
console.log('✅ Apresentação da Aula 05 copiada para dist/aula_05_advanced_vision_transformers/');

// 3.9 Build da Apresentação da Aula 06
const aula06Dir = path.join(ROOT_DIR, 'aula_06_clip_openai', 'apresentacao');
console.log('📦 Compilando apresentação da Aula 06 (React + Vite)...');
execSync('npm run build', { cwd: aula06Dir, stdio: 'inherit' });

// 3.10 Copiar dist da Aula 06 para dist/aula_06_clip_openai
const aula06Dist = path.join(aula06Dir, 'dist');
const destAula06 = path.join(DIST_DIR, 'aula_06_clip_openai');
fs.copySync(aula06Dist, destAula06);

const pdfPath06 = path.join(ROOT_DIR, 'aula_06_clip_openai', 'aula_06_apresentacao.pdf');
if (fs.existsSync(pdfPath06)) {
  fs.copySync(pdfPath06, path.join(destAula06, 'aula_06_apresentacao.pdf'));
  console.log('✅ PDF da Aula 06 copiado para dist/aula_06_clip_openai/aula_06_apresentacao.pdf');
}

const nbPath06 = path.join(ROOT_DIR, 'aula_06_clip_openai', 'aula_06_clip_openai.ipynb');
if (fs.existsSync(nbPath06)) {
  fs.copySync(nbPath06, path.join(destAula06, 'aula_06_clip_openai.ipynb'));
  console.log('✅ Notebook 1 da Aula 06 copiado para dist/aula_06_clip_openai/aula_06_clip_openai.ipynb');
}

const nbFtPath06 = path.join(ROOT_DIR, 'aula_06_clip_openai', 'aula_06_clip_fine_tuning_huggingface.ipynb');
if (fs.existsSync(nbFtPath06)) {
  fs.copySync(nbFtPath06, path.join(destAula06, 'aula_06_clip_fine_tuning_huggingface.ipynb'));
  console.log('✅ Notebook 2 (Fine-Tuning) da Aula 06 copiado para dist/aula_06_clip_openai/aula_06_clip_fine_tuning_huggingface.ipynb');
}
// 3.11 Build da Apresentação da Aula 07
const aula07Dir = path.join(ROOT_DIR, 'aula_07_gans_generative_adversarial_networks', 'apresentacao');
console.log('📦 Compilando apresentação da Aula 07 (React + Vite)...');
execSync('npm run build', { cwd: aula07Dir, stdio: 'inherit' });

// 3.12 Copiar dist da Aula 07 para dist/aula_07_gans_generative_adversarial_networks
const aula07Dist = path.join(aula07Dir, 'dist');
const destAula07 = path.join(DIST_DIR, 'aula_07_gans_generative_adversarial_networks');
fs.copySync(aula07Dist, destAula07);

const nbDcganPath07 = path.join(ROOT_DIR, 'aula_07_gans_generative_adversarial_networks', 'aula_07_dcgan_cifar10_treinamento.ipynb');
if (fs.existsSync(nbDcganPath07)) {
  fs.copySync(nbDcganPath07, path.join(destAula07, 'aula_07_dcgan_cifar10_treinamento.ipynb'));
  console.log('✅ Notebook 1 (DCGAN) da Aula 07 copiado para dist/aula_07_gans_generative_adversarial_networks/aula_07_dcgan_cifar10_treinamento.ipynb');
}

const nbPath07 = path.join(ROOT_DIR, 'aula_07_gans_generative_adversarial_networks', 'aula_07_gans_generative_adversarial_networks.ipynb');
if (fs.existsSync(nbPath07)) {
  fs.copySync(nbPath07, path.join(destAula07, 'aula_07_gans_generative_adversarial_networks.ipynb'));
  console.log('✅ Notebook 2 (cGAN) da Aula 07 copiado para dist/aula_07_gans_generative_adversarial_networks/aula_07_gans_generative_adversarial_networks.ipynb');
}

const nbCycPath07 = path.join(ROOT_DIR, 'aula_07_gans_generative_adversarial_networks', 'aula_07_cyclegan_holo2bright_traducao_dominios.ipynb');
if (fs.existsSync(nbCycPath07)) {
  fs.copySync(nbCycPath07, path.join(destAula07, 'aula_07_cyclegan_holo2bright_traducao_dominios.ipynb'));
  console.log('✅ Notebook 3 (CycleGAN) da Aula 07 copiado para dist/aula_07_gans_generative_adversarial_networks/aula_07_cyclegan_holo2bright_traducao_dominios.ipynb');
}

const pdfPath07 = path.join(ROOT_DIR, 'aula_07_gans_generative_adversarial_networks', 'aula_07_apresentacao.pdf');
if (fs.existsSync(pdfPath07)) {
  fs.copySync(pdfPath07, path.join(destAula07, 'aula_07_apresentacao.pdf'));
  console.log('✅ PDF da Aula 07 copiado para dist/aula_07_gans_generative_adversarial_networks/aula_07_apresentacao.pdf');
}
console.log('✅ Apresentação da Aula 07 copiada para dist/aula_07_gans_generative_adversarial_networks/');

// 4. Copiar arquivos raiz para dist/
fs.copySync(path.join(ROOT_DIR, 'index.html'), path.join(DIST_DIR, 'index.html'));
if (fs.existsSync(path.join(ROOT_DIR, 'infnet_logo.png'))) {
  fs.copySync(path.join(ROOT_DIR, 'infnet_logo.png'), path.join(DIST_DIR, 'infnet_logo.png'));
}
console.log('✅ Página inicial do Portal copiada para dist/index.html');

// 5. Criar arquivo .nojekyll no dist para o GitHub Pages não ignorar pastas com _
fs.writeFileSync(path.join(DIST_DIR, '.nojekyll'), '');
console.log('✅ Arquivo .nojekyll criado para o GitHub Pages.');

console.log('\n🎉 Build completo finalizado com sucesso! Conteúdo pronto em: dist/');
