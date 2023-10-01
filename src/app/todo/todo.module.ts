import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoRoutingModule } from './todo-routing.module';
import { AddTodoFormComponent } from './components/add-todo-form/add-todo-form.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoComponent } from './todo.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import { TodoToolbarComponent } from './components/todo-toolbar/todo-toolbar.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {NgbActiveModal, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {MatDialogModule} from "@angular/material/dialog";
import { FilterByConditionPipe } from './pipes/filter-by-condition.pipe';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatButtonToggleModule} from "@angular/material/button-toggle";


@NgModule({
  declarations: [
    AddTodoFormComponent,
    TodoListComponent,
    TodoComponent,
    TodoToolbarComponent,
    FilterByConditionPipe
  ],
    imports: [
        CommonModule,
        TodoRoutingModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatButtonModule,
        MatInputModule,
        MatCardModule,
        MatToolbarModule,
        NgbModule,
        MatDialogModule,
        MatCheckboxModule,
        MatButtonToggleModule,


    ]
})
export class TodoModule { }
