import { URL } from 'url';
import Plugin, { PluginConfig } from './plugin';
import ColorCollection from '../color-collection';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface UrlGeneratorPluginConfig<K = any> extends PluginConfig {
  /**
   * Configuration for the plugin's generateUrl function.
   */
  urlGeneratorConfig?: K;
}

/**
 * URL generator plugin.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default interface UrlGeneratorPlugin<K = any> extends Plugin {
  /**
   * Generates a URL from a collection of colors.
   *
   * Typically this will be a URL to some online tool that does something
   * useful with those colours (e.g. calculate color contrast ratios).
   *
   * @param colors  The input collection to generate colors from.
   * @param config  Config for the plugin's generateUrl function.
   */
  generateUrl(colors: ColorCollection, config?: K): URL | Promise<URL>;
}
