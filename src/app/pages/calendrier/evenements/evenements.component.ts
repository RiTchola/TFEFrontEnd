import { Component, OnInit } from '@angular/core';
import { CalendarService } from "../service/calendar.service";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { MessageService } from "primeng/api";

import { Evenement } from "../../../models/evenement";
import frLocale from '@fullcalendar/core/locales/fr';
import { AuthService } from 'src/app/core/services/auth.service';
import { RoleType } from 'src/app/shared/interfaces/roleType';

@Component({
  selector: 'app-evenements',
  templateUrl: './evenements.component.html',
  styleUrls: ['./evenements.component.scss']
})
export class EvenementsComponent implements OnInit{
    events: Evenement[] = [];
    formData:  Evenement= {id: 0, title: "", date: new Date, allDay:true};
    canAdd = false;

    calendarOptions: any = {
        initialView: 'timeGridDay'
    };

    showDialog: boolean = false;
    clickedEvent: any = null;
    edit: boolean = false;
    view: string = '';
    changedEvent: any;

    constructor(
        private authSrv: AuthService,
        private eventService: CalendarService , 
        private messageService: MessageService) {
    }

    ngOnInit(): void {
        this.canAdd = this.authSrv.isAdmin() || this.authSrv.getRole().toLowerCase() === RoleType.etablissement.toLowerCase()
        this.eventService.getAllEvenement().subscribe(events => {
            this.events = events;
            this.calendarOptions = { ...this.calendarOptions, ...{ events: events } };
        });

        this.calendarOptions = {
            plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
            locales: [ frLocale ],
            locale: 'fr',
            height: 720,
            initialDate: new Date(),
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'timeGridDay,timeGridWeek,dayGridMonth',   
            },
            initialView: 'timeGridDay',
            editable: true,
            selectable: true,
            selectMirror: true,
            dayMaxEvents: true,
            eventClick: (e: MouseEvent) => this.onEventClick(e),
            select: (e: MouseEvent) => this.onDateSelect(e)
        };
    }

    onEventClick(e: any) {
        this.clickedEvent = e.event;
        let plainEvent = e.event.toPlainObject({ collapseExtendedProps: true, collapseColor: true });
        this.view = 'display';
        this.showDialog = true;

        this.changedEvent = { ...plainEvent, ...this.clickedEvent };
        this.changedEvent.start = this.clickedEvent.start;
        this.changedEvent.end = this.clickedEvent.end;
        this.changedEvent.allDay = this.changedEvent.allDay;
    }

    onDateSelect(e: any) {
        if (this.canAdd){
            this.view = 'new'
            this.showDialog = true;
            this.changedEvent = { ...e, title: null, description: null, location: null, backgroundColor: 'lightorange', borderColor: 'orange',  textColor: 'black', font: 'Times New Roman' };
        }
    }

    handleSave() {
        if (!this.validate()) {
            return;
        }
        else {
            this.changedEvent.allDay= true;
            this.formData.title = this.changedEvent.title;
            this.formData.date = this.changedEvent.start;
            this.showDialog = false;
            this.eventService.saveEvenement(this.formData).subscribe({
                next: value => {
                    this.messageService.add({severity: "success", summary: "Success", detail: 'Evènement enregistré' });
                    this.clickedEvent = { ...this.changedEvent,   backgroundColor: 'orange', borderColor: 'gray', textColor: 'black', font: 'Times New Roman', };

                    if (this.clickedEvent.hasOwnProperty('id')) {
                        this.events = this.events.map(i => i.id.toString() === this.clickedEvent.id.toString() ? i = this.clickedEvent : i);
                    } else {
                        this.events = [...this.events, { ...this.clickedEvent, id: Math.floor(Math.random() * 10000) }];
                    }
                    this.calendarOptions = { ...this.calendarOptions, ...{ events: this.events } };
                    this.clickedEvent = null;
                },
                error: err => {
                    this.messageService.add({severity: "error", summary: "Error", detail: err.message });
                    this.clickedEvent = null;
                }
            });
        }
    }

    delete() {
        if (this.canAdd){
            this.events = this.events.filter(i => i.id.toString() !== this.clickedEvent.id.toString());
            this.calendarOptions = { ...this.calendarOptions, ...{ events: this.events } };
            this.showDialog = false;
            this.eventService.deleteEvenement(this.clickedEvent.id).subscribe(()=>{
                this.messageService.add({severity: "success", summary: "Success", detail: 'Evènement supprimée' });
            });
        }
    }

    validate() {
        let { start, end } = this.changedEvent;
        return start && end;
    }   
}
