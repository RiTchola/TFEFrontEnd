import {Component, OnInit} from "@angular/core";
import {CommuniqueService} from "../service/communique.service";
import {MessageService} from "primeng/api";

export interface Communique {
    id?: number,
    date: Date,
    titre: string,
    contenu: string,
    fileUrl: string[]
}

@Component({
    templateUrl: './blog.component.html'
})
export class BlogComponent implements OnInit{
    visible: boolean = false;
    blogItems!: Communique[];

    newBlog: Communique = {
        date: new Date(),
        titre: '',
        contenu: '',
        fileUrl: []
    };

    ngOnInit(): void {
        this.blogItems = this.communiqueService.blogItems;
    }
    constructor(private communiqueService: CommuniqueService, private messageService: MessageService) {
    }

    showDialog() {
        this.visible = true;
    }

    addCommentar(){
        this.visible = false;
        this.messageService.add({severity:'success', summary:'Success', detail:'Communique enregistre'});

    }



}
