import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillPageComponent } from './skill-page.component';

describe('SkillPageComponent', () => {
  let component: SkillPageComponent;
  let fixture: ComponentFixture<SkillPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SkillPageComponent]
    });
    fixture = TestBed.createComponent(SkillPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
