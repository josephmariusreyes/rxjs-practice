import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RxjsSubjectComponent } from './rxjs-subject.component';

describe('RxjsSubjectComponent', () => {
  let component: RxjsSubjectComponent;
  let fixture: ComponentFixture<RxjsSubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RxjsSubjectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RxjsSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
