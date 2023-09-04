import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private authPath = environment.apiPath + "/auth";
    private jwtHelper = new JwtHelperService();

  constructor() { }
}
