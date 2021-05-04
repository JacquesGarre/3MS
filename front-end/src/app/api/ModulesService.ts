import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Modules } from '../Models/Modules';
import { NgxUiLoaderService } from 'ngx-ui-loader';

const apiUrl = 'http://localhost:8000/api';
const baseUrl = apiUrl+'/modules';
const migrationUrl = apiUrl+'/operations/migrate';


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

    getExistingEntities(): Observable<any> {
        return this.http.get<any>(apiUrl);
    }

    getAll(): Observable<Modules[]> {
        return this.http.get<Modules[]>(baseUrl);
    }

    runMigration(): Observable<string> {
        return this.http.get<string>(migrationUrl);
    }

    getAllActive(): Observable<Modules[]> {
        return this.http.get<Modules[]>(`${baseUrl}?active=true`);
    }

    get(id: any): Observable<Modules> {
        return this.http.get(`${baseUrl}/${id}`);
    }

    addModule(modules: Modules[], module: Modules, modal: any) {
        this.ngxLoader.startLoader("addmodal-loader");
        this.getAll()
        .subscribe(
            data => {
                modules = data;
                this.create(module).subscribe(
                    module => {
                        modules.push(module);
                        this.modulesSource.next(modules);
                        this.runMigration().subscribe(
                            response => {
                                this.ngxLoader.stopLoader("addmodal-loader");
                                modal.close();
                            },
                            error => {
                                console.log(error)
                            }
                        )
                    },
                    error => {
                        console.log(error);
                });
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

    delete(modules: Modules[], id: any): Observable<any> {
        modules = modules.filter((module) => {
            return module.id !== id
        });
        this.modulesSource.next(modules);
        return this.http.delete(`${baseUrl}/${id}`);
    }

    deleteAll(): Observable<any> {
        return this.http.delete(baseUrl);
    }

}