import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleAddModalComponent } from './module-add-modal.component';

describe('ModuleAddModalComponent', () => {
  let component: ModuleAddModalComponent;
  let fixture: ComponentFixture<ModuleAddModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuleAddModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
