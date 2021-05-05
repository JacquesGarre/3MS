import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, ValidatorFn, AbstractControl, FormsModule } from '@angular/forms';
import { Modules } from '../../../Models/Modules';
import { Inputs } from '../../../Models/Inputs';
import { ModulesService } from '../../../api/ModulesService';
import { Router } from '@angular/router';
import { ModuleComponent } from '../../../module/module.component';
import { IconName } from "@fortawesome/fontawesome-common-types";
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FieldsPageComponent } from '../../../pages/fields-page/fields-page.component';


import {
    NgbModal,
    ModalDismissReasons
} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-input-add-modal',
    templateUrl: './input-add-modal.component.html',
    styleUrls: ['./input-add-modal.component.css']
})
export class InputAddModalComponent implements OnInit {

    @Input() module: Modules;

    modules: Modules[] = [];  
    closeResult = '';

    name: string = '';
    type: string = '';
    sqlType: string = '';
    sqlLength: number | null = null;

    inputForm = new FormGroup({
        name: new FormControl(
            this.name, [
                Validators.required,
                Validators.minLength(3)
            ]
        ),
        type: new FormControl(
            this.type, [
                Validators.required,
                Validators.minLength(3)
            ]
        ),
        sqlType: new FormControl(
            this.sqlType, [
                Validators.required,
                Validators.minLength(3)
            ]
        ),
        sqlLength: new FormControl(
            this.sqlLength, []
        )
    });

    constructor(
        private fb: FormBuilder,
        public router:Router,
        private modulesService: ModulesService,
        private modalService: NgbModal,
        private ngxLoader: NgxUiLoaderService
    ) { 
        this.module = {};
    }

    open(content: any) {
        this.inputForm = new FormGroup({
            name: new FormControl(
                this.name, [
                    Validators.required,
                    Validators.minLength(3)
                ]
            ),
            type: new FormControl(
                this.type, [
                    Validators.required,
                    Validators.minLength(3)
                ]
            ),
            sqlType: new FormControl(
                this.sqlType, [
                    Validators.required,
                    Validators.minLength(3)
                ]
            ),
            sqlLength: new FormControl(
                this.sqlLength, []
            )
        });
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }
    
    ngOnInit(): void {   
        this.inputForm = new FormGroup({
            name: new FormControl(
                this.name, [
                    Validators.required,
                    Validators.minLength(3)
                ]
            ),
            type: new FormControl(
                this.type, [
                    Validators.required,
                    Validators.minLength(3)
                ]
            ),
            sqlType: new FormControl(
                this.sqlType, [
                    Validators.required,
                    Validators.minLength(3)
                ]
            ),
            sqlLength: new FormControl(
                this.sqlLength, []
            )
        });
        this.getModules();     
    }

    getModules() {
        this.modulesService.getAll().subscribe(modules => {
            this.modules = modules;
        });
    }


    addInput(modal: any){
        let newInput = new Inputs();
        newInput.moduleId = this.module.id;
        newInput.name = this.inputForm.get('name')?.value;
        newInput.type = this.inputForm.get('type')?.value;
        newInput.sqlType = this.inputForm.get('sqlType')?.value;
        newInput.sqlLength = this.inputForm.get('sqlLength')?.value;
        newInput.required = true;
        newInput.addShow = true;
        newInput.editShow = true;
        newInput.editReadonly = true;
        newInput.tableShow = true;
        newInput.tableReadonly = true;
        newInput.tableFilter = true;
        newInput.tableOrder = true;

        console.log('newInput;');
        console.log(newInput);
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
