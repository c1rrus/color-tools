# Colorglue

---

⚠️ **No longer supported**

This library is no longer being maintained and the git repo has been archived.

---

Colorglue lets you glue together color-related files and tools. It can import colors from various sources (online tools, files, etc.) and then feed them into other tools that do interesting things with them (e.g. color contrast checkers).

## Usage
Install the `colorglue` library as a dependency in your project:

```
npm install --save colorglue
```

You can then `require()`/`import` Colorglue and use it. For example:

```js
// Import the default colorGlue instance
// and the InVision DSM Plugin's key which
// we need for its config.
const {
  default: colorGlue,
  dsmPlugin: {
    configKey: dsmPluginConfigKey,
  }
} = require('colorglue');

// Append a DSM Plugin config that specifies
// the URL to a DSM library's JSON design tokens
// from where we want to grab colors.
colorGlue.appendImporterConfig({
  name: dsmPluginConfigKey,
  importConfig: {
    url: 'https://[YOUR ORG].invisionapp.com/dsm-export/[YOUR ORG]/[YOUR LIB]/style-data.json?exportFormat=list,lookup&key=[YOUR KEY]',
  }
});

// Run Colorglue.
// This will import colors from all configured importer
// plugins (currently only the DSM one we setup above).
// The complete set of imported colors is availabe in
// `result.colors`.
// Then it passed those colors to all configured URL
// generator plugins. They each construct URLs and
// append them to `result.urls`.
colorGlue.run().then(result => {
  // Print the number of colours we imported
  console.log(`Imported ${result.colors.size} colors`);

  // Print all generated URLs
  result.urls.forEach(url => {
    console.log(`Generated URL: ${url.href}`);
  });
});
```


## Plugins
Colorglue has can be extended via plugins. Out of the box it includes the following plugins:

### Importers
Importer plugins get colors from somewhere.

* **InVision DSM**: Can import JSON design tokens from [InVision DSM](https://www.invisionapp.com/design-system-manager) libraries and extract all color values from them.


### URL Generators
URL generator plugins take a collection of colors and construct a URL to some online tool that does something useful with them.

* **Eightshapes Contrast Grid**: Constructs a URL that displays all the given colors in the [Contrast Grid](https://contrast-grid.eightshapes.com/) tool.
* **Christopher Geary's Contrast tool**: Constructs a URL that displays all the given colors in the [Contrast](https://contrast.crgeary.com/) tool.
* **Tint and Shade Generator**: Constructs a URL that displays all the given colors in the [Tint and SHade Generator](https://maketintsandshades.com/) tool.
