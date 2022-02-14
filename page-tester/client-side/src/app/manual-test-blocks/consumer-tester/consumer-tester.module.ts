import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { PepTextareaModule } from '@pepperi-addons/ngx-lib/textarea';

import { ConsumerBlockComponent } from './index';

export const routes: Routes = [
    {
        path: '',
        component: ConsumerBlockComponent
    }
];

@NgModule({
    declarations: [ConsumerBlockComponent],
    imports: [
        CommonModule,
        PepTextareaModule,
        RouterModule.forChild(routes)
    ],
    exports: [ConsumerBlockComponent]
})
export class ConsumerBlockModule {
    constructor(
    ) {
    }
}
