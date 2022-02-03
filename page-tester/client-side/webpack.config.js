
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");
const {blockDetailsList} = require("../blocks-helper.js");

const share = mf.share;

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(
    path.join(__dirname, './tsconfig.json'),
    [
        /* mapped paths to share */
    ]);

// TODO: Change block_file_name to block name (lowercase and if it more then one word put '_' between them),
// this name should be the same as AddonRelativeURL that declared on the relation object (search for runMigration function in installation.ts file).
const filename = 'page_tester'; // block_file_name

const shareObjectsConfig = {
    "@angular/core": { eager: true, singleton: true, strictVersion: true, requiredVersion: 'auto' },
    "@angular/common": { eager: true, singleton: true, strictVersion: true, requiredVersion: 'auto' },
    "@angular/common/http": { eager: true, singleton: true, strictVersion: true, requiredVersion: 'auto' },
    "@angular/router": { eager: true, singleton: true, strictVersion: true, requiredVersion: 'auto' },

    ...sharedMappings.getDescriptors()
};
function convertDetailsToModuleFed(){
    const moduleFedArray = [];
    moduleFedArray.push(sharedMappings.getPlugin());
    blockDetailsList.forEach((blockDetails) => 
    moduleFedArray.push(new ModuleFederationPlugin({
        name: blockDetails.fileName,
        filename: `${blockDetails.fileName}.js`,
        exposes: {
            ['./'+blockDetails.componentName]: './src/app/block/index.ts',
            ['./'+blockDetails.moduleName]: './src/app/block/index.ts',
            ['./'+blockDetails.editorComponentName]: './src/app/block-editor/index.ts',
            ['./'+blockDetails.editorModuleName]: './src/app/block-editor/index.ts',
        },
        shared: share(shareObjectsConfig)
    })));
    return moduleFedArray;
}
// const moduleFedArray = blockDetailsList.map(function (blockDetails) {
//     return new ModuleFederationPlugin({
//     name: blockDetails.fileName,
//     filename: `${blockDetails.fileName}.js`,
//     exposes: {
//         ['./'+blockDetails.componentName]: './src/app/block/index.ts',
//         ['./'+blockDetails.moduleName]: './src/app/block/index.ts',
//         ['./'+blockDetails.editorComponentName]: './src/app/block-editor/index.ts',
//         ['./'+blockDetails.editorModuleName]: './src/app/block-editor/index.ts',
//     },
//     shared: share(shareObjectsConfig)
// })}).push(sharedMappings.getPlugin());

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
        ...sharedMappings.getAliases()
        }
    },
    plugins: convertDetailsToModuleFed(),
    // [
    //     // moduleFedArray,
        
    //     // new ModuleFederationPlugin({
    //     //     name: `${filename}`,
    //     //     filename: `${filename}.js`,
    //     //     exposes: {
    //     //         './PageTesterComponent': './src/app/block/index.ts',
    //     //         './PageTesterModule': './src/app/block/index.ts',
    //     //         './PageTesterEditorComponent': './src/app/block-editor/index.ts',
    //     //         './PageTesterEditorModule': './src/app/block-editor/index.ts',
    //     //     },
    //     //     shared: share(shareObjectsConfig)
    //     // }),
    //     // new ModuleFederationPlugin({
    //     //     name: produceConsumeForLoop.fileName,
    //     //     filename: `${produceConsumeForLoop.fileName}.js`,
    //     //     exposes: {
    //     //         ['./'+produceConsumeForLoop.componentName]: './src/app/block/index.ts',
    //     //         ['./'+produceConsumeForLoop.moduleName]: './src/app/block/index.ts',
    //     //         ['./'+produceConsumeForLoop.editorComponentName]: './src/app/block-editor/index.ts',
    //     //         ['./'+produceConsumeForLoop.editorModuleName]: './src/app/block-editor/index.ts',
    //     //     },
    //     //     shared: share(shareObjectsConfig)
    //     // }),
    //     // sharedMappings.getPlugin()
    // ]
};