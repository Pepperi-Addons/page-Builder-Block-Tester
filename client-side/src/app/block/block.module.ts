import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { TranslateLoader, TranslateModule, TranslateService, TranslateStore } from '@ngx-translate/core';
import { PepAddonService, PepFileService, PepHttpService } from '@pepperi-addons/ngx-lib';

import { BlockTesterComponent as BlockTesterComponent } from './index';

import { config } from '../addon.config';
import { ProducerBlockModule } from '../components/producer/producer-block';
import { ConsumerBlockModule } from '../components/consumer/consumer-block';
import { PepCheckboxModule } from '@pepperi-addons/ngx-lib/checkbox';

export const routes: Routes = [
    {
        path: '',
        component: BlockTesterComponent
    }
];

@NgModule({
    declarations: [BlockTesterComponent],
    imports: [
        CommonModule,
        ProducerBlockModule,
        ConsumerBlockModule,
        PepCheckboxModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: (http: HttpClient, fileService: PepFileService, addonService: PepAddonService) => 
                    PepAddonService.createDefaultMultiTranslateLoader(http, fileService, addonService, config.AddonUUID),
                deps: [HttpClient, PepFileService, PepAddonService],
            }, isolate: false
        }),
        RouterModule.forChild(routes)
    ],
    exports: [BlockTesterComponent],
    providers: [
        TranslateStore,
        // Add here all used services.
    ]
})
export class BlockTesterModule {
    constructor(
        translate: TranslateService,
        private pepAddonService: PepAddonService
    ) {
        this.pepAddonService.setDefaultTranslateLang(translate);
    }
}
