import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuOfTheWeekService } from '../../service/menu-of-the-week.service';
import { Util } from 'src/app/shared/util';
import { Menu } from 'src/app/models/menu';

@Component({
    selector: 'app-menu-details',
    templateUrl: './menu-details.component.html',
    styleUrls: ['./menu-details.component.scss']
})
export class MenuDetailsComponent implements OnInit {

    date!: string;
    menu!: Menu;

    constructor(
        private menuSrv: MenuOfTheWeekService,
        private router: Router
    ) {
        const parts = this.router.url.split("/");
        this.date = parts[parts.length - 1];
    }

    ngOnInit(): void {
        this.fetchByDate();
    }

    fetchByDate() {
        const date = new Date(this.date.split('_')[1].replace('-', '/').replace('-', '/'));
        this.menuSrv.fetchByStartDate(date).subscribe({
            next: (r) => this.menu = r,
            error: (err) => console.log(err)
        })
    }

    getDay(date: string) {
        return date.split('_')[0];
    }
}
