import { Component } from '@angular/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
    username:string='';
    oldPassword:string='';
    password1:string='';
    password2:string='';
}
