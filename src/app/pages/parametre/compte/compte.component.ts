import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-compte',
    templateUrl: './compte.component.html',
    styleUrls: ['./compte.component.scss'],
    providers: [MessageService]
})
export class CompteComponent {

    constructor(private msgSrv: MessageService) { }

    onSave(result: string) {
        if (result) {
            this.showSuccessViaToast("Les valeurs ont été sauvégardées");
            return;
        }

        this.showErrorViaToast("Erreur lors de la sauvegarde");
    }

    showSuccessViaToast(msg: string) {
        this.msgSrv.add({ key: 'tst', severity: 'success', summary: 'Success', detail: msg });
    }

    showErrorViaToast(msg: string) {
        this.msgSrv.add({ key: 'tst', severity: 'error', summary: 'Erreur', detail: msg });
    }
}
