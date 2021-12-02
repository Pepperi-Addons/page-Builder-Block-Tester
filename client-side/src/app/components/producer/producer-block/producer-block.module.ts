import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { TranslateLoader, TranslateModule, TranslateService, TranslateStore } from '@ngx-translate/core';

import { PepAddonService, PepFileService } from '@pepperi-addons/ngx-lib';

import { PepButtonModule } from '@pepperi-addons/ngx-lib/button';

import { ProducerBlockComponent } from './producer-block.component';

import {config } from './addon.config';
import { PepCheckboxModule } from '@pepperi-addons/ngx-lib/checkbox';
import { ProducerDisplayModule } from '../producer-display/producer-display.module';

@NgModule({
    declarations: [ProducerBlockComponent],
    imports: [
        CommonModule,
        // HttpClientModule,
        // When not using module as sub-addon please remark this for not loading twice resources
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: (http: HttpClient, fileService: PepFileService, addonService: PepAddonService) => 
                    PepAddonService.createDefaultMultiTranslateLoader(http, fileService, addonService, config.AddonUUID),
                deps: [HttpClient, PepFileService, PepAddonService],
            }, isolate: false
        }),
        // PepNgxLibModule,
        PepButtonModule,
        PepCheckboxModule,
        ProducerDisplayModule
        // PepSelectModule,
        // PepTopBarModule,
        // PepListModule,
        // PepPageLayoutModule,
        // PepImagesFilmstripModule,
        // PepRichHtmlTextareaModule
    ],
    exports: [ProducerBlockComponent],
    providers: [
        // HttpClient,
        TranslateStore,
        // PepHttpService,
        // PepAddonService,
        // PepFileService,
        // PepCustomizationService,
        // PepDialogService
    ]
})
export class ProducerBlockModule {
    constructor(
        translate: TranslateService,
        private pepAddonService: PepAddonService
    ) {
        this.pepAddonService.setDefaultTranslateLang(translate);
    }
}
