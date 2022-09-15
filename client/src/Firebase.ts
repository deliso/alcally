import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import apiService from './apiService/login.apiService';
import { User } from '../../types/types';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    console.log(result);
    let email: string = '';
    let displayName: string = '';
    let photoURL: string = '';
    const { uid, emailVerified } = result.user;
    if (result.user.email) email = result.user.email;
    if (result.user.displayName) displayName = result.user.displayName;
    if (result.user.photoURL) photoURL = result.user.photoURL;
    const userData = {
      email,
      name: displayName,
      uid,
      photoUrl: photoURL,
      emailVerified,
    } as User;
    const authRegisteredUser = await apiService.register(userData);
    if (authRegisteredUser.error === 409) {
      const authLoggedUser = await apiService.login(userData);
      return authLoggedUser;
    }
    return authRegisteredUser;
    // localStorage.setItem('userData', JSON.stringify(result.user));
  } catch (error) {
    console.log('error', error);
  }
};
