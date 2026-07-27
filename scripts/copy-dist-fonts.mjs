// assets/fonts isn't under a declared component tier, so Vite's build never
// touches it. atomic.libraries.yml expects it verbatim at dist/fonts.
import fs from 'fs';

const src = new URL('../assets/fonts', import.meta.url);
const dest = new URL('../dist/fonts', import.meta.url);

fs.cpSync(src, dest, { recursive: true });
