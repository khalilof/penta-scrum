/**
 * @author Khalil Khalil <khalil.khalil@pentasys.de>
 */

import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Task } from '../../../classes/task';
import { Column } from '../../../classes/column';
import { BoardService } from '../../../services/board.service';

@Component({
  selector: 'penta-add-task',
  templateUrl: './addTask.component.html',
  styleUrls: ['./addTask.component.scss']
})
export class AddTaskComponent implements OnInit, OnDestroy {
  newTask: Task;
  cols: Column[];

  @Output()
  update: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private boardService: BoardService) {}

  ngOnInit() {
    this.newTask = new Task();
    this.boardService.getColumnListSubject().subscribe((cols) => {
      this.cols = cols;
    });
  }

  notifyParent() {
    console.log('notifyParent to hide add-Task form');
    this.update.emit(true);
  }

  saveTask() {
    this.boardService.createTask(this.newTask).subscribe(() => {
      this.boardService.fetchTasksList();
      this.notifyParent();
    });
  }

  ngOnDestroy() {

  }
}
