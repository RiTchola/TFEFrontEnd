import { Component } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
    selector: 'app-create-menu',
    templateUrl: './create-menu.component.html',
    styleUrls: ['./create-menu.component.scss'],
    providers: [MessageService]
})
export class CreateMenuComponent {

    items: MenuItem[] = [];

    constructor() {
        this.items = [
            {
                routerLink: 'lundi',
            },
            {
                routerLink: 'mardi',
            },
            {
                routerLink: 'mercredi',
            },
            {
                routerLink: 'jeudi',
            },
            {
                routerLink: 'vendredi',
            },
            {
                routerLink: 'samedi',
            },
            {
                routerLink: 'dimanche',
            }
        ];
    }
}
