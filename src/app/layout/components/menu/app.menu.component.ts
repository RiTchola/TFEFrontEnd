import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from '../../services/app.layout.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { RoleType } from 'src/app/shared/interfaces/roleType';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService, private authSrv: AuthService) { }

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
                    { label: 'Calendrier des Évenements', icon: 'pi pi-fw pi-calendar-plus', routerLink: ['/calendrier/evenements'] }]
            },
            {
                label: 'Gestionnaire',
                items: this.getItems('gestionnaire')
            },
            {
                label: 'Outils',
                items: this.getItems('outils')
            },
            {
                label: 'Paramètres',
                items: this.getItems('parametre')
            }

        ];
    }

    getItems(placeholder: string) {
        let items = [];
        if (placeholder.toLowerCase() == 'outils') {
            if (this.authSrv.getRole() == RoleType.etablissement.toLowerCase() || this.authSrv.isAdmin() ||
                this.authSrv.getRole() == RoleType.resident.toLowerCase()) {
                items.push({ label: 'Image/Video', icon: 'pi pi-fw pi-video', routerLink: ['/outils/images-video'] });
                items.push({ label: 'Rapport de visite', icon: 'pi pi-fw pi-comment', routerLink: ['/outils/rapport-visite'] });
                items.push({ label: 'Établissement', icon: 'pi pi-fw pi-building', routerLink: ['/outils/etablissement'] });
            }
        }

        if (placeholder.toLowerCase() == 'parametre') {
            if (this.authSrv.getRole() == RoleType.etablissement.toLowerCase() || this.authSrv.isAdmin()) {
                items.push({ label: 'Paramètre de compte', icon: 'pi pi-fw pi-cog', routerLink: ['/parametre/compte'] });
            }
            items.push({ label: 'Déconnexion', icon: 'pi pi-fw pi-sign-out', routerLink: ['/parametre/deconnexion'] });
        }

        if (placeholder.toLowerCase() == 'gestionnaire') {
            if (this.authSrv.getRole() == RoleType.etablissement.toLowerCase() || this.authSrv.getRole().toLowerCase() == RoleType.personnecontact.toLowerCase() || this.authSrv.isAdmin()) {
                items.push({ label: 'Résidents', icon: 'pi pi-fw pi-users', routerLink: ['/gestionnaire/resident'] });
            }
            items.push({ label: 'Menu de la Semaine', icon: 'pi pi-fw pi-box', routerLink: ['/gestionnaire/menu-semaine'] });
            if (this.authSrv.getRole() == RoleType.etablissement.toLowerCase() || this.authSrv.getRole() == RoleType.personnecontact.toLowerCase() || this.authSrv.isAdmin()) {
                items.push({ label: 'Meet-Up', icon: 'pi pi-fw pi-file-edit', routerLink: ['/gestionnaire/meet-up'] });
            }
            items.push({ label: 'Blog', icon: 'pi pi-fw pi-megaphone', routerLink: ['/gestionnaire/blog'] });
        }
        return items;
    }
}
