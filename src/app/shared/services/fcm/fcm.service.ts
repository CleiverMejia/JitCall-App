import { Injectable, NgZone } from '@angular/core';

import { Router } from '@angular/router';

import { Capacitor } from '@capacitor/core';

import { PushNotifications } from '@capacitor/push-notifications';

import { map } from 'rxjs';

import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { AuthService } from '@services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class FcmService {
  constructor(
    private router: Router,
    private authService: AuthService,
    private http: HttpClient,
    private zone: NgZone
  ) {}

  initPush() {
    console.log('platform wroking');

    if (Capacitor.isNativePlatform()) {
      this.registerPush();
    }
  }

  private registerPush() {
    PushNotifications.requestPermissions().then(async (permission) => {
      if (permission.receive == 'granted') {
        await PushNotifications.register();
      } else {
        // No permission to push granted
      }
    });

    PushNotifications.addListener('registration', async (token) => {
      console.log('token', token);

      if (token) localStorage.setItem('push-notification-token', token.value);
    });
    PushNotifications.addListener('registrationError', (error: any) => {
      console.log('Error', JSON.stringify(error));
    });

    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      async (notification) => {
        console.log('notification', notification);

        const data = notification.notification;

        console.log('data token data', data.data);

        this.router.navigateByUrl('/redirect-notification');
      }
    );
  }
}
