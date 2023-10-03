import {Component} from '@angular/core';
import {RapportVisite} from "../../../models/rapport-visite";
import {RapportDeVisiteService} from "../services/rapport-de-visite.service";
import {MessageService} from "primeng/api";

@Component({
    selector: 'app-images-video',
    templateUrl: './images-video.component.html',
    styleUrls: ['./images-video.component.scss'],
    providers: [MessageService],
})
export class ImagesVideoComponent {
    rapportVisite: RapportVisite[] = [];

    rapportVisiteHelper: RapportVisite = {
        id: 0,
        nomResid: '',
        prenomResid: '',
        dateVisite: new Date(),
        nomVisiteur: '',
        typePersonne: 'ENFANT',
        dateBirthResid: new Date(),
        commentaire: ""
    };

    visible: boolean = false;

    constructor(private rvt: RapportDeVisiteService, private messageService: MessageService) {
    }

    ngOnInit(): void {
        this.loadRapports();
    }

    loadRapports() {
        this.rvt.getAllRapports().subscribe({
            next: (data) => {
                this.rapportVisite = data;
                this.messageService.add({severity: 'success', summary: 'Success', detail: 'succès'});
            },
            error: (err) => {
                this.messageService.add({severity: 'error', summary: 'Error', detail: err.message},)
            }
        });
    }

    showDialog(rv: RapportVisite) {
        this.visible = true;
        this.rapportVisiteHelper = rv;

    }
}
