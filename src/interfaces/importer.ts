import Plugin, { PluginConfig } from './plugin';
import ColorCollection from '../color-collection';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ImportPluginConfig<K = any> extends PluginConfig {
  /**
   * Configuration for the plugin's import function.
   */
  importConfig?: K;
}

/**
 * A color importer plugin.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default interface ImporterPlugin<K = any> extends Plugin {
  /**
   * Imports a set of colors from somewhere and appends them
   * to the provided color collection.
   *
   * It is up to each plugin implementation to get .g. fetch from a URL,
   * read from a file, etc.)
   *
   * @param colors  The colors object to add the imported colors to.
   * @param config  Config for the plugin's import function.
   */
  import(colors: ColorCollection, config?: K): Promise<ColorCollection> | ColorCollection;
}
