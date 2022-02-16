import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicTesterComponent } from './dynamic-tester.component';

import { HttpClient } from '@angular/common/http';

import { TranslateLoader, TranslateModule, TranslateService, TranslateStore } from '@ngx-translate/core';
import { PepAddonService, PepFileService } from '@pepperi-addons/ngx-lib';
import { config } from 'src/app/addon.config';
import { RouterModule, Routes } from '@angular/router';
import { ConfigParserService } from 'src/app/services/config-parser.service';
import { PepButtonModule } from '@pepperi-addons/ngx-lib/button';
import { PepTextareaModule } from '@pepperi-addons/ngx-lib/textarea';

export const routes: Routes = [
  {
    path: '',
    component: DynamicTesterComponent
  }
];

@NgModule({
  declarations: [
    DynamicTesterComponent
  ],
  imports: [
    CommonModule,
    PepButtonModule,
    PepTextareaModule,
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
  exports: [DynamicTesterComponent],
  providers: [
    TranslateStore,
    ConfigParserService
  ]
})
export class DynamicTesterModule {
  constructor(
    translate: TranslateService,
    private pepAddonService: PepAddonService
  ) {
    this.pepAddonService.setDefaultTranslateLang(translate);
  }
}
