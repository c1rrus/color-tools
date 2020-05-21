import https from 'https';
import ColorCollection from '../color-collection';
import ImporterPlugin, { ImportPluginConfig } from '../interfaces/importer';

const configKey = 'invisionDsm';

interface DsmColorToken {
  name?: string;
  value: string;
}

interface DsmColorCollection {
  colors: DsmColorToken[];
}

interface DsmJson {
  list?: {
    colors: DsmColorCollection[];
  };

  lookup?: {
    colors: {
      [category: string]: (DsmColorToken | DsmColorCollection);
    };
  };
}


function isColorCollection(tokenOrCollection: any): tokenOrCollection is DsmColorCollection {
  return tokenOrCollection.colors !== undefined && Array.isArray(tokenOrCollection.colors);
}

export interface DsmImportConfig {
  /**
   * One or more JSON design token URLs.
   *
   * `list`, `lookup` and `list,lookup` export formats are
   * supported.
   */
  url: (string | URL) | (string | URL)[];
}

export interface DsmImportPluginConfig extends ImportPluginConfig {
  name: typeof configKey;
  importConfig: DsmImportConfig;
}


/**
 * Importer plugin for fetching all colours defined in an
 * InVision DSM library.
 */
export default class DsmPlugin implements ImporterPlugin {
  public get configKey(): string {
    return configKey;
  }

  public get displayName(): string {
    return 'InVision DSM';
  }

  /**
   * Fetches JSON design tokens from DSM and extracts all
   * the colours from them.
   *
   * @param colors  Color collection that all imported colors
   *                will be added to.
   * @param config  Config object listing the URL(s) to fetch
   *                from.
   */
  public async import(colors: ColorCollection, config: DsmImportConfig): Promise<ColorCollection> {
    const urls = Array.isArray(config.url) ? config.url : [config.url];

    for (const url of urls) {
      // Fetch the JSON file
      const jsonString: string = await new Promise((resolve, reject) => {
        https.get(
          url,
          res => {
            let responseBody = '';
            res.on('data', chunk => {
              responseBody += chunk;
            });

            res.on('end', () => {
              resolve(responseBody);
            });
          },
        ).on('error', reject);
      });

      // Parse the received JSON data
      const designTokenData = JSON.parse(jsonString) as DsmJson;

      // Extract list colors:
      if (designTokenData.list !== undefined) {
        designTokenData.list.colors.forEach(colorCategory => {
          colorCategory.colors.forEach(colorToken => {
            colors.addColor(colorToken.value, colorToken.name);
          });
        });
      }

      // Extract lookup colors:
      if (designTokenData.lookup !== undefined) {
        Object.getOwnPropertyNames(designTokenData.lookup.colors).forEach(colorOrCategoryName => {
          const colorOrCategory = designTokenData.lookup.colors[colorOrCategoryName];
          if(isColorCollection(colorOrCategory)) {
            colorOrCategory.colors.forEach(colorToken => {
              colors.addColor(colorToken.value, colorToken.name);
            });
          }
          else {
            colors.addColor(colorOrCategory.value, colorOrCategory.name);
          }
        });
      }
    }

    return colors;
  }

}
