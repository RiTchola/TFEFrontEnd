import {Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {RapportVisite, TypePersonne} from "../../../models/rapport-visite";
import {RapportDeVisiteService} from "../services/rapport-de-visite.service";
import {MessageService} from "primeng/api";
import {Fichier} from "../../../models/fichier";
import {FichierService} from "../services/fichier.service";
import {KeyValue} from "@angular/common";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpEventType, HttpResponse} from "@angular/common/http";

@Component({
    selector: 'app-images-video',
    templateUrl: './images-video.component.html',
    styleUrls: ['./images-video.component.scss'],
    providers: [MessageService],
})
export class ImagesVideoComponent implements OnInit{
    uploadedImages: any[] = [];
    today = new Date();
    @ViewChildren('buttonEl') buttonEl!: QueryList<ElementRef>;
    value:number = 0;
    answer: string = '';

    dataForm = new FormGroup({
        date: new FormControl<Date>(new Date(), [Validators.required]),
        typeF: new FormControl('', [Validators.required]),
    });

    required = 'Ce champ est requis';


    fichier: Fichier[] = [
        {id: 0, date: new Date(), typeF: "IMAGE", personneContact: "text.png"},
        {id: 2, date: new Date(), typeF: "VIDEO", personneContact: "text.mp4"},
        {id: 3, date: new Date(), typeF: "VIDEO", personneContact: "te23.mp4"},
        {id: 4, date: new Date(), typeF: "IMAGE", personneContact: "text3.png"},
        {id: 5, date: new Date(), typeF: "IMAGE", personneContact: "text5.png"}
    ];
    typeFichiers: KeyValue<string, string>[] = [
        {key: "Image", value: "IMAGE"},
        {key: "Video", value: "VIDEO"}];

    fichierHelper: Fichier = {
        id: 0,
        date: new Date(),
        personneContact: '',
        typeF: "IMAGE"
    };

    visible: boolean = false;

    constructor(private fichierService: FichierService, private messageService: MessageService) {
    }

    getFiles(){

    }

    ngOnInit(): void {
        this.getFiles();
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

    onSelect(event: any) {
        for (const file of event.files) {
            this.uploadedImages.push(file);
        }
    }

    onImageMouseOver(file: File) {
        this.buttonEl.toArray().forEach(el => {
            el.nativeElement.id === file.name ? el.nativeElement.style.display = 'flex' : null;
        })
    }

    onImageMouseLeave(file: File) {
        this.buttonEl.toArray().forEach(el => {
            el.nativeElement.id === file.name ? el.nativeElement.style.display = 'none' : null;
        })
    }

    removeImage(file: File) {
        this.uploadedImages = this.uploadedImages.filter(i=> i!==file);
    }


    submit(){
        if(this.dataForm.valid){
            /*
            this.communiqueService.createCommunique(
                this.dataForm.controls.contenu.value ?? '',
                this.dataForm.controls.titre.value ?? '',
                this.dataForm.controls.date.value?.toISOString() ?? new Date().toISOString(),
                this.uploadedImages
            ).subscribe({
                next: (event)=>{
                    if(event.type === HttpEventType.UploadProgress){
                        this.value = Math.round((100 * event.loaded) / (event.total?event.total: 1));
                    }else if (event instanceof HttpResponse) {
                        this.visible = false;
                        this.getFiles();
                        this.messageService.add({severity:'success', summary:'Success', detail:'merci'})
                        this.answer = event.body.message;
                    }
                },
                error: (error)=>{
                    this.messageService.add({severity:'error', summary:'Error', detail:error.message},)
                }
            })*/
        }else{
            this.dataForm.markAllAsTouched();
            this.messageService.add({severity:'error', summary: 'Error', detail: 'Form is invalid. Please correct the errors and try again.'});
        }
    }
}
