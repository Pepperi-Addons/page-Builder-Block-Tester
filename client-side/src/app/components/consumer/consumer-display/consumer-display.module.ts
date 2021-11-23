import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsumerDisplayComponent } from './consumer-display.component';



@NgModule({
  declarations: [
    ConsumerDisplayComponent
  ],
  exports: [ConsumerDisplayComponent],
  imports: [
    CommonModule
  ]
})
export class ConsumerDisplayModule { }
