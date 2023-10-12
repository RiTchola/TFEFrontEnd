import { Component, EventEmitter, Output } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import {RapportVisite} from "../../../models/rapport-visite";
import {RapportDeVisiteService} from "../../outils/services/rapport-de-visite.service";
import {take} from "rxjs";
import {KeyValue} from "@angular/common";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactPersonType } from 'src/app/shared/interfaces/contact-person-type';


@Component({
    selector: 'app-submit-visit-report',
    templateUrl: './submit-visit-report.component.html',
    styleUrls: ['./submit-visit-report.component.scss'],
    providers: [MessageService],
})
export class SubmitVisitReportComponent {
    enableForm: boolean = true;
    code = 0;
    @Output() saved: EventEmitter<string> = new EventEmitter<string>(undefined);

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
        { name: 'Pétite-Fille', value: ContactPersonType.petit_fille }
    ];

    dataForm = new FormGroup({
        dateVisite: new FormControl<Date>(new Date(), [Validators.required]),
        nomResid: new FormControl('', [Validators.required]),
        prenomResid: new FormControl('', [Validators.required]),
        dateBirthResid: new FormControl<Date>(new Date(), [Validators.required]),
        nomVisiteur: new FormControl('', [Validators.required]),
        typePersonne: new FormControl('', [Validators.required]),
        commentaire: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(800)]),
    });

    required = 'Ce champ est requis';

    buildBody() {
        const data: RapportVisite = {
            id: 0,
            nomResid: this.dataForm.controls.nomResid.value ?? '',
            prenomResid: this.dataForm.controls.prenomResid.value ?? '',
            dateVisite: this.dataForm.controls.dateVisite.value ?? new Date(),
            nomVisiteur: this.dataForm.controls.nomVisiteur.value ?? '',
            typePersonne: this.dataForm.controls.typePersonne.value?? ContactPersonType.autre,
            dateBirthResid: this.dataForm.controls.dateBirthResid.value ?? new Date(),
            commentaire: this.dataForm.controls.commentaire.value ?? '',
        };
        return data;
    }

    constructor(
        private rapportVisiteService: RapportDeVisiteService, 
        private messageService: MessageService,
        private router: Router) {
            this.code = Number.parseInt(this.router.url.split("?")[1].split("=")[1]);
            console.log(this.code);
    }

    get isFormValid() {
        const dateBirthResid = this.dataForm.controls.dateBirthResid.value;
        if (dateBirthResid && ((new Date().getFullYear() - new Date(dateBirthResid).getFullYear())) < 25) {
            this.dataForm.controls.dateBirthResid.setErrors({ 'greater': true, 'required': false });
            return false;
        }

        const dateVisite = this.dataForm.controls.dateVisite.value;
        if (dateVisite && new Date(dateVisite) > new Date()) {
            this.dataForm.controls.dateVisite.setErrors({ 'greater': true, 'required': false });
            return false;
        }

        if (this.dataForm.controls.typePersonne.value == "" ) {
            return false;
        }

        return true;
    }
    
    save() {
        if (!this.isFormValid) {
            return;
        }
        this.submit();
    }

    submit(){
        const data = this.buildBody();

        if (this.dataForm) {
            console.log("je suis ici");
            this.rapportVisiteService.createRapport(this.code, data).subscribe({
                next: (res:any)=>{
                    this.enableForm = false;
                    console.log(data);
                    this.messageService.add({severity:'success', summary:'Success', detail:res.message});
                },
                error: (error:any) =>{
                    this.messageService.add({severity:'error', summary:'Error', detail:error.message},)
                }
            });
        }
    }

}
