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
        this.qrcodeSrv.generateQrCode().subscribe({
            next: (r) => this.qrcode = r,
            error: (res) => {
                const binaryData = res.error.text;
                // Create a Blob from the binary data
                const blob = new Blob([new Uint8Array([...binaryData].map(char => char.charCodeAt(0)))]);
                // Create a URL for the Blob
                const imageUrl = URL.createObjectURL(blob);
                this.qrcode = imageUrl.substring(5);
                this.msgSrv.add({ severity: 'error', summary: 'Erreur', detail: "Erreur de traitement" });
            },
            complete: () => console.log(this.qrcode)
        });
    }
}
