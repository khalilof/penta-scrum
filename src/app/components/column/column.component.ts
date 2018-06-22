/**
 * @author Khalil Khalil <khalil.khalil@pentasys.de>
 */

import { Component, Input, OnInit } from '@angular/core';
import { BoardService } from '../../services/board.service';
import { Task } from '../../classes/task';
import { trigger, style, transition, animate, state } from '@angular/animations';

@Component({
  selector: 'penta-column',
  templateUrl: './column.component.html',
  styleUrls: [ './column.component.scss' ],

  animations: [
    trigger('flyInOut', [
      state('in', style({transform: 'translateX(0)'})),
      transition('void => *', [
        style({opacity: 0}),
        animate(300)
      ]),
      transition('* => void', [
        animate(300, style({opacity: 1}))
      ])
    ])
    ]
})
export class ColumnComponent implements OnInit {
  tasks: Task[];
  assigneeFilter: string;
  constructor(private boardService: BoardService) {}

  @Input() title: string;
  @Input() id: number;


   ngOnInit() {
    this.boardService.getTasksListSubject().subscribe(tasks => {
      this.tasks = tasks.filter(task => task.columnId == this.id);
    });

    this.boardService.getAssigneeFilter().subscribe(newFilterVal => {
        this.assigneeFilter = newFilterVal;
    });
   }

}
