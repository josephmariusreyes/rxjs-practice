import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RxjsColdHotComponent } from './rxjs-cold-hot.component';

describe('RxjsColdHotComponent', () => {
  let component: RxjsColdHotComponent;
  let fixture: ComponentFixture<RxjsColdHotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RxjsColdHotComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RxjsColdHotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
