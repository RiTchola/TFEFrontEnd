import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MedecinTraitant } from 'src/app/models/medecin-traitant';
import { ObservableService } from 'src/app/shared/service/observable.service';

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
        email: new FormControl('', [Validators.required]),
        tel1: new FormControl('', [Validators.required]),
        tel2: new FormControl(''),
        address: new FormControl('', [Validators.required]),
    });

    residentUser = "";

    constructor(private router: Router, private observableSrv: ObservableService) {}

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
                    this.formData.controls.tel2.setValue(doctor.tel2 ?? "");
                    this.formData.controls.address.setValue(doctor.adresse);
                }
            } catch (error) {

            }
        });
    }

    next() {
        if (this.formValid) {
            const doctor: MedecinTraitant = {
                adresse: this.formData.controls.address.value ?? "",
                email: this.formData.controls.email.value ?? "",
                nom: this.formData.controls.lastname.value ?? "",
                numInami: this.formData.controls.mat.value ?? "",
                prenom: this.formData.controls.firstname.value ?? "",
                tel1: this.formData.controls.tel1.value ?? "",
                tel2: this.formData.controls.tel2.value ?? ""
            };

            // set the value of the observable object
            this.observableSrv.changeResident({
                user: this.residentUser,
                doctor: JSON.stringify(doctor),
                resident: ""
            });
            this.router.navigate(['/gestionnaire/resident/add/resident']);
        }
    }

    back() {
        if (this.formValid) {
            this.router.navigate(['/gestionnaire/resident/add/user']);
        }
    }

    get formValid() {
        // check whether needed fields are null or not
        if (false) {
            return false;
        }
        return true;
    }

}
