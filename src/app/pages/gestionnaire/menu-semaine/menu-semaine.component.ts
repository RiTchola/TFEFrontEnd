import { Component } from '@angular/core';

import { Util } from 'src/app/shared/util';
import { Router } from '@angular/router';

interface MenuItem {
    title: string;
    subtitle: string;
    id: number;
}

@Component({
    selector: 'app-menu-semaine',
    templateUrl: './menu-semaine.component.html',
    styleUrls: ['./menu-semaine.component.scss']
})
export class MenuSemaineComponent {

    date!: Date;

    items: MenuItem[] = [
        {
            id: 1,
            subtitle: 'Voir le menu',
            title: 'Lundi'
        },
        {
            id: 2,
            subtitle: 'Voir le menu',
            title: 'Mardi'
        },
        {
            id: 3,
            subtitle: 'Voir le menu',
            title: 'Mercredi'
        },
        {
            id: 4,
            subtitle: 'Voir le menu',
            title: 'Jeudi'
        },
        {
            id: 5,
            subtitle: 'Voir le menu',
            title: 'Vendredi'
        },
        {
            id: 6,
            subtitle: 'Voir le menu',
            title: 'Samedi'
        },
        {
            id: 7,
            subtitle: 'Voir le menu',
            title: 'Dimanche'
        }
    ];

    constructor(
        private router: Router
    ) {
        const curr = new Date;
        this.date = new Date(curr.setDate(curr.getDate() - curr.getDay()));
    }

    showDetails(id: number) {
        const day = this.items.find(x => x.id == id)?.title;
        const date = new Date(this.date.setDate(this.date.getDate() + id));
        this.router.navigateByUrl(`/gestionnaire/menu-semaine/details/${day}_${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`);
    }

    displayAsDate(date: Date) {
        return Util.displayAsDate(date ?? new Date());
    }
}
