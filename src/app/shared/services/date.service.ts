import { Injectable } from "@angular/core";
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DateService {
    public date: BehaviorSubject<moment.Moment> = new BehaviorSubject(moment());

    changeMonth (month: number) {
        const value = this.date.value.add(month, 'M');
        this.date.next(value);
    }

    changeDay(day: moment.Moment) {
        const value = this.date.value.set({
            date: day.date(),
            month: day.month()
        })

        this.date.next(value);
    }
}