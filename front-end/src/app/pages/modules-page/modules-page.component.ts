import { Component, OnInit } from '@angular/core';
import { Modules } from '../../Models/Modules';
import { ModulesService } from '../../api/ModulesService';
import { faTrashAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { IconName } from "@fortawesome/fontawesome-common-types";
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

    constructor(
        private modulesService: ModulesService,
        private modalService: NgbModal
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



    editModule(content:any, module: Modules) {
        this.module = module;
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    updateModule(modal: any, module: Modules) {
        this.modulesService.update(this.modules, module.id, module).subscribe(
            response => {
                console.log(response);
            },
            error => {
                console.log(error);
        });
        modal.close();
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
