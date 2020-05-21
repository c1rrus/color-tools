import ColorTools, { ColorToolsConfig } from "./color-tools";
import DsmPlugin from './plugins/invision-dsm';
import ConstrastGridPlugin from './plugins/contrast-grid';

const dsmPlugin = new DsmPlugin();
const contrastGridPlugin = new ConstrastGridPlugin();

const defaultConfig: ColorToolsConfig = {
  importers: [],
  urlGenerators: [
    contrastGridPlugin.configKey,
  ]
}

const defaultColorTools = new ColorTools(
  [
    dsmPlugin,
    contrastGridPlugin,
  ],
  defaultConfig
);

export default defaultColorTools;
