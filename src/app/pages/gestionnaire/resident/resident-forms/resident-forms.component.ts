import { Status } from '../../../../shared/interfaces/person-status';
import { Component, OnInit } from '@angular/core';
import { MedecinTraitant } from 'src/app/models/medecin-traitant';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ObservableService } from 'src/app/shared/service/observable.service';
import { User } from 'src/app/models/user';
import { Resident } from 'src/app/models/resident';
import { ResidentService } from '../../service/resident.service';
import { MessageService } from 'primeng/api';

interface IStatusM {
    value: number;
    name: string;
}

@Component({
    selector: 'app-resident-forms',
    templateUrl: './resident-forms.component.html',
    styleUrls: ['./resident-forms.component.scss'],
    providers: [MessageService]
})
export class ResidentFormsComponent implements OnInit {

    required = 'Ce champ est requis';
    formData = new FormGroup({
        lastname: new FormControl('', [Validators.required]),
        firstname: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required]),
        dob: new FormControl(new Date(), [Validators.required]),
        tel: new FormControl('', [Validators.required]),
        address: new FormControl('', [Validators.required]),
        entryDate: new FormControl(new Date(), [Validators.required]),
        reasonEntry: new FormControl('', [Validators.required]),
        exitDate: new FormControl(new Date(), [Validators.required]),
        reasonExit: new FormControl('', [Validators.required]),
        room: new FormControl('', [Validators.required]),
        status: new FormControl('', [Validators.required]),
        nbOfChild: new FormControl(0, [Validators.required]),
        antMedical: new FormControl('', [Validators.required]),
        antChirugical: new FormControl('', [Validators.required]),
        healthStatus: new FormControl('', [Validators.required]),
        actif: new FormControl(true, [Validators.required]),
    });

    statusM: IStatusM = { value: 1, name: Status.celibataire }

    statusList: IStatusM[] = [
        { value: 1, name: Status.celibataire },
        { value: 2, name: Status.marie },
        { value: 3, name: Status.divorce },
        { value: 4, name: Status.veuf }
    ];

    userValue!: User;
    doctorValue!: MedecinTraitant;
    residentValue!: Resident;

    residentId = 0;
    userId = 0;
    doctorId = 0;

    constructor(
        private msgService: MessageService,
        private router: Router,
        private observableSrv: ObservableService,
        private residentSrv: ResidentService
    ) {
        if (this.router.url.includes("edit")) {
            this.residentId = Number.parseInt(this.router.url.split("/")[4]);
        }
    }

    ngOnInit(): void {
        this.observableSrv.observableResident.subscribe(v => {
            try {
                this.userValue = JSON.parse(v.user);
                this.doctorValue = JSON.parse(v.doctor);
                this.formData.controls.email.setValue(this.userValue.username);
            } catch (error) {

            }
        });

        if (this.residentId != 0) {
            this.getResidentById(this.residentId);
        }
    }

    formInitialiszation(residentValue: Resident) {
        this.formData.controls.actif.setValue(residentValue.actif);
        this.formData.controls.address.setValue(residentValue.adresse);
        this.formData.controls.antChirugical.setValue(residentValue.antChirugical);
        this.formData.controls.antMedical.setValue(residentValue.antMedical);
        this.formData.controls.dob.setValue(new Date(residentValue.dateNaissance));
        this.formData.controls.email.setValue(this.userValue?.username ?? "");
        this.formData.controls.entryDate.setValue(new Date(residentValue.dateEntree));
        this.formData.controls.exitDate.setValue(new Date(residentValue.dateSortie));
        this.formData.controls.firstname.setValue(residentValue.prenom);
        this.formData.controls.healthStatus.setValue(residentValue.etatSante);
        this.formData.controls.lastname.setValue(residentValue.nom);
        this.formData.controls.nbOfChild.setValue(residentValue.nbEnfant);
        this.formData.controls.reasonEntry.setValue(residentValue.motifEntree);
        this.formData.controls.reasonExit.setValue(residentValue.motifSortie);
        this.formData.controls.room.setValue(residentValue.chambre);
        this.formData.controls.status.setValue(residentValue.statut);
        this.formData.controls.tel.setValue(residentValue.tel);
    }

    back() {
        if (this.residentId == 0) {
            this.router.navigateByUrl('/gestionnaire/resident/add/medecin');
        }
        else {
            this.router.navigate([`/gestionnaire/resident/edit/${this.residentId}/medecin`]);
        }
    }

    saveResident(doctorId: number, userId: number) {
        if (this.userValue && this.doctorValue) {
            const data = this.getResidentInfo();

            this.observableSrv.changeResident({
                doctor: JSON.stringify(this.doctorValue),
                resident: JSON.stringify(data),
                user: JSON.stringify(this.userValue)
            });

            if (this.residentId == 0) {
                this.residentSrv.addResident(doctorId, userId, data).subscribe({
                    next: (r) => { this.msgService.add({ severity: 'success', summary: 'Success', detail: 'Resident enregistré avec success' }) },
                    error: (err) => this.msgService.add({ severity: 'error', summary: 'Error', detail: 'Erreur de sauvegarde' }),
                    complete: () => {
                        setTimeout(() => {
                            this.router.navigateByUrl('/gestionnaire/resident');
                        }, 1500);
                    }
                });
            }
            else {
                data.id = this.residentId;
                this.residentSrv.update(data).subscribe({
                    next: (r) => { this.msgService.add({ severity: 'success', summary: 'Success', detail: 'Resident enregistré avec success' }) },
                    error: (err) => this.msgService.add({ severity: 'error', summary: 'Error', detail: 'Erreur de sauvegarde' }),
                    complete: () => {
                        setTimeout(() => {
                            this.router.navigateByUrl('/gestionnaire/resident');
                        }, 1500);
                    }
                });
            }
        }
    }

    getResidentInfo() {
        const data: Resident = {
            actif: this.formData.controls.actif.value ?? false,
            adresse: this.formData.controls.address.value ?? "",
            antChirugical: this.formData.controls.antChirugical.value ?? "",
            antMedical: this.formData.controls.antMedical.value ?? "",
            dateNaissance: this.formData.controls.dob.value ?? new Date(),
            email: this.formData.controls.email.value ?? "",
            dateEntree: this.formData.controls.entryDate.value ?? new Date(),
            dateSortie: this.formData.controls.exitDate.value ?? new Date(),
            prenom: this.formData.controls.firstname.value ?? "",
            etatSante: this.formData.controls.healthStatus.value ?? "",
            nom: this.formData.controls.lastname.value ?? "",
            nbEnfant: this.formData.controls.nbOfChild.value ?? 0,
            motifEntree: this.formData.controls.reasonEntry.value ?? "",
            motifSortie: this.formData.controls.reasonExit.value ?? "",
            chambre: this.formData.controls.room.value ?? "",
            statut: this.statusM.name,
            tel: this.formData.controls.tel.value ?? "",
        };
        return data;
    }

    save() {
        let userId = 0;
        let doctorId = 0;
        if (this.residentId == 0) {
            this.residentSrv.saveUser(this.userValue).subscribe({
                next: (r) => {
                    userId = Number.parseInt(r.msg)
                },
                error: (err) => {
                    this.msgService.add({ severity: 'error', summary: 'Error', detail: err })
                },
                complete: () => {
                    this.residentSrv.saveDoctor(this.doctorValue).subscribe({
                        next: (r) => {
                            doctorId = r.id ?? 0
                        },
                        error: (err) => {
                            this.msgService.add({ severity: 'error', summary: 'Error', detail: 'Erreur de sauvegarde' })
                        },
                        complete: () => this.saveResident(doctorId, userId)
                    });
                }
            });
        }
        else {
            this.update();
        }
    }

    update() {
        let userId = 0;
        let doctorId = 0;
        this.residentSrv.updateUser(this.userId, this.userValue).subscribe({
            next: (r) => {
                userId = Number.parseInt(r.msg)
            },
            error: (err) => {
                this.msgService.add({ severity: 'error', summary: 'Error', detail: err })
            },
            complete: () => {
                this.residentSrv.updateDoctor(this.doctorId, this.doctorValue).subscribe({
                    next: (r) => {
                        doctorId = r.id ?? 0
                    },
                    error: (err) => {
                        this.msgService.add({ severity: 'error', summary: 'Error', detail: 'Erreur de sauvegarde' })
                    },
                    complete: () => this.saveResident(doctorId, userId)
                });
            }
        });
    }

    getResidentById(id: number) {
        this.residentSrv.fetchById(id).subscribe({
            next: (r) => {
                // init form
                this.residentValue = r;
                this.userId = r.user.id;
                this.doctorId = r.medecinTraitant.id;
                this.formInitialiszation(this.residentValue);
            }
        })
    }
}
