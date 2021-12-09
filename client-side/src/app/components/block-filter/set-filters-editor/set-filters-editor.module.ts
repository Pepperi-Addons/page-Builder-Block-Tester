import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetFiltersEditorComponent } from './set-filters-editor.component';
import { GenericListModule } from '../../base-components/generic-list/generic-list.module';
import { Resource } from '../../options.model';
import { AddBlockFilterModule } from '../add-block-filter/add-block-filter.module';
import { PepButtonModule } from '@pepperi-addons/ngx-lib/button';



@NgModule({
  declarations: [
    SetFiltersEditorComponent
  ],
  imports: [
    CommonModule,
    PepButtonModule,
    GenericListModule,
    AddBlockFilterModule
  ],
  exports: [SetFiltersEditorComponent],
  providers: [Resource]
})
export class SetFiltersEditorModule { }
