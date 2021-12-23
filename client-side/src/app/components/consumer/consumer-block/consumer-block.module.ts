import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';


import { PepAddonService, PepFileService, PepCustomizationService } from '@pepperi-addons/ngx-lib';
import { PepDialogService } from '@pepperi-addons/ngx-lib/dialog';
import { PepImagesFilmstripModule } from '@pepperi-addons/ngx-lib/images-filmstrip';


import { ConsumerBlockComponent } from './consumer-block.component';

import { config } from './addon.config';
import { ConsumerDisplayModule } from '../consumer-display/consumer-display.module';
@NgModule({
    declarations: [ConsumerBlockComponent],
    imports: [
        CommonModule,
        PepImagesFilmstripModule,
        ConsumerDisplayModule
    ],
    exports: [ConsumerBlockComponent],
    providers: [
        PepDialogService
    ]
})
export class ConsumerBlockModule {
    constructor(
    ) {
    }
}
