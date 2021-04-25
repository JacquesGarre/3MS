import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Modules } from '../Models/Modules';
import { NgxUiLoaderService } from 'ngx-ui-loader';

const baseUrl = 'http://localhost:8000/api/modules';

@Injectable({
  providedIn: 'root'
})

export class ModulesService {

    private modulesArray: Modules[] = [];
    private modulesSource = new BehaviorSubject(this.modulesArray);
    modules = this.modulesSource.asObservable();    

    constructor(
        private http: HttpClient,
        private ngxLoader: NgxUiLoaderService
    ) {}

    getAll(): Observable<Modules[]> {
        return this.http.get<Modules[]>(baseUrl);
    }

    getAllActive(): Observable<Modules[]> {
        return this.http.get<Modules[]>(`${baseUrl}?active=true`);
    }

    get(id: any): Observable<Modules> {
        return this.http.get(`${baseUrl}/${id}`);
    }

    addModule(modules: Modules[], module: Modules) {
        this.create(module).subscribe(
            module => {
                modules.push(module);
                this.modulesSource.next(modules);
            },
            error => {
                console.log(error);
        });
    }

    create(data: Modules): Observable<any> {
        return this.http.post(baseUrl, data);
    }

    update(modules: Modules[], id: any, data: any): Observable<any> {
        modules.map((module) => {
            if(module.id == id){
                module = data;
            }
        })
        this.modulesSource.next(modules);
        return this.http.put(`${baseUrl}/${id}`, data);
    }

    delete(id: any): Observable<any> {
        return this.http.delete(`${baseUrl}/${id}`);
    }

    deleteAll(): Observable<any> {
        return this.http.delete(baseUrl);
    }

}