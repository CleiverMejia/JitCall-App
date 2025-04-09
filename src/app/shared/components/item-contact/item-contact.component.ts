import { Component, Input, OnInit } from '@angular/core';
import Contact from 'src/app/models/Contact';

@Component({
  selector: 'app-item-contact',
  templateUrl: './item-contact.component.html',
  styleUrls: ['./item-contact.component.scss'],
  standalone: false
})
export class ItemContactComponent  implements OnInit {
  @Input() id: number | undefined = 0;
  @Input() name: string = '';
  @Input() phone: string = '';

  constructor() { }

  ngOnInit() {}

}
