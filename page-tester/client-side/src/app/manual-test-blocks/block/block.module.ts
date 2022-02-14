import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { PepTextareaModule } from '@pepperi-addons/ngx-lib/textarea';
import { PepButtonModule } from '@pepperi-addons/ngx-lib/button';



import { PageTesterComponent } from './index';

export const routes: Routes = [
    {
        path: '',
        component: PageTesterComponent
    }
];

@NgModule({
    declarations: [PageTesterComponent],
    imports: [
        CommonModule,
        PepTextareaModule,
        PepButtonModule,
        RouterModule.forChild(routes)
    ],
    exports: [PageTesterComponent],
   
})
export class PageTesterModule {
    constructor(
    ) {
    }
}
