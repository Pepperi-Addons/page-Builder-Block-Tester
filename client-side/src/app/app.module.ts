import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BlockTesterModule } from './block/block.module';
import { BlockTesterEditorModule } from './block-editor/block-editor.module';

@NgModule({
    imports: [
        BrowserModule,
        BlockTesterModule,
        BlockTesterEditorModule
    ],
    declarations: [
        AppComponent
    ],
    providers: [],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
