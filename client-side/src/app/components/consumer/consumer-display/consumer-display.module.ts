import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsumerDisplayComponent } from './consumer-display.component';
import { PepTextareaModule } from '@pepperi-addons/ngx-lib/textarea';



@NgModule({
  declarations: [
    ConsumerDisplayComponent
  ],
  imports: [
    CommonModule,
    PepTextareaModule
  ],
  exports: [ConsumerDisplayComponent],
})
export class ConsumerDisplayModule { }
