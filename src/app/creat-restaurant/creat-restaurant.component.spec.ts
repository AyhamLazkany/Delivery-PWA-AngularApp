import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatRestaurantComponent } from './creat-restaurant.component';

describe('CreatRestaurantComponent', () => {
  let component: CreatRestaurantComponent;
  let fixture: ComponentFixture<CreatRestaurantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatRestaurantComponent]
    });
    fixture = TestBed.createComponent(CreatRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
