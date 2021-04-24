import { Component, OnInit } from '@angular/core';
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
    faAngleUp
} from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-page-content',
    templateUrl: './page-content.component.html',
    styleUrls: ['./page-content.component.css']
})
export class PageContentComponent implements OnInit {
    
    title = 'front-end';
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

    constructor() { }

    ngOnInit(): void {
    }

}
