import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { PageTesterModule } from './block/block.module';
import { PageTesterEditorModule } from './block-editor/block-editor.module';

@NgModule({
    imports: [
        BrowserModule,
        PageTesterModule,
        PageTesterEditorModule
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
