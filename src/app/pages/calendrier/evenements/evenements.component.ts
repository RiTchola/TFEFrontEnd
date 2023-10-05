import { Component, OnInit } from '@angular/core';
import { CalendarService } from "../service/calendar.service";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { MessageService } from "primeng/api";

import { Evenement } from "../../../models/evenement";

@Component({
  selector: 'app-evenements',
  templateUrl: './evenements.component.html',
  styleUrls: ['./evenements.component.scss']
})
export class EvenementsComponent implements OnInit{
    events: any[] = [];
    formData:  Evenement= {id: 0, title: "", dateEvent: new Date};

    calendarOptions: any = {
        initialView: 'timeGridDay'
    };

    showDialog: boolean = false;
    clickedEvent: any = null;
    edit: boolean = false;
    view: string = '';
    changedEvent: any;

    constructor(private eventService: CalendarService , private messageService: MessageService) {
    }

    ngOnInit(): void {
        this.eventService.getAllEvenement().subscribe(events => {
            this.events = events;
            this.calendarOptions = { ...this.calendarOptions, ...{ events: events } };
        });

        this.calendarOptions = {
            plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
            height: 720,
            initialDate: this.formatDate(new Date()),
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'timeGridDay,timeGridWeek,dayGridMonth'
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
        //? this.clickedEvent.end : this.clickedEvent.start;
    }

    onDateSelect(e: any) {
        this.view = 'new'
        this.showDialog = true;
        this.changedEvent = { ...e, title: null, description: null, location: null, backgroundColor: null, borderColor: null, textColor: null, tag: { color: null, name: null } };
    }

    handleSave() {
        if (!this.validate()) {
            return;
        }
        else {
            this.changedEvent.allDay= true;
            this.formData.title = this.changedEvent.title;
            this.formData.dateEvent = this.changedEvent.start;
            this.showDialog = false;
            this.eventService.saveEvenement(this.formData).subscribe({
                next: value => {
                    this.messageService.add({severity: "success", summary: "Success", detail: 'Evènement enregistré' });
                    this.clickedEvent = { ...this.changedEvent, backgroundColor: this.changedEvent.tag.color, borderColor: this.changedEvent.tag.color, textColor: '#212121' };

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
        this.events = this.events.filter(i => i.id.toString() !== this.clickedEvent.id.toString());
        this.calendarOptions = { ...this.calendarOptions, ...{ events: this.events } };
        this.showDialog = false;
        this.eventService.deleteEvenement(this.clickedEvent.id).subscribe(()=>{
            this.messageService.add({severity: "success", summary: "Success", detail: 'Evènement supprimée' });
        });
    }

    validate() {
        let { start, end } = this.changedEvent;
        return start && end;
    }

    formatDate(date: Date): string {
        const year = date.getFullYear();
        let month = (date.getMonth() + 1).toString();
        let day = date.getDate().toString();

        // Pad single digit month and day with a leading zero
        month = month.length < 2 ? '0' + month : month;
        day = day.length < 2 ? '0' + day : day;

        return `${year}-${month}-${day}`;
    }
}
