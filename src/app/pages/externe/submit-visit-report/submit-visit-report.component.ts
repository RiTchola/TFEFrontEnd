import { Component } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import {RapportVisite, TypePersonne} from "../../../models/rapport-visite";
import {RapportDeVisiteService} from "../../outils/services/rapport-de-visite.service";
import {take} from "rxjs";
import {KeyValue} from "@angular/common";

@Component({
    selector: 'app-submit-visit-report',
    templateUrl: './submit-visit-report.component.html',
    styleUrls: ['./submit-visit-report.component.scss'],
    providers: [MessageService],
})
export class SubmitVisitReportComponent {
    enableForm: boolean = true;
    typePersonnes: KeyValue<string, TypePersonne>[] = [
        { key: "Époux", value: "EPOUX" },
        { key: "Épouse", value: "EPOUSE" },
        { key: "Parent", value: "PARENT" },
        { key: "Enfant", value: "ENFANT" },
        { key: "Petit-Fils", value: "PETIT_FILS" },
        { key: "Petite-Fille", value: "PETITE_FILLE" },
        { key: "Membre de la Famille(élargie)", value: "AUTRE_FAMILLE" },
        { key: "Ami(e)", value: "AMI" },
        { key: "Avocat(e)", value: "AVOCAT" },
        { key: "Medecintraitant", value: "MEDECIN_TRAITANT" },
        { key: "Kinesithérapeute", value: "KINESITHERAPEUTE" },
        { key: "Autre(s)", value: "AUTRE" }
    ];

    rapportVisite: RapportVisite = {
        id: 0,
        nomResid: '',
        prenomResid: '',
        dateVisite: new Date(),
        nomVisiteur: '',
        typePersonne: 'ENFANT',
        dateBirthResid: new Date(),
        commentaire: ""
    };

    constructor(private rapportVisiteService: RapportDeVisiteService, private messageService: MessageService) {
    }

    submit(){
        console.log(this.rapportVisite)
        this.rapportVisiteService.createRapport(this.rapportVisite).subscribe({
            next: (res)=>{
                this.enableForm = false;
                this.messageService.add({severity:'success', summary:'Success', detail:res.message});
            },
            error: (error) =>{
                console.log(error.message)
                this.messageService.add({severity:'error', summary:'Error', detail:error.message},)
            }
        });
    }
}
