import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, ValidatorFn, AbstractControl, FormsModule } from '@angular/forms';
import { Modules } from '../../../Models/Modules';
import { ModulesService } from '../../../api/ModulesService';
import { Router } from '@angular/router';
import { ModuleComponent } from '../../../module/module.component';
import { IconName } from "@fortawesome/fontawesome-common-types";
import { NgxUiLoaderService } from 'ngx-ui-loader';


import {
    NgbModal,
    ModalDismissReasons
} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-module-add-modal',
    templateUrl: './module-add-modal.component.html',
    styleUrls: ['./module-add-modal.component.css']
})
export class ModuleAddModalComponent implements OnInit {

    modules: Modules[] = [];  
    closeResult = '';
    name: string = '';
    slug: string = '';
    icon: IconName = "star";

    moduleForm = new FormGroup({
        name: new FormControl(
            this.name, [
                Validators.required,
                Validators.minLength(4)
            ]
        ),
        slug: new FormControl(
            this.slug, [
                Validators.required,
                Validators.minLength(4)
            ]
        ),
        icon: new FormControl(
            this.icon, [
                Validators.required
            ]
        )
    });

    constructor(
        private fb: FormBuilder,
        public router:Router,
        private modulesService: ModulesService,
        private modalService: NgbModal,
        private ngxLoader: NgxUiLoaderService
    ) { 
    }

    open(content: any) {
        this.moduleForm = new FormGroup({
            name: new FormControl(
                this.name, [
                    Validators.required,
                    Validators.minLength(4)
                ]
            ),
            slug: new FormControl(
                this.slug, [
                    Validators.required,
                    Validators.minLength(4)
                ]
            ),
            icon: new FormControl(
                this.icon, [
                    Validators.required
                ]
            )
        });
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }
    
    ngOnInit(): void {   
        this.moduleForm = new FormGroup({
            name: new FormControl(
                this.name, [
                    Validators.required,
                    Validators.minLength(4)
                ]
            ),
            slug: new FormControl(
                this.slug, [
                    Validators.required,
                    Validators.minLength(4)
                ]
            ),
            icon: new FormControl(
                this.icon, [
                    Validators.required
                ]
            )
        });
        this.getModules();     
    }

    getModules() {
        this.modulesService.getAll().subscribe(modules => {
            this.modules = modules;
        });
    }


    addModule(modal: any){
        this.ngxLoader.startLoader("addmodal-loader");
        this.getModules();
        let newModule = new Modules();
        newModule.slug = this.moduleForm.get('slug')?.value;
        newModule.name = this.moduleForm.get('name')?.value;
        newModule.active = true;
        newModule.limitPerPage = 50;
        newModule.menuOrder = 5;
        newModule.icon = this.moduleForm.get('icon')?.value;
        this.modulesService.addModule(this.modules, newModule);
        this.router.config.push({
            path: 'module/' + newModule.slug,
            component: ModuleComponent,
            data: newModule
        });
        modal.close();
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }

}
