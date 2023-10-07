import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {AuthService} from "./auth/services/auth.service";

class AuthServiceMock { //is necessary?
  initUserDataByLocalStorage() {}
}

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [AppComponent],
    providers: [{provide: AuthService, useClass: AuthServiceMock}],
  }));

  //test case 1
  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy(); //it means successfully render
  });

  it('authService localStorage init  works', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const spy =
      spyOn(fixture.componentInstance['authService'], 'initUserDataByLocalStorage')

    fixture.componentInstance.ngOnInit();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  })

  //test case 2
  // it(`should have as title 'crud-app-frontend'`, () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.componentInstance;
  //   expect(app.title).toEqual('crud-app-frontend');
  // });
  //
  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('.content span')?.textContent).toContain('crud-app-frontend app is running!');
  // });
});
