import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Activite} from "../../../models/activite";
import {Evenement} from "../../../models/evenement";

@Injectable({
    providedIn: 'root'
})
export class CalendarService {
    calendarEvenement ='http://localhost:8080/evenement'
    calendarActivity='http://localhost:8080/activite'
    constructor(private http: HttpClient) {
    }


    saveEvenement(data: Evenement){
        return this.http.post<any>(this.calendarEvenement, data)
    }
    saveActivity(data: Activite){
        return this.http.post<any>(this.calendarActivity, data)
    }
    getAllActivity(){
        return this.http.get<any>(this.calendarActivity)
    }
    getAllEvenement(){
        return this.http.get<any>(this.calendarEvenement)
    }
    deleteActivity(id: number){
        return this.http.delete<any>(this.calendarActivity+'/'+id)
    }
    deleteEvenement(id: number){
        return this.http.delete<any>(this.calendarEvenement+'/'+id)
    }
}
