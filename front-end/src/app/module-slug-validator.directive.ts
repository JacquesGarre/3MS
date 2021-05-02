import { Directive } from '@angular/core';
import { AbstractControl, Validator, NG_VALIDATORS } from '@angular/forms';
import { ModulesService } from './api/ModulesService';
import { Modules } from './Models/Modules';


@Directive({
    selector: '[moduleSlugValidator]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: ModuleSlugValidatorDirective,
        multi: true
    }]
})

export class ModuleSlugValidatorDirective implements Validator {

    modules: Modules[] = [];

    existingSlugs: any[] = [
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
                    let moduleSlug = module.slug?.toLowerCase();
                    if(moduleSlug !== undefined){
                        this.existingSlugs.push(moduleSlug);
                    }
                });
            },
            error => {
                console.log(error);
        });
    }




    validate(control: AbstractControl): { [key: string]: any } | null {

        let errors = null;

        // Test if slug is not already used
        if(this.existingSlugs.includes(control.value.toLowerCase())){
            errors = { 'slugAlreadyUsed': true };
        } 
        
        // Test if slug format is valid
        let slugRegex = new RegExp('^[a-z0-9]+(?:-[a-z0-9]+)*$', '');
        if(!slugRegex.test(control.value)){
            errors = { 'slugInvalid': true };
        }

        return errors;
    }
}


