import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicTesterEditorComponent } from './dynamic-tester-editor.component';
import { ConfigParserService } from 'src/app/services/config-parser.service';
import { PepTextareaModule } from '@pepperi-addons/ngx-lib/textarea';

import { HttpClient } from '@angular/common/http';

import { TranslateLoader, TranslateModule, TranslateService, TranslateStore } from '@ngx-translate/core';
import { PepAddonService, PepFileService } from '@pepperi-addons/ngx-lib';
import { config } from 'src/app/addon.config';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    component: DynamicTesterEditorComponent
  }
];
@NgModule({
  declarations: [
    DynamicTesterEditorComponent
  ],
  imports: [
    CommonModule,
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
  exports: [
    DynamicTesterEditorComponent
  ],
  providers:[
    TranslateStore,
    ConfigParserService
  ]
})
export class DynamicTesterEditorModule { 
  constructor(
    translate: TranslateService,
    private pepAddonService: PepAddonService
  ) {
    this.pepAddonService.setDefaultTranslateLang(translate);
  }
}
