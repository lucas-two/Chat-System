import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateuserComponent } from './createuser.component';

describe('CreateuserComponent', () => {
  let component: CreateuserComponent;
  let fixture: ComponentFixture<CreateuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display home page title', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Manage Users');
  });

  it('should have status checking functions', () => {
    expect(component.isGroupAssis).toBeTruthy();
    expect(component.isGroupAdmin).toBeTruthy();
    expect(component.isSuperAdmin).toBeTruthy();
  });
});
