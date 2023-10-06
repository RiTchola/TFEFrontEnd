import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { environment } from 'src/environments/environment';

import { Response } from 'src/app/models/response';
import { Menu } from 'src/app/models/menu';

@Injectable({
    providedIn: 'root'
})
export class MenuOfTheWeekService {

    private url = `${environment.apiPath}/menu`;

    constructor(private http: HttpClient) { }

    fetchByStartDate(date: Date) {
        return this.http.get<Menu>(`${this.url}/${date}`)
    }

    update(body: Menu) {
        return this.http.put<Response>(`${this.url}/${body.id}`, body);
    }

    add(body: Menu) {
        this.http.post<Menu>(this.url, body);
    }
}
