import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RxjsBehaviorSubjectComponent } from './rxjs-behavior-subject.component';

describe('RxjsBehaviorSubjectComponent', () => {
  let component: RxjsBehaviorSubjectComponent;
  let fixture: ComponentFixture<RxjsBehaviorSubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RxjsBehaviorSubjectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RxjsBehaviorSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
