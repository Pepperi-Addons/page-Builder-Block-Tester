import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { TranslateLoader, TranslateModule, TranslateService, TranslateStore } from '@ngx-translate/core';
import { PepAddonService, PepFileService, PepHttpService } from '@pepperi-addons/ngx-lib';
import { PepTextareaModule } from '@pepperi-addons/ngx-lib/textarea';
import { PepButtonModule } from '@pepperi-addons/ngx-lib/button';



import { PageTesterComponent } from './index';

import { config } from '../addon.config';

export const routes: Routes = [
    {
        path: '',
        component: PageTesterComponent
    }
];

@NgModule({
    declarations: [PageTesterComponent],
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
        }),
        RouterModule.forChild(routes)
    ],
    exports: [PageTesterComponent],
    providers: [
        TranslateStore,
        // Add here all used services.
    ]
})
export class PageTesterModule {
    constructor(
        translate: TranslateService,
        private pepAddonService: PepAddonService
    ) {
        this.pepAddonService.setDefaultTranslateLang(translate);
    }
}
