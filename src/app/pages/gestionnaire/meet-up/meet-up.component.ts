import { Component, OnInit } from '@angular/core';
import { MeetUp } from 'src/app/models/meet-up';
import { MeetupService } from '../service/meetup.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { RoleType } from 'src/app/shared/interfaces/roleType';

@Component({
    selector: 'app-meet-up',
    templateUrl: './meet-up.component.html',
    styleUrls: ['./meet-up.component.scss'],
    providers: [ConfirmationService, MessageService]
})
export class MeetUpComponent implements OnInit {

    meetUp!: MeetUp[];
    selectedMeetUp?: MeetUp;
    isContactPerson!: boolean;
    show = false;
    showDetails = false;

    constructor(
        private authSrv: AuthService,
        private meetupSrv: MeetupService,
        private msgSrv: MessageService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.fetchAll();
        this.isContactPerson = this.authSrv.getRole().toLowerCase() == RoleType.personnecontact.toLowerCase();
    }

    fetchAll() {
        this.meetupSrv.fetchAll(this.authSrv.getLoggedUser()).subscribe({
            next: (r) => this.meetUp = r,
            error: (err) => console.log(err)
        })
    }

    view(item: MeetUp) {
        this.selectedMeetUp = item;
        this.showDetails = true;
    }

    edit(item: MeetUp) {
        this.router.navigateByUrl(`/gestionnaire/meet-up/edit/${item.id}`);
    }

    add() {
        this.show = true;
    }

    saved(event: string) {
        if (event) {
            this.show = false;
            this.msgSrv.add({ severity: 'success', summary: 'Success', detail: "Meet up sousmit avec success" });
            setTimeout(() => {
                location.reload();
            }, 500);
        }
        else {
            this.msgSrv.add({ severity: 'error', summary: 'Erreur', detail: "Une erreur s'est produite" });
        }
    }

    displayDate(date: string) {
        return date.split(" ")[0];
    }

    displayTime(date: string) {
        return date.split(" ")[1].split(".")[0];
    }
}
