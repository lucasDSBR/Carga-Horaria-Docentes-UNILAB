import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDetalhesDocenteComponent } from './dialog-detalhes-docente.component';

describe('DialogDetalhesDocenteComponent', () => {
  let component: DialogDetalhesDocenteComponent;
  let fixture: ComponentFixture<DialogDetalhesDocenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogDetalhesDocenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDetalhesDocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
