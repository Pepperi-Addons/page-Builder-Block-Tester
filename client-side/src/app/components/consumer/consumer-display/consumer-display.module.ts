import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsumerDisplayComponent } from './consumer-display.component';



@NgModule({
  declarations: [
    ConsumerDisplayComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [ConsumerDisplayComponent],
})
export class ConsumerDisplayModule { }
