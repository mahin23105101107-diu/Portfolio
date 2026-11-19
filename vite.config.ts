import fs from 'fs';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    base: './',
    plugins: [
      // Copies standalone app.js and assets/ into dist/ so both raw GitHub Pages
      // hosting and Vite production builds resolve ./app.js and ./assets/* cleanly.
      {
        name: 'copy-static-portfolio-files',
        apply: 'build',
        closeBundle(error?: Error): void {
          if (error) {
            return;
          }
          const distDir = path.resolve(__dirname, 'dist');
          const appJsSrc = path.resolve(__dirname, 'app.js');
          const appJsDist = path.resolve(distDir, 'app.js');
          if (fs.existsSync(distDir) && fs.existsSync(appJsSrc)) {
            fs.copyFileSync(appJsSrc, appJsDist);
          }
        },
      },
    ],
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
