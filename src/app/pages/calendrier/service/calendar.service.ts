import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CalendrierInfos} from "../../../models/calendrier-infos";

@Injectable({
    providedIn: 'root'
})
export class CalendarService {
    calendarEvenement =''
    calendarActivity=''
    constructor(private http: HttpClient) {
    }

    getEvents() {
        return this.http.get<any>('assets/json/scheduleevents.json')
            .toPromise()
            .then(res => res.data as any[])
            .then(data => data);
    }
    saveEvenement(data: CalendrierInfos){
        return this.http.post<any>(this.calendarEvenement, data)
    }
    saveActivity(data: CalendrierInfos){
        return this.http.post<any>(this.calendarActivity, data)
    }
}
