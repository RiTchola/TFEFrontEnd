import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../gestionnaire/service/user.service";
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss'],
    providers: [MessageService]
})
export class ChangePasswordComponent {
    oldPassword: string = '';

    required = 'Ce champ est requis';
    formData = new FormGroup({
        username: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
        oldPassword: new FormControl('', [Validators.required]),
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

    constructor(private userService: UserService, private msgSrv: MessageService) {

    }

    buildBody() {
        const data =  {
            username: this.formData.controls.username.value ?? '',
            oldPassword: this.formData.controls.oldPassword.value ?? '',
            pwd1: this.formData.controls. pwd1.value ?? '',
            pwd2: this.formData.controls. pwd2.value ?? '',
        };
        return data;
    }


    save() {
        const data = this.buildBody();

        this.userService.changePassword(data.username, data.oldPassword, data.pwd1).subscribe(
            {
                next: (res) => {
                    console.log(res)
                    if (res.msg.includes("compte"))
                    {
                        this.msgSrv.add({ severity: 'error', summary: 'Error', detail: res.msg });
                        return
                    }
                    else { 
                        this.msgSrv.add({ severity: 'success', summary: 'Success', detail: res.msg });
                        return
                    }
                },
                error: (error) =>{
                    this.msgSrv.add({ severity: 'error', summary: 'Error', detail: error.message });
                    return
                }
            }
        )
    }

}
