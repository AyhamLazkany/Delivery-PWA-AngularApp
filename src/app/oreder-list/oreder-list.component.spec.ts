import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrederListComponent } from './oreder-list.component';

describe('OrederListComponent', () => {
  let component: OrederListComponent;
  let fixture: ComponentFixture<OrederListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrederListComponent]
    });
    fixture = TestBed.createComponent(OrederListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
