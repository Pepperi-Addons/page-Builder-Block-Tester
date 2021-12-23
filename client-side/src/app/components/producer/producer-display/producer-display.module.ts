import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProducerDisplayComponent } from './producer-display.component';
import {MatListModule} from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { GenericListModule } from '../../base-components/generic-list/generic-list.module';
// import { TranslateLoader, TranslateModule, TranslateService, TranslateStore } from '@ngx-translate/core';
import { PepAddonService, PepCustomizationService, PepFileService, PepHttpService } from '@pepperi-addons/ngx-lib';
import { HttpClient } from '@angular/common/http';
import { PepDialogService } from '@pepperi-addons/ngx-lib/dialog';




@NgModule({
  declarations: [
    ProducerDisplayComponent
  ],
  
  imports: [
    CommonModule,
    GenericListModule,
  ],
  exports: [ProducerDisplayComponent],
  providers: [
    
  ]
})
export class ProducerDisplayModule { 

  constructor(
  ) {

  }

}
