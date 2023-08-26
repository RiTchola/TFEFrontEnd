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
                    { label: 'Calendrier des activités', icon: 'pi pi-fw pi-calendar-plus', routerLink: ['/calendrier/activites'] },
                    { label: 'Calendrier des évenements', icon: 'pi pi-fw pi-calendar-plus', routerLink: ['/calendrier/evenements'] }                ]
            },
            {
                label: 'Gestionnaire',
                items: [
                    { label: 'Résident', icon: 'pi pi-fw pi-briefcase', routerLink: ['/gestionnaire/resident'] },
                    { label: 'Menu de la semaine', icon: 'pi pi-fw pi-stopwatch', routerLink: ['/gestionnaire/menu-semaine'] },
                    { label: 'Meet-Up', icon: 'pi pi-fw pi-megaphone', routerLink: ['/gestionnaire/meet-up'] },
                    { label: 'Blog', icon: 'pi pi-fw pi-comment', routerLink: ['/gestionnaire/blog'] }
                ]
            },
            {
                label: 'Outils',
                items: [
                    { label: 'Image/Video', icon: 'pi pi-fw pi-video', routerLink: ['/outils'] },
                    { label: 'Rapport de visite', icon: 'pi pi-fw pi-file-edit', routerLink: ['/outils'] }
                ]
            },
            {
                label: 'Parametre',
                items: [
                    { label: 'Paramètre de compte', icon: 'pi pi-fw pi-cog', routerLink: ['/parametre'] },
                    { label: 'Deconnexion', icon: 'pi pi-fw pi-sign-out', routerLink: ['/parametre'] }
                ]
            }

        ];
    }
}
