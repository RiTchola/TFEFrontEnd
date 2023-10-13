import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpEvent, HttpRequest, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Fichier} from "../../../models/fichier";
import {AuthService} from "../../../core/services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class FichierService {
    private apiUrl: string = environment.apiPath+'/file';

  constructor(private http: HttpClient,private authService: AuthService) { }

    getAllFiles(): Observable<Fichier[]> {
        return this.http.get<Fichier[]>(`${this.apiUrl}/liste/${this.authService.getUsername()}`);
    }

    getAllFichiers(): Observable<Fichier[]>{
      return this.http.get<Fichier[]>(this.apiUrl);
    }

    addFile(date: Date, destinataire: string, typeF: string, file: File): Observable<HttpEvent<any>> {
        const formData: FormData = new FormData();

        formData.append('date', date.toISOString());
        formData.append('destinataire', destinataire);
        formData.append('typeF', typeF);
        formData.append('username', this.authService.getUsername());
        formData.append('file', file);

        const req = new HttpRequest('POST', `${this.apiUrl}`, formData, {
            reportProgress: true,
            responseType: 'json'
        });

        return this.http.request(req);
    }

    downloadFile(fileURL: string): Observable<HttpResponse<Blob>> {
        return this.http.get(`${this.apiUrl}/download/${fileURL}`, { observe: 'response', responseType: 'blob' });
    }
}
