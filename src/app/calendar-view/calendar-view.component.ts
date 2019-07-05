import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ViewChild,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  AfterViewInit
} from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import timeGrigPlugin from '@fullcalendar/timegrid';
import { GraphService } from '../services/graph/graph.service';
import { FullCalendarComponent } from '@fullcalendar/angular';
import * as moment from 'moment';

@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.scss'],
})
export class CalendarViewComponent implements OnInit, AfterViewInit {
  @ViewChild('calendar') calendarComponent: FullCalendarComponent;
  isLoaded = false;
  calendarPlugins = [dayGridPlugin, listPlugin, timeGrigPlugin]; // important!
  events: any[] = [];
  constructor(public graphService: GraphService, public cdr: ChangeDetectorRef) {}

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.graphService
      .getEvents()
      .then(data => {
        console.log(data);
        return data.map(event => {
          return {
            title: event.subject,
            start: moment(event.start.dateTime).format('YYYY-MM-DDThh:mm:ss'),
            end: moment(event.end.dateTime).format('YYYY-MM-DDThh:mm:ss')
          };
        });
      })
      .then(newEvent => {
        this.isLoaded = true;
        this.calendarComponent.events = newEvent;
        this.calendarComponent.getApi().addEventSource(newEvent);
        this.calendarComponent.getApi().rerenderEvents();
        console.log(this.calendarComponent.events);
      });
  }
}
