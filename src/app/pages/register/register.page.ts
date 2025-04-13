import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@services/auth/auth.service';
import { UserService } from '@services/user/user.service';
import User from '@models/user.model'

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false
})
export class RegisterPage implements OnInit {
  public register: FormGroup;
  public name: string = '';
  public lastName: string = '';
  public email: string = '';
  public password: string = '';
  public phone: string = '';

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private form: FormBuilder
  ) {
    this.register= this.form.group({
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', [Validators.required, Validators.minLength(10)]]
    })
  }

  ngOnInit() {
  }

  onSubmit() {
    let { name, lastName, email, password, phone } = this.register.value;

    this.authService.register(email, password).then(res => {
      if(res) {
        let user: User = {name, lastName, phone};

        this.userService.createUser(user);
      }
    }).catch(err => {
      console.log(err);
    })
  }
}
