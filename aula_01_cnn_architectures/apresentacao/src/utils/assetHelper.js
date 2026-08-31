/**
 * Helper to resolve public assets correctly in Vite
 */
export function getAssetPath(path) {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  if (path.startsWith('/')) return path;
  return `/${path}`;
}
