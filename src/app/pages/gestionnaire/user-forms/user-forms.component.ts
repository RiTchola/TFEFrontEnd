import { ObservableService } from '../../../shared/service/observable.service';
import { RoleType } from '../../../shared/interfaces/roleType';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { ResidentService } from 'src/app/pages/gestionnaire/service/resident.service';
import { UserService } from '../service/user.service';
import { Location } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ContactPersonService } from '../service/contact-person.service';

@Component({
    selector: 'app-user-forms',
    templateUrl: './user-forms.component.html',
    styleUrls: ['./user-forms.component.scss'],
    providers: [MessageService]
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
    residentId = NaN;
    userId = NaN;
    personId = NaN;
    oneStep = false;

    constructor(
        private contactpersonSrv: ContactPersonService,
        private router: Router,
        private observableSrv: ObservableService,
        private residentSrv: ResidentService,
        private userSrv: UserService,
        private location: Location,
        private msgSrv: MessageService
    ) {
        const parts = this.router.url.split("/");
        if ((this.router.url.includes("edit") && this.router.url.includes("resident")) ||
            (this.router.url.includes("add") && this.router.url.includes("resident"))) {
            this.residentId = Number.parseInt(parts[4]);
            // hide the password fields if it is an edit
            this.hide = this.router.url.includes("edit");
            return;
        }

        if (this.router.url.includes("edit") && this.router.url.includes("user")) {
            // edit contact person user
            this.userId = Number.parseInt(parts[5]);
            this.personId = Number.parseInt(parts[6]);
            this.oneStep = true;
            this.hide = true;
        }

        if (this.router.url.includes("add") && this.router.url.includes("user")) {
            this.personId = Number.parseInt(parts[parts.length - 1]);
            this.oneStep = true;
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

        if (!isNaN(this.residentId)) {
            this.getResidentById(this.residentId);
        }

        if (!isNaN(this.userId)) {
            this.fetchUserById();
        }

        if (!isNaN(this.personId)) {
            this.fetchContactPersonById(this.personId);
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
        if (!this.formData.valid) {
            return;
        }

        let data = this.buildBody();
        this.observableSrv.changeResident({
            user: JSON.stringify(data),
            doctor: "",
            resident: ""
        });

        if (!this.oneStep) {
            this.navigateToNextPage();
        } else {
            this.saveUser();
        }
    }

    navigateToNextPage() {
        if (isNaN(this.residentId)) {
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

    fetchUserById() {
        this.userSrv.fetchById(this.userId).subscribe({
            next: (r) => {
                this.initForm(r)
            },
            complete: () => {
                // Since it is an update we remove the password
                this.hide = true;
                this.formData.controls.pwd1.setValidators([]);
                this.formData.controls.pwd2.setValidators([]);
                this.formData.controls.pwd1.updateValueAndValidity();
                this.formData.controls.pwd2.updateValueAndValidity();
            }
        })
    }

    saveUser() {
        const data: User = {
            id: this.userId,
            enabled: true,
            username: this.formData.controls.username.value ?? "",
            password: this.formData.controls.pwd1.value ?? "",
        };

        if (!isNaN(this.userId)) {
            this.userSrv.updateUser(this.userId, data).subscribe({
                next: (r) => this.onSuccess(),
            });
            return;
        }

        if (isNaN(this.personId)) {
            let body = this.buildBody();
            this.userSrv.saveUser(body).subscribe({
                next: (r) => this.onSuccess()
            })
        } else {
            let body = this.buildBody();
            body.role = RoleType.personnecontact;
            this.userSrv.savePersonUser(this.personId, data).subscribe({
                next: (r) => this.onSuccess()
            })
        }
    }

    onSuccess() {
        this.msgSrv.add({ severity: 'success', summary: 'Service Message', detail: 'Informations sauvegardées' });
        setTimeout(() => {
            this.location.back();
        }, 700);
    }

    fetchContactPersonById(id: number) {
        this.contactpersonSrv.fetchById(id).subscribe({
            next: (r) => this.formData.controls.username.setValue(r.email ?? ""),
            error: (err) => console.error(err)
        })
    }
}
