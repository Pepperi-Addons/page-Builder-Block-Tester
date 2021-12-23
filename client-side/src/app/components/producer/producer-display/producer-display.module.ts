import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProducerDisplayComponent } from './producer-display.component';
import { GenericListModule } from '../../base-components/generic-list/generic-list.module';
import { PepTextboxModule } from '@pepperi-addons/ngx-lib/textbox';




@NgModule({
  declarations: [
    ProducerDisplayComponent
  ],
  
  imports: [
    CommonModule,
    GenericListModule,
    PepTextboxModule
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
