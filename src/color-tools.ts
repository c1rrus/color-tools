import ColorCollection from './color-collection';
import Plugin from './interfaces/plugin';
import PluginManager, { PluginInfo } from './plugin-manager';
import { ImportPluginConfig } from './interfaces/importer';
import { UrlGeneratorPluginConfig } from './interfaces/url-generator';


export interface ColorToolsConfig {
  importers: (string | ImportPluginConfig)[];
  urlGenerators: (string | UrlGeneratorPluginConfig)[];
}


export interface ColorToolsResult {
  colors: ColorCollection;
  urls: URL[];
}


export default class ColorTools {
  #plugins = new PluginManager();
  #config: ColorToolsConfig;

  constructor(plugins: Plugin[], config: ColorToolsConfig) {
    plugins.forEach(plugin => {
      this.registerPlugin(plugin);
    });
    this.#config = config;
  }

  public appendImporterConfig(config: string | ImportPluginConfig): void {
    this.#config.importers.push(config);
  }

  public appendUrlGeneratorConfig(config: string | UrlGeneratorPluginConfig): void {
    this.#config.urlGenerators.push(config);
  }

  public async importColors(): Promise<ColorCollection> {
    let colors = new ColorCollection();

    for(const importerPluginConfig of this.#config.importers) {
      const key = typeof importerPluginConfig === 'string' ? importerPluginConfig : importerPluginConfig.name;
      const config = (importerPluginConfig as ImportPluginConfig).importConfig;

      const plugin = this.#plugins.getImporterPlugin(key);
      if (plugin === undefined) {
        console.warn(`Could not find importer plugin with key: ${key}`);
        continue;
      }

      colors = await plugin.import(colors, config);
    }

    return colors;
  }

  public async generateUrls(colors: ColorCollection): Promise<URL[]> {
    const urls: URL[] = [];

    for(const urlGenPluginConfig of this.#config.urlGenerators) {
      const key = typeof urlGenPluginConfig === 'string' ? urlGenPluginConfig : urlGenPluginConfig.name;
      const config = (urlGenPluginConfig as UrlGeneratorPluginConfig).urlGeneratorConfig;

      const plugin = this.#plugins.getUrlGeneratorPlugin(key);
      if (plugin === undefined) {
        console.warn(`Could not find URL generator plugin with key: ${key}`);
        continue;
      }

      urls.push(await plugin.generateUrl(colors, config));
    }

    return urls;
  }

  public async run(): Promise<ColorToolsResult> {
    const colors = await this.importColors();
    const urls = await this.generateUrls(colors);

    return {
      colors,
      urls,
    };
  }

  public registerPlugin(plugin: Plugin): void {
    this.#plugins.registerPlugin(plugin);
  }

  public getPluginsInfo(): PluginInfo[] {
    return this.#plugins.getPluginsInfo();
  }
}
