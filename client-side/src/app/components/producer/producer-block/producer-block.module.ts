import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { PepAddonService, PepFileService } from '@pepperi-addons/ngx-lib';

import { PepButtonModule } from '@pepperi-addons/ngx-lib/button';

import { ProducerBlockComponent } from './producer-block.component';

import {config } from './addon.config';
import { ProducerDisplayModule } from '../producer-display/producer-display.module';
import { SetFiltersEditorModule } from '../block-filter/set-filters-editor/set-filters-editor.module';
import { BlockFiltersService } from '../block-filter/block-filters.service';

@NgModule({
    declarations: [ProducerBlockComponent],
    imports: [
        CommonModule,
        PepButtonModule,
        ProducerDisplayModule,
        SetFiltersEditorModule

    ],
    exports: [ProducerBlockComponent],
    providers: [
        BlockFiltersService
    ]
})
export class ProducerBlockModule {
    constructor(
    ) {
    }
}
