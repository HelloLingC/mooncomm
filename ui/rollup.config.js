import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

export default {
  // Entry point of your application
  input: 'src/index.ts',

  output: {
    file: 'dist/bundle.js', // Output bundle file
    format: 'esm', // Output as ES module
    sourcemap: true, // Generate source maps for debugging
  },

  plugins: [
    resolve({
      browser: true,
    }),
    typescript(),
  ],
};