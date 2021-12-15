import { PepDialogData, PepDialogService } from '@pepperi-addons/ngx-lib/dialog';
import {  map } from 'rxjs/operators';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";
import { PepLayoutService, PepScreenSizeType } from '@pepperi-addons/ngx-lib';
import { AddonService, PepperiTableComponent } from './index';
import { Observable } from 'rxjs';
import { InstalledAddon, ResourceType } from '@pepperi-addons/papi-sdk';
import { ResourceTypes } from 'papi-sdk-web';
import { FilterTarget } from '../base-components/filter-target/FilterTarget';


@Component({
  selector: 'addon-module',
  templateUrl: './addon.component.html',
  styleUrls: ['./addon.component.scss'],
  providers: [TranslatePipe]
})
export class AddonComponent implements OnInit {

    screenSize: PepScreenSizeType;
    options: {key:ResourceType, value:ResourceType}[] = [{key: "accounts", value: "accounts"}];
    dataSource$: Observable<any[]>
    displayedColumns = ['Name', 'Description'];
    @Input() hostObject: any;
    @Output() hostEvents: EventEmitter<any> = new EventEmitter<any>();
    @ViewChild(PepperiTableComponent) table: PepperiTableComponent;

    constructor(
        public addonService: AddonService,
        public layoutService: PepLayoutService,
        public dialog: PepDialogService,
        public translate: TranslateService
    ) {

        this.layoutService.onResize$.subscribe(size => {
        });

    }

    ngOnInit(){
       this.dataSource$ = this.addonService.pepGet(`/addons/installed_addons`)
       .pipe(
           map((addons: InstalledAddon[]) =>
             addons.filter(addon => addon?.Addon).map(addon => addon?.Addon))
        );
    }

    openDialog(){
        const content = this.translate.instant('Dialog_Body');
        const title = this.translate.instant('Dialog_Title');
        const dataMsg = new PepDialogData({title, actionsType: "close", content});
        this.dialog.openDefaultDialog(dataMsg);
    }

    openTest(){
        const content = 'Test Body';
        const title = 'Test Title';
        const dataMsg = new PepDialogData({title, actionsType: "close", content});
        this.dialog.openDefaultDialog(dataMsg);
    }

    setValue(value : FilterTarget){
        console.log(value);

    }



}
