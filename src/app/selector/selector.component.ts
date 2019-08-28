import { Component } from '@angular/core';
import { DateService } from '../shared/services/date.service';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss']
})
export class SelectorComponent {

  constructor(
    public dateService: DateService
  ) { }

  onMonthChange(month: number) {
    this.dateService.changeMonth(month);
  }
}
