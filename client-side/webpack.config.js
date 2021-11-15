const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const singleSpaAngularWebpack = require('single-spa-angular-webpack5/lib/webpack').default;
const webpack = require('webpack');
const { merge } = require('webpack-merge');
// const deps = require('./package.json').dependencies;
const shared = {
  // ...deps,
  "@angular/core": { eager: true, singleton: true, strictVersion: false },
  "@angular/common": { eager: true, singleton: true, strictVersion: false },
  "@angular/common/http": { eager: true, singleton: true, strictVersion: false },
  "rxjs": { eager: true, singleton: true, strictVersion: false },
  "@ngx-translate/core": { eager: true, singleton: true, strictVersion: false },
  "@angular/router": { eager: true, singleton: true,  strictVersion: false }
}
module.exports = (config, options, env) => {

    config.plugins.push(
        new webpack.DefinePlugin({
          CLIENT_MODE: JSON.stringify(env.configuration),
        })
    )
// Only if you need standalone
    if (env.configuration === 'Standalone') {
        return config;
    }
    else {
        const mfConfig = {
            output: {
              uniqueName: "pagebuildertester",
              publicPath: "auto"
            },
            optimization: {
              // Only needed to bypass a temporary bug
              runtimeChunk: false
            },
            plugins: [
              // new ModuleFederationPlugin({
              //   // remotes: {},
              //   name: "addonblock",
              //   filename: "addonblock.js",
              //   exposes: {
              //     './AddonComponent': './src/app/components/addon/index.ts',
              //     './AddonModule': './src/app/components/addon/index.ts',
              //   },
              //   shared: {
              //     // ...deps,
              //     "@angular/core": { eager: true, singleton: true, strictVersion: false },
              //     "@angular/common": { eager: true, singleton: true, strictVersion: false },
              //     "@angular/common/http": { eager: true, singleton: true, strictVersion: false },
              //     "rxjs": { eager: true, singleton: true, strictVersion: false },
              //     "@ngx-translate/core": { eager: true, singleton: true, strictVersion: false },
              //     "@angular/router": { eager: true, singleton: true,  strictVersion: false }
              //   }
              // }),
              new ModuleFederationPlugin({
                // remotes: {},
                name: "consumer",
                filename: "consumer.js",
                exposes: {
                  './ConsumerBlockComponent': './src/app/components/consumer-block/index.ts',
                  './ConsumerBlockModule': './src/app/components/consumer-block/index.ts',
                  './ConsumerBlockEditorComponent': './src/app/components/consumer-block-editor/index.ts',
                  './ConsumerBlockEditorModule': './src/app/components/consumer-block-editor/index.ts',
                },
                shared: {
                  // ...deps,
                  "@angular/core": { eager: true, singleton: true, strictVersion: false },
                  "@angular/common": { eager: true, singleton: true, strictVersion: false },
                  "@angular/common/http": { eager: true, singleton: true, strictVersion: false },
                  "rxjs": { eager: true, singleton: true, strictVersion: false },
                  "@ngx-translate/core": { eager: true, singleton: true, strictVersion: false },
                  "@angular/router": { eager: true, singleton: true,  strictVersion: false }
                }
              }),
              new ModuleFederationPlugin({
                // remotes: {},
                name: "producer",
                filename: "producer.js",
                exposes: {
                  './ProducerBlockComponent': './src/app/components/producer-block/index.ts',
                  './ProducerBlockModule': './src/app/components/producer-block/index.ts',
                  './ProducerBlockEditorComponent': './src/app/components/producer-block-editor/index.ts',
                  './ProducerBlockEditorModule': './src/app/components/producer-block-editor/index.ts'
                },
                shared: {
                  // ...deps,
                  "@angular/core": { eager: true, singleton: true, strictVersion: false },
                  "@angular/common": { eager: true, singleton: true, strictVersion: false },
                  "@angular/common/http": { eager: true, singleton: true, strictVersion: false },
                  "rxjs": { eager: true, singleton: true, strictVersion: false },
                  "@ngx-translate/core": { eager: true, singleton: true, strictVersion: false },
                  "@angular/router": { eager: true, singleton: true,  strictVersion: false }
                }
              })
            ],
          };
        const merged = merge(config, mfConfig);
        const singleSpaWebpackConfig = singleSpaAngularWebpack(merged, options);
        return singleSpaWebpackConfig;
    }

    // Feel free to modify this webpack config however you'd like to
};
