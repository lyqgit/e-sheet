import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import postcss from "rollup-plugin-postcss";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import strip from "@rollup/plugin-strip";
import externalResolve from "@rollup/plugin-node-resolve";
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import { resolve,dirname  } from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)

const isProduction = process.env.NODE_ENV === 'production'
const pluginsWithEnv = isProduction ? [strip(),terser()] : [serve({
    port: 10001,
    contentBase: ['dist', 'examples']
}), livereload({watch: 'dist/e-sheet.umd.js'})]

export default {
    input: resolve(__dirname,'src/main.js'),
    output: [
        {
            file: resolve(__dirname,'dist/e-sheet.es.js'),
            name:'eSheet',
            format: 'es',
            sourcemap:true
        },
        {
            file: resolve(__dirname,'dist/e-sheet.umd.js'),
            name:'eSheet',
            format: 'umd',
            sourcemap:true,
        }
    ],
    plugins: [
        babel({ babelHelpers: 'bundled' }),
        postcss({
            plugins: [autoprefixer(),cssnano],
            extract:resolve(__dirname,'dist/css/index.css')
        }),
        externalResolve(),
        ...pluginsWithEnv
    ]
};