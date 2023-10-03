import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface IResident {
    user: string;
    doctor: string,
    resident: string;
}

@Injectable({
    providedIn: 'root'
})
export class ObservableService {

    private residentSource = new BehaviorSubject<IResident>({
        doctor: "",
        resident: "",
        user: ""
    });
    observableResident = this.residentSource.asObservable();

    changeResident(resident: IResident) {
        this.residentSource.next(resident);
    }
}
