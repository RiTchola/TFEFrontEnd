import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../gestionnaire/service/user.service";

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {

    required = 'Ce champ est requis';
    formData = new FormGroup({
        username: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
        pwd1: new FormControl('', [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern("^[A-Za-z]+[0-9]+$"),
        ]),
        pwd2: new FormControl('', [
            Validators.required,
            Validators.minLength(8)
        ])
    });

    constructor(private userService: UserService) {

    }

    save() {
        this.userService.changePassword(this.username, this.oldPassword, this.password1).subscribe(
            {
                next: (res) => {
                    console.log(res);
                },
                error: (error) =>{
                    console.log(error.message);
                }
            }
        )
    }

    username: string = '';
    oldPassword: string = '';
    password1: string = '';
    password2: string = '';
}
