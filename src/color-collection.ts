import Color from 'color';

/**
 * A list of named colors.
 */
export interface NamedColors {
  [name: string]: Color;
}

function toHexString(color: Color | string): string {
  return color instanceof Color ? color.hex() : color;
}

function toColorObj(color: Color | string): Color {
  return color instanceof Color ? color : new Color(color);
}

export default class ColorCollection {
  private _named: Map<string, string> = new Map();
  private _anonymous: Set<string> = new Set();

  private _containsNamedColorValue(color: Color | string): boolean {
    const searchColor = toHexString(color);
    let found = false;
    for(const existingColor of this._named.values()) {
      if (existingColor === searchColor) {
        found = true;
        break;
      }
    }
    return found;
  }

  private _containsAnonymousColorValue(color: Color | string): boolean {
    return this._anonymous.has(toHexString(color));
  }

  public containsColorValue(color: Color | string): boolean {
    return this._containsAnonymousColorValue(color) || this._containsNamedColorValue(color);
  }

  public addColor(color: Color | string, name?: string): void {
    const hexColor = toHexString(color);
    if (name === undefined) {
      // Anonymous

      // Only add color, if there isn't already a
      // color with the same value
      if (!this._containsNamedColorValue(color)) {
        this._anonymous.add(hexColor);
      }
    }
    else {
      // Named

      // If an anonymous color with the same name already
      // exists, then remove it in favour of the named one
      // we're about to add
      if (this._containsAnonymousColorValue(color)) {
        this._anonymous.delete(hexColor);
      }
      this._named.set(name, hexColor);
    }
  }

  public getNamedColors(): NamedColors {
    return [...this._named].reduce((namedColors, [name, colorVal]) => {
      namedColors[name] = new Color(colorVal);
      return namedColors;
    }, {} as NamedColors);
  }

  public getNamedSize(): number {
    return this._named.size;
  }

  public getAnonymousColors(): Color[] {
    return [...this._anonymous].map(toColorObj);
  }

  public getAnonymousSize(): number {
    return this._anonymous.size;
  }

  get size(): number {
    return this.getAnonymousSize() + this.getNamedSize();
  }
}
