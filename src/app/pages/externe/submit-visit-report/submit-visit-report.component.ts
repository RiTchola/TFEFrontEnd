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
        { key: "Epoux", value: "EPOUX" },
        { key: "epouse", value: "EPOUSE" },
        { key: "parent", value: "PARENT" },
        { key: "enfant", value: "ENFANT" },
        { key: "petitFils", value: "PETIT_FILS" },
        { key: "petiteFille", value: "PETITE_FILLE" },
        { key: "autreFamille", value: "AUTRE_FAMILLE" },
        { key: "ami", value: "AMI" },
        { key: "avocat", value: "AVOCAT" },
        { key: "medecinTraitant", value: "MEDECIN_TRAITANT" },
        { key: "kinesitherapeute", value: "KINESITHERAPEUTE" },
        { key: "autre", value: "AUTRE" }
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
