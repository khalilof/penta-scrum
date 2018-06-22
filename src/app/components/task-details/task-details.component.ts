/**
 * @author Khalil Khalil <khalil.khalil@pentasys.de>
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BoardService } from '../../services/board.service';
import { Task } from '../../classes/task';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'penta-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private boardService: BoardService) { }
  task$: Observable<Task>;
  ngOnInit() {

    this.task$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>  this.boardService.getTaskById(params.get('id')))
    );
  }
}
