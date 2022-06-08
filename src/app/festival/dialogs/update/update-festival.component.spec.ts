import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFestivalComponent } from './update-festival.component';

describe('UpdateFestivalComponent', () => {
  let component: UpdateFestivalComponent;
  let fixture: ComponentFixture<UpdateFestivalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateFestivalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateFestivalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
