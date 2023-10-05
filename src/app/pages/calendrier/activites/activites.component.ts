import { Component, OnInit } from '@angular/core';
import { CalendarService } from "../service/calendar.service";
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { MessageService } from "primeng/api";

import { Activite } from "../../../models/activite";
import { Util } from 'src/app/shared/util';
import frLocale from '@fullcalendar/core/locales/fr';

@Component({
  selector: 'app-activites',
  templateUrl: './activites.component.html',
  styleUrls: ['./activites.component.scss']
})
export class ActivitesComponent implements OnInit{
    events: any[] = [];
    formData:  Activite= {id: 0, title: "", date: new Date};

    calendarOptions: any = {
        initialView: 'timeGridDay'
    };

    showDialog: boolean = false;
    clickedEvent: any = null;
    edit: boolean = false;
    view: string = '';
    changedEvent: any;

    constructor(private eventService: CalendarService, private messageService: MessageService ) {
    }

    ngOnInit(): void {
        this.eventService.getAllActivity().subscribe(events => {
            this.events = events;
            this.calendarOptions = { ...this.calendarOptions, ...{ events: events } };
        });

        this.calendarOptions = {
            plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
            height: 720,
            initialDate: new Date(),
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'timeGridDay,timeGridWeek,dayGridMonth'
            },
            initialView: 'timeGridDay',
            allDaySlot: false,
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
            this.changedEvent.end = new Date( this.changedEvent.start.getTime() + 60 * 60 * 1000);
            this.formData.title = this.changedEvent.title;
            this.formData.date = this.changedEvent.start;
            this.showDialog = false;
            this.eventService.saveActivity(this.formData).subscribe({
                next: value => {
                    this.messageService.add({severity: "success", summary: "Success", detail: 'Activité enregistré' });
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
        this.eventService.deleteActivity(this.clickedEvent.id).subscribe(()=>{
            this.messageService.add({severity: "success", summary: "Success", detail: 'Activité supprimée' });
        });
    }

    validate() {
        let { start, end } = this.changedEvent;
        return start && end;
    }

}
