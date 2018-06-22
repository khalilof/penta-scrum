/**
 * @author Khalil Khalil <khalil.khalil@pentasys.de>
 */

import { Component, Input, Output, OnInit, EventEmitter  } from '@angular/core';
import { BoardService } from '../../../services/board.service';
import { Column } from '../../../classes/column';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'penta-add-column',
  templateUrl: './addColumn.component.html',
  styleUrls: [ './addColumn.component.scss' ]
})
export class AddColumnComponent implements OnInit {
  columnForm: FormGroup;
  constructor(private fb: FormBuilder, private boardService: BoardService) {

  }

  @Output()
  update: EventEmitter<boolean> = new EventEmitter<boolean>();

  newColumn: Column;

  ngOnInit() {
    this.newColumn = new Column();
    this.initForm();
    console.log('init ');
  }

  initForm() {
    this.columnForm = this.fb.group({
      title: [this.newColumn.title, Validators.required ],
      order: [this.newColumn.order, Validators.required ],
    });
  }

  notifyParent() {
    console.log('notifyParent ');
    this.update.emit(true);
  }

  saveColumn() {
     this.boardService.createColumn(this.newColumn).subscribe(() => {
       this.boardService.fetchColumnList();
       this.notifyParent();
     });
  }

  hasRequiredError(form, field) {
    return form.get(field).hasError('required') && form.get(field).touched;
  }

}
