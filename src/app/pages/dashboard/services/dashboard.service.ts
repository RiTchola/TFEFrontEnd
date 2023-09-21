import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {

    private urlResident = `${environment.apiPath}/resident`;
    private urlRapport = `${environment.apiPath}/rapport-quotidien`;

    constructor(private http: HttpClient) { }

    fetchAllResidents(): Observable<any[]> {
        return this.http.get<any[]>(this.urlResident);
    }

    fetchAllRapports(): Observable<any[]> {
        return this.http.get<any[]>(this.urlRapport);
    }
}
