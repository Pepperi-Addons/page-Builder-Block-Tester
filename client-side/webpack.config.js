
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");
const share = mf.share;

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(
    path.join(__dirname, './tsconfig.json'),
    [
        /* mapped paths to share */
    ]);

// TODO: Change block_file_name to block name (lowercase and if it more then one word put '_' between them),
// this name should be the same as AddonRelativeURL that declared on the relation object (search for runMigration function in installation.ts file).
const filename = 'block_tester'; // block_file_name

module.exports = {
    output: {
        uniqueName: `${filename}`,
        publicPath: "auto"
    },
    optimization: {
        // Only needed to bypass a temporary bug
        runtimeChunk: false
    },
    resolve: {
        alias: {
        ...sharedMappings.getAliases(),
        }
    },
    plugins: [
        new ModuleFederationPlugin({
            name: `${filename}`,
            filename: `${filename}.js`,
            exposes: {
                './BlockTesterComponent': './src/app/block/index.ts',
                './BlockTesterModule': './src/app/block/index.ts',
                './BlockTesterEditorComponent': './src/app/block-editor/index.ts',
                './BlockTesterEditorModule': './src/app/block-editor/index.ts',
            },
            shared: share({
                "@angular/core": { eager: true, singleton: true, strictVersion: true, requiredVersion: 'auto' }, 
                "@angular/common": { eager: true, singleton: true, strictVersion: true, requiredVersion: 'auto' }, 
                "@angular/common/http": { eager: true, singleton: true, strictVersion: true, requiredVersion: 'auto' }, 
                "@angular/router": { eager: true, singleton: true, strictVersion: true, requiredVersion: 'auto' },
                
                ...sharedMappings.getDescriptors()
            })
        }),
        sharedMappings.getPlugin()
    ]
};