import { Directive } from '@angular/core';
import { AbstractControl, Validator, NG_VALIDATORS } from '@angular/forms';
import { Modules } from './Models/Modules';
import { ModulesService } from './api/ModulesService';

@Directive({
    selector: '[moduleNameValidator]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: ModuleNameValidatorDirective,
        multi: true
    }]
})

export class ModuleNameValidatorDirective implements Validator {

    modules: Modules[] = [];

    existingModules: any[] = [
        'dashboard',
        'general',
        'modules'
    ];

    constructor(
        private modulesService: ModulesService
    ) { 
        /**
         * Fetching modules and subscribing to changes
         */
        this.modulesService.getAll()
        .subscribe(
            data => {
                this.modules = data;
                this.modules.map((module) => {
                    let moduleName = module.name?.toLowerCase();
                    if(moduleName !== undefined){
                        this.existingModules.push(moduleName);
                    }
                });
            },
            error => {
                console.log(error);
        });
    }

    validate(control: AbstractControl): { [key: string]: any } | null {
        return this.existingModules.includes(control.value.toLowerCase()) ? { 'nameAlreadyUsed': true } : null;
    }
}




