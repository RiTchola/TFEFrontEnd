import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Response } from 'src/app/models/response';

import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class QrcodeService {

    private url = `${environment.apiPath}/externe`;

    constructor(private http: HttpClient) { }

    generateQrCode() {
        return this.http.get<Response>(`${this.url}/qrcode`);
    }
}
