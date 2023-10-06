import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactPersonType } from 'src/app/shared/interfaces/contact-person-type';
import { Status } from 'src/app/shared/interfaces/person-status';
import { ContactPersonService } from '../../service/contact-person.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ContactPerson } from 'src/app/models/contact-person';

@Component({
    selector: 'app-contact-person-form',
    templateUrl: './contact-person-form.component.html',
    styleUrls: ['./contact-person-form.component.scss'],
    providers: [MessageService]
})
export class ContactPersonFormComponent implements OnInit {

    required = 'Ce champ est requis';
    formData = new FormGroup({
        name: new FormControl('', [Validators.required]),
        firstname: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
        dob: new FormControl(new Date(), [Validators.required]),
        status: new FormControl('', [Validators.required]),
        type: new FormControl('', [Validators.required]),
        address: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(120)]),
        tel: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
        tel2: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
    });

    statusList = [
        { name: '', value: '' },
        { name: 'Célibataire', value: Status.celibataire },
        { name: 'Divorcé', value: Status.divorce },
        { name: 'Divorcée', value: Status.divorce },
        { name: 'Marié', value: Status.marie },
        { name: 'Mariée', value: Status.marie },
        { name: 'Veuf', value: Status.veuf },
        { name: 'Veuve', value: Status.veuf }
    ];

    typeList = [
        { name: 'Veuillez faire un choix', value: '' },
        { name: 'Ami', value: ContactPersonType.ami },
        { name: 'Amie', value: ContactPersonType.ami },
        { name: 'Autre', value: ContactPersonType.autre },
        { name: 'Autre Membre de Famille', value: ContactPersonType.autre_famille },
        { name: 'Avocat', value: ContactPersonType.avocat },
        { name: 'Avocate', value: ContactPersonType.avocat },
        { name: 'Enfant', value: ContactPersonType.enfant },
        { name: 'Époux', value: ContactPersonType.epoux },
        { name: 'Épouse', value: ContactPersonType.epouse },
        { name: 'Kinésithérapeute', value: ContactPersonType.kinesi_therapeute },
        { name: 'Médécin Traitant', value: ContactPersonType.medecin_traitant },
        { name: 'Parent', value: ContactPersonType.parent },
        { name: 'Pétit-Fils', value: ContactPersonType.petit_fils },
        { name: 'Pétit-Fille', value: ContactPersonType.petit_fille }
    ];

    residentId = 0;
    personId = 0;
    isNewRecord = true;

    constructor(
        private contactpersonSrv: ContactPersonService,
        private msgSrv: MessageService,
        private router: Router
    ) {
        const parts = this.router.url.split("/");
        this.residentId = Number.parseInt(parts[parts.length - 2]);
        if (Number.parseInt(parts[parts.length - 1])) {
            this.personId = Number.parseInt(parts[parts.length - 1]);
        }
    }

    ngOnInit(): void {
        // if personId != 0 then we init the form
        if (this.personId != 0) {
            this.initForm();
            this.isNewRecord = false;
        }
    }

    initForm() {
        this.contactpersonSrv.fetchById(this.personId).subscribe({
            next: (r) => {
                this.formData.controls.address.setValue(r.adresse);
                this.formData.controls.dob.setValue(new Date(r.dateNaissance));
                this.formData.controls.email.setValue(r.email ?? "");
                this.formData.controls.firstname.setValue(r.prenom);
                this.formData.controls.name.setValue(r.nom);
                this.formData.controls.status.setValue(r.statut);
                this.formData.controls.tel.setValue(r.tel1);
                this.formData.controls.tel2.setValue(r.tel2 ?? '');
                this.formData.controls.type.setValue(r.choix);
            },
            error: (err) => console.log(err)
        });
    }

    get isFormValid() {
        const dob = this.formData.controls.dob.value ?? new Date();
        if (this.formData.controls.status.value == "" || this.formData.controls.type.value == "") {
            return false;
        }

        if (dob && (new Date().getFullYear() - new Date(dob).getFullYear()) < 18) {
            this.formData.controls.dob.setErrors({ 'greater': true, 'required': false });
            return false;;
        } else {
            this.formData.controls.dob.setErrors({ 'greater': false, 'required': false });
        }

        return true;
    }

    buildBody() {
        const phone = (!this.formData.controls.tel2.value || this.formData.controls.tel2.value == '') ? this.formData.controls.tel.value : this.formData.controls.tel2.value;
        const data: ContactPerson = {
            adresse: this.formData.controls.address.value ?? '',
            choix: this.formData.controls.type.value ?? '',
            dateNaissance: this.formData.controls.dob.value ?? new Date(),
            email: this.formData.controls.email.value ?? '',
            nom: this.formData.controls.name.value ?? '',
            prenom: this.formData.controls.firstname.value ?? '',
            statut: this.formData.controls.status.value ?? Status.celibataire,
            tel1: this.formData.controls.tel.value ?? '',
            tel2: phone ?? 'undefined'
        }
        return data;
    }

    save() {
        if (!this.isFormValid) {
            return;
        }

        if (this.isNewRecord) {
            this.add();
        } else {
            this.update();
        }
    }

    add() {
        this.contactpersonSrv.add(this.residentId, this.buildBody()).subscribe({
            next: (r) => this.onSuccess('Personne de contact enrégistrée.'),
            error: (err) => {
                this.onError('Erreur lors de la sauvegarde')
                console.log(err)
            },
            complete: () => {
                setTimeout(() => {
                    this.backToListViwe();
                }, 500);
            }
        });
    }

    update() {
        let data = this.buildBody();
        // also set the value of the id
        data.id = this.personId;
        this.contactpersonSrv.update(data).subscribe({
            next: () => this.onSuccess('Sauvergadé avec success.'),
            error: (err) => {
                this.onError('Erreur lors de la sauvegarde')
                console.log(err)
            },
            complete: () => {
                setTimeout(() => {
                    this.backToListViwe();
                }, 500);
            }
        });
    }

    backToListViwe() {
        this.router.navigateByUrl(`/gestionnaire/contact-person/${this.residentId}`);
    }

    onSuccess(msg: string) {
        this.msgSrv.add({ severity: 'success', summary: 'Success', detail: msg });
    }

    onError(msg: string) {
        this.msgSrv.add({ severity: 'error', summary: 'Erreur', detail: msg });
    }
}
