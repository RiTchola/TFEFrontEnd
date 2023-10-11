import { Component } from '@angular/core';
import {UserService} from "../../../gestionnaire/service/user.service";

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent {
    username:string='';
    constructor(private userService: UserService) {
    }




}
