import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerRegComponent } from './manager-reg.component';

describe('ManagerRegComponent', () => {
  let component: ManagerRegComponent;
  let fixture: ComponentFixture<ManagerRegComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagerRegComponent]
    });
    fixture = TestBed.createComponent(ManagerRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
