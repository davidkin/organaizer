import { Component, OnInit } from '@angular/core';
import IWeek from '../shared/interfaces/IWeek';
import { DateService } from '../shared/services/date.service';
import * as moment from 'moment';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  calendar: IWeek[]
  
  constructor(
    private dateService: DateService
  ) { }

  ngOnInit() {
    this.dateService.date.subscribe(this.generate);
  }

  generate = (dateNow: moment.Moment) => {
    const startDay = dateNow.clone().startOf('month').startOf('week');
    const endDay = dateNow.clone().endOf('month').endOf('week');

    const date = startDay.clone().subtract(1, 'day');
    const calendar = [];

    while (date.isBefore(endDay, 'day')) {
      calendar.push({
        days: Array(7)
          .fill(0)
          .map(() => {
            const value = date.add(1, 'day').clone();
            const active = moment().isSame(value, 'date');
            const disabled = !dateNow.isSame(value, 'month');
            const selected = dateNow.isSame(value, 'date');

            return {
              value,
              active,
              disabled,
              selected
            }
          })
      })
    }

    this.calendar = calendar;
  }

  onSelectedDay(day: moment.Moment) {
    this.dateService.changeDay(day);
  }

}
