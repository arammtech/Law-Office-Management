import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAttachment } from './add-attachment';

describe('AddAttachment', () => {
  let component: AddAttachment;
  let fixture: ComponentFixture<AddAttachment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAttachment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAttachment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
