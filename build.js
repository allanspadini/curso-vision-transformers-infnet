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
