import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Fichier} from "../../../models/fichier";

@Injectable({
  providedIn: 'root'
})
export class FichierService {
    private apiUrl: string = environment.apiPath+'/file';

  constructor(private http: HttpClient) { }

    getAllFichiers(): Observable<Fichier[]>{
      return this.http.get<Fichier[]>(this.apiUrl);

    }
}
