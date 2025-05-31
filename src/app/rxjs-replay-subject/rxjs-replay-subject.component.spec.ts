import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RxjsReplaySubjectComponent } from './rxjs-replay-subject.component';

describe('RxjsReplaySubjectComponent', () => {
  let component: RxjsReplaySubjectComponent;
  let fixture: ComponentFixture<RxjsReplaySubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RxjsReplaySubjectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RxjsReplaySubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
