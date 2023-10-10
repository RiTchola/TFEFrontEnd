import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ContactPersonType } from 'src/app/shared/interfaces/contact-person-type';
import { Etat } from 'src/app/shared/interfaces/etat';
import { Status } from 'src/app/shared/interfaces/person-status';

@Component({
    selector: 'app-meet-up-forms',
    templateUrl: './meet-up-forms.component.html',
    styleUrls: ['./meet-up-forms.component.scss'],
    providers: [MessageService]
})
export class MeetUpFormsComponent {

    required = 'Ce champ est requis';
    formData = new FormGroup({
        status: new FormControl('', [Validators.required]),
        reason: new FormControl('', [Validators.required]),
        date: new FormControl(new Date(), [Validators.required]),
        time: new FormControl('', [Validators.required]),
        personType: new FormControl('', [Validators.required]),
        name: new FormControl('', [Validators.required]),
        firstname: new FormControl('', [Validators.required]),
        dob: new FormControl(new Date(), [Validators.required]),
        participants: new FormControl(1, [Validators.required]),
        comment: new FormControl('', [Validators.required]),
    });

    statusList = [
        { name: '', value: '' },
        { name: 'En Traitement', value: Etat.Entraitement },
        { name: 'Approuvé', value: Etat.approuve },
        { name: 'Réjecté', value: Etat.rejecte }
    ];

    typeList = [
        { name: 'Veuillez faire un choix', value: '' },
        { name: 'Ami', value: ContactPersonType.ami },
        { name: 'Amie', value: ContactPersonType.ami },
        { name: 'Autre', value: ContactPersonType.autre },
        { name: 'Autre Membre de Famille', value: ContactPersonType.autre_famille },
        { name: 'Avocat', value: ContactPersonType.avocat },
        { name: 'Avocate', value: ContactPersonType.avocat },
        { name: 'Enfant', value: ContactPersonType.enfant },
        { name: 'Époux', value: ContactPersonType.epoux },
        { name: 'Épouse', value: ContactPersonType.epouse },
        { name: 'Kinésithérapeute', value: ContactPersonType.kinesi_therapeute },
        { name: 'Médécin Traitant', value: ContactPersonType.medecin_traitant },
        { name: 'Parent', value: ContactPersonType.parent },
        { name: 'Pétit-Fils', value: ContactPersonType.petit_fils },
        { name: 'Pétit-Fille', value: ContactPersonType.petit_fille }
    ];

    constructor() {}

    save() {}

}
