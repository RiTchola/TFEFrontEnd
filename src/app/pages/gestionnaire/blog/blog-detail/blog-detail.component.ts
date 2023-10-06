import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CommuniqueService} from "../../service/communique.service";
import {Communique} from "../../../../models/communique";
import { Util } from 'src/app/shared/util';


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
        fileUrl: []
    };
    constructor(private activatedRoute: ActivatedRoute,
                private communiqueService: CommuniqueService,
                private router: Router, ) {


    }

    ngOnInit(): void {
        const idString = this.activatedRoute.snapshot.paramMap.get('id');
        if (idString) {
            const id = Number(idString);
            if (!isNaN(id)) {
                this.blog = this.communiqueService.getCommuniqueById(id);
            } else {
                console.error('Invalid ID format');
            }
        }
    }
}
