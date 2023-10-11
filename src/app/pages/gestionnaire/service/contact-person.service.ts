import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { ContactPerson } from 'src/app/models/contact-person';
import { Response } from 'src/app/models/response';

@Injectable({
    providedIn: 'root'
})
export class ContactPersonService {

    private url = `${environment.apiPath}/personne-contact`;
    private urlContact = `${environment.apiPath}/resident/listePersonneContact`;

    constructor(private http: HttpClient) { }

    fetchAll(residentId: number) {
        return this.http.get<ContactPerson[]>(`${this.urlContact}/${residentId}`);
    }

    add(residentId: number, body: ContactPerson) {
        return this.http.post<ContactPerson>(`${this.url}/${residentId}`, body);
    }

    fetchById(id: number) {
        return this.http.get<ContactPerson>(`${this.url}/${id}`);
    }

    update(body: ContactPerson) {
        return this.http.put<ContactPerson>(`${this.url}/${body.id}`, body);
    }

    delete(id: number) {
        return this.http.delete<Response>(`${this.url}/${id}`);
    }
}
