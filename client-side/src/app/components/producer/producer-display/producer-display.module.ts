import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProducerDisplayComponent } from './producer-display.component';
import {MatListModule} from '@angular/material/list';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { GenericListModule } from '../../generic-list/generic-list.module';




@NgModule({
  declarations: [
    ProducerDisplayComponent
  ],
  exports: [ProducerDisplayComponent],
  imports: [
    CommonModule,
    MatTableModule,
    GenericListModule
  ]
})
export class ProducerDisplayModule { }
