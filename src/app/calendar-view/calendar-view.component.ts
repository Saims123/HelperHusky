import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';


@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.scss']
})
export class CalendarViewComponent implements OnInit {
  calendarPlugins = [dayGridPlugin]; // important!

  constructor() {}

  ngOnInit() {}
}
