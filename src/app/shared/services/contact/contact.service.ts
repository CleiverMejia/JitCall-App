import { Injectable } from '@angular/core';
import { user } from '@angular/fire/auth';
import {
  collection,
  collectionData,
  doc,
  Firestore,
  setDoc,
} from '@angular/fire/firestore';
import Contact from '@interfaces/contact.interface';
import { addDoc } from 'firebase/firestore';
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

  async addContact(userId: string, contact: Contact) {
    const placeRef = collection(this.firestore, this.USERS, userId, this.CONTACTS);

    await addDoc(placeRef, contact);
  }
}
