import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-menu-forms',
  templateUrl: './menu-forms.component.html',
  styleUrls: ['./menu-forms.component.scss']
})
export class MenuFormsComponent {

    required = 'Ce champ est requis';
    formData = new FormGroup({
        breakfast: new FormControl('', [Validators.required]),
        lunch: new FormControl('', [Validators.required]),
        dinner: new FormControl('', [Validators.required]),
    });
}
