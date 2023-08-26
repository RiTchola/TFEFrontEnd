import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from '../../services/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Dashboard',
                items: [
                    { label: 'Accueil', icon: 'pi pi-fw pi-home', routerLink: ['/dashboard/accueil'] }
                ]
            },
            {
                label: 'Calendrier',
                items: [
                    { label: 'Calendrier des activités', icon: 'pi pi-fw pi-calendar-plus', routerLink: ['/xcx'] },
                    { label: 'Calendrier des évenements', icon: 'pi pi-fw pi-calendar-plus', routerLink: ['/xcxc'] }                ]
            },
            {
                label: 'Gestionnaire',
                items: [
                    { label: 'Résident', icon: 'pi pi-fw pi-briefcase', routerLink: ['/cxcx'] },
                    { label: 'Menu de la semaine', icon: 'pi pi-fw pi-stopwatch', routerLink: ['/xcxc'] },
                    { label: 'Meet-Up', icon: 'pi pi-fw pi-megaphone', routerLink: ['/xcxc'] },
                    { label: 'Blog', icon: 'pi pi-fw pi-comment', routerLink: ['/xcx'] }
                ]
            },
            {
                label: 'Outils',
                items: [
                    { label: 'Image/Video', icon: 'pi pi-fw pi-video', routerLink: ['/xcx'] },
                    { label: 'Rapport de visite', icon: 'pi pi-fw pi-file-edit', routerLink: ['/xcxc'] }
                ]
            },
            {
                label: 'Parametre',
                items: [
                    { label: 'Paramètre de compte', icon: 'pi pi-fw pi-cog', routerLink: ['/xcxc'] },
                    { label: 'Deconnexion', icon: 'pi pi-fw pi-sign-out', routerLink: ['/xcxc'] }
                ]
            }

        ];
    }
}
