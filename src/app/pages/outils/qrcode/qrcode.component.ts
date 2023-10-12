import { MessageService } from 'primeng/api';
import { Component } from '@angular/core';
import { QrcodeService } from '../services/qrcode.service';

@Component({
    selector: 'app-qrcode',
    templateUrl: './qrcode.component.html',
    styleUrls: ['./qrcode.component.scss'],
    providers: [MessageService]
})
export class QrcodeComponent {

    qrcode: any = undefined;

    constructor(
        private msgSrv: MessageService,
        private qrcodeSrv: QrcodeService
    ) { }

    submitReport() {
        console.log("QR Code entrer:"); // Ajoutez cette ligne pour déboguer
        this.qrcodeSrv.generateQrCode().subscribe({
            next: (r) => {
                this.qrcode = r;
                console.log("QR Code Data:", r); // Ajoutez cette ligne pour déboguer
            },
            error: (res) => {
                this.msgSrv.add({ severity: 'error', summary: 'Erreur', detail: "Erreur de traitement" });
            },
            complete: () => console.log(this.qrcode)
        });
        
    }
}
