# Shopify Template

Our base for Shopify stores. It supports LESS, folders in the assets directory and is an alternative to [Theme Kit](https://shopify.github.io/themekit/).

## Install
1. Make sure you have Grunt's cli installed: `npm i -g grunt-cli`
2. Install npm dependencies for your project with `npm i`
3. Upload your theme into Shopify see: [Theme Kit Documentation](https://help.shopify.com/en/manual/using-themes/adding-themes#upload-a-theme-file-from-your-computer)
4. Create and configure your API keys here with a `Read and write` access to `Theme templates and theme assets` only.
5. Add the credentials in your `config.json` file. See `config.json.example` for the wanted format.

## Builds
Run `grunt build` the build will upload directly in your staging theme.

## Development workflow
Run `grunt watch` and it will upload every changes directly to Shopify. The CSS compilation is done locally so the livereloading is done at a correct timing and the theme is ready to preview your changes.

## Deployments
Run `grunt deploy:<env>` build and upload all the files in Shopify.
