import { Injectable } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';

import { catchError, map, Observable } from 'rxjs';
import User from '@models/user.model';
import {
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly USERS: string = 'users'
  private readonly CONTACTS: string = 'contacts'

  constructor(private firestore: Firestore) { }

  getUsers(): Observable<User[]> {
    const placeRef = collection(this.firestore, this.USERS);

    return collectionData(placeRef, {
      idField: 'id',
    }) as Observable<User[]>;
  }

  async createUser(user: User): Promise<void> {
    const placeRef = collection(this.firestore, this.USERS);

    await addDoc(placeRef, user);
  }
}
