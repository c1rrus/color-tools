import Plugin, { PluginConfig } from './plugin';
import ColorCollection from '../color-collection';

export interface UrlGeneratorPluginConfig extends PluginConfig {
  /**
   * Configuration for the plugin's generateUrl function.
   */
  urlGeneratorConfig?: any;
}

/**
 * URL generator plugin.
 */
export default interface UrlGeneratorPlugin extends Plugin {
  /**
   * Generates a URL from a collection of colors.
   *
   * Typically this will be a URL to some online tool that does something
   * useful with those colours (e.g. calculate color contrast ratios).
   *
   * @param colors  The input collection to generate colors from.
   * @param config  Config for the plugin's generateUrl function.
   */
  generateUrl(colors: ColorCollection, config?: any): URL | Promise<URL>;
}
