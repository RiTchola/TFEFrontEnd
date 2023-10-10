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
                label: 'Tableau de Bord',
                items: [
                    { label: 'Accueil', icon: 'pi pi-fw pi-home', routerLink: ['/dashboard/accueil'] }
                ]
            },
            {
                label: 'Calendrier',
                items: [
                    { label: 'Calendrier des Activités', icon: 'pi pi-fw pi-calendar-plus', routerLink: ['/calendrier/activites'] },
                    { label: 'Calendrier des Évènements', icon: 'pi pi-fw pi-calendar-plus', routerLink: ['/calendrier/evenements'] }                ]
            },
            {
                label: 'Gestionnaire',
                items: [
                    { label: 'Résidents', icon: 'pi pi-fw pi-users', routerLink: ['/gestionnaire/resident'] },
                    { label: 'Menu de la Semaine', icon: 'pi pi-fw pi-box', routerLink: ['/gestionnaire/menu-semaine'] },
                    { label: 'Meet-Up', icon: 'pi pi-fw pi-file-edit', routerLink: ['/gestionnaire/meet-up'] },
                    { label: 'Blog', icon: 'pi pi-fw pi-megaphone', routerLink: ['/gestionnaire/blog'] }
                ]
            },
            {
                label: 'Outils',
                items: [
                    { label: 'Image/Video', icon: 'pi pi-fw pi-video', routerLink: ['/outils/images-video'] },
                    { label: 'Rapport de Visite', icon: 'pi pi-fw pi-comment', routerLink: ['/outils/rapport-visite'] },
                    { label: 'Établissement', icon: 'pi pi-fw pi-building', routerLink: ['/outils/etablissement'] }
                ]
            },
            {
                label: 'Paramètres',
                items: [
                    {label: 'Paramètre de Compte', icon: 'pi pi-fw pi-cog', routerLink: ['/parametre/compte'] },
                    {label: 'Déconnexion', icon: 'pi pi-fw pi-sign-out',  routerLink: ['/parametre/deconnexion'] }
                ]
            }

        ];
    }
}
