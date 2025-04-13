import { Component, OnInit } from '@angular/core';
import User from '@models/user.model';
import Contact from 'src/app/models/contact.model';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  contacts: Contact[] = [
    {
      id: '1',
      email: 'john.doe@example.com',
      password: '',
      user: {
        name: 'John',
        lastName: 'Doe',
        phone: '123-456-7890',
      },
    },
    {
      id: '2',
      password: '',
      email: 'jane.smith@example.com',
      user: {
        name: 'Jane',
        lastName: 'Smith',
        phone: '987-654-3210',
      },
    },
    {
      id: '3',
      email: 'alice.johnson@example.com',
      password: '',
      user: {
        name: 'Alice',
        lastName: 'Johnson',
        phone: '555-123-4567',
      },
    },
    {
      id: '4',
      email: 'bob.brown@example.com',
      password: '',
      user: {
        name: 'Bob',
        lastName: 'Brown',
        phone: '444-987-6543',
      },
    },
  ];

  constructor(
    private userService: UserService,
  ) {}

  ngOnInit() {
    this.userService.getUsers().subscribe((data: User[]) => {
      data.forEach((e: User) => console.log(e));
    });

    // this.authService.register('jkvj477@gmail.com', 'tetoworlddomination')
  }
}
