import { Component, OnInit } from '@angular/core';
import { Modules } from '../../../Models/Modules';
import { ModulesService } from '../../../api/ModulesService';
import { Router } from '@angular/router';
import { ModuleComponent } from '../../../module/module.component';

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

    constructor(
        public router:Router,
        private modulesService: ModulesService,
        private modalService: NgbModal
    ) { }


    ngOnInit(): void {   
        this.getModules();     
    }

    getModules() {
        this.modulesService.getAll().subscribe(modules => {
            this.modules = modules;
        });
    }

    open(content: any) {
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    addModule(modal: any){
        let newModule = new Modules();
        newModule.slug = this.slug;
        newModule.name = this.name;
        newModule.active = true;
        newModule.limitPerPage = 50;
        newModule.menuOrder = 5;
        newModule.icon = "faWrench";
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
