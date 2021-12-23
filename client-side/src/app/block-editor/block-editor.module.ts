import { TranslateLoader, TranslateModule, TranslateService, TranslateStore } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PepAddonService, PepFileService } from '@pepperi-addons/ngx-lib';

import { BlockTesterEditorComponent as BlockTesterEditorComponent } from './index';

import { config } from '../addon.config';
import { ProducerBlockEditorModule } from '../components/producer/producer-block-editor';
import { ConsumerBlockEditorModule } from '../components/consumer/consumer-block-editor';
import { PepCheckboxModule } from '@pepperi-addons/ngx-lib/checkbox';

@NgModule({
    declarations: [BlockTesterEditorComponent],
    imports: [
        CommonModule,
        ProducerBlockEditorModule,
        ConsumerBlockEditorModule,
        PepCheckboxModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: (http: HttpClient, fileService: PepFileService, addonService: PepAddonService) => 
                    PepAddonService.createDefaultMultiTranslateLoader(http, fileService, addonService, config.AddonUUID),
                deps: [HttpClient, PepFileService, PepAddonService],
            }, isolate: false
        }),
    ],
    exports: [BlockTesterEditorComponent],
    providers: [
        TranslateStore,
        // Add here all used services.
    ]
})
export class BlockTesterEditorModule {
    constructor(
        translate: TranslateService,
        private pepAddonService: PepAddonService
    ) {
        this.pepAddonService.setDefaultTranslateLang(translate);
    }
}
