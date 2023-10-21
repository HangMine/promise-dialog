#!/usr/bin/env node

import { InlineConfig, build } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'
import fs from 'fs-extra'
import dts from 'vite-plugin-dts'

async function run() {
  await fs.emptyDir(path.resolve(process.cwd(), 'es'))
  await fs.emptyDir(path.resolve(process.cwd(), 'lib'))
  await build(config)
}

const config: InlineConfig = {
  mode: 'production',
  build: {
    target: 'modules',
    outDir: '/es',
    emptyOutDir: false,
    minify: false,
    reportCompressedSize: false,
    rollupOptions: {
      external: ['vue', 'react'], // 外部依赖
      input: 'src/index.ts',
      output: [
        {
          format: 'es',
          dir: 'es',
          entryFileNames: '[name].js',
          preserveModules: true,
          preserveModulesRoot: 'src'
        },
        {
          format: 'commonjs',
          dir: 'lib',
          entryFileNames: '[name].js',
          preserveModules: true,
          preserveModulesRoot: 'src'
        }
      ]
    },
    // 开启lib模式，但不使用下面配置
    lib: {
      entry: 'src/index.ts',
      formats: ['es', 'cjs']
    }
  },
  // @ts-ignore vite内部类型错误
  plugins: [
    vue(),
    vueJsx(),
    dts({
      outDir: 'es',
      rollupTypes: true,
      tsconfigPath: path.resolve(process.cwd(), 'tsconfig.app.json'),
    }),
    dts({
      outDir: 'lib',
      rollupTypes: true,
      tsconfigPath: path.resolve(process.cwd(), 'tsconfig.app.json'),
    }),
  ]
}

run()
