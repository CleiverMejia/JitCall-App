import { NgModule } from '@angular/core';

import { environment } from '@enviroment/environment';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';

const firebaseConfig = environment.firebaseConfig;

@NgModule({
  providers: [
    provideFirebaseApp(() =>
      initializeApp(firebaseConfig)
    ),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ]
})
export class CoreModule { }
