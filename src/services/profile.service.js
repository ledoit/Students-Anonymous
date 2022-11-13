import {
  doc,
  getDoc, getDocs, setDoc,
  collection, query, where
} from 'firebase/firestore';

import { db } from '../firebase/firebase';

import { Profile } from '../models/profile';

class ProfileService {

  constructor() {
    this.collection = 'profiles';
  }

  async fetchProfiles() {
    const collectionRef = collection(db, this.collection);
    const q = query(collectionRef);
    const querySnapshot = await getDocs(q);

    const profiles = [];
    querySnapshot.forEach((doc) => {
      profiles.push(Profile.fromFirebase(doc));
    });
    return profiles;
  }

  async fetchMyProfile(user) {
    const docRef = doc(db, this.collection, user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // create profile from doc snap
      return Profile.fromFirebase(docSnap);
    } else {
      // return an new profile with the userId
      return new Profile({ id: user.uid });
    }
  }

  async saveProfile(profile) {
    const docRef = doc(db, this.collection, profile.id);

    await setDoc(docRef, profile.toJson());
  }
}

const service = new ProfileService();
export default service;