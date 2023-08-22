import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessageDisplayPage } from './message-display.page';

describe('MessageDisplayPage', () => {
  let component: MessageDisplayPage;
  let fixture: ComponentFixture<MessageDisplayPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MessageDisplayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
