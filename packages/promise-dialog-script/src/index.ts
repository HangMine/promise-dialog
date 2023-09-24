import { InlineConfig, build } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

async function run() {
  await build(config);
}

const config: InlineConfig = {
  mode: 'production',
  build: {
    target: 'modules',
    outDir: 'es',
    emptyOutDir: false,
    minify: false,
    // brotliSize: false,
    rollupOptions: {
      input: ['index.ts'],
      output: [
        {
          format: 'es',
          dir: 'es',
          entryFileNames: '[name].js',
          preserveModules: true,
          preserveModulesRoot: 'components',
        },
        {
          format: 'commonjs',
          dir: 'lib',
          entryFileNames: '[name].js',
          preserveModules: true,
          preserveModulesRoot: 'components',
        },
      ],
    },
    // 开启lib模式，但不使用下面配置
    lib: {
      entry: 'index.ts',
      formats: ['es', 'cjs'],
    },
  },
  // @ts-ignore vite内部类型错误
  plugins: [vue(), vueJsx()],
};

run()
