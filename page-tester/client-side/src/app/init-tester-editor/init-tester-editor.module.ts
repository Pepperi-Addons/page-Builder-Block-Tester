import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InitTesterEditorComponent } from './init-tester-editor.component';
import { DynamicTesterEditorModule } from '../dynamic-tester-editor';




@NgModule({
  declarations: [
    InitTesterEditorComponent
  ],
  imports: [
    CommonModule,
    DynamicTesterEditorModule
  ],
  exports:[
    InitTesterEditorComponent
  ]
})
export class InitTesterEditorModule {
  constructor(){}
 }
