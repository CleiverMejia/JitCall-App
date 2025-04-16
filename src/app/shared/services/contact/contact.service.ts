import { Injectable } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import Contact from '@interfaces/contact.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private readonly USERS: string = 'users';
  private readonly CONTACTS: string = 'contacts';

  constructor(private firestore: Firestore) {}

  getContacts(userId: string): Observable<Contact[]> {
    const placeRef = collection(
      this.firestore,
      this.USERS,
      userId,
      this.CONTACTS
    );

    return collectionData(placeRef, {
      idField: 'id',
    }) as Observable<Contact[]>;
  }
}
