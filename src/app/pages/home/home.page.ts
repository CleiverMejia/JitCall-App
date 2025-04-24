import { Component, OnInit, ViewChild } from '@angular/core';
import Contact from '@interfaces/contact.interface';
import { AuthService } from '@services/auth/auth.service';
import { ContactService } from '@services/contact/contact.service';
import { StorageService } from '@services/storage/storage.service';
import { OverlayEventDetail } from '@ionic/core/components';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { UserService } from '@services/user/user.service';
import { HttpService } from '@services/http/http.service';
import TokenResponse from '@interfaces/tokenResponse.interface';
import { FcmService } from '@services/fcm/fcm.service';
import User from '@interfaces/user.interface';
import SendNotification from '@interfaces/sendNotification.interface';
import { v4 as uuidv4 } from 'uuid';

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
    private httpService: HttpService,
    private fcmService: FcmService,
    private router: Router
  ) { }

  ngOnInit() {
    this.setContacts();
    this.ionViewWillEnter();
  }

  ionViewWillEnter() {
    this.fcmService.initPush();
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

  callUser(contactId: string): void {
    this.httpService.getToken().subscribe({
      next: (resp: TokenResponse) => {
        this.storageService.set("accessToken", resp.data.access_token)
      
        this.sendNotification(contactId)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  private async sendNotification(id: string) {
    let userId = this.storageService.get("userToken");
    let resp = await this.userService.getUser(userId);

    if (resp) {
      let user: User = resp.data() as User;
      let notification: SendNotification =  {
        token: user.token ?? '',
        notification: {
          title: 'Llamada entrante',
          body: `${user.name} ${user.lastName} te está llamando`,
        },
        android: {
          priority: "high",
          data: {
            userId: id,
            meetingId: uuidv4(),
            type: "incoming_call",
            name: user.name,
            userFrom: userId
          }
        }
      }

      this.httpService.sendNotification(notification).subscribe({
        next: (resp) => {
          console.log(resp);
        },
        error: (err) => {
          console.log(err)
        }
      })
    }
  }
}
