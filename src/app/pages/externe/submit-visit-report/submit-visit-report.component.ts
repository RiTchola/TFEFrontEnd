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
        this.rapportVisiteService.createRapport(this.rapportVisite).pipe(take(1)).subscribe({
            next: ()=>{
                this.messageService.add({severity:'success', summary:'Success', detail:'merci'});
            },
            error: (error) =>{
                this.messageService.add({severity:'error', summary:'Error', detail:error.message},)
            }
        });
    }
}
