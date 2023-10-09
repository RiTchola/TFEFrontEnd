import {Component, ElementRef, OnInit, QueryList, ViewChildren} from "@angular/core";
import {CommuniqueService} from "../service/communique.service";
import {MessageService} from "primeng/api";
import {Communique} from "../../../models/communique";

import {FormGroup, FormControl, Validators, ValidatorFn, AbstractControl} from '@angular/forms'
import {HttpEventType, HttpResponse} from "@angular/common/http";
interface Image {
    name: string;
    objectURL: string;
}

 function futureDateValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const selectedDate = new Date(control.value);

        return selectedDate > today ? null : { 'pastDate': true };
    };
}

@Component({
    templateUrl: './blog.component.html',
    styleUrls: ['./blog-component.scss'],
    providers: [MessageService]
})
export class BlogComponent implements OnInit {
    uploadedImages: any[] = [];
    isSpinner: boolean = false;
    isImageNotValid: boolean = false;
    @ViewChildren('buttonEl') buttonEl!: QueryList<ElementRef>;
    value:number = 0;
    answer: string = '';

    visible: boolean = false;
    isNewRecord: boolean = true;
    blogItems!: Communique[];

    dataForm = new FormGroup({
        date: new FormControl<Date>(new Date(), [Validators.required, futureDateValidator]),
        titre: new FormControl('', [Validators.required]),
        contenu: new FormControl('', [Validators.required]),
    });

    required = 'Ce champ est requis';


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
        if(this.dataForm.valid && this.uploadedImages.length!=0){
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
                        this.messageService.add({severity:'success', summary:'Success', detail:'merci'})
                        this.answer = event.body.message;
                    }
                },
                error: (error)=>{
                    this.messageService.add({severity:'error', summary:'Error', detail:error.message},)
                }
            })
        }else{
            this.dataForm.markAllAsTouched();
            if(this.uploadedImages.length==0){
                this.isImageNotValid = true;
            }
            this.messageService.add({severity:'error', summary: 'Error', detail: 'Form is invalid. Please correct the errors and try again.'});
        }
    }

}
