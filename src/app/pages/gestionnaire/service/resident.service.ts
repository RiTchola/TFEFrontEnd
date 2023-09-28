import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Resident } from 'src/app/models/resident';

import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ResidentService {

    private url = `${environment.apiPath}/residents`;

    constructor(private http: HttpClient) { }



}
