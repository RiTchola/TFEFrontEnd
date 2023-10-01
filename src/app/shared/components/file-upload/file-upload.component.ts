import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FileUploadModule} from "primeng/fileupload";

type Mode = "advanced" | "basic";
@Component({
  selector: 'app-file-upload',
  standalone: true,
    imports: [CommonModule, FileUploadModule],
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
    @Input()
    accept: string = "image/*";
    @Input()
    customUpload: boolean = true;
    @Input()
    multiple: boolean = false;
    @Input()
    showUploadButton: boolean = true;
    @Input()
    showCancelButton: boolean = true;
    @Input()
    mode: Mode = "basic";
    @Input()
    styleClass: string = "p-button-outlined font-semibold";
    @Input()
    chooseLabel = "Upload a File";
    @Input()
    maxFileSize: number = 10485760;
    @Input()
    fileLimit: number = 5;
    @Input()
    disabled: boolean = false;
    @Input()
    auto: boolean = true;

    @Output()
    onUpload = new EventEmitter();

    constructor() {}

    uploadHandler(event: any) {
        this.onUpload.emit(event);
    }
}
