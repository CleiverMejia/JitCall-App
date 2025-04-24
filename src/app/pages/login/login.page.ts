import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FcmService } from '@services/fcm/fcm.service';
import { HttpService } from '@services/http/http.service';
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
    private router: Router,
    private fcmService: FcmService
  ) {
    this.login = this.form.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.fcmService.initPush();
  }

  onSubmit() {
    if (this.login.valid) {
      let { email, password } = this.login.value;

      this.authService
        .login(email, password)
        .then((resp) => {
          if (resp) {
            this.storageService.set('logged', 'true')
            this.router.navigate(['/home'])
          };
        })
        .catch((error) => {
          this.error = 'Error al iniciar sesión';
        });
    }
  }
}
