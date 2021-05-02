import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ThemeSettings } from '../Models/ThemeSettings';
import { NgxUiLoaderService } from 'ngx-ui-loader';

const baseUrl = 'http://localhost:8000/api/theme_settings';

@Injectable({
  providedIn: 'root'
})

export class ThemeSettingsService {

    private sidebarBgColorSetting: ThemeSettings = {
        name: 'sidebar_bg_color',
        value: '#4e73df'
    }
    private sidebarBgColorSource = new BehaviorSubject('#4e73df'); // Default sidebar bg color
    sidebarBgColor = this.sidebarBgColorSource.asObservable();    

    private sidebarFontColorSetting: ThemeSettings = {
        name: 'sidebar_font_color',
        value: '#ffffff'
    }
    private sidebarFontColorSource = new BehaviorSubject('#ffffff'); // Default sidebar Font color
    sidebarFontColor = this.sidebarFontColorSource.asObservable();    

    private appTitleSetting: ThemeSettings = {
        name: 'app_title',
        value: '3MS'
    }
    private appTitleSource = new BehaviorSubject('3MS'); // Default app title
    appTitle = this.appTitleSource.asObservable();    

    private appIconSetting: ThemeSettings = {
        name: 'app_icon',
        value: 'laugh-wink'
    }
    private appIconSource = new BehaviorSubject('laugh-wink'); // Default app Icon
    appIcon = this.appIconSource.asObservable();    

    constructor(
        private http: HttpClient,
        private ngxLoader: NgxUiLoaderService
    ) {}

    changeSidebarBgColor(sidebarBgColor: string) {
        this.sidebarBgColorSource.next(sidebarBgColor);
        this.findByName('sidebar_bg_color').subscribe(
            data => {
                this.sidebarBgColorSetting = data[0];
                this.sidebarBgColorSetting.value = sidebarBgColor;
                this.update(this.sidebarBgColorSetting.id, this.sidebarBgColorSetting)
                .subscribe(
                    response => {
                        console.log(response);
                    },
                    error => {
                        console.log(error);
                });
            },
            error => {
                console.log(error);
        });
    }

    changeSidebarFontColor(sidebarFontColor: string) {
        this.sidebarFontColorSource.next(sidebarFontColor);
        this.findByName('sidebar_font_color').subscribe(
            data => {
                this.sidebarFontColorSetting = data[0];
                this.sidebarFontColorSetting.value = sidebarFontColor;
                this.update(this.sidebarFontColorSetting.id, this.sidebarFontColorSetting)
                .subscribe(
                    response => {
                        console.log(response);
                    },
                    error => {
                        console.log(error);
                });
            },
            error => {
                console.log(error);
        });
    }

    changeAppTitle(appTitle: string) {
        this.appTitleSource.next(appTitle);
        this.findByName('app_title').subscribe(
            data => {
                this.appTitleSetting = data[0];
                this.appTitleSetting.value = appTitle;
                this.update(this.appTitleSetting.id, this.appTitleSetting)
                .subscribe(
                    response => {
                        console.log(response);
                    },
                    error => {
                        console.log(error);
                });
            },
            error => {
                console.log(error);
        });
    }

    changeAppIcon(appIcon: string) {
        this.appIconSource.next(appIcon);
        this.findByName('app_icon').subscribe(
            data => {
                this.appIconSetting = data[0];
                this.appIconSetting.value = appIcon;
                this.update(this.appIconSetting.id, this.appIconSetting)
                .subscribe(
                    response => {
                        console.log(response);
                    },
                    error => {
                        console.log(error);
                });
            },
            error => {
                console.log(error);
        });
    }

    getAll(): Observable<ThemeSettings[]> {
        return this.http.get<ThemeSettings[]>(baseUrl);
    }

    get(id: any): Observable<ThemeSettings> {
        return this.http.get(`${baseUrl}/${id}`);
    }

    create(data: any): Observable<any> {
        return this.http.post(baseUrl, data);
    }

    update(id: any, data: any): Observable<any> {
        return this.http.put(`${baseUrl}/${id}`, data);
    }

    delete(id: any): Observable<any> {
        return this.http.delete(`${baseUrl}/${id}`);
    }

    deleteAll(): Observable<any> {
        return this.http.delete(baseUrl);
    }

    findByName(name: any): Observable<ThemeSettings[]> {
        return this.http.get<ThemeSettings[]>(`${baseUrl}?name=${name}`);
    }

}