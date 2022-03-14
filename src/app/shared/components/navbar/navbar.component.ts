import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/feature/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  existeUsuario: boolean = false;
  nombreUsuario: string = '';

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.validarUsuario();
    this.authService.usuarioLogueado$.subscribe(
      res => {
        this.existeUsuario = true;
        this.nombreUsuario = 'c.ortizserrano38@gmail.com'
      }
    )

  }

  validarUsuario() {
    const user = localStorage.getItem('user');
    if (user) {
      this.existeUsuario = true;
      this.nombreUsuario = JSON.parse(user).email;
    } else {
      this.existeUsuario = false;
    }
  }

  async logout() {
    await this.authService.logout();
    localStorage.removeItem('user');
    this.existeUsuario = false;

  }

}
