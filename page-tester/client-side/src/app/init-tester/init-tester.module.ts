import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InitTesterComponent } from './init-tester.component';
import { ConfigParserService } from '../services/config-parser.service';
import { PepTextareaModule } from '@pepperi-addons/ngx-lib/textarea';
import { PepTextboxModule } from '@pepperi-addons/ngx-lib/textbox';

import { HttpClient } from '@angular/common/http';

import { TranslateLoader, TranslateModule, TranslateService, TranslateStore } from '@ngx-translate/core';
import { PepAddonService, PepFileService } from '@pepperi-addons/ngx-lib';
import { config } from 'src/app/addon.config';



@NgModule({
  declarations: [
    InitTesterComponent
  ],
  imports: [
    CommonModule,
    PepTextareaModule,
    PepTextboxModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient, fileService: PepFileService, addonService: PepAddonService) =>
          PepAddonService.createDefaultMultiTranslateLoader(http, fileService, addonService, config.AddonUUID),
        deps: [HttpClient, PepFileService, PepAddonService],
      }, isolate: false
    })
  ],
  exports: [
    InitTesterComponent
  ],
  providers:[
    ConfigParserService,
    TranslateStore
  ]
})
export class InitTesterModule {
  constructor(){}
 }
