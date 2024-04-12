const yaml = require("yaml");
const StyleDictionary = require("style-dictionary");

// Custom transform for box-shadows
StyleDictionary.registerTransform({
  name: "shadow/spreadShadow",
  type: "value",
  matcher: function (token) {
    return token.type === "boxShadow";
  },
  transformer: (token) => {
    const shadows = Object.values(token.value);
    const result = shadows.map(
      (shadow) =>
        `${shadow.x}px ${shadow.y}px ${shadow.blur}px ${shadow.spread}px ${shadow.color}`
    );
    return result.join(",");
  },
});

// Custom transform for borderRadius
StyleDictionary.registerTransform({
  name: "border/radius",
  type: "value",
  matcher: function (token) {
    return token.type === "borderRadius";
  },
  transformer: (token) => {
    return `${token.value}rem`;
  },
});

// Custom transform to convert font sizes to rem
StyleDictionary.registerTransform({
  name: "size/pxToRem",
  type: "value",
  matcher: function (token) {
    return token.type === "fontSizes";
  },
  transformer: (token, options) => {
    const baseFont = (options && options.basePxFontSize) || 16;
    const floatVal = parseFloat(token.value);

    if (isNaN(floatVal)) {
      throwSizeError(token.name, token.value, "rem");
    }

    if (floatVal === 0) {
      return "0";
    }

    return `${floatVal / baseFont}rem`;
  },
});

module.exports = {
  parsers: [
    {
      // A custom parser will only run against filenames that match the pattern
      // This pattern will match any file with the .yaml extension.
      // This allows you to mix different types of files in your token source
      pattern: /\.yml$/,
      // the parse function takes a single argument, which is an object with
      // 2 attributes: contents which is a string of the file contents, and
      // filePath which is the path of the file.
      // The function is expected to return a plain object.
      parse: ({ contents, filePath }) => yaml.parse(contents),
    },
  ],
  source: ["tokens/!(figma-export)/**/*.{json,yml}", "tokens/*.{json,yml}"],
  platforms: {
    // SCSS is only used to iterate over sass maps to generate dynamic custom
    // properties. SCSS variables should not actually be used in code directly.
    scss: {
      transforms: [
        "attribute/cti",
        "name/cti/kebab",
        "time/seconds",
        "content/icon",
        "size/rem",
        "color/hsl",
        "shadow/spreadShadow",
        "border/radius",
        "size/pxToRem",
      ],
      buildPath: "build/scss/",
      files: [
        {
          destination: "tokens.scss",
          format: "scss/map-deep",
        },
      ],
    },
    css: {
      transforms: [
        "attribute/cti",
        "name/cti/kebab",
        "time/seconds",
        "content/icon",
        "size/rem",
        "color/hsl",
        "shadow/spreadShadow",
        "border/radius",
        "size/pxToRem",
      ],
      buildPath: "build/css/",
      files: [
        {
          destination: "tokens.css",
          format: "css/variables",
        },
      ],
      options: {
        outputReferences: true,
      },
    },
    json: {
      transforms: [
        "attribute/cti",
        "name/cti/pascal",
        "time/seconds",
        "content/icon",
        "size/rem",
        "color/hsl",
        "shadow/spreadShadow",
        "border/radius",
        "size/pxToRem",
      ],
      buildPath: "build/json/",
      files: [
        {
          destination: "tokens.json",
          format: "json/nested",
        },
      ],
    },
  },
};
