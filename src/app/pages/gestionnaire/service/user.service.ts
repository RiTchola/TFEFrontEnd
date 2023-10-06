import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/user';
import { Response } from 'src/app/models/response';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private url = `${environment.apiPath}/api/v1/users`;

    constructor(private http: HttpClient) { }

    saveUser(body: User) {
        const data = {
            username: body.username,
            password: body.password,
            confirmPassword: body.password,
            role: body.role
        }
        return this.http.post<Response>(this.url, data);
    }

    updateUser(id: number, body: any) {
        return this.http.put<Response>(`${this.url}/${id}`, body);
    }
}
