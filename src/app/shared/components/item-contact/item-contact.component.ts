import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-contact',
  templateUrl: './item-contact.component.html',
  styleUrls: ['./item-contact.component.scss'],
  standalone: false
})
export class ItemContactComponent  implements OnInit {
  @Input() id: string | undefined = '';
  @Input() name: string = '';
  @Input() phone: string = '';

  constructor() { }

  ngOnInit() {}

}
