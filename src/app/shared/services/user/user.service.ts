import { Injectable } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';

import { catchError, map, Observable } from 'rxjs';
import User from '@interfaces/user.interface';
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

  constructor(private firestore: Firestore) { }

  public getUsers(): Observable<User[]> {
    const placeRef = collection(this.firestore, this.USERS);

    return collectionData(placeRef, {
      idField: 'id',
    }) as Observable<User[]>;
  }

  public async createUser(id: string, user: User): Promise<void> {
    const placeRef = doc(this.firestore, this.USERS, id);

    await setDoc(placeRef, user);
  }
}
