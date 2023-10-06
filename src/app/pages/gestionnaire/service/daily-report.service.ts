import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { Response } from 'src/app/models/response';
import { DailyReport } from 'src/app/models/daily-report';

@Injectable({
  providedIn: 'root'
})
export class DailyReportService {

    private url = `${environment.apiPath}/rapport-quotidien`;

    constructor(private http: HttpClient) { }

    fetchById(id: number) {
        return this.http.get<DailyReport>(`${this.url}/${id}`);
    }

    update(id: number, body: DailyReport) {
        return this.http.put<DailyReport>(`${this.url}/${id}`, body);
    }

    add(residentId: number, body: DailyReport) {
        return this.http.post<DailyReport>(`${this.url}/${residentId}`, body);
    }

    fetchAll() {
        return this.http.get<DailyReport[]>(`${this.url}`);
    }
}
