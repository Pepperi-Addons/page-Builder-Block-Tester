import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddBlockFilterComponent } from './add-block-filter.component';
import { PepSelectModule } from '@pepperi-addons/ngx-lib/select';
import { PepTextboxModule } from '@pepperi-addons/ngx-lib/textbox';
import { PepButtonModule } from '@pepperi-addons/ngx-lib/button';



@NgModule({
  declarations: [
    AddBlockFilterComponent
  ],
  imports: [
    CommonModule,
    PepSelectModule,
    PepTextboxModule,
    PepButtonModule
  ],
  exports: [AddBlockFilterComponent]
})
export class AddBlockFilterModule { }
