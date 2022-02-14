import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ConsumerBlockEditorComponent } from './index';


@NgModule({
    declarations: [ConsumerBlockEditorComponent],
    imports: [
        CommonModule,
    ],
    exports: [ConsumerBlockEditorComponent]
})
export class ConsumerBlockEditorModule {
    constructor(
    ) {
    }
}
