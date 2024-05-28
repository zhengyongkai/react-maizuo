// uno.config.ts
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss';
import transformerAttributifyJsx from '@unocss/transformer-attributify-jsx';
import presetRemToPx from '@unocss/preset-rem-to-px';

export default defineConfig({
  shortcuts: [
    // ...
  ],
  theme: {
    colors: {
      'grey-50': '#797d82', // class="text-very-cool"
      'slate-50': '#d2d6dc',
      black: '#191a1b',
      'yellow-50': '#ffb232',
      'orange-50': '#ff5f16'
    }
  },

  presets: [
    presetRemToPx({
      baseFontSize: 4
    }),
    presetUno(),
    presetAttributify(),
    presetIcons(),
    presetTypography(),
    presetWebFonts({
      fonts: {
        // ...
      }
    })
  ],
  transformers: [transformerDirectives(), transformerVariantGroup(), transformerAttributifyJsx()]
});
