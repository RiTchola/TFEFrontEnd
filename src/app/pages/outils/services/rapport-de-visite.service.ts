import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RapportVisite} from "../../../models/rapport-visite";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RapportDeVisiteService {

    private apiUrl: string = environment.apiPath+'/rapport-visite';
    // private apiExternalUrl: string = environment.apiPath+'/externe/rapport-visite';

    constructor(private http: HttpClient) { }

    getAllRapports(): Observable<RapportVisite[]> {
        return this.http.get<RapportVisite[]>(this.apiUrl);
    }

    getRapportById(id: number): Observable<RapportVisite> {
        return this.http.get<RapportVisite>(`${this.apiUrl}/${id}`);
    }

   /*  createRapport(rapport: RapportVisite): Observable<any> {
        return this.http.post(this.apiExternalUrl, rapport);
    } */

}
