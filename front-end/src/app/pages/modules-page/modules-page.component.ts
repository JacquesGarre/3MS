import { Component, OnInit } from '@angular/core';
import { Modules } from '../../Models/Modules';
import { ModulesService } from '../../api/ModulesService';
import { faTrashAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { IconName } from "@fortawesome/fontawesome-common-types";
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FormControl, FormGroup, Validators, FormBuilder, ValidatorFn, AbstractControl, FormsModule } from '@angular/forms';

import {
    NgbModal,
    ModalDismissReasons
} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-modules-page',
  templateUrl: './modules-page.component.html',
  styleUrls: ['./modules-page.component.css']
})
export class ModulesPageComponent implements OnInit {

    
    closeResult = '';
    faTrashAlt = faTrashAlt;
    faPencilAlt = faPencilAlt;
    module: Modules = {};

    public modules: Modules[] = []; // modules

    editModuleForm = new FormGroup({
        name: new FormControl(
            '', [
                Validators.required,
                Validators.minLength(4)
            ]
        ),
        slug: new FormControl(
            '', [
                Validators.required,
                Validators.minLength(4)
            ]
        ),
        icon: new FormControl(
            '', [
                Validators.required
            ]
        )
    });

    constructor(
        private modulesService: ModulesService,
        private modalService: NgbModal,
        private ngxLoader: NgxUiLoaderService
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

    deleteModule(deleteModal: any, module: Modules): void {
        this.module = module;
        this.modalService.open(deleteModal, { ariaLabelledBy: 'modal-basic-title', centered: true }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
        

    }

    confirmDelete(modal: any, module: Modules){
        this.modulesService.delete(this.modules, module.id).subscribe(
            response => {
                console.log(response);
            },
            error => {
                console.log(error);
        });
        modal.close();
    }


    editModule(content:any, module: Modules) {
        this.module = module;
        this.editModuleForm = new FormGroup({
            name: new FormControl(
                this.module.name, [
                    Validators.required,
                    Validators.minLength(4)
                ]
            ),
            slug: new FormControl(
                this.module.slug, [
                    Validators.required,
                    Validators.minLength(4)
                ]
            ),
            icon: new FormControl(
                this.module.icon, [
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

    updateModule(modal: any) {
        this.module.slug = this.editModuleForm.get('slug')?.value;
        this.module.name = this.editModuleForm.get('name')?.value;
        this.module.icon = this.editModuleForm.get('icon')?.value;
        this.modulesService.update(this.modules, this.module.id, this.module).subscribe(
            response => {
                console.log(response);
            },
            error => {
                console.log(error);
        });
        modal.close();
    }

    ngOnInit(): void {

        this.ngxLoader.startLoader("page-loader");

        this.editModuleForm = new FormGroup({
            name: new FormControl(
                '', [
                    Validators.required,
                    Validators.minLength(4)
                ]
            ),
            slug: new FormControl(
                '', [
                    Validators.required,
                    Validators.minLength(4)
                ]
            ),
            icon: new FormControl(
                '', [
                    Validators.required
                ]
            )
        });

        /**
         * Fetching modules and subscribing to changes
         */
        this.modulesService.getAll()
        .subscribe(
            data => {
                this.modules = data;
                this.ngxLoader.stopLoader("page-loader");
            },
            error => {
                console.log(error);
        });
        this.modulesService.modules.subscribe(modules => this.modules = modules);
        
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
