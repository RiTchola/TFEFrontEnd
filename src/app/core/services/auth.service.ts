import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import { JwtHelperService } from "@auth0/angular-jwt";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {AuthenticationRequest} from "../models/authentication-request";
import {map, Observable} from "rxjs";
import {AuthenticationResponse} from "../models/authentication-response";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private authPath = environment.apiPath + "/auth";
    private jwtHelper = new JwtHelperService();

  constructor(
      private router: Router,
      private http: HttpClient,
  ) { }

    authenticate(authRequest: AuthenticationRequest): Observable<AuthenticationResponse>{
        return this.http.post<any>(`${this.authPath}/authenticate`, authRequest).pipe(
            map((data)=>{
                return {accessToken: data.access_token, refreshToken: data.refresh_token};
            })
        );
    }

    getLoggedUser() {
        const jwtToken = this.getToken();
        return jwtToken != "" ? this.jwtHelper.decodeToken(jwtToken).sub : "unknown";
    }

    getRole(): string {
        const jwtToken = this.getToken();
        return jwtToken != "" ? this.jwtHelper.decodeToken(jwtToken).role : "";
    }

    getToken(): string {
        const token = sessionStorage.getItem("accessToken");
        return token || '';
    }

    logout() {
        sessionStorage.clear();
        this.router.navigate(["/auth/login"]);
    }

    isTokenExpired(): boolean {
        const jwtToken = this.getToken();
        return jwtToken != "" ? this.jwtHelper.isTokenExpired(jwtToken) : true;
    }

    isAdmin(): boolean {
        return this.getRole() === "ADMIN";
    }

    getLoggedIn(): boolean {
        return Boolean(sessionStorage.getItem("loggedIn"));
    }

    setLoggedIn(loggedIn: boolean) {
        sessionStorage.setItem("loggedIn", String(loggedIn));
    }
}
