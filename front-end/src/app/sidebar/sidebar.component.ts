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
    faChevronRight
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
    public modules: Modules[] = []; // modules

    constructor(
        private themeSettingsService: ThemeSettingsService,
        private modulesService: ModulesService,
        private ngxLoader: NgxUiLoaderService
    ) {
        this.themeSettingsService.sidebarBgColor.subscribe(sidebarBgColor => this.sidebarBgColor = sidebarBgColor);
    }


    ngOnInit(): void {

        /**
         * Fetching sidebarBgColor and subscribing to changes
         */
         this.themeSettingsService.findByName('sidebar_bg_color')
         .subscribe(
             data => {
                this.sidebarBgColor = data[0].value!;

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

            },
            error => {
                console.log(error);
        });
        this.themeSettingsService.sidebarFontColor.subscribe(sidebarFontColor => this.sidebarFontColor = sidebarFontColor);

        /**
         * Fetching appTitle and subscribing to changes
         */
        this.themeSettingsService.findByName('app_title')
        .subscribe(
            data => {
                this.appTitle = data[0].value!;

            },
            error => {
                console.log(error);
        });
        this.themeSettingsService.appTitle.subscribe(appTitle => this.appTitle = appTitle);

        /**
         * Fetching modules and subscribing to changes
         */
        this.modulesService.getAll()
        .subscribe(
            data => {
                this.modules = data;
            },
            error => {
                console.log(error);
        });
        this.modulesService.modules.subscribe(modules => this.modules = modules);
    }

}
