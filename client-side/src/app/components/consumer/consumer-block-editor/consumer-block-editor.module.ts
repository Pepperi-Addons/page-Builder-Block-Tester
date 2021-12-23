// import { TranslateLoader, TranslateModule, TranslateService, TranslateStore } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsumerBlockEditorComponent } from './consumer-block-editor.component';

import { FilterTargetModule } from '../../base-components/filter-target/filter-target.module';
import { ContextResourceModule } from '../../base-components/context-resource/context-resource.module';

@NgModule({
    declarations: [ConsumerBlockEditorComponent],
    imports: [
        CommonModule,
        FilterTargetModule,
        ContextResourceModule
    ],
    exports: [ConsumerBlockEditorComponent],
    providers: [
    ]
})
export class ConsumerBlockEditorModule {
    constructor(
    ) { }
}
