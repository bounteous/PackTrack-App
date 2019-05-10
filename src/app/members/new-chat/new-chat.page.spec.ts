import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewChatPage } from './new-chat.page';

describe('NewChatPage', () => {
  let component: NewChatPage;
  let fixture: ComponentFixture<NewChatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewChatPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewChatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
