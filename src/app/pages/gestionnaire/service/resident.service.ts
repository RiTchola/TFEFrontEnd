import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Resident } from 'src/app/models/resident';

import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ResidentService {

    private url = `${environment.apiPath}/resident`;

    constructor(private http: HttpClient) { }

    fetchAllResidents(): Observable<Resident[]> {
        return this.http.get<Resident[]>(this.url);
    }

}
