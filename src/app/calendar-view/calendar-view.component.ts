import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import timeGrigPlugin from '@fullcalendar/timegrid';

@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.scss']
})
export class CalendarViewComponent implements OnInit {
  calendarPlugins = [dayGridPlugin, listPlugin, timeGrigPlugin]; // important!

  constructor() {}

  ngOnInit() {}
}
