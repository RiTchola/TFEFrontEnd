import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { MedecinTraitant } from 'src/app/models/medecin-traitant';
import { Resident } from 'src/app/models/resident';
import { User } from 'src/app/models/user';

@Component({
    selector: 'app-manage',
    templateUrl: './manage.component.html',
    styleUrls: ['./manage.component.scss'],
    providers: [MessageService]
})
export class ManageComponent implements OnInit {

    user?: User;
    doctor?: MedecinTraitant;
    resident?: Resident;

    items: MenuItem[] = [];
    activeIndex: number = 0;

    ngOnInit(): void {
        this.items = [
            {
                label: '',
                routerLink: 'user',
                command: (event: any) => {
                    this.activeIndex = 0;
                    console.log(event)
                }
            },
            {
                label: '',
                routerLink: 'medecin',
                command: (event: any) => {
                    this.activeIndex = 1;
                    console.log(event)
                },
            },
            {
                label: '',
                routerLink: 'resident',
                command: (event: any) => {
                    this.activeIndex = 2;
                }
            }
        ];
    }

    onActiveIndexChange(e: any) {
        console.log(e)
    }
}
