import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemContactComponent } from './components/item-contact/item-contact.component';
import { IonicModule } from '@ionic/angular';

const COMPONENTS = [ItemContactComponent];

const PROVIDERS: any = [];

const IMPORTS = [
  CommonModule, IonicModule
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...IMPORTS],
  exports: [...COMPONENTS],
  providers: [...PROVIDERS],
})
export class SharedModule { }
