import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RapportVisiteTable} from "../../../models/rapport-visite-table";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RapportDeVisiteService {

    private apiUrl: string = environment.apiPath+'/rapport-visite';

    constructor(private http: HttpClient) { }

    getAllRapports(): Observable<RapportVisiteTable[]> {
        return this.http.get<RapportVisiteTable[]>(this.apiUrl);
    }

    getRapportById(id: number): Observable<RapportVisiteTable> {
        return this.http.get<RapportVisiteTable>(`${this.apiUrl}/${id}`);
    }

    createRapport(rapport: RapportVisiteTable): Observable<any> {
        return this.http.post(this.apiUrl, rapport);
    }

}
