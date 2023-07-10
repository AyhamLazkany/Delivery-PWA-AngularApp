import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatDishComponent } from './creat-dish.component';

describe('CreatDishComponent', () => {
  let component: CreatDishComponent;
  let fixture: ComponentFixture<CreatDishComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatDishComponent]
    });
    fixture = TestBed.createComponent(CreatDishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
