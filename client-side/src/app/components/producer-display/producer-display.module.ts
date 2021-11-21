import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProducerDisplayComponent } from './producer-display.component';



@NgModule({
  declarations: [
    ProducerDisplayComponent
  ],
  exports: [ProducerDisplayComponent],
  imports: [
    CommonModule
  ]
})
export class ProducerDisplayModule { }
