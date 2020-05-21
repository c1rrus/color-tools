import ColorGlue, { ColorGlueConfig } from './color-glue';
import DsmPlugin from './plugins/invision-dsm';
import ConstrastGridPlugin from './plugins/contrast-grid';
import ContrastPlugin from './plugins/contrast';
import TintAndShadePlugin from './plugins/tint-and-shade'

export { default as ColorGlue } from './color-glue';

export const dsmPlugin = new DsmPlugin();
export const contrastGridPlugin = new ConstrastGridPlugin();
export const contrastPlugin = new ContrastPlugin();
export const tintAndShadePlugin = new TintAndShadePlugin();

const defaultConfig: ColorGlueConfig = {
  importers: [],
  urlGenerators: [
    contrastGridPlugin.configKey,
    contrastPlugin.configKey,
    tintAndShadePlugin.configKey,
  ]
}

export default new ColorGlue(
  [
    dsmPlugin,
    contrastGridPlugin,
    contrastPlugin,
    tintAndShadePlugin,
  ],
  defaultConfig
);
