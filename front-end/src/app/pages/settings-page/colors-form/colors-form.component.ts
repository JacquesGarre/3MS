import { Component, OnInit } from '@angular/core';
import { ThemeSettings } from '../../../Models/ThemeSettings';
import { ApiService } from '../../../api/api.service';

@Component({
    selector: 'app-colors-form',
    templateUrl: './colors-form.component.html',
    styleUrls: ['./colors-form.component.css']
})
export class ColorsFormComponent implements OnInit {

    sidebarBgColor = '#4e73df'; // Default color
    settings: ThemeSettings[] = [];

    constructor(private apiService: ApiService) {

    }

    ngOnInit(): void {

        this.apiService.getThemeSettings().subscribe((data: any)=>{
            this.sidebarBgColor = data.filter((setting: any) => setting.name == 'sidebar_bg_color')[0].value;
        }) 

        console.log("sidebarBgColor")
        console.log(this.sidebarBgColor)
    }

}
