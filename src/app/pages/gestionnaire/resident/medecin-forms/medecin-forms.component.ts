import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MedecinTraitant } from 'src/app/models/medecin-traitant';
import { ObservableService } from 'src/app/shared/service/observable.service';
import { ResidentService } from '../../service/resident.service';

@Component({
    selector: 'app-medecin-forms',
    templateUrl: './medecin-forms.component.html',
    styleUrls: ['./medecin-forms.component.scss']
})
export class MedecinFormsComponent implements OnInit {

    required = 'Ce champ est requis';
    formData = new FormGroup({
        mat: new FormControl('', [Validators.required]),
        lastname: new FormControl('', [Validators.required]),
        firstname: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
        tel1: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
        tel2: new FormControl('', [Validators.pattern('^[0-9]+$')]),
        address: new FormControl('', [Validators.required, Validators.minLength(10)]),
    });

    residentUser = "";
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
            // first the value of the user
            this.residentUser = v.user;
            // init fields
            try {
                if (v.doctor.length > 0) {
                    const doctor: MedecinTraitant = JSON.parse(v.doctor);
                    this.formData.controls.mat.setValue(doctor.numInami);
                    this.formData.controls.lastname.setValue(doctor.nom);
                    this.formData.controls.firstname.setValue(doctor.prenom);
                    this.formData.controls.email.setValue(doctor.email);
                    this.formData.controls.tel1.setValue(doctor.tel1);
                    this.formData.controls.tel2.setValue(doctor.tel2 ?? '');
                    this.formData.controls.address.setValue(doctor.adresse);
                }
            } catch (error) {

            }
        });

        // init form
        if (this.residentId != 0) {
            this.getResidentById(this.residentId);
        }
    }

    buildBody()  {
        const doctor: MedecinTraitant = {
            adresse: this.formData.controls.address.value ?? '',
            email: this.formData.controls.email.value ?? '',
            nom: this.formData.controls.lastname.value ?? '',
            numInami: this.formData.controls.mat.value ?? '',
            prenom: this.formData.controls.firstname.value ?? '',
            tel1: this.formData.controls.tel1.value ?? '',
            tel2: this.formData.controls.tel2.value ?? ''
        };
        return doctor;
    }


    next() {
        const doctor = this.buildBody() ;

        if (!this.formData.controls.mat.value) {
            doctor.numInami = doctor.numInami?? 'undefined';
        }

        if (!this.formData.controls.firstname.value) {
            doctor.prenom = doctor.prenom?? 'undefined';
        }
        
        if (!this.formData.controls.lastname.value) {
            doctor.nom = doctor.nom?? 'undefined';
        }

        if (!this.formData.controls.email.value) {
            doctor.email = doctor.email ?? '';
        }

        if (!this.formData.controls.tel1.value) {
            doctor.tel1 = doctor.tel1 ?? 'undefined';
        }

        if (!this.formData.controls.address.value) {
            doctor.adresse= doctor.adresse ?? 'undefined';
        }
        if (this.formData.valid) {
            // set the value of the observable object
            this.observableSrv.changeResident({
                user: this.residentUser,
                doctor: JSON.stringify(doctor),
                resident: ""
            });

            if (this.residentId == 0) {
                this.router.navigate(['/gestionnaire/resident/add/resident']);
            }
            else {
                this.router.navigate([`/gestionnaire/resident/edit/${this.residentId}/resident`]);
            }
        }
    }

    back() {
        if (this.formData.valid) {
            if (this.residentId == 0) {
                this.router.navigate(['/gestionnaire/resident/add/user']);
            }
            else {
                this.router.navigate([`/gestionnaire/resident/edit/${this.residentId}/user`]);
            }
        }
    }

    get formValid() {
        // check whether needed fields are null or not
        if (false) {
            return false;
        }
        return true;
    }

    getResidentById(id: number) {
        this.residentSrv.fetchById(id).subscribe({
            next: (r) => {
                this.formData.controls.mat.setValue(r.medecinTraitant.numInami);
                this.formData.controls.lastname.setValue(r.medecinTraitant.nom);
                this.formData.controls.firstname.setValue(r.medecinTraitant.prenom);
                this.formData.controls.email.setValue(r.medecinTraitant.email);
                this.formData.controls.tel1.setValue(r.medecinTraitant.tel1);
                this.formData.controls.tel2.setValue(r.medecinTraitant.tel2 ?? "");
                this.formData.controls.address.setValue(r.medecinTraitant.adresse);
            }
        })
    }

}
