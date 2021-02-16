import Plugin from './interfaces/plugin';
import ImporterPlugin from './interfaces/importer';
import UrlGeneratorPlugin from './interfaces/url-generator';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isImporterPlugin(plugin: any): plugin is ImporterPlugin {
  return plugin.import !== undefined && typeof plugin.import === 'function';
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isUrlGeneratorPlugin(plugin: any): plugin is UrlGeneratorPlugin {
  return plugin.generateUrl !== undefined && typeof plugin.generateUrl === 'function';
}

export interface PluginInfo {
  configKey: string;
  displayName: string;
  isImporter: boolean;
  isUrlGenerator: boolean;
}

export default class PluginManager {
  #availablePlugins = new Map<string, Plugin>();

  public registerPlugin(plugin: Plugin): void {
    this.#availablePlugins.set(plugin.configKey, plugin);
  }

  public getImporterPlugin(configKey: string): ImporterPlugin | undefined {
    const plugin = this.#availablePlugins.get(configKey);
    if (plugin !== undefined && isImporterPlugin(plugin)) {
      return plugin;
    }
  }

  public getUrlGeneratorPlugin(configKey: string): UrlGeneratorPlugin | undefined {
    const plugin = this.#availablePlugins.get(configKey);
    if (plugin !== undefined && isUrlGeneratorPlugin(plugin)) {
      return plugin;
    }
  }

  public getPluginsInfo(): PluginInfo[] {
    return [...this.#availablePlugins.values()].map(plugin => ({
      configKey: plugin.configKey,
      displayName: plugin.displayName,
      isImporter: isImporterPlugin(plugin),
      isUrlGenerator: isUrlGeneratorPlugin(plugin),
    }));
  }
}

