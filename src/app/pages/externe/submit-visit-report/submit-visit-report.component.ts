import { Component } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import {RapportVisite} from "../../../models/rapport-visite";
import {RapportDeVisiteService} from "../../outils/services/rapport-de-visite.service";
import {take} from "rxjs";

@Component({
    selector: 'app-submit-visit-report',
    templateUrl: './submit-visit-report.component.html',
    styleUrls: ['./submit-visit-report.component.scss'],
    providers: [MessageService],
})
export class SubmitVisitReportComponent {
    enableForm: boolean = true;
    typePersonnes: string[] = ["EPOUX","EPOUSE","PARENT","ENFANT","PETIT_FILS","PETITE_FILLE","AUTRE_FAMILLE","AMI","AVOCAT","MEDECIN_TRAITANT","KINESITHERAPEUTE","AUTRE"];
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
