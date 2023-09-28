import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Etablissement } from 'src/app/models/etablissement';
import { Response } from 'src/app/models/response';

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

    add(data: Etablissement): Observable<Response> {
        return this.http.post<Response>(this.url, data);
    }

    update(data: Etablissement): Observable<Etablissement> {
        return this.http.put<Etablissement>(this.url, data);
    }
}
