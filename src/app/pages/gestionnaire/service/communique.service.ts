import { Injectable } from '@angular/core';
import {Communique} from "../../../models/communique";
import {HttpClient, HttpErrorResponse, HttpRequest} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CommuniqueService {
    apiUrl: string= environment.apiPath+'/communique';


  constructor(private http: HttpClient) { }

    getAllCommunique(): Observable<Communique[]>{
      return this.http.get<Communique[]>(this.apiUrl);
    }

    getCommuniqueById(id: number):Observable<Communique>{
        return this.http.get<Communique>(`${this.apiUrl}/${id}`);
    }

    createCommunique(contenu: string, titre: string, date: string, files: File[]): Observable<any> {
        const formData: FormData = new FormData();
        formData.append('contenu', contenu);
        formData.append('titre', titre);
        formData.append('date', date);

        files.forEach((file, index) => {
            formData.append('files', file, file.name);
        });
        const req: HttpRequest<FormData> = new HttpRequest(
            "POST",
            this.apiUrl,
            formData, {
                reportProgress: true,
                responseType: "json",
            });
        return this.http.request(req);
    }

}
