import { Status } from './../../../shared/interfaces/person-status';
import { Component } from '@angular/core';
import { MedecinTraitant } from 'src/app/models/medecin-traitant';

@Component({
    selector: 'app-resident-forms',
    templateUrl: './resident-forms.component.html',
    styleUrls: ['./resident-forms.component.scss']
})
export class ResidentFormsComponent {
    lastname?: string;
    firstname?: string;
    dob?: string;
    email?: string;
    tel?: string;
    address?: string;
    status?: string;
    entryDate?: string;
    reasonEntry?: string;
    exitDate?: string;
    reasonExit?: string;
    antMedical?: string;
    antChirugical?: string;
    nbOfChild?: number;
    room?: string;
    healthStatus?: string;
    doctor?: MedecinTraitant;

    statusList = [
        { value: 1, name: Status.celibataire },
        { value: 2, name: Status.marie },
        { value: 3, name: Status.divorce },
        { value: 4, name: Status.veuf }
    ];
}
