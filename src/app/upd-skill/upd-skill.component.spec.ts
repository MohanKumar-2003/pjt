import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdSkillComponent } from './upd-skill.component';

describe('UpdSkillComponent', () => {
  let component: UpdSkillComponent;
  let fixture: ComponentFixture<UpdSkillComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdSkillComponent]
    });
    fixture = TestBed.createComponent(UpdSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
