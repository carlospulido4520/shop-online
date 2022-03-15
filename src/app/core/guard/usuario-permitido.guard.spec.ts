import { TestBed } from '@angular/core/testing';

import { UsuarioPermitidoGuard } from './usuario-permitido.guard';

describe('UsuarioPermitidoGuard', () => {
  let guard: UsuarioPermitidoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UsuarioPermitidoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
