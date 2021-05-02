import { Component, OnInit, Input } from '@angular/core';
import {
    faTachometerAlt,
    faLaughWink,
    faCog,
    faCogs,
    faWrench,
    faFolder,
    faChartArea,
    faTable,
    faBars,
    faSearch,
    faBell,
    faFileAlt,
    faDonate,
    faExclamationTriangle,
    faEnvelope,
    faUser,
    faList,
    faSignOutAlt,
    faDownload,
    faCalendar,
    faDollarSign,
    faClipboardList,
    faComments,
    faEllipsisV,
    faCircle,
    faAngleUp,
    faChevronLeft,
    faChevronRight,
    IconName
} from '@fortawesome/free-solid-svg-icons';
import { Modules } from '../Models/Modules';
import { ThemeSettingsService } from '../api/ThemeSettingsService';
import { ModulesService } from '../api/ModulesService';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

    faTachometerAlt = faTachometerAlt;
    faLaughWink = faLaughWink;
    faCog = faCog;
    faCogs = faCogs;
    faWrench = faWrench;
    faFolder = faFolder;
    faChartArea = faChartArea;
    faTable = faTable;
    faBars = faBars;
    faSearch = faSearch;
    faBell = faBell;
    faFileAlt = faFileAlt;
    faDonate = faDonate;
    faExclamationTriangle = faExclamationTriangle;
    faEnvelope = faEnvelope;
    faUser = faUser;
    faList = faList;
    faSignOutAlt = faSignOutAlt;
    faDownload = faDownload;
    faCalendar = faCalendar;
    faDollarSign = faDollarSign;
    faClipboardList = faClipboardList;
    faComments = faComments;
    faEllipsisV = faEllipsisV;
    faCircle = faCircle;
    faAngleUp = faAngleUp;
    faChevronLeft = faChevronLeft;
    faChevronRight = faChevronRight;

    public sidebarBgColor: string = ''; // Default color
    public sidebarFontColor: string = ''; // Default color
    public appTitle: string = ''; // Default title
    public appIcon: IconName = '' as IconName; // Default icon
    public modules: Modules[] = []; // modules

    constructor(
        private themeSettingsService: ThemeSettingsService,
        private modulesService: ModulesService,
        private ngxLoader: NgxUiLoaderService
    ) {
        this.themeSettingsService.sidebarBgColor.subscribe(sidebarBgColor => this.sidebarBgColor = sidebarBgColor);
    }


    ngOnInit(): void {

        this.ngxLoader.start();

        // Fetching settings
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
                            let iconName: IconName = setting.value! as IconName;
                            this.appIcon = iconName;
                        break;
                    }
                });
                // Fecthing modules
                this.modulesService.getAll()
                .subscribe(
                    data => {
                        this.modules = data;
                        this.ngxLoader.stop();
                    },
                    error => {
                        console.log(error);
                });
            },
            error => {
                console.log(error);
        });

        this.themeSettingsService.sidebarBgColor.subscribe(sidebarBgColor => this.sidebarBgColor = sidebarBgColor);
        this.themeSettingsService.sidebarFontColor.subscribe(sidebarFontColor => this.sidebarFontColor = sidebarFontColor);
        this.themeSettingsService.appTitle.subscribe(appTitle => this.appTitle = appTitle);
        this.themeSettingsService.appIcon.subscribe(appIcon => this.appIcon = appIcon as IconName);
        this.modulesService.modules.subscribe(modules => this.modules = modules);

    }



}
