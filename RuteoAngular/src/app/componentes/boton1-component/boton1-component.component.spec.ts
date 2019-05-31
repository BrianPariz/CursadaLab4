import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Boton1ComponentComponent } from './boton1-component.component';

describe('Boton1ComponentComponent', () => {
  let component: Boton1ComponentComponent;
  let fixture: ComponentFixture<Boton1ComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Boton1ComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Boton1ComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
