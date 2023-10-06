import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HumorType } from 'src/app/shared/interfaces/humorType';
import { DailyReportService } from '../../service/daily-report.service';
import { DailyReport } from 'src/app/models/daily-report';

@Component({
    selector: 'app-daily-report-forms',
    templateUrl: './daily-report-forms.component.html',
    styleUrls: ['./daily-report-forms.component.scss']
})
export class DailyReportFormsComponent implements OnInit {

    @Input() residentId = 0;
    @Input() reportId = 0;
    @Input() isNewRecord = true;
    @Output() saved = new EventEmitter<boolean>(false);

    required = 'Ce champ est requis';
    formData = new FormGroup({
        heart: new FormControl('', [Validators.required]),
        breathing: new FormControl('', [Validators.required]),
        pressure: new FormControl('', [Validators.required]),
        date: new FormControl(new Date(), [Validators.required]),
        temp: new FormControl('', [Validators.required]),
        oxygen: new FormControl('', [Validators.required]),
        comment: new FormControl(''),
        sleep: new FormControl(false, [Validators.required]),
        urine: new FormControl(false, [Validators.required]),
        saddle: new FormControl(false, [Validators.required]),
        clothe: new FormControl(false, [Validators.required]),
        hairstyle: new FormControl(false, [Validators.required]),
        manicure: new FormControl(false, [Validators.required]),
        pedicure: new FormControl(false, [Validators.required]),
        toilet: new FormControl(false, [Validators.required]),
        status: new FormControl('', [Validators.required])
    });

    humorTypes = [
        { name: '', value: '' },
        { name: 'Aucune', value: HumorType.aucune },
        { name: 'Agité(e)', value: HumorType.agitee },
        { name: 'Agressif', value: HumorType.agressif },
        { name: 'Ancieux', value: HumorType.ancieux },
        { name: 'Angoisse', value: HumorType.angoisse },
        { name: 'Content', value: HumorType.content },
        { name: 'Contrarie', value: HumorType.contrarie },
        { name: 'Enthousiaste', value: HumorType.enthousiaste },
        { name: 'Inquiet', value: HumorType.inquiet },
        { name: 'Joyeux', value: HumorType.joyeux },
        { name: 'Moins agité(e)', value: HumorType.moins_agitee },
        { name: 'Normal', value: HumorType.normal },
        { name: 'Plus agité(e)', value: HumorType.plus_agitee },
        { name: 'Solitaire', value: HumorType.rester_seul },
        { name: 'Triste', value: HumorType.triste },
    ];

    constructor(private dailyReportSrv: DailyReportService) { }

    ngOnInit(): void {
        if (this.reportId != 0) {
            this.initForm();
        }
    }

    initForm() {
        this.dailyReportSrv.fetchById(this.reportId).subscribe({
            next: (r) => {
                this.formData.controls.hairstyle.setValue(r.coiffure);
                this.formData.controls.date.setValue(new Date(r.date));
                this.formData.controls.heart.setValue(r.freqCardiaque);
                this.formData.controls.breathing.setValue(r.freqRespiratoire);
                this.formData.controls.status.setValue(r.humeur);
                this.formData.controls.manicure.setValue(r.manicure);
                this.formData.controls.pedicure.setValue(r.pedicure);
                this.formData.controls.pressure.setValue(r.presArterielle);
                this.formData.controls.oxygen.setValue(r.satOxygene);
                this.formData.controls.saddle.setValue(r.selle);
                this.formData.controls.sleep.setValue(r.sommeil);
                this.formData.controls.temp.setValue(r.temperature);
                this.formData.controls.toilet.setValue(r.toilette);
                this.formData.controls.urine.setValue(r.urine);
                this.formData.controls.clothe.setValue(r.vetements);
                this.formData.controls.comment.setValue(r.commentaire ?? '');
            }
        });
    }

    buildBody() {
        const data: DailyReport = {
            coiffure: this.formData.controls.hairstyle.value ?? false,
            date: this.formData.controls.date.value ?? new Date(),
            freqCardiaque: this.formData.controls.heart.value ?? '',
            freqRespiratoire: this.formData.controls.breathing.value ?? '',
            humeur: this.formData.controls.status.value ?? '',
            manicure: this.formData.controls.manicure.value ?? false,
            numeroR: this.residentId,
            pedicure: this.formData.controls.pedicure.value ?? false,
            presArterielle: this.formData.controls.pressure.value ?? '',
            satOxygene: this.formData.controls.oxygen.value ?? '',
            selle: this.formData.controls.saddle.value ?? false,
            sommeil: this.formData.controls.sleep.value ?? false,
            temperature: this.formData.controls.temp.value ?? '',
            toilette: this.formData.controls.toilet.value ?? false,
            urine: this.formData.controls.urine.value ?? false,
            vetements: this.formData.controls.clothe.value ?? false,
            commentaire: this.formData.controls.comment.value ?? '',
        };
        return data;
    }

    save() {
        if (this.isNewRecord) {
            this.dailyReportSrv.add(this.residentId, this.buildBody()).subscribe({
                next: (r) => {
                    if (r) {
                        this.saved.emit(true);
                    }
                },
                error: (err) => {
                    console.log(err);
                    this.saved.emit(false);
                }
            });
        } else {
            this.dailyReportSrv.update(this.reportId, this.buildBody()).subscribe({
                next: (r) => {
                    if (r) {
                        this.saved.emit(true);
                    }
                },
                error: () => this.saved.emit(false)
            });
        }
    }
}
