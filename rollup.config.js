/*
 * @Description: rollup配置文件
 * @Version: 1.0
 * @Author: yangsen
 * @Date: 2022-07-28 16:53:28
 * @LastEditors: yangsen
 * @LastEditTime: 2023-03-10 14:50:11
 */
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import alias from '@rollup/plugin-alias';
import dts from 'rollup-plugin-dts';
import copy from "rollup-plugin-copy"
const path = require('path');

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

const resolveDir = (dir) => path.resolve(dir);

let builds = [
  // 生产环境
  {
    input: './src/WEBGIS.ts', // 打包入口文件路径
    /* 文件输出配置 */
    output: {
      file: 'build/bundle.js', //打包后生产文件的文件名
      format: 'umd', // 五种输出格式：amd /  esm / iife / umd / cjs(commonJS)
      name: 'GaiaWeb', // 当format为iife和umd时必须提供，将作为全局变量挂在window(浏览器环境)下：window.GaiaWeb=...
      sourcemap: false, //生成bundle.map.js文件，方便调试
    },
    plugins: [
      commonjs(), // 将npm包暴露出来的commonjs的模块，转换为es6，应该在其他插件之前使用
      resolve({ extensions }), // 可以让Rollup查找外部模块（通过import引入的模块）；参数extensions表示要处理的文件类型，使用ts语法时，当用typescript编译时这个参数可以省略，但使用babel编译ts时必须加上这个参数
      babel({
        exclude: 'node_modules/**',
        extensions, // 参数extensions表示要处理的文件类型，使用ts语法时，当用typescript编译时这个参数可以省略，但使用babel编译ts时必须加上这个参数
        babelHelpers: 'bundled',
        include: ['src/**/*','utils/**/*'],
      }),
      alias({
        entries: [
          {
            find: '@',
            replacement: resolveDir('src'),
          },
        ],
      }),

      terser(), // 生成环境更适合代码压缩
    ],
    external: [], // 不想被打包的依赖
  },
  // 开发环境
  {
    input: './src/WEBGIS.ts', // 打包入口文件路径
    /* 文件输出配置 */
    output: {
      file: 'build/bundle.module.js', //打包后生产文件的文件名
      format: 'esm', // 五种输出格式：amd /  esm / iife / umd / cjs(commonJS)
      name: 'GaiaWeb', // 当format为iife和umd时必须提供，将作为全局变量挂在window(浏览器环境)下：window.GaiaWeb=...
      sourcemap: true, //生成bundle.map.js文件，方便调试
    },
    plugins: [
      commonjs(), // 将npm包暴露出来的commonjs的模块，转换为es6，应该在其他插件之前使用
      resolve({ extensions }), // 可以让Rollup查找外部模块（通过import引入的模块）；参数extensions表示要处理的文件类型，使用ts语法时，当用typescript编译时这个参数可以省略，但使用babel编译ts时必须加上这个参数
      babel({
        exclude: 'node_modules/**',
        extensions, // 参数extensions表示要处理的文件类型，使用ts语法时，当用typescript编译时这个参数可以省略，但使用babel编译ts时必须加上这个参数
        babelHelpers: 'bundled',
        include: ['utils/**/*', 'src/**/*'],
      }),
      alias({
        entries: [
          {
            find: '@',
            replacement: resolveDir('src'),
          },
        ],
      }),
      copy({
        targets: [
          {src: "./src/assets/*",dest:"build/assets"}
        ]
      }),
      serve({
        open: true,
        contentBase: '', // 基础路径，应该是指的index.html所在路径
        // port: 8888, // 不设置就可以自动分配路径
      }),
      livereload(),
    ],
    external: [], // 不想被打包的依赖
  },
  /* three.js声明文件 */
  {
    input: './types/three/index.d.ts',
    output: [{ file: './build/three.d.ts', format: 'esm' }],
    plugins: [dts()],
  },
  {
    input: './src/typings/index.d.ts',
    output: [{ file: './build/types/src/typings/index.d.ts', format: 'esm' }],
    plugins: [dts()],
  },
  {
    input: './build/types/src/WEBGIS.d.ts',
    output: [{ file: './build/bundle.module.d.ts', format: 'esm' }],
    plugins: [dts()],
  },
];

switch (process.env.NODE_ENV) {
  case 'develop':
    // builds = [builds[1]];
    builds = [builds[1], builds[2], builds[3],builds[4]];
    break;
  case 'build':
    builds = builds[0];
    break;
  default:
    break;
}

export default builds;
