import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PepTextareaModule } from '@pepperi-addons/ngx-lib/textarea';
import { PepButtonModule } from '@pepperi-addons/ngx-lib/button';
import { HttpClient } from '@angular/common/http';

import { TranslateLoader, TranslateModule, TranslateStore } from '@ngx-translate/core';
import { PepAddonService, PepFileService } from '@pepperi-addons/ngx-lib';
import { config } from 'src/app/addon.config';
import { StaticTesterComponent } from './index';
import { AddonService } from '../services/addon.service';



@NgModule({
    declarations: [StaticTesterComponent],
    imports: [
        CommonModule,
        PepTextareaModule,
        PepButtonModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: (http: HttpClient, fileService: PepFileService, addonService: PepAddonService) => 
                    PepAddonService.createDefaultMultiTranslateLoader(http, fileService, addonService, config.AddonUUID),
                deps: [HttpClient, PepFileService, PepAddonService],
            }, isolate: false
        })
    ],
    exports: [StaticTesterComponent],
    providers: [
        TranslateStore
    ]
})
export class StaticTesterModule {
    constructor(){}
}
