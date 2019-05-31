import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Boton3ComponentComponent } from './boton3-component.component';

describe('Boton3ComponentComponent', () => {
  let component: Boton3ComponentComponent;
  let fixture: ComponentFixture<Boton3ComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Boton3ComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Boton3ComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
