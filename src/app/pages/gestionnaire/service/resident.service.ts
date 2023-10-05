import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Resident } from 'src/app/models/resident';

import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/user';
import { MedecinTraitant } from 'src/app/models/medecin-traitant';
import { Response } from 'src/app/models/response';

@Injectable({
    providedIn: 'root'
})
export class ResidentService {

    private url = `${environment.apiPath}/resident`;
    private userUrl = `${environment.apiPath}/api/v1/users`;
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

    saveUser(body: User) {
        const data = {
            username: body.username,
            password: body.password,
            confirmPassword: body.password,
            role: body.role
        }
        return this.http.post<Response>(this.userUrl, data);
    }

    updateUser(id: number, body: any) {
        body = { username: body.username };
        return this.http.put<Response>(`${this.userUrl}/${id}`, body);
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

    /* remove(id: number) {
        return this.http.delete<Response>(`${this.url}/${id}`);
    } */
}
