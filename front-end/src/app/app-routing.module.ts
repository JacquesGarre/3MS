import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';
import { ModulesPageComponent } from './pages/modules-page/modules-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ModuleComponent } from './module/module.component';
import { ModulesService } from './api/ModulesService';
import { Modules } from './Models/Modules';

const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'settings-page', component: SettingsPageComponent },
    { path: 'modules-page', component: ModulesPageComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { 

    public modules: Modules[] = []; // modules

    constructor(
        public router:Router,
        private modulesService: ModulesService
    ) {
        this.modulesService.getAll()
        .subscribe(
            data => {
                this.modules = data;
                this.modules.map((module) => {
                    this.router.config.push({
                        path: 'module/' + module.slug,
                        component: ModuleComponent,
                        data: module
                    });
                })
            },
            error => {
                console.log(error);
        });
        this.modulesService.modules.subscribe(modules => this.modules = modules);
    }


}
