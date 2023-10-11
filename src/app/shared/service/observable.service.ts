import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Menu } from 'src/app/models/menu';

interface IResident {
    user: string;
    doctor: string,
    resident: string;
}

@Injectable({
    providedIn: 'root'
})
export class ObservableService {

    private residentSource = new BehaviorSubject<IResident>({
        doctor: "",
        resident: "",
        user: ""
    });
    observableResident = this.residentSource.asObservable();

    private menuSource = new BehaviorSubject<Menu>({
        menuDimanche: "",
        menuJeudi: "",
        menuLundi: "",
        menuMardi: "",
        menuMercredi: "",
        menuSamedi: "",
        menuVendredi: "",
    });
    observableMenu = this.menuSource.asObservable();

    changeResident(resident: IResident) {
        this.residentSource.next(resident);
    }

    changeMenu(day: number, value: string) {
        let menu: Menu = {
            menuLundi: this.menuSource.getValue().menuLundi,
            menuMardi: this.menuSource.getValue().menuMardi,
            menuMercredi: this.menuSource.getValue().menuMercredi,
            menuJeudi: this.menuSource.getValue().menuJeudi,
            menuVendredi: this.menuSource.getValue().menuVendredi,
            menuSamedi: this.menuSource.getValue().menuSamedi,
            menuDimanche: this.menuSource.getValue().menuDimanche
        }

        if (day == 1) {
            menu.menuLundi = value;
        } else if (day == 2) {
            menu.menuMardi = value;
        } else if (day == 3) {
            menu.menuMercredi = value;
        } else if (day == 4) {
            menu.menuJeudi = value;
        } else if (day == 5) {
            menu.menuVendredi = value;
        } else if (day == 6) {
            menu.menuSamedi = value;
        } else {
            menu.menuDimanche = value;
        }

        this.menuSource.next(menu);
    }
}
