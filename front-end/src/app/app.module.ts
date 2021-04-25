import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {APP_BASE_HREF} from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopbarComponent } from './topbar/topbar.component';
import { PageContentComponent } from './page-content/page-content.component';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';
import { ModulesPageComponent } from './pages/modules-page/modules-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ColorsFormComponent } from './pages/settings-page/colors-form/colors-form.component';
import { FormsModule } from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';
import { HttpClientModule } from '@angular/common/http';
import { NgxUiLoaderModule,
    NgxUiLoaderConfig,
    NgxUiLoaderHttpModule,
    SPINNER,
    POSITION,
    PB_DIRECTION } from "ngx-ui-loader";
import { ModuleComponent } from './module/module.component';
import { ModuleAddModalComponent } from './module-add-modal/module-add-modal.component';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
    "bgsColor": "red",
    "bgsOpacity": 0.1,
    "bgsPosition": "bottom-right",
    "bgsSize": 20,
    "bgsType": "ball-spin-clockwise",
    "blur": 10,
    "delay": 0,
    "fastFadeOut": true,
    "fgsColor": "#ffffff",
    "fgsPosition": "center-center",
    "fgsSize": 70,
    "fgsType": "cube-grid",
    "gap": 24,
    "logoPosition": "center-center",
    "logoSize": 120,
    "logoUrl": "",
    "masterLoaderId": "master",
    "overlayBorderRadius": "0",
    "overlayColor": "rgba(0,0,0)",
    "pbColor": "#4e73df",
    "pbDirection": "ltr",
    "pbThickness": 3,
    "hasProgressBar": true,
    "text": "",
    "textColor": "#FFFFFF",
    "textPosition": "center-center",
}

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    TopbarComponent,
    PageContentComponent,
    SettingsPageComponent,
    ModulesPageComponent,
    HomePageComponent,
    ColorsFormComponent,
    ModuleComponent,
    ModuleAddModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FontAwesomeModule,
    NgbModule,
    FormsModule,
    ColorPickerModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig), 
    NgxUiLoaderHttpModule.forRoot({ showForeground: false })
  ],
  providers: [{provide: APP_BASE_HREF, useValue: '/'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
