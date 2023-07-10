import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DishDetailsCardComponent } from './dish-details-card.component';

describe('DishDetailsCardComponent', () => {
  let component: DishDetailsCardComponent;
  let fixture: ComponentFixture<DishDetailsCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DishDetailsCardComponent]
    });
    fixture = TestBed.createComponent(DishDetailsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
