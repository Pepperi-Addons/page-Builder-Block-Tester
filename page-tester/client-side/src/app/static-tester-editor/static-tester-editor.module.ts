import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaticTesterEditorComponent } from './index';

@NgModule({
    declarations: [StaticTesterEditorComponent],
    imports: [
        CommonModule,
    ],
    exports: [StaticTesterEditorComponent]
})
export class StaticTesterEditorModule {
    constructor() {
    }
}
