import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Modules } from './../../Models/Modules';
import { Inputs } from './../../Models/Inputs';
import {
    NgbModal,
    ModalDismissReasons
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-fields-page',
  templateUrl: './fields-page.component.html',
  styleUrls: ['./fields-page.component.css']
})
export class FieldsPageComponent implements OnInit {

    public module: Modules = {};
    public modules: Modules[] = []; 
    public inputs: Inputs[] = []; 
    sub: any;

    constructor(
        private route: ActivatedRoute,
        private modalService: NgbModal
    ) {}

    ngOnInit(): void {
        this.sub = this.route.data.subscribe(
            module => this.module = module
        );
    }
}
