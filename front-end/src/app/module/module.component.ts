import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Modules } from './../Models/Modules';

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.css']
})
export class ModuleComponent implements OnInit {
    
    module: Modules = {};
    sub: any;

    constructor(private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.sub = this.route.data.subscribe(
            module => this.module = module
        );
    }

}
