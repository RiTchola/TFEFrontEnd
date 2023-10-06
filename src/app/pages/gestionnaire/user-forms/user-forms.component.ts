import { ObservableService } from '../../../shared/service/observable.service';
import { RoleType } from '../../../shared/interfaces/roleType';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { ResidentService } from 'src/app/pages/gestionnaire/service/resident.service';

@Component({
    selector: 'app-user-forms',
    templateUrl: './user-forms.component.html',
    styleUrls: ['./user-forms.component.scss']
})
export class UserFormsComponent implements OnInit {

    required = 'Ce champ est requis';
    formData = new FormGroup({
        username: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
        pwd1: new FormControl('', [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(/[A-Z]/),
            Validators.pattern(/[0-9]/)
        ]),
        pwd2: new FormControl('', [
            Validators.required,
            Validators.minLength(8)
        ])
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
            this.getResidentById(this.residentId);
        }
    }

    buildBody() {
        const data: User = {
            username: this.formData.controls.username.value ?? "",
            password: this.formData.controls.pwd1.value ?? "",
            role: RoleType.resident,
            enabled: true
        };
        return data;
    }

    next() {
        let data = this.buildBody();
        if (!this.formData.controls.username.value) {
            data.username = data.username ?? 'undefined';
        }

        if (!this.formData.controls.pwd1.value) {
            data.password = data.password ?? 'undefined';
        }

        if (this.formData.valid) {
            this.observableSrv.changeResident({
                user: JSON.stringify(data.username),
                doctor: "",
                resident: ""
            });

            this.navigateToNextPage();
        }
    }

    navigateToNextPage() {
        if (this.residentId == 0) {
            this.router.navigate(['/gestionnaire/resident/add/medecin']);
        }
        else {
            this.router.navigate([`/gestionnaire/resident/edit/${this.residentId}/medecin`]);
        }
    }

    getResidentById(id: number) {
        this.residentSrv.fetchById(id).subscribe({
            next: (r) => {
                // init form
                this.formData.controls.username.setValue(r.user.username);
                this.formData.controls.pwd1.setValue(r.user.password);
                this.formData.controls.pwd2.setValue(r.user.password);
            }
        })
    }
}
