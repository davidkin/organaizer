import { Component, OnInit } from '@angular/core';
import { DateService } from '../shared/services/date.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import TaskService from '../shared/services/task.service';
import ITask from '../shared/interfaces/ITask';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss']
})
export class OrganizerComponent implements OnInit {
  form: FormGroup;
  tasks: ITask[] = [];

  constructor(
    private dateService: DateService,
    private taskService: TaskService
  ) { }

  ngOnInit() {

    this.dateService.date.pipe(
      switchMap(value => this.taskService.getTasks(value))
    ).subscribe (
      tasks => this.tasks = tasks
    )

    this.form = new FormGroup({
      title: new FormControl('', Validators.required)
    })
  }

  onRemoveTask(task: ITask) {
    this.taskService.removeTasks(task).subscribe(
      () => this.tasks = this.tasks.filter(t => t.id !== task.id),
      err => console.log('Error: ', err) 
    )
  }

  onSubmit() {
    const { title } = this.form.value;
    const task: ITask = {
      title,
      date: this.dateService.date.value.format('DD-MM-YYYY')
    };

    this.taskService.createTask(task).subscribe(
      task => {
        this.tasks.push(task)
        this.form.reset()
      },
      err => console.log('Error: ', err)
    );
  }

}
