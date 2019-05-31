import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Boton2ComponentComponent } from './boton2-component.component';

describe('Boton2ComponentComponent', () => {
  let component: Boton2ComponentComponent;
  let fixture: ComponentFixture<Boton2ComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Boton2ComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Boton2ComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
