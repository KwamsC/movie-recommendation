import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChrisComponent } from './chris.component';

describe('ChrisComponent', () => {
  let component: ChrisComponent;
  let fixture: ComponentFixture<ChrisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChrisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChrisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
