import Plugin, { PluginConfig } from './plugin';
import ColorCollection from '../color-collection';

export interface ImportPluginConfig extends PluginConfig {
  /**
   * Configuration for the plugin's import function.
   */
  importConfig?: any;
}

/**
 * A color importer plugin.
 */
export default interface ImporterPlugin extends Plugin {
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
  import(colors: ColorCollection, config?: any): Promise<ColorCollection> | ColorCollection;
}
