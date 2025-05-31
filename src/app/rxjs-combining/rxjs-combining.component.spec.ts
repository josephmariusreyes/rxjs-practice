import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RxjsCombiningComponent } from './rxjs-combining.component';

describe('RxjsCombiningComponent', () => {
  let component: RxjsCombiningComponent;
  let fixture: ComponentFixture<RxjsCombiningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RxjsCombiningComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RxjsCombiningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
