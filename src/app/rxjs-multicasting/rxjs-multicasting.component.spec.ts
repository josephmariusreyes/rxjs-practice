import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RxjsMulticastingComponent } from './rxjs-multicasting.component';

describe('RxjsMulticastingComponent', () => {
  let component: RxjsMulticastingComponent;
  let fixture: ComponentFixture<RxjsMulticastingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RxjsMulticastingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RxjsMulticastingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
