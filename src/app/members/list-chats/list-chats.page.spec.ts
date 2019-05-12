import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListChatsPage } from './list-chats.page';

describe('ListChatsPage', () => {
  let component: ListChatsPage;
  let fixture: ComponentFixture<ListChatsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListChatsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListChatsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
