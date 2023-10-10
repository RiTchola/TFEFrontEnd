import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { MeetUp } from 'src/app/models/meet-up';

@Injectable({
  providedIn: 'root'
})
export class MeetupService {

    private url = `${environment.apiPath}/meetup`;

    constructor(private http: HttpClient) { }

    fetchById(id: number) {
        return this.http.get<MeetUp>(`${this.url}/${id}`);
    }

    fetchAll(email: string) {
        return this.http.get<MeetUp>(`${this.url}/liste/${email}`);
    }

    add(email: string, data: MeetUp) {
        return this.http.post<MeetUp>(`${this.url}/${email}`, data);
    }

    update(email: string, data: MeetUp) {
        return this.http.post<MeetUp>(`${this.url}/${data.id}/${email}`, data);
    }
}
