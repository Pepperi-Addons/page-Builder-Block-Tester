import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsumerDisplayComponent } from './consumer-display.component';
import { PepTextareaModule } from '@pepperi-addons/ngx-lib/textarea';
import { PepTextboxModule } from '@pepperi-addons/ngx-lib/textbox';



@NgModule({
  declarations: [
    ConsumerDisplayComponent
  ],
  imports: [
    CommonModule,
    PepTextareaModule,
    PepTextboxModule
  ],
  exports: [ConsumerDisplayComponent],
})
export class ConsumerDisplayModule { }
