import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {environment} from 'src/environments/environment';
import {User} from 'src/app/models/user';
import {Response} from 'src/app/models/response';
import {RoleType} from 'src/app/shared/interfaces/roleType';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private url = `${environment.apiPath}/api/v1/users`;

    constructor(private http: HttpClient) {
    }

    fetchById(id: number) {
        return this.http.get<User>(`${this.url}/${id}`);
    }

    saveUser(body: User) {
        const data = {
            username: body.username,
            password: body.password,
            confirmPassword: body.password,
            role: body.role
        }
        return this.http.post<Response>(this.url, data);
    }

    savePersonUser(personUserId: number, body: User) {
        const data = {
            username: body.username,
            password: body.password,
            confirmPassword: body.password,
            role: RoleType.personnecontact
        }
        return this.http.post<Response>(`${this.url}/${personUserId}`, data);
    }

    updateUser(id: number, body: any) {
        return this.http.put<Response>(`${this.url}/${id}`, body);
    }

    changePassword(username: string, oldPassword: string, password1: string) {
        return this.http.put<Response>(`${this.url}/${username}/update`, {
            oldPassword: oldPassword,
            password: password1
        });
    }

    newPassword(){

    }
}
