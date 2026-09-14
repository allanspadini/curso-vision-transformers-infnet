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
