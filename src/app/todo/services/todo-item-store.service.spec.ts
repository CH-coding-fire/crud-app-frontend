import { TestBed } from '@angular/core/testing';

import { TodoItemStoreService } from './todo-item-store.service';

describe('TodoItemStoreService', () => {
  let service: TodoItemStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoItemStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
