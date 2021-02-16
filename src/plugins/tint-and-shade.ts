import { URL } from 'url';
import UrlGeneratorPlugin from '../interfaces/url-generator';
import ColorCollection from '../color-collection';

export default class TintAndShadePlugin implements UrlGeneratorPlugin {
  public get configKey(): string {
    return 'tintAndShade';
  }

  public get displayName(): string {
    return 'Tint and Shade Generator';
  }

  public generateUrl(colors: ColorCollection): URL {
    const url = new URL('https://maketintsandshades.com/');
    const namedColors = colors.getNamedColors();

    // Construct a list of all colors
    const colorList = [
      // Add "color,name" pairs from named colors
      ...Object.keys(namedColors).map(name => {
        const colorVal = namedColors[name].hex();
        return `${colorVal.substr(1)}`;
      }),

      // Add "value" from anonymous colors
      ...colors.getAnonymousColors().map(color => color.hex().substr(1))
    ].join(",");

    url.hash = colorList;

    return url;
  }

}
