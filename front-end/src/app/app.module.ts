import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';

import { SidebarComponent } from './sidebar/sidebar.component';
import { TopbarComponent } from './topbar/topbar.component';
import { PageContentComponent } from './page-content/page-content.component';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';
import { ModulesPageComponent } from './pages/modules-page/modules-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ColorsFormComponent } from './pages/settings-page/colors-form/colors-form.component';
import { ModuleComponent } from './module/module.component';
import { ModuleAddModalComponent } from './pages/modules-page/module-add-modal/module-add-modal.component';

import { FormsModule } from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';
import { HttpClientModule } from '@angular/common/http';
import { NgxUiLoaderModule,
    NgxUiLoaderConfig,
    NgxUiLoaderHttpModule,
    SPINNER,
    POSITION,
    PB_DIRECTION } from "ngx-ui-loader";

import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { ModuleNameValidatorDirective } from './module-name-validator.directive';
import { ModuleSlugValidatorDirective } from './module-slug-validator.directive';
import { ModuleIconValidatorDirective } from './module-icon-validator.directive';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
    "bgsColor": "red",
    "bgsOpacity": 0.1,
    "bgsPosition": "bottom-right",
    "bgsSize": 20,
    "bgsType": "ball-spin-clockwise",
    "blur": 10,
    "delay": 0,
    "fastFadeOut": true,
    "fgsColor": "rgba(0, 57, 171, 0.8)",
    "fgsPosition": "center-center",
    "fgsSize": 70,
    "fgsType": "cube-grid",
    "gap": 24,
    "logoPosition": "center-center",
    "logoSize": 120,
    "logoUrl": "",
    "masterLoaderId": "master",
    "overlayBorderRadius": "0",
    "overlayColor": "rgba(255,255,255)",
    "pbColor": "#4e73df",
    "pbDirection": "ltr",
    "pbThickness": 3,
    "hasProgressBar": true,
    "text": "Preparing the magic...",
    "textColor": "rgba(0, 57, 171, 0.8)",
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
    ModuleAddModalComponent,
    ModuleNameValidatorDirective,
    ModuleSlugValidatorDirective,
    ModuleIconValidatorDirective
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
    NgxUiLoaderHttpModule.forRoot({ showForeground: false }),
    ReactiveFormsModule
  ],
  providers: [{provide: APP_BASE_HREF, useValue: '/'}],
  bootstrap: [AppComponent]
})
export class AppModule { 
    constructor(library: FaIconLibrary){
        library.addIconPacks(fas, far);
        //library.add(fab, far, fas);
    }
}
