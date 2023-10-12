import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { MeetUp } from 'src/app/models/meet-up';
import { Etat } from 'src/app/shared/interfaces/etat';
import { MeetupService } from '../../service/meetup.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { MeetUpType } from 'src/app/shared/interfaces/meetp-type';
import { RoleType } from 'src/app/shared/interfaces/roleType';

@Component({
    selector: 'app-meet-up-forms',
    templateUrl: './meet-up-forms.component.html',
    styleUrls: ['./meet-up-forms.component.scss'],
    providers: [MessageService]
})
export class MeetUpFormsComponent implements OnInit {

    @Output() saved = new EventEmitter<string>(undefined);

    required = 'Ce champ est requis';
    formData = new FormGroup({
        status: new FormControl(Etat.Entraitement),
        reason: new FormControl('', [Validators.required]),
        date: new FormControl(new Date(), [Validators.required]),
        //time: new FormControl('', [Validators.required]),
        personType: new FormControl('', [Validators.required]),
        name: new FormControl('', [Validators.required]),
        firstname: new FormControl('', [Validators.required]),
        dob: new FormControl(new Date(), [Validators.required]),
        participants: new FormControl(1, [Validators.required]),
        dismiss: new FormControl(''),
    });

    statusList = [
        { name: '', value: '' },
        { name: 'En Traitement', value: Etat.Entraitement },
        { name: 'Approuvé', value: Etat.approuve },
        { name: 'Réjecté', value: Etat.rejecte }
    ];

    typeList = [
        { name: 'Veuillez faire un choix', value: '' },
        { name: 'Appel Visio', value: MeetUpType.appelVisio },
        { name: 'Appel Audio', value: MeetUpType.appel_audio },
        { name: 'Autre', value: MeetUpType.autre },
        { name: 'Fleuriste', value: MeetUpType.fleuriste },
        { name: 'Prestation Coiffure', value: MeetUpType.prestationCoiffure },
        { name: 'Prestation Kinesithérapeutre', value: MeetUpType.prestation_kine },
        { name: 'Prestation Manicure-pédicure', value: MeetUpType.prestation_manicure_pedicure },
        { name: 'Sortie de Établissement', value: MeetUpType.sortie_etab },
        { name: 'Visite Groupée', value: MeetUpType.visiteGroupe },
    ];

    meetUp!: MeetUp;
    meetUpId = NaN;
    email = "";
    isContactPerson: boolean = false;

    constructor(
        private authSrv: AuthService,
        private meetupSrv: MeetupService,
        private msgSrv: MessageService,
        private router: Router
    ) {
        const parts = this.router.url.split("/");
        if (parts.includes("edit")) {
            this.meetUpId = Number.parseInt(parts[parts.length - 1]);
        }
    }

    ngOnInit(): void {
        this.email = this.authSrv.getLoggedUser();
        this.isContactPerson = this.authSrv.getRole().toLowerCase() == RoleType.personnecontact.toLowerCase();
        if (!isNaN(this.meetUpId)) {
            this.fetchById(this.meetUpId);
        }
    }

    initform(data: MeetUp) {
        this.formData.controls.date.setValue(new Date(data.date));
        this.formData.controls.dismiss.setValue(data.motifRefus);
        this.formData.controls.dob.setValue(new Date(data.dateBirthresid));
        this.formData.controls.firstname.setValue(data.prenomResid);
        this.formData.controls.name.setValue(data.nomResid);
        this.formData.controls.participants.setValue(data.nbParticipants);
        this.formData.controls.personType.setValue(data.typeM);
        this.formData.controls.reason.setValue(data.motifDemande);
        this.formData.controls.status.setValue(data.etat);
    }

    fetchById(id: number) {
        this.meetupSrv.fetchById(id).subscribe({
            next: (r) => {
                if (r) {
                    this.initform(r);
                }
            },
            error: (err) => console.log(err),
        });
    }

    buildForm() {
        const data: MeetUp = {
            date: this.formData.controls.date.value ?? new Date(),
            dateBirthresid: this.formData.controls.dob.value ?? new Date(),
            etat: this.formData.controls.status.value ?? Etat.Entraitement,
            motifDemande: this.formData.controls.reason.value ?? "",
            motifRefus: this.formData.controls.dismiss.value ?? "",
            nbParticipants: this.formData.controls.participants.value ?? 0,
            nomResid: this.formData.controls.name.value ?? "",
            prenomResid: this.formData.controls.firstname.value ?? "",
            typeM: this.formData.controls.personType.value ?? MeetUpType.autre,
        };
        return data;
    }

    save() {
        if (this.formData.invalid) return;

        const data = this.buildForm();
        if (!isNaN(this.meetUpId)) {
            data.id = this.meetUpId;
            this.meetupSrv.update(this.email, data).subscribe({
                next: (r) => this.saved.emit(JSON.stringify(r)),
                error: (err) => {
                    this.saved.emit(JSON.stringify(undefined));
                    this.msgSrv.add({ severity: 'error', summary: 'Erreur', detail: "Une erreur s'est produite" });
                    console.log(err);
                },
                complete: () => {
                    this.msgSrv.add({ severity: 'success', summary: 'Success', detail: "Informations sauvégardées" });
                }
            });
        } else {
            this.meetupSrv.add(this.email, data).subscribe({
                next: (r) => this.saved.emit(JSON.stringify(r)),
                error: (err) => {
                    this.saved.emit(JSON.stringify(undefined));
                    console.log(err);
                }
            });
        }
    }

}
