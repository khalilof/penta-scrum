import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BoardComponent } from './components/board/board.component';
import { ColumnComponent } from './components/column/column.component';
import { TaskComponent } from './components/task/task.component';
import { BoardService } from './services/board.service';

import { AddColumnComponent } from './components/forms/add-column/addColumn.component';
import { AddTaskComponent } from './components/forms/add-task/addTask.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AssigneePipe } from './pipes/assignee.pipe';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { TaskDetailsComponent } from './components/task-details/task-details.component';

const appRoutes: Routes = [
  {
    path: 'board',
    component: BoardComponent,
    data: { title: 'Pentasys SCRUM Board' }
  },
  { path: 'task/:id',      component: TaskDetailsComponent },
  { path: '',
    redirectTo: '/board',
    pathMatch: 'full'
  }/* ,
  { path: '**', component: PageNotFoundComponent } */
];

@NgModule({
  imports:      [ BrowserModule,
                  BrowserAnimationsModule,
                  FormsModule,
                  ReactiveFormsModule,
                  HttpClientModule,
                  RouterModule.forRoot(appRoutes)  ],

  declarations: [ AppComponent,
                  BoardComponent,
                  ColumnComponent,
                  AddColumnComponent,
                  TaskComponent,
                  TaskDetailsComponent,
                  AddTaskComponent,
                  AssigneePipe,
                  PageNotFoundComponent ],

  bootstrap:    [ AppComponent ],

  providers:    [BoardService],
})
export class AppModule { }
