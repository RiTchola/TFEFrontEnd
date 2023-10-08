import { MenuOfTheWeekService } from './../../service/menu-of-the-week.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Menu } from 'src/app/models/menu';
import { ObservableService } from 'src/app/shared/service/observable.service';

@Component({
    selector: 'app-menu-forms',
    templateUrl: './menu-forms.component.html',
    styleUrls: ['./menu-forms.component.scss'],
    providers: [MessageService]
})
export class MenuFormsComponent implements OnInit {

    required = 'Ce champ est requis';
    formData = new FormGroup({
        breakfast: new FormControl('', [Validators.required]),
        lunch: new FormControl('', [Validators.required]),
        dinner: new FormControl('', [Validators.required]),
    });

    menu: Menu = {};
    isNewRecord = true;
    date!: Date;
    day = "Lundi";

    constructor(
        private menuSrv: MenuOfTheWeekService,
        private msgSrv: MessageService,
        private router: Router,
        private observableSrv: ObservableService
    ) {
        const parts = this.router.url.split("/");
        if (parts.includes("edit")) {
            const parts = this.router.url.split("/");
            this.day = parts[parts.length - 1];
            const dateTime = Number.parseFloat(parts[parts.length - 2]);
            this.date = new Date(dateTime);
            this.isNewRecord = false;
        } else {
            const dateTime = Number.parseFloat(parts[parts.length - 2]);
            this.date = new Date(dateTime);
            this.day = parts[parts.length - 1];
        }
    }

    ngOnInit(): void {
        if (!this.isNewRecord) {
            this.fetchMenu();
        }
    }

    private fetchMenu() {
        this.menuSrv.fetchByStartDate(new Date(this.date.toLocaleDateString())).subscribe({
            next: (r) => {
                if (r) {
                    this.menu = r
                }
            },
            error: (err) => console.log(err),
            complete: () => {
                if (this.day.toLowerCase() == "lundi") {
                    this.initForm(this.menu.menuLundi);
                } else if (this.day.toLowerCase() == "mardi") {
                    this.initForm(this.menu.menuMardi);
                } else if (this.day.toLowerCase() == "mercredi") {
                    this.initForm(this.menu.menuMercredi);
                } else if (this.day.toLowerCase() == "jeudi") {
                    this.initForm(this.menu.menuJeudi);
                } else if (this.day.toLowerCase() == "vendredi") {
                    this.initForm(this.menu.menuVendredi);
                } else if (this.day.toLowerCase() == "samedi") {
                    this.initForm(this.menu.menuSamedi);
                } else {
                    this.initForm(this.menu.menuDimanche);
                }
            }
        })
    }

    initForm(value?: string) {
        if (value) {
            const parts = value.split(",");
            this.formData.controls.breakfast.setValue(parts[0]);
            this.formData.controls.lunch.setValue(parts[1]);
            this.formData.controls.dinner.setValue(parts[2]);
        }
    }

    getValue() {
        const breakfast = this.formData.controls.breakfast.value;
        const lunch = this.formData.controls.lunch.value;
        const dinner = this.formData.controls.dinner.value;
        return `${breakfast},${lunch},${dinner}`;
    }

    getCurrentDay() {
        return `${this.day.substring(0, 1).toUpperCase()}${this.day.substring(1)}`;
    }

    next() {
        if (!this.formData.valid) {
            return;
        }
        const dateTime = this.date.getTime();
        if (this.isNewRecord) {
            if (this.day.toLowerCase() == "lundi") {
                this.observableSrv.changeMenu(1, this.getValue());
                this.router.navigateByUrl(`/gestionnaire/menu-semaine/add/${dateTime}/mardi`);
            } else if (this.day.toLowerCase() == "mardi") {
                this.observableSrv.changeMenu(2, this.getValue());
                this.router.navigateByUrl(`/gestionnaire/menu-semaine/add/${dateTime}/mercredi`);
            } else if (this.day.toLowerCase() == "mercredi") {
                this.observableSrv.changeMenu(3, this.getValue());
                this.router.navigateByUrl(`/gestionnaire/menu-semaine/add/${dateTime}/jeudi`);
            } else if (this.day.toLowerCase() == "jeudi") {
                this.observableSrv.changeMenu(4, this.getValue());
                this.router.navigateByUrl(`/gestionnaire/menu-semaine/add/${dateTime}/vendredi`);
            } else if (this.day.toLowerCase() == "vendredi") {
                this.observableSrv.changeMenu(5, this.getValue());
                this.router.navigateByUrl(`/gestionnaire/menu-semaine/add/${dateTime}/samedi`);
            } else if (this.day.toLowerCase() == "samedi") {
                this.observableSrv.changeMenu(6, this.getValue());
                this.router.navigateByUrl(`/gestionnaire/menu-semaine/add/${dateTime}/dimanche`);
            } else {
                this.observableSrv.changeMenu(7, this.getValue());
                this.observableSrv.observableMenu.subscribe(v => {
                    this.saveMenu(v);
                })
            }
        } else {
            this.updateMenu();
        }
    }

    saveMenu(menu: Menu) {
        menu.dateDebutSemaine = new Date(this.date.toLocaleDateString());
        this.menuSrv.add(menu).subscribe({
            next: (r) => {
                if (r) {
                    this.onSuccess('Menu ajouté avec succes');
                }
            }, error: (err) => {
                this.msgSrv.add({ severity: 'error', summary: 'Error', detail: 'Erreur de sauvegarde' });
                console.log(err);
            }
        });
    }

    updateMenu() {
        if (this.day.toLowerCase() == "lundi") {
            this.menu.menuLundi = this.getValue();
        } else if (this.day.toLowerCase() == "mardi") {
            this.menu.menuMardi = this.getValue();
        } else if (this.day.toLowerCase() == "mercredi") {
            this.menu.menuMercredi = this.getValue();
        } else if (this.day.toLowerCase() == "jeudi") {
            this.menu.menuJeudi = this.getValue();
        } else if (this.day.toLowerCase() == "vendredi") {
            this.menu.menuVendredi = this.getValue();
        } else if (this.day.toLowerCase() == "samedi") {
            this.menu.menuSamedi = this.getValue();
        } else {
            this.menu.menuDimanche = this.getValue();
        }

        this.menu.dateDebutSemaine = new Date(this.date.toLocaleDateString());
        this.menuSrv.update(this.menu).subscribe({
            next: (r) => {
                if (r) {
                    this.onSuccess('Menu modifé avec succes');
                }
            }, error: (err) => {
                this.msgSrv.add({ severity: 'error', summary: 'Error', detail: 'Erreur de sauvegarde' });
                console.log(err);
            }
        });
    }

    onSuccess(msg: string) {
        this.msgSrv.add({ severity: 'success', summary: 'Succès', detail: msg });
        setTimeout(() => {
            this.router.navigateByUrl(`/gestionnaire/menu-semaine/${this.date.getTime()}`);
        }, 500);
    }
}
