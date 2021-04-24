import { Component, OnInit } from '@angular/core';
import { ThemeSettings } from '../../Models/ThemeSettings';
import { ApiService } from '../../api/api.service';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.css']
})
export class SettingsPageComponent implements OnInit {

    settings: ThemeSettings[] = [];

    constructor(private apiService: ApiService) { }

    ngOnInit(): void {
        
    }





}
