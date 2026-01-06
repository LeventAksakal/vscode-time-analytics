import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = path.dirname(__filename);

const repoRoot: string = path.resolve(__dirname, '..');
const src: string = path.join(repoRoot, 'time-analytics-webview', 'dist');
const dest: string = path.join(repoRoot, 'extension', 'webview-ui');

if (!fs.existsSync(src)) {
  console.error('webview dist not found:', src);
  process.exit(1);
}

fs.rmSync(dest, { recursive: true, force: true });
fs.cpSync(src, dest, { recursive: true });

console.log('Copied webview dist to', dest);
