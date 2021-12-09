import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProducerDisplayComponent } from './producer-display.component';
import {MatListModule} from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { GenericListModule } from '../../base-components/generic-list/generic-list.module';
import { TranslateLoader, TranslateModule, TranslateService, TranslateStore } from '@ngx-translate/core';
import { PepAddonService, PepCustomizationService, PepFileService, PepHttpService } from '@pepperi-addons/ngx-lib';
import { HttpClient } from '@angular/common/http';
import { config } from '../../addon.config';
import { PepDialogService } from '@pepperi-addons/ngx-lib/dialog';




@NgModule({
  declarations: [
    ProducerDisplayComponent
  ],
  
  imports: [
    CommonModule,
    MatTableModule,
    GenericListModule,
    TranslateModule.forChild({
      loader: {
          provide: TranslateLoader,
          useFactory: (http: HttpClient, fileService: PepFileService, addonService: PepAddonService) => 
              PepAddonService.createDefaultMultiTranslateLoader(http, fileService, addonService, config.AddonUUID),
          deps: [HttpClient, PepFileService, PepAddonService],
    }, isolate: false
    }),
  ],
  exports: [ProducerDisplayComponent],
  providers: [
    HttpClient,
        TranslateStore,
        PepHttpService,
        PepAddonService,
        PepFileService,
        PepCustomizationService
  ]
})
export class ProducerDisplayModule { 

  constructor(
    translate: TranslateService,
    private pepAddonService: PepAddonService
  ) {
      this.pepAddonService.setDefaultTranslateLang(translate);
  }

}
