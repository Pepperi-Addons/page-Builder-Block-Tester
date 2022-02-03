// import { TranslateLoader, TranslateModule, TranslateService, TranslateStore } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProducerBlockEditorComponent } from './producer-block-editor.component';
import { PepDialogService } from '@pepperi-addons/ngx-lib/dialog';
import { PepButtonModule } from '@pepperi-addons/ngx-lib/button';
import { FilterTargetModule } from '../../base-components/filter-target/filter-target.module';
import { GenericListModule } from '../../base-components/generic-list/generic-list.module';
import { PepTopBarModule } from '@pepperi-addons/ngx-lib/top-bar';
import { PepGenericListModule } from '@pepperi-addons/ngx-composite-lib/generic-list';

@NgModule({
    declarations: [ProducerBlockEditorComponent],
    imports: [
        CommonModule,
        // PepButtonModule,
        // FilterTargetModule,
        // ContextResourceModule,
        // GenericListModule,
        // PepTopBarModule
    ],
    exports: [ProducerBlockEditorComponent],
    providers: [
        PepDialogService,
        PepGenericListModule
    ]
})
export class ProducerBlockEditorModule {
    constructor(
    ) {
    }
}
