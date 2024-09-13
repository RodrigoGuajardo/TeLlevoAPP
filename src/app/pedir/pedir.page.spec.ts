import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PedirPage } from './pedir.page';

describe('PedirPage', () => {
  let component: PedirPage;
  let fixture: ComponentFixture<PedirPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PedirPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
