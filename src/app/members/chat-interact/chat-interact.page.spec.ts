import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatInteractPage } from './chat-interact.page';

describe('ChatInteractPage', () => {
  let component: ChatInteractPage;
  let fixture: ComponentFixture<ChatInteractPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatInteractPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatInteractPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
