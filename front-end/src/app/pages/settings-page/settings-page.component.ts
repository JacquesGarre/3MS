import { Component, OnInit } from '@angular/core';
import { ThemeSettings } from '../../Models/ThemeSettings';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ThemeSettingsService } from '../../api/ThemeSettingsService';


@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.css']
})
export class SettingsPageComponent implements OnInit {

    settings: ThemeSettings[] = [];
    appTitle: string = 'test';

    constructor(
        private themeSettingsService: ThemeSettingsService,
        private ngxLoader: NgxUiLoaderService
    ) { }

    appTitleOnChange(): void {
        this.themeSettingsService.changeAppTitle(this.appTitle);
    }

    ngOnInit(): void {
        this.ngxLoader.start();
        /**
         * Fetching appTitle and subscribing to changes
         */
        this.themeSettingsService.findByName('app_title')
        .subscribe(
            data => {
                this.appTitle = data[0].value!;
                this.ngxLoader.stop();
            },
            error => {
                console.log(error);
        });
        this.themeSettingsService.appTitle.subscribe(appTitle => this.appTitle = appTitle);
    }






}
