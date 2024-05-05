import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabittrackerComponent } from './habittracker.component';

describe('HabittrackerComponent', () => {
  let component: HabittrackerComponent;
  let fixture: ComponentFixture<HabittrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HabittrackerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HabittrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
