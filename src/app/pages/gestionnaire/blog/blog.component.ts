import {Component, OnInit} from "@angular/core";
import {CommuniqueService} from "../service/communique.service";
import {MessageService} from "primeng/api";
import {Communique} from "../../../models/communique";

import { FormGroup, FormControl, Validators } from '@angular/forms'

@Component({
    templateUrl: './blog.component.html',
    providers: [MessageService]
})
export class BlogComponent implements OnInit {

    visible: boolean = false;
    blogItems!: Communique[];

    dataForm = new FormGroup({
        date: new FormControl<Date>(new Date(), [Validators.required]),
        titre: new FormControl('', [Validators.required]),
        contenu: new FormControl('', [Validators.required]),
        fileUrl: new FormControl([]),
    });

    required = 'Ce champ est requis';
   /*  Communique = {
        date: new Date(),
        titre: '',
        contenu: '',
        fileUrl: []
    }; */

    ngOnInit(): void {
        this.blogItems = this.communiqueService.blogItems;
    }

    constructor(
        private communiqueService: CommuniqueService, 
        private messageService: MessageService
    )  { }


    showDialog() {
        this.visible = true;
    }

    buildBody() {
        const data: Communique = {
            id : 0,
            date: this.dataForm.controls.date.value ?? new Date(),
            titre: this.dataForm.controls.titre.value ?? '',
            contenu: this.dataForm.controls.contenu.value ?? '',
            fileUrl: Array.isArray(this.dataForm.controls.fileUrl.value) ? this.dataForm.controls.fileUrl.value: [],
        };
        return data;
    }

   /*  save() {
        const data = this.buildBody();
        if (!this.dataForm.controls.titre.value) {
            data.titre = data.titre ?? 'undefined';
        }

        if (!this.dataForm.controls.contenu.value) {
            data.contenu = data.contenu ?? 'undefined';
        }

        const date = this.dataForm.controls.date.value;
        if (date && new Date(date) > new Date()) {
            this.dataForm.controls.date.setErrors({ 'greater': true, 'required': false });
            return;
        }

        if (this.dataForm.valid ) {
            this.communiqueService.add(data).subscribe({
                next: (result) => {
                    if (result) {
                        this.visible = false;
                        this.messageService.add({severity:'success', summary:'Success', detail:'Communiqué enregistré'});
                    }
                },
                error: (err) => {
                    console.error(err);
                    this.saved.emit(undefined);
                }
            });
        }
    } */

    addCommentar(){
        this.visible = false;
        this.messageService.add({severity:'success', summary:'Success', detail:'Communiqué enregistré'});
    }
}
