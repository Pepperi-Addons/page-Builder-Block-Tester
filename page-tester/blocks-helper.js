// export interface BlockDetails{
//     blockName: string,
//     fileName: string,
//     componentName: string,
//     moduleName: string,
//     editorComponentName: string,
//     editorModuleName: string
// }

const produceConsumeForLoop = {
    blockName: 'Produce Consume For Loop',
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

const dynamicTester = {
    blockName: 'Dynamic Tester',
    fileName: `dynamic_tester`,
    componentName: "DynamicTesterComponent",
    moduleName: "DynamicTesterModule",
    blockIndexPath: './src/app/dynamic-tester/index.ts',
    editorComponentName: "DynamicTesterEditorComponent",
    blockEditorIndexPath: './src/app/dynamic-tester-editor/index.ts',
    editorModuleName: "DynamicTesterEditorModule",
}

const initTester = {
    blockName: 'Init Tester',
    fileName: `init_tester`,
    componentName: "InitTesterComponent",
    moduleName: "InitTesterModule",
    blockIndexPath: './src/app/init-tester/index.ts',
    editorComponentName: "InitTesterEditorComponent",
    blockEditorIndexPath: './src/app/init-tester-editor/index.ts',
    editorModuleName: "InitTesterEditorModule",
}


const blockDetailsList = [
    produceConsumeForLoop,
    consumerBlock,
    staticTester,
    dynamicTester,
    initTester
]
module.exports = {
    produceConsumeForLoop: produceConsumeForLoop,
    blockDetailsList: blockDetailsList,
    staticTester: staticTester
}



