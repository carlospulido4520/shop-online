import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginForm } from '../../forms/login.form';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  public formLogin: FormGroup = new LoginForm().FormLogin();

  constructor(
    private authService: AuthService,
    public router: Router,
  ) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('user')) {
      this.router.navigate(['inicio']);
    }
  }

  async login() {
    if (this.formLogin.valid) {
      try {
        const { email, password } = this.formLogin.value;
        await this.authService.login(email, password).toPromise();
        this.router.navigate(['inicio']);
        this.authService.usuarioLogueado$.emit(true);
      } catch (error) {
        console.log(error);
      }
    }
  }

}
