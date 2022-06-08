import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteFestivalComponent } from './delete-festival.component';

describe('DeleteFestivalComponent', () => {
  let component: DeleteFestivalComponent;
  let fixture: ComponentFixture<DeleteFestivalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteFestivalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteFestivalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
