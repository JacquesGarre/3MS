import { Component, OnInit, Input } from '@angular/core';
import { ThemeSettings } from '../../../Models/ThemeSettings';
import { ThemeSettingsService } from '../../../api/ThemeSettingsService';
import { NgxUiLoaderService } from 'ngx-ui-loader';


@Component({
    selector: 'app-colors-form',
    templateUrl: './colors-form.component.html',
    styleUrls: ['./colors-form.component.css']
})
export class ColorsFormComponent implements OnInit {

    @Input() sidebarBgColor: string  = '';
    @Input() sidebarFontColor: string  = '';

    constructor(
        private themeSettingsService: ThemeSettingsService,
        private ngxLoader: NgxUiLoaderService
    ) {}

    sidebarBgColorOnChange(): void {
        this.themeSettingsService.changeSidebarBgColor(this.sidebarBgColor);
    }

    sidebarFontColorOnChange(): void {
        this.themeSettingsService.changeSidebarFontColor(this.sidebarFontColor);
    }

    ngOnInit(): void {}

}
