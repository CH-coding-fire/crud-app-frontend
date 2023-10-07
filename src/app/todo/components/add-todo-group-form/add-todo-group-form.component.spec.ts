import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTodoGroupFormComponent } from './add-todo-group-form.component';

describe('AddTodoGroupFormComponent', () => {
  let component: AddTodoGroupFormComponent;
  let fixture: ComponentFixture<AddTodoGroupFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddTodoGroupFormComponent]
    });
    fixture = TestBed.createComponent(AddTodoGroupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
