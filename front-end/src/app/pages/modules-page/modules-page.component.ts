import { Component, OnInit } from '@angular/core';
import { Modules } from '../../Models/Modules';
import { ModulesService } from '../../api/ModulesService';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-modules-page',
  templateUrl: './modules-page.component.html',
  styleUrls: ['./modules-page.component.css']
})
export class ModulesPageComponent implements OnInit {

    faTrashAlt = faTrashAlt;

    public modules: Modules[] = []; // modules

    constructor(
        private modulesService: ModulesService
    ) { 
        this.modulesService.modules.subscribe(modules => this.modules = modules);
    }

    toggleModule(module: Modules): void {
        module.active = module.active ? false : true;
        this.modulesService.update(this.modules, module.id, module).subscribe(
            response => {
                console.log(response);
            },
            error => {
                console.log(error);
        });
    }

    deleteModule(module: Modules): void {
        this.modulesService.delete(this.modules, module.id).subscribe(
            response => {
                console.log(response);
            },
            error => {
                console.log(error);
        });
    }

    ngOnInit(): void {

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
