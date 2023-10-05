import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Activite } from "../../../models/activite";
import { Evenement } from "../../../models/evenement";
import { environment } from "../../../../environments/environment";
import { Observable } from "rxjs";
import { Response } from 'src/app/models/response';

@Injectable({
    providedIn: 'root'
})
export class CalendarService {
    calendarEvenement=environment.apiPath+'/evenement';
    calendarActivity=environment.apiPath+'/activite';
    
    constructor(private http: HttpClient) {
    }

    saveEvenement(data: Evenement): Observable<Evenement>{
        return this.http.post<Evenement>(this.calendarEvenement, data);
    }

    getAllEvenement(): Observable<Evenement[]>{
        return this.http.get<Evenement[]>(this.calendarEvenement);
    }

    deleteEvenement(id: number){
        return this.http.delete<Response>(this.calendarEvenement+'/'+id);
    }


    saveActivity(data: Activite){
        return this.http.post<any>(this.calendarActivity, data);
    }

    getAllActivity(): Observable<Activite[]>{
        return this.http.get<Activite[]>(this.calendarActivity);
    }
   
    deleteActivity(id: number){
        return this.http.delete<Response>(this.calendarActivity+'/'+id);
    }
    
}
