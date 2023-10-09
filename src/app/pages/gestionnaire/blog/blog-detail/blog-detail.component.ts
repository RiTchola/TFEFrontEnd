import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CommuniqueService} from "../../service/communique.service";
import {Communique} from "../../../../models/communique";
import { Util } from 'src/app/shared/util';
import {MessageService} from "primeng/api";


@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit{

    blog: Communique = {
        date: new Date(),
        titre: '',
        contenu: '',
        fileURL: []
    };
    constructor(private activatedRoute: ActivatedRoute,
                private communiqueService: CommuniqueService,
                private messageService: MessageService,
                private router: Router, ) {


    }

    ngOnInit(): void {
        const idString = this.activatedRoute.snapshot.paramMap.get('id');
        if (idString) {
            const id = Number(idString);
            if (!isNaN(id)) {
                this.communiqueService.getCommuniqueById(id).subscribe(
                    {
                        next: (res)=>{
                           this.blog = res;
                        },
                        error: (error)=>{
                            this.messageService.add({severity:'error', summary:'Error', detail:error.message});
                        }
                    }
                )
            } else {
                this.messageService.add({severity:'error', summary:'Error', detail:'Invalid ID format'});
            }
        }
    }

    getDateOf(date: Date) {
        return Util.displayAsDate(date);
    }
}
