// export interface BlockDetails{
//     blockName: string,
//     fileName: string,
//     componentName: string,
//     moduleName: string,
//     editorComponentName: string,
//     editorModuleName: string
// }

const produceConsumeForLoop = {
    blockName: 'Produce/Consume For Loop',
    fileName: `prd_con_for_loop`,
    componentName: "PageTesterComponent",
    moduleName: "PageTesterModule",
    blockIndexPath: './src/app/manual-test-blocks/block/index.ts',
    editorComponentName: "PageTesterEditorComponent",
    editorModuleName: "PageTesterEditorModule",
    blockEditorIndexPath: './src/app/manual-test-blocks/block-editor/index.ts'
}

const consumerBlock = {
    blockName: 'Consumer Block',
    fileName: `consumer_block`,
    componentName: "ConsumerBlockComponent",
    moduleName: "ConsumerBlockModule",
    blockIndexPath: './src/app/manual-test-blocks/consumer-tester/index.ts',
    editorComponentName: "ConsumerBlockEditorComponent",
    editorModuleName: "ConsumerBlockEditorModule",
    blockEditorIndexPath: './src/app/manual-test-blocks/consumer-tester-editor/index.ts'
}

const staticTester = {
    blockName: 'Static Tester',
    fileName: `static_tester`,
    componentName: "StaticTesterComponent",
    moduleName: "StaticTesterModule",
    blockIndexPath: './src/app/static-tester/index.ts',
    editorComponentName: "StaticTesterEditorComponent",
    blockEditorIndexPath: './src/app/static-tester-editor/index.ts',
    editorModuleName: "StaticTesterEditorModule",
}


const blockDetailsList = [
    produceConsumeForLoop,
    consumerBlock,
    staticTester
]
module.exports = {
    produceConsumeForLoop: produceConsumeForLoop,
    blockDetailsList: blockDetailsList,
    staticTester: staticTester
}



