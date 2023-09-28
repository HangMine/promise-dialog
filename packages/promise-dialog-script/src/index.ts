#!/usr/bin/env node

import { InlineConfig, build } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'
import fs from 'fs-extra'

async function run() {
  // await fs.emptyDir(path.resolve(process.cwd(), 'es'))
  // await fs.emptyDir(path.resolve(process.cwd(), 'lib'))
  await build(config)
}

// const promiseDialogVuePath = 'packages/promise-dialog-vue'

const config: InlineConfig = {
  mode: 'production',
  build: {
    target: 'modules',
    outDir: '/es',
    emptyOutDir: false,
    minify: false,
    reportCompressedSize: false,
    rollupOptions: {
      input: 'index.ts',
      output: [
        {
          format: 'es',
          dir: 'es',
          entryFileNames: '[name].js'
          // preserveModules: true,
          // preserveModulesRoot: promiseDialogVuePath
        }
        // {
        //   format: 'commonjs',
        //   dir: 'lib',
        //   entryFileNames: '[name].js',
        //   preserveModules: true,
        //   preserveModulesRoot: promiseDialogVuePath
        // }
      ]
    }
    // 开启lib模式，但不使用下面配置
    // lib: {
    //   entry: 'index.ts',
    //   formats: ['es', 'cjs']
    // }
  },
  // @ts-ignore vite内部类型错误
  plugins: [vue(), vueJsx()]
}

run()
