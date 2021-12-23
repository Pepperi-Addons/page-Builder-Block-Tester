import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericListComponent } from './generic-list.component';
import { PepListModule } from '@pepperi-addons/ngx-lib/list';
import { PepMenuModule } from '@pepperi-addons/ngx-lib/menu';
import { PepTopBarModule } from '@pepperi-addons/ngx-lib/top-bar';
import { PepSearchModule } from '@pepperi-addons/ngx-lib/search';
import { PepDataConvertorService, PepLayoutService } from '@pepperi-addons/ngx-lib';



@NgModule({
  declarations: [GenericListComponent],
  imports: [
    CommonModule,
    PepListModule,
    PepMenuModule,
    PepTopBarModule,
    PepSearchModule,
  ],
  exports:[GenericListComponent],
  providers:[
    PepLayoutService,
    PepDataConvertorService
  ]
})
export class GenericListModule { 
  constructor(
) {
  }
}
