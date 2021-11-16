import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterTargetComponent } from './filter-target.component';
import { PepSelectModule } from '@pepperi-addons/ngx-lib/select';
import { PepTextboxModule } from '@pepperi-addons/ngx-lib/textbox';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { PepAddonService, PepFileService } from '@pepperi-addons/ngx-lib';
import { HttpClient } from '@angular/common/http';
import { config } from '../addon.config';



@NgModule({
  declarations: [
    FilterTargetComponent
  ],
  exports: [FilterTargetComponent],
  imports: [
    CommonModule,
    PepSelectModule,
    PepTextboxModule,
    TranslateModule.forChild({
      loader: {
          provide: TranslateLoader,
          useFactory: (http: HttpClient, fileService: PepFileService, addonService: PepAddonService) => 
              PepAddonService.createDefaultMultiTranslateLoader(http, fileService, addonService, config.AddonUUID),
          deps: [HttpClient, PepFileService, PepAddonService],
      }, isolate: false
  })
  ]
})
export class FilterTargetModule { }
