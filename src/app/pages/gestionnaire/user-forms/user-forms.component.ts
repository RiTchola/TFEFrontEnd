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
            Validators.pattern("^[A-Za-z]+[0-9]+$"),
        ]),
        pwd2: new FormControl('', [
            Validators.required,
            Validators.minLength(8)
        ])
    });
    hide = false;
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
                const user = JSON.parse(v.user);
                this.initForm(user);
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
        if (this.formData.valid) {
            this.observableSrv.changeResident({
                user: JSON.stringify(data),
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
            next: (r) => this.initForm(r.user),
            complete: () => {
                // Since it is an update we remove the password
                this.hide = true;
                this.formData.controls.pwd1.setValidators([]);
                this.formData.controls.pwd2.setValidators([]);
                this.formData.controls.pwd1.updateValueAndValidity();
                this.formData.controls.pwd2.updateValueAndValidity();
            }
        });
    }

    initForm(user: User) {
        if (!user || user == null)
            return;
        this.formData.controls.username.setValue(user.username);
        this.formData.controls.pwd1.setValue(user.password);
        this.formData.controls.pwd2.setValue(user.password);
    }
}
