import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LlevarPage } from './llevar.page';

describe('LlevarPage', () => {
  let component: LlevarPage;
  let fixture: ComponentFixture<LlevarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LlevarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
