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
    appTitle: string = '';
    appIcon: string = '';
    sidebarBgColor: string  = '';
    sidebarFontColor: string  = '';

    constructor(
        private themeSettingsService: ThemeSettingsService,
        private ngxLoader: NgxUiLoaderService
    ) { }

    appTitleOnChange(): void {
        this.themeSettingsService.changeAppTitle(this.appTitle);
    }

    appIconOnChange(): void {
        this.themeSettingsService.changeAppIcon(this.appIcon);
    }

    ngOnInit(): void {
        
        this.ngxLoader.startLoader("page-loader");
        // Fetching app title
        this.themeSettingsService.getAll()
        .subscribe(
            settings => {
                settings.map((setting) => {
                    switch(setting.name){
                        case 'sidebar_bg_color':
                            this.sidebarBgColor = setting.value!;
                        break;
                        case 'sidebar_font_color':
                            this.sidebarFontColor = setting.value!;
                        break;
                        case 'app_title':
                            this.appTitle = setting.value!;
                        break;
                        case 'app_icon':
                            this.appIcon = setting.value!;
                        break;
                    }
                });
                this.ngxLoader.stopLoader("page-loader");
            },
            error => {
                console.log(error);
        });
        this.themeSettingsService.sidebarBgColor.subscribe(sidebarBgColor => this.sidebarBgColor = sidebarBgColor);
        this.themeSettingsService.sidebarFontColor.subscribe(sidebarFontColor => this.sidebarFontColor = sidebarFontColor);
        this.themeSettingsService.appTitle.subscribe(appTitle => this.appTitle = appTitle);
        this.themeSettingsService.appIcon.subscribe(appIcon => this.appIcon = appIcon);
    }






}
