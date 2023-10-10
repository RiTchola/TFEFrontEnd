import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'

import { EtablissementService } from '../../services/etablissement.service';

import { AuthService } from 'src/app/core/services/auth.service';
import { Etablissement } from './../../../../models/etablissement';

@Component({
    selector: 'app-etablissement-forms',
    templateUrl: './etablissement-forms.component.html',
    styleUrls: ['./etablissement-forms.component.scss']
})
export class EtablissementFormsComponent implements OnInit {
    @Input() update: boolean = false;
    @Output() saved: EventEmitter<string> = new EventEmitter<string>(undefined);

    dataForm = new FormGroup({
        name: new FormControl('', [Validators.required]),
        email1: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
        email2: new FormControl('', [Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
        tel1: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
        tel2: new FormControl('', [Validators.pattern('^[0-9]+$'), Validators.minLength(4), Validators.maxLength(30)]),
        address: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(120)]),
        date: new FormControl<Date>(new Date(), [Validators.required]),
    });

    required = 'Ce champ est requis';

    username = '';
    toUpdate?: Etablissement;

    constructor(
        private authSrv: AuthService,
        private etablisSrv: EtablissementService
    ) { }

    ngOnInit(): void {
        this.username = this.authSrv.getLoggedUser();
        if (this.update) {
            this.getEstablishmentInfo();
        }
    }

    getEstablishmentInfo() {
        this.etablisSrv.get().subscribe({
            next: (res) => {
                if (res) {
                    this.toUpdate = res;
                    this.populateForm(res);
                }
            },
            error: (err) => console.error(err)
        });
    }

    populateForm(value: Etablissement) {
        this.dataForm.controls.name.setValue(value.nom);
        this.dataForm.controls.email1.setValue(value.email1);
        this.dataForm.controls.email2.setValue(value.email2 ?? '');
        this.dataForm.controls.tel1.setValue(value.tel1.replace('+', ''));
        this.dataForm.controls.tel2.setValue(value?.tel2?.replace('+', '') ?? '');
        this.dataForm.controls.address.setValue(value.adresse);
        this.dataForm.controls.date.setValue(new Date(value.dateCreation));
    }

    buildBody() {
        const data: Etablissement = {
            adresse: this.dataForm.controls.address.value ?? '',
            email1: this.dataForm.controls.email1.value ?? '',
            email2: this.dataForm.controls.email2.value ?? '',
            tel1: `+${this.dataForm.controls.tel1.value}`,
            tel2: `+${this.dataForm.controls.tel2.value}`,
            dateCreation: this.dataForm.controls.date.value ?? new Date(),
            nom: this.dataForm.controls.name.value ?? '',
            etabUsername: this.username,
        };
        return data;
    }

    save() {
        const data = this.buildBody();
        
        const date = this.dataForm.controls.date.value;
        if (date && new Date(date) > new Date()) {
            this.dataForm.controls.date.setErrors({ 'greater': true, 'required': false });
            return;
        }

        if (this.dataForm.valid && !this.update) {
            this.etablisSrv.add(data).subscribe({
                next: (result) => {
                    if (result) {
                        this.saved.emit(result.msg);
                    }
                },
                error: (err) => {
                    console.error(err);
                    this.saved.emit(undefined);
                }
            });
        }

        if (this.dataForm.valid && this.update) {
            console.log(data)
            data.id = this.toUpdate?.id;
            this.etablisSrv.update(data).subscribe({
                next: (result) => {
                    if (result) {
                        this.saved.emit(result.email1);
                    }
                },
                error: (err) => {
                    console.error(err);
                    this.saved.emit(undefined);
                }
            });
        }
    }
}
