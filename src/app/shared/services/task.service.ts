import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import ITask from '../interfaces/ITask';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import IRespone from '../interfaces/IResponse';
import * as moment from 'moment';

@Injectable()
export default class TaskService {
    url = 'https://organizer-5031f.firebaseio.com/tasks/';

    constructor(
        private http: HttpClient
    ) {}

    getTasks(date: moment.Moment): Observable<ITask[]> {
        const selectedDate = date.format('DD-MM-YYYY'); 
        return this.http
                .get<ITask[]>(`${this.url}/${selectedDate}.json`)
                .pipe(
                    map(tasks => {
                        if (!tasks) {
                            return []
                        }

                        return Object.keys(tasks).map(key => ({...tasks[key], id: key})) 
                    })
                )
        ;
    }

    createTask(task: ITask): Observable<ITask> {
        return this.http
                .post<IRespone>(`${this.url}/${task.date}.json`, task)
                .pipe(
                    map(res => {
                        console.log('Response', res);
                        return { ...task, id: res.name }
                    })
                )
    }

    removeTasks(task: ITask): Observable<void> {
        return this.http.delete<void>(`${this.url}/${task.date}/${task.id}.json`);
    }
    
}