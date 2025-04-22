import { Component, OnInit, ViewChild } from '@angular/core';
import Contact from '@interfaces/contact.interface';
import { AuthService } from '@services/auth/auth.service';
import { ContactService } from '@services/contact/contact.service';
import { StorageService } from '@services/storage/storage.service';
import { OverlayEventDetail } from '@ionic/core/components';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { UserService } from '@services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;

  contacts!: Contact[];
  message =
    'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name!: string;
  phone!: string;

  toastMessage: string = '';

  constructor(
    private authService: AuthService,
    private contactService: ContactService,
    private storageService: StorageService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.setContacts();
  }

  public setContacts(): void {
    this.authService.getCurrentUser().then((res) => {
      if (res)
        this.contactService
          .getContacts(res.uid)
          .subscribe((contacts: Contact[]) => {
            this.contacts = contacts;
          });
    });
  }

  public logout(): void {
    this.authService.logout();
    this.storageService.clear();
    this.router.navigate(['/login']);
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.userService.getTokenByPhone(this.phone).then((resp) => {
      if (resp) {
        let contact: Contact = {
          name: this.name,
          phone: this.phone,
        };

        this.authService.getCurrentUser().then((token) => {
          if (token) {
            this.contactService.addContact(token.uid, contact);
            this.name = ''
            this.phone = ''
          }
        });
      }
    });

    this.modal.dismiss(
      {
        name: this.name,
        contact: this.phone,
      },
      'confirm'
    );
  }

  onWillDismiss(event: CustomEvent<OverlayEventDetail>) {
    if (event.detail.role === 'confirm') {
      this.toastMessage = event.detail.data;
    }
  }
}
