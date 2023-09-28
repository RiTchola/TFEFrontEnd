import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Etablissement } from 'src/app/models/etablissement';

import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class EtablissementService {

    private url = `${environment.apiPath}/establishment`;

    constructor(private http: HttpClient) { }

    get(): Observable<Etablissement> {
        return this.http.get<Etablissement>(this.url);
    }

    add(data: Etablissement): Observable<string> {
        console.log(data)

        return this.http.post<string>(this.url, data, {
            headers: { 'content-type': 'application/json' }
        });
    }

    update(data: Etablissement): Observable<Etablissement> {
        return this.http.put<Etablissement>(this.url, data);
    }

    delete(id: string): Observable<any> {
        return this.http.delete<any>(`${this.url}/${id}`);
    }
}
