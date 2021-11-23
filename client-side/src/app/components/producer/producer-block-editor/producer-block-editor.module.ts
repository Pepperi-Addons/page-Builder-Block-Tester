import { TranslateLoader, TranslateModule, TranslateService, TranslateStore } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProducerBlockEditorComponent } from './producer-block-editor.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PepHttpService, PepAddonService, PepFileService, PepCustomizationService, PepNgxLibModule } from '@pepperi-addons/ngx-lib';
import { PepDialogService } from '@pepperi-addons/ngx-lib/dialog';
import { PepSelectModule } from '@pepperi-addons/ngx-lib/select';
import { PepImagesFilmstripModule } from '@pepperi-addons/ngx-lib/images-filmstrip';
import { PepRichHtmlTextareaModule } from '@pepperi-addons/ngx-lib/rich-html-textarea';
import {config } from './addon.config';
import { PepButtonModule } from '@pepperi-addons/ngx-lib/button';
import { FilterTargetModule } from '../../filter-target/filter-target.module';
import { PepperiTableComponent } from '../../addon';
import { PepListModule } from '@pepperi-addons/ngx-lib/list';
import { ProducerDisplayModule } from '../producer-display/producer-display.module';

@NgModule({
    declarations: [ProducerBlockEditorComponent],
    imports: [
        CommonModule,
        HttpClientModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: (http: HttpClient, fileService: PepFileService, addonService: PepAddonService) => 
                    PepAddonService.createDefaultMultiTranslateLoader(http, fileService, addonService, config.AddonUUID),
                deps: [HttpClient, PepFileService, PepAddonService],
          }, isolate: false
      }),
      PepNgxLibModule,
      PepSelectModule,
      PepImagesFilmstripModule,
      PepRichHtmlTextareaModule,
      PepButtonModule,
      FilterTargetModule,
      ProducerDisplayModule,
    ],
    exports: [ProducerBlockEditorComponent],
    providers: [
        HttpClient,
        TranslateStore,
        PepHttpService,
        PepAddonService,
        PepFileService,
        PepCustomizationService,
        PepDialogService
        
    ]
})
export class ProducerBlockEditorModule {
    constructor(
        translate: TranslateService,
        private pepAddonService: PepAddonService
    ) {
        this.pepAddonService.setDefaultTranslateLang(translate);
    }
}
