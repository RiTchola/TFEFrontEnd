import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Resident } from 'src/app/models/resident';

import { environment } from 'src/environments/environment';

import { MedecinTraitant } from 'src/app/models/medecin-traitant';
import { Response } from 'src/app/models/response';

@Injectable({
    providedIn: 'root'
})
export class ResidentService {

    private url = `${environment.apiPath}/resident`;
    private doctorUrl = `${environment.apiPath}/medecinTraitant`;

    constructor(private http: HttpClient) { }

    fetchById(id: number) {
        return this.http.get<any>(`${this.url}/${id}`);
    }

    fetchResidents(username: string): Observable<any[]> {
        return this.http.get<any[]>(`${this.url}/listeResident/${username}`);
    }

    addResident(doctorId: number, userId: number, body: Resident) {
        return this.http.post<Resident>(`${this.url}/${doctorId}/${userId}`, body);
    }

    update(body: Resident) {
        return this.http.put<Resident>(`${this.url}/${body.id}`, body);
    }

    fetchDoctor(id: number) {
        return this.http.get<any>(`${this.url}/${id}`);
    }

    saveDoctor(body: MedecinTraitant) {
        return this.http.post<MedecinTraitant>(this.doctorUrl, body);
    }

    updateDoctor(id: number, body: MedecinTraitant) {
        return this.http.put<MedecinTraitant>(`${this.doctorUrl}/${id}`, body);
    }

    remove(id: number) {
        return this.http.delete<Response>(`${this.url}/${id}`);
    }
}
