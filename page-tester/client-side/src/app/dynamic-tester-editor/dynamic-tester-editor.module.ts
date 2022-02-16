import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicTesterEditorComponent } from './dynamic-tester-editor.component';
import { ConfigParserService } from 'src/app/services/config-parser.service';
import { PepTextareaModule } from '@pepperi-addons/ngx-lib/textarea';

@NgModule({
  declarations: [
    DynamicTesterEditorComponent
  ],
  imports: [
    CommonModule,
    PepTextareaModule,
  ],
  exports: [
    DynamicTesterEditorComponent
  ],
  providers:[
    ConfigParserService
  ]
})
export class DynamicTesterEditorModule { 
  constructor(){}
}
