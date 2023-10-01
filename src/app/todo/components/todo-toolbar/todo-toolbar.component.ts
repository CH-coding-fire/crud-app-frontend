import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AddTodoFormComponent} from "../add-todo-form/add-todo-form.component";
import {TodoItem} from "../../interfaces/todo-item";
import {MatDialog} from "@angular/material/dialog";
import {TodoItemStoreService} from "../../services/todo-item-store.service";
import {TaskStatus} from "../../enums/TaskStatus";
import {TaskTag} from "../../enums/TaskTag";
import {map} from "rxjs";
import {MatButtonToggleChange} from "@angular/material/button-toggle";
import {SortSequence} from "../../enums/sort-sequence";
import {SortingService} from "../../services/sorting.service";
import {FormControl} from "@angular/forms";
import {TodoGroup} from "../../interfaces/todo-group";

@Component({
  selector: 'app-todo-toolbar',
  templateUrl: './todo-toolbar.component.html',
  styleUrls: ['./todo-toolbar.compo' +
  'nent.css']
})
export class TodoToolbarComponent implements OnInit {
  protected readonly TaskStatus = TaskStatus;
  protected readonly TaskTag = TaskTag;
  protected readonly Object = Object;

  todoStatus:TaskStatus[] = [...Object.values(TaskStatus)]
  todoTag:TaskTag[]=[...Object.values(TaskTag)]
  dateSequenceSort: SortSequence = SortSequence.None
  prioritySort: SortSequence = SortSequence.None

  @Output() filteredSortedTodoItems: EventEmitter<TodoItem[]> = new EventEmitter<TodoItem[]>()
  @Output() todoGroup: EventEmitter<TodoGroup> = new EventEmitter<TodoGroup>()

  todoGroupsDummy: TodoGroup[] = [
    {
      id: "group_001",
      todoGroup: [
        {
          id: "task_001",
          name: "Finish Quarterly Report",
          description: "Complete the quarterly financial report for Q3.",
          dueDate: new Date('2023-10-15'),
          status: TaskStatus.NotStarted,
          tag: TaskTag.work,
          priority: 1
        },
        {
          id: "task_002",
          name: "Buy Groceries",
          description: "Buy milk, bread, and vegetables for the week.",
          dueDate: new Date('2023-09-27'),
          status: TaskStatus.NotStarted,
          tag: TaskTag.errend,
          priority: 2
        }
      ],
      teamId: "team_A"
    },
    {
      id: "group_002",
      todoGroup: [
        {
          id: "task_003",
          name: "Weekly Team Meeting",
          description: "Discuss the project updates and next steps.",
          dueDate: new Date('2023-09-29'),
          status: TaskStatus.InProgress,
          tag: TaskTag.work,
          priority: 2
        }
      ],
      teamId: "team_B"
    },
    {
      id: "group_003",
      todoGroup: [
        {
          id: "task_004",
          name: "Painting Session",
          description: "Work on the landscape painting for 2 hours.",
          dueDate: new Date('2023-10-05'),
          status: TaskStatus.NotStarted,
          tag: TaskTag.hobby,
          priority: 3
        },
        {
          id: "task_005",
          name: "Visit the Post Office",
          description: "Drop off packages and collect mail.",
          dueDate: new Date('2023-09-28'),
          status: TaskStatus.Completed,
          tag: TaskTag.errend,
          priority: 5
        }
      ],
      teamId: "team_C"
    }
  ];


  todoGroupSelection = new FormControl<TodoGroup[]>([])

  constructor(public dialog: MatDialog,
              private todoItemStoreService: TodoItemStoreService,
              private sortingService: SortingService
  ) {}
  ngOnInit() {
    // Step 1: API call the first todoGroup that the user can access...
    // Step 2: Input into the emitFilteredAndSortedItem function
    // Step 3: output the result of filteredItem and information of the todoGroup, as a object

    this.emitFilteredAndSortedItem("1")
    this.todoGroupSelection.valueChanges.subscribe((todoGroupId:any)=>{
      //apI call
      this.todoGroup.emit({id:"group_00001", todoGroup: [], teamId: "teamZ"})

      this.emitFilteredAndSortedItem(todoGroupId)
    })
  }
  emitFilteredAndSortedItem(todoGroupId?:string) {
    // api call by todoGroupId and user authentication
    //
    this.todoItemStoreService.todoItems$
      .pipe(
        map(todoItems => todoItems.filter(item =>
            this.todoStatus.includes(item.status) &&
            this.todoTag.includes(item.tag)
          )
        ),
        map((filteredItems: TodoItem[]) => {
          filteredItems = this.sortingService.sortByPriority(filteredItems, this.prioritySort)
          filteredItems = this.sortingService.sortByDateSequence(filteredItems, this.dateSequenceSort)
          return filteredItems;
        })
      )
      .subscribe((filteredItems: TodoItem[]) => {
        this.filteredSortedTodoItems.emit(filteredItems)
        console.log("FILTERED_ITEMS", filteredItems);
      });

  }

  onCreate() {
    const dialogRef = this.dialog.open(AddTodoFormComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result: TodoItem) => {
      if (result) {
        console.log('The create dialog was closed', result);
        //todo Api call
        //todo Update UI
        this.todoItemStoreService.addTodoItem(result)
      }
    });

  }
  onToggleStatus(status: MatButtonToggleChange){
    this.todoStatus = status.value
    this.emitFilteredAndSortedItem()
  }
  onToggleTag(tags: MatButtonToggleChange) {
    this.todoTag = tags.value
    this.emitFilteredAndSortedItem()
  }
  onToggleDateSequence(dateSequenceSort: MatButtonToggleChange) {
    this.prioritySort = SortSequence.None
    this.dateSequenceSort = dateSequenceSort.value
    this.emitFilteredAndSortedItem()
  }

  protected readonly SortSequence = SortSequence;

  onTogglePriority(prioritySort: MatButtonToggleChange) {
    this.dateSequenceSort = SortSequence.None
    this.prioritySort = prioritySort.value
    this.emitFilteredAndSortedItem()
  }
}
