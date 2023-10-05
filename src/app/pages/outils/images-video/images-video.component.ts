import {Component} from '@angular/core';
import {RapportVisite, TypePersonne} from "../../../models/rapport-visite";
import {RapportDeVisiteService} from "../services/rapport-de-visite.service";
import {MessageService} from "primeng/api";
import {Fichier} from "../../../models/fichier";
import {FichierService} from "../services/fichier.service";
import {KeyValue} from "@angular/common";

@Component({
    selector: 'app-images-video',
    templateUrl: './images-video.component.html',
    styleUrls: ['./images-video.component.scss'],
    providers: [MessageService],
})
export class ImagesVideoComponent {
    fichier: Fichier[] = [
        {id: 0, date: new Date(), typeF: "IMAGE", fileURL: "text.png"},
        {id: 2, date: new Date(), typeF: "VIDEO", fileURL: "text.mp4"},
        {id: 3, date: new Date(), typeF: "VIDEO", fileURL: "te23.mp4"},
        {id: 4, date: new Date(), typeF: "IMAGE", fileURL: "text3.png"},
        {id: 5, date: new Date(), typeF: "IMAGE", fileURL: "text5.png"}
    ];
    typeFichiers: KeyValue<string, string>[] = [
        {key: "Image", value: "IMAGE"},
        {key: "Video", value: "VIDEO"}];

    fichierHelper: Fichier = {
        id: 0,
        date: new Date(),
        fileURL: '',
        typeF: "IMAGE"
    };

    visible: boolean = false;

    constructor(private fichierService: FichierService, private messageService: MessageService) {
    }

    ngOnInit(): void {
        this.loadRapports();
    }

    loadRapports() {
        this.fichierService.getAllFichiers().subscribe({
            next: (data) => {
                this.fichier = data;
                this.messageService.add({severity: 'success', summary: 'Success', detail: 'succès'});
            },
            error: (err) => {
                this.messageService.add({severity: 'error', summary: 'Error', detail: err.message},)
            }
        });
    }

    downloadFile(){

    }

    showDialog() {
        this.visible = true;
    }
}
