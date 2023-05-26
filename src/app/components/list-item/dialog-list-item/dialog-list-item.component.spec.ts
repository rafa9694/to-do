import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogListItemComponent } from './dialog-list-item.component';

describe('DialogListItemComponent', () => {
  let component: DialogListItemComponent;
  let fixture: ComponentFixture<DialogListItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogListItemComponent]
    });
    fixture = TestBed.createComponent(DialogListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
