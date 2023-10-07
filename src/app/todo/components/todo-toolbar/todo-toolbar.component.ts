import {AfterViewInit, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AddTodoFormComponent} from "../add-todo-form/add-todo-form.component";
import {TodoItem} from "../../interfaces/todo-item";
import {MatDialog} from "@angular/material/dialog";
import {TaskStatus} from "../../enums/TaskStatus";
import {TaskTag} from "../../enums/TaskTag";
import {catchError, EMPTY, map, Observable, of, take, tap} from "rxjs";
import {MatButtonToggleChange} from "@angular/material/button-toggle";
import {SortSequence} from "../../enums/sort-sequence";
import {SortingService} from "../../services/sorting.service";
import {TodoGroup} from "../../interfaces/todo-group";
import {TodoGroupService} from "../../services/todo-group.service";
import {MatSelectChange} from "@angular/material/select";
import {TodoItemService} from "../../services/todo-item.service";
import {TodoItemStoreService} from "../../services/todo-item-store.service";

@Component({
  selector: 'app-todo-toolbar',
  templateUrl: './todo-toolbar.component.html',
  styleUrls: ['./todo-toolbar.component.css']
})
export class TodoToolbarComponent implements OnInit {
  @Output() todoGroup: EventEmitter<TodoGroup> = new EventEmitter<TodoGroup>()

  protected readonly TaskStatus = TaskStatus;
  protected readonly TaskTag = TaskTag;
  protected readonly Object = Object;

  todoStatus:TaskStatus[] = [...Object.values(TaskStatus)]
  todoTag:TaskTag[]=[...Object.values(TaskTag)]
  dateSequenceSort: SortSequence = SortSequence.None
  prioritySort: SortSequence = SortSequence.None
  getTodoGroup$: Observable<TodoGroup[]> = this.todoGroupService.getTodoGroup()

  private currentTodoGroupId: number  = 0
  public currentTodoGroupName: string | null = null
  public initialTodoGroup: TodoGroup|null = null;
  constructor(public dialog: MatDialog,
              private todoGroupService: TodoGroupService,
              private todoItemService: TodoItemService,
              private todoItemStoreService: TodoItemStoreService,
  ) {}
  ngOnInit() {
    this.getTodoGroup$ = this.todoGroupService.getTodoGroup()
    this.getTodoGroup$.pipe(
      take(1)  // Only take one emission to avoid memory leaks
    ).subscribe((todoGroups) => {
      if (todoGroups.length > 0) {
        this.initFirstTodoGroup(todoGroups)
      }
    });
  }

  // ngAfterViewInit():void{
  //   this.getTodoGroup$.pipe(
  //     take(1)  // Only take one emission to avoid memory leaks
  //   ).subscribe((todoGroups) => {
  //     if (todoGroups.length > 0) {
  //       this.initFirstTodoGroup(todoGroups)
  //     }
  //   });
  // }

  initFirstTodoGroup(todoGroups:TodoGroup[]){
    this.initialTodoGroup = todoGroups[0];
    console.log(this.initialTodoGroup)
    const unfilteredTodoItems$: Observable<TodoItem[]> = this.todoGroupService.getTodoGroupById(todoGroups[0].id)
      .pipe(
        map(response => response.todoItems)
      );
    this.todoItemStoreService.setAndFilterTodoItems(
      unfilteredTodoItems$,
      this.todoStatus,
      this.todoTag,
      this.dateSequenceSort,
      this.prioritySort
    )
  }
  onToggleStatus(status: MatButtonToggleChange){
    this.todoStatus = status.value
    this.todoItemStoreService.filterTodoItems(
      this.todoStatus,
      this.todoTag,
      this.dateSequenceSort,
      this.prioritySort
    )
  }
  onToggleTag(tags: MatButtonToggleChange) {
    this.todoTag = tags.value
    this.todoItemStoreService.filterTodoItems(
      this.todoStatus,
      this.todoTag,
      this.dateSequenceSort,
      this.prioritySort
    )
  }
  onToggleDateSequence(dateSequenceSort: MatButtonToggleChange) {
    this.prioritySort = SortSequence.None
    this.dateSequenceSort = dateSequenceSort.value
    this.todoItemStoreService.filterTodoItems(
      this.todoStatus,
      this.todoTag,
      this.dateSequenceSort,
      this.prioritySort
    )
  }

  protected readonly SortSequence = SortSequence;

  onTogglePriority(prioritySort: MatButtonToggleChange) {
    this.dateSequenceSort = SortSequence.None
    this.prioritySort = prioritySort.value
    this.todoItemStoreService.filterTodoItems(
      this.todoStatus,
      this.todoTag,
      this.dateSequenceSort,
      this.prioritySort
    )
  }

  onSelectTodoGroup(todoGroupIdAndName: MatSelectChange) {
    const {todoGroupId, todoGroupName} = todoGroupIdAndName.value
    this.currentTodoGroupName = todoGroupName
    this.currentTodoGroupId = todoGroupId

    const unfilteredTodoItems$: Observable<TodoItem[]> = this.todoGroupService.getTodoGroupById(todoGroupId)
      .pipe(
        map(response => response.todoItems)
      );
    this.todoItemStoreService.setAndFilterTodoItems(
      unfilteredTodoItems$,
      this.todoStatus,
      this.todoTag,
      this.dateSequenceSort,
      this.prioritySort
    )
  }

  onCreateTodoItem() {
    const dialogRef = this.dialog.open(AddTodoFormComponent, {
      data: { isEditMode:false},
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result: TodoItem) => {
      if (result) {
        const unfilteredTodoItems$: Observable<TodoItem[]> = this.todoItemService.createTodoItem(result, this.currentTodoGroupId)
          .pipe(
            map(response => response.todoItems),
            tap({
              next: value => {
                alert('Successfully added item!')
              },
            }),
            catchError(error => {
              alert(error);
              return EMPTY; // does not emit any items to the subscriber and immediately emits a complete notification
            })
          );
        this.todoItemStoreService.setAndFilterTodoItems(
          unfilteredTodoItems$,
          this.todoStatus,
          this.todoTag,
          this.dateSequenceSort,
          this.prioritySort
        )
      }
    });
  }
  onDeleteTodoItem(todoItemId:number):void{
    const unfilteredTodoItems$: Observable<TodoItem[]> = this.todoItemService.deleteTodoItem(todoItemId)
      .pipe(
        map(response => response.todoItems)
      );

    this.todoItemStoreService.setAndFilterTodoItems(
      unfilteredTodoItems$,
      this.todoStatus,
      this.todoTag,
      this.dateSequenceSort,
      this.prioritySort
    )
  }
  onEditTodoItem(todoItem: TodoItem) {
    const unfilteredTodoItems$: Observable<TodoItem[]> = this.todoItemService.editTodoItem(todoItem)
      .pipe(
        map(response => response.todoItems)
      );
    this.todoItemStoreService.setAndFilterTodoItems(
      unfilteredTodoItems$,
      this.todoStatus,
      this.todoTag,
      this.dateSequenceSort,
      this.prioritySort
    )
  }


}
