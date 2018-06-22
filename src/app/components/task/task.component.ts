/**
 * @author Khalil Khalil <khalil.khalil@pentasys.de>
 */

import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Column } from '../../classes/column';
import { BoardService } from '../../services/board.service';
import { Task } from '../../classes/task';
import { SubscriptionLike as ISubscription } from 'rxjs';

@Component({
  selector: 'penta-task',
  templateUrl: './task.component.html',
  styleUrls: [ './task.component.scss' ]
})
export class TaskComponent implements OnInit, OnDestroy{

  @Input() task: Task;

  detailsVisible: boolean = false;
  loading: boolean = false;
  columns: Column[];

  private columnListSubscription: ISubscription;

  constructor(private boardService: BoardService) {}

  ngOnInit() {
    this.columnListSubscription = this.boardService.getColumnListSubject().subscribe((cols) => {
      this.columns = cols;
      this.loading = false;
    });
  }

  showDetails() {
    this.detailsVisible = true;
  }

  hideDetails() {
    this.detailsVisible = false;
  }


  setStatus(columnId: number): void {
   this.task.columnId = columnId;
   this.update();
  }

  update() {
    this.loading = true;
    this.boardService.updateTask(this.task).subscribe(() => {
      this.boardService.fetchTasksList();
   });
  }

  ngOnDestroy() {
    this.columnListSubscription.unsubscribe();
  }
}
