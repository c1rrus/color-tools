export interface PluginConfig {
  name: string;
}

/**
 * Common interface for all plugin types.
 */
export default interface Plugin {
  /**
   * The key used for this plugin's config.
   */
  configKey: string;

  /**
   * This plugin's display name.
   *
   * E.g. for listing in a CLI or GUI.
   */
  displayName: string;
}
