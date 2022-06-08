import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewFestivalComponent } from './new-festival.component';

describe('NewFestivalComponent', () => {
  let component: NewFestivalComponent;
  let fixture: ComponentFixture<NewFestivalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewFestivalComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFestivalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
