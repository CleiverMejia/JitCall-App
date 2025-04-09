import { Component, OnInit } from '@angular/core';
import Contact from 'src/app/models/Contact';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  contacts: Contact[] = [
    {
      id: 1,
      name: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '123-456-7890'
    },
    {
      id: 2,
      name: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      phone: '987-654-3210'
    },
    {
      id: 3,
      name: 'Alice',
      lastName: 'Johnson',
      email: 'alice.johnson@example.com',
      phone: '555-123-4567'
    },
    {
      id: 4,
      name: 'Bob',
      lastName: 'Brown',
      email: 'bob.brown@example.com',
      phone: '444-987-6543'
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
