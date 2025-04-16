import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '@services/storage/storage.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  public login: FormGroup;
  public error: string = '';

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private form: FormBuilder,
    private router: Router
  ) {
    this.login = this.form.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.login.valid) {
      let { email, password } = this.login.value

      this.authService
        .login(email, password)
        .then((resp) => {
          resp.user
            .getIdToken()
            .then((accessToken) => {
              this.storageService.set('accessToken', accessToken)
            });
          
          this.router.navigate(['/home'])
        })
        .catch((error) => {
          this.error = 'Error al iniciar sesión';
        });
    }
  }
}
