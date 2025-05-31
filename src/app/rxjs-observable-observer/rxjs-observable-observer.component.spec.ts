import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RxjsObservableObserverComponent } from './rxjs-observable-observer.component';

describe('RxjsObservableObserverComponent', () => {
  let component: RxjsObservableObserverComponent;
  let fixture: ComponentFixture<RxjsObservableObserverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RxjsObservableObserverComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RxjsObservableObserverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
