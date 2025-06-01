# @v1/assets

OrbitKit's assets package

## Description

This package contains various assets used across OrbitKit projects, including fonts and potentially other resources.

## Installation

As this package is private, it can be installed within the OrbitKit monorepo using:

```bash
bun add @v1/assets
```

## Contents

### Fonts

The package includes two custom fonts:

1. Geist Sans
2. Geist Mono

These fonts are available in variable font format (.ttf) and can be used in your projects by importing the provided stylesheet.

To use the fonts in your project, import the stylesheet:

```css
@import '@v1/assets/fonts/stylesheet.css';
```

Then, you can use the fonts in your CSS:

```css
body {
    font-family: var(--font-geist-sans);
}
code {
    font-family: var(--font-geist-mono);
}
```

## Usage

After installing the package, you can access the assets in your project. The exact usage may depend on your build setup and the specific assets you need to use.

## License

This package is licensed under the MIT License.

## Contributing

As this is a private package within the OrbitKit monorepo, please refer to the main repository's contributing guidelines.

## Changelog

For a detailed list of changes in each version, please refer to the [CHANGELOG.md](./CHANGELOG.md) file.
