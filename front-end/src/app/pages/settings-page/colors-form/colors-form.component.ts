import { Component, OnInit } from '@angular/core';
import { ThemeSettings } from '../../../Models/ThemeSettings';
import { ThemeSettingsService } from '../../../api/ThemeSettingsService';
import { NgxUiLoaderService } from 'ngx-ui-loader';


@Component({
    selector: 'app-colors-form',
    templateUrl: './colors-form.component.html',
    styleUrls: ['./colors-form.component.css']
})
export class ColorsFormComponent implements OnInit {

    public sidebarBgColor: string  = '';
    public sidebarFontColor: string  = '';

    public settings: ThemeSettings[] = [];

    constructor(
        private themeSettingsService: ThemeSettingsService,
        private ngxLoader: NgxUiLoaderService
    ) {

    }

    sidebarBgColorOnChange(): void {
        this.themeSettingsService.changeSidebarBgColor(this.sidebarBgColor);
    }

    sidebarFontColorOnChange(): void {
        this.themeSettingsService.changeSidebarFontColor(this.sidebarFontColor);
    }

    ngOnInit(): void {
        this.ngxLoader.start();
        /**
         * Fetching sidebarBgColor and subscribing to changes
         */
        this.themeSettingsService.findByName('sidebar_bg_color')
        .subscribe(
            data => {
                this.sidebarBgColor = data[0].value!;
                this.ngxLoader.stop();
            },
            error => {
                console.log(error);
        });
        this.themeSettingsService.sidebarBgColor.subscribe(sidebarBgColor => this.sidebarBgColor = sidebarBgColor);
        
        /**
         * Fetching sidebarFontColor and subscribing to changes
         */
        this.themeSettingsService.findByName('sidebar_font_color')
        .subscribe(
            data => {
                this.sidebarFontColor = data[0].value!;
                this.ngxLoader.stop();
            },
            error => {
                console.log(error);
        });
        this.themeSettingsService.sidebarFontColor.subscribe(sidebarFontColor => this.sidebarFontColor = sidebarFontColor);

    }

}
