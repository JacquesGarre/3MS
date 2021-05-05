import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputAddModalComponent } from './input-add-modal.component';

describe('InputAddModalComponent', () => {
  let component: InputAddModalComponent;
  let fixture: ComponentFixture<InputAddModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputAddModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
