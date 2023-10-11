import { Component, OnInit, ViewChild } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { Util } from 'src/app/shared/util';
import { Router } from '@angular/router';
import { MenuOfTheWeekService } from '../service/menu-of-the-week.service';
import { Menu } from 'src/app/models/menu';
import { AuthService } from 'src/app/core/services/auth.service';
import { RoleType } from 'src/app/shared/interfaces/roleType';

interface MenuItem {
    title: string;
    subtitle: string;
    id: number;
    content?: string;
}

@Component({
    selector: 'app-menu-semaine',
    templateUrl: './menu-semaine.component.html',
    styleUrls: ['./menu-semaine.component.scss']
})
export class MenuSemaineComponent implements OnInit {

    date!: Date;
    dateOfWeek = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
    items: MenuItem[] = [];
    selectedItem?: MenuItem;
    show = false;
    dateTime = 0;
    canAdd = false;

    @ViewChild('menuDialog') menuDialog?: Dialog;
    // Liste d'images disponibles
    images = ['menu1.jpg', 'menu2.jpg', 'menu3.jpg', 'menu4.jpg', 'menu5.jpg', 'menu6.jpeg',  'menu7.jpeg',  'menu8.jpeg',];
    // Image aléatoire
    randomImage?: string;

    constructor(
        private authSrv: AuthService,
        private menuSrv: MenuOfTheWeekService,
        private router: Router
    ) {
        const parts = this.router.url.split("/");
        try {
            this.dateTime = Number.parseFloat(parts[parts.length - 1]);
            this.date = new Date(this.dateTime);
        } catch (error) { }
    }

    ngOnInit(): void {
        // check whether the user can add new menu or not
        if (this.authSrv.getRole().toLowerCase() == RoleType.etablissement.toLowerCase() ||
        this.authSrv.getRole().toLowerCase() == RoleType.admin.toLowerCase()) {
            this.canAdd = true;
        }

        if (isNaN(this.dateTime)) {
            // if no date is defined then set the current date
            const curr = new Date;
            this.date = new Date(curr.setDate(curr.getDate() - curr.getDay()));
        }
        this.fetchMenu();

        this.randomImage = this.getRandomImage();
    }

    onShow() {
        this.randomImage = this.getRandomImage();
    }

    getRandomImage(): string {
        const randomIndex = Math.floor(Math.random() * this.images.length);
        return this.images[randomIndex];
    }

    private fetchMenu() {
        this.menuSrv.fetchByStartDate(new Date(this.date.toLocaleDateString())).subscribe({
            next: (r) => {
                this.items = [];
                if (r) {
                    for (let i = 0; i < 7; ++i) {
                        this.items.push({
                            id: r.id ?? 0,
                            subtitle: 'Voir le menu',
                            title: this.dateOfWeek[i],
                            content: this.getContent(i, r)
                        })
                    }
                }
            },
            error: (err) => console.log(err),
        })
    }

    getContent(id: number, menu: Menu) {
        if (id == 0)
            return menu.menuLundi;
        else if (id == 1)
            return menu.menuMardi;
        else if (id == 2)
            return menu.menuMercredi;
        else if (id == 3)
            return menu.menuJeudi;
        else if (id == 4)
            return menu.menuVendredi;
        else if (id == 5)
            return menu.menuSamedi;
        return menu.menuDimanche;
    }

    showDetails(item: MenuItem) {
        this.selectedItem = item;
        this.show = true;
    }

    displayAsDate(date: Date) {
        return Util.displayAsDate(date ?? new Date());
    }

    getValue(position: number) {
        const parts = this.selectedItem?.content?.split(",") ?? [];
        if (position == 0)
            return parts[0];
        else if (position == 1)
            return parts[1];

        return parts[2];
    }

    nextWeek() {
        this.date = new Date(this.date.setDate(this.date.getDate() + 7));
        this.router.navigateByUrl(`/gestionnaire/menu-semaine/${this.date.getTime()}`);
        this.fetchMenu();
    }

    previousWeek() {
        this.date = new Date(this.date.setDate(this.date.getDate() - 7));
        this.router.navigateByUrl(`/gestionnaire/menu-semaine/${this.date.getTime()}`);
        this.fetchMenu();
    }

    createMenu() {
        this.router.navigateByUrl(`/gestionnaire/menu-semaine/add/${this.date.getTime()}`);
    }

    editMenu() {
        if (this.selectedItem) {
            this.router.navigateByUrl(`/gestionnaire/menu-semaine/edit/${this.date.getTime()}/${this.selectedItem.title.toLowerCase()}`);
        }
    }
}
