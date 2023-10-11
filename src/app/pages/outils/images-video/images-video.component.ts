import {Component, OnInit} from '@angular/core';
import {MessageService} from "primeng/api";
import {Fichier} from "../../../models/fichier";
import {FichierService} from "../services/fichier.service";
import {KeyValue} from "@angular/common";
import {HttpResponse} from "@angular/common/http";


@Component({
    selector: 'app-images-video',
    templateUrl: './images-video.component.html',
    styleUrls: ['./images-video.component.scss'],
    providers: [MessageService],
})
export class ImagesVideoComponent implements OnInit{
    uploadedImages!: any;
    today = new Date();



    fichier: Fichier[] = [];
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
        this.fichierService.getAllFiles().subscribe(
            {
                next: (res)=>{
                    this.fichier = res;
                },
                error: (error)=>{
                    this.messageService.add({severity:'error', summary:'Error', detail:error.message})
                }
            }
        )
    }

    ngOnInit(): void {
        this.getFiles();
    }


    downloadFile(url: string){
        this.fichierService.downloadFile(url).subscribe(
            {
                next: (data)=>{
                    const contentDispositionHeader = data.headers.get('Content-Disposition');
                    const filename = this.extractFilename(contentDispositionHeader);
                    this.createAndDownloadBlobFile(data.body, filename);
                },
                error: (error)=>{
                    this.messageService.add({severity:'error', summary:'Error', detail:error.message})
                }
            }
        )
    }

    private createAndDownloadBlobFile(body: any, filename: string): void {
        const blob = new Blob([body]);
        const fileName = filename;
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);

        link.href = url;
        link.download = fileName;
        link.click();

        URL.revokeObjectURL(url);
        link.remove();
    }



    private extractFilename(contentDispositionHeader: string|null): string {
        if (!contentDispositionHeader) {
            return 'default-filename';
        }
        const filenameMatch = contentDispositionHeader.match(/filename="?([^"]*)"?/);
        if (filenameMatch && filenameMatch.length > 1) {
            return filenameMatch[1];
        }
        return 'default-filename';
    }

    showDialog() {
        this.visible = true;
    }

    onSelect(event: any) {
        this.uploadedImages = event.files[0];
    }

    submit(){
        this.fichierService.addFile(this.fichierHelper.date, this.fichierHelper.typeF, this.uploadedImages).subscribe(
            {
                next: (event)=>{
                    if(event instanceof HttpResponse){
                        this.visible = false;
                        this.getFiles();
                        this.messageService.add({severity:'success', summary:'Success', detail:event.body.message})
                        this.fichierHelper= {
                            id: 0,
                            date: new Date(),
                            personneContact: '',
                            typeF: "IMAGE"
                        };
                        this.uploadedImages =  null;
                    }
                },
                error: (error)=>{
                    this.messageService.add({severity:'error', summary:'Error', detail:error.message});
                }
            }
        )
    }
}
