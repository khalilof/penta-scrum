/**
 * @author Khalil Khalil <khalil.khalil@pentasys.de>
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, BehaviorSubject } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';



import { Column } from '../classes/column';
import { Utils } from '../classes/utils';
import { Task } from '../classes/task';
import { TASKS } from '../classes/tasks-mock';
import { COLUMNS } from '../classes/columns-mock';
@Injectable()
export class BoardService {

  // rest endpoints - backend
  columnsAPI= 'https://pentascrum-b922.restdb.io/rest/columns';
  tasksAPI = 'https://pentascrum-b922.restdb.io/rest/tasks';

  private tasksSubject$: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);

  private columnsSubject$: BehaviorSubject<Column[]> = new BehaviorSubject<Column[]>([]);

  private assigneeFilter$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  private httpOptions = {
      headers: new HttpHeaders({ 'x-apikey': '5adee70a25a622ae4d528544' })
   };

  constructor( private http: HttpClient) { }

  public fetchColumnList(): void {
    this.http.get<Column[]>(this.columnsAPI, this.httpOptions)
    .pipe(
      map(unorderedListOfColumns => unorderedListOfColumns.sort(Utils.columnComparator))
    )
    .subscribe((nextVal) => {
      this.columnsSubject$.next(nextVal);
    }, () => {
      this.columnsSubject$.next( COLUMNS as Column[] );
    }, () => {
     // nothing :D
    });
  }

  public getColumnListSubject(): Observable<Column[]> {
    return this.columnsSubject$;
  }

  public createColumn(column: Column) {
    return this.http
      .post(this.columnsAPI, column, this.httpOptions);
  }

  public fetchTasksList(): void {
    this.http.get<Task[]>(this.tasksAPI, this.httpOptions)
    .subscribe((nextVal) => this.tasksSubject$.next(nextVal),
    () => {
      this.tasksSubject$.next( <Task[]>TASKS );
    } );


  }

  public getTasksListSubject(): Observable<Task[]> {
    return this.tasksSubject$;
  }

  public createTask(task: Task) {
    return this.http
      .post(this.tasksAPI, task, this.httpOptions);
  }

  public updateTask(task: Task) {
    return this.http
      .put(this.tasksAPI + '/' + task._id, task, this.httpOptions);
  }

  public getTaskById(taskId: string) {
    return this.http
      .get<Task>(this.tasksAPI + '/' + taskId, this.httpOptions);
  }

  public getAssigneeFilter(): BehaviorSubject<string> {
    return this.assigneeFilter$;
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
