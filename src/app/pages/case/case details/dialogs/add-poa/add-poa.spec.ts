import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPoa } from './add-poa';

describe('AddPoa', () => {
  let component: AddPoa;
  let fixture: ComponentFixture<AddPoa>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPoa]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPoa);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
