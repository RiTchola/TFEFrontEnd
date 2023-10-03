import { ObservableService } from './../../../../shared/service/observable.service';
import { RoleType } from './../../../../shared/interfaces/roleType';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { ResidentService } from 'src/app/pages/gestionnaire/service/resident.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    required = 'Ce champ est requis';
    formData = new FormGroup({
        username: new FormControl('', [Validators.required]), // must be a valid email
        pwd1: new FormControl('', [Validators.required, Validators.minLength(8)]), // must contain uppercase and number
        pwd2: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });


    residentId = 0;

    constructor(
        private router: Router,
        private observableSrv: ObservableService,
        private residentSrv: ResidentService
    ) {
        if (this.router.url.includes("edit")) {
            this.residentId = Number.parseInt(this.router.url.split("/")[4]);
        }
    }

    ngOnInit(): void {
        this.observableSrv.observableResident.subscribe(v => {
            try {
                const user: User = JSON.parse(v.user);
                this.formData.controls.username.setValue(user.username);
                this.formData.controls.pwd1.setValue(user.password);
                this.formData.controls.pwd2.setValue(user.password);
            } catch (error) {

            }
        });

        if (this.residentId != 0) {
            this.getResidentByIf(this.residentId);
        }
    }

    next() {
        if (this.formValid) {
            const user: User = {
                username: this.formData.controls.username.value ?? "",
                password: this.formData.controls.pwd1.value ?? "",
                role: RoleType.resident,
                enabled: true
            };
            this.observableSrv.changeResident({
                user: JSON.stringify(user),
                doctor: "",
                resident: ""
            });
            this.router.navigate(['/gestionnaire/resident/add/medecin']);
        }
    }

    get formValid() {
        if (this.formData.controls.pwd1.value != null && this.formData.controls.pwd1.value?.length < 8 ||
            this.formData.controls.pwd2.value != null && this.formData.controls.pwd2.value?.length < 8 ||
            !this.formData.controls.username || this.formData.controls.pwd1.value != this.formData.controls.pwd2.value) {
            return false;
        }
        return true;
    }

    getResidentByIf(id: number) {
        this.residentSrv.fetchById(id).subscribe({
            next: (r) => {
                console.log(r)
                // init form
                this.formData.controls.username.setValue(r.user.username);
                this.formData.controls.pwd1.setValue(r.user.password);
                this.formData.controls.pwd2.setValue(r.user.password);
            }
        })
    }
}
