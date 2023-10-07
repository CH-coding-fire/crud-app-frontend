
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTeamFormComponent } from './create-team-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";

describe('CreateTeamFormComponent', () => {
  let component: CreateTeamFormComponent;
  let fixture: ComponentFixture<CreateTeamFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateTeamFormComponent],
      imports: [ReactiveFormsModule, MatDialogModule],
      providers: []
    });
    fixture = TestBed.createComponent(CreateTeamFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
