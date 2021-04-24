import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

    private REST_API_SERVER = "http://127.0.0.1:8000/api";

    constructor(private httpClient: HttpClient) { }

    public getThemeSettings(){
        return this.httpClient.get(this.REST_API_SERVER +'/theme_settings');
    }

}