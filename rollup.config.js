import cleanup from 'rollup-plugin-cleanup';
import {terser} from 'rollup-plugin-terser';

export default [{
  input: 'select-file.js',
  output: {
    file: './dist/select-file.js',
    format: 'cjs',
  	experimentalCodeSplitting: true
  },
  treeshake: true,
  plugins: [
    cleanup(),
    terser()
  ]
},]
