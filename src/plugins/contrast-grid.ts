import UrlGeneratorPlugin from '../interfaces/url-generator';
import ColorCollection from '../color-collection';

export default class ContrastGridPlugin implements UrlGeneratorPlugin {
  public get configKey(): string {
    return 'contrast-grid';
  }

  public get displayName(): string {
    return 'EightShapes Contrast Grid';
  }

  public generateUrl(colors: ColorCollection): URL {
    const url = new URL('http://contrast-grid.eightshapes.com/');
    const namedColors = colors.getNamedColors();

    // Construct a list of all colors
    const colorParam = [
      // Add "color,name" pairs from named colors
      ...Object.keys(namedColors).map(name => {
        const colorVal = namedColors[name].hex();
        return `${colorVal},${name}`;
      }),

      // Add "value" from anonymous colors
      ...colors.getAnonymousColors().map(color => color.hex())
    ].join("\n");

    // TODO: Provide some kind of way to divide input colors
    // into bg & fg categories?
    url.searchParams.append('background-colors', '');
    url.searchParams.append('foreground-colors', colorParam);
    url.searchParams.append('es-color-form__tile-size', 'compact');

    return url;
  }

}
