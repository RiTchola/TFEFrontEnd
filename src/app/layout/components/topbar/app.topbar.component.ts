import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "../../services/app.layout.service";
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    items!: MenuItem[];
    role!: string;
    username!: string;

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService, private authService: AuthService) {
        this.role = authService.getRole().toLowerCase();
        this.username = authService.getUsername();
        if(this.role == 'admin') this.role ='Admin';
        if(this.role == 'etablissement') this.role ='Etablissement';
        if(this.role == 'resident') this.role ='Résident';
        if(this.role == 'personnecontact') this.role ='Personne Contact';
    }
}
