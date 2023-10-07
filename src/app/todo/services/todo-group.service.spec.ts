import { TestBed } from '@angular/core/testing';

import { TodoGroupService } from './todo-group.service';

import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('TodoGroupService', () => {
  let service: TodoGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(TodoGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
